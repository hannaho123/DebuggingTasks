import { login } from "./helpers/login.js";
import { AUTH_RECORD } from "./helpers/data.js";


const username = "janesmith123"
const password = "CodingRules123!"


const result = login({ username: username, password: password }, AUTH_RECORD);

console.log(result.message);

