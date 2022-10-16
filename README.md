# Insta Share

This is [Insta Share](https://instashare.vercel.app/) a file uploader project made with [Nextjs](https://nextjs.org)

## Prerequisites

-   Create a MongoDB account and create a cluster
-   Create a Firebase account and enable the file storage

## Installation

-   npm install
-   npm i -g commitizen
-   npm run prepare
-   npm run dev

## Testing

I've added 2 type of testings:

### E2E with Cypress for Authentication

(NOTE): Please change the MONGO_DB_URI at cypress.config.ts

To Run the E2E tests:

-   npm run cypress

### Unit Testing with Jest (Incomplete)

You can check the file inside at **tests**

-   npm run test
