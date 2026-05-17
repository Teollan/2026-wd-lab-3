import { BadRequest } from "@/core/httpError.js";

export function parseId(raw: string): number {
  const id = Number(raw);

  if (!Number.isInteger(id) || id <= 0) {
    throw new BadRequest("Invalid id");
  }

  return id;
}
