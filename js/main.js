var DOM_CACHE = {};
function $(id) {
  var el = DOM_CACHE[id];
  if (el === undefined) { el = document.getElementById(id); DOM_CACHE[id] = el; }
  return el;
}
var achSig = "";

var FRAME_MS = 50;
var gainLvSig = "\u0000";
var gainLvBase = new ExpantaNum(1);
var gainExp = [null, null, null, null, null];
var upgCostCache = [];
var multSig = "\u0000";
var multText = "";
var gainSig = "\u0000";
var cachedGainPre = new ExpantaNum(0);
var ELEM33_GAIN_POW = new ExpantaNum("1e100");
var cachedAm = new ExpantaNum(1);
var moneySig = "\u0000";
var cachedMoneyRate = new ExpantaNum(1);
var matSig = "\u0000";
var cachedDim9b = new ExpantaNum(1);
var cachedMatProdX = new ExpantaNum(1);
var cachedMatEx = 1;
var MAT_CAP = new ExpantaNum("1e1e308");
var legacySig = "\u0000";
var cachedLegacyAdd = new ExpantaNum(0);
var qCostObjCache = {};
var qCostStrCache = {};
function qCostObj(qi) {
  if (qi in qCostObjCache) return qCostObjCache[qi];
  return qCostObjCache[qi] = (qi === 24 ? UP24_COST : new ExpantaNum(QUARK_COST[qi - 1]));
}
function qCostStr(qi) {
  if (qi in qCostStrCache) return qCostStrCache[qi];
  return qCostStrCache[qi] = fmt(qCostObj(qi));
}

