var validCheck = 1,
    UI_Quest,
    Key_Quest,
    keyValidTimer;

function QuestPreload(){

    Lucifer_Game.load.spritesheet('UI_Quest', '../../static/images/game/UI/Quest/QuestFrame.png', 867, 580);

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
}


function viewQuest()
{
    UI_Quest.visible = true;
}

function QuestUi()
{
    if(UI_Quest.visible == true)
    {
        UI_Quest.visible = false;
    }
    else
    {
        viewQuest();
    }
}

function timeCheck(){
    validCheck = 1;
}