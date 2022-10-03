// config inicial

const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

// Forma de ler JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Rotas da API
const productRoutes = require('./Routes/ProductRoutes')
app.use('/product', productRoutes)

// Rota inicial / endpoint para acessar no postman
app.get('/', (req, res) => {

    // Mostrar req

    res.json({message: 'Oi express'})

})

// Disponibilizar uma porta

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose
    .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.rermxap.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectamos ao mongoDB!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))

