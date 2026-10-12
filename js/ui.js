document.getElementById("qb1").onclick = function () { buyQuark(1); };
document.getElementById("qb2").onclick = function () { buyQuark(2); };
document.getElementById("qb3").onclick = function () { buyQuark(3); };
document.getElementById("qb4").onclick = function () { buyQuark(4); };
document.getElementById("qb5").onclick = function () { buyQuark(5); };
document.getElementById("qb6").onclick = function () { buyQuark(6); };
document.getElementById("qb7").onclick = function () { buyQuark(7); };
document.getElementById("qb8").onclick = function () { buyQuark(8); };
document.getElementById("qb9").onclick = function () { buyQuark(9); };
document.getElementById("qb10").onclick = function () { buyQuark(10); };
document.getElementById("qb11").onclick = function () { buyQuark(11); };
document.getElementById("qb12").onclick = function () { buyQuark(12); };
document.getElementById("qb13").onclick = function () { buyQuark(13); };
document.getElementById("qb14").onclick = function () { buyQuark(14); };
document.getElementById("qb15").onclick = function () { buyQuark(15); };
document.getElementById("qb16").onclick = function () { buyQuark(16); };
document.getElementById("qb17").onclick = function () { buyQuark(17); };
document.getElementById("qb18").onclick = function () { buyQuark(18); };
document.getElementById("qb19").onclick = function () { buyQuark(19); };
document.getElementById("qb20").onclick = function () { buyQuark(20); };
document.getElementById("qb21").onclick = function () { buyQuark(21); };
document.getElementById("qb22").onclick = function () { buyQuark(22); };
document.getElementById("qb23").onclick = function () { buyQuark(23); };
document.getElementById("qb24").onclick = function () { buyQuark(24); };
document.getElementById("qreset").onclick = doQuarkReset;

var hardResetting = false;

document.getElementById("hardreset").onclick = function () {
  if (confirm("Hard reset will delete ALL progress (void, upgrades, quarks, achievements). Are you sure?")) {
    hardResetting = true;
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  }
};

document.getElementById("export").onclick = function () {
  document.getElementById("savebox").value = encodeSave({ v: voidAmt.toString(), k: quarks.toString(), a: atoms.toString(), ar: atomResets, l: lv[0], m: lv[1], n: lv[2], o: lv[3], p: lv[4], q: lv[5], r: lv[6], s: lv[7], t: lv[8], u: lv[9], w: lv[10], x: lv[11], y: lv[12], z: lv[13], aa: lv[14], ab: lv[15], ac: lv[16], ad: lv[17], ae: lv[18], c: quarkUpg, b7: keptBase7, b8: keptBase8, rc: resetCount, ch: achs, eb: elemBought, mr: maxReset, ca: chalActive, ci: chalIdx, cd: chalDone, cr: chalReward, hb: hBonus, il: infLvl, i2: inf2Lvl, rd: red.toString(), gr: green.toString(), bl: blue.toString(), tp: ttparts.toString(), tm: timeBought, cdst: cosmicDust.toString(), sb: spaceB, sl: spaceLvl, cm: comets.toString(), cu: cometUpg, sn: supernova.toString(), snT: snTotal.toString(), snm: snMilestones, snu: snUpg, cl: sane(clicks).toString(), cll: clickerLvl, clk: perks, clv: perkLvl, clu: clickUpgLvl, mo: sane(money).toString(), ty: tyUpgs, mu: matUpgs, ma: sane(matter).toString(), am: sane(antimatter).toString(), mds: matterDims.map(function (x) { return x.toString(); }), ads: antimatterDims.map(function (x) { return x.toString(); }), msi: matSide, d9: dim9count, le: sane(legacyEnergy).toString(), lg: legacyUpgs, u20: upg20Bought, eg: engineCount, scu: cdUpg, cny: sane(candy).toString(), lc: lastCandy, cul: candyUpgLvl, c2: candyUpgLvl2, c3: candyUpgLvl3, c4: candyUpgLvl4, c6: candyUpgLvl6, pkn: sane(pumpkin).toString(), pu: pumpUpg, hv: sane(harvPts).toString(), lhv: lastHarv, hu: harvUpg });
  document.getElementById("savepop-title").textContent = "Your save (copy this):";
  document.getElementById("savepopup").style.display = "";
  var box = document.getElementById("savebox");
  box.readOnly = true;
  box.focus();
  box.select();
  box.setSelectionRange(0, box.value.length);
};

