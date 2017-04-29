var uiStore,
    uiInventory,
    selectedItem = null,
    invenKeyTimer,
    invenKeyValidCheck = 1,
    redPotionGroup,
    tempInventory = [];

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
    Lucifer_Game.load.spritesheet('uiStore', '../../static/images/game/UI/store/store.png', 455, 684);
    Lucifer_Game.load.spritesheet('potionTab', '../../static/images/game/UI/store/PotionTab.png', 45, 80);
    Lucifer_Game.load.spritesheet('swordTab', '../../static/images/game/UI/store/swordTab.png', 45, 80);
    Lucifer_Game.load.spritesheet('armorTab', '../../static/images/game/UI/store/armorTab.png', 45, 80);
    Lucifer_Game.load.spritesheet('saleTab', '../../static/images/game/UI/store/sale.png', 45, 80);
    Lucifer_Game.load.spritesheet('inven', '../../static/images/game/UI/Inventory/inventory.png', 354, 716);
    Lucifer_Game.load.spritesheet('dropButton', '../../static/images/game/UI/Inventory/dropButton.png', 196, 51);
    Lucifer_Game.load.spritesheet('useButton', '../../static/images/game/UI/Inventory/useButton.png', 196, 51);

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
    uiInventory = Lucifer_Game.add.sprite(1000, 355, 'inven'); //445, 300  //555 55
    uiInventory.anchor.setTo(0.5, 0.5);
    uiInventory.scale.setTo(0.8, 0.8);
    uiInventory.fixedToCamera = true;
    uiInventory.visible = false;

    //inventory key setting -----------------------------------------
    key_inven = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.I);

    invenKeyTimer = Lucifer_Game.time.create(false);
    invenKeyTimer.loop(400, invenTimeCheck, this);

    dropButton = Lucifer_Game.add.sprite(1027, 580, 'dropButton');
    dropButton.anchor.setTo(0.5, 0.5);
    dropButton.scale.setTo(0.5, 0.5);
    dropButton.fixedToCamera = true;
    dropButton.visible = false;

    dropButton.inputEnabled = true;
    dropButton.events.onInputDown.add(dropItem, this);

    useButton = Lucifer_Game.add.sprite(925, 580,'useButton');
    useButton.anchor.setTo(0.5, 0.5);
    useButton.scale.setTo(0.5, 0.5);
    useButton.fixedToCamera = true;
    useButton.visible = false;

    useButton.inputEnabled = true;
    useButton.events.onInputDown.add(useItem, this);
    //---------------------------------------------------------------

    //Postion -----------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    redPotion = new potion(Lucifer_Game, 55, 105, itemList[0].name, itemList[0].heal, itemList[0].price, 0, itemStoreStyle);

    redPotion.inputEnabled = true;
    redPotion.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(redPotion);

    superPotion = new potion(Lucifer_Game, 55, 200, itemList[3].name, itemList[3].heal, itemList[3].price, 3, itemStoreStyle);

    superPotion.inputEnabled = true;
    superPotion.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(superPotion);


    hyperPotion = new potion(Lucifer_Game, 55, 300, itemList[6].name, itemList[6].heal, itemList[6].price, 6, itemStoreStyle);

    hyperPotion.inputEnabled = true;
    hyperPotion.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(hyperPotion);
    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------


    //Sword--------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    basicSword = new sword(Lucifer_Game, 55, 105, itemList[1].name, itemList[1].attack_point, itemList[1].price, 1, itemStoreStyle);

    Lucifer_Game.physics.p2.enable(basicSword);
    basicSword.body.addRectangle(0, 0);
    basicSword.body.static = true;

    basicSword.inputEnabled = true;
    basicSword.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(basicSword);


    strongSword = new sword(Lucifer_Game, 55, 200, itemList[4].name, itemList[4].attack_point, itemList[4].price, 4, itemStoreStyle);

    Lucifer_Game.physics.p2.enable(strongSword);
    strongSword.body.addRectangle(0, 0);
    strongSword.body.static = true;

    strongSword.inputEnabled = true;
    strongSword.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(strongSword);

    superSword = new sword(Lucifer_Game, 55, 300, itemList[7].name, itemList[7].attack_point, itemList[7].price, 7, itemStoreStyle);

    Lucifer_Game.physics.p2.enable(superSword);
    superSword.body.addRectangle(0, 0);
    superSword.body.static = true;

    superSword.inputEnabled = true;
    superSword.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(superSword);
    //----------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------


    //Armor--------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    basicArmor = new armor(Lucifer_Game, 55, 105, itemList[2].name, itemList[2].defence_point, itemList[2].limited_job, 2, itemStoreStyle);

    Lucifer_Game.physics.p2.enable(basicArmor);
    basicArmor.body.addRectangle(0, 0);
    basicArmor.body.static = true;

    basicArmor.inputEnabled = true;
    basicArmor.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(basicArmor);
    //---------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------

    changeServerListToClientList();
    changeServerListToClientListEquipment();

    gold_text = Lucifer_Game.add.text(1030, 605, gold, itemStoreStyle);
    gold_text.fixedToCamera = true;
    gold_text.visible = false;
}

