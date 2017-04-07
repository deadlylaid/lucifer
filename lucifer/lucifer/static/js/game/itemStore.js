var potionSprite,
    swordSprite,
    armorSprite,
    uiStore,
    potionActive,
    swordActive,
    armorActive;

potion = function (game, positionX, positionY, spriteKey, heal, limited_job, itemText, itemStoreStyle){
    Phaser.Sprite.call(this, game, positionX, positionY, spriteKey);

    //item status
    //name = spritekey name
    this.name = spriteKey;
    this.type_is = 'potion';
    this.heal = heal;
    this.limited_job = limited_job;

	this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.5, 0.5);
    this.fixedToCamera = true;
    this.visible = false;

    this.text = game.add.text(positionX + 45, positionY - 20, itemText, itemStoreStyle);
    this.text.fixedToCamera = true;
    this.text.visible = false;
}

potion.prototype = Object.create(Phaser.Sprite.prototype);
potion.prototype.constructor = potion;

sword = function (game, positionX, positionY, spriteKey, attack_point, limited_job, itemText, itemStoreStyle){
    Phaser.Sprite.call(this, game, positionX, positionY, spriteKey);

    //item status
    //name = spritekey name
    this.name = spriteKey;
    this.type_is = 'sword';
    this.attack_point = attack_point;
    this.limited_job = limited_job;

	this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.5, 0.5);
    this.fixedToCamera = true;
    this.visible = false;

    this.text = game.add.text(positionX + 45, positionY - 20, itemText, itemStoreStyle);
    this.text.fixedToCamera = true;
    this.text.visible = false;
}

sword.prototype = Object.create(Phaser.Sprite.prototype);
sword.prototype.constructor = sword;

armor = function (game, positionX, positionY, spriteKey, defence_point, limited_job, itemText, itemStoreStyle){
    Phaser.Sprite.call(this, game, positionX, positionY, spriteKey);
    
    //item status
    //name == spritekey name
    this.name = spriteKey;
    this.type_is = 'shield';
    this.defence_point = defence_point;
    this.limited_job = limited_job;

	this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.5, 0.5);
    this.fixedToCamera = true;
    this.visible = false;

    this.text = game.add.text(positionX + 45, positionY - 20, itemText, itemStoreStyle);
    this.text.fixedToCamera = true;
    this.text.visible = false;
}

armor.prototype = Object.create(Phaser.Sprite.prototype);
armor.prototype.constructor = armor;

function itemsPreload(){

    Lucifer_Game.load.spritesheet(itemList[0].name, '../../static/images/game/item/'+ itemList[0].image_name + '.png', 150, 150);
    Lucifer_Game.load.spritesheet(itemList[1].name, '../../static/images/game/item/'+ itemList[1].image_name + '.png', 150, 150);
    Lucifer_Game.load.spritesheet(itemList[2].name, '../../static/images/game/item/'+ itemList[2].image_name + '.png', 150, 150);
	Lucifer_Game.load.spritesheet('uiStore', '../../static/images/game/UI/store/store.png', 455, 684);
	Lucifer_Game.load.spritesheet('potionTab', '../../static/images/game/UI/store/PotionTab.png', 45, 80);
	Lucifer_Game.load.spritesheet('swordTab', '../../static/images/game/UI/store/swordTab.png', 45, 80);
	Lucifer_Game.load.spritesheet('armorTab', '../../static/images/game/UI/store/armorTab.png', 45, 80);

};

