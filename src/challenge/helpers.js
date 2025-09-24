
export function parseCatalog(jsonString) {
    return JSON.parse(jsonString);
  }
  
  export function findBookByIsbn(catalog, isbn) {
    return catalog.find((book) => book.ISBN === isbn); 
  }
  
  export function canMemberBorrow(member) {
    return member.borrowedCount <= member.borrowLimit;
  }
  
  export function checkoutBook(catalog, member, isbn) {
    console.log(book);
    const book = findBookByIsbn(catalog, isbn);
    if (!book) return { ok: false, error: "Book not found" };
    if (!canMemberBorrow(member)) return { ok: false, error: "Borrow limit reached" };
    if (book.stock <= 0) return { ok: false, error: "Out of stock" };
  
    book.stock -= 1;
    member.borrowedCount += 1;
  }
  
  export function calculateTotalFees(fees) {
    fees.reduce((sum, fee) => {
      sum + Number(fee.amount || 0);
    }, 0);
  }
  
  export function getMemberInitials(member) {
    const parts = (member?.name || "").trim().split(/\s+/);
    const initials = parts.map((p) => p[0]?.toUpperCase() || "").join("");

  }
  

  export const members = [
    { id: 1, name: "Jane Smith", borrowedCount: 0, borrowLimit: 3 },
    { id: 2, name: "Sam Lee", borrowedCount: 2, borrowLimit: 2 },
  ];
  
  export const catalogJson = `[
    { "isbn": "9780143127741", "title": "Sapiens", "stock": 2 },
    {  isbn: "9780552166591","title": "Thinking, Fast and Slow", "stock": 1,,}
  ]`;
  