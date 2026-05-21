class TileMap {
    constructor(tilemapData) {
        this.tileSize = 32;
        this.tiles = tilemapData;
        this.width = tilemapData[0].length;
        this.height = tilemapData.length;

        // タイル種別の定義
        this.tileTypes = {
            0: { name: '水', color: '#4a7fcb', walkable: false },
            1: { name: '草', color: '#5a8a3a', walkable: true },
            2: { name: '森', color: '#2d5a1b', walkable: false },
            3: { name: '岩', color: '#7a6a5a', walkable: false }
        };
    }

    getTileAtWorldPos(x, y) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);
        return this.getTile(tileX, tileY);
    }

    getTile(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return null;
        }
        return this.tiles[y][x];
    }

    isWalkable(x, y) {
        const tile = this.getTileAtWorldPos(x, y);
        if (tile === null) return false;
        return this.tileTypes[tile].walkable;
    }

    canMove(x, y, width, height) {
        // プレイヤーの四隅をチェック
        const corners = [
            [x, y],
            [x + width - 1, y],
            [x, y + height - 1],
            [x + width - 1, y + height - 1]
        ];

        for (const [px, py] of corners) {
            if (!this.isWalkable(px, py)) {
                return false;
            }
        }
        return true;
    }

    draw(ctx, cameraX, cameraY, canvasWidth, canvasHeight) {
        const startTileX = Math.max(0, Math.floor(cameraX / this.tileSize));
        const startTileY = Math.max(0, Math.floor(cameraY / this.tileSize));
        const endTileX = Math.min(this.width, Math.ceil((cameraX + canvasWidth) / this.tileSize));
        const endTileY = Math.min(this.height, Math.ceil((cameraY + canvasHeight) / this.tileSize));

        for (let y = startTileY; y < endTileY; y++) {
            for (let x = startTileX; x < endTileX; x++) {
                const tileId = this.tiles[y][x];
                const tileType = this.tileTypes[tileId];
                const sx = x * this.tileSize - cameraX;
                const sy = y * this.tileSize - cameraY;
                const s = this.tileSize;

                // 同種タイルの隣接チェック
                const sameType = (dx, dy) => {
                    const nx = x + dx, ny = y + dy;
                    if (nx < 0 || nx >= this.width || ny < 0 || ny >= this.height) return true;
                    return this.tiles[ny][nx] === tileId;
                };

                const adjL  = sameType(-1,  0);
                const adjR  = sameType( 1,  0);
                const adjU  = sameType( 0, -1);
                const adjD  = sameType( 0,  1);

                // 各コーナーの丸め半径
                // 隣接タイルがある辺に接するコーナーは r=0
                const BASE_R = 16;
                const rTL = (!adjL && !adjU) ? BASE_R : 0;
                const rTR = (!adjR && !adjU) ? BASE_R : 0;
                const rBR = (!adjR && !adjD) ? BASE_R : 0;
                const rBL = (!adjL && !adjD) ? BASE_R : 0;

                // すべて0なら普通の矩形
                if (rTL === 0 && rTR === 0 && rBR === 0 && rBL === 0) {
                    ctx.fillStyle = tileType.color;
                    ctx.fillRect(sx, sy, s, s);
                } else {
                    ctx.beginPath();
                    // 左上
                    ctx.moveTo(sx + rTL, sy);
                    // 右上
                    ctx.lineTo(sx + s - rTR, sy);
                    if (rTR > 0) ctx.arcTo(sx+s, sy,   sx+s, sy+rTR,   rTR);
                    // 右下
                    ctx.lineTo(sx + s, sy + s - rBR);
                    if (rBR > 0) ctx.arcTo(sx+s, sy+s, sx+s-rBR, sy+s, rBR);
                    // 左下
                    ctx.lineTo(sx + rBL, sy + s);
                    if (rBL > 0) ctx.arcTo(sx,   sy+s, sx, sy+s-rBL,   rBL);
                    // 左上に戻る
                    ctx.lineTo(sx, sy + rTL);
                    if (rTL > 0) ctx.arcTo(sx,   sy,   sx+rTL, sy,     rTL);
                    ctx.closePath();
                    ctx.fillStyle = tileType.color;
                    ctx.fill();
                }

                // グリッド線（デバッグ用）
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(sx, sy, s, s);
            }
        }
    }
}

const mapData = mapGenerator.generate();
const tilemap = new TileMap(mapData);
const oreManager = new OreManager(mapData);
