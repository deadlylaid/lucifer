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
	//바바리안 스킬2 공격 충돌 처리.
	if(skill_Bavarian_Two.visible == true)
	{
		if(Phaser.Rectangle.intersects(skill_Two_Rect, Monster.HitRect))
		{
		   	Monster.Hp -= 10;						
		}				
	}	
}