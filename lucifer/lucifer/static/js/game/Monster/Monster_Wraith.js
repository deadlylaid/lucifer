//Wraith
//------------------------------------------------------------------------------
var wraith_Group, wraith_Object;
//------------------------------------------------------------------------------

//Wraith
Wraith = function(game, x, y, Hp, MaxHp, CognizeRange, AttackRange)
{
	Phaser.Sprite.call(this, game, x, y, 'MON_Wraith_Dead');
	this.Hp = Hp, this.MaxHp = MaxHp;
	this.CognizeRange = CognizeRange, this.AttackRange = AttackRange;

	//Status
	this.Status = new Array('Stand', 'Run', 'Attack', 'Dead');

	//Position
	this.PointX = x, this.PointY = y, this.ReturnPointX = x, this.ReturnPointY = y;

	//UI
	this.HpBar, this.HpMask, this.Name;

	//Rect
	this.HitRect, this.AttackRect;

	//Time
	this.Attack_DelayTimer, this.DelayTime_Total = 1;

	//Direction
	this.Distance, this.Angle, this.PreDirection, this.Direction;

	//Return Direction
	this.ReturnDistance, this.ReturnDirection, this.ReturnAngle;

	//MotionCheck
	this.AI_StartCheck = false, this.MoveCheck = false, this.StandCheck = false;
	this.AttackCheck = false, this.CompareCheck = false, this.DamageCheck = false;
	this.DeadCheck = false,	this.DeadMotionCheck = false, this.ReturnCheck = false;

	//Regen Time
	this.Regen_Timer, this.Regen_Time_Total = 0, this.Regen_Time = 10, this.Regen_Check = false;
}

Wraith.prototype = Object.create(Phaser.Sprite.prototype);
Wraith.prototype.constructor = Wraith;

//Preload / Create / Clone
//------------------------------------------------------------------------------
function wraith_Preload()
{
	Lucifer_Game.load.spritesheet('MON_Wraith_Stand',
								  '../../static/images/game/Monster/Wraith/stand/stand.png',
								  138, 149);
	Lucifer_Game.load.spritesheet('MON_Wraith_Run',
								  '../../static/images/game/Monster/Wraith/run/run.png',
								  152, 148);
	Lucifer_Game.load.spritesheet('MON_Wraith_Attack',
								  '../../static/images/game/Monster/Wraith/attack/attack.png',
								  141, 186);
	Lucifer_Game.load.spritesheet('MON_Wraith_Dead',
								  '../../static/images/game/Monster/Wraith/death/death.png',
								  182, 180);
}

function wraith_Create()
{
	Lucifer_Game.renderer.setTexturePriority(['MON_Wraith_Stand', 'MON_Wraith_Run', 
											  'MON_Wraith_Attack', 'MON_Wraith_Dead']);

	wraith_Group = Lucifer_Game.add.group();
	wraith_Clone(2834, 3345);
	wraith_Clone(3260, 3105);
	wraith_Clone(5999, 2580);
	wraith_Clone(7038, 2869);
	wraith_Clone(6759, 1691);
	wraith_Clone(7067, 1867);
	wraith_Clone(7020, 808);
}

