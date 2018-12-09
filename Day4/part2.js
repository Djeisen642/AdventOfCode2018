const {guardData} = require('./parser');

const guardIDs = Object.keys(guardData);

let maxMinute = 0;
let maxGuardID = guardIDs[0];

for (const guardID in guardData) {
  if (guardData.hasOwnProperty(guardID)) {
    const guardDatum = guardData[guardID];
    let maxMinuteForThisGuard = 0;

    guardDatum.timesAsleep.forEach((timesAsleep, minute) => {
      if (timesAsleep > guardDatum.timesAsleep[maxMinuteForThisGuard]) {
        maxMinuteForThisGuard = minute;
      }
    });
    console.log(
        guardID,
        maxMinuteForThisGuard,
        guardDatum.timesAsleep[maxMinuteForThisGuard],
        guardID * maxMinuteForThisGuard
    );
    const maxTimeForThisGuard = guardDatum.timesAsleep[maxMinuteForThisGuard];
    if (maxTimeForThisGuard > guardData[maxGuardID].timesAsleep[maxMinute]) {
      maxMinute = maxMinuteForThisGuard;
      maxGuardID = guardID;
    }
  }
}

console.log(maxGuardID, maxMinute, maxGuardID * maxMinute);
