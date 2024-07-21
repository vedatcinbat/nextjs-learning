const users = require('./datas').users;
const products = require('./datas').products;

const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
});

app.get('/api/users', (req, res) => {
    res.status(200).json({users});
})

app.get('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));

    if (!user) {
        res.status(404).json({message: 'User not found'});
    }

    res.status(200).json({user});
})

app.get('/api/products', (req, res) => {
    res.send({
        status: 'success',
        data: products
    })
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(product => product.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send({
            status: 'error',
            message: 'Product not found'
        })
    }
    res.send({
        status: 'success',
        data: product
    })
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})