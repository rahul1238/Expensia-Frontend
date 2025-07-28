export interface LoginDTO {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupDTO {
  username?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phoneNumber?: string;
  age?: number;
  occupation?: string;
  rememberMe?: boolean;
}
