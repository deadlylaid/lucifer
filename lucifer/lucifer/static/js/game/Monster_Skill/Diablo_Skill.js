//Diablo Skill
//-----------------------------------------------------------------------------------------
Inferno = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, 'Inferno');
	this.PointX = x;
	this.PointY = y;

	this.Timer, this.Time_Total = 0;

	this.Attack_Check = false;
}

Inferno.prototype = Object.create(Phaser.Sprite.prototype);
Inferno.prototype.constructor = Inferno;

DiaFire = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, 'Fire');
	this.PointX = x;
	this.PointY = y;

	this.Timer, this.Time_Total = 0;

	this.Attack_Check = false;
}

DiaFire.prototype = Object.create(Phaser.Sprite.prototype);
DiaFire.prototype.constructor = DiaFire;

function diaSkill_Preload()
{
	//Skill    
    Lucifer_Game.load.spritesheet('Inferno', 
                                  '../../static/images/game/Monster_Skill/Diablo_Dialnferno.png',
                                   220, 160);	
    Lucifer_Game.load.image('Fire', '../../static/images/game/Monster_Skill/Diablo_Fire.png');
}

function diaSkill_Inferno_Clone(x, y)
{
	var diablo_Inferno = new Inferno(Lucifer_Game, x, y);

	Lucifer_Game.physics.p2.enable(diablo_Inferno);
	diablo_Inferno.body.fixedRotation = true;
	diablo_Inferno.body.clearShapes();
	diablo_Inferno.body.debug = true;
	diablo_Inferno.restitution = 0;

	//Animation
	var index = 0;
	for(var i = 0; i < 8; ++i)
	{
		diablo_Inferno.animations.add('Inferno_' + i,
									  [
									  	index,      index + 1,  index + 2,  index + 3,  index + 4,
									  	index + 5,  index + 6,  index + 7,  index + 8,  index + 9,
									  	index + 10, index + 11, index + 12, index + 13, index + 14
									  ], 60, true);

		index += 15;
	}	

	diablo_Inferno.loadTexture('Inferno', 0, true);
	diablo_Inferno.animations.play('Inferno_0', 5, true);
	diablo_Inferno.anchor.setTo(0.5, 0.5);
	diablo_Inferno.visible = false;
	diablo_Inferno.blendMode = Phaser.blendModes.ADD;

	//Timer
	diablo_Inferno.Timer = Lucifer_Game.time.create(false);
	diablo_Inferno.Timer.loop(1000, diaSkill_Timer, Lucifer_Game, diablo_Inferno);

	return diablo_Inferno;
}

function diaSkill_Fire_Clone(x, y)
{
	var diablo_Fire = new DiaFire(Lucifer_Game, x, y);
	diablo_Fire.anchor.setTo(0.5, 0.5);
	diablo_Fire.visible = false;
	diablo_Fire.blendMode = Phaser.blendModes.ADD;

	//Timer
	diablo_Fire.Timer = Lucifer_Game.time.create(false);
	diablo_Fire.Timer.loop(1000, diaSkill_Timer, Lucifer_Game, diablo_Fire);

	return diablo_Fire;
}

function diaSkill_Timer(Object)
{
	++Object.Time_Total;
}

//Diablo Fire Logic
function diaSkill_Fire_Attack(Object)
{
	if(Object.Pattern_Skill == true && Object.Pattern_Change == true)
	{
		Object.Fire.setAll('visible', true);	

		var amount, start, step, i, angle, speed;
		amount = 36;
		start = Math.PI * -1;
		step = Math.PI / amount * 2;
		i = amount;

		while(i > 0)
		{
			Object.Fire_Bullet = Object.Fire.getFirstDead(); 			

			if(Object.Fire_Bullet)
			{
				Object.Fire_Bullet.reset(Object.x, Object.y);

				angle = start + i * step;
				speed = 300;

				Object.Fire_Bullet.body.velocity.x = Math.cos(angle) * speed;
				Object.Fire_Bullet.body.velocity.y = Math.sin(angle) * speed;			
			}

			--i;
		}
	}
}

function diaSkill_Update()
{

}

function diaSkill_Render()
{

}