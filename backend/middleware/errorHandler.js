// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error (you can customize this to log it in a file or external service)
  
    // Check for validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
  
    // Check for not found errors
    if (err.name === 'NotFoundError') {
      return res.status(404).json({ error: err.message });
    }
  
    // Check for unauthorized errors
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: err.message });
    }
  
    // Default to a generic server error
    return res.status(500).json({ error: 'Something went wrong on the server' });
  };
  
  export default errorHandler;
  