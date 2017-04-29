//-------------------------------------------------------------------------------------
// Mouse Icon
//-------------------------------------------------------------------------------------

var MovePoint, MovePointX, MovePointY, movepoint_rect;

function movepoint_Preload()
{
	Lucifer_Game.load.spritesheet('MovePoint', '../../static/images/game/UI/Mouse/Move_point.png', 45, 38);
}

function movepoint_Create()
{
	MovePoint = Lucifer_Game.add.sprite(640, 400, 'MovePoint');

	MovePoint.animations.add('MovePoint',
									   [
									   	  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
									   ], 60, true);


	MovePoint.animations.play('MovePoint', 10, true);
	MovePoint.anchor.setTo(0.5 , 0.5);

	movepoint_rect = new Phaser.Rectangle(MovePoint.x, MovePoint.y, 40, 40);
	movepoint_rect.visible = true;
}


function movepoint_Update()
{

	if(Lucifer_Game.input.activePointer.isDown)

	{	
		
		MovePoint.x = Lucifer_Game.input.mousePointer.x + Lucifer_Game.camera.x - 773;
		MovePoint.y = Lucifer_Game.input.mousePointer.y + Lucifer_Game.camera.y - 551;

		if(Lucifer_Game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
			{
				MovePoint.x = Lucifer_Game.input.mousePointer.x + Lucifer_Game.camera.x - 885 ;
				MovePoint.y = Lucifer_Game.input.mousePointer.y + Lucifer_Game.camera.y - 650 ;
			}
	}

}

function movepoint_Render()
{
	Lucifer_Game.debug.geom(movepoint_rect, 'rgba(200, 0, 0, 0.5');
}
