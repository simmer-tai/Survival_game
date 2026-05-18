class InputManager {
    constructor() {
        this.keys = {};
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }

    isKeyPressed(key) {
        return this.keys[key.toLowerCase()] === true;
    }

    getMovementInput() {
        const input = { x: 0, y: 0 };

        // WASD
        if (this.isKeyPressed('w') || this.isKeyPressed('arrowup')) input.y -= 1;
        if (this.isKeyPressed('s') || this.isKeyPressed('arrowdown')) input.y += 1;
        if (this.isKeyPressed('a') || this.isKeyPressed('arrowleft')) input.x -= 1;
        if (this.isKeyPressed('d') || this.isKeyPressed('arrowright')) input.x += 1;

        return input;
    }
}

const input = new InputManager();
