//Countess
//----------------------------------------------------------------------------------------------
var countess_Group, countess_Object;
//----------------------------------------------------------------------------------------------

//Countess
Countess = function(game, x, y, Hp, MaxHp, CognizeRange, AttackRange)
{
	Phaser.Sprite.call(this, game, x, y, '');
	this.Hp = Hp, this.MaxHp = MaxHp;
	this.CognizeRange = CognizeRange, this.AttackRange = AttackRange;

	//Status
	this.Status = new Array('Stand', 'Run', 'Attack', 'Dead');

	//Position
	this.PointX = x, this.PointY = y, this.ReturnPointX = x, this.ReturnPointY = y;

	//UI
	this.HpBar, this.HpMask, this.Name;

	//Rect
	this.HitRect, this.AttackRect;

	//Time
	this.Attack_DelayTimer, this.DelayTime_Total = 1;

	//Direction
	this.Distance, this.Angle, this.PreDirection, this.Direction;

	//Return Direction
	this.ReturnDistance, this.ReturnDirection, this.ReturnAngle;

	//MotionCheck
	this.MoveCheck = false, this.StandCheck = false;
	this.AttackCheck = false, this.CompareCheck = false;
	this.DamageCheck = false, this.DeadCheck = false;
	this.DeadMotionCheck = false;
}

Countess.prototype = Object.create(Phaser.Sprite.prototype);
Countess.prototype.constructor = Countess;

//Preload / Create / Clone
//----------------------------------------------------------------------------------------------
function countess_Preload()
{
	Lucifer_Game.load.spritesheet('MON_Countess_Stand',
								  '../../static/images/game/Monster/Countess/stand/stand.png',
								  65, 93);
	Lucifer_Game.load.spritesheet('MON_Countess_Run',
								  '../../static/images/game/Monster/Countess/run/run.png',
								  97, 109);
	Lucifer_Game.load.spritesheet('MON_Countess_Attack',
								  '../../static/images/game/Monster/Countess/attack/attack.png',
								  115, 103);
	Lucifer_Game.load.spritesheet('MON_Countess_Dead',
								  '../../static/images/game/Monster/Countess/death/death.png',
								  154, 129);
}

function countess_Create()
{
	Lucifer_Game.renderer.setTexturePriority(['MON_Countess_Stand', 'MON_Countess_Run', 
											  'MON_Countess_Attack', 'MON_Countess_Dead']);
	countess_Group = Lucifer_Game.add.group();
}

function countess_Clone(PointX, PointY)
{

}
//----------------------------------------------------------------------------------------------

