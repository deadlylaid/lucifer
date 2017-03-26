/*****************************
* 2017년 3월 13일 최영준
* pig2d 를 이용한 기본 게임 로직 js
* *************************
* 2017년 3월 14일 최영준
* Sprite Image 띄우기 / 마우스 이동 / Sprite 각도에 따라 변환.
* *************************
* 2017년 3월 17일 최영준
* Player Direction 구하기 완료.
* *************************
* 2017년 3월 20일 최영준
* Map 이미지 띄움.
* *************************
* 2017년 3월 21일 최영준
* Phaser js 로 작업 시작. 
* *************************
* 2017년 3월 22 ~ 23일 최영준
* Player Direction, Sprite 변화 완료
* Player ID 띄우기 작업
* Tile map 설치. (충돌 처리)
* **************************/

//## Main Game.js -- 3월 21일 최영준 
/*-----------------------------------------------------
	 모든 게임 관련 함수들을 돌려주는 js 파일
	 preload function : 미리 데이터를 가져오는 함수.
	 create function : 위에서 받은 데이터를 가지고 객체 생성 해주는 함수
	 update function : 게임상의 코드를 갱신해주는 함수.
-----------------------------------------------------*/
var Lucifer_Game = new Phaser.Game(1280, 800, Phaser.CANVAS, 'scene',
								   { preload: preload, create: create, update: update });

//## Game 상에서 필요한 변수들 
//----------------------------------------------------------------------------------------------------------
var Player, Player_ID;
var Player_Status = new Array('Stand', 'Walk', 'Attack', 'Damage', 'Dash', 'Jump', 'Skill');
//----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
var MoveCheck = false;								//Mouse가 클릭 됬는지 체크 하는 변수
var StandCheck = false;								//Stand 상태 한번만 들어오게 하기 위해서.
var Cursor, MousePosX, MousePosY, DistanceToMouse;	//Mouse에 대한 거리 값을 구하기 위한 변수들	
var AngleToPointer, Direction;						//Mouse에 대한 Angle 값을 구하기 위한 변수들
//----------------------------------------------------------------------------------------------------------
var Background_map, Stage1;							//Stage 이미지 변수								
var Collision_Layer;								//Collision Layer
//----------------------------------------------------------------------------------------------------------
var UI_Group, UI_UnderBar, UI_HpBar, UI_MpBar, UI_QuickSlot, UI_Stat;	//UI 이미지 변수.
//----------------------------------------------------------------------------------------------------------

function preload(){
	/*
		Player 관련 소스 : PY_직업_동작 || Map 관련 소스 : MAP_스테이지 명    	|| Object 관련 소스 : OB_오브젝트 명 
		UI 관련 소스 : UI_인터페이스 이름 || Monster 관련 소스 : MON_몬스터 명  || Skill 관련 소스 : SK_스킬명
		Effect 관련 소스 : EF_이펙트 명 || NPC 관련 소스 : NPC_이름         	|| Sound 관련 소스 : Sound_이름 
	*/
	//Map
	//----------------------------------------------------------------------------------------------------------
	Lucifer_Game.load.tilemap('MAP_Stage1', '../../static/images/game/Map/Stage1/Stage1.json',
							   null, Phaser.Tilemap.TILED_JSON);
	Lucifer_Game.load.image('Stage1_TileSet', '../../static/images/game/Map/Stage1/Stage1_TileSet.png');
	Lucifer_Game.load.image('Collision_Tile', '../../static/images/game/Map/Collision_Tile.png');	
	//----------------------------------------------------------------------------------------------------------

	//Player(Bavarian)
	//----------------------------------------------------------------------------------------------------------
	Lucifer_Game.load.spritesheet('PY_Bavarian_Stand', 
								  '../../static/images/game/Player/Bavarian/stand/Stand.png', 200, 200);
	Lucifer_Game.load.spritesheet('PY_Bavarian_Walk', 
		 					      '../../static/images/game/Player/Bavarian/walk/Walk.png', 200, 200);
	//----------------------------------------------------------------------------------------------------------
	
	//UI : spritesheet(Image로 불러오는 것으로 해야될수도 있음. 아직 UI 안들어 가서 보류)
	//----------------------------------------------------------------------------------------------------------
	Lucifer_Game.load.spritesheet('UI_UnderBar', '../../static/images/game/UI/UnderBar/Modify_UnderBar.png', 1280, 150);
	Lucifer_Game.load.spritesheet('UI_HpBar', '../../static/images/game/UI/UnderBar/Modify_HpBar.png', 134, 134);
	Lucifer_Game.load.spritesheet('UI_MpBar', '../../static/images/game/UI/UnderBar/Modify_MpBar.png', 134, 134);					
	//Lucifer_Game.load.spritesheet('UI_QuickSlot', '../../static/images/game/UI/')	
	//----------------------------------------------------------------------------------------------------------
}

