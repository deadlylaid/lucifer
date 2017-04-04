var menuScene = 
{
	create: function()
	{
		//Menu Scene
		/*
		var gameLogo = Lucifer_Game.add.text(80, 80, 'Lucifer',
										{ font: '50px Arial', fill: '#ffffff' });
		*/
		var menuImage = Lucifer_Game.add.sprite(640, 400, 'Menu_Image');
		menuImage.anchor.setTo(0.5, 0.5);

		//Start Text
		var startText = Lucifer_Game.add.text(490, Lucifer_Game.world.height - 80,
										 'Press the "Enter" Key to start',
										 { font: '25px Arial', fill: '#ffffff' });
		startText.fixedToCamera = true;

		//Key 
		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(this.start, this);
	},

	start: function()
	{
		Lucifer_Game.state.start('stage1');
	},
};
