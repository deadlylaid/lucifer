/*****************************
* 2017년 3월 13일 최영준
* pig2d 를 이용한 기본 게임 로직 js
* *************************
* 2017년 3월 14일 최영준
* Sprite Image 띄우기 / 마우스 이동 / Sprite 각도에 따라 변환.
* *************************
* 2017년 3월 17일 최영준
* Player Direction 구하기 완료.
* *************************
* 2017년 3월 20일 최영준
* Map 이미지 띄움.
* *************************
* 2017년 3월 21일 최영준
* Phaser js 로 작업 시작. 
* **************************/

//## Main Game.js -- 3월 21일 최영준 
/*-----------------------------------------------------
	 모든 게임 관련 함수들을 돌려주는 js 파일
	 preload function : 미리 데이터를 가져오는 함수.
	 create function : 위에서 받은 데이터를 가지고 객체 생성 해주는 함수
	 update function : 게임상의 코드를 갱신해주는 함수.
-----------------------------------------------------*/
var Lucifer_Game = new Phaser.Game(1280, 800, Phaser.CANVAS, 'GameScreen',
								   { preload: preload, create: create, update: update });

//## Game 상에서 필요한 변수들 
//-----------------------------------------------------
var Player, Cursor, Background_map; 
//-----------------------------------------------------
function preload(){
	/*
		Player 관련 소스 : PY_직업_동작
		Map 관련 소스 : MAP_스테이지 명
		Object 관련 소스 : OB_오브젝트 명 
		UI 관련 소스 : UI_인터페이스 이름
		Monster 관련 소스 : MON_몬스터 명
		Skill 관련 소스 : SK_스킬명
		Effect 관련 소스 : EF_이펙트 명
		NPC 관련 소스 : NPC_이름
		Sound 관련 소스 : Sound_이름 
	*/

	Lucifer_Game.load.spritesheet('PY_Bavarian_Stand', 
								  '../../static/images/game/Player/Bavarian/stand/Stand.png',
								  200, 200);
	Lucifer_Game.load.spritesheet('PY_Bavarian_Walk', 
		 					      '../../static/images/game/Player/Bavarian/walk/Walk.png',
		 					      200, 200);
	Lucifer_Game.load.image('MAP_Start', '../../static/images/game/Map/TestStage.png');	
}

function create(){
	//Image Setting
	Lucifer_Game.add.sprite(0, 0, 'MAP_Start');

	//Player
	//---------------------------------------------------------------------------------------
	Player = Lucifer_Game.add.sprite(200, 200, 'PY_Bavarian_Stand');

	//Player Stand Animation
	for(var i = 0; i < 8; ++i)
	{
		Player.animations.add('PY_Bavarian_Stand_' + i, [0, 1, 2, 3, 4, 5, 6, 7], 60, true);
	}

	//Player Walk Animation
	for(var i = 0; i < 8; ++i)
	{
		Player.animations.add('PY_Bavarian_Walk_' + i, [0, 1, 2, 3, 4, 5, 6, 7], 60, true);
	}	
	//---------------------------------------------------------------------------------------
}

function update(){
	//Key Setting
	//---------------------------------------------------------------------------------------
	Player.body.velocity.x = 0;
	Player.body.velocity.y = 0;

	Lucifer_Game.input.mouse.capture = true;
	//---------------------------------------------------------------------------------------
}

