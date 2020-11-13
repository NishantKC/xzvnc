class Game {
  constructor(){}
//read gamestate from database
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }
// write gamestate to the database
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
//start UI
  start(){
      player = new Player();
      player.getCount();
      form = new Form()
      form.display();
  }
//Play UI
  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
//when all player log in game starts
    if(allPlayers !== undefined){
      var display_position = 130;
      for(var i in allPlayers){
        if (i === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[i].name + ": " + allPlayers[i].distance, 120,display_position)
      }
    }
//Up arrow increaes distance and writes distance in database
    if(keyDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
  }
}
