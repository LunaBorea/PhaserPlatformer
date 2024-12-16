import Level01 from './scenes/level-01';
import Level02 from './scenes/level-02';
import './style.css'
import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Level01, Level02],
    // physics
    parent: 'body'
};

const game = new Phaser.Game(config);