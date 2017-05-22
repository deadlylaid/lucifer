// rain Particle
//-------------------------------------------------------------------------------------
var sound_Rain;
//-------------------------------------------------------------------------------------
function rain_Preload()
{
	Lucifer_Game.load.image('rain', '../../static/images/game/Effect/Rain_Particle/rain_many.png');
	Lucifer_Game.load.audio('rain_Sound', '../../static/sound/Effect/rain_Effect.wav');
}

function rain_Create()
{
	var rain_Particle = Lucifer_Game.add.emitter(Lucifer_Game.world.centerX, 0, 80);
	rain_Particle.width = Lucifer_Game.world.width;
	rain_Particle.visible = true;
	rain_Particle.fixedToCamera = true;
	rain_Particle.makeParticles('rain');
	rain_Particle.blendMode = Phaser.blendModes.ADD;

	//Min / Max Scale Setting
	rain_Particle.minParticleScale = 0.1;
	rain_Particle.maxParticleScale = 0.5;

	//Particle Speed Setting
	rain_Particle.setYSpeed(800, 1000);
	rain_Particle.setXSpeed(-5, 5);

	//Particle Rotation Setting
	rain_Particle.minRotation = 0;
	rain_Particle.maxRotation = 0;

	//Particle Start
	rain_Particle.start(false, 1600, 15, 0);

	//Sound
	sound_Rain = Lucifer_Game.add.audio('rain_Sound', 0.2, true);
	sound_Rain.play();
}
