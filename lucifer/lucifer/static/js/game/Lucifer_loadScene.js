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
		var loadingLabel = Lucifer_Game.add.text(80, 150, 'loading...',
											{font: '15px Courier', fill: '#ffffff'});

		Lucifer_Game.load.spritesheet('Menu_Image', '../../static/images/game/Menu/Menu.png', 1280, 800);		
		
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
		Lucifer_Game.state.start('menu');
	}
};
