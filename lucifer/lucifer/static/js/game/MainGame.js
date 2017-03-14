/*****************************
* 2017년 3월 13일 최영준
* pig2d 를 이용한 기본 게임 로직 js

* 2017년 3월 14일 최영준
* Sprite Image 띄우기 / 마우스 이동 / Sprite 각도에 따라 변환.
* **************************/
//## Main Function
function main(evt){
	//--texture
	var textures = evt.textures;

	//--Scene Mgr Create
	var SceneMgr = new Pig2d.SceneManager({
		container: document.querySelector('.pig2d-fullscreen')
	});    
    console.log(SceneMgr);    

	//--Sprite Node Create
	//****************************************************************************************************
	var SpriteNode = new Pig2d.node();
	var model 	   = new Pig2d.SpriteModel({
		data : 
		{
			"name" : "Bavarian_Stand",
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
		imgObj : textures['Stand.png']
	});

	//--Sprite set / get
	SpriteNode.set( {model: model} );
	SpriteNode.get('model').setupAnimation();

	//--Play, stop, ready
	SpriteNode.get('model').set('AnimationStatus', 'play');
	SpriteNode.get('model').set('isAnimationLoop', true);

	var sprite_node = Pig2d.util.createDummy();
	//sprite_node.get('model').set('flipY', true);	//좌우 뒤집기
	sprite_node.get('model').setPosition(640, 400);
	sprite_node.add(SpriteNode);

	//SceneMgr Add
	SceneMgr.add(sprite_node);
 	sprite_node.get('model').setupTransition({
 		TransitionEndCallBack : function(){}
 	});
 	//****************************************************************************************************

 	//--Controller Setting
	/*Pig2d.util.setup_pig2dTestController(
		document,		//Evenet 받을 대상
		SpriteNode);	//조종할 대상이 되는 객체*/	

	//--Function Rogic
	//****************************************************************************************************
	//--Player Move(Mouse Click)
	document.body.addEventListener('click', function(evt){
		var Current_Position = sprite_node.get('model').getPosition();
		var New_Poisiton	 = new gbox3d.core.Vect2d(evt.layerX, evt.layerY);

		//Current Position 과 New Position 간의 거리.
		var Distance = (New_Poisiton.clone()).subToThis(Current_Position).getDistance();

		sprite_node.get('model').transition({
			position: New_Poisiton,
			time : Distance / 150	//1초에 150 픽셀 만큼 이동.
		});
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
	asset_path : "../../static/images/game/Player/Bavarian/stand/",
	img_files : [
		"Stand.png"
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
