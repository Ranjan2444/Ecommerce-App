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

const allowedOrigin = "http://localhost:5173";

app.use(cors({
  origin: function(origin, callback) {
    if (origin === allowedOrigin || !origin) {
      callback(null, true); // Allow requests from localhost:5173 and non-browser requests (e.g., Postman)
    } else {
        //call back function has two parameters i.e, (error,allowed)
      callback(new Error('Not allowed by CORS'), false); // Reject requests from other origins
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"]
}));


//To get data from frontend in json format
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