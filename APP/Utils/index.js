import {sign} from 'react-native-pure-jwt';

const secret =
  'nhzS/b+vwaSOK3CuUOWp/lv1lRHNw4MjaK7jFspkIp5v6U0dEN0if2OoZ1calFJxw+bW4ahTRJlgZXuYUcDtgoNxRmYsyH0OxVrYwH6xVqtajTo5OtPwruvMy0TSx3EmIsB+VINRyL+ATWkPzll/N2TxIihR9GqFH8iTdKjTA0VChv4DAQnbgpvQeYG2Qq3OyR+zRh3wxPs7Kr2SGYSXJReclfIH6u7Rp2wDbiR2qqaKO/Wi6EqAuLqEFzSIgxRo2VN2SgkqVe8YkuIYZ4c7aYP+FgCmGKTlW61OxNF18lLskMWj/KUP5D49fZKnjCr3uQL6FyAlbis7Tn7BKm7NsQ==';

export const generateUnsignedJwt = async () => {
  sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 2, // 2 minutes from now
      iss: 'mobileapp@fgpunt.com',
    },
    secret,
    {
      algorithm: 'HS256',
    },
  )
    .then(token => {})
    .catch(err => {
      console.log(err);
    });
};

export function removeHttpOrWww(url) {
  if (url.startsWith('https://')) {
    const https = 'https://';
    return url.slice(https.length);
  }
  if (url.startsWith('http://')) {
    const http = 'http://';
    return url.slice(http.length);
  }
  if (url.startsWith('www.')) {
    const www = 'www.';
    return url.slice(www.length);
  }
  return url;
}

export function convertSecondsToHHMMSS(seconds) {
  const secNum = parseInt(seconds, 10); // don't forget the second param
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor((secNum - hours * 3600) / 60);
  const second = secNum - hours * 3600 - minutes * 60;
  let final = '';
  if (hours > 0) {
    final += `${hours}hrs`;
  }
  if (minutes > 0) {
    final += ` ${minutes} mins`;
  }
  if (second > 0) {
    final += ` ${second} sec`;
  }
  return final;
}
