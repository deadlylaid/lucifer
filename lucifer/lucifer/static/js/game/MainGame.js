/*****************************
* 2017년 3월 13일 최영준
* pig2d 를 이용한 기본 게임 로직 js
* 2017년 3월 14일 최영준
* Sprite Image 띄우기 / 마우스 이동 / Sprite 각도에 따라 변환.
* **************************/
//## Main Function
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

	//--Sprite Node Create
	//****************************************************************************************************

	//--Walk Sprite
	var Walk_SpriteNode = new Pig2d.node();
	var Walkmodel = new Pig2d.SpriteModel({
		data :
		{
			"name" : "Bavarian_Walk",
			"frames" :
			[
				{"sheets" : 	//0번재
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": 0, "bp_y": 0
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//1번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200, "bp_y": 0
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//2번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -400, "bp_y": 0
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//3번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 3, "bp_y": 0
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//4번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 4, "bp_y": 0
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//5번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 5, "bp_y": 0
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//6번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 6, "bp_y": 0
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//7번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 7, "bp_y": 0
					  }
					], "delay" : "100"
				},
			]
		},
		imgObj : textures['walk/Walk.png']
	});

	var Stand_Sprite = new Array();

	for(var i = 0; i < 8; ++i)
	{
		Stand_Sprite[i] = Player_Bavarian_StandSprite(evt, i);

		//Stand_Sprite[i].get('model').setupAnimation();
		//Stand_Srpite[i].get('model').set('AnimationStatus', 'play');
		//Stand_Srpite[i].get('model').set('isAnimationLoop', true);
	}

	var sprite_node = Pig2d.util.createDummy();
	sprite_node.get('model').setPosition(640, 400);

	for(var i = 0; i < 8; ++i)
	{
		//sprite_node.add(Stand_Sprite[i]);
	}

	sprite_node.add(Walk_SpriteNode);

	Walk_SpriteNode.set( {model: Walkmodel} );
	Walk_SpriteNode.get('model').setupAnimation();
	Walk_SpriteNode.get('model').show(false);

	//SceneMgr Add
	SceneMgr.add(sprite_node);
 	//****************************************************************************************************
 	//--Controller Setting
	/*Pig2d.util.setup_pig2dTestController(
		document,		//Evenet 받을 대상
		SpriteNode);	//조종할 대상이 되는 객체*/

	//--Function Rogic
	//****************************************************************************************************
	//--Mouse Position & Player Sprite Number Change(방향구함)
	//스프라이트 변화는 하나의 이미졸 불러오는게 아니라 각도마다 다른 이미지를 불러오는 것이 방법중 하나.
	function Change_SpriteNumber(SpriteNumber)
	{
		//Sprite bp_y 값 변경
		//Direction = SpriteNumber;
		//sprite_node.get('sheets').bp_y = -200 * SpriteNumber;
		Direction = -200 * SpriteNumber;

		if(Direction == undefined)
		{
			Direction = 0;
		}

		console.log(Direction);
	}

	var GameScreen = document.querySelector(".pig2d-fullscreen");
	var Angle = 0;

	GameScreen.addEventListener('click', function(evt){
		var MousePos = new gbox3d.core.Vect2d(evt.layerX, evt.layerY);
		var PlayerPos = sprite_node.get('model').getPosition();

		//플레이어가 마우스를 바라보는 방향벡터를 구함
		var PlayerDir = MousePos.sub(PlayerPos);
		PlayerDir.normalize();

		//각도를 구함. 8방향
		Angle = PlayerDir.getAngle();
		var Dir = Angle / 45;

		Change_SpriteNumber(Dir);
		//Direction = Dir;
		//console.log(Direction);
	});

	//--Player Move
	var MouseControler = new Pig2d.util.controller.MouseSpot({
		listener_element : document,
		node : sprite_node,
		speed : 150,
		setupCallBack : function(){
		},
		endCallBack : function(){
			Stand_SpriteNode.get('model').show(true);
			Stand_SpriteNode.get('model').setupAnimation();
			Stand_SpriteNode.get('model').set('AnimationStatus', 'play');
			Stand_SpriteNode.get('model').set('isAnimationLoop', true);

			Walk_SpriteNode.get('model').show(false);
		},
		startCallBack : function(evt){
			Walk_SpriteNode.get('model').show(true);
			Walk_SpriteNode.get('model').set('AnimationStatus', 'play');
			Walk_SpriteNode.get('model').set('isAnimationLoop', true);

			Stand_SpriteNode.get('model').show(false);
		}
	});
	//****************************************************************************************************

	//--Game Loop
	//****************************************************************************************************
	//--Timer Setting & Performance Test Infomation(FPS)
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
	asset_path : "../../static/images/game/Player/Bavarian/",
	img_files : [
		"stand/Stand.png",
		"walk/Walk.png"
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
