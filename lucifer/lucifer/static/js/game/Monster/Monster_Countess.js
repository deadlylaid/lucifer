//Countess
//----------------------------------------------------------------------------------------------
var countess_Group, countess_Object;
//----------------------------------------------------------------------------------------------

//Countess
Countess = function(game, x, y, Hp, MaxHp, CognizeRange, AttackRange)
{
	Phaser.Sprite.call(this, game, x, y, 'MON_Countess_Dead');
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

	//Motion Check
	this.AI_StartCheck = false, this.MoveCheck = false, this.StandCheck = false;
	this.AttackCheck = false, this.CompareCheck = false, this.DamageCheck = false;
	this.DeadCheck = false,	this.DeadMotionCheck = false, this.ReturnCheck = false;
}

Countess.prototype = Object.create(Phaser.Sprite.prototype);
Countess.prototype.constructor = Countess;

//Preload / Create / Clone
//----------------------------------------------------------------------------------------------
function countess_Preload()
{
	Lucifer_Game.load.spritesheet('MON_Countess_Stand',
								  '../../static/images/game/Monster/Countess/stand/stand.png',
								  48, 89);
	Lucifer_Game.load.spritesheet('MON_Countess_Run',
								  '../../static/images/game/Monster/Countess/run/run.png',
								  66, 77);
	Lucifer_Game.load.spritesheet('MON_Countess_Attack',
								  '../../static/images/game/Monster/Countess/attack/attack.png',
								  106, 101);
	Lucifer_Game.load.spritesheet('MON_Countess_Dead',
								  '../../static/images/game/Monster/Countess/death/death.png',
								  82, 159);	
}

function countess_Create()
{
	Lucifer_Game.renderer.setTexturePriority(['MON_Countess_Stand', 'MON_Countess_Run', 
											  'MON_Countess_Attack', 'MON_Countess_Dead']);
	countess_Group = Lucifer_Game.add.group();
	countess_Clone(4142, 2428);
	countess_Clone(3964, 2315);
	countess_Clone(4448, 2343);
	countess_Clone(5265, 1238);
	countess_Clone(5375, 1387);
	countess_Clone(5059, 1296);
	countess_Clone(4984, 1145);
}

function countess_Clone(PointX, PointY)
{
	countess_Object = new Countess(Lucifer_Game, PointX, PointY, 100, 100, 300, 60);

	Lucifer_Game.physics.p2.enable(countess_Object);
	countess_Object.body.fixedRotation = true;
	countess_Object.body.clearShapes();
	countess_Object.body.addRectangle(60, 60, 0, 0);
	countess_Object.body.debug = true;	
	countess_Object.body.restitution = 0;
	
	//Animation
	//Stand
	var index = 0;
	for(var i = 0; i < 8; ++i)
	{
		countess_Object.animations.add('MON_Countess_Stand_' + i,
									 [
									 	index, 	   index + 1, index + 2, index + 3, index + 4,
									 	index + 5, index + 6, index + 7, index + 8, index + 9,
									 	index + 10 
									 ], 60, true);		
		index += 11;		
	}	

	//Run
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		countess_Object.animations.add('MON_Countess_Run_' + i,
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
		countess_Object.animations.add('MON_Countess_Attack_' + i,
									 [
									 	index,      index + 1,  index + 2,  index + 3,  index + 4,
									 	index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									 	index + 10, index + 11, index + 12, index + 13, index + 14,
									 	index + 15									 	
									 ], 60, true);
		index += 16;
	}

	//Dead
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		countess_Object.animations.add('MON_Countess_Dead_' + i,
									[
									   index,      index + 1,  index + 2,  index + 3,  index + 4,
									   index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									   index + 10, index + 11, index + 12, index + 13, index + 14,
									   index + 15, index + 16, index + 17, index + 18, index + 19,
									   index + 20, index + 21, index + 22, index + 23, index + 24	
									], 60, true);	
		index += 25;	
	}	

	countess_Object.loadTexture('MON_Countess_Stand', 0, true);
	countess_Object.animations.play('MON_Countess_Stand_0', 10, true);
	countess_Object.anchor.setTo(0.5, 0.5);

	Lucifer_Game.physics.enable(countess_Object, Phaser.Physics.ARCADE);
	Lucifer_Game.add.existing(countess_Object);

	//Hp Bar
	countess_Object.HpBar = countess_Object.addChild(Lucifer_Game.make.sprite(0, -100, 'monsterHealthBar'));
	countess_Object.HpBar.anchor.set(0.5, 0.5);
	countess_Object.HpBar.visible = false;

	//Hp Mask
	countess_Object.HpMask = countess_Object.addChild(Lucifer_Game.add.graphics(0, -100));
	countess_Object.HpMask.beginFill(0xffffff);

	//Name
	countess_Object.Name = Lucifer_Game.add.text(countess_Object.x, countess_Object.y - 100, 'Countess');
	countess_Object.Name.anchor.set(0.5);
	countess_Object.Name.align = 'center';
	countess_Object.Name.font = 'Arial';
	countess_Object.Name.fontSize = 13;
	countess_Object.Name.fontWeight = 'normal';
	countess_Object.Name.fill = '#19de65';
	countess_Object.Name.visible = false;

	//Input mouse Over / Up
	countess_Object.inputEnabled = true;
	countess_Object.events.onInputOver.add(countess_over, countess_Object);
	countess_Object.events.onInputOut.add(countess_out, countess_Object);

	//Rect
	countess_Object.HitRect = new Phaser.Rectangle(countess_Object.x, countess_Object.y, 70, 70);
	countess_Object.AttackRect = new Phaser.Rectangle(countess_Object.x, countess_Object.y, 80, 80);

	//Delay Timer
	countess_Object.Attack_DelayTimer = Lucifer_Game.time.create(false);
	countess_Object.Attack_DelayTimer.loop(1000, countess_DelayTimer, Lucifer_Game, countess_Object);

	countess_Group.add(countess_Object);
}
//----------------------------------------------------------------------------------------------
//Over / Out
function countess_over(Object)
{
	Object.Name.visible = true;
	Object.HpBar.visible = true;
}
function countess_out(Object)
{
	Object.Name.visible = false;
	Object.HpBar.visible = false;
}

