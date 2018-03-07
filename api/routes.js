const express = require('express')
const fs = require('fs')

const Product = require('../models/product')

const router = express.Router()

// search for all products
router.get('/products', (req, res, next) => {
    console.log("GET request ...")
    Product.find({}).then((products) => {
        res.send(products)
    })
    .catch(next)
})

// search for specific product
router.get('/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id }).then((product) => {
        res.send(product)
    })
    .catch(next)
})

// add new product
router.post('/products', (req, res, next) => {
    console.log("POST request ...", req.body)


            // saving image

            req.body.images.forEach(function(img, i){
                fs.writeFile(
                    '../images/' + i + '.jpg', 
                    img.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), 
                    { encoding: 'base64' },
                    (err) => {
                        console.log("SAVING FILE OK ... " + err)
                    }
                );
              });
              

    // Product.create(req.body).then((product) => {

    //     console.log(product)


    //     res.send(product)
    // })
    // .catch(next)

})

// update product
router.put('/products/:id', (req, res, next) => {
    console.log("PUT request ...")
    Product.findByIdAndUpdate({ _id: req.params.id }, req.body).then((_product) => {
        res.send(true)
    })
    .catch(next)
})

// delete product
router.delete('/products/:id', (req, res, next) => {
    console.log("DELETE request ...")

    Product.findByIdAndRemove({ _id: req.params.id }).then((_product) => {
        res.send(true)
    })
    .catch(next)
})

module.exports = router
