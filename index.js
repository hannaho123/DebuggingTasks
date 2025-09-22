
export function startIndex(currentPage, totalPages, pageSize) {
    return (totalPages - 1) * pageSize;
  }
  

  export function isUserIdMatch(expectedId, input) {

    return input == expectedId;
  }

  export function readUserCity(jsonText) {
    const data = JSON.parse(jsonText);
    return data.address.city.toUpperCase();
  }
  