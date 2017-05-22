var debugCheck;
var EndingKey;

var stage1_Scene =
{
	/*
		STAGE1
		--마을 Stage--
	*/
	preload: function()
	{
		mouse_Preload();

		movepoint_Preload();
	},

	create: function()
	{
		//Sound
		sound_PlayStage1BGM();
		player_Sound_Create();
		ui_Sound_Create();
		npc_Sound_Create();

		//Stage
		stageOne_Create();

		//Shadow
		shadow_Create();

		//Player
		player_Create();

		//Appearance Effect
		Appearance_Effect_Create();

		//Item Effect
		item_Effect_Create();

		//Monster
		golem_Create();
		countess_Create();

		//Npc Create
		npc_Create();

		//Sight Effect
		sight_Filter_Create();

		//Quest
		QuestCreate();

        //inventory
        inventoryCreate();

        //items
        itemStoreCreate();

		//UI
		ui_Create();

		//Skill
		skill_Create();

		//Rain Particle
		rain_Create();

		//Quest Effect
		questComplete_Effect_Create();

		//mouse movePoint
		movepoint_Create();

		//Mouse
		mouse_Create();

		//GrayScale Effect
		grayScale_Create();

		//Message
		status_Message_Craete();

		//Key Go to Stage2
		debugCheck = false;
		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.F3);
		enterKey.onDown.add(debug_Rendering_Down, this);
		enterKey.onUp.add(debug_Rendering_Up, this);

		EndingKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.F2);
	},

	update: function()
	{
		//Player Update
		player_Update();

		//Appearance Effect Update
		Appearance_Effect_Update();

		//Item Effect Update
		item_Effect_Update();

		//Monster Update
		golem_Update();
		countess_Update();

		//Ui Update
		ui_Update();

        //items Update
		itemsStoreUpdate();

		//Quest Update
		QuestUpdate();

		//Quest Effect Update
		questComplete_Effect_Update();

		//Skill
		skill_Update();

		//Npc
		npc_Update();

		//mouse movepoint
		movepoint_Update();

		//Mouse
		mouse_Update();

		//Message
		status_Message_Update();

		//Portal
		portal_Check();

		if(Portal_Check == true)
		{
            characterStage='2';
            gameSave();
			sound_StopStage1BGM();
			this.goto_Stage2();
			Portal_Check = false;
		}

		if(EndingKey.isDown)
		{
			EndingScene();
		}
	},

	render: function()
	{
		if(debugCheck == true)
		{
			//Player Render
			player_Render();

			//Monster Render
			golem_Redner();
			countess_Render();

            //itemStoreRender
            itemStoreRender();

			//Npc
			npc_Debug_Render();

			//Skill
	        skill_Debug_Render();

	        //mouse movepoint
	        movepoint_Render();

	        //mouse
	        mouse_Render();
		}
	},

	goto_Stage2: function()
	{
		stageOne_Check = false;

		Lucifer_Game.state.start('stage2_load');
	}
};

function debug_Rendering_Down()
{
	if(debugCheck == false)
	{
		debugCheck = true;
	}
}

function debug_Rendering_Up()
{
	if(debugCheck == true)
	{
		debugCheck = false;
	}
}

function EndingScene()
	{
		sound_StopStage1BGM();
		sound_StopStage2BGM();
		sound_StopStage3BGM();
		Lucifer_Game.state.start('Ending');
	}
