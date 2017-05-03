//Andariel
//------------------------------------------------------------------------------
var andariel_Group, andariel_Object;
//------------------------------------------------------------------------------

Andariel = function(game, x, y, Hp, MaxHp, CognizeRange, AttackRange)
{
	Phaser.Sprite.call(this, game, x, y, 'MON_Andariel_Dead');
	this.Hp = Hp;
	this.MaxHp = MaxHp;
	this.CognizeRange = CognizeRange;
	this.AttackRange = AttackRange;

	//Stat
	this.Attack_Point = 200, this.Defence_Point = 100;

	//Status
	this.Status = new Array('Stand', 'Walk', 'Attack', 'Dead');

	//Pos
	this.PointX = x, this.PointY = y, this.ReturnPointX = x, this.ReturnPointY = y;

	//UI
	this.HpBar, this.HpMask, this.Name;

	//Rect
	this.HitRect, this.AttackRect;

	//Time
	this.Attack_DelayTimer, this.DelayTime_Total = 1;

	//Direction
	this.Distance, this.Angle, this.PreDirection, this.Direction;

	//Retrun Direction
	this.ReturnDistance, this.ReturnDirection, this.ReturnAngle;

	//Motion Check
	this.AI_StartCheck = false, this.MoveCheck = false, this.StandCheck = false;
	this.AttackCheck = false, this.CompareCheck = false, this.DamageCheck = false;
	this.DeadCheck = false,	this.DeadMotionCheck = false, this.ReturnCheck = false;
	this.MouseCheck = false;

	//Regen Time
	this.Regen_Timer, this.Regen_Time_Total = 0, this.RegenTime = 30, this.Regen_Check = false;

	//Level System
	this.ExpCheck = false, this.ExpTimer, this.ExpTime_Total = 1;

	//Blood Effect
	this.blood_Effect;

	//Shadow
	this.shadow_Effect;

	//Andariel Skill
	this.Andariel_Skill, this.Andariel_Skill_Rect, this.Andariel_Skill_Check = false;
	this.Andariel_Skill_AttackPoint = 1;
}

Andariel.prototype = Object.create(Phaser.Sprite.prototype);
Andariel.prototype.constructor = Andariel;

//Preload & Create & Clone
//----------------------------------------------------------------------------------------------
function andariel_Preload()
{
	Lucifer_Game.load.spritesheet('MON_Andariel_Stand',
								  '../../static/images/game/Monster/Andariel/stand/stand.png',
								  256, 256);
	Lucifer_Game.load.spritesheet('MON_Andariel_Walk',
								  '../../static/images/game/Monster/Andariel/walk/walk.png',
								  256, 256);
	Lucifer_Game.load.spritesheet('MON_Andariel_Attack',
								  '../../static/images/game/Monster/Andariel/attack/attack.png',
								  256, 256);
	Lucifer_Game.load.spritesheet('MON_Andariel_Dead',
								  '../../static/images/game/Monster/Andariel/death/death.png',
								  256, 256);
	Lucifer_Game.load.spritesheet('MON_Andariel_Skill',
								  '../../static/images/game/Monster_Skill/Andariel_Skill.png',
								  65, 65);
}

function andariel_Create()
{
	andariel_Group = Lucifer_Game.add.group();
	andariel_Clone(8306, 1550);

	Lucifer_Game.renderer.setTexturePriority(['MON_Andariel_Stand', 'MON_Andariel_Walk', 'MON_Andariel_Attack', 'MON_Andariel_Dead']);
}

