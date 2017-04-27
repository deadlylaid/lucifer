//-------------------------------------------------------------------------------------
// Blood Effect
//-------------------------------------------------------------------------------------
Blood_Effect = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, 'Blood');

	this.PointX = x;
	this.PointY = y;
}

Blood_Effect.prototype = Object.create(Phaser.Sprite.prototype);
Blood_Effect.prototype.constructor = Blood_Effect;

function blood_Effect_Preload()
{
	Lucifer_Game.load.spritesheet('Blood',
								  '../../static/images/game/Effect/Blood_Effect/Blood_Effect.png',
								   50 ,50);
}

function blood_Effect_Clone(x, y)
{
	var blood_Effect = new Blood_Effect(Lucifer_Game, x, y);

	blood_Effect.anchor.setTo(0.5, 0.5);
	blood_Effect.visible = false;
	blood_Effect.blendMode = Phaser.blendModes.ADD;	

	//Animation
	blood_Effect.animations.add('blood_Ani',
								[
								   0, 1, 2, 3, 4, 5, 6, 7, 8
								], 60, true);
	blood_Effect.animations.play('blood_Ani', 10, true);
	Lucifer_Game.add.existing(blood_Effect);	

	return blood_Effect;
}

function blood_Effect_Update(Object)
{
	if(Object.blood_Effect.visible == true)
	{
		Object.blood_Effect.x = Object.x;
		Object.blood_Effect.y = Object.y;

		var CurFrame = Object.blood_Effect.animations.frame;
		var EndFrame = 8;

		if(CurFrame == EndFrame)
		{
			Object.blood_Effect.visible = false;
			Object.blood_Effect.animations.frame = 0;
		}
	}
}