function activateChallenge(c) {
  if (chalActive) return;
  if (c >= 1 && !legacyUpgs[1]) return;
  chalActive = true;
  chalIdx = c;
  voidAmt = new ExpantaNum(0);
  quarks = new ExpantaNum(0);
  for (var i = 0; i < lv.length; i++) lv[i] = 0;
  for (var i = 0; i < quarkUpg.length; i++) quarkUpg[i] = false;
  resetCount = 0;
}

function completeChallenge(c) {
  if (!chalActive || chalDone[c]) return;
  if (voidAmt.lt(CHAL_GOALS[c])) return;
  chalActive = false;
  chalIdx = 0;
  chalDone[c] = true;
  voidAmt = new ExpantaNum(0);
  quarks = new ExpantaNum(0);
  for (var i = 0; i < lv.length; i++) lv[i] = 0;
  for (var i = 0; i < quarkUpg.length; i++) quarkUpg[i] = false;
  resetCount = 0;
}

function forfeitChallenge(c) {
  if (!chalActive) return;
  chalActive = false;
  chalIdx = 0;
  voidAmt = new ExpantaNum(0);
  quarks = new ExpantaNum(0);
  for (var i = 0; i < lv.length; i++) lv[i] = 0;
  for (var i = 0; i < quarkUpg.length; i++) quarkUpg[i] = false;
  resetCount = 0;
}
