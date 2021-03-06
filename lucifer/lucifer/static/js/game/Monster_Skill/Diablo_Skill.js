//Diablo Skill
//-----------------------------------------------------------------------------------------
Inferno = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, 'Inferno');
	this.PointX = x;
	this.PointY = y;

	this.SkillRect;
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

	//Rect
	diablo_Inferno.SkillRect = new Phaser.Rectangle(diablo_Inferno.x, diablo_Inferno.y, 100, 100);

	return diablo_Inferno;
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

	//Rect Pos
	Object.Inferno.SkillRect.x = Object.Inferno.x;
	Object.Inferno.SkillRect.y = Object.Inferno.y;
	Object.Inferno.SkillRect.centerOn(Object.Inferno.x, Object.Inferno.y);
}

function diaSkill_Fire_Col(Object)
{
	/*Player defence_point 가 제대로 안들어 왔는지 NaN의 값이 나온다. 확인해 봐야 된다.
	  그 부분만 해결하면 이부분은 더이상 수정할 필요 없을듯.*/

	if(Phaser.Rectangle.intersects(Object.FireRect, Hit_Rect))
	{
		if(Object.animations.name == 'MON_Diablo_Skill1_' + Object.Direction)
		{
			var CurFrame = Object.animations.frame;
			var EndFrame = 0;

			if(Object.Direction == 0)
			{
				EndFrame = 17;
			}
			else
			{
				EndFrame = 17 * (Object.Direction + 1);
			}

			if(CurFrame == EndFrame)
			{
				var monster_Attack_Damage = (Object.Skill_Attack_Point1 - defence_point);

				if(monster_Attack_Damage > 0)
				{
					health -= monster_Attack_Damage;
				}
				else if(monster_Attack_Damage < 0)
				{
					health -= monster_Attack_Damage * 0.01;
				}
			}
		}
	}
}

function diaSkill_Inferno_Col(Object)
{
	if(Phaser.Rectangle.intersects(Object.Inferno.SkillRect, Hit_Rect))
	{
		if(Object.animations.name == 'MON_Diablo_Skill_' + Object.Direction)
		{
			var CurFrame = Object.animations.frame;
			var EndFrame = 0;

			if(Object.Direction == 0)
			{
				EndFrame = 16;
			}
			else
			{
				EndFrame = 16 * (Object.Direction + 1);
			}

			if(CurFrame == EndFrame)
			{
				var monster_Attack_Damage = (Object.Skill_Attack_Point - defence_point);

				if(monster_Attack_Damage > 0)
				{
					health -= monster_Attack_Damage;
				}
				else if(monster_Attack_Damage < 0)
				{
					health -= monster_Attack_Damage * 0.01;
				}
			}
		}
	}
}

function diaSkill_Update()
{

}

function diaSkill_Render()
{

}
