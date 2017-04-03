var skill_Bavarian, skill_Bavarian_Two;
var skill_Two_Rect, skill_intersects;
//---------------------------------------------------------------------------------------

function skill_Preload()
{
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill.png', 131, 160);
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill2',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill2.png', 150, 100);
}

function skill_Create()
{
	//Skill - 1
	skill_Bavarian = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill');
	skill_Bavarian.anchor.setTo(0.5, 0.5);		
	skill_Bavarian.visible = false;
	skill_Bavarian.blendMode = Phaser.blendModes.ADD;

	//Skill - 1 Animation
	skill_Bavarian.animations.add('SK_Bavarian_Ani', 
								  [
								 	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
									11, 12, 13, 14, 15, 16, 17, 18, 19
								  ]
								  , 60, true);	

	skill_Bavarian.animations.play('SK_Bavarian_Ani', 20, true);

	//Skill - 2
	skill_Bavarian_Two = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill2');
	skill_Bavarian_Two.anchor.setTo(0.5, 0.5);
	skill_Bavarian_Two.visible = false;
	skill_Bavarian_Two.blendMode = Phaser.blendModes.ADD;

	//Skill - 2 Animation
	skill_Bavarian_Two.animations.add('SK_Bavarian_Ani2', 
									  [
									  	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
									  ],
									  60, true);	
	skill_Bavarian_Two.animations.play('SK_Bavarian_Ani2', 20, true);
	skill_Bavarian_Two.scale.setTo(2, 2);

	//Skill Rect
	skill_Two_Rect = new Phaser.Rectangle(skill_Bavarian_Two.x, skill_Bavarian_Two.y, 150, 100);
	skill_Two_Rect.scale(1.6, 1.6);
}

function skill_Attack()
{
	if(skill_Bavarian_Two.visible == true)
	{
		if(Phaser.Rectangle.intersects(skill_Two_Rect, golem_HitRect))
		{
			golem_Hp -= 10;
			console.log(golem_Hp);			
		}
	}
}

function skill_Reset()
{
	if(skill_Bavarian.frame == 19 && skill_Bavarian.visible == true)
	{
		skill_Bavarian.animations.stop('SK_Bavarian_Ani', true);
		skill_Bavarian.visible = false;
		skill_Bavarian.frame = 0;

		Animation_Change(Direction, 'Stand');
	}	

	if(skill_Bavarian_Two.frame == 14 && skill_Bavarian_Two.visible == true)
	{
		skill_Bavarian_Two.animations.stop('SK_Bavarian_Ani2', true);
		skill_Bavarian_Two.visible = false;
		skill_Bavarian_Two.frame = 0;

		Animation_Change(Direction, 'Stand');
	}	
}

function skill_Update()
{
	skill_Bavarian.x = Player.x;
	skill_Bavarian.y = Player.y;
	skill_Bavarian_Two.x = Player.x;
	skill_Bavarian_Two.y = Player.y + 30;

	//Rect
	skill_Two_Rect.x = skill_Bavarian_Two.x;
	skill_Two_Rect.y = skill_Bavarian_Two.y; 
	skill_Two_Rect.centerOn(skill_Bavarian_Two.x, skill_Bavarian_Two.y);

	//Attack
	skill_Attack();

	//Reset
	skill_Reset();

	//Debug
	skill_intersects = Phaser.Rectangle.intersection(skill_Two_Rect, golem_HitRect);
}

function skill_Debug_Render()
{
	Lucifer_Game.debug.geom(skill_Two_Rect, 'rgba(100, 100, 100, 0.4)');
	Lucifer_Game.debug.geom(skill_intersects, 'rgba(255, 0, 0, 1)');
}