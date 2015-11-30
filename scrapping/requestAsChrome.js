var httpRequest = require('request-promise')

module.exports = function requestAsChrome(url) {
  return httpRequest({
    uri: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Upgrade-Insecure-Requests': '1',
      'Accept-Language': 'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
      'Cookie': 'lastSeen=0',
    },
  })
}
