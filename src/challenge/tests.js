import {
  parseCatalog,
  findBookByIsbn,
  canMemberBorrow,
  checkoutBook,
  calculateTotalFees,
  getMemberInitials,
  catalogJson,
} from "./helpers.js";


let passes = 0, fails = 0;
function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}
function test(label, fn) {
  try {
    fn();
    console.log(`✅ ${label}`);
    passes++;
  } catch (e) {
    console.log(`❌ ${label} — ${e.message}`);
    fails++;
  }
}


let catalog;
test("[A1] Catalog parses", () => {
  catalog = parseCatalog(catalogJson);
  assert(Array.isArray(catalog), "Catalog should be an array.");
});
test("[A2] Catalog length", () => {
  assert(catalog.length === 2, "Catalog should contain 2 books.");
});


let bookOne;
test("[B] Find 'Book One' by ISBN", () => {
  bookOne = findBookByIsbn(catalog, "9780143127741");
  assert(bookOne && bookOne.title === "Sapiens",
    "Should find 'Book One' by exact ISBN.");
});

// C) Borrow rule
test("[C1] Jane can borrow", () => {
  const jane = { id: 1, name: "Jane Smith", borrowedCount: 0, borrowLimit: 3 };
  assert(canMemberBorrow(jane) === true, "Jane should be allowed to borrow.");
});
test("[C2] Sam cannot borrow", () => {
  const sam = { id: 2, name: "Sam Lee", borrowedCount: 2, borrowLimit: 2 };
  assert(canMemberBorrow(sam) === false, "Sam should NOT be allowed to borrow.");
});

// D) Checkout flow
test("[D] Checkout updates stock and counts", () => {
  const jane = { id: 1, name: "Jane Smith", borrowedCount: 0, borrowLimit: 3 };
  const stockBefore = bookOne.stock;
  const res = checkoutBook(catalog, jane, "9780143127741");
  assert(res && res.ok === true, "Checkout should return a success result.");
  assert(findBookByIsbn(catalog, "9780143127741").stock === stockBefore - 1,
    "Stock should decrement by 1.");
  assert(jane.borrowedCount === 1, "Jane's borrowedCount should increment.");
});

// E) Fees total
test("[E] Total fees is 7.5", () => {
  const total = calculateTotalFees([{ amount: 2.5 }, { amount: "5" }]);
  assert(total === 7.5, "Total fees should equal 7.5.");
});

// F) Initials
test("[F] Initials 'JS'", () => {
  const jane = { id: 1, name: "Jane Smith", borrowedCount: 0, borrowLimit: 3 };
  assert(getMemberInitials(jane) === "JS", "Initials should be 'JS'.");
});

const summary = `${passes} passed, ${fails} failed`;
console.log(fails ? `❌ ${summary}` : `✅ ${summary}`);
process.exitCode = fails ? 1 : 0;
