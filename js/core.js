function sane(n) {
  if (n && n.isNaN && n.isNaN()) return new ExpantaNum(0);
  return n;
}

function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify({
    v: sane(voidAmt).toString(), k: sane(quarks).toString(), a: sane(atoms).toString(), ar: atomResets,
    l: lv[0], m: lv[1], n: lv[2], o: lv[3], p: lv[4], q: lv[5], r: lv[6],
    s: lv[7], t: lv[8], u: lv[9], w: lv[10], x: lv[11], y: lv[12], z: lv[13], aa: lv[14], ab: lv[15], ac: lv[16], ad: lv[17], ae: lv[18],
c: quarkUpg, b7: keptBase7, b8: keptBase8, rc: resetCount, ch: achs, eb: elemBought, mr: maxReset, ca: chalActive, ci: chalIdx, cd: chalDone, cr: chalReward, hb: hBonus, il: infLvl, i2: inf2Lvl, rd: sane(red).toString(), gr: sane(green).toString(), bl: sane(blue).toString(), tp: sane(ttparts).toString(), tm: timeBought, cdst: sane(cosmicDust).toString(), sb: spaceB, sl: spaceLvl, cm: sane(comets).toString(), cu: cometUpg, sn: sane(supernova).toString(), snT: sane(snTotal).toString(), snm: snMilestones, snu: snUpg, cl: sane(clicks).toString(), cll: clickerLvl, clk: perks, clv: perkLvl, clu: clickUpgLvl, mo: sane(money).toString(), ty: tyUpgs, mu: matUpgs, ma: sane(matter).toString(), am: sane(antimatter).toString(), mds: matterDims.map(function (x) { return x.toString(); }), ads: antimatterDims.map(function (x) { return x.toString(); }), msi: matSide, d9: dim9count, le: sane(legacyEnergy).toString(), lg: legacyUpgs, u20: upg20Bought, eg: engineCount, scu: cdUpg, cny: sane(candy).toString(), lc: lastCandy, cul: candyUpgLvl, c2: candyUpgLvl2, c3: candyUpgLvl3, c4: candyUpgLvl4, c6: candyUpgLvl6, pkn: sane(pumpkin).toString(), pu: pumpUpg, hv: sane(harvPts).toString(), lhv: lastHarv, hu: harvUpg
  }));
}

var SAVE_INTERVAL = 3000;
var lastSaveTime = 0;
function autoSave() {
  var now = Date.now();
  if (now - lastSaveTime >= SAVE_INTERVAL) {
    lastSaveTime = now;
    save();
  }
}
window.addEventListener("beforeunload", function () {
  if (!hardResetting) save();
});

function load() {
  try {
    var d = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!d) return;
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
    hBonus = !!d.hb;
    if (elemBought[0] && !hBonus) {
      for (var vi2 = 0; vi2 < lv.length; vi2++) lv[vi2] += 20;
      hBonus = true;
    }
  } catch (e) {}
}

function upgMax(i) {
  var extra = 0;
  if (elemBought[0]) extra += 20;
  if (!maxReset && achs[18]) extra += 10;
  if (!maxReset && resetCount > 0) extra += 10;
  return UPG_MAX[i - 1] + extra;
}

function checkAchs() {
  if (!achs[0] && voidAmt.gte(1)) achs[0] = true;
  if (!achs[1] && lv[2] > 0) achs[1] = true;
  if (!achs[2] && voidAmt.gte(1000)) achs[2] = true;
  if (!achs[3] && voidAmt.gte(1e6)) achs[3] = true;
  if (!achs[4] && lv[4] > 0) achs[4] = true;
  if (!achs[5] && voidAmt.gte(1e8)) achs[5] = true;
  if (!achs[6] && lv[4] >= 20) achs[6] = true;
  if (!achs[7] && lv[2] >= 42) achs[7] = true;
  if (!achs[8] && lv[5] >= 2) achs[8] = true;
  if (!achs[9] && voidAmt.gte(1e10)) achs[9] = true;
  if (!achs[10] && voidAmt.gte(1e15)) achs[10] = true;
  if (!achs[11] && voidAmt.gte(1e18)) achs[11] = true;
  if (!achs[12] && lv[7] > 0) achs[12] = true;
  if (!achs[13] && lv[8] > 0) achs[13] = true;
  if (!achs[14] && lv[9] > 0) achs[14] = true;
  if (!achs[15] && voidAmt.gte(5e27)) achs[15] = true;
  if (!achs[16] && voidAmt.gte(1e29)) achs[16] = true;
  if (!achs[17] && lv[7] >= 50) achs[17] = true;
  if (!achs[18] && voidAmt.gte(1e33)) achs[18] = true;
  if (!achs[19] && lv[10] > 0) achs[19] = true;
  if (!achs[20] && lv[11] >= 30) achs[20] = true;
  if (!achs[23] && quarkUpg[6]) achs[23] = true;
  if (!achs[24] && quarkUpg[9]) achs[24] = true;
}

