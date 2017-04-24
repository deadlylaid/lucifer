var Background_map, Stage1, Stage1_Wall_Layer;		//Stage 이미지 변수								
var Collision_Layer;								//Collision Layer
var Stage1_ObjectGroup = [];								//Stage1 - Object 관련 변수.
var Stage1_Portal, Portal_Rect, Portal_Check;
var BackStageMove=1;
var text_wel = null;
var Stage1_AlertText ;

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    //active: function() { Lucifer_Game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Ranga']
    }

};

var PolygonArray = ['STAGE1_Object_wall7', 'STAGE1_Object_wall15', 'STAGE1_Object_wall12',
					'STAGE1_Object_wall16', 'STAGE1_Object_wall13', 'STAGE1_Object_wall5',
					'STAGE1_Object_item12', 'STAGE1_Object_item35', 'STAGE1_Object_item21',
					'STAGE1_Object_item18', 'STAGE1_Object_item14', 'STAGE1_Object_item17',
					'STAGE1_Object_wall22', 'STAGE1_Object_item19', 'STAGE1_Object_item20',
					'STAGE1_Object_item23', 'STAGE1_Object_item10', 'STAGE1_Object_item25',
					'STAGE1_Object_item5', 'STAGE1_Object_item22', 'STAGE1_Object_wall25',
					'STAGE1_Object_wall27', 'STAGE1_Object_item31', 'STAGE1_Object_item0',
					'STAGE1_Object_item30', 'STAGE1_Object_wall6', 'STAGE1_Object_item19',
					'STAGE1_Object_Tree17', 'STAGE1_Object_item28', 'STAGE1_Object_Tree19',
					'STAGE1_Object_wall24', 'STAGE1_Object_item15', 'STAGE1_Object_item16',
					'STAGE1_Object_wall9', 'STAGE1_Object_item2', 'STAGE1_Object_item32',
					'STAGE1_Object_Tree20', 'STAGE1_Object_item34', 'STAGE1_Object_Tree3',
					'STAGE1_Object_Tree1', 'STAGE1_Object_item13', 'STAGE1_Object_Tree14',
					'STAGE1_Object_wall20', 'STAGE1_Object_wall17', 'STAGE1_Object_item8',
					'STAGE1_Object_item33', 'STAGE1_Object_item11', 'STAGE1_Object_Tree11',
					'STAGE1_Object_item9', 'STAGE1_Object_Tree4', 'STAGE1_Object_item6',
					'STAGE1_Object_wall29', 'STAGE1_Object_item1', 'STAGE1_Object_item37',
					'STAGE1_Object_wall2', 'STAGE1_Object_Tree10', 'STAGE1_Object_wall11',
					'STAGE1_Object_item3', 'STAGE1_Object_Tree2', 'STAGE1_Object_Tree5', 
					'STAGE1_Object_Tree18', 'STAGE1_Object_Tree20', 'STAGE1_Object_item29'];

var objectValueArray = [];


