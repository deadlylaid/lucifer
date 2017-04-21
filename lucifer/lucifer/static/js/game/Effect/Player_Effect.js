//Player Effect
//-------------------------------------------------------------------------------------
var Player_Dead, Player_Revival;
var Player_DeadCheck = false, Player_DeadMotion_Check = false, Player_Regen_Check = false;
var Player_DeadKey;
//-------------------------------------------------------------------------------------

function player_Effect_Preload()
{
	Lucifer_Game.load.spritesheet('PY_Bavarian_Dead', 
								  	  '../../static/images/game/Player/Bavarian/dead/dead.png', 200, 280);
	Lucifer_Game.load.spritesheet('PY_Bavarian_Revival', 
								  	  '../../static/images/game/Player/Bavarian/revival/revival.png', 128, 211);
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
	Player_Dead.animations.add('PY_Bavarian_Dead',
							   [	
							   	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
							   	  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
							   	  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
							   	  31, 32, 33, 34, 35
							   ], 60, true);
	Player_Dead.animations.play('PY_Bavarian_Dead', 10, true);

	//Revival
	Player_Revival.animations.add('PY_Bavarian_Revival',
								  [
								  	 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
								  	 11, 12, 13, 14, 15, 16, 17, 18, 19
								  ], 60, true);
	Player_Revival.animations.play('PY_Bavarian_Revival', 10, true);

	Player_DeadKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.SIX);
	Player_DeadKey.onDown.add(Player_Kill, Lucifer_Game);
	Lucifer_Game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SIX);
}

function Player_Kill()
{
	health = -100;
}

function player_Effect_Dead()
{	
	if(health < 0)
	{
		Player_DeadCheck = true;
		Player.kill();
		Player_ID.visible = false;
	}

	if(Player_DeadCheck == true)
	{
		if(Player_DeadMotion_Check == false)
		{
			Player_Dead.visible = true;			
			Player_Dead.animations.play('PY_Bavarian_Dead', 10, true);
			Player_DeadMotion_Check = true;
		}

		var CurFrame = Player_Dead.animations.frame;
		var EndFrame = 35;

		if(Player_DeadMotion_Check == true && CurFrame == EndFrame)
		{	
			//이부분 이 잘 안됨.
			if(stageOne_Check == true)
			{
				Player.x = 875;
				Player.y = 1637;					
			}
			else if(stageTwo_Check == true)
			{
				Player.x = 3426;
				Player.y = 4289;
			}
			else if(stageThree_Check == true)
			{
				Player.x = 879;
				Player.y = 2193;
			}

			Player_Dead.animations.stop('PY_Bavarian_Dead', true);
			Player_Regen_Check = true;			
		}		
	}
}

function player_Effect_Regen()
{
	if(Player_Regen_Check == true)
	{
		Player_Dead.visible = false;
		Player_Revival.visible = true;
		Player_Revival.animations.play('PY_Bavarian_Revival', 10, true);

		//Player Revive
		Player.revive();
		Player_ID.visible = true;

		MoveCheck = false;
		StandCheck = false;
		Player_AttackCheck = false;
		Player_DeadCheck = false;	
		Player_DeadMotion_Check = false;	

		health = maxHealth;		

		var CurFrame = Player_Revival.animations.frame;
		var EndFrame = 19;

		if(CurFrame == EndFrame)
		{			
			Player_Regen_Check = false;
			Player_Revival.visible = false;

			Player_Revival.animations.stop('PY_Bavarian_Revival', true);
			Animation_Change(Direction, 'Stand');
		}			
	}
}

function player_Effect_Update()
{
	Player_Dead.x = Player.x;
	Player_Dead.y = Player.y;
	Player_Revival.x = Player.x;
	Player_Revival.y = Player.y;

	player_Effect_Dead();
	player_Effect_Regen();
}