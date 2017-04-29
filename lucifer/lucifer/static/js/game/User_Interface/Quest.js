var validCheck = 1,
    UI_Quest,
    Key_Quest,
    keyValidTimer;

var Questbtn_lv1, Questbtn_lv2, Questbtn_lv3,
    Questbtn_lv4, Questbtn_lv5, Questbtn_lv6,
    Questbtn_lv7, Questbtn_lv8, Questbtn_lv9, Questbtn_lv10 ;

var QuestContent_lv1, QuestContent_lv2, QuestContent_lv3,
    QuestContent_lv4, QuestContent_lv5, QuestContent_lv6,
    QuestContent_lv7, QuestContent_lv8, QuestContent_lv9, QuestContent_lv10 ;

var text1, text2, text3, text4, text5, text6, text7, text8, text9, text10, style;
var btnText, btnText2, btnText3, btnText4, btnText5, btnText6, btnText7, btnText8, btnText9, btnText10 ;

var UI_info;

function QuestPreload(){

    Lucifer_Game.load.spritesheet('UI_Quest', '../../static/images/game/UI/Quest/QuestFrame.png', 867, 580);
    Lucifer_Game.load.spritesheet('Questbtn', '../../static/images/game/UI/Quest/QuestBtn.png', 325, 43);
    //QuestContent 완료안한 퀘스트 //
    Lucifer_Game.load.spritesheet('QuestContent', '../../static/images/game/UI/Quest/Questcontent.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent2', '../../static/images/game/UI/Quest/Questcontent2.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent3', '../../static/images/game/UI/Quest/Questcontent3.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent4', '../../static/images/game/UI/Quest/Questcontent4.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent5', '../../static/images/game/UI/Quest/Questcontent5.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent6', '../../static/images/game/UI/Quest/Questcontent6.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent7', '../../static/images/game/UI/Quest/Questcontent7.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent8', '../../static/images/game/UI/Quest/Questcontent8.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent9', '../../static/images/game/UI/Quest/Questcontent9.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent10', '../../static/images/game/UI/Quest/Questcontent10.png', 463, 439);

    //QuestContent 완료한 퀘스트 이미지 //
    Lucifer_Game.load.spritesheet('QuestContent1_C', '../../static/images/game/UI/Quest/Questcontent_complete.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent2_C', '../../static/images/game/UI/Quest/Questcontent2_complete.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent3_C', '../../static/images/game/UI/Quest/Questcontent3_complete.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent4_C', '../../static/images/game/UI/Quest/Questcontent4_complete.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent5_C', '../../static/images/game/UI/Quest/Questcontent5_complete.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent6_C', '../../static/images/game/UI/Quest/Questcontent6_complete.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent7_C', '../../static/images/game/UI/Quest/Questcontent7_complete.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent8_C', '../../static/images/game/UI/Quest/Questcontent8_complete.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent9_C', '../../static/images/game/UI/Quest/Questcontent9_complete.png', 463, 439);
    Lucifer_Game.load.spritesheet('QuestContent10_C', '../../static/images/game/UI/Quest/Questcontent10_complete.png', 463, 439);

    Lucifer_Game.load.spritesheet('UI_Info', '../../static/images/game/UI/KeyInfo/KeyInfo.png', 785, 539);
};

quest = function(title, exReword, goldReword, advanced, goal, isCompleted){
    this.questTitle = title;
    this.exReword = exReword;
    this.goldReword = goldReword;
    this.advanced = advanced;
    this.goal = goal;
    this.isCompleted = isCompleted;
}

