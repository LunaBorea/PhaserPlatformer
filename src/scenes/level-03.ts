import Phaser from 'phaser';

class Level03 extends Phaser.Scene {
    constructor() {
        super('level-03');
    };

    public preload() {
        
    };

    public create() {
        const textLevel = this.add.text(50, 150, 'Level 3\nGo to Level 4').setStroke('black', 2);
        textLevel.setInteractive();
        textLevel.on('pointerdown', () => {
            this.scene.start('level-04');
        });
    }

    public update(time: number, delta: number): void {
        time;
        delta;

    };
};

export default Level03;