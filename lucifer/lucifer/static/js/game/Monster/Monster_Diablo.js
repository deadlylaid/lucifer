//Diablo
//------------------------------------------------------------------------------
var diablo_Object;
//------------------------------------------------------------------------------

Diablo = function(game, x, y, Hp, MaxHp, CognizeRange, AttackRange)
{
	Phaser.Sprite.call(this, game, x, y, 'MON_Diablo_Blank');
	this.Hp = Hp;
	this.MaxHp = MaxHp;
	this.CognizeRange = CognizeRange;
	this.AttackRange = AttackRange;

	//Status
	this.Status = new Array('Stand', 'Walk', 'Attack', 'Attack1', 'Dead', 
							'Skill', 'Skill1', 'Skill2', 'Skill3');

	//Pos
	this.PointX = x, this.PointY = y, this.ReturnPointX = x, this.ReturnPointY = y;

	//UI
	this.HpBar, this.HpMask, this.Name;

	//Rect
	this.HitRect, this.AttackRect, this.SkillRect;

	//Time
	this.Attack_DelayTimer, this.DelayTime_Total = 1;
	this.Skill_DelayTimer, this.SkillTime_Total = 0;	//->아직 clone 에서 만들지 않음.
	this.Pattern_Attacktimer, this.Pattern_AttackTime = 0;

	//Direction
	this.Distance, this.Angle, this.PreDirection, this.Direction;

	//Retrun Direction
	this.ReturnDistance, this.ReturnDirection, this.ReturnAngle;

	//Motion Check
	this.AI_StartCheck = false, this.MoveCheck = false,       this.StandCheck = false;
	this.AttackCheck = false,   this.CompareCheck = false,    this.DamageCheck = false;
	this.DeadCheck = false,	    this.DeadMotionCheck = false, this.ReturnCheck = false;

	//AI Pattern Check
	this.Pattern_Change = false, this.Pattern_Attack = false, this.Pattern_Skill = false;

	//Skill AI Pattern Check
	this.Skill_Dialnferno_Check = false, this.Skill_Fire_Check = false, this.Skill_Idle_Check = false;

	//Regen Time
	this.Regen_Timer, this.Regen_Time_Total = 0, this.RegenTime = 50, this.Regen_Check = false;
}

Diablo.prototype = Object.create(Phaser.Sprite.prototype);
Diablo.prototype.constructor = Diablo;

//Preload & Create & Clone
//----------------------------------------------------------------------------------------------
function diablo_Preload()
{
	Lucifer_Game.load.spritesheet('MON_Diablo_Stand',
								  '../../static/images/game/Monster/Diablo/stand/stand.png',
								  300, 300);
	Lucifer_Game.load.spritesheet('MON_Diablo_Walk',
								  '../../static/images/game/Monster/Diablo/walk/walk.png',
								  300, 300);
	Lucifer_Game.load.spritesheet('MON_Diablo_Attack',
								  '../../static/images/game/Monster/Diablo/attack2/attack2.png',
								  300, 300);
	Lucifer_Game.load.spritesheet('MON_Diablo_Attack1',
								  '../../static/images/game/Monster/Diablo/attack3/attack3.png',
								  300, 300);
	Lucifer_Game.load.spritesheet('MON_Diablo_Skill',
								  '../../static/images/game/Monster/Diablo/skill/skill.png',
								  300, 300);
	Lucifer_Game.load.spritesheet('MON_Diablo_Skill1',
								  '../../static/images/game/Monster/Diablo/skill1/skill1.png',
								  234, 191);
	Lucifer_Game.load.spritesheet('MON_Diablo_Skill2',
								  '../../static/images/game/Monster/Diablo/skill2/skill2.png',
								  238, 237);
	Lucifer_Game.load.spritesheet('MON_Diablo_Skill3',
								  '../../static/images/game/Monster/Diablo/skill3/skill3.png',
								  259, 295);
	Lucifer_Game.load.spritesheet('MON_Diablo_Dead',
								  '../../static/images/game/Monster/Diablo/death/death.png',
								  279, 329);
	Lucifer_Game.load.spritesheet('MON_Diablo_Blank',
								  '../../static/images/game/Monster/Diablo/Blank.png',
								  300, 300);
	Lucifer_Game.load.spritesheet('monsterHealthBar', 
                                  '../../static/images/game/Monster/monsterHealthBar.png',
                                   228, 48);

    //Skill
    Lucifer_Game.load.spritesheet('Dialnferno', 
                                  '../../static/images/game/Monster_Skill/Diablo_Dialnferno.png',
                                   220, 160);	
    Lucifer_Game.load.image('Fire', '../../static/images/game/Monster_Skill/Diablo_Fire.png');
}

