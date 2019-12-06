// importando
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user");

/**
 * login
 * @param {object} req - requisição 
 * @param {object} res - resposta
 * @description Middleware login
 */

const login = async (req, res) => {
  try {

    // Clonando corpo da requisição
    const loginData = { ...req.body };


    // Validando email e senha
    if (!loginData.email) throw new Error("Insira um E-mail");
    if (!loginData.password) throw new Error("Insira uma Senha");

    // consultando através do e-mail
    const userFromDB = await userController.readByEmail(loginData.email);
    
    // verificando se a conta existe
    if (!userFromDB) throw new Error("Endereço de E-mail não foi cadastrado.");

    // comparando as senhas
    const isSame = await bcrypt.compare(
      loginData.password,
      userFromDB.password
    );

    // validando as senhas
    if (!isSame) throw new Error("Senha inválida.");

    // gerando token para autenticar o usuário
    jwt.sign(
      { ...userFromDB },
      process.env.privateKey,
      { expiresIn: "1d" },
      (error, token) => {
        // verificando se existe erro
        if (error) {
          return res.status(500).send("Ocorreu um erro ao realizar o login.");
        }

        // entregando o token gerado para o front-end
        res.status(200).json(token);
      }
    );
  } catch (error) {
    // caso ocorra algum erro, retorna a mensagem do erro.
    return res.status(400).send(error.message);
  }
};


/**
 * Register
 * @param {object} req - requisição
 * @param {object} res - resposta
 * @description Middleware register
 */

const register = async (req, res) => {
  try {
    // Clonando os dados da requisição
    const userData = { ...req.body };

    // Validando nome e e-mail
    if (!userData.name) throw new Error("Insira um nome.");
    if (!userData.email) throw new Error("Insira um E-mail.");

    // Consultando usuário através do e-mail
    const exists = await userController.readByEmail(userData.email);
    
    // Verificando se usuário já existe, caso exista um erro é lançado.
    if (exists) throw new Error("Esse endereço de E-mail já foi cadastrado.");

    // Se senha estiver vazia, um erro é lançado.
    if (!userData.password) throw new Error("Insira uma Senha.");
    
    // Se senha for menor que 7, um erro é lançado.
    if (userData.password.length < 7)
      throw new Error("A senha precisa ter no minimo 7 dígitos.");

    // gerando código entre 1 - 8
    const digit = Math.round(Math.random() * 8) + 1;
    
    // gerando código entre 00000 - 99999
    const agency = Math.round(Math.random() * 99999);

    // criando usuário
    await userController.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      digit: `000${digit}`,
      agency: `${agency}-${digit}`
    });

    // retornando resultado.
    res.status(200).send('Usuário cadastrado.')
  } catch (error) {
    // caso ocorra algum erro, retorna a mensagem do erro.
    return res.status(400).send(error.message);
  }
};

/**
 * Request Only Authenticated
 * @param {object} req - requisição 
 * @param {object} res - resposta
 * @param {function} next - middleware
 * @description Middleware requestOnlyAuthenticated
 */

const requestOnlyAuthenticated = async (req, res, next) => {
  try {
    // pega o token da requisição
    const token = req.headers.authorization;

    // verifica se o token está vazio, caso esteja é lançado um erro
    if (!token) throw new Error("Não autenticado.");

    // aqui o token é verificado, e o payload._doc é passado para a requisição
    jwt.verify(token, process.env.privateKey, (error, payload) => {
      // verificando se ocorreu algum erro.
      if (error) throw new Error("Não autenticado.");
      // passando os documentos para o objeto de requisição
      req.user = payload._doc;
      // chamando próximo middleware
      next();
    });
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

// exportando 
module.exports = {
  login,
  register,
  requestOnlyAuthenticated
};
