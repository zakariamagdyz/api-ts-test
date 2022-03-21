import { DocumentDefinition } from "mongoose";
import User, { UserDocument, UserInput } from "../models/user.model";

export async function createUser(
  input: DocumentDefinition<UserInput>
): Promise<UserDocument> {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}
