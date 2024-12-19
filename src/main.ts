import Level01 from './scenes/level-01';
import Level02 from './scenes/level-02';
import Level03 from './scenes/level-03';
import Level04 from './scenes/level-04';
import Level05 from './scenes/level-05';
import './style.css'
import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1600,
    height: 600,
    scene: [Level01, Level02, Level03, Level04, Level05],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 700 },
            debug: false
        }
    },
    parent: 'body',
    antialias: false
};

const game = new Phaser.Game(config);

// "On the first day of kindergarten, on the first recess, when the sillies first lengthened, one stood. Covered by the glitter of Arts and Crafts, his fingers covered by the glues of Elmer and tainted beyond bath time, he chose the path of perpetual torment. In his ravenous angy he found no peace; and with a sour expression he scoured the courtyard seeking vengeance against the devil spawn who had wronged him. He wore the crown of the Nighty Sleepy, and those that tasted the bite of his 'sord' named him... the Doof Slayer"