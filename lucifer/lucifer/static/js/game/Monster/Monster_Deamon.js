//Deamon
//------------------------------------------------------------------------------
var deamon_Group, council_Group;
//------------------------------------------------------------------------------

//Deamon
Deamon = function(game, x, y, Hp, MaxHp, CognizeRange, AttackRange)
{
	Phaser.Sprite.call(this, game, x, y, 'MON_Deamon_Dead');
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

	//Direction
	this.Distance, this.Angle, this.PreDirection, this.Direction;

	//Return Direction
	this.ReturnDistance, this.ReturnDirection, this.ReturnAngle;

	//MotionCheck
	this.MoveCheck = false, this.StandCheck = false;
	this.AttackCheck = false, this.CompareCheck = false;
	this.DamageCheck = false, this.DeadCheck = false;
	this.DeadMotionCheck = false;
}

Deamon.prototype = Object.create(Phaser.Sprite.prototype);
Deamon.prototype.constructor = Deamon;

//Preload / Create / Clone
//------------------------------------------------------------------------------
function deamon_Preload()
{
	Lucifer_Game.load.spritesheet('MON_Deamon_Stand',
								  '../../static/images/game/Monster/Demon/stand/stand.png',
								  184, 147);
	Lucifer_Game.load.spritesheet('MON_Deamon_Run',
								  '../../static/images/game/Monster/Demon/run/run.png',
								  151, 152);
	Lucifer_Game.load.spritesheet('MON_Deamon_Attack',
								  '../../static/images/game/Monster/Demon/attack/attack.png',
								  200, 140);
	Lucifer_Game.load.spritesheet('MON_Deamon_Dead',
								  '../../static/images/game/Monster/Demon/death/death.png',
								  204, 172);
	Lucifer_Game.load.spritesheet('MON_Deamon_Skill',
								  '../../static/images/game/Monster/Demon/skill/skill.png',
								  203, 153);
}

