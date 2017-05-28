// Shaman 기본 변수
//------------------------------------------------------------------------------
var fallenShaman_Group, fallenShaman_Object;
var Fire_Ball_Group;
//------------------------------------------------------------------------------

// Shman
Fallen_Shaman = function(game, x, y, Hp, MaxHp, CognizeRange, AttackRange)
{
	Phaser.Sprite.call(this, game, x, y, 'MON_FallenShaman_Attack');
	this.Hp = Hp;
	this.MaxHp = MaxHp;
	this.CognizeRange = CognizeRange;
	this.AttackRange = AttackRange;

	//Stat
	this.Attack_Point = 65, this.Defence_Point = 45;

	//Status
	this.Status = new Array('Stand', 'Run', 'Attack', 'Dead');

	//Position
	this.PointX = x;
	this.PointY = y;
	this.ReturnPointX = x;
	this.ReturnPointY = y;

	//UI
	this.HpBar, this.HpMask, this.Name;

	//Rect
	this.HitRect, this.AttackRect;

	//Time
	this.Attack_DelayTimer, this.DelayTime_Total = 1;

	//Direction
	this.Distance, this.Angle,
	this.PreDirection, this.Direction;

	//Return Direction
	this.ReturnDistance, this.ReturnDirection, this.ReturnAngle;

	//MotionCheck
	this.AI_StartCheck = false, this.MoveCheck = false, this.StandCheck = false;
	this.AttackCheck = false, this.CompareCheck = false, this.DamageCheck = false;
	this.DeadCheck = false,	this.DeadMotionCheck = false, this.ReturnCheck = false;
	this.MouseCheck = false, this.FireBall_Check = false;

	//FireBall
	this.FireBall, this.NextFire = 0, this.FireRate = 1500;

	//Regen Time
	this.Regen_Timer, this.Regen_Time_Total = 0, this.Regen_Time = 10, this.Regen_Check = false;

	//Level System
	this.ExpCheck = false, this.ExpTimer, this.ExpTime_Total = 1;

	//Blood Effect
	this.blood_Effect;

	//Shadow Effect
	this.shadow_Effect;
}

Fallen_Shaman.prototype = Object.create(Phaser.Sprite.prototype);
Fallen_Shaman.prototype.constructor = Fallen_Shaman;

//Preload / Create / Clone
//------------------------------------------------------------------------------
function fallen_Shaman_Preload()
{
	Lucifer_Game.load.spritesheet('MON_FallenShaman_Stand',
								  '../../static/images/game/Monster/FallenShaman/Stand/Stand.png',
								   100, 100);
	Lucifer_Game.load.spritesheet('MON_FallenShaman_Run',
								  '../../static/images/game/Monster/FallenShaman/Run/Run.png',
								   100, 100);
	Lucifer_Game.load.spritesheet('MON_FallenShaman_Attack',
								  '../../static/images/game/Monster/FallenShaman/Attack/Attack.png',
								   120, 120);
	Lucifer_Game.load.spritesheet('MON_FallenShaman_Dead',
								  '../../static/images/game/Monster/FallenShaman/Death/Death.png',
								   83, 83);

	shamanSkill_Preload();
}

function fallen_Shaman_Create()
{
	Lucifer_Game.renderer.setTexturePriority(['MON_FallenShaman_Stand', 'MON_FallenShaman_Run',
											  'MON_FallenShaman_Attack', 'MON_FallenShaman_Dead']);

	//Group
	Fire_Ball_Group = Lucifer_Game.add.group();
	fallenShaman_Group = Lucifer_Game.add.group();
	fallen_Shaman_Clone(8753, 2557);
	fallen_Shaman_Clone(8989, 2322);
	fallen_Shaman_Clone(9428, 2503);
}

