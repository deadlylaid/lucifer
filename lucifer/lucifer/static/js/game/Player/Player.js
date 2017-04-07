var Player, Player_ID;
var Player_Status = new Array('Stand', 'Walk', 'Attack', 'Damage', 'Dash', 'Jump', 'Skill');
var MoveCheck = false;								//Mouse가 클릭 됬는지 체크 하는 변수
var StandCheck = false;								//Stand 상태 한번만 들어오게 하기 위해서.
var Cursor, MousePosX, MousePosY, DistanceToMouse;	//Mouse에 대한 거리 값을 구하기 위한 변수들	
var AngleToPointer, Direction;						//Mouse에 대한 Angle 값을 구하기 위한 변수들
var DistanceToMonster;								//Monster에 대한 거리값 변수.
var Attack_Rect, Hit_Rect;
var Player_AttackCheck = false; 
var intersects;										//Rect Collision
var stageOne_Check = false, stageTwo_Check = false;
var player_KeyJump, player_KeySkill, player_KeySkill2;
//----------------------------------------------------------------------------------------------------------

function player_Create()
{
	//Player Create
	if(stageOne_Check == true)
	{
		Player = Lucifer_Game.add.sprite(875, 1637, 'PY_Bavarian_Attack');	
	}
	else if(stageTwo_Check == true)
	{
		Player = Lucifer_Game.add.sprite(3426, 4289, 'PY_Bavarian_Attack');	
	}
	 	
	//Player = Stage2_ObjectGroup.create(3582, 1466, 'PY_Bavarian_Attack');

	//Player_Bavarian Animation
	//----------------------------------------------------------------------------------------------------------
	//Stand
	var j = 0;
	for(var i = 0; i < 8; ++i)
	{
		Player.animations.add('PY_Bavarian_Stand_' + i, 
							   [j, j + 1, j + 2, j + 3, j + 4, j + 5, j + 6, j + 7], 60, true); 
		 j += 8;
	}
	//Walk	
	j = 0;
	for(var i = 0; i < 8; ++i)
	{	
		Player.animations.add('PY_Bavarian_Walk_' + i, 
							  [j, j + 1, j + 2, j + 3, j + 4, j + 5, j + 6, j + 7], 60, true);
		j += 8;
	}
	//Attack
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
	//Jump
	j = 0;
	for(var i = 0; i < 8; ++i)
	{
		Player.animations.add('PY_Bavarian_Jump_' + i,
							  [
							  	j,      j + 1,  j + 2,  j + 3, j + 4,  j + 5,
							  	j + 6,  j + 7,  j + 8,  j + 9, j + 10, j + 11,
							  	j + 12, j + 13, j + 14
							  ],
							  60, true);
	    j += 15;
	}
	//Dash
	j = 0;
	for(var i = 0; i < 8; ++i)
	{
		Player.animations.add('PY_Bavarian_Dash_' + i, 
							   [j, j + 1, j + 2, j + 3, j + 4, j + 5, j + 6, j + 7], 60, true); 
	
		j += 8;
	}
	//Skill
	j = 0;
	for(var i = 0; i < 8; ++i)
	{
		Player.animations.add('PY_Bavarian_Skill_' + i,
							   [
							   	  j,      j + 1,  j + 2,  j + 3, j + 4,  j + 5,
							   	  j + 6,  j + 7,  j + 8,  j + 9, j + 10, j + 11,
							   	  j + 12, j + 13
							   ],
							   60, true);

		j += 14;
	}
	//----------------------------------------------------------------------------------------------------------

	//Player Seting
	//----------------------------------------------------------------------------------------------------------
	//Sprite
	Player.loadTexture('PY_Bavarian_Stand', 0, true);
	Player.animations.play('PY_Bavarian_Stand_0', 10, true);
	Player.anchor.setTo(0.5, 0.5);	
	Lucifer_Game.camera.follow(Player);					//Camera follow
	Lucifer_Game.input.onDown.add(GetDirection, this);	//Player Move	

	//Collision
	Lucifer_Game.physics.p2.enable(Player);
	Player.body.fixedRotation = true;
	Player.body.clearShapes();				   //Remove default Collision Box
	Player.body.addRectangle(40, 60, 0, 0);    //Only the lower part of the player Collides
	Player.body.debug = true;				   //Player Rect 표시	

	//Rect
	Attack_Rect = new Phaser.Rectangle(Player.x, Player.y, 80, 80);	
	Hit_Rect = new Phaser.Rectangle(Player.x, Player.y, 60, 60);

	//ID(닉네임)
	Player_ID = Lucifer_Game.add.text(Player.x, Player.y - 100, nickname); //Test 부분에 Player Id 가 들어가면 됨.
	Lucifer_Game.physics.enable(Player, Phaser.Physics.ARCADE);
	Player_ID.anchor.set(0.5);
	Player_ID.align = 'center';
	Player_ID.font = 'Arial';
	Player_ID.fontSize = 13;
	Player_ID.fontWeight = 'normal';	
	Player_ID.fill = '#19de65';

	//Key Setting
	player_KeyJump = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	player_KeyJump.onDown.add(PlayerJump, Lucifer_Game);
	Lucifer_Game.input.keyboard.removeKeyCapture(Phaser.Keyboard.SPACEBAR);

	player_KeySkill = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	player_KeySkill.onDown.add(PlayerSkill, Lucifer_Game);
	Lucifer_Game.input.keyboard.removeKeyCapture(Phaser.Keyboard.ONE);

	player_KeySkill2 = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.TWO);
	player_KeySkill2.onDown.add(PlayerSkill2, Lucifer_Game);
	Lucifer_Game.input.keyboard.removeKeyCapture(Phaser.Keyboard.TWO);	
	//----------------------------------------------------------------------------------------------------------
	//Player Sort
	//----------------------------------------------------------------------------------------------------------
	if(stageOne_Check == true)
	{
		Stage1_ObjectGroup.add(Player);
		Stage1_ObjectGroup.sort();
	}	
	else if(stageTwo_Check == true)
	{
		Stage2_ObjectGroup.add(Player);
		Stage2_ObjectGroup.sort();
	}	
	//----------------------------------------------------------------------------------------------------------
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
	else if(Status == Player_Status[3])
	{
		//Damage		
	}
	else if(Status == Player_Status[4])
	{
		//Dash	
		Player.loadTexture('PY_Bavarian_Dash', 0, true);
		Player.animations.play('PY_Bavarian_Dash_' + Direction, 20, true);	
	}
	else if(Status == Player_Status[5])
	{
		//Jump
		Player.loadTexture('PY_Bavarian_Jump', 0, true);
		Player.animations.play('PY_Bavarian_Jump_' + Direction, 10, true);
	}
	else if(Status == Player_Status[6])
	{
		//Skill
		Player.loadTexture('PY_Bavarian_Skill', 0, true);
		Player.animations.play('PY_Bavarian_Skill_' + Direction, 10, true);
	}
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

			//Walk / Dash Animation Change
			if(Lucifer_Game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
			{
				Animation_Change(Direction, 'Dash');				

				Lucifer_Game.physics.arcade.moveToPointer(Player, 250);
				Lucifer_Game.camera.x = Player.x + 250;
				Lucifer_Game.camera.y = Player.y + 250;
			}			
			else
			{
				Animation_Change(Direction, 'Walk');	

				Lucifer_Game.physics.arcade.moveToPointer(Player, 150);
				Lucifer_Game.camera.x = Player.x + 150;
				Lucifer_Game.camera.y = Player.y + 150;	
			}				
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
	for(var i = 0; i < golem_Group.length; ++i)
	{
		DistanceToMonster = Phaser.Math.distance(Player.x, Player.y, golem_Group.getChildAt(i).x, golem_Group.getChildAt(i).y);

		if(DistanceToMonster < 70)
		{	
			if( golem_Group.getChildAt(i).alive)
			{
				if(Phaser.Rectangle.intersects(Attack_Rect, golem_Group.getChildAt(i).golem_HitRect))
				{	
					//충돌된 상태에서 다른곳 클릭하게 되면 공격모션이 나오는것을 예외처리 해주어야 한다.
					if(Lucifer_Game.input.mousePointer.isDown)
					{
						Animation_Change(Direction, 'Attack');	
						Damage_Count(golem_Group.getChildAt(i));	

						Player_AttackCheck = true;			
					}	
					else
					{
						Player_AttackCheck = false;
					}		
				}						
			}											
		}
	}			
	
	//console.log(Player.animations.frameTotal);
	//console.log(Phaser.Rectangle.intersects(Attack_Rect, golem_HitRect));
	//---------------------------------------------------------------------------------------	
}

