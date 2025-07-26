export interface SignupDTO {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  age?: number;
  occupation?: string;
}