function itemsStoreUpdate(){
    /**************************
            UPDATE문 작성
    ***************************/
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
        superPotion.getVisible(false);
        hyperPotion.getVisible(false);
        basicSword.getVisible(false);
        strongSword.getVisible(false);
        superSword.getVisible(false);
        basicArmor.getVisible(false);
        uiStore.visible = false;
    }else{
        potionTab.visible = true;
        swordTab.visible = true;
        armorTab.visible = true;
        saleTab.visible = true;
        redPotion.getVisible(true);
        superPotion.getVisible(true);
        hyperPotion.getVisible(true);
        uiStore.visible = true;
    }
}

//클릭 시 실행
function potionStoreTab(){
    potionTab.alpha = 1;
    swordTab.alpha = 0.7;
    armorTab.alpha = 0.7;
    redPotion.getVisible(true);
    superPotion.getVisible(true);
    hyperPotion.getVisible(true);
    basicSword.getVisible(false);
    strongSword.getVisible(false);
    superSword.getVisible(false);
    basicArmor.getVisible(false);
}

function swordStoreTab(){
    potionTab.alpha = 0.7;
    swordTab.alpha = 1;
    armorTab.alpha = 0.7;
    redPotion.getVisible(false);
    superPotion.getVisible(false);
    hyperPotion.getVisible(false);
    basicSword.getVisible(true);
    strongSword.getVisible(true);
    superSword.getVisible(true);
    basicArmor.getVisible(false);
}

function armorStoreTab(){
    potionTab.alpha = 0.7;
    swordTab.alpha = 0.7;
    armorTab.alpha = 1;
    redPotion.getVisible(false);
    superPotion.getVisible(false);
    hyperPotion.getVisible(false);
    basicSword.getVisible(false);
    strongSword.getVisible(false);
    superSword.getVisible(false);
    basicArmor.getVisible(true);
}


function clickItem(sprite){
    //아이템을 클릭하면 selectedItem에 해당 객체가 저장됨
    //console.log(sprite.name);
    var i = inventory.length;
    switch(sprite.name){
        case '빨간물약':
            selectedItem = redPotionClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            break;
        case '좋은빨간물약':
            selectedItem = goodRedPotionClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            break;
        case '최고의물약':
            selectedItem = bestRedPotionClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            break;
        case '기본검':
            selectedItem = basicSwordClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            break;
        case '강화된검':
            selectedItem = strongSwordClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            break;
        case '마검':
            selectedItem = superSwordClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            break;
        case '기본갑옷':
            selectedItem = basicArmorClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            break;
    }
    //console.log(selectedItem);
}

function buyItem() {
    if(selectedItem === null){
        alert("먼저 구매할 물건을 클릭하세요");
    }else{
        if(inventory.length>=10){
            alert("인벤토리가 가득 찼습니다.");
        }else{
            if(gold>selectedItem.price){
                alert("구매한 물건 : " + selectedItem.name);
                inventory.push(selectedItem);
                inventoryPost(selectedItem.name);
                gold -= selectedItem.price;
                goldUpdate();
            }else{
                alert("소지한 골드가 부족합니다");
            }

        }
    }
    changeServerListToClientList();
    selectedItem = null;
    //퀘스트 검사
    playerQuestAdvence(1);
}

