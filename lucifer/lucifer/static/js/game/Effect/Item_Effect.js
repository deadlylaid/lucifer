//Item Effect
//------------------------------------------------------------------------------
var item_Effect, item_Effect_Check = false;
//------------------------------------------------------------------------------

function item_Effect_Preload()
{
	Lucifer_Game.load.spritesheet('Item_Effect',
								  '../../static/images/game/Effect/Item_Effect/Item_Effect.png',
								  72, 122);
}

function item_Effect_Create()
{
	//Item Drink Effect
	item_Effect = Lucifer_Game.add.sprite(Player.x, Player.y, 'Item_Effect');
	item_Effect.anchor.setTo(0.5, 0.5);
	item_Effect.visible = false;
	item_Effect.blendMode = Phaser.blendModes.ADD;

	//Item Effect Animation
	item_Effect.animations.add('Item_Effect_Ani',
							   [
							   	  0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
							   	  10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
							   	  20, 21, 22, 23, 24
							   ], 60, true);
	item_Effect.animations.play('Item_Effect_Ani', 10, true);
}

function item_Effect_Follow_Player()
{
	item_Effect.x = Player.x;
	item_Effect.y = Player.y;
}

function item_Effect_Update()
{
	item_Effect_Follow_Player();

	if(item_Effect_Check == true)
	{
		item_Effect.visible = true;
		item_Effect.animations.play('Item_Effect_Ani', 10, true);

		var CurFrame = item_Effect.animations.frame;
		var EndFrame = 24;

		if(CurFrame == EndFrame)
		{
			item_Effect_Check = false;
			item_Effect.visible = false;
			item_Effect.animations.stop('Item_Effect_Ani', true);
		}
	}
}
