var snake, apple, squareSize, score, speed, updateDelay, direction, new_direction, 
	addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

var ball, bricks, coins; 


var Game = {
	preload: function() {
		game.load.image('block', './assets/images/snake.png');
		game.load.image('brick', './assets/images/apple.png');
	}, 

	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		speed = 100; 
		direction = new Phaser.Point(this.randomBetween(-1, 1), this.randomBetween(-1, 1)).normalize();

		bricks = game.add.group();
		bricks.enableBody = true;
		bricks.physicsBodyType = Phaser.Physics.ARCADE;

		coins = game.add.group();
		coins.enableBody = true;
		coins.physicsBodyType = Phaser.Physics.ARCADE;

		for(let i = 0; i < 10; i++) {
			this.createBrick(20*i, 400);
		}

		for(let i = 0; i < 10; i++) {
			this.createCoin(20*i, 350);
		}


		// Set up a Phaser controller for keyboard input. 
		cursors = game.input.keyboard.createCursorKeys(); 

		game.stage.backgroundColor = '#061f27'; 

		this.resetBall();

/*
    	button = game.add.button(game.world.centerX - 95, 400, 'brick', this.actionOnClick, this, 2, 1, 0);
	    button.onInputOver.add(this.over, this);
	    button.onInputOut.add(this.out, this);
*/


	    /*
		// Add text to the top of the game.
		textStyle_Key = {font: "bold 14px sans-serif", fill: "#46c0f9", align: "center"};
		textStyle_Value = {font: "bold 18px sand-serif", fill: "#fff", align: "center"};

		// Score 
		game.add.text(30, 20, "SCORE", textStyle_Key);
		scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value); 

		// Speed
		game.add.text(500, 20, "SPEED", textStyle_Key);
		speedTextValue = game.add.text(558, 18, speed.toString(), textStyle_Value); 
		*/
	}, 

	update: function() {
		game.physics.arcade.collide(ball, bricks, this.ballHitBrick, null, this);
		game.physics.arcade.collide(ball, coins, this.ballHitCoin, null, this);


	},

	ballHitBrick: function(_ball, _brick) {
		console.log(_ball.key + " hit " + _brick.key);
	},
	 
	ballHitCoin: function(_ball, _coin) {
		console.log(_ball.key + " hit " + _coin.key);
		coins.remove(_coin, true, false);
	},
 
	randomBetween: function(x, y) { //Inclusive
        return (((x-1) + Math.ceil(Math.random() * (y-(x-1)))));
    },

	createBrick: function(x, y) {
		let brick = bricks.create(x, y, 'brick');
		brick.body.bounce.set(1);
		brick.body.immovable = true;
		return brick;
	},

	createCoin: function(x, y) {
		let coin = coins.create(x, y, 'brick');
		coin.body.bounce.set(1);
		coin.body.immovable = true;
		return coin;
	},


	resetBall: function() {
	    ball = game.add.sprite(screenWidth/2, screenHeight/2, 'block');
	    ball.checkWorldBounds = true;

	    game.physics.enable(ball, Phaser.Physics.ARCADE);

	    ball.body.collideWorldBounds = true;
	    ball.body.bounce.set(0.8);
    	ball.body.gravity.set(0, 180);

    	ball.body.velocity.setTo(direction.x*speed, direction.y*speed);
	}

};