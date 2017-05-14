var statusDataText,
    keyValidTimer,
    validCheck = 1,
    hpMask,
    mpMask
//----------------------------------------------------------------------------------------------------------
var UI_Group, UI_UnderBar, UI_HpBar, UI_MpBar, UI_QuickSlot, UI_Stat, UI_Skill;	//UI 이미지 변수.
var UI_UnderBar_ClickCheck = false;
var UI_ExperienceBar, experienceBar_Mask;
//----------------------------------------------------------------------------------------------------------
var key_Stat, Key_Skill, ui_Delay_Time;

var UI_close;

function ui_Preload()
{
	//UI
	Lucifer_Game.load.spritesheet('UI_UnderBar', '../../static/images/game/UI/UnderBar/UnderBar.png', 1040, 134);
	Lucifer_Game.load.spritesheet('UI_HpBar', '../../static/images/game/UI/UnderBar/UI_HpBar.png', 120, 120);
	Lucifer_Game.load.spritesheet('UI_MpBar', '../../static/images/game/UI/UnderBar/UI_MpBar.png', 120, 120);
	Lucifer_Game.load.spritesheet('UI_Stat', '../../static/images/game/UI/Stat/status2.png', 496, 961);
    Lucifer_Game.load.spritesheet('UI_Skill', '../../static/images/game/UI/SkillBack/Ui_Skill.png', 791, 525);
    Lucifer_Game.load.spritesheet('UI_ExperienceBar', '../../static/images/game/UI/UnderBar/Experience_Bar.png', 520, 8);

    //Quickslot Potion
    Lucifer_Game.load.spritesheet('Quickslot_Potion1',
                                  '../../static/images/game/item/healthPotion1.png', 55, 55);
    Lucifer_Game.load.spritesheet('Quickslot_Potion2',
                                  '../../static/images/game/item/healthPotion2.png', 55, 55);
    Lucifer_Game.load.spritesheet('Quickslot_Potion3',
                                  '../../static/images/game/item/healthPotion3.png', 55, 55);
}

