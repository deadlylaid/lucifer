// Player Sound
//-------------------------------------------------------------------------------------
var sound_Player_Weapon, sound_Player_Attack_Impact, sound_Player_Dead, sound_Player_Revive;
var sound_Player_SkillOne, sound_Player_SkillTwo, sound_Player_SkillThree;
var sound_Player_SkillFore, sound_Player_SkillFive, sound_Player_DeadBgm;
//-------------------------------------------------------------------------------------

function player_Sound_Preload()
{
	Lucifer_Game.load.audio('Player_Weapon', '../../static/sound/Player/player_Weapon.mp3');
	Lucifer_Game.load.audio('Player_AttImpact', '../../static/sound/Player/player_Attack_Impact.mp3');
	Lucifer_Game.load.audio('Player_Dead', '../../static/sound/Player/player_Dead.mp3');
	Lucifer_Game.load.audio('Player_Dead_Bgm', '../../static/sound/Player/player_Dead_Bgm.mp3');
	Lucifer_Game.load.audio('Player_Revive', '../../static/sound/Player/player_Revive.wav');
	Lucifer_Game.load.audio('Player_Skill_One', '../../static/sound/Player/player_SkillOne.wav');
	Lucifer_Game.load.audio('Player_Skill_Two', '../../static/sound/Player/player_SkillTwo.wav');
	Lucifer_Game.load.audio('Player_Skill_Three', '../../static/sound/Player/player_SkillThree.wav');
	Lucifer_Game.load.audio('Player_Skill_Fore', '../../static/sound/Player/player_SkillFore.wav');
	Lucifer_Game.load.audio('Player_Skill_Five', '../../static/sound/Player/player_SkillFive.wav');
}

function player_Sound_Create()
{
	sound_Player_Weapon 	   = Lucifer_Game.add.audio('Player_Weapon', 0.3, true);
	sound_Player_Attack_Impact = Lucifer_Game.add.audio('Player_AttImpact', 0.2, true);
	sound_Player_Dead 		   = Lucifer_Game.add.audio('Player_Dead', 0.3, true);
	sound_Player_DeadBgm	   = Lucifer_Game.add.audio('Player_Dead_Bgm', 0.3, true);
	sound_Player_Revive 	   = Lucifer_Game.add.audio('Player_Revive', 0.3, true);
	sound_Player_SkillOne 	   = Lucifer_Game.add.audio('Player_Skill_One', 0.3, true);
	sound_Player_SkillTwo 	   = Lucifer_Game.add.audio('Player_Skill_Two', 0.3, true);
	sound_Player_SkillThree    = Lucifer_Game.add.audio('Player_Skill_Three', 0.3, true);
	sound_Player_SkillFore 	   = Lucifer_Game.add.audio('Player_Skill_Fore', 0.3, true);
	sound_Player_SkillFive 	   = Lucifer_Game.add.audio('Player_Skill_Five', 0.3, true);

	//Sound
	sound_Player_Weapon.play();
	sound_Player_Weapon.stop();
	sound_Player_Attack_Impact.play();
	sound_Player_Attack_Impact.stop();
	sound_Player_Dead.play();
	sound_Player_Dead.stop();
	sound_Player_DeadBgm.play();
	sound_Player_DeadBgm.stop();
	sound_Player_Revive.play();
	sound_Player_Revive.stop();

	//Player Skill Sound
	sound_Player_SkillOne.play();
	sound_Player_SkillOne.stop();
	sound_Player_SkillTwo.play();
	sound_Player_SkillTwo.stop();
	sound_Player_SkillThree.play();
	sound_Player_SkillThree.stop();
	sound_Player_SkillFore.play();
	sound_Player_SkillFore.stop();
	sound_Player_SkillFive.play();
	sound_Player_SkillFive.stop();
}
