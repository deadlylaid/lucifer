// Bavarian Skill
//***************************************************************************************
var skill_Bavarian, skill_Bavarian_Two, skill_Bavarian_Three; 
var skill_Bavarian_Four, skill_Bavarian_Four_Effect, skill_Bavarian_Five;
//***************************************************************************************
var skill_Two_Rect, skill_Three_Rect, skill_FourEffect_Rect, skill_Five_Rect, skill_intersects;
//***************************************************************************************
var skill_One_CoolTime, skill_Two_CoolTime, skill_Three_CoolTime, skill_Four_CoolTime;
var skill_Five_CoolTime;
//***************************************************************************************
var skill_One_Timer, skill_One_TimeTotal, skill_Two_Timer, skill_Two_TimeTotal;
var skill_Three_Timer, skill_Three_TimeTotal, skill_Four_Timer, skill_Four_TimeTotal;
var skill_Five_timer, skill_Five_TimeTotal;
//***************************************************************************************
var skill_One_Check = false, skill_Two_Check = false, skill_Three_Check = false, skill_Four_Check = false;
var skill_Four_EffectCheck = false, skill_Five_Check = false;
//***************************************************************************************
var skill_Three_Count = 0, skill_Four_Count = 0, skill_Five_Count = 0;
//***************************************************************************************
var skill_Icon_One, skill_Icon_Two, skill_Icon_Three, skill_Icon_Four, skill_Icon_Five;
//---------------------------------------------------------------------------------------

function skill_Preload()
{
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill.png', 131, 160);
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill2',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill2.png', 150, 100);
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill3',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill3.png', 117, 98);
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill4',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill4.png', 164, 144);
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill4_Effect',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill4_Effect.png', 65, 71);
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill5',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill5.png', 200, 200);

    //Skill Icon
    Lucifer_Game.load.spritesheet('SK_Icon_Skill',
                                  '../../static/images/game/UI/SkillIcon/skill_Icon0.png', 33, 33);
    Lucifer_Game.load.spritesheet('SK_Icon_Skill2',
                                  '../../static/images/game/UI/SkillIcon/skill_Icon1.png', 33, 33);
    Lucifer_Game.load.spritesheet('SK_Icon_Skill3',
                                  '../../static/images/game/UI/SkillIcon/skill_Icon2.png', 33, 33);
	Lucifer_Game.load.spritesheet('SK_Icon_Skill4',
                                  '../../static/images/game/UI/SkillIcon/skill_Icon3.png', 33, 33);
	Lucifer_Game.load.spritesheet('SK_Icon_Skill5',
                                  '../../static/images/game/UI/SkillIcon/skill_Icon4.png', 33, 33);
}

