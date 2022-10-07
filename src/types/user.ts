export interface IUser {
  username: string;
  password: string;
}

export interface IGetUser {
  email: string;
  username: string;
}

export interface UpdateUserDto {
  email?: string;
  username?: string;
  password?: string;
}

export interface SignInUserDto {
  email: string;
  username: string;
  password: string;
}

export interface CreateUserDto {
  user: IGetUser | null;
  token: string | null;
}
