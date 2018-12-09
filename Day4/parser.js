const moment = require('moment');
const list = require('../modules/fileReader');
const PARTS = {
  FALLS_ASLEEP: 'fa',
  WAKES_UP: 'wa',
  STARTS: 'Gu',
};

const sortedData = [];
const dataRegex = /.*] (.*)/;
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

const addTimeAsleep = (sortedDatum, guardDatum) => {
  const timeAsleepThisTime = sortedDatum.date
      .diff(guardDatum.fellAsleep, 'minutes');
  guardDatum.timeAsleep += timeAsleepThisTime;
  const startingMinute =
    guardDatum.fellAsleep.hours() * 60 +
    guardDatum.fellAsleep.minutes();

  for (let i = 0; i < timeAsleepThisTime; i++) {
    guardDatum.timesAsleep[i + startingMinute]++;
  }
  guardDatum.fellAsleep = null;
};

const guardRegex = /.*#(\d*)/;
for (const sortedDatum of sortedData) {
  const formattedDate = sortedDatum.date.format('YYYYMMDD');
  dailyData[formattedDate] = dailyData[formattedDate] || [];
  dailyData[formattedDate].push(sortedDatum);
  if (sortedDatum.data.startsWith(PARTS.FALLS_ASLEEP)) {
    guardData[guardOnDuty].fellAsleep = sortedDatum.date;
  } else if (sortedDatum.data.startsWith(PARTS.WAKES_UP)) {
    addTimeAsleep(sortedDatum, guardData[guardOnDuty]);
  } else {
    const [, guardId] = sortedDatum.data.match(guardRegex);
    if (guardData[guardOnDuty]) {
      if (guardData[guardOnDuty].fellAsleep) {
        addTimeAsleep(sortedDatum, guardData[guardOnDuty]);
      }
    }

    guardOnDuty = guardId;
    guardData[guardOnDuty] = guardData[guardOnDuty] || {
      data: [],
      fellAsleep: null,
      timeAsleep: 0,
      timesAsleep: new Array(24*60).fill(0),
    };
  }
  guardData[guardOnDuty].data.push(sortedDatum);
}

module.exports = {
  sortedData,
  dailyData,
  guardData,
  PARTS,
};
