function inventoryPreload(){
    Lucifer_Game.load.spritesheet('inven', '../../static/images/game/UI/Inventory/inventory.png', 354, 716);

    Lucifer_Game.load.spritesheet('dropButton', '../../static/images/game/UI/Inventory/dropButton.png', 196, 51);
    Lucifer_Game.load.spritesheet('useButton', '../../static/images/game/UI/Inventory/useButton.png', 196, 51);
}

function inventoryCreate(){

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
                case '좋은물약':
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
                case '강화갑옷':
                    inventory.push(strongArmorClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '증오':
                    inventory.push(superArmorClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
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

function useItem(){
    if(selectedItem === null){
        alert('장착할 아이템을 선택하세요');
    }else{

        if(selectedItem.type_is==='potion' && selectedItem.drinkEnable===true){
            //포션을 클릭하고 장착버튼을 누르면
            //quickslotPost 함수가 작동하여 서버단에 quickslot모델에
            //포션 데이터를 저장한다.
            quickslotPost(selectedItem);

            //potionImportQuickSlot(selectedItem);
            //inventoryDelete(selectedItem.name);
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

            inventoryExport();

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
                        break;
                    case '강화갑옷':
                        var inserted_item = strongArmorClone(inventoryPosition(inventoryLength)[0], inventoryPosition(inventoryLength)[1]);
                        inserted_item.numberInArray = inventory.length;
                        inventory.push(inserted_item);
                        inserted_item.getVisible(true);
                        break;
                    case '증오':
                        var inserted_item = superArmorClone(inventoryPosition(inventoryLength)[0], inventoryPosition(inventoryLength)[1]);
                        inserted_item.numberInArray = inventory.length;
                        inventory.push(inserted_item);
                        inserted_item.getVisible(true);
                        break;
                }
                inventoryPost(inserted_item.name);
            }
            equipmentList[1] = createEquipmentAndSetPosition(selectedItem.name);
            equipmentList[1].getVisible(true);

            equipmentCalculater(equipmentList[1].defence_point, equipmentList[1].type_is);

            equipmentPost(equipmentList[1].name, equipmentList[1].type_is);

            inventoryExport();
        }

        //selectedItem 값 초기화
        selectedItem = null;

    }
}

//인벤토리 아이템 장착시 인벤토리 인덱스를 재정의하는 함수
function inventoryExport(){
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

        if(selectedItem.type_is==='weapon' || selectedItem.type_is==='armor'){
            inventoryDelete(selectedItem.name);
        }

        var inventoryLength = inventory.length;

        //sprite가 삭제되었기 때문에 새로운 clone을 만들어서 inventory에 저장
        for(i=0; i<tempInventory.length; i++){
            switch(tempInventory[i].name){
                case '빨간물약':
                    inventory.push(redPotionClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '좋은물약':
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
                case '강화갑옷':
                    inventory.push(strongArmorClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
                case '증오':
                    inventory.push(superArmorClone(inventoryPosition(inventoryLength+i)[0], inventoryPosition(inventoryLength+i)[1]));
                    break;
            }
        }

        for(i=inventoryLength;i<inventory.length; i++){
            inventory[i].getVisible(true);
            inventory[i].numberInArray = i;
        }
        tempInventory = [];
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
        case '강화갑옷':
            item = strongArmorClone(1048, 205);
            item.text.setText('');
            item.getVisible(false);
            break;
        case '증오':
            item = superArmorClone(1048, 205);
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
            case '강화갑옷':
                equipmentList[1] = createEquipmentAndSetPosition('강화갑옷');

                equipmentCalculater(equipmentList[1].defence_point, equipmentList[1].type_is);
                break;
            case '증오':
                equipmentList[1] = createEquipmentAndSetPosition('증오');

                equipmentCalculater(equipmentList[1].defence_point, equipmentList[1].type_is);
                break;
        }
    }


}

function clickedItemInInventory(sprite){
    selectedItem = sprite;
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
            case '좋은물약':
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
            case '강화갑옷':
                inventory[i]=strongArmorClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
                inventory[i].numberInArray = i;
                break;
            case '증오':
                inventory[i]=superArmorClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
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

function invenTimeCheck(){
    invenKeyValidCheck = 1;
}

//포션 장착을 눌렀을 때
//포션의 종류를 검사하고 퀵슬롯에 넣음
function potionImportQuickSlot(selectedItem){
    switch(selectedItem.name){
        case '빨간물약':
            //blablabla;
        case '좋은물약':
            //blablabla;
        case '최상의물약':
            //blablabla;
    }
    console.log('퀵슬롯 함수 작동');
}

//D키를 눌렀을 때 실행되게 될 함수
function potionDrink(){
//    if(selectedItem.count === 1){
//        inventoryDelete(selectedItem.name);
//    }else{
//        console.log('ff');
//        selectedItem.count -= 1;
//    }
//    ///////////////////////////////////////
//    if(health + selectedItem.heal > maxHealth){
//        health = maxHealth;
//    }else{
//        health += selectedItem.heal;
//
//    }
}

function quickslotPost(selectedItem){
    $.ajax({
        method:'POST',
        url:'/api/user/character/quickslot/',
        data:{
            potionName:selectedItem.name,
            count:selectedItem.count,
        },
    });
}
