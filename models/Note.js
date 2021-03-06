
var mongoose = require("mongoose");

//save refernece to Schema Constructor
var Schema = mongoose.Schema;

//Use the Schema constructor, create a new NoteSchema object
//Similar to Sequelize model

var NoteSchema = new Schema({

    title: String,
    body: String
})

//This creates our model from the above schema,
//using mongooses's model method

var Note = mongoose.model("Note", NoteSchema);

//Export the Note model
module.exports = Note;