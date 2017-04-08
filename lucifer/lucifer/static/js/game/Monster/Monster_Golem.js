// 골렘 기본 변수들 
//------------------------------------------------------------------------------
var golem_Group, golem_Object;
var golem_Status = new Array('Stand', 'Walk', 'Attack', 'Damage');

//골렘 Create 함수 재정의
Golem = function(game, x, y, Hp, MaxHp, CognizeRange, AttackRange)
{
	Phaser.Sprite.call(this, game, x, y, 'MON_Golem_Attack');
	this.Hp = Hp;
	this.MaxHp = MaxHp;
	this.golem_CognizeRange = CognizeRange;
	this.golem_AttackRange = AttackRange;

	//Status
	this.golem_Status = new Array('Stand', 'Walk', 'Attack', 'Damage');
	
	//Position
	this.golem_PointX = x;
	this.golem_PointY = y;
	this.golem_ReturnPointX = x;
	this.golem_ReturnPointY = y;
	
	//UI
	this.golem_HpBar, this.golem_HpMask, this.golem_Name;

	//Rect
	this.HitRect, this.golem_AttackRect;
	
	//Time
	this.golem_Attack_DelayTimer, this.golem_DelayTime_Total = 1;

	//Direction
	this.golem_Distance, this.golem_Angle, this.golem_PreDirection, this.golem_Direction;

	//Return Direction
	this.golem_ReturnDirection, this.golem_ReturnDistance, this.golem_ReturnAngle;

	//Motion Check
	this.golem_MoveCheck = false, this.golem_StandCheck = false, this.golem_AttackCheck = false;
	this.golem_CompareCheck = false, this.golem_DamageCheck = false, this.golem_DeadCheck = false;
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
    Lucifer_Game.load.spritesheet('monsterHealthBar', 
                                  '../../static/images/game/Monster/monsterHealthBar.png',
                                   228, 48);	
}

function golem_Create()
{
	//골렘 그룹 생성 
	//(그룹 부모 : null / 그룹 이름 : golem / Stage 등록 : false, body, Physics 등록 : true)
	golem_Group = Lucifer_Game.add.group(/*null, 'Golem', false, true, true*/);
	golem_Clone(4000, 1492);
	golem_Clone(4200, 1592);			
}

function golem_Clone(PointX, PointY)
{
	golem_Object = new Golem(Lucifer_Game, PointX, PointY, 200, 200, 300, 80);
		
	Lucifer_Game.physics.p2.enable(golem_Object);
	golem_Object.body.fixedRotation = true;
	golem_Object.body.clearShapes();
	golem_Object.body.addRectangle(40, 60, 0, 0);
	golem_Object.body.debug = true;
	
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
								    	index + 12, index + 13, index + 14, index + 15
								  	],
								  	60, true);
		index += 16;
	}

	golem_Object.loadTexture('MON_Golem_Stand', 0, true);
	golem_Object.animations.play('MON_Golem_Stand_0', 10, true);
	golem_Object.anchor.setTo(0.5, 0.5);
	
	Lucifer_Game.physics.enable(golem_Object, Phaser.Physics.ARCADE);
	Lucifer_Game.add.existing(golem_Object);

	//Hp Bar
	golem_Object.golem_HpBar = golem_Object.addChild(Lucifer_Game.make.sprite(0, -100,"monsterHealthBar"));
	golem_Object.golem_HpBar.anchor.set(0.5, 0.5);
	golem_Object.golem_HpBar.visible = false;

	//Hp Mask
	golem_Object.golem_HpMask = golem_Object.addChild(Lucifer_Game.add.graphics(0, -100));
	golem_Object.golem_HpMask.beginFill(0xffffff);
	
	//Name
	golem_Object.golem_Name = Lucifer_Game.add.text(golem_Object.golem_PointX, golem_Object.golem_PointY - 100, "Golem");
	golem_Object.golem_Name.anchor.set(0.5);
	golem_Object.golem_Name.align = "center";
	golem_Object.golem_Name.font = 'Arial';
	golem_Object.golem_Name.fontSize = 13;
	golem_Object.golem_Name.fontWeight = 'normal';
	golem_Object.golem_Name.fill = '#19de65';
    golem_Object.golem_Name.visible = false;
	
	//enable all input lick 'click', 'over', etc...
	golem_Object.inputEnabled = true;
    golem_Object.events.onInputOver.add(over, golem_Object);
    golem_Object.events.onInputOut.add(out, golem_Object);

    //Rect
    golem_Object.HitRect = new Phaser.Rectangle(golem_Object.x, golem_Object.y, 60, 60);
    golem_Object.golem_AttackRect = new Phaser.Rectangle(golem_Object.x, golem_Object.y, 100, 100);

    //Delay Timer
    golem_Object.golem_Attack_DelayTimer = Lucifer_Game.time.create(false);
    golem_Object.golem_Attack_DelayTimer.loop(1000, golem_DelayTimer, Lucifer_Game, golem_Object);

    Lucifer_Game.physics.enable(golem_Object, Phaser.Physics.ARCADE);
    golem_Group.add(golem_Object);
}
//-------------------------------------------------------------------------------------------
//Time Total add	
function golem_DelayTimer(Object)
{	
	++Object.golem_DelayTime_Total;		
}

