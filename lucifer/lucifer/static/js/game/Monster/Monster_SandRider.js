//Sand Raider
//------------------------------------------------------------------------------
var sandraider_Group, sandraider_Object;
//------------------------------------------------------------------------------

SandRider = function(game, x, y, Hp, MaxHp, CognizeRange, AttackRange)
{
	Phaser.Sprite.call(this, game, x, y, 'MON_SandRider_Walk');
	this.Hp = Hp;
	this.MaxHp = MaxHp;
	this.CognizeRange = CognizeRange;
	this.AttackRange = AttackRange;

	//Stat
	this.Attack_Point = 200, this.Defence_Point = 150;

	//Status
	this.Status = new Array('Stand', 'Walk', 'Attack', 'Attack1', 'Dead');

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
	this.MouseCheck = false, this.CreateCheck = false, this.StartCheck = false;
	this.GetExpCheck = false;

	//Regen Time
	this.Regen_Timer, this.Regen_Time_Total = 0, this.RegenTime = 30, this.Regen_Check = false;

	//Level System
	this.ExpCheck = false, this.ExpTimer, this.ExpTime_Total = 0, this.Experience = 60;

	//Blood Effect
	this.blood_Effect;

	//Shadow
	this.shadow_Effect;

	//Message
	this.status_Message_Check = false, this.message_Time_Check = false;
}

SandRider.prototype = Object.create(Phaser.Sprite.prototype);
SandRider.prototype.constructor = SandRider;

//Preload & Create & Clone
//----------------------------------------------------------------------------------------------
function sandRider_Preload()
{
	Lucifer_Game.load.spritesheet('MON_SandRider_Stand',
								  '../../static/images/game/Monster/SandRaider/stand/stand.png',
								  200, 200);
	Lucifer_Game.load.spritesheet('MON_SandRider_Walk',
								  '../../static/images/game/Monster/SandRaider/walk/walk.png',
								  200, 200);
	Lucifer_Game.load.spritesheet('MON_SandRider_Attack',
								  '../../static/images/game/Monster/SandRaider/attack/attack.png',
								  200, 200);
	Lucifer_Game.load.spritesheet('MON_SandRider_Attack1',
								  '../../static/images/game/Monster/SandRaider/special/special.png',
								  168, 137);
	Lucifer_Game.load.spritesheet('MON_SandRider_Dead',
								  '../../static/images/game/Monster/SandRaider/death/death.png',
								  200, 200);
}

function sandRider_Create()
{
	sandraider_Group = Lucifer_Game.add.group();

	Lucifer_Game.renderer.setTexturePriority(['MON_SandRider_Stand', 'MON_SandRider_Walk', 'MON_SandRider_Attack',
										      'MON_SandRider_Attack1', 'MON_SandRider_Dead']);
	sandRider_Clone(8753, 2557); sandRider_Clone(8989, 2322); sandRider_Clone(9428, 2503);

	sandRider_Clone(8561, 2113); sandRider_Clone(8867, 1866); sandRider_Clone(9106, 2885); sandRider_Clone(9517, 2806);
	sandRider_Clone(9815, 2310); sandRider_Clone(4434, 4113); sandRider_Clone(4833, 4271); sandRider_Clone(4407, 4569);
}

