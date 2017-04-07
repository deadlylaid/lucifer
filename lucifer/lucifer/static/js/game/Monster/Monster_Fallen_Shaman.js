// Shaman 기본 변수 
//------------------------------------------------------------------------------
var fallenShaman_Group, fallenShaman_Object;
var fallenShaman_FireRate = 100;
var fallenShaman_NextFire = 0;
//------------------------------------------------------------------------------

// Shman
Fallen_Shaman = function(game, x, y, Hp, MaxHp, CognizeRange, AttackRange)
{
	Phaser.Sprite.call(this, game, x, y, 'MON_FallenShaman_Attack');
	this.Hp = Hp;
	this.MaxHp = MaxHp;
	this.CognizeRange = CognizeRange;
	this.AttackRange = AttackRange;

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
	this.MoveCheck = false, this.StandCheck = false;
	this.AttackCheck = false, this.CompareCheck = false;
	this.DamageCheck = false, this.DeadCheck = false;

	//Attack
	this.FireBall, this.FireBall_Rect;
	this.FireBall_ColCheck = false;
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
	Lucifer_Game.load.spritesheet('MONSK_FireBall', 
								  '../../static/images/game/Monster_Skill/Fire_Ball.png',
								  100, 100);
}

function fallen_Shaman_Create()
{
	//Group
	fallenShaman_Group = Lucifer_Game.add.group();
	fallen_Shaman_Clone(3800, 1492);
}