//Name
function golem_FollwName()
{
	for(var i = 0; i < golem_Group.length; ++i)
	{	
		if(golem_Group.getChildAt(i).golem_DeadCheck == false)
		{
			golem_Group.getChildAt(i).golem_Name.x = golem_Group.getChildAt(i).position.x;

			var golem_NamePointY = golem_Group.getChildAt(i).position.y + 70;
			golem_Group.getChildAt(i).golem_Name.y = golem_NamePointY;
		}		
	}
}

//Over / Out
function over(Object)
{
	Object.golem_Name.visible  = true;
	Object.golem_HpBar.visible = true;
}
function out(Object)
{
	Object.golem_Name.visible  = false;
	Object.golem_HpBar.visible = false;
}
//-------------------------------------------------------------------------------------------

//Direction
//-------------------------------------------------------------------------------------------
function golem_GetDirection()
{
	for(var i = 0; i < golem_Group.length; ++i)
	{
		golem_Group.getChildAt(i).golem_Distance 
			= Phaser.Math.distance(golem_Group.getChildAt(i).x, golem_Group.getChildAt(i).y,
								   Player.x, Player.y);

		if(golem_Group.getChildAt(i).golem_DeadCheck == false)
		{
			//CognizeRange 안으로 Player가 접근시 Direction
			if(golem_Group.getChildAt(i).golem_Distance < golem_Group.getChildAt(i).golem_CognizeRange)
			{
				golem_Group.getChildAt(i).golem_Angle 
					= Lucifer_Game.physics.arcade.angleToXY(golem_Group.getChildAt(i), 
														    Player.world.x, Player.world.y);
				golem_Group.getChildAt(i).golem_Angle = Math.abs(golem_Group.getChildAt(i).golem_Angle);

				if(golem_Group.getChildAt(i).golem_PointY < Player.y)
				{
					golem_Group.getChildAt(i).golem_Angle = 2 * Math.PI - golem_Group.getChildAt(i).golem_Angle;		
				}	

				if(golem_Group.getChildAt(i).golem_Angle >= 0 && golem_Group.getChildAt(i).golem_Angle <= 0.7)
				{
					golem_Group.getChildAt(i).golem_Direction = 7;
				}
				else if(golem_Group.getChildAt(i).golem_Angle > 0.7 && golem_Group.getChildAt(i).golem_Angle <= 1.9)
				{
					golem_Group.getChildAt(i).golem_Direction = 0;
				}
				else if(golem_Group.getChildAt(i).golem_Angle > 1.9 && golem_Group.getChildAt(i).golem_Angle <= 2.9)
				{
					golem_Group.getChildAt(i).golem_Direction = 1;
				}
				else if(golem_Group.getChildAt(i).golem_Angle > 2.9 && golem_Group.getChildAt(i).golem_Angle <= 3.9)
				{
					golem_Group.getChildAt(i).golem_Direction = 2;
				}
				else if(golem_Group.getChildAt(i).golem_Angle > 3.6 && golem_Group.getChildAt(i).golem_Angle <= 4.2)
				{
					golem_Group.getChildAt(i).golem_Direction = 3;
				}
				else if(golem_Group.getChildAt(i).golem_Angle > 4.2 && golem_Group.getChildAt(i).golem_Angle <= 4.9)
				{
					golem_Group.getChildAt(i).golem_Direction = 4;
				}
				else if(golem_Group.getChildAt(i).golem_Angle > 4.9 && golem_Group.getChildAt(i).golem_Angle <= 5.7)
				{
					golem_Group.getChildAt(i).golem_Direction = 5;
				}
				else if(golem_Group.getChildAt(i).golem_Angle > 5.7 && golem_Group.getChildAt(i).golem_Angle <= 6.2)
				{
					golem_Group.getChildAt(i).golem_Direction = 6;
				}

				if(golem_Group.getChildAt(i).golem_CompareCheck == false)
				{
					golem_Group.getChildAt(i).golem_PreDirection = golem_Group.getChildAt(i).golem_Direction;	
					golem_Group.getChildAt(i).golem_CompareCheck = true;			
				}
			}
		}			
	}
}