function wraith_Clone(PointX, PointY)
{
	wraith_Object = new Wraith(Lucifer_Game, PointX, PointY, 200, 200, 280, 80);

	Lucifer_Game.physics.p2.enable(wraith_Object);
	wraith_Object.body.fixedRotation = true;
	wraith_Object.body.clearShapes();
	wraith_Object.body.addRectangle(60, 60, 0, 0);
	wraith_Object.body.debug = true;
	wraith_Object.body.restitution = 0;
	wraith_Object.blendMode = Phaser.blendModes.ADD;

	//Animation
	//Stand
	var index = 0;
	for(var i = 0; i < 8; ++i)
	{
		wraith_Object.animations.add('MON_Wraith_Stand_' + i,
									 [
									 	index, index + 1, index + 2, index + 3, index + 4,
									 	index + 5, index + 6, index + 7
									 ], 60, true);
		index += 8;		
	}

	//Run
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		wraith_Object.animations.add('MON_Wraith_Run_' + i,
									 [
									 	index,     index + 1, index + 2, index + 3, index + 4,
									 	index + 5, index + 6, index + 7, index + 8, index + 9
									 ], 60, true);
		index += 10;
	}

	//Attack
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		wraith_Object.animations.add('MON_Wraith_Attack_' + i,
									 [
									 	index,      index + 1,  index + 2,  index + 3, index + 4,
									 	index + 5,  index + 6,  index + 7,  index + 8, index + 9,
									 	index + 10, index + 11, index + 12, index + 13
									 ], 60, true);
		index += 14;
	}

	//Dead
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		wraith_Object.animations.add('MON_Wraith_Dead_' + i,
									[
									   index,      index + 1,  index + 2,  index + 3,  index + 4,
									   index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									   index + 10, index + 11, index + 12, index + 13, index + 14,
									   index + 15, index + 16, index + 17, index + 18, index + 19	
									], 60, true);	
		index += 20;	
	}

	wraith_Object.loadTexture('MON_Wraith_Stand', 0, true);
	wraith_Object.animations.play('MON_Wraith_Stand_0', 10, true);
	wraith_Object.anchor.setTo(0.5, 0.5);

	Lucifer_Game.physics.enable(wraith_Object, Phaser.Physics.ARCADE);
	Lucifer_Game.add.existing(wraith_Object);

	//Hp Bar
	wraith_Object.HpBar = wraith_Object.addChild(Lucifer_Game.make.sprite(0, -100, 'monsterHealthBar'));
	wraith_Object.HpBar.anchor.set(0.5, 0.5);
	wraith_Object.HpBar.visible = false;

	//Hp Mask
	wraith_Object.HpMask = wraith_Object.addChild(Lucifer_Game.add.graphics(0, -100));
	wraith_Object.HpMask.beginFill(0xffffff);

	//Name
	wraith_Object.Name = Lucifer_Game.add.text(wraith_Object.x, wraith_Object.y - 100, 'Wraith');
	wraith_Object.Name.anchor.set(0.5);
	wraith_Object.Name.align = 'center';
	wraith_Object.Name.font = 'Arial';
	wraith_Object.Name.fontSize = 13;
	wraith_Object.Name.fontWeight = 'normal';
	wraith_Object.Name.fill = '#19de65';
	wraith_Object.Name.visible = false;

	//Input mouse Over / Up
	wraith_Object.inputEnabled = true;
	wraith_Object.events.onInputOver.add(wraith_over, wraith_Object);
	wraith_Object.events.onInputOut.add(wraith_out, wraith_Object);

	//Rect
	wraith_Object.HitRect = new Phaser.Rectangle(wraith_Object.x, wraith_Object.y, 90, 90);
	wraith_Object.AttackRect = new Phaser.Rectangle(wraith_Object.x, wraith_Object.y, 100, 100);

	//Delay Timer
	wraith_Object.Attack_DelayTimer = Lucifer_Game.time.create(false);
	wraith_Object.Attack_DelayTimer.loop(1000, wraith_DelayTimer, Lucifer_Game, wraith_Object);

	//Regen Timer
	wraith_Object.Regen_Timer = Lucifer_Game.time.create(false);
	wraith_Object.Regen_Timer.loop(1000, wraith_RegenTimer, Lucifer_Game, wraith_Object);

	wraith_Group.add(wraith_Object);
}
//------------------------------------------------------------------------------
//Over / Out
function wraith_over(Object)
{
	Object.Name.visible = true;
	Object.HpBar.visible = true;
}
function wraith_out(Object)
{
	Object.Name.visible = false;
	Object.HpBar.visible = false;
}

//Timer
function wraith_DelayTimer(Object)
{
	++Object.DelayTime_Total;
}

function wraith_RegenTimer(Object)
{
	++Object.Regen_Time_Total;
}

//Name
function wraith_FollwName(Object)
{
	Object.Name.x = Object.position.x;

	var NamePointY = Object.position.y + 70;
	Object.Name.y = NamePointY;
}
//----------------------------------------------------------------------------------------------

//Direction
//----------------------------------------------------------------------------------------------
function wraith_GetDirection(Object)
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

function wraith_GetReturnDirection(Object)
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

function wraith_Compare_Direction(PreDirection, CurDirection, Object)
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
function wraith_Animation_Change(Direction, Status, Object)
{
	if(Object.DeadCheck == false)
	{
		if(Object.Status[0] == Status)
		{
			//Stand
			Object.loadTexture('MON_Wraith_Stand', 0, true);
			Object.animations.play('MON_Wraith_Stand_' + Direction, 10, true);
		}	
		else if(Object.Status[1] == Status)
		{
			//Walk
			Object.loadTexture('MON_Wraith_Run', 0, true);
			Object.animations.play('MON_Wraith_Run_' + Direction, 10, true);
		}
		else if(Object.Status[2] == Status)
		{
			//Attack
			Object.loadTexture('MON_Wraith_Attack', 0, true);
			Object.animations.play('MON_Wraith_Attack_' + Direction, 10, true);
		}
	}
}
//----------------------------------------------------------------------------------------------

