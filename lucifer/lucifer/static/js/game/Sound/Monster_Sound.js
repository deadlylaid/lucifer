// Monster Sound
//-------------------------------------------------------------------------------------
var sound_Andairel_Attack, sound_Andairel_Dead, sound_Andairel_Neutral, sound_Andairel_Skill;
var sound_Countess_Attack, sound_Countess_Dead;
var sound_Deamon_Attack, sound_Deamon_Dead, sound_Deamon_Neutral;
var sound_Golem_Attack, sound_Golem_Dead;
var sound_Lucifer_AttackOne, sound_Lucifer_AttackTwo, sound_Lucifer_Dead, sound_Lucifer_Laugh;
var sound_Lucifer_SkillOne, sound_Lucifer_SkillTwo, sound_Lucifer_SkillThree;
var sound_SandRider_Attack, sound_SandRider_Dead, sound_SandRider_Neutral;
var sound_Skeleton_Attack, sound_Skeleton_Create, sound_Skeleton_Dead, sound_Skeleton_Neutral;
var sound_Wraith_Attack, sound_Wraith_Dead, sound_Wraith_Neutral;
//-------------------------------------------------------------------------------------

function monster_Sound_Preload()
{
	//Andariel
	//-------------------------------------------------------------------------------------
	Lucifer_Game.load.audio('Andairel_Attack', '../../static/sound/Monster/Andariel/attack.wav');
	Lucifer_Game.load.audio('Andairel_Dead', '../../static/sound/Monster/Andariel/death.wav');
	Lucifer_Game.load.audio('Andairel_Neutral', '../../static/sound/Monster/Andariel/neutral.wav');
	Lucifer_Game.load.audio('Andairel_Skill', '../../static/sound/Monster/Andariel/skill.wav');
	//-------------------------------------------------------------------------------------
	//Countess
	//-------------------------------------------------------------------------------------
	Lucifer_Game.load.audio('Countess_Attack', '../../static/sound/Monster/Countess/attack.wav');
	Lucifer_Game.load.audio('Countess_Dead', '../../static/sound/Monster/Countess/death.wav');
	//-------------------------------------------------------------------------------------
	//Deamon
	//-------------------------------------------------------------------------------------
	Lucifer_Game.load.audio('Deamon_Attack', '../../static/sound/Monster/Deamon/attack.wav');
	Lucifer_Game.load.audio('Deamon_Dead', '../../static/sound/Monster/Deamon/death.wav');
	Lucifer_Game.load.audio('Deamon_Neutral', '../../static/sound/Monster/Deamon/neutral.wav');
	//-------------------------------------------------------------------------------------
	//Golem
	//-------------------------------------------------------------------------------------
	Lucifer_Game.load.audio('Golem_Attack', '../../static/sound/Monster/Golem/attack.wav');
	Lucifer_Game.load.audio('Golem_Dead', '../../static/sound/Monster/Golem/death.wav');
	//-------------------------------------------------------------------------------------
	//Lucifer
	//-------------------------------------------------------------------------------------
	Lucifer_Game.load.audio('Lucifer_Attack_One', '../../static/sound/Monster/Lucifer/attack_One.wav');
	Lucifer_Game.load.audio('Lucifer_Attack_Two', '../../static/sound/Monster/Lucifer/attack_Two.wav');
	Lucifer_Game.load.audio('Lucifer_Dead', '../../static/sound/Monster/Lucifer/death.wav');
	Lucifer_Game.load.audio('Lucifer_Laugh', '../../static/sound/Monster/Lucifer/laugh.wav');
	Lucifer_Game.load.audio('Lucifer_Skill_One', '../../static/sound/Monster/Lucifer/skill_One.wav');
	Lucifer_Game.load.audio('Lucifer_Skill_Two', '../../static/sound/Monster/Lucifer/skill_Two.wav');
	Lucifer_Game.load.audio('Lucifer_Skill_Three', '../../static/sound/Monster/Lucifer/skill_Three.wav');
	//-------------------------------------------------------------------------------------
	//Sand Rider
	//-------------------------------------------------------------------------------------
	Lucifer_Game.load.audio('SandRider_Attack', '../../static/sound/Monster/Sand_Rider/attack.wav');
	Lucifer_Game.load.audio('SandRider_Dead', '../../static/sound/Monster/Sand_Rider/death.wav');
	Lucifer_Game.load.audio('SandRider_Neutral', '../../static/sound/Monster/Sand_Rider/neutral.wav');
	//-------------------------------------------------------------------------------------
	//Skeleton
	//-------------------------------------------------------------------------------------
	Lucifer_Game.load.audio('Skeleton_Attack', '../../static/sound/Monster/Skeleton/attack.wav');
	Lucifer_Game.load.audio('Skeleton_Create', '../../static/sound/Monster/Skeleton/create.wav');
	Lucifer_Game.load.audio('Skeleton_Dead', '../../static/sound/Monster/Skeleton/death.wav');
	Lucifer_Game.load.audio('Skeleton_Neutral', '../../static/sound/Monster/Skeleton/neutral.wav');
	//-------------------------------------------------------------------------------------
	//Wraith
	//-------------------------------------------------------------------------------------
	Lucifer_Game.load.audio('Wraith_Attack', '../../static/sound/Monster/Wraith/attack.wav');
	Lucifer_Game.load.audio('Wraith_Dead', '../../static/sound/Monster/Wraith/death.wav');
	Lucifer_Game.load.audio('Wraith_Neural', '../../static/sound/Monster/Wraith/neutral.wav');
	//-------------------------------------------------------------------------------------
}

