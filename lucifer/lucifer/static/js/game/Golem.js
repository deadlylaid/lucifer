var mon_Golem, mon_Golem_Name;
var golem_Status = new Array('Stand', 'Walk', 'Attack', 'Damage');

var golem_Range, golem_Attack_Range, golem_Hp;
var golem_Angle, golem_PreDirection, golem_Direction, golem_Distance;
var golem_HomAngle, goelm_HomeDistance, golem_HomeDirection, golem_HomePointX, golem_HomePointY;
var golem_MoveCheck = false;
var golem_StandCheck = false;
var compareCheck = false;

var golem_HitRect;

function golem_Preload()
{
	//Golem Image Load
	//-------------------------------------------------------------------------------------
	Lucifer_Game.load.spritesheet('MON_Golem_Stand',
								  '../../static/images/game/Monster/Golem/stand/stand.png',
								  220, 210);
	Lucifer_Game.load.spritesheet('MON_Golem_Walk',
								  '../../static/images/game/Monster/Golem/walk/walk.png',
								   220, 210);
	Lucifer_Game.load.spritesheet('MON_Golem_Attack',
								  '../../static/images/game/Monster/Golem/attack/attack.png',
								   220, 210);
	//-------------------------------------------------------------------------------------
}

function golem_Create()
{
	//Golem Stat 설정(임의로 범위만 지정)
	golem_Range = 300;	
	golem_Attack_Range = 60;
	golem_Hp  	= 200;		  

	//Golem 위치는 임의로 정함.
	mon_Golem = Lucifer_Game.add.sprite(4000, 1492, 'MON_Golem_Attack');	
	golem_HomePointX = 4000;
	golem_HomePointY = 1492;

	//Physics setting / Collision Setting
	Lucifer_Game.physics.p2.enable(mon_Golem);	
	mon_Golem.body.fixedRotation = true;
	mon_Golem.body.clearShapes();				   
	mon_Golem.body.addRectangle(40, 60, 0, 0);   
	mon_Golem.body.debug = true;

	//Sprite
	//Stand Animation
	var j = 0;
	for(var i = 0; i < 8; ++i)
	{
		mon_Golem.animations.add('MON_Golem_Stand_' + i, 
								  [j, j + 1, j + 2, j + 3, j + 4, j + 5, j + 6], 60, true);
		mon_Golem.animations.add('MON_Golem_Walk_' + i,
								  [j, j + 1, j + 2, j + 3, j + 4, j + 5, j + 6], 60, true);
		j += 8;
	}

	j = 0;
	for(var i = 0; i < 8; ++i)
	{
		mon_Golem.animations.add('MON_Golem_Attack_' + i,
								  [
								  	j,      j + 1,  j + 2,  j + 3, 
								    j + 4,  j + 5,  j + 6,  j + 7, 
								    j + 8,  j + 9,  j + 10, j + 11, 
								    j + 12, j + 13, j + 14, j + 15
								  ],
								  60, true);
		j += 16;
	}

	mon_Golem.loadTexture('MON_Golem_Stand', 0, true);
	mon_Golem.animations.play('MON_Golem_Stand_0', 10, true);
	mon_Golem.anchor.setTo(0.5, 0.5);

	Lucifer_Game.physics.enable(mon_Golem, Phaser.Physics.ARCADE);	

	//Center Name
	mon_Golem_Name = Lucifer_Game.add.text(mon_Golem.x, mon_Golem.y - 100, "Golem");
	mon_Golem_Name.anchor.set(0.5);
	mon_Golem_Name.align = "center";
	mon_Golem_Name.font = 'Arial';
	mon_Golem_Name.fontSize = 13;
	mon_Golem_Name.fontWeight = 'normal';
	mon_Golem_Name.fill = '#19de65';

	//Monster Hit Collision
	golem_HitRect = new Phaser.Rectangle(mon_Golem.x, mon_Golem.y, 60, 60);
}

function golem_Namefollw()
{
	var golem_NamePosY = mon_Golem.position.y + 70;
	mon_Golem_Name.x = mon_Golem.position.x;
	mon_Golem_Name.y = golem_NamePosY;
}

function golem_GetDirection()
{	
	golem_Distance = Phaser.Math.distance(mon_Golem.x, mon_Golem.y, Player.x, Player.y);

	if(golem_Distance < golem_Range)
	{
		golem_Angle = Lucifer_Game.physics.arcade.angleToXY(mon_Golem, Player.world.x, Player.world.y);
		golem_Angle = Math.abs(golem_Angle);

		if(mon_Golem.y < Player.y)
		{
			golem_Angle = 2 * Math.PI - golem_Angle;
		}		

		if(golem_Angle >= 0 && golem_Angle <= 0.7)
		{
			golem_Direction = 7;
		}
		else if(golem_Angle > 0.7 && golem_Angle <= 1.9)
		{
			golem_Direction = 0;
		}
		else if(golem_Angle > 1.9 && golem_Angle <= 2.9)
		{
			golem_Direction = 1;
		}
		else if(golem_Angle > 2.9 && golem_Angle <= 3.9)
		{
			golem_Direction = 2;
		}
		else if(golem_Angle > 3.6 && golem_Angle <= 4.2)
		{
			golem_Direction = 3;
		}
		else if(golem_Angle > 4.2 && golem_Angle <= 4.9)
		{
			golem_Direction = 4;
		}
		else if(golem_Angle > 4.9 && golem_Angle <= 5.7)
		{
			golem_Direction = 5;
		}
		else if(golem_Angle > 5.7 && golem_Angle <= 6.2)
		{
			golem_Direction = 6;
		}

		if(compareCheck == false)
		{
			golem_PreDirection = golem_Direction;	
			compareCheck = true;			
		}		
	}	

	//console.log(golem_Distance);
	//console.log(mon_Golem.animations.frameTotal);
	//console.log(golem_Direction);
}	

