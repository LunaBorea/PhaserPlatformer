import Phaser from 'phaser';

class Level01 extends Phaser.Scene {
    constructor() {
        super('level-01');
    };

    public preload() {
        
    };

    public create() {
        const text = this.add.text(100, 100, 'Go to Level 2');
        text.setInteractive();
        text.on('pointerdown', () => {
            this.scene.start('level-02');
        });
    }

    public update(time: number, delta: number): void {

    };
};

export default Level01;