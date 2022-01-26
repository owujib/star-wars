class Helpers {
  /**
   *
   * @param {Number} height
   * @returns {string} value of string describing height in feet and inches
   */
  static heightToFeetAndInches(height) {
    let realFeet = (height * 0.3937) / 12;
    let feet = Math.floor(realFeet);
    let inches = Math.floor((realFeet - feet) * 12);

    return `${feet}ft and ${inches}inches.`;
  }

  /**
   *
   * @param {Number} value
   * @returns number or null
   */
  static getResourceID(value) {
 
    if (value) {
      let Idarr = value
        .split('/')
       console.log(Idarr);
      let v = Idarr.filter((element) => (element !== '' ? true : false))
        .at(-1);
      console.lof(Idarr)
//       return parseInt(Id);
      
//         let Id = value
//         .split('/')
//         .filter((element) => (element !== '' ? true : false))
//         .at(-1);
//       return parseInt(Id);
    }
//     console.log(Id);

    return null;
  }

  /**
   *
   * @param {Object} data
   * @param {Number} page
   * @param {Number} limit
   * @returns `{modelCount, content, totalPages, currentPage}`
   */
  static pageData(data, page, limit = 5) {
    const { count: modelCount, rows: content } = data;
    const currentPage = page ? 0 + page : 0;
    const totalPages = Math.ceil(modelCount / limit);

    return { modelCount, content, totalPages, currentPage };
  }

  /**
   *
   * @param {Number} page
   * @param {Number} size
   * @returns `{limit, offset}`
   */
  static pagination(page, size = 5) {
    let limit = size;
    let offset = page ? (page - 1) * limit : 0;

    return { limit: parseInt(limit), offset: parseInt(offset) };
  }
}

module.exports = Helpers;
