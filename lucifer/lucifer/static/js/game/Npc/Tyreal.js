//Tyreal
//---------------------------------------------------------------------------------------
var npc_Tyreal;
//---------------------------------------------------------------------------------------
Tyreal = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, 'NPC_Tyreal');

	//Pos
	this.PointX = x, this.PointY = y;
}

Tyreal.prototype = Object.create(Phaser.Sprite.prototype);
Tyreal.prototype.constructor = Tyreal;

function npc_Tyreal_Preload()
{
	Lucifer_Game.load.spritesheet('NPC_Tyreal',
								  '../../static/images/game/Npc/tyreal/tyreal.png', 256, 256);
}

function npc_Tyreal_Create(PointX, PointY)
{
	npc_Tyreal = new Tyreal(Lucifer_Game, PointX, PointY);

	//Animation
	npc_Tyreal.animations.add('NPC_Tyreal_Ani',
							  [	
							     0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
							  ], 60, true);
	npc_Tyreal.animations.play('NPC_Tyreal_Ani', 10, true);

	//setting
	npc_Tyreal.scale.setTo(2.0, 2.0);
	npc_Tyreal.anchor.setTo(0.5, 0.5);
	npc_Tyreal.blendMode = Phaser.blendModes.ADD;

	Lucifer_Game.physics.p2.enable(npc_Tyreal);
	npc_Tyreal.body.fixedRotation = true;
	npc_Tyreal.body.clearShapes();
	npc_Tyreal.body.addRectangle(120, 120, 0, 0);
	npc_Tyreal.body.debug = false;
	npc_Tyreal.body.static = true;	

	Lucifer_Game.physics.enable(npc_Tyreal, Phaser.Physics.ARCADE);
    npc_Tyreal.inputEnabled = true;
    npc_Tyreal.events.onInputDown.add(EndingTalk, this);

	Lucifer_Game.add.existing(npc_Tyreal);
}

function EndingTalk(){
	console.log("Talk");

}