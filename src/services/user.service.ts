import { DocumentDefinition } from "mongoose";
import User, { UserDocument, UserInput } from "../models/user.model";
import { omitFileds } from "../utils/utilities";

import { getAll, getOne, updateOne, deleteOne } from "../utils/factoryService";

/////////////////////////////////////////////
// Create a new User
//////////////////////////////////////
export async function createUser(
  input: DocumentDefinition<UserInput>
): Promise<UserDocument> {
  try {
    const user = await User.create(input);
    return omitFileds(JSON.stringify(user), ["password"]);
  } catch (e: any) {
    throw new Error(e);
  }
}

/////////////////////////////////////////////
// Validate User credentials
//////////////////////////////////////

export async function validateUserCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return false;
  }

  return omitFileds(JSON.stringify(user), ["password"]);
}
/////////////////////////////////////////////
// Get all users
//////////////////////////////////////

export const getAllUsres = getAll(User);

/////////////////////////////////////////////
// get a  User
//////////////////////////////////////
export const getAUser = getOne(User);

/////////////////////////////////////////////
//  Update user data
//////////////////////////////////////
export const updateUserData = updateOne(User);

/////////////////////////////////////////////
// Delete a  User
//////////////////////////////////////
export const deleteAUser = deleteOne(User);
