const express = require(`express`);
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

// use this so that the app can understand to use .json types
app.use(express.json());
// use this so that the app can understand to use forms types
app.use(express.urlencoded({extended: false}));

// routes

app.get('/', (req, res) => {
    res.send(`hello NODE API`);
});

app.get('/blog', (req, res) => {
    res.send(`hello blog My name is Clint`);
});

// get all products
app.get('/product', async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// get a product by id
app.get('/product/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// create a product
app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// update a product
app.put('/product/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        // const updatedProduct = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// delete a product
app.delete('/product/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

mongoose.set("strictQuery", false);
mongoose.
connect('mongodb+srv://williamsclintwayne:Cw36690000@clintapi.fh6lm.mongodb.net/Node-API?retryWrites=true&w=majority&appName=ClintAPI')
.then(() => {
    console.log('connected to MongodB');
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch(() => {
    console.log(error);
})