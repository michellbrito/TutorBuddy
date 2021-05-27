# TutorBuddy

## Instructions

1. Clone the repo - https://github.com/michellbrito/Tutor-Buddy.git
2. Setup the Google API, .env file
3. `cd` into the repo and do `npm start`

## Setup

### Google Sheet API Authentication

1. Visit Google's credentials page - https://console.cloud.google.com/apis/credentials
2. Click `CREATE CREDENTIALS` then click `API Key`
3. Copy the API Key and save it to your `.env` file under `GOOGLE_API_KEY`

    <img src="https://i.imgur.com/VbbT5xO.png" height='250px'>

### Google Sheet ID

1. Visit your Google sheet that contains the list of students
2. Copy the content of the URL after `/d/` and before `/edit`

    <img src="https://i.imgur.com/xfgRMDb.png">

3. Assign the copied content to the env variable `GOOGLE_SHEET_ID`

### Google Sheet Headers

1. Verify that your google sheet headers are the same as the picture

    <img src="https://i.imgur.com/Fd3mtEg.png">

### .env File

1. Create your own .env file by doing `touch .env` in the project's directory
2. The .env file needs the following variables

   - `EMAIL_SERVICE` <- The name of your email provider, ex: `gmail`
   - `EMAIL_USERNAME` <- Your email username, ex: `jane@gmail.com`
   - `EMAIL_PASSWORD` <- Your email password, ex: `jane123`
   - `GOOGLE_SHEET_ID` <- The id of the google sheet that contains your students, ex: `1uGr_RDNCDGjHI2v7bVHrRDFcQWERYTdtNqpQuQX_3Rw`
   - `GOOGLE_API_KEY` <- The API key that gets generated from Google's credentials page, ex: `AIQWyDNAbMOFWZ6OLwWTnUpQUEREYCAMy7HaTc`
   - `CALENDLY_TOKEN` <- The calendly token generated from calendly, ex: `eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovLQWYERY....`
   - `ZOOM_API_KEY` <- The JWT Token generated from zoom, ex: `eyJ0eXAiOiJKV1QiLCQWUERY.eyJhdWQiOm51bGwss....`

    <img src="https://i.imgur.com/LMNlPhD.png" height='250px'>

## Demo
