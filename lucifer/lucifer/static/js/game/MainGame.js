/*****************************
* 2017년 3월 26일 최영준
* Map : 충돌처리 완료
******************************
* 2017년 3월 27일 최영준
* Map : Object 로드 하는것 / 설치 / 충돌처리 따로 Js 파일로 작업.
* Mosnter Stage2 에 띄워 보기
* 스킬 / 아이템 자료 조사.
* **************************/

//## Main Game.js -- 3월 21일 최영준 
/*-----------------------------------------------------
	 모든 게임 관련 함수들을 돌려주는 js 파일
	 preload function : 미리 데이터를 가져오는 함수.
	 create function : 위에서 받은 데이터를 가지고 객체 생성 해주는 함수
	 update function : 게임상의 코드를 갱신해주는 함수.
-----------------------------------------------------*/
var Lucifer_Game = new Phaser.Game(1280, 800, Phaser.CANVAS, 'scene',
								   { preload: preload, create: create, update: update, render: render });

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
var DistanceToMonster;								//Monster에 대한 거리값 변수.
var Attack_Rect;
var Player_AttackCheck = false; 
//----------------------------------------------------------------------------------------------------------

function preload(){
	/*
		Player 관련 소스 : PY_직업_동작 || Map 관련 소스 : MAP_스테이지 명    	|| Object 관련 소스 : OB_오브젝트 명 
		UI 관련 소스 : UI_인터페이스 이름 || Monster 관련 소스 : MON_몬스터 명  || Skill 관련 소스 : SK_스킬명
		Effect 관련 소스 : EF_이펙트 명 || NPC 관련 소스 : NPC_이름         	|| Sound 관련 소스 : Sound_이름 
	*/	
	//Stage Preload
	//----------------------------------------------------------------------------------------------------------
	//stageOne_Preload();
	stageTwo_Preload();
	//----------------------------------------------------------------------------------------------------------

	//Player(Bavarian)
	//----------------------------------------------------------------------------------------------------------
	Lucifer_Game.load.spritesheet('PY_Bavarian_Stand', 
								  '../../static/images/game/Player/Bavarian/stand/Stand.png', 200, 200);
	Lucifer_Game.load.spritesheet('PY_Bavarian_Walk', 
		 					      '../../static/images/game/Player/Bavarian/walk/Walk.png', 200, 200);
	Lucifer_Game.load.spritesheet('PY_Bavarian_Attack',
								  '../../static/images/game/Player/Bavarian/attack/attack.png', 200, 200);
	//----------------------------------------------------------------------------------------------------------
	
	//UI : spritesheet(Image로 불러오는 것으로 해야될수도 있음. 아직 UI 안들어 가서 보류)
	//----------------------------------------------------------------------------------------------------------
	ui_Preload();
	//----------------------------------------------------------------------------------------------------------

	//Monster
	//----------------------------------------------------------------------------------------------------------
	golem_Preload();
	//----------------------------------------------------------------------------------------------------------
}

function create(){
	//Physics
	Lucifer_Game.physics.startSystem(Phaser.Physics.ARCADE);	
	Lucifer_Game.physics.startSystem(Phaser.Physics.P2JS);

	//Stage Create
	//---------------------------------------------------------------------------------------
	//stageOne_Create();	
	stageTwo_Create();
	//---------------------------------------------------------------------------------------

	//Player
	//---------------------------------------------------------------------------------------
	Player = Lucifer_Game.add.sprite(3580, 1492, 'PY_Bavarian_Attack');

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

	//Player Attack Animation
	var aniIndex = 0;
	for(var i = 0; i < 8; ++i)
	{	
		Player.animations.add('PY_Bavarian_Attack_' + i, 
							  [
							    aniIndex,      aniIndex + 1,  aniIndex + 2,  aniIndex + 3, 
							    aniIndex + 4,  aniIndex + 5,  aniIndex + 6,  aniIndex + 7, 
							    aniIndex + 8,  aniIndex + 9,  aniIndex + 10, aniIndex + 11, 
							    aniIndex + 12, aniIndex + 13, aniIndex + 14, aniIndex + 15
							  ], 
							  60, true);
		aniIndex += 16;								
	}
		
	Player.animations.play('PY_Bavarian_Stand_0', 10, true);
	Player.anchor.setTo(0.5, 0.5);	
	
	Lucifer_Game.camera.follow(Player);					//Camera follow
	Lucifer_Game.input.onDown.add(GetDirection, this);	//Player Move	
	//---------------------------------------------------------------------------------------	

	//Player Collision
	//---------------------------------------------------------------------------------------	
	//Player Body Collision
	Lucifer_Game.physics.p2.enable(Player);	
	Player.body.fixedRotation = true;
	Player.body.clearShapes();				   //Remove default Collision Box
	Player.body.addRectangle(40, 60, 0, 0);    //Only the lower part of the player Collides
	Player.body.debug = true;				   //Player Rect 표시	

	//Player Attack Collision
	Attack_Rect = new Phaser.Rectangle(Player.x, Player.y, 80, 80);	
		//---------------------------------------------------------------------------------------	

	//Player Id Text(Test Code)
	//---------------------------------------------------------------------------------------
	Player_ID = Lucifer_Game.add.text(Player.x, Player.y - 100, nickname); //Test 부분에 Player Id 가 들어가면 됨.
	Lucifer_Game.physics.enable(Player, Phaser.Physics.ARCADE);

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

	//Monster Create
	//---------------------------------------------------------------------------------------
	golem_Create();
	//---------------------------------------------------------------------------------------

	//UI Create
	//---------------------------------------------------------------------------------------
	ui_Create();
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
	else if(Status == Player_Status[2])
	{
		//Attack
		if(Player_AttackCheck == true)
		{
			Player.loadTexture('PY_Bavarian_Attack', 0, true);
			Player.animations.play('PY_Bavarian_Attack_' + Direction, 20, true);
		}		
	}

	//console.log(Player.animations.name);	
}

