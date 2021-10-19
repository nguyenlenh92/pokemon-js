import { Canvas, TextureManager, Animation } from "../src/graphics.js";
import { SCALE } from "../proj3.js";
import { Events } from "../src/input.js";
import { SceneManager } from "./scene_manager.js";
const StarterScene = {
    cursor : new Animation('cursor_ribbon'),
    x: 50,
    y: 200,
    chosenPokemon: "Charmander",
    moving: false,
	Init: function () {
		let starterBackground = new Image();
		starterBackground.src = "assets/Pokemon Essentials v19.1 2021-05-22/Graphics/Pictures/helpadventurebg.png"
		Canvas.Context.drawImage(starterBackground, 0, 0, 1200, 700);

		//Adding text to Canvas
		Canvas.Context.font = "30px Courier";
		Canvas.Context.textAlign = "center";
		Canvas.Context.fillText("Choose Your Pokemon!", Canvas.CanWidth / 2, 60);

		//Add pics of starter pokemon
        TextureManager.DrawPicture('poke_starter_charmander', 50, 200, SCALE);
        TextureManager.DrawPicture('poke_starter_bulbasaur', 400, 200, SCALE);
        TextureManager.DrawPicture('poke_starter_squirtle', 750, 200, SCALE);
        if (Events.KEY == "RIGHT" && this.chosenPokemon == "Charmander" && !this.moving){
            this.chosenPokemon = "Bulbasaur";
            this.x = 425;
            this.moving = true;
        }
        else if (Events.KEY == "RIGHT" && this.chosenPokemon == "Bulbasaur" && !this.moving){
            this.chosenPokemon = "Squirtle";
            this.x = 750;
            this.moving = true;
        }

        if (Events.KEY == "LEFT" && this.chosenPokemon == "Bulbasaur" && !this.moving){
            this.chosenPokemon = "Charmander";
            this.x = 50;
            this.moving = true
        }

        else if (Events.KEY == "LEFT" && this.chosenPokemon == "Squirtle" && !this.moving){
            this.chosenPokemon = "Bulbasaur";
            this.x = 425;
            this.moving = true;

        }

        if (Events.KEY == "YES"){
            SceneManager.changeScene("walking");
        }

        this.cursor.SetProps("blinking", 25);
        this.cursor.Update();
        this.cursor.Render(this.x, this.y);
        for (var i = 0; i < 100000000; i++){
            if (i == 1){
                this.moving = false;
            }
        }
    },

    getChosenPokemon(){
        return this.chosenPokemon;
    }

};



export { StarterScene };
