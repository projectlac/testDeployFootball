export function stringToSlug(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export function renderPrefixLang(lang: string) {
  if (lang === 'en') return '/'
  return '/vi/'
}

export function checkLangVi(str: string) {
  return /^\/vi(\/|\/[\w-]+\/?)?$/.test(str)
}

export function parsePath(str: string) {
  const regex = /^\/([a-z]{2})(\/[a-z]+.*)?$/
  const match = str.match(regex)

  if (match) {
    const lang = match[1]
    const pathname = match[2] ? match[2].slice(1) : '' // Loại bỏ dấu '/' ở đầu pathname nếu có
    return { lang, pathname: `/${pathname}` }
  }

  return { lang: '/', pathname: str }
}
