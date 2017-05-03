//-------------------------------------------------------------------------------------
// Player Appearance Effect 
//-------------------------------------------------------------------------------------
var player_Appearance_Effect, player_Appearance_Check = false;
//-------------------------------------------------------------------------------------

function Appearance_Effect_Preload()
{
	Lucifer_Game.load.spritesheet('Appearance_Effect',
								  '../../static/images/game/Effect/Appearance_Effect/Appearance_Effect.png',
								  232, 274);
}

function Appearance_Effect_Create()
{
	//Player Appearance Effect
	player_Appearance_Effect = Lucifer_Game.add.sprite(875, 1637, 'Appearance_Effect');
	player_Appearance_Effect.anchor.setTo(0.5, 0.5);
	player_Appearance_Effect.visible = false;
	player_Appearance_Effect.blendMode = Phaser.blendModes.ADD;

	//Appearance Animation
	player_Appearance_Effect.animations.add('Appearance_Ani',
											[	
											   0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
											   10, 11, 12, 13, 14, 15, 16, 17, 18, 19
											], 60 ,true);
	player_Appearance_Effect.animations.play('Appearance_Ani', 10, true);
}

function Appearance_Effect_Update()
{
	if(stageOne_Check == true)
	{
		if(player_Appearance_Check == false)
		{
			player_Appearance_Effect.visible = true;
			player_Appearance_Effect.animations.play('Appearance_Ani', 10, true);
			player_Appearance_Check = true;
			//Player.visible = false;
		}
		
		if(player_Appearance_Check == true)
		{
			var CurFrame = player_Appearance_Effect.animations.frame;
			var EndFrame = 19;

			if(CurFrame == EndFrame)
			{
				player_Appearance_Effect.visible = false;
				player_Appearance_Effect.animations.stop('Appearance_Ani', true);
				Player.visible = true;				
			}
		}		
	}	
} 