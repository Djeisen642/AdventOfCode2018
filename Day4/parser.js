const moment = require('moment');
const list = require('../modules/fileReader');

const sortedData = [];
const dataRegex = /.*\] (.*)/;
const dailyData = {};
for (const entry of list) {
  const date = moment(entry, 'YYYY-MM-DD HH:mm');
  sortedData.push({
    date,
    data: entry.match(dataRegex)[1],
  });
}

sortedData.sort((a, b) => {
  return a.date.diff(b.date);
});

let guardOnDuty = null;
const guardData = {};

const guardRegex = /.*#(\d*)/;
for (const sortedDatum of sortedData) {
  const formattedDate = sortedDatum.date.format('YYYYMMDD');
  dailyData[formattedDate] = dailyData[formattedDate] || [];
  dailyData[formattedDate].push(sortedDatum);
  guardData[guardOnDuty] = guardData[guardOnDuty] || {
    data: [],
    fellAsleep: null,
    timeAsleep: 0,
  };
  if (sortedDatum.data.includes('fa')) {
    guardData[guardOnDuty].fellAsleep = sortedDatum.date;
  } else if (sortedDatum.data.includes('wa')) {
    guardData[guardOnDuty].timeAsleep +=
      guardData[guardOnDuty].fellAsleep.diff(sortedDatum.date);
    guardData[guardOnDuty].fellAsleep = null;
  } else {
    const [, guardId] = sortedDatum.data.match(guardRegex);
    guardData[guardOnDuty].timeAsleep +=
      guardData[guardOnDuty].fellAsleep.diff(sortedDatum.date);
    guardData[guardOnDuty].fellAsleep = null;
    guardOnDuty = guardId;
  }
  guardData[guardOnDuty].data.push(sortedDatum);
}

module.exports = {
  sortedData,
  dailyData,
  guardData,
};
