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

var text, text2, text3, text4, text5, text6, text7, text8, text9, text10, style;

function QuestPreload(){

    Lucifer_Game.load.spritesheet('UI_Quest', '../../static/images/game/UI/Quest/QuestFrame.png', 867, 580);
    Lucifer_Game.load.spritesheet('Questbtn', '../../static/images/game/UI/Quest/QuestBtn.png', 325, 43);
    Lucifer_Game.load.spritesheet('QuestContent', '../../static/images/game/UI/Quest/Questcontent.png', 463, 439);

};

function QuestCreate(){

    //Tab 이미지 추가
    //--------------------------------------------------------

    //Quest-----------------------------------------------
    //--------------------------------------------------------



    UI_Quest = Lucifer_Game.add.sprite(640, 360, 'UI_Quest');
    UI_Quest.anchor.setTo(0.5, 0.5);
    UI_Quest.fixedToCamera = true;
    UI_Quest.visible = false;

    Key_Quest = Lucifer_Game.input.keyboard.addKey(Phaser.Keyboard.Q);

    keyValidTimer = Lucifer_Game.time.create(false);
    keyValidTimer.loop(400, timeCheck, this);

     //---------------------------------------------------------------
     // button (over , normal , click) 

     //QuestButton Level 1 
     Questbtn_lv1 = Lucifer_Game.add.button(393, 600, 'Questbtn', actionOnClick1, this, 1, 0, 2);
     Questbtn_lv1.anchor.setTo(0.5, 0.5);
     Questbtn_lv1.fixedToCamera = true;
     Questbtn_lv1.visible = false;
     //---------------------------------------------------------------

     //QuestButton Level 2 
     Questbtn_lv2 = Lucifer_Game.add.button(393, 557, 'Questbtn', actionOnClick2, this, 1, 0, 2);
     Questbtn_lv2.anchor.setTo(0.5, 0.5);
     Questbtn_lv2.fixedToCamera = true;
     Questbtn_lv2.visible = false;
     //---------------------------------------------------------------

     //QuestButton Level 3 
     Questbtn_lv3 = Lucifer_Game.add.button(393, 514, 'Questbtn', actionOnClick3, this, 1, 0, 2);
     Questbtn_lv3.anchor.setTo(0.5, 0.5);
     Questbtn_lv3.fixedToCamera = true;
     Questbtn_lv3.visible = false;
     //---------------------------------------------------------------

     //QuestButton Level 4 
     Questbtn_lv4 = Lucifer_Game.add.button(393, 471, 'Questbtn', actionOnClick4, this, 1, 0, 2);
     Questbtn_lv4.anchor.setTo(0.5, 0.5);
     Questbtn_lv4.fixedToCamera = true;
     Questbtn_lv4.visible = false;
     //---------------------------------------------------------------

     //QuestButton Level 5 
     Questbtn_lv5 = Lucifer_Game.add.button(393, 428, 'Questbtn', actionOnClick5, this, 1, 0, 2);
     Questbtn_lv5.anchor.setTo(0.5, 0.5);
     Questbtn_lv5.fixedToCamera = true;
     Questbtn_lv5.visible = false;
     //---------------------------------------------------------------

     //QuestButton Level 6 
     Questbtn_lv6 = Lucifer_Game.add.button(393, 385, 'Questbtn', actionOnClick6, this, 1, 0, 2);
     Questbtn_lv6.anchor.setTo(0.5, 0.5);
     Questbtn_lv6.fixedToCamera = true;
     Questbtn_lv6.visible = false;
     //---------------------------------------------------------------

     //QuestButton Level 7 
     Questbtn_lv7 = Lucifer_Game.add.button(393, 342, 'Questbtn', actionOnClick7, this, 1, 0, 2);
     Questbtn_lv7.anchor.setTo(0.5, 0.5);
     Questbtn_lv7.fixedToCamera = true;
     Questbtn_lv7.visible = false;
     //---------------------------------------------------------------

     //QuestButton Level 8 
     Questbtn_lv8 = Lucifer_Game.add.button(393, 299, 'Questbtn', actionOnClick8, this, 1, 0, 2);
     Questbtn_lv8.anchor.setTo(0.5, 0.5);
     Questbtn_lv8.fixedToCamera = true;
     Questbtn_lv8.visible = false;
     //---------------------------------------------------------------

     //QuestButton Level 9 
     Questbtn_lv9 = Lucifer_Game.add.button(393, 256, 'Questbtn', actionOnClick9, this, 1, 0, 2);
     Questbtn_lv9.anchor.setTo(0.5, 0.5);
     Questbtn_lv9.fixedToCamera = true;
     Questbtn_lv9.visible = false;
     //---------------------------------------------------------------

     //QuestButton Level 10 
     Questbtn_lv10 = Lucifer_Game.add.button(393, 213, 'Questbtn', actionOnClick10, this, 1, 0, 2);
     Questbtn_lv10.anchor.setTo(0.5, 0.5);
     Questbtn_lv10.fixedToCamera = true;
     Questbtn_lv10.visible = false;
     //---------------------------------------------------------------

     //---------------------------------------------------------------------------------------------
     //QuestContent 1
     QuestContent_lv1 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent');
     QuestContent_lv1.anchor.setTo(0.5, 0.5);
     QuestContent_lv1.fixedToCamera = true;
     QuestContent_lv1.visible = false;
     //---------------------------------------------------------------

     //QuestContent 2
     QuestContent_lv2 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent');
     QuestContent_lv2.anchor.setTo(0.5, 0.5);
     QuestContent_lv2.fixedToCamera = true;
     QuestContent_lv2.visible = false;
     //---------------------------------------------------------------

     //QuestContent 3
     QuestContent_lv3 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent');
     QuestContent_lv3.anchor.setTo(0.5, 0.5);
     QuestContent_lv3.fixedToCamera = true;
     QuestContent_lv3.visible = false;
     //---------------------------------------------------------------

     //QuestContent 4
     QuestContent_lv4 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent');
     QuestContent_lv4.anchor.setTo(0.5, 0.5);
     QuestContent_lv4.fixedToCamera = true;
     QuestContent_lv4.visible = false;
     //---------------------------------------------------------------

     //QuestContent 5
     QuestContent_lv5 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent');
     QuestContent_lv5.anchor.setTo(0.5, 0.5);
     QuestContent_lv5.fixedToCamera = true;
     QuestContent_lv5.visible = false;
     //---------------------------------------------------------------

     //QuestContent 6
     QuestContent_lv6 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent');
     QuestContent_lv6.anchor.setTo(0.5, 0.5);
     QuestContent_lv6.fixedToCamera = true;
     QuestContent_lv6.visible = false;
     //---------------------------------------------------------------

     //QuestContent 7
     QuestContent_lv7 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent');
     QuestContent_lv7.anchor.setTo(0.5, 0.5);
     QuestContent_lv7.fixedToCamera = true;
     QuestContent_lv7.visible = false;
     //---------------------------------------------------------------

     //QuestContent 8
     QuestContent_lv8 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent');
     QuestContent_lv8.anchor.setTo(0.5, 0.5);
     QuestContent_lv8.fixedToCamera = true;
     QuestContent_lv8.visible = false;
     //---------------------------------------------------------------

     //QuestContent 9
     QuestContent_lv9 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent');
     QuestContent_lv9.anchor.setTo(0.5, 0.5);
     QuestContent_lv9.fixedToCamera = true;
     QuestContent_lv9.visible = false;
     //---------------------------------------------------------------

     //QuestContent 10
     QuestContent_lv10 = Lucifer_Game.add.sprite(817, 382.5, 'QuestContent');
     QuestContent_lv10.anchor.setTo(0.5, 0.5);
     QuestContent_lv10.fixedToCamera = true;
     QuestContent_lv10.visible = false;
     //---------------------------------------------------------------

     //Quest TEXT
     style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: QuestContent_lv1.width, align: "center", backgroundColor: "#ffff00" };

     text = Lucifer_Game.add.text(0, 0 , " Quest 1", style);
     text.anchor.set(0.5);

     text2 = Lucifer_Game.add.text(0, 0 , " Quest 2", style);
     text2.anchor.set(0.5);

     text3 = Lucifer_Game.add.text(0, 0 , " Quest 3", style);
     text3.anchor.set(0.5);

     text4 = Lucifer_Game.add.text(0, 0 , " Quest 4", style);
     text4.anchor.set(0.5);

     text5 = Lucifer_Game.add.text(0, 0 , " Quest 5", style);
     text5.anchor.set(0.5);

     text6 = Lucifer_Game.add.text(0, 0 , " Quest 6", style);
     text6.anchor.set(0.5);

     text7 = Lucifer_Game.add.text(0, 0 , " Quest 7", style);
     text7.anchor.set(0.5);

     text8 = Lucifer_Game.add.text(0, 0 , " Quest 8", style);
     text8.anchor.set(0.5);

     text9 = Lucifer_Game.add.text(0, 0 , " Quest 9", style);
     text9.anchor.set(0.5);

     text10 = Lucifer_Game.add.text(0, 0 , " Quest 10", style);
     text10.anchor.set(0.5);

     text.visible = false;
     text2.visible = false;
     text3.visible = false;
     text4.visible = false;
     text5.visible = false;
     text6.visible = false;
     text7.visible = false;
     text8.visible = false;
     text9.visible = false;
     text10.visible = false;
     //----------------------------------------------------------------


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

    text.x = Math.floor(QuestContent_lv1.x - 230 + QuestContent_lv1.width / 2);
    text.y = Math.floor(QuestContent_lv1.y - 180 + QuestContent_lv1.height / 2);

    text2.x = Math.floor(QuestContent_lv1.x - 230 + QuestContent_lv1.width / 2);
    text2.y = Math.floor(QuestContent_lv1.y - 180 + QuestContent_lv1.height / 2);

    text3.x = Math.floor(QuestContent_lv1.x - 230 + QuestContent_lv1.width / 2);
    text3.y = Math.floor(QuestContent_lv1.y - 180 + QuestContent_lv1.height / 2);

    text4.x = Math.floor(QuestContent_lv1.x - 230 + QuestContent_lv1.width / 2);
    text4.y = Math.floor(QuestContent_lv1.y - 180 + QuestContent_lv1.height / 2);

    text5.x = Math.floor(QuestContent_lv1.x - 230 + QuestContent_lv1.width / 2);
    text5.y = Math.floor(QuestContent_lv1.y - 180 + QuestContent_lv1.height / 2);

    text6.x = Math.floor(QuestContent_lv1.x - 230 + QuestContent_lv1.width / 2);
    text6.y = Math.floor(QuestContent_lv1.y - 180 + QuestContent_lv1.height / 2);

    text7.x = Math.floor(QuestContent_lv1.x - 230 + QuestContent_lv1.width / 2);
    text7.y = Math.floor(QuestContent_lv1.y - 180 + QuestContent_lv1.height / 2);

    text8.x = Math.floor(QuestContent_lv1.x - 230 + QuestContent_lv1.width / 2);
    text8.y = Math.floor(QuestContent_lv1.y - 180 + QuestContent_lv1.height / 2);

    text9.x = Math.floor(QuestContent_lv1.x - 230 + QuestContent_lv1.width / 2);
    text9.y = Math.floor(QuestContent_lv1.y - 180 + QuestContent_lv1.height / 2);

    text10.x = Math.floor(QuestContent_lv1.x - 230 + QuestContent_lv1.width / 2);
    text10.y = Math.floor(QuestContent_lv1.y - 180 + QuestContent_lv1.height / 2);
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
        text.visible = false;
        text2.visible = false;
        text3.visible = false;
        text4.visible = false;
        text5.visible = false;
        text6.visible = false;
        text7.visible = false;
        text8.visible = false;
        text9.visible = false;
        text10.visible = false;
    }
    else
    {
        viewQuest();
    }
}

function timeCheck(){
    validCheck = 1;
}

function actionOnClick1() {
    console.log('click1');

    QuestContent_lv1.visible = true;
    text.visible = true;

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
    console.log('click2');

    QuestContent_lv1.visible = false;
    text.visible = false;

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
    console.log('click3');
    
    QuestContent_lv1.visible = false;
    text.visible = false;

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
    console.log('click4');
    
    QuestContent_lv1.visible = false;
    text.visible = false;

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
    console.log('click5');
    
    QuestContent_lv1.visible = false;
    text.visible = false;

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
    console.log('click6');
    
    QuestContent_lv1.visible = false;
    text.visible = false;

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
    console.log('click7');
    
    QuestContent_lv1.visible = false;
    text.visible = false;

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
    console.log('click8');
    
    QuestContent_lv1.visible = false;
    text.visible = false;

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
    console.log('click9');

    QuestContent_lv1.visible = false;
    text.visible = false;

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
    console.log('click10');

    QuestContent_lv1.visible = false;
    text.visible = false;

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
