const Appointment = require("../models/appoitmentModel");

const getappoitment = async (_, res) => {
  const appointment = await Appointment.find()
  .populate({
    path: "userId",
    select: "fullName email password phoneNumber",
  })
  .populate({
    path: "serviceId",
    select :"name",
  
  }); 
  if (!appointment || appointment.length === 0) {
    return res.status(404).json({
      success: false,
      message: "no appointment found",
    });
  }
  try {
    return res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const request = async (req, res) => {
  const { userId, serviceId, dateTime} = req.body;
  const appointment = new Appointment({
    userId,
    serviceId,
    dateTime : new Date(dateTime),
  });

  try {
    const existingAppointment = await Appointment.findOne({
      userId,
      dateTime,
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "This Service already booked." });
    }

    const newAppointment = await appointment.save();
    res.status(200).json({
      success: true,
      message: "Appointment successfully added",
      data: newAppointment,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success:false,
      message: error.toString()
      ,
    });
  }
};


//   accepet
const accepted = async (req, res) => {
  const { ID } = req.params;
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      ID,
      { status: "confirmed" },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: appointment,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// cancel
const canceled = async (req, res) => {
  const { ID } = req.params;
  try {
    const cancelled = await Appointment.deleteOne({
      _id: ID}
    );

    if (!cancelled) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment successfully cancelled",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getappoitment,
  request,
  accepted,
  canceled,
};
