
const router = require('express').Router()
const Product = require('../Models/Product')
const ItemModel = require('../Models/Product')

// Create
router.post('/', async (req, res) => {
    const {
        urlImage, 
        name,
        description,
        category,
        price,
        craftsman,
        wppNumber,
        email
    } = req.body

    if (!name) {
        res.status(422).json({ error: 'O Nome do produto é obrigatório.' })
        return
    }
    if (!description) {
        res.status(422).json({ error: 'A Descrição é obrigatório.' })
        return
    }
    if (!price) {
        res.status(422).json({ error: 'O Preço é obrigatório.' })
        return
    }
    if (!craftsman) {
        res.status(422).json({ error: 'O Nome do artista é obrigatório.' })
        return
    }
    if (!email) {
        res.status(422).json({ error: 'O Email do artista é obrigatório.' })
        return
    }
    if (!category) {
        res.status(422).json({ error: 'A categoria do produto é obrigatória.'})
        return
    }

    const product = {
        urlImage, 
        name,
        description,
        category,
        price,
        craftsman,
        wppNumber,
        email
    }

    try {
        await ItemModel.create(product)

        res.status(201).json({ message: 'Produto cadastrado com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Read 
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Get by category
router.get('/:category', async (req, res) => {

    res.status(422).json({})

    const category = req.params.category
    try {

        if(!product) {
            res.status(404).json({message: 'A categoria não foi encontrada.'})
            return
        }

        const product = await Product.findOne({category: category})
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Update
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {
        urlImage, 
        name,
        description,
        category,
        price,
        craftsman,
        wppNumber,
        email
    } = req.body

    const product = {
        urlImage, 
        name,
        description,
        category,
        price,
        craftsman,
        wppNumber,
        email
    }

    try {
        const updateProduct = await Product.updateOne({_id: id})

        if(updateProduct.matchedCount === 0) {
            res.status(422).json({message: 'O produto não foi encontrado!'})
            return
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error: error}, product)

        res.status(200).json(product)
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const product = await Product.findOne({ _id: id })

    if(!product) {
        res.status(422).json({message: 'A produto não foi encontrado.'})
        return
    }

    try {
        await Product.deleteOne({_id: id})
        res.status(200).json({message: 'Produto removido com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})


module.exports = router