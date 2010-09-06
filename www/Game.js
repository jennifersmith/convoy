Ext.regModel('Player', {
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'id',  type: 'string'},
        {name: 'currentScore',  type: 'integer'},
        {name: 'history',  type: 'string'}
    ],

    addToScore: function(score) {
        var currentScore = this.get('currentScore');
        this.set('currentScore', currentScore + score);
    } ,

    spottedA: function(item, where){
        this.addToScore(item.get("score"));
        this.appendHistory(item);
    },
    appendHistory: function(item, where){
        var currentHistory = this.get("history");
        currentHistory += "[" + item.get("id") + "|" + where + "],";
        this.set("history", currentHistory);
    }
});

Convoy.CreatePlayersStore = function() {
    return new Ext.data.Store({
        model: "Player",
        proxy: {
            type: 'localstorage',
            id  : 'convoy_playersStore'
        }
    });
};