function skill_Create()
{
	Lucifer_Game.renderer.setTexturePriority(['SK_Bavarian_Skill', 'SK_Bavarian_Skill2', 'SK_Bavarian_Skill3',
										      'SK_Bavarian_Skill4', 'SK_Bavarian_Skill5', 'SK_Icon_Skill', 
										      'SK_Icon_Skill2', 'SK_Icon_Skill3', 'SK_Icon_Skill4',
										      'SK_Icon_Skill5']);
	
	//Skill - 1(버프)
	skill_Bavarian = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill');
	skill_Bavarian.anchor.setTo(0.5, 0.5);		
	skill_Bavarian.visible = false;
	skill_Bavarian.blendMode = Phaser.blendModes.ADD;
	skill_One_CoolTime = 60000;

    //Skill - 2(불꽃 스킬)
    skill_Bavarian_Two = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill2');
    skill_Bavarian_Two.anchor.setTo(0.5, 0.5);
    skill_Bavarian_Two.visible = false;
    skill_Bavarian_Two.blendMode = Phaser.blendModes.ADD;
    skill_Two_CoolTime = 7000;

    //Skill - 3(휠인더)
    skill_Bavarian_Three = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill3');
    skill_Bavarian_Three.anchor.setTo(0.5, 0.5);
    skill_Bavarian_Three.visible = false;
    skill_Bavarian_Three.blendMode = Phaser.blendModes.ADD;
    skill_Three_CoolTime = 10000;

    //Skill - 4(전기 공격)
    skill_Bavarian_Four = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill4');
    skill_Bavarian_Four.anchor.setTo(0.5, 0.5);
    skill_Bavarian_Four.visible = false;
    skill_Bavarian_Four.blendMode = Phaser.blendModes.ADD;
    skill_Four_CoolTime = 15000;

    //Skill - 5(칼날 공격)
    skill_Bavarian_Five = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill5');
    skill_Bavarian_Five.scale.setTo(1.5, 1.5);
    skill_Bavarian_Five.anchor.setTo(0.5, 0.5);
    skill_Bavarian_Five.visible = false;
    skill_Bavarian_Five.blendMode = Phaser.blendModes.ADD;
    skill_Five_CoolTime = 20000; 

   	skill_Bavarian_Four_Effect = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill4_Effect');
   	skill_Bavarian_Four_Effect.anchor.setTo(0.5, 0.5);
   	skill_Bavarian_Four_Effect.visible = false;
   	skill_Bavarian_Four_Effect.blendMode = Phaser.blendModes.ADD;

	//Skill - 1 Animation
	skill_Bavarian.animations.add('SK_Bavarian_Ani', 
								  [
								 	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
									11, 12, 13, 14, 15, 16, 17, 18, 19
								  ]
								  , 60, true);	

	skill_Bavarian.animations.play('SK_Bavarian_Ani', 20, true);	

	//Skill - 2 Animation	
	skill_Bavarian_Two.animations.add('SK_Bavarian_Ani2', 
									  [
									  	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
									  ],
									  60, true);	
	skill_Bavarian_Two.animations.play('SK_Bavarian_Ani2', 20, true);
	skill_Bavarian_Two.scale.setTo(2, 2);

	//Skill - 3 Animation
	skill_Bavarian_Three.animations.add('SK_Bavarian_Ani3', 
										[
											0,  1,  2,  3,  4,  5,  6,  7											
										], 60, true);
	skill_Bavarian_Three.animations.play('SK_Bavarian_Ani3', 20, true);

	//Skill - 4 Animation
	skill_Bavarian_Four.animations.add('SK_Bavarian_Ani4',
									    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 60, true);
	skill_Bavarian_Four.animations.play('SK_Bavarian_Ani4', 20, true);

	skill_Bavarian_Four_Effect.animations.add('SK_Bavarian_Effect4',
											   [
											   	 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
												 11, 12, 13, 14, 15, 16, 17, 18, 19
											   ], 60, true);
	skill_Bavarian_Four_Effect.animations.play('SK_Bavarian_Effect4', 20, true);

	//Skill - 5 Animation
	skill_Bavarian_Five.animations.add('SK_Bavarian_Ani5',
									   [
									   	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
									   	  11, 12, 13, 14, 15, 16, 17, 18, 19, 
									   	  20, 21, 22, 23, 24, 25, 26, 27, 28,
									   	  29, 30, 31
									   ], 60, true);
	skill_Bavarian_Five.animations.play('SK_Bavarian_Ani5', 20, true);

    //Skill Icon
    //Skill - 1 Icon
    skill_Icon_One = Lucifer_Game.add.sprite(UI_UnderBar.x - 170, UI_UnderBar.y + 44, 'SK_Icon_Skill');
    skill_Icon_One.anchor.setTo(0.5, 0.5);  
    skill_Icon_One.fixedToCamera = true;     

    //Skill - 2 Icon
    skill_Icon_Two = Lucifer_Game.add.sprite(UI_UnderBar.x - 130, UI_UnderBar.y + 44, 'SK_Icon_Skill2');
    skill_Icon_Two.anchor.setTo(0.5, 0.5); 
    skill_Icon_Two.fixedToCamera = true;    

    //Skill - 3 Icon
    skill_Icon_Three = Lucifer_Game.add.sprite(UI_UnderBar.x - 90, UI_UnderBar.y + 44, 'SK_Icon_Skill3');
    skill_Icon_Three.anchor.setTo(0.5, 0.5);
    skill_Icon_Three.fixedToCamera = true;

    //Skill - 4 Icon
    skill_Icon_Four = Lucifer_Game.add.sprite(UI_UnderBar.x - 50, UI_UnderBar.y + 44, 'SK_Icon_Skill4');
    skill_Icon_Four.anchor.setTo(0.5, 0.5);
    skill_Icon_Four.fixedToCamera = true;

    //Skill - 5 Icon
    skill_Icon_Five = Lucifer_Game.add.sprite(UI_UnderBar.x - 10, UI_UnderBar.y + 44, 'SK_Icon_Skill5');
    skill_Icon_Five.anchor.setTo(0.5, 0.5);
    skill_Icon_Five.fixedToCamera = true;
    
	//Skill Rect
	//Skill - 2 Rect
	skill_Two_Rect = new Phaser.Rectangle(skill_Bavarian_Two.x, skill_Bavarian_Two.y, 150, 100);
	skill_Two_Rect.scale(1.6, 1.6);

	//Skill - 3 Rect
	skill_Three_Rect = new Phaser.Rectangle(skill_Bavarian_Three.x, skill_Bavarian_Three.y, 117, 98);

	//Skill - 4 Rect
	skill_FourEffect_Rect = new Phaser.Rectangle(skill_Bavarian_Four_Effect.x, skill_Bavarian_Four_Effect.y, 65, 71);

	//Skill - 5 Rect
	skill_Five_Rect = new Phaser.Rectangle(skill_Bavarian_Five.x, skill_Bavarian_Five.y, 150 * 1.5, 150 * 1.5);

	//Skill Timer
	skill_One_Timer = Lucifer_Game.time.create(false);
	skill_One_Timer.loop(1000, skill_One_CoolTimer, this);

	skill_Two_Timer = Lucifer_Game.time.create(false);
	skill_Two_Timer.loop(1000, skill_Two_CoolTimer, this);

	skill_Three_Timer = Lucifer_Game.time.create(false);
	skill_Three_Timer.loop(1000, skill_Three_CoolTimer, this);

	skill_Four_Timer = Lucifer_Game.time.create(false);
	skill_Four_Timer.loop(1000, skill_Four_CoolTimer, this);

	skill_Five_Timer = Lucifer_Game.time.create(false);
	skill_Five_Timer.loop(1000, skill_Five_CoolTimer, this);
}