function diablo_Create()
{
	diablo_Clone(2811, 912);	

	Lucifer_Game.renderer.setTexturePriority(['MON_Diablo_Stand', 'MON_Diablo_Walk', 'MON_Diablo_Attack', 
											  'MON_Diablo_Attack1', 'MON_Diablo_Skill', 'MON_Diablo_Skill1',
											  'MON_Diablo_Skill2', 'MON_Diablo_Skill3', 'MON_Diablo_Dead']);
}

function diablo_Clone(PointX, PointY)
{
	diablo_Object = new Diablo(Lucifer_Game, PointX, PointY, 300, 300, 1000, 150);

	Lucifer_Game.physics.p2.enable(diablo_Object);
	diablo_Object.body.fixedRotation = true;
	diablo_Object.body.clearShapes();
	diablo_Object.body.addRectangle(80, 80, 0, 0);
	diablo_Object.body.debug = true;
	diablo_Object.body.restitution = 0;

	//Animaion
	//Stand & Walk
	var index = 0;
	for(var i = 0; i < 8; ++i)
	{
		diablo_Object.animations.add('MON_Diablo_Stand_' + i,
									   [
									      index,      index + 1,  index + 2,  index + 3,  index + 4,
									      index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									      index + 10, index + 11
									   ], 60, true);

		diablo_Object.animations.add('MON_Diablo_Walk_' + i,
									   [
									      index,      index + 1,  index + 2,  index + 3,  index + 4,
									      index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									      index + 10, index + 11
									   ], 60, true);
		index += 12;
	}

	//Attack
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		diablo_Object.animations.add('MON_Diablo_Attack_' + i,
									   [
									   	  index,      index + 1,  index + 2,  index + 3,  index + 4,
									   	  index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									   	  index + 10, index + 11, index + 12, index + 13, index + 14,
									   	  index + 15
									   ], 60, true);

		index += 16;
	}

	//Attack1
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		diablo_Object.animations.add('MON_Diablo_Attack1_' + i,
									 [
									 	index,      index + 1,  index + 2,  index + 3,  index + 4, 
									 	index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									 	index + 10, index + 11, index + 12, index + 13, index + 14,
									 	index + 15, index + 16, index + 17, index + 18, index + 19
									 ], 60, true);	
		index += 20;
	}

	//Skill / Skill2 (17)
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		diablo_Object.animations.add('MON_Diablo_Skill_' + i,
									 [
									 	index,      index + 1,  index + 2,  index + 3,  index + 4, 
									 	index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									 	index + 10, index + 11, index + 12, index + 13, index + 14,
									 	index + 15, index + 16
									 ], 60, true);

		diablo_Object.animations.add('MON_Diablo_Skill2_' + i,
									 [
									 	index,      index + 1,  index + 2,  index + 3,  index + 4, 
									 	index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									 	index + 10, index + 11, index + 12, index + 13, index + 14,
									 	index + 15, index + 16
									 ], 60, true);
		index += 17;
	}

	//Skill1(18)
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		diablo_Object.animations.add('MON_Diablo_Skill1_' + i,
									 [
									 	index,      index + 1,  index + 2,  index + 3,  index + 4, 
									 	index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									 	index + 10, index + 11, index + 12, index + 13, index + 14,
									 	index + 15, index + 16, index + 17, 
									 ], 60, true);	
		index += 18;
	}

	//Skill3(16)
	index = 0;
	for(var i = 0; i < 8; ++i)
	{
		diablo_Object.animations.add('MON_Diablo_Skill3_' + i,
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
	for(var i = 0; i < 11; ++i)
	{
		diablo_Object.animations.add('MON_Diablo_Dead',
									   [
									   	 index,      index + 1,  index + 2,  index + 3,  index + 4,
									   	 index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									   	 index + 10, index + 11, index + 12
									   ], 60, true);

		index += 13;
	}

	diablo_Object.loadTexture('MON_Diablo_Stand', 0, true);
	diablo_Object.animations.play('MON_Diablo_Stand_0', 10, true);
	diablo_Object.anchor.setTo(0.5, 0.5);

	Lucifer_Game.physics.enable(diablo_Object, Phaser.Physics.ARCADE);
	Lucifer_Game.add.existing(diablo_Object);

	//Hp Bar
	diablo_Object.HpBar = diablo_Object.addChild(Lucifer_Game.make.sprite(0, -100, 'monsterHealthBar'));
	diablo_Object.HpBar.anchor.set(0.5, 0.5);
	diablo_Object.HpBar.visible = false;

	//Hp Mask
	diablo_Object.HpMask = diablo_Object.addChild(Lucifer_Game.add.graphics(0, -100));
	diablo_Object.HpMask.beginFill(0xffffff);

	//Name
	diablo_Object.Name = Lucifer_Game.add.text(diablo_Object.x, diablo_Object.y - 150, 'Diablo');
	diablo_Object.Name.anchor.set(0.5);
	diablo_Object.Name.align = 'center';
	diablo_Object.Name.font = 'Arial';
	diablo_Object.Name.fontSize = 13;
	diablo_Object.Name.fontWeight = 'normal';
	diablo_Object.Name.fill = '#19de65';
	diablo_Object.Name.visible = false;

	//input Mouse Over / Up
	diablo_Object.inputEnabled = true;
	diablo_Object.events.onInputOver.add(diablo_over, diablo_Object);
	diablo_Object.events.onInputOut.add(diablo_out, diablo_Object);

	//Rect
	diablo_Object.HitRect = new Phaser.Rectangle(diablo_Object.x, diablo_Object.y, 150, 200);
	diablo_Object.AttackRect = new Phaser.Rectangle(diablo_Object.x, diablo_Object.y, 200, 200);

	//Delay Timer
	diablo_Object.Attack_DelayTimer = Lucifer_Game.time.create(false);
	diablo_Object.Attack_DelayTimer.loop(1000, diablo_DelayTimer, Lucifer_Game, diablo_Object);

	//Regen Timer
	diablo_Object.Regen_Timer = Lucifer_Game.time.create(false);
	diablo_Object.Regen_Timer.loop(1000, diablo_RegenTimer, Lucifer_Game, diablo_Object);	

	//Pattern Attack Timer
	diablo_Object.Pattern_Attacktimer = Lucifer_Game.time.create(false);
	diablo_Object.Pattern_Attacktimer.loop(1000, diablo_PatternAttack_Timer, Lucifer_Game, diablo_Object);

	//Skill Timer
	diablo_Object.Skill_DelayTimer = Lucifer_Game.time.create(false);
	diablo_Object.Skill_DelayTimer.loop(1000, diablo_Skill_Timer, Lucifer_Game, diablo_Object);
}
//----------------------------------------------------------------------------------------------
//Over / Out
function diablo_over(Object)
{
	Object.Name.visible = true;
	Object.HpBar.visible = true;
}
function diablo_out(Object)
{
	Object.Name.visible = false;
	Object.HpBar.visible = false;
}

//Timer
function diablo_DelayTimer(Object)
{
	++Object.DelayTime_Total;
}
//Regen Timer
function diablo_RegenTimer(Object)
{
	++Object.Regen_Time_Total;
}
//Pattern Timer
function diablo_PatternAttack_Timer(Object)
{
	++Object.Pattern_AttackTime;
}
//Skill Timer
function diablo_Skill_Timer(Object)
{
	++Object.SkillTime_Total;
}

//Name
function diablo_FollwName(Object)
{
	Object.Name.x = Object.position.x;

	var NamePointY = Object.position.y + 70;
	Object.Name.y = NamePointY;
}
//----------------------------------------------------------------------------------------------

//Direction
//----------------------------------------------------------------------------------------------
function diablo_GetDirection(Object)
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

function diablo_GetReturnDirection(Object)
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

function diablo_Compare_Direction(PreDirection, CurDirection, Object)
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
function diablo_Animation_Change(Direction, Status, Object)
{
	//'Stand', 'Walk', 'Attack', 'Attack1', 'Dead', 'Skill', 'Skill1', 'Skill2', 'Skill3'
	//'MON_Diablo_Stand', 'MON_Diablo_Walk', 'MON_Diablo_Attack', 
	//'MON_Diablo_Attack1', 'MON_Diablo_Skill', 'MON_Diablo_Skill1',
	//'MON_Diablo_Skill2', 'MON_Diablo_Skill3', 'MON_Diablo_Dead'

	if(Object.DeadCheck == false)
	{
		if(Object.Status[0] == Status)
		{
			//Stand
			Object.loadTexture('MON_Diablo_Stand', 0, true);
			Object.animations.play('MON_Diablo_Stand_' + Direction, 10, true);
		}	
		else if(Object.Status[1] == Status)
		{
			//Walk
			Object.loadTexture('MON_Diablo_Walk', 0, true);
			Object.animations.play('MON_Diablo_Walk_' + Direction, 10, true);
		}
		else if(Object.Status[2] == Status)
		{
			//Attack
			Object.loadTexture('MON_Diablo_Attack', 0, true);
			Object.animations.play('MON_Diablo_Attack_' + Direction, 10, true);
		}
		else if(Object.Status[3] == Status)
		{
			//Attack1
			Object.loadTexture('MON_Diablo_Attack1', 0, true);
			Object.animations.play('MON_Diablo_Attack1_' + Direction, 10, true);
		}
		else if(Object.Status[5] == Status)
		{
			//Skill
			Object.loadTexture('MON_Diablo_Skill', 0, true);
			Object.animations.play('MON_Diablo_Skill_' + Direction, 10, true);
		}
		else if(Object.Status[6] == Status)
		{
			//Skill1
			Object.loadTexture('MON_Diablo_Skill1', 0, true);
			Object.animations.play('MON_Diablo_Skill1_' + Direction, 10, true);
		}
		else if(Object.Status[7] == Status)
		{
			//Skill2
			Object.loadTexture('MON_Diablo_Skill2', 0, true);
			Object.animations.play('MON_Diablo_Skill2_' + Direction, 10, true);
		}
		else if(Object.Status[8] == Status)
		{
			//Skill3
			Object.loadTexture('MON_Diablo_Skill3', 0, true);
			Object.animations.play('MON_Diablo_Skill3_' + Direction, 10, true);
		}
	}
}
//----------------------------------------------------------------------------------------------

//AI
//----------------------------------------------------------------------------------------------
function diablo_Move(Object)
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
				diablo_Animation_Change(Object.Direction, 'Walk', Object);
			}
		}
		
		if(Object.Distance < Object.AttackRange)
		{
			//Stand			
			if(Object.StandCheck == false)
			{
				diablo_Animation_Change(Object.Direction, 'Stand', Object);
				Object.StandCheck = true;
			}			

			//Attack
			diablo_Attack(Object);

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
					diablo_Animation_Change(Object.Direction, 'Walk', Object);					
				}
			}

			//Return Stand
			if(Object.ReturnDistance < 10)
			{
				Object.ReturnCheck = false;				

				if(Object.StandCheck == false)
				{
					Object.StandCheck = true;

					diablo_Animation_Change(Object.Direction, 'Stand', Object);					
				}

				Object.body.velocity.x = 0;
				Object.body.velocity.y = 0;
			}
		}	

		diablo_Compare_Direction(Object.PreDirection, Object.Direction, Object);
	}
}

