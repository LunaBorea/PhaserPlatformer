import Phaser from 'phaser';

class Level05 extends Phaser.Scene {
    constructor() {
        super('level-05');
    };

    public preload() {
        
    };

    public create() {
        const text = this.add.text(100, 100, 'Go to Level 1');
        text.setInteractive();
        text.on('pointerdown', () => {
            this.scene.start('level-01');
        });
    }

    public update(time: number, delta: number): void {

    };
};

export default Level05;