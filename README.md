# Api Rest

This app is made in Node.js using typescript, docker, mongoose; among others

1. Download project
2. Use ```npm install``` to install all dependencies
3. Use ```docker-compose up -d``` to run docker images
4. Use ```npm run tsc``` to compile ts to js code
5. Use ```npm run dev``` to run in mode develop with nodemon

Change .env.example file to .env and configure all variables.

You need:

- Docker

- Node

- Token id from Google Oauth2

## Database

The data base uses a mongo:6.0 and mongo-express:1.0.0-alpha.4 images from docker

On the file .env, copy the variable named GOOGLE_CLIENT_ID and paste in 'public/index' and search:

```html
<div id="g_id_onload" data-client_id={GOOGLE_CLIENT_ID} <- HERE
    data-auto_prompt="false" data-callback="handleCredentialResponse">
</div>
```