//Attack & Skill AI 패턴 짜야됨.
function diablo_Attack(Object)
{
	if(Object.StandCheck == true)
	{
		if(Phaser.Rectangle.intersects(Object.AttackRect, Hit_Rect))
		{
			Object.Attack_DelayTimer.start();
			
			if(Object.AttackCheck == false)
			{	
				if(Object.Pattern_Change == false)
				{
					//Attack Pattern
					if(Object.Pattern_Attack == false)
					{
						//Attack Pattern - 1
						diablo_Animation_Change(Object.Direction, 'Attack', Object);
						diablo_HitCount(Object);					

						Object.AttackCheck = true;				
					}	

					if(Object.Pattern_Attack == true)
					{
						//Attack Pattern - 2
						diablo_Animation_Change(Object.Direction, 'Attack1', Object);
						diablo_HitCount(Object);					

						Object.AttackCheck = true;
					}		
				}
				else if(Object.Pattern_Change == true)
				{
					//Skill Pattern
					if(Object.Pattern_Skill == false && Object.Skill_Idle_Check == false)
					{
						//Skill
						diablo_Animation_Change(Object.Direction, 'Skill', Object);
						Object.AttackCheck = true;

						//충돌 처리 해야됨.
					}

					if(Object.Pattern_Skill == true)
					{
						//Skill1
						diablo_Animation_Change(Object.Direction, 'Skill1', Object);
						Object.AttackCheck = true;

						//충돌 처리 해야됨.
					}

					if(Object.Skill_Idle_Check == true)
					{
						//Skill3
						diablo_Animation_Change(Object.Direction, 'Skill3', Object);
						Object.AttackCheck = true;
					}				
				}					
			}
		}
		else
		{
			Object.StandCheck = false;
			Object.MoveCheck = false;			
		}
	}	
}

