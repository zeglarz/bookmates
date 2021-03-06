const connection = require('../connection');


const tableName = 'books';

const insertBook = (book) => {
    const { isbn, title, authors, publishedYear, imageurl, description  } = book;
    console.log(authors);
    const sql = `INSERT INTO ${tableName} (id, isbn, title, authors, publishedYear) VALUES (
           DEFAULT, ${isbn}, '${title}', ARRAY [${authors.map(s => `'${s.trim()}'`)}], ${publishedYear}
        )
    `;
    console.log(sql);
    return connection.query(sql);
};

const getBook = (id) => {
    const sql = `
        SELECT * FROM ${tableName} WHERE user_book_id = ${id};
    `;
    return connection.query(sql).then(response => response.rows);
};

const getAllBooks = () => {
    const sql = `
        SELECT * FROM ${tableName};
    `;
    return connection.query(sql).then(response => response.rows);
}

module.exports = {
    insertBook,
    getBook,
    getAllBooks
};