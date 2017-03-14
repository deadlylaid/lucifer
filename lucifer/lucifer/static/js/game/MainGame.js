/*****************************
* 2017년 3월 13일 최영준
* pig2d 를 이용한 기본 게임 로직 js
* **************************/
<<<<<<< HEAD


//## Main Function
=======
//## Main Function	
>>>>>>> 어제한거까지
function main(evt){
	//--texture
	var textures = evt.textures;

	//--Scene Mgr Create
	var SceneMgr = new Pig2d.SceneManager({
		container: document.querySelector('.pig2d-fullscreen')
	});

    console.log(SceneMgr);

	//--Sprite Node Create(Example)
	var SpriteNode = Pig2d.util.createSlicedImage({
		imgObj : textures['Stand.png'],
		cutx   : 0,
		cuty   : 0,
		basex  : -textures['Stand.png'].width / 2,
		basey  : -textures['Stand.png'].height / 2,
		width  : textures['Stand.png'].width / 2,
		height : textures['Stand.png'].height / 2
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

//잘안됨.
Pig2d.util.SetupAsset({
	asset_path : "../res/",
	img_files : [
		"Stand.png"
	],
	OnLoadComplete : main
});
<<<<<<< HEAD
*/
=======
>>>>>>> 어제한거까지
