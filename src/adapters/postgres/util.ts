export function rowToObject (obj: {[key: string]: any}) {
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      [snakeToCamelCase(key)]: obj[key]
    }),
    {}
  )
}

function snakeToCamelCase (input: string) {
  const [first, ...parts] = input.split('_')
  const titleCased = parts.map(s => {
    const [init, ...rest] = Array.from(s)
    return [init.toUpperCase(), ...rest].join('')
  })
  return [first, ...titleCased].join('')
}
