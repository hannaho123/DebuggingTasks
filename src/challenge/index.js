import {
  parseCatalog,
  findBookByIsbn,
  canMemberBorrow,
  checkoutBook,
  calculateTotalFees,
  getMemberInitials,
  members,
  catalogJson,
} from "./helpers.js";
  

  const catalog = parseCatalog(catalogJson);

  const jane = { ...members[0] };
  
  const book = findBookByIsbn(catalog, "9780143127741");
  
  console.log("Catalog size:", catalog.length);
  console.log("Selected book:", book?.title);
  console.log("Jane can borrow:", canMemberBorrow(jane));
  
  const result = checkoutBook(catalog, jane, "9780143127741");
  console.log("Checkout result:", result);
  
  const updated = findBookByIsbn(catalog, "9780143127741");
  console.log("Updated stock:", updated?.stock);
  console.log("Jane borrowedCount:", jane.borrowedCount);
  
  const fees = calculateTotalFees([{ amount: 2.5 }, { amount: "5" }]);
  console.log("Total fees:", fees);
  
  console.log("Jane initials:", getMemberInitials(jane));
  