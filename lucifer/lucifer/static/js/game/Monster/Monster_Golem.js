// 골렘 기본 변수들 
//------------------------------------------------------------------------------
var golem_Group, golem_Object;

//골렘 Create 함수 재정의
Golem = function(game, x, y, Hp, MaxHp, CognizeRange, AttackRange)
{
	Phaser.Sprite.call(this, game, x, y, 'MON_Golem_Attack');
	this.Hp = Hp, this.MaxHp = MaxHp;
	this.CognizeRange = CognizeRange, this.AttackRange = AttackRange;

	//Stat
	this.Attack_Point = 50, this.Defence_Point = 30;

	//Status
	this.Status = new Array('Stand', 'Walk', 'Attack', 'Dead');
	
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
	this.ReturnDirection, this.ReturnDistance, this.ReturnAngle;

	//Motion Check
	this.AI_StartCheck = false, this.MoveCheck = false, this.StandCheck = false;
	this.AttackCheck = false, this.CompareCheck = false, this.DamageCheck = false;
	this.DeadCheck = false,	this.DeadMotionCheck = false, this.ReturnCheck = false;
	this.MouseCheck = false;

	//Regen Time
	this.Regen_Timer, this.Regen_Time_Total = 0, this.Regen_Time = 10, this.Regen_Check = false;

	//Level System
	this.ExpCheck = false, this.ExpTimer, this.ExpTime_Total = 1;

	//Blood Effect
	this.blood_Effect;
}

Golem.prototype = Object.create(Phaser.Sprite.prototype);
Golem.prototype.constructor = Golem;

//골렘 Prelaod / Create
//-------------------------------------------------------------------------------------------
function golem_Preload()
{
	Lucifer_Game.load.spritesheet('MON_Golem_Stand',
								  '../../static/images/game/Monster/Golem/stand/stand.png',
								  220, 210);
	Lucifer_Game.load.spritesheet('MON_Golem_Walk',
								  '../../static/images/game/Monster/Golem/walk/walk.png',
								   220, 210);
	Lucifer_Game.load.spritesheet('MON_Golem_Attack',
								  '../../static/images/game/Monster/Golem/attack/attack.png',
								   220, 210);
	Lucifer_Game.load.spritesheet('MON_Golem_Dead',
								  '../../static/images/game/Monster/Golem/dead/dead.png',
								   214, 133);							   	
    Lucifer_Game.load.spritesheet('monsterHealthBar', 
                                  '../../static/images/game/Monster/monsterHealthBar.png',
                                   228, 48);	
}

function golem_Create()
{
	Lucifer_Game.renderer.setTexturePriority(['MON_Golem_Stand', 'MON_Golem_Walk', 'MON_Golem_Attack', 'MON_Golem_Dead', 'monsterHealthBar']);

	//골렘 그룹 생성 
	//(그룹 부모 : null / 그룹 이름 : golem / Stage 등록 : false, body, Physics 등록 : true)
	golem_Group = Lucifer_Game.add.group(/*null, 'Golem', false, true, true*/);
	golem_Clone(3264, 463);		
}

