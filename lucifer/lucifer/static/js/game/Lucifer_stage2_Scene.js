var stage2_Scene =
{
	/*
		STAGE2 
		--몬스터 출몰 지역--
	*/

	create: function()
	{
		//Stage
		stageTwo_Create();

		//Player
		player_Create();

		//Monster
		golem_Create();

		//UI
		ui_Create();
	},

	update: function()
	{
		//Player Update
		player_Update();

		//Monster Update(Golem)
		golem_Rogic();

		//Ui Update
		ui_Update();
	},

	render: function()
	{
		//Player Render
		player_Render();

		//Monster Render(Golem)
		golem_Debug_Render();
	},

	goto_Stage3: function()
	{
		Lucifer_Game.state.start('stage3');
	}
};