import Phaser from 'phaser';

class Level04 extends Phaser.Scene {
    constructor() {
        super('level-04');
    };

    public preload() {
        
    };

    public create() {
        const text = this.add.text(100, 100, 'Level 4\nGo to Level 5');
        text.setInteractive();
        text.on('pointerdown', () => {
            this.scene.start('level-05');
        });
    }

    public update(time: number, delta: number): void {

    };
};

export default Level04;