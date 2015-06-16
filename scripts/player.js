Bullet = function(vel, rectangle)
{
	this.velocity = vel;
	this.rect = rectangle;
	
	this.Update = function()
	{
		this.rect.x += this.velocity.x;
		this.rect.y += this.velocity.y;
	};
	
	this.Draw = function(ctx)
	{
		this.rect.Draw(ctx);
	};
};


// Player Sounds
var jump = new Audio('sounds/jump.wav');


// Player Class
Player = function()
{
	this.rect = new Rectangle(10, 400, 68, 47);
	
	this.animation = new Animation(68, 47, 0, 0, 3, "images/biggs.png", 4, 3, 3);
	
	this.lives = 3;
	
	this.gravity = 2;
	
	this.moving = false;
	this.movingRight = false;
	this.movingLeft = false;
	this.moveFreeze = false;
	
	this.sliding = false;
	this.slideSpeed
	
	this.bullets = new Array();
	this.shotBullet = false;
	this.lookinRight = true;
	
	this.jumpAvailable = false;
	this.jumping = false;
	this.JUMP_MAX = 1.8;
	this.jumpVelocity = 0;

	this.sldieAvailable = false;
	this.sliding = false;
	this.SLIDE_MAX = 1.7;
	this.slideVelocity = 0;
	
	this.SetPosition = function(x, y, mod)
	{
		if (mod == null || !mod)
		{
			if (x != null)
				this.rect.x = x;
			if (y != null)
				this.rect.y = y;
		}
		else
		{
			if (x != null)
				this.rect.x += x;
			if (y != null)
				this.rect.y += y;
		}
	};
	
	this.Update = function()
	{
	
		this.movingRight = false;
		this.movingLeft = false;
		this.moving = false;
		
		if (input.a && this.moveFreeze == false)
		{
			this.animation.SetRow(1);
			this.moving = true;
			this.movingLeft = true;
			this.lookinRight = false;
		}
		if (input.d && this.moveFreeze == false)
		{
			this.animation.SetRow(0);
			this.movingRight = true;
			this.moving = true;
			this.lookinRight = true;
		}
		
		
		if (input.left && this.moveFreeze == false)
		{
			this.animation.SetRow(1);
			this.moving = true;
			this.movingLeft = true;
			this.lookinRight = false;
		}
		if (input.right && this.moveFreeze == false)
		{
			this.animation.SetRow(0);
			this.movingRight = true;
			this.moving = true;
			this.lookinRight = true;
		}
		if (input.up)
			this.Jump();

		if (input.space)
			this.Jump();
			
		if (input.s)
			this.Slide();
		//else
			//this.shotBullet = false;
		
		this.UpdateBullets();
			
		if (this.jumping)
		{
			this.rect.y -= this.jumpVelocity;
			this.jumpVelocity -= 0.02;
			
			if (this.jumpVelocity <= 0)
			{
				this.jumping = false;
				this.jumpAvailable = true;
				jump.pause();
				jump.currentTime = 0;
			}
		}
		else
			this.rect.y += this.gravity;
		
		if (this.sliding)
		{
			this.rect.x -= this.slideVelocity;
			this.slideVelocity -= 0.02;
			
			if (this.slideVelocity <= 0)
			{
				this.sliding = false;
				this.slideAvailable = true;
			}
		}
		
		this.animation.position.Set(this.rect.x, this.rect.y);
		
		if (this.moving)
			this.animation.Update();
		else
			this.animation.SetColumn(0);
	};
	
	
	
	this.Shoot = function()
	{
		if (!this.shotBullet)
		{
			var b = new Rectangle(this.rect.x + (this.rect.width / 2) - 4, this.rect.y + (this.rect.height / 2) - 4, 8, 8);
			b.color.g = 0;
			b.color.b = 0;
			
			var vel = new Vector2(0, 0);
			if (this.lookinRight)
				vel.x = 3;
			else
				vel.x = -3;
			
			var bul = new Bullet(vel , b);
			
			this.bullets.push(bul);
			
			this.shotBullet = true;
		}
	};
	
	this.UpdateBullets = function()
	{
		for (var i = 0; i < this.bullets.length; i++)
		{
			this.bullets[i].Update();
			
			var b = this.bullets[i];
			
			var done = false;
			if (b.rect.x + b.rect.width < 0)
				done = true;
			else if (b.rect.x > canvas.width)
				done = true;
			if (b.rect.y + b.rect.height < 0)
				done = true;
			else if (b.rect.y > canvas.height)
				done = true;
			
			if (done)
			{
				this.bullets.RemoveAt(i);
				i--;
			}
		}
	};
	
	this.Jump = function()
	{
		if (this.jumpAvailable)
		{
			jump.play();
			this.jumpVelocity = this.JUMP_MAX;
			this.jumping = true;
		}
	};
	
	this.Slide = function()
	{
		if (this.slideAvailable)
		{
			this.slideVelocity = this.SLIDE_MAX;
			this.sliding = true;
		}
	};
	
	this.Draw = function(ctx)
	{
		for (var i = 0; i < this.bullets.length; i++)
			this.bullets[i].Draw(ctx);
			
		//this.rect.Draw(ctx);
		this.animation.Draw(ctx);
	};
};