function create(){
	//Physics
	Lucifer_Game.physics.startSystem(Phaser.Physics.ARCADE);	
	Lucifer_Game.physics.startSystem(Phaser.Physics.P2JS);

	//Map / Scroll
	//---------------------------------------------------------------------------------------
	Background_map = Lucifer_Game.add.tilemap('MAP_Stage1');		
	Background_map.addTilesetImage('Stage1_TileSet', 'Stage1_TileSet');
	Background_map.addTilesetImage('Collision_Tile', 'Collision_Tile');

	Stage1 = Background_map.createLayer('Tile Layer 1');
	Collision_Layer = Background_map.createLayer('Collision Layer');
	Stage1.resizeWorld();	
	//---------------------------------------------------------------------------------------

	//Player
	//---------------------------------------------------------------------------------------
	Player = Lucifer_Game.add.sprite(3200, 3200, 'PY_Bavarian_Stand');

	//Player Stand Animation	
	//var PY_Bavarian_StandFrame_Array = new Array(8);
	var j = 0;
	for(var i = 0; i < 8; ++i)
	{
		Player.animations.add('PY_Bavarian_Stand_' + i, 
							   [j, j + 1, j + 2, j + 3, j + 4, j + 5, j + 6], 60, true); 
		 j += 8;
	}		

	//Player Walk Animation
	//var PY_Bavarian_WalkFrame_Array = new Array(8);
	j = 0;
	for(var i = 0; i < 8; ++i)
	{	
		Player.animations.add('PY_Bavarian_Walk_' + i, 
							  [j, j + 1, j + 2, j + 3, j + 4, j + 5, j + 6], 60, true);
		j += 8;
	}	
	
	Player.animations.play('PY_Bavarian_Stand_0', 10, true);
	Player.anchor.setTo(0.5, 0.5);	
	
	Lucifer_Game.camera.follow(Player);					//Camera follow
	Lucifer_Game.input.onDown.add(GetDirection, this);	//Player Move
	//---------------------------------------------------------------------------------------	

	//Player & Map Collision
	//---------------------------------------------------------------------------------------	
	Background_map.setCollision(21, true, "Collision Layer");
	Lucifer_Game.physics.p2.convertTilemap(Background_map, "Collision Layer");
	Lucifer_Game.physics.p2.enable(Player);	
	Player.body.fixedRotation = true;
	Player.body.clearShapes();				   //Remove default Collision Box
	Player.body.addRectangle(80, 100, 0, 0);   //Only the lower part of the player Collides
	Player.body.debug = true;				   //Player Rect 표시	
	//---------------------------------------------------------------------------------------	

	//Uesr Interface
	//---------------------------------------------------------------------------------------
	//UI_Group = Lucifer_Game.add.group();
	UI_UnderBar = Lucifer_Game.add.sprite(640, 725, 'UI_UnderBar');
	UI_UnderBar.anchor.setTo(0.5, 0.5);	
	UI_UnderBar.fixedToCamera = true;

	UI_HpBar = Lucifer_Game.add.sprite(115, 725, 'UI_HpBar');
	UI_HpBar.anchor.setTo(0.5, 0.5);
	UI_HpBar.fixedToCamera = true;

	UI_MpBar = Lucifer_Game.add.sprite(1165, 725, 'UI_MpBar');
	UI_MpBar.anchor.setTo(0.5, 0.5);
	UI_MpBar.fixedToCamera = true;	
	//---------------------------------------------------------------------------------------

	//Player Id Text(Test Code)
	//---------------------------------------------------------------------------------------
	Lucifer_Game.physics.enable(Player, Phaser.Physics.ARCADE);	
	Player_ID = Lucifer_Game.add.text(Player.x, Player.y - 100, nickname); //Test 부분에 Player Id 가 들어가면 됨.

	//Center align
	Player_ID.anchor.set(0.5);
	Player_ID.align = 'center';

	//Font Style
	Player_ID.font = 'Arial';
	Player_ID.fontSize = 13;
	Player_ID.fontWeight = 'normal';

	//Stroke color & thickness	
	Player_ID.fill = '#19de65';
	//---------------------------------------------------------------------------------------
}

