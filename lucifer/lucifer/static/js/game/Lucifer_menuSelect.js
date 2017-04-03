var button;
var closebtn;
var background;

var menuSelectScene = 
{	
	preload: function()
	{
		this.load.spritesheet('button', '../../static/images/game/Menu/startbutton.png', 200, 100);
		this.load.spritesheet('closebtn', '../../static/images/game/Menu/close.png', 200, 100);
		this.load.image('background', '../../static/images/game/Menu/menu.png');
	},

	create: function()
	{

		background = this.add.tileSprite(0, 0, 1280, 800, 'background');

		button = this.add.button(this.world.centerX - 95, 400, 'button', up, this);
		closebtn = this.add.button(this.world.centerX - 95, 550, 'closebtn', close, this);

    	button.onInputUp.add(up, this);
    	closebtn.onInputUp.add(close, this);
	},
};

function up() {
    Lucifer_Game.state.start('menu');
};

function close() {

	window.close();
};


