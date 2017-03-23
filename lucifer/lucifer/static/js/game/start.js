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


/*****************************
 * 유저가 캐릭터를 갖고 있을때
 * ***************************/
get_gamestart_api_url = '/api/gamestart/data/';

/*****************************
 * 2017년 2월 26일 한민수
 * json을 이용하여 캐릭터 데이터를 가져온다
 * 가져오는 정보 닉네임, 레벨, 직업
 * **************************/
$.ajax({

    method:'GET',
    url:get_gamestart_api_url,
    async: false,

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
});
