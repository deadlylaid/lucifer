//Skeleton
//------------------------------------------------------------------------------
var skeleton_Group, skeleton_Object;
//------------------------------------------------------------------------------

Skeleton = function(game, x, y, Hp, MaxHp, CognizeRange, AttackRange)
{
	Phaser.Sprite.call(this, game, x, y, 'MON_Skeleton_Attack');
	this.Hp = Hp;
	this.MaxHp = MaxHp;
	this.CognizeRange = CognizeRange;
	this.AttackRange = AttackRange;

	//Stat
	this.Attack_Point = 100, this.Defence_Point = 50;

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
	this.MouseCheck = false, this.CreateCheck = false, this.StartCheck = false;
	this.GetExpCheck = false, this.SoundCheck = false;

	//Regen Time
	this.Regen_Timer, this.Regen_Time_Total = 0, this.RegenTime = 30, this.Regen_Check = false;

	//Level System
	this.ExpCheck = false, this.ExpTimer, this.ExpTime_Total = 0, this.Experience = 10;

	//Shadow
	this.shadow_Effect;

	//Message
	this.status_Message_Check = false, this.message_Time_Check = false;
}

Skeleton.prototype = Object.create(Phaser.Sprite.prototype);
Skeleton.prototype.constructor = Skeleton;

//Preload & Create & Clone
//----------------------------------------------------------------------------------------------
function skeleton_Preload()
{
	Lucifer_Game.load.spritesheet('MON_Skeleton_Stand',
								  '../../static/images/game/Monster/Skeleton/stand/stand.png',
								  100, 100);
	Lucifer_Game.load.spritesheet('MON_Skeleton_Walk',
								  '../../static/images/game/Monster/Skeleton/walk/walk.png',
								  100, 100);
	Lucifer_Game.load.spritesheet('MON_Skeleton_Attack',
								  '../../static/images/game/Monster/Skeleton/attack/attack.png',
								  100, 100);
	Lucifer_Game.load.spritesheet('MON_Skeleton_Dead',
								  '../../static/images/game/Monster/Skeleton/death/death.png',
								  100, 100);
	Lucifer_Game.load.spritesheet('MON_Skeleton_Create',
								  '../../static/images/game/Monster/Skeleton/create/create.png',
								  72, 72);
}

function skeleton_Create()
{
	skeleton_Group = Lucifer_Game.add.group();

	Lucifer_Game.renderer.setTexturePriority(['MON_Skeleton_Stand', 'MON_Skeleton_Walk', 'MON_Skeleton_Attack',
										      'MON_Skeleton_Dead', 'MON_Skeleton_Create']);
}

