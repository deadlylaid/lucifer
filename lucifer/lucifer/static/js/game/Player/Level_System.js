//Lving System
//----------------------------------------------------------------------------------------------
var get_Exp = 0;
var Player_levelUp_Check = false;
//----------------------------------------------------------------------------------------------
//Skill Level System
//----------------------------------------------------------------------------------------------
var player_Skill_One = false, player_Skill_Two = false, player_Skill_Three = false;
var player_Skill_Four = false, plyaer_Skill_Five = false;
//----------------------------------------------------------------------------------------------
function check_Monster_Dead(Object)
{
    if(Object.ExpCheck == true)
	{
		player_Level_Update(Object);

		Object.ExpCheck = false;
	}
	else if(Object.ExpCheck == false)
	{
		//Object.ExpTimer.stop();
		Object.ExpTime_Total = 0;
	}
}

function player_Level_Update(Object)
{
	if(Object.ExpCheck == true)
	{
		Object.ExpTimer.start();
	}

	if(Object.GetExpCheck == false)
	{
		if(Object.ExpTime_Total < 1)
		{
			if(experience < 1000)
			{
				experience += Object.Experience / 2;				
			}

			Object.GetExpCheck = true;
		}
	}
	else if(Object.GetExpCheck == true)
	{
		if(Object.ExpTime_Total < 2)
		{
			if(experience < 1000)
			{
				experience += Object.Experience;			
			}
		}
	}

	player_Experience_Mask();
}

function player_Experience(experience)
{
	var divided_Experience = experience / 1000;
	var result_Experience = divided_Experience;

	return result_Experience * 100;
}

function player_Experience_Rate(Experience_Percentage)
{
	var experience_Rate;

	if(Experience_Percentage > 0)
	{
		experience_Rate = (5.2 * Experience_Percentage);
	}
	else if(Experience_Percentage <= 0)
	{
		experience_Rate = 0;
	}

	return experience_Rate;
}

function player_Experience_Mask()
{
	var experience_Percentage = player_Experience(experience);
	var experience_Rate = player_Experience_Rate(experience_Percentage);

	experienceBar_Mask.clear();
	experienceBar_Mask.beginFill(0xffffff);
	experienceBar_Mask.drawRect(-250, -4, experience_Rate, 8);
	experienceBar_Mask.endFill();

	UI_ExperienceBar.visible = true;
	UI_ExperienceBar.mask = experienceBar_Mask;

	//console.log(experience_Percentage, experience_Rate);
	//console.log(experience);
}

function player_State_Up()
{
	//Level Up 될시에 Skill Level 을 자동으로 올릴 것인가 말것인가를 정해서 적용 시켜야 된다.
	if(level < 10)
	{
		experience = 0;
		level += 1;
		strong += 30;
		dexterity += 10;
		intelligence += 10;
    	defence_point += 7;
    	accuracy += 3;
    	evasion += 12;

    	health += 70;
    	maxHealth += 70;
    	health = maxHealth;

    	//무기상수 * ((4 * 힘) + (체력총합 * 0.1)) * (무기공격력 * 0.01)
    	attack_point = 1.29 * ( (4 * strong) + (maxHealth * 0.1) ) * (10 * 0.01);

    	//Skill Damage Up
    	player_skillDamage_Up();
	}
	else
	{
		return;
	}
    //스테이터스창도 같이 업데이트
    statusDataText.setText(updateStatus());
    gameSave();
}

function player_Level_Up()
{
	if(experience >= 1000)
	{
		//Level Up Stat
		player_State_Up();
		Player_levelUp_Check = true;
        Player_ID.setText("Lv." + level + "   " + nickname);
	}
}

