const googleSheet = require("../logic/googleSheet");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(".env") });

test("verify we are able to get a list of student names", async () => {
  const names = await googleSheet.getStudentNames();
  expect(names.length).toBeGreaterThanOrEqual(1);
});

test("verify we are able to get a list of student emails", async () => {
  const emails = await googleSheet.getStudentEmails();
  expect(emails.length).toBeGreaterThanOrEqual(1);
});

test("verify we are able to get a list of student class code", async () => {
  const classCode = await googleSheet.getStudentClassCode();
  expect(classCode.length).toBeGreaterThanOrEqual(1);
});

test("verify we are able to get a specific student info", async () => {
  const lastStudent = await googleSheet.getStudentNames();
  const studentInfo = await googleSheet.getAllInfo(
    lastStudent[lastStudent.length - 1]
  );
  expect(studentInfo).toBeDefined();
});
