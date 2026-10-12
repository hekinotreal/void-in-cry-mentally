var SPACE_UPGRADES = [
  { name: "A new beginning", info: "Start generating cosmic dust", cost: new ExpantaNum(0) },
  { name: "Finally a new feauture", info: "+1 base cosmic dust", cost: new ExpantaNum(25) },
  { name: "Crazy how we went from literally void to space thingy thingy", info: "x2 cosmic dust", cost: new ExpantaNum(50) },
  { name: "split way huh? pretty cool", info: "x1.5 cosmic dust", cost: new ExpantaNum(100) },
  { name: "WOW", info: "x5 cosmic dust", cost: new ExpantaNum(150) },
  { name: "[name input here]", info: "generate cosmic dust faster", cost: new ExpantaNum(500) },
  { name: "base after base", info: "x4 cosmic dust", cost: new ExpantaNum(1500) },
  { name: "holy moly", info: "x10 cosmic dust", cost: new ExpantaNum(4000) },
  { name: "double it and give it to the next person", info: "x2 cosmic dust", cost: new ExpantaNum(40000) },
  { name: "finally main world boost", info: "Atoms ^1.005", cost: new ExpantaNum(100000), maxLvl: 4 },
  { name: "finally peak boost for atoms", info: "x10 cosmic dust, Atoms ^log10(CD)", cost: new ExpantaNum(1e6) },
  { name: "still boosting the atoms huh?", info: "x5 cosmic dust", cost: new ExpantaNum(2e7) },
  { name: "actually BIG boost", info: "x50 cosmic dust", cost: new ExpantaNum(1e8) },
  { name: "Big era", info: "x10 cosmic dust", cost: new ExpantaNum(2e10) }
];
function spaceTreeLevels() {
  var l = [[1]];
  if (spaceB[1]) l.push([2]);
  if (spaceB[2]) l.push([3, 4]);
  if (spaceB[3] && spaceB[4]) l.push([5, 6, 7]);
  if (spaceB[5] && spaceB[6] && spaceB[7]) l.push([8, 9]);
  if (spaceB[8] && spaceB[9]) l.push([10]);
  if ((spaceLvl[10] || 0) >= 4) l.push([11, 12]);
  if (spaceB[11] && spaceB[12]) l.push([13, 14]);
  return l;
}
var cdrBaseSig = "\u0000";
var cdrBase = new ExpantaNum(1);
var cdrMidSig = "\u0000";
var cdrMid = new ExpantaNum(1);
var cdrTailSig = "\u0000";
var cdrExpA = null;
var cdrExpB = null;
var cdrExpC = null;
var CDR_CAP = new ExpantaNum("1.79e308");
function cosmicDustRate() {
  var bSig = (spaceB[2] ? 1 : 0) + "," + (spaceB[3] ? 1 : 0) + "," + (spaceB[4] ? 1 : 0) + "," + (spaceB[5] ? 1 : 0) + "," + (spaceB[6] ? 1 : 0) + "," + (spaceB[7] ? 1 : 0) + "," + (spaceB[8] ? 1 : 0) + "," + (spaceB[9] ? 1 : 0) + "," + (spaceB[11] ? 1 : 0) + "," + (spaceB[12] ? 1 : 0) + "," + (spaceB[13] ? 1 : 0) + "," + (spaceB[14] ? 1 : 0) + "," + (elemBought[38] ? 1 : 0) + "," + (cometUpg[0] ? 1 : 0);
  if (bSig !== cdrBaseSig) {
    cdrBaseSig = bSig;
    var rb = new ExpantaNum(1);
    if (spaceB[2]) rb = rb.add(1);
    if (spaceB[3]) rb = rb.mul(2);
    if (spaceB[4]) rb = rb.mul(1.5);
    if (spaceB[5]) rb = rb.mul(5);
    if (spaceB[6]) rb = rb.mul(2);
    if (spaceB[7]) rb = rb.mul(4);
    if (spaceB[8]) rb = rb.mul(10);
    if (spaceB[9]) rb = rb.mul(2);
    if (spaceB[11]) rb = rb.mul(10);
    if (spaceB[12]) rb = rb.mul(5);
    if (spaceB[13]) rb = rb.mul(50);
    if (spaceB[14]) rb = rb.mul(10);
    if (elemBought[38]) rb = rb.mul(10);
    if (cometUpg[0]) rb = rb.mul(2.5);
    cdrBase = rb;
  }
  var r = cdrBase;
  if (cometUpg[1] && cosmicDust.gte(1e5)) {
    var twop = Math.floor(cosmicDust.log10().sub(5).div(ExpantaNum.log10(2.5)).toNumber() + 1e-9);
    if (twop > 0) r = r.mul(new ExpantaNum(1.5).pow(twop).min(CDR_CAP));
  }
  if (cometUpg[2]) r = r.mul(10);
  if (cometUpg[3]) {
    var p = comets.gt(1) ? comets.log10().div(308).pow(0.1).add(1) : new ExpantaNum(1);
    r = r.pow(p).mul(50);
  }
  var sc = 0;
  for (var si1 = 1; si1 < spaceB.length; si1++) if (spaceB[si1]) sc++;
  for (var ci1 = 0; ci1 < cometUpg.length; ci1++) if (cometUpg[ci1]) sc++;
  var mSig = (cometUpg[4] ? 1 : 0) + "," + (cometUpg[6] ? 1 : 0) + "," + sc + "," + (cometUpg[7] ? 1 : 0) + "," + (elemBought[39] ? 1 : 0) + "," + (cometUpg[8] ? 1 : 0);
  if (mSig !== cdrMidSig) {
    cdrMidSig = mSig;
    var rm = new ExpantaNum(1);
    if (cometUpg[4]) rm = rm.mul(100);
    if (cometUpg[6]) rm = rm.mul(new ExpantaNum(5).pow(sc));
    if (cometUpg[7]) rm = rm.mul(100);
    if (elemBought[39]) rm = rm.mul(100);
    if (cometUpg[8]) rm = rm.mul(1e6);
    cdrMid = rm;
  }
  r = r.mul(cdrMid);
  if (cometUpg[9]) r = r.pow(1.05);
  if (snMilestones[0]) r = r.mul(4);
  if (elemBought[40]) r = r.mul(1e9);
  if (elemBought[40] && cosmicDust.gt(1)) r = r.mul(cosmicDust.log10().pow(1));
  var tSig = (elemBought[41] ? 1 : 0) + "," + (elemBought[42] ? 1 : 0) + "," + (snUpg[1] ? 1 : 0) + "," + (snUpg[2] ? 1 : 0) + "," + (snMilestones[1] ? 1 : 0) + "," + clickUpgLvl[0] + "," + perkLvl[2] + "," + (tyUpgs[1] ? 1 : 0) + "," + (tyUpgs[2] ? 1 : 0) + "," + (elemBought[48] ? 1 : 0) + "," + (elemBought[49] ? 1 : 0) + "," + (snUpg[3] ? 1 : 0) + "," + (elemBought[50] ? 1 : 0) + "," + (elemBought[51] ? 1 : 0) + "," + (snUpg[4] ? 1 : 0) + "," + (cdUpg ? 1 : 0) + "," + (cometUpg[10] ? 1 : 0) + "," + (snUpg[5] ? 1 : 0) + "," + (legacyUpgs[5] ? 1 : 0);
  if (tSig !== cdrTailSig) {
    cdrTailSig = tSig;
    var teA = 1;
    if (elemBought[41]) teA *= 1.05;
    if (elemBought[42]) teA *= 1.1;
    cdrExpA = teA === 1 ? null : new ExpantaNum(teA);
    var teB = new ExpantaNum(1);
    if (snUpg[2]) teB = teB.mul(1.1);
    if (snMilestones[1]) teB = teB.mul(1.05);
    if (clickUpgLvl[0] > 0) teB = teB.mul(new ExpantaNum(1.01).pow(clickUpgLvl[0]));
    if (perkLvl[2] > 0) teB = teB.mul(new ExpantaNum(1.01).pow(perkLvl[2]));
    cdrExpB = teB;
    var teC = 1;
    if (tyUpgs[1]) teC *= 1.1;
    if (tyUpgs[2]) teC *= 1.2;
    if (elemBought[48]) teC *= 1.1;
    if (elemBought[49]) teC *= 1.4;
    if (snUpg[3]) teC *= 2;
    if (elemBought[50]) teC *= 2;
    if (elemBought[51]) teC *= 2;
    if (snUpg[4]) teC *= 10;
    if (cdUpg) teC *= 10;
    if (cometUpg[10]) teC *= 100;
    if (snUpg[5]) teC *= 10000;
    if (legacyUpgs[5]) teC *= 1e8;
    cdrExpC = teC === 1 ? null : new ExpantaNum(teC);
  }
  if (cdrExpA) r = r.pow(cdrExpA);
  if (snUpg[1]) r = r.mul(100);
  if (cdrExpB) r = r.pow(cdrExpB);
  if (elemBought[37] && cosmicDust.gt(1)) r = r.mul(cosmicDust.log10().pow(1.2));
  if (cdrExpC) r = r.pow(cdrExpC);
  return r;
}
function buySpace(i) {
  var u = SPACE_UPGRADES[i - 1];
  if (!u) return;
  var uMax = u.maxLvl || 1;
  if ((spaceLvl[i] || 0) >= uMax) return;
  if (cosmicDust.lt(u.cost)) return;
  cosmicDust = cosmicDust.sub(u.cost);
  spaceLvl[i] = (spaceLvl[i] || 0) + 1;
  spaceB[i] = true;
  save();
}

