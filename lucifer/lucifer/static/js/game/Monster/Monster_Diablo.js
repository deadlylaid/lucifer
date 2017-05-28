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

	//Stat (스킬 Attack Point도 추가해야 된다.)	
	this.Attack_Point = 330, this.Defence_Point = 350;
	this.Skill_Attack_Point = 300, this.Skill_Attack_Point1 = 350;

	//Status
	this.Status = new Array('Stand', 'Walk', 'Attack', 'Attack1', 'Dead',
							'Skill', 'Skill1', 'Skill2', 'Skill3');

	//Pos
	this.PointX = x, this.PointY = y, this.ReturnPointX = x, this.ReturnPointY = y;

	//UI
	this.HpBar, this.HpMask, this.Name;

	//Rect
	this.HitRect, this.AttackRect, this.FireRect;

	//Time
	this.Attack_DelayTimer, this.DelayTime_Total = 1;
	this.Skill_DelayTimer, this.SkillTime_Total = 0;
	this.Pattern_Attacktimer, this.Pattern_AttackTime = 0;

	//Direction
	this.Distance, this.Angle, this.PreDirection, this.Direction;

	//Retrun Direction
	this.ReturnDistance, this.ReturnDirection, this.ReturnAngle;

	//Motion Check
	this.AI_StartCheck = false, this.MoveCheck = false,       this.StandCheck = false;
	this.AttackCheck = false,   this.CompareCheck = false,    this.DamageCheck = false;
	this.DeadCheck = false,	    this.DeadMotionCheck = false, this.ReturnCheck = false;
	this.MouseCheck = false,    this.TyrealCheck = false,     this.GetExpCheck = false;
	this.SoundCheck = false;

	//AI Pattern Check
	this.Pattern_Change = false, this.Pattern_Attack = false, this.Pattern_Skill = false;

	//Skill AI Pattern Check
	this.Skill_Dialnferno_Check = false, this.Skill_Fire_Check = false, this.Skill_Idle_Check = false;

	//Regen Time
	this.Regen_Timer, this.Regen_Time_Total = 0, this.RegenTime = 50, this.Regen_Check = false;

	//Dia_lnferno
	this.Inferno, this.Inferno_Bullet, this.Fire, this.Fire_Bullet;

	//Level System
	this.ExpCheck = false, this.ExpTimer, this.ExpTime_Total = 0, this.Experience = 1000;

	//Blood Effect
	this.blood_Effect;

	//Action Camera Timer
	this.ActionCamera_Timer, this.CameraTime_Total = 0;

	//Tyreal Camera Timer
	this.TyrealCamera_Timer, this.TyrealTime_Total = 0;

	//Message
	this.status_Message_Check = false, this.message_Time_Check = false;
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
    diaSkill_Preload();
}

function diablo_Create()
{
	diablo_Clone(2811, 912);

	Lucifer_Game.renderer.setTexturePriority(['MON_Diablo_Stand', 'MON_Diablo_Walk', 'MON_Diablo_Attack',
											  'MON_Diablo_Attack1', 'MON_Diablo_Skill', 'MON_Diablo_Skill1',
											  'MON_Diablo_Skill2', 'MON_Diablo_Skill3', 'MON_Diablo_Dead',
											 ]);
}

