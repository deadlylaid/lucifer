WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    //active: function() { Lucifer_Game.time.events.add(Phaser.Timer.SECOND, create, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Oswald'] //Londrina Solid
    }

};

var Ending_Scene =
{



	preload: function()
	{
		this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

		this.load.image('space', '../../static/images/game/Menu/logospace.png', 138, 15);
		this.load.image('logo', '../../static/images/game/Menu/logo.png');

		this.load.image('Picture1', '../../static/images/game/Ending/1.png', 520, 325);
		this.load.image('Picture2', '../../static/images/game/Ending/2.png', 520, 325);
		this.load.image('Picture3', '../../static/images/game/Ending/3.png', 520, 325);
		this.load.image('Picture4', '../../static/images/game/Ending/4.png', 371, 500);
		this.load.image('Picture5', '../../static/images/game/Ending/5.png', 400, 450);
		this.load.image('Picture6', '../../static/images/game/Ending/6.png', 520, 325);
		this.load.image('Picture7', '../../static/images/game/Ending/7.png', 520, 283);
		this.load.image('Picture8', '../../static/images/game/Ending/8.png', 520, 310);
		this.load.image('Picture9', '../../static/images/game/Ending/9.png', 407, 510);
		this.load.image('Picture10', '../../static/images/game/Ending/10.png', 520, 346);
		this.load.image('Picture11', '../../static/images/game/Ending/11.png', 520, 293);
		this.load.image('Picture12', '../../static/images/game/Ending/12.png', 520, 270);
		this.load.image('Picture13', '../../static/images/game/Ending/13.png', 379, 372);
		this.load.image('Picture14', '../../static/images/game/Ending/14.png', 520, 293);
		this.load.image('Picture15', '../../static/images/game/Ending/15.png', 540, 300);
		this.load.image('Picture16', '../../static/images/game/Ending/16.png', 520, 260);

	},

	create: function()
	{
		//Sound
		sound_PlayEndingBGM();

		//BackGround
		this.add.tileSprite(0, 0, 1280, 800, 'space');

		//first image------------------------------------------------------------------------------
		var sprite = Lucifer_Game.add.sprite(365, 400, 'Picture1');

		sprite.anchor.setTo(0.5, 0.5);
		sprite.alpha = 0;

		this.add.tween(sprite).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);
		//-----------------------------------------------------------------------------------------

		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 7, Picture_2, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 14, Picture_3, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 21, Picture_4, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 28, Picture_5, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 35, Picture_6, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 42, Picture_7, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 49, Picture_8, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 56, Picture_9, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 63, Picture_10, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 70, Picture_11, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 77, Picture_12, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 84, Picture_13, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 91, Picture_14, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 98, Picture_16, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 107, EndingLogo, this);
		Lucifer_Game.time.events.add(Phaser.Timer.SECOND * 117, EndGame, this);

	var content = [
	[ 	"Team", "Override" ],
	[ 	"","" ],
	[ 	"", "" ],
	[	"Team Leader", "한민수" ],
	[ 	"", "" ],
	[ 	"Team Crew", "최영준"],
	[	"", "김회언"],
	[ 	" ", "" ],
	[ 	"                  - Game Element -" ],
	[ 	" ", "" ],
	[ 	"Player", "최영준" ],
	[ 	"", "" ],
	[ 	"User Interface", "한민수" ],
	[ 	"", "" ],
	[ 	"Stage", "김회언" ],
	[ 	"", "" ],
	[ 	"Monster AI", "최영준" ],
	[ 	"", "" ],
	[ 	"Item", "한민수" ],
	[ 	"", "" ],
	[ 	"Map Object", "김회언" ],
	[ 	"", "" ],
	[ 	"NPC", "한민수" ],
	[ 	"", "" ],
	[ 	"Skill", "최영준" ],
	[ 	"", "" ],
	[ 	"Effect", "최영준" ],
	[ 	"", "" ],
	[ 	"Animation", "최영준" ],
	[ 	"", "" ],
	[ 	"Character Resource", "김회언" ],
	[ 	"", "" ],
	[ 	"Game Scene", "김회언" ],
	[ 	"", "" ],
	[ 	"Game Direction", "최영준" ],
	[ 	"", "" ],
	[ 	"Render/Optimization", "최영준" ],
	[ 	"", "" ],
	[ 	"", "" ],
	[ 	"                 - Server / Client -", "" ],
	[ 	"", "" ],
	[ 	"ServerSide Framework", "한민수" ],
	[ 	"", "" ],
	[ 	"ServerSide API", "한민수" ],
	[ 	"", "" ],
	[ 	"Client Framework", "최영준" ],
	[ 	"", "" ],
	[ 	"Client Data Parsing", "김회언" ],
	[ 	"", "" ],
	[ 	"", "" ],
	[ 	"                          - Web -", "" ],
	[ 	"", "" ],
	[ 	"Web Markup", "김회언" ],
	[ 	"", "" ],
	[ 	"Web Data Parsing", "김회언" ],
	[ 	"", "" ],
	[ 	"Web DataBase", "한민수" ],
	[ 	"", "" ],
	[ 	"", "" ],
	[ 	"                     - Additional -", "" ],
	[ 	"", "" ],
	[ 	"Game Concept", "한민수" ],
	[ 	"", "최영준" ],
	[ 	"", "김회언" ],
	[ 	"", "" ],
	[ 	"Game Story", "김회언" ],
	[ 	"", "" ],
	[ 	"Sound", "한민수" ],
	[ 	"", "최영준" ],
	[ 	"", "김회언" ],
	[ 	"", "" ],
	[ 	"Mouse Effect", "한민수" ],
	[ 	"", "김회언" ],
	[ 	"", "" ],
	[ 	"Screen Effect", "최영준" ],
	[ 	"", "" ],
	[ 	"", "" ],
	[ 	"                        - Library -", "" ],
	[ 	"", "" ],
	[ 	"Phaser js", "https://phaser.io/" ],
	[ 	"", "" ],
	[ 	"Used Program", "Adobe Dreamweaber CS6" ],
	[ 	"", "Adobe Photoshop CS6" ],
	[ 	"", "Sublime Text3" ],
	[ 	"", "GitHub" ],
	[ 	"", "PhysicsEditor" ],
	[ 	"", "Tiled" ],
	[ 	"", "" ],
	[ 	"", "" ],
	[ 	"                      - Reference -", "" ],
	[ 	"", "" ],
	[ 	"Clinet-Side", "HTML5" ],
	[ 	"", "Jinja2" ],
	[ 	"", "Javascript" ],
	[ 	"", "Jquery" ],
	[ 	"", "Three.js" ],
	[ 	"", "Pixi js" ],
	[ 	"", "" ],
	[ 	"API", "Django-rest-framework" ],
	[ 	"", "" ],
	[ 	"Server-side", "python" ],
	[ 	"", "Django" ],
	[ 	"", "Postgresql" ],
	[ 	"", "redis" ],
	[ 	"", "" ],
	[ 	"", "" ],
	[ 	"                  - Reference Site -", "" ],
	[ 	"", "" ],
	[ 	"대전신", "3k.topgame.kr" ],
	[ 	"BrowserQuest", "browserquest.mozilla.org" ],
	[ 	"크라운", "crown.nolzzang.com/home" ],
	[ 	"Diablo3", "kr.battle.net/d3/ko" ],
	[ 	"브금저장소", "bgmstore.net" ],
	[ 	"Fmod", "www.fmod.com" ],
	[ 	"", "" ],
	[ 	"", "" ],
	[ 	"                      - Affiliation -", "" ],
	[ 	"", "" ],
	[ 	"University", "Nam-Seoul Univ" ],
	[ 	"Major", "Multi-Media" ],
	[ 	"Professor", "공기식" ],
	[ 	"", "" ],
	[ 	"", "" ],
	[ 	"", "" ],
	[ 	"Thanks to Player ..", "" ],

	];

		var endingtext = Lucifer_Game.add.text(745, 400, '', { font: "25px", fill: "#ffffff" , align: "left" , tabs: [ 270 ]});
		endingtext.parseList(content);
		endingtext.font = 'Oswald';

		Lucifer_Game.physics.enable(endingtext, Phaser.Physics.ARCADE);
    	endingtext.body.velocity.y = -50;

    }

};


