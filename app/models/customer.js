var mongoose = require('mongoose');

// define the schema for our user model
var customerSchema = mongoose.Schema({
    name         : { type: String, required: true },
    contact      : { 
        phone_home: { type: Number, required: true },
        phone_work: Number,
        phone_cell: Number 
    },
    address      : {
        street: { type: String, required: true },
        unit: String,
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: Number, required: true }
    },
    createdAt    : {type: Date, default: Date.now}
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;