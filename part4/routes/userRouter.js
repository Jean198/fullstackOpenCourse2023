const userRouter = require('express').Router();
const userController = require('../controllers/user');

userRouter.post('/createuser', userController.createUser);
userRouter.get('/', userController.getAllUsers);
userRouter.post('/loginuser', userController.loginUser);
userRouter.get('/loggedin', userController.loginStatus);
userRouter.get('/logout', userController.logoutUser);

module.exports = userRouter;
