import url from 'url'

export function isValidURL(rawURL) {
  if (typeof rawURL !== 'string')
    return false
  const parsedURL = url.parse(rawURL)
  const hasProtocol = Boolean((parsedURL.protocol || '').length)
  const hasHost = Boolean((parsedURL.host || '').length)
  return hasProtocol && hasHost
}