function skill_One_CoolTimer()
{
	skill_One_TimeTotal += 1000;
}

function skill_Two_CoolTimer()
{
	skill_Two_TimeTotal += 1000;
}

function skill_Three_CoolTimer()
{
	skill_Three_TimeTotal += 1000;
}

function skill_Four_CoolTimer()
{
	skill_Four_TimeTotal += 1000;
}

function skill_Five_CoolTimer()
{
	skill_Five_TimeTotal += 1000;
}

function skill_Three_Counting()
{
	if(skill_Bavarian_Three.frame == 7 && skill_Bavarian_Three.visible == true)
	{
		++skill_Three_Count;		
	}
}

function skill_Four_Counting()
{
	if(skill_Four_EffectCheck == true)
	{
		++skill_Four_Count;		
	}	
}

function skill_Five_Counting()
{
	if(skill_Bavarian_Five.frame == 31 && skill_Bavarian_Five.visible == true)
	{
		++skill_Five_Count;
	}
}

function skill_Reset()
{
	//Skill One
	if(skill_Bavarian.frame == 19 && skill_Bavarian.visible == true)
	{
		skill_Bavarian.animations.stop('SK_Bavarian_Ani', true);
		skill_Bavarian.visible = false;
		skill_Bavarian.frame = 0;

		Animation_Change(Direction, 'Stand');
	}	

	//Skill Two
	if(skill_Bavarian_Two.frame == 14 && skill_Bavarian_Two.visible == true)
	{
		skill_Bavarian_Two.animations.stop('SK_Bavarian_Ani2', true);
		skill_Bavarian_Two.visible = false;
		skill_Bavarian_Two.frame = 0;

		Animation_Change(Direction, 'Stand');
	}	

	//Skill Three Count : 흴인더 스킬의 지속 정도 값.
	if(skill_Three_Count > 14 && skill_Bavarian_Three.visible == true)
	{
		skill_Bavarian_Three.animations.stop('SK_Bavarian_Ani3', true);
		skill_Bavarian_Three.visible = false;
		skill_Bavarian_Three.frame = 0;
		skill_Three_Count = 0;

		Animation_Change(Direction, 'Stand');
	}		

	//Skill Four
	if(skill_Bavarian_Four.frame == 9 && skill_Bavarian_Four.visible == true)
	{
		skill_Bavarian_Four.animations.stop('SK_Bavarian_Ani4', true);
		skill_Bavarian_Four.visible = false;
		skill_Bavarian_Four.frame = 0;		

		Animation_Change(Direction, 'Stand');

		//Effect Start
		skill_Four_EffectCheck = true;		
	}

	//Skill Four Effect
	if(skill_Four_EffectCheck == true && skill_Four_Count > 800)
	{
		skill_Bavarian_Four_Effect.animations.stop('SK_Bavarian_Effect4', true);
		skill_Bavarian_Four_Effect.visible = false;
		skill_Bavarian_Four_Effect.frame = 0;
		skill_Four_Count = 0;

		skill_Four_EffectCheck = false;		
	}

	//Skill Five 
	if(skill_Five_Count > 14 && skill_Bavarian_Five.visible == true)
	{
		skill_Bavarian_Five.animations.stop('SK_Bavarian_Ani5', true);
		skill_Bavarian_Five.visible = false;
		skill_Bavarian_Five.frame = 0;
		skill_Five_Count = 0;
		
		Animation_Change(Direction, 'Stand');	
	}

	//console.log(skill_Bavarian_Four_Effect.visible);
	//console.log(skill_Bavarian_Four_Effect.x, skill_Bavarian_Four_Effect.y);
	//console.log(skill_Four_EffectCheck);
}

