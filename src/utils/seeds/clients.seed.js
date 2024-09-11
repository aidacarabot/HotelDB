require('dotenv').config(); //para leer archivo dotenv
const mongoose = require('mongoose');
const clients = require('../../data/clients');
const Client = require('../../api/models/client');

// Conecta a la base de datos
mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    const allClients = await Client.find(); // Buscamos todos los clientes actuales
    if (allClients.length) {
      await Client.collection.drop(); // Si existen clientes previamente, se borrarán (para evitar repeticiones)
      console.log("Existing clients removed.");
    }
  })
  .then(async () => {
    await Client.insertMany(clients); // Inserta los clientes en la base de datos
    console.log("Clients seeded successfully!");
  })
  .catch(error => console.log("Error during seeding process:", error))
  .finally(() => mongoose.disconnect()); // Cierra la conexión con la BBDD
