export interface UserData {
  id?: string;
  name: string;
  email: string;
  password: string;
  // Add other user fields as necessary
}

export interface UserModel {
  createUser(data: UserData): Promise<UserData>;
  findUserById(id: string): Promise<UserData | null>;
}