function deamon_Create()
{
	Lucifer_Game.renderer.setTexturePriority(['MON_Deamon_Stand', 'MON_Deamon_Run', 
											  'MON_Deamon_Attack', 'MON_Deamon_Dead', 'MON_Deamon_Skill']);

	deamon_Group = Lucifer_Game.add.group();
	deamon_Clone(3400, 1492);
}
//------------------------------------------------------------------------------
function deamon_Clone(PointX, PointY)
{
	council_Group = new Deamon(Lucifer_Game, PointX, PointY, 100, 100, 200, 100);

	Lucifer_Game.physics.p2.enable(council_Group);
	council_Group.body.fixedRotation = true;
	council_Group.body.clearShapes();
	council_Group.body.addRectangle(60, 60, 0, 0);
	council_Group.body.debug = true;	

	//Animation
	//Stand
	var index = 0;
	for(var i = 0; i < 8; ++i)
	{
		council_Group.animations.add('MON_Deamon_Stand_' + i,
									 [
									 	index, index + 1, index + 2, index + 3, index + 4,
									 	index + 5, index + 6, index + 7
									 ], 60, true);

		council_Group.animations.add('MON_Deamon_Run_' + i,
									 [
									 	index, index + 1, index + 2, index + 3, index + 4,
									 	index + 5, index + 6, index + 7
									 ], 60, true);
		index += 8;		
	}	

	//Attack
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		council_Group.animations.add('MON_Deamon_Attack_' + i,
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
		council_Group.animations.add('MON_Deamon_Dead_' + i,
									[
									   index,      index + 1,  index + 2,  index + 3,  index + 4,
									   index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									   index + 10, index + 11, index + 12, index + 13, index + 14,
									   index + 15, index + 16, index + 17, index + 18, index + 19	
									], 60, true);	
		index += 20;	
	}

	//Skill
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		council_Group.animations.add('MON_Deamon_Skill_' + i,
									[
									   index,      index + 1,  index + 2,  index + 3,  index + 4,
									   index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									   index + 10, index + 11 
									], 60, true);	
		index += 12;
	}

	council_Group.loadTexture('MON_Deamon_Stand', 0, true);
	council_Group.animations.play('MON_Deamon_Stand_0', 10, true);
	council_Group.anchor.setTo(0.5, 0.5);

	Lucifer_Game.physics.enable(council_Group, Phaser.Physics.ARCADE);
	Lucifer_Game.add.existing(council_Group);

	//Hp Bar
	council_Group.HpBar = council_Group.addChild(Lucifer_Game.make.sprite(0, -100, 'monsterHealthBar'));
	council_Group.HpBar.anchor.set(0.5, 0.5);
	council_Group.HpBar.visible = false;

	//Hp Mask
	council_Group.HpMask = council_Group.addChild(Lucifer_Game.add.graphics(0, -100));
	council_Group.HpMask.beginFill(0xffffff);

	//Name
	council_Group.Name = Lucifer_Game.add.text(council_Group.x, council_Group.y - 100, 'Deamon');
	council_Group.Name.anchor.set(0.5);
	council_Group.Name.align = 'center';
	council_Group.Name.font = 'Arial';
	council_Group.Name.fontSize = 13;
	council_Group.Name.fontWeight = 'normal';
	council_Group.Name.fill = '#19de65';
	council_Group.Name.visible = false;

	//Input mouse Over / Up
	council_Group.inputEnabled = true;
	council_Group.events.onInputOver.add(deamon_over, council_Group);
	council_Group.events.onInputOut.add(deamon_out, council_Group);

	//Rect
	council_Group.HitRect = new Phaser.Rectangle(council_Group.x, council_Group.y, 100, 100);
	council_Group.AttackRect = new Phaser.Rectangle(council_Group.x, council_Group.y, 100, 80);

	//Delay Timer
	council_Group.Attack_DelayTimer = Lucifer_Game.time.create(false);
	council_Group.Attack_DelayTimer.loop(1000, deamon_DelayTimer, Lucifer_Game, council_Group);

	deamon_Group.add(council_Group);
}
//------------------------------------------------------------------------------
//Over / Out
function deamon_over(Object)
{
	Object.Name.visible = true;
	Object.HpBar.visible = true;
}
function deamon_out(Object)
{
	Object.Name.visible = false;
	Object.HpBar.visible = false;
}

//Timer
function deamon_DelayTimer(Object)
{
	++Object.DelayTime_Total;
}

//Name
function deamon_FollwName(Object)
{
	Object.Name.x = Object.position.x;

	var NamePointY = Object.position.y + 70;
	Object.Name.y = NamePointY;
}
//----------------------------------------------------------------------------------------------

//Direction
//----------------------------------------------------------------------------------------------
function deamon_GetDirection(Object)
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

