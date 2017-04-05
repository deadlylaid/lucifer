var statusDataText,
    keyValidTimer,
    validCheck = 1,
    hpMask,
    mpMask
//----------------------------------------------------------------------------------------------------------
var UI_Group, UI_UnderBar, UI_HpBar, UI_MpBar, UI_QuickSlot, UI_Stat, UI_Skill;	//UI 이미지 변수.
//----------------------------------------------------------------------------------------------------------
var key_Stat, Key_Skill, ui_Delay_Time; 

function ui_Preload()
{
	//UI
	Lucifer_Game.load.spritesheet('UI_UnderBar', '../../static/images/game/UI/UnderBar/UnderBar.png', 752, 123);
	Lucifer_Game.load.spritesheet('UI_HpBar', '../../static/images/game/UI/UnderBar/UI_HpBar.png', 85, 87);
	Lucifer_Game.load.spritesheet('UI_MpBar', '../../static/images/game/UI/UnderBar/UI_MpBar.png', 85, 87);
	Lucifer_Game.load.spritesheet('UI_Stat', '../../static/images/game/UI/Stat/status.png', 300, 500);
    Lucifer_Game.load.spritesheet('UI_Skill', '../../static/images/game/UI/SkillBack/Ui_Skill.png', 791, 256);
}

function ui_Create()
{
	//Uesr Interface
	//---------------------------------------------------------------------------------------
	//UI_Group = Lucifer_Game.add.group();
	UI_HpBar = Lucifer_Game.add.sprite(417, 735, 'UI_HpBar');
	UI_HpBar.anchor.setTo(0.5, 0.5);
	UI_HpBar.fixedToCamera = true;

	UI_MpBar = Lucifer_Game.add.sprite(878, 735, 'UI_MpBar');
	UI_MpBar.anchor.setTo(0.5, 0.5);
	UI_MpBar.fixedToCamera = true;	

    UI_UnderBar = Lucifer_Game.add.sprite(640, 725, 'UI_UnderBar');
    UI_UnderBar.anchor.setTo(0.5, 0.5); 
    UI_UnderBar.fixedToCamera = true;

	UI_Stat = Lucifer_Game.add.sprite(190, 275, 'UI_Stat');
	UI_Stat.anchor.setTo(0.5, 0.5);
	UI_Stat.fixedToCamera = true;
	UI_Stat.visible = false;

    UI_Skill = Lucifer_Game.add.sprite(640, 300, 'UI_Skill');
    UI_Skill.anchor.setTo(0.5, 0.5);
    UI_Skill.fixedToCamera = true;
    UI_Skill.visible = false;

    //hpMask is show real-time HP
    hpMask = Lucifer_Game.add.graphics(417, 735);
    hpMask.fixedToCamera = true;
    hpMask.beginFill(0xffffff);

    //mpMask is show real-time MP
//    mpMask = Lucifer_Game.add.graphics(878, 735);
//    mpMask.fixedToCamera = true;
//    mpMask.beginFill(0xffffff);

    //hpBar 계산을 위해서 사용
    //-------------------------------------------------
    healthPercentage = playerHealth(health, maxHealth);
    hpRate = hpBarMaskRate(healthPercentage);
    //-------------------------------------------------
    
    //hpBar 계산을 위해서 사용
    //-------------------------------------------------
//    manaPercentage = playerHealth(mana, maxMana);
//    mpRate = hpBarMaskRate(manaPercentage);
    //------------------------------------------------

    hpMask.drawRect(-66, hpRate, 85, 87);
//    mpMask.drawRect(-66, mpRate, 85, 87);

    UI_HpBar.mask = hpMask;
 //   UI_MpBar.mask = mpMask;

	//UI Key Setting
	key_Stat = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.S);
    Key_Skill = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.K);
	//---------------------------------------------------------------------------------------

	//Player Info
	//---------------------------------------------------------------------------------------
	var UI_StatText_Style = {
        font: "16px Courier", fill: "#fff", tabs: [ 100 ],
    };

    //add needed data in the list
    var statusData = [
        [ '직업', job ],
        [ '', '' ],
        [ '체력', health ],
        [ '마나', mana ],
        [ '', '' ],
        [ '힘', health ],
        [ '민첩', dexterity ],
        [ '지능', intelligence ],
        [ '', '' ],
        [ '명중률', accuracy ],
        [ '회피율', evasion ],
    ];

    //리스트로 저장된 데이터를 파싱함
    //.text를 이용하여 파싱된 string을 출력
    parsedStatusData = parseList(statusData);

    //파싱된 텍스트를 작성
    //작성되는 위치는 Ui_stat 창이 적용되는 곳을 기준으로 할 것
    statusDataText = Lucifer_Game.add.text(UI_Stat.x, UI_Stat.y - 20 , parsedStatusData.text, UI_StatText_Style);
    statusDataText.anchor.set(0.5);
    statusDataText.fixedToCamera = true;
    statusDataText.visible = false;

    //키가 눌려있는 동안 status Ui 가
    //계속 켜졌다 꺼지는 것이 반복되는 것을 막기위해
    //timer를 이용하여 조정할 것이다.
    keyValidTimer = Lucifer_Game.time.create(false);
    keyValidTimer.loop(400, timeCheck, this);
	//---------------------------------------------------------------------------------------	
}

