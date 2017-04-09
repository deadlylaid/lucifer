var Stage3_Map, Stage3, Stage3_ObjLayer;	//Stage 이미지 변수								
var Stage3_ObjectGroup;						//Stage2 - Object 관련 변수.
var stage3_Collision_Layer;

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
	
	//----------------------------------------------------------------------------------------------------------------
}

function stageThree_Create()
{
	/* Stage Create Example */

	//Map 
	//---------------------------------------------------------------------------------------
	Stage3_Map = Lucifer_Game.add.tilemap('MAP_Stage3');		
	Stage3_Map.addTilesetImage('Stage4_TileSet', 'Stage4_TileSet');
	Stage3_Map.addTilesetImage('Collision_Tile', 'Collision_Tile');
	Stage3_Map.addTilesetImage('Stage3_obj_struct', 'Stage3_obj_struct');

	Stage3 = Stage3_Map.createLayer('Tile Layer 1');
	Stage3_ObjLayer = Stage3_Map.createLayer('Object Layer');
	stage3_Collision_Layer = Stage3_Map.createLayer('Collision Layer');

	Stage3.resizeWorld();
	//---------------------------------------------------------------------------------------

	//Object
	//---------------------------------------------------------------------------------------
	
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
		Stage3_ObjectGroup.getChildAt(i).body.static = true;
	}		
	
	//---------------------------------------------------------------------------------------

	Stage3_Map.setCollision(267, true, "Collision Layer");
	Lucifer_Game.physics.p2.convertTilemap(Stage3_Map, "Collision Layer");
}