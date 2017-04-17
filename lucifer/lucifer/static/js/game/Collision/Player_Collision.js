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
					Damage_Count(Object);	

					Player_AttackCheck = true;	
				}	
				else
				{
					Player_AttackCheck = false;
				}		

				//Bavarian Skill Four Effect 
				skill_Bavarian_Four_Effect.x = Object.x;
				skill_Bavarian_Four_Effect.y = Object.y;	

				if(skill_Four_EffectCheck == true && Object.DeadCheck == true)
				{
					skill_Bavarian_Four_Effect.visible = false;
					skill_Bavarian_Four_Effect.animations.stop('SK_Bavarian_Effect4', true);
					skill_Bavarian_Four_Effect.visible = false;
					skill_Bavarian_Four_Effect.frame = 0;
					skill_Four_Count = 0;

					skill_Four_EffectCheck = false;
				}		
			}

			skill_Attack(Object);				
		}											
	}	
}

function Damage_Count(Monster)
{	
	Monster.Hp -= attack_point;	
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
}