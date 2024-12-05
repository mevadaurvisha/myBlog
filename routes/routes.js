const express = require('express');
const routes = express.Router();
const controller = require('../controllers/controller');
const passport = require('../config/passport.js')
const isAuth = require('../middleware/isAuth.js');

routes.get('/' , isAuth, controller.defaultController);
routes.get('/signUp' , controller.signUpController);
routes.post('/signUpForm' , controller.signUpFormController);
routes.get('/login' , controller.loginController);
routes.post('/loginCon' , passport.authenticate('local', { failureRedirect: '/login'}),  controller.postloginController);
routes.get('/logOut' , controller.logOutController);

// topic routes
routes.get('/addTopic' , controller.addTopicController);
routes.post('/topicForm' , controller.viewTopicController);
routes.get('/deleteTopic/:id' , controller.deleteTopicController);

//subtopic
routes.get('/addSubTopic', controller.subTopicController);
routes.post('/subTopicForm' , controller.viewSubtopicController);


module.exports = routes;