const Service = require('../models/serviceModel');
const { imageUploader } = require('../extra/imageUploader');

const addService = async (req, res) => { 
  const {name,description,duration,benefits,price} = req.body
    try {
      const imageURL = await imageUploader(req);

      const service = new Service({
        name: name,
        image: imageURL,
        information: {
          description: description,
          duration: duration,
          benefits: benefits,
        },
        price: price,
      });
  
      await service.save();
      
         return res.status(200).json({
        code: 200,
        message: 'Service added successfully',
        data: service
      });    
    } catch (error) {
      res.status(400).json({
        code: 400,
        message: 'Service not added successfully',
        error: error.toString(),
      });
    }
  };
  const getAllServices = async (req, res) => {
    try {
      const service = await Service.find({});
      res.status(200).json({
        success: true,
        message: 'Data retrieved successfully',
        data: service,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to get data',
        error: error,
      });
    }
  };
  const deleteService = async (req, res) => {
    try {
      const service = await Service.deleteOne({ _id: req.params.ID });
      res.status(200).json({
        success: true,
        message: 'Service deleted successfully',
        data:service,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: ' error occured while deleting the Service',
        error: error,
      });
    }
  };
  const getServiceById = async (req, res) => {
    try {
      const service = await Service.findById(req.params.ID);
      res.status(200).json({
        success: true,
        message: 'service got successfully.',
        data: service,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to get service',
        error: error,
      });
    }
  };
  const UpdateServiceById = async (req, res) => {
    try {
      const { ID } = req.params;
      const {name,description,duration,benefits,price,} = req.body
    
      const image = await imageUploader(req);
      console.log(image)

  
      // Gather updated data
      const updatedServiceData = {
        name:name,
        information: {
          description: description,
          duration: duration,
          benefits: benefits,
          image :image,
        },
        price:price,
      };
  
      console.log("Updated Service Data:", updatedServiceData);
  
      const updatedService = await Service.findOneAndUpdate(
        { _id: ID },
        { $set: updatedServiceData },
        { new: true }
      );
  
      if (!updatedService) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Service updated successfully.",
        data: updatedServiceData,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Unable to update service",
        error: error.message,
      });
    }
  };
  
    
  module.exports={addService, getAllServices,getServiceById,deleteService,UpdateServiceById};