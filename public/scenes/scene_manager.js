const SceneManager = {
    currScene: "choosing",
    currScene_index: 0,
    sceneOptions: ["choosing", "walking", "talking", "battle", "swapping", "catching"],
    sceneLoaded: false,
    chosenStarter: false,
    finishedChoosing: false,
    finishedSwapping: false,
    encounterPokemon: false,

    changeScene: function (nextScene) {
        this.currScene = nextScene;
    },

    getScene: function () {
        return this.currScene;
    },

    toggleBattleSceneLoaded: function () {
        this.sceneLoaded = (this.sceneLoaded) ? false : true;
    },

    checkBattleSceneLoaded: function () {
        return this.sceneLoaded;
    },

    isChoosingStarterScene(){
        return this.currScene === "choosing";
    },
    isWalkingScene(){
        return this.currScene === "walking";
    },
    isTalkingScene(){
        return this.currScene === "talking";
    },
    isBattleScene(){
        return this.currScene === "battle";
    },
    isSwappingScene(){
        return this.currScene === "swapping";
    },
    isCatchingScene(){
        return this.currScene === "catching";
    },

    isFinishedChoosing(){
        return this.finishedChoosing;
    },

    toggleFinishedChoosing(){
        this.finishedChoosing = (this.finishedChoosing) ? false : true;
    },

    toggleEncounterPokemon(){
        this.encounterPokemon = (this.encounterPokemon) ? false : true;
    },

    isEncounterPokemon(){
        return this.encounterPokemon;
    }

};

export { SceneManager };
