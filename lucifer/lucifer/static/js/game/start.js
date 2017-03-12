(function(){
    $("document").ready(function(){

        $get_id = $('#character');

        //현재 로그인 된 유저가 케릭터를 갖고 있는지 확인하는 코드
        $user_has_character = $(".data").data("hasCharacter");


        /*****************************
         * 유저가 캐릭터를 갖고 있을때
         * ***************************/
        if($user_has_character=="True"){
get_gamestart_api_url = '/api/gamestart/data/';

            //게임 화면 태그
            $scene = $('#scene');

            $scene.css("background", "url(../static/images/game/loadingBackground.jpg) no-repeat");

            var elem = document.getElementById("myBar");
              var width = 10;
              var id = setInterval(frame, 80);
              function frame() {
                if (width >= 40) {
                  clearInterval(id);
                } else {
                  width++;
                  elem.style.width = width + '%';
                }
              }


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


        }else{
            $get_id.append("<form method='post' action='/'> <input name='nickname' type='text' style='border: 1px solid #ff0000;'><input type='button' class='btn_character' value='asdf'> </form>");

            $btn_character = $(".btn_character");
            console.log($btn_character);

            //케릭터 생성 버튼 클릭시
            $btn_character.on("click", function(event){
                function getCookie(name) {
                    var cookieValue = null;
                    if (document.cookie && document.cookie !== '') {
                        var cookies = document.cookie.split(';');
                        for (var i = 0; i < cookies.length; i++) {
                            var cookie = jQuery.trim(cookies[i]);
                            // Does this cookie string begin with the name we want?
                            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                break;
                            }
                        }
                    }
                    return cookieValue;
                }
                var csrftoken = getCookie('csrftoken');

                function csrfSafeMethod(method) {
                    //these HTTP methods do not require CSRF protection
                    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
                }
                    $.ajaxSetup({
                        beforeSend: function(xhr, settings) {
                            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                                xhr.setRequestHeader("X-CSRFToken", csrftoken);
                        }
                    }
                });

                //닉네임에 입력된 값을 잡아옴
                $nickname = $("input[name=nickname]").val();

                $.ajax({
                    method:'POST',
                    url:'/api/user/character/',
                    data:{
                        username:'asdf',
                        password:'123',
                    },
                });
            });

        }

    });
})();
