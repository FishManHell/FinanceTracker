import cloudinary from '#cloudinary'
import { Resolver } from '#graphql/types/resolver.js'
import { UploadAvatarArgs } from '#models/Upload/upload.input.js'
import { UploadAvatarResponse } from '#models/Upload/upload.output.js'
import { internalServerError } from '#utils/errors/httpErrors.js'
import { requireUser } from '#utils/auth.js'

export const uploadAvatar: Resolver<UploadAvatarArgs, UploadAvatarResponse> = async (
  _,
  { file },
  context
) => {
  requireUser(context.user)

  try {
    const upload = await file
    const { createReadStream } = upload

    const url = await new Promise<string>((resolve, reject: (reason: Error) => void) => {
      const readStream = createReadStream()

      readStream.on('error', (error) => {
        reject(new Error(String(error)))
      })

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'avatars' },
        (error, result) => {
          if (error) {
            reject(new Error('Cloudinary upload failed'))
            return
          }

          if (!result?.secure_url) {
            reject(new Error('Avatar URL was not returned'))
            return
          }

          resolve(result.secure_url)
        },
      )

      readStream.pipe(uploadStream)
    })

    return url
  } catch (error) {
    console.error('Error in uploadAvatar', error)
    internalServerError()
  }
}