function fallen_Shaman_Clone(PointX, PointY)
{
	fallenShaman_Object = new Fallen_Shaman(Lucifer_Game, PointX, PointY, 450, 450, 250, 200);

	Lucifer_Game.physics.p2.enable(fallenShaman_Object);
	fallenShaman_Object.body.fixedRotation = true;
	fallenShaman_Object.body.clearShapes();
	fallenShaman_Object.body.addRectangle(40, 60, 0, 0);
	fallenShaman_Object.body.debug = false;
	fallenShaman_Object.body.restitution = 0;

	//Animation
	//Stand
	var index = 0;
	for(var i = 0; i < 8; ++i)
	{
		fallenShaman_Object.animations.add('MON_FallenShaman_Stand_' + i,
										   [
										   	  index,      index + 1, index + 2, index + 3, index + 4,
										   	  index + 5,  index + 6, index + 7, index + 8, index + 9,
										   	  index + 10, index + 11
										   ], 60, true);
		index += 12;
	}

	//Run
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		fallenShaman_Object.animations.add('MON_FallenShaman_Run_' + i,
										   [
										   	  index,      index + 1,  index + 2,  index + 3, index + 4,
										   	  index + 5,  index + 6,  index + 7,  index + 8, index + 9,
										   	  index + 10, index + 11, index + 12, index + 13
										   ], 60, true);
		index += 14;
	}

	//Attack
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		fallenShaman_Object.animations.add('MON_FallenShaman_Attack_' + i,
										   [
										   	  index,      index + 1,  index + 2,  index + 3,  index + 4,
										   	  index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
										   	  index + 10, index + 11, index + 12, index + 13, index + 14,
										   	  index + 15, index + 16
										   ], 60, true);
		index += 17;
	}

	//Dead
	index = 0;
	fallenShaman_Object.animations.add('MON_FallenShaman_Dead_0',
									   [
									   	  index,      index + 1,  index + 2,  index + 3,  index + 4,
									   	  index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									   	  index + 10, index + 11, index + 12, index + 13, index + 14
									   ],
									   60, true);

	fallenShaman_Object.loadTexture('MON_FallenShaman_Stand', 0, true);
	fallenShaman_Object.animations.play('MON_FallenShaman_Stand_0', 10, true);
	fallenShaman_Object.anchor.setTo(0.5, 0.5);

	Lucifer_Game.physics.enable(fallenShaman_Object, Phaser.Physics.ARCADE);
	Lucifer_Game.add.existing(fallenShaman_Object);

	//Hp Bar
	fallenShaman_Object.HpBar = fallenShaman_Object.addChild(Lucifer_Game.make.sprite(0, -100, "monsterHealthBar"));
	fallenShaman_Object.HpBar.anchor.set(0.5, 0.5);
	fallenShaman_Object.HpBar.visible = false;

	//Hp Mask
	fallenShaman_Object.HpMask = fallenShaman_Object.addChild(Lucifer_Game.add.graphics(0, -100));
	fallenShaman_Object.HpMask.beginFill(0xffffff);

	//Name
	fallenShaman_Object.Name = Lucifer_Game.add.text(fallenShaman_Object.x, fallenShaman_Object.y - 100,
													 'Fallen Shman');
	fallenShaman_Object.Name.anchor.set(0.5);
	fallenShaman_Object.Name.align = "center";
	fallenShaman_Object.Name.font = 'Arial';
	fallenShaman_Object.Name.fontSize = 13;
	fallenShaman_Object.Name.fontWeight = 'normal';
	fallenShaman_Object.Name.fill = '#19de65';
    fallenShaman_Object.Name.visible = false;

    //input Mouse Over / Up
    fallenShaman_Object.inputEnabled = true;
    fallenShaman_Object.events.onInputOver.add(fallen_Shaman_over, fallenShaman_Object);
    fallenShaman_Object.events.onInputOut.add(fallen_Shaman_out, fallenShaman_Object);

    //Rect
	fallenShaman_Object.HitRect = new Phaser.Rectangle(fallenShaman_Object.x, fallenShaman_Object.y, 70, 70);
	fallenShaman_Object.AttackRect = new Phaser.Rectangle(fallenShaman_Object.x, fallenShaman_Object.y, 300, 300);

	//Delay timer
	fallenShaman_Object.Attack_DelayTimer = Lucifer_Game.time.create(false);
	fallenShaman_Object.Attack_DelayTimer.loop(1000, fallen_Shaman_DelayTimer, Lucifer_Game, fallenShaman_Object);

	//FireBall
	/*
	fallenShaman_Object.FireBall = Lucifer_Game.add.group();
	fallenShaman_Object.FireBall.enableBody = true;
	fallenShaman_Object.FireBall.physicsBodyType = Phaser.Physics.ARCADE;
	fallenShaman_Object.FireBall.createMultiple(30, 'SK_FireBall');
	fallenShaman_Object.FireBall.setAll('anchor.x', 0.5);
	fallenShaman_Object.FireBall.setAll('anchor.y', 0.5);
	fallenShaman_Object.FireBall.setAll('outOfBoundsKill', true);
	fallenShaman_Object.FireBall.setAll('checkWorldBounds', true);

	//Rect
	fallenShaman_Object.FireBall_Rect = new Phaser.Rectangle(fallenShaman_Object.FireBall.x,
												             fallenShaman_Object.FireBall.y,
												             50, 50);
	*/
	//Regen Timer
	fallenShaman_Object.Regen_Timer = Lucifer_Game.time.create(false);
	fallenShaman_Object.Regen_Timer.loop(1000, fallenShaman_RegenTimer, Lucifer_Game, fallenShaman_Object);

	//Exp Timer
	fallenShaman_Object.ExpTimer = Lucifer_Game.time.create(false);
	fallenShaman_Object.ExpTimer.loop(10, fallenShaman_ExpTimer, Lucifer_Game, fallenShaman_Object);

	//Blood Effect
	fallenShaman_Object.blood_Effect = blood_Effect_Clone(fallenShaman_Object.x, fallenShaman_Object.y);

	//Shadow
	fallenShaman_Object.shadow_Effect = shadow_Clone(fallenShaman_Object.x, fallenShaman_Object.y,
											         0, 36);

	fallenShaman_Group.add(fallenShaman_Object);
}
//-------------------------------------------------------------------------------------------
//Over / Out
function fallen_Shaman_over(Object)
{
	Object.Name.visible  = true;
	Object.HpBar.visible = true;
}

