//Council
//------------------------------------------------------------------------------
var council_Group, council_Object;
//------------------------------------------------------------------------------

//Council
Council = function(game, x, y, Hp, MaxHp, CognizeRange, AttackRange)
{
	Phaser.Sprite.call(this, game, x, y, 'MON_Council_Dead');
	this.Hp = Hp, this.MaxHp = MaxHp;
	this.CognizeRange = CognizeRange, this.AttackRange = AttackRange;

	//Status
	this.Status = new Array('Stand', 'Run', 'Attack', 'Dead', 'Skill');

	//Position
	this.PointX = x, this.PointY = y, this.ReturnPointX = x, this.ReturnPointY = y;

	//UI
	this.HpBar, this.HpMask, this.Name;

	//Rect
	this.HitRect, this.AttackRect;

	//Time
	this.Attack_DelayTimer, this.DelayTime_Total = 1;
	this.Skill_DelayTimer, this.Skill_Time_Total = 1;

	//Direction
	this.Distance, this.Angle, this.PreDirection, this.Direction;

	//Return Direction
	this.ReturnDistance, this.ReturnDirection, this.ReturnAngle;

	//Motion Check
	this.AI_StartCheck = false, this.MoveCheck = false, this.StandCheck = false;
	this.AttackCheck = false, this.CompareCheck = false, this.DamageCheck = false;
	this.DeadCheck = false,	this.DeadMotionCheck = false, this.ReturnCheck = false;

	//Light
	this.Skill_Light, this.Skill_Rect;

	//Attack Pattern 
	this.Pattern_Timer, this.Pattern_Time_Total = 0;
	this.Pattern_Nomal_Check = false, this.Pattern_Skill_Check = false;
	this.Pattern_Change_Value = 2;

	//Regen Time
	this.Regen_Timer, this.Regen_Time_Total = 0, this.Regen_Time = 10, this.Regen_Check = false;

	//Level System
	this.ExpCheck = false, this.ExpTimer, this.ExpTime_Total = 1;
}

Council.prototype = Object.create(Phaser.Sprite.prototype);
Council.prototype.constructor = Council;

//Preload / Create / Clone
//------------------------------------------------------------------------------
function council_Preload()
{
	Lucifer_Game.load.spritesheet('MON_Council_Stand',
								  '../../static/images/game/Monster/CouncilMember/stand/stand.png',
								  65, 93);
	Lucifer_Game.load.spritesheet('MON_Council_Run',
								  '../../static/images/game/Monster/CouncilMember/run/run.png',
								  97, 109);
	Lucifer_Game.load.spritesheet('MON_Council_Attack',
								  '../../static/images/game/Monster/CouncilMember/attack/attack.png',
								  115, 103);
	Lucifer_Game.load.spritesheet('MON_Council_Dead',
								  '../../static/images/game/Monster/CouncilMember/death/death.png',
								  154, 129);
	Lucifer_Game.load.spritesheet('MON_Council_Skill',
								  '../../static/images/game/Monster/CouncilMember/skill/skill.png',
								  89, 127);
	Lucifer_Game.load.spritesheet('Council_Light',
								  '../../static/images/game/Monster_Skill/Council_Light.png',
								  200, 200);
}

function council_Create()
{
	Lucifer_Game.renderer.setTexturePriority(['MON_Council_Stand', 'MON_Council_Run', 'MON_Council_Attack', 
		 									  'MON_Council_Dead', 'MON_Council_Skill', 'Council_Light']);

	council_Group = Lucifer_Game.add.group();
	
	council_Clone(2143, 2528);
	council_Clone(2381, 2316);
	council_Clone(2127, 2808);
	council_Clone(1658, 2517);
	council_Clone(5821, 906);
	council_Clone(6221, 873);
	council_Clone(6141, 1149);
}

