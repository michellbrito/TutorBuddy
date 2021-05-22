const inquirer = require("inquirer");
const chalk = require("chalk");
const main = require("./logic/main");
const sendEmail = require("./logic/sendEmail.js");
const emailTemplate = require("./templates/email");
const googleSheet = require("./logic/googleSheet");
const zoom = require("./logic/zoom.js");
const calendly = require("./logic/calendly");
const day = require("./logic/day");
const moment = require("moment-timezone");
inquirer.registerPrompt("search-list", require("inquirer-search-list"));

// async function sendEmailConfirmation() {
//   const events = await zoom.getUpcomingMeetings();
//   const tomorrow = await day.nextDay();
//   const startTime = await day.utc();
//   let calendlyEvents = await calendly.getEventID(startTime);
//   const eventsTommorow = events.filter((event) =>
//     event.eastern_time.includes(tomorrow)
//   );
//   let sessions = [];
//   for (var i = 0; i < eventsTommorow.length; i++) {
//     const eventId = calendlyEvents
//       .find(
//         (event) =>
//           event.start_time ===
//           `${eventsTommorow[i].start_time.split("Z")[0]}.000000Z`
//       )
//       .uri.split("scheduled_events/")[1];
//     const timezone = await (await calendly.getEventInfo(eventId)).timeZone;
//     const email = await (await calendly.getEventInfo(eventId)).email;
//     const data = {
//       name: eventsTommorow[i].name,
//       easternTime: eventsTommorow[i].eastern_time,
//       startTime: eventsTommorow[i].start_time,
//       link: eventsTommorow[i].join_url,
//       calendlyEventId: eventId,
//       timezone: timezone,
//       email: email,
//     };
//     sessions.push(data);
//   }

//   sessions = sessions.filter((event) =>
//     event.easternTime.includes(startTime.split("T")[0])
//   );

//   calendlyEvents = calendlyEvents.filter((event) =>
//     event.start_time.includes(startTime.split("T")[0])
//   );

//   for (var i = 0; i < sessions.length; i++) {
//     const studentData = {
//       name: sessions[i].name.split(" ")[0],
//       time: moment(sessions[i].startTime)
//         .tz(sessions[i].timezone)
//         .format("dddd MMM DD YYYY ha z"),
//       link: sessions[i].link,
//     };
//     const emailData = {
//       to: sessions[i].email,
//       subject: `Coding Boot Camp - Tutorial Confirmation ${studentData.time}`,
//       text: await emailTemplate.confirmation(studentData),
//       cc: "centraltutorsupport@bootcampspot.com",
//     };

//     setTimeout(function timer() {
//       sendEmail(emailData);
//     }, i * 3000);
//   }
// }

// async function sendBlastEmail() {
//   const studentEmails = await googleSheet.getStudentEmails();
//   const emailData = {
//     to: "centraltutorsupport@bootcampspot.com",
//     subject: "Coding Boot Camp - Tutoring available",
//     text: await emailTemplate.blast(),
//     cc: studentEmails,
//   };
//   sendEmail(emailData);
// }

inquirer
  .prompt([
    {
      type: "list",
      name: "menuOption",
      message: chalk.green("Welcome! What would you like to do?"),
      choices: [
        "Send confirmation emails",
        "Send one confirmation email",
        "Send student suvery",
        "Send email blast",
      ],
    },
    {
      type: "search-list",
      name: "selectedStudent",
      message: "Select a student",
      choices: function () {
        const students = googleSheet.getStudentNames();
        return students;
      },
      when: (answers) =>
        answers.menuOption === "Send student suvery" ||
        answers.menuOption === "Send one confirmation email",
    },
  ])
  .then((answers) => {
    switch (answers.menuOption) {
      case "Send email blast":
        main.sendBlastEmail();
        break;
      case "Send confirmation emails":
        main.sendEmailConfirmation();
        break;
      case "Send student suvery":
        const result = main.sendStudentSurvey();
        console.log(result);
      case "Send one confirmation email":
        console.log();
      default:
        // code block
        console.log("ha");
    }
  });
