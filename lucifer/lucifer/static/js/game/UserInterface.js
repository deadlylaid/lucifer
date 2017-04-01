var statusDataText,
    keyValidTimer,
    validCheck = 1,
    hpMask,
    mpMask
//----------------------------------------------------------------------------------------------------------
var UI_Group, UI_UnderBar, UI_HpBar, UI_MpBar, UI_QuickSlot, UI_Stat;	//UI 이미지 변수.
//----------------------------------------------------------------------------------------------------------
var key_Stat, ui_Delay_Time; 

function ui_Preload()
{
	//UI
	Lucifer_Game.load.spritesheet('UI_UnderBar', '../../static/images/game/UI/UnderBar/Modify_UnderBar.png', 1280, 150);
	Lucifer_Game.load.spritesheet('UI_HpBar', '../../static/images/game/UI/UnderBar/Modify_HpBar.png', 134, 134);
	Lucifer_Game.load.spritesheet('UI_MpBar', '../../static/images/game/UI/UnderBar/Modify_MpBar.png', 134, 134);
	Lucifer_Game.load.spritesheet('UI_Stat', '../../static/images/game/UI/Stat/status.png', 300, 500);
}

function ui_Create()
{
	//Uesr Interface
	//---------------------------------------------------------------------------------------
	//UI_Group = Lucifer_Game.add.group();
	UI_UnderBar = Lucifer_Game.add.sprite(640, 725, 'UI_UnderBar');
	UI_UnderBar.anchor.setTo(0.5, 0.5);	
	UI_UnderBar.fixedToCamera = true;

	UI_HpBar = Lucifer_Game.add.sprite(115, 725, 'UI_HpBar');
	UI_HpBar.anchor.setTo(0.5, 0.5);
	UI_HpBar.fixedToCamera = true;

	UI_MpBar = Lucifer_Game.add.sprite(1165, 725, 'UI_MpBar');
	UI_MpBar.anchor.setTo(0.5, 0.5);
	UI_MpBar.fixedToCamera = true;	

	UI_Stat = Lucifer_Game.add.sprite(190, 275, 'UI_Stat');
	UI_Stat.anchor.setTo(0.5, 0.5);
	UI_Stat.fixedToCamera = true;
	UI_Stat.visible = false;

    //hpMask is show real-time HP
    hpMask = Lucifer_Game.add.graphics(115, 725);
    hpMask.fixedToCamera = true;
    hpMask.beginFill(0xffffff);

    //mpMask is show real-time MP
    mpMask = Lucifer_Game.add.graphics(1165, 725);
    mpMask.fixedToCamera = true;
    mpMask.beginFill(0xffffff);

    //hpBar 계산을 위해서 사용
    //-------------------------------------------------
    healthPercentage = playerHealth(health, maxHealth);
    hpRate = hpBarMaskRate(healthPercentage);
    //-------------------------------------------------

    hpMask.drawRect(-66, hpRate, 134, 134);
    mpMask.drawRect(-66, -66, 134, 134);

    UI_HpBar.mask = hpMask;
    UI_MpBar.mask = mpMask;

	//UI Key Setting
	key_Stat = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.S);

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

function timeCheck(){
    validCheck = 1;
}

function playerHealth(health, maxHealth){
    dividedHealth = health/maxHealth;
    lastHealth = dividedHealth.toFixed(2)
    return lastHealth*100;
}

function hpBarMaskRate(health){
    hpRate = -0.66*health;
    return hpRate;
}
