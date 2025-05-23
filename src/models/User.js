import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export default Mongoose.model("User", UserSchema);
