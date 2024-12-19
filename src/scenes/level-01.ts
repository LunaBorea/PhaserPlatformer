import Phaser from 'phaser';

let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
var platforms;


class Level01 extends Phaser.Scene {
    constructor() {
        super('level-01');
    };

    public preload() {
        this.load.image('background', '../src/assets/hellbackground_400x300_edited.png')
        this.load.image('ground', '../src/assets/ground_128x16.png')
        this.load.image('platform', '../src/assets/platform_128x32.png')
        this.load.spritesheet('dudeguy', '../src/assets/dudeguy.png', { frameWidth: 21, frameHeight: 32 }); // Fix collision, frame too large
    };

    public create() {
        this.add.image(800, 300, 'background');

        const text = this.add.text(100, 100, 'Go to Level 2');
        text.setInteractive();
        text.on('pointerdown', () => {
            this.scene.start('level-02');
        });

        // Spawns platforms
        platforms = this.physics.add.staticGroup();
        platforms.create(800, 586, 'ground').setScale(7).refreshBody();
        platforms.create(1000, 450, 'platform');
        platforms.create(800, 350, 'platform');
        platforms.create(600, 250, 'platform');

        // Spawns player --> player settings
        player = this.physics.add.sprite(800, 450, 'dudeguy').setScale(2).refreshBody();  
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dudeguy', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dudeguy', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dudeguy', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard!.createCursorKeys();

        this.physics.add.collider(player, platforms);
    }

    public update(time: number, delta: number): void {

        if (cursors.left.isDown)
            {
                player.setVelocityX(-160);
        
                player.anims.play('left', true);
            }
            else if (cursors.right.isDown)
            {
                player.setVelocityX(160);
        
                player.anims.play('right', true);
            }
            else
            {
                player.setVelocityX(0);
        
                player.anims.play('turn');
            }
        
            if (cursors.up.isDown && (player.body.touching.down || player.body.blocked.down)) // player.body.blocked.down temporary for testing purposes
            {
                player.setVelocityY(-400);
            }
    };

};

export default Level01;