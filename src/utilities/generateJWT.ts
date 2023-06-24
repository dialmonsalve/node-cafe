import jwt from 'jsonwebtoken'

const generateJWT = (uid: string) => {

  return new Promise((resolve, reject) => {

    const payload = { uid };

    jwt.sign(payload, process.env.SECRETOPRIVATEKEY!, {
      expiresIn: '4h'
    }, (err, token) => {

      if (err) {
        console.log(err);
        reject('Something wrong, token does not generate')
      } else {
        resolve(token);
      }
    })
  })
}

export {
  generateJWT
}