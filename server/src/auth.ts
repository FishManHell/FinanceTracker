// utils/auth.js
import bcrypt from 'bcryptjs';

const verifyPassword = (plain: string, hash: string) => bcrypt.compare(plain, hash);

export default verifyPassword;