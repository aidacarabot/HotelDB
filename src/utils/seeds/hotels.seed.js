require('dotenv').config(); //para leer archivo dotenv
const mongoose = require('mongoose');
const Hotel = require('../../api/models/hotel');
const hotels = require('../../data/hotels');
const Client = require('../../api/models/client');

//Conecta a la BBDD
mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    const allHotels = await Hotel.find(); // Buscamos todos los hoteles actuales
    if (allHotels.length) {
      await Hotel.collection.drop(); // Si existen hoteles previamente, se borrarán (para evitar repeticiones)
      console.log("Existing hotels removed.");
    }
  })

  .then(async () => {
    const allClients = await Client.find(); // Buscamos todos los clientes para asociarlos a los hoteles

    // Asignar un cliente y un usuario a cada hotel
    hotels.forEach((hotel, index) => {
      hotel.client = allClients[index % allClients.length]._id; // Asignación circular de clientes
      hotel.user = allClients[index % allClients.length].user; // Asigna el usuario correspondiente
    });

    await Hotel.insertMany(hotels); // Inserta los hoteles en BBDD
    console.log("Hotels seeded successfully!");
  })
  .catch(error => console.log("Error during seeding process:", error))
  .finally(() => mongoose.disconnect()); // Cierra la conexión BBDD