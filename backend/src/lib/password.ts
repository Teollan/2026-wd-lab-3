import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

const KEY_LEN = 64;
const SALT_LEN = 16;

export async function hashPassword(plain: string): Promise<string> {
  const salt = randomBytes(SALT_LEN).toString("hex");
  const derived = (await scryptAsync(plain, salt, KEY_LEN)) as Buffer;

  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  const [salt, keyHex] = stored.split(":");

  if (!salt || !keyHex) {
    return false;
  }

  const derived = (await scryptAsync(plain, salt, KEY_LEN)) as Buffer;
  const keyBuf = Buffer.from(keyHex, "hex");

  return keyBuf.length === derived.length && timingSafeEqual(keyBuf, derived);
}