function compare_Direction(PreDirection, CurDirection)
{
	//방향 비교를 통해 움직일때 동작을 좀더 자연스럽게 하기 위한 함수.

	if(PreDirection != CurDirection)
	{
		golem_MoveCheck = false;
		compareCheck = false;
	}
}

function golem_GetHomeDirection()
{
	goelm_HomeDistance = Phaser.Math.distance(mon_Golem.x, mon_Golem.y, golem_HomePointX, golem_HomePointY);

	if(golem_Distance > golem_Range)
	{
		golem_HomAngle = Lucifer_Game.physics.arcade.angleToXY(mon_Golem, golem_HomePointX, golem_HomePointY);
		golem_HomAngle = Math.abs(golem_HomAngle);

		if(mon_Golem.y < Player.y)
		{
			golem_HomAngle = 2 * Math.PI - golem_HomAngle;
		}		
		
		if(golem_HomAngle >= 0 && golem_HomAngle <= 0.7)
		{
			golem_HomeDirection = 7;
		}
		else if(golem_HomAngle > 0.7 && golem_HomAngle <= 1.9)
		{
			golem_HomeDirection = 0;
		}
		else if(golem_HomAngle > 1.9 && golem_HomAngle <= 2.9)
		{
			golem_HomeDirection = 1;
		}
		else if(golem_HomAngle > 2.9 && golem_HomAngle <= 3.9)
		{
			golem_HomeDirection = 2;
		}
		else if(golem_HomAngle > 3.6 && golem_HomAngle <= 4.2)
		{
			golem_HomeDirection = 3;
		}
		else if(golem_HomAngle > 4.2 && golem_HomAngle <= 4.9)
		{
			golem_HomeDirection = 4;
		}
		else if(golem_HomAngle > 4.9 && golem_HomAngle <= 5.7)
		{
			golem_HomeDirection = 5;
		}
		else if(golem_HomAngle > 5.7 && golem_HomAngle <= 6.2)
		{
			golem_HomeDirection = 6;
		}

		golem_Direction = golem_HomeDirection;
		
		if(compareCheck == false)
		{
			golem_PreDirection = golem_Direction;	
			compareCheck = true;			
		}
	}
}

function golem_Animation_Change(Direction, Status)
{
	if(Status == golem_Status[0])
	{
		//Stand
		mon_Golem.loadTexture('MON_Golem_Stand', 0, true);
		mon_Golem.animations.play('MON_Golem_Stand_' + Direction, 10, true);	
	}
	else if(Status == golem_Status[1])
	{
		//Walk
		mon_Golem.loadTexture('MON_Golem_Walk', 0, true);
		mon_Golem.animations.play('MON_Golem_Walk_' + Direction, 10, true);
	}
}

function golem_Move()
{
	if(golem_Distance < golem_Range)
	{
		//Walk
		if(golem_MoveCheck == false)
		{
			golem_StandCheck = false;
			golem_MoveCheck = true;

			Lucifer_Game.physics.arcade.moveToObject(mon_Golem, Player, 60);
			golem_Animation_Change(golem_Direction, 'Walk');		
		}	

		//Stand
		if(golem_Distance < golem_Attack_Range)
		{
			if(golem_StandCheck == false)
			{
				golem_Animation_Change(golem_Direction, 'Stand');	
				golem_StandCheck = true;				
			}		

			mon_Golem.body.velocity.x = 0;
			mon_Golem.body.velocity.y = 0;
		}
	}	
	else
	{
		//Walk
		if(goelm_HomeDistance > 10)
		{			
			if(golem_MoveCheck == false)
			{
				golem_StandCheck = false;
				golem_MoveCheck = true;

				Lucifer_Game.physics.arcade.moveToXY(mon_Golem, golem_HomePointX, golem_HomePointY, 60);		
				golem_Animation_Change(golem_HomeDirection, 'Walk');		
			}			
		}				
		
		//Stand
		if(goelm_HomeDistance < 10)
		{
			if(golem_StandCheck == false)
			{
				golem_Animation_Change(golem_HomeDirection, 'Stand');	
				golem_StandCheck = true;				
			}

			mon_Golem.body.velocity.x = 0;
			mon_Golem.body.velocity.y = 0;			
		}
	}	

	//Compare Direction 
	compare_Direction(golem_PreDirection, golem_Direction);

	//console.log(golem_PreDirection);
	//console.log(golem_Direction);
}