function Damage_Count(Golem)
{	
	//golem
	Golem.golem_Hp -= attack_point;	
}

function PlayerJump()
{
	Animation_Change(Direction, 'Jump');
	//console.log('Jump');

	Lucifer_Game.physics.arcade.moveToPointer(Player, 500);
	//Player.body.moves = true;
	//var xVector = (MousePosX - Player.x) * 2;
	//var yVector = (MousePosY - Player.y) * 2;
	//Player.body.velocity.x = xVector;
	//Player.body.velocity.y = yVector;				

	Lucifer_Game.camera.x = Player.x + 500;
	Lucifer_Game.camera.y = Player.y + 500;			
}

function PlayerSkill()
{	
	if(skill_One_Check == false)
	{
		skill_Bavarian.visible = true;

		if(skill_Bavarian.visible == true)
		{
			skill_Bavarian.animations.play('SK_Bavarian_Ani', 20, true);
			Animation_Change(Direction, 'Skill');	
		}	
	}
	
	//console.log(skill_Bavarian.frame);
}

function PlayerSkill2()
{
	if(skill_Two_Check == false)
	{
		skill_Bavarian_Two.visible = true;

		if(skill_Bavarian_Two.visible == true)
		{
			skill_Bavarian_Two.animations.play('SK_Bavarian_Ani2', 20, true);
			Animation_Change(Direction, 'Skill');
		}
	}		

	//console.log('Skill2');
}

