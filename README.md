
![Logo](https://i.imgur.com/sjkXuW3.png)

    
# Tutor Buddy

This is a terminal based application to help tutors with the daily task of being a tutor.


## Features

- Create zoom meetings for the next day's tutoring sessions
- Send confirmation emails for the next day's tutoring sessions
- Send a confirmation email to a specific student for the same day or next day tutoring session 
- Send the weekly email blast
- Send a introduction email to a new student
- Send timecard correction email to centralsupport

  
## Installation 



```bash 
  git clone https://github.com/michellbrito/Tutor-Buddy.git
  cd Tutor-Buddy
  npm i
  npm start
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`TUTOR_NAME`

`TUTOR_TIME_ZONE`

`BOOTCAMP_TYPE`

`SLACK`

`INTRO_MESSAGE`

`TUTOR_CALENDLY_LINK`

`EMAIL_SERVICE`

`EMAIL_USERNAME`

`EMAIL_PASSWORD`

`GOOGLE_SHEET_ID`

`GOOGLE_API_KEY`

`CALENDLY_TOKEN`

`ZOOM_API_KEY`

  
## Running Tests

To run tests, run the following command

```bash
  npm run test
```

To run a specific test, run the following commands

```bash
  npm run test calendly
```

```bash
  npm run test google
```

```bash
  npm run test zoom
```
  
## Authors

- [@michellbrito](https://www.github.com/michellbrito)

  
## Feedback

If you have any feedback, please reach out to me on slack

  