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

		//Monster
		fallen_Shaman_Create();
		andariel_Create();
		wraith_Create();
		deamon_Create();
		council_Create();

		//UI
		ui_Create();

		//Skill
		skill_Create();

		//Queset
		QuestCreate();

		//Mouse
		mouse_Create();

		go();
	},

	update: function()
	{
		//Player Update
		player_Update();

		//Monster Update
		fallen_Shaman_Update();
		andariel_Update();
		wraith_Update();
		deamon_Update();

		council_Update();

		//items Update
        //itemsUpdate();


		//Ui Update
		ui_Update();

		//Quest Update
		QuestUpdate();

		//Skill
		skill_Update();

		//Stage2 Culling
		//stage2_Culling();

		//Mouse
		mouse_Update();

		//Portal
		portal_Check();

		if(Portal_Check == true)
		{
			sound_StopStage1BGM();
			this.goto_Stage3();
			Portal_Check = false;
		}

		portal_Check2();

		if (Portal_Check2 == true)
		{
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
