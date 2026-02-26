import { throwError, GraphQLErrorCode, HttpStatus } from "../../utils/errors.js";
import { UserDocument } from "../../models/User/user.types.js";
import { Collection } from "mongodb";

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

    if (emailExists) {
      throwError({
        message: "EMAIL_ALREADY_EXISTS",
        status: HttpStatus.BAD_REQUEST,
        code: GraphQLErrorCode.BAD_REQUEST
      });
    }
  }

  if (update.username && update.username !== existingUser.username) {
    const usernameExists = await users.findOne({
      username: update.username,
      _id: { $ne: objectId }
    });

    if (usernameExists) {
      throwError({
        message: "USERNAME_ALREADY_EXISTS",
        status: HttpStatus.BAD_REQUEST,
        code: GraphQLErrorCode.BAD_REQUEST
      });
    }
  }
}