function player_LearnedSkill()
{
	//Level Up 할시에 Skill 열리게 하는 함수.
	if(level == 1)
	{
		player_Skill_One = true;
		skill_Icon_One.visible = true;
	}
	else if(level == 2)
	{
		player_Skill_One = true;
		skill_Icon_One.visible = true;
	}
	else if(level == 3)
	{
		player_Skill_One = true;
		player_Skill_Two = true;

		skill_Icon_One.visible = true;
		skill_Icon_Two.visible = true;
	}
	else if(level == 4)
	{
		player_Skill_One = true;
		player_Skill_Two = true;

		skill_Icon_One.visible = true;
		skill_Icon_Two.visible = true;
	}
	else if(level == 5)
	{
		player_Skill_One = true;
		player_Skill_Two = true;
		player_Skill_Three = true;

		skill_Icon_One.visible = true;
		skill_Icon_Two.visible = true;
		skill_Icon_Three.visible = true;
	}
	else if(level == 6)
	{
		player_Skill_One = true;
		player_Skill_Two = true;
		player_Skill_Three = true;

		skill_Icon_One.visible = true;
		skill_Icon_Two.visible = true;
		skill_Icon_Three.visible = true;
	}
	else if(level == 7)
	{
		player_Skill_One = true;
		player_Skill_Two = true;
		player_Skill_Three = true;
		player_Skill_Four = true;

		skill_Icon_One.visible = true;
		skill_Icon_Two.visible = true;
		skill_Icon_Three.visible = true;
		skill_Icon_Four.visible = true;
	}
	else if(level == 8)
	{
		player_Skill_One = true;
		player_Skill_Two = true;
		player_Skill_Three = true;
		player_Skill_Four = true;

		skill_Icon_One.visible = true;
		skill_Icon_Two.visible = true;
		skill_Icon_Three.visible = true;
		skill_Icon_Four.visible = true;
	}
	else if(level == 9)
	{
		player_Skill_One = true;
		player_Skill_Two = true;
		player_Skill_Three = true;
		player_Skill_Four = true;
		plyaer_Skill_Five = true;

		skill_Icon_One.visible = true;
		skill_Icon_Two.visible = true;
		skill_Icon_Three.visible = true;
		skill_Icon_Four.visible = true;
		skill_Icon_Five.visible = true;
	}
	else if(level == 10)
	{
		player_Skill_One = true;
		player_Skill_Two = true;
		player_Skill_Three = true;
		player_Skill_Four = true;
		plyaer_Skill_Five = true;

		skill_Icon_One.visible = true;
		skill_Icon_Two.visible = true;
		skill_Icon_Three.visible = true;
		skill_Icon_Four.visible = true;
		skill_Icon_Five.visible = true;
	}
}

function player_skillDamage_Up()
{
	switch(level)
	{
	case 1:
		break;
	case 2:
		learnedSkill[0].damage = 12;
		break;
	case 3:
		learnedSkill[0].damage = 14;
		break;
	case 4:
		learnedSkill[0].damage = 16;
		learnedSkill[1].damage = 12;
		break;
	case 5:
		learnedSkill[0].damage = 18;
		learnedSkill[1].damage = 15;
		break;
	case 6:
		learnedSkill[0].damage = 20;
		learnedSkill[1].damage = 20;
		learnedSkill[2].damage = 25;
		break;
	case 7:
		learnedSkill[0].damage = 22;
		learnedSkill[1].damage = 23;
		learnedSkill[2].damage = 35;
		break;
	case 8:
		learnedSkill[0].damage = 24;
		learnedSkill[1].damage = 29;
		learnedSkill[2].damage = 45;
		learnedSkill[3].damage = 10;
		break;
	case 9:
		learnedSkill[0].damage = 26;
		learnedSkill[1].damage = 35;
		learnedSkill[2].damage = 55;
		learnedSkill[3].damage = 15;
		break;
	case 10:
		learnedSkill[0].damage = 30;
		learnedSkill[1].damage = 40;
		learnedSkill[2].damage = 65;
		learnedSkill[3].damage = 20;
		learnedSkill[4].damage = 200;
		break;
	}
}
