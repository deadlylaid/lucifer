var button;
var closebtn;
var background;

var menuSelectScene = 
{	
	preload: function()
	{
		this.load.spritesheet('button', '../../static/images/game/Menu/startbutton.png', 355, 54);
		this.load.spritesheet('closebtn', '../../static/images/game/Menu/close.png', 355, 54);
		this.load.image('background', '../../static/images/game/Menu/menu.png');
	},

	create: function()
	{

		background = this.add.tileSprite(0, 0, 1280, 800, 'background');

		button = this.add.button(this.world.centerX - 180, 590, 'button', up, this, 1, 0);
		closebtn = this.add.button(this.world.centerX - 180, 660, 'closebtn', exit, this, 1, 0);

    	button.onInputUp.add(up, this);
    	//button.onInputOver.add(over, this);
    	closebtn.onInputUp.add(exit, this);
    	//closebtn.onInputOver.add(over, this);

	},
};

function up() {
    Lucifer_Game.state.start('menu');
};

function exit() {

	window.close();
};


