var sound_MenuBgm, sound_Stage1Bgm, sound_Stage2Bgm;
//-------------------------------------------------------------------------------------

function sound_Preload()
{
	Lucifer_Game.load.audio('Menu_Bgm', '../../static/sound/Menu_Bgm.mp3');
	Lucifer_Game.load.audio('Stage1_Bgm', '../../static/sound/Stage1_Bgm.mp3');
	Lucifer_Game.load.audio('stage2_Bgm', '../../static/sound/Stage2_Bgm.mp3');
}

function sound_Create()
{
	sound_MenuBgm   = Lucifer_Game.add.audio('Menu_Bgm', 0.5, true);
	sound_Stage1Bgm = Lucifer_Game.add.audio('Stage1_Bgm', 0.5, true);
	sound_Stage2Bgm = Lucifer_Game.add.audio('stage2_Bgm', 0.5, true);	
}

function sound_PlayMenuBGM()
{
	sound_MenuBgm.play();	
}

function sound_StopMenuBGM()
{
	sound_MenuBgm.stop();
}

function sound_PlayStage1BGM()
{
	sound_Stage1Bgm.play();
}

function sound_StopStage1BGM()
{
	sound_Stage1Bgm.stop();
}

function sound_PlayStage2BGM()
{
	sound_Stage2Bgm.play();
}

function sound_StopStage2BGM()
{
	sound_Stage2Bgm.stop();	
}