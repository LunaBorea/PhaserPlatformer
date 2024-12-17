import Level01 from './scenes/level-01';
import Level02 from './scenes/level-02';
import Level03 from './scenes/level-03';
import Level04 from './scenes/level-04';
import Level05 from './scenes/level-05';
import './style.css'
import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Level01, Level02, Level03, Level04, Level05],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 700 },
            debug: false
        }
    },
    parent: 'body'
};

const game = new Phaser.Game(config);