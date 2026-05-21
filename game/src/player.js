// ===== カラー定数 =====
const C = {
  body:   '#f0f0f0',
  bodyDk: '#d0d0d0',
  eye:    '#1a1a2e',
  eyeCol: '#7ecfff',
  foot:   '#cccccc',
  footDk: '#aaaaaa',
  hand:   '#e8e8e8',
  handDk: '#c8c8c8',
  shadow: 'rgba(0,0,0,0.15)',
};

// ===== ユーティリティ =====
function rr(ctx, x, y, w, h, r, fill) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill; ctx.fill();
}

// ===== メイン描画関数 =====
// ox, oy: キャラ左上のcanvas座標
// direction: 'down' | 'up' | 'left' | 'right'
// af: アニメフレーム 0 or 1
function drawPlayer(ctx, ox, oy, direction, af) {
  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(0.5, 0.5);

  if (direction === 'down')  drawDown(ctx, 0, 0, af);
  if (direction === 'up')    drawUp(ctx, 0, 0, af);
  if (direction === 'left')  drawLeft(ctx, 0, 0, af);
  if (direction === 'right') drawRight(ctx, 0, 0, af);

  ctx.restore();
}

function drawDown(ctx, ox, oy, af) {
  const ly = af === 0 ? 0 : 3;
  const ry = af === 0 ? 3 : 0;

  // 影
  ctx.beginPath();
  ctx.ellipse(ox+32, oy+64, 16, 4, 0, 0, Math.PI*2);
  ctx.fillStyle = C.shadow; ctx.fill();

  // 足
  rr(ctx, ox+16, oy+48+ly, 12, 14, 5, C.footDk);
  rr(ctx, ox+14, oy+46+ly, 12, 14, 5, C.foot);
  rr(ctx, ox+36, oy+48+ry, 12, 14, 5, C.footDk);
  rr(ctx, ox+34, oy+46+ry, 12, 14, 5, C.foot);

  // 手（固定）
  rr(ctx, ox-12, oy+30, 12, 12, 6, C.handDk);
  rr(ctx, ox-13, oy+28, 12, 12, 6, C.hand);
  rr(ctx, ox+64, oy+30, 12, 12, 6, C.handDk);
  rr(ctx, ox+63, oy+28, 12, 12, 6, C.hand);

  // 体
  rr(ctx, ox+8,  oy+4, 50, 46, 8, C.bodyDk);
  rr(ctx, ox+6,  oy+2, 50, 46, 8, C.body);

  // スクリーン
  rr(ctx, ox+12, oy+8, 38, 22, 6, C.eye);

  // 目
  ctx.beginPath(); ctx.arc(ox+23, oy+19, 6, 0, Math.PI*2);
  ctx.fillStyle = C.eyeCol; ctx.fill();
  ctx.beginPath(); ctx.arc(ox+39, oy+19, 6, 0, Math.PI*2);
  ctx.fillStyle = C.eyeCol; ctx.fill();
}

function drawUp(ctx, ox, oy, af) {
  const ly = af === 0 ? 0 : 3;
  const ry = af === 0 ? 3 : 0;

  ctx.beginPath();
  ctx.ellipse(ox+32, oy+64, 16, 4, 0, 0, Math.PI*2);
  ctx.fillStyle = C.shadow; ctx.fill();

  rr(ctx, ox+16, oy+48+ly, 12, 14, 5, C.footDk);
  rr(ctx, ox+14, oy+46+ly, 12, 14, 5, C.foot);
  rr(ctx, ox+36, oy+48+ry, 12, 14, 5, C.footDk);
  rr(ctx, ox+34, oy+46+ry, 12, 14, 5, C.foot);

  rr(ctx, ox-12, oy+30, 12, 12, 6, C.handDk);
  rr(ctx, ox-13, oy+28, 12, 12, 6, C.hand);
  rr(ctx, ox+64, oy+30, 12, 12, 6, C.handDk);
  rr(ctx, ox+63, oy+28, 12, 12, 6, C.hand);

  // 体
  rr(ctx, ox+8,  oy+4, 50, 46, 8, C.bodyDk);
  rr(ctx, ox+6,  oy+2, 50, 46, 8, C.body);

  // 後頭部パネル
  rr(ctx, ox+12, oy+8,  38, 22, 5, C.bodyDk);
  rr(ctx, ox+18, oy+12, 26, 14, 4, C.body);
}

