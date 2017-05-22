// User Interface Sound
//-------------------------------------------------------------------------------------
var sound_WindowOpen, sound_WindowClose, sound_ButtonClick, sound_ItemEquipment;
var sound_BuyItem, sound_QuestComplete, sound_PotionDrink;
//-------------------------------------------------------------------------------------

function ui_Sound_Preload()
{
	Lucifer_Game.load.audio('Window_Open', '../../static/sound/UI/window_Open.wav');
	Lucifer_Game.load.audio('Window_Close', '../../static/sound/UI/window_Close.wav');
	Lucifer_Game.load.audio('Button_Click', '../../static/sound/UI/button_Click.wav');
	Lucifer_Game.load.audio('Item_Equipment', '../../static/sound/UI/item_Equip.wav');
	Lucifer_Game.load.audio('Buy_Item', '../../static/sound/UI/buy_Item.wav');
	Lucifer_Game.load.audio('Quest_Complete', '../../static/sound/UI/quest_Complete.wav');
	Lucifer_Game.load.audio('Potion_Drink', '../../static/sound/UI/potion_Drink.wav');
}

function ui_Sound_Create()
{
	sound_WindowOpen = Lucifer_Game.add.audio('Window_Open', 0.7, false);
	sound_WindowClose = Lucifer_Game.add.audio('Window_Close', 0.7, false);
	sound_ButtonClick = Lucifer_Game.add.audio('Button_Click', 0.5, false);
	sound_ItemEquipment = Lucifer_Game.add.audio('Item_Equipment', 0.5, false);
	sound_BuyItem = Lucifer_Game.add.audio('Buy_Item', 0.5, false);
	sound_QuestComplete = Lucifer_Game.add.audio('Quest_Complete', 0.4, false);
	sound_PotionDrink = Lucifer_Game.add.audio('Potion_Drink', 0.3, false);

	sound_WindowOpen.play();
	sound_WindowOpen.stop();
	sound_WindowClose.play();
	sound_WindowClose.stop();	
	sound_ButtonClick.play();
	sound_ButtonClick.stop();
	sound_ItemEquipment.play();
	sound_ItemEquipment.stop();
	sound_BuyItem.play();
	sound_BuyItem.stop();
	sound_QuestComplete.play();
	sound_QuestComplete.stop();
	sound_PotionDrink.play();
	sound_PotionDrink.stop();
}