var Stage3_Map, Stage3, Stage3_ObjLayer;	//Stage 이미지 변수								
var Stage3_ObjectGroup;						//Stage2 - Object 관련 변수.
var stage3_Collision_Layer;
var Stage3_ObjectPool = [];
var Stage3_Portal_back, Portal_Rect2, Portal_Check2;
var BackStageMove=1;


var PolygonArray3 = ['STAGE3_Object_bridge01', 'STAGE3_Object_bridge02', 'STAGE3_Object_flag01',
					'STAGE3_Object_flag02', 'STAGE3_Object_flag03', 'STAGE3_Object_flag04',
					'STAGE3_Object_flag05', 'STAGE3_Object_flag06', 'STAGE3_Object_wall01',
					'STAGE3_Object_wall02', 'STAGE3_Object_wall03', 'STAGE3_Object_wall04',
					'STAGE3_Object_wall05', 'STAGE3_Object_wall06', 'STAGE3_Object_wall07',
					'STAGE2_Object_Tree9', 'STAGE2_Object_Tree10', 'STAGE2_Object_Tree11',
					'STAGE3_Object_wall08', 'STAGE3_Object_wall09', 'STAGE3_Object_wall10',
					'STAGE3_Object_Obj01', 'STAGE3_Object_Obj05', 'STAGE3_Object_Obj02',
					'STAGE3_Object_Obj06', 'STAGE3_Object_Obj07', 'STAGE3_Object_Obj03',
					'STAGE3_Object_Obj04'];

var objectValueArray3 = [];

function stageThree_Preload()
{
	Lucifer_Game.load.tilemap('MAP_Stage3', '../../static/images/game/Map/stage4/Stage3.json',
							   null, Phaser.Tilemap.TILED_JSON);
	Lucifer_Game.load.image('Stage4_TileSet', '../../static/images/game/Map/stage4/Stage4_TileSet.png');
	Lucifer_Game.load.image('Collision_Tile', '../../static/images/game/Map/Collision_Tile.png');
	Lucifer_Game.load.image('Stage3_obj_struct', '../../static/images/game/Object/Stage3/Stage3_obj_struct.png');
	
	//Object flag
	Lucifer_Game.load.image('STAGE3_Object_flag01', '../../static/images/game/Object/Stage3/Stage3_obj_flag1.png');
	Lucifer_Game.load.image('STAGE3_Object_flag02', '../../static/images/game/Object/Stage3/Stage3_obj_flag2.png');
	Lucifer_Game.load.image('STAGE3_Object_flag03', '../../static/images/game/Object/Stage3/Stage3_obj_flag3.png');
	Lucifer_Game.load.image('STAGE3_Object_flag04', '../../static/images/game/Object/Stage3/Stage3_obj_flag4.png');
	Lucifer_Game.load.image('STAGE3_Object_flag05', '../../static/images/game/Object/Stage3/Stage3_obj_flag5.png');
	Lucifer_Game.load.image('STAGE3_Object_flag06', '../../static/images/game/Object/Stage3/Stage3_obj_flag6.png');

	//Object bridge
	Lucifer_Game.load.image('STAGE3_Object_bridge01', '../../static/images/game/Object/Stage3/Stage3_obj_bridge1.png');
	Lucifer_Game.load.image('STAGE3_Object_bridge02', '../../static/images/game/Object/Stage3/Stage3_obj_bridge2.png');

	//Object wall
	Lucifer_Game.load.image('STAGE3_Object_wall01', '../../static/images/game/Object/Stage3/Stage3_obj_wall1.png');
	Lucifer_Game.load.image('STAGE3_Object_wall02', '../../static/images/game/Object/Stage3/Stage3_obj_wall2.png');
	Lucifer_Game.load.image('STAGE3_Object_wall03', '../../static/images/game/Object/Stage3/Stage3_obj_wall3.png');
	Lucifer_Game.load.image('STAGE3_Object_wall04', '../../static/images/game/Object/Stage3/Stage3_obj_wall4.png');
	Lucifer_Game.load.image('STAGE3_Object_wall05', '../../static/images/game/Object/Stage3/Stage3_obj_wall5.png');
	Lucifer_Game.load.image('STAGE3_Object_wall06', '../../static/images/game/Object/Stage3/Stage3_obj_wall6.png');
	Lucifer_Game.load.image('STAGE3_Object_wall07', '../../static/images/game/Object/Stage3/Stage3_obj_wall7.png');
	Lucifer_Game.load.image('STAGE3_Object_wall08', '../../static/images/game/Object/Stage3/Stage3_obj_wall8.png');
	Lucifer_Game.load.image('STAGE3_Object_wall09', '../../static/images/game/Object/Stage3/Stage3_obj_wall9.png');
	Lucifer_Game.load.image('STAGE3_Object_wall10', '../../static/images/game/Object/Stage3/Stage3_obj_wall10.png');

	//Object
	Lucifer_Game.load.image('STAGE3_Object_Obj01', '../../static/images/game/Object/Stage3/struct11.png');
	Lucifer_Game.load.image('STAGE3_Object_Obj02', '../../static/images/game/Object/Stage3/struct16.png');
	Lucifer_Game.load.image('STAGE3_Object_Obj03', '../../static/images/game/Object/Stage3/struct30.png');
	Lucifer_Game.load.image('STAGE3_Object_Obj04', '../../static/images/game/Object/Stage3/struct48.png');
	Lucifer_Game.load.image('STAGE3_Object_Obj05', '../../static/images/game/Object/Stage3/struct12.png');
	Lucifer_Game.load.image('STAGE3_Object_Obj06', '../../static/images/game/Object/Stage3/struct27.png');
	Lucifer_Game.load.image('STAGE3_Object_Obj07', '../../static/images/game/Object/Stage3/struct28.png');

	//Portal
	//----------------------------------------------------------------------------------------------------------------
	Lucifer_Game.load.spritesheet('Stage3_Portal', '../../static/images/game/Object/Portal/Portal.png', 115, 154);
	Lucifer_Game.load.spritesheet('Stage3_Portal_back', '../../static/images/game/Object/Portal/Portal2.png', 115, 154);

	Lucifer_Game.load.physics('Physics_polygon4', '../../static/js/game/Map/Physics_polygon4.json');
	
	//----------------------------------------------------------------------------------------------------------------
}