var savePopMode = "export";
document.getElementById("import").onclick = function () {
  savePopMode = "import";
  document.getElementById("savebox").value = "";
  document.getElementById("savebox").readOnly = false;
  document.getElementById("savepop-title").textContent = "Paste your save, then click OK:";
  document.getElementById("savepopup").style.display = "";
  document.getElementById("savebox").focus();
};

document.getElementById("savepop-cancel").onclick = function () {
  document.getElementById("savepopup").style.display = "none";
};

document.getElementById("savepop-ok").onclick = function () {
  var s = document.getElementById("savebox").value;
  document.getElementById("savepopup").style.display = "none";
  if (savePopMode !== "import" || !s) return;
  try {
    var d = decodeSave(s);
    if (Array.isArray(d.a)) {
      if (d.ch === undefined) d.ch = d.a;
      d.a = undefined;
    }
    voidAmt = sane(new ExpantaNum(d.v));
    quarks = d.k !== undefined ? sane(new ExpantaNum(d.k)) : new ExpantaNum(0);
    atoms = d.a !== undefined ? sane(new ExpantaNum(d.a)) : new ExpantaNum(0);
    atomResets = d.ar || 0;
    lv[0] = d.l || 0; lv[1] = d.m || 0; lv[2] = d.n || 0; lv[3] = d.o || 0;
    lv[4] = d.p || 0; lv[5] = d.q || 0; lv[6] = d.r || 0; lv[7] = d.s || 0;
    lv[8] = d.t || 0; lv[9] = d.u || 0; lv[10] = d.w || 0; lv[11] = d.x || 0;
    lv[12] = d.y || 0; lv[13] = d.z || 0; lv[14] = d.aa || 0; lv[15] = d.ab || 0; lv[16] = d.ac || 0; lv[17] = d.ad || 0; lv[18] = d.ae || 0;
    if (d.c) for (var i = 0; i < quarkUpg.length; i++) quarkUpg[i] = !!d.c[i];
    if (d.ch) for (var j = 0; j < achs.length; j++) achs[j] = !!d.ch[j];
    if (d.eb) for (var j = 0; j < elemBought.length; j++) elemBought[j] = !!d.eb[j];
    maxReset = !!d.mr;
    chalActive = !!d.ca;
    if (d.ci !== undefined) chalIdx = +(d.ci) || 0;
    if (d.cd) for (var j = 0; j < chalDone.length; j++) chalDone[j] = !!d.cd[j];
    if (d.cr) for (var j = 0; j < chalReward.length; j++) chalReward[j] = !!d.cr[j];
    keptBase7 = d.b7 || 0;
    keptBase8 = d.b8 || 0;
    resetCount = d.rc || 0;
    infLvl = d.il || 0;
    inf2Lvl = d.i2 || 0;
    hBonus = !!d.hb;
    red = d.rd !== undefined ? sane(new ExpantaNum(d.rd)) : new ExpantaNum(1);
    green = d.gr !== undefined ? sane(new ExpantaNum(d.gr)) : new ExpantaNum(1);
    blue = d.bl !== undefined ? sane(new ExpantaNum(d.bl)) : new ExpantaNum(1);
    ttparts = d.tp !== undefined ? sane(new ExpantaNum(d.tp)) : new ExpantaNum(0);
    timeBought = !!d.tm;
    cosmicDust = d.cdst !== undefined ? sane(new ExpantaNum(d.cdst)) : new ExpantaNum(0);
    if (d.sb) for (var si = 0; si < spaceB.length; si++) spaceB[si] = !!d.sb[si];
    if (d.sl) for (var sli = 0; sli < spaceLvl.length; sli++) spaceLvl[sli] = d.sl[sli] || 0;
    comets = d.cm !== undefined ? sane(new ExpantaNum(d.cm)) : new ExpantaNum(0);
    if (d.cu) for (var cui = 0; cui < cometUpg.length; cui++) cometUpg[cui] = !!d.cu[cui];
    supernova = d.sn !== undefined ? sane(new ExpantaNum(d.sn)) : new ExpantaNum(0);
    snTotal = d.snT !== undefined ? sane(new ExpantaNum(d.snT)) : new ExpantaNum(0);
    if (d.snm) for (var smi = 0; smi < snMilestones.length; smi++) snMilestones[smi] = !!d.snm[smi];
    if (d.snu) for (var siu = 0; siu < snUpg.length; siu++) snUpg[siu] = !!d.snu[siu];
    clicks = d.cl !== undefined ? sane(new ExpantaNum(d.cl)) : new ExpantaNum(0);
    clickerLvl = d.cll || 0;
    perks = d.clk || 0;
    if (d.clv) for (var ckl = 0; ckl < perkLvl.length; ckl++) perkLvl[ckl] = d.clv[ckl] || 0;
    if (d.clu) for (var cku2 = 0; cku2 < clickUpgLvl.length; cku2++) clickUpgLvl[cku2] = d.clu[cku2] || 0;
    money = d.mo !== undefined ? sane(new ExpantaNum(d.mo)) : new ExpantaNum(0);
    if (d.ty) for (var tyi = 0; tyi < tyUpgs.length; tyi++) tyUpgs[tyi] = !!d.ty[tyi];
    if (d.mu) for (var mui = 0; mui < matUpgs.length; mui++) matUpgs[mui] = !!d.mu[mui];
    matter = d.ma !== undefined ? sane(new ExpantaNum(d.ma)) : new ExpantaNum(0);
    antimatter = d.am !== undefined ? sane(new ExpantaNum(d.am)) : new ExpantaNum(0);
    if (d.mds) for (var mdi = 0; mdi < matterDims.length; mdi++) matterDims[mdi] = d.mds[mdi] !== undefined ? sane(new ExpantaNum(d.mds[mdi])) : new ExpantaNum(0);
    if (d.ads) for (var adi = 0; adi < antimatterDims.length; adi++) antimatterDims[adi] = d.ads[adi] !== undefined ? sane(new ExpantaNum(d.ads[adi])) : new ExpantaNum(0);
    matSide = d.msi || "matter";
    dim9count = d.d9 || 0;
    legacyEnergy = d.le !== undefined ? sane(new ExpantaNum(d.le)) : new ExpantaNum(0);
    if (d.lg) for (var lgi = 0; lgi < legacyUpgs.length; lgi++) legacyUpgs[lgi] = !!d.lg[lgi];
    upg20Bought = !!d.u20;
    engineCount = d.eg || 0;
    cdUpg = !!d.scu;
    candy = d.cny !== undefined ? sane(new ExpantaNum(d.cny)) : new ExpantaNum(0);
    lastCandy = d.lc || 0;
    candyUpgLvl = d.cul || 0;
    candyUpgLvl2 = d.c2 || 0;
    candyUpgLvl3 = d.c3 || 0;
    candyUpgLvl4 = d.c4 || 0;
    candyUpgLvl6 = d.c6 || 0;
    pumpkin = d.pkn !== undefined ? sane(new ExpantaNum(d.pkn)) : new ExpantaNum(0);
    if (d.pu) for (var pui = 0; pui < pumpUpg.length; pui++) pumpUpg[pui] = !!d.pu[pui];
    harvPts = d.hv !== undefined ? sane(new ExpantaNum(d.hv)) : new ExpantaNum(0);
    lastHarv = d.lhv || 0;
    harvUpg = d.hu || 0;
    if (elemBought[0] && !hBonus) {
      for (var vi = 0; vi < lv.length; vi++) lv[vi] += 20;
      hBonus = true;
    }
    save();
  } catch (e) {
    alert("Invalid save");
  }
};

