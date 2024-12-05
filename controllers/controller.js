const userModel = require('../models/userModel');
const topicModel = require('../models/topicModel');
const subTopicModel = require('../models/subtopicModel');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRound = 10;

const defaultController = (req, res) => {

    res.render('index');
}

const signUpController = (req, res) => {

    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('signUp');
}

const signUpFormController = async (req, res) => {

    if(req.body.password === req.body.con_pass) {
        const hashedPass = await bcrypt.hash(req.body.password , saltRound);

        console.log('hashed pass', hashedPass);

        try{
            const userData = {
                name : req.body.name,
                email : req.body.email,
                password : hashedPass
            }

            const newData = new userModel(userData);
            await newData.save();

            res.redirect('/login');
            console.log('User >>' , newData);
        }
        catch (err) {
            res.send('Email is already exists...');
        }
    }else {
        console.log('Both passwords are not same...');
    }
}

const loginController = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('login');
}

const postloginController = (req, res) => {
    console.log('login sucessfully...');
    res.redirect('/');
}


const logOutController = (req, res) => {

    console.log('logout sucessfully..')

    req.logout((err) => {
        if(err) {
            next();
        }
        else{
            res.redirect('/login');
        }
    })
}


// topic controllers

const addTopicController = async (req, res) => {

    const topic = await topicModel.find();
    res.render('addTopic' , {topic})
}

const viewTopicController = async (req, res) => {

    const {topic} = req.body;

    const addtopic = {
        topic : topic,
        user : req.user.id
    }

    try {

        const topics = new topicModel(addtopic);

        await topics.save();
        res.redirect('/addTopic');

        console.log('new topic---', topics)

        console.log('topic added sucessfully...');

    } catch (err) {
        console.log('topic error',err);
    }
}

const deleteTopicController = async (req, res) => {

    try {

        const topic = await topicModel.findByIdAndDelete(req.params.id);

        if(topic.user.toString() !== req.user._id.toString()){
            return res.send('Unauthorized user...');
        }

        res.redirect('/addTopic');
        console.log('topic deleted sucessfully..');
    }
    catch(err) {
        console.log('delete topic error',err);
    }  
}

const subTopicController = async (req, res) => {

    try {
        const topic = await topicModel.find({});

        const subTopic = await subTopicModel.find({}).populate('topic');

        res.render('addSubTopic' , {subTopic, topic});

        console.log('subtopic added sucessfully...');
    }
    catch(err) {
        console.log('subtopic err', err);
    }
}

const viewSubtopicController = async (req, res) =>{

    try {
        const { topicname, subtopic } = req.body;

        const topic = await topicModel.findById(topicname);

        const subTopic = new subTopicModel({
            subTopic: subtopic,
            topic: topic._id
            
        });
        const newSubTopic = await subTopic.save();

        console.log("New SubTopics:", newSubTopic);

        const topics = await topicModel.find({});
        const subtopics = await subTopicModel.find({}).populate('topic');

        res.render('viewTitles', { topics, subtopics });
    } catch (error) {
        console.log("Error in SubTopics:", error);
        res.send('Error occurred while submitting the Sub Topic');
    }
}


module.exports = {defaultController, signUpController, loginController, signUpFormController, postloginController, logOutController, addTopicController, viewTopicController, deleteTopicController, subTopicController, viewSubtopicController};