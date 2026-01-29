import { FileUpload } from 'graphql-upload/GraphQLUpload.mjs'

export interface UploadAvatarArgs {
  file: Promise<FileUpload>
}