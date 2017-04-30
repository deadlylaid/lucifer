//-------------------------------------------------------------------------------------
// Shadow Effect
//-------------------------------------------------------------------------------------
var player_Shadow;
var storeNpc_Shadow, cainNpc_Shadow;

Shadow = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, 'Shadow');

	this.PointX = x;
	this.PointY = y;
	this.offSet;
}

Shadow.prototype = Object.create(Phaser.Sprite.prototype);
Shadow.prototype.constructor = Shadow;

function shadow_Preload()
{
	Lucifer_Game.load.spritesheet('Shadow',
								  '../../static/images/game/Effect/Shadow/shadow_Modify.png', 50, 45);
}

function shadow_Create()
{
	player_Shadow = shadow_Clone(875, 1637, 0, 36);

	if(stageOne_Check == true)
	{
		storeNpc_Shadow = shadow_Clone(1343, 1483, 0, 36);
		cainNpc_Shadow = shadow_Clone(1941, 961, 0, 36);
	}	
}

function shadow_Clone(x, y, offsetX, offsetY)
{
	var shadow = new Shadow(Lucifer_Game, x, y);
	shadow.anchor.setTo(0.5, 0.5);
	shadow.visible = true;
	shadow.alpha = 0.8;

	//Offset Setting
	shadow.offSet = new Phaser.Point(offsetX, offsetY);

	Lucifer_Game.add.existing(shadow);

	return shadow;
}

function shadow_Player_Move()
{
	if(health > 0)
	{
		player_Shadow.visible = true;
		player_Shadow.x = Player.x + player_Shadow.offSet.x;
		player_Shadow.y = Player.y + player_Shadow.offSet.y;
	}
	else
	{
		player_Shadow.visible = false;
	}	
}

function shadow_Npc()
{
	storeNpc_Shadow.x = store_Npc.x + storeNpc_Shadow.offSet.x;
	storeNpc_Shadow.y = store_Npc.y + storeNpc_Shadow.offSet.y;

	cainNpc_Shadow.x = cain_Npc.x + cainNpc_Shadow.offSet.x;
	cainNpc_Shadow.y = cain_Npc.y + cainNpc_Shadow.offSet.y;
}

function shadow_Monster_Move(Object)
{
	if(Object.DeadCheck == false)
	{
		Object.shadow_Effect.visible = true;
		Object.shadow_Effect.x = Object.x + Object.shadow_Effect.offSet.x;
		Object.shadow_Effect.y = Object.y + Object.shadow_Effect.offSet.y;	
	}
	else if(Object.DeadCheck == true)
	{
		Object.shadow_Effect.visible = false;
	}		
}