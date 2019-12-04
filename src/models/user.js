const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    admin: { type: Schema.Types.Boolean, default: false },
    name: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String, required: true },
    picture: { type: Schema.Types.String },
    digit: { type: Schema.Types.Number, required: true },
    agency: { type: Schema.Types.Number, required: true },
    total: { type: Schema.Types.Number, required: true, default: 0 },
    rentability: { type: Schema.Types.Number, required: true, default: 0 },
    entries: { type: Schema.Types.Number, required: true, default: 0 },
    transactions: { type: Schema.Types.Array, required: true }
  },
  { timestamps: true }
);

module.exports = model("user", userSchema);
