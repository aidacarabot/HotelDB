const Client = require("../models/client");

//! Create a new client
const createClient = async (req, res, next) => {
  try {
      const newClient = new Client(req.body);
      await newClient.save();
      res.status(201).json(newClient);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

//! Get all clients
const getAllClients = async (req, res, next) => {
    try {
      // Usamos populate para reemplazar los ObjectId de los usuarios con sus nombres
      const clients = await Client.find().populate({
        path: 'user',  // Campo que queremos "traducir"
        select: 'userName -_id'  // Seleccionamos solo el campo 'userName' y excluimos el '_id'
      });
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(400).json('Error with petition 👎');
    }
  };
  
  //! Get a single client by ID
  const getClientById = async (req, res, next) => {
    try {
      const client = await Client.findById(req.params.id).populate({
        path: 'user',
        select: 'userName -_id'
      });
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
      return res.status(200).json(client);
    } catch (error) {
      return res.status(400).json('Error with petition 👎');
    }
  };

//! Update a client by ID
const updateClient = async (req, res, next) => {
  try {
      const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user', 'userName'); // Popula userName después de la actualización
      if (!updatedClient) {
          return res.status(404).json({ message: 'Client not found' });
      }
      res.status(200).json(updatedClient);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

//! Delete a client by ID
const deleteClient = async (req, res, next) => {
  try {
      const deletedClient = await Client.findByIdAndDelete(req.params.id);
      if (!deletedClient) {
          return res.status(404).json({ message: 'Client not found' });
      }
      res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = { createClient, getAllClients, getClientById, updateClient, deleteClient };