function drawLeft(ctx, ox, oy, af) {
  const f1y = af === 0 ? -3 : 3;
  const f2y = af === 0 ? 3 : -3;

  ctx.beginPath();
  ctx.ellipse(ox+26, oy+64, 13, 4, 0, 0, Math.PI*2);
  ctx.fillStyle = C.shadow; ctx.fill();

  // 後ろ足（先に描いて奥に見せる）
  rr(ctx, ox+16, oy+48+f2y, 12, 14, 5, C.footDk);
  // 前足
  rr(ctx, ox+20, oy+48+f1y, 12, 14, 5, C.footDk);
  rr(ctx, ox+18, oy+46+f1y, 12, 14, 5, C.foot);

  // 手（前側のみ）
  rr(ctx, ox-12, oy+30, 12, 12, 6, C.handDk);
  rr(ctx, ox-13, oy+28, 12, 12, 6, C.hand);

  // 体
  rr(ctx, ox+8,  oy+4, 42, 46, 8, C.bodyDk);
  rr(ctx, ox+6,  oy+2, 42, 46, 8, C.body);

  // スクリーン
  rr(ctx, ox+8, oy+8, 30, 22, 5, C.eye);

  // 目（片目）
  ctx.beginPath(); ctx.arc(ox+18, oy+19, 6, 0, Math.PI*2);
  ctx.fillStyle = C.eyeCol; ctx.fill();
}

function drawRight(ctx, ox, oy, af) {
  ctx.save();
  ctx.translate(ox+32, 0);
  ctx.scale(-1, 1);
  drawLeft(ctx, -32, oy, af);
  ctx.restore();
}

