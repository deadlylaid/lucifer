// Lving System
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
		switch(Object.Name.text)
		{
		case "Golem":
			get_Exp = 1000;
			break;
		case "Andariel":
			get_Exp = 200;
			break;
		case "Council":
			get_Exp = 50;
			break;
		case "Countess":
			get_Exp = 30;
			break;
		case "Deamon":
			get_Exp = 80;
			break;
		case "Fallen Shman":
			get_Exp = 70;
			break;
		case "Wraith":
			get_Exp = 90;
			break;
		case "Diablo":
			get_Exp = 500;
			break;
		}

		player_Level_Update(Object);
		Object.ExpCheck = false;
	}
}

function player_Level_Update(Object)
{
	Object.ExpTimer.start();

	if(Object.ExpTime_Total > 1)
	{
		if(experience < 1000)
		{
			experience += get_Exp;
		}

		Object.ExpTime_Total = 0;
		Object.ExpTimer.stop();
	}
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
	else if(level == 3)
	{
		player_Skill_Two = true;
		skill_Icon_Two.visible = true;
	}
	else if(level == 5)
	{
		player_Skill_Three = true;
		skill_Icon_Three.visible = true;
	}
	else if(level == 7)
	{
		player_Skill_Four = true;
		skill_Icon_Four.visible = true;
	}
	else if(level == 9)
	{
		plyaer_Skill_Five = true;
		skill_Icon_Five.visible = true;
	}
}