function skill_CoolTime()
{
	//Skill One Cool Time
	if(player_KeySkill.isDown == true)
	{
		skill_One_Timer.start();

		if(skill_One_Check == false)
		{
			skill_One_TimeTotal = 0;		
		}
	}

	if(skill_One_TimeTotal < skill_One_CoolTime)
	{
		skill_Icon_One.alpha = 0.5;	
		skill_One_Check = true;			//첫번째 스킬 coolTime 체크
	}
	else if(skill_One_TimeTotal > skill_One_CoolTime)
	{
		skill_Icon_One.alpha = 1.0;		
		skill_One_Check = false;		//첫번째 스킬 coolTime 체크
	}

	//Skill Two Cool Time
	if(player_KeySkill2.isDown == true)
	{
		skill_Two_Timer.start();

		if(skill_Two_Check == false)
		{
			skill_Two_TimeTotal = 0;
		}			
	}

	if(skill_Two_TimeTotal < skill_Two_CoolTime)
	{
		skill_Icon_Two.alpha = 0.5;
		skill_Two_Check = true;			//두번째 스킬 coolTime 체크
	}	
	else if(skill_Two_TimeTotal > skill_Two_CoolTime)
	{
		skill_Icon_Two.alpha = 1.0;		
		skill_Two_Check = false;		//두번째 스킬 coolTime 체크
	}

	//Skill Three Cool Time 
	if(player_KeySkill3.isDown == true)
	{
		skill_Three_Timer.start();
		
		if(skill_Three_Check == false)
		{
			skill_Three_TimeTotal = 0;
		}	
	}

	if(skill_Three_TimeTotal < skill_Three_CoolTime)
	{
		skill_Icon_Three.alpha = 0.5;
		skill_Three_Check = true;
	}
	else if(skill_Three_TimeTotal > skill_Three_CoolTime)
	{
		skill_Icon_Three.alpha = 1.0;
		skill_Three_Check = false;	
	}	

	//Skill Four Cool Time
	if(player_KeySkill4.isDown == true)
	{
		skill_Four_Timer.start();

		if(skill_Four_Check == false)
		{
			skill_Four_TimeTotal = 0;
		}
	}

	if(skill_Four_TimeTotal < skill_Four_CoolTime)
	{
		skill_Icon_Four.alpha = 0.5;
		skill_Four_Check = true;
	}
	else if(skill_Four_TimeTotal > skill_Four_CoolTime)
	{
		skill_Icon_Four.alpha = 1.0;
		skill_Four_Check = false;
	}

	//Skill Five Cool Time
	if(player_KeySkill5.isDown == true)
	{
		skill_Five_Timer.start();

		if(skill_Five_Check == false)
		{
			skill_Five_TimeTotal = 0;			
		}
	}

	if(skill_Five_TimeTotal < skill_Five_CoolTime)
	{
		skill_Icon_Five.alpha = 0.5;
		skill_Five_Check = true;
	}
	else if(skill_Five_TimeTotal > skill_Five_CoolTime)
	{
		skill_Icon_Five.alpha = 1.0;
		skill_Five_Check = false;
	}
}

