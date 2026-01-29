import { ObjectId } from 'mongodb'
import cloudinary from '../../../cloudinary.js'
import { Resolver } from '../../types/resolver.js'
import { UploadAvatarArgs } from '../../../models/Upload/upload.input.js'
import { UploadAvatarResponse } from '../../../models/Upload/upload.output.js'

export const uploadAvatar: Resolver<UploadAvatarArgs, UploadAvatarResponse> = async (
  _,
  { file },
  context
) => {
  const upload = await file;
  const { createReadStream } = upload;

  const { db, user } = context;

  const url = await new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "avatars" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result?.secure_url as string);
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