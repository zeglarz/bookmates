const express = require("express");
const authRouter = express.Router();
const { checkPassword } = require('../db/utils/passwordEncryption');
const { getUserByMailContoller, getUserContoller } = require('../controllers/user');
const { generateToken, validateToken } = require('../db/utils/token');


const login = async (req, res) => {
    const userData = req.body;
    const responseUser = await getUserByMailContoller(userData);
    if (responseUser.length === 0) res.status(404).json('sprawdź login lub hasło');
    const user = responseUser[0];
    const isOk = await checkPassword(user, userData.password);
    if (!isOk) res.status(404).json('sprawdź login lub hasło');
    const token = generateToken(user)

    const { password_salt, password_hash, ...safeUserData } = user;
    const data = { ...safeUserData, token }

    return res.status(200).json(data);
}

const checkToken = (req, res) => {


    getUserContoller(req.token.sub)
        .then(userList => {
            const user = userList[0];
            const { password_salt, password_hash, ...safeUserData } = user;

            res.status(200).json(safeUserData)
        })
}

//localhost:3010/auth

//logowanie i zwracanie Bearer tokena przy poprawnym logowaniu
authRouter.post('/', login);

//sprawdzanie poprawności Bearer tokena(token wysyłamy w headersach )
authRouter.get('/token', validateToken, checkToken);

module.exports = authRouter;