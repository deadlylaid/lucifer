var stage1_Scene = 
{
	/*
		STAGE1 
		--마을 Stage--
	*/

	create: function()
	{
		//Sound
		sound_PlayStage1BGM();

		//Stage
		stageOne_Create();

		//Player
		player_Create();

		//Monster
		golem_Create();

        //items
        itemsCreate();

		//UI
		ui_Create();

		//Skill
		skill_Create();

		//Npc Create
		npc_Create();

		//Key Go to Stage2
		//var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		//enterKey.onDown.addOnce(this.goto_Stage2, this);
	},

	update: function()
	{
		//Player Update
		player_Update();

		//Monster Update(Golem)
		golem_Rogic();

        //items Update
        itemsUpdate();

		//Ui Update
		ui_Update();

		//Skill
		skill_Update();

		//Npc
		npc_Update();

		//Portal
		portal_Check();

		if(Portal_Check == true)
		{
			sound_StopStage1BGM();
			this.goto_Stage2();
			Portal_Check = false;
		}
	},

	render: function()
	{
		//Player Render
		player_Render();

		//Monster Render(Golem)
		golem_Debug_Render();

		//Npc
		npc_Debug_Render();

		//Skill
        skill_Debug_Render();
	},

	goto_Stage2: function()
	{
		stageOne_Check = false;
		Lucifer_Game.state.start('stage2_load');
	}
};
