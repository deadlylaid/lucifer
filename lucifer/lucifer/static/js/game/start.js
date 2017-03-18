(function(){
    $("document").ready(function(){

        $get_id = $('#character');

        var nickname,
            level,
            job,
            attack_point,
            defence_point,
            dexterity,
            health,
            mana,
            dexterity,
            intelligence,


        //현재 로그인 된 유저가 케릭터를 갖고 있는지 확인하는 코드
        $user_has_character = $(".data").data("hasCharacter");

        /*****************************
         * 유저가 캐릭터를 갖고 있을때
         * ***************************/
        if($user_has_character=="True"){
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
                character = data[0].character[0];
                nickname = character.nickname;
                level = character.level
                job = character.job
                attack_point = character.status.attack_point
                defence_point = character.status.defence_point
                dexterity = character.status.dexterity
                health = character.status.health
                mana = character.status.mana
                dexterity = character.status.dexterity
                intelligence = character.status.intelligence
                console.log(nickname);
                //callback 함수
                alert_function(nickname);
            });

            function alert_function(nickname){
                console.log(nickname);
            }

            $button1 = $(".higherfunction");
            console.log($button1);

            $button1.click(function(){
                console.log(nickname);
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

                $.ajax({
                    method:'PUT',
                    url:'/api/user/character/status/',
                    data:{
                        nickname:nickname,
                        level:level,
                        job:job,
                        attack_point:attack_point,
                        defence_point:defence_point,
                        health:health,
                        mana:mana,
                        dexterity:dexterity,
                        intelligence:intelligence,
                    },
                }).done(function(receivedStatusData){
                   alert(receivedStatusData.health);
                });
            });

        }
    });
})();
