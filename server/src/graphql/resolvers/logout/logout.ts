import { Resolver } from '../../types/resolver.js'
import { internalServerError } from '../../../utils/errors/httpErrors.js'

export const logout: Resolver<unknown, boolean> = async (_, __, context) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    }

    context.res.clearCookie('token', cookieOptions)

    return true
  } catch (error) {
    internalServerError()
  }
}