function council_Clone(PointX, PointY)
{
	council_Object = new Council(Lucifer_Game, PointX, PointY, 100, 100, 300, 100);

	Lucifer_Game.physics.p2.enable(council_Object);
	council_Object.body.fixedRotation = true;
	council_Object.body.clearShapes();
	council_Object.body.addRectangle(60, 60, 0, 0);
	council_Object.body.debug = false;	
	council_Object.body.restitution = 0;

	//Animation
	//Stand
	var index = 0;
	for(var i = 0; i < 8; ++i)
	{
		council_Object.animations.add('MON_Council_Stand_' + i,
									 [
									 	index, index + 1, index + 2, index + 3, index + 4,
									 	index + 5, index + 6
									 ], 60, true);		
		index += 7;		
	}	

	//Run
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		council_Object.animations.add('MON_Council_Run_' + i,
									 [
									 	index, index + 1, index + 2, index + 3, index + 4,
									 	index + 5, index + 6, index + 7, index + 8, index + 9,
									 	index + 10
									 ], 60, true);

		index += 11;
	}
	

	//Attack
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		council_Object.animations.add('MON_Council_Attack_' + i,
									 [
									 	index,      index + 1,  index + 2,  index + 3,  index + 4,
									 	index + 5,  index + 6,  index + 7,  index + 8,  index + 9									 	
									 ], 60, true);
		index += 10;
	}

	//Dead
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		council_Object.animations.add('MON_Council_Dead_' + i,
									[
									   index,      index + 1,  index + 2,  index + 3,  index + 4,
									   index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									   index + 10, index + 11, index + 12, index + 13, index + 14,
									   index + 15, index + 16, index + 17, index + 18	
									], 60, true);	
		index += 19;	
	}

	//Skill
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		council_Object.animations.add('MON_Council_Skill_' + i,
									[
									   index,      index + 1,  index + 2,  index + 3,  index + 4,
									   index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									   index + 10, index + 11, index + 12, index + 13 
									], 60, true);	
		index += 14;
	}

	council_Object.loadTexture('MON_Council_Stand', 0, true);
	council_Object.animations.play('MON_Council_Stand_0', 10, true);
	council_Object.anchor.setTo(0.5, 0.5);

	Lucifer_Game.physics.enable(council_Object, Phaser.Physics.ARCADE);
	Lucifer_Game.add.existing(council_Object);

	//Hp Bar
	council_Object.HpBar = council_Object.addChild(Lucifer_Game.make.sprite(0, -100, 'monsterHealthBar'));
	council_Object.HpBar.anchor.set(0.5, 0.5);
	council_Object.HpBar.visible = false;

	//Hp Mask
	council_Object.HpMask = council_Object.addChild(Lucifer_Game.add.graphics(0, -100));
	council_Object.HpMask.beginFill(0xffffff);

	//Name
	council_Object.Name = Lucifer_Game.add.text(council_Object.x, council_Object.y - 100, 'Council');
	council_Object.Name.anchor.set(0.5);
	council_Object.Name.align = 'center';
	council_Object.Name.font = 'Arial';
	council_Object.Name.fontSize = 13;
	council_Object.Name.fontWeight = 'normal';
	council_Object.Name.fill = '#19de65';
	council_Object.Name.visible = false;

	//Input mouse Over / Up
	council_Object.inputEnabled = true;
	council_Object.events.onInputOver.add(council_over, council_Object);
	council_Object.events.onInputOut.add(council_out, council_Object);

	//Rect
	council_Object.HitRect = new Phaser.Rectangle(council_Object.x, council_Object.y, 80, 80);
	council_Object.AttackRect = new Phaser.Rectangle(council_Object.x, council_Object.y, 90, 90);

	//Delay Timer
	council_Object.Attack_DelayTimer = Lucifer_Game.time.create(false);
	council_Object.Attack_DelayTimer.loop(1000, council_DelayTimer, Lucifer_Game, council_Object);

	//Skill
	council_Object.Skill_Light = Lucifer_Game.add.sprite(council_Object.x, council_Object.y, 'Council_Light');

	//Lucifer_Game.add.existing(council_Object.Skill_Light);
	council_Object.Skill_Light.blendMode = Phaser.blendModes.ADD;
	council_Object.Skill_Light.visible = false;
	council_Object.Skill_Light.anchor.setTo(0.5, 0.5);
	council_Object.Skill_Rect = new Phaser.Rectangle(council_Object.Skill_Light.x, council_Object.Skill_Light.y, 120, 120);
	
	//Skill Animation
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		council_Object.Skill_Light.animations.add('Council_Light_' + i, 
												   [
												   	  index,      index + 1,  index + 2,  index + 3, index + 4,
												   	  index + 5,  index + 6,  index + 7,  index + 8, index + 9,
												   	  index + 10, index + 11, index + 12, index + 13
												   ], 60, true);

		index += 14;
	}

	council_Object.Skill_DelayTimer = Lucifer_Game.time.create(false);
	council_Object.Skill_DelayTimer.loop(1000, council_SkillDelayTimer, Lucifer_Game, council_Object);

	//Pattern
	council_Object.Pattern_Timer = Lucifer_Game.time.create(false);
	council_Object.Pattern_Timer.loop(1000, council_PatternTimer, Lucifer_Game, council_Object);

	//Regen Timer
	council_Object.Regen_Timer = Lucifer_Game.time.create(false);
	council_Object.Regen_Timer.loop(1000, council_RegenTimer, Lucifer_Game, council_Object);

	//Exp Timer
	council_Object.ExpTimer = Lucifer_Game.time.create(false);
	council_Object.ExpTimer.loop(10, council_ExpTiemr, Lucifer_Game, council_Object);

	council_Group.add(council_Object);
}
//------------------------------------------------------------------------------
//Over / Out
function council_over(Object)
{
	Object.Name.visible = true;
	Object.HpBar.visible = true;
}
function council_out(Object)
{
	Object.Name.visible = false;
	Object.HpBar.visible = false;
}

