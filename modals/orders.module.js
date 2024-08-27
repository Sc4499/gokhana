const mongoose = require('mongoose');

// Define the schema
const orderSchema = new mongoose.Schema({
email : {
    type : String,
    required : true,
    unique : true
},
order_data : {
    type : Array,
    require : true
}
},{timestamps:true})
const Order = mongoose.model("Order",orderSchema);
module.exports = Order;