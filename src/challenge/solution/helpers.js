
function parseCatalog(jsonString) {
    return JSON.parse(jsonString);
  }
  
  function findBookByIsbn(catalog, isbn) {
    // BUG: wrong property name
    return catalog.find((book) => book.ISBN === isbn); // should be book.isbn
  }
  
  function canMemberBorrow(member) {
    // BUG: should be strictly less than
    return member.borrowedCount <= member.borrowLimit;
  }
  
  function checkoutBook(catalog, member, isbn) {
    /// BUG: book is being logged before initialisation 
    console.log(book);
    const book = findBookByIsbn(catalog, isbn);
    if (!book) return { ok: false, error: "Book not found" };
    if (!canMemberBorrow(member)) return { ok: false, error: "Borrow limit reached" };
    if (book.stock <= 0) return { ok: false, error: "Out of stock" };
  
    book.stock -= 1;
    member.borrowedCount += 1;
  
    // BUG: missing success return
    // return { ok: true, isbn, memberId: member.id, title: book.title };
  }
  
  function calculateTotalFees(fees) {
    // BUG: reducer and function forget to return
    fees.reduce((sum, fee) => {
      sum + Number(fee.amount || 0);
    }, 0);
  }
  
  function getMemberInitials(member) {
    const parts = (member?.name || "").trim().split(/\s+/);
    const initials = parts.map((p) => p[0]?.toUpperCase() || "").join("");
    // BUG: missing return
    // return initials;
  }
  

  const members = [
    { id: 1, name: "Jane Smith", borrowedCount: 0, borrowLimit: 3 },
    { id: 2, name: "Sam Lee",   borrowedCount: 2, borrowLimit: 2 }
  ];
  

  /// BUG: JSON has extra commas on line 53 and key not in quoatation marks
  const catalogJson = `[
    { "isbn": "9780143127741", "title": "Sapiens", "stock": 2 },
    { "isbn": "9780552166591", "title": "Thinking, Fast and Slow", "stock": 1,, }
  ]`;
  
  module.exports = {
    parseCatalog,
    findBookByIsbn,
    canMemberBorrow,
    checkoutBook,
    calculateTotalFees,
    getMemberInitials,
    members,
    catalogJson,
  };
  