function loop(now) {
  if (now - last < FRAME_MS) { requestAnimationFrame(loop); return; }
  var dt = new ExpantaNum((now - last) / 1000);
  last = now;
  if (!dt.isFinite() || dt.lt(0)) dt = new ExpantaNum(0);
  if (!voidAmt.isFinite()) voidAmt = new ExpantaNum(0);
  if (!quarks.isFinite()) quarks = new ExpantaNum(0);
  if (!atoms.isFinite()) atoms = new ExpantaNum(0);
  if (!red.isFinite()) red = new ExpantaNum(1);
  if (!green.isFinite()) green = new ExpantaNum(1);
  if (!blue.isFinite()) blue = new ExpantaNum(1);
  if (!ttparts.isFinite()) ttparts = new ExpantaNum(0);
  if (!cosmicDust.isFinite()) cosmicDust = new ExpantaNum(0);

  var sig = lv.join(",") + "|" + quarkUpg.join("") + "|" + elemBought.join("") + "|" + achs.join("") + "|" + (chalActive ? 1 : 0) + "|" + (upg20Bought ? 1 : 0) + "|" + keptBase7 + "|" + keptBase8 + "|" + resetCount;
  if (sig !== gainSig) {
    gainSig = sig;
    cachedAm = achMult();
    var lvSig = lv.join(",");
    if (lvSig !== gainLvSig) {
      gainLvSig = lvSig;
      gainLvBase = new ExpantaNum(2).pow(lv[0]).mul(new ExpantaNum(1.1).pow(lv[1])).mul(new ExpantaNum(1.2).pow(lv[2])).mul(new ExpantaNum(1.5).pow(lv[3])).mul(new ExpantaNum(1.02).pow(lv[4])).mul(new ExpantaNum(3).pow(lv[5])).mul(new ExpantaNum(1.5).pow(lv[6])).mul(new ExpantaNum(1.05).pow(lv[7])).mul(new ExpantaNum(2).pow(lv[8])).mul(new ExpantaNum(2).pow(lv[9])).mul(new ExpantaNum(3).pow(lv[10])).mul(new ExpantaNum(10).pow(lv[11])).mul(new ExpantaNum(5).pow(lv[12])).mul(new ExpantaNum(2).pow(lv[13]));
      gainExp[0] = lv[14] > 0 ? new ExpantaNum(1.1).pow(lv[14]) : null;
      gainExp[1] = lv[15] > 0 ? new ExpantaNum(1.05).pow(lv[15]) : null;
      gainExp[2] = lv[16] > 0 ? new ExpantaNum(1.05).pow(lv[16]) : null;
      gainExp[3] = lv[17] > 0 ? new ExpantaNum(1.02).pow(lv[17]) : null;
      gainExp[4] = lv[18] > 0 ? new ExpantaNum(1.01).pow(lv[18]) : null;
    }

    var gain = new ExpantaNum(chalActive ? 1 : 0.1).mul(gainLvBase);
    if (quarkUpg[0]) gain = gain.mul(10);
    if (quarkUpg[2]) gain = gain.mul(50);
    if (quarkUpg[4]) gain = gain.mul(100);
    if (!chalActive) gain = gain.mul(cachedAm);
    if (!chalActive && achs[17]) gain = gain.mul(3);
    if (quarkUpg[8]) gain = gain.pow(1.1);
    if (quarkUpg[10]) gain = gain.pow(1.05);
    if (quarkUpg[11]) gain = gain.pow(1.3);
    if (quarkUpg[12]) gain = gain.pow(1.1);
    if (quarkUpg[14]) gain = gain.pow(1.2);
    if (quarkUpg[15]) gain = gain.pow(1.3);
    if (quarkUpg[16]) gain = gain.pow(1.4);
    if (quarkUpg[17]) gain = gain.pow(1.5);
    if (quarkUpg[18]) gain = gain.pow(1.7);
    if (quarkUpg[19]) gain = gain.pow(1.7);
    if (quarkUpg[22]) gain = gain.pow(1.5);
    if (gainExp[0]) gain = gain.pow(gainExp[0]);
    if (gainExp[1]) gain = gain.pow(gainExp[1]);
    if (gainExp[2]) gain = gain.pow(gainExp[2]);
    if (gainExp[3]) gain = gain.pow(gainExp[3]);
    if (gainExp[4]) gain = gain.pow(gainExp[4]);
    if (elemBought[0]) gain = gain.mul(2);
    if (elemBought[1]) gain = gain.pow(1.1);
    if (elemBought[2]) gain = gain.pow(5);
    if (elemBought[3]) gain = gain.pow(2);
    if (elemBought[4]) gain = gain.pow(5);
    if (elemBought[5]) gain = gain.pow(2);
    if (elemBought[6]) gain = gain.pow(25);
    if (elemBought[7]) gain = gain.pow(3);
    if (elemBought[8]) gain = gain.pow(50);
    if (elemBought[9]) gain = gain.pow(50);
    if (elemBought[11]) gain = gain.pow(100);
    if (elemBought[18]) gain = gain.pow(10000);
    if (elemBought[22]) gain = gain.pow(100);
    if (elemBought[23]) gain = gain.pow(100000000);
    if (elemBought[25]) gain = gain.pow(100000000000);
    cachedGainPre = gain;
  }
  var am = cachedAm;
  var gain = cachedGainPre;
  if (elemBought[26] && blue.gt(1)) gain = gain.pow(blue.log10().div(3).pow(1.5));
  if (elemBought[33]) gain = gain.pow(ELEM33_GAIN_POW);
  if (upg20Bought) gain = gain.mul(UP20_VOID_MULT);
  if (chalActive) gain = gain.pow(0.0000001);

  voidAmt = voidAmt.add(gain.mul(dt));
  if (elemBought[0]) {
    for (var ai = 1; ai <= 19; ai++) {
      while (lv[ai - 1] < upgMax(ai) && voidAmt.gte(COSTS[ai - 1](lv[ai - 1]))) {
        voidAmt = voidAmt.sub(COSTS[ai - 1](lv[ai - 1]));
        lv[ai - 1]++;
      }
    }
  }
  if (elemBought[2]) {
    for (var qi = 1; qi <= 24; qi++) {
      if (quarkUpg[qi - 1]) continue;
      if ((qi === 1 && quarkUpg[1]) || (qi === 2 && quarkUpg[0])) continue;
      if (qi === 24 && !upg20Bought) continue;
      if (quarks.gte(qi === 24 ? UP24_COST : QUARK_COST[qi - 1])) buyQuark(qi);
    }
  }
  if (pumpUpg[3] || pumpUpg[4]) {
    while (candyUpgLvl2 < 100 && candy.gte(candyUpg2Cost())) {
      candy = candy.sub(candyUpg2Cost());
      candyUpgLvl2++;
    }
    while (candyUpgLvl4 < 400 && candy.gte(candyUpg4Cost())) {
      candy = candy.sub(candyUpg4Cost());
      candyUpgLvl4++;
    }
  }
  if (pumpUpg[4]) {
    while (candyUpgLvl < 20 && candy.gte(candyUpgCost())) {
      candy = candy.sub(candyUpgCost());
      candyUpgLvl++;
    }
    while (candyUpgLvl3 < 3 && candy.gte(candyUpg3Cost())) {
      candy = candy.sub(candyUpg3Cost());
      candyUpgLvl3++;
    }
    if (pumpUpg[6]) while (candyUpgLvl6 < 100000 && candy.gte(candyUpg6Cost())) {
      candy = candy.sub(candyUpg6Cost());
      candyUpgLvl6++;
    }
  }
  if (elemBought[1]) quarks = quarks.add(quarkGain().mul(10).mul(dt));
  if (elemBought[17]) atoms = atoms.add(atomGain().mul(100).mul(dt));
  if (spaceB[1]) cosmicDust = cosmicDust.add(cosmicDustRate().mul(dt));
  if (pumpUpg[5]) candy = candy.add(candyAmount().mul(dt));
  if (cometUpg[6]) {
    for (var sba = 1; sba <= 5; sba++) {
      if (!spaceB[sba]) buySpace(sba);
    }
  }
  if (snUpg[0]) {
    var snbought = true;
    while (snbought) {
      snbought = false;
      for (var sna = 1; sna <= 14; sna++) {
        var snsu = SPACE_UPGRADES[sna - 1];
        if ((spaceLvl[sna] || 0) < (snsu.maxLvl || 1) && cosmicDust.gte(snsu.cost)) {
          buySpace(sna);
          snbought = true;
        }
      }
    }
    comets = comets.add(cometGainRaw().mul(10).mul(dt));
  }
  if (!snMilestones[0] && snTotal.gte(1)) snMilestones[0] = true;
  if (!snMilestones[1] && snTotal.gte(10)) snMilestones[1] = true;
  if (!snMilestones[2] && snTotal.gte(100)) snMilestones[2] = true;
  if (snMilestones[2]) while (clicks.gte(clickerUpgCost(clickerLvl))) {
    clickerLvl++;
    perks++;
  }
  if (tyUpgs[0] || tyUpgs[1] || tyUpgs[2] || tyUpgs[3] || (elemBought[58] && inf2Lvl > 0)) {
    var mSig = (tyUpgs[0] ? 1 : 0) + "," + (tyUpgs[1] ? 1 : 0) + "," + (tyUpgs[2] ? 1 : 0) + "," + (tyUpgs[3] ? 1 : 0) + "," + (elemBought[48] ? 1 : 0) + "," + (elemBought[49] ? 1 : 0) + "," + (snUpg[3] ? 1 : 0) + "," + (elemBought[50] ? 1 : 0) + "," + (elemBought[51] ? 1 : 0) + "," + (legacyUpgs[7] ? 1 : 0) + "," + clickUpgLvl[3] + "," + (elemBought[58] && inf2Lvl > 0 ? inf2Lvl : 0) + "," + (cometUpg[10] ? 1 : 0) + "," + (snUpg[5] ? 1 : 0);
    if (mSig !== moneySig) {
      moneySig = mSig;
      var mr = new ExpantaNum(1);
      if (tyUpgs[0]) mr = mr.mul(5);
      if (tyUpgs[1]) mr = mr.mul(5);
      if (tyUpgs[2]) mr = mr.pow(2);
      if (tyUpgs[3]) mr = mr.pow(10);
      if (elemBought[48]) mr = mr.pow(2);
      if (elemBought[49]) mr = mr.pow(2);
      if (snUpg[3]) mr = mr.pow(2);
      if (elemBought[50]) mr = mr.pow(2);
      if (elemBought[51]) mr = mr.pow(2);
      if (legacyUpgs[7]) mr = mr.pow(2);
      if (clickUpgLvl[3] > 0) mr = mr.pow(new ExpantaNum(1.1).pow(clickUpgLvl[3]));
      if (elemBought[58] && inf2Lvl > 0) mr = mr.pow(new ExpantaNum(2).pow(inf2Lvl));
      if (cometUpg[10]) mr = mr.pow(2);
      if (snUpg[5]) mr = mr.pow(100);
      cachedMoneyRate = mr;
    }
    money = money.add(cachedMoneyRate.mul(dt));
  }
  if (elemBought[48]) {
    while (atoms.gte(ttCost())) buyTT();
    if (!timeBought && atoms.gte(new ExpantaNum("1e6791"))) buyTime();
    clicks = clicks.add(clickAmount().mul(dt));
  }
  if (elemBought[50]) {
    while (clicks.gte(clickUpgCost(1))) buyClickerUpg(1);
    while (clicks.gte(clickUpgCost(2))) buyClickerUpg(2);
    if (snUpg[6]) while (clicks.gte(clickUpgCost(3))) buyClickerUpg(3);
    if (legacyUpgs[7]) while (clicks.gte(clickUpgCost(4))) buyClickerUpg(4);
  }
  if (elemBought[51]) {
    for (var cua2 = 1; cua2 <= COMET_UPGRADES.length; cua2++) buyCometUpg(cua2);
    supernova = supernova.add(snGainRaw().mul(10).mul(dt));
  }
  if (elemBought[53]) {
    var mSig2 = dim9count + "," + (elemBought[54] ? 1 : 0) + "," + (elemBought[55] ? 1 : 0) + "," + (matUpgs[0] ? 1 : 0) + "," + (matUpgs[1] ? 1 : 0) + "," + (elemBought[56] ? 1 : 0) + "," + (snUpg[4] ? 1 : 0);
    if (mSig2 !== matSig) {
      matSig = mSig2;
      cachedDim9b = new ExpantaNum(2).pow(dim9count);
      cachedMatProdX = (elemBought[54] ? new ExpantaNum(100) : new ExpantaNum(1)).mul(elemBought[55] ? new ExpantaNum(1e6) : new ExpantaNum(1)).mul(matUpgs[0] ? new ExpantaNum(200) : new ExpantaNum(1));
      cachedMatEx = (matUpgs[1] ? 1.5 : 1) * (elemBought[56] ? 2 : 1) * (snUpg[4] ? 1.5 : 1);
    }
    var matBoost = matter.gt(1) ? matter.log10().div(2).max(new ExpantaNum(1)) : new ExpantaNum(1);
    var antiBoost = antimatter.gt(1) ? antimatter.log10().div(2).max(new ExpantaNum(1)) : new ExpantaNum(1);
    if (elemBought[56]) {
      for (var mab = 1; mab <= 8; mab++) buyMatterDim(mab);
      buyMatterDim(9);
      for (var aab = 1; aab <= 8; aab++) buyAntimatterDim(aab);
    }
    matter = matter.add(matterDims[0].mul(matBoost).mul(cachedDim9b).mul(cachedMatProdX).mul(dt).pow(cachedMatEx));
    matter = matter.add(antimatterDims[0].mul(antiBoost).mul(cachedDim9b).mul(cachedMatProdX).mul(dt).pow(cachedMatEx));
    antimatterDims[0] = antimatterDims[0].add(matterDims[0].mul(matBoost).mul(cachedDim9b).mul(cachedMatProdX).mul(dt));
    antimatterDims[1] = antimatterDims[1].add(matterDims[0].mul(matBoost).mul(cachedDim9b).mul(cachedMatProdX).mul(dt));
    antimatterDims[2] = antimatterDims[2].add(matterDims[0].mul(matBoost).mul(cachedDim9b).mul(cachedMatProdX).mul(dt));
    antimatterDims[3] = antimatterDims[3].add(matterDims[0].mul(matBoost).mul(cachedDim9b).mul(cachedMatProdX).mul(dt));
    for (var mp = 0; mp < 7; mp++) matterDims[mp] = matterDims[mp].add(matterDims[mp + 1].mul(dt));
    antimatter = antimatter.add(antimatterDims[0].mul(antiBoost).mul(cachedDim9b).mul(cachedMatProdX).mul(dt).pow(cachedMatEx));
    for (var ap = 0; ap < 7; ap++) antimatterDims[ap] = antimatterDims[ap].add(antimatterDims[ap + 1].mul(dt));
    if (cometUpg[10]) { matter = matter.pow(2); antimatter = antimatter.pow(2); }
    matter = matter.min(MAT_CAP);
    antimatter = antimatter.min(MAT_CAP);
  }
  if (matUpgs[2]) {
    var lSig = (quarkUpg[23] ? 1 : 0) + "," + (legacyUpgs[1] ? 1 : 0) + "," + (elemBought[57] ? 1 : 0) + "," + (engineCount >= 4 ? 1 : 0) + "," + (cdUpg ? 1 : 0) + "," + (cometUpg[10] ? 1 : 0) + "," + (legacyUpgs[4] ? 1 : 0) + "," + (snUpg[5] ? 1 : 0) + "," + (legacyUpgs[7] ? 1 : 0) + "," + clickUpgLvl[2];
    if (lSig !== legacySig) {
      legacySig = lSig;
      cachedLegacyAdd = new ExpantaNum(1).mul(quarkUpg[23] ? 50 : 1).mul(legacyUpgs[1] ? 100 : 1).mul(elemBought[57] ? 100 : 1).mul(engineCount >= 4 ? 100 : 1).mul(cdUpg ? 50 : 1).mul(cometUpg[10] ? 100 : 1).mul(legacyUpgs[4] ? 500 : 1).mul(snUpg[5] ? 100000 : 1).mul(legacyUpgs[7] ? 100 : 1).mul(new ExpantaNum(10).pow(clickUpgLvl[2]));
    }
    legacyEnergy = legacyEnergy.add(cachedLegacyAdd.mul(dt));
  }
  if (elemBought[24]) buyInfMax();
  if (elemBought[26]) {
    red = red.mul(new ExpantaNum(10).pow(dt)).min(rgbCap());
    green = green.mul(new ExpantaNum(10).pow(dt)).min(rgbCap());
    blue = blue.mul(new ExpantaNum(10).pow(dt)).min(rgbCap());
    if (elemBought[27]) {
      var rgbpw = elemBought[52] ? new ExpantaNum(10).pow(new ExpantaNum(1e100)) : new ExpantaNum(elemBought[29] ? 100 : (elemBought[28] ? 1.3 : 1.05));
      red = red.pow(rgbpw.pow(dt)).min(rgbCap());
      green = green.pow(rgbpw.pow(dt)).min(rgbCap());
      blue = blue.pow(rgbpw.pow(dt)).min(rgbCap());
    }
  }
  if (!quarkUpg[9] && voidAmt.gt(VOID_CAP)) voidAmt = new ExpantaNum(VOID_CAP);
  keptBase7 = new ExpantaNum(keptBase7).max(new ExpantaNum(0.05 * lv[6])).toNumber();
  keptBase8 = new ExpantaNum(keptBase8).max(new ExpantaNum(0.005 * lv[7])).toNumber();
  checkAchs();
  if (chalActive) completeChallenge(chalIdx);
  if (!elemBought[5] && quarks.gt(VOID_CAP)) quarks = new ExpantaNum(VOID_CAP);
  if (!hardResetting) autoSave();

  if (curTab === "main") {
    $("void").textContent = "Void: " + fmt(voidAmt) + ((quarkUpg[9] || elemBought[5]) ? "" : (voidAmt.gte(VOID_CAP) ? " (CAPPED)" : ""));
    $("gain").textContent = "Gain: " + fmt(gain) + "/s";
    var achCount = 0;
    for (var ac = 0; ac < achs.length; ac++) if (achs[ac]) achCount++;
    var mSig = achCount + "|" + (achs[17] ? 1 : 0) + (achs[9] ? 1 : 0) + "|" + keptBase7 + "|" + keptBase8 + "|" + resetCount + "|" + quarkUpg.join("");
    if (mSig !== multSig) {
      multSig = mSig;
      multText = "Achievement multiplier: x" + fmt(am) + " (" + achCount + "/" + achs.length + " achievements)";
    }
    if ($("mult").textContent !== multText) $("mult").textContent = multText;

    for (var i = 1; i <= 19; i++) {
      var lvI = lv[i - 1];
      var maxLv = upgMax(i);
      var key = lvI + "/" + maxLv;
      var cc = upgCostCache[i];
      if (!cc || cc.key !== key) {
        var maxed = lvI >= maxLv;
        var c = maxed ? null : COSTS[i - 1](lvI);
        cc = upgCostCache[i] = {
          key: key,
          costObj: c,
          str: UPG_LABEL[i - 1] + " Void Upgrade: Level " + lvI + "/" + maxLv + ", Cost: " + (maxed ? "MAX" : fmt(c))
        };
      }
      var upgEl = $("upg" + i);
      if (upgEl.textContent !== cc.str) upgEl.textContent = cc.str;
      var dis = cc.costObj === null || voidAmt.lt(cc.costObj);
      var buyEl = $("buy" + i);
      if (buyEl.disabled !== dis) buyEl.disabled = dis;
    }
    var u20d = $("upg20");
    var u20b = $("buy20");
    u20d.style.display = legacyUpgs[0] ? "" : "none";
    u20b.style.display = legacyUpgs[0] ? "" : "none";
    if (legacyUpgs[0]) {
      u20d.textContent = "Legacy Void Upgrade: " + (upg20Bought ? "BOUGHT - Quarks ^1e1e308, Void x1e1e1e100DTg" : "Quarks ^1e1e308, Void x1e1e1e100DTg\nCost: 1e1e15DTg");
      u20b.disabled = upg20Bought || voidAmt.lt(UP20_COST);
    }
  }

  if (curTab === "achs") {
    var nsig = "";
    for (var a = 0; a < achs.length; a++) nsig += achs[a] ? "1" : "0";
    if (nsig !== achSig) {
      achSig = nsig;
      var ahtml = "";
      for (var a2 = 0; a2 < achs.length; a2++) {
        var label = ACH_NAMES[a2] ? ACH_NAMES[a2] + " (" + ACH_DESCS[a2] + ")" : ACH_DESCS[a2];
        ahtml += label + ": " + (achs[a2] ? "Earned" : "Locked") + "<br>";
      }
      $("alist").innerHTML = ahtml;
    }
  }

  if (curTab === "quarks") {
    var qg = quarkGain();
    var ag = atomGain();
    $("qamt").textContent = "Quarks: " + fmt(quarks) + ((elemBought[5]) ? "" : (quarks.gte(VOID_CAP) ? " (CAPPED)" : ""));
    $("qgaininfo").textContent = "Quarks on reset: " + fmt(qg);
    $("qreset").disabled = qg.lte(0);
    $("aamt").textContent = "Atoms: " + fmt(atoms);
    $("againinfo").textContent = "Atoms on reset: " + fmt(ag);
    var atomBtn = $("atomreset");
    atomBtn.style.display = quarks.gte(VOID_CAP) ? "" : "none";
    atomBtn.disabled = ag.lte(0);
    for (var qi = 1; qi <= 24; qi++) {
      var btn = $("qb" + qi);
      var owned = quarkUpg[qi - 1];
      var locked = (qi === 1 && quarkUpg[1]) || (qi === 2 && quarkUpg[0]) || (qi === 24 && !upg20Bought);
      btn.style.display = (qi === 24 && !upg20Bought) ? "none" : "";
      var qstr = QUARK_DESCS[qi - 1] + (owned ? " (Bought)" : locked ? " (Locked)" : " — Requires: " + qCostStr(qi) + " Quarks");
      if (btn.textContent !== qstr) btn.textContent = qstr;
      var qdis = owned || locked || quarks.lt(qCostObj(qi));
      if (btn.disabled !== qdis) btn.disabled = qdis;
    }
  }

  if (curTab === "challenges") {
    var clist = document.getElementById("clist");
    if (!clist.dataset.init) {
      clist.dataset.init = "1";
      var chtml = "<div style='font-size:20px;margin-bottom:10px'>Challenges</div>";
      chtml += "<div id='cprog' style='color:#ffd700'></div><br>";
      for (var cc = 0; cc < CHAL_GOALS.length; cc++) {
        chtml += "<div id='ch" + cc + "' style='margin-bottom:8px'>Challenge " + (cc + 1) + ": " + CHAL_DESCS[cc] + "<br>Status: <span id='cs" + cc + "'>Not done</span><br>";
        chtml += "<button id='cb" + cc + "'>Activate</button> ";
        chtml += "<button id='xf" + cc + "' style='display:none'>Forfeit</button></div>";
      }
      clist.innerHTML = chtml;
      for (var cc = 0; cc < CHAL_GOALS.length; cc++) {
        (function (idx) {
          document.getElementById("cb" + idx).onclick = function () {
            if (chalActive) completeChallenge(chalIdx); else activateChallenge(idx);
          };
          document.getElementById("xf" + idx).onclick = function () { forfeitChallenge(idx); };
        })(cc);
      }
    }
    var progEl = document.getElementById("cprog");
    progEl.textContent = chalActive ? ("Challenge active! Progress: " + fmt(voidAmt) + " / " + fmt(new ExpantaNum(CHAL_GOALS[chalIdx]))) : "";
    for (var cc = 0; cc < CHAL_GOALS.length; cc++) {
      var unlocked = cc === 0 || !!legacyUpgs[1];
      document.getElementById("ch" + cc).style.display = unlocked ? "" : "none";
      var sEl = document.getElementById("cs" + cc);
      sEl.textContent = chalDone[cc] ? "Completed" : (chalActive && cc === chalIdx ? "Active" : (!unlocked ? "Locked (buy Legacy Upgrade II)" : "Not done"));
      var cbEl = document.getElementById("cb" + cc);
      cbEl.style.display = chalActive ? "none" : "";
      cbEl.disabled = !unlocked;
      cbEl.textContent = chalDone[cc] ? "Replay" : "Activate";
      document.getElementById("xf" + cc).style.display = chalActive ? "" : "none";
    }
  }

  if (curTab === "infinite") {
    var ilist = document.getElementById("ilist");
    if (!ilist.dataset.init) {
      ilist.dataset.init = "1";
      ilist.innerHTML = "<div style='font-size:20px;margin-bottom:10px'>Infinite</div>" +
        "<div id='iinfo'></div><br>" +
        "<button id='ibuy'>Buy Max</button> " +
        "<button id='ireset'>Reset Level</button>" +
        "<div id='i2info' style='display:none;margin-top:20px'></div><br>" +
        "<button id='i2buy' style='display:none'>Buy</button>";
      document.getElementById("ibuy").onclick = buyInfMax;
      document.getElementById("i2buy").onclick = buyInf2;
      document.getElementById("ireset").onclick = function () {
        if (confirm("Reset Infinite Upgrade level and Atoms to 0?")) { infLvl = 0; atoms = new ExpantaNum(0); save(); }
      };
    }
    var imax = infMaxLvl();
    var atMax = new ExpantaNum(infLvl).gte(imax);
    var icost = new ExpantaNum(1e33).mul(new ExpantaNum(infCostMult()).pow(infLvl));
    document.getElementById("iinfo").textContent = "Infinite Upgrade: Level " + infLvl + "/" + imax.toString() + ", x" + fmt(new ExpantaNum(2).pow(infLvl)) + " Atoms, Cost: " + (atMax ? "MAX" : fmt(icost));
    document.getElementById("ibuy").disabled = atMax || atoms.lt(icost);
    var i2i = document.getElementById("i2info");
    var i2b = document.getElementById("i2buy");
    if (elemBought[58]) {
      i2i.style.display = "";
      i2b.style.display = "";
      var i2max = inf2MaxLvl();
      var i2atMax = new ExpantaNum(inf2Lvl).gte(i2max);
      var i2cost = inf2Cost(inf2Lvl);
      i2i.textContent = "Infinite Upgrade II: Level " + inf2Lvl + "/" + i2max.toString() + ", Money ^" + fmt(new ExpantaNum(2).pow(inf2Lvl)) + " and Clicks ^" + fmt(new ExpantaNum(2).pow(inf2Lvl)) + " per level, Cost: " + (i2atMax ? "MAX" : fmt(i2cost));
      i2b.disabled = i2atMax || atoms.lt(i2cost);
      i2b.textContent = i2atMax ? "MAX" : "Buy (Cost: " + fmt(i2cost) + " Atoms)";
    } else {
      i2i.style.display = "none";
      i2b.style.display = "none";
    }
  }

  if (curTab === "rgb") {
    var rlist = document.getElementById("rlist");
    if (!rlist.dataset.init) {
      rlist.dataset.init = "1";
      rlist.innerHTML = "<div style='font-size:20px;margin-bottom:10px'>RGB</div>" +
        "<div id='rred'></div><br>" +
        "<div id='rgreen'></div><br>" +
        "<div id='rblue'></div>";
    }
    var rgbRate = elemBought[52] ? "^" + fmt(new ExpantaNum(10).pow(new ExpantaNum(1e100))) + "/s" : (elemBought[29] ? "^100/s" : (elemBought[28] ? "^1.3/s" : (elemBought[27] ? "^1.05/s" : "x10/s")));
    document.getElementById("rred").textContent = "Red: " + fmt(red) + "/" + fmt(rgbCap()) + " (" + rgbRate + ") -> Atoms x" + fmt(red.log10().div(3).pow(1.1));
    document.getElementById("rgreen").textContent = "Green: " + fmt(green) + "/" + fmt(rgbCap()) + " (" + rgbRate + ") -> Quarks ^" + fmt(green.log10().div(3).pow(1.2));
    document.getElementById("rblue").textContent = "Blue: " + fmt(blue) + "/" + fmt(rgbCap()) + " (" + rgbRate + ") -> Void ^" + fmt(blue.log10().div(3).pow(1.5));
  }

  if (curTab === "tt") {
    var tlist = document.getElementById("ttlist");
    if (!tlist.dataset.init) {
      tlist.dataset.init = "1";
      tlist.innerHTML = "<div style='font-size:20px;margin-bottom:10px'>Time Travelling</div>" +
        "<div id='ttinfo'></div><br>" +
        "<button id='ttbuy'>Buy Time Travel Part</button>" +
        "<br><br><div id='tinfo'></div><br><button id='tbuy'>Buy Time</button>" +
        "<br><br><div id='engsec' style='display:none'><div id='enginfo'></div><br><button id='engbuy'>Buy Engine</button></div>";
      document.getElementById("ttbuy").onclick = buyTT;
      document.getElementById("tbuy").onclick = buyTime;
      document.getElementById("engbuy").onclick = buyEngine;
    }
    var tc = ttCost();
    document.getElementById("ttinfo").textContent = "Parts: " + ttparts.toString() + ", Next part cost: " + fmt(tc) + ", Atoms ^1.1 per part, current boost: ^" + fmt(new ExpantaNum(1.1).pow(ttparts));
    document.getElementById("ttbuy").disabled = atoms.lt(tc);
    var showTime = elemBought[35];
    document.getElementById("tinfo").style.display = showTime ? "" : "none";
    document.getElementById("tbuy").style.display = showTime ? "" : "none";
    if (showTime) {
      document.getElementById("tinfo").textContent = "Time: " + (timeBought ? "BOUGHT" : "Not bought") + " (one-time, Atoms ^1.05), Cost: " + fmt(new ExpantaNum("1e6791"));
      document.getElementById("tbuy").disabled = timeBought || atoms.lt(new ExpantaNum("1e6791"));
    }
    var showEngine = legacyUpgs[2];
    document.getElementById("engsec").style.display = showEngine ? "" : "none";
    if (showEngine) {
      var ec = engineCost();
      document.getElementById("enginfo").textContent = "Engine: " + engineCount + "/4\nAtom gain ^" + fmt(new ExpantaNum(100).pow(engineCount)) + ", Next cost: " + fmt(ec) + " Atoms";
      document.getElementById("engbuy").disabled = engineCount >= 4 || atoms.lt(ec);
      document.getElementById("engbuy").textContent = engineCount >= 4 ? "Max Engines" : "Buy Engine";
    }
  }

  if (curTab === "space") {
    var spl = document.getElementById("spalist");
    if (!spl.dataset.init) {
      spl.dataset.init = "1";
      spl.innerHTML = "<div style='font-size:20px;margin-bottom:10px'>Space</div>" +
        "<div id='sdust'></div><br><div id='stree'></div>" +
        "<br><div id='cdusec' style='display:none'><div style='display:flex;justify-content:center'><button id='cdubuy' style='width:240px;height:88px;border:2px solid #fff;color:#fff;cursor:pointer;font-family:inherit;padding:6px'></button></div></div>";
      var streeEl = document.getElementById("stree");
      streeEl.onclick = function (e) {
        var t = e.target;
        while (t && t !== streeEl && !(t.id && /^spb\d+$/.test(t.id))) t = t.parentNode;
        if (t && t.id) buySpace(parseInt(t.id.slice(3), 10));
      };
      document.getElementById("cdubuy").onclick = buyCDUpg;
    }
    document.getElementById("sdust").textContent = "Cosmic Dust: " + fmt(cosmicDust) + (spaceB[1] ? " (+" + fmt(cosmicDustRate()) + "/s)" : " (no generation - buy \"A new beginning\" to start)");
    var tree = document.getElementById("stree");
    var levels = spaceTreeLevels();
    var sig = "";
    for (var r = 0; r < levels.length; r++) {
      for (var c = 0; c < levels[r].length; c++) {
        var snu = levels[r][c];
        var su = SPACE_UPGRADES[snu - 1];
        sig += (spaceB[snu] ? "1" : "0") + (spaceLvl[snu] || 0) + (cosmicDust.gte(su.cost) ? "1" : "0");
      }
    }
    if (tree.dataset.sig !== sig) {
      tree.dataset.sig = sig;
      var thtml = "";
      for (var r2 = 0; r2 < levels.length; r2++) {
        if (levels[r2].length > 1) {
          var nN = levels[r2].length;
          var isLevel4 = nN >= 3;
          var gapN = isLevel4 ? 6 : 10;
          var bwN = isLevel4 ? 170 : 200;
          var nameFs = isLevel4 ? 13 : 11;
          var grpW = nN * bwN + (nN - 1) * gapN;
          var pxc = grpW / 2;
          var maxDx = 0;
          for (var cdx = 0; cdx < nN; cdx++) maxDx = Math.max(maxDx, Math.abs(cdx * (bwN + gapN) + bwN / 2 - pxc));
          var L = Math.round(maxDx / Math.SQRT1_2);
          var bt = Math.round(L * Math.SQRT1_2);
          var fh = 10 + bt + 88;
          thtml += "<div style='display:flex;justify-content:center'><div style='position:relative;width:" + grpW + "px;height:" + fh + "px'>" +
            "<div style='position:absolute;left:" + (pxc - 2.5) + "px;top:0;width:5px;height:10px;background:#fff'></div>";
          for (var c3 = 0; c3 < nN; c3++) {
            var cx3 = c3 * (bwN + gapN) + bwN / 2;
            var dx3 = cx3 - pxc;
            var isCenter = dx3 === 0;
            var ang3 = isCenter ? 0 : (dx3 < 0 ? -45 : 45);
            thtml += "<div style='position:absolute;left:" + (pxc - 2.5) + "px;top:10px;width:5px;height:" + (isCenter ? (10 + bt) : L) + "px;background:#fff;transform:rotate(" + ang3 + "deg);transform-origin:top center'></div>";
          }
          for (var c4 = 0; c4 < nN; c4++) {
            var cx4 = c4 * (bwN + gapN) + bwN / 2;
            var snu3 = levels[r2][c4];
            var su3 = SPACE_UPGRADES[snu3 - 1];
            var bought3 = !!spaceB[snu3];
            var bg3 = bought3 ? "#006400" : (cosmicDust.gte(su3.cost) ? "#8b8b00" : "#b03030");
            thtml += "<div style='position:absolute;left:" + (cx4 - bwN / 2) + "px;top:" + (10 + bt) + "px'>" +
              "<button id='spb" + snu3 + "' style='width:" + bwN + "px;height:88px;border:2px solid #fff;background:" + bg3 + ";color:#fff;cursor:pointer;font-family:inherit;padding:6px'>" +
              "<div style='font-size:" + nameFs + "px;font-weight:bold'>" + su3.name + "</div>" +
              "<div style='font-size:11px;margin-top:3px'>" + su3.info + "</div>" +
              "<div style='font-size:12px;margin-top:5px'>Cost: " + fmt(su3.cost) + " Cosmic Dust</div>" +
              "</button></div>";
          }
          thtml += "</div></div>";
        } else {
          if (r2 > 0) thtml += "<div style='width:5px;height:20px;background:#fff;margin:2px auto'></div>";
          thtml += "<div style='display:flex;justify-content:center'>";
          var snu2 = levels[r2][0];
          var su2 = SPACE_UPGRADES[snu2 - 1];
          var uMax2 = su2.maxLvl || 1;
          var cur2 = spaceLvl[snu2] || 0;
          var full2 = cur2 >= uMax2;
          var bg2 = full2 ? "#006400" : (cosmicDust.gte(su2.cost) ? "#8b8b00" : "#b03030");
          var lvl2 = uMax2 > 1 ? "<div style='font-size:11px;margin-top:2px'>Level " + cur2 + "/" + uMax2 + "</div>" : "";
          var cost2 = "<div style='font-size:12px;margin-top:5px'>Cost: " + fmt(su2.cost) + " Cosmic Dust</div>";
          thtml += "<button id='spb" + snu2 + "' style='width:240px;height:88px;border:2px solid #fff;background:" + bg2 + ";color:#fff;cursor:pointer;font-family:inherit;padding:6px'>" +
            "<div style='font-size:15px;font-weight:bold'>" + su2.name + "</div>" +
            "<div style='font-size:11px;margin-top:3px'>" + su2.info + "</div>" +
            lvl2 +
            cost2 +
            "</button>";
          thtml += "</div>";
        }
      }
      tree.innerHTML = thtml;
    }
  }

if (curTab === "space" && legacyUpgs[3]) {
    var cdsec = document.getElementById("cdusec");
    cdsec.style.display = "";
    var cdb = document.getElementById("cdubuy");
    var cdsig = (cdUpg ? "1" : "0") + (cosmicDust.gte(CDUPG_COST) ? "1" : "0");
    if (cdb.dataset.sig !== cdsig) {
      cdb.dataset.sig = cdsig;
      cdb.style.background = cdUpg ? "#006400" : (cosmicDust.gte(CDUPG_COST) ? "#8b8b00" : "#b03030");
      cdb.innerHTML = "<div style='font-size:15px;font-weight:bold'>" + (cdUpg ? "Cosmic Dust Upgrade (BOUGHT)" : "Cosmic Dust Upgrade") + "</div>" +
        "<div style='font-size:11px;margin-top:3px'>Space ^10, Supernova ^2, x50 Legacy Energy</div>" +
        "<div style='font-size:12px;margin-top:5px'>Cost: " + fmt(CDUPG_COST) + " Cosmic Dust</div>";
    }
  } else if (curTab === "space") {
    document.getElementById("cdusec").style.display = "none";
  }

  if (curTab === "space" && (spaceB[14] || comets.gt(0))) {
    var spl2 = document.getElementById("spalist");
    var csec = document.getElementById("csec");
    if (!csec) {
      var d2 = document.createElement("div");
      d2.id = "csec";
      spl2.appendChild(d2);
    }
    csec = document.getElementById("csec");
    if (!csec.dataset.init) {
      csec.dataset.init = "1";
      csec.innerHTML = "<div>Comets: <span id='camt'></span></div>" +
        "<div style='display:flex;justify-content:center'><button id='creset' style='width:240px;height:88px;border:2px solid #fff;color:#fff;cursor:pointer;font-family:inherit;padding:6px'>" +
        "<div style='font-size:15px;font-weight:bold'>Comet Reset</div>" +
        "<div style='font-size:11px;margin-top:3px'>Gain <span id='cgain'></span> Comets</div>" +
        "<div style='font-size:12px;margin-top:5px'>Requires 1T Cosmic Dust</div></button></div>" +
        "<div id='cuplist'></div>";
      csec.onclick = function (e) {
        var t = e.target;
        while (t && t !== csec && t.id !== "creset" && !/^cub\d+$/.test(t.id)) t = t.parentNode;
        if (t && t.id === "creset") doCometReset();
        else if (t && /^cub\d+$/.test(t.id)) buyCometUpg(parseInt(t.id.slice(3), 10));
      };
    }
    document.getElementById("camt").textContent = fmt(comets);
    document.getElementById("cgain").textContent = fmt(cometGain());
    var cr = document.getElementById("creset");
    if (cosmicDust.gte(new ExpantaNum(1e12))) { cr.disabled = false; cr.style.background = "#8b8b00"; }
    else { cr.disabled = true; cr.style.background = "#b03030"; }
    var cuplist = document.getElementById("cuplist");
    var btnSig = (cometUpg[2] ? "1" : "0") + (cometUpg[3] ? "1" : "0") + (cometUpg[4] ? "1" : "0") + (cometUpg[5] ? "1" : "0") + (cometUpg[6] ? "1" : "0") + (cometUpg[7] ? "1" : "0") + (cometUpg[8] ? "1" : "0") + (cometUpg[10] ? "1" : "0") + (cdUpg ? "1" : "0") + "|" + COMET_UPGRADES.length;
    if (cuplist.dataset.sig !== btnSig) {
      cuplist.dataset.sig = btnSig;
      var uch = "";
      for (var cui2 = 0; cui2 < COMET_UPGRADES.length; cui2++) {
        if (cui2 === 3 && !cometUpg[2]) continue;
        if (cui2 === 4 && !cometUpg[3]) continue;
        if (cui2 === 5 && !cometUpg[4]) continue;
        if (cui2 === 6 && !cometUpg[5]) continue;
        if (cui2 === 7 && !cometUpg[6]) continue;
        if (cui2 === 8 && !cometUpg[7]) continue;
        if (cui2 === 9 && !cometUpg[8]) continue;
        if (cui2 === 10 && !cdUpg) continue;
        var cu2 = COMET_UPGRADES[cui2];
        uch += "<div style='display:flex;justify-content:center'><button id='cub" + (cui2 + 1) + "' style='width:240px;height:88px;border:2px solid #fff;color:#fff;cursor:pointer;font-family:inherit;padding:6px'>" +
          "<div style='font-size:15px;font-weight:bold'>" + cu2.name + "</div>" +
          "<div style='font-size:11px;margin-top:3px'>" + cu2.info + "</div>" +
          "<div style='font-size:12px;margin-top:5px'>Cost: " + fmt(cu2.cost) + " Comet</div></button></div>";
      }
      cuplist.innerHTML = uch;
    }
    for (var cui3 = 0; cui3 < COMET_UPGRADES.length; cui3++) {
      if (cui3 === 3 && !cometUpg[2]) continue;
      if (cui3 === 4 && !cometUpg[3]) continue;
      if (cui3 === 5 && !cometUpg[4]) continue;
      if (cui3 === 6 && !cometUpg[5]) continue;
      if (cui3 === 7 && !cometUpg[6]) continue;
      if (cui3 === 8 && !cometUpg[7]) continue;
      if (cui3 === 9 && !cometUpg[8]) continue;
      if (cui3 === 10 && !cdUpg) continue;
      var cb = document.getElementById("cub" + (cui3 + 1));
      if (cometUpg[cui3]) cb.style.background = "#006400";
      else cb.style.background = comets.gte(COMET_UPGRADES[cui3].cost) ? "#8b8b00" : "#b03030";
    }
  }

  if (curTab === "space" && (cometUpg[9] || snTotal.gt(0))) {
    var spl3 = document.getElementById("spalist");
    var snsec = document.getElementById("snsec");
    if (!snsec) {
      var d3 = document.createElement("div");
      d3.id = "snsec";
      spl3.appendChild(d3);
    }
    snsec = document.getElementById("snsec");
    if (!snsec.dataset.init) {
      snsec.dataset.init = "1";
      snsec.innerHTML = "<div style='margin-top:16px;font-size:17px;font-weight:bold'>Supernovas: <span id='snamt'></span></div>" +
        "<div style='display:flex;justify-content:center'><button id='snreset' style='width:240px;height:88px;border:2px solid #fff;color:#fff;cursor:pointer;font-family:inherit;padding:6px'>" +
        "<div style='font-size:15px;font-weight:bold'>Supernova Reset</div>" +
        "<div style='font-size:11px;margin-top:3px'>Gain <span id='sncgain'></span> Supernovas</div>" +
        "<div style='font-size:12px;margin-top:5px'>Requires 1Qa Comets</div></button></div>";
      snsec.onclick = function (e) {
        var t = e.target;
        while (t && t !== snsec && t.id !== "snreset") t = t.parentNode;
        if (t && t.id === "snreset") doSupernovaReset();
      };
    }
    document.getElementById("snamt").textContent = fmt(supernova);
    document.getElementById("sncgain").textContent = fmt(snGain());
    var snr = document.getElementById("snreset");
    if (comets.gte(new ExpantaNum(1e15))) { snr.disabled = false; snr.style.background = "#8b8b00"; }
    else { snr.disabled = true; snr.style.background = "#b03030"; }
  }

  if (curTab === "miles" && snTotal.gt(0)) {
    var mlist = document.getElementById("mlist");
    var msig = (elemBought[43] ? "1" : "0") + (snUpg[1] ? "1" : "0") + (elemBought[49] ? "1" : "0") + (legacyUpgs[4] ? "1" : "0") + "|" + SN_UPGRADES.length;
    for (var msk = 0; msk < SN_UPGRADES.length; msk++) msig += snUpg[msk] ? "1" : "0";
    if (mlist.dataset.sig !== msig) {
      mlist.dataset.sig = msig;
      mlist.dataset.init = "1";
      var mh = "<div style='font-size:20px;margin-bottom:10px'>Milestones</div>";
      for (var mi = 0; mi < MILESTONES.length; mi++) {
        mh += "<div style='display:flex;justify-content:center'><button id='mil" + (mi + 1) + "' style='width:420px;min-height:72px;border:2px solid #fff;color:#fff;cursor:default;font-family:inherit;padding:6px'>" +
          "<div style='font-size:15px;font-weight:bold'>" + MILESTONES[mi].name + "</div>" +
          "<div style='font-size:11px;margin-top:3px'>" + MILESTONES[mi].req + "</div>" +
          "<div style='font-size:12px;margin-top:5px'>" + MILESTONES[mi].info + "</div></button></div>";
      }
      mh += "<div style='font-size:17px;margin-top:16px;font-weight:bold'>Supernova Upgrades</div>";
      for (var si2 = 0; si2 < SN_UPGRADES.length; si2++) {
        var suN = SN_UPGRADES[si2];
        if (si2 === 1 && !elemBought[43]) continue;
        if (si2 === 2 && !snUpg[1]) continue;
        if (si2 === 3 && !elemBought[49]) continue;
        if (si2 === 4 && !legacyUpgs[4]) continue;
        if (si2 === 6 && !legacyUpgs[6]) continue;
        mh += "<div style='display:flex;justify-content:center'><button id='snub" + (si2 + 1) + "' style='width:240px;height:88px;border:2px solid #fff;color:#fff;cursor:pointer;font-family:inherit;padding:6px'>" +
          "<div style='font-size:15px;font-weight:bold'>" + suN.name + "</div>" +
          "<div style='font-size:11px;margin-top:3px'>" + suN.info + "</div>" +
          "<div style='font-size:12px;margin-top:5px'>Cost: " + fmt(suN.cost) + " Supernova</div></button></div>";
      }
      mlist.innerHTML = mh;
      mlist.onclick = function (e) {
        var t = e.target;
        while (t && t !== mlist && t.id !== "mil1" && !/^snub\d+$/.test(t.id)) t = t.parentNode;
        if (t && /^snub\d+$/.test(t.id)) buySupernovaUpg(parseInt(t.id.slice(4), 10));
      };
    }
    for (var mi2 = 0; mi2 < MILESTONES.length; mi2++) {
      var mb = document.getElementById("mil" + (mi2 + 1));
      if (snMilestones[mi2]) mb.style.background = "#006400";
      else mb.style.background = "#8b8b00";
    }
    for (var si3 = 0; si3 < SN_UPGRADES.length; si3++) {
      var snb = document.getElementById("snub" + (si3 + 1));
      if (!snb) continue;
      if (snUpg[si3]) snb.style.background = "#006400";
      else snb.style.background = supernova.gte(SN_UPGRADES[si3].cost) ? "#8b8b00" : "#b03030";
    }
  }

  if (curTab === "clicker" && snMilestones[2]) {
    document.getElementById("clickamt").textContent = "Clicks: " + fmt(clicks);
    document.getElementById("clvltext").textContent = clickerLvl;
    document.getElementById("perkamt").textContent = perks;
    var upc = clickerUpgCost(clickerLvl);
    var pct = clicks.div(upc).mul(100).min(100).toNumber();
    document.getElementById("curlvlfill").style.width = pct + "%";
    document.getElementById("curlvltext").textContent = fmt(upc) + " Clicks to Level " + (clickerLvl + 1);
    var perkNames = ["Supernova Boost", "Click Boost", "Dust & Comet Boost"];
    var perkInfos = ["Supernovas x(level+1) (max 10)", "Clicks x(level+1) (max 25)", "Cosmic dust & Comets ^1.01 per level (max 100)"];
    for (var pk = 1; pk <= 3; pk++) {
      var pkb = document.getElementById("pk" + pk);
      var pkm = PERK_MAX[pk - 1];
      pkb.textContent = perkNames[pk - 1] + " (Lv " + perkLvl[pk - 1] + "/" + pkm + "): " + perkInfos[pk - 1] + "\nCost: 1 Perk";
      if (perks <= 0 || perkLvl[pk - 1] >= pkm) { pkb.disabled = true; pkb.style.background = "#b03030"; }
      else { pkb.disabled = false; pkb.style.background = "#8b8b00"; }
    }
    for (var cku3 = 1; cku3 <= 4; cku3++) {
      var cuk = document.getElementById("cu" + cku3);
      if (cku3 === 3) {
        cuk.style.display = snUpg[6] ? "" : "none";
        if (!snUpg[6]) continue;
      }
      if (cku3 === 4) {
        cuk.style.display = legacyUpgs[7] ? "" : "none";
        if (!legacyUpgs[7]) continue;
      }
      var cuc = clickUpgCost(cku3);
      var cuname = cku3 === 1 ? "Clicker Boost I" : (cku3 === 2 ? "Clicker Boost II" : (cku3 === 3 ? "Clicker Boost III" : "Clicker Boost IV"));
      var cuinfo = cku3 === 3 ? "Supernova ^1.05, Legacy Energy x10 per level" : (cku3 === 4 ? "Money ^1.1 per level" : "Cosmic dust ^1.01/comets ^1.01 per level");
      cuk.textContent = cuname + " (Lv " + clickUpgLvl[cku3 - 1] + "): " + cuinfo + "\nCost: " + fmt(cuc) + " Clicks";
      if (clicks.gte(cuc)) { cuk.disabled = false; cuk.style.background = "#8b8b00"; }
      else { cuk.disabled = true; cuk.style.background = "#b03030"; }
    }
  }

  if (curTab === "material" && elemBought[53]) {
    var matBoostR = matter.gt(1) ? matter.log10().div(2).max(new ExpantaNum(1)) : new ExpantaNum(1);
    var antiBoostR = antimatter.gt(1) ? antimatter.log10().div(2).max(new ExpantaNum(1)) : new ExpantaNum(1);
    document.getElementById("matamt").textContent = "Matter: " + fmt(matter) + " | Antimatter: " + fmt(antimatter) + " | Matter Boost (log100 Antimatter): x" + fmt(matBoostR) + " | Antimatter Boost (log100 Matter): x" + fmt(antiBoostR) + " | Dim 9: x" + fmt(new ExpantaNum(2).pow(dim9count));
    document.getElementById("matswitch").textContent = "Switch to " + (matSide === "matter" ? "Antimatter" : "Matter");
    var mdDiv = document.getElementById("matdims");
    if (curMatSideShown !== matSide) {
      curMatSideShown = matSide;
      var h = "<div style='font-size:16px;font-weight:bold'>" + (matSide === "matter" ? "Matter Dimensions" : "Antimatter Dimensions") + "</div>";
      if (matSide === "matter") {
        for (var mi = 1; mi <= 8; mi++) {
          h += "<div style='display:flex;justify-content:center;margin:4px'><button id='matd" + mi + "' style='width:280px;height:34px;border:2px solid #fff;color:#fff;cursor:pointer;font-family:inherit'></button></div>";
        }
        h += "<div style='display:flex;justify-content:center;margin:4px'><button id='matd9' style='width:280px;height:52px;border:2px solid #fff;color:#fff;cursor:pointer;font-family:inherit'></button></div>";
      } else {
        for (var ai = 1; ai <= 8; ai++) {
          h += "<div style='display:flex;justify-content:center;margin:4px'><button id='matd" + ai + "' style='width:280px;height:34px;border:2px solid #fff;color:#fff;cursor:pointer;font-family:inherit'></button></div>";
        }
      }
      mdDiv.innerHTML = h;
      for (var mi2 = 1; mi2 <= 8; mi2++) {
        var mdb = document.getElementById("matd" + mi2);
        if (!mdb) continue;
        mdb.onclick = (function (n) {
          return function () {
            if (matSide === "matter") buyMatterDim(n);
            else buyAntimatterDim(n);
          };
        })(mi2);
      }
      var m9b = document.getElementById("matd9");
      if (m9b) m9b.onclick = function () { buyMatterDim(9); };
    }
    for (var mi3 = 1; mi3 <= 8; mi3++) {
      var mdb3 = document.getElementById("matd" + mi3);
      if (!mdb3) continue;
      var costv3 = matSide === "matter" ? matDimCost(mi3) : antiDimCost(mi3);
      var genTxt3 = matSide === "matter" ? (mi3 === 1 ? "Matter" : "Dim " + (mi3 - 1)) : (mi3 === 1 ? "Antimatter" : "Dim " + (mi3 - 1));
      var cnt3 = matSide === "matter" ? fmt(matterDims[mi3 - 1]) : fmt(antimatterDims[mi3 - 1]);
      var cur3 = matSide === "matter" ? matter : antimatter;
      mdb3.textContent = "Dimension " + mi3 + ": " + cnt3 + " (generates " + genTxt3 + ")\nCost: " + fmt(costv3) + (matSide === "matter" ? " Matter" : " Antimatter");
      if (cur3.gte(costv3)) { mdb3.disabled = false; mdb3.style.background = "#8b8b00"; }
      else { mdb3.disabled = true; mdb3.style.background = "#b03030"; }
    }
    if (matSide === "matter") {
      var m9 = document.getElementById("matd9");
      if (m9) {
        if (dim9count >= 4000) {
          m9.textContent = "Dimension 9: " + dim9count + " bought (MAX)\nMatter & Antimatter x2 each";
          m9.disabled = true;
          m9.style.background = "#006400";
        } else {
          m9.textContent = "Dimension 9: " + dim9count + " bought\nMatter & Antimatter x2 each, Cost scales ^1.05\nCost: " + fmt(matDimCost(9)) + " Matter";
          if (matter.gte(matDimCost(9))) { m9.disabled = false; m9.style.background = "#8b8b00"; }
          else { m9.disabled = true; m9.style.background = "#b03030"; }
        }
      }
    }
  }

  if (curTab === "upgradables" && elemBought[55]) {
    document.getElementById("matupgamt").textContent = "Matter: " + fmt(matter) + " | Antimatter: " + fmt(antimatter);
    var matUpgNames = ["Matter & Antimatter Upgrade I", "Matter & Antimatter Upgrade II", "Matter & Antimatter Upgrade III"];
    var matUpgInfos = ["x200 Antimatter & Matter", "Antimatter & Matter ^1.5", "Unlocks the Legacy tab"];
    var matUpgCostStrs = ["1De Antimatter", "10QaDc Matter", "1e5093 Antimatter"];
    for (var muk = 1; muk <= 3; muk++) {
      var mub = document.getElementById("matu" + muk);
      var mcost = matUpgCost(muk);
      mub.textContent = matUpgNames[muk - 1] + (matUpgs[muk - 1] ? " (BOUGHT)" : "") + ": " + matUpgInfos[muk - 1] + "\nCost: " + matUpgCostStrs[muk - 1];
      var mcur = muk === 2 ? matter : antimatter;
      if (matUpgs[muk - 1]) { mub.disabled = true; mub.style.background = "#006400"; }
      else if (mcur.gte(mcost)) { mub.disabled = false; mub.style.background = "#8b8b00"; }
      else { mub.disabled = true; mub.style.background = "#b03030"; }
    }
  }

  if (curTab === "legacy" && matUpgs[2]) {
    var levrate = new ExpantaNum(1).mul(quarkUpg[23] ? 50 : 1).mul(legacyUpgs[1] ? 100 : 1).mul(elemBought[57] ? 100 : 1).mul(engineCount >= 4 ? 100 : 1).mul(cdUpg ? 50 : 1).mul(cometUpg[10] ? 100 : 1).mul(legacyUpgs[4] ? 500 : 1).mul(snUpg[5] ? 100000 : 1).mul(legacyUpgs[7] ? 100 : 1).mul(new ExpantaNum(10).pow(clickUpgLvl[2]));
    document.getElementById("levamt").textContent = "Legacy Energy: " + fmt(legacyEnergy) + " (+" + fmt(levrate) + "/s)";
    var lb1 = document.getElementById("levu1");
    lb1.textContent = "We are so tutol" + (legacyUpgs[0] ? " (BOUGHT)" : "") + ": Unlocks a new Void upgrade\nCost: 10 LE";
    if (legacyUpgs[0]) { lb1.disabled = true; lb1.style.background = "#006400"; }
    else if (legacyEnergy.gte(10)) { lb1.disabled = false; lb1.style.background = "#8b8b00"; }
    else { lb1.disabled = true; lb1.style.background = "#b03030"; }
    var lb2 = document.getElementById("levu2");
    lb2.style.display = quarkUpg[23] ? "" : "none";
    if (quarkUpg[23]) {
      lb2.textContent = "Legacy Power" + (legacyUpgs[1] ? " (BOUGHT)" : "") + ": x100 Legacy Energy\nCost: 1000 LE";
      if (legacyUpgs[1]) { lb2.disabled = true; lb2.style.background = "#006400"; }
      else if (legacyEnergy.gte(1000)) { lb2.disabled = false; lb2.style.background = "#8b8b00"; }
      else { lb2.disabled = true; lb2.style.background = "#b03030"; }
    }
    var lb3 = document.getElementById("levu3");
    lb3.style.display = elemBought[57] ? "" : "none";
    if (elemBought[57]) {
      lb3.textContent = "Legacy Upgrade III" + (legacyUpgs[2] ? " (UNLOCKED)" : "") + ": Unlocks the Engine\nUnlocked by Element 58";
      lb3.disabled = true;
      lb3.style.background = legacyUpgs[2] ? "#006400" : "#8b8b00";
    }
    var lb4 = document.getElementById("levu4");
    lb4.style.display = engineCount >= 4 ? "" : "none";
    if (engineCount >= 4) {
      lb4.textContent = "Legacy Upgrade IV" + (legacyUpgs[3] ? " (BOUGHT)" : "") + ": Unlocks a new Cosmic Dust Upgrade\nCost: 500M LE";
      if (legacyUpgs[3]) { lb4.disabled = true; lb4.style.background = "#006400"; }
      else if (legacyEnergy.gte(5e8)) { lb4.disabled = false; lb4.style.background = "#8b8b00"; }
      else { lb4.disabled = true; lb4.style.background = "#b03030"; }
    }
    var lb5 = document.getElementById("levu5");
    lb5.style.display = cometUpg[10] ? "" : "none";
    if (cometUpg[10]) {
      lb5.textContent = "Legacy Upgrade V" + (legacyUpgs[4] ? " (BOUGHT)" : "") + ": x500 Legacy Energy, Unlocks a new Supernova Upgrade\nCost: 10T LE";
      if (legacyUpgs[4]) { lb5.disabled = true; lb5.style.background = "#006400"; }
      else if (legacyEnergy.gte(1e13)) { lb5.disabled = false; lb5.style.background = "#8b8b00"; }
      else { lb5.disabled = true; lb5.style.background = "#b03030"; }
    }
    var lb6 = document.getElementById("levu6");
    lb6.style.display = snUpg[5] ? "" : "none";
    if (snUpg[5]) {
      lb6.textContent = "Legacy Upgrade VI" + (legacyUpgs[5] ? " (BOUGHT)" : "") + ": Atoms ^100Qa, Space ^100M\nCost: 500Qt LE";
      if (legacyUpgs[5]) { lb6.disabled = true; lb6.style.background = "#006400"; }
      else if (legacyEnergy.gte(5e20)) { lb6.disabled = false; lb6.style.background = "#8b8b00"; }
      else { lb6.disabled = true; lb6.style.background = "#b03030"; }
    }
    var lb7 = document.getElementById("levu7");
    lb7.style.display = legacyUpgs[5] ? "" : "none";
    if (legacyUpgs[5]) {
      lb7.textContent = "Legacy Upgrade VII" + (legacyUpgs[6] ? " (BOUGHT)" : "") + ": Unlocks a new Supernova Upgrade\nCost: 100Qa LE";
      if (legacyUpgs[6]) { lb7.disabled = true; lb7.style.background = "#006400"; }
      else if (legacyEnergy.gte(1e20)) { lb7.disabled = false; lb7.style.background = "#8b8b00"; }
      else { lb7.disabled = true; lb7.style.background = "#b03030"; }
    }
    var lb8 = document.getElementById("levu8");
    lb8.style.display = snUpg[6] ? "" : "none";
    if (snUpg[6]) {
      lb8.textContent = "Legacy Upgrade VIII" + (legacyUpgs[7] ? " (BOUGHT)" : "") + ": Legacy Energy x100, Money ^2, Unlocks a new Tycoon and Clicker Upgrade\nCost: 1SpNog LE";
      if (legacyUpgs[7]) { lb8.disabled = true; lb8.style.background = "#006400"; }
      else if (legacyEnergy.gte(1e294)) { lb8.disabled = false; lb8.style.background = "#8b8b00"; }
      else { lb8.disabled = true; lb8.style.background = "#b03030"; }
    }
  }

  if (curTab === "pumpkin") {
    document.getElementById("pumpkinamt").textContent = "Pumpkins: " + fmt(pumpkin);
    var pg = pumpkinGain();
    document.getElementById("pumpgapin").textContent = "On reset, gain " + fmt(pg) + " Pumpkins (floor(3.5*log10(log10(Candy)) - " + (pumpUpg[9] ? "0" : (pumpUpg[5] ? "3.2" : "4.3")) + "))";
    var pb = document.getElementById("pumpreset");
    if (pg.gte(1)) { pb.disabled = false; pb.style.background = "#8b8b00"; }
    else { pb.disabled = true; pb.style.background = "#b03030"; }
    document.getElementById("pumpupginfo").textContent = "Pumpkin Upgrade: x3 Candy, x2 Pumpkins";
    var pub = document.getElementById("pumpupgbtn");
    if (pumpUpg[0]) { pub.disabled = true; pub.textContent = "BOUGHT"; pub.style.background = "#006400"; }
    else {
      pub.textContent = "Buy Pumpkin Upgrade (Cost: 1 Pumpkin)";
      if (pumpkin.gte(1)) { pub.disabled = false; pub.style.background = "#8b8b00"; }
      else { pub.disabled = true; pub.style.background = "#b03030"; }
    }
    document.getElementById("pumpupg2info").textContent = "Pumpkin Upgrade II: x5 Candy, x3 Pumpkins";
    var pu2b = document.getElementById("pumpupg2btn");
    if (pumpUpg[1]) { pu2b.disabled = true; pu2b.textContent = "BOUGHT"; pu2b.style.background = "#006400"; }
    else {
      pu2b.textContent = "Buy Pumpkin Upgrade II (Cost: 2 Pumpkins)";
      if (pumpkin.gte(2)) { pu2b.disabled = false; pu2b.style.background = "#8b8b00"; }
      else { pu2b.disabled = true; pu2b.style.background = "#b03030"; }
    }
    document.getElementById("pumpupg3info").textContent = "Pumpkin Upgrade III: x50 Candy, x10 Pumpkins, -1s Candy cooldown";
    var pu3b = document.getElementById("pumpupg3btn");
    if (pumpUpg[2]) { pu3b.disabled = true; pu3b.textContent = "BOUGHT"; pu3b.style.background = "#006400"; }
    else {
      pu3b.textContent = "Buy Pumpkin Upgrade III (Cost: 6 Pumpkins)";
      if (pumpkin.gte(6)) { pu3b.disabled = false; pu3b.style.background = "#8b8b00"; }
      else { pu3b.disabled = true; pu3b.style.background = "#b03030"; }
    }
    document.getElementById("pumpupg4info").textContent = "Pumpkin Upgrade IV: x100 Candy, x500 Pumpkins, -0.5s Candy cooldown, Autobuys Candy Upgrades II & IV";
    var pu4b = document.getElementById("pumpupg4btn");
    if (pumpUpg[3]) { pu4b.disabled = true; pu4b.textContent = "BOUGHT"; pu4b.style.background = "#006400"; }
    else {
      pu4b.textContent = "Buy Pumpkin Upgrade IV (Cost: 60 Pumpkins)";
      if (pumpkin.gte(60)) { pu4b.disabled = false; pu4b.style.background = "#8b8b00"; }
      else { pu4b.disabled = true; pu4b.style.background = "#b03030"; }
    }
    document.getElementById("pumpupg5info").textContent = "Pumpkin Upgrade V: x50 Pumpkins, -0.4s Candy cooldown, Candy ^1.1, Autobuys all Candy upgrades";
    var pu5b = document.getElementById("pumpupg5btn");
    if (pumpUpg[4]) { pu5b.disabled = true; pu5b.textContent = "BOUGHT"; pu5b.style.background = "#006400"; }
    else {
      pu5b.textContent = "Buy Pumpkin Upgrade V (Cost: 60K Pumpkins)";
      if (pumpkin.gte(60000)) { pu5b.disabled = false; pu5b.style.background = "#8b8b00"; }
      else { pu5b.disabled = true; pu5b.style.background = "#b03030"; }
    }
    document.getElementById("pumpupg6info").textContent = "Pumpkin Upgrade VI: Generates Candy, Candy ^1.2, Pumpkin formula -4.3 -> -3.2";
    var pu6b = document.getElementById("pumpupg6btn");
    if (pumpUpg[5]) { pu6b.disabled = true; pu6b.textContent = "BOUGHT"; pu6b.style.background = "#006400"; }
    else {
      pu6b.textContent = "Buy Pumpkin Upgrade VI (Cost: 3M Pumpkins)";
      if (pumpkin.gte(3000000)) { pu6b.disabled = false; pu6b.style.background = "#8b8b00"; }
      else { pu6b.disabled = true; pu6b.style.background = "#b03030"; }
    }
    document.getElementById("pumpupg7info").textContent = "Pumpkin Upgrade VII: Unlocks Candy Upgrade VI";
    var pu7b = document.getElementById("pumpupg7btn");
    if (pumpUpg[6]) { pu7b.disabled = true; pu7b.textContent = "BOUGHT"; pu7b.style.background = "#006400"; }
    else {
      pu7b.textContent = "Buy Pumpkin Upgrade VII (Cost: 100M Pumpkins)";
      if (pumpkin.gte(100000000)) { pu7b.disabled = false; pu7b.style.background = "#8b8b00"; }
      else { pu7b.disabled = true; pu7b.style.background = "#b03030"; }
    }
    document.getElementById("pumpupg8info").textContent = "Pumpkin Upgrade VIII: Candy ^1.2, Pumpkins ^1.05";
    var pu8b = document.getElementById("pumpupg8btn");
    if (pumpUpg[7]) { pu8b.disabled = true; pu8b.textContent = "BOUGHT"; pu8b.style.background = "#006400"; }
    else {
      pu8b.textContent = "Buy Pumpkin Upgrade VIII (Cost: 300M Pumpkins)";
      if (pumpkin.gte(300000000)) { pu8b.disabled = false; pu8b.style.background = "#8b8b00"; }
      else { pu8b.disabled = true; pu8b.style.background = "#b03030"; }
    }
    document.getElementById("pumpupg9info").textContent = "Pumpkin Upgrade IX: Candy ^1.3, Pumpkins ^1.2, Unlocks the Harvesting sub-tab";
    var pu9b = document.getElementById("pumpupg9btn");
    if (pumpUpg[8]) { pu9b.disabled = true; pu9b.textContent = "BOUGHT"; pu9b.style.background = "#006400"; }
    else {
      pu9b.textContent = "Buy Pumpkin Upgrade IX (Cost: 2B Pumpkins)";
      if (pumpkin.gte(2000000000)) { pu9b.disabled = false; pu9b.style.background = "#8b8b00"; }
      else { pu9b.disabled = true; pu9b.style.background = "#b03030"; }
    }
    document.getElementById("pumpupg10info").textContent = "Pumpkin Upgrade X: Candy ^1.2, Pumpkins ^1.1, x5 HP, Pumpkin formula -3.2 -> 0";
    var pu10b = document.getElementById("pumpupg10btn");
    if (pumpUpg[9]) { pu10b.disabled = true; pu10b.textContent = "BOUGHT"; pu10b.style.background = "#006400"; }
    else {
      pu10b.textContent = "Buy Pumpkin Upgrade X (Cost: 100Qa Pumpkins)";
      if (pumpkin.gte("1e20")) { pu10b.disabled = false; pu10b.style.background = "#8b8b00"; }
      else { pu10b.disabled = true; pu10b.style.background = "#b03030"; }
    }
    document.getElementById("pumpupg11info").textContent = "Pumpkin Upgrade XI: Candy ^1.5, Pumpkins ^2, x5000 HP";
    var pu11b = document.getElementById("pumpupg11btn");
    if (pumpUpg[10]) { pu11b.disabled = true; pu11b.textContent = "BOUGHT"; pu11b.style.background = "#006400"; }
    else {
      pu11b.textContent = "Buy Pumpkin Upgrade XI (Cost: 1 Oc Pumpkins)";
      if (pumpkin.gte("1e27")) { pu11b.disabled = false; pu11b.style.background = "#8b8b00"; }
      else { pu11b.disabled = true; pu11b.style.background = "#b03030"; }
    }
  }
  document.getElementById("pumtab").style.display = (curTab === "halloween" || curTab === "pumpkin" || curTab === "harvesting") ? "" : "none";
  document.getElementById("harvtab").style.display = (curTab === "halloween" || curTab === "pumpkin" || curTab === "harvesting") && pumpUpg[8] ? "" : "none";

  if (curTab === "harvesting") {
    document.getElementById("harvptsamt").textContent = "Harvest Points: " + fmt(harvPts);
    document.getElementById("harvgaininfo").textContent = "On harvest, gain " + fmt(harvGain()) + " HP";
    var hcl2 = Date.now() - lastHarv;
    var hrem = Math.max(0, harvCd() - hcl2);
    var hb = document.getElementById("harvbtn");
    if (hrem > 0) {
      hb.disabled = true;
      hb.textContent = "Cooldown: " + (hrem / 1000).toFixed(1) + "s";
      hb.style.background = "#b03030";
    } else {
      hb.disabled = false;
      hb.textContent = "Harvest (+" + fmt(harvGain()) + " HP)";
      hb.style.background = "#8b8b00";
    }
    document.getElementById("harvupginfo").textContent = "Harvest Upgrade I: x2 HP, /2 Harvesting cooldown";
    var hub = document.getElementById("harvupgbtn");
    if (harvUpg >= 1) { hub.disabled = true; hub.textContent = "BOUGHT"; hub.style.background = "#006400"; }
    else {
      hub.textContent = "Buy Harvest Upgrade I (Cost: 1 HP)";
      if (harvPts.gte(1)) { hub.disabled = false; hub.style.background = "#8b8b00"; }
      else { hub.disabled = true; hub.style.background = "#b03030"; }
    }
    document.getElementById("harvupg2info").style.display = harvUpg >= 1 ? "" : "none";
    document.getElementById("harvupg2btn").style.display = harvUpg >= 1 ? "" : "none";
    if (harvUpg >= 1) {
      document.getElementById("harvupg2info").textContent = "Harvest Upgrade II: x10 HP, /10 Harvesting cooldown, Candy ^1.05";
      var hu2b = document.getElementById("harvupg2btn");
      if (harvUpg >= 2) { hu2b.disabled = true; hu2b.textContent = "BOUGHT"; hu2b.style.background = "#006400"; }
      else {
        hu2b.textContent = "Buy Harvest Upgrade II (Cost: 20 HP)";
        if (harvPts.gte(20)) { hu2b.disabled = false; hu2b.style.background = "#8b8b00"; }
        else { hu2b.disabled = true; hu2b.style.background = "#b03030"; }
      }
    }
    document.getElementById("harvupg3info").style.display = harvUpg >= 2 ? "" : "none";
    document.getElementById("harvupg3btn").style.display = harvUpg >= 2 ? "" : "none";
    if (harvUpg >= 2) {
      document.getElementById("harvupg3info").textContent = "Harvest Upgrade III: x50 HP, /5 Harvesting cooldown, Candy x log2(HP)";
      var hu3b = document.getElementById("harvupg3btn");
      if (harvUpg >= 3) { hu3b.disabled = true; hu3b.textContent = "BOUGHT"; hu3b.style.background = "#006400"; }
      else {
        hu3b.textContent = "Buy Harvest Upgrade III (Cost: 200 HP)";
        if (harvPts.gte(200)) { hu3b.disabled = false; hu3b.style.background = "#8b8b00"; }
        else { hu3b.disabled = true; hu3b.style.background = "#b03030"; }
      }
    }
  }

  if (curTab === "halloween") {
    var cl = Date.now() - lastCandy;
    var rem = Math.max(0, candyCd() - cl);
    document.getElementById("candyamt").textContent = "Candy: " + fmt(candy);
    document.getElementById("candyupginfo").textContent = "Candy Upgrade: Level " + candyUpgLvl + "/20, x" + fmt(candyBase()) + " Candy";
    document.getElementById("candyupg2info").textContent = "Candy Upgrade II: Level " + candyUpgLvl2 + "/100, +0.1 Candy Upgrade base per level";
    var cu2b = document.getElementById("candyupg2btn");
    if (candyUpgLvl2 >= 100) { cu2b.disabled = true; cu2b.textContent = "MAX"; cu2b.style.background = "#006400"; }
    else {
      cu2b.textContent = "Buy Candy Upgrade II (Cost: " + fmt(candyUpg2Cost()) + " Candy)";
      if (candy.gte(candyUpg2Cost())) { cu2b.disabled = false; cu2b.style.background = "#8b8b00"; }
      else { cu2b.disabled = true; cu2b.style.background = "#b03030"; }
    }
    document.getElementById("candyupg3info").textContent = "Candy Upgrade III: Level " + candyUpgLvl3 + "/3, -1s cooldown per level (cooldown: " + (candyCd() / 1000) + "s)";
    document.getElementById("candyupg4info").textContent = "Candy Upgrade IV: Level " + candyUpgLvl4 + "/400, x1.1 Candy Upgrade base per level";
    var cu4b = document.getElementById("candyupg4btn");
    if (candyUpgLvl4 >= 400) { cu4b.disabled = true; cu4b.textContent = "MAX"; cu4b.style.background = "#006400"; }
    else {
      cu4b.textContent = "Buy Candy Upgrade IV (Cost: " + fmt(candyUpg4Cost()) + " Candy)";
      if (candy.gte(candyUpg4Cost())) { cu4b.disabled = false; cu4b.style.background = "#8b8b00"; }
      else { cu4b.disabled = true; cu4b.style.background = "#b03030"; }
    }
    document.getElementById("candyupg6info").style.display = pumpUpg[6] ? "" : "none";
    document.getElementById("candyupg6btn").style.display = pumpUpg[6] ? "" : "none";
    if (pumpUpg[6]) {
      document.getElementById("candyupg6info").textContent = "Candy Upgrade VI: Level " + candyUpgLvl6 + "/100K, x1.1 Candy & x1.1 Pumpkins per level";
      var cu6b = document.getElementById("candyupg6btn");
      if (candyUpgLvl6 >= 100000) { cu6b.disabled = true; cu6b.textContent = "MAX"; cu6b.style.background = "#006400"; }
      else {
        cu6b.textContent = "Buy Candy Upgrade VI (Cost: " + fmt(candyUpg6Cost()) + " Candy)";
        if (candy.gte(candyUpg6Cost())) { cu6b.disabled = false; cu6b.style.background = "#8b8b00"; }
        else { cu6b.disabled = true; cu6b.style.background = "#b03030"; }
      }
    }
    var cu3b = document.getElementById("candyupg3btn");
    if (candyUpgLvl3 >= 3) { cu3b.disabled = true; cu3b.textContent = "MAX"; cu3b.style.background = "#006400"; }
    else {
      cu3b.textContent = "Buy Candy Upgrade III (Cost: " + fmt(candyUpg3Cost()) + " Candy)";
      if (candy.gte(candyUpg3Cost())) { cu3b.disabled = false; cu3b.style.background = "#8b8b00"; }
      else { cu3b.disabled = true; cu3b.style.background = "#b03030"; }
    }
    var cub = document.getElementById("candyupgbtn");
    if (candyUpgLvl >= 20) { cub.disabled = true; cub.textContent = "MAX"; cub.style.background = "#006400"; }
    else {
      cub.textContent = "Buy Candy Upgrade (Cost: " + fmt(candyUpgCost()) + " Candy)";
      if (candy.gte(candyUpgCost())) { cub.disabled = false; cub.style.background = "#8b8b00"; }
      else { cub.disabled = true; cub.style.background = "#b03030"; }
    }
    var cb = document.getElementById("candybtn");
    if (rem > 0) {
      cb.disabled = true;
      cb.textContent = "Cooldown: " + (rem / 1000).toFixed(1) + "s";
      cb.style.background = "#b03030";
    } else {
      cb.disabled = false;
      cb.textContent = "Get +" + fmt(candyAmount()) + " Candy";
      cb.style.background = "#8b8b00";
    }
  }

  if (curTab === "tycoon" && elemBought[47]) {
    document.getElementById("moneyamt").textContent = "Money: " + fmt(money);
    var tyNames = ["Tycoon Upgrade I", "Tycoon Upgrade II", "Tycoon Upgrade III", "Tycoon Upgrade IV"];
    var tyInfos = ["Generates 1 money per second", "Money x5, Cosmic dust ^1.1", "Money gain ^2, Atoms ^1.1, Cosmic dust ^1.2, Comets ^1.2", "Money gain ^10"];
    var tyCosts = [10, 10, 500, "1e30000"];
    var ty4b = document.getElementById("ty4");
    ty4b.style.display = legacyUpgs[7] ? "" : "none";
    for (var tyk = 1; tyk <= 4; tyk++) {
      var tyb = document.getElementById("ty" + tyk);
      if (tyk === 4 && !legacyUpgs[7]) { tyb.disabled = true; continue; }
      tyb.textContent = tyNames[tyk - 1] + (tyUpgs[tyk - 1] ? " (BOUGHT)" : "") + ": " + tyInfos[tyk - 1] + "\nCost: " + fmt(new ExpantaNum(tyCosts[tyk - 1])) + " Money";
      if (tyUpgs[tyk - 1]) { tyb.disabled = true; tyb.style.background = "#006400"; }
      else if ((tyk === 2 && !tyUpgs[0]) || (tyk === 3 && !tyUpgs[1]) || (tyk === 4 && !tyUpgs[2]) || money.lt(new ExpantaNum(tyCosts[tyk - 1]))) { tyb.disabled = true; tyb.style.background = "#b03030"; }
      else { tyb.disabled = false; tyb.style.background = "#8b8b00"; }
    }
  }

  if (curTab === "elements" && atomResets > 0) {
    var et = document.getElementById("elist");
    if (!et.dataset.init) {
      et.dataset.init = "1";
      var ELEMENTS = [
        ["H","Hydrogen",[1,1]],["He","Helium",[1,18]],
        ["Li","Lithium",[2,1]],["Be","Beryllium",[2,2]],["B","Boron",[2,13]],["C","Carbon",[2,14]],["N","Nitrogen",[2,15]],["O","Oxygen",[2,16]],["F","Fluorine",[2,17]],["Ne","Neon",[2,18]],
        ["Na","Sodium",[3,1]],["Mg","Magnesium",[3,2]],["Al","Aluminium",[3,13]],["Si","Silicon",[3,14]],["P","Phosphorus",[3,15]],["S","Sulfur",[3,16]],["Cl","Chlorine",[3,17]],["Ar","Argon",[3,18]],
        ["K","Potassium",[4,1]],["Ca","Calcium",[4,2]],["Sc","Scandium",[4,3]],["Ti","Titanium",[4,4]],["V","Vanadium",[4,5]],["Cr","Chromium",[4,6]],["Mn","Manganese",[4,7]],["Fe","Iron",[4,8]],["Co","Cobalt",[4,9]],["Ni","Nickel",[4,10]],["Cu","Copper",[4,11]],["Zn","Zinc",[4,12]],["Ga","Gallium",[4,13]],["Ge","Germanium",[4,14]],["As","Arsenic",[4,15]],["Se","Selenium",[4,16]],["Br","Bromine",[4,17]],["Kr","Krypton",[4,18]],
        ["Rb","Rubidium",[5,1]],["Sr","Strontium",[5,2]],["Y","Yttrium",[5,3]],["Zr","Zirconium",[5,4]],["Nb","Niobium",[5,5]],["Mo","Molybdenum",[5,6]],["Tc","Technetium",[5,7]],["Ru","Ruthenium",[5,8]],["Rh","Rhodium",[5,9]],["Pd","Palladium",[5,10]],["Ag","Silver",[5,11]],["Cd","Cadmium",[5,12]],["In","Indium",[5,13]],["Sn","Tin",[5,14]],["Sb","Antimony",[5,15]],["Te","Tellurium",[5,16]],["I","Iodine",[5,17]],["Xe","Xenon",[5,18]],
        ["Cs","Caesium",[6,1]],["Ba","Barium",[6,2]],["La","Lanthanum",[6,3]],["Hf","Hafnium",[6,4]],["Ta","Tantalum",[6,5]],["W","Tungsten",[6,6]],["Re","Rhenium",[6,7]],["Os","Osmium",[6,8]],["Ir","Iridium",[6,9]],["Pt","Platinum",[6,10]],["Au","Gold",[6,11]],["Hg","Mercury",[6,12]],["Tl","Thallium",[6,13]],["Pb","Lead",[6,14]],["Bi","Bismuth",[6,15]],["Po","Polonium",[6,16]],["At","Astatine",[6,17]],["Rn","Radon",[6,18]],
        ["Fr","Francium",[7,1]],["Ra","Radium",[7,2]],["Ac","Actinium",[7,3]],["Rf","Rutherfordium",[7,4]],["Db","Dubnium",[7,5]],["Sg","Seaborgium",[7,6]],["Bh","Bohrium",[7,7]],["Hs","Hassium",[7,8]],["Mt","Meitnerium",[7,9]],["Ds","Darmstadtium",[7,10]],["Rg","Roentgenium",[7,11]],["Cn","Copernicium",[7,12]],["Nh","Nihonium",[7,13]],["Fl","Flerovium",[7,14]],["Mc","Moscovium",[7,15]],["Lv","Livermorium",[7,16]],["Ts","Tennessine",[7,17]],["Og","Oganesson",[7,18]],
        ["Ce","Cerium",[8,4]],["Pr","Praseodymium",[8,5]],["Nd","Neodymium",[8,6]],["Pm","Promethium",[8,7]],["Sm","Samarium",[8,8]],["Eu","Europium",[8,9]],["Gd","Gadolinium",[8,10]],["Tb","Terbium",[8,11]],["Dy","Dysprosium",[8,12]],["Ho","Holmium",[8,13]],["Er","Erbium",[8,14]],["Tm","Thulium",[8,15]],["Yb","Ytterbium",[8,16]],["Lu","Lutetium",[8,17]],
        ["Th","Thorium",[9,4]],["Pa","Protactinium",[9,5]],["U","Uranium",[9,6]],["Np","Neptunium",[9,7]],["Pu","Plutonium",[9,8]],["Am","Americium",[9,9]],["Cm","Curium",[9,10]],["Bk","Berkelium",[9,11]],["Cf","Californium",[9,12]],["Es","Einsteinium",[9,13]],["Fm","Fermium",[9,14]],["Md","Mendelevium",[9,15]],["No","Nobelium",[9,16]],["Lr","Lawrencium",[9,17]]
      ];
      var grid = {};
      for (var ei = 0; ei < ELEMENTS.length; ei++) {
        var el = ELEMENTS[ei];
        var p = el[2];
        grid[p[0] + ":" + p[1]] = "<div class='elem' data-idx='" + ei + "' data-name='" + el[0] + "' data-info='" + ELEM_EFFECT[ei] + "\nCost: " + elemCostStr(ei + 1) + (ei === 57 ? "\nRequires: Elements 55-57" : "") + "' style='width:60px;height:60px;margin:3px;text-align:center;background:#8b0000;color:#fff;cursor:pointer'><div style='font-size:10px'>#" + (ei + 1) + "</div><div style='font-size:18px;font-weight:bold'>" + el[0] + "</div><div style='font-size:8px'>" + el[1] + "</div></div>";
      }
      var html = "<div style='font-size:20px;margin-bottom:10px'>Element Table</div>";
      for (var r = 1; r <= 9; r++) {
        html += "<div style='display:grid;grid-template-columns:repeat(18,66px);margin-bottom:2px'>";
        for (var c = 1; c <= 18; c++) {
          html += grid[r + ":" + c] || "<div style='width:60px;height:70px;margin:3px'></div>";
        }
        html += "</div>";
        if (r === 7) {
          html += "<div style='height:36px'></div>";
        }
      }
      et.innerHTML = html;
      var tooltip = document.getElementById("einfo");
      var cells = et.getElementsByClassName("elem");
      for (var c = 0; c < cells.length; c++) {
        (function (cell) {
          cell.onmouseenter = function () {
            tooltip.textContent = cell.dataset.name + "\n" + cell.dataset.info;
            tooltip.style.display = "block";
          };
          cell.onmousemove = function (e) {
            tooltip.style.left = (e.clientX + 12) + "px";
            tooltip.style.top = (e.clientY + 12) + "px";
          };
          cell.onmouseleave = function () {
            tooltip.style.display = "none";
          };
          cell.onclick = function () {
            var idx = parseInt(cell.dataset.idx);
            buyElement(idx + 1);
          };
        })(cells[c]);
      }
    }
    var updCells = et.getElementsByClassName("elem");
    for (var ci = 0; ci < updCells.length; ci++) {
      var eidx = parseInt(updCells[ci].dataset.idx);
      if (elemBought[eidx]) {
        updCells[ci].style.background = "#006400";
      } else if (elemAffordable(eidx + 1)) {
        updCells[ci].style.background = "#8b8b00";
      } else {
        updCells[ci].style.background = "#8b0000";
      }
    }
  }

  document.getElementById("ctab").style.display = elemBought[10] ? "" : "none";
  document.getElementById("itab").style.display = elemBought[14] ? "" : "none";
  document.getElementById("rtab").style.display = elemBought[26] ? "" : "none";
  document.getElementById("ttab").style.display = elemBought[31] ? "" : "none";
  document.getElementById("spab").style.display = elemBought[36] ? "" : "none";
  document.getElementById("mtab").style.display = snTotal.gt(0) ? "" : "none";
  document.getElementById("clicktab").style.display = snMilestones[2] ? "" : "none";
  document.getElementById("tytab").style.display = elemBought[47] ? "" : "none";
document.getElementById("mattab").style.display = elemBought[53] ? "" : "none";
document.getElementById("uptab").style.display = elemBought[55] ? "" : "none";
document.getElementById("letab").style.display = matUpgs[2] ? "" : "none";

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
