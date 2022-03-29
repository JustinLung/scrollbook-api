const db = require('../models/db')
const helper = require('../models/helper')

const AuthorController = {
  async getAll() {
    const rows = await db.query('SELECT * FROM author')
    return {
      data: helper.emptyOrRows(rows),
    }
  },

  async create(author) {
    const rows = await db.query(
      `
        INSERT INTO author SET name = ?, surname = ?,
        initials = ?, date_of_birth = ?, created_at = ?, updated_at = ?
      `,
      prepareForInsert(author)
    )
    return {
      data: author,
      meta: {
        insertId: rows.insertId,
      },
    }
  },
}

module.exports = AuthorController

function prepareForInsert(author) {
  return [
    author.name,
    author.surname,
    author.initials,
    author.date_of_birth,
    author.created_at,
    author.updated_at,
  ]
}