function clickedItemInInventory(sprite){
    selectedItem = sprite;
}

//server-side로 데이터 실시간 전송
//---------------------------------------------------
//---------------------------------------------------
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

function inventoryDelete(selectedItem){
    $.ajax({
        method:'DELETE',
        url:'/api/user/character/inventory/',
        data:{
            character:character.nickname,
            selectedItem:selectedItem,
        },
    })
}

function equipmentPost(selectedItem, type_is){
    $.ajax({
        method:'POST',
        url:'/api/user/character/equipment/',
        data:{
            character:character.nickname,
            selectedItem:selectedItem,
            type_is: type_is,
        },
    })
}
//---------------------------------------------------
//---------------------------------------------------

function invenTimeCheck(){
    invenKeyValidCheck = 1;
}

function invenUi(){
    if(uiInventory.visible === true){
        uiInventory.visible = false;
        dropButton.visible = false;
        useButton.visible = false;
        gold_text.visible = false;
        for(i=0; i<inventory.length; i++){
            inventory[i].getVisible(false);
        }
        for(i=0; i<equipmentList.length; i++){
            equipmentList[i].getVisible(false);
        }
    }else{
        uiInventory.visible = true;
        dropButton.visible = true;
        useButton.visible = true;
        gold_text.visible = true;
        for(i=0; i<inventory.length; i++){
            inventory[i].getVisible(true);
        }
        for(i=0; i<equipmentList.length; i++){
            equipmentList[i].getVisible(true);
        }
    }
}

