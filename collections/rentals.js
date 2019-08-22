const mongoose = require('mongoose');



const rentals = new mongoose.Schema({
    genre:{
        type:new mongoose.Schema({
            genre: {
                type:String,
                required: true,
                minlength: 5
            }
        })
    },
    movie:{
        type:new mongoose.Schema({
            title: {
                type:String,
                minlength: 4,
                maxlength: 100
            },
            numberInStock:{
                type: Number,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                required:true
            }
        })
    },
    dateOut: { 
        type: Date, 
        required: true,
        default: Date.now
      },
      dateReturned: { 
        type: Date
      },
      rentalFee: { 
        type: Number, 
        min: 0
      }

});
const Rentals = mongoose.model('rentals',rentals)

module.exports.Rentals = Rentals