/*
function main(evt){
	//Game Extern Value
	//*************************************************************************
	var LookDir = new gbox3d.core.Vect3d(1, 0, 0);

	//--texture
	var textures = evt.textures;
	//*************************************************************************

	//--Scene Mgr Create
	var SceneMgr = new Pig2d.SceneManager({
		container: document.querySelector('.pig2d-fullscreen')
	});
    console.log(SceneMgr);

    //--Test Stage Setting
    /*
    var TestStage_Map = Pig2d.util.createSlicedImage({
    	imgObj : textures['Map/TestStage.png'],
    	basex : -textures['Map/TestStage.png'].width / 2,
    	basey : -textures['Map/TestStage.png'].height / 2
    });
    TestStage_Map.get('model').setPosition(500, 400);
    SceneMgr.add(TestStage_Map);
    */
    
    //--Scroller Setting
    /*
    var TestScrollObject = new Pig2d.util.scroller.type_finalfight({
    	scroll_center : 640,
    	speed : 150,
    	front_layer : textures['Map/TestStage.png'],
    	back_layer : textures['Map/TestStage.png'],    	
    	backlayer_rate : 0
    });  
    SceneMgr.add(TestScrollObject.getRoot());
    */

    /*
    var TestScroll_Dummy = Pig2d.util.createDummy();   
    var TestMap_Iamge = Pig2d.util.createSlicedImage({
    	imgObj: textures['Map/TestStage.png']
    });
    
    TestScroll_Dummy.add(TestMap_Iamge);
    SceneMgr.add(TestScroll_Dummy);

    //트랜지션 세팅
    TestScroll_Dummy.get('model').setupTransition({
          TransitionEndCallBack : function() {
         }
    });

    TestMap_Iamge.get('model').setupTransition({
           TransitionEndCallBack : (function() {
         })
    });  
	*/
    
	//--Sprite Node Create
	//****************************************************************************************************
	/*
	var Stand_Sprite = new Array();
	var Walk_Sprite = new Array();

	for(var i = 0; i < 8; ++i)
	{
		Stand_Sprite[i] = Player_Bavarian_StandSprite(evt, i);	
		Stand_Sprite[i].get('model').setupAnimation();
	
		Walk_Sprite[i] = Player_Bavarian_WalkSprite(evt, i);
		Walk_Sprite[i].get('model').setupAnimation();

		Stand_Sprite[i].get('model').show(false);
		Walk_Sprite[i].get('model').show(false);
	}
	Stand_Sprite[0].get('model').show(true);

	var sprite_node = Pig2d.util.createDummy();
	sprite_node.get('model').setPosition(640, 400);

	for(var i = 0; i < 8; ++i)
	{
		sprite_node.add(Stand_Sprite[i]);
		sprite_node.add(Walk_Sprite[i]);
	}
	
	//SceneMgr Add
	SceneMgr.add(sprite_node);
	*/
 	//****************************************************************************************************
 	//--Controller Setting
	/*Pig2d.util.setup_pig2dTestController(
		document,		//Evenet 받을 대상
		SpriteNode);	//조종할 대상이 되는 객체*/

	//--Function Rogic
	//****************************************************************************************************
	//--Mouse Position & Player Sprite Number Change(방향에 따른 스프라이트 View 설정)
	/*
	function Change_SpriteNumber(SpriteNumber, CheckWalk)
	{
		//Sprite Numver 가 아무것도 아닐때 처리.
		if(SpriteNumber == undefined)
		{
			Direction = 0;
		}

		//Sprite Number 에 따른 처리.
		switch(SpriteNumber)
		{
		case 0:
			if(CheckWalk == 0)
			{
				Stand_Sprite[0].get('model').show(true);

				for(var i = 1; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);
				}

				Stand_Sprite[0].get('model').setupAnimation();
				Stand_Sprite[0].get('model').set('AnimationStatus', 'play');
				Stand_Sprite[0].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);	
				}				
			}
			else if(CheckWalk == 1)
			{
				Walk_Sprite[0].get('model').show(true);

				for(var i = 1; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);
				}

				Walk_Sprite[0].get('model').setupAnimation();
				Walk_Sprite[0].get('model').set('AnimationStatus', 'play');
				Walk_Sprite[0].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);	
				}
			}	
			break;
		case 1:
			if(CheckWalk == 0)
			{
				Stand_Sprite[1].get('model').show(true);

				Stand_Sprite[0].get('model').show(false);
				for(var i = 2; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);
				}

				Stand_Sprite[1].get('model').setupAnimation();
				Stand_Sprite[1].get('model').set('AnimationStatus', 'play');
				Stand_Sprite[1].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);	
				}				
			}
			else if(CheckWalk == 1)
			{
				Walk_Sprite[1].get('model').show(true);

				Walk_Sprite[0].get('model').show(false);
				for(var i = 2; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);
				}

				Walk_Sprite[1].get('model').setupAnimation();
				Walk_Sprite[1].get('model').set('AnimationStatus', 'play');
				Walk_Sprite[1].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);	
				}
			}
			break;
		case 2:
			if(CheckWalk == 0)
			{
				Stand_Sprite[2].get('model').show(true);

				Stand_Sprite[0].get('model').show(false);
				Stand_Sprite[1].get('model').show(false);	
				for(var i = 3; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);
				}

				Stand_Sprite[2].get('model').setupAnimation();
				Stand_Sprite[2].get('model').set('AnimationStatus', 'play');
				Stand_Sprite[2].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);	
				}				
			}
			else if(CheckWalk == 1)
			{
				Walk_Sprite[2].get('model').show(true);

				Walk_Sprite[0].get('model').show(false);
				Walk_Sprite[1].get('model').show(false);
				for(var i = 3; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);
				}

				Walk_Sprite[2].get('model').setupAnimation();
				Walk_Sprite[2].get('model').set('AnimationStatus', 'play');
				Walk_Sprite[2].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);	
				}
			}
			break;
		case 3:
			if(CheckWalk == 0)
			{
				Stand_Sprite[3].get('model').show(true);

				Stand_Sprite[0].get('model').show(false);
				Stand_Sprite[1].get('model').show(false);
				Stand_Sprite[2].get('model').show(false);	
				for(var i = 4; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);
				}

				Stand_Sprite[3].get('model').setupAnimation();
				Stand_Sprite[3].get('model').set('AnimationStatus', 'play');
				Stand_Sprite[3].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);	
				}				
			}
			else if(CheckWalk == 1)
			{
				Walk_Sprite[3].get('model').show(true);

				Walk_Sprite[0].get('model').show(false);
				Walk_Sprite[1].get('model').show(false);
				Walk_Sprite[2].get('model').show(false);
				for(var i = 4; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);
				}

				Walk_Sprite[3].get('model').setupAnimation();
				Walk_Sprite[3].get('model').set('AnimationStatus', 'play');
				Walk_Sprite[3].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);	
				}
			}
			break;
		case 4:
			if(CheckWalk == 0)
			{
				Stand_Sprite[4].get('model').show(true);

				Stand_Sprite[0].get('model').show(false);
				Stand_Sprite[1].get('model').show(false);
				Stand_Sprite[2].get('model').show(false);
				Stand_Sprite[3].get('model').show(false);	
				for(var i = 5; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);
				}

				Stand_Sprite[4].get('model').setupAnimation();
				Stand_Sprite[4].get('model').set('AnimationStatus', 'play');
				Stand_Sprite[4].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);	
				}				
			}
			else if(CheckWalk == 1)
			{
				Walk_Sprite[4].get('model').show(true);

				Walk_Sprite[0].get('model').show(false);
				Walk_Sprite[1].get('model').show(false);
				Walk_Sprite[2].get('model').show(false);
				Walk_Sprite[3].get('model').show(false);
				for(var i = 5; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);
				}

				Walk_Sprite[4].get('model').setupAnimation();
				Walk_Sprite[4].get('model').set('AnimationStatus', 'play');
				Walk_Sprite[4].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);	
				}
			}
			break;
		case 5:
			if(CheckWalk == 0)
			{
				Stand_Sprite[5].get('model').show(true);

				Stand_Sprite[0].get('model').show(false);
				Stand_Sprite[1].get('model').show(false);
				Stand_Sprite[2].get('model').show(false);
				Stand_Sprite[3].get('model').show(false);
				Stand_Sprite[4].get('model').show(false);
				for(var i = 6; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);
				}

				Stand_Sprite[5].get('model').setupAnimation();
				Stand_Sprite[5].get('model').set('AnimationStatus', 'play');
				Stand_Sprite[5].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);	
				}				
			}
			else if(CheckWalk == 1)
			{
				Walk_Sprite[5].get('model').show(true);

				Walk_Sprite[0].get('model').show(false);
				Walk_Sprite[1].get('model').show(false);
				Walk_Sprite[2].get('model').show(false);
				Walk_Sprite[3].get('model').show(false);
				Walk_Sprite[4].get('model').show(false);
				for(var i = 6; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);
				}

				Walk_Sprite[5].get('model').setupAnimation();
				Walk_Sprite[5].get('model').set('AnimationStatus', 'play');
				Walk_Sprite[5].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);	
				}
			}
			break;
		case 6:
			if(CheckWalk == 0)
			{
				Stand_Sprite[6].get('model').show(true);

				for(var i = 0; i < 6; ++i)
				{
					Stand_Sprite[i].get('model').show(false);		
				}									
				for(var i = 7; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);
				}

				Stand_Sprite[6].get('model').setupAnimation();
				Stand_Sprite[6].get('model').set('AnimationStatus', 'play');
				Stand_Sprite[6].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);	
				}				
			}
			else if(CheckWalk == 1)
			{
				Walk_Sprite[6].get('model').show(true);

				for(var i = 0; i < 6; ++i)
				{
					Walk_Sprite[i].get('model').show(false);
				}				
				for(var i = 7; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);
				}

				Walk_Sprite[6].get('model').setupAnimation();
				Walk_Sprite[6].get('model').set('AnimationStatus', 'play');
				Walk_Sprite[6].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);	
				}
			}
			break;
		case 7:
			if(CheckWalk == 0)
			{
				Stand_Sprite[7].get('model').show(true);

				for(var i = 0; i < 7; ++i)
				{
					Stand_Sprite[i].get('model').show(false);
				}

				Stand_Sprite[7].get('model').setupAnimation();
				Stand_Sprite[7].get('model').set('AnimationStatus', 'play');
				Stand_Sprite[7].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Walk_Sprite[i].get('model').show(false);	
				}				
			}
			else if(CheckWalk == 1)
			{
				Walk_Sprite[7].get('model').show(true);

				for(var i = 0; i < 7; ++i)
				{
					Walk_Sprite[i].get('model').show(false);
				}

				Walk_Sprite[7].get('model').setupAnimation();
				Walk_Sprite[7].get('model').set('AnimationStatus', 'play');
				Walk_Sprite[7].get('model').set('isAnimationLoop', true);

				for(var i = 0; i < 8; ++i)
				{
					Stand_Sprite[i].get('model').show(false);	
				}
			}
			break;
		}				
	}	

	var GameScreen = document.querySelector(".pig2d-fullscreen");
	var Angle = 0;
	var Direction = 0;

	//--MouseDown Event
	var vMousePos;
	GameScreen.addEventListener('mousedown', function(evt){		

		//Scroll
		//***********************************************************************************************
		//TestScrollObject.setScrollPos(evt.layerX);		
		//***********************************************************************************************
       	
		//Angle
		//***********************************************************************************************
		vMousePos = new gbox3d.core.Vect3d(evt.layerX, evt.layerY, 0);

		var PlayerPos = sprite_node.get('model').getPosition();
		var vPlayerPos = new gbox3d.core.Vect3d(PlayerPos.X, PlayerPos.Y, 0);		
		//var vPlayerPos = new gbox3d.core.Vect3d(640, 400, 0);

		//플레이어가 마우스를 바라보는 방향벡터를 구함
		var vPlayerDir = vMousePos.substract(vPlayerPos);
		//vPlayerDir.normalize();
		
		Angle = Math.atan(-vPlayerDir.Y / vPlayerDir.X);
		
		if(vPlayerDir.X < 0)
		{
			Angle += Math.PI;
		}
		if(vMousePos.X >= vPlayerPos.X && vMousePos.Y >= vPlayerPos.Y)
		{
			Angle += 2 * Math.PI;
		}

		Angle *= gbox3d.core.RADTODEG;			
	
		/*
		function abs3Value(value){
			var result = Math.pow(value.X - 0, 2) + Math.pow(value.Y - 0, 2) + Math.pow(value.Z - 0, 2);
			return result;
		}

		var DotValue = vPlayerPos.dotProduct(vMousePos);
		var CosValue = DotValue / (Math.sqrt(abs3Value(vPlayerPos)) * Math.sqrt(abs3Value(vMousePos)));

		Angle = Math.acos(CosValue) * (180 / Math.PI);
		*/

		//console.log(vMousePos);
		//console.log(vPlayerPos);
		//console.log(Angle);	
		/*
		Direction = Angle / 45;
		//parseInt(Direction);
		//console.log(Direction);
		//***********************************************************************************************		
		if(Direction > 0 && Direction < 1)
		{
			Direction = 0;
		}
		else if(Direction > 1 && Direction < 2)
		{
			Direction = 1;
		}
		else if(Direction > 2 && Direction < 3)
		{
			Direction = 2;
		}
		else if(Direction > 3 && Direction < 4)
		{
			Direction = 3;
		}
		else if(Direction > 4 && Direction < 5)
		{
			Direction = 4;
		}
		else if(Direction > 5 && Direction < 6)
		{
			Direction = 5;
		}
		else if(Direction > 6 && Direction < 7)
		{
			Direction = 6;
		}
		else if(Direction > 7)
		{
			Direction = 7;
		}		

		Change_SpriteNumber(Direction, 1);
	});
	GameScreen.addEventListener('mouseup', function(evt){
		Change_SpriteNumber(Direction, 0);
	});

	//-- Scroll Move
	//스크롤 잘 안됨. 지금 여기서 할께 아니라 위에 함수에서 실행해 봐야됨. 그리고 X 관련된 스크롤도 해봐야됨.
	/*
	var MouseControler = new Pig2d.util.controller.MouseSpot({
		listener_element : document,
		node : TestScroll_Dummy,
		speed : 150,
		setupCallBack : function(){
		},
		endCallBack : function(){
			TestScroll_Dummy.get('model').stopTransition();
            TestMap_Iamge.get('model').stopTransition();			
		},
		startCallBack : function(evt){				
			var targetY = 400 - (evt.layerY - TestScroll_Dummy.get('model').getPosition().Y);
			var dist = Math.abs(TestScroll_Dummy.get('model').getPosition().Y - targetY);
            var duration = (dist / 150); //초당 speed 만큼 간다.            

            TestScroll_Dummy.get('model').transition({
                position : new gbox3d.core.Vect2d(targetY,0),
                time : duration
            });

            TestMap_Iamge.get('model').transition({
                position : new gbox3d.core.Vect2d(-targetY * 0.6, 0),
                time : duration
            });				
		}
	});	
	*/		
	//****************************************************************************************************

	//--Game Loop
	//****************************************************************************************************
	//--Timer Setting & Performance Test Infomation(FPS)
	/*
	var GameTimer = new gbox3d.core.Timer();
	var Framerate_Info = document.querySelector("#text-Framerate-Info");
	var Frame_Total = 0;
	var Loop_Count = 0;

	Pig2d.system.startGameLoop({
		framerate_info_element : document.querySelector("#text-Framerate-Info"),
		gameLoopCallBack : function(DeltaTime){
			//Fps
			var DeltaTime = GameTimer.getDeltaTime();

			Frame_Total += Math.round(1.0 / DeltaTime);
			Loop_Count++;
			Framerate_Info.innerText = Math.round(Frame_Total / Loop_Count);

			//장면 관리자 update & Node update
			SceneMgr.updateAll(DeltaTime);
		},
		loopCount_limit : 30
	});
	//****************************************************************************************************
}

Pig2d.util.SetupAsset({
	asset_path : "../../static/images/game/",
	img_files : [
		"Player/Bavarian/stand/Stand.png",
		"Player/Bavarian/walk/Walk.png",
		"Map/TestStage.png"
	],
	OnLoadComplete : main
});

/*
	requestAnimationFrame(
		function loop(){
			var DeltaTime = GameTimer.getDeltaTime();
			Frame_Total += Math.round(1.0 / DeltaTime);
			Loop_Count++;
			Framerate_Info.innerText = Math.round(Frame_Total / Loop_Count);
			//SceneMgr Update
			//여기서 모든 노드의 최신 상태가 화면에 반영 된다.
			SceneMgr.updateAll();
			requestAnimationFrame(loop);
		}
	);
*/
