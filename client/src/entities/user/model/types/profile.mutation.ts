import type { UserDTO } from '@/shared/types'

export interface UpdateProfileInput {
  username: string
  avatar: string | null
}

export interface UpdateProfileParams {
  params: UpdateProfileInput
}

export interface UpdateProfileResponse {
  updateProfile: UserDTO
}

export interface UploadAvatarResponse {
  uploadAvatar: string
}

export interface UploadAvatarParams {
  file: File
}
