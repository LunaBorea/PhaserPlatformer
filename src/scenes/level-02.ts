import Phaser from 'phaser';

class Level02 extends Phaser.Scene {
    constructor() {
        super('level-02');
    };

    public preload() {
        
    };

    public create() {
        const textLevel = this.add.text(50, 150, 'Level 2\nGo to Level 3').setStroke('black', 2);
        textLevel.setInteractive();
        textLevel.on('pointerdown', () => {
            this.scene.start('level-03');
        });
    }

    public update(time: number, delta: number): void {
        time;
        delta;
    };
};

export default Level02;