function golem_GetReturnDirection()
{
	for(var i = 0; i < golem_Group.length; ++i)
	{
		golem_Group.getChildAt(i).golem_ReturnDistance 
			= Phaser.Math.distance(golem_Group.getChildAt(i).x, golem_Group.getChildAt(i).y,
								   Player.x, Player.y);

		if(golem_Group.getChildAt(i).golem_DeadCheck == false)
		{
			//CognizeRange 안으로 Player가 접근시 Direction
			if(golem_Group.getChildAt(i).golem_ReturnDistance > golem_Group.getChildAt(i).golem_CognizeRange)
			{
				golem_Group.getChildAt(i).golem_ReturnAngle 
					= Lucifer_Game.physics.arcade.angleToXY(golem_Group.getChildAt(i), 
														    Player.world.x, Player.world.y);
				golem_Group.getChildAt(i).golem_ReturnAngle = Math.abs(golem_Group.getChildAt(i).golem_ReturnAngle);

				if(golem_Group.getChildAt(i).golem_PointY < Player.y)
				{
					golem_Group.getChildAt(i).golem_ReturnAngle = 2 * Math.PI - golem_Group.getChildAt(i).golem_ReturnAngle;		
				}	

				if(golem_Group.getChildAt(i).golem_Angle >= 0 && golem_Group.getChildAt(i).golem_Angle <= 0.7)
				{
					golem_Group.getChildAt(i).golem_ReturnDirection = 7;
				}
				else if(golem_Group.getChildAt(i).golem_ReturnAngle > 0.7 && golem_Group.getChildAt(i).golem_ReturnAngle <= 1.9)
				{
					golem_Group.getChildAt(i).golem_ReturnDirection = 0;
				}
				else if(golem_Group.getChildAt(i).golem_ReturnAngle > 1.9 && golem_Group.getChildAt(i).golem_ReturnAngle <= 2.9)
				{
					golem_Group.getChildAt(i).golem_ReturnDirection = 1;
				}
				else if(golem_Group.getChildAt(i).golem_ReturnAngle > 2.9 && golem_Group.getChildAt(i).golem_ReturnAngle <= 3.9)
				{
					golem_Group.getChildAt(i).golem_ReturnDirection = 2;
				}
				else if(golem_Group.getChildAt(i).golem_ReturnAngle > 3.6 && golem_Group.getChildAt(i).golem_ReturnAngle <= 4.2)
				{
					golem_Group.getChildAt(i).golem_ReturnDirection = 3;
				}
				else if(golem_Group.getChildAt(i).golem_ReturnAngle > 4.2 && golem_Group.getChildAt(i).golem_ReturnAngle <= 4.9)
				{
					golem_Group.getChildAt(i).golem_ReturnDirection = 4;
				}
				else if(golem_Group.getChildAt(i).golem_ReturnAngle > 4.9 && golem_Group.getChildAt(i).golem_ReturnAngle <= 5.7)
				{
					golem_Group.getChildAt(i).golem_ReturnDirection = 5;
				}
				else if(golem_Group.getChildAt(i).golem_ReturnAngle > 5.7 && golem_Group.getChildAt(i).golem_ReturnAngle <= 6.2)
				{
					golem_Group.getChildAt(i).golem_ReturnDirection = 6;
				}

				if(golem_Group.getChildAt(i).golem_CompareCheck == false)
				{
					golem_Group.getChildAt(i).golem_PreDirection = golem_Group.getChildAt(i).golem_ReturnDirection;	
					golem_Group.getChildAt(i).golem_CompareCheck = true;			
				}
			}
		}		
	}
}

