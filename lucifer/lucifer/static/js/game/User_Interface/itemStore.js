var uiStore,
    uiInventory,
    selectedItem = null,
    invenKeyTimer,
    invenKeyValidCheck = 1,
    redPotionGroup,
    tempInventory = [];

var ItemSelectCheck = 0;

function itemStorePreload(){

    Lucifer_Game.load.spritesheet('uiStore', '../../static/images/game/UI/store/store.png', 455, 684);
    Lucifer_Game.load.spritesheet('potionTab', '../../static/images/game/UI/store/PotionTab.png', 45, 80);
    Lucifer_Game.load.spritesheet('swordTab', '../../static/images/game/UI/store/swordTab.png', 45, 80);
    Lucifer_Game.load.spritesheet('armorTab', '../../static/images/game/UI/store/armorTab.png', 45, 80);
    Lucifer_Game.load.spritesheet('saleTab', '../../static/images/game/UI/store/sale.png', 45, 80);

    //Potion Info
    Lucifer_Game.load.spritesheet('Potion_One_Info',
                                  '../../static/images/game/UI/Store/ItemInfo/Potion_One_Info.png', 230, 180);
    Lucifer_Game.load.spritesheet('Potion_Two_Info',
                                  '../../static/images/game/UI/Store/ItemInfo/Potion_Two_Info.png', 230, 180);
    Lucifer_Game.load.spritesheet('Potion_Three_Info',
                                  '../../static/images/game/UI/Store/ItemInfo/Potion_Three_Info.png', 230, 180);

    //Sword Info
    Lucifer_Game.load.spritesheet('Sword_One_Info',
                                  '../../static/images/game/UI/Store/ItemInfo/Sword_One_Info.png', 230, 180);
    Lucifer_Game.load.spritesheet('Sword_Two_Info',
                                  '../../static/images/game/UI/Store/ItemInfo/Sword_Two_Info.png', 230, 180);
    Lucifer_Game.load.spritesheet('Sword_Three_Info',
                                  '../../static/images/game/UI/Store/ItemInfo/Sword_Three_Info.png', 230, 180);

    //Armor Info
    Lucifer_Game.load.spritesheet('Armor_One_Info',
                                  '../../static/images/game/UI/Store/ItemInfo/Armor_One_Info.png', 230, 180);
    Lucifer_Game.load.spritesheet('Armor_Two_Info',
                                  '../../static/images/game/UI/Store/ItemInfo/Armor_Two_Info.png', 230, 180);
    Lucifer_Game.load.spritesheet('Armor_Three_Info',
                                  '../../static/images/game/UI/Store/ItemInfo/Armor_Three_Info.png', 230, 180);

    //Item Select Frame
    Lucifer_Game.load.spritesheet('Item_Select_Frame',
                                  '../../static/images/game/UI/Store/SelectFrame.png', 44, 83);


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

    //Position MouseOver Info
    //redPotion
    redPotion.events.onInputOver.add(onOveritem, this);
    redPotion.events.onInputOut.add(onOutitem, this);

    Potion_One_Info = Lucifer_Game.add.sprite(225, 210, 'Potion_One_Info');
    Potion_One_Info.anchor.setTo(0.5, 0.5);
    Potion_One_Info.fixedToCamera = true;
    Potion_One_Info.visible = false;

    //superPotion
    superPotion.events.onInputOver.add(onOveritem2, this);
    superPotion.events.onInputOut.add(onOutitem2, this);

    Potion_Two_Info = Lucifer_Game.add.sprite(225, 310, 'Potion_Two_Info');
    Potion_Two_Info.anchor.setTo(0.5, 0.5);
    Potion_Two_Info.fixedToCamera = true;
    Potion_Two_Info.visible = false;

    //hyperPotion
    hyperPotion.events.onInputOver.add(onOveritem3, this);
    hyperPotion.events.onInputOut.add(onOutitem3, this);

    Potion_Three_Info = Lucifer_Game.add.sprite(225, 410, 'Potion_Three_Info');
    Potion_Three_Info.anchor.setTo(0.5, 0.5);
    Potion_Three_Info.fixedToCamera = true;
    Potion_Three_Info.visible = false;

    //-------------------------------------------------------------------------------------------
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

    //Sword MouseOver Info
    //basicSword
    basicSword.events.onInputOver.add(onOverSword, this);
    basicSword.events.onInputOut.add(onOutSword, this);

    Sword_One_Info = Lucifer_Game.add.sprite(225, 210, 'Sword_One_Info');
    Sword_One_Info.anchor.setTo(0.5, 0.5);
    Sword_One_Info.fixedToCamera = true;
    Sword_One_Info.visible = false;

    //strongSword
    strongSword.events.onInputOver.add(onOverSword2, this);
    strongSword.events.onInputOut.add(onOutSword2, this);

    Sword_Two_Info = Lucifer_Game.add.sprite(225, 310, 'Sword_Two_Info');
    Sword_Two_Info.anchor.setTo(0.5, 0.5);
    Sword_Two_Info.fixedToCamera = true;
    Sword_Two_Info.visible = false;

    //superSword
    superSword.events.onInputOver.add(onOverSword3, this);
    superSword.events.onInputOut.add(onOutSword3, this);

    Sword_Three_Info = Lucifer_Game.add.sprite(225, 410, 'Sword_Three_Info');
    Sword_Three_Info.anchor.setTo(0.5, 0.5);
    Sword_Three_Info.fixedToCamera = true;
    Sword_Three_Info.visible = false;
    //----------------------------------------------------------------------------------------


    //Armor--------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------
    basicArmor = new armor(Lucifer_Game, 55, 105, itemList[2].name, itemList[2].defence_point, itemList[2].price, 2, itemStoreStyle);

    Lucifer_Game.physics.p2.enable(basicArmor);
    basicArmor.body.addRectangle(0, 0);
    basicArmor.body.static = true;

    basicArmor.inputEnabled = true;
    basicArmor.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(basicArmor);

    strongArmor = new armor(Lucifer_Game, 55, 200, itemList[5].name, itemList[5].defence_point, itemList[5].price, 5, itemStoreStyle);

    Lucifer_Game.physics.p2.enable(strongArmor);
    strongArmor.body.addRectangle(0, 0);
    strongArmor.body.static = true;

    strongArmor.inputEnabled = true;
    strongArmor.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(strongArmor);

    superArmor = new armor(Lucifer_Game, 55, 300, itemList[8].name, itemList[8].defence_point, itemList[8].price, 8, itemStoreStyle);

    Lucifer_Game.physics.p2.enable(superArmor);
    superArmor.body.addRectangle(0, 0);
    superArmor.body.static = true;

    superArmor.inputEnabled = true;
    superArmor.events.onInputDown.add(clickItem, this);

    Lucifer_Game.add.existing(superArmor);
    //---------------------------------------------------------------------------------------

    //Armor MouseOver Info
    //basicArmor
    basicArmor.events.onInputOver.add(onOverArmor, this);
    basicArmor.events.onInputOut.add(onOutArmor, this);

    Armor_One_Info = Lucifer_Game.add.sprite(225, 210, 'Armor_One_Info');
    Armor_One_Info.anchor.setTo(0.5, 0.5);
    Armor_One_Info.fixedToCamera = true;
    Armor_One_Info.visible = false;

    //strongArmor
    strongArmor.events.onInputOver.add(onOverArmor2, this);
    strongArmor.events.onInputOut.add(onOutArmor2, this);

    Armor_Two_Info = Lucifer_Game.add.sprite(225, 310, 'Armor_Two_Info');
    Armor_Two_Info.anchor.setTo(0.5, 0.5);
    Armor_Two_Info.fixedToCamera = true;
    Armor_Two_Info.visible = false;

    //superArmor
    superArmor.events.onInputOver.add(onOverArmor3, this);
    superArmor.events.onInputOut.add(onOutArmor3, this);

    Armor_Three_Info = Lucifer_Game.add.sprite(225, 410, 'Armor_Three_Info');
    Armor_Three_Info.anchor.setTo(0.5, 0.5);
    Armor_Three_Info.fixedToCamera = true;
    Armor_Three_Info.visible = false;
    //----------------------------------------------------------------------------------------

    //Item Select Frame
    Item_Select_Frame = Lucifer_Game.add.sprite(56, 112, 'Item_Select_Frame');
    Item_Select_Frame.anchor.setTo(0.5, 0.5);
    Item_Select_Frame.fixedToCamera = true;
    Item_Select_Frame.visible = false;
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

        //다른 UI창 닫기
        //Quest
        if(UI_Quest.visible == true)
        {
            QuestUi();
        }

        //Stat
        if(UI_Stat.visible == true)
        {
            statusUi();
        }

        //Skill
        if(UI_Skill.visible == true)
        {
            skillUi();
        }

        //Info
        if(UI_Info.visible == true)
        {
            InfoUi();
        }
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
        strongArmor.getVisible(false);
        superArmor.getVisible(false);
        uiStore.visible = false;
        Item_Select_Frame.visible = false;
        invenUi();

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

    invenUi();
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
    strongArmor.getVisible(false);
    superArmor.getVisible(false);
    Item_Select_Frame.visible=false;
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
    strongArmor.getVisible(false);
    superArmor.getVisible(false);
    Item_Select_Frame.visible=false;
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
    strongArmor.getVisible(true);
    superArmor.getVisible(true);
    Item_Select_Frame.visible=false;
}