function player_Update()
{
	//Player ID
	//---------------------------------------------------------------------------------------
	var ID_PosY = Player.position.y + 70;
	Player_ID.position.x = Player.position.x;
	Player_ID.position.y = ID_PosY;	
	//---------------------------------------------------------------------------------------	

	//Player Motion
	//---------------------------------------------------------------------------------------
	//Move
	if(UI_Stat.visible === true || uiStore.visible === true)
	{

	}else{
		PlayerMove();
		PlayerAttack();
    }
	
	//Rect
	Attack_Rect.x = Player.x;
	Attack_Rect.y = Player.y;
	Attack_Rect.centerOn(Player.x, Player.y);	

	Hit_Rect.x = Player.x;
	Hit_Rect.y = Player.y;
	Hit_Rect.centerOn(Player.x, Player.y);

	//Debug 용도
	//intersects = Phaser.Rectangle.intersection(Attack_Rect, golem_HitRect);
	//console.log(Player.x, Player.y);
	//---------------------------------------------------------------------------------------

	//Sort
	//---------------------------------------------------------------------------------------
	if(stageOne_Check == true)
	{
		Stage1_ObjectGroup.sort('y', Phaser.Group.SORT_ASCENDING);
	}
	else if(stageTwo_Check == true)
	{
		Stage2_ObjectGroup.sort('y', Phaser.Group.SORT_ASCENDING);
	}	
	//---------------------------------------------------------------------------------------	
}

function player_Render()
{
	Lucifer_Game.debug.geom(Attack_Rect, 'rgba(200, 0, 0, 0.5');
	Lucifer_Game.debug.geom(Hit_Rect, 'rgba(0, 0, 200, 0.5');
	Lucifer_Game.debug.geom(intersects, 'rgba(255, 0, 0, 1)');
};