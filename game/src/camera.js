class Camera {
    constructor(canvasWidth, canvasHeight, mapWidth, mapHeight, tileSize) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.mapWidth = mapWidth * tileSize;
        this.mapHeight = mapHeight * tileSize;
        this.tileSize = tileSize;
        this.x = 0;
        this.y = 0;
    }

    follow(targetX, targetY, targetWidth, targetHeight) {
        // ターゲットを画面中央に配置
        this.x = targetX + targetWidth / 2 - this.canvasWidth / 2;
        this.y = targetY + targetHeight / 2 - this.canvasHeight / 2;

        // マップ境界でクランプ
        this.x = Math.max(0, Math.min(this.x, this.mapWidth - this.canvasWidth));
        this.y = Math.max(0, Math.min(this.y, this.mapHeight - this.canvasHeight));
    }

    getOffsetX() {
        return this.x;
    }

    getOffsetY() {
        return this.y;
    }
}

const camera = new Camera(800, 600, 100, 100, 32);
