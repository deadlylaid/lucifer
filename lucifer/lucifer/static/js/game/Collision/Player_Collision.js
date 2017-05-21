var Player_AttackEnd_Check = false;

function player_Monster_Col(Object)
{
	DistanceToMonster = Phaser.Math.distance(Player.x, Player.y, Object.x, Object.y);

	if(Object.Name.text == 'Lucifer')
	{
		if(DistanceToMonster < 95)
		{
			if(Object.DeadCheck == false)
			{
				if(Phaser.Rectangle.intersects(Attack_Rect, Object.HitRect))
				{
					//Player Attack motion
					if(Lucifer_Game.input.activePointer.leftButton.isDown && Player_AttackCheck == false)
					{
						if(skill_Bavarian_Three.visible == false)
						{
							Animation_Change(Direction, 'Attack');	

							//Sound Play
							player_Sound_Weapon_Play();																									
						}										
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
						//Animation Control / 잘 안된다.
						if(Lucifer_Game.input.activePointer.leftButton.isDown)
						{
							Player_AttackCheck = true;
						}

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

						if(CurFrame == EndFrame)
						{
							Damage_Count(Object);

							//Monster Blood Effect
							if(Object.blood_Effect)
							{
								Object.blood_Effect.visible = true;
								Object.blood_Effect.animations.play('blood_Ani', 10, true);
							}
						}

						//Player Move Control
						Player.body.velocity.x = 0;
						Player.body.velocity.y = 0;

						//Lucifer Move Control
						Object.body.velocity.x = 0;
						Object.body.velocity.y = 0;
					}
					//----------------------------------------------------------------------------
				}

				//Skill Damage
				skill_Attack(Object);
			}
		}
	}
	else
	{
		if(DistanceToMonster < 70)
		{
			if(Object.DeadCheck == false)
			{
				if(Phaser.Rectangle.intersects(Attack_Rect, Object.HitRect))
				{
					//Player Attack motion
					if(Lucifer_Game.input.activePointer.leftButton.isDown && Player_AttackCheck == false)
					{
						if(skill_Bavarian_Three.visible == false)
						{
							Animation_Change(Direction, 'Attack');		

							//Sound Play
							player_Sound_Weapon_Play();					
						}
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
						//Animation Control 
						if(Lucifer_Game.input.activePointer.leftButton.isDown)
						{
							Player_AttackCheck = true;
						}

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

						if(CurFrame == EndFrame)
						{
							Damage_Count(Object);

							//Monster Blood Effect
							if(Object.blood_Effect)
							{
								Object.blood_Effect.visible = true;
								Object.blood_Effect.animations.play('blood_Ani', 10, true);
							}							
						}

						//Player Move Control
						Player.body.velocity.x = 0;
						Player.body.velocity.y = 0;

						//Monster Move Control(몬스터 튕기는 형상 방지용)
						Object.body.velocity.x = 0;
						Object.body.velocity.y = 0;
					}
					//----------------------------------------------------------------------------
				}						

				//Skill Damage
				skill_Attack(Object);
			}

			//Attack Delay Timer Control
			/*
			Player_DelayTimer.start();

			if(Player_Time_Total > 1)
			{
				Player_AttackCheck = false;
				Player_Time_Total = 0;
			}
			*/
		}		
	}

	if(Player.animations.name != 'PY_Bavarian_Attack_' + Direction)
	{
		//Sound Stop
		player_Sound_Weapon_Stop();			
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
		Monster.Hp -= (attack_point * 0.01);
	}
}

function skill_Attack(Monster)
{
	//Bavarian Skill_Two Attack Collision
	for(var i = 0; i < learnedSkill.length; ++i)
	{
		if(skill_Bavarian_Two.visible == true)
		{
			if(Phaser.Rectangle.intersects(skill_Two_Rect, Monster.HitRect))
			{
				var CurFrame = skill_Bavarian_Two.animations.frame;
				var EndFrame = 14;

				if(CurFrame == EndFrame)
				{
					Monster.Hp -= learnedSkill[1].damage;
				}
			}
		}

		//Bavarian Skill_Three Attack Collision
		if(skill_Bavarian_Three.visible == true)
		{
			if(Phaser.Rectangle.intersects(skill_Three_Rect, Monster.HitRect))
			{
				var CurFrame = skill_Bavarian_Three.animations.frame;
				var EndFrame = 7;

				if(CurFrame + 5 == EndFrame)
				{
					Monster.Hp -= learnedSkill[2].damage;
				}
			}
		}

		//Bavarian Skill_Fore Attack Collision
		if(skill_Bavarian_Four_Effect.visible == true)
		{
			if(Phaser.Rectangle.intersects(skill_FourEffect_Rect, Monster.HitRect))
			{
				var CurFrame = skill_Bavarian_Four_Effect.animations.frame;
				var EndFrame = 19;

				if(CurFrame == EndFrame)
				{
					Monster.Hp -= learnedSkill[3].damage;
				}
			}
		}

		//Bavarian Skill_Five Attack Collision
		if(skill_Bavarian_Five.visible == true)
		{
			if(Phaser.Rectangle.intersects(skill_Five_Rect, Monster.HitRect))
			{
				var CurFrame = skill_Bavarian_Five.animations.frame;
				var EndFrame = 31;

				if(CurFrame == EndFrame)
				{
					Monster.Hp -= learnedSkill[4].damage;
				}
			}
		}
	}
}
