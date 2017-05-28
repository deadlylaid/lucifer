//itemStore font style
var itemStoreStyle = {
    font: "15px Courier", fill: "#fff",
};

function itemsPreload(){

    Lucifer_Game.load.spritesheet(itemList[0].name, '../../static/images/game/item/'+ itemList[0].image_name + '.png', 55, 55);
    Lucifer_Game.load.spritesheet(itemList[1].name, '../../static/images/game/item/'+ itemList[1].image_name + '.png', 55, 55);
    Lucifer_Game.load.spritesheet(itemList[2].name, '../../static/images/game/item/'+ itemList[2].image_name + '.png', 55, 55);
    Lucifer_Game.load.spritesheet(itemList[3].name, '../../static/images/game/item/'+ itemList[3].image_name + '.png', 55, 55);
    Lucifer_Game.load.spritesheet(itemList[4].name, '../../static/images/game/item/'+ itemList[4].image_name + '.png', 55, 55);
    Lucifer_Game.load.spritesheet(itemList[5].name, '../../static/images/game/item/'+ itemList[5].image_name + '.png', 55, 55);
    Lucifer_Game.load.spritesheet(itemList[6].name, '../../static/images/game/item/'+ itemList[6].image_name + '.png', 55, 55);
    Lucifer_Game.load.spritesheet(itemList[7].name, '../../static/images/game/item/'+ itemList[7].image_name + '.png', 55, 55);
    Lucifer_Game.load.spritesheet(itemList[8].name, '../../static/images/game/item/'+ itemList[8].image_name + '.png', 55, 55);

}

//potion 객체를 만들때 사용
potion = function (game, positionX, positionY, spriteKey, heal, price, index, itemStoreStyle){
    Phaser.Sprite.call(this, game, positionX, positionY, spriteKey);

    //item status
    //name = spritekey name
    this.name = spriteKey;
    this.type_is = 'potion';
    this.heal = heal;

    this.anchor.setTo(0.5, 0.5);
    this.fixedToCamera = true;
    this.visible = false;
    this.price = price;
    this.count;

    this.drinkEnable = false;
    this.isQuickSlot = false;

    var itemData = [
        [ itemList[index].name ],
        [ '' ],
        [ '      ', itemList[index].price ], ];
    parsedItemData = parseList(itemData);
    itemText = parsedItemData.text;

    this.text = game.add.text(positionX + 45, positionY - 20, itemText, itemStoreStyle);
    this.text.fixedToCamera = true;
    this.text.visible = false;

    this.numberInArray;
}

potion.prototype = Object.create(Phaser.Sprite.prototype);
potion.prototype.getVisible = function(bool){
    this.visible = bool;
    this.text.visible = bool;
}
potion.prototype.constructor = potion;

//sword 객체를 만들때 사용
sword = function (game, positionX, positionY, spriteKey, attack_point, price, index, itemStoreStyle){
    Phaser.Sprite.call(this, game, positionX, positionY, spriteKey);
    //item status
    //name = spritekey name
    this.name = spriteKey;
    this.type_is = 'weapon';
    this.attack_point = attack_point;

    this.anchor.setTo(0.5, 0.5);
    this.fixedToCamera = true;
    this.visible = false;
    this.price = price;

    var itemData = [
        [ itemList[index].name ],
        [ '' ],
        [ '      ', itemList[index].price ],
    ];
    parsedItemData = parseList(itemData);
    itemText = parsedItemData.text;

    this.text = game.add.text(positionX + 45, positionY - 20, itemText, itemStoreStyle);
    this.text.fixedToCamera = true;
    this.text.visible = false;

    this.numberInArray;
}

sword.prototype = Object.create(Phaser.Sprite.prototype);
sword.prototype.getVisible = function(bool){
    this.visible = bool;
    this.text.visible = bool;
}
sword.prototype.constructor = sword;