function compare_Direction(PreDirection, CurDirection, Object)
{
	//Pre Direction 과 Cur Direction 비교
	if(PreDirection != CurDirection)
	{
		Object.golem_MoveCheck = false;
		Object.golem_CompareCheck = false;
	} 
}
//-------------------------------------------------------------------------------------------

//Animation
//-------------------------------------------------------------------------------------------
function golem_Animation_Change(Direction, Status, Object)
{
	if(Object.golem_Status[0] == Status)
	{
		//Stand
		Object.loadTexture('MON_Golem_Stand', 0, true);
		Object.animations.play('MON_Golem_Stand_' + Direction, 10, true);	
	}
	else if(Object.golem_Status[1] == Status)
	{
		//Walk
		Object.loadTexture('MON_Golem_Walk', 0, true);
		Object.animations.play('MON_Golem_Walk_' + Direction, 10, true);
	}
	else if(Object.golem_Status[2] == Status)
	{
		//Attack
		Object.loadTexture('MON_Golem_Attack', 0, true);
		Object.animations.play('MON_Golem_Attack_' + Direction, 10, true);
	}
}
//-------------------------------------------------------------------------------------------

//Golem_AI
//-------------------------------------------------------------------------------------------
function golem_Move()
{
	for(var i = 0; i < golem_Group.length; ++i)
	{
		var Golem = golem_Group.getChildAt(i);
			
		if(Golem.golem_DeadCheck == false)
		{
			if(Golem.golem_Distance < Golem.golem_CognizeRange)
			{
				//Walk
				if(Golem.golem_MoveCheck == false)
				{
					Golem.golem_StandCheck = false;
					Golem.golem_AttackCheck = false;
					Golem.golem_DamageCheck = false;
					Golem.golem_MoveCheck = true;

					Lucifer_Game.physics.arcade.moveToObject(Golem, Player, 60);
					golem_Animation_Change(Golem.golem_Direction, 'Walk', Golem);
				}

				//Stand
				if(Golem.golem_Distance < Golem.golem_AttackRange)
				{
					if(Golem.golem_StandCheck == false)
					{
						golem_Animation_Change(Golem.golem_Direction, 'Stand', Golem);
						Golem.golem_StandCheck = true;
					}

					//Attack
					golem_Attack(Golem);

					Golem.body.velocity.x = 0;
					Golem.body.velocity.y = 0;
				}
			}
			else
			{
				//Return Walk
				if(Golem.golem_ReturnDistance > 10)
				{
					if(Golem.golem_MoveCheck == false)
					{
						Golem.golem_StandCheck = false;
						Golem.golem_MoveCheck = true;

						Lucifer_Game.physics.arcade.moveToXY(Golem, Golem.golem_ReturnPointX, Golem.golem_ReturnPointY, 60);
						golem_Animation_Change(Golem.golem_ReturnDirection, 'Walk', Golem);
					}
				}

				//Return Stand
				if(Golem.golem_ReturnDistance < 10)
				{
					if(Golem.golem_StandCheck == false)
					{
						golem_Animation_Change(Golem.golem_ReturnDirection, 'Stand', Golem);
						Golem.golem_StandCheck = true;
					}

					Golem.body.velocity.x = 0;
					Golem.body.velocity.y = 0;
				}
			}

			compare_Direction(Golem.golem_PreDirection, Golem.golem_Direction, Golem);
		}		
	}
}