function skill4_Effect()
{
	if(skill_Four_EffectCheck == true)
	{
		skill_Bavarian_Four_Effect.visible = true;
		skill_Bavarian_Four_Effect.animations.play('SK_Bavarian_Effect4', 20, true);								
	}	
}

function skill_Update()
{
	skill_Bavarian.x = Player.x;
	skill_Bavarian.y = Player.y;

	skill_Bavarian_Two.x = Player.x;
	skill_Bavarian_Two.y = Player.y + 30;

	skill_Bavarian_Three.x = Player.x;
	skill_Bavarian_Three.y = Player.y;

	skill_Bavarian_Four.x = Player.x;
	skill_Bavarian_Four.y = Player.y;

	skill_Bavarian_Five.x = Player.x;
	skill_Bavarian_Five.y = Player.y + 30;

	//Rect
	skill_Two_Rect.x = skill_Bavarian_Two.x;
	skill_Two_Rect.y = skill_Bavarian_Two.y; 
	skill_Two_Rect.centerOn(skill_Bavarian_Two.x, skill_Bavarian_Two.y);

	skill_Three_Rect.x = skill_Bavarian_Three.x;
	skill_Three_Rect.y = skill_Bavarian_Three.y;
	skill_Three_Rect.centerOn(skill_Bavarian_Three.x, skill_Bavarian_Three.y);

	skill_FourEffect_Rect.x = skill_Bavarian_Four_Effect.x;
	skill_FourEffect_Rect.y = skill_Bavarian_Four_Effect.y;
	skill_FourEffect_Rect.centerOn(skill_Bavarian_Four_Effect.x, skill_Bavarian_Four_Effect.y);

	skill_Five_Rect.x = skill_Bavarian_Five.x;
	skill_Five_Rect.y = skill_Bavarian_Five.y;
	skill_Five_Rect.centerOn(skill_Bavarian_Five.x, skill_Bavarian_Five.y);

	//Skill Count
	skill_Three_Counting();
	skill_Four_Counting();	
	skill_Five_Counting();

	//Skill Effect
	skill4_Effect();

	//Reset
	skill_Reset();

	//Cool Time
	skill_CoolTime();	
}

function skill_Debug_Render()
{
	//Lucifer_Game.debug.geom(skill_Two_Rect, 'rgba(100, 100, 100, 0.4)');
	//Lucifer_Game.debug.geom(skill_Three_Rect, 'rgba(100, 100, 100, 0.4)');
	Lucifer_Game.debug.geom(skill_Five_Rect, 'rgba(100, 100, 100, 0.4)');
};
