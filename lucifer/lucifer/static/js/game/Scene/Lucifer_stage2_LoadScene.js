var stage2_LoadScene =
{
	/*
		Player 관련 소스 : PY_직업_동작 || Map 관련 소스 : MAP_스테이지 명    	|| Object 관련 소스 : OB_오브젝트 명
		UI 관련 소스 : UI_인터페이스 이름 || Monster 관련 소스 : MON_몬스터 명  || Skill 관련 소스 : SK_스킬명
		Effect 관련 소스 : EF_이펙트 명 || NPC 관련 소스 : NPC_이름         	|| Sound 관련 소스 : Sound_이름
	*/

	preload: function()
	{
		//Add a loading label on the screen
		var loadingLabel = Lucifer_Game.add.text(80, 150, 'loading...',
											{font: '15px Courier', fill: '#ffffff'});

		Lucifer_Game.load.spritesheet('Menu_Image', '../../static/images/game/Menu/load_bg2.png', 1280, 800);

		//Stage Preload
		stageTwo_Preload();

		//Shadow
		shadow_Preload();

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

		//Mouse
		mouse_Preload();

		//Item
		itemsPreload();
        itemStorePreload();

		//UI
		ui_Preload();

        //inventory
        inventoryPreload();

		//Effect
		blood_Effect_Preload();

		//Monster
		sandRider_Preload();
		andariel_Preload();
		wraith_Preload();
		deamon_Preload();
		council_Preload();

		//Quest
		QuestPreload();

		//Skill
		skill_Preload();
	},

	create: function()
	{
		var menuImage = Lucifer_Game.add.sprite(640, 400, 'Menu_Image');
		menuImage.anchor.setTo(0.5, 0.5);

		var loadtext2 = Lucifer_Game.add.text(435, 715, 'Press \"Enter\" Key to Next Stage',
											{font: '30px Roboto', fill: '#ffffff'});
		loadtext2.fixedToCamera = true;
		loadtext2.addColor('#161cf7', 7);
		loadtext2.addColor('#ffffff', 12);
		loadtext2.addColor('#e9dd16', 21);

		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(stage2_LoadScene.start, this);


	},

	start: function()
	{
		//Sound
		sound_StopMenuBGM();

		stageTwo_Check = true;
		Lucifer_Game.state.start('stage2');

	},

};