var curTab = "main";
function showTab(t) {
  curTab = t;
  document.getElementById("main").style.display = t === "main" ? "" : "none";
  document.getElementById("alist").style.display = t === "achs" ? "" : "none";
  document.getElementById("qlist").style.display = t === "quarks" ? "" : "none";
  document.getElementById("elist").style.display = t === "elements" ? "" : "none";
  document.getElementById("clist").style.display = t === "challenges" ? "" : "none";
  document.getElementById("ilist").style.display = t === "infinite" ? "" : "none";
  document.getElementById("rlist").style.display = t === "rgb" ? "" : "none";
  document.getElementById("ttlist").style.display = t === "tt" ? "" : "none";
  document.getElementById("spalist").style.display = t === "space" ? "" : "none";
  document.getElementById("mlist").style.display = t === "miles" ? "" : "none";
  document.getElementById("clicklist").style.display = t === "clicker" ? "" : "none";
  document.getElementById("tylist").style.display = t === "tycoon" ? "" : "none";
  document.getElementById("matlist").style.display = t === "material" ? "" : "none";
  document.getElementById("uplist").style.display = t === "upgradables" ? "" : "none";
  document.getElementById("leglist").style.display = t === "legacy" ? "" : "none";
  document.getElementById("hallist").style.display = t === "halloween" ? "" : "none";
  document.getElementById("pumlist").style.display = t === "pumpkin" ? "" : "none";
  document.getElementById("harvlist").style.display = t === "harvesting" ? "" : "none";
  if (t === "elements") document.body.style.background = "darkslategray";
  else if (t === "quarks") document.body.style.background = "darkslateblue";
  else if (t === "challenges") document.body.style.background = "darkorchid";
  else if (t === "infinite") document.body.style.background = "darkgreen";
  else if (t === "rgb") document.body.style.background = "darkmagenta";
  else if (t === "tt") document.body.style.background = "darkcyan";
  else if (t === "space") document.body.style.background = "midnightblue";
  else if (t === "clicker") document.body.style.background = "darkslategray";
  else if (t === "tycoon") document.body.style.background = "darkgoldenrod";
  else if (t === "material") document.body.style.background = "darkslategray";
  else if (t === "upgradables") document.body.style.background = "teal";
  else if (t === "legacy") document.body.style.background = "darkred";
  else if (t === "halloween") document.body.style.background = "darkorange";
  else if (t === "pumpkin") document.body.style.background = "chocolate";
  else if (t === "harvesting") document.body.style.background = "darkolivegreen";
  else document.body.style.background = "darkblue";
}

