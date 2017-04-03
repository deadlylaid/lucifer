var potion;

function itemsPreload(){

    Lucifer_Game.load.spritesheet(itemList[0].name, '../../static/images/game/item/'+ itemList[0].image_name + '.png', 150, 150);
    Lucifer_Game.load.spritesheet(itemList[1].name, '../../static/images/game/item/'+ itemList[1].image_name + '.png', 150, 150);
    Lucifer_Game.load.spritesheet(itemList[2].name, '../../static/images/game/item/'+ itemList[2].image_name + '.png', 150, 150);

};

function itemsCreate(){
	//ItemLists
	//---------------------------------------------------------------------------------------
	//store_Group = Lucifer_Game.add.group();
	potion = Lucifer_Game.add.sprite(190, 300, itemList[0].name);
	potion.anchor.setTo(0.5, 0.5);
    potion.fixedToCamera = true;
    potion.visible = true;
    potion.scale.setTo(0.5, 0.5);

    sword = Lucifer_Game.add.sprite(300, 300, itemList[1].name);
    sword.anchor.setTo(0.5, 0.5);
    sword.scale.setTo(0.5, 0.5);
    sword.fixedToCamera = true;
    sword.visible = true;

    armor = Lucifer_Game.add.sprite(400, 300, itemList[2].name);
    armor.anchor.setTo(0.5, 0.5);
    armor.scale.setTo(0.5, 0.5);
    armor.fixedToCamera = true;
    armor.visible = true;
 
	//---------------------------------------------------------------------------------------	
};

function itemsUpdate(){
};
