//-------------------------------------------------------------------------------------
// Mouse Icon
//-------------------------------------------------------------------------------------
var mouse_Rect, mouseIcon, mouse_colcheck = false, mouse_IconCheck = false;

function mouse_Preload()
{
	Lucifer_Game.load.spritesheet('Default_Icon', '../../static/images/game/UI/Mouse/0.png', 32, 32);
	Lucifer_Game.load.spritesheet('Attack_Icon', '../../static/images/game/UI/Mouse/1.png', 32, 32);
}

function mouse_Create()
{
	//Default Mouse Icon
	mouseIcon = Lucifer_Game.add.sprite(Lucifer_Game.input.mousePointer.x, Lucifer_Game.input.mousePointer.y, 'Default_Icon');
	mouseIcon.loadTexture('Default_Icon', 0);

	//Rect
	mouse_Rect = new Phaser.Rectangle(Lucifer_Game.input.mousePointer.x, Lucifer_Game.input.mousePointer.y,
									  40, 40);

	MovePoint = Lucifer_Game.add.sprite(Lucifer_Game.input.mousePointer.x, Lucifer_Game.input.mousePointer.y, 'MovePoint');
	MovePoint.animations.add('MovePoint_ani',
									   [
									   	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
									   ], 60, true);
	MovePoint.loadTexture('MovePoint', 0, true);
	MovePoint.animations.play('MovePoint_ani', 10, true);
	MovePoint.anchor.setTo(0.5 , 0.5);	
	MovePoint.visible = false;
}

function mouse_ColCheck(Object)
{
	if(Object.DeadCheck == false)
	{
		if(Lucifer_Game.input.activePointer.leftButton.isDown)
		{
			if(Phaser.Rectangle.intersects(mouse_Rect, Object.HitRect))
			{
				if(Object.MouseCheck == false)
				{
					mouseIcon.loadTexture('Attack_Icon', 0);
					Object.MouseCheck = true;
				}
			}
			else if(Phaser.Rectangle.intersects(mouse_Rect, Object.HitRect) == false)
			{
				if(Object.MouseCheck == true)
				{
					mouseIcon.loadTexture('Default_Icon', 0);
					Object.MouseCheck = false;
				}
			}
		}
		else
		{
			if(Phaser.Rectangle.intersects(mouse_Rect, Object.HitRect))
			{
				if(Object.MouseCheck == false)
				{
					mouseIcon.loadTexture('Attack_Icon', 0);
					Object.MouseCheck = true;
				}
			}
			else if(Phaser.Rectangle.intersects(mouse_Rect, Object.HitRect) == false)
			{
				if(Object.MouseCheck == true)
				{
					mouseIcon.loadTexture('Default_Icon', 0);
					Object.MouseCheck = false;
				}
			}
		}
	}
	else
	{
		if(Phaser.Rectangle.intersects(mouse_Rect, Object.HitRect) == false)
		{
			if(Object.MouseCheck == true)
			{
				mouseIcon.loadTexture('Default_Icon', 0);
				Object.MouseCheck = false;
			}
		}
	}
}

function mouse_Update()
{
	//Rect Position
	var mouseposX = Lucifer_Game.input.mousePointer.x + Lucifer_Game.camera.x;
	var mouseposY = Lucifer_Game.input.mousePointer.y + Lucifer_Game.camera.y;

	mouse_Rect.x = mouseposX;
	mouse_Rect.y = mouseposY;
	mouse_Rect.centerOn(mouseposX, mouseposY);

	//Icon
	mouseIcon.x = mouseposX;
	mouseIcon.y = mouseposY;
	
}

function mouse_Render()
{
	Lucifer_Game.debug.geom(mouse_Rect, 'rgba(200, 0, 0, 0.5');
}
