const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],  // Solo 'admin' y 'user' son válidos
    default: 'user'  // Rol predeterminado es 'user'
  },
  clients: [{
    type: Schema.Types.ObjectId,
    ref: 'Client'  
  }],
  hotels: [{
    type: Schema.Types.ObjectId,
    ref: 'Hotel'  
  }]
},
{
  timestamps: true,
  collection: "User"  
});

//? Para encriptar la contraseña:
UserSchema.pre("save", function() {
  this.password = bcrypt.hashSync(this.password, 10);
})

const User = mongoose.model('User', UserSchema, "User");
module.exports = User;
