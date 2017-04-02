var skill_Bavarian;
//---------------------------------------------------------------------------------------

function skill_Preload()
{
	Lucifer_Game.load.spritesheet('SK_Bavarian_Skill',
								  '../../static/images/game/Skill/Bavarian/Bavarian_Skill.png', 131, 160);
}

function skill_Create()
{
	//Example
	skill_Bavarian = Lucifer_Game.add.sprite(Player.x, Player.y, 'SK_Bavarian_Skill');
	skill_Bavarian.anchor.setTo(0.5, 0.5);		
	skill_Bavarian.visible = false;
	skill_Bavarian.blendMode = Phaser.blendModes.ADD;

	//Animation
	skill_Bavarian.animations.add('SK_Bavarian_Ani', 
								  [
								 	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
									11, 12, 13, 14, 15, 16, 17, 18, 19
								  ]
								  , 60, true);	

	skill_Bavarian.animations.play('SK_Bavarian_Ani', 20, true);
}

function skill_Update()
{
	skill_Bavarian.x = Player.x;
	skill_Bavarian.y = Player.y;
}