import { yupResolver } from '@primevue/forms/resolvers/yup'
import * as yup from 'yup'
import { Roles } from '@/shared/config/roles'

export const addUserFormResolver = yupResolver(
  yup.object({
    username: yup.string().trim().required('Username is required'),
    email: yup.string().trim().required('Email is required').email('Enter a valid email'),
    password: yup.string().required('Password is required').min(6, 'Minimum 6 characters'),
    role: yup
      .mixed<Roles>()
      .oneOf(Object.values(Roles), 'Select a valid role')
      .required('Role is required'),
  }),
)
