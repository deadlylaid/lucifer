//itemStore font style
var itemStoreStyle = {
    font: "15px Courier", fill: "#fff", 
};

//potion 객체를 만들때 사용
potion = function (game, positionX, positionY, spriteKey, heal, limited_job, itemStoreStyle){
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

    var itemData = [
        [ itemList[0].name ],
        [ '' ],
        [ '      ', itemList[0].price ],
    ];
    parsedItemData = parseList(itemData);
    itemText = parsedItemData.text;

    this.text = game.add.text(positionX + 45, positionY - 20, itemText, itemStoreStyle);
    this.text.fixedToCamera = true;
    this.text.visible = false;
}

potion.prototype = Object.create(Phaser.Sprite.prototype);
potion.prototype.getVisible = function(bool){
    this.visible = bool;
    this.text.visible = bool;
}
potion.prototype.constructor = potion;


//sword 객체를 만들때 사용 
sword = function (game, positionX, positionY, spriteKey, attack_point, limited_job, itemStoreStyle){
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

    var itemData = [
        [ itemList[1].name ],
        [ '' ],
        [ '      ', itemList[1].price ],
    ];
    parsedItemData = parseList(itemData);
    itemText = parsedItemData.text;

    this.text = game.add.text(positionX + 45, positionY - 20, itemText, itemStoreStyle);
    this.text.fixedToCamera = true;
    this.text.visible = false;
}

sword.prototype = Object.create(Phaser.Sprite.prototype);
sword.prototype.getVisible = function(bool){
    this.visible = bool;
    this.text.visible = bool;
}
sword.prototype.constructor = sword;


//armor 객체를 만들때 사용 
armor = function (game, positionX, positionY, spriteKey, defence_point, limited_job, itemStoreStyle){
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
        Lucifer_Game, positionX, positionY, itemList[0].name, itemList[0].heal, itemList[0].limited_job
        );
    redPotionObject.text.setText(redPotionObject.name);
    redPotionObject.text.fontSize = 15; 
    redPotionObject.text.fill = '#fff';

    Lucifer_Game.physics.p2.enable(redPotionObject);    
    redPotionObject.body.clearShapes();
    redPotionObject.body.addRectangle(30, 30, 0, 0);   
    redPotionObject.body.debug = true;
    redPotionObject.body.static = true; 
    
    Lucifer_Game.add.existing(redPotionObject);    

    redPotionObject.inputEnabled = true;
    redPotionObject.events.onInputDown.add(clickItem, this);

    return redPotionObject;
}

function basicSwordClone(positionX, positionY){
    basicSwordObject = new sword(
        Lucifer_Game, positionX, positionY, itemList[1].name, itemList[1].attack_point, itemList[1].limited_job
        );
    basicSwordObject.text.setText(basicSwordObject.name);
    basicSwordObject.text.fontSize = 15;
    basicSwordObject.text.fill = '#fff';
    Lucifer_Game.add.existing(basicSwordObject);

    Lucifer_Game.physics.p2.enable(basicSwordObject);
    basicSwordObject.body.addRectangle();
    basicSwordObject.body.static = true;

    basicSwordObject.inputEnabled = true;
    basicSwordObject.events.onInputDown.add(clickItem, this);

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

    Lucifer_Game.physics.p2.enable(basicArmorObject);
    basicArmorObject.body.addRectangle();
    basicArmorObject.body.static = true;

    basicArmorObject.inputEnabled = true;
    basicArmorObject.events.onInputDown.add(clickItem, this);

    return basicArmorObject;
}

function itemsCreate(){
	
}