function diablo_Pattern_Attack(Object)
{	
	if(Object.Pattern_Attack == false && Object.Pattern_Change == false && Object.Pattern_Change == false)
	{
		Object.Pattern_Skill = false;

		var CurFrame = Object.animations.frame;
		var EndFrame;

		if(Object.Direction == 0)
		{
			EndFrame = 15;
		}
		else
		{
			EndFrame = 15 * (Object.Direction + 1);
		}					

		if(CurFrame == EndFrame)
		{
			Object.Pattern_Attacktimer.start();
		
			if(Object.Pattern_AttackTime > 3)
			{
				Object.Pattern_Attack = true;
				Object.Pattern_AttackTime = 0;
				Object.Pattern_Attacktimer.stop(false);	
			}							
		}		
	}

	if(Object.Pattern_Attack == true && Object.Pattern_Change == false)
	{
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

		if(CurFrame == EndFrame)
		{
			Object.Pattern_Attacktimer.start();
		
			if(Object.Pattern_AttackTime > 3)
			{
				//Pattern Skill Change
				Object.Pattern_Change = true;

				Object.Pattern_AttackTime = 0;
				Object.Pattern_Attacktimer.stop(false);	

				//Pattern Skill Change
				Pattern_Change = true;	
			}
		}		
	}	

	//console.log(Object.Pattern_Attack);
	//console.log(Object.Pattern_Skill);
	console.log(Object.Pattern_Change);	
	console.log(Object.Pattern_AttackTime);
	console.log(Object.SkillTime_Total);
}

