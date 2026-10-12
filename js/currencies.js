var qgSig1 = "\u0000";
var qgM1 = new ExpantaNum(1);
var qgSig2 = "\u0000";
var qgExpA = null;
var qgSig3 = "\u0000";
var qgM2 = new ExpantaNum(1);
var qgSig4 = "\u0000";
var qgExpB = null;
var QG_POW_10_308 = null;
function quarkGain() {
  if (voidAmt.isNaN()) return new ExpantaNum(0);
  var l = voidAmt.log10();
  if (l.lt(308.25)) return new ExpantaNum(0);
  var g = l.sub(308.25).div(1000).pow(3).floor().add(1);
  var s1 = (quarkUpg[11] ? 1 : 0) + "," + (quarkUpg[12] ? 1 : 0) + "," + (quarkUpg[13] ? 1 : 0) + "," + (quarkUpg[20] ? 1 : 0) + "," + (quarkUpg[21] ? 1 : 0) + "," + (elemBought[0] ? 1 : 0) + "," + (elemBought[1] ? 1 : 0) + "," + (elemBought[2] ? 1 : 0);
  if (s1 !== qgSig1) {
    qgSig1 = s1;
    var m1 = new ExpantaNum(1);
    if (quarkUpg[11]) m1 = m1.mul(2);
    if (quarkUpg[12]) m1 = m1.mul(10);
    if (quarkUpg[13]) m1 = m1.mul(50);
    if (quarkUpg[20]) m1 = m1.mul("1.79e12");
    if (quarkUpg[21]) m1 = m1.mul("1e68");
    if (elemBought[0]) m1 = m1.mul(2);
    if (elemBought[1]) m1 = m1.mul(10);
    if (elemBought[2]) m1 = m1.mul(10);
    qgM1 = m1;
  }
  g = g.mul(qgM1);
  var s2 = (elemBought[3] ? 1 : 0) + "," + (elemBought[4] ? 1 : 0) + "," + (elemBought[5] ? 1 : 0) + "," + (elemBought[6] ? 1 : 0) + "," + (elemBought[7] ? 1 : 0) + "," + (elemBought[8] ? 1 : 0) + "," + (elemBought[9] ? 1 : 0) + "," + (elemBought[12] ? 1 : 0) + "," + (elemBought[18] ? 1 : 0) + "," + (elemBought[22] ? 1 : 0) + "," + (elemBought[23] ? 1 : 0) + "," + (elemBought[25] ? 1 : 0);
  if (s2 !== qgSig2) {
    qgSig2 = s2;
    var ea = 1;
    if (elemBought[3]) ea *= 2;
    if (elemBought[4]) ea *= 5;
    if (elemBought[5]) ea *= 2;
    if (elemBought[6]) ea *= 25;
    if (elemBought[7]) ea *= 3;
    if (elemBought[8]) ea *= 50;
    if (elemBought[9]) ea *= 50;
    if (elemBought[12]) ea *= 100;
    if (elemBought[18]) ea *= 100;
    if (elemBought[22]) ea *= 100;
    if (elemBought[23]) ea *= 100000000;
    if (elemBought[25]) ea *= 100000000000;
    qgExpA = ea === 1 ? null : new ExpantaNum(ea);
  }
  if (qgExpA) g = g.pow(qgExpA);
  if (elemBought[26] && green.gt(1)) g = g.pow(green.log10().div(3).pow(1.2));
  if (quarkUpg[22]) g = g.pow(1.5);
  var s3 = lv[14] + "," + lv[15] + "," + lv[16] + "," + lv[17] + "," + lv[18];
  if (s3 !== qgSig3) {
    qgSig3 = s3;
    var m2 = new ExpantaNum(1);
    if (lv[14] > 0) m2 = m2.mul(new ExpantaNum(2).pow(lv[14]));
    if (lv[15] > 0) m2 = m2.mul(new ExpantaNum(3).pow(lv[15]));
    if (lv[16] > 0) m2 = m2.mul(new ExpantaNum(1.5).pow(lv[16]));
    if (lv[17] > 0) m2 = m2.mul(new ExpantaNum(2).pow(lv[17]));
    if (lv[18] > 0) m2 = m2.mul(new ExpantaNum(10).pow(lv[18]));
    qgM2 = m2;
  }
  g = g.mul(qgM2);
  var s4 = (quarkUpg[14] ? 1 : 0) + "," + (quarkUpg[15] ? 1 : 0) + "," + (quarkUpg[16] ? 1 : 0) + "," + (quarkUpg[17] ? 1 : 0) + "," + (quarkUpg[18] ? 1 : 0) + "," + (elemBought[33] ? 1 : 0) + "," + (upg20Bought ? 1 : 0);
  if (s4 !== qgSig4) {
    qgSig4 = s4;
    var eb = new ExpantaNum(1);
    if (quarkUpg[14]) eb = eb.mul(1.01);
    if (quarkUpg[15]) eb = eb.mul(1.1);
    if (quarkUpg[16]) eb = eb.mul(1.2);
    if (quarkUpg[17]) eb = eb.mul(1.5);
    if (quarkUpg[18]) eb = eb.mul(1.3);
    if (elemBought[33]) eb = eb.mul(new ExpantaNum("1e100"));
    if (upg20Bought) {
      if (!QG_POW_10_308) QG_POW_10_308 = new ExpantaNum(10).pow(new ExpantaNum(308));
      eb = eb.mul(QG_POW_10_308);
    }
    qgExpB = eb.equal(1) ? null : eb;
  }
  if (qgExpB) g = g.pow(qgExpB);
  return g;
}