function drawPlayerDown(ctx, x, y, isMoving, animFrame) {
    const ox = x, oy = y;
    const leftFootOffsetY = isMoving ? (animFrame === 0 ? 0 : 2) : 0;
    const rightFootOffsetY = isMoving ? (animFrame === 0 ? 2 : 0) : 0;
    const leftArmOffsetY = isMoving ? (animFrame === 0 ? 0 : 2) : 0;
    const rightArmOffsetY = isMoving ? (animFrame === 0 ? 2 : 0) : 0;

    // 影
    ctx.fillStyle = C.shadow;
    ctx.beginPath();
    ctx.ellipse(ox + 32, oy + 63, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // 靴
    ctx.fillStyle = C.shoes;
    roundRect(ctx, ox + 19, oy + 56, 10, 7, 2);
    ctx.fill();
    roundRect(ctx, ox + 35, oy + 56, 10, 7, 2);
    ctx.fill();

    // 足（ズボン）
    ctx.fillStyle = C.pants;
    roundRect(ctx, ox + 20, oy + 44 + leftFootOffsetY, 10, 14, 2);
    ctx.fill();
    roundRect(ctx, ox + 34, oy + 44 + rightFootOffsetY, 10, 14, 2);
    ctx.fill();

    // 体（シャツ）
    ctx.fillStyle = C.shirt;
    roundRect(ctx, ox + 18, oy + 26, 28, 20, 4);
    ctx.fill();

    // ベルト
    ctx.fillStyle = C.belt;
    roundRect(ctx, ox + 18, oy + 40, 28, 5, 2);
    ctx.fill();
    ctx.fillStyle = C.buckle;
    roundRect(ctx, ox + 27, oy + 41, 6, 4, 1);
    ctx.fill();

    // 腕
    ctx.fillStyle = C.shirt;
    roundRect(ctx, ox + 8, oy + 27 + leftArmOffsetY, 10, 16, 3);
    ctx.fill();
    roundRect(ctx, ox + 46, oy + 27 + rightArmOffsetY, 10, 16, 3);
    ctx.fill();

    ctx.fillStyle = C.skin;
    roundRect(ctx, ox + 8, oy + 40, 10, 7, 2);
    ctx.fill();
    roundRect(ctx, ox + 46, oy + 40, 10, 7, 2);
    ctx.fill();

    // 首
    ctx.fillStyle = C.skin;
    roundRect(ctx, ox + 26, oy + 18, 12, 10, 3);
    ctx.fill();

    // 頭
    ctx.fillStyle = C.skin;
    roundRect(ctx, ox + 14, oy + 4, 36, 18, 8);
    ctx.fill();

    // 前髪
    ctx.fillStyle = C.hair;
    roundRect(ctx, ox + 14, oy + 4, 36, 9, 8);
    ctx.fill();
    roundRect(ctx, ox + 14, oy + 9, 6, 8, 3);
    ctx.fill();
    roundRect(ctx, ox + 44, oy + 9, 6, 8, 3);
    ctx.fill();

    // 目
    ctx.fillStyle = C.eye;
    roundRect(ctx, ox + 20, oy + 13, 8, 6, 2);
    ctx.fill();
    roundRect(ctx, ox + 36, oy + 13, 8, 6, 2);
    ctx.fill();

    ctx.fillStyle = C.highlight;
    roundRect(ctx, ox + 22, oy + 14, 2, 2, 1);
    ctx.fill();
    roundRect(ctx, ox + 38, oy + 14, 2, 2, 1);
    ctx.fill();

    // 口
    ctx.fillStyle = C.mouth;
    roundRect(ctx, ox + 26, oy + 20, 12, 2, 1);
    ctx.fill();
}

function drawPlayerUp(ctx, x, y, isMoving, animFrame) {
    const ox = x, oy = y;
    const leftFootOffsetY = isMoving ? (animFrame === 0 ? 0 : 2) : 0;
    const rightFootOffsetY = isMoving ? (animFrame === 0 ? 2 : 0) : 0;
    const leftArmOffsetY = isMoving ? (animFrame === 0 ? 0 : 2) : 0;
    const rightArmOffsetY = isMoving ? (animFrame === 0 ? 2 : 0) : 0;

    // 影
    ctx.fillStyle = C.shadow;
    ctx.beginPath();
    ctx.ellipse(ox + 32, oy + 63, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // 靴
    ctx.fillStyle = C.shoes;
    roundRect(ctx, ox + 19, oy + 56, 10, 7, 2);
    ctx.fill();
    roundRect(ctx, ox + 35, oy + 56, 10, 7, 2);
    ctx.fill();

    // 足（ズボン）
    ctx.fillStyle = C.pants;
    roundRect(ctx, ox + 20, oy + 44 + leftFootOffsetY, 10, 14, 2);
    ctx.fill();
    roundRect(ctx, ox + 34, oy + 44 + rightFootOffsetY, 10, 14, 2);
    ctx.fill();

    // 体（後ろ向き・暗い色）
    ctx.fillStyle = C.shirtDk;
    roundRect(ctx, ox + 18, oy + 26, 28, 20, 4);
    ctx.fill();

    // ベルト
    ctx.fillStyle = C.belt;
    roundRect(ctx, ox + 18, oy + 40, 28, 5, 2);
    ctx.fill();
    ctx.fillStyle = C.buckle;
    roundRect(ctx, ox + 27, oy + 41, 6, 4, 1);
    ctx.fill();

    // 腕
    ctx.fillStyle = C.shirtDk;
    roundRect(ctx, ox + 8, oy + 27 + leftArmOffsetY, 10, 16, 3);
    ctx.fill();
    roundRect(ctx, ox + 46, oy + 27 + rightArmOffsetY, 10, 16, 3);
    ctx.fill();

    ctx.fillStyle = C.skin;
    roundRect(ctx, ox + 8, oy + 40, 10, 7, 2);
    ctx.fill();
    roundRect(ctx, ox + 46, oy + 40, 10, 7, 2);
    ctx.fill();

    // 首
    ctx.fillStyle = C.skin;
    roundRect(ctx, ox + 26, oy + 18, 12, 10, 3);
    ctx.fill();

    // 頭
    ctx.fillStyle = C.skin;
    roundRect(ctx, ox + 14, oy + 4, 36, 18, 8);
    ctx.fill();

    // 後ろ髪（トップと長いサイド）
    ctx.fillStyle = C.hair;
    roundRect(ctx, ox + 14, oy + 4, 36, 12, 8);
    ctx.fill();
    roundRect(ctx, ox + 14, oy + 10, 7, 14, 3);
    ctx.fill();
    roundRect(ctx, ox + 43, oy + 10, 7, 14, 3);
    ctx.fill();
    roundRect(ctx, ox + 21, oy + 18, 22, 6, 2);
    ctx.fill();
}

function drawPlayerLeft(ctx, x, y, isMoving, animFrame) {
    const ox = x, oy = y;
    const footOffsetX = isMoving ? (animFrame === 0 ? 0 : -4) : 0;

    // 影
    ctx.fillStyle = C.shadow;
    ctx.beginPath();
    ctx.ellipse(ox + 32, oy + 63, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // 靴
    ctx.fillStyle = C.shoes;
    roundRect(ctx, ox + 16 + footOffsetX, oy + 56, 20, 7, 2);
    ctx.fill();

    // 足（ズボン）
    ctx.fillStyle = C.pants;
    roundRect(ctx, ox + 18 + footOffsetX, oy + 44, 16, 14, 2);
    ctx.fill();

    // 体
    ctx.fillStyle = C.shirtDk;
    roundRect(ctx, ox + 20, oy + 26, 24, 20, 4);
    ctx.fill();

    // ベルト
    ctx.fillStyle = C.belt;
    roundRect(ctx, ox + 20, oy + 40, 24, 5, 2);
    ctx.fill();

    // 腕（正面側のみ）
    ctx.fillStyle = C.shirt;
    roundRect(ctx, ox + 6, oy + 27, 12, 16, 3);
    ctx.fill();

    ctx.fillStyle = C.skin;
    roundRect(ctx, ox + 6, oy + 40, 12, 7, 2);
    ctx.fill();

    // 首
    ctx.fillStyle = C.skin;
    roundRect(ctx, ox + 24, oy + 18, 12, 10, 3);
    ctx.fill();

    // 頭
    ctx.fillStyle = C.skin;
    roundRect(ctx, ox + 12, oy + 4, 32, 18, 8);
    ctx.fill();

    // 横髪
    ctx.fillStyle = C.hair;
    roundRect(ctx, ox + 12, oy + 4, 32, 9, 8);
    ctx.fill();
    roundRect(ctx, ox + 12, oy + 9, 7, 10, 3);
    ctx.fill();

    // 目（片目）
    ctx.fillStyle = C.eye;
    roundRect(ctx, ox + 14, oy + 13, 8, 6, 2);
    ctx.fill();

    ctx.fillStyle = C.highlight;
    roundRect(ctx, ox + 16, oy + 14, 2, 2, 1);
    ctx.fill();

    // 口
    ctx.fillStyle = C.mouth;
    roundRect(ctx, ox + 13, oy + 20, 8, 2, 1);
    ctx.fill();
}

function drawPlayerRight(ctx, x, y, isMoving, animFrame) {
    const ox = x, oy = y;
    const footOffsetX = isMoving ? (animFrame === 0 ? 0 : 4) : 0;

    // 影
    ctx.fillStyle = C.shadow;
    ctx.beginPath();
    ctx.ellipse(ox + 32, oy + 63, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // 靴
    ctx.fillStyle = C.shoes;
    roundRect(ctx, ox + 28 + footOffsetX, oy + 56, 20, 7, 2);
    ctx.fill();

    // 足（ズボン）
    ctx.fillStyle = C.pants;
    roundRect(ctx, ox + 30 + footOffsetX, oy + 44, 16, 14, 2);
    ctx.fill();

    // 体
    ctx.fillStyle = C.shirtDk;
    roundRect(ctx, ox + 20, oy + 26, 24, 20, 4);
    ctx.fill();

    // ベルト
    ctx.fillStyle = C.belt;
    roundRect(ctx, ox + 20, oy + 40, 24, 5, 2);
    ctx.fill();

    // 腕（正面側のみ）
    ctx.fillStyle = C.shirt;
    roundRect(ctx, ox + 46, oy + 27, 12, 16, 3);
    ctx.fill();

    ctx.fillStyle = C.skin;
    roundRect(ctx, ox + 46, oy + 40, 12, 7, 2);
    ctx.fill();

    // 首
    ctx.fillStyle = C.skin;
    roundRect(ctx, ox + 28, oy + 18, 12, 10, 3);
    ctx.fill();

    // 頭
    ctx.fillStyle = C.skin;
    roundRect(ctx, ox + 20, oy + 4, 32, 18, 8);
    ctx.fill();

    // 横髪
    ctx.fillStyle = C.hair;
    roundRect(ctx, ox + 20, oy + 4, 32, 9, 8);
    ctx.fill();
    roundRect(ctx, ox + 45, oy + 9, 7, 10, 3);
    ctx.fill();

    // 目（片目）
    ctx.fillStyle = C.eye;
    roundRect(ctx, ox + 42, oy + 13, 8, 6, 2);
    ctx.fill();

    ctx.fillStyle = C.highlight;
    roundRect(ctx, ox + 46, oy + 14, 2, 2, 1);
    ctx.fill();

    // 口
    ctx.fillStyle = C.mouth;
    roundRect(ctx, ox + 43, oy + 20, 8, 2, 1);
    ctx.fill();
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.speed = 3;
        this.direction = 'down';
        this.lastInputX = 0;
        this.lastInputY = 0;
        this.animCounter = 0;
        this.animFrame = 0;
    }

    update(inputX, inputY) {
        const newX = this.x + inputX * this.speed;
        const newY = this.y + inputY * this.speed;

        // 衝突判定を含めて移動
        if (tilemap.canMove(newX, this.y, this.width, this.height)) {
            this.x = newX;
        }

        if (tilemap.canMove(this.x, newY, this.width, this.height)) {
            this.y = newY;
        }

        // マップ境界チェック
        this.x = Math.max(0, Math.min(this.x, tilemap.width * 32 - this.width));
        this.y = Math.max(0, Math.min(this.y, tilemap.height * 32 - this.height));

        // 方向更新
        if (inputX !== 0 || inputY !== 0) {
            this.lastInputX = inputX;
            this.lastInputY = inputY;

            if (Math.abs(inputY) > Math.abs(inputX)) {
                this.direction = inputY > 0 ? 'down' : 'up';
            } else {
                this.direction = inputX > 0 ? 'right' : 'left';
            }
        }

        // アニメーション更新（8fps: 60/8 = 7.5フレーム、ここでは8フレーム間隔）
        const isMoving = inputX !== 0 || inputY !== 0;
        if (isMoving) {
            this.animCounter++;
            if (this.animCounter >= 8) {
                this.animCounter = 0;
                this.animFrame = this.animFrame === 0 ? 1 : 0;
            }
        } else {
            this.animCounter = 0;
            this.animFrame = 0;
        }
    }

    draw(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX - 16; // 中心合わせ（0.5倍スケーリング後）
        const screenY = this.y - cameraY - 24;
        drawPlayer(ctx, screenX, screenY, this.direction, this.animFrame);
    }
}

const player = new Player(50 * 32 + 16, 50 * 32 + 16);