function stageOne_Preload()
{	
	Lucifer_Game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

	Lucifer_Game.load.spritesheet('Ingame_Banner', '../../static/images/game/Map/Stage1/Ingame_Banner.png');
	Lucifer_Game.load.spritesheet('BannerTEXT', '../../static/images/game/Map/Stage1/BannerTEXT.png');

	Lucifer_Game.load.tilemap('MAP_Stage1', '../../static/images/game/Map/Stage1/Stage1.json',
							   null, Phaser.Tilemap.TILED_JSON);
	Lucifer_Game.load.image('Stage1_TileSet', '../../static/images/game/Map/Stage1/Stage1_TileSet.png');
	Lucifer_Game.load.image('Collision_Tile', '../../static/images/game/Map/Collision_Tile.png');
	Lucifer_Game.load.image('Object_WallTileSet', '../../static/images/game/Object/Stage1/Object_WallTileSet.png');

	//Object 
	//----------------------------------------------------------------------------------------------------------------
	

	// Tree
	Lucifer_Game.load.image('STAGE1_Object_Tree', '../../static/images/game/Object/Stage1/struct13.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree1', '../../static/images/game/Object/Stage1/struct23.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree2', '../../static/images/game/Object/Stage1/struct24.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree3', '../../static/images/game/Object/Stage1/struct25.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree4', '../../static/images/game/Object/Stage1/struct34.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree5', '../../static/images/game/Object/Stage1/struct35.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree6', '../../static/images/game/Object/Stage1/struct36.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree7', '../../static/images/game/Object/Stage1/struct40.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree8', '../../static/images/game/Object/Stage1/struct41.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree9', '../../static/images/game/Object/Stage1/struct42.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree10', '../../static/images/game/Object/Stage1/struct43.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree11', '../../static/images/game/Object/Stage1/struct45.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree12', '../../static/images/game/Object/Stage1/struct46.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree13', '../../static/images/game/Object/Stage1/struct47.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree14', '../../static/images/game/Object/Stage1/struct48.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree15', '../../static/images/game/Object/Stage1/struct49.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree16', '../../static/images/game/Object/Stage1/struct50.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree17', '../../static/images/game/Object/Stage1/struct51.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree18', '../../static/images/game/Object/Stage1/struct52.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree19', '../../static/images/game/Object/Stage1/struct53.png');
	Lucifer_Game.load.image('STAGE1_Object_Tree20', '../../static/images/game/Object/Stage1/struct54.png');
	//----------------------------------------------------------------------------------------------------------------	

	// Item
	Lucifer_Game.load.image('STAGE1_Object_item0', '../../static/images/game/Object/Stage1/struct8.png');
	Lucifer_Game.load.image('STAGE1_Object_item1', '../../static/images/game/Object/Stage1/struct9.png');
	Lucifer_Game.load.image('STAGE1_Object_item2', '../../static/images/game/Object/Stage1/struct10.png');
	Lucifer_Game.load.image('STAGE1_Object_item3', '../../static/images/game/Object/Stage1/struct11.png');
	Lucifer_Game.load.image('STAGE1_Object_item4', '../../static/images/game/Object/Stage1/struct12.png');
	Lucifer_Game.load.image('STAGE1_Object_item5', '../../static/images/game/Object/Stage1/struct15.png');
	Lucifer_Game.load.image('STAGE1_Object_item6', '../../static/images/game/Object/Stage1/struct16.png');	
	Lucifer_Game.load.image('STAGE1_Object_item7', '../../static/images/game/Object/Stage1/struct18.png');	
	Lucifer_Game.load.image('STAGE1_Object_item8', '../../static/images/game/Object/Stage1/struct19.png');
	Lucifer_Game.load.image('STAGE1_Object_item9', '../../static/images/game/Object/Stage1/struct20.png');
	Lucifer_Game.load.image('STAGE1_Object_item10', '../../static/images/game/Object/Stage1/struct21.png');
	Lucifer_Game.load.image('STAGE1_Object_item11', '../../static/images/game/Object/Stage1/struct22.png');
	Lucifer_Game.load.image('STAGE1_Object_item12', '../../static/images/game/Object/Stage1/struct30.png');
	Lucifer_Game.load.image('STAGE1_Object_item13', '../../static/images/game/Object/Stage1/struct44.png');
	Lucifer_Game.load.image('STAGE1_Object_item14', '../../static/images/game/Object/Stage1/struct55.png');
	Lucifer_Game.load.image('STAGE1_Object_item15', '../../static/images/game/Object/Stage1/struct58.png');
	Lucifer_Game.load.image('STAGE1_Object_item16', '../../static/images/game/Object/Stage1/struct59.png');	
	Lucifer_Game.load.image('STAGE1_Object_item17', '../../static/images/game/Object/Stage1/struct60.png');	
	Lucifer_Game.load.image('STAGE1_Object_item18', '../../static/images/game/Object/Stage1/struct65.png');
	Lucifer_Game.load.image('STAGE1_Object_item19', '../../static/images/game/Object/Stage1/struct66.png');
	Lucifer_Game.load.image('STAGE1_Object_item20', '../../static/images/game/Object/Stage1/struct67.png');
	Lucifer_Game.load.image('STAGE1_Object_item21', '../../static/images/game/Object/Stage1/struct68.png');
	Lucifer_Game.load.image('STAGE1_Object_item22', '../../static/images/game/Object/Stage1/struct72.png');
	Lucifer_Game.load.image('STAGE1_Object_item23', '../../static/images/game/Object/Stage1/struct73.png');
	Lucifer_Game.load.image('STAGE1_Object_item24', '../../static/images/game/Object/Stage1/struct74.png');
	Lucifer_Game.load.image('STAGE1_Object_item25', '../../static/images/game/Object/Stage1/struct75.png');
	Lucifer_Game.load.image('STAGE1_Object_item26', '../../static/images/game/Object/Stage1/struct79.png');
	Lucifer_Game.load.image('STAGE1_Object_item27', '../../static/images/game/Object/Stage1/struct80.png');
	Lucifer_Game.load.image('STAGE1_Object_item28', '../../static/images/game/Object/Stage1/struct81.png');
	Lucifer_Game.load.image('STAGE1_Object_item29', '../../static/images/game/Object/Stage1/struct82.png');
	Lucifer_Game.load.image('STAGE1_Object_item30', '../../static/images/game/Object/Stage1/struct83.png');
	Lucifer_Game.load.image('STAGE1_Object_item31', '../../static/images/game/Object/Stage1/struct84.png');
	Lucifer_Game.load.image('STAGE1_Object_item32', '../../static/images/game/Object/Stage1/struct85.png');
	Lucifer_Game.load.image('STAGE1_Object_item33', '../../static/images/game/Object/Stage1/struct86.png');
	Lucifer_Game.load.image('STAGE1_Object_item34', '../../static/images/game/Object/Stage1/struct87.png');
	Lucifer_Game.load.image('STAGE1_Object_item36', '../../static/images/game/Object/Stage1/struct88.png');
	Lucifer_Game.load.image('STAGE1_Object_item37', '../../static/images/game/Object/Stage1/struct89.png');
	Lucifer_Game.load.image('STAGE1_Object_item35', '../../static/images/game/Object/Stage1/Object0_TileSet.png');
	//----------------------------------------------------------------------------------------------------------------

	//Wall
	Lucifer_Game.load.image('STAGE1_Object_wall0', '../../static/images/game/Object/Stage1/struct0.png');
	Lucifer_Game.load.image('STAGE1_Object_wall1', '../../static/images/game/Object/Stage1/struct1.png');
	Lucifer_Game.load.image('STAGE1_Object_wall2', '../../static/images/game/Object/Stage1/struct2.png');
	Lucifer_Game.load.image('STAGE1_Object_wall3', '../../static/images/game/Object/Stage1/struct3.png');
	Lucifer_Game.load.image('STAGE1_Object_wall4', '../../static/images/game/Object/Stage1/struct4.png');
	Lucifer_Game.load.image('STAGE1_Object_wall5', '../../static/images/game/Object/Stage1/struct5.png');
	Lucifer_Game.load.image('STAGE1_Object_wall6', '../../static/images/game/Object/Stage1/struct6.png');
	Lucifer_Game.load.image('STAGE1_Object_wall7', '../../static/images/game/Object/Stage1/struct7.png');
	Lucifer_Game.load.image('STAGE1_Object_wall8', '../../static/images/game/Object/Stage1/struct14.png');
	Lucifer_Game.load.image('STAGE1_Object_wall9', '../../static/images/game/Object/Stage1/struct17.png');
	Lucifer_Game.load.image('STAGE1_Object_wall10', '../../static/images/game/Object/Stage1/struct26.png');
	Lucifer_Game.load.image('STAGE1_Object_wall11', '../../static/images/game/Object/Stage1/struct27.png');
	Lucifer_Game.load.image('STAGE1_Object_wall12', '../../static/images/game/Object/Stage1/struct28.png');
	Lucifer_Game.load.image('STAGE1_Object_wall13', '../../static/images/game/Object/Stage1/struct29.png');
	Lucifer_Game.load.image('STAGE1_Object_wall14', '../../static/images/game/Object/Stage1/struct31.png');
	Lucifer_Game.load.image('STAGE1_Object_wall15', '../../static/images/game/Object/Stage1/struct32.png');
	Lucifer_Game.load.image('STAGE1_Object_wall16', '../../static/images/game/Object/Stage1/struct33.png');
	Lucifer_Game.load.image('STAGE1_Object_wall17', '../../static/images/game/Object/Stage1/struct56.png');
	Lucifer_Game.load.image('STAGE1_Object_wall18', '../../static/images/game/Object/Stage1/struct57.png');
	Lucifer_Game.load.image('STAGE1_Object_wall19', '../../static/images/game/Object/Stage1/struct61.png');
	Lucifer_Game.load.image('STAGE1_Object_wall20', '../../static/images/game/Object/Stage1/struct62.png');
	Lucifer_Game.load.image('STAGE1_Object_wall21', '../../static/images/game/Object/Stage1/struct63.png');
	Lucifer_Game.load.image('STAGE1_Object_wall22', '../../static/images/game/Object/Stage1/struct64.png');
	Lucifer_Game.load.image('STAGE1_Object_wall23', '../../static/images/game/Object/Stage1/struct69.png');
	Lucifer_Game.load.image('STAGE1_Object_wall24', '../../static/images/game/Object/Stage1/struct70.png');
	Lucifer_Game.load.image('STAGE1_Object_wall25', '../../static/images/game/Object/Stage1/struct71.png');
	Lucifer_Game.load.image('STAGE1_Object_wall26', '../../static/images/game/Object/Stage1/struct76.png');
	Lucifer_Game.load.image('STAGE1_Object_wall27', '../../static/images/game/Object/Stage1/struct77.png');
	Lucifer_Game.load.image('STAGE1_Object_wall28', '../../static/images/game/Object/Stage1/struct78.png');
	Lucifer_Game.load.image('STAGE1_Object_wall29', '../../static/images/game/Object/Stage1/struct38.png');
	//----------------------------------------------------------------------------------------------------------------
	//Portal
	//----------------------------------------------------------------------------------------------------------------
	Lucifer_Game.load.spritesheet('Stage1_Portal', '../../static/images/game/Object/Portal/Portal.png', 115, 154);
	//----------------------------------------------------------------------------------------------------------------
	Lucifer_Game.load.physics('Physics_polygon2', '../../static/js/game/Map/Physics_polygon2.json');

}

