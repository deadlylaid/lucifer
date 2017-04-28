var bootScene =
{
	create: function()
	{
		//Physics
		Lucifer_Game.physics.startSystem(Phaser.Physics.ARCADE);
		Lucifer_Game.physics.startSystem(Phaser.Physics.P2JS);

		//Calling the Load State
		Lucifer_Game.state.start('logo');
	}
};
