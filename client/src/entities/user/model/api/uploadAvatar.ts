import { apolloClient } from '@/shared/api/apollo'
import { UPLOAD_AVATAR } from '../graphql/UploadAvatar.graphql'
import type { UploadAvatarParams, UploadAvatarResponse } from '../types/profile.mutation'

export const uploadAvatar = async (file: File): Promise<string> => {
  try {
    const { data } = await apolloClient.mutate<UploadAvatarResponse, UploadAvatarParams>({
      mutation: UPLOAD_AVATAR,
      variables: { file },
    })

    if (!data) {
      throw new Error('No data returned from upload avatar')
    }

    return data.uploadAvatar
  } catch (error) {
    console.log(error)
    throw error
  }
}
