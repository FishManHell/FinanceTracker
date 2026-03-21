import { apolloClient } from '@/shared/api/apollo'
import { UPDATE_PROFILE } from '../graphql/UpdateProfile.graphql'
import type {
  UpdateProfileInput,
  UpdateProfileParams,
  UpdateProfileResponse,
} from '../types/profile.mutation'
import { stripTypename } from '@/shared/lib/graphql'

export const updateProfile = async (params: UpdateProfileInput) => {
  try {
    const { data } = await apolloClient.mutate<UpdateProfileResponse, UpdateProfileParams>({
      mutation: UPDATE_PROFILE,
      variables: { params },
    })

    if (!data) {
      throw new Error('Failed to update profile')
    }

    return stripTypename(data.updateProfile)
  } catch (error) {
    console.log(error)
    throw error
  }
}