function andariel_Clone(PointX, PointY)
{
	andariel_Object = new Andariel(Lucifer_Game, PointX, PointY, 4000, 4000, 230, 100);

	Lucifer_Game.physics.p2.enable(andariel_Object);
	andariel_Object.body.fixedRotation = true;
	andariel_Object.body.clearShapes();
	andariel_Object.body.addRectangle(80, 80, 0, 0);
	andariel_Object.body.debug = false;
	andariel_Object.body.restitution = 0;

	//Animaion
	//Stand & Attack
	var index = 0;
	for(var i = 0; i < 8; ++i)
	{
		andariel_Object.animations.add('MON_Andariel_Stand_' + i,
									   [
									      index,      index + 1,  index + 2,  index + 3,  index + 4,
									      index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									      index + 10, index + 11, index + 12, index + 13, index + 15
									   ], 60, true);

		andariel_Object.animations.add('MON_Andariel_Attack_' + i,
									   [
									      index,      index + 1,  index + 2,  index + 3,  index + 4,
									      index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									      index + 10, index + 11, index + 12, index + 13, index + 15
									   ], 60, true);
		index += 16;
	}

	//Walk
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		andariel_Object.animations.add('MON_Andariel_Walk_' + i,
									   [
									   	  index,      index + 1, index + 2, index + 3, index + 4,
									   	  index + 5,  index + 6, index + 7, index + 8, index + 9,
									   	  index + 10, index + 11
									   ], 60, true);

		index += 12;
	}

	//Dead
	idnex = 0;
	for(var i = 0; i < 8; ++i)
	{
		andariel_Object.animations.add('MON_Andariel_Dead_' + i,
									   [
									   	 index,      index + 1,  index + 2,  index + 3,  index + 4,
									   	 index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									   	 index + 10, index + 11, index + 12, index + 13, index + 14,
									   	 index + 15, index + 16, index + 17, index + 18, index + 19,
									   	 index + 20, index + 21, index + 22
									   ], 60, true);

		index += 23;
	}

	andariel_Object.loadTexture('MON_Andariel_Stand', 0, true);
	andariel_Object.animations.play('MON_Andariel_Stand_0', 10, true);
	andariel_Object.anchor.setTo(0.5, 0.5);

	Lucifer_Game.physics.enable(andariel_Object, Phaser.Physics.ARCADE);
	Lucifer_Game.add.existing(andariel_Object);

	//Hp Bar
	andariel_Object.HpBar = andariel_Object.addChild(Lucifer_Game.make.sprite(0, -100, 'monsterHealthBar'));
	andariel_Object.HpBar.anchor.set(0.5, 0.5);
	andariel_Object.HpBar.visible = false;

	//Hp Mask
	andariel_Object.HpMask = andariel_Object.addChild(Lucifer_Game.add.graphics(0, -100));
	andariel_Object.HpMask.beginFill(0xffffff);

	//Name
	andariel_Object.Name = Lucifer_Game.add.text(andariel_Object.x, andariel_Object.y - 100,
												 'Andariel');
	andariel_Object.Name.anchor.set(0.5);
	andariel_Object.Name.align = 'center';
	andariel_Object.Name.font = 'Arial';
	andariel_Object.Name.fontSize = 13;
	andariel_Object.Name.fontWeight = 'normal';
	andariel_Object.Name.fill = '#19de65';
	andariel_Object.Name.visible = false;

	//input Mouse Over / Up
	andariel_Object.inputEnabled = true;
	andariel_Object.events.onInputOver.add(andariel_over, andariel_Object);
	andariel_Object.events.onInputOut.add(andariel_out, andariel_Object);

	//Rect
	andariel_Object.HitRect = new Phaser.Rectangle(andariel_Object.x, andariel_Object.y, 150, 150);
	andariel_Object.AttackRect = new Phaser.Rectangle(andariel_Object.x, andariel_Object.y, 150, 150);

	//Delay Timer
	andariel_Object.Attack_DelayTimer = Lucifer_Game.time.create(false);
	andariel_Object.Attack_DelayTimer.loop(1000, andariel_DelayTimer, Lucifer_Game, andariel_Object);

	//Regen Timer
	andariel_Object.Regen_Timer = Lucifer_Game.time.create(false);
	andariel_Object.Regen_Timer.loop(1000, andariel_RegenTimer, Lucifer_Game, andariel_Object);

	//Exp Timer
	andariel_Object.ExpTimer = Lucifer_Game.time.create(false);
	andariel_Object.ExpTimer.loop(10, andariel_ExpTimer, Lucifer_Game, andariel_Object);

	//Blood Effect
	andariel_Object.blood_Effect = blood_Effect_Clone(andariel_Object.x, andariel_Object.y);

	//Shadow
	andariel_Object.shadow_Effect = shadow_Clone(andariel_Object.x, andariel_Object.y, 0, 50);

	//Andariel Skill
	andariel_Object.Andariel_Skill = Lucifer_Game.add.sprite(andariel_Object.x, andariel_Object.y,
														     'MON_Andariel_Skill');
	andariel_Object.Andariel_Skill.anchor.setTo(0.5, 0.5);
	andariel_Object.Andariel_Skill.visible = false;
	andariel_Object.Andariel_Skill.blendMode = Phaser.blendModes.ADD;

	//Skill Animation
	andariel_Object.Andariel_Skill.animations.add('MON_Andariel_Skill_Ani',
												  [
												  	 0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
												  	 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
												  	 20, 21, 22, 23
												  ], 60, true);

	andariel_Object.Andariel_Skill_Rect = new Phaser.Rectangle(andariel_Object.Andariel_Skill.x, 
														       andariel_Object.Andariel_Skill.y,
														       65, 65);	
	andariel_Group.add(andariel_Object);
}
//----------------------------------------------------------------------------------------------
//Over / Out
function andariel_over(Object)
{
	Object.Name.visible = true;
	Object.HpBar.visible = true;
}
function andariel_out(Object)
{
	Object.Name.visible = false;
	Object.HpBar.visible = false;
}

