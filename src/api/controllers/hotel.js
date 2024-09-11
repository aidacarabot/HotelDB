const Hotel = require("../models/hotel");

//! Create a new Hotel
const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res.status(201).json(newHotel);  // Envía una respuesta con el hotel creado
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//! Get all hotels
const getAllHotels = async (req, res, next) => {
  try {
      // Popula client con su nombre y user con su nombre de usuario
      const hotels = await Hotel.find()
        .populate({ path: 'client', select: 'name -_id' })  // Popula el nombre del cliente
        .populate({ path: 'user', select: 'userName -_id' }); // Popula el nombre de usuario
      res.status(200).json(hotels);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

//! Get a single hotel by ID
const getHotelById = async (req, res, next) => {
  try {
      const hotel = await Hotel.findById(req.params.id)
        .populate({ path: 'client', select: 'name -_id' })  // Popula el nombre del cliente
        .populate({ path: 'user', select: 'userName -_id' }); // Popula el nombre de usuario
      if (!hotel) {
          return res.status(404).json({ message: 'Hotel not found' });
      }
      res.status(200).json(hotel);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

//! Update a hotel by ID
const updateHotel = async (req, res, next) => {
  try {
      const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .populate({ path: 'client', select: 'name -_id' })  // Popula el nombre del cliente
        .populate({ path: 'user', select: 'userName -_id' }); // Popula el nombre de usuario
      if (!updatedHotel) {
          return res.status(404).json({ message: 'Hotel not found' });
      }
      res.status(200).json(updatedHotel);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

//! Delete a hotel by ID
const deleteHotel = async (req, res, next) => {
  try {
      const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
      if (!deletedHotel) {
          return res.status(404).json({ message: 'Hotel not found' });
      }
      res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = { createHotel, getAllHotels, getHotelById, updateHotel, deleteHotel };