function ui_Create()
{
    //Uesr Interface
	//---------------------------------------------------------------------------------------
	//UI_Group = Lucifer_Game.add.group();
	UI_HpBar = Lucifer_Game.add.sprite(330, 730, 'UI_HpBar');
	UI_HpBar.anchor.setTo(0.5, 0.5);
	UI_HpBar.fixedToCamera = true;

	UI_MpBar = Lucifer_Game.add.sprite(970, 730, 'UI_MpBar');
	UI_MpBar.anchor.setTo(0.5, 0.5);
	UI_MpBar.fixedToCamera = true;

    //UI_UnderBar
    //------------------------------------------------------------------------------------------------------------
    UI_UnderBar = Lucifer_Game.add.sprite(640, 735, 'UI_UnderBar');
    UI_UnderBar.anchor.setTo(0.5, 0.5);
    UI_UnderBar.fixedToCamera = true;

    /*
    Lucifer_Game.physics.p2.enable(UI_UnderBar);
    UI_UnderBar.body.static = true;
    UI_UnderBar.body.clearShapes();
    UI_UnderBar.body.addRectangle(1040, 134, 0, 0);
    */

    UI_UnderBar.inputEnabled = true;
    UI_UnderBar.events.onInputDown.add(underBar_Down, UI_UnderBar);
    UI_UnderBar.events.onInputOut.add(underBar_Out, UI_UnderBar);
    //------------------------------------------------------------------------------------------------------------

	UI_Stat = Lucifer_Game.add.sprite(250, 360, 'UI_Stat');
	UI_Stat.anchor.setTo(0.5, 0.5);
	UI_Stat.fixedToCamera = true;
	UI_Stat.visible = false;

    UI_Skill = Lucifer_Game.add.sprite(640, 355, 'UI_Skill');
    UI_Skill.anchor.setTo(0.5, 0.5);
    UI_Skill.fixedToCamera = true;
    UI_Skill.visible = false;

    //Experience Bar
    //------------------------------------------------------------------------------------------------------------
    UI_ExperienceBar = Lucifer_Game.add.sprite(UI_UnderBar.x + 9, UI_UnderBar.y/* + 25*/, 'UI_ExperienceBar');
    UI_ExperienceBar.anchor.setTo(0.5, 0.5);
    UI_ExperienceBar.fixedToCamera = true;
    UI_ExperienceBar.visible = false;

    experienceBar_Mask = Lucifer_Game.add.graphics(UI_ExperienceBar.x, UI_ExperienceBar.y);
    experienceBar_Mask.fixedToCamera = true;
    experienceBar_Mask.beginFill(0xffffff);
    experienceBar_Mask.drawRect(-250, -4, 520, 8);
    experienceBar_Mask.endFill();

    UI_ExperienceBar.mask = experienceBar_Mask;
    //------------------------------------------------------------------------------------------------------------

    //hpMask is show real-time HP
    hpMask = Lucifer_Game.add.graphics(350, 730);
    hpMask.fixedToCamera = true;
    hpMask.beginFill(0xffffff);

    //hpBar 계산을 위해서 사용
    //-------------------------------------------------
    healthPercentage = playerHealth(health, maxHealth);
    hpRate = hpBarMaskRate(healthPercentage);
    //-------------------------------------------------

    hpMask.drawRect(-73, hpRate, 120, 120);

    UI_HpBar.mask = hpMask;

	//UI Key Setting
	key_Stat = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.S);
    Key_Skill = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.K);

    UI_close = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    //quickSlot에 등록된 물약 먹는 버튼
	keyDrink = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.D);
    keyDrink.onDown.add(potionDrink, this);
	//---------------------------------------------------------------------------------------

	//Player Info
	//---------------------------------------------------------------------------------------
	var UI_StatText_Style = {
        font: "16px Courier", fill: "#fff", tabs: [ 100 ],
    };

    //파싱된 텍스트를 작성
    //작성되는 위치는 Ui_stat 창이 적용되는 곳을 기준으로 할 것
    statusDataText = Lucifer_Game.add.text(UI_Stat.x, UI_Stat.y - 20 , updateStatus(), UI_StatText_Style);
    statusDataText.anchor.set(0.5);
    statusDataText.fixedToCamera = true;
    statusDataText.visible = false;

    //키가 눌려있는 동안 status Ui 가
    //계속 켜졌다 꺼지는 것이 반복되는 것을 막기위해
    //timer를 이용하여 조정할 것이다.
    keyValidTimer = Lucifer_Game.time.create(false);
    keyValidTimer.loop(400, timeCheck, this);
	//---------------------------------------------------------------------------------------

    //UnderBar Drink image
    Potion_1 = Lucifer_Game.add.sprite(727, 762, 'Quickslot_Potion1');
    Potion_1.anchor.setTo(0.5, 0.5);
    Potion_1.scale.setTo(0.7, 0.7);
    Potion_1.fixedToCamera = true;
    Potion_1.visible = false;

    Potion_2 = Lucifer_Game.add.sprite(727, 762, 'Quickslot_Potion2');
    Potion_2.anchor.setTo(0.5, 0.5);
    Potion_2.scale.setTo(0.7, 0.7);
    Potion_2.fixedToCamera = true;
    Potion_2.visible = false;

    Potion_3 = Lucifer_Game.add.sprite(727, 762, 'Quickslot_Potion3');
    Potion_3.anchor.setTo(0.5, 0.5);
    Potion_3.scale.setTo(0.7, 0.7);
    Potion_3.fixedToCamera = true;
    Potion_3.visible = false;

    //퀵슬롯에 들어가 있는 포션을 여기서 호출한다.
    //그 이유는 z-index가 오브젝트를 생성하는 순서에 따라 결정되기 때문에
    //먼저 호출했다간 UI창 밑에 이미지가 덮혀버리는 현상이 일어난다.
    changeServerListToClientListQuickSlot();
}

