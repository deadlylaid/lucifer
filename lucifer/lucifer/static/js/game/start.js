(function(){
    $("document").ready(function(){

        $get_id = $('#character');

        get_gamestart_api_url = '/api/gamestart/data/';


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
                $get_id.append("<li> 케릭터 닉네임: "+character.nickname+"</li>",
                    "<li> 케릭터 레벨: "+character.level+"</li>",
                    "<li> 케릭터 직업: "+character.job+"</li>",
                    "<li> 케릭터 공격력: "+character.status.attack_point+"</li>",
                    "<li> 케릭터 수비력: "+character.status.defence_point+"</li>",
                    "<li> 케릭터 체력: "+character.status.health+"</li>",
                    "<li> 케릭터 마나: "+character.status.mana+"</li>",
                    "<li> 케릭터 민첩: "+character.status.dexterity+"</li>",
                    "<li> 케릭터 지능: "+character.status.intelligence+"</li>"
                    );
            });


    });
})();
