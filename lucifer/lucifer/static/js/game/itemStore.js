var potionSprite,
    swordSprite,
    armorSprite,
    uiStore;

function itemsPreload(){

    Lucifer_Game.load.spritesheet(itemList[0].name, '../../static/images/game/item/'+ itemList[0].image_name + '.png', 150, 150);
    Lucifer_Game.load.spritesheet(itemList[1].name, '../../static/images/game/item/'+ itemList[1].image_name + '.png', 150, 150);
    Lucifer_Game.load.spritesheet(itemList[2].name, '../../static/images/game/item/'+ itemList[2].image_name + '.png', 150, 150);
	Lucifer_Game.load.spritesheet('uiStore', '../../static/images/game/UI/store/store.png', 220, 370);

};

function itemsCreate(){

	uiStore = Lucifer_Game.add.sprite(150, 270, 'uiStore');
	uiStore.anchor.setTo(0.5, 0.5);	
	uiStore.fixedToCamera = true;
    uiStore.visible = false;

    //itemStore font style
    var style = {
        font : "32px Courier",
        fill: "#00ff44",
    }

    //itemStore font style
	var itemStoreStyle = {
        font: "15px Courier", fill: "#fff", 
    };

    var itemData = [
        [ itemList[0].name ],
        [ '가격:' + itemList[0].price ],
    ];

    parsedItemData = parseList(itemData);

	//ItemLists
	//---------------------------------------------------------------------------------------
	//store_Group = Lucifer_Game.add.group();
	potionSprite = Lucifer_Game.add.sprite(100, 165, itemList[0].name);
	potionSprite.anchor.setTo(0.5, 0.5);
    potionSprite.scale.setTo(0.5, 0.5);
    potionSprite.fixedToCamera = true;
    potionSprite.visible = false;

    potionText = Lucifer_Game.add.text(potionSprite.x + 50, potionSprite.y - 20, parsedItemData.text, itemStoreStyle);
    potionText.fixedToCamera = true;
    potionText.visible = false;
    //---------------------------------------------------------------------------------------

    var itemData = [
        [ itemList[1].name ],
        [ '가격:' + itemList[1].price ],
    ];

    parsedItemData = parseList(itemData);

    swordSprite = Lucifer_Game.add.sprite(100, 240, itemList[1].name);
    swordSprite.anchor.setTo(0.5, 0.5);
    swordSprite.scale.setTo(0.5, 0.5);
    swordSprite.fixedToCamera = true;
    swordSprite.visible = false;

    swordText = Lucifer_Game.add.text(swordSprite.x + 50, swordSprite.y - 20, parsedItemData.text, itemStoreStyle);
    swordText.fixedToCamera = true;
    swordText.visible = false;
    //----------------------------------------------------------------------------------------

    var itemData = [
        [ itemList[2].name ],
        [ '가격:' + itemList[2].price ],
    ];

    parsedItemData = parseList(itemData);

    armorSprite = Lucifer_Game.add.sprite(100, 315, itemList[2].name);
    armorSprite.anchor.setTo(0.5, 0.5);
    armorSprite.scale.setTo(0.5, 0.5);
    armorSprite.fixedToCamera = true;
    armorSprite.visible = false;

    armorText = Lucifer_Game.add.text(armorSprite.x + 50, armorSprite.y - 20, parsedItemData.text, itemStoreStyle);
    armorText.fixedToCamera = true;
    armorText.visible = false;

	//---------------------------------------------------------------------------------------	
};

function itemsUpdate(){
};

function showStore(){
    if(potionSprite.visible){
        potionSprite.visible = false;
        potionText.visible = false;
        swordSprite.visible = false;
        swordText.visible = false;
        armorSprite.visible = false;
        armorText.visible = false;
        uiStore.visible = false;
    }else{
        potionSprite.visible = true;
        potionText.visible = true;
        swordSprite.visible = true;
        swordText.visible = true;
        armorSprite.visible = true;
        armorText.visible = true;
        uiStore.visible = true;
    }
};
