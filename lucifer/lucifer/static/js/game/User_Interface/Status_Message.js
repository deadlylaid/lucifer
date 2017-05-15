//Status Message
//-------------------------------------------------------------------------------------
var status_Message, status_Message_Group;
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

	status_Message = new Status_Message(Lucifer_Game, 120, 680, render_Text);
	status_Message.fixedToCamera = true;

	Lucifer_Game.physics.arcade.enable(status_Message);

	//Timer
	status_Message.CheckTimer = Lucifer_Game.time.create(false);
	status_Message.CheckTimer.loop(1000, status_Message_CheckTimer, Lucifer_Game, status_Message);

	Lucifer_Game.add.existing(status_Message);

	status_Message_Group.add(status_Message);
}

function status_Message_CheckTimer(Object)
{
	++Object.CheckTime_Total;
}

function status_Message_Update(Object)
{
	for(var i = 0; i < status_Message_Group.length; ++i)
	{
		var message = status_Message_Group.getChildAt(i);
		var max_Index = status_Message_Group.length - 1;

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