function doQuarkReset() {
  var g = quarkGain();
  if (g.lte(0)) return;
  quarks = quarks.add(g);
  if (!elemBought[5] && quarks.gt(VOID_CAP)) quarks = new ExpantaNum(VOID_CAP);
  if (!quarkUpg[9]) {
    voidAmt = new ExpantaNum(0);
    for (var i = 0; i < lv.length; i++) lv[i] = 0;
    resetCount++;
  }
  if (!achs[21]) achs[21] = true;
}

var agSig1 = "\u0000";
var agM1 = new ExpantaNum(1);
var agSig2 = "\u0000";
var agM23 = new ExpantaNum(1);
var agSig3 = "\u0000";
var agExpC = null;
var agSig4 = "\u0000";
var agExpD = null;
var AG_POW_1_005 = undefined;
var AG_POW_1_1 = undefined;
var AG_POW_2_INF = undefined;
function atomGain() {
  if (quarks.isNaN()) return new ExpantaNum(0);
  if (quarks.lt(VOID_CAP)) return new ExpantaNum(0);
  var g = quarks.log10().div(308).floor().max(new ExpantaNum(1));
  var s1 = (elemBought[0] ? 1 : 0) + "," + (elemBought[1] ? 1 : 0) + "," + (elemBought[2] ? 1 : 0) + "," + (elemBought[3] ? 1 : 0) + "," + (elemBought[4] ? 1 : 0) + "," + (elemBought[5] ? 1 : 0);
  if (s1 !== agSig1) {
    agSig1 = s1;
    var m1 = new ExpantaNum(1);
    if (elemBought[0]) m1 = m1.mul(2);
    if (elemBought[1]) m1 = m1.mul(1.5);
    if (elemBought[2]) m1 = m1.mul(3);
    if (elemBought[3]) m1 = m1.mul(3);
    if (elemBought[4]) m1 = m1.mul(50);
    if (elemBought[5]) m1 = m1.mul(100);
    agM1 = m1;
  }
  g = g.mul(agM1);
  if (elemBought[6]) g = g.pow(1.5);
  var s2 = (elemBought[7] ? 1 : 0) + "," + (elemBought[8] ? 1 : 0) + "," + (elemBought[13] ? 1 : 0) + "," + (elemBought[16] ? 1 : 0) + "," + (elemBought[17] ? 1 : 0) + "," + (elemBought[18] ? 1 : 0) + "," + (elemBought[19] ? 1 : 0) + "," + (elemBought[20] ? 1 : 0) + "," + (elemBought[22] ? 1 : 0) + "," + (elemBought[23] ? 1 : 0) + "," + (elemBought[24] ? 1 : 0) + "," + (elemBought[25] ? 1 : 0) + "," + (quarkUpg[22] ? 1 : 0) + "," + ((chalDone[0] || chalReward[0]) ? 1 : 0);
  if (s2 !== agSig2) {
    agSig2 = s2;
    var m23 = new ExpantaNum(1);
    if (elemBought[7]) m23 = m23.mul(10);
    if (elemBought[8]) m23 = m23.mul(3);
    if (elemBought[13]) m23 = m23.mul(100);
    if (elemBought[16]) m23 = m23.mul(100);
    if (elemBought[17]) m23 = m23.mul(100);
    if (elemBought[18]) m23 = m23.mul(1000);
    if (elemBought[19]) m23 = m23.mul(10000);
    if (elemBought[20]) m23 = m23.mul(100000);
    if (elemBought[22]) m23 = m23.mul(10000);
    if (elemBought[23]) m23 = m23.mul(100);
    if (elemBought[24]) m23 = m23.mul(100);
    if (elemBought[25]) m23 = m23.mul(10000);
    if (quarkUpg[22]) m23 = m23.mul(100);
    if (chalDone[0] || chalReward[0]) m23 = m23.mul(1e6);
    agM23 = m23;
  }
  g = g.mul(agM23);
  if (chalDone[1] || chalReward[1]) g = g.pow(1e6);
  if (engineCount > 0) g = g.pow(new ExpantaNum(100).pow(engineCount));
  if (elemBought[26] && red.gt(1)) g = g.mul(red.log10().div(3).pow(1.1));
  if (infLvl > 0) {
    if (!AG_POW_2_INF) AG_POW_2_INF = {};
    if (AG_POW_2_INF[infLvl] === undefined) AG_POW_2_INF[infLvl] = new ExpantaNum(2).pow(infLvl);
    g = g.mul(AG_POW_2_INF[infLvl]);
  }
  var s3 = (elemBought[31] && ttparts.gt(0) ? 1 : 0) + "," + ttparts + "," + spaceLvl[10] + "," + (elemBought[32] ? 1 : 0) + "," + (timeBought ? 1 : 0);
  if (s3 !== agSig3) {
    agSig3 = s3;
    var ec = new ExpantaNum(1);
    if (elemBought[31] && ttparts.gt(0)) ec = ec.mul(new ExpantaNum(1.1).pow(ttparts));
    if (elemBought[32]) ec = ec.mul(1.05);
    if (timeBought) ec = ec.mul(1.05);
    if (spaceLvl[10] > 0) ec = ec.mul(new ExpantaNum(1.005).pow(spaceLvl[10]));
    agExpC = ec.equal(1) ? null : ec;
  }
  if (agExpC) g = g.pow(agExpC);
  if (spaceB[11] && cosmicDust.gt(1)) g = g.pow(cosmicDust.log10());
  if (cometUpg[7]) g = g.pow(comets.gte(100) ? comets.log10().div(2).pow(0.2) : new ExpantaNum(1));
  var s4 = (tyUpgs[2] ? 1 : 0) + "," + (elemBought[50] ? 1 : 0) + "," + (elemBought[51] ? 1 : 0);
  if (s4 !== agSig4) {
    agSig4 = s4;
    var ed = 1;
    if (tyUpgs[2]) ed *= 1.1;
    if (elemBought[50]) ed *= 2;
    if (elemBought[51]) ed *= 2;
    agExpD = ed === 1 ? null : new ExpantaNum(ed);
  }
  if (agExpD) g = g.pow(agExpD);
  if (legacyUpgs[5]) g = g.pow(new ExpantaNum(1e17));
  return g.floor().max(new ExpantaNum(1));
}

