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
          .format("dddd MMM DD YYYY ha z"),
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
        .format("dddd MMM DD YYYY ha z"),
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
};