document.getElementById("atab").onclick = function () {
  showTab(curTab === "achs" ? "main" : "achs");
};

document.getElementById("qtab").onclick = function () {
  showTab(curTab === "quarks" ? "main" : "quarks");
};

document.getElementById("etab").onclick = function () {
  if (atomResets > 0) showTab(curTab === "elements" ? "main" : "elements");
};

document.getElementById("ctab").onclick = function () {
  showTab(curTab === "challenges" ? "main" : "challenges");
};

document.getElementById("itab").onclick = function () {
  showTab(curTab === "infinite" ? "main" : "infinite");
};

document.getElementById("rtab").onclick = function () {
  showTab(curTab === "rgb" ? "main" : "rgb");
};

document.getElementById("ttab").onclick = function () {
  showTab(curTab === "tt" ? "main" : "tt");
};

document.getElementById("spab").onclick = function () {
  showTab(curTab === "space" ? "main" : "space");
};

document.getElementById("mtab").onclick = function () {
  showTab(curTab === "miles" ? "main" : "miles");
};

document.getElementById("clicktab").onclick = function () {
  showTab(curTab === "clicker" ? "main" : "clicker");
};

document.getElementById("tytab").onclick = function () {
  if (elemBought[47]) showTab(curTab === "tycoon" ? "main" : "tycoon");
};

