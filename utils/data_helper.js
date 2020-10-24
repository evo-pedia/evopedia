// nookies
import { parseCookies } from 'nookies';

// token random gen hash
export function addUniqueHash() {
  const random = Math.random().toString(36).substring(2, 10);
  const result = random + random;

  return result;
}

// token hasher
export function hashToken(token) {
  const rawHash = addUniqueHash() + token + addUniqueHash();
  const hashed = rawHash.split('').reverse().join('').toUpperCase();

  return hashed;
}

// token decryptor
export function decryptToken(token) {
  const firstPhase = token.split('').reverse().join('');
  const secondPhase = firstPhase.slice(16);
  const thirdPhase = secondPhase.split('').reverse().join('');
  const fourthPhase = thirdPhase.slice(16);
  const fifthPhase = fourthPhase.split('').reverse().join('');
  const sixthPhase = fifthPhase.toLowerCase();

  return sixthPhase;
}

// get token
export function getToken(ctx) {
  const cookies = parseCookies(ctx);
  const { evopediaLoginSecure } = cookies;

  const token = decryptToken(evopediaLoginSecure);

  return token;
}

// get client token
export function getClientToken() {
  const cookies = parseCookies();
  const { evopediaLoginSecure } = cookies;

  const token = decryptToken(evopediaLoginSecure);

  return token;
}

// get data from cookies
export function getCookiesData(ctx) {
  const cookies = parseCookies(ctx);
  const { evopediaUsername, evopediaRole } = cookies;

  const struct = {
    evopediaUsername,
    evopediaRole,
  };

  return struct;
}

// post data
export async function postFetcher(url, body, token) {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Token ${token}` }),
    },
  };

  const fetchData = await fetch(url, options);
  const data = await fetchData.json();

  return data;
}

// get data
export async function getFetcher(url, token) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Token ${token}` }),
    },
  };

  const fetchData = await fetch(url, options);
  const data = await fetchData.json();

  return data;
}

// get username first char
export function getFirstCharacter(str) {
  return str[0];
}

// translate date from backend
export const convertDate = (date) => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const tanggal = new Date(date).toLocaleString('id-ID', dateOptions);
  const tanggalFormat = tanggal.replace('.', ':');

  return tanggalFormat;
};

// convert sociopreneur rank
export const convertRank = (num) => {
  if (num >= 25000000) {
    return 'Black Diamond Star';
  }

  if (num >= 3500000) {
    return 'Red Diamond Star';
  }

  if (num >= 500000) {
    return 'Diamond Star';
  }

  if (num >= 70000) {
    return 'Gold Star';
  }

  if (num >= 10000) {
    return 'Silver Star';
  }

  if (num >= 2500) {
    return 'Bronze Star';
  }

  if (num >= 500) {
    return 'Star Club';
  }

  if (num >= 100) {
    return 'Club Trainer';
  }

  if (num >= 10) {
    return 'New Community';
  }

  return 'Not Qualified';
};

// convert sociopreneur rank number
export const convertRankNum = (num) => {
  if (num >= 25000000) {
    return '9';
  }

  if (num >= 3500000) {
    return '8';
  }

  if (num >= 500000) {
    return '7';
  }

  if (num >= 70000) {
    return '6';
  }

  if (num >= 10000) {
    return '5';
  }

  if (num >= 2500) {
    return '4';
  }

  if (num >= 500) {
    return '3';
  }

  if (num >= 100) {
    return '2';
  }

  if (num >= 10) {
    return '1';
  }

  return '0';
};

// convert bonus name
export const convertBonusName = (str) => {
  if (str === 'bonus_sponsor') return 'Publisher';
  if (str === 'bonus_pairing') return 'Development';
  if (str === 'bonus_level') return 'Advertising';
  if (str === 'bonus_majesti') return 'Majesty';
  if (str === 'bonus_ecl') return 'Excel';

  return str;
};
