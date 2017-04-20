function player_Monster_Col(Object)
{
	DistanceToMonster = Phaser.Math.distance(Player.x, Player.y, Object.x, Object.y);

	if(DistanceToMonster < 70)
	{	
		if(Object.DeadCheck == false)
		{
			if(Phaser.Rectangle.intersects(Attack_Rect, Object.HitRect))
			{	
				//충돌된 상태에서 다른곳 클릭하게 되면 공격모션이 나오는것을 예외처리 해주어야 한다.
				if(Lucifer_Game.input.mousePointer.isDown)
				{
					Animation_Change(Direction, 'Attack');	

					Player_AttackCheck = true;								
				}	
				else
				{					
					Player_AttackCheck = false;
				}		

				//Bavarian Skill Four Effect
				//---------------------------------------------------------------------------- 
				skill_Bavarian_Four_Effect.x = Object.x;
				skill_Bavarian_Four_Effect.y = Object.y;	

				if(skill_Four_EffectCheck == true && Object.DeadCheck == true)
				{
					skill_Bavarian_Four_Effect.visible = false;
					skill_Bavarian_Four_Effect.animations.stop('SK_Bavarian_Effect4', true);
					skill_Bavarian_Four_Effect.frame = 0;
					skill_Four_Count = 0;

					skill_Four_EffectCheck = false;
				}
				//----------------------------------------------------------------------------

				//Player Attack Damage(Attack Motion)
				//----------------------------------------------------------------------------
				if(Player.animations.name == 'PY_Bavarian_Attack_' + Direction)
				{
					var CurFrame = Player.animations.frame;
					var EndFrame = 0;

					if(Direction == 0)
					{
						EndFrame = 15;
					}
					else
					{
						EndFrame = 15 * (Direction + 1);
					}

					if(CurFrame + 5 < EndFrame)
					{
						Damage_Count(Object);	
					}					

					//Player Move Control
					//Attack Rect를 방향대로 움직여서 몬스터와 플레이어 간의 거리에 대한 상한점을 변수로 두어서
					//이렇게 된 것들을 충돌 처리해서 뒤로 돌아 봤을때 공격 모션이 나오지 않도록 한다.
					Player.body.velocity.x = 0;
					Player.body.velocity.y = 0;	
				}
				//----------------------------------------------------------------------------		
			}			

			//Skill Damage
			skill_Attack(Object);				
		}	
	}	
}

function Damage_Count(Monster)
{	
	var player_Attack_Dagmage = attack_point - Monster.Defence_Point;
	
	if(player_Attack_Dagmage > 0)
	{
		Monster.Hp -= player_Attack_Dagmage;
	}
	else if(player_Attack_Dagmage < 0)
	{
		Monster.Hp -= 0;
	}	 	
}

function skill_Attack(Monster)
{	
	//Bavarian Skill_Two Attack Collision
	if(skill_Bavarian_Two.visible == true)
	{
		if(Phaser.Rectangle.intersects(skill_Two_Rect, Monster.HitRect))
		{
		   	Monster.Hp -= 10;						
		}				
	}

	//Bavarian Skill_Three Attack Collision
	if(skill_Bavarian_Three.visible == true)
	{
		if(Phaser.Rectangle.intersects(skill_Three_Rect, Monster.HitRect))
		{
			Monster.Hp -= 30;
		}
	}

	//Bavarian Skill_Fore Attack Collision
	if(skill_Bavarian_Four_Effect.visible == true)
	{
		if(Phaser.Rectangle.intersects(skill_FourEffect_Rect, Monster.HitRect))
		{
			Monster.Hp -= 1;
		}
	}

	//Bavarian Skill_Five Attack Collision
	if(skill_Bavarian_Five.visible == true)
	{
		if(Phaser.Rectangle.intersects(skill_Five_Rect, Monster.HitRect))
		{
			Monster.Hp -= 100;
		}
	}
}