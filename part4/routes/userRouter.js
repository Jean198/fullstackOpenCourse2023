const userRouter = require('express').Router();
const userController = require('../controllers/user');

userRouter.post('/createuser', userController.createUser);
userRouter.get('/', userController.getAllUsers);
userRouter.post('/loginuser', userController.loginUser);

module.exports = userRouter;
