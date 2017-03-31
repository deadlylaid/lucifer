var statusDataText
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
	//임의로 Player HP 정해줌(최영준)
	player_Hp = 200;

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

	//UI Set Drag
	//UI_Stat.inputEnabled = true;	
	//UI_Stat.input.enableDrag();

	//UI Key Setting
	key_Stat = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.S);
	//key_Stat.onDown.add(viewStatus, this);

	//---------------------------------------------------------------------------------------

	//Player Info
	//---------------------------------------------------------------------------------------
	var UI_StatText_Style = {
        font: "16px Courier", fill: "#fff", tabs: [ 100 ],
    };

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
    statusDataText = Lucifer_Game.add.text(UI_Stat.x, UI_Stat.y - 20 , parsedStatusData.text, UI_StatText_Style);
    statusDataText.anchor.set(0.5);
    statusDataText.fixedToCamera = true;
    statusDataText.visible = false;
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
		if(UI_Stat.visible == true)
		{
			UI_Stat.visible = false;
            statusDataText.visible = false;
		}
		else
		{
			//var tween = Lucifer_Game.add.tween(UI_Stat).to({alpha: 1}, 1500, "Linear", true, 1500);
			//tween.onStart.add(viewStatus);
			viewStatus();						
		}		
	}	
}

function viewStatus()
{
	UI_Stat.visible = true;
    statusDataText.visible = true;
}
