module.exports = {
  getStudentNames: async function () {
    require("dotenv").config();
    const { GoogleSpreadsheet } = require("google-spreadsheet");

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    doc.useApiKey(process.env.GOOGLE_API_KEY);
    await doc.loadInfo(); // loads sheets
    const sheet = doc.sheetsByIndex[1]; // the first sheet
    const rows = await sheet.getRows();

    const studentNames = [];
    for (var i = 0; i < rows.length; i++) {
      studentNames.push(rows[i]["Student Name"]);
    }
    return studentNames;
  },
  getStudentClassCode: async function () {
    require("dotenv").config();
    const { GoogleSpreadsheet } = require("google-spreadsheet");

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    doc.useApiKey(process.env.GOOGLE_API_KEY);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];
    const rows = await sheet.getRows();

    const studentClassCode = [];
    for (var i = 0; i < rows.length; i++) {
      studentClassCode.push(rows[i]["Class Code"]);
    }
    return studentClassCode;
  },
  getAllInfo: async function (student) {
    require("dotenv").config();
    const { GoogleSpreadsheet } = require("google-spreadsheet");

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    doc.useApiKey(process.env.GOOGLE_API_KEY);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];
    const rows = await sheet.getRows();

    const classCodes = [];
    const graduationDays = [];
    const studentNames = [];
    const studentEmails = [];

    for (var i = 0; i < rows.length; i++) {
      classCodes.push(rows[i]["Class Code"]);
      graduationDays.push(rows[i]["Graduation Date"]);
      studentNames.push(rows[i]["Student Name"]);
      studentEmails.push(rows[i]["Student Email"]);
    }
    const studentIndex = studentNames.indexOf(student);
    const info = {
      classCode: classCodes[studentIndex],
      graduationDay: graduationDays[studentIndex],
      studentName: studentNames[studentIndex],
      studentEmail: studentEmails[studentIndex],
    };
    return info;
  },
};
