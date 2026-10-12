var clickerCostCache = [new ExpantaNum(10), new ExpantaNum(16)];
function clickerUpgCost(k) {
  if (k < 2) return clickerCostCache[k];
  for (var cup = clickerCostCache.length; cup <= k; cup++) {
    clickerCostCache.push(clickerCostCache[cup - 1].add(clickerCostCache[cup - 2]).add(3));
  }
  return clickerCostCache[k];
}
function levelUpClicker() {
  var c = clickerUpgCost(clickerLvl);
  if (clicks.lt(c)) return;
  clicks = clicks.sub(c);
  clickerLvl++;
  perks++;
  save();
}
function buyPerk(i) {
  if (perks <= 0) return;
  if (perkLvl[i - 1] >= PERK_MAX[i - 1]) return;
  perks--;
  perkLvl[i - 1]++;
  save();
}
function clickUpgCost(i) {
  var bc = i === 2 ? 100 : 10;
  var mult = 5;
  if (i === 3) { bc = 100; mult = 10; }
  if (i === 4) { bc = 100; mult = 2; }
  return new ExpantaNum(bc).mul(new ExpantaNum(mult).pow(clickUpgLvl[i - 1]));
}
function buyClickerUpg(i) {
  if (i === 3 && !snUpg[6]) return;
  if (i === 4 && !legacyUpgs[7]) return;
  var c = clickUpgCost(i);
  if (clicks.lt(c)) return;
  clicks = clicks.sub(c);
  clickUpgLvl[i - 1]++;
  save();
}
function buyTycoonUpg(i) {
  if (tyUpgs[i - 1]) return;
  if (i === 2 && !tyUpgs[0]) return;
  if (i === 3 && !tyUpgs[1]) return;
  if (i === 4 && !legacyUpgs[7]) return;
  var tc = i === 3 ? new ExpantaNum(500) : (i === 4 ? new ExpantaNum("1e30000") : new ExpantaNum(10));
  if (money.lt(tc)) return;
  money = money.sub(tc);
  tyUpgs[i - 1] = true;
  save();
}
function antiDimCost(i) {
  return new ExpantaNum(ANTI_DIM_COSTS[i - 1]).mul(new ExpantaNum(10).pow(antimatterDims[i - 1]));
}
function matDimCost(i) {
  if (i === 9) return new ExpantaNum("1e200").mul(new ExpantaNum(1.05).pow(dim9count));
  return new ExpantaNum(MAT_DIM_COSTS[i - 1]).mul(new ExpantaNum(10).pow(matterDims[i - 1]));
}
function buyAntimatterDim(i) {
  var c = antiDimCost(i);
  if (antimatter.lt(c)) return;
  antimatter = antimatter.sub(c);
  antimatterDims[i - 1] = antimatterDims[i - 1].add(1);
  save();
}
function buyMatterDim(i) {
  if (i === 9) {
    if (dim9count >= 4000) return;
    var c9 = matDimCost(9);
    if (matter.lt(c9)) return;
    matter = matter.sub(c9);
    dim9count++;
    save();
    return;
  }
  var c = matDimCost(i);
  if (matter.lt(c)) return;
  matter = matter.sub(c);
  matterDims[i - 1] = matterDims[i - 1].add(1);
  save();
}
function switchMatSide() {
  matSide = matSide === "matter" ? "antimatter" : "matter";
}
function matUpgCost(i) {
  if (i === 1) return new ExpantaNum("1e33");
  if (i === 2) return new ExpantaNum("1e46");
  if (i === 3) return new ExpantaNum("1e5093");
  return new ExpantaNum("1e99").mul(new ExpantaNum(10).pow(new ExpantaNum(33).mul(i - 3)));
}
function softcapGain(g, cap) {
  if (g.lte(cap)) return g;
  return cap.mul(g.div(cap).pow(0.5));
}
function buyMatUpg(i) {
  if (matUpgs[i - 1]) return;
  var uc = matUpgCost(i);
  var cur = i === 2 ? matter : antimatter;
  if (cur.lt(uc)) return;
  if (i === 2) matter = matter.sub(uc);
  else antimatter = antimatter.sub(uc);
  matUpgs[i - 1] = true;
  save();
}

function buyElement(i) {
  if (elemBought[i - 1]) return;
  if (i === 58 && (!elemBought[54] || !elemBought[55] || !elemBought[56])) return;
  if (i !== 1 && i !== 2 && i !== 3 && i !== 4 && i !== 5 && i !== 6 && i !== 7 && i !== 8 && i !== 9 && i !== 10 && i !== 11 && i !== 12 && i !== 13 && i !== 14 && i !== 15 && i !== 16 && i !== 17 && i !== 18 && i !== 19 && i !== 20 && i !== 21 && i !== 22 && i !== 23 && i !== 24 && i !== 25 && i !== 26 && i !== 27 && i !== 28 && i !== 29 && i !== 30 && i !== 31 && i !== 32 && i !== 33 && i !== 34 && i !== 35 && i !== 36 && i !== 37 && i !== 38 && i !== 39 && i !== 40 && i !== 41 && i !== 42 && i !== 43 && i !== 44 && i !== 45 && i !== 46 && i !== 47 && i !== 48 && i !== 49 && i !== 50 && i !== 51 && i !== 52 && i !== 53 && i !== 54 && i !== 55 && i !== 56 && i !== 57 && i !== 58 && i !== 59) return;
  if (i === 59) {
    if (legacyEnergy.lt(new ExpantaNum("1e603"))) return;
    legacyEnergy = legacyEnergy.sub(new ExpantaNum("1e603"));
  } else if (i === 57) {
    var e57c = new ExpantaNum("1e72");
    if (antimatter.lt(e57c)) return;
    antimatter = antimatter.sub(e57c);
  } else if (i === 55 || i === 56) {
    var ecx = i === 55 ? new ExpantaNum("1e16") : new ExpantaNum("1e20");
    if (antimatter.lt(ecx) || matter.lt(ecx)) return;
    antimatter = antimatter.sub(ecx);
    matter = matter.sub(ecx);
  } else {
    if (atoms.lt(elemCostNum(i))) return;
    atoms = atoms.sub(elemCostNum(i));
  }
  elemBought[i - 1] = true;
  if (i === 1 && !hBonus) { for (var vi = 0; vi < lv.length; vi++) lv[vi] += 20; hBonus = true; }
  if (i === 48) money = money.add(10);
  if (i === 54) {
    matter = new ExpantaNum(0);
    antimatter = new ExpantaNum(10);
    for (var md = 0; md < matterDims.length; md++) matterDims[md] = new ExpantaNum(0);
    for (var ad = 0; ad < antimatterDims.length; ad++) antimatterDims[ad] = new ExpantaNum(0);
    dim9count = 0;
  }
  if (i === 58) legacyUpgs[2] = true;
}
