var player_Hp, player_Mana, player_Exp, player_AttPoint, player_DefPoint, player_Str;
var player_Dex, player_Int, player_Accuracy, player_Evasion;
var player_NickName, player_Job, player_Level, player_NextLevel;
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
	UI_Stat.visible = false;

	//UI Set Drag
	//UI_Stat.inputEnabled = true;	
	//UI_Stat.input.enableDrag();

	//UI Key Setting
	key_Stat = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.S);
	//key_Stat.onDown.add(viewStatus, this);

	Lucifer_Game.input.keyboard.removeKeyCapture(Phaser.Keyboard.S);	
	//---------------------------------------------------------------------------------------

	//Player Info
	//---------------------------------------------------------------------------------------
	var UI_StatText_Style = {
			font: "15px Arial", fill: "#ff0044", wordWrap: true,
			wordWrapWidth: UI_Stat.width, align: "center" };	

	player_Hp = Lucifer_Game.add.text(UI_Stat.x - 80, UI_Stat.y + 30, health , UI_StatText_Style);
	player_Hp.anchor.set(0.5);	
	player_Hp.fixedToCamera = true;
	player_Hp.visible = false;

	//NickName
	player_NickName = Lucifer_Game.add.text(UI_Stat.x - 80, UI_Stat.y - 250, "OverFace", UI_StatText_Style);
	player_NickName.anchor.set(0.5);	
	player_NickName.fixedToCamera = true;
	player_NickName.visible = false;

	//Jop
	player_Job = Lucifer_Game.add.text(UI_Stat.x + 110, UI_Stat.y - 250, "Bavarian", UI_StatText_Style);
	player_Job.anchor.set(0.5);	
	player_Job.fixedToCamera = true;
	player_Job.visible = false;

	//Level
	player_Level = Lucifer_Game.add.text(UI_Stat.x - 150, UI_Stat.y - 215, "1 Lv", UI_StatText_Style);
	player_Level.anchor.set(0.5);	
	player_Level.fixedToCamera = true;
	player_Level.visible = false;

	//Experience
	player_Exp = Lucifer_Game.add.text(UI_Stat.x - 40, UI_Stat.y - 215, "0 / 100", UI_StatText_Style);
	player_Exp.anchor.set(0.5);	
	player_Exp.fixedToCamera = true;
	player_Exp.visible = false;

	//Next Level
	player_NextLevel = Lucifer_Game.add.text(UI_Stat.x + 110, UI_Stat.y - 215, "2 Lv", UI_StatText_Style);
	player_NextLevel.anchor.set(0.5);	
	player_NextLevel.fixedToCamera = true;
	player_NextLevel.visible = false;

	//Strong
	player_Str = Lucifer_Game.add.text(UI_Stat.x - 80, UI_Stat.y - 160, "10", UI_StatText_Style);
	player_Str.anchor.set(0.5);	
	player_Str.fixedToCamera = true;
	player_Str.visible = false;

	//Dexterity
	player_Dex = Lucifer_Game.add.text(UI_Stat.x - 80, UI_Stat.y - 80, "10", UI_StatText_Style);
	player_Dex.anchor.set(0.5);	
	player_Dex.fixedToCamera = true;
	player_Dex.visible = false;

	//Mana
	player_Mana = Lucifer_Game.add.text(UI_Stat.x - 80, UI_Stat.y + 110, "50", UI_StatText_Style);
	player_Mana.anchor.set(0.5);	
	player_Mana.fixedToCamera = true;
	player_Mana.visible = false;

	//Attack_Point
	player_AttPoint = Lucifer_Game.add.text(UI_Stat.x + 150, UI_Stat.y - 160, "200", UI_StatText_Style);
	player_AttPoint.anchor.set(0.5);	
	player_AttPoint.fixedToCamera = true;
	player_AttPoint.visible = false;

	//Defence_Point
	player_DefPoint = Lucifer_Game.add.text(UI_Stat.x + 150, UI_Stat.y - 125, "120", UI_StatText_Style);
	player_DefPoint.anchor.set(0.5);	
	player_DefPoint.fixedToCamera = true;
	player_DefPoint.visible = false;

	//Intelligence
	player_Int = Lucifer_Game.add.text(UI_Stat.x + 150, UI_Stat.y - 45, "10", UI_StatText_Style);
	player_Int.anchor.set(0.5);	
	player_Int.fixedToCamera = true;
	player_Int.visible = false;

	//Accuracy
	player_Accuracy = Lucifer_Game.add.text(UI_Stat.x + 80, UI_Stat.y + 35, "명중률 : 50%", UI_StatText_Style);
	player_Accuracy.anchor.set(0.5);	
	player_Accuracy.fixedToCamera = true;
	player_Accuracy.visible = false;

	//Evasion
	player_Evasion = Lucifer_Game.add.text(UI_Stat.x + 80, UI_Stat.y + 65, "회피율 : 20%", UI_StatText_Style);
	player_Evasion.anchor.set(0.5);	
	player_Evasion.fixedToCamera = true;
	player_Evasion.visible = false;
	//---------------------------------------------------------------------------------------	
}

function ui_Update()
{
	//UI_Stat
	if(UI_Stat.visible == true)
	{
		player_Hp.position.x = UI_Stat.x - 80;
    	player_Hp.position.y = UI_Stat.y + 30;
	}		

	if(key_Stat.isDown)
	{
		if(UI_Stat.visible == true)
		{
			UI_Stat.visible = false;
			player_Hp.visible = false;	
			player_Mana.visible = false;
			player_Exp.visible = false;
			player_AttPoint.visible = false;
			player_DefPoint.visible = false;
			player_Str.visible = false;
		 	player_Dex.visible = false;
		 	player_Int.visible = false;
		 	player_Accuracy.visible = false;
		 	player_Evasion.visible = false;
		 	player_NickName.visible = false;
		 	player_Job.visible = false;
		 	player_Level.visible = false;
		 	player_NextLevel.visible = false;
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
	player_Hp.visible = true;	
	player_Mana.visible = true;
	player_Exp.visible = true;
	player_AttPoint.visible = true;
	player_DefPoint.visible = true;
	player_Str.visible = true;
 	player_Dex.visible = true;
 	player_Int.visible = true;
 	player_Accuracy.visible = true;
 	player_Evasion.visible = true;
 	player_NickName.visible = true;
 	player_Job.visible = true;
 	player_Level.visible = true;
 	player_NextLevel.visible = true;
}

