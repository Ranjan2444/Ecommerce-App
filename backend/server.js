import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorHandler.js';

//load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Midleware
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes);
app.use(errorHandler);

//test route
// app.get('/',(req,res) => {
//     res.send("API is working")
// });

//Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});