//Timer
function andariel_DelayTimer(Object)
{
	++Object.DelayTime_Total;
}

//Regen Timer
function andariel_RegenTimer(Object)
{
	++Object.Regen_Time_Total;
}

//Exp Timer
function andariel_ExpTimer(Object)
{
	++Object.ExpTime_Total;
}

//Name
function andariel_FollwName(Object)
{
	Object.Name.x = Object.position.x;

	var NamePointY = Object.position.y + 70;
	Object.Name.y = NamePointY;
}
//----------------------------------------------------------------------------------------------

//Direction
//----------------------------------------------------------------------------------------------
function andariel_GetDirection(Object)
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

function andariel_GetReturnDirection(Object)
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

function andariel_Compare_Direction(PreDirection, CurDirection, Object)
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
function andariel_Animation_Change(Direction, Status, Object)
{
	if(Object.DeadCheck == false)
	{
		if(Object.Status[0] == Status)
		{
			//Stand
			Object.loadTexture('MON_Andariel_Stand', 0, true);
			Object.animations.play('MON_Andariel_Stand_' + Direction, 10, true);
		}
		else if(Object.Status[1] == Status)
		{
			//Walk
			Object.loadTexture('MON_Andariel_Walk', 0, true);
			Object.animations.play('MON_Andariel_Walk_' + Direction, 10, true);
		}
		else if(Object.Status[2] == Status)
		{
			//Attack
			Object.loadTexture('MON_Andariel_Attack', 0, true);
			Object.animations.play('MON_Andariel_Attack_' + Direction, 10, true);
		}
	}
}
//----------------------------------------------------------------------------------------------

//AI
//----------------------------------------------------------------------------------------------
function andariel_Move(Object)
{
	if(Object.DeadCheck == false)
	{
		if(Object.Distance < Object.CognizeRange)
		{
			Object.AI_StartCheck = true;

			//Walk
			if(Object.MoveCheck == false)
			{
				Object.AttackCheck = false;
				Object.StandCheck = false;
				Object.MoveCheck = true;

				Lucifer_Game.physics.arcade.moveToObject(Object, Player, 60);
				andariel_Animation_Change(Object.Direction, 'Walk', Object);
			}
		}

		if(Object.Distance < Object.AttackRange)
		{
			//Stand
			if(Object.StandCheck == false)
			{
				andariel_Animation_Change(Object.Direction, 'Stand', Object);
				Object.StandCheck = true;
			}

			//Attack
			andariel_Attack(Object);

			Object.body.velocity.x = 0;
			Object.body.velocity.y = 0;
		}
		else
		{
			Object.Andariel_Skill.visible = false;
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
					andariel_Animation_Change(Object.Direction, 'Walk', Object);
				}
			}

			//Return Stand
			if(Object.ReturnDistance < 10)
			{
				Object.ReturnCheck = false;

				if(Object.StandCheck == false)
				{
					Object.StandCheck = true;

					andariel_Animation_Change(Object.Direction, 'Stand', Object);
				}

				Object.body.velocity.x = 0;
				Object.body.velocity.y = 0;
			}
		}

		andariel_Compare_Direction(Object.PreDirection, Object.Direction, Object);
	}
}