function diablo_Clone(PointX, PointY)
{
	diablo_Object = new Diablo(Lucifer_Game, PointX, PointY, 5000, 5000, 1000, 120);

	Lucifer_Game.physics.p2.enable(diablo_Object);
	diablo_Object.body.fixedRotation = true;
	diablo_Object.body.clearShapes();
	diablo_Object.body.addRectangle(80, 120, 0, 0);
	diablo_Object.body.debug = false;
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
	diablo_Object.animations.play('MON_Diablo_Stand_4', 10, true);
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
	diablo_Object.Name = Lucifer_Game.add.text(diablo_Object.x, diablo_Object.y - 250, 'Lucifer');
	diablo_Object.Name.anchor.set(0.5);
	diablo_Object.Name.align = 'center';
	diablo_Object.Name.font = 'Arial';
	diablo_Object.Name.fontSize = 17;
	diablo_Object.Name.fontWeight = 'normal';
	diablo_Object.Name.fill = '#ff5400';
	diablo_Object.Name.visible = false;

	//input Mouse Over / Up
	diablo_Object.inputEnabled = true;
	diablo_Object.events.onInputOver.add(diablo_over, diablo_Object);
	diablo_Object.events.onInputOut.add(diablo_out, diablo_Object);

	//Rect
	diablo_Object.HitRect = new Phaser.Rectangle(diablo_Object.x, diablo_Object.y, 160, 220);
	diablo_Object.AttackRect = new Phaser.Rectangle(diablo_Object.x, diablo_Object.y, 220, 220);
	diablo_Object.FireRect = new Phaser.Rectangle(diablo_Object.x, diablo_Object.y, 1000, 1000);

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

	//Skill Effect / this.Inferno, this.Fire
	diablo_Object.Inferno = diaSkill_Inferno_Clone(diablo_Object.x, diablo_Object.y);

	diablo_Object.Fire = Lucifer_Game.add.group();
	diablo_Object.Fire.enableBody = true;
	diablo_Object.Fire.physicsBodyType = Phaser.Physics.ARCADE;
	diablo_Object.Fire.createMultiple(3000, 'Fire');
	diablo_Object.Fire.setAll('chechkWorldBounds', true);
	diablo_Object.Fire.setAll('outOfBoundsKill', true);
	diablo_Object.Fire.setAll('visible', false);
	diablo_Object.Fire.setAll('blendMode', Phaser.blendModes.ADD);

	//Exp Timer
	diablo_Object.ExpTimer = Lucifer_Game.time.create(false);
	diablo_Object.ExpTimer.loop(10, diablo_ExpTimer, Lucifer_Game, diablo_Object);

	//Blood Effect
	diablo_Object.blood_Effect = blood_Effect_Clone(diablo_Object.x, diablo_Object.y);

	//Action Camera Timer
	diablo_Object.ActionCamera_Timer = Lucifer_Game.time.create(false);
	diablo_Object.ActionCamera_Timer.loop(1000, diablo_Camera_Timer, Lucifer_Game, diablo_Object);

	//Tyreal Camera Timer
	diablo_Object.TyrealCamera_Timer = Lucifer_Game.time.create(false);
	diablo_Object.TyrealCamera_Timer.loop(1000, diablo_Tyreal_Timer, Lucifer_Game, diablo_Object);
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
//Exp Timer
function diablo_ExpTimer(Object)
{
	++Object.ExpTime_Total;
}
//Action Camera Timer
function diablo_Camera_Timer(Object)
{
	++Object.CameraTime_Total;
}
//Tyreal Timer
function diablo_Tyreal_Timer(Object)
{
	++Object.TyrealTime_Total;
}

//Name
function diablo_FollwName(Object)
{
	Object.Name.x = Object.position.x;

	var NamePointY = Object.position.y + 120;
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

		//Object.AttackCheck = false;
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
		else
		{
			Object.Inferno.visible = false;
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

//Attack & Skill
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
					}

					if(Object.Pattern_Attack == true)
					{
						//Attack Pattern - 2
						diablo_Animation_Change(Object.Direction, 'Attack1', Object);
					}
				}
				else if(Object.Pattern_Change == true)
				{
					//Skill Pattern
					if(Object.Pattern_Skill == false && Object.Skill_Idle_Check == false)
					{
						//Inferno Animation Change
						diablo_Animation_Change(Object.Direction, 'Skill', Object);
						diaSkill_Inferno_Animation_Change(Object.Direction, Object);
					}

					if(Object.Pattern_Skill == true)
					{
						//Fire
						diablo_Animation_Change(Object.Direction, 'Skill1', Object);						
					}

					if(Object.Skill_Idle_Check == true)
					{
						diablo_Animation_Change(Object.Direction, 'Skill3', Object);
					}
				}

				Object.AttackCheck = true;
			}
		}
		else
		{
			Object.StandCheck = false;
			Object.MoveCheck = false;
		}

		//HitCount
		diablo_HitCount(Object);
		diaSkill_Inferno_Col(Object);
		diaSkill_Fire_Col(Object);
	}
}

