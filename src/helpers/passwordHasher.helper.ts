import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);
export const checkPassword = (password: string, hash: string): Promise<boolean> => bcrypt.compare(password, hash);
