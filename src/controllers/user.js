const userModel = require("../models/user");

/**
 * Create
 * @param {object} userData - objeto usuário
 * @returns {number} status http da operação
 * @description Cria um novo usuário
 */

const create = async userData => {
  try {
    // Criando nova instancia de usuário
    const newUser = new userModel(userData);

    // Validando nova instancia
    await newUser.validate();

    // Salvando usuário
    await newUser.save();
  } catch (error) {
    // caso ocorra algum erro, retorna a mensagem do erro.
    return Promise.reject(error.message);
  }

  // Retorna status 200
  return 200;
};

/**
 * Read
 * @param {string} userID - ID do usuário
 * @returns {object} Retorna um objeto de usuário
 * @description Consulta usuário pelo ID e retorna o usuário
 */

const read = async userID => {
  try {
    // Consultando usuário pelo ID, retorna um objeto.
    return await userModel.findById(userID);

  } catch (error) {
    // caso ocorra algum erro, retorna a mensagem do erro.
    return Promise.reject(error.message);
  }
};

/**
 * Read by E-mail
 * @param {string} email - E-mail do usuário
 * @returns {object} Retorna um objeto de usuário
 * @description Consulta usuário por e-mail e retorna um usuário
 */

const readByEmail = async email => {
  try {
    return await userModel.findOne({ email: email });
  } catch (error) {
    return Promise.reject(error.message);
  }
};

/**
 * Update
 * @param {string} userID - ID do usuário
 * @param {object} userData - Objeto de usuário
 * @description Atualiza um usuário atráves do ID
 */

const update = async (userID, userData) => {
  try {
    await userModel.findByIdAndUpdate(userID, userData);
  } catch (error) {
    return Promise.reject(error.message);
  }

  return 200;
};

/**
 * Remove
 * @param {string} userID - ID do usuário
 * @returns {number} Retorna status da operação
 * @description Remove um usuário do banco de dados pelo ID
 */

const remove = async userID => {
  try {
    await userModel.findByIdAndDelete(userID);
  } catch (error) {
    return Promise.reject(error.message);
  }

  return 200;
};

module.exports = {
  create,
  read,
  readByEmail,
  update,
  remove
};
