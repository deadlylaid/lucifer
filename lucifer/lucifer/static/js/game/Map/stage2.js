var Stage2_Map, Stage2, Stage2_ObjLayer;	//Stage 이미지 변수								
var Stage2_ObjectGroup;						//Stage2 - Object 관련 변수.
var Stage2_ObjectPool = [];
var CameraRect;
var Stage2_Portal, Portal_Rect, Portal_Check;
var Stage2_Portal_back, Portal_Rect2, Portal_Check2;
var BackStageMove=1;

var PolygonArray2 = ['STAGE2_Object_stone01', 'STAGE2_Object_truck1', 'STAGE2_Object_stone2',
					'STAGE2_Object_wall1', 'STAGE2_Object_stone3', 'STAGE2_Object_wall2',
					'STAGE2_Object_Tree', 'STAGE2_Object_Tree1', 'STAGE2_Object_Tree2',
					'STAGE2_Object_Tree3', 'STAGE2_Object_Tree4', 'STAGE2_Object_Tree5',
					'STAGE2_Object_Tree6', 'STAGE2_Object_Tree7', 'STAGE2_Object_Tree8',
					'STAGE2_Object_Tree9', 'STAGE2_Object_Tree10', 'STAGE2_Object_Tree11',
					'STAGE2_Object_Tree12', 'STAGE2_Object_stone4', 'STAGE2_Object_stone5',
					'STAGE2_Object_Tree13', 'STAGE2_Object_Tree14', 'STAGE2_Object_Tree15',
					'STAGE2_Object_stone6', 'STAGE2_Object_truck2', 'STAGE2_Object_truck3',
					'STAGE2_Object_truck4', 'STAGE2_Object_stone7', 'STAGE2_Object_truck5',
					'STAGE2_Object_truck6', 'STAGE2_Object_truck7', 'STAGE2_Object_stone8',
					'STAGE2_Object_Tree17', 'STAGE2_Object_stone9', 'STAGE2_Object_wall3',
					'STAGE2_Object_wall4', 'STAGE2_Object_stone10', 'STAGE2_Object_Tree18',
					'STAGE2_Object_wall5', 'STAGE2_Object_Tree19', 'STAGE2_Object_Tree20',
					'STAGE2_Object_truck8', 'STAGE2_Object_Tree21', 'STAGE2_Object_stone11',
					'STAGE2_Object_stone12', 'STAGE2_Object_stone13', 'STAGE2_Object_Tree22',
					'STAGE2_Object_Tree23', 'STAGE2_Object_Tree24', 'STAGE2_Object_stone14',
					'STAGE2_Object_stone15', 'STAGE2_Object_Tree25', 'STAGE2_Object_stone16',
					'STAGE2_Object_stone17', 'STAGE2_Object_stone18', 'STAGE2_Object_wall6',
					'STAGE2_Object_Tree26', 'STAGE2_Object_Tree27', 'STAGE2_Object_Tree28', 
					'STAGE2_Object_Tree29', 'STAGE2_Object_Tree30', 'STAGE2_Object_Tree31', 
					'STAGE2_Object_wall7'];

var objectValueArray2 = [];


