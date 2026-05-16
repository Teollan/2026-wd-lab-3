export interface User {
  id: number
  email: string
  password: string
  username: string
  dateOfBirth: Date
  gender: string
  bio: string
  createdAt: Date
}

/** User as exposed over the API — never includes the password hash. */
export type PublicUser = Omit<User, 'password'>

export interface CreateUserInput {
  email: string
  password: string
  username: string
  dateOfBirth: string
  gender: string
  bio: string
}

export type UpdateUserInput = Partial<CreateUserInput>

export function toPublicUser(user: User): PublicUser {
  const { password: _password, ...rest } = user
  return rest
}
