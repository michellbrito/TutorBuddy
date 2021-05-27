module.exports = {
  getEventID: async function (startTime) {
    require("dotenv").config();
    const axios = require("axios");
    const calendly_user = await this.getAdminUsername();
    const response = axios.get(
      `https://api.calendly.com/scheduled_events?user=${calendly_user}&min_start_time=${startTime}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
        },
      }
    );
    const results = await response;
    const event = results.data.collection;
    return event;
  },
  getEventInfo: async function (eventID) {
    require("dotenv").config();
    const axios = require("axios");
    const response = axios.get(
      `https://api.calendly.com/scheduled_events/${eventID}/invitees`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
        },
      }
    );

    const results = await response;
    const invitee = results.data.collection[0];
    const inviteeInfo = {
      name: invitee.name,
      email: invitee.email,
      timeZone: invitee.timezone,
    };

    return inviteeInfo;
  },
  getAdminUsername: async function(){
    require("dotenv").config();
    const axios = require("axios");
    const response = axios.get(
      `https://api.calendly.com//users/me`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
        },
      }
    );

    const results = await response;
    const username = results.data.resource.uri;
    return username

  }
};
