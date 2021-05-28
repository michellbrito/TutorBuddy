const calendly = require("../logic/calendly");
const day = require("../logic/day");
const path = require("path")
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(".env") });

test('verify we are able to get a list of calendly events',  async () => {
  const startTime = await day.nextDay();
  const events = await calendly.getEventID(startTime);
  expect(events.length).toBeGreaterThanOrEqual(1);
});

test('verify we are able to get a specific event info',  async () => {
  const startTime = await day.nextDay();
  const events = await calendly.getEventID(startTime);
  const eventID = events[0].uri.split("/scheduled_events/")[1];
  const specificEvent = await calendly.getEventInfo(eventID);
  expect(specificEvent).toBeDefined();
});