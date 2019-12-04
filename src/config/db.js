const { connect } = require("mongoose");

module.exports = async () => {
  try {
    console.log("Connecting to database...");
    await connect(process.env.DATABASEURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });
    console.log("DATABASE CONNECTED!");
  } catch (error) {
    console.error(error.message);
    return process.exit();
  }
};
