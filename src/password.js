import crypto from "crypto";

export function derive(password, saltHex, iterations) {
  const salt =  Buffer.from(saltHex, "hex")
  return crypto.pbkdf2Sync(password, salt, iterations, 32, "sha256");
}


export function invalidPassword(password, stored) {
  const derived = derive(password, stored.saltHex, stored.iterations);
  const isInvalid = derived.toString("hex") !== stored.hashHex;
}