function stageOne_Create()
{	
	//Stage2 -> Stage1 Portal move 
	//---------------------------------------------------------------------------------------
	if(BackStageMove == 0){
		objectValueArray=[];
	}
	//---------------------------------------------------------------------------------------
	
	//Map 
	//---------------------------------------------------------------------------------------
	Background_map = Lucifer_Game.add.tilemap('MAP_Stage1');		
	Background_map.addTilesetImage('Stage1_TileSet', 'Stage1_TileSet');
	Background_map.addTilesetImage('Collision_Tile', 'Collision_Tile');
	Background_map.addTilesetImage('Object_WallTileSet', 'Object_WallTileSet');
	//Background_map.addTilesetImage('Object_Tree2_TileSet', 'Object_Tree2_TileSet');

	Stage1 = Background_map.createLayer('Tile Layer 1');
	Stage1_Wall_Layer = Background_map.createLayer('Object Layer');
	Collision_Layer = Background_map.createLayer('Collision Layer');
	Collision_Layer.visible = false;

	Stage1.resizeWorld();
	//---------------------------------------------------------------------------------------
	
	
	//Object
	//---------------------------------------------------------------------------------------

	Lucifer_Game.physics.startSystem(Phaser.Physics.P2JS);


	Stage1_ObjectGroup = Lucifer_Game.add.group();
	Stage1_ObjectGroup = Lucifer_Game.add.physicsGroup(Phaser.Physics.P2JS);

	Stage1_ObjectGroup.create(1276, 2008, 'STAGE1_Object_wall7');
	Stage1_ObjectGroup.create(1470, 1921, 'STAGE1_Object_wall7');
	Stage1_ObjectGroup.create(1743, 1797, 'STAGE1_Object_wall15');
	Stage1_ObjectGroup.create(1926, 1756, 'STAGE1_Object_wall12');
	Stage1_ObjectGroup.create(501, 1529, 'STAGE1_Object_wall16');
	Stage1_ObjectGroup.create(763, 1391, 'STAGE1_Object_wall16');
	Stage1_ObjectGroup.create(995, 1279, 'STAGE1_Object_wall7');
	Stage1_ObjectGroup.create(1192, 1181, 'STAGE1_Object_wall13');
	Stage1_ObjectGroup.create(1563, 1222, 'STAGE1_Object_wall5');
	Stage1_ObjectGroup.create(546, 1672, 'STAGE1_Object_item12');
	Stage1_ObjectGroup.create(750, 1500, 'STAGE1_Object_item35');
	Stage1_ObjectGroup.create(643, 1547, 'STAGE1_Object_item35');
	Stage1_ObjectGroup.create(903, 1404, 'STAGE1_Object_item21');
	Stage1_ObjectGroup.create(1271, 1223, 'STAGE1_Object_item12');
	Stage1_ObjectGroup.create(1167, 1974, 'STAGE1_Object_item18');
	Stage1_ObjectGroup.create(1050, 1966, 'STAGE1_Object_item21');
	Stage1_ObjectGroup.create(1020, 1963, 'STAGE1_Object_item21');
	Stage1_ObjectGroup.create(1151, 1959, 'STAGE1_Object_item18');
	Stage1_ObjectGroup.create(908, 1880, 'STAGE1_Object_item14');
	Stage1_ObjectGroup.create(808, 1836, 'STAGE1_Object_item17');
	Stage1_ObjectGroup.create(571, 1759, 'STAGE1_Object_wall22');
	Stage1_ObjectGroup.create(1514, 1788, 'STAGE1_Object_item19');
	Stage1_ObjectGroup.create(1583, 1759, 'STAGE1_Object_item20');
	Stage1_ObjectGroup.create(1120, 1310, 'STAGE1_Object_item23');
	Stage1_ObjectGroup.create(2134, 1749, 'STAGE1_Object_item10');
	Stage1_ObjectGroup.create(1624, 936, 'STAGE1_Object_item25');
	Stage1_ObjectGroup.create(1882, 838, 'STAGE1_Object_item5');
	Stage1_ObjectGroup.create(2216, 786, 'STAGE1_Object_item22');
	Stage1_ObjectGroup.create(1990, 770, 'STAGE1_Object_item19');
	Stage1_ObjectGroup.create(1990, 770, 'STAGE1_Object_item19');
	Stage1_ObjectGroup.create(2387, 849, 'STAGE1_Object_item12');
	Stage1_ObjectGroup.create(2600, 850, 'STAGE1_Object_wall25');
	Stage1_ObjectGroup.create(2860, 985, 'STAGE1_Object_wall27');
	Stage1_ObjectGroup.create(2425, 934, 'STAGE1_Object_item31');
	Stage1_ObjectGroup.create(3031, 1126, 'STAGE1_Object_item0');
	Stage1_ObjectGroup.create(3737, 2870, 'STAGE1_Object_item30');
	Stage1_ObjectGroup.create(3361, 3103, 'STAGE1_Object_wall6');
	Stage1_ObjectGroup.create(3621, 2761, 'STAGE1_Object_item19');
	Stage1_ObjectGroup.create(3686, 2797, 'STAGE1_Object_item19');
	Stage1_ObjectGroup.create(3759, 2781, 'STAGE1_Object_item20');
	Stage1_ObjectGroup.create(2985, 2903, 'STAGE1_Object_wall13');
	Stage1_ObjectGroup.create(3118, 2984, 'STAGE1_Object_Tree17');
	Stage1_ObjectGroup.create(3425, 2950, 'STAGE1_Object_item28');
	Stage1_ObjectGroup.create(3342, 2906, 'STAGE1_Object_item28');
	Stage1_ObjectGroup.create(2860, 2810, 'STAGE1_Object_Tree19');
	Stage1_ObjectGroup.create(2797, 2418, 'STAGE1_Object_item25');
	Stage1_ObjectGroup.create(2379, 2497, 'STAGE1_Object_wall24');
	Stage1_ObjectGroup.create(2521, 2621, 'STAGE1_Object_item15');
	Stage1_ObjectGroup.create(2646, 2721, 'STAGE1_Object_item16');
	Stage1_ObjectGroup.create(4807, 2205, 'STAGE1_Object_wall9');
	Stage1_ObjectGroup.create(4098, 2059, 'STAGE1_Object_wall5');
	Stage1_ObjectGroup.create(4406, 2111, 'STAGE1_Object_wall7');
	Stage1_ObjectGroup.create(4231, 2672, 'STAGE1_Object_item12');
	Stage1_ObjectGroup.create(4373, 2611, 'STAGE1_Object_item2');
	Stage1_ObjectGroup.create(5018, 2310, 'STAGE1_Object_wall7');
	Stage1_ObjectGroup.create(4843, 2420, 'STAGE1_Object_item32');
	Stage1_ObjectGroup.create(4773, 2437, 'STAGE1_Object_item32');
	Stage1_ObjectGroup.create(4778, 2370, 'STAGE1_Object_item32');
	Stage1_ObjectGroup.create(4703, 2481, 'STAGE1_Object_item31');
	Stage1_ObjectGroup.create(4458, 2090, 'STAGE1_Object_Tree20');
	Stage1_ObjectGroup.create(4119, 2760, 'STAGE1_Object_item18');
	Stage1_ObjectGroup.create(2529, 2220, 'STAGE1_Object_item34');
	Stage1_ObjectGroup.create(1388, 2097, 'STAGE1_Object_Tree3');
	Stage1_ObjectGroup.create(1511, 2165, 'STAGE1_Object_Tree1');
	Stage1_ObjectGroup.create(1593, 1990, 'STAGE1_Object_item13');
	Stage1_ObjectGroup.create(1623, 2103, 'STAGE1_Object_Tree14');
	Stage1_ObjectGroup.create(1669, 2257, 'STAGE1_Object_Tree19');
	Stage1_ObjectGroup.create(1788, 2176, 'STAGE1_Object_Tree19');
	Stage1_ObjectGroup.create(1925, 2399, 'STAGE1_Object_wall20');
	Stage1_ObjectGroup.create(2191, 2394, 'STAGE1_Object_wall17');
	Stage1_ObjectGroup.create(3761, 1972, 'STAGE1_Object_item8');
	Stage1_ObjectGroup.create(5637, 1959, 'STAGE1_Object_item16');
	Stage1_ObjectGroup.create(5330, 2073, 'STAGE1_Object_item33');
	Stage1_ObjectGroup.create(5551, 1075, 'STAGE1_Object_item17');
	Stage1_ObjectGroup.create(5413, 987, 'STAGE1_Object_item14');
	Stage1_ObjectGroup.create(2790, 280, 'STAGE1_Object_item11');
	Stage1_ObjectGroup.create(2557, 381, 'STAGE1_Object_Tree11');
	Stage1_ObjectGroup.create(2991, 241, 'STAGE1_Object_item9');
	Stage1_ObjectGroup.create(2663, 407, 'STAGE1_Object_item10');
	Stage1_ObjectGroup.create(3262, 112, 'STAGE1_Object_Tree4');
	Stage1_ObjectGroup.create(3438, 109, 'STAGE1_Object_Tree4');
	Stage1_ObjectGroup.create(3147, 197, 'STAGE1_Object_Tree4');
	Stage1_ObjectGroup.create(3347, 197, 'STAGE1_Object_Tree4');
	Stage1_ObjectGroup.create(3547, 197, 'STAGE1_Object_Tree4');
	Stage1_ObjectGroup.create(3804, 329, 'STAGE1_Object_Tree4');
	Stage1_ObjectGroup.create(3105, 703, 'STAGE1_Object_item5');
	Stage1_ObjectGroup.create(3059, 689, 'STAGE1_Object_item6');
	Stage1_ObjectGroup.create(3023, 640, 'STAGE1_Object_item5');
	Stage1_ObjectGroup.create(3615, 910, 'STAGE1_Object_item0');
	Stage1_ObjectGroup.create(4150, 429, 'STAGE1_Object_wall29');
	Stage1_ObjectGroup.create(3939, 729, 'STAGE1_Object_item1');
	Stage1_ObjectGroup.create(4154, 713, 'STAGE1_Object_wall25');
	Stage1_ObjectGroup.create(3690, 1093, 'STAGE1_Object_wall25');
	Stage1_ObjectGroup.create(4398, 597, 'STAGE1_Object_item37');
	Stage1_ObjectGroup.create(4418, 697, 'STAGE1_Object_wall2');
	Stage1_ObjectGroup.create(4564, 669, 'STAGE1_Object_item12');
	Stage1_ObjectGroup.create(4606, 826, 'STAGE1_Object_item34');
	Stage1_ObjectGroup.create(4907, 869, 'STAGE1_Object_Tree19');
	Stage1_ObjectGroup.create(5046, 918, 'STAGE1_Object_Tree19');
	Stage1_ObjectGroup.create(5128, 1011, 'STAGE1_Object_Tree19');
	Stage1_ObjectGroup.create(5321, 1054, 'STAGE1_Object_item14');
	Stage1_ObjectGroup.create(5427, 1579, 'STAGE1_Object_item22');
	Stage1_ObjectGroup.create(4646, 1576, 'STAGE1_Object_item29');
	Stage1_ObjectGroup.create(4477, 1934, 'STAGE1_Object_item28');
	Stage1_ObjectGroup.create(2947, 1590, 'STAGE1_Object_Tree10');
	Stage1_ObjectGroup.create(2941, 1695, 'STAGE1_Object_wall11');
	Stage1_ObjectGroup.create(5584, 1737, 'STAGE1_Object_item19');
	Stage1_ObjectGroup.create(3412, 1082, 'STAGE1_Object_Tree14');
	Stage1_ObjectGroup.create(3282, 1149, 'STAGE1_Object_Tree14');
	Stage1_ObjectGroup.create(3568, 1225, 'STAGE1_Object_item3');
	Stage1_ObjectGroup.create(5641, 1799, 'STAGE1_Object_item20');
	Stage1_ObjectGroup.create(4914, 2040, 'STAGE1_Object_wall7');
	Stage1_ObjectGroup.create(5462, 1915, 'STAGE1_Object_item31');
	Stage1_ObjectGroup.create(4165, 1983, 'STAGE1_Object_item12');
	Stage1_ObjectGroup.create(1614, 1135, 'STAGE1_Object_item34');
	Stage1_ObjectGroup.create(842, 1435, 'STAGE1_Object_item12');
	Stage1_ObjectGroup.create(4419, 817, 'STAGE1_Object_item35');
	Stage1_ObjectGroup.create(4366, 785, 'STAGE1_Object_item8');
	Stage1_ObjectGroup.create(1403, 1317, 'STAGE1_Object_item22');
	Stage1_ObjectGroup.create(4653, 2024, 'STAGE1_Object_Tree2');
	Stage1_ObjectGroup.create(6193, 1740, 'STAGE1_Object_Tree3');
	Stage1_ObjectGroup.create(6193, 1640, 'STAGE1_Object_Tree5');
	Stage1_ObjectGroup.create(6193, 1440, 'STAGE1_Object_Tree5');
	Stage1_ObjectGroup.create(6093, 1740, 'STAGE1_Object_Tree3');
	Stage1_ObjectGroup.create(6093, 1640, 'STAGE1_Object_Tree5');
	Stage1_ObjectGroup.create(6093, 1540, 'STAGE1_Object_Tree3');
	Stage1_ObjectGroup.create(6093, 1440, 'STAGE1_Object_Tree5');
	Stage1_ObjectGroup.create(5993, 1840, 'STAGE1_Object_Tree18');
	Stage1_ObjectGroup.create(5993, 1740, 'STAGE1_Object_Tree18');
	Stage1_ObjectGroup.create(5993, 1640, 'STAGE1_Object_Tree19');
	Stage1_ObjectGroup.create(5993, 1340, 'STAGE1_Object_Tree18');
	Stage1_ObjectGroup.create(5993, 1540, 'STAGE1_Object_Tree19');
	Stage1_ObjectGroup.create(5993, 1440, 'STAGE1_Object_Tree20');
	Stage1_ObjectGroup.create(5993, 1240, 'STAGE1_Object_Tree18');
	Stage1_ObjectGroup.create(5893, 1840, 'STAGE1_Object_Tree18');
	Stage1_ObjectGroup.create(5893, 1700, 'STAGE1_Object_Tree17');
	Stage1_ObjectGroup.create(5893, 1640, 'STAGE1_Object_Tree19');
	Stage1_ObjectGroup.create(5893, 1540, 'STAGE1_Object_Tree19');
	Stage1_ObjectGroup.create(5893, 1400, 'STAGE1_Object_Tree20');
	Stage1_ObjectGroup.create(5893, 1340, 'STAGE1_Object_Tree17');
	Stage1_ObjectGroup.create(5793, 1850, 'STAGE1_Object_Tree18');
	Stage1_ObjectGroup.create(5793, 1700, 'STAGE1_Object_Tree17');
	Stage1_ObjectGroup.create(5793, 1620, 'STAGE1_Object_Tree19');
	Stage1_ObjectGroup.create(5793, 1300, 'STAGE1_Object_Tree18');
	Stage1_ObjectGroup.create(5793, 1400, 'STAGE1_Object_Tree20');
	Stage1_ObjectGroup.create(5793, 1320, 'STAGE1_Object_Tree17');
	Stage1_ObjectGroup.create(5793, 1200, 'STAGE1_Object_Tree14');
	Stage1_ObjectGroup.create(1005, 1759, 'STAGE1_Object_item1');
	Stage1_ObjectGroup.create(1072, 1886, 'STAGE1_Object_item31');
	
	/*Stage1_ObjectGroup.create(1005, 1759, 'STAGE1_Object_item1');*/
	// forest end


	//---------------------------------------------------------------------------------------
	for(var i = 0; i < Stage1_ObjectGroup.length; ++i)
	{
		Stage1_ObjectGroup.getChildAt(i).body.static = true;
		objectValueArray.push(Stage1_ObjectGroup.getChildAt(i).key);		
	}		
	//---------------------------------------------------------------------------------------


	//Polygon
	//---------------------------------------------------------------------------------------

	for(var a = 0; a < objectValueArray.length; a++)
	{
		for(var i = 0; i < PolygonArray.length; i++)
		{
			if(objectValueArray[a] == PolygonArray[i])
			{	

				Stage1_ObjectGroup.getChildAt(a).body.clearShapes();
				Stage1_ObjectGroup.getChildAt(a).body.loadPolygon('Physics_polygon2', PolygonArray[i]);
				Stage1_ObjectGroup.getChildAt(a).body.debug = false;

			}
			else
			{
				continue;
				
			}
		}		
	}	

	
	//---------------------------------------------------------------------------------------

	//Portal
	//---------------------------------------------------------------------------------------
	Stage1_Portal = Lucifer_Game.add.sprite(2860, 350, 'Stage1_Portal');
	Lucifer_Game.physics.p2.enable(Stage1_Portal);
	Stage1_Portal.anchor.setTo(0.5, 0.5);
	Stage1_Portal.body.clearShapes();
	Stage1_Portal.body.debug = true;
	Stage1_Portal.body.static = true;
	Stage1_Portal.blendMode = Phaser.blendModes.ADD;

	//Animation
	Stage1_Portal.animations.add('Portal_Sprite', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
								 60, true);
	Stage1_Portal.animations.play('Portal_Sprite', 10, true);

	//Aracade Physics Setting
	Lucifer_Game.physics.enable(Stage1_Portal, Phaser.Physics.ARCADE);

	//Portal_Rect
	Portal_Rect = new Phaser.Rectangle(Stage1_Portal.x, Stage1_Portal.y, 100, 100);
	Portal_Check = false;	
	//---------------------------------------------------------------------------------------

	Background_map.setCollision(21, true, "Collision Layer");
	Lucifer_Game.physics.p2.convertTilemap(Background_map, "Collision Layer");


	

	//Welcome TEXT (게임 첫 시작에만 나옴.)
	if(BackStageMove == 1) 
	{

    Ingame_Banner = Lucifer_Game.add.sprite(640, 120, 'Ingame_Banner');
    Ingame_Banner.anchor.setTo(0.5, 0.5);
    Ingame_Banner.fixedToCamera = true;
    Ingame_Banner.alpha = 0.1;
    Ingame_Banner.fixedToCamera = true;
    Ingame_Banner.visible = true;

    BannerTEXT = Lucifer_Game.add.sprite(640, 140, 'BannerTEXT');
    BannerTEXT.anchor.setTo(0.5, 0.5);
    BannerTEXT.fixedToCamera = true;
    BannerTEXT.alpha = 0.1;
    BannerTEXT.fixedToCamera = true;
    BannerTEXT.visible = true;


    Lucifer_Game.add.tween(Ingame_Banner).to({ alpha: 1}, 3000, Phaser.Easing.Linear.None, true, 0, 0, true);
    Lucifer_Game.add.tween(BannerTEXT).to({ alpha: 1}, 3000, Phaser.Easing.Linear.None, true, 0, 0, true);


    Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 6, imagedestroy, this);	

	} 
	else {
	text_wel = Lucifer_Game.add.text(640, 150, "Stage1 : 마을", {font: '50px Roboto', fill: '#ffffff'});
    text_wel.anchor.set(0.5);
    text_wel.alpha = 0.1;
    text_wel.fixedToCamera = true;
    text_wel.stroke = '#000000';
    text_wel.strokeThickness = 2;
    text_wel.setShadow(3, 3, '#000000', 0, true, true);
    text_wel.padding.set(10, 16);
    text_wel.fontWeight = 'bold';

    var grd = text_wel.context.createLinearGradient(0, 0, 0, text_wel.height);

    //  Add in 2 color stops
    grd.addColorStop(0, '#d13034');   
    grd.addColorStop(1, '#66191b');

    //  And apply to the Text
    text_wel.fill = grd;


    Lucifer_Game.add.tween(text_wel).to({ alpha: 1}, 3000, Phaser.Easing.Linear.None, true, 0, 0, true);

    Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 6, TextVisible, this);

	}
    //-------------------------------------------------------------------------------------------

    Stage1_AlertText = Lucifer_Game.add.text(80, 780, "Stage1 : 마을", {font: '20px Roboto', fill: '#a7533b'});
    Stage1_AlertText.anchor.set(0.5);
    Stage1_AlertText.fixedToCamera = true;
    Stage1_AlertText.fontWeight = 'bold';
    Stage1_AlertText.stroke = '#000000';
    Stage1_AlertText.strokeThickness = 1;
    Stage1_AlertText.setShadow(1, 1, '#000000', 0, true, true);


}

	
function TextVisible(){
	text_wel.destroy();

}

function imagedestroy(){
	Ingame_Banner.destroy();
	BannerTEXT.destroy();
}

function portal_Check()
{
	if(Phaser.Rectangle.intersects(Portal_Rect, Hit_Rect))
	{
		Portal_Check = true;
	}
}