function golem_Clone(PointX, PointY)
{
	golem_Object = new Golem(Lucifer_Game, PointX, PointY, 500, 500, 300, 80);
		
	Lucifer_Game.physics.p2.enable(golem_Object);
	golem_Object.body.fixedRotation = true;
	golem_Object.body.clearShapes();
	golem_Object.body.addRectangle(40, 60, 0, 0);
	golem_Object.body.debug = false;
	golem_Object.body.restitution = 0;	
	
	//Animation
	//Stand / Walk
	var index = 0;
	for(var i = 0; i < 8; ++i)
	{
		golem_Object.animations.add('MON_Golem_Stand_' + i, 
							 		[index, index + 1, index + 2, index + 3, index + 4, index + 5, index + 6], 
							 		60, true);
		golem_Object.animations.add('MON_Golem_Walk_' + i,
									[index, index + 1, index + 2, index + 3, index + 4, index + 5, index + 6], 
									60, true);
		index += 8;
	}

	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		golem_Object.animations.add('MON_Golem_Attack_' + i,
								  	[
								  		index,      index + 1,  index + 2,  index + 3, 
								    	index + 4,  index + 5,  index + 6,  index + 7, 
								    	index + 8,  index + 9,  index + 10, index + 11, 
								    	index + 12, index + 13, index + 14
								  	],
								  	60, true);
		index += 15;
	}

	//Dead
	golem_Object.animations.add('MON_Golem_Dead',
								[
								   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
								   11, 12, 13, 14, 15, 16, 17, 18, 19,
								   20, 21, 22, 23, 24, 25
								], 60, true);

	golem_Object.loadTexture('MON_Golem_Stand', 0, true);
	golem_Object.animations.play('MON_Golem_Stand_0', 10, true);
	golem_Object.anchor.setTo(0.5, 0.5);	
	
	Lucifer_Game.physics.enable(golem_Object, Phaser.Physics.ARCADE);
	Lucifer_Game.add.existing(golem_Object);

	//Hp Bar
	golem_Object.HpBar = golem_Object.addChild(Lucifer_Game.make.sprite(0, -100,"monsterHealthBar"));
	golem_Object.HpBar.anchor.set(0.5, 0.5);
	golem_Object.HpBar.visible = false;

	//Hp Mask
	golem_Object.HpMask = golem_Object.addChild(Lucifer_Game.add.graphics(0, -100));
	golem_Object.HpMask.beginFill(0xffffff);
	
	//Name
	golem_Object.Name = Lucifer_Game.add.text(golem_Object.PointX, golem_Object.PointY - 100, "Golem");
	golem_Object.Name.anchor.set(0.5);
	golem_Object.Name.align = "center";
	golem_Object.Name.font = 'Arial';
	golem_Object.Name.fontSize = 13;
	golem_Object.Name.fontWeight = 'normal';
	golem_Object.Name.fill = '#19de65';
    golem_Object.Name.visible = false;
	
	//enable all input lick 'click', 'over', etc...
	golem_Object.inputEnabled = true;
    golem_Object.events.onInputOver.add(over, golem_Object);
    golem_Object.events.onInputOut.add(out, golem_Object);

    //Rect
    golem_Object.HitRect = new Phaser.Rectangle(golem_Object.x, golem_Object.y, 60, 60);
    golem_Object.AttackRect = new Phaser.Rectangle(golem_Object.x, golem_Object.y, 100, 100);

    //Delay Timer
    golem_Object.Attack_DelayTimer = Lucifer_Game.time.create(false);
    golem_Object.Attack_DelayTimer.loop(1000, golem_DelayTimer, Lucifer_Game, golem_Object);

    //Regen Timer
	golem_Object.Regen_Timer = Lucifer_Game.time.create(false);
	golem_Object.Regen_Timer.loop(1000, golem_RegenTimer, Lucifer_Game, golem_Object);

    Lucifer_Game.physics.enable(golem_Object, Phaser.Physics.ARCADE);

    //Exp Timer
	golem_Object.ExpTimer = Lucifer_Game.time.create(false);
	golem_Object.ExpTimer.loop(10, golem_ExpTimer, Lucifer_Game, golem_Object);

	//Blood Effect
	golem_Object.blood_Effect = blood_Effect_Clone(golem_Object.x, golem_Object.y);

    golem_Group.add(golem_Object);
}
//-------------------------------------------------------------------------------------------
//Time Total add	
function golem_DelayTimer(Object)
{	
	++Object.DelayTime_Total;		
}

function golem_RegenTimer(Object)
{
	++Object.Regen_Time_Total;
}

//Exp
function golem_ExpTimer(Object)
{
	++Object.ExpTime_Total;
}

//Name
function golem_FollwName(Object)
{
	if(Object.DeadCheck == false)
	{
		Object.Name.x = Object.position.x;

		var golem_NamePointY = Object.position.y + 70;
		Object.Name.y = golem_NamePointY;
	}	
}

//Over / Out
function over(Object)
{
	Object.Name.visible  = true;
	Object.HpBar.visible = true;
}
function out(Object)
{
	Object.Name.visible  = false;
	Object.HpBar.visible = false;
}
//-------------------------------------------------------------------------------------------

