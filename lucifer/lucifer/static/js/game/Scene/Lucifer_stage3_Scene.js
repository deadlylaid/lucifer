var stage3_DebugCheck = false;
var stage3_Scene =
{
	/*
		STAGE2
		--몬스터 출몰 지역--
	*/

	preload: function()
	{
		mouse_Preload();

		movepoint_Preload();
	},

	create: function()
	{
		//Sound
		//sound_PlayStage2BGM();

		//Stage
		stageThree_Create();

		//Shadow
		shadow_Create();

		//Player
		player_Create();

		//Item Effect
		item_Effect_Create();

		//Monster
		skeleton_Create();
		diablo_Create();

		//Tyreal Create
		npc_Tyreal_Create(2939, 843);

		//Sight Effect
		sight_Filter_Create();

		 //inventory
        inventoryCreate();

        //itemStore
        itemStoreCreate();

		//UI
		ui_Create();

		//Skill
		skill_Create();

		//Quest
		QuestCreate();

		//mouse movePoint
		movepoint_Create();

		//Mouse
		mouse_Create();

		//Message
		status_Message_Craete();

		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.F3);
		enterKey.onDown.add(debug_Down, this);
		enterKey.onUp.add(debug_Up, this);
	},

	update: function()
	{
		//Player Update
		player_Update();

		//Item Effect Update
		item_Effect_Update();

		//Monster Update
		skeleton_Update();
		diablo_Update();

		//Ui Update
		ui_Update();

		//items Update
        itemsStoreUpdate();

		//Quest Update
		QuestUpdate();

		//Skill
		skill_Update();

		//mouse movepoint
		movepoint_Update();

		//Mouse
		mouse_Update();

		//Message
		status_Message_Update();

		//Portal
		portal_Check2();

		if (Portal_Check2 == true)
		{
            characterStage='2';
            gameSave();
			sound_StopStage1BGM();
			this.goto_Stage_back();
			Portal_Check2 = false;
		}
	},

	render: function()
	{
		if(stage3_DebugCheck == true)
		{
			player_Render();
			diablo_Render();
			skeleton_Render();
		}
	},


	goto_Stage_back: function()
	{
		stageThree_Check = false;		//stage Three Check false
		action_CameraStepOne = false;	//action Camera Check false

		BackStageMove = 0;
		//Sound
		sound_StopStage2BGM();

		Lucifer_Game.state.start('stage2_load');
	},
};

function debug_Down()
{
	if(stage3_DebugCheck == false)
	{
		stage3_DebugCheck = true;
	}
}

function debug_Up()
{
	if(stage3_DebugCheck == true)
	{
		stage3_DebugCheck = false;
	}
}
