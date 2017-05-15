var store_Npc, cain_Npc;
var npc_Angle, npc_Direction, npc_PreDirection, npc_Distance, npc_Range;
var npc_compareCheck = false;
//---------------------------------------------------------------------------------------
//cain Talkbox

var npc_Cain_ClickCheck = false;

var Cain_text_talk;
var Cain_TalkBox;

//Talkbox effct
var line2 = [];
var wordIndex2 = 0;
var lineIndex2 = 0;

var wordDelay2 = 120;
var lineDelay2 = 400;

var content3 = [
    "영웅이여, 나는 타이리얼이라고 하네..",
    "이 땅에 루시퍼가 부활한 지 10년이 지났지만 더 강력하게 부활한 루시퍼를",
    "평화로운 세상에 안주했던 우리들 천사와 인간들의 힘으로 도저히 당해낼 수 없었네..",
    "평화에 적응된 인간들과 천사들은 이번 일을 계기로 다시 재정비를 할 것이야.",
    "자네 덕분에 인간세상에 다시 평화가 찾아왔어. 정말 고맙네.."
];

//Talk box btn
var Exit_button2;

function npc_Preload()
{
	//NPC
	Lucifer_Game.load.spritesheet('NPC_Store',
								  '../../static/images/game/Npc/Npc1.png', 100, 100);
	Lucifer_Game.load.spritesheet('NPC_Cain',
								  '../../static/images/game/Npc/cain/cain.png', 70, 70);

	Lucifer_Game.load.spritesheet('Cain_TalkBox', '../../static/images/game/Npc/cain/cain_Talkbox.png', 990, 400);
}

function npc_Create()
{
	Lucifer_Game.renderer.setTexturePriority(['NPC_Store']);

	//NPC Create
	store_Npc = Lucifer_Game.add.sprite(1337, 1402, 'NPC_Store');
	npc_Range = 200;

	cain_Npc = Lucifer_Game.add.sprite(1941, 961, 'NPC_Cain');

	//NPC Animation
	var j = 0;
	for(var i = 0; i < 8; ++i)
	{
		store_Npc.animations.add('NPC_Store_Ani_' + i,
								 [
								 	j,     j + 1, j + 2, j + 3,  j + 4,  j + 5,  j + 6,
								 	j + 7, j + 8, j + 9, j + 10, j + 11, j + 12
								 ],
								 60, true);
		j += 13;
	}
	store_Npc.animations.play('NPC_Store_Ani_4', 10, true);
	store_Npc.anchor.setTo(0.5, 0.5);

	cain_Npc.animations.add('NPC_Cain_Ani',
							[
							   0, 1, 2, 3, 4, 5, 6, 7
							], 60, true);
	cain_Npc.animations.play('NPC_Cain_Ani', 10, true);
	cain_Npc.anchor.setTo(0.5, 0.5);

	//NPC Setting
	Lucifer_Game.physics.p2.enable(store_Npc);
	store_Npc.body.fixedRotation = true;
	store_Npc.body.clearShapes();
	store_Npc.body.addRectangle(40, 60, 0, 0);
	store_Npc.body.debug = false;
	store_Npc.body.static = true;

	//Cain
	Lucifer_Game.physics.p2.enable(cain_Npc);
	cain_Npc.body.fixedRotation = true;
	cain_Npc.body.clearShapes();
	cain_Npc.body.addRectangle(40, 60, 0, 0);
	cain_Npc.body.debug = false;
	cain_Npc.body.static = true;

	Lucifer_Game.physics.enable(store_Npc, Phaser.Physics.ARCADE);
    store_Npc.inputEnabled = true;
    store_Npc.events.onInputDown.add(showStore, this);


    Cain_TalkBox = Lucifer_Game.add.sprite(600, 510, 'Cain_TalkBox');
	Cain_TalkBox.fixedToCamera = true;
	Cain_TalkBox.anchor.setTo(0.5, 0.5);
	Cain_TalkBox.visible = false;

    Lucifer_Game.physics.enable(cain_Npc, Phaser.Physics.ARCADE);
	cain_Npc.inputEnabled = true;
	cain_Npc.events.onInputDown.add(Cain_Talk, this);


}

function npc_GetDirection()
{
	npc_Distance = Phaser.Math.distance(store_Npc.x, store_Npc.y, Player.x, Player.y);

	if(npc_Distance < npc_Range)
	{
		npc_Angle = Lucifer_Game.physics.arcade.angleToXY(store_Npc, Player.world.x, Player.world.y);
		npc_Angle = Math.abs(npc_Angle);

		if(store_Npc.y < Player.y)
		{
			npc_Angle = 2 * Math.PI - npc_Angle;
		}

		if(npc_Angle >= 0 && npc_Angle <= 0.7)
		{
			npc_Direction = 7;
		}
		else if(npc_Angle > 0.7 && npc_Angle <= 1.9)
		{
			npc_Direction = 0;
		}
		else if(npc_Angle > 1.9 && npc_Angle <= 2.9)
		{
			npc_Direction = 1;
		}
		else if(npc_Angle > 2.9 && npc_Angle <= 3.9)
		{
			npc_Direction = 2;
		}
		else if(npc_Angle > 3.6 && npc_Angle <= 4.2)
		{
			npc_Direction = 3;
		}
		else if(npc_Angle > 4.2 && npc_Angle <= 4.9)
		{
			npc_Direction = 4;
		}
		else if(npc_Angle > 4.9 && npc_Angle <= 5.7)
		{
			npc_Direction = 5;
		}
		else if(npc_Angle > 5.7 && npc_Angle <= 6.2)
		{
			npc_Direction = 6;
		}

		if(npc_compareCheck == false)
		{
			npc_PreDirection = npc_Direction;
			npc_compareCheck = true;
		}

		npc_Animation_Change(npc_Direction);
	}
}

function npc_Compare_Direction(PreDirection, CurDirection)
{
	if(PreDirection != CurDirection)
	{
		npc_compareCheck = false;
	}
}

function npc_Animation_Change(Direction)
{
	store_Npc.animations.play('NPC_Store_Ani_' + Direction, 10, true);
}

function npc_Update()
{
	npc_GetDirection();
	npc_Compare_Direction(npc_PreDirection, npc_Direction);
	shadow_Npc();
}

function npc_Debug_Render()
{

}

function Cain_Talk(){
	console.log("Talk");

	if(npc_Cain_ClickCheck == false)
	{
		npc_Cain_ClickCheck = true;
		Cain_TalkBox.visible = true;

	}else if(npc_Cain_ClickCheck == true)
	{
		npc_Cain_ClickCheck = false;
		Cain_TalkBox.visible = false;
	}
	

	//text_talk.visible = true;

	//Exit_button.visible = true;
	//Credits_button.visible = true;

    //nextLine();
}


/*function nextLine2() {

    if (lineIndex2 === content3.length)
    {
        return;
    }

    line2 = content3[lineIndex].split(' ');

    wordIndex2 = 0;

    Lucifer_Game.time.events.repeat(wordDelay2, line2.length, nextWord2, this);

    lineIndex2++;

}

function nextWord() {

    Cain_text_talk.text = Cain_text_talk.text.concat(line2[wordIndex2] + " ");

    wordIndex2++;

    if (wordIndex2 === line2.length)
    {
        Cain_text_talk.text = Cain_text_talk.text.concat("\n");
        Lucifer_Game.time.events.add(lineDelay2, nextLine2, this);
    }
}*/