function clickItem(sprite){
    //아이템을 클릭하면 selectedItem에 해당 객체가 저장됨
    //console.log(sprite.name);
    var i = inventory.length;

    switch(sprite.name){
        case '빨간물약':
            selectedItem = redPotionClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            if(sprite.drinkEnable === false){
                selectedItem.drinkEnable = false;
            }
            //item select Frame
            switch(ItemSelectCheck){
                case 0 :
                Item_Select_Frame = Lucifer_Game.add.sprite(56, 112, 'Item_Select_Frame');
                Item_Select_Frame.anchor.setTo(0.5, 0.5);
                Item_Select_Frame.fixedToCamera = true;
                Item_Select_Frame.visible = true;
                ItemSelectCheck = 1;
                break;
                case 1 :
                Item_Select_Frame.visible = false;
                ItemSelectCheck = 0;
                break;
            }
            break;
        case '좋은물약':
            selectedItem = goodRedPotionClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            if(sprite.drinkEnable === false){
                selectedItem.drinkEnable = false;
            }
            //item select Frame
            switch(ItemSelectCheck){
                case 0 :
                Item_Select_Frame = Lucifer_Game.add.sprite(56, 207, 'Item_Select_Frame');
                Item_Select_Frame.anchor.setTo(0.5, 0.5);
                Item_Select_Frame.fixedToCamera = true;
                Item_Select_Frame.visible = true;
                ItemSelectCheck = 1;
                break;
                case 1 :
                Item_Select_Frame.visible = false;
                ItemSelectCheck = 0;
                break;
            }
            break;
        case '최고의물약':
            selectedItem = bestRedPotionClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            if(sprite.drinkEnable === false){
                selectedItem.drinkEnable = false;
            }
            //item select Frame
            switch(ItemSelectCheck){
                case 0 :
                Item_Select_Frame = Lucifer_Game.add.sprite(56, 302, 'Item_Select_Frame');
                Item_Select_Frame.anchor.setTo(0.5, 0.5);
                Item_Select_Frame.fixedToCamera = true;
                Item_Select_Frame.visible = true;
                ItemSelectCheck = 1;
                break;
                case 1 :
                Item_Select_Frame.visible = false;
                ItemSelectCheck = 0;
                break;
            }
            break;
        case '기본검':
            selectedItem = basicSwordClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            //item select Frame
            switch(ItemSelectCheck){
                case 0 :
                Item_Select_Frame = Lucifer_Game.add.sprite(56, 112, 'Item_Select_Frame');
                Item_Select_Frame.anchor.setTo(0.5, 0.5);
                Item_Select_Frame.fixedToCamera = true;
                Item_Select_Frame.visible = true;
                ItemSelectCheck = 1;
                break;
                case 1 :
                Item_Select_Frame.visible = false;
                ItemSelectCheck = 0;
                break;
            }
            break;
        case '강화된검':
            selectedItem = strongSwordClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            //item select Frame
            switch(ItemSelectCheck){
                case 0 :
                Item_Select_Frame = Lucifer_Game.add.sprite(56, 207, 'Item_Select_Frame');
                Item_Select_Frame.anchor.setTo(0.5, 0.5);
                Item_Select_Frame.fixedToCamera = true;
                Item_Select_Frame.visible = true;
                ItemSelectCheck = 1;
                break;
                case 1 :
                Item_Select_Frame.visible = false;
                ItemSelectCheck = 0;
                break;
            }
            break;
        case '마검':
            selectedItem = superSwordClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            //item select Frame
            switch(ItemSelectCheck){
                case 0 :
                Item_Select_Frame = Lucifer_Game.add.sprite(56, 302, 'Item_Select_Frame');
                Item_Select_Frame.anchor.setTo(0.5, 0.5);
                Item_Select_Frame.fixedToCamera = true;
                Item_Select_Frame.visible = true;
                ItemSelectCheck = 1;
                break;
                case 1 :
                Item_Select_Frame.visible = false;
                ItemSelectCheck = 0;
                break;
            }
            break;
        case '기본갑옷':
            selectedItem = basicArmorClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            //item select Frame
            switch(ItemSelectCheck){
                case 0 :
                Item_Select_Frame = Lucifer_Game.add.sprite(56, 112, 'Item_Select_Frame');
                Item_Select_Frame.anchor.setTo(0.5, 0.5);
                Item_Select_Frame.fixedToCamera = true;
                Item_Select_Frame.visible = true;
                ItemSelectCheck = 1;
                break;
                case 1 :
                Item_Select_Frame.visible = false;
                ItemSelectCheck = 0;
                break;
            }
            break;
        case '강화갑옷':
            selectedItem = strongArmorClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            //item select Frame
            switch(ItemSelectCheck){
                case 0 :
                Item_Select_Frame = Lucifer_Game.add.sprite(56, 207, 'Item_Select_Frame');
                Item_Select_Frame.anchor.setTo(0.5, 0.5);
                Item_Select_Frame.fixedToCamera = true;
                Item_Select_Frame.visible = true;
                ItemSelectCheck = 1;
                break;
                case 1 :
                Item_Select_Frame.visible = false;
                ItemSelectCheck = 0;
                break;
            }
            break;
        case '증오':
            selectedItem = superArmorClone(inventoryPosition(i)[0], inventoryPosition(i)[1]);
            selectedItem.numberInArray = i;
            //item select Frame
            switch(ItemSelectCheck){
                case 0 :
                Item_Select_Frame = Lucifer_Game.add.sprite(56, 302, 'Item_Select_Frame');
                Item_Select_Frame.anchor.setTo(0.5, 0.5);
                Item_Select_Frame.fixedToCamera = true;
                Item_Select_Frame.visible = true;
                ItemSelectCheck = 1;
                break;
                case 1 :
                Item_Select_Frame.visible = false;
                ItemSelectCheck = 0;
                break;
            }
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

//Potion Over/Out function
function onOveritem(){
    Potion_One_Info.visible = true;
}

function onOveritem2(){
    Potion_Two_Info.visible = true;
}

function onOveritem3(){
    Potion_Three_Info.visible = true;
}

function onOutitem(){
    Potion_One_Info.visible = false;
}

function onOutitem2(){
    Potion_Two_Info.visible = false;
}

function onOutitem3(){
    Potion_Three_Info.visible = false;
}
//---------------------------------------------------

//Sword Over/Out function
function onOverSword(){
    Sword_One_Info.visible = true;
}

function onOverSword2(){
    Sword_Two_Info.visible = true;
}

function onOverSword3(){
    Sword_Three_Info.visible = true;
}

function onOutSword(){
    Sword_One_Info.visible = false;
}

function onOutSword2(){
    Sword_Two_Info.visible = false;
}

function onOutSword3(){
    Sword_Three_Info.visible = false;
}
//---------------------------------------------------

//Armor Over/Out function
function onOverArmor(){
    Armor_One_Info.visible = true;
}

function onOverArmor2(){
    Armor_Two_Info.visible = true;
}

function onOverArmor3(){
    Armor_Three_Info.visible = true;
}

function onOutArmor(){
    Armor_One_Info.visible = false;
}

function onOutArmor2(){
    Armor_Two_Info.visible = false;
}

function onOutArmor3(){
    Armor_Three_Info.visible = false;
}
//---------------------------------------------------