function golem_Attack(Object)
{
	if(Object.golem_StandCheck == true)
	{
		if(Phaser.Rectangle.intersects(Object.golem_AttackRect, Hit_Rect))
		{
			Object.golem_Attack_DelayTimer.start();

			if(Object.golem_AttackCheck == false)
			{
				golem_Animation_Change(Object.golem_Direction, 'Attack', Object);
				Object.golem_AttackCheck = true;
			}	

			golem_HitCount(Object);		
		}		
	}	
}

function golem_HitCount(Object)
{
	if(Object.golem_DelayTime_Total > 1)
	{
		health -= 30; //몬스터 공격력도 넣어야됨.
		Object.golem_DelayTime_Total = 0;
	}	
}

function golem_Dead()
{
	for(var i = 0; i < golem_Group.length; ++i)
	{
		var Golem = golem_Group.getChildAt(i);

		if(Golem.Hp < 0)
		{
			Golem.golem_DeadCheck = true;
			Golem.destroy();
			Golem.golem_Name.destroy();
		}
	}
}
//-------------------------------------------------------------------------------------------

//Hp Bar Mask
function golem_Hpbar_Mask()
{
	for(var i = 0; i < golem_Group.length; ++i)
	{
		var Golem = golem_Group.getChildAt(i);

		if(Golem.golem_DeadCheck == false)
		{
			Golem.golem_HpMask.clear();
			Golem.golem_HpMask.drawRect(Golem.golem_HpBar.x - 100, Golem.golem_HpBar.y, Golem.Hp, 200);
			Golem.golem_HpBar.mask = Golem.golem_HpMask;
		}		
	}
}

//Rect Position
function golem_RectPos()
{
	for(var i = 0; i < golem_Group.length; ++i)
	{
		var Golem = golem_Group.getChildAt(i);

		if(Golem.golem_DeadCheck == false)
		{
			//Hit Rect
			Golem.HitRect.x = Golem.x;
			Golem.HitRect.y = Golem.y;
			Golem.HitRect.centerOn(Golem.x, Golem.y);

			//Attack Rect
			Golem.golem_AttackRect.x = Golem.x;
			Golem.golem_AttackRect.y = Golem.y;
			Golem.golem_AttackRect.centerOn(Golem.x, Golem.y);
		}
	}
}

//골렘 Update / Render 
//-------------------------------------------------------------------------------------------
function golem_Update()
{
	golem_Hpbar_Mask();
	golem_FollwName();
	golem_GetDirection();
	golem_GetReturnDirection();
	golem_Move();
	golem_RectPos();

	//Dead
	golem_Dead();
}

function golem_Redner()
{
	for(var i = 0; i < golem_Group.length; ++i)
	{
		Lucifer_Game.debug.geom(golem_Group.getChildAt(i).HitRect, 'rgba(0, 0, 200, 0.5)');
		Lucifer_Game.debug.geom(golem_Group.getChildAt(i).golem_AttackRect, 'rgba(0, 200, 0, 0.5)');
	}
}
//-------------------------------------------------------------------------------------------