document.getElementById("mattab").onclick = function () {
  if (elemBought[53]) showTab(curTab === "material" ? "main" : "material");
};
document.getElementById("uptab").onclick = function () {
  if (elemBought[55]) showTab(curTab === "upgradables" ? "main" : "upgradables");
};
document.getElementById("letab").onclick = function () {
  if (matUpgs[2]) showTab(curTab === "legacy" ? "main" : "legacy");
};
document.getElementById("httab").onclick = function () {
  showTab(curTab === "halloween" ? "main" : "halloween");
};
document.getElementById("pumtab").onclick = function () {
  showTab(curTab === "pumpkin" ? "halloween" : "pumpkin");
};
document.getElementById("harvtab").onclick = function () {
  showTab(curTab === "harvesting" ? "halloween" : "harvesting");
};
document.getElementById("pumpupg9btn").onclick = buyPumpUpg9;
document.getElementById("pumpupg10btn").onclick = buyPumpUpg10;
document.getElementById("pumpupg11btn").onclick = buyPumpUpg11;
document.getElementById("harvbtn").onclick = doHarvest;
document.getElementById("harvupgbtn").onclick = buyHarvUpg;
document.getElementById("harvupg2btn").onclick = buyHarvUpg2;
document.getElementById("harvupg3btn").onclick = buyHarvUpg3;
document.getElementById("pumpreset").onclick = doPumpkinReset;
document.getElementById("pumpupgbtn").onclick = buyPumpUpg;
document.getElementById("pumpupg2btn").onclick = buyPumpUpg2;
document.getElementById("pumpupg3btn").onclick = buyPumpUpg3;
document.getElementById("pumpupg4btn").onclick = buyPumpUpg4;
document.getElementById("pumpupg5btn").onclick = buyPumpUpg5;
document.getElementById("pumpupg6btn").onclick = buyPumpUpg6;
document.getElementById("pumpupg7btn").onclick = buyPumpUpg7;
document.getElementById("pumpupg8btn").onclick = buyPumpUpg8;
document.getElementById("candyupg6btn").onclick = buyCandyUpg6;
document.getElementById("levu1").onclick = function () {
  if (legacyUpgs[0]) return;
  if (legacyEnergy.lt(10)) return;
  legacyEnergy = legacyEnergy.sub(10);
  legacyUpgs[0] = true;
  save();
};
document.getElementById("levu2").onclick = function () {
  if (legacyUpgs[1]) return;
  if (legacyEnergy.lt(1000)) return;
  legacyEnergy = legacyEnergy.sub(1000);
  legacyUpgs[1] = true;
  save();
};
document.getElementById("levu4").onclick = function () {
  if (legacyUpgs[3]) return;
  if (legacyEnergy.lt(5e8)) return;
  legacyEnergy = legacyEnergy.sub(5e8);
  legacyUpgs[3] = true;
  save();
};
document.getElementById("levu5").onclick = function () {
  if (legacyUpgs[4]) return;
  if (legacyEnergy.lt(1e13)) return;
  legacyEnergy = legacyEnergy.sub(1e13);
  legacyUpgs[4] = true;
  save();
};
document.getElementById("levu6").onclick = function () {
  if (legacyUpgs[5]) return;
  if (legacyEnergy.lt(5e20)) return;
  legacyEnergy = legacyEnergy.sub(5e20);
  legacyUpgs[5] = true;
  save();
};
document.getElementById("levu7").onclick = function () {
  if (legacyUpgs[6]) return;
  if (!legacyUpgs[5]) return;
  if (legacyEnergy.lt(1e20)) return;
  legacyEnergy = legacyEnergy.sub(new ExpantaNum(1e20));
  legacyUpgs[6] = true;
};
document.getElementById("levu8").onclick = function () {
  if (legacyUpgs[7]) return;
  if (!snUpg[6]) return;
  if (legacyEnergy.lt(1e294)) return;
  legacyEnergy = legacyEnergy.sub(new ExpantaNum("1e294"));
  legacyUpgs[7] = true;
};
document.getElementById("candybtn").onclick = collectCandy;
document.getElementById("candyupgbtn").onclick = buyCandyUpg;
document.getElementById("candyupg2btn").onclick = buyCandyUpg2;
document.getElementById("candyupg3btn").onclick = buyCandyUpg3;
document.getElementById("candyupg4btn").onclick = buyCandyUpg4;

