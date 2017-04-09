var stage3_Scene =
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
		stageThree_Create();

		//Player
		player_Create();

		//UI
		ui_Create();

		//Monster
		//golem_Create();

		
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

	
	goto_Stageend: function()
	{
		stageThree_Check = false;
		//Sound
		sound_StopStage2BGM();

		//Lucifer_Game.state.start('stage3');
	}
};