function QuestCreate(){

    var characterQuestLength = characterQuest.length;
    for(i=0; i<characterQuestLength; i++){

        title = characterQuest[i].title;
        exReword = characterQuest[i].ex_reward;
        goldReword = characterQuest[i].gold_reward;
        advanced = characterQuest[i].advanced;
        goal = characterQuest[i].goal;
        isCompleted = characterQuest[i].is_completed;

        characterQuest[i] = new quest(title, exReword, goldReword, advanced, goal, isCompleted);
    }

    //Tab 이미지 추가
    //--------------------------------------------------------

    //Quest-----------------------------------------------
    //--------------------------------------------------------



    UI_Quest = Lucifer_Game.add.sprite(640, 360, 'UI_Quest');
    UI_Quest.anchor.setTo(0.5, 0.5);
    UI_Quest.fixedToCamera = true;
    UI_Quest.visible = false;

    UI_Info = Lucifer_Game.add.sprite(640, 360, 'UI_Info');
    UI_Info.anchor.setTo(0.5, 0.5);
    UI_Info.alpha= 0.9;
    UI_Info.fixedToCamera = true;
    UI_Info.visible = false;

    Key_Quest = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.Q);
    Key_Info = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.F1);

    keyValidTimer = Lucifer_Game.time.create(false);
    keyValidTimer.loop(400, timeCheck, this);

     //---------------------------------------------------------------
     // button (over , normal , click)

     //QuestButton Level 1
     Questbtn_lv1 = Lucifer_Game.add.button(393, 600, 'Questbtn', actionOnClick1, this, 1, 0, 2);
     Questbtn_lv1.anchor.setTo(0.5, 0.5);
     Questbtn_lv1.fixedToCamera = true;
     Questbtn_lv1.visible = false;

     btnText = Lucifer_Game.add.text(203, 600, "LV.1    -    [ "+ characterQuest[0].questTitle +" ]" , {font: '17px Roboto', fill: '#ffffff'});
     btnText.anchor.set(0.5);
     //---------------------------------------------------------------

     //QuestButton Level 2
     Questbtn_lv2 = Lucifer_Game.add.button(393, 557, 'Questbtn', actionOnClick2, this, 1, 0, 2);
     Questbtn_lv2.anchor.setTo(0.5, 0.5);
     Questbtn_lv2.fixedToCamera = true;
     Questbtn_lv2.visible = false;

     btnText2 = Lucifer_Game.add.text(203, 600, "LV.2    -    [ "+ characterQuest[1].questTitle +" ]" , {font: '17px Roboto', fill: '#ffffff'});
     btnText2.anchor.set(0.5);
     //---------------------------------------------------------------

     //QuestButton Level 3
     Questbtn_lv3 = Lucifer_Game.add.button(393, 514, 'Questbtn', actionOnClick3, this, 1, 0, 2);
     Questbtn_lv3.anchor.setTo(0.5, 0.5);
     Questbtn_lv3.fixedToCamera = true;
     Questbtn_lv3.visible = false;

     btnText3 = Lucifer_Game.add.text(203, 600, "LV.3    -    [ "+ characterQuest[2].questTitle +" ]" , {font: '17px Roboto', fill: '#ffffff'});
     btnText3.anchor.set(0.5);
     //---------------------------------------------------------------

     //QuestButton Level 4
     Questbtn_lv4 = Lucifer_Game.add.button(393, 471, 'Questbtn', actionOnClick4, this, 1, 0, 2);
     Questbtn_lv4.anchor.setTo(0.5, 0.5);
     Questbtn_lv4.fixedToCamera = true;
     Questbtn_lv4.visible = false;

     btnText4 = Lucifer_Game.add.text(203, 600, "LV.4    -    [ "+ characterQuest[3].questTitle +" ]" , {font: '17px Roboto', fill: '#ffffff'});
     btnText4.anchor.set(0.5);
     //---------------------------------------------------------------

     //QuestButton Level 5
     Questbtn_lv5 = Lucifer_Game.add.button(393, 428, 'Questbtn', actionOnClick5, this, 1, 0, 2);
     Questbtn_lv5.anchor.setTo(0.5, 0.5);
     Questbtn_lv5.fixedToCamera = true;
     Questbtn_lv5.visible = false;

     btnText5 = Lucifer_Game.add.text(203, 600, "LV.5    -    [ "+ characterQuest[4].questTitle +" ]" , {font: '17px Roboto', fill: '#ffffff'});
     btnText5.anchor.set(0.5);
     //---------------------------------------------------------------

     //QuestButton Level 6
     Questbtn_lv6 = Lucifer_Game.add.button(393, 385, 'Questbtn', actionOnClick6, this, 1, 0, 2);
     Questbtn_lv6.anchor.setTo(0.5, 0.5);
     Questbtn_lv6.fixedToCamera = true;
     Questbtn_lv6.visible = false;

     btnText6 = Lucifer_Game.add.text(203, 600, "LV.6    -    [ "+ characterQuest[5].questTitle +" ]" , {font: '17px Roboto', fill: '#ffffff'});
     btnText6.anchor.set(0.5);
     //---------------------------------------------------------------

     //QuestButton Level 7
     Questbtn_lv7 = Lucifer_Game.add.button(393, 342, 'Questbtn', actionOnClick7, this, 1, 0, 2);
     Questbtn_lv7.anchor.setTo(0.5, 0.5);
     Questbtn_lv7.fixedToCamera = true;
     Questbtn_lv7.visible = false;

     btnText7 = Lucifer_Game.add.text(203, 600, "LV.7    -    [ "+ characterQuest[6].questTitle +" ]" , {font: '17px Roboto', fill: '#ffffff'});
     btnText7.anchor.set(0.5);
     //---------------------------------------------------------------

     //QuestButton Level 8
     Questbtn_lv8 = Lucifer_Game.add.button(393, 299, 'Questbtn', actionOnClick8, this, 1, 0, 2);
     Questbtn_lv8.anchor.setTo(0.5, 0.5);
     Questbtn_lv8.fixedToCamera = true;
     Questbtn_lv8.visible = false;

     btnText8 = Lucifer_Game.add.text(203, 600, "LV.8    -    [ "+ characterQuest[7].questTitle +" ]" , {font: '17px Roboto', fill: '#ffffff'});
     btnText8.anchor.set(0.5);
     //---------------------------------------------------------------

     //QuestButton Level 9
     Questbtn_lv9 = Lucifer_Game.add.button(393, 256, 'Questbtn', actionOnClick9, this, 1, 0, 2);
     Questbtn_lv9.anchor.setTo(0.5, 0.5);
     Questbtn_lv9.fixedToCamera = true;
     Questbtn_lv9.visible = false;

     btnText9 = Lucifer_Game.add.text(203, 600, "LV.9    -    [ "+ characterQuest[8].questTitle +" ]" , {font: '17px Roboto', fill: '#ffffff'});
     btnText9.anchor.set(0.5);
     //---------------------------------------------------------------

     //QuestButton Level 10
     Questbtn_lv10 = Lucifer_Game.add.button(393, 213, 'Questbtn', actionOnClick10, this, 1, 0, 2);
     Questbtn_lv10.anchor.setTo(0.5, 0.5);
     Questbtn_lv10.fixedToCamera = true;
     Questbtn_lv10.visible = false;

     btnText10 = Lucifer_Game.add.text(203, 600, "LV.10    -    [ "+ characterQuest[9].questTitle +" ]" , {font: '17px Roboto', fill: '#ffffff'});
     btnText10.anchor.set(0.5);
     //---------------------------------------------------------------

     //---------------------------------------------------------------------------------------------
     //QuestContent 1
     QuestContent_lv1 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent');
     QuestContent_lv1.anchor.setTo(0.5, 0.5);
     QuestContent_lv1.fixedToCamera = true;
     QuestContent_lv1.visible = false;

     //QuestContent_lv1.loadTexture('QuestContent_C');
     //---------------------------------------------------------------

     //QuestContent 2
     QuestContent_lv2 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent2');
     QuestContent_lv2.anchor.setTo(0.5, 0.5);
     QuestContent_lv2.fixedToCamera = true;
     QuestContent_lv2.visible = false;
     //---------------------------------------------------------------

     //QuestContent 3
     QuestContent_lv3 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent3');
     QuestContent_lv3.anchor.setTo(0.5, 0.5);
     QuestContent_lv3.fixedToCamera = true;
     QuestContent_lv3.visible = false;
     //---------------------------------------------------------------

     //QuestContent 4
     QuestContent_lv4 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent4');
     QuestContent_lv4.anchor.setTo(0.5, 0.5);
     QuestContent_lv4.fixedToCamera = true;
     QuestContent_lv4.visible = false;
     //---------------------------------------------------------------

     //QuestContent 5
     QuestContent_lv5 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent5');
     QuestContent_lv5.anchor.setTo(0.5, 0.5);
     QuestContent_lv5.fixedToCamera = true;
     QuestContent_lv5.visible = false;
     //---------------------------------------------------------------

     //QuestContent 6
     QuestContent_lv6 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent6');
     QuestContent_lv6.anchor.setTo(0.5, 0.5);
     QuestContent_lv6.fixedToCamera = true;
     QuestContent_lv6.visible = false;
     //---------------------------------------------------------------

     //QuestContent 7
     QuestContent_lv7 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent7');
     QuestContent_lv7.anchor.setTo(0.5, 0.5);
     QuestContent_lv7.fixedToCamera = true;
     QuestContent_lv7.visible = false;
     //---------------------------------------------------------------

     //QuestContent 8
     QuestContent_lv8 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent8');
     QuestContent_lv8.anchor.setTo(0.5, 0.5);
     QuestContent_lv8.fixedToCamera = true;
     QuestContent_lv8.visible = false;
     //---------------------------------------------------------------

     //QuestContent 9
     QuestContent_lv9 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent9');
     QuestContent_lv9.anchor.setTo(0.5, 0.5);
     QuestContent_lv9.fixedToCamera = true;
     QuestContent_lv9.visible = false;
     //---------------------------------------------------------------

     //QuestContent 10
     QuestContent_lv10 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent10');
     QuestContent_lv10.anchor.setTo(0.5, 0.5);
     QuestContent_lv10.fixedToCamera = true;
     QuestContent_lv10.visible = false;
     //---------------------------------------------------------------

     //Quest TEXT
     style = { font: "20px Roboto", fill: "#ffffff", wordWrap: true, wordWrapWidth: QuestContent_lv1.width, align: "left", stroke: "#000000", strokeThickness: 2};

     text1 = Lucifer_Game.add.text(0, 0 , " 경험치 :  "+ characterQuest[0].exReword +" Exp \n Gold :  - Lup ", style);
     text1.setShadow(2, 2, '#000000', 0, true, true);
     text1.anchor.set(0.5);

     text2 = Lucifer_Game.add.text(0, 0 , " 경험치 :  "+ characterQuest[1].exReword +" Exp \n Gold : "+ characterQuest[1].goldReword +" Lup ", style);
     text2.setShadow(2, 2, '#000000', 0, true, true);
     text2.anchor.set(0.5);

     text3 = Lucifer_Game.add.text(0, 0 , " 경험치 :  "+ characterQuest[2].exReword +" Exp \n Gold : "+ characterQuest[2].goldReword +" Lup ", style);
     text3.setShadow(2, 2, '#000000', 0, true, true);
     text3.anchor.set(0.5);

     text4 = Lucifer_Game.add.text(0, 0 , " 경험치 :  "+ characterQuest[3].exReword +" Exp \n Gold : "+ characterQuest[3].goldReword +" Lup ", style);
     text4.setShadow(2, 2, '#000000', 0, true, true);
     text4.anchor.set(0.5);

     text5 = Lucifer_Game.add.text(0, 0 , " 경험치 :  "+ characterQuest[4].exReword +" Exp \n Gold : "+ characterQuest[4].goldReword +" Lup ", style);
     text5.setShadow(2, 2, '#000000', 0, true, true);
     text5.anchor.set(0.5);

     text6 = Lucifer_Game.add.text(0, 0 , " 경험치 :  "+ characterQuest[5].exReword +" Exp \n Gold : "+ characterQuest[5].goldReword +" Lup ", style);
     text6.setShadow(2, 2, '#000000', 0, true, true);
     text6.anchor.set(0.5);

     text7 = Lucifer_Game.add.text(0, 0 , " 경험치 :  "+ characterQuest[6].exReword +" Exp \n Gold : "+ characterQuest[6].goldReword +" Lup ", style);
     text7.setShadow(2, 2, '#000000', 0, true, true);
     text7.anchor.set(0.5);

     text8 = Lucifer_Game.add.text(0, 0 , " 경험치 :  "+ characterQuest[7].exReword +" Exp \n Gold : "+ characterQuest[7].goldReword +" Lup ", style);
     text8.setShadow(2, 2, '#000000', 0, true, true);
     text8.anchor.set(0.5);

     text9 = Lucifer_Game.add.text(0, 0 , " 경험치 :  "+ characterQuest[8].exReword +" Exp \n Gold : "+ characterQuest[8].goldReword +" Lup ", style);
     text9.setShadow(2, 2, '#000000', 0, true, true);
     text9.anchor.set(0.5);

     text10 = Lucifer_Game.add.text(0, 0 , " 경험치 : "+ characterQuest[9].exReword +" Exp \n Gold : "+ characterQuest[9].goldReword +" Lup ", style);
     text10.setShadow(2, 2, '#000000', 0, true, true);
     text10.anchor.set(0.5);

     text1.visible = false;
     text2.visible = false;
     text3.visible = false;
     text4.visible = false;
     text5.visible = false;
     text6.visible = false;
     text7.visible = false;
     text8.visible = false;
     text9.visible = false;
     text10.visible = false;

     btnText.visible = false;
     btnText2.visible = false;
     btnText3.visible = false;
     btnText4.visible = false;
     btnText5.visible = false;
     btnText6.visible = false;
     btnText7.visible = false;
     btnText8.visible = false;
     btnText9.visible = false;
     btnText10.visible = false;
     //----------------------------------------------------------------

     checkQuestIsComplete();

}

