var uiStore,
    selectedItem = null,
    invenKeyTimer,
    invenKeyValidCheck = 1;

function itemsPreload(){

    Lucifer_Game.load.spritesheet(itemList[0].name, '../../static/images/game/item/'+ itemList[0].image_name + '.png', 150, 150);
    Lucifer_Game.load.spritesheet(itemList[1].name, '../../static/images/game/item/'+ itemList[1].image_name + '.png', 150, 150);
    Lucifer_Game.load.spritesheet(itemList[2].name, '../../static/images/game/item/'+ itemList[2].image_name + '.png', 150, 150);
    Lucifer_Game.load.spritesheet('uiStore', '../../static/images/game/UI/store/store.png', 455, 684);
    Lucifer_Game.load.spritesheet('potionTab', '../../static/images/game/UI/store/PotionTab.png', 45, 80);
    Lucifer_Game.load.spritesheet('swordTab', '../../static/images/game/UI/store/swordTab.png', 45, 80);
    Lucifer_Game.load.spritesheet('armorTab', '../../static/images/game/UI/store/armorTab.png', 45, 80);
    Lucifer_Game.load.spritesheet('saleTab', '../../static/images/game/UI/store/sale.png', 45, 80);
    Lucifer_Game.load.spritesheet('inven', '../../static/images/game/UI/Inventory/inventory.png', 354, 716);

};

function itemStoreCreate(){

    //Tab 이미지 추가
    //--------------------------------------------------------

    //itemStore-----------------------------------------------
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

    saleTab = Lucifer_Game.add.sprite(445, 400, 'saleTab');
    saleTab.anchor.setTo(0.5, 0.5);
    saleTab.scale.setTo(1.2, 1.2);
    saleTab.fixedToCamera = true;
    saleTab.visible = false;
    saleTab.alpha = 0.7;

    saleTab.inputEnabled = true;
    saleTab.events.onInputDown.add(buyItem, this);

    uiStore = Lucifer_Game.add.sprite(228, 330, 'uiStore');
    uiStore.anchor.setTo(0.5, 0.5); 
    uiStore.scale.setTo(0.9, 0.9);
    uiStore.fixedToCamera = true;
    uiStore.visible = false;
    //--------------------------------------------------------
    //--------------------------------------------------------

    //inventory-----------------------------------------------
    //--------------------------------------------------------
    uiInventory = Lucifer_Game.add.sprite(445, 300, 'inven');
    uiInventory.anchor.setTo(0.5, 0.5);
    uiInventory.scale.setTo(0.8, 0.8);
    uiInventory.fixedToCamera = true;
    uiInventory.visible = false;

    //inventory key setting -----------------------------------------
    key_inven = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.E);

    invenKeyTimer = Lucifer_Game.time.create(false);
    invenKeyTimer.loop(400, invenTimeCheck, this);
    //---------------------------------------------------------------


    //Postion -----------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    redPotion = new potion(Lucifer_Game, 55, 105, itemList[0].name, itemList[0].heal, itemList[0].limited_job, itemStoreStyle);
    
    Lucifer_Game.physics.p2.enable(redPotion);
    redPotion.body.clearShapes();
    redPotion.body.addRectangle();
    redPotion.body.static = true;

    redPotion.inputEnabled = true;
    redPotion.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(redPotion);
    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------


    //Sword--------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    basicSword = new sword(Lucifer_Game, 55, 105, itemList[1].name, itemList[1].attack_point, itemList[2].limited_job, itemStoreStyle);
    
    Lucifer_Game.physics.p2.enable(basicSword); 
    basicSword.body.addRectangle(0, 0);
    basicSword.body.static = true;

    basicSword.inputEnabled = true;
    basicSword.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(basicSword);
    //----------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------


    //Armor--------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    
    basicArmor = new armor(Lucifer_Game, 55, 105, itemList[2].name, itemList[2].defence_point, itemList[2].limited_job, itemStoreStyle);

    Lucifer_Game.physics.p2.enable(basicArmor); 
    basicArmor.body.addRectangle(0, 0);
    basicArmor.body.static = true;

    basicArmor.inputEnabled = true;
    basicArmor.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(basicArmor);
    //---------------------------------------------------------------------------------------   
    //---------------------------------------------------------------------------------------   

    invenArrayLength = inventory.length;
    for(i=0; i<invenArrayLength; i++){
        switch(inventory[i].item_name){
            case '빨간물약':/*335, 470*/
                inventory[i]=redPotionClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
                break;
            case '기본검':
                inventory[i]=basicSwordClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
                break;
            case '기본갑옷':
                inventory[i]=basicArmorClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
                break;
        };
    }
}

