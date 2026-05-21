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

                const screenX = x * this.tileSize - cameraX;
                const screenY = y * this.tileSize - cameraY;

                ctx.fillStyle = tileType.color;
                ctx.fillRect(screenX, screenY, this.tileSize, this.tileSize);

                // グリッド線（デバッグ用）
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(screenX, screenY, this.tileSize, this.tileSize);
            }
        }
    }
}

const mapData = mapGenerator.generate();
const tilemap = new TileMap(mapData);
const oreManager = new OreManager(mapData);
