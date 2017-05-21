// Player Sound
//-------------------------------------------------------------------------------------
var sound_Player_Weapon, sound_Player_Attack_Impact, sound_Player_Dead;
//-------------------------------------------------------------------------------------

function player_Sound_Preload()
{
	Lucifer_Game.load.audio('Player_Weapon', '../../static/sound/Player/player_Weapon.mp3');
	Lucifer_Game.load.audio('Player_AttImpact', '../../static/sound/Player/player_Attack_Impact.mp3');
	Lucifer_Game.load.audio('Player_Dead', '../../static/sound/Player/player_Dead.mp3');
}

function player_Sound_Create()
{
	sound_Player_Weapon 	   = Lucifer_Game.add.audio('Player_Weapon', 0.5, true);
	sound_Player_Attack_Impact = Lucifer_Game.add.audio('Player_AttImpact', 1.0, true);
	sound_Player_Dead 		   = Lucifer_Game.add.audio('Player_Dead', 1.0, true);

	//Sound
	player_Sound_Weapon_Play();
	player_Sound_Weapon_Stop();			
}

function player_Sound_Weapon_Play()
{
	sound_Player_Weapon.play();
}

function player_Sound_Weapon_Stop()
{
	sound_Player_Weapon.stop();
}

function player_Sound_AttImpact_Play()
{
	sound_Player_Attack_Impact.play();
}

function player_Sound_AttImpact_Stop()
{
	sound_Player_Attack_Impact.stop();
}

function player_Sound_Dead_Play()
{
	sound_Player_Dead.play();
}

function player_Sound_Dead_Stop()
{
	sound_Player_Dead.stop();
}