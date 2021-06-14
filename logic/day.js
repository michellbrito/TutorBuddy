module.exports = {
  nextDay: async function (data) {
    const ts = Date.now();
    const date_ob = new Date(ts);
    const date =
      date_ob.getDate() + 1 <= 9
        ? `0${date_ob.getDate() + 1}`
        : date_ob.getDate() + 1;
    const month =
      date_ob.getMonth() + 1 < 10
        ? `0${date_ob.getMonth() + 1}`
        : date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();
    const fullDay =
      data == "today"
        ? `${year}-${month}-${date - 1}`
        : `${year}-${month}-${date}`;

    return fullDay;
  },
  utc: async function (data) {
    const ts = Date.now();
    const date_ob = new Date(ts);
    const day =
      date_ob.getDate() + 1 <= 9
        ? `0${date_ob.getDate() + 1}`
        : date_ob.getDate() + 1;
    const month =
      date_ob.getMonth() < 10
        ? `0${date_ob.getMonth() + 1}`
        : date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();
    const fullDay =
      data == "today"
        ? `${year}-${month}-${day - 1}T03:00:00.000000Z`
        : `${year}-${month}-${day}T03:00:00.000000Z`;

    return fullDay;
  },
};
