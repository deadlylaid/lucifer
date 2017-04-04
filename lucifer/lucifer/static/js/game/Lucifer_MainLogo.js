var logoScene = 
{	

	preload: function()
	{
		this.load.image('space', '../../static/images/game/Menu/logospace.png', 138, 15);
		this.load.image('logo', '../../static/images/game/Menu/logo.png');

		//Sound 
		sound_Preload();
	},

	create: function()
	{
		//Sound
		sound_Create();
		sound_PlayMenuBGM();

		this.add.tileSprite(0, 0, 1280, 800, 'space');

		var sprite = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');

		sprite.anchor.setTo(0.5, 0.5);
		sprite.alpha = 0;

		this.add.tween(sprite).to({ alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
		
		this.time.events.add(Phaser.Timer.SECOND * 4.5, start, this);
	},

};

function start() 
{
	Lucifer_Game.state.start('select');
}