//Timer
function council_DelayTimer(Object)
{
	++Object.DelayTime_Total;
}

function council_RegenTimer(Object)
{
	++Object.Regen_Time_Total;
}

function council_ExpTiemr(Object)
{
	++Object.ExpTime_Total;
}

//skill Timer
function council_SkillDelayTimer(Object)
{
	++Object.Skill_Time_Total;
}

//Pattern Timer
function council_PatternTimer(Object)
{
	++Object.Pattern_Time_Total;
}

//Name
function council_FollwName(Object)
{
	Object.Name.x = Object.position.x;

	var NamePointY = Object.position.y + 70;
	Object.Name.y = NamePointY;
}
//----------------------------------------------------------------------------------------------

//Direction
//----------------------------------------------------------------------------------------------
function council_GetDirection(Object)
{
	Object.Distance = Phaser.Math.distance(Object.x, Object.y, Player.x, Player.y);

	if(Object.DeadCheck == false)
	{
		if(Object.Distance < Object.CognizeRange)
		{
			Object.Angle = Lucifer_Game.physics.arcade.angleToXY(Object, Player.world.x, Player.world.y);
			Object.Angle = Math.abs(Object.Angle);

			if(Object.y < Player.y)
			{
				Object.Angle = 2 * Math.PI - Object.Angle;
			}

			if(Object.Angle >= 0 && Object.Angle <= 0.7)
			{
				Object.Direction = 7;
			}
			else if(Object.Angle > 0.7 && Object.Angle <= 1.9)
			{
				Object.Direction = 0;
			}
			else if(Object.Angle > 1.9 && Object.Angle <= 2.9)
			{
				Object.Direction = 1;
			}
			else if(Object.Angle > 2.9 && Object.Angle <= 3.9)
			{
				Object.Direction = 2;
			}
			else if(Object.Angle > 3.6 && Object.Angle <= 4.2)
			{
				Object.Direction = 3;
			}
			else if(Object.Angle > 4.2 && Object.Angle <= 4.9)
			{
				Object.Direction = 4;
			}
			else if(Object.Angle > 4.9 && Object.Angle <= 5.7)
			{
				Object.Direction = 5;
			}
			else if(Object.Angle > 5.7 && Object.Angle <= 6.2)
			{
				Object.Direction = 6;
			}

			if(Object.CompareCheck == false)
			{
				Object.PreDirection = Object.Direction;	
				Object.CompareCheck = true;			
			}
		}
	}	
}

