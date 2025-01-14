import Phaser from 'phaser';

class Level05 extends Phaser.Scene {
    constructor() {
        super('level-05');
    };

    public preload() {
        
    };

    public create() {
        const textLevel = this.add.text(50, 150, 'Level 5\nGo to Level 1').setStroke('black', 2);
        textLevel.setInteractive();
        textLevel.on('pointerdown', () => {
            this.scene.start('level-01');
        });
    }

    public update(time: number, delta: number): void {
        time;
        delta;

    };
};

export default Level05;