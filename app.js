const inquirer = require("inquirer");
const chalk = require("chalk");
const main = require("./logic/main");
const googleSheet = require("./logic/googleSheet");
inquirer.registerPrompt("search-list", require("inquirer-search-list"));

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
        "Send timecard correction email"
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
        answers.menuOption === "Send one confirmation email" ||
        answers.menuOption === "Send timecard correction email",
    },
    {
      type: "input",
      name: date,
      message: "What day did the session take place?",
      when: (answers) =>
        answers.menuOption === "Send timecard correction email",
    },
    {
      type: "input",
      name: timein,
      message: "What time were you suppose clock in? ex: 10pm",
      when: (answers) =>
        answers.menuOption === "Send timecard correction email",
    },
    {
      type: "input",
      name: timeout,
      message: "What time were you suppose to clock out? ex: 11pm",
      when: (answers) =>
        answers.menuOption === "Send timecard correction email",
    },
    {
      type: "list",
      name: b2b,
      message: "What time were you suppose to clock out? ex: 11pm",
      choices: ["yes", "no"],
      when: (answers) =>
        answers.menuOption === "Send timecard correction email",
    },
    {
      type: "input",
      name: reason,
      message: "What was the reason for this timecard correction?",
      when: (answers) =>
        answers.menuOption === "Send timecard correction email",
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
        main.sendStudentSurvey(answers.selectedStudent);
        break;
      case "Send one confirmation email":
        main.sendOneEmailConfirmation(answers.selectedStudent);
        break;
      case "Send timecard correction email":
        main.sendTimecardCorrection(answers);
      default:
      // code block
    }
  });
