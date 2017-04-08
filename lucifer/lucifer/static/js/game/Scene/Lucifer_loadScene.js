var loadtext, menuImage;

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    //active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia']
    }

};

var loadScene = 
{
	/*
		Player 관련 소스 : PY_직업_동작 || Map 관련 소스 : MAP_스테이지 명    	|| Object 관련 소스 : OB_오브젝트 명 
		UI 관련 소스 : UI_인터페이스 이름 || Monster 관련 소스 : MON_몬스터 명  || Skill 관련 소스 : SK_스킬명
		Effect 관련 소스 : EF_이펙트 명 || NPC 관련 소스 : NPC_이름         	|| Sound 관련 소스 : Sound_이름 
	*/
	preload: function()
	{		
		//Add a loading label on the screen			
		Lucifer_Game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
		Lucifer_Game.load.spritesheet('Menu_Image', '../../static/images/game/Menu/load_bg.png', 1280, 800);

		//Stage Preload
		//----------------------------------------------------------------------------------------------------------
		stageOne_Preload();
		//stageTwo_Preload();
		//----------------------------------------------------------------------------------------------------------
	
		//Player(Bavarian)
		//----------------------------------------------------------------------------------------------------------
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
		//----------------------------------------------------------------------------------------------------------
	
		//items
		//----------------------------------------------------------------------------------------------------------
        itemsPreload();
		//----------------------------------------------------------------------------------------------------------
		//UI : spritesheet(Image로 불러오는 것으로 해야될수도 있음. 아직 UI 안들어 가서 보류)
		//----------------------------------------------------------------------------------------------------------
		ui_Preload();
		//----------------------------------------------------------------------------------------------------------
	
		//Monster
		//----------------------------------------------------------------------------------------------------------
		golem_Preload();
		fallen_Shaman_Preload();
		andariel_Preload();
		wraith_Preload();
		//----------------------------------------------------------------------------------------------------------
	
		//Skill
		//----------------------------------------------------------------------------------------------------------
		skill_Preload();
		//----------------------------------------------------------------------------------------------------------
	
		//Npc
		//----------------------------------------------------------------------------------------------------------
		npc_Preload();
		//----------------------------------------------------------------------------------------------------------
	},

	create: function()
	{		
		menuImage = Lucifer_Game.add.sprite(640, 400, 'Menu_Image');
		menuImage.anchor.setTo(0.5, 0.5);		

		loadtext = Lucifer_Game.add.text(this.world.centerX - 170, 715, 'Loading...',
											{font: '30px Roboto', fill: '#ffffff'});
		loadtext.fixedToCamera = true;

		loadComplete();
	},

	start: function()
	{
		//Sound
		sound_StopMenuBGM();

		stageOne_Check = true;
		Lucifer_Game.state.start('stage1');
	},

	
};

function loadComplete()
{
	loadtext.setText("Press \"Enter\" Key to Start ");

		var enterKey = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(loadScene.start, this);
};