function fallen_Shaman_Clone(PointX, PointY)
{
	fallenShaman_Object = new Fallen_Shaman(Lucifer_Game, PointX, PointY, 300, 300, 300, 100);

	Lucifer_Game.physics.p2.enable(fallenShaman_Object);
	fallenShaman_Object.body.fixedRotation = true;
	fallenShaman_Object.body.clearShapes();
	fallenShaman_Object.body.addRectangle(40, 60, 0, 0);
	fallenShaman_Object.body.debug = true;

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
	for(var i = 0; i < 8; ++i)
	{
		fallenShaman_Object.animations.add('MON_FallenShaman_Dead_' + i,
										   [index, index + 1, index + 2, index + 3, index + 4], 
										   60, true);
		index += 5;
	}

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
	fallenShaman_Object.HitRect = new Phaser.Rectangle(fallenShaman_Object.x, fallenShaman_Object.y, 60, 60);
	fallenShaman_Object.AttackRect = new Phaser.Rectangle(fallenShaman_Object.x, fallenShaman_Object.y, 200, 200);								  	

	//Delay timer
	fallenShaman_Object.Attack_DelayTimer = Lucifer_Game.time.create(false);
	fallenShaman_Object.Attack_DelayTimer.loop(1000, fallen_Shaman_DelayTimer, Lucifer_Game, fallenShaman_Object);	

	//Attack(Fire Ball)
	fallenShaman_Object.FireBall = Lucifer_Game.add.group();
	fallenShaman_Object.FireBall.enableBody = true;
	fallenShaman_Object.FireBall.physicsBodyType = Phaser.Physics.ARCADE;
	fallenShaman_Object.FireBall.createMultiple(50, 'MONSK_FireBall');
	fallenShaman_Object.FireBall.setAll('outOfBoundsKill', true);

	for(var i = 0; i < fallenShaman_Object.FireBall.length; ++i)
	{
		fallenShaman_Object.FireBall.getChildAt(i).blendMode = Phaser.blendModes.ADD;
	}

	/*
	fallenShaman_Object.FireBall = Lucifer_Game.add.sprite(fallenShaman_Object.x, fallenShaman_Object.y, 'MONSK_FireBall');
	fallenShaman_Object.FireBall.anchor.setTo(0.5, 0.5);
	fallenShaman_Object.FireBall.blendMode = Phaser.blendModes.ADD;
	fallenShaman_Object.FireBall.visible = false;
	Lucifer_Game.physics.enable(fallenShaman_Object.FireBall, Phaser.Physics.ARCADE);

	fallenShaman_Object.FireBall_Rect = new Phaser.Rectangle(fallenShaman_Object.FireBall.x, fallenShaman_Object.FireBall.y,
															 50, 50);
	//Fire(Ball) animation
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		fallenShaman_Object.FireBall.animations.add('FireBall_' + i,
													[index, index + 1, index + 2, index + 3, index + 4], 60 , false);
		index += 5;
	}	
	*/

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

//Name
function fallen_Shaman_FollwName()
{
	for(var i = 0; i < fallenShaman_Group.length; ++i)
	{	
		if(fallenShaman_Group.getChildAt(i).DeadCheck == false)
		{
			fallenShaman_Group.getChildAt(i).Name.x = fallenShaman_Group.getChildAt(i).position.x;

			var shaman_NamePointY = fallenShaman_Group.getChildAt(i).position.y + 70;
			fallenShaman_Group.getChildAt(i).Name.y = shaman_NamePointY;
		}		
	}
}
//-------------------------------------------------------------------------------------------

//Direction
//-------------------------------------------------------------------------------------------
function fallen_Shaman_GetDirection()
{
	for(var i = 0; i < fallenShaman_Group.length; ++i)
	{
		var Shaman = fallenShaman_Group.getChildAt(i);
		Shaman.Distance = Phaser.Math.distance(Shaman.x, Shaman.y, Player.x, Player.y);

		if(Shaman.DeadCheck == false)
		{
			if(Shaman.Distance < Shaman.CognizeRange)
			{
				Shaman.Angle = Lucifer_Game.physics.arcade.angleToXY(Shaman, Player.world.x, Player.world.y);
				Shaman.Angle = Math.abs(Shaman.Angle);

				if(Shaman.y < Player.y)
				{
					Shaman.Angle = 2 * Math.PI - Shaman.Angle;
				}

				if(Shaman.Angle >= 0 && Shaman.Angle <= 0.7)
				{
					Shaman.Direction = 7;
				}
				else if(Shaman.Angle > 0.7 && Shaman.Angle <= 1.9)
				{
					Shaman.Direction = 0;
				}
				else if(Shaman.Angle > 1.9 && Shaman.Angle <= 2.9)
				{
					Shaman.Direction = 1;
				}
				else if(Shaman.Angle > 2.9 && Shaman.Angle <= 3.9)
				{
					Shaman.Direction = 2;
				}
				else if(Shaman.Angle > 3.6 && Shaman.Angle <= 4.2)
				{
					Shaman.Direction = 3;
				}
				else if(Shaman.Angle > 4.2 && Shaman.Angle <= 4.9)
				{
					Shaman.Direction = 4;
				}
				else if(Shaman.Angle > 4.9 && Shaman.Angle <= 5.7)
				{
					Shaman.Direction = 5;
				}
				else if(Shaman.Angle > 5.7 && Shaman.Angle <= 6.2)
				{
					Shaman.Direction = 6;
				}

				if(Shaman.CompareCheck == false)
				{
					Shaman.PreDirection = Shaman.Direction;	
					Shaman.CompareCheck = true;			
				}
			}
		}
	}
}

function fallen_Shaman_GetReturnDirection()
{
	for(var i = 0; i < fallenShaman_Group.length; ++i)
	{
		var Shaman = fallenShaman_Group.getChildAt(i);
		Shaman.ReturnDistance = Phaser.Math.distance(Shaman.x, Shaman.y, Shaman.ReturnPointX, Shaman.ReturnPointY);

		if(Shaman.DeadCheck == false)
		{
			if(Shaman.ReturnDistance > Shaman.CognizeRange)
			{
				Shaman.ReturnAngle = Lucifer_Game.physics.arcade.angleToXY(Shaman, Shaman.ReturnPointX, Shaman.ReturnPointY);
				Shaman.ReturnAngle = Math.abs(Shaman.ReturnAngle);

				if(Shaman.y < Shaman.ReturnPointY)
				{
					Shaman.ReturnAngle = 2 * Math.PI - Shaman.ReturnAngle;
				}

				if(Shaman.ReturnAngle >= 0 && Shaman.ReturnAngle <= 0.7)
				{
					Shaman.ReturnDirection = 7;
				}
				else if(Shaman.ReturnAngle > 0.7 && Shaman.ReturnAngle <= 1.9)
				{
					Shaman.ReturnDirection = 0;
				}
				else if(Shaman.ReturnAngle > 1.9 && Shaman.ReturnAngle <= 2.9)
				{
					Shaman.ReturnDirection = 1;
				}
				else if(Shaman.ReturnAngle > 2.9 && Shaman.ReturnAngle <= 3.9)
				{
					Shaman.ReturnDirection = 2;
				}
				else if(Shaman.ReturnAngle > 3.6 && Shaman.ReturnAngle <= 4.2)
				{
					Shaman.ReturnDirection = 3;
				}
				else if(Shaman.ReturnAngle > 4.2 && Shaman.ReturnAngle <= 4.9)
				{
					Shaman.ReturnDirection = 4;
				}
				else if(Shaman.ReturnAngle > 4.9 && Shaman.ReturnAngle <= 5.7)
				{
					Shaman.ReturnDirection = 5;
				}
				else if(Shaman.ReturnAngle > 5.7 && Shaman.ReturnAngle <= 6.2)
				{
					Shaman.ReturnDirection = 6;
				}

				Shaman.Direction = Shaman.ReturnDirection;

				if(Shaman.CompareCheck == false)
				{
					Shaman.PreDirection = Shaman.Direction;	
					Shaman.CompareCheck = true;			
				}
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
	else if(Object.Status[3] == Status)
	{
		//Dead
		Object.loadTexture('MON_FallenShaman_Dead', 0, true);
		Object.animations.play('MON_FallenShaman_Dead_' + Direction, 10, true);
	}
}
//-------------------------------------------------------------------------------------------

//Shaman AI
//-------------------------------------------------------------------------------------------
function fallen_Shaman_Move()
{
	for(var i = 0; i < fallenShaman_Group.length; ++i)
	{
		var Shaman = fallenShaman_Group.getChildAt(i);

		if(Shaman.DeadCheck == false)
		{
			if(Shaman.Distance < Shaman.CognizeRange)
			{
				//Run
				if(Shaman.MoveCheck == false)
				{
					Shaman.StandCheck = false;
					Shaman.AttackCheck = false;
					Shaman.DamageCheck = false;
					Shaman.MoveCheck = true;

					Lucifer_Game.physics.arcade.moveToObject(Shaman, Player, 80);
					fallen_Shaman_Animation_Change(Shaman.Direction, 'Run', Shaman);
				}

				//Stand
				if(Shaman.Distance < Shaman.AttackRange)
				{
					if(Shaman.StandCheck == false)
					{
						fallen_Shaman_Animation_Change(Shaman.Direction, 'Stand', Shaman);
						Shaman.StandCheck = true;
					}

					//Attack
					fallen_Shaman_Attack(Shaman);

					Shaman.body.velocity.x = 0;
					Shaman.body.velocity.y = 0;
				}
			}
			else
			{
				//Return Run
				if(Shaman.ReturnDistance > 10)
				{
					console.log(Shaman.MoveCheck);
					console.log(Shaman.ReturnDistance);

					if(Shaman.MoveCheck == false)
					{
						Shaman.StandCheck = false;
						Shaman.MoveCheck = true;
						
						Lucifer_Game.physics.arcade.moveToXY(Shaman, Shaman.ReturnPointX, Shaman.ReturnPointY, 80);
						fallen_Shaman_Animation_Change(Shaman.ReturnDirection, 'Run', Shaman);	
					}
				}

				//Return Stand
				if(Shaman.ReturnDistance < 10)
				{
					if(Shaman.StandCheck == false)
					{
						fallen_Shaman_Animation_Change(Shaman.ReturnDirection, 'Stand', Shaman);
						Shaman.StandCheck = true;
					}					

					Shaman.body.velocity.x = 0;
					Shaman.body.velocity.y = 0;
				}
			}

			fallen_Shaman_Compare_Direction(Shaman.PreDirection, Shaman.Direction, Shaman);	
		}
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

				//Fire Ball 발사
				fallen_Shaman_Fire(Object);

				Object.AttackCheck = true;	
			}

			fallen_Shaman_HitCount(Object);
		}
	}
}

function fallen_Shaman_Fire(Object)
{	
	/*
	Object.FireBall.x = Object.x;
	Object.FireBall.y = Object.y;

	Object.FireBall.visible = true;
	Object.FireBall.loadTexture('MONSK_FireBall', 0, true);
	Object.FireBall.animations.play('FireBall_' + Direction, 20, true);

	//Move FireBall
	Lucifer_Game.physics.arcade.moveToObject(Object.FireBall, Player, 130);
	*/

	if(Lucifer_Game.time.now > fallenShaman_NextFire && Object.FireBall.countDead() > 0)
	{
		fallenShaman_NextFire = Lucifer_Game.time.now + fallenShaman_FireRate;
		
		var fireBall = Object.FireBall.getFirstDead();
		fireBall.reset(Object.x, Object.y);

		Lucifer_Game.physics.arcade.moveToObject(fireBall, Player, 200);		
	}
}

function fallen_Shaman_HitCount(Object)
{
	if(Object.DelayTime_Total > 1)
	{
		//몬스터 공격력 만큼 빼줘야됨.
		health -= 10; 
		Object.DelayTime_Total = 0;
	}
}

function fallen_Shaman_Dead()
{
	for(var i = 0; i < fallenShaman_Group.length; ++i)
	{
		var Shaman = fallenShaman_Group.getChildAt(i);

		if(Shaman.Hp < 0)
		{
			fallen_Shaman_Animation_Change(Object.Direction, 'Dead', Object);
			//Shaman.DeadCheck = true;			
		}

		if(Shaman.DeadCheck == true)
		{
			Shaman.destroy();
			Shaman.Name.destroy();
		}
	}
}
//-------------------------------------------------------------------------------------------

//Hp Bar Mask
function fallen_Shaman_Hpbar_Mask()
{
	for(var i = 0; i < fallenShaman_Group.length; ++i)
	{
		var Shaman = fallenShaman_Group.getChildAt(i);

		if(Shaman.DeadCheck == false)
		{
			Shaman.HpMask.clear();
			Shaman.HpMask.drawRect(Shaman.HpBar.x - 100, Shaman.HpBar.y, Shaman.Hp, 200);
			Shaman.HpBar.mask = Shaman.HpMask;
		}
	}
}

//Rect Position
function fallen_Shaman_RectPos()
{
	for(var i = 0; i < fallenShaman_Group.length; ++i)
	{
		var Shaman = fallenShaman_Group.getChildAt(i);

		if(Shaman.DeadCheck == false)
		{
			//Hir Rect
			Shaman.HitRect.x = Shaman.x;
			Shaman.HitRect.y = Shaman.y;
			Shaman.HitRect.centerOn(Shaman.x, Shaman.y);

			//Attack Rect
			Shaman.AttackRect.x = Shaman.x;
			Shaman.AttackRect.y = Shaman.y;
			Shaman.AttackRect.centerOn(Shaman.x, Shaman.y);
		}
	}
}

// Shaman Update / Render
//-------------------------------------------------------------------------------------------
function fallen_Shaman_Update()
{
	fallen_Shaman_Hpbar_Mask();
	fallen_Shaman_RectPos();
	fallen_Shaman_FollwName();
	fallen_Shaman_GetDirection();
	fallen_Shaman_GetReturnDirection();
	fallen_Shaman_Move();

	//Dead
	fallen_Shaman_Dead();
}

function fallen_Shaman_Render()
{
	for(var i = 0; i < fallenShaman_Group.length; ++i)
	{
		Lucifer_Game.debug.geom(fallenShaman_Group.getChildAt(i).HitRect, 'rgba(0, 200, 0, 0.5)');
		Lucifer_Game.debug.geom(fallenShaman_Group.getChildAt(i).AttackRect, 'rgba(200, 0, 200, 0.5)');
		Lucifer_Game.debug.geom(fallenShaman_Group.getChildAt(i).FireBall_Rect, 'rgba(100, 100, 0, 0.5)');
	}
}
//-------------------------------------------------------------------------------------------