function fallen_Shaman_out(Object)
{
	Object.Name.visible  = false;
	Object.HpBar.visible = false;
}

//Timer
function fallen_Shaman_DelayTimer(Object)
{
	++Object.DelayTime_Total;
}

function fallenShaman_RegenTimer(Object)
{
	++Object.Regen_Time_Total;
}

function fallenShaman_ExpTimer(Object)
{
	++Object.ExpTime_Total;
}

function fireBall_DelayTimer(Object)
{
	++Object.Delay_Time_Total;
}

//Name
function fallen_Shaman_FollwName(Object)
{
	if(Object.DeadCheck == false)
	{
		Object.Name.x = Object.position.x;

		var shaman_NamePointY = Object.position.y + 70;
		Object.Name.y = shaman_NamePointY;
	}
}
//-------------------------------------------------------------------------------------------

//Direction
//-------------------------------------------------------------------------------------------
function fallen_Shaman_GetDirection(Object)
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

function fallen_Shaman_GetReturnDirection(Object)
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

function fallen_Shaman_Compare_Direction(PreDirection, CurDirection, Object)
{
	if(PreDirection != CurDirection)
	{
		Object.CompareCheck = false;
		Object.MoveCheck = false;
	}
}
//-------------------------------------------------------------------------------------------

//Animation
//-------------------------------------------------------------------------------------------
function fallen_Shaman_Animation_Change(Direction, Status, Object)
{
	if(Object.DeadCheck == false)
	{
		if(Object.Status[0] == Status)
		{
			//Stand
			Object.loadTexture('MON_FallenShaman_Stand', 0, true);
			Object.animations.play('MON_FallenShaman_Stand_' + Direction, 10, true);
		}
		else if(Object.Status[1] == Status)
		{
			//Run
			Object.loadTexture('MON_FallenShaman_Run', 0, true);
			Object.animations.play('MON_FallenShaman_Run_' + Direction, 10, true);
		}
		else if(Object.Status[2] == Status)
		{
			//Attack
			Object.loadTexture('MON_FallenShaman_Attack', 0, true);
			Object.animations.play('MON_FallenShaman_Attack_' + Direction, 10, true);
		}
	}
}
//-------------------------------------------------------------------------------------------

