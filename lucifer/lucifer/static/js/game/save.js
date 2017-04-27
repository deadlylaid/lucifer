function gameSave(){
    $.ajax({
        method:'PUT',
        url:'/api/gamesave/data/',
        data:{
            nickname : nickname,
            level: level,
            gold:gold,
            health:health,
            maxHealth:maxHealth,
            attack_point:attack_point,
            defence_point:defence_point,
            strong:strong,
            dexterity:dexterity,
            intelligence:intelligence,
            experience:experience,
        },
    });
}