//armor 객체를 만들때 사용
armor = function (game, positionX, positionY, spriteKey, defence_point, price, index, itemStoreStyle){
    Phaser.Sprite.call(this, game, positionX, positionY, spriteKey);

    //item status
    //name == spritekey name
    this.name = spriteKey;
    this.type_is = 'armor';
    this.defence_point = defence_point;

    this.anchor.setTo(0.5, 0.5);
    this.fixedToCamera = true;
    this.visible = false;
    this.price = price;

    var itemData = [
            [ itemList[index].name ],
            [ '' ],
            [ '      ', itemList[index].price ],
        ]
    parsedItemData = parseList(itemData);
    itemText = parsedItemData.text;

    this.text = game.add.text(positionX + 45, positionY - 20, itemText, itemStoreStyle);
    this.text.fixedToCamera = true;
    this.text.visible = false;

    this.numberInArray;
}

armor.prototype = Object.create(Phaser.Sprite.prototype);
armor.prototype.getVisible = function(bool){
    this.visible = bool;
    this.text.visible = bool;
}
armor.prototype.constructor = armor;


function redPotionClone(positionX, positionY){
    //potion 클래스 = game / x좌표 / y좌표 / spriteKey / heal / 직업 / 폰트 스타일 /
    redPotionObject = new potion(
        Lucifer_Game, positionX, positionY, itemList[0].name, itemList[0].heal, itemList[0].price, 0
        );
    redPotionObject.text.setText(redPotionObject.name);
    redPotionObject.text.fontSize = 15;
    redPotionObject.text.fill = '#fff';

    redPotionObject.drinkEnable = true;

    Lucifer_Game.add.existing(redPotionObject);
    Lucifer_Game.physics.enable(redPotionObject, Phaser.Physics.ARCADE);

    redPotionObject.count = 10;

    redPotionObject.inputEnabled = true;
    redPotionObject.events.onInputDown.add(clickedItemInInventory, this);

    //Inventory item info ---------------------------------------------------------------

    redPotionObject.events.onInputOver.add(InvenonOverPotion, this);
    redPotionObject.events.onInputOut.add(InvenonOutPotion, this);

    Inven_Potion_One_Info = Lucifer_Game.add.sprite(720, 400, 'Potion_One_Info');
    Inven_Potion_One_Info.anchor.setTo(0.5, 0.5);
    Inven_Potion_One_Info.fixedToCamera = true;
    Inven_Potion_One_Info.visible = false;

    //Mansoo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Inven_Potion_One_Info_test = Lucifer_Game.add.sprite(720, 630, 'Potion_One_Info');
    Inven_Potion_One_Info_test.anchor.setTo(0.5, 0.5);
    Inven_Potion_One_Info_test.fixedToCamera = true;
    Inven_Potion_One_Info_test.visible = false;

    //-----------------------------------------------------------------------------------
    return redPotionObject;
}

function goodRedPotionClone(positionX, positionY){
    //potion 클래스 = game / x좌표 / y좌표 / spriteKey / heal / 직업 / 폰트 스타일 /
    redPotionObject = new potion(
        Lucifer_Game, positionX, positionY, itemList[3].name, itemList[3].heal, itemList[3].price, 3
        );
    redPotionObject.text.setText(redPotionObject.name);
    redPotionObject.text.fontSize = 15;
    redPotionObject.text.fill = '#fff';

    redPotionObject.count = 10;

    redPotionObject.drinkEnable = true;

    Lucifer_Game.add.existing(redPotionObject);
    Lucifer_Game.physics.enable(redPotionObject, Phaser.Physics.ARCADE);

    redPotionObject.inputEnabled = true;
    redPotionObject.events.onInputDown.add(clickedItemInInventory, this);

    //Inventory item info ---------------------------------------------------------------

    redPotionObject.events.onInputOver.add(InvenonOverPotion2, this);
    redPotionObject.events.onInputOut.add(InvenonOutPotion2, this);

    Inven_Potion_Two_Info = Lucifer_Game.add.sprite(720, 400, 'Potion_Two_Info');
    Inven_Potion_Two_Info.anchor.setTo(0.5, 0.5);
    Inven_Potion_Two_Info.fixedToCamera = true;
    Inven_Potion_Two_Info.visible = false;

    //Mansoo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Inven_Potion_Two_Info_test = Lucifer_Game.add.sprite(720, 630, 'Potion_Two_Info');
    Inven_Potion_Two_Info_test.anchor.setTo(0.5, 0.5);
    Inven_Potion_Two_Info_test.fixedToCamera = true;
    Inven_Potion_Two_Info_test.visible = false;
    //-----------------------------------------------------------------------------------

    return redPotionObject;
}

