var Background_map, Stage1, Stage1_Wall_Layer;		//Stage 이미지 변수								
var Collision_Layer;								//Collision Layer
var Stage1_ObjectGroup;								//Stage1 - Object 관련 변수.

function stageOne_Preload()
{
	Lucifer_Game.load.tilemap('MAP_Stage1', '../../static/images/game/Map/Stage1/Stage1.json',
							   null, Phaser.Tilemap.TILED_JSON);
	Lucifer_Game.load.image('Stage1_TileSet', '../../static/images/game/Map/Stage1/Stage1_TileSet.png');
	Lucifer_Game.load.image('Collision_Tile', '../../static/images/game/Map/Collision_Tile.png');

	//Object
	//----------------------------------------------------------------------------------------------------------------
	Lucifer_Game.load.image('STAGE1_Object_Tree', '../../static/images/game/Object/Stage1/Object_Tree.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree1', '../../static/images/game/Object/Stage1/Object_Tree1.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree2', '../../static/images/game/Object/Stage1/Object_Tree2.png');
	
	//0 : 수레 / 1 : 기타 / 7 : 상점 / 8 : 큰 수레 / 9 : 건물
	Lucifer_Game.load.image('STAGE1_Object_0', '../../static/images/game/Object/Stage1/Object0.png');
	Lucifer_Game.load.image('STAGE1_Object_1', '../../static/images/game/Object/Stage1/Object1.png');
	Lucifer_Game.load.image('STAGE1_Object_2', '../../static/images/game/Object/Stage1/Object2.png');
	Lucifer_Game.load.image('STAGE1_Object_3', '../../static/images/game/Object/Stage1/Object3.png');
	Lucifer_Game.load.image('STAGE1_Object_4', '../../static/images/game/Object/Stage1/Object4.png');
	Lucifer_Game.load.image('STAGE1_Object_5', '../../static/images/game/Object/Stage1/Object5.png');
	Lucifer_Game.load.image('STAGE1_Object_6', '../../static/images/game/Object/Stage1/Object6.png');	
	Lucifer_Game.load.image('STAGE1_Object_7', '../../static/images/game/Object/Stage1/Object7.png');	
	Lucifer_Game.load.image('STAGE1_Object_8', '../../static/images/game/Object/Stage1/Object8.png');
	Lucifer_Game.load.image('STAGE1_Object_9', '../../static/images/game/Object/Stage1/Object9.png');
	Lucifer_Game.load.image('Object_WallTileSet', '../../static/images/game/Object/Stage1/Object_WallTileSet.png');
	Lucifer_Game.load.image('Object_Tree2_TileSet', '../../static/images/game/Object/Stage1/Object_Tree2_TileSet.png');
	//----------------------------------------------------------------------------------------------------------------
}

function stageOne_Create()
{
	//Map 
	//---------------------------------------------------------------------------------------
	Background_map = Lucifer_Game.add.tilemap('MAP_Stage1');		
	Background_map.addTilesetImage('Stage1_TileSet', 'Stage1_TileSet');
	Background_map.addTilesetImage('Collision_Tile', 'Collision_Tile');
	Background_map.addTilesetImage('Object_WallTileSet', 'Object_WallTileSet');
	Background_map.addTilesetImage('Object_Tree2_TileSet', 'Object_Tree2_TileSet');

	Stage1 = Background_map.createLayer('Tile Layer 1');
	Stage1_Wall_Layer = Background_map.createLayer('Object Layer');
	Collision_Layer = Background_map.createLayer('Collision Layer');
	Stage1.resizeWorld();
	//---------------------------------------------------------------------------------------

	//Object
	//---------------------------------------------------------------------------------------
	Stage1_ObjectGroup = Lucifer_Game.add.group();
	Stage1_ObjectGroup = Lucifer_Game.add.physicsGroup(Phaser.Physics.P2JS);

	Stage1_ObjectGroup.create(3287, 1491, 'STAGE1_Object_0');	
	Stage1_ObjectGroup.create(3287, 1570, 'STAGE1_Object_1');
	Stage1_ObjectGroup.create(4392, 1049, 'STAGE1_Object_7');
	Stage1_ObjectGroup.create(4017, 995, 'STAGE1_Object_8');	
	Stage1_ObjectGroup.create(3364, 968, 'STAGE1_Object_9');	

	Stage1_ObjectGroup.create(3540, 857, 'STAGE1_Object_2');
	Stage1_ObjectGroup.create(3285, 855, 'STAGE1_Object_3');

	Stage1_ObjectGroup.create(4752, 769, 'STAGE1_Object_Tree1');
	Stage1_ObjectGroup.create(4887, 849, 'STAGE1_Object_Tree1');	
	Stage1_ObjectGroup.create(4593, 691, 'STAGE1_Object_Tree1');
	Stage1_ObjectGroup.create(4432, 615, 'STAGE1_Object_Tree1');	

	for(var i = 0; i < Stage1_ObjectGroup.length; ++i)
	{
		Stage1_ObjectGroup.getChildAt(i).body.static = true;
	}		
	//---------------------------------------------------------------------------------------

	Background_map.setCollision(21, true, "Collision Layer");
	Lucifer_Game.physics.p2.convertTilemap(Background_map, "Collision Layer");	
}