function doAtomReset() {
  var g = atomGain();
  if (g.lte(0)) return;
  atoms = atoms.add(g);
  atomResets++;
  quarks = new ExpantaNum(0);
  voidAmt = new ExpantaNum(0);
  for (var i = 0; i < quarkUpg.length; i++) quarkUpg[i] = false;
  resetCount = 0;
  maxReset = true;
  keptBase7 = 0;
  keptBase8 = 0;
  if (!achs[25]) achs[25] = true;
}

var ELEM_COST = ["1 Atom", "2 Atoms", "3 Atoms", "5 Atoms", "8 Atoms", "12 Atoms", "16 Atoms", "20 Atoms", "25 Atoms", "30 Atoms", "38 Atoms", "48 Atoms", "60 Atoms", "75 Atoms", "90 Atoms", "108 Atoms", "128 Atoms", "150 Atoms"];
var ELEM_COST_NUM = [1, 2, 3, 5, 8, 12, 16, 20, 25, 30, 38, 48, 60, 75, 90, 108, 128, 150];
var ELEM_COST_EN = [];
var INF_COST = null;
function elemCostNum(i) {
  if (i >= ELEM_COST_EN.length) ELEM_COST_EN.length = i + 1;
  if (ELEM_COST_EN[i] !== undefined) return ELEM_COST_EN[i];
  var c;
  if (i === 1) c = new ExpantaNum(ELEM_COST_NUM[0]);
  else if (i === 2) c = new ExpantaNum(ELEM_COST_NUM[1]);
  else if (i === 3) c = new ExpantaNum(6);
  else if (i === 4) c = new ExpantaNum(200);
  else if (i === 5) c = new ExpantaNum(1000);
  else if (i === 6) c = new ExpantaNum(20000);
  else if (i === 7) c = new ExpantaNum(1e7);
  else if (i === 8) c = new ExpantaNum(1e14);
  else if (i === 9) c = new ExpantaNum(1e17);
  else if (i === 10) c = new ExpantaNum(1e20);
  else if (i === 11) c = new ExpantaNum(1e23);
  else if (i === 12) c = new ExpantaNum(1e29);
  else if (i === 13) c = new ExpantaNum(2e29);
  else if (i === 14) c = new ExpantaNum(1e32);
  else if (i === 15) c = new ExpantaNum(1e34);
  else if (i === 16) c = new ExpantaNum(1e35);
  else if (i === 17) c = new ExpantaNum(2.5e35);
  else if (i === 18) c = new ExpantaNum(1e39);
  else if (i === 19) c = new ExpantaNum(1e45);
  else if (i === 20) c = new ExpantaNum(1e55);
  else if (i === 21) c = new ExpantaNum(1e66);
  else if (i === 22) c = new ExpantaNum(2.5e84);
  else if (i === 23) c = new ExpantaNum(1e93);
  else if (i === 24) c = new ExpantaNum(1e110);
  else if (i === 25) c = new ExpantaNum(1e136);
  else if (i === 26) c = new ExpantaNum(5e153);
  else if (i === 27) c = new ExpantaNum(1e210);
  else if (i === 28) c = new ExpantaNum(1e226);
  else if (i === 29) c = new ExpantaNum(1e234);
  else if (i === 30) c = new ExpantaNum(1e255);
  else if (i === 31) c = new ExpantaNum("1e598");
  else if (i === 32) c = new ExpantaNum("1e993");
  else if (i === 33) c = new ExpantaNum("1e1317");
  else if (i === 34) c = new ExpantaNum("1e6318");
  else if (i === 35) c = new ExpantaNum("1e6593");
  else if (i === 36) c = new ExpantaNum("1e6790");
  else if (i === 37) c = new ExpantaNum("1e141099");
  else if (i === 38) c = new ExpantaNum("1e143900");
  else if (i === 39) c = new ExpantaNum("1e3.7e6");
  else if (i === 40) c = new ExpantaNum("1e165e6");
  else if (i === 41) c = new ExpantaNum("1e300e6");
  else if (i === 42) c = new ExpantaNum("1e450e6");
  else if (i === 43) c = new ExpantaNum("1e1.11e9");
  else if (i === 44) c = new ExpantaNum("1e2.5e9");
  else if (i === 45) c = new ExpantaNum("1e4.2e9");
  else if (i === 46) c = new ExpantaNum("1e4.6e9");
  else if (i === 47) c = new ExpantaNum("1e5e9");
  else if (i === 48) c = new ExpantaNum("1e9.2e9");
  else if (i === 49) c = new ExpantaNum("1e16.5e9");
  else if (i === 50) c = new ExpantaNum("1e37e9");
  else if (i === 51) c = new ExpantaNum("1e950e9");
  else if (i === 52) c = new ExpantaNum("1e39e12");
  else if (i === 53) c = new ExpantaNum("1e6e15");
  else if (i === 54) c = new ExpantaNum(10).pow(new ExpantaNum(1e149));
  else if (i === 55) c = new ExpantaNum("1e16");
  else if (i === 56) c = new ExpantaNum("1e20");
  else if (i === 57) c = new ExpantaNum("1e72");
  else if (i === 58) c = new ExpantaNum(10).pow(new ExpantaNum(1e149));
  else if (i === 59) c = new ExpantaNum("1e603");
  else c = INF_COST ? INF_COST : (INF_COST = new ExpantaNum(Infinity));
  ELEM_COST_EN[i] = c;
  return c;
}
function elemAffordable(i) {
  if (i === 57) return antimatter.gte(new ExpantaNum("1e72"));
  if (i === 55 || i === 56) {
    var ecx = i === 55 ? new ExpantaNum("1e16") : new ExpantaNum("1e20");
    return antimatter.gte(ecx) && matter.gte(ecx);
  }
  if (i === 58 && (!elemBought[54] || !elemBought[55] || !elemBought[56])) return false;
  if (i === 59) return legacyEnergy.gte(new ExpantaNum("1e603"));
  return atoms.gte(elemCostNum(i));
}
function elemCostStr(i) {
  if (i === 1) return ELEM_COST[0];
  if (i === 2) return ELEM_COST[1];
  if (i === 3) return "6 Atoms";
  if (i === 4) return "200 Atoms";
  if (i === 5) return "1k Atoms";
  if (i === 6) return "20k Atoms";
  if (i === 7) return "10M Atoms";
  if (i === 8) return "100T Atoms";
  if (i === 9) return "100Qa Atoms";
  if (i === 10) return "100Qt Atoms";
  if (i === 11) return "100Sx Atoms";
  if (i === 12) return "100Oc Atoms";
  if (i === 13) return "200Oc Atoms";
  if (i === 14) return "100No Atoms";
  if (i === 15) return "10De Atoms";
  if (i === 16) return "100Dc Atoms";
  if (i === 17) return "250Dc Atoms";
  if (i === 18) return "1DDc Atoms";
  if (i === 19) return "1QaDc Atoms";
  if (i === 20) return "10SpDc Atoms";
  if (i === 21) return "1Uvg Atoms";
  if (i === 22) return "25SpVg Atoms";
  if (i === 23) return "1Tg Atoms";
  if (i === 24) return "100QiTg Atoms";
  if (i === 25) return "10QaQag Atoms";
  if (i === 26) return "5Qig Atoms";
  if (i === 27) return "1NoSxg Atoms";
  if (i === 28) return "10QaSpg Atoms";
  if (i === 29) return "1SpSpg Atoms";
  if (i === 30) return "1QaOcg Atoms";
  if (i === 31) return "10OcNogCe Atoms";
  if (i === 32) return "1TgTr Atoms";
  if (i === 33) return "1OcTgQadr Atoms";
  if (i === 34) return "1e6318 Atoms";
  if (i === 35) return "1e6593 Atoms";
  if (i === 36) return "1e6790 Atoms";
  if (i === 37) return "1e141099 Atoms";
  if (i === 38) return "1e143900 Atoms";
  if (i === 39) return "1e3.7M Atoms";
  if (i === 40) return "1e165M Atoms";
  if (i === 41) return "1e300M Atoms";
  if (i === 42) return "1e450M Atoms";
  if (i === 43) return "1e1.11B Atoms";
  if (i === 44) return "1e2.5B Atoms";
  if (i === 45) return "1e4.20B Atoms";
  if (i === 46) return "1e4.60B Atoms";
  if (i === 47) return "1e5B Atoms";
  if (i === 48) return "1e9.2B Atoms";
  if (i === 49) return "1e16.5B Atoms";
  if (i === 50) return "1e37B Atoms";
  if (i === 51) return "1e950B Atoms";
  if (i === 52) return "1e39T Atoms";
  if (i === 53) return "1e6Qa Atoms";
  if (i === 54) return "1e1e149 Atoms";
  if (i === 55) return "10Qa Antimatter & Matter";
  if (i === 56) return "100Qt Antimatter & Matter";
  if (i === 57) return "TVg Antimatter";
  if (i === 58) return "1e1e149 Atoms";
  if (i === 59) return "1e603 Legacy Energy";
  return "1J10";
}
var ELEM_EFFECT = [
  "x2 Atoms, Autobuys Void upgrades, x2 Void, x2 Quarks, +20 levels to all Void upgrades",
  "x10 Quarks, Void ^1.1, x1.5 Atoms, +1000% Quarks on reset per second", "Autobuys Quark upgrades, x3 Atoms, Void ^5, x10 Quarks",   "Void ^2, x3 Atoms, Quarks ^2", "Void ^5, Quarks ^5, x50 Atoms",   "Quarks ^2, Void ^2, x100 Atoms, Uncap Quarks", "Void ^25, Quarks ^25, Atoms ^1.5", "x10 Atoms, Quarks ^3, Void ^3", "Void ^50, Quarks ^50, x3 Atoms", "Void ^50, Quarks ^50", "Unlocks the Challenges tab", "^100 Void", "^100 Quarks", "x100 Atoms", "Unlocks the Infinite tab", "Infinite Upgrade cost x25 -> x10", "x100 Atoms, Infinite Upgrade cost x10 -> x5", "Atoms +10000%/s, x100 Atoms", "x1k Atoms, ^100 Quarks, ^10000 Void", "x10K Atoms, Infinite Upgrade cost x5 -> x4", "x100K Atoms, Infinite Upgrade cost x4 -> x3", "Infinite Upgrade max level +100", "x10K Atoms, ^100 Void, ^100 Quarks", "^100M Void, ^100M Quarks, x100 Atoms", "x100 Atoms, Infinite upgrade max +500, Autobuys Infinite upgrade", "x10K Atoms, ^100B Void, ^100B Quarks", "Unlocks the RGB tab", "RGB ^1.05/s, RGB cap 1e3003", "RGB ^1.3/s, RGB cap 1e3M", "RGB ^100/s, RGB cap 1e10DTg", "Infinite upgrade max +9300", "Unlocks the Time Travelling tab", "Atoms ^1.05", "Quarks ^1e100, Void ^1e100", "Infinite upgrade max +90000, Infinite upgrade cost x3 -> x4.5", "Unlocks Time in Time Travelling", "Unlocks the Space tab", "Cosmic dust rate x (log10(cosmic dust))^1.2", "x10 cosmic dust", "x100 cosmic dust, x10 comets", "x1B cosmic dust, x2 comets, Cosmic dust & Comets x(log10(CD)^1)", "Cosmic dust ^1.05, x40 comets", "Cosmic dust ^1.1, Comets ^1.2",
  "x3 Supernovas, Unlocks a new Supernova Upgrade", "x100 Clicks", "x5000 Clicks, x3 Supernovas", "x1M Clicks, x10 Supernovas", "Unlocks the Tycoon tab", "Autobuys TT parts, Autoclicks, Clicks ^1.5, Money ^2, Cosmic dust ^1.1, Comets ^1.2, Supernova ^1.3", "Money ^2, Clicks ^1.5, Cosmic dust ^1.4, Comets ^1.5, Supernova ^1.6", "Atoms ^2, Space currencies ^2, Clicks ^2, Money ^2, Autobuys clicker upgrades", "Atoms ^2, Space ^2, Clicks ^2, Money ^2, Autobuys comet upgrades, +1000% Supernova/s", "RGB cap 1e1e1e100, RGB power ^1e1e100", "Unlocks the Material tab", "x100 Antimatter & Matter", "x1M Antimatter & Matter, Unlocks the Upgradables tab", "Autobuys Matter & Antimatter Dimensions, Antimatter & Matter ^2", "x100 Legacy Energy, Unlocks Legacy Upgrade III", "Unlocks a new Infinite Upgrade", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon...", "Coming soon..."];