function sandRider_Clone(PointX, PointY)
{
	sandraider_Object = new SandRider(Lucifer_Game, PointX, PointY, 500, 500, 400, 100);

	Lucifer_Game.physics.p2.enable(sandraider_Object);
	sandraider_Object.body.fixedRotation = true;
	sandraider_Object.body.clearShapes();
	sandraider_Object.body.addRectangle(70, 70, 0, 0);
	sandraider_Object.body.debug = false;
	sandraider_Object.body.restitution = 0;

	//여기까지 함. -----------------------------------------------------------------------------

	//Animation
	//Stand
	var index = 0;
	for(var i = 0; i < 8; ++i)
	{
		sandraider_Object.animations.add('MON_SandRider_Stand_' + i,
									 [
									 	index, 	    index + 1,  index + 2,  index + 3,  index + 4,
									 	index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									 	index + 10, index + 11, index + 12, index + 13, index + 14
									 ], 60, true);
		index += 15;
	}

	//Walk
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		sandraider_Object.animations.add('MON_SandRider_Walk_' + i,
									 [
									 	index,      index + 1,  index + 2,  index + 3,  index + 4,
									 	index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									 	index + 10, index + 11, index + 12, index + 13, index + 14,
									 	index + 15, index + 16, index + 17, index + 18, index + 19,
									 	index + 20, index + 21, index + 22, index + 23, index + 24,
									 	index + 25, index + 26, index + 27, index + 28
									 ], 60, true);

		index += 29;
	}

	//Attack
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		sandraider_Object.animations.add('MON_SandRider_Attack_' + i,
									 [
									 	index,      index + 1,  index + 2,  index + 3,  index + 4,
									 	index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									 	index + 10, index + 11, index + 12, index + 13, index + 14
									 ], 60, true);
		index += 15;
	}

	//Special Attack
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		sandraider_Object.animations.add('MON_SandRider_Attack1_' + i,
										 [
										 	index,     index + 1, index + 2, index + 3, index + 4,
										 	index + 5, index + 6, index + 7, index + 8, index + 9,
										 	index + 10
										 ], 60, true);
		index += 11;
	}

	//Dead
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		sandraider_Object.animations.add('MON_SandRider_Dead_' + i,
									[
									   index,      index + 1,  index + 2,  index + 3,  index + 4,
									   index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									   index + 10, index + 11, index + 12, index + 13, index + 14,
									   index + 15, index + 16, index + 17
									], 60, true);
		index += 18;
	}

	sandraider_Object.loadTexture('MON_SandRider_Stand', 0, true);
	sandraider_Object.animations.play('MON_SandRider_Stand_0', 10, true);
	sandraider_Object.anchor.setTo(0.5, 0.5);

	Lucifer_Game.physics.enable(sandraider_Object, Phaser.Physics.ARCADE);
	Lucifer_Game.add.existing(sandraider_Object);

	//Hp Bar
	sandraider_Object.HpBar = sandraider_Object.addChild(Lucifer_Game.make.sprite(0, - 100, 'monsterHealthBar'));
	sandraider_Object.HpBar.anchor.set(0.5, 0.5);
	sandraider_Object.HpBar.visible = false;

	//Hp Mask
	sandraider_Object.HpMask = sandraider_Object.addChild(Lucifer_Game.add.graphics(0, -100));
	sandraider_Object.HpMask.beginFill(0xffffff);

	//Name
	sandraider_Object.Name = Lucifer_Game.add.text(sandraider_Object.x, sandraider_Object.y - 100, 'SandRider');
	sandraider_Object.Name.anchor.set(0.5);
	sandraider_Object.Name.align = 'center';
	sandraider_Object.Name.font = 'Arial';
	sandraider_Object.Name.fontSize = 14;
	sandraider_Object.Name.fontWeight = 'bold';
	sandraider_Object.Name.fill = '#0017f7';
	sandraider_Object.Name.visible = false;

	//Input mouse Over / Up
	sandraider_Object.inputEnabled = true;
	sandraider_Object.events.onInputOver.add(sandRider_over, sandraider_Object);
	sandraider_Object.events.onInputOut.add(sandRider_out, sandraider_Object);

	//Rect
	sandraider_Object.HitRect = new Phaser.Rectangle(sandraider_Object.x, sandraider_Object.y, 70, 70);
	sandraider_Object.AttackRect = new Phaser.Rectangle(sandraider_Object.x, sandraider_Object.y, 80, 80);

	//Delay Timer
	sandraider_Object.Attack_DelayTimer = Lucifer_Game.time.create(false);
	sandraider_Object.Attack_DelayTimer.loop(1000, sandRider_DelayTimer, Lucifer_Game, sandraider_Object);

	//Regen Timer
	sandraider_Object.Regen_Timer = Lucifer_Game.time.create(false);
	sandraider_Object.Regen_Timer.loop(1000, sandRider_RegenTimer, Lucifer_Game, sandraider_Object);

	//Exp Timer
	sandraider_Object.ExpTimer = Lucifer_Game.time.create(false);
	sandraider_Object.ExpTimer.loop(10, sandRider_ExpTimer, Lucifer_Game, sandraider_Object);

	//Blood Effect
	sandraider_Object.blood_Effect = blood_Effect_Clone(sandraider_Object.x, sandraider_Object.y);

	//Shadow
	sandraider_Object.shadow_Effect = shadow_Clone(sandraider_Object.x, sandraider_Object.y, 0, 36);

	sandraider_Group.add(sandraider_Object);
}
//----------------------------------------------------------------------------------------------
//Over / Out
function sandRider_over(Object)
{
	Object.Name.visible = true;
	Object.HpBar.visible = true;
}
function sandRider_out(Object)
{
	Object.Name.visible = false;
	Object.HpBar.visible = false;
}

