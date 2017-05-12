//Gray Scale Effect
//-------------------------------------------------------------------------------------
var gray_Scale;
var dead_Alert;
//-------------------------------------------------------------------------------------

function grayScale_Preload()
{
	Lucifer_Game.load.image('GrayScale', '../../static/images/game/Effect/GrayScale/GrayScale.png');
	Lucifer_Game.load.image('Dead_Alert', '../../static/images/game/Effect/GrayScale/Alert_Dead.png');
}

function grayScale_Create()
{
	gray_Scale = Lucifer_Game.add.image(640, 400, 'GrayScale');

	gray_Scale.width = 1280;
	gray_Scale.height = 800;
	gray_Scale.anchor.setTo(0.5, 0.5);
	gray_Scale.visible = false;
	gray_Scale.blendMode = Phaser.blendModes.MULTIPLY;
	gray_Scale.fixedToCamera = true;
	gray_Scale.alpha = 0.5;

	dead_Alert = Lucifer_Game.add.image(640, 400, 'Dead_Alert');
	dead_Alert.anchor.setTo(0.5, 0.5);
	dead_Alert.visible = false;
	dead_Alert.alpha = 0.1;
	dead_Alert.fixedToCamera = true;
}