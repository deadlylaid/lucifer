var loadScene =
{
	/*
		Player 관련 소스 : PY_직업_동작 || Map 관련 소스 : MAP_스테이지 명    	|| Object 관련 소스 : OB_오브젝트 명
		UI 관련 소스 : UI_인터페이스 이름 || Monster 관련 소스 : MON_몬스터 명  || Skill 관련 소스 : SK_스킬명
		Effect 관련 소스 : EF_이펙트 명 || NPC 관련 소스 : NPC_이름         	|| Sound 관련 소스 : Sound_이름
	*/
	preload: function()
	{
		var loadingLabel = Lucifer_Game.add.text(80, 150, 'Loading...',
											{font: '30px Courier', fill: '#ffffff'});

		//Add a loading label on the screen
		Lucifer_Game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		Lucifer_Game.load.spritesheet('Menu_Image', '../../static/images/game/Menu/load_bg.png', 1280, 800);

		//Sound
		player_Sound_Preload();
		ui_Sound_Preload();
		npc_Sound_Preload();
		monster_Sound_Preload();

		//Rain Particle & Sight Filter & GrayScale Effect
		rain_Preload();
		sight_Filter_Preload();
		grayScale_Preload();

		//Stage Preload
		stageOne_Preload();
		//stageTwo_Preload();
		//stageThree_Preload()

		//Shadow
		shadow_Preload();

		//Player(Bavarian)
		player_Effect_Preload();
		Lucifer_Game.load.spritesheet('PY_Bavarian_Stand',
								  	  '../../static/images/game/Player/Bavarian/stand/Stand.png', 200, 200);
		Lucifer_Game.load.spritesheet('PY_Bavarian_Walk',
		 					      	  '../../static/images/game/Player/Bavarian/walk/Walk.png', 200, 200);
		Lucifer_Game.load.spritesheet('PY_Bavarian_Attack',
								      '../../static/images/game/Player/Bavarian/attack/attack.png', 200, 200);
		Lucifer_Game.load.spritesheet('PY_Bavarian_Jump',
									  '../../static/images/game/Player/Bavarian/jump/jump.png', 200, 200);
		Lucifer_Game.load.spritesheet('PY_Bavarian_Dash',
									  '../../static/images/game/Player/Bavarian/dash/dash.png', 200, 200);
		Lucifer_Game.load.spritesheet('PY_Bavarian_Skill',
									  '../../static/images/game/Player/Bavarian/skill/skill.png', 200, 200);
		Lucifer_Game.load.spritesheet('PY_Bavarian_Whirlwind',
									  '../../static/images/game/Player/Bavarian/whirlwind/whirlwind.png', 200, 200);

		//Monster UI
		Lucifer_Game.load.spritesheet('monsterHealthBar',
                                 	  '../../static/images/game/Monster/monsterHealthBar.png',
                                  	  224, 44);

		//Appearance_Effect
		Appearance_Effect_Preload();

		//Auto Heal Effect
		auto_Heal_Preload();

		//Item Effect
		item_Effect_Preload();

		//Mouse
		mouse_Preload();

		//items
        itemsPreload();
        itemStorePreload();

		//UI
		ui_Preload();

        //inventory
        inventoryPreload();

		//Effect
		blood_Effect_Preload();

		//Monster
		golem_Preload();
		countess_Preload();

		//Quest
		QuestPreload();

		//Quest Effect
		questComplete_Effect_Preload();

		//Skill
		skill_Preload();

		//Npc
		npc_Preload();

	},

	create: function()
	{
		var menuImage = Lucifer_Game.add.sprite(640, 400, 'Menu_Image');
		menuImage.anchor.setTo(0.5, 0.5);

		var loadtext = Lucifer_Game.add.text(470, 715, 'Press \"Enter\" Key to Start',
											{font: '30px Roboto', fill: '#ffffff'});
		loadtext.fixedToCamera = true;
		loadtext.addColor('#161cf7', 7);
		loadtext.addColor('#ffffff', 12);
		loadtext.addColor('#00b44c', 21);

		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(loadScene.start, this);
	},

	start: function()
	{
		//Sound
		sound_StopMenuBGM();

		stageOne_Check = true;
		Lucifer_Game.state.start('stage1');

	},


};