//Shaman AI
//-------------------------------------------------------------------------------------------
function fallen_Shaman_Move(Object)
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

				Lucifer_Game.physics.arcade.moveToObject(Object, Player, 80);
				fallen_Shaman_Animation_Change(Object.Direction, 'Run', Object);
			}
		}

		if(Object.Distance < Object.AttackRange)
		{
			//Stand
			if(Object.StandCheck == false)
			{
				fallen_Shaman_Animation_Change(Object.Direction, 'Stand', Object);
				Object.StandCheck = true;
			}

			//Attack
			fallen_Shaman_Attack(Object);

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
			//Return Run
			if(Object.ReturnDistance > 10)
			{
				if(Object.MoveCheck == false)
				{
					Object.MoveCheck = true;

					Lucifer_Game.physics.arcade.moveToXY(Object, Object.ReturnPointX, Object.ReturnPointY, 80);
					fallen_Shaman_Animation_Change(Object.ReturnDirection, 'Run', Object);
				}
			}

			//Return Stand
			if(Object.ReturnDistance < 10)
			{
				Object.ReturnCheck = false;

				if(Object.StandCheck == false)
				{
					Object.StandCheck = true;

					fallen_Shaman_Animation_Change(Object.ReturnDirection, 'Stand', Object);
				}

				Object.body.velocity.x = 0;
				Object.body.velocity.y = 0;
			}
		}

		fallen_Shaman_Compare_Direction(Object.PreDirection, Object.Direction, Object);
	}
}

function fallen_Shaman_Attack(Object)
{
	if(Object.StandCheck == true)
	{
		if(Phaser.Rectangle.intersects(Object.AttackRect, Hit_Rect))
		{
			Object.Attack_DelayTimer.start();

			if(Object.AttackCheck == false)
			{
				fallen_Shaman_Animation_Change(Object.Direction, 'Attack', Object);
				Object.AttackCheck = true;
			}

			fallen_Shaman_FireBall_Fire(Object);
		}
		else
		{
			Object.StandCheck = false;
			Object.MoveCheck = false;
		}

		//fallen_Shaman_HitCount(Object)
	}
}

function fallen_Shaman_FireBall_Fire(Object)
{
	if(Object.animations.name == 'MON_FallenShaman_Attack_' + Object.Direction)
	{
		var CurFrame = Object.animations.frame;
		var EndFrame = 0;

		if(Object.Direction ==0)
		{
			EndFrame = 16;
		}
		else
		{
			EndFrame = 16 * (Object.Direction + 1);
		}

		if(CurFrame + 14 < EndFrame)
		{
			Object.FireBall = shamanSkill_Clone(Object.x, Object.y);
			Fire_Ball_Group.add(Object.FireBall);

			Object.FireBall_Check = true;
		}

		if(Object.FireBall_Check == true)
		{
			for(var i = 0; i < Fire_Ball_Group.length; ++i)
			{
				var fireBall = Fire_Ball_Group.getChildAt(i);

				Lucifer_Game.physics.arcade.moveToObject(fireBall, Player, 200);

				fireBall.Rect.x = fireBall.x;
				fireBall.Rect.y = fireBall.y;
				fireBall.Rect.centerOn(fireBall.Rect.x, fireBall.Rect.y);

				//console.log(fireBall.Rect.x, fireBall.Rect.y);
			}
		}

		for(var i = 0; i < Fire_Ball_Group.length; ++i)
		{
			var fireBall = Fire_Ball_Group.getChildAt(i);

			if(Phaser.Rectangle.intersects(fireBall.Rect, Hit_Rect))
			{
				fireBall.visible = false;
				fireBall.AttackCheck = false;
				fireBall.destroy();

				var monster_Attack_Damage = (Object.Attack_Point - defence_point);

				if(monster_Attack_Damage > 0)
				{
					health -= monster_Attack_Damage;
				}
				else if(monster_Attack_Damage <= 0)
				{
					health -= (Object.Attack_Point * 0.01);
				}				
			}
		}

	}
}

function fallen_Shaman_HitCount(Object)
{
	if(Object.DelayTime_Total > 1)
	{
		if(Object.animations.name == 'MON_FallenShaman_Attack_' + Object.Direction)
		{
			var CurFrame = Object.animations.frame;
			var EndFrame = 0;

			if(Object.Direction == 0)
			{
				EndFrame = 16;
			}
			else
			{
				EndFrame = 16 * (Object.Direction + 1);
			}

			if(CurFrame + 6 < EndFrame)
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
				//Object.AttackCheck = false;
			}
		}
	}
}

function fallen_Shaman_Dead(Object)
{
	if(Object.Hp < 0)
	{
		Object.DeadCheck = true;
	}

	if(Object.DeadCheck == true)
	{
		if(Object.DeadMotionCheck == false)
		{
			Object.loadTexture('MON_FallenShaman_Dead', 0, true);
			Object.animations.play('MON_FallenShaman_Dead_0', 10, true);
			Object.DeadMotionCheck = true;

			//Collision false
			Object.body.static = true;

			//Quest
			checkQuest(7);
		}

		var currentFrame = Object.animations.frame;

		if(Object.DeadMotionCheck == true && currentFrame == 14)
		{
			Object.kill();
			Object.Name.visible = false;
			Object.ExpCheck = true;
		}
	}
}

