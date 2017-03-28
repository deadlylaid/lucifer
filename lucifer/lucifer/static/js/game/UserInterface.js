var player_Hp, player_Mp;
//----------------------------------------------------------------------------------------------------------
var UI_Group, UI_UnderBar, UI_HpBar, UI_MpBar, UI_QuickSlot, UI_Stat;	//UI 이미지 변수.
//----------------------------------------------------------------------------------------------------------
var key_Stat; 

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
	key_Stat.onDown.add(viewStatus, this);

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

	console.log(KeyCheck);
}

var KeyCheck = false;
function viewStatus()
{
	UI_Stat.visible = true;
	player_Hp.visible = true;	

	KeyCheck = true;
}

