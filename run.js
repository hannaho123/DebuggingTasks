import { startIndex, isUserIdMatch, readUserCity } from "./index.js";

function demoPagination() {
  const totalPages = 20;
  const currentPage = 3;
  const size = 10;
  const idx = startIndex(currentPage, totalPages, size);
  console.log("[pagination] expected 20, got:", idx); // should be (3-1)*10 = 20
}

function demoEquality() {
  const expected = 0;
  const input = ""; // "" == 0 is true with loose equality 😬
  console.log("[equality] match?", isUserIdMatch(expected, input));
}

function demoJson() {
  // Intentionally “almost JSON” to trigger/inspect an error
  const s = '{ "name": "Alice", "address": { "city": "Leeds", } }'; // trailing comma
  console.log("[json] city:", readUserCity(s));
}

demoPagination();
demoEquality();
demoJson();
