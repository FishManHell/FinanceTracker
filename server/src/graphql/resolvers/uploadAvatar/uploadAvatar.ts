import { ObjectId } from 'mongodb'
import cloudinary from '../../../cloudinary.js'
import { GraphQLContext } from '../../../graphql/types/context.js'

export const uploadAvatar = async (
  _: undefined,
  { file }: any,
  context: GraphQLContext
) => {
  const upload = await file;
  const { createReadStream } = upload;

  const { db, user } = context;

  const url = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "avatars" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url);
      }
    );
    createReadStream().pipe(stream);
  });

  await db.collection("users").updateOne(
    { _id: new ObjectId(user?.id) },
    { $set: { avatar: url } }
  );

  return url;
}