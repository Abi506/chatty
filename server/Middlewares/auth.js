const jwt=require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization") && req.header("Authorization").split(" ")[1]; // Split to get the token
    if (!token) {
        return res.json({ msg: "Authorization denied, no token is provided" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id; 
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" }); // Return an error if token is invalid
    }
};

module.exports = verifyToken;