document.getElementById("clickbtn").onclick = function () {
  clicks = clicks.add(clickAmount());
};
function clickAmount() {
  var c = new ExpantaNum(1).add(perkLvl[1]).mul(elemBought[44] ? 100 : 1).mul(elemBought[45] ? 5000 : 1).mul(elemBought[46] ? 1000000 : 1);
  if (elemBought[48]) c = c.pow(1.5);
  if (elemBought[49]) c = c.pow(1.5);
  if (snUpg[3]) c = c.pow(2);
  if (snUpg[6]) c = c.pow(1.15);
  if (elemBought[50]) c = c.pow(2);
  if (elemBought[51]) c = c.pow(2);
  if (elemBought[58] && inf2Lvl > 0) c = c.pow(new ExpantaNum(2).pow(inf2Lvl));
  return c;
}
document.getElementById("pk1").onclick = function () {
  buyPerk(1);
};
document.getElementById("pk2").onclick = function () {
  buyPerk(2);
};
document.getElementById("pk3").onclick = function () {
  buyPerk(3);
};
document.getElementById("cu1").onclick = function () {
  buyClickerUpg(1);
};
document.getElementById("cu2").onclick = function () {
  buyClickerUpg(2);
};
document.getElementById("cu3").onclick = function () {
  buyClickerUpg(3);
};
document.getElementById("cu4").onclick = function () {
  buyClickerUpg(4);
};
document.getElementById("ty1").onclick = function () {
  buyTycoonUpg(1);
};
document.getElementById("ty2").onclick = function () {
  buyTycoonUpg(2);
};
document.getElementById("ty3").onclick = function () {
  buyTycoonUpg(3);
};
document.getElementById("ty4").onclick = function () {
  buyTycoonUpg(4);
};
document.getElementById("matswitch").onclick = function () {
  switchMatSide();
};
document.getElementById("matu1").onclick = function () {
  buyMatUpg(1);
};
document.getElementById("matu2").onclick = function () {
  buyMatUpg(2);
};
document.getElementById("matu3").onclick = function () {
  buyMatUpg(3);
};

document.getElementById("atomreset").onclick = doAtomReset;

var QUARK_COST = [1, 1, 2, 3, 4, 6, 7, 10, 13, 15, 20, 50, "2e16", "5e20", "5e23", "1e27", "5e37", "1e65", "1e126", "1e196", "1e296", "1e229", "1e149124"];
var QUARK_DESCS = [
  "x10 Void",
  "x1.2 Base achievement boost",
  "x50 Void",
  "x1.2 Base achievement boost",
  "x100 Void + Bulk buy 10",
  "Bulk buy 20 + x1.3 Base achievement boost",
  "Bulk buy 50 + x1.5 Base achievement boost",
  "Bulk buy 250",
  "x1.2 Base achievement boost + Void gain ^1.1",
  "Remove the Void cap + Quark Reset resets NOTHING",
  "x1.5 Base achievement boost + Void gain ^1.05",
  "x3 Base achievement boost + Void gain ^1.3 + x2 Quarks",
  "x5 Base achievement boost + Void gain ^1.1 + x10 Quarks",
  "x100 Base achievement boost + x50 Quarks",
  "Void gain ^1.2 + Quarks ^1.01 + Base achievement formula ^1.2",
  "Void gain ^1.3 + Quarks ^1.1 + Base achievement formula ^2",
  "Void gain ^1.4 + Quarks ^1.2 + Base achievement formula ^5",
  "Void gain ^1.5 + Quarks ^1.5 + Achievement boost x10 + formula ^10",
  "Void gain ^1.7 + Quarks ^1.3 + Achievement boost x10 + formula ^10",
  "Void gain ^1.7 + Quarks ^1.3 + Achievement boost x10 + formula ^10",
  "x1.79T Quarks",
  "x1e68 Quarks",
  "x100 Atoms, Void ^1.5, Quarks ^1.5",
  "Unlocks Legacy Upgrade II, x50 Legacy Energy"
];