function andariel_Attack(Object)
{
	if(Object.StandCheck == true)
	{
		if(Phaser.Rectangle.intersects(Object.AttackRect, Hit_Rect))
		{
			Object.Attack_DelayTimer.start();

			if(Object.AttackCheck == false)
			{
				andariel_Animation_Change(Object.Direction, 'Attack', Object);
				Object.AttackCheck = true;
			}
		}
		else
		{
			Object.StandCheck = false;
			Object.MoveCheck = false;			
		}

		andariel_HitCount(Object);
	}
}

function andariel_Skill(Object)
{
	if(Object.animations.name == "MON_Andariel_Attack_" + Object.Direction)
	{	
		Object.Andariel_Skill.x = Player.x;
		Object.Andariel_Skill.y = Player.y;
		Object.Andariel_Skill_Rect.x = Object.Andariel_Skill.x;
		Object.Andariel_Skill_Rect.y = Object.Andariel_Skill.y;
		Object.Andariel_Skill_Rect.centerOn(Object.Andariel_Skill_Rect.x, Object.Andariel_Skill_Rect.y);

		//Skill Animation Play
		if(Object.Andariel_Skill_Check == false)
		{
			Object.Andariel_Skill.visible = true;
			Object.Andariel_Skill.animations.play('MON_Andariel_Skill_Ani', 10, true);
			Object.Andariel_Skill_Check = true;
		}

		if(Object.Andariel_Skill_Check == true)
		{
			var CurFrame = Object.Andariel_Skill.animations.frame;
			var EndFrame = 23;

			if(CurFrame == EndFrame)
			{
				//Object.Andariel_Skill.visible = false;
				Object.Andariel_Skill_Check = false;
			}
		}

		//Skill Damage
		if(Phaser.Rectangle.intersects(Object.Andariel_Skill_Rect, Hit_Rect))
		{
			var CurFrame = Object.Andariel_Skill.animations.frame;
			var EndFrame = 23;

			if(CurFrame + 10 == EndFrame)
			{
				health -= Object.Andariel_Skill_AttackPoint;

				console.log(health);
			}
		}
	}	
}

function andariel_HitCount(Object)
{
	if(Object.DelayTime_Total > 1)
	{
		if(Object.animations.name == 'MON_Andariel_Attack_' + Object.Direction)
		{
			var CurFrame = Object.animations.frame;
			var EndFrame = 0;

			if(Object.Direction == 0)
			{
				EndFrame = 15;
			}
			else
			{
				EndFrame = 15 * (Object.Direction + 1);
			}

			if(CurFrame + 5 < EndFrame)
			{
				var monster_Attack_Damage = (Object.Attack_Point - defence_point);

				if(monster_Attack_Damage > 0)
				{
					health -= monster_Attack_Damage;
				}
				else if(monster_Attack_Damage <= 0)
				{
					health -= (Object.Attack_Point * 0.01);
				}

				Object.DelayTime_Total = 0;
			}
		}
	}
}

function andariel_Dead(Object)
{
	if(Object.Hp < 0)
	{
		Object.DeadCheck = true;
	}

	if(Object.DeadCheck == true)
	{
		if(Object.DeadMotionCheck == false)
		{
			Object.loadTexture('MON_Andariel_Dead', 0, true);
			Object.animations.play('MON_Andariel_Dead_0', 10, true);
			Object.DeadMotionCheck = true;

			//Collision false
			Object.body.static = true;

			//Quest
			checkQuest(8);
		}

		var CurFrame = Object.animations.frame;
		if(Object.DeadMotionCheck == true && CurFrame == 118)
		{
			Object.kill();
			Object.Andariel_Skill.kill();
			Object.Name.visible = false;
			Object.ExpCheck = true;
		}
	}
}
//----------------------------------------------------------------------------------------------