function dropItem(){

    if(selectedItem === null){
        alert('버릴 아이템을 선택해주세요');
    }else{
        var startNumberSecondArray = selectedItem.numberInArray;

        //버린 아이템의 뒷 순서인 아이템들을 모두 tempInventory에 저장
        for(i=startNumberSecondArray + 1; i<inventory.length; i++){
            tempInventory.push(inventory[i]);
        }

        //버린 아이템의 뒷 순서인 아이템 sprite들을 모두 inventory에서 삭제함
        for(i=inventory.length - 1; i>=selectedItem.numberInArray; i--){
            inventory[i].destroy();
            inventory[i].text.destroy();
        }

        //inventory에서 버릴 아이템을 뽑아 버림
        inventory.splice(selectedItem.numberInArray, 9);

        //ajax DELETE 요청으로 실시간 저장
        inventoryDelete(selectedItem.name);

        //selectedItem 값 초기화
        selectedItem = null;

        var inventoryLength = inventory.length;

        //sprite가 삭제되었기 때문에 새로운 clone을 만들어서 inventory에 저장
        for(i=0; i<tempInventory.length; i++){
            switch(tempInventory[i].name){
                case '빨간물약':
                    inventory.push(redPotionClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '좋은빨간물약':
                    inventory.push(goodRedPotionClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '최고의물약':
                    inventory.push(bestRedPotionClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '기본검':
                    inventory.push(basicSwordClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '강화된검':
                    inventory.push(strongSwordClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '마검':
                    inventory.push(superSwordClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '기본갑옷':
                    inventory.push(basicArmorClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
            }
        }

        for(i=inventoryLength;i<inventory.length; i++){
            inventory[i].getVisible(true);
            inventory[i].numberInArray = i;
        }

        //tempInventory 초기화
        tempInventory = [];
    }
}

function useItem(){
    if(selectedItem === null){
        alert('장착할 아이템을 선택하세요');
    }else{
        var startNumberSecondArray = selectedItem.numberInArray;

        //버린 아이템의 뒷 순서인 아이템들을 모두 tempInventory에 저장
        for(i=startNumberSecondArray + 1; i<inventory.length; i++){
            tempInventory.push(inventory[i]);
        }

        //버린 아이템의 뒷 순서인 아이템 sprite들을 모두 inventory에서 삭제함
        for(i=inventory.length - 1; i>=selectedItem.numberInArray; i--){
            inventory[i].destroy();
            inventory[i].text.destroy();
        }

        //inventory에서 버릴 아이템을 뽑아 버림
        //선택된 아이템의 다음 인덱스 아이템들 까지 모두 뽑는다
        //왜냐하면 선택된 인덱스의 칸을 채우기 위해 인덱스를 다시 설정해 줘야하기 때문
        inventory.splice(selectedItem.numberInArray, 9);

        //ajax DELETE 요청으로 실시간 저장
        inventoryDelete(selectedItem.name);

        var inventoryLength = inventory.length;

        //sprite가 삭제되었기 때문에 새로운 clone을 만들어서 inventory에 저장
        for(i=0; i<tempInventory.length; i++){
            switch(tempInventory[i].name){
                case '빨간물약':
                    inventory.push(redPotionClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '좋은빨간물약':
                    inventory.push(goodRedPotionClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '최고의물약':
                    inventory.push(bestRedPotionClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '기본검':
                    inventory.push(basicSwordClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '강화된검':
                    inventory.push(strongSwordClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '마검':
                    inventory.push(superSwordClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '기본갑옷':
                    inventory.push(basicArmorClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
            }
        }

        for(i=inventoryLength;i<inventory.length; i++){
            inventory[i].getVisible(true);
            inventory[i].numberInArray = i;
        }
        tempInventory = [];


        if(selectedItem.type_is==='potion'){
            if(health + selectedItem.heal > maxHealth){
                health = maxHealth;
            }else{
                health += selectedItem.heal;
            }
            inventoryDelete(selectedItem.name);
        }else if(selectedItem.type_is==='weapon'){
            if(equipmentList[0]!==undefined){
                equipmentList[0].destroy();
                equipmentList[0].text.destroy();

                var previousItem = equipmentList[0].name;
                var inventoryLength = inventory.length;

                switch(previousItem){
                    case '기본검':
                        var inserted_item = basicSwordClone(inventoryPosition(inventoryLength)[0], inventoryPosition(inventoryLength)[1]);
                        inserted_item.numberInArray = inventory.length;
                        inventory.push(inserted_item);
                        inserted_item.getVisible(true);
                        break;
                    case '강화된검':
                        var inserted_item = strongSwordClone(inventoryPosition(inventoryLength)[0], inventoryPosition(inventoryLength)[1]);
                        inserted_item.numberInArray = inventory.length;
                        inventory.push(inserted_item);
                        inserted_item.getVisible(true);
                        break;
                    case '마검':
                        var inserted_item = superSwordClone(inventoryPosition(inventoryLength)[0], inventoryPosition(inventoryLength)[1]);
                        inserted_item.numberInArray = inventory.length;
                        inventory.push(inserted_item);
                        inserted_item.getVisible(true);
                }
                inventoryPost(inserted_item.name);

            }
            equipmentList[0] = createEquipmentAndSetPosition(selectedItem.name);
            equipmentList[0].getVisible(true);

            equipmentCalculater(equipmentList[0].attack_point, equipmentList[0].type_is);

            equipmentPost(equipmentList[0].name, equipmentList[0].type_is);

        }else if(selectedItem.type_is==='armor'){
            if(equipmentList[1]!==undefined){
                equipmentList[1].destroy();
                equipmentList[1].text.destroy();
                var previousItem = equipmentList[1].name;

                var inventoryLength = inventory.length;

                switch(previousItem){
                    case '기본갑옷':
                        var inserted_item = basicArmorClone(inventoryPosition(inventoryLength)[0], inventoryPosition(inventoryLength)[1]);
                        inserted_item.numberInArray = inventory.length;
                        inventory.push(inserted_item);
                        inserted_item.getVisible(true);

                        inventoryPost(inserted_item.name);
                }
            }
            equipmentList[1] = createEquipmentAndSetPosition(selectedItem.name);
            equipmentList[1].getVisible(true);

            equipmentCalculater(equipmentList[1].defence_point, equipmentList[1].type_is);

            equipmentPost(equipmentList[1].name, equipmentList[1].type_is);
        }

        //selectedItem 값 초기화
        selectedItem = null;

    }
}

function createEquipmentAndSetPosition(itemName){
    var item;
    switch(itemName){
        case '기본검':
            item = basicSwordClone(952, 205);
            item.text.setText('');
            item.getVisible(false);
            break;
        case '강화된검':
            item = strongSwordClone(952, 205);
            item.text.setText('');
            item.getVisible(false);
            break;
        case '마검':
            item = superSwordClone(952, 205);
            item.text.setText('');
            item.getVisible(false);
            break;
        case '기본갑옷':
            item = basicArmorClone(1048, 205);
            item.text.setText('');
            item.getVisible(false);
            break;
    }
    return item;
}

function inventoryPosition(count){
    switch(count){
        case 0: //445 300 //555 55
            var positionX = 890;
            var positionY = 305;
            break;
        case 1:
            var positionX = 890;
            var positionY = 355;
            break;
        case 2:
            var positionX = 890;
            var positionY = 405;
            break;
        case 3:
            var positionX = 890;
            var positionY = 455;
            break;
        case 4:
            var positionX = 890;
            var positionY = 505;
            break;
        case 5:
            var positionX = 1025;
            var positionY = 305;
            break;
        case 6:
            var positionX = 1025;
            var positionY = 355;
            break;
        case 7:
            var positionX = 1025;
            var positionY = 405;
            break;
        case 8:
            var positionX = 1025;
            var positionY = 455;
            break;
        case 9:
            var positionX = 1025;
            var positionY = 505;
            break;
    }
    return [ positionX, positionY ];
}

function changeArray(){
    invenArrayLength = inventory.length;
    for(i=0; i<invenArrayLength; i++){
        inventory[i].x = inventoryPosition(i)[0];
        inventory[i].y = inventoryPosition(i)[1];
    };
}

function changeServerListToClientListEquipment(){
    var equipmentLength = equipmentList.length;
    for(i=0; i<equipmentLength; i++){
        switch(equipmentList[i].item_name){
            case '기본검':
                equipmentList[0] = createEquipmentAndSetPosition('기본검');

                equipmentCalculater(equipmentList[0].attack_point, equipmentList[0].type_is);
                break;
            case '강화된검':
                equipmentList[0] = createEquipmentAndSetPosition('강화된검');

                equipmentCalculater(equipmentList[0].attack_point, equipmentList[0].type_is);
                break;
            case '마검':
                equipmentList[0] = createEquipmentAndSetPosition('마검');

                equipmentCalculater(equipmentList[0].attack_point, equipmentList[0].type_is);
                break;
            case '기본갑옷':
                equipmentList[1] = createEquipmentAndSetPosition('기본갑옷');

                equipmentCalculater(equipmentList[1].defence_point, equipmentList[1].type_is);
                break;
        }
    }


}

//server-side에서 호출된 인벤토리 속 아이템 객체들을 js 오브잭트로 치환해준다.
function changeServerListToClientList(){
    invenArrayLength = inventory.length;
    for(i=0; i<invenArrayLength; i++){
        switch(inventory[i].item_name){
            case '빨간물약':/*335, 470*/
                inventory[i]=redPotionClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
                inventory[i].numberInArray = i;
                break;
            case '좋은빨간물약':
                inventory[i]=goodRedPotionClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
                inventory[i].numberInArray = i;
                break;
            case '최고의물약':
                inventory[i]=bestRedPotionClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
                inventory[i].numberInArray = i;
                break;
            case '기본검':
                inventory[i]=basicSwordClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
                inventory[i].numberInArray = i;
                break;
            case '강화된검':
                inventory[i]=strongSwordClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
                inventory[i].numberInArray = i;
                break;
            case '마검':
                inventory[i]=superSwordClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
                inventory[i].numberInArray = i;
                break;
            case '기본갑옷':
                inventory[i]=basicArmorClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
                inventory[i].numberInArray = i;
                break;
        }
    }
}

//장비착용 계산 함수
function equipmentCalculater(point, type){
    if(type==='armor'){
    	var rawDefencePoint = 2 * ( (4 * strong) + (maxHealth * 0.1) ) * (point * 0.01);
        defence_point = Number(rawDefencePoint.toFixed(2));
    }else{
    	var rawAttackPoint = 1.29 * ( (4 * strong) + (maxHealth * 0.1) ) * (point * 0.01);
        attack_point = Number(rawAttackPoint.toFixed(2));
    }
}

function goldUpdate(){
    gold_text.setText(gold);
}