//Timer
function countess_DelayTimer(Object)
{
	++Object.DelayTime_Total;
}

//Name
function countess_FollwName(Object)
{
	Object.Name.x = Object.position.x;

	var NamePointY = Object.position.y + 70;
	Object.Name.y = NamePointY;
}
//----------------------------------------------------------------------------------------------

//Direction
//----------------------------------------------------------------------------------------------
function countess_GetDirection(Object)
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

function countess_GetReturnDirection(Object)
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

function countess_Compare_Direction(PreDirection, CurDirection, Object)
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
function countess_Animation_Change(Direction, Status, Object)
{
	if(Object.DeadCheck == false)
	{
		if(Object.Status[0] == Status)
		{
			//Stand
			Object.loadTexture('MON_Countess_Stand', 0, true);
			Object.animations.play('MON_Countess_Stand_' + Direction, 10, true);
		}	
		else if(Object.Status[1] == Status)
		{
			//Walk
			Object.loadTexture('MON_Countess_Run', 0, true);
			Object.animations.play('MON_Countess_Run_' + Direction, 10, true);
		}
		else if(Object.Status[2] == Status)
		{
			//Attack
			Object.loadTexture('MON_Countess_Attack', 0, true);
			Object.animations.play('MON_Countess_Attack_' + Direction, 10, true);
		}		
	}
}
//----------------------------------------------------------------------------------------------

//AI
//----------------------------------------------------------------------------------------------
function countess_Move(Object)
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
				countess_Animation_Change(Object.Direction, 'Run', Object);
			}			
		}

		if(Object.Distance < Object.AttackRange)
		{
			//Stand
			if(Object.StandCheck == false)
			{
				countess_Animation_Change(Object.Direction, 'Stand', Object);
				Object.StandCheck = true;
			}
			
			//Attack
			countess_Attack(Object);
			
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
					countess_Animation_Change(Object.ReturnDirection, 'Run', Object);
				}
			}

			//Return Stand
			if(Object.ReturnDistance < 10)
			{
				if(Object.StandCheck == false)
				{
					Object.StandCheck = true;

					countess_Animation_Change(Object.ReturnDirection, 'Stand', Object);						
				}

				Object.body.velocity.x = 0;
				Object.body.velocity.y = 0;
			}
		}

		countess_Compare_Direction(Object.PreDirection, Object.Direction, Object);
	}
}

function countess_Attack(Object)
{
	if(Object.StandCheck == true)
	{
		if(Phaser.Rectangle.intersects(Object.AttackRect, Hit_Rect))
		{
			Object.Attack_DelayTimer.start();

			if(Object.AttackCheck == false)
			{
				countess_Animation_Change(Object.Direction, 'Attack', Object);
				countess_HitCount(Object);
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

function countess_HitCount(Object)
{
	if(Object.DelayTime_Total > 1)
	{
		health -= 20;	//Mosnter Attack Point Setting
		Object.DelayTime_Total = 0;
	}
}

function countess_Dead(Object)
{
	if(Object.Hp < 0)
	{
		Object.DeadCheck = true;
	}

	if(Object.DeadCheck == true)
	{
		if(Object.DeadMotionCheck == false)
		{
			Object.loadTexture('MON_Countess_Dead', 0, true);
			Object.animations.play('MON_Countess_Dead_' + Object.Direction, 10, true);
			Object.DeadMotionCheck = true;
		}
		
		var CurFrame = Object.animations.frame;
		var EndFrame;		

		if(Object.Direction == 0)
		{
			EndFrame = 24;
		}
		else
		{
			EndFrame = 24 * (Object.Direction + 1);
		}		

		if(Object.DeadMotionCheck == true && CurFrame == EndFrame)
		{
			Object.destroy();
			Object.Name.destroy();
		}				
	}
}
//----------------------------------------------------------------------------------------------

//UI
//----------------------------------------------------------------------------------------------
function countess_Hpbar_Mask(Object)
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

function countess_RectPos(Object)
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
function countess_Update()
{
	for(var i = 0; i < countess_Group.length; ++i)
	{
		var countess = countess_Group.getChildAt(i);

		countess_Hpbar_Mask(countess);
		countess_RectPos(countess);
		countess_FollwName(countess);
		countess_GetDirection(countess);
		countess_GetReturnDirection(countess);
		countess_Move(countess);

		//Player Mosnter Collision
		player_Monster_Col(countess);

		countess_Dead(countess);
	}
}

function countess_Render()
{
	var length = countess_Group.length;
	for(var i = 0; i < length; ++i)
	{
		var countess = countess_Group.getChildAt(i);

		Lucifer_Game.debug.geom(countess.HitRect, 'rgba(200, 0, 0, 0.5)');
		Lucifer_Game.debug.geom(countess.AttackRect, 'rgba(0, 0, 200, 0.5)');
	}
}
//----------------------------------------------------------------------------------------------