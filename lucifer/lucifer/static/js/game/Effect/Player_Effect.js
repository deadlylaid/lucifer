//Player Effect
//-------------------------------------------------------------------------------------
var Player_Dead, Player_Revival;
var Player_DeadCheck = false, Player_DeadMotion_Check = false, Player_Regen_Check = false;
var Player_DeadKey;
var Player_LevelUp_Effect, level_Up_Key;
var Player_DeadTimer, Player_DeadTime_Total = 0;
var Player_CreateCheck = false;
var Plyaer_DeadEffect_Check = false;
var sound_LevelUp_Effect;
//-------------------------------------------------------------------------------------

function player_Effect_Preload()
{
	Lucifer_Game.load.spritesheet('PY_Bavarian_Dead',
								  	  '../../static/images/game/Player/Bavarian/dead/dead.png', 200, 280);
	Lucifer_Game.load.spritesheet('PY_Bavarian_Revival',
								  	  '../../static/images/game/Player/Bavarian/revival/revival.png', 128, 211);
	Lucifer_Game.load.spritesheet('PY_LevelUp_Effect',
 								  '../../static/images/game/Effect/LevelUp_Effect/Level_Effect.png', 128, 113);
	Lucifer_Game.load.audio('LevelEffect_Sound',
							'../../static/sound/Effect/levelUp_Effect.wav');
}

function player_Effect_Create()
{
	//Player Effect Dead
	Player_Dead = Lucifer_Game.add.sprite(Player.x, Player.y, 'PY_Bavarian_Dead');
	Player_Dead.anchor.setTo(0.5, 0.5);
	Player_Dead.visible = false;
	Player_Dead.blendMode = Phaser.blendModes.ADD;

	//Player Effect Revival
	Player_Revival = Lucifer_Game.add.sprite(Player.x, Player.y, 'PY_Bavarian_Revival');
	Player_Revival.anchor.setTo(0.5, 0.5);
	Player_Revival.visible = false;
	Player_Revival.blendMode = Phaser.blendModes.ADD;

	//Animation
	//Dead
	Player_Dead.animations.add('PY_Bavarian_Dead_Ani',
							   [
							   	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
							   	  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
							   	  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
							   	  31, 32, 33, 34, 35
							   ], 60, true);
	//Player_Dead.animations.play('PY_Bavarian_Dead_Ani', 10, true);

	//Revival
	Player_Revival.animations.add('PY_Bavarian_Revival',
								  [
								  	 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
								  	 11, 12, 13, 14, 15, 16, 17, 18, 19
								  ], 60, true);
	//Player_Revival.animations.play('PY_Bavarian_Revival', 10, true);

	/* 플레이어 죽는 키
	Player_DeadKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.SIX);
	Player_DeadKey.onDown.add(Player_Kill, Lucifer_Game);
	Lucifer_Game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SIX);
	*/

	//Level Up Effect
 	Player_LevelUp_Effect = Lucifer_Game.add.sprite(Player.x, Player.y, 'PY_LevelUp_Effect');
 	Player_LevelUp_Effect.anchor.setTo(0.5, 0.5);
 	Player_LevelUp_Effect.visible = false;
 	Player_LevelUp_Effect.blendMode = Phaser.blendModes.ADD;

 	//Level Up Effect Animation
 	Player_LevelUp_Effect.animations.add('PY_LevelUp_Effect_Ani',
 										 [
 										 	0,  1,  2, 3, 4, 5, 6, 7, 8, 9,
 										 	10, 11, 12
 										 ], 60, true);
 	Player_LevelUp_Effect.animations.play('PY_LevelUp_Effect_Ani', 10, true);

 	//Level Up Key(임시로)
 	level_Up_Key = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9);
 	level_Up_Key.onDown.add(player_Levelup_Key, Lucifer_Game);
 	Lucifer_Game.input.keyboard.removeKeyCapture(Phaser.Keyboard.NUMPAD_9);

 	//Player Dead Timer
 	Player_DeadTimer = Lucifer_Game.time.create(false);
 	Player_DeadTimer.loop(1000, player_DeadTimer, Lucifer_Game);

 	//Sound
 	sound_LevelUp_Effect = Lucifer_Game.add.audio('LevelEffect_Sound', 0.4, false);
 	sound_LevelUp_Effect.play();
 	sound_LevelUp_Effect.stop();
}

//Dead Timer
function player_DeadTimer()
{
	++Player_DeadTime_Total;
}

function Player_Kill()
{
	health = -1000;
}

function player_Levelup_Key()
{
	if(Keytestcheck == true){
	experience += 1000;
	}
}