function council_GetReturnDirection(Object)
{
	Object.ReturnDistance = Phaser.Math.distance(Object.x, Object.y, Object.ReturnPointX, Object.ReturnPointY);

	if(Object.DeadCheck == false)
	{
		if(Object.Distance > Object.CognizeRange)
		{
			Object.ReturnAngle = Lucifer_Game.physics.arcade.angleToXY(Object, Object.ReturnPointX, Object.ReturnPointY);
			Object.ReturnAngle = Math.abs(Object.ReturnAngle);
			
			if(Object.y < Object.ReturnPointY)
			{
				Object.ReturnAngle = 2 * Math.PI - Object.ReturnAngle;
			}	

			if(Object.ReturnAngle >= 0 && Object.ReturnAngle <= 0.7)
			{
				Object.ReturnDirection = 7;
			}
			else if(Object.ReturnAngle > 0.7 && Object.ReturnAngle <= 1.9)
			{
				Object.ReturnDirection = 0;
			}
			else if(Object.ReturnAngle > 1.9 && Object.ReturnAngle <= 2.9)
			{
				Object.ReturnDirection = 1;
			}
			else if(Object.ReturnAngle > 2.9 && Object.ReturnAngle <= 3.9)
			{
				Object.ReturnDirection = 2;
			}
			else if(Object.ReturnAngle > 3.6 && Object.ReturnAngle <= 4.2)
			{
				Object.ReturnDirection = 3;
			}
			else if(Object.ReturnAngle > 4.2 && Object.ReturnAngle <= 4.9)
			{
				Object.ReturnDirection = 4;
			}
			else if(Object.ReturnAngle > 4.9 && Object.ReturnAngle <= 5.7)
			{
				Object.ReturnDirection = 5;
			}
			else if(Object.ReturnAngle > 5.7 && Object.ReturnAngle <= 6.2)
			{
				Object.ReturnDirection = 6;
			}

			Object.Direction = Object.ReturnDirection;

			if(Object.CompareCheck == false)
			{
				Object.PreDirection = Object.Direction;	
				Object.CompareCheck = true;			
			}
		}
	}
}

function council_Compare_Direction(PreDirection, CurDirection, Object)
{
	if(PreDirection != CurDirection)
	{
		Object.CompareCheck = false;
		Object.MoveCheck = false;
	}
}
//----------------------------------------------------------------------------------------------

//Animation
//----------------------------------------------------------------------------------------------
function council_Animation_Change(Direction, Status, Object)
{
	if(Object.DeadCheck == false)
	{
		if(Object.Status[0] == Status)
		{
			//Stand
			Object.loadTexture('MON_Council_Stand', 0, true);
			Object.animations.play('MON_Council_Stand_' + Direction, 10, true);
		}	
		else if(Object.Status[1] == Status)
		{
			//Walk
			Object.loadTexture('MON_Council_Run', 0, true);
			Object.animations.play('MON_Council_Run_' + Direction, 10, true);
		}
		else if(Object.Status[2] == Status)
		{
			//Attack
			Object.loadTexture('MON_Council_Attack', 0, true);
			Object.animations.play('MON_Council_Attack_' + Direction, 10, true);
		}
		else if(Object.Status[4] == Status)
		{
			//Skill
			Object.loadTexture('MON_Council_Skill', 0, true);
			Object.animations.play('MON_Council_Skill_' + Direction, 10, true);
		}
	}
}
//----------------------------------------------------------------------------------------------

//AI
//----------------------------------------------------------------------------------------------
function council_Move(Object)
{
	if(Object.DeadCheck == false)
	{
		if(Object.Distance < Object.CognizeRange)
		{
			Object.AI_StartCheck = true;

			//Run
			if(Object.MoveCheck == false)
			{
				Object.AttackCheck = false;
				Object.StandCheck = false;
				Object.MoveCheck = true;				

				Lucifer_Game.physics.arcade.moveToObject(Object, Player, 60);
				council_Animation_Change(Object.Direction, 'Run', Object);				
			}			
		}

		if(Object.Distance < Object.AttackRange)
		{
			//Stand			
			if(Object.StandCheck == false)
			{
				council_Animation_Change(Object.Direction, 'Stand', Object);
				Object.StandCheck = true;
			}

			//Attack
			council_Attack_AI(Object);

			Object.body.velocity.x = 0;
			Object.body.velocity.y = 0;
		}

		if(Object.Distance > Object.CognizeRange && Object.AI_StartCheck == true)
		{
			if(Object.ReturnCheck == false)
			{
				Object.MoveCheck = false;
				Object.AttackCheck = false;
				Object.StandCheck = false;
				Object.ReturnCheck = true;
			}			
		}

		if(Object.ReturnCheck == true)
		{
			//Return Walk
			if(Object.ReturnDistance > 10)
			{
				if(Object.MoveCheck == false)
				{
					Object.MoveCheck = true;

					Lucifer_Game.physics.arcade.moveToXY(Object, Object.ReturnPointX, Object.ReturnPointY, 60);
					council_Animation_Change(Object.ReturnDirection, 'Run', Object);
				}
			}

			//Return Stand
			if(Object.ReturnDistance < 10)
			{
				Object.ReturnCheck = false;	

				if(Object.StandCheck == false)
				{
					Object.StandCheck = true;

					council_Animation_Change(Object.ReturnDirection, 'Stand', Object);
				}

				Object.body.velocity.x = 0;
				Object.body.velocity.y = 0;
			}
		}

		council_Compare_Direction(Object.PreDirection, Object.Direction, Object);
	}
}