var COMET_UPGRADES = [
  { name: "Comet Boost", info: "x2.5 cosmic dust", cost: new ExpantaNum(0.1) },
  { name: "CD exchanging", info: "x10 comets, Cosmic dust x1.5 every 2.5x (from 100K CD), cap x1.79e308", cost: new ExpantaNum(0.2) },
  { name: "we are getting faster with this peak boost", info: "x10 cosmic dust, x2 comets", cost: new ExpantaNum(1.5) },
  { name: "WOW new update starts fresh with a formula", info: "x50 cosmic dust, Cosmic dust ^((log1e308(Comets))^0.1+1), x3 comets", cost: new ExpantaNum(3) },
  { name: "we are getting op way too fast, we should slow down arent we?", info: "x100 cosmic dust, Comets x(log100(CD)^0.4+1)", cost: new ExpantaNum(30) },
  { name: "dayum dude smth new", info: "Comets x1.1 per bought comet upgrade", cost: new ExpantaNum(195) },
  { name: "we are getting closer and closerr", info: "x5 cosmic dust per bought space/comet upgrade, x2 comets, Autobuy first 5 cosmic dust upgrades", cost: new ExpantaNum(360) },
  { name: "we are really close to something cool", info: "Atoms ^(log100(Comets)^0.2), x2 comets, x100 cosmic dust", cost: new ExpantaNum(1750) },
  { name: "WHAT thats really good jump no way", info: "x1M cosmic dust, x50 comets", cost: new ExpantaNum(50000) },
  { name: "WHATTTT already exponents and omg what is that? is that new reset layer??? omg buy me to see it btw loll", info: "Cosmic dust ^1.05, Comets ^1.05", cost: new ExpantaNum("4e11") },
  { name: "Wow legacy is cool", info: "x100 Legacy Energy, Space ^100, Money ^2, Antimatter ^2, Matter ^2", cost: new ExpantaNum(10).pow(new ExpantaNum("2e6")) }
];
var cgrSig1 = "\u0000";
var cgrS1 = new ExpantaNum(1);
var cgrSig2 = "\u0000";
var cgrS2 = new ExpantaNum(1);
var cgrSig3 = "\u0000";
var cgrExp2a = null;
var cgrExp2b = null;
var cgrExp3 = null;
function cometGainRaw() {
  if (!cosmicDust.gt(1)) return new ExpantaNum(0);
  var s1Sig = (cometUpg[1] ? 1 : 0) + "," + (cometUpg[2] ? 1 : 0) + "," + (cometUpg[3] ? 1 : 0);
  if (s1Sig !== cgrSig1) {
    cgrSig1 = s1Sig;
    var g1 = new ExpantaNum(1);
    if (cometUpg[1]) g1 = g1.mul(10);
    if (cometUpg[2]) g1 = g1.mul(2);
    if (cometUpg[3]) g1 = g1.mul(3);
    cgrS1 = g1;
  }
  var cb2 = 0;
  for (var cgi2 = 0; cgi2 < cometUpg.length; cgi2++) if (cometUpg[cgi2]) cb2++;
  var s2Sig = (cometUpg[5] ? 1 : 0) + "," + cb2 + "," + (cometUpg[6] ? 1 : 0) + "," + (cometUpg[7] ? 1 : 0) + "," + (elemBought[39] ? 1 : 0) + "," + (cometUpg[8] ? 1 : 0);
  if (s2Sig !== cgrSig2) {
    cgrSig2 = s2Sig;
    var g2 = new ExpantaNum(1);
    if (cometUpg[5]) g2 = g2.mul(new ExpantaNum(1.1).pow(cb2));
    if (cometUpg[6]) g2 = g2.mul(2);
    if (cometUpg[7]) g2 = g2.mul(2);
    if (elemBought[39]) g2 = g2.mul(10);
    if (cometUpg[8]) g2 = g2.mul(50);
    cgrS2 = g2;
  }
  var g = cosmicDust.log10().div(12).pow(1.1).mul(0.1);
  g = g.mul(cgrS1);
  if (cometUpg[4]) g = g.mul(cosmicDust.gt(1) ? cosmicDust.log10().div(2).pow(0.4).add(1) : 1);
  g = g.mul(cgrS2);
  if (cometUpg[9]) g = g.pow(1.05);
  if (elemBought[40]) g = g.mul(2);
  if (elemBought[40] && cosmicDust.gt(1)) g = g.mul(cosmicDust.log10().pow(1));
  if (elemBought[41]) g = g.mul(40);
  var s3Sig = (snUpg[2] ? 1 : 0) + "," + (snMilestones[1] ? 1 : 0) + "," + clickUpgLvl[1] + "," + perkLvl[2];
  if (s3Sig !== cgrSig3) {
    cgrSig3 = s3Sig;
    var e2 = new ExpantaNum(1);
    if (snUpg[2]) e2 = e2.mul(1.1);
    if (snMilestones[1]) e2 = e2.mul(1.1);
    if (clickUpgLvl[1] > 0) e2 = e2.mul(new ExpantaNum(1.01).pow(clickUpgLvl[1]));
    if (perkLvl[2] > 0) e2 = e2.mul(new ExpantaNum(1.01).pow(perkLvl[2]));
    var e3 = 1;
    if (tyUpgs[2]) e3 *= 1.2;
    if (elemBought[48]) e3 *= 1.2;
    if (elemBought[49]) e3 *= 1.5;
    if (elemBought[50]) e3 *= 2;
    if (elemBought[51]) e3 *= 2;
    if (snUpg[4]) e3 *= 10;
    if (cdUpg) e3 *= 10;
    if (cometUpg[10]) e3 *= 100;
    if (snUpg[5]) e3 *= 10000;
    if (legacyUpgs[5]) e3 *= 1e8;
    cgrExp2a = elemBought[42] ? new ExpantaNum(1.2) : null;
    cgrExp2b = e2.equal(1) ? null : e2;
    cgrExp3 = e3 === 1 ? null : new ExpantaNum(e3);
  }
  if (cgrExp2a) g = g.pow(cgrExp2a);
  if (snUpg[1]) g = g.mul(20);
  if (cgrExp2b) g = g.pow(cgrExp2b);
  if (snMilestones[0]) g = g.mul(2);
  if (cgrExp3) g = g.pow(cgrExp3);
  return g;
}
function cometGain() {
  if (!cosmicDust.gte(1e12)) return new ExpantaNum(0);
  return cometGainRaw();
}
function doCometReset() {
  if (!spaceB[14] || cosmicDust.lt(new ExpantaNum(1e12))) return;
  comets = comets.add(cometGain());
  cosmicDust = new ExpantaNum(0);
  for (var si = 0; si < spaceB.length; si++) spaceB[si] = false;
  for (var s2 = 0; s2 < spaceLvl.length; s2++) spaceLvl[s2] = 0;
  save();
}
function buyCometUpg(i) {
  var u = COMET_UPGRADES[i - 1];
  if (!u || cometUpg[i - 1]) return;
  if (i === 11 && !cdUpg) return;
  if (comets.lt(u.cost)) return;
  comets = comets.sub(u.cost);
  cometUpg[i - 1] = true;
  save();
}