function itemsUpdate(){
    if(key_inven.isDown){
        invenKeyTimer.start();
        if(invenKeyValidCheck == 1){
            invenUi();
        }
        invenKeyValidCheck = 0;
    }
}

function itemStoreRender(){
}

function showStore(){
    if(uiStore.visible === true){
        potionTab.visible = false;
        swordTab.visible = false;
        armorTab.visible = false;
        saleTab.visible = false;
        redPotion.getVisible(false);
        basicSword.getVisible(false);
        basicArmor.getVisible(false);
        uiStore.visible = false;
    }else{
        potionTab.visible = true;
        swordTab.visible = true;
        armorTab.visible = true;
        saleTab.visible = true;
        redPotion.getVisible(true);
        uiStore.visible = true;
    }
}

//클릭 시 실행
function potionStoreTab(){
    potionTab.alpha = 1;
    swordTab.alpha = 0.7;
    armorTab.alpha = 0.7;
    redPotion.getVisible(true);
    basicSword.getVisible(false);
    basicArmor.getVisible(false);
}

function swordStoreTab(){
    potionTab.alpha = 0.7;
    swordTab.alpha = 1;
    armorTab.alpha = 0.7;
    redPotion.getVisible(false);
    basicSword.getVisible(true);
    basicArmor.getVisible(false);
}

function armorStoreTab(){
    potionTab.alpha = 0.7;
    swordTab.alpha = 0.7;
    armorTab.alpha = 1;
    redPotion.getVisible(false);
    basicSword.getVisible(false);
    basicArmor.getVisible(true);
}

function clickItem(sprite){
    selectedItem = sprite;
}

function buyItem() {
    if(selectedItem === null){
        alert("먼저 구매할 물건을 클릭하세요");
    }else{
        if(inventory.length>11){
            alert("인벤토리가 가득 찼습니다.");
        }else{
            alert("구매한 물건 : " + selectedItem.name);
            inventory.push(selectedItem);
            inventoryPost(selectedItem.name);
        }
    }
}

//server-side로 인벤토리 데이터 실시간 전송 
function inventoryPost(selectedItem){
    $.ajax({
        method:'POST',
        url:'/api/user/character/inventory/',
        data:{
            character:character.nickname,
            selectedItem:selectedItem,
        },
    })
}

function invenTimeCheck(){
    invenKeyValidCheck = 1;
}

function invenUi(){
    if(uiInventory.visible === true){
        uiInventory.visible = false;
        for(i=0; i<inventory.length; i++){
            inventory[i].getVisible(false);
        }
    }else{
        uiInventory.visible = true;
        for(i=0; i<inventory.length; i++){
            inventory[i].getVisible(true);
        }
    }
}

function inventoryPosition(count){
    switch(count){
        case 0:
            var positionX = 335;
            var positionY = 250;
            break;
        case 1:
            var positionX = 335;
            var positionY = 300;
            break;
        case 2:
            var positionX = 335;
            var positionY = 350;
            break;
        case 3:
            var positionX = 335;
            var positionY = 400;
            break;
        case 4:
            var positionX = 335;
            var positionY = 450;
            break;
        case 5:
            var positionX = 470;
            var positionY = 250;
            break;
        case 6:
            var positionX = 470;
            var positionY = 300;
            break;
        case 7:
            var positionX = 470;
            var positionY = 350;
            break;
        case 8:
            var positionX = 470;
            var positionY = 400;
            break;
        case 9:
            var positionX = 470;
            var positionY = 450;
            break;
    }
    return [ positionX, positionY ];
}


