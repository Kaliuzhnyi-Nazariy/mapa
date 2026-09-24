export interface ReturnUser {
  name: string;
  email: string;
}

export interface ReturnUserAuth {
  name: string;
  token: string;
}

export interface SignInUser {
  email: string;
  password: string;
}

export interface SignUpUser extends SignInUser {
  name: string;
}
