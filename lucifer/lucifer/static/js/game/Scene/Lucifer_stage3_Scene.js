var stage3_DebugCheck = false;
var stage3_Scene =
{
	/*
		STAGE2 
		--몬스터 출몰 지역--
	*/

	create: function()
	{
		//Sound
		//sound_PlayStage2BGM();

		//Stage
		stageThree_Create();

		//Player
		player_Create();

		//UI
		ui_Create();

		//Monster
		diablo_Create();

		//UI
		ui_Create();

		//Skill
		skill_Create();

		//Quest
		QuestCreate();

		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.F3);
		enterKey.onDown.add(debug_Down, this);
		enterKey.onUp.add(debug_Up, this);
	},

	update: function()
	{
		//Player Update
		player_Update();

		//Monster Update(Golem)
		diablo_Update();

		//Ui Update
		ui_Update();

		//Quest Update
		QuestUpdate();

		//Skill
		skill_Update();

		//Portal
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
		if(stage3_DebugCheck == true)
		{
			//Player Render
			player_Render();
			diablo_Render();
		}		
	},
	

	goto_Stage_back: function()
	{	
		stageThree_Check = false;
		
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