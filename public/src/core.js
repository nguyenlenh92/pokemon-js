import { MapParser, TileEffect } from "./map.js";
import { Player } from "./player.js";
import { TextureManager, Canvas } from "./graphics.js";
import { Camera } from "./camera.js";
import { CollisionHandler } from "./collision.js";
import { Events } from "./input.js";
import { BattleScene } from "../scenes/battle_scene.js";
import { SceneManager } from "../scenes/scene_manager.js";
import { Pokemon, Party, getPokemonObject, generateRandomPokemon } from "./pokemon.js";
import { NPC } from "./npc.js";
import { POKEMONS } from "../assets/pokemon_data.js";
import { swapAnimation } from "../scenes/swap.js";
import { StarterScene } from "../scenes/starter_scene.js";
import { AudioManager } from "./audio.js";

const TILEPIXELS = 32;
const Clock = {
    DeltaTime: 0,
    _prevTime: 0,
    _millisecondsPerSecond: 1000,
    _targetFrameRate: 60,
    Tick: function () {
        this.DeltaTime =  ( ( Date.now() - this._prevTime ) / this._millisecondsPerSecond ) * this._targetFrameRate;
        this._prevTime = Date.now();
    },
};



const Game = {
    Map: {},
    Player: {},
    TileEffect: {},
    foe: {},


    Init: function (){
        Canvas.Init();
        Events.Init();
        TextureManager.Init();
        AudioManager.Init();

        this.Map = MapParser.Load(BEACH_MAP);
        this.Player = new Player("trainer_brendan", "idle", 736, 1300, 3, 3, 32, 32);
        //this.TileEffect = new TileEffect("grass", 7, "grass", this.Map, this.Player, 20);

        Camera.Init(this.Map);
        CollisionHandler.Init(this.Map);
        AudioManager.Play("begin");

    },

    Load: function () {
        console.log(SceneManager.currScene);
        // choosing starter pokemon
        if (!SceneManager.isFinishedChoosing()){
            if (SceneManager.isChoosingStarterScene()){
                StarterScene.Init();
            }

            else{
                if (StarterScene.getChosenPokemon()){
                    var pokemon = StarterScene.getChosenPokemon();
                    var starterPokemon = getPokemonObject(pokemon)
                    this.Player.playerParty = new Party(starterPokemon, new Array(starterPokemon));
                    SceneManager.toggleFinishedChoosing();
                }
            }
        }

        else {

            // encounter new pokemon
            if  (SceneManager.isWalkingScene() && ["RIGHT", "LEFT", "UP", "DOWN"].includes(Events.KEY)) {
                var random = Math.floor(Math.random() * 1000);
                console.log(random);
                if (random < 500) {
                    var pokemonObject = generateRandomPokemon();
                    this.foe = {};
                    this.foe = new NPC(pokemonObject, new Array(pokemonObject));
                    SceneManager.changeScene("battle");
                }
            }


            if (SceneManager.isTalkingScene()) {
                // console.log("talking");
                // adds dialogue functionality here
            }

            else if (SceneManager.isBattleScene() && !SceneManager.checkBattleSceneLoaded() && (this.Player.playerParty.chosenPokemon != null)) {
                BattleScene.Init(this.Player.playerParty.chosenPokemon, this.foe.Party.chosenPokemon);
                SceneManager.toggleBattleSceneLoaded(); // turns sceneLoaded to 1
            }

            else if (SceneManager.isSwappingScene() && !SceneManager.finishedSwapping){
                this.Player.playerParty.pokemonArray = swapAnimation.init(this.Player.playerParty.pokemonArray);
                BattleScene.player_pokemon = this.Player.playerParty.pokemonArray[0];
                if (swapAnimation.success)
                    SceneManager.changeScene("battle");

            }

            else if (SceneManager.isCatchingScene()){
                this.foe.Party.chosenPokemon.hp = this.foe.Party.chosenPokemon.hpmax;
                this.Player.playerParty.pokemonArray.push(this.foe.Party.chosenPokemon);
                SceneManager.changeScene("walking");
            }
        }
    },

    Update: function () {
        if (SceneManager.isWalkingScene()){
            this.Player.Update(Clock.DeltaTime);
            //this.TileEffect.Update(Clock.DeltaTime);
            Camera.Update(Clock.DeltaTime);
        }
        else if (SceneManager.isTalkingScene()){
            // console.log("talking");
            // adds dialogue functionality here
        }

        else if (SceneManager.isBattleScene()){
            BattleScene.Animations();
        }
    },

    Render: function () {
        if (SceneManager.isWalkingScene()){

            this.Map.Render();
            this.Player.Render();
            //this.TileEffect.Render();

        }
    },
    Clear: function () {
        Canvas.Context.clearRect(0, 0, Canvas.CanWidth, Canvas.CanHeight);
    }
};


export { Game, Clock };
