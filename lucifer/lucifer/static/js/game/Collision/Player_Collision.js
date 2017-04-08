function player_Golem_Col()
{
	for(var i = 0; i < golem_Group.length; ++i)
	{
		DistanceToMonster = Phaser.Math.distance(Player.x, Player.y, golem_Group.getChildAt(i).x, golem_Group.getChildAt(i).y);

		if(DistanceToMonster < 70)
		{	
			if(golem_Group.getChildAt(i).alive)
			{
				if(Phaser.Rectangle.intersects(Attack_Rect, golem_Group.getChildAt(i).HitRect))
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

				skill_Attack(golem_Group.getChildAt(i));						
			}											
		}
	}
}

function player_Shaman_Col()
{
	for(var i = 0; i < fallenShaman_Group.length; ++i)
	{
		DistanceToMonster = Phaser.Math.distance(Player.x, Player.y, fallenShaman_Group.getChildAt(i).x, fallenShaman_Group.getChildAt(i).y);

		if(DistanceToMonster < 70)
		{	
			if(fallenShaman_Group.getChildAt(i).alive)
			{
				if(Phaser.Rectangle.intersects(Attack_Rect, fallenShaman_Group.getChildAt(i).HitRect))
				{	
					//충돌된 상태에서 다른곳 클릭하게 되면 공격모션이 나오는것을 예외처리 해주어야 한다.
					if(Lucifer_Game.input.mousePointer.isDown)
					{
						Animation_Change(Direction, 'Attack');	
						Damage_Count(fallenShaman_Group.getChildAt(i));	

						Player_AttackCheck = true;			
					}	
					else
					{
						Player_AttackCheck = false;
					}		
				}	

				skill_Attack(fallenShaman_Group.getChildAt(i));					
			}											
		}
	}
}

function player_Deamon_Col()
{
	
}

function player_Council_Col()
{

}

function player_Countess_Col()
{

}

function player_Andariel_Col()
{
	for(var i = 0; i < andariel_Group.length; ++i)
	{
		DistanceToMonster = Phaser.Math.distance(Player.x, Player.y, andariel_Group.getChildAt(i).x, andariel_Group.getChildAt(i).y);

		if(DistanceToMonster < 70)
		{	
			if(andariel_Group.getChildAt(i).alive)
			{
				if(Phaser.Rectangle.intersects(Attack_Rect, andariel_Group.getChildAt(i).HitRect))
				{	
					//충돌된 상태에서 다른곳 클릭하게 되면 공격모션이 나오는것을 예외처리 해주어야 한다.
					if(Lucifer_Game.input.mousePointer.isDown)
					{
						Animation_Change(Direction, 'Attack');	
						Damage_Count(andariel_Group.getChildAt(i));	

						Player_AttackCheck = true;			
					}	
					else
					{
						Player_AttackCheck = false;
					}		
				}	

				skill_Attack(andariel_Group.getChildAt(i));					
			}											
		}
	}
}

function player_Diablo_Col()
{

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