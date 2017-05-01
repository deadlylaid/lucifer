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
            firstSkillDamage:learnedSkill[0].damage,
            secondSkillDamage:learnedSkill[1].damage,
            thirdSkillDamage:learnedSkill[2].damage,
            fourthSkillDamage:learnedSkill[3].damage,
            fifthSkillDamage:learnedSkill[4].damage,
        },
    });
}
