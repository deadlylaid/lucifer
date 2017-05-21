// User Interface Sound
//-------------------------------------------------------------------------------------
var sound_WindowOpen, sound_WindowClose;
//-------------------------------------------------------------------------------------

function ui_Sound_Preload()
{
	Lucifer_Game.load.audio('Window_Open', '../../static/sound/UI/window_Open.wav');
	Lucifer_Game.load.audio('Window_Close', '../../static/sound/UI/window_Close.wav');
}

function ui_Sound_Create()
{
	sound_WindowOpen = Lucifer_Game.add.audio('Window_Open', 1, false);
	sound_WindowClose = Lucifer_Game.add.audio('Window_Close', 1, false);

	sound_WindowOpen.play();
	sound_WindowOpen.stop();
	sound_WindowClose.play();
	sound_WindowClose.stop();	
}