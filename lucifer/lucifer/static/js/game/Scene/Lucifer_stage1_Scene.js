var debugCheck;

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
		fallen_Shaman_Create();
		andariel_Create();
		wraith_Create();
		deamon_Create();

        //items
        itemsCreate();

		//UI
		ui_Create();

		//Skill
		skill_Create();

		//Npc Create
		npc_Create();

		//Key Go to Stage2
		debugCheck = false;
		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		enterKey.onDown.add(debug_Rendering_Down, this);
		enterKey.onUp.add(debug_Rendering_Up, this);
	},

	update: function()
	{
		//Player Update
		player_Update();

		//Monster Update
		golem_Update();
		fallen_Shaman_Update();
		andariel_Update();
		wraith_Update();
		deamon_Update();

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
		if(debugCheck == true)
		{
			//Player Render
			player_Render();

			//Monster Render
			golem_Redner();
			fallen_Shaman_Render();
			andariel_Render();
			wraith_Render();
			deamon_Render();
			
            //itemStoreRender
            itemStoreRender();

			//Npc
			npc_Debug_Render();

			//Skill
	        skill_Debug_Render();
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