function underBar_Down()
{
    UI_UnderBar_ClickCheck = true;
}

function underBar_Out()
{
    UI_UnderBar_ClickCheck = false;
}

function ui_Update()
{
    //hpBar 계산을 위해서 사용
    //-------------------------------------------------
    healthPercentage = playerHealth(health, maxHealth);
    hpRate = hpBarMaskRate(healthPercentage);
    //-------------------------------------------------
    hpMask.clear();
    hpMask.beginFill(0xffffff);
    hpMask.drawRect(-73, hpRate, 120, 120);
    hpMask.endFill();
    //console.log("현재 HP 바의 비율은" + hpRate + "입니다.");
    UI_HpBar.mask = hpMask;

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

        //다른 UI창 닫기
        //Quest
        if(UI_Quest.visible == true)
        {
            QuestUi();
        }

        //Inventory
        if(uiInventory.visible == true)
        {
            invenUi();
        }

        //Skill
        if(UI_Skill.visible == true)
        {
            skillUi();
        }

        //Info
        if(UI_Info.visible == true)
        {
            InfoUi();
        }

        //Store
        if(uiStore.visible == true)
        {
            showStore();
        }
	}

    if(Key_Skill.isDown)
    {
        keyValidTimer.start();
        if(validCheck == 1)
        {
            skillUi();
        }
        validCheck = 0;

        //다른 UI창 닫기
        //Quest
        if(UI_Quest.visible == true)
        {
            QuestUi();
        }

        //Inventory
        if(uiInventory.visible == true)
        {
            invenUi();
        }

        //Stat
        if(UI_Stat.visible == true)
        {
            statusUi();
        }

        //Info
        if(UI_Info.visible == true)
        {
            InfoUi();
        }

        //Store
        if(uiStore.visible == true)
        {
            showStore();
        }
    }

    if(UI_close.isDown)
    {
        //Quest
        if(UI_Quest.visible == true)
        {
            QuestUi();
        }

        //Inventory
        if(uiInventory.visible == true)
        {
            invenUi();
        }

        //Stat
        if(UI_Stat.visible == true)
        {
            statusUi();
        }

        //Skill
        if(UI_Skill.visible == true)
        {
            skillUi();
        }

        //Info
        if(UI_Info.visible == true)
        {
            InfoUi();
        }

        //Store
        if(uiStore.visible == true)
        {
            showStore();
        }

        //Tyreal Talk box
        /*if(Talkbox.visible == true)
        {
            Talkbox.visible = false;
            text_talk.visible = false;
            Exit_button.visible = false;
            Credits_button.visible = false;
        }*/

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
        hpRate = 60 - (1.14 * healthPercentage);;
    }else if(healthPercentage < 50 && healthPercentage > 0){
        hpRate = 0.97 * (60 - healthPercentage);
    }else if(healthPercentage === 50){
        hpRate = 0;
    }else{
        hpRate = 58;
    }

    return hpRate;
}

//add needed data in the list
function updateStatus(){
    var statusData = [
        [ '', '' ],
        [ '', '' ],
        [ '', '' ],
        [ '', job ],
        [ '', '' ],
        [ '', '' ],
        [ '', health ],
        [ '', '' ],
        [ '', mana ],
        [ '', '' ],
        [ '', '' ],
        [ '', health ],
        [ '', '' ],
        [ '', dexterity ],
        [ '', '' ],
        [ '', intelligence ],
        [ '', '' ],
        [ '', '' ],
        [ '', accuracy ],
        [ '', '' ],
        [ '', evasion ],
    ];

    //리스트로 저장된 데이터를 파싱함
    //.text를 이용하여 파싱된 string을 출력
    parsedStatusData = parseList(statusData);
    return parsedStatusData.text;
}