function QuestUpdate(){
    /**************************

            UPDATE문 작성

    ***************************/

    if(Key_Quest.isDown)
    {
        keyValidTimer.start();
        if(validCheck == 1)
        {
            QuestUi();
        }
        validCheck = 0;
    }

    if(Key_Info.isDown)
    {
        keyValidTimer.start();
        if(validCheck == 1)
        {
            InfoUi();
        }
        validCheck = 0;
    }

    text1.x = Math.floor(QuestContent_lv1.x - 340 + QuestContent_lv1.width / 2);
    text1.y = Math.floor(QuestContent_lv1.y - 65 + QuestContent_lv1.height / 2);

    text2.x = Math.floor(QuestContent_lv2.x - 340 + QuestContent_lv2.width / 2);
    text2.y = Math.floor(QuestContent_lv2.y - 65 + QuestContent_lv2.height / 2);

    text3.x = Math.floor(QuestContent_lv3.x - 340 + QuestContent_lv3.width / 2);
    text3.y = Math.floor(QuestContent_lv3.y - 65 + QuestContent_lv3.height / 2);

    text4.x = Math.floor(QuestContent_lv4.x - 340 + QuestContent_lv4.width / 2);
    text4.y = Math.floor(QuestContent_lv4.y - 65 + QuestContent_lv4.height / 2);

    text5.x = Math.floor(QuestContent_lv5.x - 340 + QuestContent_lv5.width / 2);
    text5.y = Math.floor(QuestContent_lv5.y - 65 + QuestContent_lv5.height / 2);

    text6.x = Math.floor(QuestContent_lv6.x - 340 + QuestContent_lv6.width / 2);
    text6.y = Math.floor(QuestContent_lv6.y - 65 + QuestContent_lv6.height / 2);

    text7.x = Math.floor(QuestContent_lv7.x - 340 + QuestContent_lv7.width / 2);
    text7.y = Math.floor(QuestContent_lv7.y - 65 + QuestContent_lv7.height / 2);

    text8.x = Math.floor(QuestContent_lv8.x - 340 + QuestContent_lv8.width / 2);
    text8.y = Math.floor(QuestContent_lv8.y - 65 + QuestContent_lv8.height / 2);

    text9.x = Math.floor(QuestContent_lv9.x - 340 + QuestContent_lv9.width / 2);
    text9.y = Math.floor(QuestContent_lv9.y - 65 + QuestContent_lv9.height / 2);

    text10.x = Math.floor(QuestContent_lv10.x - 340 + QuestContent_lv10.width / 2);
    text10.y = Math.floor(QuestContent_lv10.y - 65 + QuestContent_lv10.height / 2);

    //btnTEXT

    btnText.x = Math.floor(Questbtn_lv1.x - 180 + Questbtn_lv1.width / 2);
    btnText.y = Math.floor(Questbtn_lv1.y - 18 + Questbtn_lv1.height / 2);

    btnText2.x = Math.floor(Questbtn_lv2.x - 197 + Questbtn_lv2.width / 2);
    btnText2.y = Math.floor(Questbtn_lv2.y - 18 + Questbtn_lv2.height / 2);

    btnText3.x = Math.floor(Questbtn_lv3.x - 186 + Questbtn_lv3.width / 2);
    btnText3.y = Math.floor(Questbtn_lv3.y - 18 + Questbtn_lv3.height / 2);

    btnText4.x = Math.floor(Questbtn_lv4.x - 200 + Questbtn_lv4.width / 2);
    btnText4.y = Math.floor(Questbtn_lv4.y - 18 + Questbtn_lv4.height / 2);

    btnText5.x = Math.floor(Questbtn_lv5.x - 193 + Questbtn_lv5.width / 2);
    btnText5.y = Math.floor(Questbtn_lv5.y - 18 + Questbtn_lv5.height / 2);

    btnText6.x = Math.floor(Questbtn_lv6.x - 196 + Questbtn_lv6.width / 2);
    btnText6.y = Math.floor(Questbtn_lv6.y - 18 + Questbtn_lv6.height / 2);

    btnText7.x = Math.floor(Questbtn_lv7.x - 200 + Questbtn_lv7.width / 2);
    btnText7.y = Math.floor(Questbtn_lv7.y - 18 + Questbtn_lv7.height / 2);

    btnText8.x = Math.floor(Questbtn_lv8.x - 167 + Questbtn_lv8.width / 2);
    btnText8.y = Math.floor(Questbtn_lv8.y - 18 + Questbtn_lv8.height / 2);

    btnText9.x = Math.floor(Questbtn_lv9.x - 194 + Questbtn_lv9.width / 2);
    btnText9.y = Math.floor(Questbtn_lv9.y - 18 + Questbtn_lv9.height / 2);

    btnText10.x = Math.floor(Questbtn_lv10.x - 196 + Questbtn_lv10.width / 2);
    btnText10.y = Math.floor(Questbtn_lv10.y - 18 + Questbtn_lv10.height / 2);
}


