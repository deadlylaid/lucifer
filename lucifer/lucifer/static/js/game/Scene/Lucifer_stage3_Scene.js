var stage3_DebugCheck = false;
var EndingKey;

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
		sound_PlayStage3BGM();
		player_Sound_Create();
		ui_Sound_Create();
		npc_Sound_Create();
		monster_Sound_Create();

		//Stage
		stageThree_Create();

		//Shadow
		shadow_Create();

		//Player
		player_Create();

		//Auto Heal Effect
		auto_Heal_Create();

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

		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.F3);
		enterKey.onDown.add(debug_Down, this);
		enterKey.onUp.add(debug_Up, this);

		Stage1_Fastkey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
		Stage1_Fastkey.onDown.add(Stage3_Stage1FK, this);

		Stage2_Fastkey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
		Stage2_Fastkey.onDown.add(Stage3_Stage2FK, this);

		EndingKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
		EndingKey.onDown.add(EndingScene, this);
	},

	update: function()
	{
		//Player Update
		player_Update();

		//Auto Heal Effect Update
		auto_Heal_Update();

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

		//Quest Effect Update
		questComplete_Effect_Update();

		//Skill
		skill_Update();

		//mouse movepoint
		movepoint_Update();

		//Mouse
		mouse_Update();

		//Message
		status_Message_Update();

		//Skill Reset
		skill_Reset_Stage();

		//Portal
		portal_Check2();

		if (Portal_Check2 == true)
		{
            characterStage='2';
            gameSave();
			sound_StopStage3BGM();
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
		characterStage='2';
		BackStageMove = 0;
		//Sound
		sound_StopStage3BGM();

		Lucifer_Game.state.start('stage2_load');
	},
};

function Stage3_Stage1FK(){
	if(Keytestcheck == true)
	{	
		BackStageMove = 0;
		characterStage='1';
		gameSave();
		stageThree_Check = false;
		//Sound
		sound_StopStage3BGM();

		Lucifer_Game.state.start('load');
	}

}

function Stage3_Stage2FK()
{
	if(Keytestcheck == true){

		characterStage='2';
        gameSave();
		this.goto_Stage_back();
	}
}

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


function EndingScene()
	{	
		characterStage='1';
		gameSave();
		sound_StopStage3BGM();
		Lucifer_Game.state.start('Ending');
	}