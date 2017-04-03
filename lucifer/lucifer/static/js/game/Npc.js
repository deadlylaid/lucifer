var store_Npc;
var npc_Angle, npc_Direction, npc_PreDirection, npc_Distance, npc_Range;
var npc_compareCheck = false;
//---------------------------------------------------------------------------------------	

function npc_Preload()
{
	//NPC
	Lucifer_Game.load.spritesheet('NPC_Store',
								  '../../static/images/game/Npc/Npc1.png',
								  100, 100);
}

function npc_Create()
{
	//NPC Create
	store_Npc = Lucifer_Game.add.sprite(1343, 1483, 'NPC_Store');
	npc_Range = 200;

	//NPC Animation
	var j = 0;
	for(var i = 0; i < 8; ++i)
	{
		store_Npc.animations.add('NPC_Store_Ani_' + i,
								 [
								 	j,     j + 1, j + 2, j + 3,  j + 4,  j + 5,  j + 6,
								 	j + 7, j + 8, j + 9, j + 10, j + 11, j + 12 
								 ],
								 60, true);
		j += 13;
	}

	//NPC Setting
	store_Npc.animations.play('NPC_Store_Ani_4', 10, true);
	store_Npc.anchor.setTo(0.5, 0.5);

	Lucifer_Game.physics.p2.enable(store_Npc);
	store_Npc.body.fixedRotation = true;
	store_Npc.body.clearShapes();
	store_Npc.body.addRectangle(40, 60, 0, 0);
	store_Npc.body.debug = true;
	store_Npc.body.static = true;

	Lucifer_Game.physics.enable(store_Npc, Phaser.Physics.ARCADE);
    store_Npc.inputEnabled = true;
    store_Npc.events.onInputDown.add(listener, this);
}
function listener(){
    alert('hey');
}

function npc_GetDirection()
{
	npc_Distance = Phaser.Math.distance(store_Npc.x, store_Npc.y, Player.x, Player.y);

	if(npc_Distance < npc_Range)
	{
		npc_Angle = Lucifer_Game.physics.arcade.angleToXY(store_Npc, Player.world.x, Player.world.y);
		npc_Angle = Math.abs(npc_Angle);

		if(store_Npc.y < Player.y)
		{
			npc_Angle = 2 * Math.PI - npc_Angle;
		}

		if(npc_Angle >= 0 && npc_Angle <= 0.7)
		{
			npc_Direction = 7;
		}
		else if(npc_Angle > 0.7 && npc_Angle <= 1.9)
		{
			npc_Direction = 0;
		}
		else if(npc_Angle > 1.9 && npc_Angle <= 2.9)
		{
			npc_Direction = 1;
		}
		else if(npc_Angle > 2.9 && npc_Angle <= 3.9)
		{
			npc_Direction = 2;
		}
		else if(npc_Angle > 3.6 && npc_Angle <= 4.2)
		{
			npc_Direction = 3;
		}
		else if(npc_Angle > 4.2 && npc_Angle <= 4.9)
		{
			npc_Direction = 4;
		}
		else if(npc_Angle > 4.9 && npc_Angle <= 5.7)
		{
			npc_Direction = 5;
		}
		else if(npc_Angle > 5.7 && npc_Angle <= 6.2)
		{
			npc_Direction = 6;
		}

		if(npc_compareCheck == false)
		{
			npc_PreDirection = npc_Direction;
			npc_compareCheck = true;
		}
		
		npc_Animation_Change(npc_Direction);
	}
}

function npc_Compare_Direction(PreDirection, CurDirection)
{
	if(PreDirection != CurDirection)
	{
		npc_compareCheck = false;
	}
}

function npc_Animation_Change(Direction)
{	
	store_Npc.animations.play('NPC_Store_Ani_' + Direction, 10, true);
}

function npc_Update()
{
	npc_GetDirection();
	npc_Compare_Direction(npc_PreDirection, npc_Direction);
}

function npc_Debug_Render()
{

}