function player_Effect_Dead()
{
	if(health < 0)
	{
		Player_DeadCheck = true;
		Player.visible = false;
		Player_ID.visible = false;

		//Skill
		skill_Bavarian.visible = false;
		skill_Bavarian_Two.visible = false;
		skill_Bavarian_Three.visible = false;
		skill_Bavarian_Four.visible = false;
		skill_Bavarian_Four_Effect.visible = false;
		skill_Bavarian_Five.visible = false;

		//Sound Stop
		sound_Player_SkillOne.stop();
		sound_Player_SkillTwo.stop();
		sound_Player_SkillThree.stop();
		sound_Player_SkillFore.stop();
		sound_Player_SkillFive.stop();

		Player_Regen_Check = true;
		Player.destroy();
	}

	if(Player_DeadCheck == true)
	{
		if(Player_DeadMotion_Check == false)
		{
			//Sound
			sound_Player_Dead.play();

			Player_Dead.visible = true;
			Player_Dead.animations.play('PY_Bavarian_Dead_Ani', 10, true);
			Player_DeadMotion_Check = true;
		}

		var CurFrame = Player_Dead.animations.frame;
		var EndFrame = 35;

		if(Player_DeadMotion_Check == true && CurFrame == 12)
		{
			sound_Player_Dead.stop();
		}

		if(Player_DeadMotion_Check == true && CurFrame == EndFrame)
		{
			Player_Dead.animations.stop('PY_Bavarian_Dead_Ani', true);
			Plyaer_DeadEffect_Check = true;
		}
	}
}

function player_Effect_Regen()
{
	if(Plyaer_DeadEffect_Check == true)
	{
		//Player Dead Timer Start
		Player_DeadTimer.start();
	}
	else if(Plyaer_DeadEffect_Check == false)
	{
		//Player Dead Timer Stop
		Player_DeadTime_Total = 0;
	}

	if(Player_Regen_Check == true && Plyaer_DeadEffect_Check == true)
	{
		Player_Dead.visible = false;

		MoveCheck = false;
		StandCheck = false;
		Player_AniCheck = false;
		Player_AttackCheck = false;
		Player_DeadCheck = false;
		Player_DeadMotion_Check = false;

		health = maxHealth;

		if(Player_DeadTime_Total > 5)
		{
			//Player Revive
			if(Player_CreateCheck == false)
			{
				//Sound
				if(stageOne_Check == true)
				{
					sound_Stage1Bgm.play();	
				}
				else if(stageTwo_Check == true)
				{
					sound_Stage2Bgm.play();
				}
				else if(stageThree_Check == true)
				{
					sound_Stage3Bgm.play();	
				}
				
				sound_Player_DeadBgm.stop();

				player_Create();
				Player_ID.visible = true;
				Animation_Change(Direction, 'Stand');

				Player_CreateCheck = true;
			}

			//Gray Filter
			gray_Scale.visible = false;

			//Dead Alert
			dead_Alert.visible = false;
			dead_Alert.alpha = 0.1;
		}
		else if(Player_DeadTime_Total < 5)
		{
			//Sound
			if(Player_DeadTime_Total == 0)
			{
				//Sound
				if(stageOne_Check == true)
				{
					sound_Stage1Bgm.stop();
				}
				else if(stageTwo_Check == true)
				{
					sound_Stage2Bgm.stop();
				}
				else if(stageThree_Check == true)
				{
					sound_Stage3Bgm.stop();
				}
				
				sound_Player_DeadBgm.play();	
			}		
			
			//Gray Filter
			gray_Scale.visible = true;

			//Dead Alert
			dead_Alert.visible = true;

			if(dead_Alert.alpha >= 1.0)
			{
				dead_Alert.alpha = 1.0;
				return;
			}

			dead_Alert.alpha += 0.05;
		}

		if(Player_CreateCheck == true)
		{
			Player_Revival.visible = true;
			Player_Revival.animations.play('PY_Bavarian_Revival', 10, true);

			var CurFrame = Player_Revival.animations.frame;
			var EndFrame = 19;

			if(CurFrame == 2)
			{
				//Sound
				sound_Player_Revive.play();
			}

			if(CurFrame == EndFrame)
			{
				//Sound
				sound_Player_Revive.stop();

				Player_Revival.visible = false;
				Player_Revival.animations.stop('PY_Bavarian_Revival', true);

				Player_Regen_Check = false;
				Player_CreateCheck = false;
				Plyaer_DeadEffect_Check = false;
			}
		}
	}
}

function player_LevelUp_Effect()
{
	if(Player_levelUp_Check == true && level < 10)
	{
		Player_LevelUp_Effect.visible = true;
		Player_LevelUp_Effect.animations.play('PY_LevelUp_Effect_Ani', 10, true);

		var CurFrame = Player_LevelUp_Effect.animations.frame;
		var EndFrame = 12;		

		if(CurFrame == EndFrame)
		{
			//Sound
			sound_LevelUp_Effect.play();

			Player_levelUp_Check = false;
			Player_LevelUp_Effect.visible = false;
			Player_LevelUp_Effect.animations.stop('PY_LevelUp_Effect_Ani', true);
		}
	}
	else
	{
		Player_LevelUp_Effect.visible = false;
	}
}

function player_Effect_Update()
{
	Player_Dead.x = Player.x;
	Player_Dead.y = Player.y - 50;
	Player_Revival.x = Player.x;
	Player_Revival.y = Player.y;
	Player_LevelUp_Effect.x = Player.x;
 	Player_LevelUp_Effect.y = Player.y;

	player_Effect_Dead();
	player_Effect_Regen();
	player_LevelUp_Effect();
}
