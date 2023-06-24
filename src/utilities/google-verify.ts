import { OAuth2Client, TokenPayload } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

interface Token extends TokenPayload {
  name: string
  picture: string
  email: string
}

async function googleVerify(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const { name, picture, email } = ticket.getPayload() as Token;

  return {
    name,
    img: picture,
    email
  }

}

export {
  googleVerify
}