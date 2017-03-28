var player_Hp, player_Mp;
//----------------------------------------------------------------------------------------------------------
var UI_Group, UI_UnderBar, UI_HpBar, UI_MpBar, UI_QuickSlot, UI_Stat;	//UI 이미지 변수.

function ui_Preload()
{
	//UI
	Lucifer_Game.load.spritesheet('UI_UnderBar', '../../static/images/game/UI/UnderBar/Modify_UnderBar.png', 1280, 150);
	Lucifer_Game.load.spritesheet('UI_HpBar', '../../static/images/game/UI/UnderBar/Modify_HpBar.png', 134, 134);
	Lucifer_Game.load.spritesheet('UI_MpBar', '../../static/images/game/UI/UnderBar/Modify_MpBar.png', 134, 134);
	Lucifer_Game.load.spritesheet('UI_Stat', '../../static/images/game/UI/Stat/Stat.png', 380, 550);
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

	//UI창 드레그 설정.
	UI_Stat.inputEnabled = true;	
	UI_Stat.input.enableDrag();
	//---------------------------------------------------------------------------------------

	//Player Info
	//---------------------------------------------------------------------------------------
	/*
	var UI_StatText_Style = {
			font: "15px Arial", fill: "#ff0044", wordWrap: true,
			wordWrapWidth: UI_Stat.width, align: "center"
	};
	*/

	var player_Hp = Lucifer_Game.add.text(0, 0, "100");
	player_Hp.anchor.set(0.5);
	player_Hp.align = 'center';
	player_Hp.font = 'Arial';
	player_Hp.fontSize = 13;
	player_Hp.fontWeight = 'normal';
	player_Hp.fill = '#ff0044';
	//---------------------------------------------------------------------------------------	
}

function ui_Update()
{
	/*
<<<<<<< HEAD
	//UI_Stat
=======
>>>>>>> bd86fd0df4df147fb2ba81d954804b480b57c54a
	player_Hp.x = UI_Stat.position.x + UI_Stat.width / 2;
	player_Hp.y = UI_Stat.position.y + UI_Stat.height / 2;
	*/
}