var SN_UPGRADES = [
  { name: "Finally something new", info: "Autobuys all Cosmic Dust upgrades, Generates +1000% Comets/s", cost: new ExpantaNum(1) },
  { name: "Average boost in gut2", info: "x100 cosmic dust, x20 comets, x1.3 supernova", cost: new ExpantaNum(5) },
  { name: "simple boost just an arrow", info: "Cosmic dust ^1.1, Comets ^1.1", cost: new ExpantaNum(100) },
  { name: "we are getting more money we are richer than elon musk", info: "Money ^2, Clicks ^2, Cosmic dust ^2, Money ^2", cost: new ExpantaNum("5e7") },
  { name: "Material power", info: "Space ^10, Antimatter & Matter ^1.5", cost: new ExpantaNum("5e10") },
  { name: "Wow quality", info: "Supernova ^2, Money ^100, Space ^10000, x100000 Legacy Energy", cost: new ExpantaNum(1e18) },
  { name: "Click-city", info: "Clicks ^1.15", cost: new ExpantaNum("1e37") }
];
var MILESTONES = [
  { name: "A brand new universe", req: "Have 1 Supernova total", info: "x4 cosmic dust, x2 comets" },
  { name: "Big boom moment", req: "Have 10 Supernova total", info: "Cosmic dust ^1.05, Comets ^1.1" },
  { name: "Clicker time", req: "Have 100 Supernova total", info: "Unlocks the Clicker tab" }
];
function snGainRaw() {
  if (!comets.gte(1e15)) return new ExpantaNum(0);
  var sg = new ExpantaNum(5 * Math.log10(comets.log10().sub(13).toNumber()));
  if (snUpg[1]) sg = sg.mul(1.3);
  if (elemBought[43]) sg = sg.mul(3);
  if (elemBought[45]) sg = sg.mul(3);
  if (elemBought[46]) sg = sg.mul(10);
  if (elemBought[48]) sg = sg.pow(1.3);
  if (elemBought[49]) sg = sg.pow(1.6);
  if (cdUpg) sg = sg.pow(2);
  if (snUpg[5]) sg = sg.pow(2);
  if (clickUpgLvl[2] > 0) sg = sg.pow(new ExpantaNum(1.05).pow(clickUpgLvl[2]));
  if (perkLvl[0] > 0) sg = sg.mul(new ExpantaNum(perkLvl[0] + 1));
  return sg;
}
function snGain() {
  return snGainRaw().floor();
}
function doSupernovaReset() {
  var g = snGain();
  if (g.lte(0)) return;
  supernova = supernova.add(g);
  snTotal = snTotal.add(g);
  cosmicDust = new ExpantaNum(0);
  comets = new ExpantaNum(0);
  for (var si = 0; si < spaceB.length; si++) spaceB[si] = false;
  for (var s2 = 0; s2 < spaceLvl.length; s2++) spaceLvl[s2] = 0;
  for (var ci = 0; ci < cometUpg.length; ci++) cometUpg[ci] = false;
  save();
}
function buySupernovaUpg(i) {
  var u = SN_UPGRADES[i - 1];
  if (!u || snUpg[i - 1]) return;
  if (i === 5 && !legacyUpgs[4]) return;
  if (i === 7 && !legacyUpgs[6]) return;
  if (supernova.lt(u.cost)) return;
  supernova = supernova.sub(u.cost);
  snUpg[i - 1] = true;
  save();
}
