const { createHotel, getAllHotels, getHotelById, updateHotel, deleteHotel } = require("../controllers/hotel");
const hotelRoutes = require("express").Router();


hotelRoutes.post('/hotels', createHotel); //create a new hotel
hotelRoutes.get('/hotels', getAllHotels); //get all hotels
hotelRoutes.get('/hotels/:id', getHotelById); //get a hotel by ID
hotelRoutes.put('/hotels/:id', updateHotel); //update a hotel by ID
hotelRoutes.delete('/hotels/:id', deleteHotel); //delete a hotel by ID

module.exports = hotelRoutes;