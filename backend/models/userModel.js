import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (sentPassword) {
  return await bcrypt.compare(sentPassword, this.password);
};

// TODO: find out the difference bettween this 3 functions:
// userSchema.pre("save", function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password =  bcrypt.hashSync(this.password, 10);
//   next()
// });
// and

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
// const salt = await bcrypt.genSalt(10)
// this.password = await bcrypt.hash(this.password, salt)
//   this.password =  bcrypt.hashSync(this.password, 10);
// });
// and

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("Inside pre save: password not modified: ", this.password);
    next();
  }
  console.log("Inside pre save: password  modified: ", this.password);

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Don't use this synchronous version as the password will always be modified and saved 
  // even when left blank in the frontend:
  // this.password =  bcrypt.hashSync(this.password, 10);
  console.log(
    "Inside pre save: password  modified: After salting: ",
    this.password
  );
});

const User = mongoose.model("User", userSchema);

export default User;
