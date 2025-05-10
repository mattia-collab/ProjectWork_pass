const charset = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  symbol: '!#$%&?@()*+-;<=>{[]}/,_',
}

function checkEntropy_charset(password) {
  if (!password.length) return 0

  // Count the total sets of characters used.
  const count = {
    lower: false,
    upper: false,
    number: false,
    symbol: false,
  }

  for (const char of password) {
    if (charset['lower'].includes(char)) {
      count['lower'] = true
    } else if (charset['upper'].includes(char)) {
      count['upper'] = true
    } else if (charset['number'].includes(char)) {
      count['number'] = true
    } else {
      count['symbol'] = true
    }
  }

  // Calculates N.
  let N = 1
  N += 26 * count['lower']
  N += 26 * count['upper']
  N += 10 * count['number']
  N += 30 * count['symbol']

  // Calculates the total entropy.
  return password.length * Math.log2(N)
}

function checkEntropy_frequency(password) {
  if (!password.length) return 0

  // Count the frequency of each character.
  const frequencies = {}
  for (const char of password) {
    frequencies[char] = (frequencies[char] || 0) + 1
  }

  // Measure the length of the password.
  const len = password.length
  let entropy = 0

  for (const char in frequencies) {
    const frequency = frequencies[char] / len
    entropy -= frequency * Math.log2(frequency)
  }

  // Total entropy (in bits).
  return entropy * len
}

function base85(hexstring) {
  const B85 = charset.lower + charset.upper + charset.number + charset.symbol
  let result = ''

  for (let i = 0; i < hexstring.length; i += 8) {
    // Selects the next 4 bytes and converts them to int32
    bytes = hexstring.substring(i, i + 8).padEnd(8, '0')
    bytes = parseInt(bytes, 16)
    // Converts the int32 to a base85 string
    while (bytes > 0) {
      result += B85[bytes % 85]
      bytes = Math.floor(bytes / 85)
    }
  }

  return result
}

async function hash(algorithm, string) {
  const buffer = new TextEncoder().encode(string)

  // Hashes the given string with the given algorithm.
  const digest = await crypto.subtle.digest(algorithm, buffer)
  const bytes = Array.from(new Uint8Array(digest))

  // Maps each byte to a string representation in hex.
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function checkPwned(password) {
  const sha1 = await hash('SHA-1', password)

  const prefix = sha1.substring(0, 5).toUpperCase()
  const suffix = sha1.substring(5).toUpperCase()

  // Query to the havibeenpwned API.
  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`)
  const text = await response.text()

  // Split the results in suffix:count.
  const hashes = text.split('\n').map((line) => line.split(':'))

  for (const [hashSuffix, count] of hashes) {
    if (hashSuffix.trim() === suffix) {
      // Return number of times it appeared.
      return parseInt(count, 10)
    }
  }
  // Not found.
  return 0
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch((error) => {
    console.error('Unable to access the clipboard.', error)
  })
}

function randInt(min, max) {
  random = crypto.getRandomValues(new Uint32Array(1))[0]
  return min + (random) % (max - min)
}

function randChoice(collection) {
  index = randInt(0, collection.length)
  return collection[index]
}