function stageThree_Create()
{
	/* Stage Create Example */

	//Stage3 -> Stage2 Portal move 
	//---------------------------------------------------------------------------------------
	if(BackStageMove == 0){
		objectValueArray3=[];
	}
	//---------------------------------------------------------------------------------------

	//Map 
	//---------------------------------------------------------------------------------------
	Stage3_Map = Lucifer_Game.add.tilemap('MAP_Stage3');		
	Stage3_Map.addTilesetImage('Stage4_TileSet', 'Stage4_TileSet');
	Stage3_Map.addTilesetImage('Collision_Tile', 'Collision_Tile');
	Stage3_Map.addTilesetImage('Stage3_obj_struct', 'Stage3_obj_struct');

	Stage3 = Stage3_Map.createLayer('Tile Layer 1');
	Stage3_ObjLayer = Stage3_Map.createLayer('Object Layer');
	stage3_Collision_Layer = Stage3_Map.createLayer('Collision Layer');
	stage3_Collision_Layer.visible = false;

	Stage3.resizeWorld();
	//---------------------------------------------------------------------------------------

	//Object
	//---------------------------------------------------------------------------------------
	
	Lucifer_Game.physics.startSystem(Phaser.Physics.P2JS);

	Stage3_ObjectGroup = Lucifer_Game.add.group();
	Stage3_ObjectGroup = Lucifer_Game.add.physicsGroup(Phaser.Physics.P2JS);

	/*//임의로 폴리곤 충돌 테스트(최영준)
	//*************************************************************************
	var Temp = Lucifer_Game.add.sprite(3782, 1666, 'STAGE2_Object_stone01');
	Lucifer_Game.physics.p2.enable(Temp, true);
	Temp.body.clearShapes();
	Temp.body.loadPolygon('STAGE2_Object_stone01Data', 'struct0');
	Temp.body.static = true;
	//*************************************************************************
	*/
	Stage3_ObjectGroup.create(1064, 2319, 'STAGE3_Object_flag02');
	Stage3_ObjectGroup.create(1757, 1884, 'STAGE3_Object_flag04');
	Stage3_ObjectGroup.create(1236, 1635, 'STAGE3_Object_flag04');
	Stage3_ObjectGroup.create(245, 1104, 'STAGE3_Object_wall03');
	Stage3_ObjectGroup.create(2811, 2123, 'STAGE3_Object_Obj03');
	Stage3_ObjectGroup.create(2734, 2115, 'STAGE3_Object_Obj03');
	Stage3_ObjectGroup.create(2610, 2240, 'STAGE3_Object_Obj01');
	Stage3_ObjectGroup.create(529, 1509, 'STAGE3_Object_Obj02');
	Stage3_ObjectGroup.create(486, 1189, 'STAGE3_Object_Obj03');
	Stage3_ObjectGroup.create(3109, 604, 'STAGE3_Object_wall05');
	Stage3_ObjectGroup.create(2725, 560, 'STAGE3_Object_bridge01');
	Stage3_ObjectGroup.create(3292, 875, 'STAGE3_Object_bridge01');
	Stage3_ObjectGroup.create(1971, 303, 'STAGE3_Object_Obj01');
	Stage3_ObjectGroup.create(2160, 319, 'STAGE3_Object_Obj03');
	Stage3_ObjectGroup.create(3612, 1988, 'STAGE3_Object_Obj04');
	Stage3_ObjectGroup.create(4572, 1488, 'STAGE3_Object_flag04');
	Stage3_ObjectGroup.create(3715, 1976, 'STAGE3_Object_Obj02');
	Stage3_ObjectGroup.create(2737, 2439, 'STAGE3_Object_Obj05');
	Stage3_ObjectGroup.create(251, 1945, 'STAGE3_Object_Obj06');
	Stage3_ObjectGroup.create(435, 1974, 'STAGE3_Object_Obj07');
	Stage3_ObjectGroup.create(2445, 2144, 'STAGE3_Object_Obj01');
	Stage3_ObjectGroup.create(2188, 2649, 'STAGE3_Object_wall04');
	Stage3_ObjectGroup.create(1683, 2730, 'STAGE3_Object_Obj02');
	Stage3_ObjectGroup.create(1624, 2692, 'STAGE3_Object_Obj02');
	Stage3_ObjectGroup.create(1538, 2746, 'STAGE3_Object_Obj02');
	Stage3_ObjectGroup.create(707, 2062, 'STAGE3_Object_flag02');


	
	//---------------------------------------------------------------------------------------

	
	for(var i = 0; i < Stage3_ObjectGroup.length; ++i)
	{	
		var Stage3_Object = Stage3_ObjectGroup.getChildAt(i);
		var Object_Rect = new Phaser.Rectangle(Stage3_Object.x, Stage3_Object.y, 100, 100);
		Stage3_ObjectPool.push(Object_Rect);

		Stage3_ObjectGroup.getChildAt(i).body.static = true;
		objectValueArray3.push(Stage3_ObjectGroup.getChildAt(i).key);		
	}		


	//Polygon
	//---------------------------------------------------------------------------------------


	for(var a = 0; a < Stage3_ObjectGroup.length; a++){
		for(var i = 0; i < PolygonArray3.length; i++)
		{
			if(objectValueArray3[a] == PolygonArray3[i])
			{	
				Stage3_ObjectGroup.getChildAt(a).body.clearShapes();
				Stage3_ObjectGroup.getChildAt(a).body.loadPolygon('Physics_polygon4', PolygonArray3[i]);
				Stage3_ObjectGroup.getChildAt(a).body.debug = false;
			}
			else
			{
				continue;
			}
		}		
	}	

	//---------------------------------------------------------------------------------------

	//Portal

	//Portal_Back
	//---------------------------------------------------------------------------------------
	Stage3_Portal_back = Lucifer_Game.add.sprite(689, 2346, 'Stage3_Portal_back');
	Lucifer_Game.physics.p2.enable(Stage3_Portal_back);
	Stage3_Portal_back.anchor.setTo(0.5, 0.5);
	Stage3_Portal_back.body.clearShapes();
	Stage3_Portal_back.body.debug = true;
	Stage3_Portal_back.body.static = true;
	Stage3_Portal_back.blendMode = Phaser.blendModes.ADD;

	//Animation
	Stage3_Portal_back.animations.add('Portal_Sprite', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
								 60, true);
	Stage3_Portal_back.animations.play('Portal_Sprite', 10, true);

	//Aracade Physics Setting
	Lucifer_Game.physics.enable(Stage3_Portal_back, Phaser.Physics.ARCADE);

	//Portal_Rect
	Portal_Rect2 = new Phaser.Rectangle(Stage3_Portal_back.x, Stage3_Portal_back.y, 100, 100);
	Portal_Check2 = false;	
	//---------------------------------------------------------------------------------------
	

	Stage3_Map.setCollision(273, true, "Collision Layer");
	Lucifer_Game.physics.p2.convertTilemap(Stage3_Map, "Collision Layer");
}

function portal_Check2()
{
	if(Phaser.Rectangle.intersects(Portal_Rect2, Hit_Rect))
	{
		Portal_Check2 = true;
	}
};

