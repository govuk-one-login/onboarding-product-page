# Product Pages

This application provides the front facing pages for the Self-Service Experience tool, as well as contact forms and feedback forms.

## To run the application locally with stub services for S3 and Google Sheets:

1. Copy `.env.example` to `.env`
2. Run `npm install`
3. Run `npm run local`

## To run the application using the actual Google Sheets services:

1. Replace the placeholder values in `.env` with appropriate values from development environment. Mapping between env variables and SSM Params / Secrets can be found in `infrastructure/frontend/frontend.template.yml`.
    - ### Sheets
        - Make sure a `googleCredentials.json` file is in the root of the project. These are the credentials for a service account which has been granted access to the spreadsheet identified by `SPREADSHEET_ID`

```
{
   "client_email": sample-client-email
   "private_key": sample-privatye-key
}
```

2. Run `npm install`
3. Run `npm run local`

## To run the application locally with stub services for ServiceNow:

1. Copy `.env.example` to `.env`
2. Run `npm install`
3. Run `npm run local`

## To run the application locally with the actual services for ServiceNow:

1. Replace the placeholder values in `.env` with appropriate values.
2. Run `npm install`
3. Run `npm run local`
