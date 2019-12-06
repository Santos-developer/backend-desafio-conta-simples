// importando
const bcrypt = require("bcrypt");
const userController = require("../controllers/user");

/**
 * Create
 * @param {object} req - requisição
 * @param {object} res - resposta
 * @description Middleware criar usuário 
 */

const create = async (req, res) => {
  try {
    // clonando corpo da requisição
    let userData = { ...req.body };

    // encriptando a senha
    userData.password = await encryptPassword(userData.password);

    // criando usuário
    const status = await userController.create(userData);

    // retornando status
    res.sendStatus(status);
  } catch (message) {
    // caso ocorra algum erro, retorna a mensagem do erro.
    return res.status(500).send(message);
  }
};

/**
 * Read
 * @param {object} req - requisição
 * @param {object} res - resposta
 * @description Middleware ler usuário
 */

const read = async (req, res) => {
  try {
    // clonando o corpo da requisição
    const userID = req.body._id;

    // consultando usuário do banco de dados pelo ID
    const userFromDB = await userController.read(userID);

    // retornando usuário
    res.status(200).json(userFromDB);
  } catch (message) {
    // caso ocorra algum erro, retorna a mensagem do erro.
    return res.status(500).send(message);
  }
};

/**
 * Read Profile
 * @param {object} req - requisição
 * @param {object} res - resposta
 * @description Middleware consulta usuário
 */

const readProfile = async (req, res) => {
  // desestruturação
  const {
    name,
    email,
    picture,
    digit,
    agency,
    total,
    rentability,
    entries,
    transactions,
    notifications
  } = req.user;

  // duas coleções
  const collectionOfNotifications = [];
  const collectionOfTransactions = [];

  // cada transação é adicionada na coleção.
  transactions.forEach(transaction =>
    collectionOfTransactions.push(transaction[0])
  );

  // cada notificação é adicionada na coleção.
  notifications.forEach(notification =>
    collectionOfNotifications.push({
      message: notification[0]
    })
  );

  // retorna os dados
  res.status(200).json({
    name,
    email,
    picture,
    digit,
    agency,
    total,
    rentability,
    entries,
    transactions: collectionOfTransactions,
    notifications: collectionOfNotifications
  });
};

/**
 * Update
 * @param {object} req - requisição
 * @param {object} res - resposta
 * @description Middleware atualiza usuário
 */

const update = async (req, res) => {
  try {
    // clonando o corpo da requisição
    const userData = { ...req.body };

    // pegando somente o ID
    const userID = userData._id;

    // atualiza usuário pelo ID
    const status = await userController.update(userID, userData);
    
    // retorna status
    res.sendStatus(status);
  } catch (message) {
    // caso ocorra algum erro, retorna a mensagem do erro.
    return res.status(500).send(message);
  }
};

/**
 * Remove
 * @param {object} req - requisição
 * @param {object} res - resposta
 * @description Middleware remove usuário
 */

const remove = async (req, res) => {
  try {
    // pegar somente o ID
    const userID = req.body._id;

    // remove o usuário pelo ID
    const status = await userController.remove(userID);
    
    // envia status
    res.sendStatus(status);
  } catch (message) {
    return res.status(500).send(message);
  }
};

/**
 * Encrypt Password
 * @param {string} password - Senha
 * @returns {string} Senha encriptada
 * @description Faz a encriptação da senha e retorna a senha encriptada.
 */

const encryptPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    return Promise.reject(error);
  }
};

// exportando
module.exports = {
  create,
  read,
  readProfile,
  update,
  remove
};
