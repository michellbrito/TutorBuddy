module.exports = {
  nextDay: async function () {
    const ts = Date.now();
    const date_ob = new Date(ts);
    const date = date_ob.getDate() + 1;
    const month =
      date_ob.getMonth() + 1 < 10
        ? `0${date_ob.getMonth() + 1}`
        : date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();

    return `${year}-${month}-${date}`;
  },
  utc: async function () {
    const ts = Date.now();
    const date_ob = new Date(ts);
    const day = date_ob.getDate() + 1;
    const month =
      date_ob.getMonth() < 10
        ? `0${date_ob.getMonth() + 1}`
        : date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();

    return `${year}-${month}-${day}T03:00:00.000000Z`;
  },
};
