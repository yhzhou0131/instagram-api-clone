# Instagram-api-clone

This is a simple demo illustrating the interaction between Instagram users and posts.

## Technologies

- TypeScript
- Express
- GraphQL
- MongoDB

## Features

**For user**

- CRUD operations.
- Follow/Unfollow an user.
- Like/dislike a post.
- Add/Delete/Edit a comment to the post.

**For post**

- CRUD operations.

## Run code

- Run the following command to install dependencies:
  `npm i`

- Add your **mongodb connection string** to .env file

- Run `npm run start` and you can open `localhost:<PORT>/graphql` to test the api.

## Generate fake data to mongoDB

`npm run db:seed`
