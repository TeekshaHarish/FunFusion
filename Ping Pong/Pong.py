import turtle
import winsound
wn = turtle.Screen()
wn.title("Pong")
wn.bgcolor("black")
wn.setup(width=800, height=600)
wn.tracer(0)

# Score
score_a = 0
score_b = 0

# Paddle A
paddle_a = turtle.Turtle()  # Small t is for module name Capital t is  for class name
paddle_a.speed(0)  # Speed for animation
paddle_a.shape("square")
paddle_a.color("white")
paddle_a.shapesize(stretch_wid=5, stretch_len=1)  # Default shape is 20 X 20
paddle_a.penup()  # it will not trace a line as, turtle dose
paddle_a.goto(-350, 0)  # (X coordinate, Y coordinate) location of the paddle

# Paddle B
paddle_b = turtle.Turtle()  # Small t is for module name Capital t is  for class name
paddle_b.speed(0)  # Speed for animation
paddle_b.shape("square")
paddle_b.color("white")
paddle_b.shapesize(stretch_wid=5, stretch_len=1)  # Default shape is 20 X 20
paddle_b.penup()  # it will not trace a line as, turtle dose
paddle_b.goto(350, 0)  # (X coordinate, Y coordinate) location of the paddle

# Ball
ball = turtle.Turtle()  # Small t is for module name Capital t is  for class name
ball.speed(0)  # Speed for animation
ball.shape("circle")
ball.color("red")
ball.penup()  # it will not trace a line as, turtle dose
ball.goto(0, 0)  # (X coordinate, Y coordinate) location of the ball
ball.dx = 0.2
ball.dy = -0.2

# Pen
pen = turtle.Turtle()
pen.speed(0)
pen.shape("square")
pen.color("white")
pen.penup()
pen.hideturtle()
pen.goto(0, 260)
pen.write("Player A : 0  Player B : 0", align="center",
          font=("Courier", 24, "normal"))

# function to move the paddle
def paddle_a_up():
    y = paddle_a.ycor()
    if y < 250:  # Adjust the limit as needed
        y += 20
    paddle_a.sety(y)

def paddle_a_down():
    y = paddle_a.ycor()
    if y > -240:  # Adjust the limit as needed
        y -= 20
    paddle_a.sety(y)

def paddle_b_up():
    y = paddle_b.ycor()
    if y < 250:  # Adjust the limit as needed
        y += 20
    paddle_b.sety(y)

def paddle_b_down():
    y = paddle_b.ycor()
    if y > -240:  # Adjust the limit as needed
        y -= 20
    paddle_b.sety(y)

# Keyboard binding
wn.listen()
wn.onkeypress(paddle_a_up, "w")  # Assigning w for paddle a to go up
wn.onkeypress(paddle_a_down, "s")  # Assigning s for paddle a to go up

wn.onkeypress(paddle_b_up, "Up")  # Assigning UP key for paddle b to go up
wn.onkeypress(paddle_b_down, "Down") # Assigning DOWN key for paddle b to go down

# Game loop
while True:
    wn.update()
    ball.setx(ball.xcor() + ball.dx)
    ball.sety(ball.ycor() + ball.dy)

# Border Checking
    # Top and bottom
    if ball.ycor() > 290:  # 290 Because of y axis we have taken 600 and minus the ball size
        ball.sety(290)
        ball.dy *= -1  # To Reverse the direction of ball
        # To play the soundtrack
        winsound.PlaySound("bounce.wav", winsound.SND_ASYNC)

    if ball.ycor() < -290:  # -290 Because of -y axis and minus the ball size
        ball.sety(-290)
        ball.dy *= -1  # To Reverse the direction of ball
        # To play the soundtrack
        winsound.PlaySound("bounce.wav", winsound.SND_ASYNC)

    if ball.xcor() > 390:  # 390 Because of x axis we have taken 800 and minus the ball size
        # To goto original position after hitting the end of x axis
        ball.goto(0, 0)
        ball.dx *= -1  # To Reverse the direction of ball
        score_a += 1
        pen.clear()
        pen.write("Player A: {}  Player B: {}".format(score_a, score_b),
                  align="center", font=("Courier", 24, "normal"))

    if ball.xcor() < -390:  # -390 Because of -x axis and minus the ball size
        # To goto original position after hitting the end of x axis
        ball.goto(0, 0)
        ball.dx *= -1  # To Reverse the direction of ball
        score_b += 1
        pen.clear()
        pen.write("Player A: {}  Player B: {}".format(score_a, score_b),
                  align="center", font=("Courier", 24, "normal"))

    # Paddle and ball collisions
    if ball.xcor() < -340 and ball.ycor() < paddle_a.ycor() + 50 and ball.ycor() > paddle_a.ycor() - 50:  # 50 is the size of the paddle
        ball.dx *= -1
        # To play the soundtrack
        winsound.PlaySound("bounce.wav", winsound.SND_ASYNC)

    elif ball.xcor() > 340 and ball.ycor() < paddle_b.ycor() + 50 and ball.ycor() > paddle_b.ycor() - 50:  # 50 is the size of the paddle
        ball.dx *= -1
        # To play the soundtrack
        winsound.PlaySound("bounce.wav", winsound.SND_ASYNC)