//Timer
function sandRider_DelayTimer(Object)
{
	++Object.DelayTime_Total;
}

//Regen
function sandRider_RegenTimer(Object)
{
	++Object.Regen_Time_Total;
}

//Exp
function sandRider_ExpTimer(Object)
{
	++Object.ExpTime_Total;
}

//Name
function sandRider_FollwName(Object)
{
	Object.Name.x = Object.position.x;

	var NamePointY = Object.position.y + 70;
	Object.Name.y = NamePointY;
}
//----------------------------------------------------------------------------------------------

//Direction
//----------------------------------------------------------------------------------------------
function sandRider_GetDirection(Object)
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

function sandRider_GetReturnDirection(Object)
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

function sandRider_Compare_Direction(PreDirection, CurDirection, Object)
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
function sandRider_Animation_Change(Direction, Status, Object)
{
	/*
	'MON_SandRider_Stand', 'MON_SandRider_Walk', 'MON_SandRider_Attack',
	'MON_SandRider_Attack1', 'MON_SandRider_Dead'
	*/

	if(Object.DeadCheck == false)
	{
		if(Object.Status[0] == Status)
		{
			//Stand
			Object.loadTexture('MON_SandRider_Stand', 0, true);
			Object.animations.play('MON_SandRider_Stand_' + Direction, 10, true);
		}
		else if(Object.Status[1] == Status)
		{
			//Walk
			Object.loadTexture('MON_SandRider_Walk', 0, true);
			Object.animations.play('MON_SandRider_Walk_' + Direction, 10, true);
		}
		else if(Object.Status[2] == Status)
		{
			//Attack
			Object.loadTexture('MON_SandRider_Attack', 0, true);
			Object.animations.play('MON_SandRider_Attack_' + Direction, 10, true);
		}
		else if(Object.Status[3] == Status)
		{
			//Attack1
			Object.loadTexture('MON_SandRider_Attack1', 0, true);
			Object.animations.play('MON_SandRider_Attack1_' + Direction, 10, true);
		}
	}
}
//----------------------------------------------------------------------------------------------

//AI
//----------------------------------------------------------------------------------------------
function sandRider_Move(Object)
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
				sandRider_Animation_Change(Object.Direction, 'Walk', Object);
			}
		}

		if(Object.Distance < Object.AttackRange)
		{
			//Stand
			if(Object.StandCheck == false)
			{
				sandRider_Animation_Change(Object.Direction, 'Stand', Object);
				Object.StandCheck = true;
			}

			//Attack
			sandRider_Attack(Object);

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
					sandRider_Animation_Change(Object.ReturnDirection, 'Walk', Object);
				}
			}

			//Return Stand
			if(Object.ReturnDistance < 10)
			{
				if(Object.StandCheck == false)
				{
					Object.StandCheck = true;

					sandRider_Animation_Change(Object.ReturnDirection, 'Stand', Object);
				}

				Object.body.velocity.x = 0;
				Object.body.velocity.y = 0;
			}
		}

		sandRider_Compare_Direction(Object.PreDirection, Object.Direction, Object);
	}
}

function sandRider_Attack(Object)
{
	if(Object.StandCheck == true)
	{
		if(Phaser.Rectangle.intersects(Object.AttackRect, Hit_Rect))
		{
			Object.Attack_DelayTimer.start();

			if(Object.AttackCheck == false)
			{
				sandRider_Animation_Change(Object.Direction, 'Attack', Object);
				Object.AttackCheck = true;
			}
		}
		else
		{
			Object.StandCheck = false;
			Object.MoveCheck = false;
		}

		sandRider_HitCount(Object);
	}
}