function skeleton_Clone(PointX, PointY)
{
	skeleton_Object = new Skeleton(Lucifer_Game, PointX, PointY, 400, 400, 1000, 100);

	Lucifer_Game.physics.p2.enable(skeleton_Object);
	skeleton_Object.body.fixedRotation = true;
	skeleton_Object.body.clearShapes();
	skeleton_Object.body.addRectangle(70, 70, 0, 0);
	skeleton_Object.body.debug = false;
	skeleton_Object.body.restitution = 0;

	//Animation
	//Stand & Walk
	var index = 0;
	for(var i = 0; i < 8; ++i)
	{
		skeleton_Object.animations.add('MON_Skeleton_Stand_' + i,
									   [
									   	  index,     index + 1, index + 2, index + 3, index + 4,
									   	  index + 5, index + 6, index + 7
									   ], 60 ,true);

		skeleton_Object.animations.add('MON_Skeleton_Walk_' + i,
									   [
									   	  index,     index + 1, index + 2, index +3 , index + 4,
									   	  index + 5, index + 6, index + 7
									   ], 60, true);

		index += 8;
	}

	//Create & Dead
	skeleton_Object.animations.add('MON_Skeleton_Create', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 60, true);
	skeleton_Object.animations.add('MON_Skeleton_Dead',
								   [
								      0,  1,  2,  3,  4,  5,  6,  7,  8, 9,
								      10, 11, 12, 13, 14, 15, 16, 17, 18
								   ], 60, true);

	//Attack
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		skeleton_Object.animations.add('MON_Skeleton_Attack_' + i,
									   [
									      index,      index + 1,  index + 2,  index + 3,  index + 4,
									      index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									      index + 10, index + 11, index + 12, index + 13, index + 14,
									      index + 15
									   ], 60, true);
		index += 16;
	}

	skeleton_Object.loadTexture('MON_Skeleton_Stand', 0, true);
	skeleton_Object.animations.play('MON_Skeleton_Stand_4', 10, true);
	skeleton_Object.anchor.setTo(0.5, 0.5);
	skeleton_Object.blendMode = Phaser.blendModes.ADD;

	Lucifer_Game.physics.enable(skeleton_Object, Phaser.Physics.ARCADE);
	Lucifer_Game.add.existing(skeleton_Object);

	//Hp Bar
	skeleton_Object.HpBar = skeleton_Object.addChild(Lucifer_Game.make.sprite(0, -100, 'monsterHealthBar'));
	skeleton_Object.HpBar.anchor.set(0.5, 0.5);
	skeleton_Object.HpBar.visible = false;

	//Hp Mask
	skeleton_Object.HpMask = skeleton_Object.addChild(Lucifer_Game.add.graphics(0, -100));
	skeleton_Object.HpMask.beginFill(0xffffff);

	//Name
	skeleton_Object.Name = Lucifer_Game.add.text(skeleton_Object.x, skeleton_Object.y - 100,
												 'Skeleton');
	skeleton_Object.Name.anchor.set(0.5);
	skeleton_Object.Name.align = 'center';
	skeleton_Object.Name.font = 'Arial';
	skeleton_Object.Name.fontSize = 13;
	skeleton_Object.Name.fontWeight = 'normal';
	skeleton_Object.Name.fill = '#19de65';
	skeleton_Object.Name.visible = false;

	//input Mouse Over / Up
	skeleton_Object.inputEnabled = true;
	skeleton_Object.events.onInputOver.add(skeleton_over, skeleton_Object);
	skeleton_Object.events.onInputOut.add(skeleton_out, skeleton_Object);

	//Rect
	skeleton_Object.HitRect = new Phaser.Rectangle(skeleton_Object.x, skeleton_Object.y, 70, 80);
	skeleton_Object.AttackRect = new Phaser.Rectangle(skeleton_Object.x, skeleton_Object.y, 120, 120);

	//Delay Timer
	skeleton_Object.Attack_DelayTimer = Lucifer_Game.time.create(false);
	skeleton_Object.Attack_DelayTimer.loop(1000, skeleton_DelayTimer, Lucifer_Game, skeleton_Object);

	//Regen Timer
	skeleton_Object.Regen_Timer = Lucifer_Game.time.create(false);
	skeleton_Object.Regen_Timer.loop(1000, skeleton_RegenTimer, Lucifer_Game, skeleton_Object);

	//Exp Timer
	skeleton_Object.ExpTimer = Lucifer_Game.time.create(false);
	skeleton_Object.ExpTimer.loop(10, skeleton_ExpTimer, Lucifer_Game, skeleton_Object);

	//Shadow
	skeleton_Object.shadow_Effect = shadow_Clone(skeleton_Object.x, skeleton_Object.y, 0, 36);

	skeleton_Group.add(skeleton_Object);
}
//----------------------------------------------------------------------------------------------
//Over / Out
function skeleton_over(Object)
{
	Object.Name.visible = true;
	Object.HpBar.visible = true;
}

function skeleton_out(Object)
{
	Object.Name.visible = false;
	Object.HpBar.visible = false;
}

//Timer
function skeleton_DelayTimer(Object)
{
	++Object.DelayTime_Total;
}

//Regen Timer
function skeleton_RegenTimer(Object)
{
	++Object.Regen_Time_Total;
}

