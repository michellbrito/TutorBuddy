module.exports = {
  getUpcomingMeetings: async function () {
    require("dotenv").config();
    const moment = require("moment-timezone");
    const axios = require("axios");
    const zoom_user = await this.getAdminUsername();
    const response = axios.get(
      `https://api.zoom.us/v2/users/${zoom_user}/meetings?type=upcoming`,
      {
        headers: {
          Authorization:
            `Bearer ${process.env.ZOOM_API_KEY}`, //the token is a variable which holds the token
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
  getAdminUsername: async function(){
    require("dotenv").config();
    const axios = require("axios");
    const response = axios.get(
      `https://api.zoom.us/v2/users/`,
      {
        headers: {
          Authorization:
            `Bearer ${process.env.ZOOM_API_KEY}`, //the token is a variable which holds the token
        },
      }
    );

    const results = await response;
    const username = results.data.users[0].id;
    return username

  }
};
