var mon_Golem, mon_Golem_Name;
var golem_Status = new Array('Stand', 'Walk', 'Attack', 'Damage');

var golem_Range, golem_Attack, golem_Hp;
var golem_Angle, golem_Direction, golem_Distance;
var golem_MoveCheck = false;
var golem_StandCheck = false;

var golem_HitRect;

function golem_Preload()
{
	//Golem Image Load
	//-------------------------------------------------------------------------------------
	Lucifer_Game.load.spritesheet('MON_Golem_Stand',
								  '../../static/images/game/Monster/Golem/stand/stand.png',
								  220, 210);
	//-------------------------------------------------------------------------------------
}

function golem_Create()
{
	//Golem Stat 설정(임의로 범위만 지정)
	golem_Range = 200;	
	golem_Hp  	= 200;		  

	//Golem 위치는 임의로 정함.
	mon_Golem = Lucifer_Game.add.sprite(4000, 1492, 'MON_Golem_Stand');	

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

		j += 8;
	}

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

function golem_GetDirection()
{
	golem_Distance = Phaser.Math.distance(mon_Golem.x, mon_Golem.y, Player.x, Player.y);

	if(golem_Distance < golem_Range)
	{
		golem_Angle = Lucifer_Game.physics.arcade.angleToXY(mon_Golem, Player.x, Player.y);
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
	}		

	golem_MoveCheck = true;

	//console.log(golem_Distance);
	//console.log(golem_Range);
	//console.log(golem_Direction);
}	

function golem_Move()
{
	if(golem_Distance < golem_Range)
	{
		mon_Golem.body.velocity.x = 0;
		mon_Golem.body.velocity.y = 0;

		if(golem_StandCheck == false)
		{
			golem_Animation_Change(golem_Direction, 'Stand');	
			golem_StandCheck = true;	
		}		
	}

	//Monster AI 부분 하면서 다시 작업을 해보자.
	golem_StandCheck = false;
}

function golem_Animation_Change(Direction, Status)
{
	if(Status == golem_Status[0])
	{
		//Stand
		mon_Golem.loadTexture('MON_Golem_Stand', 0, true);
		mon_Golem.animations.play('MON_Golem_Stand_' + Direction, 10, true);	
	}
}

function golem_Namefollw()
{
	var golem_NamePosY = mon_Golem.position.y + 70;
	mon_Golem_Name.x = mon_Golem.position.x;
	mon_Golem_Name.y = golem_NamePosY;
}