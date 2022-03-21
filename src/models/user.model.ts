import mongoose, { HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

export interface UserInput {
  email: string;
  password: string;
  name: string;
}

export interface UserDocument extends UserInput {
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

userSchema.pre(
  "save",
  async function (this: HydratedDocument<UserDocument>, next) {
    if (!this.isModified("password")) return next();

    const salt = 12;

    this.password = await bcrypt.hash(this.password, salt);

    next();
  }
);

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as HydratedDocument<UserDocument>;

  return await bcrypt.compare(candidatePassword, user.password);
};

export default mongoose.model("User", userSchema);
