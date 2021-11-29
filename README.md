To run the application locally with stub services for S3 and Google Sheets:

1. Copy `.env.example` to `.env`
2. Run `npm install`
3. Run `npm run dev`

To run the application using the actual S3 and Google Sheets services:

1. Replace the placeholder values in `.env` with appropriate values. 
    - Remove `ENVIRONMENT` - When it is set to `development` stub versions of the `SheetsService` and the `S3Service` are used.
3. Make sure a `credentials.json` file is in the root of the project.  These are the credentials for a service account which has been granted access to the spreadsheet identified by `SPREADSHEET_ID`
4. Run `npm install`
5. Run `eval $(gds aws <your-aws-account> -e)` if you wish to test actual S3 functionality.
6. Run `npm run dev`
