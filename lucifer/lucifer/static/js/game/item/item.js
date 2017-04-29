//itemStore font style
var itemStoreStyle = {
    font: "15px Courier", fill: "#fff",
};

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

    console.log(index);

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
armor = function (game, positionX, positionY, spriteKey, defence_point, limited_job, index, itemStoreStyle){
    Phaser.Sprite.call(this, game, positionX, positionY, spriteKey);

    //item status
    //name == spritekey name
    this.name = spriteKey;
    this.type_is = 'armor';
    this.defence_point = defence_point;
    this.limited_job = limited_job;

    this.anchor.setTo(0.5, 0.5);
    this.fixedToCamera = true;
    this.visible = false;
    this.price = 10;

    var itemData = [
            [ itemList[2].name ],
            [ '' ],
            [ '      ', itemList[2].price ],
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

    Lucifer_Game.add.existing(redPotionObject);
    Lucifer_Game.physics.enable(redPotionObject, Phaser.Physics.ARCADE);

    redPotionObject.inputEnabled = true;
    redPotionObject.events.onInputDown.add(clickedItemInInventory, this);

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

    Lucifer_Game.add.existing(redPotionObject);
    Lucifer_Game.physics.enable(redPotionObject, Phaser.Physics.ARCADE);

    redPotionObject.inputEnabled = true;
    redPotionObject.events.onInputDown.add(clickedItemInInventory, this);

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

    Lucifer_Game.add.existing(redPotionObject);
    Lucifer_Game.physics.enable(redPotionObject, Phaser.Physics.ARCADE);

    redPotionObject.inputEnabled = true;
    redPotionObject.events.onInputDown.add(clickedItemInInventory, this);

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

    return basicSwordObject;
}

function basicArmorClone(positionX, positionY){
    basicArmorObject = new armor(
        Lucifer_Game, positionX, positionY, itemList[2].name, itemList[2].defence_point, itemList[2].limited_job
        );
    basicArmorObject.text.setText(basicArmorObject.name);
    basicArmorObject.text.fontSize = 15;
    basicArmorObject.text.fill = '#fff';

    Lucifer_Game.add.existing(basicArmorObject);
    Lucifer_Game.physics.enable(basicArmorObject, Phaser.Physics.ARCADE);

    basicArmorObject.inputEnabled = true;
    basicArmorObject.events.onInputDown.add(clickedItemInInventory, this);

    return basicArmorObject;
}

function itemsCreate(){

}
