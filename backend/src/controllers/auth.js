const RefreshToken = require("../models/RefreshToken");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ms = require("ms");


async function createRefreshToken(id, admin) {
    // Define a Expiração
    const refreshTokenExpiration = Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRATION);

    // Cria o Token
    const newRefreshToken = jwt.sign(
        { id, admin },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: refreshTokenExpiration }
    );

    // Armazena o Token
    try {

        const user = await User.findById(id)
        const refreshToken = new RefreshToken({
            token: newRefreshToken,
            expiresIn: refreshTokenExpiration
        });

        const savedRefreshToken = await refreshToken.save();

        user.tokens.push(savedRefreshToken)

        await user.save();



        return savedRefreshToken;
    } catch (error) {
        console.log(error)
    }
}

function createAccessToken(id, admin) {
    const token = jwt.sign(
        { id, admin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );

    return token;
}

async function login(req, res) {
    try {
        const { credential, password } = req.body;

        let registeredUser = await User.findOne({ name: credential });


        if (!registeredUser) {
            return res.status(401).json("Invalid credentials");
        }

        const isPasswordValid = registeredUser.comparePassword(password);


        if (!isPasswordValid) {
            return res.status(401).json("Invalid credentials");
        }

        const accessToken = createAccessToken(registeredUser.id, registeredUser.admin);
        const refreshToken = await createRefreshToken(registeredUser.id, registeredUser.admin);

        res.json({ accessToken, refreshToken });

    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }
}

async function refresh(req, res) {
    const { refreshToken } = req.body;

    try {
        const validRefreshToken = await RefreshToken.findOne({ token: refreshToken });

        const token = jwt.verify(validRefreshToken.token, process.env.REFRESH_TOKEN_SECRET);

        if (!token) {
            return res.status(401).json("Invalid refresh-token");
        }

        if (validRefreshToken.expiresIn < Date.now()) {
            return res.status(401).json("Invalid refresh-token");
        }

        const accessToken = createAccessToken(token.id, token.admin);

        res.json({ accessToken });
    } catch (error) {
        res.status(400).json({ error });
        console.log(error)
    }
}



module.exports = {
    login,
    refresh
}