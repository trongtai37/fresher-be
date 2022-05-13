import * as bcrypt from 'bcrypt';

export const encryptPassword = (password: string) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};

export const isPasswordMatch = (password: string, hash: string) => {
  const isMatch = bcrypt.compareSync(password, hash);
  return isMatch;
};
