var Stage2, Stage2_ObjLayer;				//Stage 이미지 변수								
var Stage2_ObjectGroup;						//Stage2 - Object 관련 변수.

function stageTwo_Preload()
{
	Lucifer_Game.load.tilemap('MAP_Stage2', '../../static/images/game/Map/Stage2/Stage2.json',
							   null, Phaser.Tilemap.TILED_JSON);
	Lucifer_Game.load.image('Stage2_TileSet', '../../static/images/game/Map/Stage2/Stage2_TileSet.png');
	Lucifer_Game.load.image('Collision_Tile', '../../static/images/game/Map/Collision_Tile.png');
	Lucifer_Game.load.image('stage2_obj_tree', '../../static/images/game/Object/Stage2/stage2_obj_tree.png');
	Lucifer_Game.load.image('stage2_obj_struct', '../../static/images/game/Object/Stage2/stage2_obj_struct.png');

	//Object
	//----------------------------------------------------------------------------------------------------------------
	Lucifer_Game.load.image('STAGE2_Object_Tree', '../../static/images/game/Object/Stage2/struct0.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree1', '../../static/images/game/Object/Stage2/struct1.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree2', '../../static/images/game/Object/Stage2/struct2.png');
	
	//0 : 수레 / 1 : 기타 / 7 : 상점 / 8 : 큰 수레 / 9 : 건물
	
	Lucifer_Game.load.image('STAGE2_Object_0', '../../static/images/game/Object/Stage2/struct3.png');
	Lucifer_Game.load.image('STAGE2_Object_1', '../../static/images/game/Object/Stage2/struct4.png');
	Lucifer_Game.load.image('STAGE2_Object_2', '../../static/images/game/Object/Stage2/struct5.png');
	Lucifer_Game.load.image('STAGE2_Object_3', '../../static/images/game/Object/Stage2/struct6.png');
	Lucifer_Game.load.image('STAGE2_Object_4', '../../static/images/game/Object/Stage2/struct7.png');
	Lucifer_Game.load.image('STAGE2_Object_5', '../../static/images/game/Object/Stage2/struct8.png');
	Lucifer_Game.load.image('STAGE2_Object_6', '../../static/images/game/Object/Stage2/struct9.png');	
	Lucifer_Game.load.image('STAGE2_Object_7', '../../static/images/game/Object/Stage2/struct10.png');	
	Lucifer_Game.load.image('STAGE2_Object_8', '../../static/images/game/Object/Stage2/struct11.png');
	Lucifer_Game.load.image('STAGE2_Object_9', '../../static/images/game/Object/Stage2/struct12.png');
	Lucifer_Game.load.image('bossroom', '../../static/images/game/Object/Stage2/bossroom.png');
	Lucifer_Game.load.image('bossroom2', '../../static/images/game/Object/Stage2/bossroom2.png');
	
	//----------------------------------------------------------------------------------------------------------------
}

function stageTwo_Create()
{
	/* Stage Create Example */

	//Map 
	//---------------------------------------------------------------------------------------
	Background_map = Lucifer_Game.add.tilemap('MAP_Stage2');		
	Background_map.addTilesetImage('Stage2_TileSet', 'Stage2_TileSet');
	Background_map.addTilesetImage('Collision_Tile', 'Collision_Tile');
	Background_map.addTilesetImage('stage2_obj_tree', 'stage2_obj_tree');
	Background_map.addTilesetImage('stage2_obj_struct', 'stage2_obj_struct');
	Background_map.addTilesetImage('bossroom', 'bossroom');
	Background_map.addTilesetImage('bossroom2', 'bossroom2');

	Stage2 = Background_map.createLayer('Tile Layer 1');
	Stage2_ObjLayer = Background_map.createLayer('Object Layer');
	Collision_Layer = Background_map.createLayer('Collision Layer');
	Stage2.resizeWorld();
	//---------------------------------------------------------------------------------------

	//Object
	//---------------------------------------------------------------------------------------
	
	Stage2_ObjectGroup = Lucifer_Game.add.group();
	Stage2_ObjectGroup = Lucifer_Game.add.physicsGroup(Phaser.Physics.P2JS);

	Stage2_ObjectGroup.create(3287, 1491, 'STAGE2_Object_0');	
	Stage2_ObjectGroup.create(3287, 1570, 'STAGE2_Object_1');
	Stage2_ObjectGroup.create(4392, 1049, 'STAGE2_Object_7');
	Stage2_ObjectGroup.create(4017, 995, 'STAGE2_Object_8');	
	Stage2_ObjectGroup.create(3364, 968, 'STAGE2_Object_9');	

	Stage2_ObjectGroup.create(3540, 857, 'STAGE2_Object_2');
	Stage2_ObjectGroup.create(3285, 855, 'STAGE2_Object_3');

	Stage2_ObjectGroup.create(4752, 769, 'STAGE2_Object_Tree1');
	Stage2_ObjectGroup.create(4887, 849, 'STAGE2_Object_Tree1');	
	Stage2_ObjectGroup.create(4593, 691, 'STAGE2_Object_Tree1');
	Stage2_ObjectGroup.create(4432, 615, 'STAGE2_Object_Tree1');	

	for(var i = 0; i < Stage2_ObjectGroup.length; ++i)
	{
		Stage2_ObjectGroup.getChildAt(i).body.static = true;
	}		
	
	//---------------------------------------------------------------------------------------

	Background_map.setCollision(16, true, "Collision Layer");
	Lucifer_Game.physics.p2.convertTilemap(Background_map, "Collision Layer");
}