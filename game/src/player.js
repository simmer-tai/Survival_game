class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.speed = 3;
        this.color = '#e8c84a';
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
    }

    draw(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;

        ctx.fillStyle = this.color;
        ctx.fillRect(screenX, screenY, this.width, this.height);

        // 外枠
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
}

const player = new Player(50 * 32 + 16, 50 * 32 + 16);
