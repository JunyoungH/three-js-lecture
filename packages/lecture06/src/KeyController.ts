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
        switch(direction) {
            case 'forward': 
                return (
                    this.currentDirection['KeyW'] ||
                    this.currentDirection['ArrowUp']
                );
            case 'backward':
                return (
                    this.currentDirection['KeyS'] ||
                    this.currentDirection['ArrowDown']
                );
            case 'left':
                return (
                    this.currentDirection['KeyA'] ||
                    this.currentDirection['ArrowLeft']
                );
            case 'right':
                return (
                    this.currentDirection['KeyD'] ||
                    this.currentDirection['ArrowRight']
                );
        }
    }
}