import { api } from '@/api/client'
import type { User } from '@/models/User'

interface ApiUser {
  id: number
  email: string
  username: string
  dateOfBirth: string
  gender: string
  bio: string
  createdAt: string
}

interface AuthResponse {
  token: string
  user: ApiUser
}

export interface SignUpInput {
  email: string
  password: string
  username: string
  dateOfBirth: string
  gender: string
  bio: string
}

function mapUser(u: ApiUser): User {
  return {
    ...u,
    password: '',
    dateOfBirth: new Date(u.dateOfBirth),
    createdAt: new Date(u.createdAt),
  }
}

export async function signIn(
  email: string,
  password: string,
): Promise<{ token: string; user: User }> {
  const { data } = await api.post<AuthResponse>('/auth/sign-in', { email, password })
  return { token: data.token, user: mapUser(data.user) }
}

export async function signUp(
  input: SignUpInput,
): Promise<{ token: string; user: User }> {
  const { data } = await api.post<AuthResponse>('/auth/sign-up', input)
  return { token: data.token, user: mapUser(data.user) }
}

export async function fetchMe(): Promise<User> {
  const { data } = await api.get<ApiUser>('/auth/me')
  return mapUser(data)
}
