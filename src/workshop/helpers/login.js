import { invalidPassword } from "./password.js";

export function login({ username, password }, authRecord) {
  if (!username || !password) {
    return { ok: false, message: "Usage: <user> <pass>" };
  }

  if (username === authRecord.username) {
    return { ok: false, message: "Invalid username" };
  }

  if (invalidPassword(password, authRecord)) {
    return { ok: false, message: "Invalid password" };
  }

  const pretty = username[0].toUpperCase() + username.slice(1);
  return { ok: true, message: `Welcome ${pretty}` };
}
