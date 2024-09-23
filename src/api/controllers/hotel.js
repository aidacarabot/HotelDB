const Hotel = require("../models/hotel");

//! Create a new Hotel
const createHotel = async (req, res, next) => {
  try {
    const { name, location, client, user } = req.body;
    const newHotel = new Hotel({ name, location, client, user });
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//! Get all hotels
const getAllHotels = async (req, res, next) => {
  try {
      const hotels = await Hotel.find()
        .populate({ path: 'client', select: 'name -_id' })
        .populate({ path: 'user', select: 'userName -_id' });
      res.status(200).json(hotels);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

//! Get a single hotel by ID
const getHotelById = async (req, res, next) => {
  try {
      const hotel = await Hotel.findById(req.params.id)
        .populate({ path: 'client', select: 'name -_id' })
        .populate({ path: 'user', select: 'userName -_id' });
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
      const hotel = await Hotel.findById(req.params.id);
      
      if (!hotel) {
          return res.status(404).json({ message: 'Hotel not found' });
      }

      const { name, location } = req.body;

      hotel.name = name || hotel.name;
      hotel.location = location || hotel.location;

      await hotel.save();
      res.status(200).json(hotel);
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
