/*
	##Lucifer Game SceneMgr(최영준)
	여기서 게임 이라는 Lucifer_Game을 생성하고 
	나머지 게임의 상태(Sccene)을 추가해주는 역항르 한다.

	처음 시작을 Loading 화면으로 해준다.
*/

var Lucifer_Game = new Phaser.Game(1280, 800, Phaser.CANVAS, 'scene');


Lucifer_Game.state.add('boot', bootScene);
Lucifer_Game.state.add('load', loadScene);
Lucifer_Game.state.add('logo', logoScene);
Lucifer_Game.state.add('select', menuSelectScene);
Lucifer_Game.state.add('stage1', stage1_Scene);
Lucifer_Game.state.add('stage2_load', stage2_LoadScene);
Lucifer_Game.state.add('stage2', stage2_Scene);
Lucifer_Game.state.add('stage3', stage3_Scene);

Lucifer_Game.state.start('boot');