function PlayerMove()
{
	//Player Move & Stop
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

function PlayerAttack()
{
	//Player Attack Motion (임시로 Monster를 Golem 으로 한정 시킴 나중에 이 함수를 바꿔서 여러 마리랑 가능하게 해야됨.)
	//---------------------------------------------------------------------------------------
	DistanceToMonster = Phaser.Math.distance(Player.x, Player.y, mon_Golem.x, mon_Golem.y);

	if(DistanceToMonster < 70)
	{	
		if(Phaser.Rectangle.intersects(Attack_Rect, golem_HitRect))
		{	
			//충돌된 상태에서 다른곳 클릭하게 되면 공격모션이 나오는것을 예외처리 해주어야 한다.
			if(Lucifer_Game.input.mousePointer.isDown)
			{
				Animation_Change(Direction, 'Attack');	
				Player_AttackCheck = true;	

				Damage_Count();				
			}			
		}
		else
		{
			Player_AttackCheck = false;
		}									
	}
	//console.log(Player.animations.frameTotal);
	//console.log(Phaser.Rectangle.intersects(Attack_Rect, golem_HitRect));
	//---------------------------------------------------------------------------------------	
}

function Damage_Count(Player, mon_Golem)
{	
	golem_Hp -= 10;
	console.log(golem_Hp);
}

var intersects;
function update(){
	//Player ID
	//---------------------------------------------------------------------------------------
	var ID_PosY = Player.position.y + 70;
	Player_ID.position.x = Player.position.x;
	Player_ID.position.y = ID_PosY;	
	//---------------------------------------------------------------------------------------	

	//Player Motion
	//---------------------------------------------------------------------------------------
	//Move
	if(UI_Stat.visible == false)
	{
		PlayerMove();
		PlayerAttack();
	}
	//Attack
	Attack_Rect.x = Player.x;
	Attack_Rect.y = Player.y;
	Attack_Rect.centerOn(Player.x, Player.y);

	golem_HitRect.x = mon_Golem.x;
	golem_HitRect.y = mon_Golem.y;
	golem_HitRect.centerOn(mon_Golem.x, mon_Golem.y);	

	//Debug 용도
	intersects = Phaser.Rectangle.intersection(Attack_Rect, golem_HitRect);
	console.log(Player.x, Player.y);
	//---------------------------------------------------------------------------------------

	//Monster Direction & Move
	//---------------------------------------------------------------------------------------
	golem_Namefollw();
	golem_GetDirection();
	golem_Move();
	//---------------------------------------------------------------------------------------	

	//UI
	//---------------------------------------------------------------------------------------
	ui_Update();
	//---------------------------------------------------------------------------------------	
}

function render()
{
	Lucifer_Game.debug.geom(Attack_Rect, 'rgba(200, 0, 0, 0.5');
	Lucifer_Game.debug.geom(golem_HitRect, 'rgba(0, 0, 200, 0.5');

	Lucifer_Game.debug.geom(intersects, 'rgba(255, 0, 0, 1)');
}