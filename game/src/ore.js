function drawGalvanite(ctx, cx, cy, scale = 1) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  const W = 200, H = 140;
  ctx.translate(-W / 2, -H);

  function poly(pts, fill) {
    ctx.beginPath();
    ctx.moveTo(pts[0], pts[1]);
    for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i+1]);
    ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
  }

  function grad(id, x0,y0,x1,y1, stops) {
    const g = ctx.createLinearGradient(x0,y0,x1,y1);
    stops.forEach(([o,c]) => g.addColorStop(o, c));
    return g;
  }

  const fA = grad('fA', 0,26, 0,188, [
    [0,'#e8eaec'],[0.12,'#f6f7f8'],[0.38,'#b8bcC0'],
    [0.65,'#707478'],[0.85,'#9ea2a8'],[1,'#484c52']
  ]);
  const fB = grad('fB', 0,82, 0,182, [
    [0,'#d4d6d8'],[0.14,'#eaecee'],[0.40,'#aaaeB2'],
    [0.68,'#686c70'],[0.88,'#8a8e94'],[1,'#3e4246']
  ]);
  const fC = grad('fC', 0,62, 0,174, [
    [0,'#c4c6c8'],[0.18,'#d8dadc'],[0.45,'#9ca0a4'],[1,'#363a3e']
  ]);
  const lA = grad('lA', 0,0, 0,188, [
    [0,'#5e6266'],[0.4,'#464a4e'],[1,'#202428']
  ]);
  const lB = grad('lB', 0,0, 0,174, [[0,'#4e5256'],[1,'#1a1c20']]);
  const rA = grad('rA', 0,0, 0,188, [
    [0,'#2e3236'],[0.5,'#26282c'],[1,'#0c0e10']
  ]);
  const rB = grad('rB', 0,0, 0,180, [[0,'#262829'],[1,'#080a0c']]);
  const tA = grad('tA', 0,26, 200,60, [
    [0,'#ffffff'],[0.45,'#d4d6d8'],[1,'#9ca0a4']
  ]);
  const tB = grad('tB', 0,82, 160,110, [[0,'#eeeff0'],[1,'#868a8e']]);
  const tC = grad('tC', 0,62, 150,90,  [[0,'#dcdee0'],[1,'#74787c']]);

  // 岩盤
  poly([10,208, 0,188, 8,160, 32,146, 72,138, 112,140, 150,136, 180,144, 198,162, 200,190, 188,208], grad('gb',0,138,200,208,[[0,'#4a4e54'],[1,'#161819']]));
  poly([8,160, 32,146, 72,138, 112,140, 150,136, 180,144, 198,162, 170,156, 138,148, 100,152, 64,150, 32,156], '#32363c');

  // 結晶E（左端・大傾き）
  poly([34,174, 20,170, -2,76, 14,68, 36,166, 50,170], lB);
  poly([20,170, -2,76, 14,68, 42,62, 54,66, 36,166, 50,170], fC);
  poly([-2,76, 14,68, 42,62, 26,70], tC);
  poly([-2,76, 14,68, 18,74, 2,82], '#f0f1f2');
  ctx.beginPath(); ctx.moveTo(14,68); ctx.lineTo(36,166);
  ctx.strokeStyle='#fff'; ctx.lineWidth=1.3; ctx.globalAlpha=0.6; ctx.stroke(); ctx.globalAlpha=1;

  // 結晶F（右端・大傾き）
  poly([152,172, 138,166, 162,70, 178,64, 166,160, 180,166], lB);
  poly([138,166, 162,70, 178,64, 200,72, 180,166, 166,160], fC);
  poly([162,70, 178,64, 200,72, 184,80], tC);
  poly([178,64, 200,72, 196,78, 174,70], '#f0f1f2');
  ctx.beginPath(); ctx.moveTo(178,64); ctx.lineTo(166,160);
  ctx.strokeStyle='#fff'; ctx.lineWidth=1.3; ctx.globalAlpha=0.6; ctx.stroke(); ctx.globalAlpha=1;

  // 結晶C（左寄り・やや左傾き）
  poly([62,182, 48,178, 40,90, 54,82, 68,174, 82,178], lA);
  poly([48,178, 40,90, 54,82, 76,86, 68,174, 62,182], fB);
  poly([40,90, 54,82, 76,86, 62,94], tB);
  poly([40,90, 54,82, 58,90, 44,98], '#f4f5f6');
  ctx.beginPath(); ctx.moveTo(54,82); ctx.lineTo(68,174);
  ctx.strokeStyle='#fff'; ctx.lineWidth=1.4; ctx.globalAlpha=0.65; ctx.stroke(); ctx.globalAlpha=1;

  // 結晶D（右寄り・やや右傾き）
  poly([132,180, 118,176, 132,90, 146,84, 144,172, 158,176], rB);
  poly([118,176, 132,90, 146,84, 164,90, 144,172, 132,180], fB);
  poly([132,90, 146,84, 164,90, 150,96], tB);
  poly([146,84, 164,90, 162,98, 144,92], '#f4f5f6');
  ctx.beginPath(); ctx.moveTo(146,84); ctx.lineTo(144,172);
  ctx.strokeStyle='#fff'; ctx.lineWidth=1.4; ctx.globalAlpha=0.65; ctx.stroke(); ctx.globalAlpha=1;

  // 結晶B（中央左・わずか傾き）
  poly([86,186, 72,182, 70,52, 86,44, 98,180, 112,184], lA);
  poly([72,182, 70,52, 86,44, 108,48, 98,180, 86,186], fA);
  poly([108,48, 98,180, 112,184, 122,52], rA);
  poly([70,52, 86,44, 108,48, 92,56], tA);
  poly([70,52, 86,44, 90,52, 74,60], '#ffffff');
  ctx.beginPath(); ctx.moveTo(86,44); ctx.lineTo(98,180);
  ctx.strokeStyle='#fff'; ctx.lineWidth=1.7; ctx.globalAlpha=0.68; ctx.stroke(); ctx.globalAlpha=1;

  // 結晶A（中央・最大・垂直）
  poly([100,188, 86,184, 86,34, 102,26, 116,28, 116,182], lA);
  poly([86,184, 86,34, 102,26, 120,30, 116,182, 100,188], fA);
  poly([120,30, 116,182, 130,186, 134,36], rA);
  poly([86,34, 102,26, 120,30, 104,38], tA);
  poly([86,34, 102,26, 106,34, 90,42], '#ffffff');
  ctx.beginPath(); ctx.moveTo(102,26); ctx.lineTo(116,182);
  ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.globalAlpha=0.75; ctx.stroke(); ctx.globalAlpha=1;
  ctx.beginPath(); ctx.moveTo(120,30); ctx.lineTo(130,186);
  ctx.strokeStyle='#585c60'; ctx.lineWidth=0.8; ctx.globalAlpha=1; ctx.stroke();

  // 小結晶G
  poly([68,188, 58,185, 52,134, 62,128, 72,181, 80,184], lB);
  poly([58,185, 52,134, 62,128, 78,132, 72,181, 68,188], fB);
  poly([52,134, 62,128, 78,132, 66,138], tC);
  poly([52,134, 62,128, 66,134, 56,140], '#eeeff0');

  // 小結晶H
  poly([124,186, 112,182, 118,130, 130,124, 134,179, 146,183], rB);
  poly([112,182, 118,130, 130,124, 148,130, 134,179, 124,186], fB);
  poly([118,130, 130,124, 148,130, 136,136], tC);
  poly([130,124, 148,130, 146,136, 128,130], '#eeeff0');

  // 地面
  const gnd = grad('gn',0,208,0,248,[[0,'#3e4248'],[1,'#1a1c20']]);
  ctx.beginPath(); ctx.roundRect(0,208,200,40,4); ctx.fillStyle=gnd; ctx.fill();
  ctx.beginPath(); ctx.roundRect(0,208,200,9,3); ctx.fillStyle='#363a3e'; ctx.fill();

  ctx.restore();
}

