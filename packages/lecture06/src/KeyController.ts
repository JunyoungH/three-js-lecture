const KEY_BINDING = Object.freeze({
    forward: ['KeyW', 'ArrowUp'],
    backward: ['KeyS', 'ArrowDown'],
    left: ['KeyA', 'ArrowLeft'],
    right: ['KeyD', 'ArrowRight']
});

export class KeyController {
    currentDirection:{[key: string]: boolean};    

    constructor() {
        this.currentDirection = {};

        window.addEventListener('keydown', ({ code }) => {
            this.currentDirection[code] = true;
        });

        window.addEventListener('keyup', ({ code }) => {
            delete this.currentDirection[code];
        })
    }

    isDirection = (direction: 'forward' | 'backward' | 'left' | 'right') => {
        return KEY_BINDING[direction].some(key => this.currentDirection[key]);
    }
}