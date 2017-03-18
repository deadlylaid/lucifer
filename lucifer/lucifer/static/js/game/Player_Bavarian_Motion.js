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
		imgObj : textures['stand/Stand.png']
	});

	Stand_SpriteNode.set({model: Standmodel});

	return Stand_SpriteNode;
}

/*
var Stand_SpriteNode1 = new Pig2d.node();
	var Standmodel_1 = new Pig2d.SpriteModel({
		data :
		{
			"name" : "Bavarian_Stand1",
			"frames" :
			[
				{"sheets" : 	//0번재
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": 0, "bp_y": -200
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//1번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200, "bp_y": -200
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//2번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -400, "bp_y": -200
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//3번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 3, "bp_y": -200
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//4번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 4, "bp_y": -200
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//5번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 5, "bp_y": -200
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//6번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 6, "bp_y": -200
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//7번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 7, "bp_y": -200
					  }
					], "delay" : "100"
				},
			]
		},
		imgObj : textures['stand/Stand1.png']
	});

	var Stand_SpriteNode2 = new Pig2d.node();
	var Standmodel_2 = new Pig2d.SpriteModel({
		data :
		{
			"name" : "Bavarian_Stand2",
			"frames" :
			[
				{"sheets" : 	//0번재
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": 0, "bp_y": -400
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//1번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200, "bp_y": -400
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//2번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -400, "bp_y": -400
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//3번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 3, "bp_y": -400
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//4번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 4, "bp_y": -400
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//5번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 5, "bp_y": -400
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//6번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 6, "bp_y": -400
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//7번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 7, "bp_y": -400
					  }
					], "delay" : "100"
				},
			]
		},
		imgObj : textures['stand/Stand2.png']
	});

	var Stand_SpriteNode3 = new Pig2d.node();
	var Standmodel_3 = new Pig2d.SpriteModel({
		data :
		{
			"name" : "Bavarian_Stand3",
			"frames" :
			[
				{"sheets" : 	//0번재
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": 0, "bp_y": -200 * 3
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//1번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200, "bp_y": -200 * 3
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//2번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -400, "bp_y": -200 * 3
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//3번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 3, "bp_y": -200 * 3
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//4번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 4, "bp_y": -200 * 3
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//5번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 5, "bp_y": -200 * 3
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//6번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 6, "bp_y": -200 * 3
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//7번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 7, "bp_y": -200 * 3
					  }
					], "delay" : "100"
				},
			]
		},
		imgObj : textures['stand/Stand3.png']
	});

	var Stand_SpriteNode4 = new Pig2d.node();
	var Standmodel_4 = new Pig2d.SpriteModel({
		data :
		{
			"name" : "Bavarian_Stand4",
			"frames" :
			[
				{"sheets" : 	//0번재
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": 0, "bp_y": -200 * 4
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//1번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200, "bp_y": -200 * 4
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//2번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -400, "bp_y": -200 * 4
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//3번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 3, "bp_y": -200 * 4
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//4번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 4, "bp_y": -200 * 4
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//5번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 5, "bp_y": -200 * 4
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//6번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 6, "bp_y": -200 * 4
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//7번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 7, "bp_y": -200 * 4
					  }
					], "delay" : "100"
				},
			]
		},
		imgObj : textures['stand/Stand4.png']
	});

	var Stand_SpriteNode5 = new Pig2d.node();
	var Standmodel_5 = new Pig2d.SpriteModel({
		data :
		{
			"name" : "Bavarian_Stand5",
			"frames" :
			[
				{"sheets" : 	//0번재
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": 0, "bp_y": -200 * 5
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//1번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200, "bp_y": -200 * 5
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//2번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -400, "bp_y": -200 * 5
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//3번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 3, "bp_y": -200 * 5
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//4번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 4, "bp_y": -200 * 5
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//5번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 5, "bp_y": -200 * 5
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//6번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 6, "bp_y": -200 * 5
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//7번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 7, "bp_y": -200 * 5
					  }
					], "delay" : "100"
				},
			]
		},
		imgObj : textures['stand/Stand5.png']
	});

	var Stand_SpriteNode6 = new Pig2d.node();
	var Standmodel_6 = new Pig2d.SpriteModel({
		data :
		{
			"name" : "Bavarian_Stand6",
			"frames" :
			[
				{"sheets" : 	//0번재
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": 0, "bp_y": -200 * 6
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//1번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200, "bp_y": -200 * 6
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//2번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -400, "bp_y": -200 * 6
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//3번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 3, "bp_y": -200 * 6
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//4번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 4, "bp_y": -200 * 6
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//5번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 5, "bp_y": -200 * 6
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//6번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 6, "bp_y": -200 * 6
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//7번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 7, "bp_y": -200 * 6
					  }
					], "delay" : "100"
				},
			]
		},
		imgObj : textures['stand/Stand6.png']
	});

	var Stand_SpriteNode7 = new Pig2d.node();
	var Standmodel_7 = new Pig2d.SpriteModel({
		data :
		{
			"name" : "Bavarian_Stand7",
			"frames" :
			[
				{"sheets" : 	//0번재
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": 0, "bp_y": -200 * 7
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//1번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200, "bp_y": -200 * 7
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//2번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -400, "bp_y": -200 * 7
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//3번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 3, "bp_y": -200 * 7
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//4번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 4, "bp_y": -200 * 7
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//5번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 5, "bp_y": -200 * 7
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//6번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 6, "bp_y": -200 * 7
					  }
					], "delay" : "100"
				},
				{"sheets" : 	//7번째
					[
					  {
						"width": 200, "height": 200,
					    "centerOffset" : {"x" : -100, "y" : -100},
					    "bp_x": -200 * 7, "bp_y": -200 * 7
					  }
					], "delay" : "100"
				},
			]
		},
		imgObj : textures['stand/Stand7.png']
	});
*/
