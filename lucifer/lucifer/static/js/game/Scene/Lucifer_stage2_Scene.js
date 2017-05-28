var bossStage_Alert, bossStage_Alert_Timer, bossStage_Alert_TimeTotal = 0;

var stage2_Scene =
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
		sound_PlayStage2BGM();
		player_Sound_Create();
		ui_Sound_Create();
		npc_Sound_Create();
		monster_Sound_Create();

		//Stage
		stageTwo_Create();

		//Shadow
		shadow_Create();

		//Player
		player_Create();

		//Auto Heal Effect
		auto_Heal_Create();

		//Item Effect
		item_Effect_Create();

		//Monster
		//fallen_Shaman_Create();
		sandRider_Create();
		andariel_Create();
		wraith_Create();
		deamon_Create();
		council_Create();

		//Sight Effect
		//sight_Filter_Create();

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

		//Skill Reset
		skill_Reset_Stage();

		//Alert Meesage
		bossStage_Alert = this.add.sprite(640, 400, 'Stage_Alert');
		bossStage_Alert.anchor.setTo(0.5, 0.5);
		bossStage_Alert.visible = false;
		bossStage_Alert.fixedToCamera = true;

		bossStage_Alert_Timer = this.time.create(false);
		bossStage_Alert_Timer.loop(1000, this.bossStage_AlertTimer, this);

		go();

		Stage3_Fastkey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
		Stage3_Fastkey.onDown.add(Stage2_Stage3FK, this);

		Stage1_Fastkey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
		Stage1_Fastkey.onDown.add(Stage2_Stage1FK, this);
	},

	bossStage_AlertTimer: function()
	{
		++bossStage_Alert_TimeTotal;
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

		//Portal
		portal_Check();

		if(Portal_Check == true)
		{
            characterStage='3';
            gameSave();
			sound_StopStage2BGM();
			goto_Stage3();
			Portal_Check = false;
		}

		portal_Check2();

		if (Portal_Check2 == true)
		{
            characterStage='1';
            gameSave();
			sound_StopStage2BGM();
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

	goto_Stage_back: function()
	{

		stageTwo_Check = false;
		characterStage='1';
		BackStageMove = 0;
		//Sound
		sound_StopStage2BGM();

		Lucifer_Game.state.start('load');
	},
};

function goto_Stage3()
{
	if(level >= 10)
	{
		stageTwo_Check = false;

		//Sound
		sound_StopStage2BGM();
		Lucifer_Game.state.start('stage3_load');
	}
	else if(level < 10)
	{
		bossStage_Alert.visible = true;
		//Sound
        sound_AlertWindow.play();
	}
}

function Stage2_Stage3FK(){
	if(Keytestcheck == true)
	{	
		characterStage='3';
        gameSave();
		sound_StopStage2BGM();
		goto_Stage3();
	}
}

function Stage2_Stage1FK(){
	if(Keytestcheck == true)
	{	
		gameSave();
		this.goto_Stage_back();
	}

}

function go()
{
		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(goto_Stage3, this);
};
