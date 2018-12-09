const {guardData} = require('./parser');

const guardIDs = Object.keys(guardData);

const maxGuardID = guardIDs.reduce(
    (currentMax, thisGuardId) =>
      guardData[currentMax].timeAsleep > guardData[thisGuardId].timeAsleep ?
        currentMax :
        thisGuardId
    , guardIDs[0]);

let maxMinute = 0;

guardData[maxGuardID].timesAsleep.forEach((timesAsleep, minute) => {
  if (timesAsleep > guardData[maxGuardID].timesAsleep[maxMinute]) {
    maxMinute = minute;
  }
});

console.log(maxGuardID, maxMinute, maxGuardID * maxMinute);
