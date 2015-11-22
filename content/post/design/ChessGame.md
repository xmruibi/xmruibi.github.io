+++
date = "2015-10-21T11:16:26-07:00"
levels = []
tags = ["Object Oriented Programming"]
title = "Chess Game"
topics = ["Design"]
+++
This typical question in many interview's OO Design part; Design a chess game with object-oriented programming principle.

<!--more-->
## Description
Game is an object contains the single board and two players. It should has a function to run the entire game and make turn on each player. It also should has a method to accounce the win or lose.

Board can be a singleton object and holds 8 times 8 two dimension array of Spot object.
Every operation on piece should based on the board, like initial the piece, execute the step.

In spot object, it holds the piece and piece can occupy this spot or spot release a piece.

The piece object can be an abstract class that extended by different kinds like queen, king...
In piece object, the color also need to be marked. In each concrete class, different kind of piece has different step approach. So there must haa a concrete method to check the step commond is valid.

Player can hold some information about the color and the times of win or lost.


## Basic Object Design
- Game:
	- Hold the Board and Players

- Board (Singleton):
	- Hold spots with 8$$\times$$8
	- Move Piece
	- Remove Piece
- Spot:
    - Hold Pieces
- Piece (Abstract): 
	- Concreted classes with 8 Pawns, 2 Rooks, 2 Bishops, 2 Knights, 1 Queen, 1 King
	- Owner(color) 

- Player (Abstract):
	- Concreted classes for Human and Computer players
	- Own Piece
	- Commands List
- Command
	- Piece
	- Destination x, y

## Solution for Basic Part
#### Here we can achieve the step move and check the win for player

- Game:
```java
public class Game{
	final static Board board;
	Player p1;
	Player p2;

	public Game() {
		board = new Board();
	}

	public boolean enterPlayer(Player p) {
		if(p1 == null)
			this.p1 = p;
		else if(p2 == null)
			this.p2 = p;
		else
			return false;

		board.initialize(p);
		return true;
	}

	public void processTurn(Player p) {
		// Player make a command and until it is valid
		// System input
		do{
			Command cmd = new Command(input);
			p.addCommand(cmd);
		}while(!board.executeMove(p));
	}

	public startGame(){
		// player enter the game:
		enterPlayer(new ComputerPlayer("Computer"));
		enterPlayer(new HumanPlayer("Bill"));

		while(true) {
			processTurn(p1);
			if(this.board.getWin()) {
				System.out.println("P1 win!");
				break;
			}
			processTurn(p2);
			if(this.board.getWin()) {
				System.out.println("P2 win!");
				break;
			}
		}
	}
}

```
- Board:
```java
public class Board{

	private Spot[][] spots;
	private boolean win; // mark the win or not

	public Board(){
		win = false;
		spots = new Spot[8][8];
	}

	public void initialize(Player p){
		// put the pieces with initial status
		for(int i=0; i<p.getPieces().size(); i++){
            spots[p.getPieces().get(i).getX()][p.getPieces().get(i).getY()].occupySpot(p.getPieces().get(i));
        }
	}

	public boolean executeMove(Player p) {
		Command cmd = p.getCurrentCmd();
		Piece piece = cmd.getPiece();

		// check the move step is valid for piece
		if(!piece.validMove(this, cmd.curX, cmd.curY, cmd.desX, cmd.desY)) {
			// if not valid cmd remove the command and return false
			p.removeCurrentCmd();
			return false;
		}

		// check the two pieces side
		if(spot[cmd.desX][cmd.desY] != null && spot[cmd.desX][cmd.desY].color == piece.color)
			return false;

		// check and change the state on spot
		Piece taken = spot[cmd.desX][cmd.desY].occupySpot(piece);
		if(taken != null &&taken.getClass().getName().equals("King"))
			board.win = true;
		spot[cmd.curX][cmd.curY].releaseSpot;
		return true;
	}

	public boolean getWin() {
		return win;
	}
}
```

