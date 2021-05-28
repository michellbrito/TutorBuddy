const zoom = require("../logic/zoom");
const path = require("path")
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(".env") });

test('verify we are able to get upcoming zoom meetings',  async () => {
  const meetings = await zoom.getUpcomingMeetings();
  expect(meetings.length).toBeGreaterThanOrEqual(1);
});

  test('verify we are able to get zoom username',  async () => {
    const username = await zoom.getAdminUsername();
    expect(username).toBeDefined();
  });