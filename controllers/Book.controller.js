const db = require('./../models/db');
const helper = require("./../models/helper");

const BookController = {
  async getAll() {
    const rows = await db.query('SELECT * FROM book')
    return {
      data: helper.emptyOrRows(rows)
    }
  },

  async create(book) {
    const rows = await db.query(`
    INSERT INTO book SET name = ?, author_id = ?,
    book_cover = ?, total_readers = ?, read_time: ?,
    synopsis = ?, release_date = ?, category_id = ?,
    rating = ?`,
    prepareForInsert(book)
    )
    return {
      data: book,
      meta: {
        insertId: rows.insertId
      }
    }
  }
}

module.exports = BookController

function prepareForInsert(book) {
  return [
    book.name,
    book.author_id,
    book.book_cover,
    book.total_readers,
    book.read_time,
    book.synopsis,
    book.release_date,
    book.category_id,
    book.rating
  ]
}