/*****************************
* 2017년 3월 17일 최영준
* Player(Bavarian) 관련 리소스 로딩 입력.
* **************************/
function Player_Bavarian_StandSprite(evt, SpriteIndex)
{
	//--Stand Sprite
	//var Direction = 0;

	var textures = evt.textures;

	var Stand_SpriteNode = new Pig2d.node();
	var Standmodel = new Pig2d.SpriteModel({
		data :
		{
			"name" : "Bavarian_Stand0",
			"frames" :
			[
				{"sheets" : 	//0번재
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": 0, "bp_y": -200 * SpriteIndex
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//1번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200, "bp_y": -200 * SpriteIndex
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//2번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -400, "bp_y": -200 * SpriteIndex
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//3번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 3, "bp_y": -200 * SpriteIndex
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//4번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 4, "bp_y": -200 * SpriteIndex
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//5번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 5, "bp_y": -200 * SpriteIndex
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//6번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 6, "bp_y": -200 * SpriteIndex
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//7번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 7, "bp_y": -200 * SpriteIndex
					  }
					], "delay" : "100"
				},
			]
		},
		imgObj : textures['Player/Bavarian/stand/Stand.png']
	});

	Stand_SpriteNode.set({model: Standmodel});

	return Stand_SpriteNode;
}

function Player_Bavarian_WalkSprite(evt, SpriteIndex)
{
	//--Stand Sprite
	//var Direction = 0; 
	
	var textures = evt.textures;

	var Walk_SpriteNode = new Pig2d.node();
	var Walkmodel = new Pig2d.SpriteModel({
		data : 
		{
			"name" : "Bavarian_Stand0",
			"frames" : 
			[
				{"sheets" : 	//0번재
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": 0, "bp_y": -200 * SpriteIndex
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//1번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200, "bp_y": -200 * SpriteIndex
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//2번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -400, "bp_y": -200 * SpriteIndex
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//3번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 3, "bp_y": -200 * SpriteIndex
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//4번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 4, "bp_y": -200 * SpriteIndex
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//5번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 5, "bp_y": -200 * SpriteIndex
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//6번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 6, "bp_y": -200 * SpriteIndex
					  } 
					], "delay" : "100" 
				},
				{"sheets" : 	//7번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 7, "bp_y": -200 * SpriteIndex
					  } 
					], "delay" : "100" 
				},
			]
		},
		imgObj : textures['Player/Bavarian/walk/Walk.png']
	});	

	Walk_SpriteNode.set({model: Walkmodel});

	return Walk_SpriteNode;	
}
