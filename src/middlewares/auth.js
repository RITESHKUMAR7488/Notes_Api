const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const auth = (req, res, next) => {
    try {
        // FIX 1: Use req.headers (plural)
        let token = req.headers.authorization;
        
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
            
            // FIX 2: Only call next() if authentication succeeds
            next(); 
        } else {
            // FIX 2: Stop execution here
            return res.status(401).json({message: "Unauthorized user"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized user"});
    }
} // Function ends here

// FIX 3: Export outside the function
module.exports = auth;