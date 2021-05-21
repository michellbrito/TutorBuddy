module.exports = {
  getUpcomingMeetings: async function () {
    const moment = require("moment-timezone");
    const axios = require("axios");
    const response = axios.get(
      "https://api.zoom.us/v2/users/3fne5DplSIynx2-O_SqxfQ/meetings?type=upcoming",
      {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImIwRDRUVW9SUWxhZzJvdWF1WmNkVGciLCJleHAiOjE2MjIxMjk2NjcsImlhdCI6MTYyMTUyNDg2N30.LY3eT3Mfoj6LPF2IZT70Cqtv8-dWgXlXAlirzW6g2Xw", //the token is a variable which holds the token
        },
      }
    );

    const results = await response;
    const events = results.data.meetings;
    const upcomingEvents = [];

    for (var i = 0; i < events.length; i++) {
      let event = {
        name: events[i].topic,
        start_time: events[i].start_time,
        join_url: events[i].join_url,
        eastern_time: moment(events[i].start_time).tz("America/New_York").format()
      };
      upcomingEvents.push(event);
    }
    return upcomingEvents;
  },
};
