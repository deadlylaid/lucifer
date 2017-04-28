//-------------------------------------------------------------------------------------
// Sight Effect
//-------------------------------------------------------------------------------------
function sight_Filter_Preload()
{
	Lucifer_Game.load.image('Sight', '../../static/images/game/Effect/Sight/sight.png');
}

function sight_Filter_Create()
{
	var sight_Filter = Lucifer_Game.add.image(640, 400, 'Sight');

	sight_Filter.width = 1280;
	sight_Filter.height = 800;
	sight_Filter.visible = true;
	sight_Filter.fixedToCamera = true;
	sight_Filter.anchor.setTo(0.5, 0.5);
	sight_Filter.blendMode = Phaser.blendModes.MULTIPLY;
	sight_Filter.alpha = 0.9;
}
