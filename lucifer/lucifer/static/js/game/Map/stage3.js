var Stage3_Map, Stage3, Stage3_ObjLayer;	//Stage 이미지 변수								
var Stage3_ObjectGroup;						//Stage2 - Object 관련 변수.

function stageThree_Preload()
{
	Lucifer_Game.load.tilemap('MAP_Stage3', '../../static/images/game/Map/stage4/Stage3.json',
							   null, Phaser.Tilemap.TILED_JSON);
	Lucifer_Game.load.image('Stage3_TileSet', '../../static/images/game/Map/stage4/Stage4_TileSet.png');
	Lucifer_Game.load.image('Collision_Tile', '../../static/images/game/Map/Collision_Tile.png');
	Lucifer_Game.load.image('Stage3_obj_struct', '../../static/images/game/Object/Stage3/Stage3_obj_struct.png');
	
	//Object Tree
	//Lucifer_Game.load.image('STAGE3_Object_Tree', '../../static/images/game/Object/Stage3/Stage3_obj_flag2.png');
	
	//----------------------------------------------------------------------------------------------------------------
	
	
	
}

function stageThree_Create()
{
	/* Stage Create Example */

	//Map 
	//---------------------------------------------------------------------------------------
	Stage3_Map = Lucifer_Game.add.tilemap('MAP_Stage3');		
	Stage3_Map.addTilesetImage('Stage3_TileSet', 'Stage3_TileSet');
	Stage3_Map.addTilesetImage('Collision_Tile', 'Collision_Tile');
	Stage3_Map.addTilesetImage('Stage3_obj_struct', 'Stage3_obj_struct');

	Stage3 = Stage3_Map.createLayer('Tile Layer 1');
	Stage3_ObjLayer = Stage3_Map.createLayer('Object Layer');
	Collision_Layer = Stage3_Map.createLayer('Collision Layer');
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
	//Stage3_ObjectGroup.create(152, 1235, 'STAGE3_Object_Tree');
	
	//---------------------------------------------------------------------------------------

	for(var i = 0; i < Stage3_ObjectGroup.length; ++i)
	{
		Stage3_ObjectGroup.getChildAt(i).body.static = true;
	}		
	
	//---------------------------------------------------------------------------------------

	Stage3_Map.setCollision(267, true, "Collision Layer");
	Lucifer_Game.physics.p2.convertTilemap(Stage3_Map, "Collision Layer");
}