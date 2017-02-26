(function(){
    $("document").ready(function(){

        $get_id = $('#character');

        get_character_api_url = '/api/user/character/';


        /*****************************
         * 2017년 2월 26일 한민수
         * json을 이용하여 캐릭터 데이터를 가져온다
         * 가져오는 정보 닉네임, 레벨, 직업
         * **************************/
        $.ajax({

            method:'GET',
            url:get_character_api_url,

        }).done(function(data){
            console.log(data[0])
                character = data[0]
                $get_id.append("<li> 케릭터 닉네임: "+character.nickname+"</li>",
                    "<li> 케릭터 레벨: "+character.level+"</li>",
                    "<li> 케릭터 직업: "+character.job+"</li>");
            });


    });
})();