function council_Attack_AI(Object)
{
	//Timer를 돌리면서 Time Total 값을 일정하게 올린다.
	//일정하게 올린값이 렌덤값 Pattern_Change_Value 값보다 커지면 다시 렌덤밗을 뽑고
	//그 뽑은 값에 따라 Time Total은 초기화 시키고 Patten_Check 값을 True / false 로 바꿔주면서
	//Pattern 을 바꾼다.
	Object.Pattern_Timer.start();

	if(Object.Pattern_Time_Total > Object.Pattern_Change_Value)
	{
		Object.Pattern_Change_Value = Lucifer_Game.rnd.integerInRange(0, 5);	
		Object.Pattern_Time_Total = 0;
	}

	if(Object.Pattern_Skill_Check == false)
	{
		council_Attack(Object);			
	}
	else if(Object.Pattern_Skill_Check == true)
	{
		council_SkillAttack(Object);			
	}

	//console.log(Object.Pattern_Change_Value);
	//console.log(Object.Pattern_Time_Total);	
	//console.log(Object.Pattern_Skill_Check);
}

function council_SkillAttack(Object)
{
	if(Object.StandCheck == true)
	{
		if(Phaser.Rectangle.intersects(Object.AttackRect, Hit_Rect))
		{
			Object.Skill_DelayTimer.start();

			if(Object.AttackCheck == false)
			{
				council_Animation_Change(Object.Direction, 'Skill', Object);
				
				Object.Skill_Light.visible = true;
				Object.Skill_Light.loadTexture('Council_Light', 0, true);
				Object.Skill_Light.animations.play('Council_Light_' + Direction, 10, true);

				if(Phaser.Rectangle.intersects(Object.Skill_Rect, Hit_Rect))
				{
					council_SkillHitCount(Object);	
				}				

				Object.Pattern_Skill_Check = false;
				Object.AttackCheck = true;
			}
			else
			{
				Object.Skill_Light.visible = false;
				Object.StandCheck = false;
				Object.MoveCheck = false;
			}
		}
	}
}

function council_Attack(Object)
{
	if(Object.StandCheck == true)
	{
		if(Phaser.Rectangle.intersects(Object.AttackRect, Hit_Rect))
		{
			Object.Attack_DelayTimer.start();

			if(Object.AttackCheck == false)
			{
				Object.Skill_Light.visible = false;
				council_Animation_Change(Object.Direction, 'Attack', Object);
				
				Object.Pattern_Skill_Check = true;
				Object.AttackCheck = true;
			}
		}
		else
		{
			Object.Skill_Light.visible = false;
			Object.StandCheck = false;
			Object.MoveCheck = false;
		}

		council_HitCount(Object);
	}
}

function council_HitCount(Object)
{
	if(Object.DelayTime_Total > 1)
	{
		if(Object.animations.name == 'MON_Council_Attack_' + Object.Direction)
		{
			var CurFrame = Object.animations.frame;
			var EndFrame = 0;

			if(Object.Direction == 0)
			{
				EndFrame = 9;
			}
			else
			{
				EndFrame = 9 * (Object.Direction + 1);
			}

			if(CurFrame + 1 < EndFrame)
			{
				health -= 20;	//Mosnter Attack Point Setting
				Object.DelayTime_Total = 0;	
			}		
		}		
	}
}

function council_SkillHitCount(Object)
{
	if(Object.Skill_Time_Total > 1)
	{	
		if(Object.Skill_Light.animations.name == 'Council_Light_' + Object.Direction)
		{
			var CurFrame = Object.Skill_Light.animations.frame;
			var EndFrame = 0;

			if(Object.Direction == 0)
			{
				EndFrame = 13;
			}
			else
			{
				EndFrame = 13 * (Object.Direction + 1);
			}

			if(CurFrame + 3 < EndFrame)
			{
				health -= 40;	//Skill Attack Point
				Object.Skill_Time_Total = 0;
			}		
		}		
	}
}

