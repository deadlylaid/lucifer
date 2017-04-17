// Bavarian Skill
//***************************************************************************************
var skill_Bavarian, skill_Bavarian_Two, skill_Bavarian_Three;
var skill_Two_Rect, skill_Three_Rect, skill_intersects;
var skill_One_CoolTime, skill_Two_CoolTime, skill_Three_CoolTime;
var skill_One_Timer, skill_One_TimeTotal;
var skill_Two_Timer, skill_Two_TimeTotal;
var skill_Three_Timer, skill_Three_TimeTotal;
var skill_One_Check = false, skill_Two_Check = false, skill_Three_Check = false;
var skill_Three_Count = 0;
//***************************************************************************************
var skill_Icon_One, skill_Icon_Two, skill_Icon_Three;
//---------------------------------------------------------------------------------------

function skill_Preload()
{
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill.png', 131, 160);
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill2',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill2.png', 150, 100);
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill3',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill3.png', 117, 98);

    //Skill Icon
    Lucifer_Game.load.spritesheet('SK_Icon_Skill',
                                  '../../static/images/game/UI/SkillIcon/skill_Icon0.png', 31, 30);
    Lucifer_Game.load.spritesheet('SK_Icon_Skill2',
                                  '../../static/images/game/UI/SkillIcon/skill_Icon1.png', 31, 30);
    Lucifer_Game.load.spritesheet('SK_Icon_Skill3',
                                  '../../static/images/game/UI/SkillIcon/skill_Icon2.png', 31, 30);
}

function skill_Create()
{
	Lucifer_Game.renderer.setTexturePriority(['SK_Bavarian_Skill', 'SK_Bavarian_Skill2', 'SK_Bavarian_Skill3',
										      'SK_Icon_Skill', 'SK_Icon_Skill2', 'SK_Icon_Skill3']);
	
	//Skill - 1(버프)
	skill_Bavarian = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill');
	skill_Bavarian.anchor.setTo(0.5, 0.5);		
	skill_Bavarian.visible = false;
	skill_Bavarian.blendMode = Phaser.blendModes.ADD;
	skill_One_CoolTime = 3000;

    //Skill - 2(불꽃 스킬)
    skill_Bavarian_Two = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill2');
    skill_Bavarian_Two.anchor.setTo(0.5, 0.5);
    skill_Bavarian_Two.visible = false;
    skill_Bavarian_Two.blendMode = Phaser.blendModes.ADD;
    skill_Two_CoolTime = 3000;

    //Skill - 3(휠인더)
    skill_Bavarian_Three = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill3');
    skill_Bavarian_Three.anchor.setTo(0.5, 0.5);
    skill_Bavarian_Three.visible = false;
    skill_Bavarian_Three.blendMode = Phaser.blendModes.ADD;
    skill_Three_CoolTime = 3000;

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

    //Skill Icon
    //Skill - 1 Icon
    skill_Icon_One = Lucifer_Game.add.sprite(UI_UnderBar.x - 159, UI_UnderBar.y + 32, 'SK_Icon_Skill');
    skill_Icon_One.anchor.setTo(0.5, 0.5);  
    skill_Icon_One.fixedToCamera = true;     

    //Skill - 2 Icon
    skill_Icon_Two = Lucifer_Game.add.sprite(UI_UnderBar.x - 121, UI_UnderBar.y + 32, 'SK_Icon_Skill2');
    skill_Icon_Two.anchor.setTo(0.5, 0.5); 
    skill_Icon_Two.fixedToCamera = true;    

    //Skill - 3 Icon
    skill_Icon_Three = Lucifer_Game.add.sprite(UI_UnderBar.x - 83, UI_UnderBar.y + 32, 'SK_Icon_Skill3');
    skill_Icon_Three.anchor.setTo(0.5, 0.5);
    skill_Icon_Three.fixedToCamera = true;
    
	//Skill Rect
	//Skill - 2 Rect
	skill_Two_Rect = new Phaser.Rectangle(skill_Bavarian_Two.x, skill_Bavarian_Two.y, 150, 100);
	skill_Two_Rect.scale(1.6, 1.6);

	//Skill - 3 Rect
	skill_Three_Rect = new Phaser.Rectangle(skill_Bavarian_Three.x, skill_Bavarian_Three.y, 117, 98);


	//Skill Timer
	skill_One_Timer = Lucifer_Game.time.create(false);
	skill_One_Timer.loop(1000, skill_One_CoolTimer, this);
	skill_Two_Timer = Lucifer_Game.time.create(false);
	skill_Two_Timer.loop(1000, skill_Two_CoolTimer, this);
	skill_Three_Timer = Lucifer_Game.time.create(false);
	skill_Three_Timer.loop(1000, skill_Three_CoolTimer, this);
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

function skill_Three_Counting()
{
	if(skill_Bavarian_Three.frame == 7 && skill_Bavarian_Three.visible == true)
	{
		++skill_Three_Count;		
	}
}

function skill_Reset()
{
	if(skill_Bavarian.frame == 19 && skill_Bavarian.visible == true)
	{
		skill_Bavarian.animations.stop('SK_Bavarian_Ani', true);
		skill_Bavarian.visible = false;
		skill_Bavarian.frame = 0;

		Animation_Change(Direction, 'Stand');
	}	

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

		Animation_Change(Direction, 'Stand');
	}		
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

	//Skill Three Cool Time / 쿨타임 처리는 나중에.
	/*
	if(player_Ke)

	if(skill_Three_TimeTotal < skill_Three_CoolTime)
	{
		skill_Icon_Three.alpha = 1.0;

	}
	*/
	//console.log(skill_One_TimeTotal, skill_Two_TimeTotal);
}

function skill_Update()
{
	skill_Bavarian.x = Player.x;
	skill_Bavarian.y = Player.y;

	skill_Bavarian_Two.x = Player.x;
	skill_Bavarian_Two.y = Player.y + 30;

	skill_Bavarian_Three.x = Player.x;
	skill_Bavarian_Three.y = Player.y;

	//Rect
	skill_Two_Rect.x = skill_Bavarian_Two.x;
	skill_Two_Rect.y = skill_Bavarian_Two.y; 
	skill_Two_Rect.centerOn(skill_Bavarian_Two.x, skill_Bavarian_Two.y);

	skill_Three_Rect.x = skill_Bavarian_Three.x;
	skill_Three_Rect.y = skill_Bavarian_Three.y;
	skill_Three_Rect.centerOn(skill_Bavarian_Three.x, skill_Bavarian_Three.y);

	//Skill Count
	skill_Three_Counting();

	//Reset
	skill_Reset();

	//Cool Time
	skill_CoolTime();

	//Debug
	//skill_intersects = Phaser.Rectangle.intersection(skill_Two_Rect, golem_HitRect);
}

function skill_Debug_Render()
{
	Lucifer_Game.debug.geom(skill_Two_Rect, 'rgba(100, 100, 100, 0.4)');
	Lucifer_Game.debug.geom(skill_Three_Rect, 'rgba(100, 100, 100, 0.4)');
};
