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
	//--Stand Sprite
	var Direction = 0; 
	function Change_SpriteNumber(SpriteNumber)
	{
		//Sprite bp_y 값 변경
		Direction = SpriteNumber;
	}

	var Stand_SpriteNode = new Pig2d.node();
	var Standmodel = new Pig2d.SpriteModel({
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
					    "bp_x": 0, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//1번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//2번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -400, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//3번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 3, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//4번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 4, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//5번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 5, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//6번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 6, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//7번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 7, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
			]
		},
		imgObj : textures['stand/Stand.png']
	});	

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
					    "bp_x": 0, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//1번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//2번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -400, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//3번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 3, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//4번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 4, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//5번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 5, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//6번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 6, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//7번째
					[ 
					  {
						"width": 200, "height": 200, 
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 7, "bp_y": Direction
					  } 
					], "delay" : "100" 
				},
			]
		},
		imgObj : textures['walk/Walk.png']
	});

	//--Sprite set	
	Stand_SpriteNode.set( {model: Standmodel} );		
	Walk_SpriteNode.set( {model: Walkmodel} );		
	
	//--Play, stop, ready
	Stand_SpriteNode.get('model').setupAnimation();
	Stand_SpriteNode.get('model').set('AnimationStatus', 'play');
	Stand_SpriteNode.get('model').set('isAnimationLoop', true);	

	Walk_SpriteNode.get('model').setupAnimation();
	Walk_SpriteNode.get('model').show(false);

	var sprite_node = Pig2d.util.createDummy();	
	sprite_node.get('model').setPosition(640, 400);
	sprite_node.add(Stand_SpriteNode);
	sprite_node.add(Walk_SpriteNode);
	
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
	var GameScreen = document.querySelector(".pig2d-fullscreen");
	var Angle = 0;
	
	GameScreen.addEventListener('click', function(evt){		
		var MousePos = new gbox3d.core.Vect2d(evt.layerX, evt.layerY);
		var PlayerPos = sprite_node.get('model').getPosition();

		var PlayerDir = MousePos.sub(PlayerPos);
		PlayerDir.normalize();

		Angle = PlayerDir.getAngle();
		var Dir = Angle / 45;
		//console.log(Dir);

		return Dir;

		/*
		var MousePos = new gbox3d.core.Vect3d(evt.layerX, evt.layerY, 0);
		var PlayerPos = sprite_node.get('model').getPosition();				
		
		//플레이어가 마우스로 바라보는 방향벡터
		var PlayerDir = (MousePos.clone()).substract(sprite_node.get('model').getPosition());
		PlayerDir.normalize();	

		//마우스로 바라보는 방향벡터와 플레이어의 기본 방향 내적.
		var CosValue = PlayerDir.dotProduct(LookDir);
		
		Angle = Math.acos(CosValue);
		if(sprite_node.get('model').getPosition().y < MousePos.y)
		{
			Angle = 2 * Math.PI - Angle;
		}

		Angle = gbox3d.core.radToDeg(Angle);
		Direction = Angle / 45;

		console.log(PlayerDir);	
		*/	
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