function stageTwo_Preload()
{
	Lucifer_Game.load.tilemap('MAP_Stage2', '../../static/images/game/Map/Stage2/Stage2.json',
							   null, Phaser.Tilemap.TILED_JSON);
	Lucifer_Game.load.image('Stage2_TileSet', '../../static/images/game/Map/Stage2/Stage2_TileSet.png');
	Lucifer_Game.load.image('Collision_Tile', '../../static/images/game/Map/Collision_Tile.png');
	Lucifer_Game.load.image('stage2_obj_tree', '../../static/images/game/Object/Stage2/stage2_obj_tree.png');
	Lucifer_Game.load.image('stage2_obj_struct', '../../static/images/game/Object/Stage2/stage2_obj_struct.png');
	Lucifer_Game.load.image('bossroom2', '../../static/images/game/Map/Stage2/bossroom2.png');


	//Object Tree
	Lucifer_Game.load.image('STAGE2_Object_Tree', '../../static/images/game/Object/Stage2/struct6.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree1', '../../static/images/game/Object/Stage2/struct7.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree2', '../../static/images/game/Object/Stage2/struct8.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree3', '../../static/images/game/Object/Stage2/struct9.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree4', '../../static/images/game/Object/Stage2/struct10.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree5', '../../static/images/game/Object/Stage2/struct11.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree6', '../../static/images/game/Object/Stage2/struct12.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree7', '../../static/images/game/Object/Stage2/struct13.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree8', '../../static/images/game/Object/Stage2/struct14.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree9', '../../static/images/game/Object/Stage2/struct16.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree10', '../../static/images/game/Object/Stage2/struct17.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree11', '../../static/images/game/Object/Stage2/struct18.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree12', '../../static/images/game/Object/Stage2/struct19.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree13', '../../static/images/game/Object/Stage2/struct22.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree14', '../../static/images/game/Object/Stage2/struct23.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree15', '../../static/images/game/Object/Stage2/struct24.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree17', '../../static/images/game/Object/Stage2/struct34.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree18', '../../static/images/game/Object/Stage2/struct40.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree19', '../../static/images/game/Object/Stage2/struct42.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree20', '../../static/images/game/Object/Stage2/struct43.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree21', '../../static/images/game/Object/Stage2/struct45.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree22', '../../static/images/game/Object/Stage2/struct50.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree23', '../../static/images/game/Object/Stage2/struct51.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree24', '../../static/images/game/Object/Stage2/struct52.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree25', '../../static/images/game/Object/Stage2/struct55.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree26', '../../static/images/game/Object/Stage2/struct60.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree27', '../../static/images/game/Object/Stage2/struct61.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree28', '../../static/images/game/Object/Stage2/struct62.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree29', '../../static/images/game/Object/Stage2/struct63.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree30', '../../static/images/game/Object/Stage2/struct64.png');
	Lucifer_Game.load.image('STAGE2_Object_Tree31', '../../static/images/game/Object/Stage2/struct65.png');
	//----------------------------------------------------------------------------------------------------------------
	
	//Object stone struct

	//임의로 폴리곤 충돌 테스트(최영준)
	//*************************************************************************
	//Lucifer_Game.load.image('STAGE2_Object_stone01', '../../static/images/game/Object/Stage2/struct0.png');
	//Lucifer_Game.load.physics('STAGE2_Object_stone01Data', '../../static/images/game/Object/Stage2/struct0.json');
	//*************************************************************************

	Lucifer_Game.load.image('STAGE2_Object_stone2', '../../static/images/game/Object/Stage2/struct2.png');
	Lucifer_Game.load.image('STAGE2_Object_stone3', '../../static/images/game/Object/Stage2/struct4.png');
	Lucifer_Game.load.image('STAGE2_Object_stone4', '../../static/images/game/Object/Stage2/struct20.png');
	Lucifer_Game.load.image('STAGE2_Object_stone5', '../../static/images/game/Object/Stage2/struct21.png');
	Lucifer_Game.load.image('STAGE2_Object_stone6', '../../static/images/game/Object/Stage2/struct25.png');
	Lucifer_Game.load.image('STAGE2_Object_stone7', '../../static/images/game/Object/Stage2/struct29.png');	
	Lucifer_Game.load.image('STAGE2_Object_stone8', '../../static/images/game/Object/Stage2/struct33.png');	
	Lucifer_Game.load.image('STAGE2_Object_stone9', '../../static/images/game/Object/Stage2/struct35.png');
	Lucifer_Game.load.image('STAGE2_Object_stone10', '../../static/images/game/Object/Stage2/struct39.png');
	Lucifer_Game.load.image('STAGE2_Object_stone11', '../../static/images/game/Object/Stage2/struct46.png');
	Lucifer_Game.load.image('STAGE2_Object_stone12', '../../static/images/game/Object/Stage2/struct48.png');
	Lucifer_Game.load.image('STAGE2_Object_stone13', '../../static/images/game/Object/Stage2/struct49.png');
	Lucifer_Game.load.image('STAGE2_Object_stone14', '../../static/images/game/Object/Stage2/struct53.png');	
	Lucifer_Game.load.image('STAGE2_Object_stone15', '../../static/images/game/Object/Stage2/struct54.png');	
	Lucifer_Game.load.image('STAGE2_Object_stone16', '../../static/images/game/Object/Stage2/struct56.png');
	Lucifer_Game.load.image('STAGE2_Object_stone17', '../../static/images/game/Object/Stage2/struct57.png');
	Lucifer_Game.load.image('STAGE2_Object_stone18', '../../static/images/game/Object/Stage2/struct58.png');
	//----------------------------------------------------------------------------------------------------------------

	//Object truck
	Lucifer_Game.load.image('STAGE2_Object_truck1', '../../static/images/game/Object/Stage2/struct1.png');
	Lucifer_Game.load.image('STAGE2_Object_truck2', '../../static/images/game/Object/Stage2/struct26.png');
	Lucifer_Game.load.image('STAGE2_Object_truck3', '../../static/images/game/Object/Stage2/struct27.png');
	Lucifer_Game.load.image('STAGE2_Object_truck4', '../../static/images/game/Object/Stage2/struct28.png');
	Lucifer_Game.load.image('STAGE2_Object_truck5', '../../static/images/game/Object/Stage2/struct30.png');
	Lucifer_Game.load.image('STAGE2_Object_truck6', '../../static/images/game/Object/Stage2/struct31.png');
	Lucifer_Game.load.image('STAGE2_Object_truck7', '../../static/images/game/Object/Stage2/struct32.png');	
	Lucifer_Game.load.image('STAGE2_Object_truck8', '../../static/images/game/Object/Stage2/struct44.png');	
	//----------------------------------------------------------------------------------------------------------------

	//Object wall
	Lucifer_Game.load.image('STAGE2_Object_stone01', '../../static/images/game/Object/Stage2/struct0.png');
	Lucifer_Game.load.image('STAGE2_Object_wall1', '../../static/images/game/Object/Stage2/struct3.png');
	Lucifer_Game.load.image('STAGE2_Object_wall2', '../../static/images/game/Object/Stage2/struct5.png');
	Lucifer_Game.load.image('STAGE2_Object_wall3', '../../static/images/game/Object/Stage2/struct36.png');
	Lucifer_Game.load.image('STAGE2_Object_wall4', '../../static/images/game/Object/Stage2/struct37.png');
	Lucifer_Game.load.image('STAGE2_Object_wall5', '../../static/images/game/Object/Stage2/struct41.png');
	Lucifer_Game.load.image('STAGE2_Object_wall6', '../../static/images/game/Object/Stage2/struct59.png');
	Lucifer_Game.load.image('STAGE2_Object_wall7', '../../static/images/game/Object/Stage2/struct66.png');

	//Portal
	//----------------------------------------------------------------------------------------------------------------
	Lucifer_Game.load.spritesheet('Stage2_Portal', '../../static/images/game/Object/Portal/Portal.png', 115, 154);
	Lucifer_Game.load.spritesheet('Stage2_Portal_back', '../../static/images/game/Object/Portal/Portal2.png', 115, 154);


	Lucifer_Game.load.physics('Physics_polygon3', '../../static/js/game/Map/Physics_polygon3.json');

	//----------------------------------------------------------------------------------------------------------------

	
}

