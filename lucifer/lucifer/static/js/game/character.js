(function(){
    $("document").ready(function(){

        $get_id = $('#character');

        get_character_api_url = '/api/user/character/';


        /*****************************
         * 케릭터 정보를 가져오기 위해서 사용된 코드
         *
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