function viewQuest()
{
    UI_Quest.visible = true;

    //Questbtn
    Questbtn_lv1.visible = true;
    Questbtn_lv2.visible = true;
    Questbtn_lv3.visible = true;
    Questbtn_lv4.visible = true;
    Questbtn_lv5.visible = true;
    Questbtn_lv6.visible = true;
    Questbtn_lv7.visible = true;
    Questbtn_lv8.visible = true;
    Questbtn_lv9.visible = true;
    Questbtn_lv10.visible = true;

    //QuestContent
    //QuestContent.visible = true;

    btnText.visible = true;
    btnText2.visible = true;
    btnText3.visible = true;
    btnText4.visible = true;
    btnText5.visible = true;
    btnText6.visible = true;
    btnText7.visible = true;
    btnText8.visible = true;
    btnText9.visible = true;
    btnText10.visible = true;

}

function viewInfo()
{
    UI_Info.visible = true;
}

function QuestUi()
{
    if(UI_Quest.visible == true)
    {
        UI_Quest.visible = false;

        //Questbtn
        Questbtn_lv1.visible = false;
        Questbtn_lv2.visible = false;
        Questbtn_lv3.visible = false;
        Questbtn_lv4.visible = false;
        Questbtn_lv5.visible = false;
        Questbtn_lv6.visible = false;
        Questbtn_lv7.visible = false;
        Questbtn_lv8.visible = false;
        Questbtn_lv9.visible = false;
        Questbtn_lv10.visible = false;

        //QuestContent
        QuestContent_lv1.visible = false;
        QuestContent_lv2.visible = false;
        QuestContent_lv3.visible = false;
        QuestContent_lv4.visible = false;
        QuestContent_lv5.visible = false;
        QuestContent_lv6.visible = false;
        QuestContent_lv7.visible = false;
        QuestContent_lv8.visible = false;
        QuestContent_lv9.visible = false;
        QuestContent_lv10.visible = false;

        //Quest TEXT
        text1.visible = false;
        text2.visible = false;
        text3.visible = false;
        text4.visible = false;
        text5.visible = false;
        text6.visible = false;
        text7.visible = false;
        text8.visible = false;
        text9.visible = false;
        text10.visible = false;

        //Quest btn TEXT
        btnText.visible = false;
        btnText2.visible = false;
        btnText3.visible = false;
        btnText4.visible = false;
        btnText5.visible = false;
        btnText6.visible = false;
        btnText7.visible = false;
        btnText8.visible = false;
        btnText9.visible = false;
        btnText10.visible = false;
    }
    else
    {
        viewQuest();
    }
}

