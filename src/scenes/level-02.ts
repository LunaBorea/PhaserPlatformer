import Phaser from 'phaser';

class Level02 extends Phaser.Scene {
    constructor() {
        super('level-02');
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

export default Level02;