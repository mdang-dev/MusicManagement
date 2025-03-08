import bcrypt from 'bcryptjs'

const salt = 10

const hashPassword = (password) => {
  return String(bcrypt.hashSync(password, salt))
}

const isMathPassword = async (password, storedPassword) => {
  return await bcrypt.compare(password, storedPassword);
}

export { hashPassword, isMathPassword };