function diablo_Pattern_Attack(Object)
{
	if(Object.Pattern_Attack == false && Object.Pattern_Change == false)
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

		Object.Pattern_Attacktimer.start();

		if(CurFrame == EndFrame)
		{
			//Sound
			sound_Lucifer_AttackOne.play();

			if(Object.Pattern_AttackTime > 3)
			{
				Object.Pattern_Attack = true;
				Object.Pattern_AttackTime = 0;
				Object.Pattern_Attacktimer.stop(false);

				//Animation Change
				diablo_Animation_Change(Object.Direction, 'Attack1', Object);
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

		Object.Pattern_Attacktimer.start();
		if(CurFrame == EndFrame)
		{
			//Sound
			sound_Lucifer_AttackTwo.play();

			if(Object.Pattern_AttackTime > 3)
			{
				//Pattern Skill Change
				Object.Pattern_Change = true;

				Object.Pattern_AttackTime = 0;
				Object.Pattern_Attacktimer.stop(false);

				//Skill Animation Change
				diablo_Animation_Change(Object.Direction, 'Skill', Object);

				//Inferno Animation Change
				diaSkill_Inferno_Animation_Change(Object.Direction, Object);
			}
		}
	}
}

function diablo_Pattern_Skill(Object)
{
	if(Object.Pattern_Change == true && Object.Pattern_Skill == false && Object.Skill_Idle_Check == false)
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

		Object.Skill_DelayTimer.start();

		if(CurFrame == EndFrame)
		{
			//Sound
			sound_Lucifer_SkillOne.play();

			if(Object.SkillTime_Total > 2)
			{
				Object.Pattern_Skill = true;

				Object.SkillTime_Total = 0;
				Object.Skill_DelayTimer.stop(false);

				//Skill1
				diablo_Animation_Change(Object.Direction, 'Skill1', Object);
			}
		}
	}

	if(Object.Pattern_Skill == true && Object.Pattern_Change == true)
	{
		//Skill Visible (이전 패턴 스킬 안보이게 하기)
		Object.Inferno.visible = false;

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

		Object.Skill_DelayTimer.start();
		if(CurFrame == EndFrame)
		{
			//Fire Create
			diaSkill_Fire_Attack(Object);		

			//Sound
			sound_Lucifer_SkillTwo.play();

			if(Object.SkillTime_Total > 2)
			{
				Object.Pattern_Skill = false;

				//Skill Idle Pattern
				Object.Skill_Idle_Check = true;

				Object.SkillTime_Total = 0;
				Object.Skill_DelayTimer.stop(false);

				//Skill3 Animation Change
				diablo_Animation_Change(Object.Direction, 'Skill3', Object);
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
			//Sound
			sound_Lucifer_SkillThree.play();

			//Skeleton Create
			skeleton_Clone(2018, 801);
			skeleton_Clone(2356, 700);
			skeleton_Clone(2810, 987);
			skeleton_Clone(2789, 1226);
			skeleton_Clone(2384, 1254);

			//Skill 패턴이 다시 1로 시작할 수 있도록 되돌리고 / 공격 패턴으로 체인지 시킴.
			Object.Skill_Idle_Check = false;

			//Pattern Change
			Object.Pattern_Change = false;

			//Animation Change
			diablo_Animation_Change(Object.Direction, 'Attack', Object);
		}
	}
}

function diablo_HitCount(Object)
{
	if(Object.DelayTime_Total > 1)
	{
		if(Object.animations.name == 'MON_Diablo_Attack_' + Object.Direction)
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
		else if(Object.animations.name == 'MON_Diablo_Attack1_' + Object.Direction)
		{
			var CurFrame = Object.animations.frame;
			var EndFrame = 0;

			if(Object.Direction == 0)
			{
				EndFrame = 19;
			}
			else
			{
				EndFrame = 19 * (Object.Direction + 1);
			}

			if(CurFrame + 9 < EndFrame)
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

function diablo_Dead(Object)
{
	if(Object.Hp < 0)
	{
		Object.DeadCheck = true;

		sound_StopStage3BGM();
	}

	if(Object.DeadCheck == true)
	{
		if(Object.DeadMotionCheck == false)
		{
			Object.loadTexture('MON_Diablo_Dead', 0, true);
			Object.animations.play('MON_Diablo_Dead', 10, true);
			Object.DeadMotionCheck = true;

			//Collision false
			Object.body.static = true;

			//Quest
			checkQuest(9);

			//Sound
			sound_Lucifer_Dead.play();
		}

		var CurFrame = Object.animations.frame;
		if(Object.DeadMotionCheck == true && CurFrame == 142)
		{
			//Skeleton 강제로 죽이기.
			for(var i = 0; i < skeleton_Group.length; ++i)
			{
				skeleton_Group.getChildAt(i).Hp -= 1000;
			}

			//Message
			if(Object.status_Message_Check == false)
			{
				status_Message_Clone(Object.Experience);
				Object.status_Message_Check = true;
			}

			Object.kill();
			Object.Inferno.kill();
			Object.Name.visible = false;
			Object.ExpCheck = true;

			//Tyreal Timer Start
			Object.TyrealCamera_Timer.start();
		}

		if(Object.TyrealTime_Total < 3)
		{
			Lucifer_Game.camera.fade(0x000000, 5000);
		}
		else if(Object.TyrealTime_Total > 3)
		{
			Lucifer_Game.camera.resetFX();		

			if(Object.TyrealCheck == false)
			{
				if(npc_Tyreal_AppearanceEffect_Check == false)
				{
					npc_Tyreal_AppearanceEffect.visible = true;
					npc_Tyreal_AppearanceEffect.animations.play('Tyreal_Effect_Ani', 10, true);

					var CurFrame = npc_Tyreal_AppearanceEffect.animations.frame;
					var EndFrame = 11;					

					if(CurFrame == EndFrame)
					{
						//Sound						
						sound_Tyreal_Appearance.play();
						sound_Tyreal_Bgm.play();

						//Tyreal 등장
						npc_Tyreal.visible = true;
						npc_Tyreal.Name.visible = true;
						Object.TyrealCheck = true;
						npc_Tyreal_AppearanceEffect.animations.stop('Tyreal_Effect_Ani', true);

						npc_Tyreal_AppearanceEffect_Check = true;
					}
				}

				Object.TyrealCamera_Timer.stop();
			}
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
			Object.body.static = false;
			Object.body.restitution = 0;

			Object.Regen_Check = false;

			Object.AI_StartCheck = false, Object.MoveCheck = false, Object.StandCheck = false;
			Object.AttackCheck = false, Object.CompareCheck = false, Object.DamageCheck = false;
			Object.DeadCheck = false,	Object.DeadMotionCheck = false, Object.ReturnCheck = false;
			Object.MouseCheck = false, Object.status_Message_Check = false, Object.SoundCheck = false;

			Object.Hp = 6000;
			Object.MaxHp = 6000;
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
function diablo_Health(health, maxHealth)
{
	var divided_Health = health / maxHealth;
	var result_health = divided_Health;

	if(health <= 0)
	{
		result_health = 0;
	}

	return result_health * 100;
}

function diablo_Health_Rate(health_Percentage)
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

function diablo_Hpbar_Mask(Object)
{
	var healthPercentage = diablo_Health(Object.Hp, Object.MaxHp);
	var hpRate = diablo_Health_Rate(healthPercentage);

	Object.HpMask.clear();
	Object.HpMask.beginFill(0xffffff);
	Object.HpMask.drawRect(Object.HpBar.x - 112, Object.HpBar.y, hpRate, 200);
	Object.HpMask.endFill();
	Object.HpBar.mask = Object.HpMask;
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

		//Fire Rect
		Object.FireRect.x = Object.x;
		Object.FireRect.y = Object.y;
		Object.FireRect.centerOn(Object.x, Object.y);
	}
}
//----------------------------------------------------------------------------------------------

//Update & Render
//----------------------------------------------------------------------------------------------
function diablo_Action_Camaera(Object)
{
	if(stageThree_Check == true)
	{
		action_CameraCheck = true;

		Object.ActionCamera_Timer.start();

		if(Object.CameraTime_Total < 1)
		{
			Lucifer_Game.camera.follow(Player);
			Lucifer_Game.camera.setSize(1280, 800);
		}
		else if(Object.CameraTime_Total > 1)
		{
			action_CameraCheck = false;
		}

		if(action_CameraCheck == false && action_CameraStepOne == false)
		{	
			if(Object.CameraTime_Total > 3 && Object.SoundCheck == false)
			{
				//Sound
				sound_Lucifer_Laugh.play();	
				Object.SoundCheck = true;
			}			

			Lucifer_Game.camera.follow(Object, Phaser.Camera.FOLLOW_LOCKON, 0.03, 0.03);
			Lucifer_Game.camera.setSize(1280, 800);
		}

		if(Object.CameraTime_Total > 5 && action_CameraStepOne == false)
		{
			Lucifer_Game.camera.follow(Player, Phaser.Camera.FOLLOW_LOCKON, 0.03, 0.03);
			Lucifer_Game.camera.setSize(1280, /*800*/735);

			action_CameraStepOne = true;
		}

		if(action_CameraStepOne == true && Object.CameraTime_Total > 8)
		{
			Lucifer_Game.camera.follow(Player);
			Lucifer_Game.camera.setSize(1280, 800);

			Object.ActionCamera_Timer.stop(false);
			Object.CameraTime_Total = 0;
		}
	}
}

function diablo_Update()
{
	var diablo = diablo_Object;

	diablo_Action_Camaera(diablo);

	diablo_Hpbar_Mask(diablo);
	diablo_RectPos(diablo);
	diablo_FollwName(diablo);
	diablo_GetDirection(diablo);
	diablo_GetReturnDirection(diablo);
	diablo_Move(diablo);
	diablo_Pattern_Attack(diablo);
	diablo_Pattern_Skill(diablo);

	//Skill
	//Inferno Animation Change
	//diaSkill_Inferno_Animation_Change(diablo.Direction, diablo);
	diaSkill_Direction_Inferno_Position(diablo.Direction, diablo);

	//Player Mosnter Collision
	if(diablo.Regen_Check == false)
	{
		player_Monster_Col(diablo);
	}

	diablo_Dead(diablo);
	//diablo_Regen(diablo);

	//Level System
	check_Monster_Dead(diablo);

	//Mouse
	mouse_ColCheck(diablo);

	//Blood Effect
	blood_Effect_Update(diablo);
}

function diablo_Render()
{
	var diablo = diablo_Object;

	Lucifer_Game.debug.geom(diablo.HitRect, 'rgba(200, 0, 0, 0.5)');
	//Lucifer_Game.debug.geom(diablo.Inferno.SkillRect, 'rgba(0, 0, 200, 0.5)');
}
//----------------------------------------------------------------------------------------------
