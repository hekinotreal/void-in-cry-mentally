var SAVE_KEY = "voidSave";
var VIG_KEY = "void";
var VOID_CAP = new ExpantaNum("179e306"); // 179UCe
var voidAmt = new ExpantaNum(0);
var quarks = new ExpantaNum(0);
var lv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var quarkUpg = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var keptBase7 = 0;
var keptBase8 = 0;
var resetCount = 0;
var maxReset = false;
var infLvl = 0;
var inf2Lvl = 0;
var red = new ExpantaNum(1);
var green = new ExpantaNum(1);
var blue = new ExpantaNum(1);
var ttparts = new ExpantaNum(0);
var timeBought = false;
var cosmicDust = new ExpantaNum(0);
var comets = new ExpantaNum(0);
var cometUpg = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var supernova = new ExpantaNum(0);
var snTotal = new ExpantaNum(0);
var snMilestones = [false, false, false, false, false];
var snUpg = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var clicks = new ExpantaNum(0);
var clickerLvl = 0;
var perks = 0;
var perkLvl = [0, 0, 0];
var PERK_MAX = [10, 25, 100];
var clickUpgLvl = [0, 0, 0, 0];
var money = new ExpantaNum(0);
var tyUpgs = [false, false, false, false, false];
var matter = new ExpantaNum(0);
var antimatter = new ExpantaNum(0);
var matterDims = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)];
var antimatterDims = [new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0), new ExpantaNum(0)];
var matSide = "matter";
var curMatSideShown = "none";
var dim9count = 0;
var matUpgs = [false, false, false, false, false];
var legacyEnergy = new ExpantaNum(0);
var legacyUpgs = [false, false, false, false, false, false, false, false];
var upg20Bought = false;
var engineCount = 0;
var cdUpg = false;
var candy = new ExpantaNum(0);
var lastCandy = 0;
var candyUpgLvl = 0;
var candyUpgLvl2 = 0;
var candyUpgLvl3 = 0;
var candyUpgLvl4 = 0;
var candyUpgLvl6 = 0;
var pumpkin = new ExpantaNum(0);
var pumpUpg = [false, false, false, false, false, false, false, false, false, false, false];
var harvPts = new ExpantaNum(0);
var lastHarv = 0;
var harvUpg = 0;
var CANDY_CD = 5000;
function candyUpgCost() {
  return new ExpantaNum(5).mul(new ExpantaNum(2).pow(candyUpgLvl));
}
function buyCandyUpg() {
  if (candyUpgLvl >= 20) return;
  var c = candyUpgCost();
  if (candy.lt(c)) return;
  candy = candy.sub(c);
  candyUpgLvl++;
  save();
}
function candyUpg4Cost() {
  return new ExpantaNum(1000).mul(new ExpantaNum(50).pow(candyUpgLvl4));
}
function buyCandyUpg4() {
  if (candyUpgLvl4 >= 400) return;
  var c = candyUpg4Cost();
  if (candy.lt(c)) return;
  candy = candy.sub(c);
  candyUpgLvl4++;
  save();
}
function candyBase() {
  return new ExpantaNum(1.5).add(new ExpantaNum(0.1).mul(candyUpgLvl2)).mul(new ExpantaNum(1.1).pow(candyUpgLvl4));
}
function candyUpg6Cost() {
  return new ExpantaNum(1e96).mul(new ExpantaNum(1000).pow(candyUpgLvl6));
}
function buyCandyUpg6() {
  if (candyUpgLvl6 >= 100000) return;
  if (candy.lt(candyUpg6Cost())) return;
  candy = candy.sub(candyUpg6Cost());
  candyUpgLvl6++;
  save();
}
function candyAmount() {
  var amt = candyBase().pow(candyUpgLvl).mul(pumpUpg[0] ? 3 : 1).mul(pumpUpg[1] ? 5 : 1).mul(pumpUpg[2] ? 50 : 1).mul(pumpUpg[3] ? 100 : 1).mul(new ExpantaNum(1.1).pow(candyUpgLvl6));
  if (pumpUpg[4]) amt = amt.pow(1.1);
  if (pumpUpg[5]) amt = amt.pow(1.2);
  if (pumpUpg[7]) amt = amt.pow(1.2);
  if (pumpUpg[8]) amt = amt.pow(1.3);
  if (pumpUpg[9]) amt = amt.pow(1.2);
  if (pumpUpg[10]) amt = amt.pow(1.5);
  if (harvUpg >= 2) amt = amt.pow(1.05);
  if (harvUpg >= 3 && harvPts.gte(2)) amt = amt.mul(harvPts.logBase(2));
  return amt;
}
function candyUpg2Cost() {
  return new ExpantaNum(15).mul(new ExpantaNum(3).pow(candyUpgLvl2));
}
function buyCandyUpg2() {
  if (candyUpgLvl2 >= 100) return;
  var c = candyUpg2Cost();
  if (candy.lt(c)) return;
  candy = candy.sub(c);
  candyUpgLvl2++;
  save();
}
function candyUpg3Cost() {
  return new ExpantaNum(30).mul(new ExpantaNum(10).pow(candyUpgLvl3));
}
function buyCandyUpg3() {
  if (candyUpgLvl3 >= 3) return;
  var c = candyUpg3Cost();
  if (candy.lt(c)) return;
  candy = candy.sub(c);
  candyUpgLvl3++;
  save();
}
function candyCd() {
  return 5000 - candyUpgLvl3 * 1000 - (pumpUpg[2] ? 1000 : 0) - (pumpUpg[3] ? 500 : 0) - (pumpUpg[4] ? 400 : 0);
}
function collectCandy() {
  var now = Date.now();
  if (now - lastCandy < candyCd()) return;
  lastCandy = now;
  candy = candy.add(candyAmount());
  save();
}
function pumpkinGain() {
  var g = candy.log10();
  if (g.lt(1)) return new ExpantaNum(0);
  g = g.log10().mul(3.5).sub(pumpUpg[9] ? 0 : (pumpUpg[5] ? 3.2 : 4.3)).floor();
  if (g.lt(0)) return new ExpantaNum(0);
  g = g.mul(pumpUpg[0] ? 2 : 1).mul(pumpUpg[1] ? 3 : 1).mul(pumpUpg[2] ? 10 : 1).mul(pumpUpg[3] ? 500 : 1).mul(pumpUpg[4] ? 50 : 1).mul(new ExpantaNum(1.1).pow(candyUpgLvl6));
  if (pumpUpg[7]) g = g.pow(1.05);
  if (pumpUpg[8]) g = g.pow(1.2);
  if (pumpUpg[9]) g = g.pow(1.1);
  if (pumpUpg[10]) g = g.pow(2);
  return g;
}
function buyPumpUpg() {
  if (pumpUpg[0]) return;
  if (pumpkin.lt(1)) return;
  pumpkin = pumpkin.sub(1);
  pumpUpg[0] = true;
  save();
}
function buyPumpUpg2() {
  if (pumpUpg[1]) return;
  if (pumpkin.lt(2)) return;
  pumpkin = pumpkin.sub(2);
  pumpUpg[1] = true;
  save();
}
function buyPumpUpg3() {
  if (pumpUpg[2]) return;
  if (pumpkin.lt(6)) return;
  pumpkin = pumpkin.sub(6);
  pumpUpg[2] = true;
  save();
}
function buyPumpUpg4() {
  if (pumpUpg[3]) return;
  if (pumpkin.lt(60)) return;
  pumpkin = pumpkin.sub(60);
  pumpUpg[3] = true;
  save();
}
function buyPumpUpg5() {
  if (pumpUpg[4]) return;
  if (pumpkin.lt(60000)) return;
  pumpkin = pumpkin.sub(60000);
  pumpUpg[4] = true;
  save();
}
function buyPumpUpg6() {
  if (pumpUpg[5]) return;
  if (pumpkin.lt(3000000)) return;
  pumpkin = pumpkin.sub(3000000);
  pumpUpg[5] = true;
  save();
}
function buyPumpUpg7() {
  if (pumpUpg[6]) return;
  if (pumpkin.lt(100000000)) return;
  pumpkin = pumpkin.sub(100000000);
  pumpUpg[6] = true;
  save();
}
function buyPumpUpg8() {
  if (pumpUpg[7]) return;
  if (pumpkin.lt(300000000)) return;
  pumpkin = pumpkin.sub(300000000);
  pumpUpg[7] = true;
  save();
}
function buyPumpUpg9() {
  if (pumpUpg[8]) return;
  if (pumpkin.lt(2000000000)) return;
  pumpkin = pumpkin.sub(2000000000);
  pumpUpg[8] = true;
  save();
}
function buyPumpUpg10() {
  if (pumpUpg[9]) return;
  if (pumpkin.lt("1e20")) return;
  pumpkin = pumpkin.sub(new ExpantaNum("1e20"));
  pumpUpg[9] = true;
  save();
}
function buyPumpUpg11() {
  if (pumpUpg[10]) return;
  if (pumpkin.lt("1e27")) return;
  pumpkin = pumpkin.sub(new ExpantaNum("1e27"));
  pumpUpg[10] = true;
  save();
}
function harvGain() {
  return new ExpantaNum((harvUpg >= 1 ? 2 : 1) * (harvUpg >= 2 ? 10 : 1) * (harvUpg >= 3 ? 50 : 1) * (pumpUpg[9] ? 5 : 1) * (pumpUpg[10] ? 5000 : 1));
}
function harvCd() {
  var cd = 60000;
  if (harvUpg >= 1) cd /= 2;
  if (harvUpg >= 2) cd /= 10;
  if (harvUpg >= 3) cd /= 5;
  return cd;
}
function doHarvest() {
  var now = Date.now();
  if (now - lastHarv < harvCd()) return;
  lastHarv = now;
  harvPts = harvPts.add(harvGain());
  save();
}
function buyHarvUpg() {
  if (harvUpg >= 1) return;
  if (harvPts.lt(1)) return;
  harvPts = harvPts.sub(1);
  harvUpg = 1;
  save();
}
function buyHarvUpg2() {
  if (harvUpg >= 2) return;
  if (harvUpg < 1) return;
  if (harvPts.lt(20)) return;
  harvPts = harvPts.sub(20);
  harvUpg = 2;
  save();
}
function buyHarvUpg3() {
  if (harvUpg >= 3) return;
  if (harvUpg < 2) return;
  if (harvPts.lt(200)) return;
  harvPts = harvPts.sub(200);
  harvUpg = 3;
  save();
}
function doPumpkinReset() {
  var g = pumpkinGain();
  if (g.lte(0)) return;
  pumpkin = pumpkin.add(g);
  candy = new ExpantaNum(0);
  lastCandy = 0;
  candyUpgLvl = 0;
  candyUpgLvl2 = 0;
  candyUpgLvl3 = 0;
  candyUpgLvl4 = 0;
  candyUpgLvl6 = 0;
  save();
}
var CDUPG_COST = new ExpantaNum(10).pow(new ExpantaNum("18e6"));
function buyCDUpg() {
  if (cdUpg) return;
  if (!legacyUpgs[3]) return;
  if (cosmicDust.lt(CDUPG_COST)) return;
  cosmicDust = cosmicDust.sub(CDUPG_COST);
  cdUpg = true;
  save();
}
var ENGINE_COST = new ExpantaNum(10).pow(new ExpantaNum(1e149));
function engineCost() { return ENGINE_COST.pow(new ExpantaNum(100000).pow(engineCount)); }
function buyEngine() {
  if (engineCount >= 4) return;
  var ec = engineCost();
  if (atoms.lt(ec)) return;
  atoms = atoms.sub(ec);
  engineCount++;
  save();
}
var ANTI_DIM_COSTS = [10, 100, 1e4, 1e6, 1e9, 1e13, 1e18, 1e24];
var MAT_DIM_COSTS = [1e6, 1e7, 1e9, 1e11, 1e14, 1e18, 1e23, 1e29];
var spaceB = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var spaceLvl = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var atoms = new ExpantaNum(0);
var atomResets = 0;
var elemBought = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var hBonus = false;
var achs = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var chalActive = false;
var chalIdx = 0;
var chalDone = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var chalReward = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var CHAL_GOALS = ["179e306", "179e306"];
var CHAL_DESCS = [
  "Goal: 179UCe Void. Nerf: Void gain ^0.0000001, no achievement boost. Activating resets Void, Upgrades, Quarks, and Quark Upgrades (keeps Atoms, Elements, Achievements). Reward: x1M Atom gain",
  "Goal: 179UCe Void. Nerf: Void gain ^0.0000001, no achievement boost. Activating resets Void, Upgrades, Quarks, and Quark Upgrades (keeps Atoms, Elements, Achievements). Reward: Atom gain ^1M"
];
var CHAL_NERFS = ["Void gain ^0.0000001, achievement boost disabled", "Void gain ^0.0000001, achievement boost disabled"];
var CHAL_REWARDS = ["x1M Atom gain", "Atom gain ^1M"];
var ACH_NAMES = ["Generational start", "Starting off strong", "Voidless mess", "A million of nothing", "Wow ur far now", "Nothing but void", "Boring but free boost is always good", "Ooo so good", "Finally out of the hard part", "10 billion of nothing", "Robert", "Topala", "Interesting", "Tobert Ropala", "10th anniversary for upgrades", "Veeery intersting", "I hear something", "Quarter of the letter", "Deka-void", "", "Reach level 30 in Upgrade 12", "Finally something existant", "Wow the numbers are getting bigger but still capped haha", "Pretty far right?", "FINALLY NO CAP", "Atomic age"];
var ACH_DESCS = ["Get 1 Void", "Buy Upgrade 3", "Get 1000 Void", "Get 1 million Void", "Buy Upgrade 5", "Reach 100M Void", "Max out Upgrade 5", "Max out Upgrade 3", "Buy 2 of Upgrade 6", "Get 10 billion Void", "Reach 1 quadrillion Void", "Reach 1 quintillion Void", "Buy Upgrade 8", "Buy Upgrade 9", "Buy Upgrade 10", "Reach 5 octillion Void", "Reach 100 octillion Void", "Buy 50 levels of Upgrade 8", "Reach 1 decillion Void", "Buy Upgrade 11", "Reach level 30 in Upgrade 12", "Do a Quark reset", "Buy Quark Upgrade 4", "Buy Quark Upgrade 7", "Buy Quark Upgrade 10", "Do an Atom reset"];
var UPG_MAX = [5, 20, 42, 10, 20, 10, 20, 200, 10, 20, 50, 100, 100, 100, -10, 10, 15, 50, 50];
var UPG_LABEL = ["x2", "x1.1", "x1.2", "x1.5", "x1.02", "x3", "x1.5", "x1.05", "x2", "x2", "x3", "x10", "x5", "x2", "x2 Quarks ^1.1", "x3 Quarks ^1.05", "x1.5 Quarks ^1.05", "x2 Quarks ^1.02", "x10 Quarks ^1.01"];
var ACH_BONUS = 0.25;
var last = performance.now();

