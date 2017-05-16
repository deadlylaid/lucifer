//Status Message
//-------------------------------------------------------------------------------------
var ExpCount = 1;
var status_Message, status_Message2, status_Message3, status_Message4, status_Message5;
var status_CheckTimer, status_CheckTime_Total = 0;
var render_Text;
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
}

Status_Message.prototype = Object.create(Phaser.Text.prototype);
Status_Message.prototype.constructor = Status_Message;

function status_Message_Craete()
{
	//Timer
	status_CheckTimer = Lucifer_Game.time.create(false);
	status_CheckTimer.loop(1000, status_Message_CheckTimer, Lucifer_Game);
}

function status_Message_Item(text)
{
	render_Text = "아이템 " + text + "을 구입하였습니다.";	

	if(ExpCount <= 5)
	{
		switch(ExpCount){
		case 1 :
			status_Message = Lucifer_Game.add.text(120, 580, render_Text, { font: "13px", fill: "#19de65" });
			status_Message.fixedToCamera = true;
		break;
		case 2 :
			status_Message2 = Lucifer_Game.add.text(120, 600, render_Text, { font: "13px", fill: "#19de65" });
			status_Message2.fixedToCamera = true;
		break;
		case 3 :
			status_Message3 = Lucifer_Game.add.text(120, 620, render_Text, { font: "13px", fill: "#19de65" });
			status_Message3.fixedToCamera = true;
		break;
		case 4 :    
			status_Message4 = Lucifer_Game.add.text(120, 640, render_Text, { font: "13px", fill: "#19de65" });
			status_Message4.fixedToCamera = true;
		break;
		case 5 :
			status_Message5 = Lucifer_Game.add.text(120, 660, render_Text, { font: "13px", fill: "#19de65" });
			status_Message5.fixedToCamera = true;
		break;
		}
	}
	else if(ExpCount > 5)
	{
		status_Message.text = status_Message2.text;
		status_Message2.text = status_Message3.text;
		status_Message3.text = status_Message4.text;
		status_Message4.text = status_Message5.text;	

		status_Message5.destroy();

		status_Message5 = Lucifer_Game.add.text(120, 660, render_Text, { font: "13px", fill: "#ffffff" });
		status_Message5.fixedToCamera = true;	
	}	

	ExpCount += 1;
}

function status_Message_Clone(text)
{		
	render_Text = "경험치를 " + text + "획득하였습니다.";		

	if(ExpCount <= 5)
	{
		switch(ExpCount){
		case 1 :
			status_Message = Lucifer_Game.add.text(120, 580, render_Text, { font: "13px", fill: "#19de65" });
			status_Message.fixedToCamera = true;
		break;
		case 2 :
			status_Message2 = Lucifer_Game.add.text(120, 600, render_Text, { font: "13px", fill: "#19de65" });
			status_Message2.fixedToCamera = true;
		break;
		case 3 :
			status_Message3 = Lucifer_Game.add.text(120, 620, render_Text, { font: "13px", fill: "#19de65" });
			status_Message3.fixedToCamera = true;
		break;
		case 4 :    
			status_Message4 = Lucifer_Game.add.text(120, 640, render_Text, { font: "13px", fill: "#19de65" });
			status_Message4.fixedToCamera = true;
		break;
		case 5 :
			status_Message5 = Lucifer_Game.add.text(120, 660, render_Text, { font: "13px", fill: "#19de65" });
			status_Message5.fixedToCamera = true;
		break;
		}
	}
	else if(ExpCount > 5)
	{
		status_Message.text = status_Message2.text;
		status_Message2.text = status_Message3.text;
		status_Message3.text = status_Message4.text;
		status_Message4.text = status_Message5.text;	

		status_Message5.destroy();

		status_Message5 = Lucifer_Game.add.text(120, 660, render_Text, { font: "13px", fill: "#ffffff" });
		status_Message5.fixedToCamera = true;	
	}	

	ExpCount += 1;
}

function status_Message_CheckTimer()
{
	++status_CheckTime_Total;
}

function status_Message_Update()
{
	if(ExpCount >= 1)
	{
		status_CheckTimer.start();
	}
	else if(ExpCount < 2)
	{
		status_CheckTime_Total = 0;
	}	

	if(status_CheckTime_Total > 20)
	{
		if(status_Message != undefined)
		{
			status_Message.destroy();	
		}		
		if(status_Message2 != undefined)
		{
			status_Message2.destroy();
		}
		if(status_Message3 != undefined)
		{
			status_Message3.destroy();
		}
		if(status_Message4 != undefined)
		{
			status_Message4.destroy();
		}
		if(status_Message5 != undefined)
		{
			status_Message5.destroy();
		}		

		status_CheckTime_Total = 0;
		ExpCount = 1;
	}

	//console.log(status_CheckTime_Total);	
}