function sandRider_HitCount(Object)
{
	if(Object.DelayTime_Total > 1)
	{
		if(Object.animations.name == 'MON_SandRider_Attack_' + Object.Direction)
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

function sandRider_Dead(Object)
{
	if(Object.Hp < 0)
	{
		Object.DeadCheck = true;
	}

	if(Object.DeadCheck == true)
	{
		if(Object.DeadMotionCheck == false)
		{
			Object.loadTexture('MON_SandRider_Dead', 0, true);
			Object.animations.play('MON_SandRider_Dead_' + Object.Direction, 10, true);
			Object.DeadMotionCheck = true;

			//Collision false
			Object.body.static = true;

			//Quest
			checkQuest(7);
		}

		var CurFrame = Object.animations.frame;
		var EndFrame;

		if(Object.Direction == 0)
		{
			EndFrame = 17;
		}
		else
		{
			EndFrame = 17 * (Object.Direction + 1);
		}

		if(Object.DeadMotionCheck == true && CurFrame == EndFrame)
		{
			//Message
			if(Object.status_Message_Check == false)
			{
				status_Message_Clone(Object.Experience);
				Object.status_Message_Check = true;
			}

			Object.kill();
			Object.Name.visible = false;
			Object.ExpCheck = true;
		}
	}
}
//----------------------------------------------------------------------------------------------

//UI
//----------------------------------------------------------------------------------------------
function sandRider_Health(health, maxHealth)
{
	var divided_Health = health / maxHealth;
	var result_health = divided_Health;

	if(health <= 0)
	{
		result_health = 0;
	}

	return result_health * 100;
}

function sandRider_Health_Rate(health_Percentage)
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

function sandRider_Hpbar_Mask(Object)
{
	var healthPercentage = sandRider_Health(Object.Hp, Object.MaxHp);
	var hpRate = sandRider_Health_Rate(healthPercentage);

	Object.HpMask.clear();
	Object.HpMask.beginFill(0xffffff);
	Object.HpMask.drawRect(Object.HpBar.x - 112, Object.HpBar.y, hpRate, 200);
	Object.HpMask.endFill();
	Object.HpBar.mask = Object.HpMask;
}

function sandRider_RectPos(Object)
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

function sandRider_Regen(Object)
{
	if(Object.DeadMotionCheck == true)
	{
		Object.Regen_Check = true;
		Object.Regen_Timer.start();

		if(Object.Regen_Time_Total > Object.RegenTime)
		{
			Object.revive();
			Object.Name.visible = true;
			Object.body.static = false;		//Collision true
			Object.body.restitution = 0;

			Object.Regen_Check = false;

			Object.AI_StartCheck = false, Object.MoveCheck = false, Object.StandCheck = false;
			Object.AttackCheck = false, Object.CompareCheck = false, Object.DamageCheck = false;
			Object.DeadCheck = false,	Object.DeadMotionCheck = false, Object.ReturnCheck = false;
			Object.MouseCheck = false, Object.status_Message_Check = false;

			Object.Hp = 500;
			Object.MaxHp = 500;
			Object.x = Object.ReturnPointX;
			Object.y = Object.ReturnPointY;

			sandRider_Animation_Change(Object.Direction, 'Stand', Object);

			Object.Regen_Timer.stop();
			Object.Regen_Time_Total = 0;
		}
	}
}
//----------------------------------------------------------------------------------------------

//Update & Render
//----------------------------------------------------------------------------------------------
function sandRider_Update()
{
	for(var i = 0; i < sandraider_Group.length; ++i)
	{
		var sandRider = sandraider_Group.getChildAt(i);

		sandRider_Hpbar_Mask(sandRider);
		sandRider_RectPos(sandRider);
		sandRider_FollwName(sandRider);
		sandRider_GetDirection(sandRider);
		sandRider_GetReturnDirection(sandRider);
		sandRider_Move(sandRider);

		//Player Mosnter Collision
		if(sandRider.Regen_Check == false)
		{
			player_Monster_Col(sandRider);
		}

		sandRider_Dead(sandRider);
		sandRider_Regen(sandRider);

		//Level System Check
		check_Monster_Dead(sandRider);

		//Mouse
		mouse_ColCheck(sandRider);

		//Blood Effect
		blood_Effect_Update(sandRider);

		//Shadow
		shadow_Monster_Move(sandRider);
	}
}

function sandRider_Render()
{
	var length = sandraider_Group.length;
	for(var i = 0; i < length; ++i)
	{
		var sandRider = sandraider_Group.getChildAt(i);

		Lucifer_Game.debug.geom(sandRider.HitRect, 'rgba(200, 0, 0, 0.5)');
		Lucifer_Game.debug.geom(sandRider.AttackRect, 'rgba(0, 0, 200, 0.5)');
	}
}
//----------------------------------------------------------------------------------------------