function InfoUi()
{
    if(UI_Info.visible == true)
    {
        UI_Info.visible = false;
    }
    else
    {
        viewInfo();
    }
    playerQuestAdvence(0);
}

function timeCheck(){
    validCheck = 1;
}

function actionOnClick1() {

    QuestContent_lv1.visible = true;
    text1.visible = true;

    QuestContent_lv2.visible = false;
    text2.visible = false;

    QuestContent_lv3.visible = false;
    text3.visible = false;

    QuestContent_lv4.visible = false;
    text4.visible = false;

    QuestContent_lv5.visible = false;
    text5.visible = false;

    QuestContent_lv6.visible = false;
    text6.visible = false;

    QuestContent_lv7.visible = false;
    text7.visible = false;

    QuestContent_lv8.visible = false;
    text8.visible = false;

    QuestContent_lv9.visible = false;
    text9.visible = false;

    QuestContent_lv10.visible = false;
    text10.visible = false;

}

function actionOnClick2() {

    QuestContent_lv1.visible = false;
    text1.visible = false;

    QuestContent_lv2.visible = true;
    text2.visible = true;

    QuestContent_lv3.visible = false;
    text3.visible = false;

    QuestContent_lv4.visible = false;
    text4.visible = false;

    QuestContent_lv5.visible = false;
    text5.visible = false;

    QuestContent_lv6.visible = false;
    text6.visible = false;

    QuestContent_lv7.visible = false;
    text7.visible = false;

    QuestContent_lv8.visible = false;
    text8.visible = false;

    QuestContent_lv9.visible = false;
    text9.visible = false;

    QuestContent_lv10.visible = false;
    text10.visible = false;

}

