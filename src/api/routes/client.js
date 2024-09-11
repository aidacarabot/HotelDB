const { createClient, getAllClients, getClientById, updateClient, deleteClient } = require("../controllers/client");
const clientsRoutes = require("express").Router();


clientsRoutes.post('/clients', createClient); //create a new client
clientsRoutes.get('/clients', getAllClients); //get all clients
clientsRoutes.get('/clients/:id', getClientById); //get a client by ID
clientsRoutes.put('/clients/:id', updateClient); //update a client by ID
clientsRoutes.delete('/clients/:id', deleteClient);//delete a client by ID

module.exports = clientsRoutes;