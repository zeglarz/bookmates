import { BACKEND_URL } from "../const";
const urlBook = `${BACKEND_URL}/book/`;

export const getBook = id => {
  //return...  fetch(url, {})
};

export const addBook = (book) => {
  const { isbn, title, authors, publishedYear, imageURL, description } = book;
  let authorsArr = authors.split(',');
  let newBook = { isbn, title, authors: authorsArr, publishedYear, imageURL, description };
  console.log(authorsArr);
  return fetch(urlBook, {
    method: 'POST',
    body: JSON.stringify(newBook),
    headers: {
        'Content-Type': 'application/json'
    },
  })
};

export const updateBook = id => {
  //  return fetch(url, {})
};

export const removeBook = id => {
  //  return fetch(url, {})
};