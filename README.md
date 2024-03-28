# To run the application locally with stub services for S3 and Google Sheets:

1. Copy `.env.example` to `.env`
2. Run `npm install`
3. Run `npm run local`

# To run the application using the actual Google Sheets services:

1. Replace the placeholder values in `.env` with appropriate values
    - ### Sheets
        - Make sure a `googleCredentials.json` file is in the root of the project. These are the credentials for a service account which has been granted access to the spreadsheet identified by `SPREADSHEET_ID`
2. Run `npm install`
3. Run `npm run local`

# To run the application locally with stub services for ServiceNow and Zendesk:

1. Copy `.env.example` to `.env`
2. Run `npm install`
3. Run `npm run local`

# To run the application locally with the actual services for ServiceNow and Zendesk:

1. Replace the placeholder values in `.env` with appropriate values.
2. Run `npm install`
3. Run `npm run local`

# To use Google Analytics locally env variable must be set:

COOKIE_DOMAIN=localhost
