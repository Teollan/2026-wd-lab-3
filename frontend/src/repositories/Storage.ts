const STORAGE_KEYS = {
  AUTH_USER_ID: 'auth_user_id',
  USERS: 'users',
  POSTS: 'posts',
  COMMENTS: 'comments',
  ID_COUNTER: 'id_counter',
} as const

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]

export abstract class Storage {
  static readonly keys = STORAGE_KEYS

  static getItem(key: StorageKey): string | null {
    return localStorage.getItem(key)
  }

  static getObject<T>(key: StorageKey): T | null {
    const raw = this.getItem(key)

    if (!raw) {
      return null
    }

    return JSON.parse(raw)
  }

  static setItem(key: StorageKey, value: string) {
    localStorage.setItem(key, value)
  }

  static setObject<T>(key: StorageKey, value: T) {
    this.setItem(key, JSON.stringify(value))
  }

  static removeItem(key: StorageKey) {
    localStorage.removeItem(key)
  }

  static nextId(): number {
    const current = parseInt(this.getItem(this.keys.ID_COUNTER) ?? '0')
    const next = current + 1

    this.setItem(this.keys.ID_COUNTER, next.toString())

    return next
  }
}
