var stage2_Scene =
{
	/*
		STAGE2
		--몬스터 출몰 지역--
	*/

	create: function()
	{
		//Sound
		sound_PlayStage2BGM();

		//Stage
		stageTwo_Create();

		//Shadow
		shadow_Create();

		//Player
		player_Create();

		//Item Effect
		item_Effect_Create();

		//Monster
		//fallen_Shaman_Create();
		sandRider_Create();
		andariel_Create();
		wraith_Create();
		deamon_Create();
		council_Create();

		//Queset
		QuestCreate();

        //inventory
        inventoryCreate();

        //itemStore
        itemStoreCreate();

		//UI
		ui_Create();

		//Skill
		skill_Create();

		//mouse movePoint
		movepoint_Create();

		//Mouse
		mouse_Create();

		//Message
		status_Message_Craete();

		go();
	},

	update: function()
	{
		//Player Update
		player_Update();

		//Item Effect Update
		item_Effect_Update();

		//Monster Update
		//fallen_Shaman_Update();
		sandRider_Update();
		andariel_Update();
		wraith_Update();
		deamon_Update();
		council_Update();

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
		portal_Check();

		if(Portal_Check == true)
		{
            characterStage='3';
            gameSave();
			sound_StopStage1BGM();
			this.goto_Stage3();
			Portal_Check = false;
		}

		portal_Check2();

		if (Portal_Check2 == true)
		{
            characterStage='1';
            gameSave();
			sound_StopStage1BGM();
			this.goto_Stage_back();
			Portal_Check2 = false;
		}

	},

	render: function()
	{
		//Player Render
		//player_Render();

		//Monster Render(Golem)
		//golem_Debug_Render();

	},

	goto_Stage3: function()
	{
		stageTwo_Check = false;

		//Sound
		sound_StopStage2BGM();

		Lucifer_Game.state.start('stage3_load');
	},

	goto_Stage_back: function()
	{

		stageTwo_Check = false;

		BackStageMove = 0;
		//Sound
		sound_StopStage2BGM();

		Lucifer_Game.state.start('load');
	},
};

function go()
{
		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(stage2_Scene.goto_Stage3, this);
};
