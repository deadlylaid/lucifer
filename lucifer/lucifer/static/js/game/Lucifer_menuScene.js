var menuScene = 
{
	create: function()
	{
		//Menu Scene
		var gameLogo = Lucifer_Game.add.text(80, 80, 'Lucifer',
										{ font: '50px Arial', fill: '#ffffff' });

		//Start Text
		var startText = Lucifer_Game.add.text(80, Lucifer_Game.world.height - 80,
										 'Press the "Enter" Key to start',
										 { font: '25px Arial', fill: '#ffffff' });

		//Key 
		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(this.start, this);
	},

	start: function()
	{
		Lucifer_Game.state.start('stage1');
	},
};