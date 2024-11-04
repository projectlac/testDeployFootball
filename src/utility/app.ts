export function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export function capitalizeAllFirstLetter(str: string) {
  const words = str.split(' ')
  const string = words
    .map((word) => {
      return word[0]?.toUpperCase() + word.substring(1)
    })
    .join(' ')
  return string
}
