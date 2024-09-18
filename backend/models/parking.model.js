const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ParkingSpotSchema = new mongoose.Schema({
    spotName:{type: String, required:true},
    latitude:{ type:[Number], required: true,},
    longitude:{ type:[Number], required: true,},
    notes: { type: String, required:false, },
    navigated: {type: Boolean, required:true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required:true },
},{timestamps: true});


module.exports = mongoose.model('ParkingSpot', ParkingSpotSchema);