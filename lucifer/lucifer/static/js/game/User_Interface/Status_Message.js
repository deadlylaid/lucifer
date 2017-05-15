//Status Message
//-------------------------------------------------------------------------------------
var status_Message, status_Message_Group;
var max_Index;
var message;
var ExpCount = 1;

var status_Message;
var status_Message2;
var status_Message3;
var status_Message4;
var status_Message5;
//-------------------------------------------------------------------------------------

Status_Message = function(game, x, y, text)
{
	Phaser.Text.call(this, game, x, y, text,
					 {
					 	font: '13px Arial',
					 	fill: '#19de65',
					 	align: 'left'
					 });

	this.anchor.set(0.5);
	this.fontWeight = 'normal';

	//Text Check
	this.TextUpCheck = false;

	//Timer
	this.CheckTimer, this.CheckTime_Total = 0;
}

Status_Message.prototype = Object.create(Phaser.Text.prototype);
Status_Message.prototype.constructor = Status_Message;

function status_Message_Craete()
{
	status_Message_Group = Lucifer_Game.add.group();	
}

function status_Message_Clone(text)
{	
	

	var render_Text = "경험치를 " + text + "획득하였습니다.";

	switch(ExpCount){
		case 1 :
			status_Message = Lucifer_Game.add.text(120, 580, render_Text, { font: "13px", fill: "#ffffff" });
			status_Message.fixedToCamera = true;
		break;
		case 2 :
			status_Message2 = Lucifer_Game.add.text(120, 600, render_Text, { font: "13px", fill: "#ffffff" });
			status_Message2.fixedToCamera = true;
		break;
		case 3 :
			status_Message3 = Lucifer_Game.add.text(120, 620, render_Text, { font: "13px", fill: "#ffffff" });
			status_Message3.fixedToCamera = true;
		break;
		case 4 :    
			status_Message4 = Lucifer_Game.add.text(120, 640, render_Text, { font: "13px", fill: "#ffffff" });
			status_Message4.fixedToCamera = true;
		break;
		case 5 :
			status_Message5 = Lucifer_Game.add.text(120, 660, render_Text, { font: "13px", fill: "#ffffff" });
			status_Message5.fixedToCamera = true;
		break;
	}

	Lucifer_Game.physics.arcade.enable(status_Message);

	//Timer
	status_Message.CheckTimer = Lucifer_Game.time.create(false);
	status_Message.CheckTimer.loop(1000, status_Message_CheckTimer, Lucifer_Game, status_Message);

	Lucifer_Game.add.existing(status_Message);

	status_Message_Group.add(status_Message);

	ExpCount += 1;
}

function status_Message_CheckTimer(Object)
{
	++Object.CheckTime_Total;
}


function status_Message_Update(Object)
{

	for(var i = 0; i < status_Message_Group.length; ++i)
	{
		message = status_Message_Group.getChildAt(i);
		max_Index = status_Message_Group.length -1;
		
		if(max_Index > 0)
		{	
			//마지막 인덱스보다 작은 것들 새로 추가되는 것들보다 이전 것들은 위로 올린다.

			if(/*status_Message_Group.getChildIndex(message)*/ i < max_Index)
			{
				//var change_Message = status_Message_Group.getChildAt(i);

				if(Object.status_Message_Check == true)
				{
					//status_Message_Group.getChildAt(i).body.velocity.y -= 20;
					status_Message_Group.getChildAt(i).y = (Lucifer_Game.camera.y + status_Message_Group.getChildAt(i).y) - 20;

					//console.log(status_Message_Group.getChildAt(i).x, status_Message_Group.getChildAt(i).y);

					Object.status_Message_Check = false;
					Object.message_Time_Check = true;
				}	

				if(Object.message_Time_Check == true)
				{
					message.CheckTimer.start();	
				}
				else
				{
					message.CheckTime_Total = 0;
				}
				
				if(message.CheckTime_Total > 1)
				{
					Object.message_Time_Check = false;
				}
			}			
		}		

		//console.log(Lucifer_Game.camera.y, status_Message_Group.getChildAt(0).y);
	}
	
}