function bestRedPotionClone(positionX, positionY){
    //potion 클래스 = game / x좌표 / y좌표 / spriteKey / heal / 직업 / 폰트 스타일 /
    redPotionObject = new potion(
        Lucifer_Game, positionX, positionY, itemList[6].name, itemList[6].heal, itemList[6].price, 6
        );
    redPotionObject.text.setText(redPotionObject.name);
    redPotionObject.text.fontSize = 15;
    redPotionObject.text.fill = '#fff';

    redPotionObject.count = 10;

    redPotionObject.drinkEnable = true;

    Lucifer_Game.add.existing(redPotionObject);
    Lucifer_Game.physics.enable(redPotionObject, Phaser.Physics.ARCADE);

    redPotionObject.inputEnabled = true;
    redPotionObject.events.onInputDown.add(clickedItemInInventory, this);

    //Inventory item info ---------------------------------------------------------------

    redPotionObject.events.onInputOver.add(InvenonOverPotion3, this);
    redPotionObject.events.onInputOut.add(InvenonOutPotion3, this);

    Inven_Potion_Three_Info = Lucifer_Game.add.sprite(720, 400, 'Potion_Three_Info');
    Inven_Potion_Three_Info.anchor.setTo(0.5, 0.5);
    Inven_Potion_Three_Info.fixedToCamera = true;
    Inven_Potion_Three_Info.visible = false;

    //Mansoo!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Inven_Potion_Three_Info_test = Lucifer_Game.add.sprite(720, 630, 'Potion_Three_Info');
    Inven_Potion_Three_Info_test.anchor.setTo(0.5, 0.5);
    Inven_Potion_Three_Info_test.fixedToCamera = true;
    Inven_Potion_Three_Info_test.visible = false;
    //-----------------------------------------------------------------------------------

    return redPotionObject;
}

function basicSwordClone(positionX, positionY){
    basicSwordObject = new sword(
        Lucifer_Game, positionX, positionY, itemList[1].name, itemList[1].attack_point, itemList[1].price, 1
        );
    basicSwordObject.text.setText(basicSwordObject.name);
    basicSwordObject.text.fontSize = 15;
    basicSwordObject.text.fill = '#fff';

    Lucifer_Game.add.existing(basicSwordObject);
    Lucifer_Game.physics.enable(basicSwordObject, Phaser.Physics.ARCADE);

    basicSwordObject.inputEnabled = true;
    basicSwordObject.events.onInputDown.add(clickedItemInInventory, this);

    //Inventory item info ---------------------------------------------------------------

    basicSwordObject.events.onInputOver.add(InvenonOverSword, this);
    basicSwordObject.events.onInputOut.add(InvenonOutSword, this);

    Inven_Sword_One_Info = Lucifer_Game.add.sprite(720, 400, 'Sword_One_Info');
    Inven_Sword_One_Info.anchor.setTo(0.5, 0.5);
    Inven_Sword_One_Info.fixedToCamera = true;
    Inven_Sword_One_Info.visible = false;
    //-----------------------------------------------------------------------------------

    return basicSwordObject;
}

