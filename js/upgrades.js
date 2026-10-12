function bulkAmount() {
  if (quarkUpg[7]) return 250;
  if (quarkUpg[6]) return 50;
  if (quarkUpg[5]) return 20;
  if (quarkUpg[4]) return 10;
  return 1;
}

function buyUpg(i) {
  var max = bulkAmount();
  var bought = 0;
  while (bought < max && lv[i - 1] < upgMax(i)) {
    var c = COSTS[i - 1](lv[i - 1]);
    if (!voidAmt.gte(c)) break;
    voidAmt = voidAmt.sub(c);
    lv[i - 1]++;
    bought++;
  }
}

var upgsEl = document.getElementById("upgs");
for (var ui = 1; ui <= 19; ui++) {
  (function (i) {
    var d = document.createElement("div");
    d.id = "upg" + i;
    upgsEl.appendChild(d);
    var b = document.createElement("button");
    b.id = "buy" + i;
    b.textContent = "Upgrade " + i;
    b.onclick = function () { buyUpg(i); };
    upgsEl.appendChild(b);
  })(ui);
}

var UP20_COST = new ExpantaNum(10).pow(new ExpantaNum(10).pow(new ExpantaNum("15").mul(new ExpantaNum("1e99"))));
var UP20_VOID_MULT = new ExpantaNum(10).pow(new ExpantaNum(10).pow(new ExpantaNum(10).pow(new ExpantaNum("100").mul(new ExpantaNum("1e99")))));
var UP24_COST = new ExpantaNum(10).pow(new ExpantaNum(10).pow(new ExpantaNum("112").mul(new ExpantaNum("1e99"))));
function buyUpg20() {
  if (upg20Bought || !legacyUpgs[0]) return;
  if (voidAmt.lt(UP20_COST)) return;
  voidAmt = voidAmt.sub(UP20_COST);
  upg20Bought = true;
  save();
}
var upg20d = document.createElement("div");
upg20d.id = "upg20";
upgsEl.appendChild(upg20d);
var upg20b = document.createElement("button");
upg20b.id = "buy20";
upg20b.textContent = "Upgrade 20";
upg20b.onclick = function () { buyUpg20(); };
upgsEl.appendChild(upg20b);

function buyQuark(i) {
  if (chalActive) return;
  if (quarkUpg[i - 1]) return;
  if ((i === 1 && quarkUpg[1]) || (i === 2 && quarkUpg[0])) return;
  if (i === 24 && !upg20Bought) return;
  if (quarks.lt(i === 24 ? UP24_COST : QUARK_COST[i - 1])) return;
  quarkUpg[i - 1] = true;
  if (i === 4 && !achs[22]) achs[22] = true;
}

function infMaxLvl() {
  return new ExpantaNum(100).add(elemBought[21] ? 100 : 0).add(elemBought[24] ? 500 : 0).add(elemBought[30] ? 9300 : 0).add(elemBought[34] ? 90000 : 0);
}
var rgbCapSig = "\u0000";
var rgbCapCache = new ExpantaNum(0);
function rgbCap() {
  var ss = (elemBought[52] ? 1 : 0) + "," + (elemBought[29] ? 1 : 0) + "," + (elemBought[28] ? 1 : 0) + "," + (elemBought[27] ? 1 : 0);
  if (ss !== rgbCapSig) {
    rgbCapSig = ss;
    if (elemBought[52]) rgbCapCache = new ExpantaNum(10).pow(new ExpantaNum(10).pow(new ExpantaNum(1e100)));
    else if (elemBought[29]) rgbCapCache = new ExpantaNum(10).pow(new ExpantaNum(1e100));
    else if (elemBought[28]) rgbCapCache = new ExpantaNum("1e3000000");
    else rgbCapCache = elemBought[27] ? new ExpantaNum("1e3003") : new ExpantaNum(VOID_CAP);
  }
  return rgbCapCache;
}
function infCostMult() {
  if (elemBought[34]) return 4.5;
  if (elemBought[20]) return 3;
  if (elemBought[19]) return 4;
  if (elemBought[16]) return 5;
  if (elemBought[15]) return 10;
  return 25;
}
function buyInf() {
  if (new ExpantaNum(infLvl).gte(infMaxLvl())) return;
  if (!atoms.isFinite() || atoms.lt(0)) return;
  var c = new ExpantaNum(1e33).mul(new ExpantaNum(infCostMult()).pow(infLvl));
  if (atoms.lt(c)) return;
  atoms = atoms.sub(c);
  infLvl++;
  save();
}
function buyInfMax() {
  if (!atoms.isFinite() || atoms.lt(0)) return;
  var maxLvl = infMaxLvl();
  var cur = new ExpantaNum(infLvl);
  if (cur.gte(maxLvl)) return;
  var base = new ExpantaNum(1e33);
  var mult = new ExpantaNum(infCostMult());
  var first = base.mul(mult.pow(cur));
  if (atoms.lt(first)) return;
  var room = maxLvl.sub(cur);
  var maxBuy = Math.min(Math.max(room.toNumber(), 0), 100000);
  if (maxBuy < 1) return;
  var target = atoms.mul(mult.sub(1)).div(first).add(1);
  var kEst = target.log10().div(mult.log10()).floor().toNumber();
  var k = kEst < 1 ? 0 : Math.min(kEst, maxBuy);
  if (k < 1) return;
  var total = first.mul(mult.pow(k).sub(1)).div(mult.sub(1));
  while (total.gt(atoms) && k > 1) {
    k--;
    total = first.mul(mult.pow(k).sub(1)).div(mult.sub(1));
  }
  while (k < maxBuy && atoms.gte(first.mul(mult.pow(k + 1).sub(1)).div(mult.sub(1)))) {
    k++;
  }
  if (k < 1) return;
  atoms = atoms.sub(first.mul(mult.pow(k).sub(1)).div(mult.sub(1)));
  infLvl += k;
  save();
}
function inf2MaxLvl() { return new ExpantaNum(1000000); }
function inf2Cost(lvl) {
  return new ExpantaNum(10).pow(new ExpantaNum(10).pow(new ExpantaNum(149 + lvl)));
}
function buyInf2() {
  if (!elemBought[58]) return;
  if (new ExpantaNum(inf2Lvl).gte(inf2MaxLvl())) return;
  if (!atoms.isFinite() || atoms.lt(0)) return;
  var c = inf2Cost(inf2Lvl);
  if (atoms.lt(c)) return;
  atoms = atoms.sub(c);
  inf2Lvl++;
  save();
}
function ttCost() {
  return new ExpantaNum("1e993").pow(new ExpantaNum(1.4).pow(ttparts));
}
function buyTT() {
  if (atoms.lt(ttCost())) return;
  atoms = atoms.sub(ttCost());
  ttparts = ttparts.add(1);
  save();
}
function buyTime() {
  if (timeBought) return;
  if (atoms.lt(new ExpantaNum("1e6791"))) return;
  atoms = atoms.sub(new ExpantaNum("1e6791"));
  timeBought = true;
  save();
}
