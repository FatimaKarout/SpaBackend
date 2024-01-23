const express = require ('express')
const router =express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {
    addService,getServiceById,getAllServices,UpdateServiceById,deleteService
    
  }= require('../controllers/serviceController')
  router.post('/addService', upload.single('image'), addService);
  router.get('/getAllServices', getAllServices);
  router.get('/getServiceById/:ID', getServiceById);
router.put('/updateService/:ID', upload.single('image'), UpdateServiceById);
  router.delete('/deleteServiceById/:ID', deleteService);


  module.exports=router
