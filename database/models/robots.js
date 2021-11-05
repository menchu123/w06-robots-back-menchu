const { Schema, model } = require("mongoose");

const robotSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
  },
  características: {
    velocidad: { type: Number, min: 0, max: 10 },
    resistencia: { type: Number, min: 0, max: 10 },
    creación: { type: Date, default: Date.now },
  },
});

const Robot = model("Robot", robotSchema, "Robots");

module.exports = Robot;
