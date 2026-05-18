class PerlinNoise {
    constructor(seed = 0) {
        this.seed = seed;
        this.permutation = this.generatePermutation(seed);
        this.p = [...this.permutation, ...this.permutation];
    }

    generatePermutation(seed) {
        const p = [];
        for (let i = 0; i < 256; i++) {
            p[i] = i;
        }

        // シード値でシャッフル
        let n, q;
        for (let i = 255; i > 0; i--) {
            seed = (seed * 16807) % 2147483647;
            n = seed % (i + 1);
            q = p[i];
            p[i] = p[n];
            p[n] = q;
        }
        return p;
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(t, a, b) {
        return a + t * (b - a);
    }

    grad(hash, x, y) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 8 ? y : x;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    noise(x, y) {
        const xi = Math.floor(x) & 255;
        const yi = Math.floor(y) & 255;

        const xf = x - Math.floor(x);
        const yf = y - Math.floor(y);

        const u = this.fade(xf);
        const v = this.fade(yf);

        const aa = this.p[this.p[xi] + yi];
        const ab = this.p[this.p[xi] + yi + 1];
        const ba = this.p[this.p[xi + 1] + yi];
        const bb = this.p[this.p[xi + 1] + yi + 1];

        const x1 = this.lerp(u, this.grad(aa, xf, yf), this.grad(ba, xf - 1, yf));
        const x2 = this.lerp(u, this.grad(ab, xf, yf - 1), this.grad(bb, xf - 1, yf - 1));

        return (this.lerp(v, x1, x2) + 1) / 2; // 0〜1の範囲に正規化
    }
}

class MapGenerator {
    constructor(width = 100, height = 100, seed = 0) {
        this.width = width;
        this.height = height;
        this.seed = seed;
        this.perlin = new PerlinNoise(seed);
    }

    generateHeightmap(scale = 0.1, octaves = 4, persistence = 0.5, lacunarity = 2.0) {
        const heightmap = Array(this.height).fill(null).map(() => Array(this.width).fill(0));

        let maxNoise = 0;
        let minNoise = 0;
        let amplitude = 1;
        let frequency = 1;
        let maxAmplitude = 0;

        // 複数のOctaveを重ねる
        for (let oct = 0; oct < octaves; oct++) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    const nx = x * scale * frequency;
                    const ny = y * scale * frequency;
                    const noiseVal = this.perlin.noise(nx, ny);
                    heightmap[y][x] += noiseVal * amplitude;
                }
            }
            maxAmplitude += amplitude;
            amplitude *= persistence;
            frequency *= lacunarity;
        }

        // 正規化
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                heightmap[y][x] /= maxAmplitude;
                heightmap[y][x] = Math.max(0, Math.min(1, heightmap[y][x]));
            }
        }

        return heightmap;
    }

    heightmapToTilemap(heightmap) {
        const tilemap = Array(this.height).fill(null).map(() => Array(this.width).fill(0));

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const height = heightmap[y][x];

                if (height < 0.35) {
                    tilemap[y][x] = 0; // 水
                } else if (height < 0.55) {
                    tilemap[y][x] = 1; // 草
                } else if (height < 0.75) {
                    tilemap[y][x] = 2; // 森
                } else {
                    tilemap[y][x] = 3; // 岩
                }
            }
        }

        return tilemap;
    }

    generate() {
        const heightmap = this.generateHeightmap(0.08, 5, 0.6, 2.0);
        return this.heightmapToTilemap(heightmap);
    }
}

const mapGenerator = new MapGenerator(100, 100, 0);
