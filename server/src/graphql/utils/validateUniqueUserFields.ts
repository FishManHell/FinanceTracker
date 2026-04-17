import { UserDocument } from "#models/User/user.types.js";
import { Collection } from "mongodb";
import { badRequest } from '#utils/errors/httpErrors.js'

export async function validateUniqueUserFields(
  users: Collection<UserDocument>,
  existingUser: UserDocument,
  update: Partial<UserDocument>
) {
  const objectId = existingUser._id;

  if (update.email && update.email !== existingUser.email) {
    const emailExists = await users.findOne({
      email: update.email,
      _id: { $ne: objectId }
    });

    if (emailExists) badRequest("EMAIL_ALREADY_EXISTS")
  }

  if (update.username && update.username !== existingUser.username) {
    const usernameExists = await users.findOne({
      username: update.username,
      _id: { $ne: objectId }
    });

    if (usernameExists) badRequest("USERNAME_ALREADY_EXISTS")
  }
}