//Exp Timer
function skeleton_ExpTimer(Object)
{
	++Object.ExpTime_Total;
}

//Name
function skeleton_FollwName(Object)
{
	Object.Name.x = Object.position.x;

	var NamePointY = Object.position.y + 70;
	Object.Name.y = NamePointY;
}
//----------------------------------------------------------------------------------------------
//Direction
//----------------------------------------------------------------------------------------------
function skeleton_GetDirection(Object)
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

function skeleton_GetReturnDirection(Object)
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

function skeleton_Compare_Direction(PreDirection, CurDirection, Object)
{
	if(PreDirection != CurDirection)
	{
		Object.CompareCheck = false;
		Object.MoveCheck = false;
	}
}
//----------------------------------------------------------------------------------------------
//Aniamtion('Stand', 'Walk', 'Attack', 'Dead')
//----------------------------------------------------------------------------------------------
function skeleton_Animation_Change(Direction, Status, Object)
{
	if(Object.DeadCheck == false)
	{
		if(Object.Status[0] == Status)
		{
			//Stand
			Object.loadTexture('MON_Skeleton_Stand', 0, true);
			Object.animations.play('MON_Skeleton_Stand_' + Direction, 10, true);
		}
		else if(Object.Status[1] == Status)
		{
			//Walk
			Object.loadTexture('MON_Skeleton_Walk', 0, true);
			Object.animations.play('MON_Skeleton_Walk_' + Direction, 10, true);
		}
		else if(Object.Status[2] == Status)
		{
			//Attack
			Object.loadTexture('MON_Skeleton_Attack', 0, true);
			Object.animations.play('MON_Skeleton_Attack_' + Direction, 10, true);
		}
	}
}
//----------------------------------------------------------------------------------------------
// AI
//----------------------------------------------------------------------------------------------
function skeleton_Start(Object)
{
	if(Object.DeadCheck == false)
	{
		if(Object.CreateCheck == false)
		{
			Object.loadTexture('MON_Skeleton_Create', 0, true);
			Object.animations.play('MON_Skeleton_Create', 10, true);
			Object.CreateCheck = true;
		}

		if(Object.CreateCheck == true)
		{
			var CurFrame = Object.animations.frame;
			var EndFrame = 11;

			if(CurFrame == EndFrame)
			{
				//Sound
				sound_Skeleton_Create.play();

				Object.StartCheck = true;
			}
		}
	}
}

function skeleton_Move(Object)
{
	if(Object.DeadCheck == false && Object.StartCheck == true)
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
				skeleton_Animation_Change(Object.Direction, 'Walk', Object);

				/*
				if(Object.animations.name == "MON_Skeleton_Walk_" + Object.Direction
				   && Object.SoundCheck == false)
				{
					//Sound
					sound_Skeleton_Neutral.play();	
					Object.SoundCheck = true;
				}			
				*/	
			}
		}

		if(Object.Distance < Object.AttackRange)
		{
			//Stand
			if(Object.StandCheck == false)
			{
				skeleton_Animation_Change(Object.Direction, 'Stand', Object);
				Object.StandCheck = true;
				Object.SoundCheck = false;
			}

			//Attack
			skeleton_Attack(Object);

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
					skeleton_Animation_Change(Object.Direction, 'Walk', Object);
				}
			}

			//Return Stand
			if(Object.ReturnDistance < 10)
			{
				Object.ReturnCheck = false;

				if(Object.StandCheck == false)
				{
					Object.StandCheck = true;

					skeleton_Animation_Change(Object.Direction, 'Stand', Object);
				}

				Object.body.velocity.x = 0;
				Object.body.velocity.y = 0;
			}
		}

		skeleton_Compare_Direction(Object.PreDirection, Object.Direction, Object);
	}
}

