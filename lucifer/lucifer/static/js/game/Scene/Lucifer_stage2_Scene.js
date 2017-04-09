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

		//Player
		player_Create();

		//Monster
		golem_Create();

		//UI
		ui_Create();

		go();
	},

	update: function()
	{
		//Player Update
		player_Update();

		//Monster Update(Golem)
		//golem_Rogic();

		//Ui Update
		ui_Update();
	},

	render: function()
	{
		//Player Render
		player_Render();

		//Monster Render(Golem)
		//golem_Debug_Render();
	},

	goto_Stage3: function()
	{	
		stageTwo_Check = false;
		//Sound
		sound_StopStage2BGM();

		Lucifer_Game.state.start('stage3_load');
	}
};

function go()
{
		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(stage2_Scene.goto_Stage3, this);
};