function stageTwo_Create()
{	
	for(var i = 0; i < 32; ++i)
	{
		Lucifer_Game.renderer.setTexturePriority(['STAGE2_Object_Tree' + i]);
	}

	for(var i = 2; i < 19; ++i)
	{
		Lucifer_Game.renderer.setTexturePriority(['STAGE2_Object_stone' + i]);
	}

	for(var i = 1; i < 9; ++i)
	{
		Lucifer_Game.renderer.setTexturePriority(['STAGE2_Object_truck' + i]);
	}

	for(var i = 1; i < 7; ++i)
	{
		Lucifer_Game.renderer.setTexturePriority(['STAGE2_Object_wall1' + i]);
	}

	//Stage3 -> Stage2 Portal move 
	//---------------------------------------------------------------------------------------
	if(BackStageMove == 0){
		objectValueArray2=[];
	}
	//---------------------------------------------------------------------------------------
	
	//Map 
	//---------------------------------------------------------------------------------------
	Stage2_Map = Lucifer_Game.add.tilemap('MAP_Stage2');		
	Stage2_Map.addTilesetImage('Stage2_TileSet', 'Stage2_TileSet');
	Stage2_Map.addTilesetImage('Collision_Tile', 'Collision_Tile');
	Stage2_Map.addTilesetImage('stage2_obj_tree', 'stage2_obj_tree');
	Stage2_Map.addTilesetImage('stage2_obj_struct', 'stage2_obj_struct');
	Stage2_Map.addTilesetImage('bossroom2', 'bossroom2');

	Stage2 = Stage2_Map.createLayer('Tile Layer 1');
	Stage2_ObjLayer = Stage2_Map.createLayer('Object Layer');			
	Collision_Layer = Stage2_Map.createLayer('Collision Layer');
	Collision_Layer.visible = false;
		
	Stage2.resizeWorld();	
	//---------------------------------------------------------------------------------------

	//Object
	//---------------------------------------------------------------------------------------

	Lucifer_Game.physics.startSystem(Phaser.Physics.P2JS);

	Stage2_ObjectGroup = Lucifer_Game.add.group();
	Stage2_ObjectGroup = Lucifer_Game.add.physicsGroup(Phaser.Physics.P2JS);

	//임의로 폴리곤 충돌 테스트(최영준)
	//*************************************************************************
	//var Temp = Lucifer_Game.add.sprite(3782, 1666, 'STAGE2_Object_stone01');
	//Lucifer_Game.physics.p2.enable(Temp, true);
	//Temp.body.clearShapes();
	//Temp.body.loadPolygon('STAGE2_Object_stone01Data', 'struct0');
	//Temp.body.static = true;
	//*************************************************************************
	Stage2_ObjectGroup.create(3782, 1666, 'STAGE2_Object_stone01')
	Stage2_ObjectGroup.create(3448, 4018, 'STAGE2_Object_Tree28');
	Stage2_ObjectGroup.create(4292, 4276, 'STAGE2_Object_stone7');
	Stage2_ObjectGroup.create(4635, 4695, 'STAGE2_Object_Tree29');
	Stage2_ObjectGroup.create(4635, 5010, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(5299, 4984, 'STAGE2_Object_Tree19');
	Stage2_ObjectGroup.create(5572, 5456, 'STAGE2_Object_Tree9');
	Stage2_ObjectGroup.create(4377, 4832, 'STAGE2_Object_stone15');
	Stage2_ObjectGroup.create(6255, 5482, 'STAGE2_Object_Tree20');
	Stage2_ObjectGroup.create(5887, 5653, 'STAGE2_Object_Tree19');
	Stage2_ObjectGroup.create(6824, 5115, 'STAGE2_Object_truck5');
	Stage2_ObjectGroup.create(3841, 4672, 'STAGE2_Object_Tree1');
	Stage2_ObjectGroup.create(3986, 4745, 'STAGE2_Object_Tree1');
	Stage2_ObjectGroup.create(4127, 4821, 'STAGE2_Object_Tree1');
	Stage2_ObjectGroup.create(4966, 5225, 'STAGE2_Object_stone2');
	Stage2_ObjectGroup.create(5058, 5260, 'STAGE2_Object_stone2');
	Stage2_ObjectGroup.create(5151, 5302, 'STAGE2_Object_stone2');
	Stage2_ObjectGroup.create(6077, 5637, 'STAGE2_Object_Tree');
	Stage2_ObjectGroup.create(6563, 5338, 'STAGE2_Object_truck3');
	Stage2_ObjectGroup.create(7327, 5043, 'STAGE2_Object_Tree17');
	Stage2_ObjectGroup.create(7277, 4996, 'STAGE2_Object_Tree17');
	Stage2_ObjectGroup.create(7424, 4956, 'STAGE2_Object_Tree14');
	Stage2_ObjectGroup.create(7728, 4830, 'STAGE2_Object_stone9');
	Stage2_ObjectGroup.create(7894, 4695, 'STAGE2_Object_stone10');
	Stage2_ObjectGroup.create(8089, 4203, 'STAGE2_Object_stone10');
	Stage2_ObjectGroup.create(8105, 4639, 'STAGE2_Object_Tree18');
	Stage2_ObjectGroup.create(8278, 4606, 'STAGE2_Object_Tree30');
	Stage2_ObjectGroup.create(7715, 4664, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(7616, 4715, 'STAGE2_Object_stone17');
	Stage2_ObjectGroup.create(7262, 4876, 'STAGE2_Object_Tree24');
	Stage2_ObjectGroup.create(7162, 5016, 'STAGE2_Object_Tree24');
	Stage2_ObjectGroup.create(9014, 4131, 'STAGE2_Object_Tree27');
	Stage2_ObjectGroup.create(8903, 4253, 'STAGE2_Object_Tree27');
	Stage2_ObjectGroup.create(9186, 4129, 'STAGE2_Object_Tree27');
	Stage2_ObjectGroup.create(9363, 3918, 'STAGE2_Object_wall6');
	Stage2_ObjectGroup.create(9680, 3807, 'STAGE2_Object_Tree20');
	Stage2_ObjectGroup.create(9577, 3926, 'STAGE2_Object_Tree20');
	Stage2_ObjectGroup.create(9821, 3656, 'STAGE2_Object_stone11');
	Stage2_ObjectGroup.create(9958, 3621, 'STAGE2_Object_stone11');
	Stage2_ObjectGroup.create(9631, 3341, 'STAGE2_Object_Tree');
	Stage2_ObjectGroup.create(10366, 2782, 'STAGE2_Object_Tree4');
	Stage2_ObjectGroup.create(10460, 2302, 'STAGE2_Object_Tree20');
	Stage2_ObjectGroup.create(10331, 2358, 'STAGE2_Object_Tree18');
	Stage2_ObjectGroup.create(10333, 2238, 'STAGE2_Object_Tree17');
	Stage2_ObjectGroup.create(10279, 2204, 'STAGE2_Object_Tree17');
	Stage2_ObjectGroup.create(10235, 2260, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(9731, 2047, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(9817, 2096, 'STAGE2_Object_stone17');
	Stage2_ObjectGroup.create(9660, 1945, 'STAGE2_Object_stone15');
	Stage2_ObjectGroup.create(9371, 2151, 'STAGE2_Object_stone15');
	Stage2_ObjectGroup.create(9436, 2272, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(9508, 2335, 'STAGE2_Object_stone17');
	Stage2_ObjectGroup.create(9209, 2041, 'STAGE2_Object_wall6');
	Stage2_ObjectGroup.create(9552, 1862, 'STAGE2_Object_stone16');
	Stage2_ObjectGroup.create(8820, 2898, 'STAGE2_Object_stone16');
	Stage2_ObjectGroup.create(9040, 3088, 'STAGE2_Object_stone16');
	Stage2_ObjectGroup.create(8787, 3207, 'STAGE2_Object_stone16');
	Stage2_ObjectGroup.create(8933, 3311, 'STAGE2_Object_stone6');
	Stage2_ObjectGroup.create(9006, 3284, 'STAGE2_Object_stone6');
	Stage2_ObjectGroup.create(8629, 3378, 'STAGE2_Object_stone7');
	Stage2_ObjectGroup.create(9099, 3063, 'STAGE2_Object_wall3');
	Stage2_ObjectGroup.create(8071, 1989, 'STAGE2_Object_stone12');
	Stage2_ObjectGroup.create(7598, 1669, 'STAGE2_Object_stone12');
	Stage2_ObjectGroup.create(7914, 1035, 'STAGE2_Object_stone17');
	Stage2_ObjectGroup.create(8126, 1102, 'STAGE2_Object_Tree7');
	Stage2_ObjectGroup.create(7936, 1153, 'STAGE2_Object_Tree7');
	Stage2_ObjectGroup.create(7798, 1281, 'STAGE2_Object_Tree7');
	Stage2_ObjectGroup.create(7642, 1337, 'STAGE2_Object_Tree7');
	Stage2_ObjectGroup.create(7526, 1335, 'STAGE2_Object_Tree29');
	Stage2_ObjectGroup.create(7436, 1376, 'STAGE2_Object_Tree29');
	Stage2_ObjectGroup.create(7346, 1431, 'STAGE2_Object_Tree29');
	Stage2_ObjectGroup.create(7332, 1103, 'STAGE2_Object_stone6');
	Stage2_ObjectGroup.create(7591, 887, 'STAGE2_Object_stone2');
	Stage2_ObjectGroup.create(7118, 974, 'STAGE2_Object_stone2');
	Stage2_ObjectGroup.create(7271, 719, 'STAGE2_Object_stone6');
	Stage2_ObjectGroup.create(7291, 926, 'STAGE2_Object_stone9');
	Stage2_ObjectGroup.create(6798, 1120, 'STAGE2_Object_stone11');
	Stage2_ObjectGroup.create(6680, 1173, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(6631, 1132, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(6593, 1212, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(5857, 1374, 'STAGE2_Object_stone15');
	Stage2_ObjectGroup.create(5674, 1491, 'STAGE2_Object_stone7');
	Stage2_ObjectGroup.create(5527, 1564, 'STAGE2_Object_stone7');
	Stage2_ObjectGroup.create(5365, 1640, 'STAGE2_Object_stone7');
	Stage2_ObjectGroup.create(5209, 1737, 'STAGE2_Object_stone11');
	Stage2_ObjectGroup.create(5366, 1130, 'STAGE2_Object_stone15');
	Stage2_ObjectGroup.create(5196, 1232, 'STAGE2_Object_stone7');
	Stage2_ObjectGroup.create(5038, 1320, 'STAGE2_Object_stone7');
	Stage2_ObjectGroup.create(4872, 1403, 'STAGE2_Object_stone7');
	Stage2_ObjectGroup.create(4719, 1501, 'STAGE2_Object_stone11');
	Stage2_ObjectGroup.create(5205, 709, 'STAGE2_Object_wall6');
	Stage2_ObjectGroup.create(5359, 591, 'STAGE2_Object_stone15');
	Stage2_ObjectGroup.create(5584, 542, 'STAGE2_Object_wall6');
	Stage2_ObjectGroup.create(6317, 576, 'STAGE2_Object_stone17');
	Stage2_ObjectGroup.create(6272, 621, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(6371, 616, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(6478, 468, 'STAGE2_Object_stone6');
	Stage2_ObjectGroup.create(5779, 349, 'STAGE2_Object_Tree13');
	Stage2_ObjectGroup.create(6699, 511, 'STAGE2_Object_stone7');
	Stage2_ObjectGroup.create(6860, 627, 'STAGE2_Object_stone7');
	Stage2_ObjectGroup.create(5540, 739, 'STAGE2_Object_Tree17');
	Stage2_ObjectGroup.create(5371, 936, 'STAGE2_Object_Tree27');
	Stage2_ObjectGroup.create(6276, 1355, 'STAGE2_Object_Tree28');
	Stage2_ObjectGroup.create(6412, 1231, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(6455, 1176, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(7149, 1225, 'STAGE2_Object_Tree28');
	Stage2_ObjectGroup.create(7594, 1043, 'STAGE2_Object_Tree28');
	Stage2_ObjectGroup.create(6053, 759, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(4631, 834, 'STAGE2_Object_Tree11');
	Stage2_ObjectGroup.create(4739, 897, 'STAGE2_Object_Tree2');
	Stage2_ObjectGroup.create(4519, 923, 'STAGE2_Object_Tree2');
	Stage2_ObjectGroup.create(4333, 1062, 'STAGE2_Object_Tree2');
	Stage2_ObjectGroup.create(4585, 1100, 'STAGE2_Object_Tree2');
	Stage2_ObjectGroup.create(4802, 1109, 'STAGE2_Object_Tree11');
	Stage2_ObjectGroup.create(4913, 1066, 'STAGE2_Object_Tree11');
	Stage2_ObjectGroup.create(5010, 1027, 'STAGE2_Object_Tree11');
	Stage2_ObjectGroup.create(5113, 1112, 'STAGE2_Object_Tree29');
	Stage2_ObjectGroup.create(5023, 1157, 'STAGE2_Object_Tree17');
	Stage2_ObjectGroup.create(4967, 1205, 'STAGE2_Object_Tree29');
	Stage2_ObjectGroup.create(4703, 1268, 'STAGE2_Object_Tree2');
	Stage2_ObjectGroup.create(4515, 1274, 'STAGE2_Object_Tree2');
	Stage2_ObjectGroup.create(4314, 1231, 'STAGE2_Object_Tree2');
	Stage2_ObjectGroup.create(4130, 1119, 'STAGE2_Object_Tree2');
	Stage2_ObjectGroup.create(4931, 1300, 'STAGE2_Object_Tree29');
	Stage2_ObjectGroup.create(5092, 1213, 'STAGE2_Object_Tree17');
	Stage2_ObjectGroup.create(5379, 1795, 'STAGE2_Object_Tree22');
	Stage2_ObjectGroup.create(5495, 1753, 'STAGE2_Object_Tree22');
	Stage2_ObjectGroup.create(5589, 1730, 'STAGE2_Object_Tree27');
	Stage2_ObjectGroup.create(5538, 1924, 'STAGE2_Object_Tree27');
	Stage2_ObjectGroup.create(5704, 1658, 'STAGE2_Object_stone8');
	Stage2_ObjectGroup.create(5691, 1829, 'STAGE2_Object_Tree22');
	Stage2_ObjectGroup.create(5783, 1791, 'STAGE2_Object_Tree27');
	Stage2_ObjectGroup.create(5854, 1637, 'STAGE2_Object_Tree19');
	Stage2_ObjectGroup.create(5779, 1594, 'STAGE2_Object_Tree19');
	Stage2_ObjectGroup.create(5894, 1545, 'STAGE2_Object_Tree19');
	Stage2_ObjectGroup.create(5968, 1609, 'STAGE2_Object_Tree19');
	Stage2_ObjectGroup.create(5902, 1726, 'STAGE2_Object_Tree27');
	Stage2_ObjectGroup.create(6047, 1711, 'STAGE2_Object_Tree22');
	Stage2_ObjectGroup.create(5899, 1833, 'STAGE2_Object_Tree22');
	Stage2_ObjectGroup.create(6146, 1703, 'STAGE2_Object_Tree22');
	Stage2_ObjectGroup.create(5177, 1931, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(4568, 1499, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(4080, 2090, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(4028, 2047, 'STAGE2_Object_stone17');
	Stage2_ObjectGroup.create(3971, 2146, 'STAGE2_Object_stone18');
	Stage2_ObjectGroup.create(5230, 2366, 'STAGE2_Object_Tree28');
	Stage2_ObjectGroup.create(4870, 2190, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(4649, 2687, 'STAGE2_Object_stone15');
	Stage2_ObjectGroup.create(4036, 1865, 'STAGE2_Object_Tree17');
	Stage2_ObjectGroup.create(4180, 2251, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(4520, 2813, 'STAGE2_Object_stone9');
	Stage2_ObjectGroup.create(4331, 2873, 'STAGE2_Object_stone15');
	Stage2_ObjectGroup.create(4219, 2915, 'STAGE2_Object_stone6');
	Stage2_ObjectGroup.create(4503, 3076, 'STAGE2_Object_stone8');
	Stage2_ObjectGroup.create(4294, 1465, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(3900, 1227, 'STAGE2_Object_Tree22');
	Stage2_ObjectGroup.create(3789, 1253, 'STAGE2_Object_Tree22');
	Stage2_ObjectGroup.create(3639, 1324, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(3881, 1398, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(3732, 1424, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(3645, 1419, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(3354, 1586, 'STAGE2_Object_stone16');
	Stage2_ObjectGroup.create(3439, 1509, 'STAGE2_Object_stone17');
	Stage2_ObjectGroup.create(3178, 1652, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(3282, 1817, 'STAGE2_Object_Tree28');
	Stage2_ObjectGroup.create(3065, 1743, 'STAGE2_Object_Tree28');
	Stage2_ObjectGroup.create(3129, 1883, 'STAGE2_Object_Tree3');
	Stage2_ObjectGroup.create(4083, 2361, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(5160, 2910, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(5610, 2699, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(6273, 2087, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(6330, 2071, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(6574, 1671, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(6880, 1414, 'STAGE2_Object_stone11');
	Stage2_ObjectGroup.create(6660, 1564, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(6789, 1522, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(7012, 1473, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(6550, 1575, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(8879, 1622, 'STAGE2_Object_stone16');
	Stage2_ObjectGroup.create(9079, 1606, 'STAGE2_Object_wall6');
	Stage2_ObjectGroup.create(9314, 1762, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(10640, 2387, 'STAGE2_Object_Tree29');
	Stage2_ObjectGroup.create(10547, 3455, 'STAGE2_Object_Tree28');
	Stage2_ObjectGroup.create(10055, 2999, 'STAGE2_Object_Tree17');
	Stage2_ObjectGroup.create(9978, 2935, 'STAGE2_Object_Tree17');
	Stage2_ObjectGroup.create(9104, 2595, 'STAGE2_Object_stone5');
	Stage2_ObjectGroup.create(7379, 2340, 'STAGE2_Object_Tree8');
	Stage2_ObjectGroup.create(7460, 2366, 'STAGE2_Object_Tree8');
	Stage2_ObjectGroup.create(7320, 2356, 'STAGE2_Object_Tree8');
	Stage2_ObjectGroup.create(7593, 2389, 'STAGE2_Object_Tree10');
	Stage2_ObjectGroup.create(7813, 2456, 'STAGE2_Object_Tree9');
	Stage2_ObjectGroup.create(7716, 2666, 'STAGE2_Object_Tree11');
	Stage2_ObjectGroup.create(7618, 2672, 'STAGE2_Object_Tree11');
	Stage2_ObjectGroup.create(7533, 2553, 'STAGE2_Object_Tree15');
	Stage2_ObjectGroup.create(7823, 2668, 'STAGE2_Object_Tree15');
	Stage2_ObjectGroup.create(8005, 2525, 'STAGE2_Object_Tree15');
	Stage2_ObjectGroup.create(8004, 2366, 'STAGE2_Object_Tree11');
	Stage2_ObjectGroup.create(7924, 2668, 'STAGE2_Object_Tree14');
	Stage2_ObjectGroup.create(8097, 2604, 'STAGE2_Object_Tree14');
	Stage2_ObjectGroup.create(7709, 2801, 'STAGE2_Object_Tree14');
	Stage2_ObjectGroup.create(7520, 2785, 'STAGE2_Object_Tree15');
	Stage2_ObjectGroup.create(7384, 2511, 'STAGE2_Object_Tree8');
	Stage2_ObjectGroup.create(7290, 2538, 'STAGE2_Object_Tree8');
	Stage2_ObjectGroup.create(7234, 2472, 'STAGE2_Object_Tree8');
	Stage2_ObjectGroup.create(7415, 2686, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(7370, 2671, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(7427, 2750, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(7822, 2247, 'STAGE2_Object_Tree12');
	Stage2_ObjectGroup.create(8510, 3457, 'STAGE2_Object_Tree13');
	Stage2_ObjectGroup.create(6702, 3181, 'STAGE2_Object_stone01');
	Stage2_ObjectGroup.create(7131, 2498, 'STAGE2_Object_Tree3');
	Stage2_ObjectGroup.create(6731, 2907, 'STAGE2_Object_stone3');
	Stage2_ObjectGroup.create(7061, 3174, 'STAGE2_Object_stone11');
	Stage2_ObjectGroup.create(6680, 3446, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(6375, 3223, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(6233, 2994, 'STAGE2_Object_stone8');
	Stage2_ObjectGroup.create(5523, 2660, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(5435, 3623, 'STAGE2_Object_stone17');
	Stage2_ObjectGroup.create(7537, 4316, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(7108, 4859, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(6661, 4619, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(6845, 4151, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(6256, 4454, 'STAGE2_Object_stone18');
	Stage2_ObjectGroup.create(6157, 4142, 'STAGE2_Object_stone18');
	Stage2_ObjectGroup.create(6114, 4384, 'STAGE2_Object_stone17');
	Stage2_ObjectGroup.create(6521, 4857, 'STAGE2_Object_stone13');
	Stage2_ObjectGroup.create(5936, 2284, 'STAGE2_Object_Tree17');
	Stage2_ObjectGroup.create(5535, 3693, 'STAGE2_Object_stone16');
	Stage2_ObjectGroup.create(5303, 3998, 'STAGE2_Object_Tree29');
	Stage2_ObjectGroup.create(4730, 4655, 'STAGE2_Object_Tree29');
	Stage2_ObjectGroup.create(6137, 4544, 'STAGE2_Object_stone17');
	Stage2_ObjectGroup.create(5698, 4397, 'STAGE2_Object_Tree17');
	Stage2_ObjectGroup.create(5650, 4435, 'STAGE2_Object_Tree29');
	Stage2_ObjectGroup.create(5213, 4049, 'STAGE2_Object_Tree29');
	Stage2_ObjectGroup.create(4370, 4359, 'STAGE2_Object_stone7');
	Stage2_ObjectGroup.create(3371, 3994, 'STAGE2_Object_Tree24');
	Stage2_ObjectGroup.create(2870, 4158, 'STAGE2_Object_Tree24');
	Stage2_ObjectGroup.create(2778, 4162, 'STAGE2_Object_Tree24');
	Stage2_ObjectGroup.create(2571, 4057, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(2659, 4030, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(2484, 3985, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(4466, 4394, 'STAGE2_Object_stone7');
	Stage2_ObjectGroup.create(2417, 3799, 'STAGE2_Object_stone6');
	Stage2_ObjectGroup.create(1238, 2796, 'STAGE2_Object_stone4');
	Stage2_ObjectGroup.create(1433, 2440, 'STAGE2_Object_stone4');
	Stage2_ObjectGroup.create(1909, 2818, 'STAGE2_Object_stone11');
	Stage2_ObjectGroup.create(2483, 3831, 'STAGE2_Object_stone13');
	Stage2_ObjectGroup.create(1772, 3045, 'STAGE2_Object_stone11');
	Stage2_ObjectGroup.create(1312, 3233, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(1441, 3252, 'STAGE2_Object_stone17');
	Stage2_ObjectGroup.create(1181, 3327, 'STAGE2_Object_stone15');
	Stage2_ObjectGroup.create(1928, 3214, 'STAGE2_Object_stone10');
	Stage2_ObjectGroup.create(1793, 3293, 'STAGE2_Object_stone13');
	Stage2_ObjectGroup.create(1788, 3588, 'STAGE2_Object_Tree22');
	Stage2_ObjectGroup.create(1880, 3643, 'STAGE2_Object_Tree22');
	Stage2_ObjectGroup.create(2766, 3992, 'STAGE2_Object_Tree26');
	Stage2_ObjectGroup.create(3089, 2637, 'STAGE2_Object_Tree21');
	Stage2_ObjectGroup.create(2428, 2677, 'STAGE2_Object_Tree28');
	Stage2_ObjectGroup.create(1938, 2344, 'STAGE2_Object_stone16');
	Stage2_ObjectGroup.create(2069, 2184, 'STAGE2_Object_stone16');
	Stage2_ObjectGroup.create(2653, 2273, 'STAGE2_Object_Tree28');
	Stage2_ObjectGroup.create(2732, 1923, 'STAGE2_Object_Tree2');
	Stage2_ObjectGroup.create(2915, 1779, 'STAGE2_Object_Tree6');
	Stage2_ObjectGroup.create(7817, 3938, 'STAGE2_Object_stone9');
	Stage2_ObjectGroup.create(7485, 3546, 'STAGE2_Object_stone8');
	Stage2_ObjectGroup.create(6914, 3861, 'STAGE2_Object_stone3');
	Stage2_ObjectGroup.create(3970, 3508, 'STAGE2_Object_Tree27');
	Stage2_ObjectGroup.create(3593, 3127, 'STAGE2_Object_stone14');
	Stage2_ObjectGroup.create(3247, 3391, 'STAGE2_Object_stone6');
	Stage2_ObjectGroup.create(2557, 3751, 'STAGE2_Object_stone15');
	Stage2_ObjectGroup.create(3135, 2633, 'STAGE2_Object_Tree17');
	Stage2_ObjectGroup.create(8321, 1233, 'STAGE2_Object_stone13');
	Stage2_ObjectGroup.create(8550, 3026, 'STAGE2_Object_stone15');
	Stage2_ObjectGroup.create(2635, 2943, 'STAGE2_Object_stone16');
	Stage2_ObjectGroup.create(1593, 2809, 'STAGE2_Object_stone5');
	//---------------------------------------------------------------------------------------

	for(var i = 0; i < Stage2_ObjectGroup.length; ++i)
	{	
		var Stage2_Object = Stage2_ObjectGroup.getChildAt(i);
		var Object_Rect = new Phaser.Rectangle(Stage2_Object.x, Stage2_Object.y, 100, 100);
		Stage2_ObjectPool.push(Object_Rect);

		Stage2_ObjectGroup.getChildAt(i).body.static = true;
		objectValueArray2.push(Stage2_ObjectGroup.getChildAt(i).key);		
	}		
	
	//---------------------------------------------------------------------------------------

	//Polygon
	//---------------------------------------------------------------------------------------

	for(var a = 0; a < Stage2_ObjectGroup.length; a++){
		for(var i = 0; i < PolygonArray2.length; i++)
		{
			if(objectValueArray2[a] == PolygonArray2[i])
			{	
				Stage2_ObjectGroup.getChildAt(a).body.clearShapes();
				Stage2_ObjectGroup.getChildAt(a).body.loadPolygon('Physics_polygon3', PolygonArray2[i]);
				Stage2_ObjectGroup.getChildAt(a).body.debug = false;
			}
			else
			{
				continue;
			}
		}		
	}	

	//Portal
	//---------------------------------------------------------------------------------------
	Stage2_Portal = Lucifer_Game.add.sprite(8561, 1419, 'Stage2_Portal');
	Lucifer_Game.physics.p2.enable(Stage2_Portal);
	Stage2_Portal.anchor.setTo(0.5, 0.5);
	Stage2_Portal.body.clearShapes();
	Stage2_Portal.body.debug = true;
	Stage2_Portal.body.static = true;
	Stage2_Portal.blendMode = Phaser.blendModes.ADD;

	//Animation
	Stage2_Portal.animations.add('Portal_Sprite', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
								 60, true);
	Stage2_Portal.animations.play('Portal_Sprite', 10, true);

	//Aracade Physics Setting
	Lucifer_Game.physics.enable(Stage2_Portal, Phaser.Physics.ARCADE);

	//Portal_Rect
	Portal_Rect = new Phaser.Rectangle(Stage2_Portal.x, Stage2_Portal.y, 100, 100);
	Portal_Check = false;	
	//---------------------------------------------------------------------------------------

	//Portal_Back
	//---------------------------------------------------------------------------------------
	Stage2_Portal_back = Lucifer_Game.add.sprite(3271, 4422, 'Stage2_Portal_back');
	Lucifer_Game.physics.p2.enable(Stage2_Portal_back);
	Stage2_Portal_back.anchor.setTo(0.5, 0.5);
	Stage2_Portal_back.body.clearShapes();
	Stage2_Portal_back.body.debug = true;
	Stage2_Portal_back.body.static = true;
	Stage2_Portal_back.blendMode = Phaser.blendModes.ADD;

	//Animation
	Stage2_Portal_back.animations.add('Portal_Sprite', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
								 60, true);
	Stage2_Portal_back.animations.play('Portal_Sprite', 10, true);

	//Aracade Physics Setting
	Lucifer_Game.physics.enable(Stage2_Portal_back, Phaser.Physics.ARCADE);

	//Portal_Rect
	Portal_Rect2 = new Phaser.Rectangle(Stage2_Portal_back.x, Stage2_Portal_back.y, 100, 100);
	Portal_Check2 = false;	
	//---------------------------------------------------------------------------------------
	
	//---------------------------------------------------------------------------------------

	Stage2_Map.setCollision(21, true, "Collision Layer");
	Lucifer_Game.physics.p2.convertTilemap(Stage2_Map, "Collision Layer");		
}

function stage2_Culling()
{
	//var CameraRect;
	//Lucifer_Game.camera.x = Player.x;
	//Lucifer_Game.camera.y = Player.y;

	CameraRect = Lucifer_Game.camera.bounds;
	CameraRect.setTo(Player.x, Player.y, 1280, 800);
	CameraRect.offset(-640, -400);
	CameraRect.x = Player.x;
	CameraRect.y = Player.y;
	CameraRect.centerOn(Player.x, Player.y);

	for(var i = 0 ; i < Stage2_ObjectGroup.length; ++i)
	{
		var Object = Stage2_ObjectGroup.getChildAt(i);

		var Object_Rect;
		for(var j = 0;  j < Stage2_ObjectPool.length; ++j)
		{
			Object_Rect = Stage2_ObjectPool[j];

			if(Lucifer_Game.camera.bounds.containsRect(Object_Rect, CameraRect)
			   /*CameraRect.containsRect(Object_Rect, CameraRect)*/)
			{
				if(Object.alive == false)
				{
					Object.revive();	
				}				
			}
			else
			{
				if(Object.alive == true)
				{
					Object.kill();
				}
			}
		}			
	}
}

function portal_Check()
{
	if(Phaser.Rectangle.intersects(Portal_Rect, Hit_Rect))
	{
		Portal_Check = true;
	}

};

function portal_Check2()
{
	if(Phaser.Rectangle.intersects(Portal_Rect2, Hit_Rect))
	{
		Portal_Check2 = true;
	}
};