//Direction
//-------------------------------------------------------------------------------------------
function golem_GetDirection(Object)
{	
	Object.Distance = Phaser.Math.distance(Object.x, Object.y, Player.x, Player.y);

	if(Object.DeadCheck == false)
	{
		//CognizeRange 안으로 Player가 접근시 Direction
		if(Object.Distance < Object.CognizeRange)
		{
			Object.Angle = Lucifer_Game.physics.arcade.angleToXY(Object, Player.world.x, Player.world.y);
			Object.Angle = Math.abs(Object.Angle);

			if(Object.PointY < Player.y)
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

function golem_GetReturnDirection(Object)
{
	Object.ReturnDistance = Phaser.Math.distance(Object.x, Object.y, Player.x, Player.y);

	if(Object.DeadCheck == false)
	{
		//CognizeRange 안으로 Player가 접근시 Direction
		if(Object.Distance > Object.CognizeRange)
		{
			Object.ReturnAngle 
				= Lucifer_Game.physics.arcade.angleToXY(Object, 
													    Player.world.x, Player.world.y);
			Object.ReturnAngle = Math.abs(Object.ReturnAngle);

			if(Object.PointY < Player.y)
			{
				Object.ReturnAngle = 2 * Math.PI - Object.ReturnAngle;		
			}	

			if(Object.Angle >= 0 && Object.Angle <= 0.7)
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
				Object.PreDirection = Object.ReturnDirection;	
				Object.CompareCheck = true;			
			}
		}
	}		
	
}

function compare_Direction(PreDirection, CurDirection, Object)
{
	//Pre Direction 과 Cur Direction 비교
	if(PreDirection != CurDirection)
	{
		Object.MoveCheck = false;
		Object.CompareCheck = false;
	} 
}
//-------------------------------------------------------------------------------------------

//Animation
//-------------------------------------------------------------------------------------------
function golem_Animation_Change(Direction, Status, Object)
{
	if(Object.Status[0] == Status)
	{
		//Stand
		Object.loadTexture('MON_Golem_Stand', 0, true);
		Object.animations.play('MON_Golem_Stand_' + Direction, 10, true);	
	}
	else if(Object.Status[1] == Status)
	{
		//Walk
		Object.loadTexture('MON_Golem_Walk', 0, true);
		Object.animations.play('MON_Golem_Walk_' + Direction, 10, true);
	}
	else if(Object.Status[2] == Status)
	{
		//Attack
		Object.loadTexture('MON_Golem_Attack', 0, true);
		Object.animations.play('MON_Golem_Attack_' + Direction, 10, true);
	}	
}
//-------------------------------------------------------------------------------------------

//Golem_AI
//-------------------------------------------------------------------------------------------
function golem_Move(Object)
{
	if(Object.DeadCheck == false)
	{
		if(Object.Distance < Object.CognizeRange)
		{
			Object.AI_StartCheck = true;

			//Walk
			if(Object.MoveCheck == false)
			{
				Object.StandCheck = false;
				Object.AttackCheck = false;
				Object.MoveCheck = true;

				Lucifer_Game.physics.arcade.moveToObject(Object, Player, 60);
				golem_Animation_Change(Object.Direction, 'Walk', Object);
			}			
		}

		if(Object.Distance < Object.AttackRange)
		{
			//Stand			
			if(Object.StandCheck == false)
			{
				golem_Animation_Change(Object.Direction, 'Stand', Object);
				Object.StandCheck = true;
			}

			//Attack
			golem_Attack(Object);

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
					golem_Animation_Change(Object.ReturnDirection, 'Walk', Object);
				}
			}

			//Return Stand
			if(Object.ReturnDistance < 10)
			{
				Object.ReturnCheck = false;	

				if(Object.StandCheck == false)
				{
					Object.StandCheck = true;

					golem_Animation_Change(Object.ReturnDirection, 'Stand', Object);					
				}

				Object.body.velocity.x = 0;
				Object.body.velocity.y = 0;
			}
		}

		compare_Direction(Object.PreDirection, Object.Direction, Object);
	}	
}