//UI
//----------------------------------------------------------------------------------------------
function andariel_Health(health, maxHealth)
{
	var divided_Health = health / maxHealth;
	var result_health = divided_Health;

	if(health <= 0)
	{
		result_health = 0;
	}

	return result_health * 100;
}

function andariel_Health_Rate(health_Percentage)
{
	var hpRate;

	if(health_Percentage > 0)
	{
		hpRate = (2.24 * health_Percentage); 	
	}	 
	else if(health_Percentage <= 0)
	{
		hpRate = 0;
	}

	return hpRate;
}

function andariel_Hpbar_Mask(Object)
{
	var healthPercentage = andariel_Health(Object.Hp, Object.MaxHp);
	var hpRate = andariel_Health_Rate(healthPercentage);

	Object.HpMask.clear();
	Object.HpMask.beginFill(0xffffff);
	Object.HpMask.drawRect(Object.HpBar.x - 112, Object.HpBar.y, hpRate, 200);
	Object.HpMask.endFill();
	Object.HpBar.mask = Object.HpMask;
}

function andariel_RectPos(Object)
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
	}
}

function andariel_Regen(Object)
{
	if(Object.DeadMotionCheck == true)
	{
		Object.Regen_Check = true;
		Object.Regen_Timer.start();

		if(Object.Regen_Time_Total > Object.RegenTime)
		{
			Object.revive();
			Object.Andariel_Skill.revive();
			Object.Name.visible = true;
			Object.body.static = false;
			Object.body.restitution = 0;

			Object.Regen_Check = false;

			Object.AI_StartCheck = false, Object.MoveCheck = false, Object.StandCheck = false;
			Object.AttackCheck = false, Object.CompareCheck = false, Object.DamageCheck = false;
			Object.DeadCheck = false,	Object.DeadMotionCheck = false, Object.ReturnCheck = false;
			Object.MouseCheck = false, Object.Andariel_Skill_Check;

			Object.Hp = 4000;
			Object.MaxHp = 4000;
			Object.x = Object.ReturnPointX;
			Object.y = Object.ReturnPointY;

			andariel_Animation_Change(Object.Direction, 'Stand', Object);

			Object.Regen_Timer.stop();
			Object.Regen_Time_Total = 0;
		}
	}
}
//----------------------------------------------------------------------------------------------

//Update & Render
//----------------------------------------------------------------------------------------------
function andariel_Update()
{
	for(var i = 0; i < andariel_Group.length; ++i)
	{
		var andariel = andariel_Group.getChildAt(i);

		andariel_Hpbar_Mask(andariel);
		andariel_RectPos(andariel);
		andariel_FollwName(andariel);
		andariel_GetDirection(andariel);
		andariel_GetReturnDirection(andariel);
		andariel_Move(andariel);
		andariel_Skill(andariel);

		//Player Mosnter Collision
		if(andariel.Regen_Check == false)
		{
			player_Monster_Col(andariel);
		}

		andariel_Dead(andariel);
		andariel_Regen(andariel);

		//Level System
		check_Monster_Dead(andariel);

		//Mouse
		mouse_ColCheck(andariel);

		//Blood Effect
		blood_Effect_Update(andariel);

		//Shadow
		shadow_Monster_Move(andariel);
	}
}

function andariel_Render()
{
	var length = andariel_Group.length;
	for(var i = 0; i < length; ++i)
	{
		var andariel = andariel_Group.getChildAt(i);

		Lucifer_Game.debug.geom(andariel.HitRect, 'rgba(200, 0, 0, 0.5)');
		Lucifer_Game.debug.geom(andariel.AttackRect, 'rgba(0, 0, 200, 0.5)');
	}
}
//----------------------------------------------------------------------------------------------
