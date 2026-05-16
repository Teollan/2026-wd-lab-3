export interface User {
  id: number
  email: string
  password: string // Stop screaming, it's a local storage app!
  username: string
  dateOfBirth: Date
  gender: string
  bio: string
  createdAt: Date
}

export interface UserDto {
  id: number
  email: string
  password: string
  username: string
  dateOfBirth: string
  gender: string
  bio: string
  createdAt: string
}

export const mapUserDtoToUser = (dto: UserDto): User => ({
  ...dto,
  createdAt: new Date(dto.createdAt),
  dateOfBirth: new Date(dto.dateOfBirth),
})