function actionOnClick3() {

    QuestContent_lv1.visible = false;
    text1.visible = false;

    QuestContent_lv2.visible = false;
    text2.visible = false;

    QuestContent_lv3.visible = true;
    text3.visible = true;

    QuestContent_lv4.visible = false;
    text4.visible = false;

    QuestContent_lv5.visible = false;
    text5.visible = false;

    QuestContent_lv6.visible = false;
    text6.visible = false;

    QuestContent_lv7.visible = false;
    text7.visible = false;

    QuestContent_lv8.visible = false;
    text8.visible = false;

    QuestContent_lv9.visible = false;
    text9.visible = false;

    QuestContent_lv10.visible = false;
    text10.visible = false;

}

function actionOnClick4() {

    QuestContent_lv1.visible = false;
    text1.visible = false;

    QuestContent_lv2.visible = false;
    text2.visible = false;

    QuestContent_lv3.visible = false;
    text3.visible = false;

    QuestContent_lv4.visible = true;
    text4.visible = true;

    QuestContent_lv5.visible = false;
    text5.visible = false;

    QuestContent_lv6.visible = false;
    text6.visible = false;

    QuestContent_lv7.visible = false;
    text7.visible = false;

    QuestContent_lv8.visible = false;
    text8.visible = false;

    QuestContent_lv9.visible = false;
    text9.visible = false;

    QuestContent_lv10.visible = false;
    text10.visible = false;

}

