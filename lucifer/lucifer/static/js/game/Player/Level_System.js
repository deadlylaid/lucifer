// Lving System
//----------------------------------------------------------------------------------------------
var get_Exp = 0;
var Player_levelUp_Check = false;

function check_Monster_Dead(Object)
{
	if(Object.ExpCheck == true)
	{
		switch(Object.Name.text)
		{
		case "Golem":
			get_Exp = 100;
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
	if(level <= 10)
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
	else{}
}

function player_Level_Up()
{
	if(experience >= 1000)
	{
		//Level Up Stat
		player_State_Up();
		Player_levelUp_Check = true;
	}
}