function achMult() {
  var count = 0;
  for (var i = 0; i < achs.length; i++) if (achs[i]) count++;
  var base = ACH_BONUS * (achs[17] ? 1.5 : 1);
  if (quarkUpg[1]) base *= 1.2;
  if (quarkUpg[3]) base *= 1.2;
  if (quarkUpg[5]) base *= 1.3;
  if (quarkUpg[6]) base *= 1.5;
  if (quarkUpg[8]) base *= 1.2;
  if (quarkUpg[10]) base *= 1.5;
  if (quarkUpg[11]) base *= 3;
  if (quarkUpg[12]) base *= 5;
  if (quarkUpg[13]) base *= 100;
  if (quarkUpg[17]) base *= 10;
  if (quarkUpg[18]) base *= 10;
  if (quarkUpg[19]) base *= 10;
  var r = base + (achs[9] ? 0.1 : 0) + keptBase7 + keptBase8 + (resetCount > 0 ? 3 : 0);
  var exp = count;
  if (quarkUpg[14]) exp *= 1.2;
  if (quarkUpg[15]) exp *= 2;
  if (quarkUpg[16]) exp *= 5;
  if (quarkUpg[17]) exp *= 10;
  if (quarkUpg[18]) exp *= 10;
  if (quarkUpg[19]) exp *= 10;
  return new ExpantaNum(1 + r).pow(exp);
}

var SHORT_ABBR = ["", "K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"];
var ONES_ABBR = ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"];
var TENS_ABBR = ["", "Dc", "Vg", "Tg", "Qag", "Qig", "Sxg", "Spg", "Ocg", "Nog"];
var HUNDREDS_ABBR = ["", "Ce", "Dn", "Tr", "Qadr", "Quinr", "Sedr", "Septr", "Octdr", "Nonr"];

function abbr(g) {
  if (g <= 10) return SHORT_ABBR[g];
  var n = g - 1;
  return ONES_ABBR[n % 10] + TENS_ABBR[Math.floor(n / 10) % 10] + HUNDREDS_ABBR[Math.floor(n / 100)];
}

var FMT_LIMIT = new ExpantaNum("1e3003");
var FMT_TEN = new ExpantaNum(10);

function fmt(x) {
  if (x.lt(FMT_LIMIT)) {
    var lg = x.log10().toNumber();
    var exp = Math.floor(lg);
    if (exp < 6) {
      var n = x.toNumber();
      return n === Math.floor(n) ? String(Math.floor(n)) : n.toFixed(2);
    }
    var g = Math.floor(exp / 3);
    var m = Math.pow(10, lg - 3 * g);
    return m.toFixed(2) + abbr(g);
  }
  var e = x.log10().floor();
  var m2 = x.div(FMT_TEN.pow(e)).toNumber();
  return m2.toFixed(2) + "e" + fmt(e);
}

function caesar(s, k) {
  return s.replace(/[a-zA-Z]/g, function (c) {
    var base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + k % 26 + 26) % 26) + base);
  });
}

function b64ucs4(s) {
  var out = "";
  for (var i = 0; i < s.length;) {
    var cp = s.codePointAt(i);
    i += cp > 0xFFFF ? 2 : 1;
    out += String.fromCharCode((cp >>> 24) & 255, (cp >>> 16) & 255, (cp >>> 8) & 255, cp & 255);
  }
  return btoa(out);
}

function unb64ucs4(b) {
  var s = atob(b), out = "";
  for (var i = 0; i < s.length; i += 4) {
    var cp = ((s.charCodeAt(i) << 24) | (s.charCodeAt(i + 1) << 16) | (s.charCodeAt(i + 2) << 8) | s.charCodeAt(i + 3)) >>> 0;
    out += String.fromCodePoint(cp);
  }
  return out;
}

function charToNum(c) {
  if (c >= "a" && c <= "z") return c.charCodeAt(0) - 96;
  if (c >= "A" && c <= "Z") return c.charCodeAt(0) - 64 + 26;
  if (c >= "0" && c <= "9") return c.charCodeAt(0) - 48 + 52;
  if (c === "+") return 63;
  if (c === "/") return 64;
  return 65;
}

function numToChar(n) {
  if (n <= 26) return String.fromCharCode(n + 96);
  if (n <= 52) return String.fromCharCode(n - 26 + 64);
  if (n <= 62) return String.fromCharCode(n - 52 + 48);
  if (n === 63) return "+";
  if (n === 64) return "/";
  return "=";
}

function nToL(n) {
  n--;
  return String.fromCharCode(97 + Math.floor(n / 26)) + String.fromCharCode(97 + n % 26);
}

function lToN(p) {
  return (p.charCodeAt(0) - 97) * 26 + (p.charCodeAt(1) - 97) + 1;
}

function vigenere(s, dir) {
  var j = 0;
  return s.replace(/[a-z]/g, function (c) {
    var sh = dir * (VIG_KEY.charCodeAt(j % VIG_KEY.length) - 97);
    j++;
    return String.fromCharCode(((c.charCodeAt(0) - 97 + sh + 26) % 26) + 97);
  });
}

function encodeSave(data) {
  return btoa(JSON.stringify(data));
}

function decodeSave(enc) {
  return JSON.parse(atob(enc.replace(/\s+/g, "")));
}

load();