function Picture_2(){

		var sprite2 = Lucifer_Game.add.sprite(365, 400, 'Picture2');

		sprite2.anchor.setTo(0.5, 0.5);
		sprite2.alpha = 0;

		this.add.tween(sprite2).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_3(){

		var sprite3 = Lucifer_Game.add.sprite(365, 400, 'Picture3');

		sprite3.anchor.setTo(0.5, 0.5);
		sprite3.alpha = 0;

		this.add.tween(sprite3).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_4(){

		var sprite4 = Lucifer_Game.add.sprite(365, 400, 'Picture4');

		sprite4.anchor.setTo(0.5, 0.5);
		sprite4.alpha = 0;

		this.add.tween(sprite4).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_5(){

		var sprite5 = Lucifer_Game.add.sprite(365, 400, 'Picture5');

		sprite5.anchor.setTo(0.5, 0.5);
		sprite5.alpha = 0;

		this.add.tween(sprite5).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_6(){

		var sprite6 = Lucifer_Game.add.sprite(365, 400, 'Picture6');

		sprite6.anchor.setTo(0.5, 0.5);
		sprite6.alpha = 0;

		this.add.tween(sprite6).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_7(){

		var sprite7 = Lucifer_Game.add.sprite(365, 400, 'Picture7');

		sprite7.anchor.setTo(0.5, 0.5);
		sprite7.alpha = 0;

		this.add.tween(sprite7).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_8(){

		var sprite8 = Lucifer_Game.add.sprite(365, 400, 'Picture8');

		sprite8.anchor.setTo(0.5, 0.5);
		sprite8.alpha = 0;

		this.add.tween(sprite8).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_9(){

		var sprite9 = Lucifer_Game.add.sprite(365, 400, 'Picture9');

		sprite9.anchor.setTo(0.5, 0.5);
		sprite9.alpha = 0;

		this.add.tween(sprite9).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_10(){

		var sprite10 = Lucifer_Game.add.sprite(365, 400, 'Picture10');

		sprite10.anchor.setTo(0.5, 0.5);
		sprite10.alpha = 0;

		this.add.tween(sprite10).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_11(){

		var sprite11 = Lucifer_Game.add.sprite(365, 400, 'Picture11');

		sprite11.anchor.setTo(0.5, 0.5);
		sprite11.alpha = 0;

		this.add.tween(sprite11).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_12(){

		var sprite12 = Lucifer_Game.add.sprite(365, 400, 'Picture12');

		sprite12.anchor.setTo(0.5, 0.5);
		sprite12.alpha = 0;

		this.add.tween(sprite12).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_13(){

		var sprite13 = Lucifer_Game.add.sprite(365, 400, 'Picture13');

		sprite13.anchor.setTo(0.5, 0.5);
		sprite13.alpha = 0;

		this.add.tween(sprite13).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_14(){

		var sprite14 = Lucifer_Game.add.sprite(365, 400, 'Picture14');

		sprite14.anchor.setTo(0.5, 0.5);
		sprite14.alpha = 0;

		this.add.tween(sprite14).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_15(){

		var sprite15 = Lucifer_Game.add.sprite(365, 400, 'Picture15');

		sprite15.anchor.setTo(0.5, 0.5);
		sprite15.alpha = 0;

		this.add.tween(sprite15).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function Picture_16(){

		var sprite16 = Lucifer_Game.add.sprite(365, 400, 'Picture16');

		sprite16.anchor.setTo(0.5, 0.5);
		sprite16.alpha = 0;

		this.add.tween(sprite16).to({ alpha: 1}, 3500, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function EndingLogo(){

		var sprite17 = Lucifer_Game.add.sprite(640, 400, 'logo');

		sprite17.anchor.setTo(0.5, 0.5);
		sprite17.alpha = 0;

		this.add.tween(sprite17).to({ alpha: 1}, 3000, Phaser.Easing.Linear.None, true, 0, 0, true);

}

function EndGame(){
		//Sound
		sound_StopEndingBGM();
		window.close();

}
