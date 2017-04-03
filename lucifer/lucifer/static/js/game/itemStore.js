var potion;

function itemsPreload(){
<<<<<<< HEAD
Lucifer_Game.load.spritesheet(itemList[0].name, '../../static/images/game/item/'+ itemList[0].image_name + '.png', 150, 150); Lucifer_Game.load.spritesheet(itemList[1].name, '../../static/images/game/item/'+ itemList[1].image_name + '.png', 150, 150);
=======

    Lucifer_Game.load.spritesheet(itemList[0].name, '../../static/images/game/item/'+ itemList[0].image_name + '.png', 150, 150);
    Lucifer_Game.load.spritesheet(itemList[1].name, '../../static/images/game/item/'+ itemList[1].image_name + '.png', 150, 150);
>>>>>>> 132560b9df15e471c7c6dfd5fa83fc0316e72435
    Lucifer_Game.load.spritesheet(itemList[2].name, '../../static/images/game/item/'+ itemList[2].image_name + '.png', 150, 150);

};

function itemsCreate(){
	//ItemLists
	//---------------------------------------------------------------------------------------
	//store_Group = Lucifer_Game.add.group();
	potionSprite = Lucifer_Game.add.sprite(190, 300, itemList[0].name);
	potionSprite.anchor.setTo(0.5, 0.5);
    potionSprite.fixedToCamera = true;
    potionSprite.visible = true;
    potionSprite.scale.setTo(0.5, 0.5);

    swordSprite = Lucifer_Game.add.sprite(300, 300, itemList[1].name);
    swordSprite.anchor.setTo(0.5, 0.5);
    swordSprite.scale.setTo(0.5, 0.5);
    swordSprite.fixedToCamera = true;
    swordSprite.visible = true;

    armorSprite = Lucifer_Game.add.sprite(400, 300, itemList[2].name);
    armorSprite.anchor.setTo(0.5, 0.5);
    armorSprite.scale.setTo(0.5, 0.5);
    armorSprite.fixedToCamera = true;
    armorSprite.visible = true;
 
	//---------------------------------------------------------------------------------------	
};

function itemsUpdate(){
};
