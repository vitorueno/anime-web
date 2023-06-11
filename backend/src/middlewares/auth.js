const jwt = require("jsonwebtoken");

module.exports = (admin) => {
    return (req, res, next) => {
        const token = req.headers.authorization || "";

        if (!token) {
            return res.status(401).json("Token is missing");
        }

        try {
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            if (admin && !payload.admin) {
                return res.status(403).json("You don't have permission");
            }

            res.locals.userId = payload.id;
            res.locals.admin = payload.admin;

            next();
        } catch (err) {
            console.log(err);
            return res.status(401).json("Invalid Token");
        }
    }
}