function council_Dead(Object)
{
	if(Object.Hp < 0)
	{
		Object.DeadCheck = true;
	}

	if(Object.DeadCheck == true)
	{
		if(Object.DeadMotionCheck == false)
		{
			Object.loadTexture('MON_Council_Dead', 0, true);
			Object.animations.play('MON_Council_Dead_' + Object.Direction, 10, true);
			Object.DeadMotionCheck = true;

			//Collision false
			Object.body.static = true;
		}

		var CurFrame = Object.animations.frame;
		var EndFrame;		

		if(Object.Direction == 0)
		{
			EndFrame = 18;
		}
		else
		{
			EndFrame = 18 * (Object.Direction + 1);
		}

		if(Object.DeadMotionCheck == true && CurFrame == EndFrame)
		{
			Object.kill();
			Object.Name.visible = false;
			Object.Skill_Light.visible = false;
			Object.ExpCheck = true;
		}				
	}
}

function council_Regen(Object)
{
	if(Object.DeadMotionCheck == true)
	{
		Object.Regen_Check = true;
		Object.Regen_Timer.start();

		if(Object.Regen_Time_Total > Object.Regen_Time)
		{
			Object.revive();
			Object.Name.visible = true;
			Object.body.static = false;		//Collision true

			Object.Regen_Check = false;
			
			Object.AI_StartCheck = false, Object.MoveCheck = false, Object.StandCheck = false;
			Object.AttackCheck = false, Object.CompareCheck = false, Object.DamageCheck = false;
			Object.DeadCheck = false,	Object.DeadMotionCheck = false, Object.ReturnCheck = false;
			Object.Pattern_Nomal_Check = false, Object.Pattern_Skill_Check = false;

			Object.Hp = 100;
			Object.MaxHp = 100;
			Object.x = Object.ReturnPointX;
			Object.y = Object.ReturnPointY;

			council_Animation_Change(Object.Direction, 'Stand', Object);

			Object.Regen_Timer.stop();
			Object.Regen_Time_Total = 0;
		}
	}
}
//----------------------------------------------------------------------------------------------

//UI
//----------------------------------------------------------------------------------------------
function council_Hpbar_Mask(Object)
{
	if(Object.DeadCheck == false)
	{
		Object.HpMask.clear();
		Object.HpMask.beginFill(0xffffff);
		Object.HpMask.drawRect(Object.HpBar.x - 100, Object.HpBar.y, Object.Hp, 200);
		Object.HpMask.endFill();
		Object.HpBar.mask = Object.HpMask;
	}
}

function council_SkillPos(Object)
{
	if(Object.AttackCheck == false)
	{		
		Object.Skill_Light.x = Player.x;
		Object.Skill_Light.y = Player.y;				
	}	
}

function council_RectPos(Object)
{
	if(Object.DeadCheck == false)
	{
		//Hit Rect
		Object.HitRect.x = Object.x;
		Object.HitRect.y = Object.y;
		Object.HitRect.centerOn(Object.x, Object.y);

		//Attack Rect
		Object.AttackRect.x = Object.x;
		Object.AttackRect.y = Object.y;
		Object.AttackRect.centerOn(Object.x, Object.y);

		//Skill Rect
		Object.Skill_Rect.x = Object.Skill_Light.x;
		Object.Skill_Rect.y = Object.Skill_Light.y;
		Object.Skill_Rect.centerOn(Object.Skill_Light.x, Object.Skill_Light.y);
	}
}
//----------------------------------------------------------------------------------------------

//Update & Render
//----------------------------------------------------------------------------------------------
function council_Update()
{
	for(var i = 0; i < council_Group.length; ++i)
	{
		var council = council_Group.getChildAt(i);

		council_Hpbar_Mask(council);
		council_SkillPos(council);
		council_RectPos(council);
		council_FollwName(council);
		council_GetDirection(council);
		council_GetReturnDirection(council);
		council_Move(council);

		//Player Mosnter Collision
		if(council.Regen_Check == false)
		{
			player_Monster_Col(council);			
		}		

		council_Dead(council);
		council_Regen(council);

		//Level System
		check_Monster_Dead(council);
	}
}

function council_Render()
{
	var length = council_Group.length;
	for(var i = 0; i < length; ++i)
	{
		var council = council_Group.getChildAt(i);

		Lucifer_Game.debug.geom(council.HitRect, 'rgba(200, 0, 0, 0.5)');
		Lucifer_Game.debug.geom(council.AttackRect, 'rgba(0, 0, 200, 0.5)');
	}
}
//----------------------------------------------------------------------------------------------