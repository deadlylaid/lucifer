// NPC Sound
//-------------------------------------------------------------------------------------
var sound_StoreNpc_Hellow, sound_StoreNpc_What, sound_CainNpc_Talk;
var sound_Tyreal_Appearance, sound_Tyreal_Talk, sound_Tyreal_Bgm;
//-------------------------------------------------------------------------------------

function npc_Sound_Preload()
{
	Lucifer_Game.load.audio('StoreNpc_Hellow', '../../static/sound/Npc/npc_Store_Hellow.wav');
	Lucifer_Game.load.audio('StoreNpc_What', '../../static/sound/Npc/npc_Store_What.wav');
	Lucifer_Game.load.audio('CainNpc_Talk', '../../static/sound/Npc/npc_Cain_Talk.wav');
	Lucifer_Game.load.audio('Tyreal_Appearance', '../../static/sound/Npc/npc_Tyreal_Appearance.wav');
	Lucifer_Game.load.audio('Tyreal_Talk', '../../static/sound/Npc/npc_Tyreal_Talk.mp3');
	Lucifer_Game.load.audio('Tyreal_Bgm', '../../static/sound/Npc/npc_Tyreal_Bgm.mp3');
}

function npc_Sound_Create()
{
	sound_StoreNpc_Hellow = Lucifer_Game.add.audio('StoreNpc_Hellow', 0.5, false);
	sound_StoreNpc_What = Lucifer_Game.add.audio('StoreNpc_What', 0.5, false);
	sound_CainNpc_Talk = Lucifer_Game.add.audio('CainNpc_Talk', 0.5, false);
	sound_Tyreal_Appearance = Lucifer_Game.add.audio('Tyreal_Appearance', 0.5, false);
	sound_Tyreal_Talk = Lucifer_Game.add.audio('Tyreal_Talk', 0.5, false);
	sound_Tyreal_Bgm = Lucifer_Game.add.audio('Tyreal_Bgm', 0.1, false);

	sound_StoreNpc_Hellow.play();
	sound_StoreNpc_Hellow.stop();
	sound_StoreNpc_What.play();
	sound_StoreNpc_What.stop();
	sound_CainNpc_Talk.play();
	sound_CainNpc_Talk.stop();
	sound_Tyreal_Appearance.play();
	sound_Tyreal_Appearance.stop();
	sound_Tyreal_Talk.play();
	sound_Tyreal_Talk.stop();
	sound_Tyreal_Bgm.play();
	sound_Tyreal_Bgm.stop();

	//Store Npc
	sound_StoreNpc_Hellow.onStop.add(npc_Sound_Store, Lucifer_Game);
}

function npc_Sound_Store()
{
	sound_StoreNpc_What.play();	
}