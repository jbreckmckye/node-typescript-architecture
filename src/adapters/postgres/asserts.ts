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
