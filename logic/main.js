module.exports = {
  sendEmailConfirmation: async function () {
    const zoom = require("./zoom.js");
    const day = require("./day");
    const calendly = require("./calendly");
    const sendEmail = require("./sendEmail.js");
    const moment = require("moment-timezone");
    const emailTemplate = require("../templates/email");

    const events = await zoom.getUpcomingMeetings();
    const tomorrow = await day.nextDay();
    const startTime = await day.utc();
    let calendlyEvents = await calendly.getEventID(startTime);

    const eventsTommorow = events.filter((event) =>
      event.eastern_time.includes(tomorrow)
    );

    let sessions = [];
    for (var i = 0; i < eventsTommorow.length; i++) {
      const eventId = calendlyEvents
        .find(
          (event) =>
            event.start_time ===
            `${eventsTommorow[i].start_time.split("Z")[0]}.000000Z`
        )
        .uri.split("scheduled_events/")[1];

      const timezone = await (await calendly.getEventInfo(eventId)).timeZone;
      const email = await (await calendly.getEventInfo(eventId)).email;

      const data = {
        name: eventsTommorow[i].name,
        easternTime: eventsTommorow[i].eastern_time,
        startTime: eventsTommorow[i].start_time,
        link: eventsTommorow[i].join_url,
        calendlyEventId: eventId,
        timezone: timezone,
        email: email,
      };
      sessions.push(data);
    }

    sessions = sessions.filter((event) =>
      event.easternTime.includes(startTime.split("T")[0])
    );

    calendlyEvents = calendlyEvents.filter((event) =>
      event.start_time.includes(startTime.split("T")[0])
    );

    for (var i = 0; i < sessions.length; i++) {
      const studentData = {
        name: sessions[i].name.split(" ")[0],
        time: moment(sessions[i].startTime)
          .tz(sessions[i].timezone)
          .format("dddd MMM DD YYYY h:mma z"),
        link: sessions[i].link,
      };
      const emailData = {
        to: sessions[i].email,
        subject: `Coding Boot Camp - Tutorial Confirmation ${studentData.time}`,
        text: await emailTemplate.confirmation(studentData),
        cc: "centraltutorsupport@bootcampspot.com",
      };

      setTimeout(function timer() {
        sendEmail(emailData);
      }, i * 3000);
    }
  },
  sendOneEmailConfirmation: async function (studentName) {
    const zoom = require("./zoom.js");
    const day = require("./day");
    const calendly = require("./calendly");
    const sendEmail = require("./sendEmail.js");
    const moment = require("moment-timezone");
    const emailTemplate = require("../templates/email");

    const events = await zoom.getUpcomingMeetings();
    const tomorrow = await day.nextDay();
    const startTime = await day.utc();
    let calendlyEvents = await calendly.getEventID(startTime);
    const eventsTommorow = events.filter((event) =>
      event.eastern_time.includes(tomorrow)
    );

    let sessions = [];
    for (var i = 0; i < eventsTommorow.length; i++) {
      const eventId = calendlyEvents
        .find(
          (event) =>
            event.start_time ===
            `${eventsTommorow[i].start_time.split("Z")[0]}.000000Z`
        )
        .uri.split("scheduled_events/")[1];

      const timezone = await (await calendly.getEventInfo(eventId)).timeZone;
      const email = await (await calendly.getEventInfo(eventId)).email;

      const data = {
        name: eventsTommorow[i].name,
        easternTime: eventsTommorow[i].eastern_time,
        startTime: eventsTommorow[i].start_time,
        link: eventsTommorow[i].join_url,
        calendlyEventId: eventId,
        timezone: timezone,
        email: email,
      };
      sessions.push(data);
    }

    sessions = sessions.filter((event) =>
      event.easternTime.includes(startTime.split("T")[0])
    );

    calendlyEvents = calendlyEvents.filter((event) =>
      event.start_time.includes(startTime.split("T")[0])
    );

    const student = sessions.find((student) => student.name === studentName);
    const studentData = {
      name: student.name.split(" ")[0],
      time: moment(student.startTime)
        .tz(student.timezone)
        .format("dddd MMM DD YYYY h:mma z"),
      link: student.link,
    };
    const emailData = {
      to: student.email,
      subject: `Coding Boot Camp - Tutorial Confirmation ${studentData.time}`,
      text: await emailTemplate.confirmation(studentData),
      cc: "centraltutorsupport@bootcampspot.com",
    };
    sendEmail(emailData);
  },
  sendBlastEmail: async function () {
    const googleSheet = require("./googleSheet");
    const sendEmail = require("./sendEmail.js");
    const emailTemplate = require("../templates/email");

    const studentEmails = await googleSheet.getStudentEmails();
    const emailData = {
      cc: "centraltutorsupport@bootcampspot.com",
      subject: "Coding Boot Camp - Tutoring available",
      text: await emailTemplate.blast(),
      bcc: studentEmails,
    };
    sendEmail(emailData);
  },
  sendStudentSurvey: async function (studentName) {
    const googleSheet = require("./googleSheet");
    const sendEmail = require("./sendEmail.js");
    const emailTemplate = require("../templates/email");

    const studentInfo = await googleSheet.getAllInfo(studentName);

    const studentData = {
      name: studentInfo.studentName.split(" ")[0],
      classCode: studentInfo.classCode,
    };

    const emailData = {
      to: studentInfo.studentEmail,
      subject: "Coding Boot Camp - Required Survey",
      text: await emailTemplate.survey(studentData),
    };
    sendEmail(emailData);
  },
  sendTimecardCorrection: async function (data) {
    const googleSheet = require("./googleSheet");
    const sendEmail = require("./sendEmail.js");
    const emailTemplate = require("../templates/email");

    const studentInfo = await googleSheet.getAllInfo(data.selectedStudent);
    const studentData = {
      date: data.date,
      timein: data.timein,
      timeout: data.timeout,
      classCode: studentInfo.classCode,
      name: studentInfo.studentName,
      b2b: data.b2b,
      reason: data.reason,
    };
    const emailData = {
      to: "centraltutorsupport@bootcampspot.com",
      subject: "ADP Timecard correction",
      text: await emailTemplate.timecard(studentData),
    };
    sendEmail(emailData);
  },
  sendNewStudentEmail: async function (studentName) {
    const googleSheet = require("./googleSheet");
    const sendEmail = require("./sendEmail.js");
    const emailTemplate = require("../templates/email");

    const studentInfo = await googleSheet.getAllInfo(studentName);

    const emailData = {
      to: studentInfo.studentEmail,
      cc: "centraltutorsupport@bootcampspot.com",
      subject: "Coding Boot Camp - Tutorial available",
      text: await emailTemplate.newStudent(
        studentInfo.studentName.split(" ")[0]
      ),
    };
    sendEmail(emailData);
  },
  createZoomMeetings: async function () {
    const zoom = require("./zoom.js");
    const day = require("./day");
    const calendly = require("./calendly");
    const moment = require("moment-timezone");

    const startTime = await day.utc();
    const tomorrow = await day.nextDay();
    let calendlyEvents = await calendly.getEventID(startTime);
    const timezone = await calendly.getTimeZone();

    for (var i = 0; i < calendlyEvents.length; i++) {
      calendlyEvents[i].eastern_time = moment
        .utc(calendlyEvents[i].start_time)
        .tz("America/New_York")
        .format("YYYY-MM-DD HH:mm:ss.SSS");
    }

    const eventsTommorow = calendlyEvents.filter((event) =>
      event.eastern_time.includes(tomorrow)
    );

    for (var i = 0; i < eventsTommorow.length; i++) {
      const time = eventsTommorow[i].eastern_time
        .replace(" ", "T")
        .split(".")[0];
      const eventId = eventsTommorow[i].uri.split("scheduled_events/")[1];
      const name = await (await calendly.getEventInfo(eventId)).name;
      await zoom.createZoomMeetings({
        topic: name,
        type: 2,
        start_time: time,
        duration: 60,
        timezone: timezone,
      });
    }
  },
};
