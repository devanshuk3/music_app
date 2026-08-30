const jwt = require("jsonwebtoken");

function auth(req, res, next){
    if(!authHeader || !authHeader.startswith("Bearer ")){
        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }


    //Bearer auigd9qigd883fiwq93iqufbarwfw2f
    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        next();
    }
    catch{
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}