function monster_Sound_Create()
{
	//Andariel
    sound_Andairel_Attack = Lucifer_Game.add.audio('Andairel_Attack', 0.3, true);
    sound_Andairel_Dead = Lucifer_Game.add.audio('Andairel_Dead', 0.3, false);
    sound_Andairel_Neutral = Lucifer_Game.add.audio('Andairel_Neutral', 0.3, false);
    sound_Andairel_Skill = Lucifer_Game.add.audio('Andairel_Skill', 0.3, true);

    sound_Andairel_Attack.play();
    sound_Andairel_Attack.stop();
    sound_Andairel_Dead.play();
    sound_Andairel_Dead.stop();
    sound_Andairel_Neutral.play();
    sound_Andairel_Neutral.stop();
    sound_Andairel_Skill.play();
    sound_Andairel_Skill.stop();

    //Countess
    sound_Countess_Attack = Lucifer_Game.add.audio('Countess_Attack', 0.2, false);
    sound_Countess_Dead = Lucifer_Game.add.audio('Countess_Dead', 0.2, false);

    sound_Countess_Attack.play();
    sound_Countess_Attack.stop();
    sound_Countess_Dead.play();
    sound_Countess_Dead.stop();

    //Golem
    sound_Golem_Attack = Lucifer_Game.add.audio('Golem_Attack', 0.3, false);
    sound_Golem_Dead = Lucifer_Game.add.audio('Golem_Dead', 0.3, false);

    sound_Golem_Attack.play();
    sound_Golem_Attack.stop();
	sound_Golem_Dead.play();
	sound_Golem_Dead.stop();

    //Deamon
    sound_Deamon_Attack = Lucifer_Game.add.audio('Deamon_Attack', 0.3, true);
    sound_Deamon_Dead = Lucifer_Game.add.audio('Deamon_Dead', 0.3, false);
    sound_Deamon_Neutral = Lucifer_Game.add.audio('Deamon_Neutral', 0.3, false);

    sound_Deamon_Attack.play();
    sound_Deamon_Attack.stop();
    sound_Deamon_Dead.play();
    sound_Deamon_Dead.stop();
    sound_Deamon_Neutral.play();
    sound_Deamon_Neutral.stop();

    //Lucifer
    sound_Lucifer_AttackOne = Lucifer_Game.add.audio('Lucifer_Attack_One', 0.3, true);
    sound_Lucifer_AttackTwo = Lucifer_Game.add.audio('Lucifer_Attack_Two', 0.3, true);
    sound_Lucifer_Dead = Lucifer_Game.add.audio('Lucifer_Dead', 0.3, false);
    sound_Lucifer_Laugh = Lucifer_Game.add.audio('Lucifer_Laugh', 0.3, false);
    sound_Lucifer_SkillOne = Lucifer_Game.add.audio('Lucifer_Skill_One', 0.3, false);
    sound_Lucifer_SkillTwo = Lucifer_Game.add.audio('Lucifer_Skill_Two', 0.3, false);
    sound_Lucifer_SkillThree = Lucifer_Game.add.audio('Lucifer_Skill_Three', 0.3, false);

    sound_Lucifer_AttackOne.play();
    sound_Lucifer_AttackOne.stop();
    sound_Lucifer_AttackTwo.play();
    sound_Lucifer_AttackTwo.stop();
    sound_Lucifer_Dead.play();
    sound_Lucifer_Dead.stop();
    sound_Lucifer_Laugh.play();
    sound_Lucifer_Laugh.stop();
    sound_Lucifer_SkillOne.play();
    sound_Lucifer_SkillOne.stop();
    sound_Lucifer_SkillTwo.play();
    sound_Lucifer_SkillTwo.stop();
    sound_Lucifer_SkillThree.play();
    sound_Lucifer_SkillThree.stop();

    //Sand Rider
 	sound_SandRider_Attack = Lucifer_Game.add.audio('SandRider_Attack', 0.3, true);
 	sound_SandRider_Dead = Lucifer_Game.add.audio('SandRider_Dead', 0.3, false);
 	sound_SandRider_Neutral = Lucifer_Game.add.audio('SandRider_Neutral', 0.3, false);   

 	sound_SandRider_Attack.play();
 	sound_SandRider_Attack.stop();
 	sound_SandRider_Dead.play();
 	sound_SandRider_Dead.stop();
 	sound_SandRider_Neutral.play();
 	sound_SandRider_Neutral.stop();

 	//Skeleton
 	sound_Skeleton_Attack = Lucifer_Game.add.audio('Skeleton_Attack', 0.3, true); 
 	sound_Skeleton_Create = Lucifer_Game.add.audio('Skeleton_Create', 0.3, false); 
 	sound_Skeleton_Dead = Lucifer_Game.add.audio('Skeleton_Dead', 0.3, false); 
 	sound_Skeleton_Neutral = Lucifer_Game.add.audio('Skeleton_Neutral', 0.3, false);

 	sound_Skeleton_Attack.play();
 	sound_Skeleton_Attack.stop();
 	sound_Skeleton_Create.play();
 	sound_Skeleton_Create.stop();
 	sound_Skeleton_Dead.play();
 	sound_Skeleton_Dead.stop();
 	sound_Skeleton_Neutral.play();
 	sound_Skeleton_Neutral.stop();

 	//Wraith
 	sound_Wraith_Attack = Lucifer_Game.add.audio('Wraith_Attack', 0.3, true);
 	sound_Wraith_Dead = Lucifer_Game.add.audio('Wraith_Dead', 0.3, false);
 	sound_Wraith_Neutral = Lucifer_Game.add.audio('Wraith_Neural', 0.3, false);

 	sound_Wraith_Attack.play();
 	sound_Wraith_Attack.stop();
 	sound_Wraith_Dead.play();
 	sound_Wraith_Dead.stop();
 	sound_Wraith_Neutral.play();
 	sound_Wraith_Neutral.stop();
}