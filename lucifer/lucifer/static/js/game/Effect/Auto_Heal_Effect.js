//Auto Heal Effect
//------------------------------------------------------------------------------
var auto_Heal_Effect, auto_Heal_Timer, auto_Heal_TimeTotal = 0;
var auto_Heal_StartTimer, auto_Heal_StartTime_Total = 0;
var auto_Heal_Check = false, auto_Heal_AniCheck = false;
//------------------------------------------------------------------------------

function auto_Heal_Preload()
{
	Lucifer_Game.load.spritesheet('Auto_Heal',
								  '../../static/images/game/Effect/Item_Effect/Item_Effect.png',
								  72, 122);
}

function auto_Heal_Create()
{
	auto_Heal_Effect = Lucifer_Game.add.sprite(Player.x, Player.y, 'Auto_Heal');
	auto_Heal_Effect.anchor.setTo(0.5, 0.5);
	auto_Heal_Effect.visible = false;
	auto_Heal_Effect.blendMode = Phaser.blendModes.ADD;

	auto_Heal_Effect.animations.add('Auto_Heal_Ani',
								    [
								       0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
								   	   10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
								   	   20, 21, 22, 23, 24
								    ], 60, true);
	auto_Heal_Effect.animations.play('Auto_Heal_Ani', 10, true);

	auto_Heal_Timer = Lucifer_Game.time.create(false);
	auto_Heal_Timer.loop(1000, auto_Heal_Time, Lucifer_Game);

	auto_Heal_StartTimer = Lucifer_Game.time.create(false);
	auto_Heal_StartTimer.loop(1000, auto_Heal_Start_Time, Lucifer_Game);
}

function auto_Heal_Time()
{
	++auto_Heal_TimeTotal;
}

function auto_Heal_Start_Time()
{
	++auto_Heal_StartTime_Total;
}

function auto_Heal_Update()
{
	auto_Heal_Effect.x = Player.x;
	auto_Heal_Effect.y = Player.y;

	if(Player.animations.name == 'PY_Bavarian_Stand_' + Direction)
	{
		auto_Heal_Check = true;
	}
	else
	{
		auto_Heal_Check = false;
		auto_Heal_AniCheck = false;
		auto_Heal_Effect.visible = false;
		auto_Heal_Effect.animations.stop('Auto_Heal_Ani', true);

		auto_Heal_StartTime_Total = 0;
		auto_Heal_TimeTotal = 0;
	}

	if(auto_Heal_Check == true)
	{
		auto_Heal_Timer.start();

		if(auto_Heal_TimeTotal > 10)
		{	
			if(auto_Heal_AniCheck == false)
			{
				auto_Heal_Effect.visible = true;
				auto_Heal_Effect.animations.play('Auto_Heal_Ani', 10, true);
				auto_Heal_AniCheck = true;	
			}			

			//Player Health Auto Heal
			auto_Heal_StartTimer.start();

			if(auto_Heal_StartTime_Total > 1)
			{
				health += 10;
				auto_Heal_StartTime_Total = 0;
			}
		}
	}

	if(health > maxHealth)
	{
		health = maxHealth;		
		auto_Heal_AniCheck = false;
		auto_Heal_Effect.visible = false;
		auto_Heal_Effect.animations.stop('Auto_Heal_Ani', true);

		auto_Heal_StartTime_Total = 0;
		auto_Heal_TimeTotal = 0;
	}
}