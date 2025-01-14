import Phaser from 'phaser';

class Level04 extends Phaser.Scene {
    constructor() {
        super('level-04');
    };

    public preload() {
        
    };

    public create() {
        const textLevel = this.add.text(50, 150, 'Level 4\nGo to Level 5').setStroke('black', 2);
        textLevel.setInteractive();
        textLevel.on('pointerdown', () => {
            this.scene.start('level-05');
        });
    }

    public update(time: number, delta: number): void {
        time;
        delta;

    };
};

export default Level04;