function actionOnClick5() {

    QuestContent_lv1.visible = false;
    text1.visible = false;

    QuestContent_lv2.visible = false;
    text2.visible = false;

    QuestContent_lv3.visible = false;
    text3.visible = false;

    QuestContent_lv4.visible = false;
    text4.visible = false;

    QuestContent_lv5.visible = true;
    text5.visible = true;

    QuestContent_lv6.visible = false;
    text6.visible = false;

    QuestContent_lv7.visible = false;
    text7.visible = false;

    QuestContent_lv8.visible = false;
    text8.visible = false;

    QuestContent_lv9.visible = false;
    text9.visible = false;

    QuestContent_lv10.visible = false;
    text10.visible = false;

}

function actionOnClick6() {

    QuestContent_lv1.visible = false;
    text1.visible = false;

    QuestContent_lv2.visible = false;
    text2.visible = false;

    QuestContent_lv3.visible = false;
    text3.visible = false;

    QuestContent_lv4.visible = false;
    text4.visible = false;

    QuestContent_lv5.visible = false;
    text5.visible = false;

    QuestContent_lv6.visible = true;
    text6.visible = true;

    QuestContent_lv7.visible = false;
    text7.visible = false;

    QuestContent_lv8.visible = false;
    text8.visible = false;

    QuestContent_lv9.visible = false;
    text9.visible = false;

    QuestContent_lv10.visible = false;
    text10.visible = false;

}

