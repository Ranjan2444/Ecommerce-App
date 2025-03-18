import express from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const prisma = new PrismaClient();
const router = express.Router();

//Create a Product
router.post('/',roleMiddleware,async(req,res,next) => {
    //parsing name and price from request 
    const{ name,price,image} = req.body;
    if (!name || !price || !image) {
        const error = new Error('Product name and price are required');
        error.name = 'ValidationError';
        return next(error);  // Pass error to the global error handler
      }

    try{
        const product = await prisma.product.create({
            data: {name, price, image},
        });
        res.status(201).json(product);
    }catch(error){
        next(error);
    }
})

// Get all products with pagination
router.get('/', async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query; // Default page 1, limit 10
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
        return res.status(400).json({ error: "Invalid page or limit values" });
    }

    try {
        const products = await prisma.product.findMany({
            skip: (pageNumber - 1) * limitNumber, // Skip records for pagination
            take: limitNumber, // Limit the number of records per page
        });

        const totalProducts = await prisma.product.count(); // Total number of products

        res.json({
            totalProducts,
            totalPages: Math.ceil(totalProducts / limitNumber),
            currentPage: pageNumber,
            products,
        });
    } catch (error) {
        next(error);
    }
});


//Get product by id
router.get('/:id', async(req,res) =>{
    const {id} = req.params;
    try{
        const product = await prisma.product.findUnique({
            where:{id: Number(id)},
        });
        if(!product){
            res.status(404).json({error:'Product not found'});
        }
        res.json(product);
    } catch(error){
        next(error);
    }
})

//Update a product
router.put('/:id',roleMiddleware,async(req,res,next) =>{
    const {id} = req.params;
    const {name,price, image} = req.body;
    if (!name || !price || !image) {
        const error = new Error('Product name and price are required');
        error.name = 'ValidationError';
        return next(error);
    }
    try{
        const product = await prisma.product.update({
            where : {id: Number(id)},
            data: {name, price, image},
        });
        res.json(product)
    }catch(error){
        next(error);
    }
})

//Deleting a product
router.delete('/:id',roleMiddleware,async(req,res) =>{
    const{id} = req.params;
    try{
        const product = await prisma.product.delete({
            where : {id: Number(id)},
        });
        res.json({message:'Product deleted'})
    } catch(error){
        next(error)
    }
})

export default router;