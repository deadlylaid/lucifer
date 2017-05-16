//Tyreal
//---------------------------------------------------------------------------------------
var npc_Tyreal;
var text_talk;
var Talkbox;
var Tyreal_Rect;
var npc_Tyreal_ClickCheck = false;
var npc_Tyreal_AppearanceEffect_Check = false;
var npc_Tyreal_AppearanceEffect;
//---------------------------------------------------------------------------------------

//Talkbox effct
var line = [];
var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;

var content2 = [
    "영웅이여, 나는 타이리얼이라고 하네..",
    "이 땅에 루시퍼가 부활한 지 10년이 지났지만 더 강력하게 부활한 루시퍼를",
    "평화로운 세상에 안주했던 우리들 천사와 인간들의 힘으로 도저히 당해낼 수 없었네..",
    "평화에 적응된 인간들과 천사들은 이번 일을 계기로 다시 재정비를 할 것이야.",
    "자네 덕분에 인간세상에 다시 평화가 찾아왔어. 정말 고맙네.."
];

//---------------------------------------------------------------------------------------

//Talk box btn
var Exit_button;
var Credits_button;

Tyreal = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, 'NPC_Tyreal');

	//Pos
	this.PointX = x, this.PointY = y;
}

Tyreal.prototype = Object.create(Phaser.Sprite.prototype);
Tyreal.prototype.constructor = Tyreal;

function npc_Tyreal_Preload()
{
	Lucifer_Game.load.spritesheet('NPC_Tyreal',
								  '../../static/images/game/Npc/tyreal/tyreal.png', 600, 230);
	Lucifer_Game.load.spritesheet('Tyreal_TalkBox', '../../static/images/game/Ending/Tyreal_TalkBox.png', 990, 400);

	Lucifer_Game.load.spritesheet('Exit_button', '../../static/images/game/Ending/Ending_exitbtn.png', 110, 35);
	Lucifer_Game.load.spritesheet('Credits_button', '../../static/images/game/Ending/Ending_creditsbtn.png', 110, 35);
	Lucifer_Game.load.spritesheet('Tyreal_Effect', '../../static/images/game/Effect/LevelUp_Effect/Level_Effect.png', 128, 113);
}

function npc_Tyreal_Create(PointX, PointY)
{
	npc_Tyreal = new Tyreal(Lucifer_Game, PointX, PointY);

	Tyreal_Rect = new Phaser.Rectangle(npc_Tyreal.x, npc_Tyreal.y, 100, 100);
	//Animation
	npc_Tyreal.animations.add('NPC_Tyreal_Ani',
							  [	
							     0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
							  ], 60, true);
	npc_Tyreal.animations.play('NPC_Tyreal_Ani', 10, true);

	//setting
	npc_Tyreal.scale.setTo(0.7, 0.7);
	npc_Tyreal.anchor.setTo(0.5, 0.5);
	npc_Tyreal.blendMode = Phaser.blendModes.ADD;
	npc_Tyreal.visible = false;
	//npc_Tyreal.fixedToCamera = true;

	Lucifer_Game.physics.p2.enable(npc_Tyreal);
	npc_Tyreal.body.fixedRotation = true;
	npc_Tyreal.body.clearShapes();
	npc_Tyreal.body.addRectangle(120, 120, 0, 0);
	npc_Tyreal.body.debug = false;
	npc_Tyreal.body.static = true;	

	Lucifer_Game.physics.enable(npc_Tyreal, Phaser.Physics.ARCADE);
    npc_Tyreal.inputEnabled = true;

    npc_Tyreal.events.onInputDown.add(EndingTalk, this);


	Lucifer_Game.add.existing(npc_Tyreal);

	//Talkbox background image 
	Talkbox = Lucifer_Game.add.sprite(600, 510, 'Tyreal_TalkBox');
	Talkbox.fixedToCamera = true;
	Talkbox.anchor.setTo(0.5, 0.5);
	Talkbox.visible = false;

	//Talkbox Text 
	text_talk = Lucifer_Game.add.text(540, 631, '', {font: '15px', fill: '#ffffff'});
    text_talk.anchor.set(0.5);
    text_talk.fixedToCamera = true;
    text_talk.font = 'Myungjo';
    text_talk.fontWeight = 'bold';
    text_talk.lineSpacing = 0;
    text_talk.visible = false;

    //Talkbox btn
    Exit_button = Lucifer_Game.add.button(820, 650, 'Exit_button', exit2, this, 1, 0);
	Credits_button = Lucifer_Game.add.button(938, 650, 'Credits_button', credits, this, 1, 0);

	Exit_button.fixedToCamera = true;
	Credits_button.fixedToCamera = true;

    Exit_button.onInputUp.add(exit2, this);
    Credits_button.onInputUp.add(credits, this);
    
    Exit_button.visible = false;
    Credits_button.visible = false;

    Exit_button.input.useHandCursor = true;
    Credits_button.input.useHandCursor = true;

    //Appearance_Effect
    npc_Tyreal_AppearanceEffect = Lucifer_Game.add.sprite(npc_Tyreal.x, npc_Tyreal.y, 'Tyreal_Effect');
    npc_Tyreal_AppearanceEffect.anchor.setTo(0.5, 0.5);
    npc_Tyreal_AppearanceEffect.visible = false;
    npc_Tyreal_AppearanceEffect.blendMode = Phaser.blendModes.ADD;

    //Effect Animation
    npc_Tyreal_AppearanceEffect.animations.add('Tyreal_Effect_Ani',
    											[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 60, true);
    npc_Tyreal_AppearanceEffect.animations.play('Tyreal_Effect_Ani', 10, true);
}

function EndingTalk(){
	if(npc_Tyreal_ClickCheck == false)
	{
		npc_Tyreal_ClickCheck = true;
	}

	Talkbox.visible = true;
	text_talk.visible = true;

	Exit_button.visible = true;
	Credits_button.visible = true;

    nextLine();
}


function nextLine() {

    if (lineIndex === content2.length)
    {
        return;
    }

    line = content2[lineIndex].split(' ');

    wordIndex = 0;

    Lucifer_Game.time.events.repeat(wordDelay, line.length, nextWord, this);

    lineIndex++;

}

function nextWord() {

    text_talk.text = text_talk.text.concat(line[wordIndex] + " ");

    wordIndex++;

    if (wordIndex === line.length)
    {
        text_talk.text = text_talk.text.concat("\n");
        Lucifer_Game.time.events.add(lineDelay, nextLine, this);
    }
}

function exit2() {
	window.close();
}

function credits(){
	Lucifer_Game.state.start('Ending');

	if(npc_Tyreal_ClickCheck == false)
	{
		npc_Tyreal_ClickCheck = true;	
	}
	else if(npc_Tyreal_ClickCheck == true)
	{
		npc_Tyreal_ClickCheck = false;
	}	
}