function actionOnClick7() {

    QuestContent_lv1.visible = false;
    text1.visible = false;

    QuestContent_lv2.visible = false;
    text2.visible = false;

    QuestContent_lv3.visible = false;
    text3.visible = false;

    QuestContent_lv4.visible = false;
    text4.visible = false;

    QuestContent_lv5.visible = false;
    text5.visible = false;

    QuestContent_lv6.visible = false;
    text6.visible = false;

    QuestContent_lv7.visible = true;
    text7.visible = true;

    QuestContent_lv8.visible = false;
    text8.visible = false;

    QuestContent_lv9.visible = false;
    text9.visible = false;

    QuestContent_lv10.visible = false;
    text10.visible = false;

}

function actionOnClick8() {

    QuestContent_lv1.visible = false;
    text1.visible = false;

    QuestContent_lv2.visible = false;
    text2.visible = false;

    QuestContent_lv3.visible = false;
    text3.visible = false;

    QuestContent_lv4.visible = false;
    text4.visible = false;

    QuestContent_lv5.visible = false;
    text5.visible = false;

    QuestContent_lv6.visible = false;
    text6.visible = false;

    QuestContent_lv7.visible = false;
    text7.visible = false;

    QuestContent_lv8.visible = true;
    text8.visible = true;

    QuestContent_lv9.visible = false;
    text9.visible = false;

    QuestContent_lv10.visible = false;
    text10.visible = false;

}

function actionOnClick9() {

    QuestContent_lv1.visible = false;
    text1.visible = false;

    QuestContent_lv2.visible = false;
    text2.visible = false;

    QuestContent_lv3.visible = false;
    text3.visible = false;

    QuestContent_lv4.visible = false;
    text4.visible = false;

    QuestContent_lv5.visible = false;
    text5.visible = false;

    QuestContent_lv6.visible = false;
    text6.visible = false;

    QuestContent_lv7.visible = false;
    text7.visible = false;

    QuestContent_lv8.visible = false;
    text8.visible = false;

    QuestContent_lv9.visible = true;
    text9.visible = true;

    QuestContent_lv10.visible = false;
    text10.visible = false;

}

function actionOnClick10() {

    QuestContent_lv1.visible = false;
    text1.visible = false;

    QuestContent_lv2.visible = false;
    text2.visible = false;

    QuestContent_lv3.visible = false;
    text3.visible = false;

    QuestContent_lv4.visible = false;
    text4.visible = false;

    QuestContent_lv5.visible = false;
    text5.visible = false;

    QuestContent_lv6.visible = false;
    text6.visible = false;

    QuestContent_lv7.visible = false;
    text7.visible = false;

    QuestContent_lv8.visible = false;
    text8.visible = false;

    QuestContent_lv9.visible = false;
    text9.visible = false;

    QuestContent_lv10.visible = true;
    text10.visible = true;

}

//게임 로딩시 퀘스트 체크
function checkQuestIsComplete(){
    var characterQuestLength = characterQuest.length;
    for(i=0; i<characterQuestLength; i++){
        if(characterQuest[i].isCompleted){
            var questOrder = i+1;
            var theQuest = eval('QuestContent_lv'+questOrder);
            var completeSprite = 'QuestContent'+questOrder+'_C';
            theQuest.loadTexture(completeSprite);
        }else{

        }
    }
}

function playerQuestAdvence(index){
    characterQuest[index];
    if(characterQuest[index].isCompleted === false){
        characterQuest[index].isCompleted = true;
        console.log('완료');
        characterQuestPut(index);
        characterQuestExperienceUp(index);
        characterQuestGoldUp(index);
    }else{

    }
    checkQuestIsComplete();
}

//퀘스트 완료 체크
function characterQuestPut(index){
    $.ajax({
        method:'PUT',
        url:'/api/user/character/characterquest/',
        data:{
            index: index,
        },
    });
}

//퀘스트 완료시 경험치 업데이트
function characterQuestExperienceUp(index){
    experience += characterQuest[index].exReword;
}

//퀘스트 완료시 골드 업데이트
function characterQuestGoldUp(index){
    if(characterQuest[index].goldReword === undefined){
    }else{
    gold+=characterQuest[index].goldReword;
    goldUpdate();
    }
}