function golem_Attack(Object)
{
	if(Object.StandCheck == true)
	{
		if(Phaser.Rectangle.intersects(Object.AttackRect, Hit_Rect))
		{
			Object.Attack_DelayTimer.start();

			if(Object.AttackCheck == false)
			{
				golem_Animation_Change(Object.Direction, 'Attack', Object);				
				Object.AttackCheck = true;
			}				
		}
		else
		{
			Object.StandCheck = false;
			Object.MoveCheck = false;
		}

		golem_HitCount(Object);			
	}	
}

function golem_HitCount(Object)
{
	if(Object.DelayTime_Total > 1)
	{
		if(Object.animations.name == 'MON_Golem_Attack_' + Object.Direction)
		{
			var CurFrame = Object.animations.frame;
			var EndFrame = 0;

			if(Object.Direction == 0)
			{
				EndFrame = 14;
			}
			else
			{
				EndFrame = 14 * (Object.Direction + 1);
			}

			if(CurFrame + 4 < EndFrame)
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

function golem_Dead(Object)
{
	if(Object.Hp < 0)
	{
		Object.DeadCheck = true;		
	}	

	if(Object.DeadCheck == true)
	{
		if(Object.DeadMotionCheck == false)
		{
			Object.loadTexture('MON_Golem_Dead', 0, true);
			Object.animations.play('MON_Golem_Dead', 10, true);
			Object.DeadMotionCheck = true;

			//Collision false
			Object.body.static = true;
		}

		var CurFrame = Object.animations.frame;
		var EndFrame = 25;

		if(Object.DeadMotionCheck == true && CurFrame == EndFrame)
		{
			Object.kill();
			Object.Name.visible = false;
			Object.ExpCheck = true;
		}
	}
}

function golem_Regen(Object)
{
	if(Object.DeadCheck == true)
	{
		Object.Regen_Check = true;
		Object.Regen_Timer.start();

		if(Object.Regen_Time_Total > Object.Regen_Time)
		{
			Object.revive();
			Object.Name.visible = true;
			Object.body.static = false;

			Object.Regen_Check = false;
			
			Object.AI_StartCheck = false, Object.MoveCheck = false, Object.StandCheck = false;
			Object.AttackCheck = false, Object.CompareCheck = false, Object.DamageCheck = false;
			Object.DeadCheck = false,	Object.DeadMotionCheck = false, Object.ReturnCheck = false;
			Object.MouseCheck = false;

			Object.Hp = 500;
			Object.MaxHp = 500;
			Object.x = Object.ReturnPointX;
			Object.y = Object.ReturnPointY;

			golem_Animation_Change(Object.Direction, 'Stand', Object);

			Object.Regen_Timer.stop();
			Object.Regen_Time_Total = 0;
		}
	}
}
//-------------------------------------------------------------------------------------------

//Hp Bar Mask
function Hpbar_Mask(Object)
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

//Rect Position
function golem_RectPos(Object)
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

//골렘 Update / Render 
//-------------------------------------------------------------------------------------------
function golem_Update()
{
	//var length = golem_Group.length;
	for(var i = 0; i < golem_Group.length; ++i)
	{
		var golem = golem_Group.getChildAt(i);

		Hpbar_Mask(golem);
		golem_FollwName(golem);
		golem_GetDirection(golem);
		golem_GetReturnDirection(golem);
		golem_Move(golem);
		golem_RectPos(golem);

		//Player Mosnter Collision
		if(golem.Regen_Check == false)
		{
			player_Monster_Col(golem);				
		}	

		golem_Dead(golem);
		golem_Regen(golem);

		//Level System Check
		check_Monster_Dead(golem);

		//Mouse
		mouse_ColCheck(golem);

		//Blood Effect
		blood_Effect_Update(golem);
	}	
}

function golem_Redner()
{
	for(var i = 0; i < golem_Group.length; ++i)
	{
		Lucifer_Game.debug.geom(Object.HitRect, 'rgba(0, 0, 200, 0.5)');
		Lucifer_Game.debug.geom(Object.AttackRect, 'rgba(0, 200, 0, 0.5)');
	}
}
//-------------------------------------------------------------------------------------------

