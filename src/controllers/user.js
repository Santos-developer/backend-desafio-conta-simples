const userModel = require("../models/user");

const create = async userData => {
  try {
    const newUser = new userModel(userData);

    await newUser.validate();
    await newUser.save();
  } catch (error) {
    return Promise.reject(error.message);
  }

  return 200;
};

const read = async userID => {
  try {
    return await userModel.findById(userID);
  } catch (error) {
    return Promise.reject(error.message);
  }
};

const readByEmail = async email => {
  try {
    return await userModel.findOne({ email: email });
  } catch (error) {
    return Promise.reject(error.message);
  }
};

const update = async (userID, userData) => {
  try {
    await userModel.findByIdAndUpdate(userID, userData);
  } catch (error) {
    return Promise.reject(error.message);
  }

  return 200;
};

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
