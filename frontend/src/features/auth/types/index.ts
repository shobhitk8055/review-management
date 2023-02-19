export type AuthUser = {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  bio: string;
  loginRole: string;
  role: 'admin' | 'user';
};

export type Token = {
  token: string;
  expires: string;
};

export type Tokens = {
  access: Token;
  refresh: Token;
};

export type UserResponse = {
  tokens: Tokens;
  user: AuthUser;
};
