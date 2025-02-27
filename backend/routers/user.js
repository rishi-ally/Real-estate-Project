const express = require('express');
const userRouter = express.Router();
const authMiddleware=require('../middleware/middleware')
const {gethome,registeruser,loginuser, gethomeById, step2register, gethost, addHome, getuserhomes, deleteuser, getloggedinuser, addtofav, getfavs, removefav, fetchedithouse, editHouse, logout, postquery, getqueries, deletequery, getqueryresults}=require('../controllers/usercontroller');
const upload = require('../multer.js');
userRouter.get('/home',gethome)
userRouter.post('/register',registeruser)
userRouter.post('/login',loginuser)
userRouter.get('/house/:id',authMiddleware,gethomeById)
userRouter.post('/register/page2',step2register)
userRouter.get('/host/:id',authMiddleware,gethost)
userRouter.post('/uploadhouse',upload.single('image'),addHome)
userRouter.get('/userhomes',authMiddleware,getuserhomes)
userRouter.delete('/delete/:id',authMiddleware,deleteuser)
userRouter.get('/user/:id',getloggedinuser)
userRouter.get('/addtofav/:id',authMiddleware,addtofav)
userRouter.get('/getfavs',authMiddleware,getfavs)
userRouter.get('/removefav/:id',authMiddleware,removefav)
userRouter.get('/getedithouse/:id',authMiddleware,fetchedithouse)
userRouter.put('/edituserhouse/:id',upload.single('image'),editHouse)
userRouter.post('/logout',logout)
userRouter.post('/loginuser',loginuser)
userRouter.post('/queries',authMiddleware,postquery)
userRouter.get('/getuserqueries',authMiddleware,getqueries)
userRouter.delete('/deletequery/:id',authMiddleware,deletequery)
userRouter.get('/query/:house',getqueryresults)
module.exports=userRouter;