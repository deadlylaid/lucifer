/*****************************
* 2017년 3월 13일 최영준
* pig2d 를 이용한 기본 게임 로직 js
* **************************/


//## Main Function
function main(evt){
	//--texture
	var textures = evt.textures;

	//--Scene Mgr Create
	var SceneMgr = new Pig2d.SceneManager({
		container: document.querySelector('#scene')
	});

    console.log(SceneMgr);

	//--Sprite Node Create(Example)
	var SpriteNode = Pig2d.util.createSlicedImage({
		imgObj : textures['../images/Player/Bavarian/stand/Stand.png'],
		basex : -textures['../images/Player/Bavarian/stand/Stand.png'].width / 2,
		basey : -textures['../images/Player/Bavarian/stand/Stand.png'].height / 2
	});
	SpriteNode.get('model').setPosition(640, 400);

	//--Sprite Node add to SceneMgr
	SceneMgr.add(SpriteNode);

	//--Controller Setting
	Pig2d.util.setup_pig2dTestController(
		document,		//Evenet 받을 대상
		SpriteNode);	//조종할 대상이 되는 객체

	//Timer Setting & Performance Test Infomation(FPS)
	var GameTimer = new gbox3d.core.Timer();
	var Framerate_Info = document.querySelector("#text-Framerate-Info");
	var Frame_Total = 0;
	var Loop_Count = 0;

	//Game Loop
	requestAnimationFrame(
		function loop(){
			var DeltaTime = GameTimer.getDeltaTime();

			Frame_Total += Math.round(1.0 / DeltaTime);
			Loop_Count++;
			Framerate_Info.innerText = Math.round(Frame_Total / Loop_Count);

			//SceneMgr Update
			//여기서 모든 노드의 최신 상태가 화면에 반영 된다.
			SceneMgr.updateAll();
			requestAnimationFrame(loop);
		}
	);
}

/*
Pig2d.util.SetupAsset({
	asset_path : "../res/",
	img_files : ["../images/Player/Bavarian/stand/Stand.png"],
	OnLoadComplete : main
});
*/
