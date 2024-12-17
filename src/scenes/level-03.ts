import Phaser from 'phaser';

class Level03 extends Phaser.Scene {
    constructor() {
        super('level-03');
    };

    public preload() {
        
    };

    public create() {
        const text = this.add.text(100, 100, 'Go to Level 4');
        text.setInteractive();
        text.on('pointerdown', () => {
            this.scene.start('level-04');
        });
    }

    public update(time: number, delta: number): void {

    };
};

export default Level03;