const express= require('express')
const router = express.Router();
const isAuthenticated = require('../middleware/authenticated');
const {
    getuser,
    getUserById,
    register,
    login,
    updateUser,
    switchToAdmin,
    deleteById,
} 
=require('../controllers/userController')

router.get('/get', getuser)
router.get('/getById/:id', getUserById)
router.post('/register', register)
router.post('/login', login)
router.put('/update/:ID', isAuthenticated(['admin']),updateUser)
router.put('/switchAdmin/:ID', isAuthenticated(['admin']), switchToAdmin)
router.delete('/delete/:ID', deleteById)




module.exports = router