function diablo_Pattern_Skill(Object)
{
	if(Object.Pattern_Skill == false && Object.Skill_Idle_Check == false && Object.Pattern_Change == true)
	{
		Object.Pattern_Attack = false;

		//Skill Dialnferno
		var CurFrame = Object.animations.frame;
		var EndFrame;

		if(Object.Direction == 0)
		{
			EndFrame = 16;
		}
		else
		{
			EndFrame = 16 * (Object.Direction + 1);
		}					

		if(CurFrame == EndFrame)
		{
			Object.Skill_DelayTimer.start();
		
			if(Object.SkillTime_Total > 2)
			{
				Object.Pattern_Skill = true;

				Object.SkillTime_Total = 0;
				Object.Skill_DelayTimer.stop(false);	
			}
		}
	}

	if(Object.Pattern_Skill == true && Object.Pattern_Change == true)
	{
		//Skill Fire
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

		if(CurFrame == EndFrame)
		{
			Object.Skill_DelayTimer.start();
		
			if(Object.SkillTime_Total > 2)
			{
				Object.Pattern_Skill = false;

				//Skill Idle Pattern
				Object.Skill_Idle_Check = true;

				Object.SkillTime_Total = 0;
				Object.Skill_DelayTimer.stop(false);
			}							
		}
	}

	if(Object.Skill_Idle_Check == true && Object.Pattern_Change == true)
	{
		//Skill Idle
		var CurFrame = Object.animations.frame;
		var EndFrame;

		if(Object.Direction == 0)
		{
			EndFrame = 15;
		}
		else
		{
			EndFrame = 15 * (Object.Direction + 1);
		}					

		if(CurFrame == EndFrame)
		{
			Object.Skill_DelayTimer.start();

			if(Object.SkillTime_Total > 1)
			{
				//Skill 패턴이 다시 1로 시작할 수 있도록 되돌리고 / 공격 패턴으로 체인지 시킴.
				Object.Skill_Idle_Check = false;
				Object.SkillTime_Total = 0;
				Object.Skill_DelayTimer.stop(false);

				//Pattern Change
				Object.Pattern_Change = false;
			}
		}		
	}
}

