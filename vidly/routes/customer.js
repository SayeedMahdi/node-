const express = require('express');
const router = express.Router();
const {Customer, validation}=require("../model/customer")
//Get all customrs
router.get("/", async (req, res) => {
    const customers = await Customer.find()
        .limit(10)
        .sort("name")
        .select({ name: 1, phone: 1, isGold: 1 })
    res.send(customers);
});

//get one customer with id
router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("The ID does not exist in the detabase");
    res.send(customer);
});



//add a new customer



router.post("/", async (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    let new_customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    new_customer = await new_customer.save();
    res.send(new_customer);

});


//eddite a customer
router.put("/:id", async (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const customer_edite = await Customer.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        });
        if (!customer_edite) return res.status(404).send("The ID does not exist in the detabase");
        res.send(customer_edite);
    } catch (err) {
        console.log(err.message);
    }
})


//dellete a customer
router.delete("/:id",async(req,res)=>{
    let customer_del = await Customer.findById(req.params.id);
    if (!customer_del) return res.status(404).send("The ID does not exist in the detabase");
     customer_del=await Customer.findByIdAndDelete(req.params.id);
    res.send(customer_del);
});



module.exports = router;