import Phaser from 'phaser';

let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let lastDirection: 'left' | 'right' = 'right';
let lastGroundedTime = 0;

let platforms;
let keys;
let keysCollected = 0;

class Level01 extends Phaser.Scene {
    constructor() {
        super('level-01');
    };

    public preload() {
        this.load.image('background', '../src/assets/hellbackground_1600x600_edited.png')

        this.load.image('ground', '../src/assets/ground_1600x100.png')
        this.load.image('platform', '../src/assets/platform_128x32.png')

        this.load.image('life', '../src/assets/life_27x27.png')
        this.load.image('lifeEmpty', '../src/assets/life_empty_27x27.png')

        this.load.image('doorLocked', '../src/assets/lockeddoor_42x56_2x.png')
        this.load.image('doorUnlocked', '../src/assets/unlockeddoor_42x56_2x.png')
        this.load.image('key', '../src/assets/key.png')

        this.load.spritesheet('dudeguy', '../src/assets/dudeguy.png', { frameWidth: 21, frameHeight: 32 }); // Fix collision, frame too large
    };

    public create() {
        this.add.image(800, 300, 'background');

        this.add.image(75, 75, 'life').setScale(3)
        this.add.image(175, 75, 'life').setScale(3)
        this.add.image(275, 75, 'lifeEmpty').setScale(3)

        this.add.image(1500, 472, 'doorLocked')
        this.add.image(1500, 352, 'doorUnlocked')

        const textLevel = this.add.text(50, 150, 'Level 1\nGo to Level 2').setStroke('black', 2);
        textLevel.setInteractive();
        textLevel.on('pointerdown', () => {
            this.scene.start('level-02');
        });

        const textKeys = this.add.text(50, 200, 'Keys collected: ' + keysCollected).setStroke('black', 2);

        // Platforms
        platforms = this.physics.add.staticGroup();
        platforms.create(800, 564, 'ground');

        platforms.create(344, 400, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody
        platforms.create(472, 400, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody
        platforms.create(600, 400, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody

        platforms.create(344, 200, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody
        platforms.create(472, 200, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody
        platforms.create(600, 200, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody

        platforms.create(800, 500, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody
        platforms.create(800, 300, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody


        platforms.create(1000, 400, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody
        platforms.create(1128, 400, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody
        platforms.create(1256, 400, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody

        platforms.create(1000, 200, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody
        platforms.create(1128, 200, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody
        platforms.create(1256, 200, 'platform').setSize(114, 32).setOffset(2, 0).refreshBody
        // Platforms
        
        // Keys
        keys = this.physics.add.group({key: 'key', immovable: true, allowGravity: false});
        keys.create(1270, 140, 'key').setScale(2).refreshBody;
        keys.create(330, 340, 'key').setScale(2).refreshBody;
        // Keys

        // Player
        player = this.physics.add.sprite(100, 490, 'dudeguy').setScale(2).refreshBody();  
        player.body.setSize(16, 30)
        player.body.setOffset(0, 2)
        player.setCollideWorldBounds(true);
        // Player

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('dudeguy', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'idle',
            frames: [ { key: 'dudeguy', frame: 0 } ],
            frameRate: 1
        });

        this.anims.create({
            key: 'jump',
            frames: [ { key: 'dudeguy', frame: 1 } ],
            frameRate: 1
        });

        cursors = this.input.keyboard!.createCursorKeys();

        this.physics.add.collider(player, platforms);
        
        this.physics.add.overlap(player, keys, collectKey, undefined, this);
        function collectKey (player: any, key: any) {
            player;
            key.disableBody(true, true);
            keysCollected++
            textKeys.setText('Keys collected: ' + keysCollected)
        }
    }

    public update(time: number, delta: number): void {
        const isAirborne = !(player.body.touching.down || player.body.blocked.down);
        const friction = 0.8;
        const stopThreshold = 5;
        const acceleration = 10;
        const coyoteTime = 125; // milliseconds
        delta;


        if (!isAirborne) {
            lastGroundedTime = time;
        }

        if (cursors.left.isDown) {
            player.setVelocityX(Phaser.Math.Clamp(player.body.velocity.x - acceleration, -220, 0));

            if (!isAirborne) {
                player.setFlipX(false);
                player.anims.play('walk', true);
            }

            lastDirection = 'left';

        } else if (cursors.right.isDown) {
            player.setVelocityX(Phaser.Math.Clamp(player.body.velocity.x + acceleration, 0, 220));

            if (!isAirborne) {
                player.setFlipX(true);
                player.anims.play('walk', true);
            }

            lastDirection = 'right';

        } else { 
            if (!isAirborne) { // Applies friction when player is stationary
                player.setVelocityX(player.body.velocity.x * friction);

                if (Math.abs(player.body.velocity.x) < stopThreshold) {
                    player.setVelocityX(0);
                    player.anims.play('idle');
                    player.setFlipX(lastDirection === 'right');
                }
            }
        }

        if (isAirborne) {
            player.anims.play('jump', true);
            player.setFlipX(lastDirection === 'right');
        }

        const canJump = time - lastGroundedTime <= coyoteTime;
        if (cursors.up.isDown && (canJump || !isAirborne)) {
            player.setVelocityY(-400);
            lastGroundedTime = 0;
        }
    };

};

export default Level01;