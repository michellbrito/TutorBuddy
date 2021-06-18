module.exports = {
  survey: async function (data) {
    require("dotenv").config();
    return `
        Hey ${data.name},

        I hope you enjoyed the tutoring session! As you know after each of our session you have to fill out a suvery.

        Here's the suvery link: http://bit.ly/students-eval

        Here's your class code which you'll need for the survey: ${data.classCode}

        Sincerely,
        ${process.env.TUTOR_NAME}
        `;
  },
  blast: async function () {
    require("dotenv").config();
    return `
        Hi Everyone!

        I hope you had a great week! I have attached a link below to schedule another tutoring session if you wish. If you are already scheduled, please ignore this email.

        ${process.env.TUTOR_CALENDLY_LINK}

        On the Calendly page, be sure you have the correct time zone selected in the section labeled "Times are in"

        If our availability doesn’t sync, let me know and I'll see if we can figure something out.


        Maximum tutorial sessions per week - our week is Monday - Sunday.
        Part-time (6 month boot camp) students are entitled to 1 session per week.
        Full-time (3 month boot camp) students are entitled to 2 sessions per week.

        If you have any questions or none of the times available work for you please let me know and I would be happy to help.

        If you would like to schedule regular, recurring sessions at the same day/time each week, just let me know by REPLY ALL and we can work it out.  This is particularly useful if you have a strict schedule so you won't have to compete for time on my calendar.

        CC Central Support on all email by always using REPLY ALL.

        Sincerely,
        ${process.env.TUTOR_NAME}`;
  },
  confirmation: async function (data) {
    require("dotenv").config();
    return `
    Hi ${data.name}!

    Thank you for scheduling your session with me. I am looking forward to our session on ${data.time}

    If something comes up and the scheduled time will not work, let me know a minimum of 6 hours before the appointment time and we’ll figure something out.

    This session will take place here: ${data.link}
    (If you have not used zoom before please join the meeting at least 15 minutes early because it may have you download and install some software.)

    Again, all I need from you:
        -   Be on Tutors & Students Slack 5 minutes before your time slot.
        -   Make sure your computer/mic/internet connection are working.
        -   Make sure your workspace is quiet and free from interruptions.
    At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete.


    Slack or email me with any questions.  I’m looking forward to our meeting!

    Please Reply All to this email so that I know you have seen it.
    (CC Central Support on all tutor email by always using REPLY ALL).

    Sincerely,
    ${process.env.TUTOR_NAME}
    `;
  },
  timecard: async function (data) {
    require("dotenv").config();
    return `
    1. Date: ${data.date}
    2. Time in: ${data.timein}
    3. Time out: ${data.timeout}
    4.Class Code: ${data.classCode}
    5.Student: ${data.name}
    6.B2B: ${data.b2b} 
    7. ${data.reason}

    Thank you,
    ${process.env.TUTOR_NAME}
    `;
  },
  newStudent: async function (name) {
    require("dotenv").config();
    return `
    Hi ${name},


  Nice to meet you!  My name is ${process.env.TUTOR_NAME} and I was assigned to be your tutor. ${process.env.INTRO_MESSAGE}

  I just sent you an invite to our tutoring Slack Team, Tutors & Students. This is where we will be communicating through Direct Message (DM).  Let me know if you don't see the invite or have any issues getting signed up.  Please send me a direct message once you create your account there. You can DM me on that Slack by using my Slack name ${process.env.SLACK}. Make sure to have that Slack available on your mobile phone so that you can message me if there are problems with wifi, etc.

  Below, I'll provide you with some times when I'm available for tutoring.  Let me know which of those time slots works best for you and we can schedule a session.  If our availability doesn’t sync, let me know and I'll see if we can figure something out.

  Maximum tutorial sessions per week - our week is Monday - Sunday.

  Part-time (6 month boot camp) students are entitled to 1 session per week.

  Full-time (3 month boot camp) students are entitled to 2 sessions per week.

  Schedule your session at: ${process.env.TUTOR_CALENDLY_LINK}

  Each session takes place over Zoom.us (video chat/screen sharing) and lasts about 50 minutes. I'll email you the Zoom.us link the day before our scheduled time. (If you have not used zoom before please join the meeting at least 15 minutes early as it may have you download and install some software.)


  All I need from you:

  - Be on Slack 5 minutes before your time slot.

  - Make sure your computer/mic/internet connection are working.

  - Make sure your workspace is quiet and free from interruptions.

  - At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete.

  Slack or email me with any questions.  I look forward to our first meeting!

  CC Central Support on all email by always using REPLY ALL.

  Sincerely,

  ${process.env.TUTOR_NAME}
`;
  },
};
