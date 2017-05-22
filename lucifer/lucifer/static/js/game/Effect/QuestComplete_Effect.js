//-------------------------------------------------------------------------------------
// Quest Complete Effect
//-------------------------------------------------------------------------------------
var questComplete_Effect, questComplete_Effect_Check = false;
var questComplete_Text;
//-------------------------------------------------------------------------------------

function questComplete_Effect_Preload()
{
	Lucifer_Game.load.spritesheet('Quest_Complete_Effect',
								  '../../static/images/game/Effect/Quest_Complete/Quest_Complete.png',
								  72, 86);
	//Lucifer_Game.load.spritesheet('Quest_Complete_Effect_Text',
								  //'../../static/images/game/Effect/Quest_Complete/Quest_Complete_Text.png',
								  //300, 35);
}

function questComplete_Effect_Create()
{
	questComplete_Effect = Lucifer_Game.add.sprite(680, 400, 'Quest_Complete_Effect');
	questComplete_Effect.anchor.setTo(0.5, 0.5);
	questComplete_Effect.visible = false;
	questComplete_Effect.fixedToCamera = true;

	//Animation
	questComplete_Effect.animations.add('Quest_Complete_Ani',
										[
										   0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
										   10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
										   20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
										   30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
										   40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
										   50, 51
										], 60, true);
	//questComplete_Effect.animations.play('Quest_Complete_Ani', 10, true);
}

function qeusetComplete_Effect_Triger()
{
	for(var i = 0; i < characterQuest.length; ++i)
	{
		if(characterQuest[i].isCompleted == true)
		{
			if(questComplete_Effect_Check == false)
			{
				questComplete_Effect_Check = true;
			}
		}
	}
}

function questComplete_Effect_Update()
{
	if(questComplete_Effect_Check == true)
	{
		questComplete_Effect.visible = true;
		questComplete_Effect.animations.play('Quest_Complete_Ani', 20, true);

		var CurFrame = questComplete_Effect.animations.frame;
		var EndFrame = 51;

		if(CurFrame == 1)
		{
			sound_QuestComplete.play();
		}

		if(CurFrame == EndFrame)
		{
			questComplete_Effect.visible = false;
			questComplete_Effect.animations.stop('Quest_Complete_Ani', true);
			questComplete_Effect_Check = false;
		}
	}
}
