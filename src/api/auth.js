const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user");

const login = async (req, res) => {
  try {
    const loginData = { ...req.body };
    if (!loginData.email) throw new Error("Insira um E-mail");
    if (!loginData.password) throw new Error("Insira uma Senha");

    const userFromDB = await userController.readByEmail(loginData.email);
    if (!userFromDB) throw new Error("Endereço de E-mail não foi cadastrado.");

    const isSame = await bcrypt.compare(
      loginData.password,
      userFromDB.password
    );

    if (!isSame) throw new Error("Senha inválida.");

    jwt.sign(
      { ...userFromDB },
      process.env.privateKey,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          return res.status(500).send("Ocorreu um erro ao realizar o login.");
        }

        res.status(200).json(token);
      }
    );
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const register = async (req, res) => {
  try {
  } catch (message) {}
};

module.exports = {
  login,
  register
};
