const express = require('express');
const router = express.Router();
const Order = require('../modals/orders.module.js');  

router.post("/order",async(req, res)=>{
    let data = req.body.order_data;
    data.splice(0,0,{order_date : req.body.order_date})

    let eId = await Order.findOne({"email" : req.body.email})

    if(eId === null){   // for new user
      try {
          await Order.create({
              email : req.body.email,
              order_data : [data]
          }).then(()=>{
            res.status(200).json({
                success : true,
            })
          })
      } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
      } else {
try {   //for existing user
    await Order.findOneAndUpdate({email : req.body.email},{$push : {order_data : data}}).then(()=>{
        res.json({success : true})
    })
} catch (error) {
    console.error(error);
    return res.status(400).json({
        success: false,
        error: error.message
    });
}
      }
    })

    module.exports = router;