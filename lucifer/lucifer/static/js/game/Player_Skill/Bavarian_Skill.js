var skill_Bavarian, skill_Bavarian_Two;
var skill_Two_Rect, skill_intersects;
var skill_One_CoolTime, skill_Two_CoolTime;
var skill_One_Timer, skill_One_TimeTotal = 4000;
var skill_Two_Timer, skill_Two_TimeTotal = 4000;
var skill_One_Check = false, skill_Two_Check = false;
//*************************************************
var skill_Icon_One, skill_Icon_Two;
//---------------------------------------------------------------------------------------

function skill_Preload()
{
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill.png', 131, 160);
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill2',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill2.png', 150, 100);

    //Skill Icon
    Lucifer_Game.load.spritesheet('SK_Icon_Skill',
                                  '../../static/images/game/UI/SkillIcon/skill_Icon0.png', 31, 30);
    Lucifer_Game.load.spritesheet('SK_Icon_Skill2',
                                  '../../static/images/game/UI/SkillIcon/skill_Icon1.png', 31, 30);
}

function skill_Create()
{
	//Skill - 1
	skill_Bavarian = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill');
	skill_Bavarian.anchor.setTo(0.5, 0.5);		
	skill_Bavarian.visible = false;
	skill_Bavarian.blendMode = Phaser.blendModes.ADD;
	skill_One_CoolTime = 3000;

    //Skill - 2
    skill_Bavarian_Two = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill2');
    skill_Bavarian_Two.anchor.setTo(0.5, 0.5);
    skill_Bavarian_Two.visible = false;
    skill_Bavarian_Two.blendMode = Phaser.blendModes.ADD;
    skill_Two_CoolTime = 3000;

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

    //Skill Icon
    skill_Icon_One = Lucifer_Game.add.sprite(UI_UnderBar.x - 159, UI_UnderBar.y + 32, 'SK_Icon_Skill');
    skill_Icon_One.anchor.setTo(0.5, 0.5);  
    skill_Icon_One.fixedToCamera = true;     

    skill_Icon_Two = Lucifer_Game.add.sprite(UI_UnderBar.x - 121, UI_UnderBar.y + 32, 'SK_Icon_Skill2');
    skill_Icon_Two.anchor.setTo(0.5, 0.5); 
    skill_Icon_Two.fixedToCamera = true;    
    
	//Skill Rect
	skill_Two_Rect = new Phaser.Rectangle(skill_Bavarian_Two.x, skill_Bavarian_Two.y, 150, 100);
	skill_Two_Rect.scale(1.6, 1.6);

	//Skill Timer
	skill_One_Timer = Lucifer_Game.time.create(false);
	skill_One_Timer.loop(1000, skill_One_CoolTimer, this);
	skill_Two_Timer = Lucifer_Game.time.create(false);
	skill_Two_Timer.loop(1000, skill_Two_CoolTimer, this);
}

function skill_One_CoolTimer()
{
	skill_One_TimeTotal += 1000;
}

function skill_Two_CoolTimer()
{
	skill_Two_TimeTotal += 1000;
}

function skill_Attack()
{	
	if(skill_Bavarian_Two.visible == true)
	{
		for(var i = 0; i < golem_Group.length; ++i)
		{
			var Golem = golem_Group.getChildAt(i);

			if(Phaser.Rectangle.intersects(skill_Two_Rect, Golem.golem_HitRect))
			{
		       	Golem.golem_Hp -= 10;						
			}
		}		
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

	//console.log(skill_One_TimeTotal, skill_Two_TimeTotal);
}

function skill_Update()
{
	skill_Bavarian.x = Player.x;
	skill_Bavarian.y = Player.y;
	skill_Bavarian_Two.x = Player.x;
	skill_Bavarian_Two.y = Player.y + 30;

	//Rect
	skill_Two_Rect.x = skill_Bavarian_Two.x;
	skill_Two_Rect.y = skill_Bavarian_Two.y; 
	skill_Two_Rect.centerOn(skill_Bavarian_Two.x, skill_Bavarian_Two.y);

	//Attack
	skill_Attack();

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
	//Lucifer_Game.debug.geom(skill_intersects, 'rgba(255, 0, 0, 1)');
};