//AI
//----------------------------------------------------------------------------------------------
function wraith_Move(Object)
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
				wraith_Animation_Change(Object.Direction, 'Run', Object);
			}			
		}

		if(Object.Distance < Object.AttackRange)
		{
			//Stand
			if(Object.StandCheck == false)
			{
				wraith_Animation_Change(Object.Direction, 'Stand', Object);
				Object.StandCheck = true;
			}
	
			//Attack
			wraith_Attack(Object);

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

					Lucifer_Game.physics.arcade.moveToXY(Object, Object.ReturnPointX, Object.ReturnPointY, 60);
					wraith_Animation_Change(Object.ReturnDirection, 'Run', Object);
				}
			}

			//Return Stand
			if(Object.ReturnDistance < 10)
			{
				Object.ReturnCheck = false;

				if(Object.StandCheck == false)
				{
					Object.StandCheck = true;

					wraith_Animation_Change(Object.ReturnDirection, 'Stand', Object);						
				}

				Object.body.velocity.x = 0;
				Object.body.velocity.y = 0;
			}
		}

		wraith_Compare_Direction(Object.PreDirection, Object.Direction, Object);
	}
}

function wraith_Attack(Object)
{
	if(Object.StandCheck == true)
	{
		if(Phaser.Rectangle.intersects(Object.AttackRect, Hit_Rect))
		{
			Object.Attack_DelayTimer.start();

			if(Object.AttackCheck == false)
			{
				wraith_Animation_Change(Object.Direction, 'Attack', Object);
				wraith_HitCount(Object);
				Object.AttackCheck = true;
			}
		}
		else
		{
			Object.StandCheck = false;
			Object.MoveCheck = false;
		}
	}
}

function wraith_HitCount(Object)
{
	if(Object.DelayTime_Total > 1)
	{
		health -= 20;	//Mosnter Attack Point Setting
		Object.DelayTime_Total = 0;
	}
}

function wraith_Dead(Object)
{
	if(Object.Hp < 0)
	{
		Object.DeadCheck = true;
	}

	if(Object.DeadCheck == true)
	{
		if(Object.DeadMotionCheck == false)
		{
			Object.loadTexture('MON_Wraith_Dead', 0, true);
			Object.animations.play('MON_Wraith_Dead_' + Object.Direction, 10, true);
			Object.DeadMotionCheck = true;
		}

		var CurFrame = Object.animations.frame;
		var EndFrame;		

		if(Object.Direction == 0)
		{
			EndFrame = 19;
		}
		else
		{
			EndFrame = 19 * (Object.Direction + 1);
		}

		if(Object.DeadMotionCheck == true && CurFrame == EndFrame)
		{
			Object.kill();
			Object.Name.visible = false;
		}				
	}
}

function wraith_Regen(Object)
{
	if(Object.DeadMotionCheck == true)
	{
		Object.Regen_Check = true;
		Object.Regen_Timer.start();

		if(Object.Regen_Time_Total > Object.Regen_Time)
		{
			Object.revive();
			Object.Name.visible = true;

			Object.Regen_Check = false;
			
			Object.AI_StartCheck = false, Object.MoveCheck = false, Object.StandCheck = false;
			Object.AttackCheck = false, Object.CompareCheck = false, Object.DamageCheck = false;
			Object.DeadCheck = false,	Object.DeadMotionCheck = false, Object.ReturnCheck = false;

			Object.Hp = 100;
			Object.MaxHp = 100;
			Object.x = Object.ReturnPointX;
			Object.y = Object.ReturnPointY;

			wraith_Animation_Change(Object.Direction, 'Stand', Object);

			Object.Regen_Timer.stop();
			Object.Regen_Time_Total = 0;
		}
	}
}
//----------------------------------------------------------------------------------------------

//UI
//----------------------------------------------------------------------------------------------
function wraith_Hpbar_Mask(Object)
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

function wraith_RectPos(Object)
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
function wraith_Update()
{
	for(var i = 0; i < wraith_Group.length; ++i)
	{
		var wraith = wraith_Group.getChildAt(i);

		wraith_Hpbar_Mask(wraith);
		wraith_RectPos(wraith);
		wraith_FollwName(wraith);
		wraith_GetDirection(wraith);
		wraith_GetReturnDirection(wraith);
		wraith_Move(wraith);

		//Player Mosnter Collision
		if(wraith.Regen_Check == false)
		{
			player_Monster_Col(wraith);				
		}		

		wraith_Dead(wraith);
		wraith_Regen(wraith);
	}
}

function wraith_Render()
{
	var length = wraith_Group.length;
	for(var i = 0; i < length; ++i)
	{
		var wraith = wraith_Group.getChildAt(i);

		Lucifer_Game.debug.geom(wraith.HitRect, 'rgba(200, 0, 0, 0.5)');
		Lucifer_Game.debug.geom(wraith.AttackRect, 'rgba(0, 0, 200, 0.5)');
	}
}
//----------------------------------------------------------------------------------------------