function GetDirection(){
	//Player Direction
	//---------------------------------------------------------------------------------------
	if(Lucifer_Game.input.mousePointer.isDown)
	{
		//Mouse Click Event
		MousePosX = Lucifer_Game.input.worldX;
		MousePosY = Lucifer_Game.input.worldY;	

		//Angle to Pointer(Mouse)
		AngleToPointer = Lucifer_Game.physics.arcade.angleToPointer(Player);
		AngleToPointer = Math.abs(AngleToPointer);
		if(Player.y < MousePosY)
		{
			AngleToPointer = 2 * Math.PI - AngleToPointer;
		}

		if(AngleToPointer >= 0 && AngleToPointer <= 0.7)
		{
			Direction = 7;
		}
		else if(AngleToPointer > 0.7 && AngleToPointer <= 1.9)
		{
			Direction = 0;
		}
		else if(AngleToPointer > 1.9 && AngleToPointer <= 2.9)
		{
			Direction = 1;
		}
		else if(AngleToPointer > 2.9 && AngleToPointer <= 3.9)
		{
			Direction = 2;
		}
		else if(AngleToPointer > 3.6 && AngleToPointer <= 4.2)
		{
			Direction = 3;
		}
		else if(AngleToPointer > 4.2 && AngleToPointer <= 4.9)
		{
			Direction = 4;
		}
		else if(AngleToPointer > 4.9 && AngleToPointer <= 5.7)
		{
			Direction = 5;
		}
		else if(AngleToPointer > 5.7 && AngleToPointer <= 6.2)
		{
			Direction = 6;
		}	

		MoveCheck = true;					
	}	
}

function Animation_Change(Direction, Status)
{		
	if(Status == Player_Status[0])
	{
		//Stand
		Player.loadTexture('PY_Bavarian_Stand', 0, true)
  	    Player.animations.play('PY_Bavarian_Stand_' + Direction, 10, true);   	  
	}
	else if(Status == Player_Status[1])
	{		
		//Walk
		Player.loadTexture('PY_Bavarian_Walk', 0, true)
		Player.animations.play('PY_Bavarian_Walk_' + Direction, 10, true);
	}
}

function PlayerMove()
{
	//Player Move Stop
	//---------------------------------------------------------------------------------------	
	if(MoveCheck == true)
	{
		//Player Translate & Distance
		if(Lucifer_Game.input.mousePointer.isDown)
		{
			//Stand Check 를 원상태로 초기화.
			StandCheck = false;

			Lucifer_Game.physics.arcade.moveToPointer(Player, 150);
			Lucifer_Game.camera.x = Player.x + 150;
			Lucifer_Game.camera.y = Player.y + 150;

			//Walk Animation Change
			Animation_Change(Direction, 'Walk');			
		}			

		//Distance
		DistanceToMouse = Phaser.Math.distance(Player.x, Player.y, MousePosX, MousePosY);
	}	

	if(DistanceToMouse < 50)
	{
		MoveCheck = false;	
		
		//Stand Animation Change
		if(StandCheck == false)
		{
			Animation_Change(Direction, 'Stand');
			StandCheck = true;	
		}		
		
		//P2 Physics
		Player.body.velocity.x = 0;				
		Player.body.velocity.y = 0;
		//Player.body.velocity.setTo(0, 0);		//Arcade Physics
	}

	//console.log(MousePosX);
	//console.log(MousePosY);
	//console.log(DistanceToMouse);
	//console.log(Direction);
	//---------------------------------------------------------------------------------------
}

function update(){
	//Player ID
	//---------------------------------------------------------------------------------------
	var ID_PosY = Player.position.y + 70;
	Player_ID.position.x = Player.position.x;
	Player_ID.position.y = ID_PosY;	
	//---------------------------------------------------------------------------------------	

	//Player Move & Stop
	//---------------------------------------------------------------------------------------
	PlayerMove();
	//---------------------------------------------------------------------------------------	
}
