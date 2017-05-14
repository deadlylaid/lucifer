//Tyreal
//---------------------------------------------------------------------------------------
var npc_Tyreal;
var text_talk;
var Talkbox;
//---------------------------------------------------------------------------------------

var line = [];
var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;

var content2 = [
    "영웅이여, 나는 타이리얼이라고 하네..",
    "이 땅에 루시퍼가 부활한 지 10년이 지났지만 더 강력하게 부활한 루시퍼를",
    "평화로운 세상에 안주했던 우리들 천사와 인간들의 힘으로 도저히 당해낼 수 없었네..",
    "이제 자네 덕분에 루시퍼를 다시 봉인하여 인간 세상에 평화를 되찾을 수 있을 것이네",
    "평화에 적응된 인간들과 천사들은 이번 일을 계기로 다시 재정비를 할 것이야.",
    "정말 고맙네.. ",
];

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
								  '../../static/images/game/Npc/tyreal/tyreal.png', 256, 256);

	Lucifer_Game.load.spritesheet('Tyreal_TalkBox', '../../static/images/game/Ending/Tyreal_TalkBox.png', 990, 400);
}

function npc_Tyreal_Create(PointX, PointY)
{
	npc_Tyreal = new Tyreal(Lucifer_Game, PointX, PointY);

	//Animation
	npc_Tyreal.animations.add('NPC_Tyreal_Ani',
							  [
							     0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
							  ], 60, true);
	npc_Tyreal.animations.play('NPC_Tyreal_Ani', 10, true);

	//setting
	npc_Tyreal.scale.setTo(2.0, 2.0);
	npc_Tyreal.anchor.setTo(0.5, 0.5);
	npc_Tyreal.blendMode = Phaser.blendModes.ADD;

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

	text_talk = Lucifer_Game.add.text(600, 400, '', {font: '15px HYmprL', fill: '#ffffff'});
    text_talk.anchor.set(0.5);
    text_talk.fixedToCamera = true;
    text_talk.stroke = '#000000';
    text_talk.strokeThickness = 2;
    text_talk.setShadow(3, 3, '#000000', 0, true, true);
    text_talk.padding.set(10, 16);
    text_talk.fontWeight = 'bold';
	

}

function EndingTalk(){
	console.log("Talk");

	Talkbox = Lucifer_Game.add.sprite(600, 510, 'Tyreal_TalkBox');
	Talkbox.fixedToCamera = true;
	Talkbox.anchor.setTo(0.5, 0.5);
	Talkbox.visible = true;

	

    nextLine();

}

function nextLine() {

    if (lineIndex === content2.length)
    {
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = content2[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    Lucifer_Game.time.events.repeat(wordDelay, line.length, nextWord, this);

    //  Advance to the next line
    lineIndex++;

}

function nextWord() {

    //  Add the next word onto the text string, followed by a space
    text_talk.text = text_talk.text.concat(line[wordIndex] + " ");

    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        text_talk.text = text_talk.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        Lucifer_Game.time.events.add(lineDelay, nextLine, this);
    }

}