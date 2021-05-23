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
        main.sendStudentSurvey(answers.selectedStudent);
        break;
      case "Send one confirmation email":
        main.sendOneEmailConfirmation(answers.selectedStudent);
        break;
      default:
      // code block
    }
  });
