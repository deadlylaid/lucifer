(function(){
    $("document").ready(function(){

        $get_id = $('#character');

        get_gamestart_api_url = '/api/gamestart/data/';

        //게임 화면 태그
        $scene = $('#scene');

        $scene.css("background", "url(../static/images/game/loadingBackground.jpg) no-repeat");
        var elem = document.getElementById("myBar");
          var width = 10;
          var id = setInterval(frame, 80);
          function frame() {
            if (width >= 100) {
              clearInterval(id);
            } else {
              width++;
              elem.style.width = width + '%';
              elem.innerHTML = width * 1  + '%';
            }
          }
//        $progressbarfull = $('#progressbarfull');
//
//        $progressbarfull.css({
//            "background":"url(../static/images/game/loadingBarFull.png) no-repeat",
//            "background-size": '800px 100%'
//        }).animate({left: "+=400"}, 3000).animate({left: "+=300"}, 2500).animate({left: "+=100"}, 3000);

        /*****************************
         * 2017년 2월 26일 한민수
         * json을 이용하여 캐릭터 데이터를 가져온다
         * 가져오는 정보 닉네임, 레벨, 직업
         * **************************/
        $.ajax({

            method:'GET',
            url:get_gamestart_api_url,

        }).done(function(data){
            //console.log(data)
            //console.log(data[0])
            //console.log(data[0].character[0])
            //console.log(data[0].character[0].status.health)
            //console.log(data[1].monster[0])
                character = data[0].character[0]
                $get_id.append("<li class='stat'> 케릭터 닉네임: "+character.nickname+"</li>",
                    "<li class='stat'> 케릭터 레벨: "+character.level+"</li>",
                    "<li class='stat'> 케릭터 직업: "+character.job+"</li>",
                    "<li class='stat'> 케릭터 공격력: "+character.status.attack_point+"</li>",
                    "<li class='stat'> 케릭터 수비력: "+character.status.defence_point+"</li>",
                    "<li class='stat'> 케릭터 체력: "+character.status.health+"</li>",
                    "<li class='stat'> 케릭터 마나: "+character.status.mana+"</li>",
                    "<li class='stat'> 케릭터 민첩: "+character.status.dexterity+"</li>",
                    "<li class='stat'> 케릭터 지능: "+character.status.intelligence+"</li>"
                    );
            });


    });
})();
