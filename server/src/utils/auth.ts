import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = (password: string)  => {
  return bcrypt.hashSync(password, 10);
}

// export const verifyPassword = (plain: string, hash: string) => bcrypt.compare(plain, hash);

export const generateToken = (payload: object)  => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  return jwt.sign(payload, secret, { expiresIn: '5min' });
}


export const verifyPassword = async (plain: string, hash: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(plain, hash);
  } catch (err) {
    console.error('Ошибка при сравнении паролей:', err);
    throw new Error('Password verification failed');
  }
};