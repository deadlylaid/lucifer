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

		//Mouse
		//----------------------------------------------------------------------------------------------------------
		mouse_Preload();
		//----------------------------------------------------------------------------------------------------------
	},

	create: function()
	{
		//Sound
		//sound_PlayMenuBGM();

		background = this.add.tileSprite(0, 0, 1280, 800, 'background');

		button = this.add.button(this.world.centerX - 180, 590, 'button', up, this, 1, 0);
		closebtn = this.add.button(this.world.centerX - 180, 660, 'closebtn', exit, this, 1, 0);

    	button.onInputUp.add(up, this);
    	//button.onInputOver.add(over, this);
    	closebtn.onInputUp.add(exit, this);
    	//closebtn.onInputOver.add(over, this)''

    	button.input.useHandCursor = true;

    	mouse_Create();
	},

	update: function()
	{
		//Mouse
		mouse_Update();
	}
};

function up() {
    if(characterStage==='1'){
        Lucifer_Game.state.start('load');
    }else if(characterStage==='2'){
        Lucifer_Game.state.start('stage2_load');	//stage2 확인용.
    }else if(characterStage==='3'){
        Lucifer_Game.state.start('stage3_load');	//보스 AI 확인용.
    }

   //Sound
   sound_StopMenuBGM();
};

function exit() {

	window.close();
};