class OreManager {
  constructor(tilemapData, tileSize = 32) {
    this.tileSize = tileSize;
    this.ores = [];
    this._place(tilemapData);
  }

  _place(tilemapData) {
    let seed = 42;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return (seed >>> 0) / 0xffffffff;
    };
    const h = tilemapData.length, w = tilemapData[0].length;
    for (let i = 0; i < 20; i++) {
      let cx, cy, tries = 0;
      do { cx = Math.floor(rand()*w); cy = Math.floor(rand()*h); tries++; }
      while (tilemapData[cy][cx] !== 1 && tries < 200);
      if (tries >= 200) continue;
      // クラスター
      const cells = [{x:cx,y:cy}];
      for (let j = 1; j < 4; j++) {
        const base = cells[Math.floor(rand()*cells.length)];
        const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
        const [dx,dy] = dirs[Math.floor(rand()*4)];
        const nx=base.x+dx, ny=base.y+dy;
        if (nx>=0&&nx<w&&ny>=0&&ny<h&&tilemapData[ny][nx]===1)
          cells.push({x:nx,y:ny});
      }
      for (const c of cells) this.ores.push({x:c.x,y:c.y});
    }
  }

  draw(ctx, cameraX, cameraY) {
    const ts = this.tileSize;
    for (const ore of this.ores) {
      const sx = ore.x * ts - cameraX + ts / 2;
      const sy = ore.y * ts - cameraY + ts;
      drawGalvanite(ctx, sx, sy, 0.18);
    }
  }
}
