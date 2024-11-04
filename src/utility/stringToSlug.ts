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
