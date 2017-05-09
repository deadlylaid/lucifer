//------------------------------------------------------------------------------
//Fallen Shaman Fire Ball 
//------------------------------------------------------------------------------

FireBall = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, 'SK_FireBall');
	this.PointX = x;
	this.PointY = y;

	this.Rect, this.AttackCheck = false, this.ColCheck = false;
}

FireBall.prototype = Object.create(Phaser.Sprite.prototype);
FireBall.prototype.constructor = FireBall;

function shamanSkill_Preload()
{
	Lucifer_Game.load.spritesheet('SK_FireBall',
								   '../../static/images/game/Monster_Skill/Fire_Ball.png',
								   50, 50);
}

function shamanSkill_Clone(x, y)
{
	var fire_Ball = new FireBall(Lucifer_Game, x, y);

	Lucifer_Game.physics.enable(fire_Ball, Phaser.Physics.ARCADE);

	fire_Ball.anchor.setTo(0.5, 0.5);
	fire_Ball.visible = true;

	Lucifer_Game.add.existing(fire_Ball);

	//Rect
	fire_Ball.Rect = new Phaser.Rectangle(fire_Ball.x, fire_Ball.y, 50, 50);

	return fire_Ball;
}