function skeleton_Attack(Object)
{
	if(Object.StandCheck == true)
	{
		if(Phaser.Rectangle.intersects(Object.AttackRect, Hit_Rect))
		{
			Object.Attack_DelayTimer.start();

			if(Object.AttackCheck == false)
			{
				skeleton_Animation_Change(Object.Direction, 'Attack', Object);
				Object.AttackCheck = true;
			}
		}
		else
		{
			Object.StandCheck = false;
			Object.MoveCheck = false;
		}

		skeleton_HitCount(Object);
	}
}

function skeleton_HitCount(Object)
{
	if(Object.DelayTime_Total > 1)
	{
		if(Object.animations.name == 'MON_Skeleton_Attack_' + Object.Direction)
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
				//Sound
				sound_Skeleton_Attack.play();

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

function skeleton_Dead(Object)
{
	if(Object.Hp < 0)
	{
		Object.DeadCheck = true;
	}

	if(Object.DeadCheck == true)
	{
		if(Object.DeadMotionCheck == false)
		{
			Object.loadTexture('MON_Skeleton_Dead', 0, true);
			Object.animations.play('MON_Skeleton_Dead', 10, true);
			Object.DeadMotionCheck = true;

			//Collision false
			Object.body.static = true;

			//Sound
			sound_Skeleton_Dead.play();
		}

		var CurFrame = Object.animations.frame;
		if(Object.DeadMotionCheck == true && CurFrame == 18)
		{
			//Message
			if(Object.status_Message_Check == false)
			{
				status_Message_Clone(Object.Experience);
				Object.status_Message_Check = true;
			}

			Object.Name.visible = false;
			Object.ExpCheck = true;
			Object.destroy();
		}
	}
}
//----------------------------------------------------------------------------------------------
//UI
//----------------------------------------------------------------------------------------------
function skeleton_Health(health, maxHealth)
{
	var divided_Health = health / maxHealth;
	var result_health = divided_Health;

	if(health <= 0)
	{
		result_health = 0;
	}

	return result_health * 100;
}

function skeleton_Health_Rate(health_Percentage)
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

function skeleton_Hpbar_Mask(Object)
{
	var healthPercentage = skeleton_Health(Object.Hp, Object.MaxHp);
	var hpRate = skeleton_Health_Rate(healthPercentage);

	Object.HpMask.clear();
	Object.HpMask.beginFill(0xffffff);
	Object.HpMask.drawRect(Object.HpBar.x - 112, Object.HpBar.y, hpRate, 200);
	Object.HpMask.endFill();
	Object.HpBar.mask = Object.HpMask;
}

function skeleton_RectPos(Object)
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
//----------------------------------------------------------------------------------------------
//Update & Render
//----------------------------------------------------------------------------------------------
function skeleton_Update()
{
	for(var i = 0; i < skeleton_Group.length; ++i)
	{
		var skeleton = skeleton_Group.getChildAt(i);

		skeleton_Start(skeleton);
		skeleton_Hpbar_Mask(skeleton);
		skeleton_RectPos(skeleton);
		skeleton_FollwName(skeleton);
		skeleton_GetDirection(skeleton);
		skeleton_GetReturnDirection(skeleton);
		skeleton_Move(skeleton);

		//Player Mosnter Collision
		if(skeleton.DeadCheck == false)
		{
			player_Monster_Col(skeleton);
		}

		skeleton_Dead(skeleton);

		//Level System
		check_Monster_Dead(skeleton);

		//Mouse
		mouse_ColCheck(skeleton);

		//Shadow
		shadow_Monster_Move(skeleton);
	}
}

function skeleton_Render()
{
	var length = skeleton_Group.length;
	for(var i = 0; i < length; ++i)
	{
		var skeleton = skeleton_Group.getChildAt(i);

		Lucifer_Game.debug.geom(skeleton.HitRect, 'rgba(200, 0, 0, 0.5)');
		Lucifer_Game.debug.geom(skeleton.AttackRect, 'rgba(0, 0, 200, 0.5)');
	}
}
//----------------------------------------------------------------------------------------------
