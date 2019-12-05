const bcrypt = require("bcrypt");
const userController = require("../controllers/user");

const create = async (req, res) => {
  try {
    let userData = { ...req.body };
    userData.password = await encryptPassword(userData.password);
    const status = await userController.create(userData);
    res.sendStatus(status);
  } catch (message) {
    console.log(message)
    return res.status(500).send(message);
  }
};

const read = async (req, res) => {
  try {
    const userID = req.body._id;
    const userFromDB = await userController.read(userID);
    res.status(200).json(userFromDB);
  } catch (message) {
    return res.status(500).send(message);
  }
};

const update = async (req, res) => {
  try {
    const userData = { ...req.body };
    const userID = userData._id;
    const status = await userController.update(userID, userData);
    res.sendStatus(status);
  } catch (message) {
    return res.status(500).send(message);
  }
};

const remove = async (req, res) => {
  try {
    const userID = req.body._id;
    const status = await userController.remove(userID);
    res.sendStatus(status);
  } catch (message) {
    return res.status(500).send(message);
  }
};

const encryptPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  create,
  read,
  update,
  remove
};
