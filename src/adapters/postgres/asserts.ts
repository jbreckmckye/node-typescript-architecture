export function justOne <T> (rows: T[]): T {
  switch (rows.length) {
    case 0:
      throw new Error('Query should have returned 1 row, returned 0')
    case 1:
      return rows[0]
    default:
      throw new Error('Query should have returned 1 row, returned ' + rows.length)
  }
}

export function oneOrNone <T> (rows: T[]): T | null {
  switch (rows.length) {
    case 0:
      return null
    case 1:
      return rows[0]
    default:
      throw new Error('Query should have returned 1 or 0 rows, returned ' + rows.length)
  }
}
