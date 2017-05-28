var nickname,
    level,
    job,
    gold,
    attack_point,
    defence_point,
    strong,
    dexterity,
    maxHealth,
    maxMana,
    health,
    mana,
    dexterity,
    intelligence,
    accuracy,
    evasion,
    experience,
    skill,
    learnedSkill,
    quickSlot,
    characterStage,
    characterPositionX,
    characterPositionY;


var inventory = [];

var itemList = [];

var equipmentList = [];

var characterQuest = [];

get_gamestart_api_url = '/api/gamestart/data/';

/*****************************
 * 2017년 2월 26일 한민수
 * json을 이용하여 캐릭터 데이터를 가져온다
 * 가져오는 정보 닉네임, 레벨, 직업, 능력치
 * ****************************/
$.ajax({

    method:'GET',
    url:get_gamestart_api_url,
    async: false,

}).done(function(data){
    //console.log(data)
    character = data[0].character[0];
    nickname = character.nickname;
    level = character.level;
    job = character.job;
    gold = character.gold;

    health = parseInt(character.status.health);
    mana = character.status.mana;

    experience = character.status.experience;

    maxHealth = parseInt(character.status.max_health);
    maxMana = character.status.max_mana;

    attack_point = character.status.attack_point;
    defence_point = character.status.defence_point;

    strong = parseInt(character.status.strong);
    dexterity = character.status.dexterity;
    intelligence = character.status.intelligence;

    accuracy = character.status.accuracy;
    evasion = character.status.evasion;

    characterStage = character.position.stage;
    characterPositionX = character.position.position_x;
    characterPositionY = character.position.position_y;

    inventory = character.inventory_set;

    quickSlot = character.quickslot_set;

    learnedSkill = character.learnedskill_set;

    itemList = data[2].item;

    equipmentList = character.equipment_set;

    characterQuest = character.characterquest_set;
});