function fallen_Shaman_Regen(Object)
{
	if(Object.DeadMotionCheck == true)
	{
		Object.Regen_Check = true;
		Object.Regen_Timer.start();

		if(Object.Regen_Time_Total > Object.Regen_Time)
		{
			Object.revive();
			Object.Name.visible = true;
			Object.body.static = false;
			Object.body.restitution = 0;

			Object.Regen_Check = false;

			Object.AI_StartCheck = false, Object.MoveCheck = false, Object.StandCheck = false;
			Object.AttackCheck = false, Object.CompareCheck = false, Object.DamageCheck = false;
			Object.DeadCheck = false,	Object.DeadMotionCheck = false, Object.ReturnCheck = false;
			Object.MouseCheck = false, Object.FireBall_Check = false;

			Object.Hp = 450;
			Object.MaxHp = 450;
			Object.x = Object.ReturnPointX;
			Object.y = Object.ReturnPointY;

			fallen_Shaman_Animation_Change(Object.Direction, 'Stand', Object);

			Object.Regen_Timer.stop();
			Object.Regen_Time_Total = 0;
		}
	}
}
//-------------------------------------------------------------------------------------------
function fallen_Shaman_Health(health, maxHealth)
{
	var divided_Health = health / maxHealth;
	var result_health = divided_Health;

	if(health <= 0)
	{
		result_health = 0;
	}

	return result_health * 100;
}

function fallen_Shaman_Health_Rate(health_Percentage)
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

//Hp Bar Mask
function fallen_Shaman_Hpbar_Mask(Object)
{
	var healthPercentage = fallen_Shaman_Health(Object.Hp, Object.MaxHp);
	var hpRate = fallen_Shaman_Health_Rate(healthPercentage);

	Object.HpMask.clear();
	Object.HpMask.beginFill(0xffffff);
	Object.HpMask.drawRect(Object.HpBar.x - 112, Object.HpBar.y, hpRate, 200);
	Object.HpMask.endFill();
	Object.HpBar.mask = Object.HpMask;
}

//Rect Position / FireBall Pos
function fallen_Shaman_RectPos(Object)
{
	if(Object.DeadCheck == false)
	{
		//Hir Rect
		Object.HitRect.x = Object.x;
		Object.HitRect.y = Object.y;
		Object.HitRect.centerOn(Object.x, Object.y);

		//Attack Rect
		Object.AttackRect.x = Object.x;
		Object.AttackRect.y = Object.y;
		Object.AttackRect.centerOn(Object.x, Object.y);
	}
}

// Shaman Update / Render
//-------------------------------------------------------------------------------------------
function fallen_Shaman_Update()
{
	for(var i = 0; i < fallenShaman_Group.length; ++i)
	{
		var Shaman = fallenShaman_Group.getChildAt(i);

		fallen_Shaman_Hpbar_Mask(Shaman);
		fallen_Shaman_RectPos(Shaman);
		fallen_Shaman_FollwName(Shaman);
		fallen_Shaman_GetDirection(Shaman);
		fallen_Shaman_GetReturnDirection(Shaman);
		fallen_Shaman_Move(Shaman);

		//Player Mosnter Collision
		if(Shaman.Regen_Check == false)
		{
			player_Monster_Col(Shaman);
		}

		//Dead
		fallen_Shaman_Dead(Shaman);
		fallen_Shaman_Regen(Shaman);

		//Level System
		check_Monster_Dead(Shaman);

		//Mouse
		mouse_ColCheck(Shaman);

		//Blood Effect
		blood_Effect_Update(Shaman);

		//Shadow
		shadow_Monster_Move(Shaman);
	}
}

function fallen_Shaman_Render()
{
	for(var i = 0; i < fallenShaman_Group.length; ++i)
	{
		Lucifer_Game.debug.geom(fallenShaman_Group.getChildAt(i).HitRect, 'rgba(0, 200, 0, 0.5)');
		Lucifer_Game.debug.geom(fallenShaman_Group.getChildAt(i).AttackRect, 'rgba(200, 0, 200, 0.5)');
	}
}
//-------------------------------------------------------------------------------------------