function itemsCreate(){

    //Tab 이미지 추가
    //--------------------------------------------------------
    potionTab = Lucifer_Game.add.sprite(446, 100, 'potionTab');
    potionTab.anchor.setTo(0.5, 0.5);
    potionTab.scale.setTo(1.5, 1.5);
    potionTab.fixedToCamera = true;
    potionTab.visible = false;

    potionTab.inputEnabled = true;
    potionTab.events.onInputDown.add(potionStoreTab ,this);

    swordTab = Lucifer_Game.add.sprite(446, 200, 'swordTab');
    swordTab.anchor.setTo(0.5, 0.5);
    swordTab.scale.setTo(1.2, 1.2);
    swordTab.fixedToCamera = true; swordTab.visible = false; swordTab.alpha = 0.7;

    swordTab.inputEnabled = true;
    swordTab.events.onInputDown.add(swordStoreTab ,this);

    armorTab = Lucifer_Game.add.sprite(446, 295, 'armorTab');
    armorTab.anchor.setTo(0.5, 0.5);
    armorTab.scale.setTo(1.2, 1.2);
    armorTab.fixedToCamera = true;
    armorTab.visible = false;
    armorTab.alpha = 0.7;

    armorTab.inputEnabled = true;
    armorTab.events.onInputDown.add(armorStoreTab ,this);
    //--------------------------------------------------------
    //--------------------------------------------------------

	uiStore = Lucifer_Game.add.sprite(228, 330, 'uiStore');
	uiStore.anchor.setTo(0.5, 0.5);	
    uiStore.scale.setTo(0.9, 0.9);
	uiStore.fixedToCamera = true;
    uiStore.visible = false;

    //itemStore font style
    var style = {
        font : "32px Courier",
        fill: "#00ff44",
        wordWrapWidth: 100,
    };

    //itemStore font style
	var itemStoreStyle = {
        font: "15px Courier", fill: "#fff", 
    };


    //Postion -----------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    var itemData = [
        [ itemList[0].name ],
        [ '' ],
        [ '      ', itemList[0].price ],
    ];

    parsedItemData = parseList(itemData);
    itemText = parsedItemData.text;

    redPotion = new potion(Lucifer_Game, 55, 105, itemList[0].name, itemList[0].heal, itemList[2].limited_job, itemText, itemStoreStyle);
    Lucifer_Game.add.existing(redPotion);

    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------

    //Sword--------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    var itemData = [
        [ itemList[1].name ],
        [ '' ],
        [ '      ', itemList[1].price ],
    ];

    parsedItemData = parseList(itemData);
    itemText = parsedItemData.text;

    basicSword = new sword(Lucifer_Game, 55, 105, itemList[1].name, itemList[1].attack_point, itemList[2].limited_job, itemText, itemStoreStyle);
    Lucifer_Game.add.existing(basicSword);
    //----------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------

    
    //Armor--------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    var itemData = [
        [ itemList[2].name ],
        [ '' ],
        [ '      ', itemList[2].price ],
    ]
    parsedItemData = parseList(itemData);
    itemText = parsedItemData.text;

    basicArmor = new armor(Lucifer_Game, 55, 105, itemList[2].name, itemList[2].defence_point, itemList[2].limited_job, itemText, itemStoreStyle);
    Lucifer_Game.add.existing(basicArmor);
	//---------------------------------------------------------------------------------------	
	//---------------------------------------------------------------------------------------	
}

function itemsUpdate(){
}

function showStore(){
    if(uiStore.visible === true){
        potionTab.visible = false;
        swordTab.visible = false;
        armorTab.visible = false;
        redPotion.visible = false;
        redPotion.text.visible = false;
        basicSword.visible = false;
        basicSword.text.visible = false;
        basicArmor.visible = false;
        basicArmor.text.visible = false;
        uiStore.visible = false;
    }else{
        potionTab.visible = true;
        swordTab.visible = true;
        armorTab.visible = true;
        redPotion.visible = true;
        redPotion.text.visible = true;
        uiStore.visible = true;
    }
}

//클릭 시 실행
function potionStoreTab(){
    potionTab.alpha = 1;
    swordTab.alpha = 0.7;
    armorTab.alpha = 0.7;
    redPotion.visible = true;
    redPotion.text.visible = true;
    basicSword.visible = false;
    basicSword.text.visible = false;
    basicArmor.visible = false;
    basicArmor.text.visible = false;
}

function swordStoreTab(){
    potionTab.alpha = 0.7;
    swordTab.alpha = 1;
    armorTab.alpha = 0.7;
    redPotion.visible = false;
    redPotion.text.visible = false;
    basicSword.visible = true;
    basicSword.text.visible = true;
    basicArmor.visible = false;
    basicArmor.text.visible = false;
}

function armorStoreTab(){
    potionTab.alpha = 0.7;
    swordTab.alpha = 0.7;
    armorTab.alpha = 1;
    redPotion.visible = false;
    redPotion.text.visible = false;
    basicSword.visible = false;
    basicSword.text.visible = false;
    basicArmor.visible=true;
    basicArmor.text.visible = true;
}
