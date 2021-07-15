
# OneLogin User-Migration Smart Hook for GoogleSheets

This Smart Hook will help you to progressively Migrate user records to OneLogin from a Google Spreadsheet.

## Manual deployment

Follow OneLogin Developer [documentation](https://developers.onelogin.com/api-docs/2/smart-hooks/types/user-migration) in order to deploy
 this smarthook to your onelogin instance.

## Required Environment Variables
the `.env` file contains required Environment variables that should be defined
as part of the deployment using SmartHub

The `SPREADSHEET_ID` environment variable represents the Google sheet document id, this can be grabbed from the url of the spreadsheet as follows:

https://docs.google.com/spreadsheets/d/`spreadsheetId`/edit#gid=0

The `GOOGLE_ACCESS_TOKEN` can be generated in the Google console, you can find detailed information on how to generate one in the [Google documentation](https://developers.google.com/sheets/api/guides/authorizing)
