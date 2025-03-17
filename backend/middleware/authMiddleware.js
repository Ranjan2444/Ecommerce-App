import jwt from 'jsonwebtoken';

const authMiddleware = (req,res,next) => {
    const token = req.header('Authorization')?.replace('Bearer ','');

    if(!token){
        return res.status(401).json({error:'No token provide'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user info to the request object
        next();
    }catch(error){
        res.status(401).json({error:'Invalid Token'});
    }
};

export default authMiddleware;