import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient;
const router = express.Router();

//Register
router.post('/register', async(req,res) => {
    const {username, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    const userRole = role || 'USER';

    try{
        const user = await prisma.user.create({
            data:{
                username,
                password : hashedPassword,
                role: userRole,
            },
        });
        res.status(201).json({message:'User created successfully'});

    }catch(error){
        res.status(500).json({error:'Error registrating user'})
    }
})

//Login
router.post('/login',async(req,res) =>{
    const {username, password} = req.body

    const user = await prisma.user.findUnique({
        where : {username},
    });

    if(!user){
        return res.status(400).json({error: 'Invalid Credintials'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({error: 'Invalid Credintials'});
    }

    const token = jwt.sign(
        {userId: user.id, username: user.username,role: user.role},
        process.env.JWT_SECRET, // this will add the secret to the env file
        {expiresIn: '1h'}
    );

    res.json({message:'Login Successful', token})
});

export default router;