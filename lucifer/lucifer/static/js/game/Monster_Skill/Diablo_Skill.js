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

	diablo_Inferno.anchor.setTo(0.5, 0.5);
	diablo_Inferno.visible = false;
	diablo_Inferno.blendMode = Phaser.blendModes.ADD;		

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

	Lucifer_Game.add.existing(diablo_Inferno);

	//Timer
	diablo_Inferno.Timer = Lucifer_Game.time.create(false);
	diablo_Inferno.Timer.loop(1000, diaSkill_Timer, Lucifer_Game, diablo_Inferno);

	return diablo_Inferno;
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

//Inferno Animation Change
function diaSkill_Inferno_Animation_Change(Direction, Object)
{	
	Object.Inferno.visible = true;
	Object.Inferno.loadTexture('Inferno', 0, true);
	Object.Inferno.animations.play('Inferno_' + Direction, 10, true);		
}

function diaSkill_Direction_Inferno_Position(Direction, Object)
{
	switch(Direction)
	{
	case 0:
		Object.Inferno.x = Object.x;
		Object.Inferno.y = Object.y - 40;
		break;
	case 1:
		Object.Inferno.x = Object.x - 50;
		Object.Inferno.y = Object.y - 40;
		break;
	case 2:
		Object.Inferno.x = Object.x - 80;
		Object.Inferno.y = Object.y;
		break;
	case 3:
		Object.Inferno.x = Object.x - 50;
		Object.Inferno.y = Object.y + 40;
		break;
	case 4:
		Object.Inferno.x = Object.x;
		Object.Inferno.y = Object.y + 40;
		break;
	case 5:
		Object.Inferno.x = Object.x + 50;
		Object.Inferno.y = Object.y + 40;
		break;
	case 6:
		Object.Inferno.x = Object.x + 80;
		Object.Inferno.y = Object.y;
		break;
	case 7:
		Object.Inferno.x = Object.x + 50;
		Object.Inferno.y = Object.y - 40;
		break;
	}		
}

function diaSkill_Update()
{

}

function diaSkill_Render()
{

}