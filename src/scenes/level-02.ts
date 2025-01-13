import Phaser from 'phaser';

class Level02 extends Phaser.Scene {
    constructor() {
        super('level-02');
    };

    public preload() {
        
    };

    public create() {
        const text = this.add.text(100, 100, 'Level 2\nGo to Level 3');
        text.setInteractive();
        text.on('pointerdown', () => {
            this.scene.start('level-03');
        });
    }

    public update(time: number, delta: number): void {

    };
};

export default Level02;