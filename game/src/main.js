const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let frameCount = 0;
let lastFrameTime = performance.now();
let fps = 60;

function gameLoop(currentTime) {
    // フレームレート計算
    if (frameCount % 30 === 0) {
        const deltaTime = currentTime - lastFrameTime;
        fps = Math.round(30000 / deltaTime);
        lastFrameTime = currentTime;
    }

    // 入力処理
    const movementInput = input.getMovementInput();

    // 更新
    player.update(movementInput.x, movementInput.y);
    camera.follow(player.x, player.y, player.width, player.height);

    // 描画
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cameraX = camera.getOffsetX();
    const cameraY = camera.getOffsetY();

    tilemap.draw(ctx, cameraX, cameraY, canvas.width, canvas.height);
    oreManager.draw(ctx, cameraX, cameraY);
    player.draw(ctx, cameraX, cameraY);

    // UI描画
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    const info = `FPS: ${fps} | Player: (${Math.round(player.x)}, ${Math.round(player.y)})`;
    ctx.fillText(info, 10, 20);

    frameCount++;
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