function ui_Update()
{
    //hpBar 계산을 위해서 사용
    //-------------------------------------------------
    healthPercentage = playerHealth(health, maxHealth);
    hpRate = hpBarMaskRate(healthPercentage);
    //-------------------------------------------------
    hpMask.clear();
    hpMask.drawRect(-66, hpRate, 134, 134);    
    //console.log("현재 HP 바의 비율은" + hpRate + "입니다.");    
    UI_HpBar.mask = hpMask;

    //hpBar 계산을 위해서 사용
    //-------------------------------------------------
    //manaPercentage = playerHealth(mana, maxMana);
    //mpRate = hpBarMaskRate(manaPercentage);
    //------------------------------------------------
    //mpMask.clear();
    //mpMask.drawRect(-66, mpRate, 134, 134);    
    //UI_MpBar.mask = mpMask;

	//UI_Stat
	if(UI_Stat.visible == true)
	{
		statusDataText.position.x = UI_Stat.x - 80;
    	statusDataText.position.y = UI_Stat.y + 30;
	}		

	if(key_Stat.isDown)
	{
        //키가 눌리고 있을때 0.4초당 한번만 if문에 접근한다
        keyValidTimer.start()
        if(validCheck == 1){
            statusUi();
        }
        validCheck = 0;
	}	

    if(Key_Skill.isDown)
    {
        keyValidTimer.start();
        if(validCheck == 1)
        {
            skillUi();
        }
        validCheck = 0;
    }
}

function viewStatus()
{
	UI_Stat.visible = true;
    statusDataText.visible = true;
}

function statusUi(){
		if(UI_Stat.visible == true)
		{
			UI_Stat.visible = false;
            statusDataText.visible = false;
		}
		else
		{
			viewStatus();						
		}		
};

function viewSkill()
{
    UI_Skill.visible = true;
}

function skillUi()
{
    if(UI_Skill.visible == true)
    {
        UI_Skill.visible = false;
    }
    else
    {
        viewSkill();
    }
}

function timeCheck(){
    validCheck = 1;
}

function playerHealth(health, maxHealth){
    dividedHealth = health/maxHealth;
    lastHealth = dividedHealth
    return lastHealth*100;
}

function hpBarMaskRate(healthPercentage){
    //퍼센트에 따라서 산출되도록 수정
    if(healthPercentage > 50){
        hpRate = 43.5-(0.87*healthPercentage);
    }else if(healthPercentage < 50){
        hpRate = 0.435*(50-healthPercentage);
    }else if(healthPercentage === 50){
        hpRate = 0;
    }else{
        hpRate = 43.5;
    }
    return hpRate;
}