function strongSwordClone(positionX, positionY){
    basicSwordObject = new sword(
        Lucifer_Game, positionX, positionY, itemList[4].name, itemList[4].attack_point, itemList[4].price, 4
        );
    basicSwordObject.text.setText(basicSwordObject.name);
    basicSwordObject.text.fontSize = 15;
    basicSwordObject.text.fill = '#fff';

    Lucifer_Game.add.existing(basicSwordObject);
    Lucifer_Game.physics.enable(basicSwordObject, Phaser.Physics.ARCADE);

    basicSwordObject.inputEnabled = true;
    basicSwordObject.events.onInputDown.add(clickedItemInInventory, this);

    //Inventory item info ---------------------------------------------------------------

    basicSwordObject.events.onInputOver.add(InvenonOverSword2, this);
    basicSwordObject.events.onInputOut.add(InvenonOutSword2, this);

    Inven_Sword_Two_Info = Lucifer_Game.add.sprite(720, 400, 'Sword_Two_Info');
    Inven_Sword_Two_Info.anchor.setTo(0.5, 0.5);
    Inven_Sword_Two_Info.fixedToCamera = true;
    Inven_Sword_Two_Info.visible = false;
    //-----------------------------------------------------------------------------------

    return basicSwordObject;
}

function superSwordClone(positionX, positionY){
    basicSwordObject = new sword(
        Lucifer_Game, positionX, positionY, itemList[7].name, itemList[7].attack_point, itemList[7].price, 7
        );
    basicSwordObject.text.setText(basicSwordObject.name);
    basicSwordObject.text.fontSize = 15;
    basicSwordObject.text.fill = '#fff';

    Lucifer_Game.add.existing(basicSwordObject);
    Lucifer_Game.physics.enable(basicSwordObject, Phaser.Physics.ARCADE);

    basicSwordObject.inputEnabled = true;
    basicSwordObject.events.onInputDown.add(clickedItemInInventory, this);

    //Inventory item info ---------------------------------------------------------------

    basicSwordObject.events.onInputOver.add(InvenonOverSword3, this);
    basicSwordObject.events.onInputOut.add(InvenonOutSword3, this);

    Inven_Sword_Three_Info = Lucifer_Game.add.sprite(720, 400, 'Sword_Three_Info');
    Inven_Sword_Three_Info.anchor.setTo(0.5, 0.5);
    Inven_Sword_Three_Info.fixedToCamera = true;
    Inven_Sword_Three_Info.visible = false;
    //-----------------------------------------------------------------------------------

    return basicSwordObject;
}

function basicArmorClone(positionX, positionY){
    basicArmorObject = new armor(
        Lucifer_Game, positionX, positionY, itemList[2].name, itemList[2].defence_point, itemList[2].price, 2
        );
    basicArmorObject.text.setText(basicArmorObject.name);
    basicArmorObject.text.fontSize = 15;
    basicArmorObject.text.fill = '#fff';

    Lucifer_Game.add.existing(basicArmorObject);
    Lucifer_Game.physics.enable(basicArmorObject, Phaser.Physics.ARCADE);

    basicArmorObject.inputEnabled = true;
    basicArmorObject.events.onInputDown.add(clickedItemInInventory, this);

    //Inventory item info ---------------------------------------------------------------

    basicArmorObject.events.onInputOver.add(InvenonOverArmor, this);
    basicArmorObject.events.onInputOut.add(InvenonOutArmor, this);

    Inven_Armor_One_Info = Lucifer_Game.add.sprite(720, 400, 'Armor_One_Info');
    Inven_Armor_One_Info.anchor.setTo(0.5, 0.5);
    Inven_Armor_One_Info.fixedToCamera = true;
    Inven_Armor_One_Info.visible = false;
    //-----------------------------------------------------------------------------------

    return basicArmorObject;
}

function strongArmorClone(positionX, positionY){
    basicArmorObject = new armor(
        Lucifer_Game, positionX, positionY, itemList[5].name, itemList[5].defence_point, itemList[5].price, 5
        );
    basicArmorObject.text.setText(basicArmorObject.name);
    basicArmorObject.text.fontSize = 15;
    basicArmorObject.text.fill = '#fff';

    Lucifer_Game.add.existing(basicArmorObject);
    Lucifer_Game.physics.enable(basicArmorObject, Phaser.Physics.ARCADE);

    basicArmorObject.inputEnabled = true;
    basicArmorObject.events.onInputDown.add(clickedItemInInventory, this);

    //Inventory item info ---------------------------------------------------------------

    basicArmorObject.events.onInputOver.add(InvenonOverArmor2, this);
    basicArmorObject.events.onInputOut.add(InvenonOutArmor2, this);

    Inven_Armor_Two_Info = Lucifer_Game.add.sprite(720, 400, 'Armor_Two_Info');
    Inven_Armor_Two_Info.anchor.setTo(0.5, 0.5);
    Inven_Armor_Two_Info.fixedToCamera = true;
    Inven_Armor_Two_Info.visible = false;
    //-----------------------------------------------------------------------------------

    return basicArmorObject;
}