var COSTS = [
  function (l) { return new ExpantaNum(1).mul(new ExpantaNum(1e10).pow(new ExpantaNum(l).sub(5).max(0))); },
  function (l) { return new ExpantaNum(40).mul(new ExpantaNum(1.15).pow(l)); },
  function (l) { return new ExpantaNum(100).mul(new ExpantaNum(1.5).pow(l)); },
  function (l) { return new ExpantaNum(1000).mul(new ExpantaNum(2).pow(l)); },
  function (l) { return new ExpantaNum(2e6).mul(new ExpantaNum(1.1).pow(l)); },
  function (l) { return new ExpantaNum(1e9).mul(new ExpantaNum(6).pow(l)); },
  function (l) { return new ExpantaNum(2.5e11).mul(new ExpantaNum(2).pow(l)); },
  function (l) { return new ExpantaNum(5e20).mul(new ExpantaNum(1.5).pow(l)); },
  function (l) { return new ExpantaNum(1e21).mul(new ExpantaNum(4).pow(l)); },
  function (l) { return new ExpantaNum(1.6e22).mul(new ExpantaNum(8).pow(l)); },
  function (l) { return new ExpantaNum(1e59).mul(new ExpantaNum(6).pow(l)); },
  function (l) { return new ExpantaNum(2e61).mul(new ExpantaNum(100).pow(l)); },
  function (l) { return new ExpantaNum(1e120).mul(new ExpantaNum(50).pow(l)); },
  function (l) { return new ExpantaNum(2.5e122).mul(new ExpantaNum(5).pow(l)); },
  function (l) { return new ExpantaNum("1e558").pow(new ExpantaNum(1.2).pow(l)); },
  function (l) { return new ExpantaNum("5e614").pow(new ExpantaNum(1.2).pow(l)); },
  function (l) { return new ExpantaNum("1e645").pow(new ExpantaNum(1.3).pow(l)); },
  function (l) { return new ExpantaNum("1e782").pow(new ExpantaNum(1.5).pow(l)); },
  function (l) { return new ExpantaNum("1e798").pow(new ExpantaNum(1.75).pow(l)); }
];
