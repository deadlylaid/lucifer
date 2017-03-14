/*****************************
* 2017년 3월 13일 최영준
* pig2d 를 이용한 기본 게임 로직 js
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

    //--Sprite Node Create(Example)
	/*
	var SpriteNode = Pig2d.util.createSlicedImage({
		imgObj : textures['Stand.png'],
		cutx   : 0,
		cuty   : 0,
		basex  : -textures['Stand.png'].width / 2,
		basey  : -textures['Stand.png'].height / 2,
		width  : textures['Stand.png'].width / 2,
		height : textures['Stand.png'].height / 2
	});
	SpriteNode.get('model').setPosition(640, 400);
	

	//--Sprite Node add to SceneMgr
	SceneMgr.add(SpriteNode);
	*/

	//--Sprite Node Create
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
					], "delay" : "50" 
				},
				{"sheets" : 	//1번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200, "bp_y": 0
					  } 
					], "delay" : "50" 
				},
				{"sheets" : 	//2번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -400, "bp_y": 0
					  } 
					], "delay" : "50" 
				},
				{"sheets" : 	//3번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 3, "bp_y": 0
					  } 
					], "delay" : "50" 
				},
				{"sheets" : 	//4번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 4, "bp_y": 0
					  } 
					], "delay" : "50" 
				},
				{"sheets" : 	//5번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 5, "bp_y": 0
					  } 
					], "delay" : "50" 
				},
				{"sheets" : 	//6번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 6, "bp_y": 0
					  } 
					], "delay" : "50" 
				},
				{"sheets" : 	//7번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 7, "bp_y": 0
					  } 
					], "delay" : "50" 
				},
			]
		},
		imgObj : textures['Stand.png']
	});

	//Sprite set / get
	SpriteNode.set( {model: model} );
	SpriteNode.get('model').setupAnimation();

	//Play, stop, ready
	SpriteNode.get('model').set('AnimationStatus', 'play');
	SpriteNode.get('model').set('isAnimationLoop', true);

	var sprite_node = Pig2d.util.createDummy();
	sprite_node.get('model').set('flipY', true);	//좌우 뒤집기
	sprite_node.get('model').setPosition(640, 400);
	sprite_node.add(SpriteNode);
	SceneMgr.add(sprite_node);

	//--Controller Setting
	/*Pig2d.util.setup_pig2dTestController(
		document,		//Evenet 받을 대상
		SpriteNode);	//조종할 대상이 되는 객체*/

	//Timer Setting & Performance Test Infomation(FPS)
	var GameTimer = new gbox3d.core.Timer();
	var Framerate_Info = document.querySelector("#text-Framerate-Info");
	var Frame_Total = 0;
	var Loop_Count = 0;

	//Game Loop
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

	Pig2d.system.startGameLoop({
		framerate_info_element : document.querySelector("#text-Framerate-Info"),
		gameLoopCallBack : function(DeltaTime){
			//장면 관리자 update & Node update
			SceneMgr.updateAll(DeltaTime);
		},
		loopCount_limit : 30
	});
}

Pig2d.util.SetupAsset({
	asset_path : "../../static/images/game/Player/Bavarian/stand/",
	img_files : [
		"Stand.png"
	],
	OnLoadComplete : main
});