function superArmorClone(positionX, positionY){
    basicArmorObject = new armor(
        Lucifer_Game, positionX, positionY, itemList[8].name, itemList[8].defence_point, itemList[8].price, 8
        );
    basicArmorObject.text.setText(basicArmorObject.name);
    basicArmorObject.text.fontSize = 15;
    basicArmorObject.text.fill = '#fff';

    Lucifer_Game.add.existing(basicArmorObject);
    Lucifer_Game.physics.enable(basicArmorObject, Phaser.Physics.ARCADE);

    basicArmorObject.inputEnabled = true;
    basicArmorObject.events.onInputDown.add(clickedItemInInventory, this);

    //Inventory item info ---------------------------------------------------------------

    basicArmorObject.events.onInputOver.add(InvenonOverArmor3, this);
    basicArmorObject.events.onInputOut.add(InvenonOutArmor3, this);

    Inven_Armor_Three_Info = Lucifer_Game.add.sprite(720, 400, 'Armor_Three_Info');
    Inven_Armor_Three_Info.anchor.setTo(0.5, 0.5);
    Inven_Armor_Three_Info.fixedToCamera = true;
    Inven_Armor_Three_Info.visible = false;
    //-----------------------------------------------------------------------------------

    return basicArmorObject;
}

function itemsCreate(){

}

function InvenonOverPotion(potion){
    if(potion.isQuickSlot == false){
        Inven_Potion_One_Info.visible = true;
    }else if(potion.isQuickSlot == true){
        Inven_Potion_One_Info_test.visible = true;
    }
}

function InvenonOutPotion(){
    Inven_Potion_One_Info.visible = false;
    Inven_Potion_One_Info_test.visible = false;
}

function InvenonOverPotion2(){
    if(quickSlot[0].isQuickSlot == false){
        Inven_Potion_Two_Info.visible = true;
    }else if(quickSlot[0].isQuickSlot == true){
        Inven_Potion_Two_Info_test.visible = true;
    }
}

function InvenonOutPotion2(){
    Inven_Potion_Two_Info.visible = false;
    Inven_Potion_Two_Info_test.visible = false;
}

function InvenonOverPotion3(){
    if(quickSlot[0].isQuickSlot == false){
        Inven_Potion_Three_Info.visible = true;
    }else if(quickSlot[0].isQuickSlot == true){
        Inven_Potion_Three_Info_test.visible = true;
    }
}

function InvenonOutPotion3(){
    Inven_Potion_Three_Info.visible = false;
    Inven_Potion_Three_Info_test.visible = false;
}

function InvenonOverSword(){
    Inven_Sword_One_Info.visible = true;
}

function InvenonOutSword(){
    Inven_Sword_One_Info.visible = false;
}

function InvenonOverSword2(){
    Inven_Sword_Two_Info.visible = true;
}

function InvenonOutSword2(){
    Inven_Sword_Two_Info.visible = false;
}

function InvenonOverSword3(){
    Inven_Sword_Three_Info.visible = true;
}

function InvenonOutSword3(){
    Inven_Sword_Three_Info.visible = false;
}

function InvenonOverArmor(){
    Inven_Armor_One_Info.visible = true;
}

function InvenonOutArmor(){
    Inven_Armor_One_Info.visible = false;
}

function InvenonOverArmor2(){
    Inven_Armor_Two_Info.visible = true;
}

function InvenonOutArmor2(){
    Inven_Armor_Two_Info.visible = false;
}

function InvenonOverArmor3(){
    Inven_Armor_Three_Info.visible = true;
}

function InvenonOutArmor3(){
    Inven_Armor_Three_Info.visible = false;
}