- Spot:
```java
public class Spot {
    int x;
    int y;
    Piece piece;

    public Spot(int x, int y) {
        super();
        this.x = x;
        this.y = y;
        piece = null;
    }

    // return original piece
    public void occupySpot(Piece piece){
    	Piece origin = this.piece;
        //if piece already here, delete it, i. e. set it dead
        if(this.piece != null) {
            this.piece.setAvailable(false);
        }
        //place piece here
        this.piece = piece;
        return origin;
    }

    public boolean isOccupied() {
        if(piece != null)
            return true;
        return false;
    }

    public Piece releaseSpot() {
        Piece releasedPiece = this.piece;
        this.piece = null;
        return releasedPiece;
    }

    public Piece getPiece() {
    	return this.piece;
    }
}
```

- Pieces:

```java
public class Piece {
    private int x;
    private int y;

    private boolean available; // mark the live or dead
    private int color; // mark the owner

    public Piece(boolean available, int x, int y, int color) {
        super();
        this.available = available;
        this.x = x;
        this.y = y;
        this.color = color;
    }


    public boolean isAvailable() {
        return available;
    }
    public void setAvailable(boolean available) {
        this.available = available;
    }
    public int getX() {
        return x;
    }
    public void setX(int x) {
        this.x = x;
    }
    public int getY() {
        return y;
    }
    public void setY(int y) {
        this.y = y;
    }

    public boolean isValid(Board board, int fromX, int fromY, int toX, int toY){
        // different by character of piece
    }

}

public class King extends Piece{ 
	@Override
    public boolean isValid(Board board, int fromX, int fromY, int toX, int toY) {
    }	
}
// ..... for Queen, Rook, Bishop, Pawn

```
- Player:

```java
public class Player {

    public int color;

    private List<Piece> pieces = new ArrayList<>();

    private List<Command> cmds = new ArrayList<>();

    public Player(int color) {
        super();
        this.color = color;
        initializePieces();
    }

    public List<Piece> getPieces() {
        return pieces;
    }

    public Command getCurrentCmd(){
    	if(cmds != null || cmds.size() != 0)
    		return null;
    	return cmds.get(cmds.size() - 1);
    }

    public void removeCurrentCmd(){
    	if(cmds != null || cmds.size() != 0)
    		return;
    	cmds.remove(cmds.size() - 1);
    }

    public void initializePieces(){
        if(this.color == 1){
            for(int i=0; i<8; i++){ // draw pawns
                pieces.add(new Pawn(true,i,2, 1));
            }
            pieces.add(new Rook(true, 0, 0, 1));
            pieces.add(new Rook(true, 7, 0, 1));
            pieces.add(new Bishop(true, 2, 0, 1));
            pieces.add(new Bishop(true, 5, 0, 1));
            pieces.add(new Knight(true, 1, 0, 1));
            pieces.add(new Knight(true, 6, 0, 1));
            pieces.add(new Queen(true, 3, 0, 1));
            pieces.add(new King(true, 4, 0, 1));
        }
        else{
            for(int i=0; i<PAWNS; i++){ // draw pawns
                pieces.add(new Pawn(true,i,6, 0));
            }
            pieces.add(new Rook(true, 0, 7, 0));
            pieces.add(new Rook(true, 7, 7, 0));
            pieces.add(new Bishop(true, 2, 7, 0));
            pieces.add(new Bishop(true, 5, 7, 0));
            pieces.add(new Knight(true, 1, 7, 0));
            pieces.add(new Knight(true, 6, 7, 0));
            pieces.add(new Queen(true, 3, 7, 0));
            pieces.add(new King(true, 4, 7, 0));
        }

    }
}
```

- Command

```java
public class Command {
	Piece piece;
	int curX, curY, desX, desY;
	public Commanc(Piece piece, int curX, int curY, int desX, int desY) {
		this.piece = piece; 
		this.curX = curX;
		this.curY = curY;
		this.desX = desX;
		this.desY = desY;
	}
}
```


