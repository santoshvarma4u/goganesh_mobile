import {sign} from 'react-native-pure-jwt';
import reactotron from 'reactotron-react-native';

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
    .then(token => {
      reactotron.log(token);
    })
    .catch(err => {
      console.log(err);
    });
};
