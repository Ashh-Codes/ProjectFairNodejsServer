const express =require('express')
const userController=require('../controllers/userController')
const projectController =require('../controllers/projectConroller')
const jwtMiddleware = require('../middlewares/jwtMiidleware')
const multermiddleware = require('../middlewares/multerMiddleware')


const router = new  express.Router()


//post request to register to https://localhost:3000/register

router.post('/register',userController.registerController)

//post request to login to https://localhost:3000/login

router.post('/login',userController.loginController)


//add project
router.post('/add-project',jwtMiddleware,multermiddleware.single("projectImg"),projectController.addProjectController)


//gethome projects
router.get('/home-projects',projectController.getAllProjectsForHomeController)

//allproject
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectController)

//all user projects
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectsController)

//remove project
router.delete('/:pId/remove-project',jwtMiddleware,projectController.removeProjectController)

//edit router
router.put('/:pId/edit-project',jwtMiddleware,multermiddleware.single("projectImg"),projectController.editProjectController)

//edit user profile
router.put('/user/edit',jwtMiddleware,multermiddleware.single("profilePic"),userController.editProfileContoller)

//export router

module.exports = router