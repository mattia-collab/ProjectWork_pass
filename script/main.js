// Funzione per calcolare l'entropia in bit di una stringa
// https://github.com/dluppoli/EntropiaPassword/blob/main/README.md
// by Filippo Domeniconi
function checkEntropy(password) {
  // Definisci l'alfabeto disponibile per la password
  const alfabeto = {
    lowercase: 26, // Lettere minuscole
    uppercase: 26, // Lettere maiuscole
    numbers: 10, // Numeri
    special: 30, // Caratteri speciali (una stima)
  };

  // Calcola la lunghezza della password
  const lunghezza = password.length;

  // Calcola la dimensione dell'alfabeto (N) basato sulla password
  let alphabetSize = 0;
  // Utilizza regex per testare la presenza di set di caratteri
  if (/[a-z]/.test(password)) alphabetSize += alfabeto.lowercase;
  if (/[A-Z]/.test(password)) alphabetSize += alfabeto.uppercase;
  if (/[0-9]/.test(password)) alphabetSize += alfabeto.numbers;
  if (/[^a-zA-Z0-9]/.test(password)) alphabetSize += alfabeto.special;

  // Calcola l'entropia in bit
  const entropia = Math.log2(Math.pow(alphabetSize, lunghezza));
  return entropia;
}

// Funzione per calcolare l'entropia in bit di una stringa tramide
// l'analisi delle frequenze di Shannon
// https://en.wikipedia.org/wiki/Entropy_(information_theory)
// by Andrea Croci Angelini
function checkShannonEntropy(password) {
  if (!password.length) return 0;

  // Count the frequency of each unique character.
  const frequencies = {};
  for (const char of password) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }

  // Measure the length of the password.
  const len = password.length;

  // Calculates
  let entropy = 0;
  for (const char in frequencies) {
    const frequency = frequencies[char] / len;
    entropy -= frequency * Math.log2(frequency);
  }

  // Total entropy (in bits).
  return entropy * len;
}

// Funzione per alfabetizzare una stringa di byte (hex string) utilizzando
// un set di 85 caratteri stampabili differenti.
// https://en.wikipedia.org/wiki/Ascii85
// by Andrea Croci Angelini
function base85(hexstring) {
  // Set of printable type-able characters
  const set = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "!#$%&?@()*+-;<=>{[]}/,_",
  };
  // Table of B85 characters.
  const B85 = set.lower + set.upper + set.number + set.symbol;

  let result = "";

  for (let i = 0; i < hexstring.length; i += 8) {
    // Selects the next 4 bytes and converts them to int32
    bytes = hexstring.substring(i, i + 8).padEnd(8, "0");
    bytes = parseInt(bytes, 16);
    // Converts the int32 to a base85 string
    while (bytes > 0) {
      result += B85[bytes % 85];
      bytes = Math.floor(bytes / 85);
    }
  }

  return result;
}

// Funzione helper per generare l'hash di una stringa dato un algoritmo
// algorithm: SHA-1, SHA-256, SHA-384, SHA-512
// by Andrea Croci Angelini
async function hash(algorithm, string) {
  // Converts the string to a format that can be hashed
  const buffer = new TextEncoder().encode(string);

  // Hashes the given string with the given algorithm.
  const digest = await crypto.subtle.digest(algorithm, buffer);
  const bytes = Array.from(new Uint8Array(digest));

  // Maps each byte to a string representation in hex.
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Funzione per verificare se la password è stata compromessa
// by Filippo Domeniconi
async function checkPasswordCompromised(password) {
  // SHA-1 della password
  const digest = (await hash("SHA-1", password)).toUpperCase();
  const prefix = digest.substring(0, 5); // Primi 5 caratteri
  const suffix = digest.substring(5); // Resto dell'hash

  // Fai una richiesta all'API di Have I Been Pwned
  const response = await fetch(
    `https://api.pwnedpasswords.com/range/${prefix}`
  );

  if (response.ok) {
    const data = await response.text();
    const lines = data.split("\n"); // Dividi i risultati in linee

    // Verifica se il suffisso dell'hash è presente tra i risultati
    for (let line of lines) {
      const [compromisedHash, count] = line.split(":");
      if (compromisedHash === suffix) {
        return parseInt(count); // La password è stata compromessa
      }
    }
    return 0; // La password non è stata compromessa
  } else {
    return null; // Errore di connessione con haveibeenpwned
  }
}

// Funzioni helper per la generazione di numeri casuali utilizzando una
// libreria sicura a livello crittografico.
// by Andrea Croci Angelini
function randInt(min, max) {
  random = crypto.getRandomValues(new Uint32Array(1))[0];
  return min + (random % (max - min));
}
// Funzione helper per la scelta di un elemento casuale da una collezione
function randChoice(collection) {
  index = randInt(0, collection.length);
  return collection[index];
}
// Funzione per rimescolare gli elementi di una collezione
function randShuffle(collection) {
  for (let i = 0; i < collection.length; i++) {
    let j = randInt(0, collection.length);
    let temp = collection[i];
    collection[i] = collection[j];
    collection[j] = temp;
  }
}

// Funzione helper per la copia di contenuti testuali
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch((error) => {
    console.error("Unable to access the clipboard.", error);
  });
}