function diablo_Pattern_Skill(Object)
{
	if(Object.Pattern_Skill == false)
	{
		//Skill Dialnferno
		var CurFrame = Object.animations.frame;
		var EndFrame;

		if(Object.Direction == 0)
		{
			EndFrame = 16;
		}
		else
		{
			EndFrame = 16 * (Object.Direction + 1);
		}					

		if(CurFrame == EndFrame)
		{
			Object.Skill_DelayTimer.start();
		
			if(Object.SkillTime_Total > 2)
			{
				Object.Pattern_Skill = true;
				Object.SkillTime_Total = 0;
				Object.Skill_DelayTimer.stop(false);	
			}							
		}
	}

	if(Object.Pattern_Skill == true)
	{
		//Skill Fire
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

		if(CurFrame == EndFrame)
		{
			Object.Skill_DelayTimer.start();
		
			if(Object.SkillTime_Total > 2)
			{
				Object.Pattern_Skill = false;
				
				//Object.SkillTime_Total = 0;
				//Object.Skill_DelayTimer.stop(false);	

				//Skill Idle Pattern
				
			}							
		}
	}
}

function diablo_HitCount(Object)
{
	if(Object.DelayTime_Total > 1)
	{
		health -= 40;	//Mosnter Attack Point Setting
		Object.DelayTime_Total = 0;
	}
}

function diablo_Dead(Object)
{
	if(Object.Hp < 0)
	{
		Object.DeadCheck = true;
	}

	if(Object.DeadCheck == true)
	{
		if(Object.DeadMotionCheck == false)
		{
			Object.loadTexture('MON_Diablo_Dead', 0, true);
			Object.animations.play('MON_Diablo_Dead', 10, true);
			Object.DeadMotionCheck = true;
		}

		var CurFrame = Object.animations.frame;
		if(Object.DeadMotionCheck == true && CurFrame == 142)
		{
			Object.kill();
			Object.Name.visible = false;
		}			
	}
}

function diablo_Regen(Object)
{
	if(Object.DeadMotionCheck == true)
	{
		Object.Regen_Check = true;
		Object.Regen_Timer.start();

		if(Object.Regen_Time_Total > Object.RegenTime)
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

			diablo_Animation_Change(Object.Direction, 'Stand', Object);

			Object.Regen_Timer.stop();
			Object.Regen_Time_Total = 0;
		}
	}
}
//----------------------------------------------------------------------------------------------

//UI
//----------------------------------------------------------------------------------------------
function diablo_Hpbar_Mask(Object)
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

function diablo_RectPos(Object)
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
function diablo_Update()
{
	var diablo = diablo_Object;

	diablo_Hpbar_Mask(diablo);
	diablo_RectPos(diablo);
	diablo_FollwName(diablo);
	diablo_GetDirection(diablo);
	diablo_GetReturnDirection(diablo);
	diablo_Move(diablo);
	diablo_Pattern_Attack(diablo);
	diablo_Pattern_Skill(diablo);

	//Player Mosnter Collision
	if(diablo.Regen_Check == false)
	{
		player_Monster_Col(diablo);	
	}		

	diablo_Dead(diablo);
	diablo_Regen(diablo);	
}

function diablo_Render()
{
	var diablo = diablo_Object;

	Lucifer_Game.debug.geom(diablo.HitRect, 'rgba(200, 0, 0, 0.5)');
	Lucifer_Game.debug.geom(diablo.AttackRect, 'rgba(0, 0, 200, 0.5)');	
}
//----------------------------------------------------------------------------------------------