function deamon_GetReturnDirection(Object)
{
	Object.RetrunDistance = Phaser.Math.distance(Object.x, Object.y, Object.ReturnPointX, Object.ReturnPointY);

	if(Object.DeadCheck == false)
	{
		if(Object.RetrunDistance > Object.CognizeRange)
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

function deamon_Compare_Direction(PreDirection, CurDirection, Object)
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
function deamon_Animation_Change(Direction, Status, Object)
{
	if(Object.DeadCheck == false)
	{
		if(Object.Status[0] == Status)
		{
			//Stand
			Object.loadTexture('MON_Deamon_Stand', 0, true);
			Object.animations.play('MON_Deamon_Stand_' + Direction, 10, true);
		}	
		else if(Object.Status[1] == Status)
		{
			//Walk
			Object.loadTexture('MON_Deamon_Run', 0, true);
			Object.animations.play('MON_Deamon_Run_' + Direction, 10, true);
		}
		else if(Object.Status[2] == Status)
		{
			//Attack
			Object.loadTexture('MON_Deamon_Attack', 0, true);
			Object.animations.play('MON_Deamon_Attack_' + Direction, 10, true);
		}
		else if(Object.Status[4] == Status)
		{
			//Skill
			Object.loadTexture('MON_Deamon_Skill', 0, true);
			Object.animations.play('MON_Deamon_Skill_' + Direction, 10, true);
		}
	}
}
//----------------------------------------------------------------------------------------------

//AI
//----------------------------------------------------------------------------------------------
function deamon_Move(Object)
{
	if(Object.DeadCheck == false)
	{
		if(Object.Distance < Object.CognizeRange)
		{
			//Walk
			if(Object.MoveCheck == false)
			{
				Object.AttackCheck = false;
				Object.StandCheck = false;
				Object.DamageCheck = false;
				Object.MoveCheck = true;

				Lucifer_Game.physics.arcade.moveToObject(Object, Player, 60);
				deamon_Animation_Change(Object.Direction, 'Run', Object);
			}

			//Stand
			if(Object.Distance < Object.AttackRange)
			{
				if(Object.StandCheck == false)
				{
					deamon_Animation_Change(Object.Direction, 'Stand', Object);
					Object.StandCheck = true;
				}

				//Attack
				deamon_Attack(Object);

				Object.body.velocity.x = 0;
				Object.body.velocity.y = 0;
			}
		}
		else
		{
			//Return Walk
			if(Object.RetrunDistance > 10)
			{
				if(Object.MoveCheck == false)
				{
					Object.StandCheck = false;
					Object.MoveCheck = true;

					Lucifer_Game.physics.arcade.moveToXY(Object, Object.ReturnPointX, Object.ReturnPointY, 60);
					deamon_Animation_Change(Object.ReturnDirection, 'Run', Object);
				}
			}

			//Return Stand
			if(Object.ReturnDistance < 10)
			{
				if(Object.StandCheck == false)
				{
					deamon_Animation_Change(Object.ReturnDirection, 'Stand', Object);
					Object.StandCheck = true;	
				}

				Object.body.velocity.x = 0;
				Object.body.velocity.y = 0;
			}
		}

		deamon_Compare_Direction(Object.PreDirection, Object.Direction, Object);
	}
}

function deamon_Attack(Object)
{
	if(Object.StandCheck == true)
	{
		if(Phaser.Rectangle.intersects(Object.AttackRect, Hit_Rect))
		{
			Object.Attack_DelayTimer.start();

			if(Object.AttackCheck == false)
			{
				deamon_Animation_Change(Object.Direction, 'Attack', Object);
				deamon_HitCount(Object);
				Object.AttackCheck = true;
			}
		}
	}
}

function deamon_HitCount(Object)
{
	if(Object.DelayTime_Total > 1)
	{
		health -= 20;	//Mosnter Attack Point Setting
		Object.DelayTime_Total = 0;
	}
}

function deamon_Dead(Object)
{
	if(Object.Hp < 0)
	{
		Object.DeadCheck = true;
	}

	if(Object.DeadCheck == true)
	{
		if(Object.DeadMotionCheck == false)
		{
			Object.loadTexture('MON_Deamon_Dead', 0, true);
			Object.animations.play('MON_Deamon_Dead_' + Object.Direction, 10, true);
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
			Object.destroy();
			Object.Name.destroy();
		}				
	}
}
//----------------------------------------------------------------------------------------------

//UI
//----------------------------------------------------------------------------------------------
function deamon_Hpbar_Mask(Object)
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

function deamon_RectPos(Object)
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
function deamon_Update()
{
	for(var i = 0; i < deamon_Group.length; ++i)
	{
		var deamon = deamon_Group.getChildAt(i);

		deamon_Hpbar_Mask(deamon);
		deamon_RectPos(deamon);
		deamon_FollwName(deamon);
		deamon_GetDirection(deamon);
		deamon_GetReturnDirection(deamon);
		deamon_Move(deamon);

		//Player Mosnter Collision
		player_Monster_Col(deamon);

		deamon_Dead(deamon);
	}
}

function deamon_Render()
{
	var length = deamon_Group.length;
	for(var i = 0; i < length; ++i)
	{
		var deamon = deamon_Group.getChildAt(i);

		Lucifer_Game.debug.geom(deamon.HitRect, 'rgba(200, 0, 0, 0.5)');
		Lucifer_Game.debug.geom(deamon.AttackRect, 'rgba(0, 0, 200, 0.5)');
	}
}
//----------------------------------------------------------------------------------------------