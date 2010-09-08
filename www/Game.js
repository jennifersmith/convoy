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
        this.appendHistory(item, where, new Date());
    },
    appendHistory: function(item, where, when){
        // todo - can history just be an object?
        var currentHistory = this.getCurrentScoreHistory();
        currentHistory.add(item, where, when);
        this.set("history", currentHistory.stringify());
        
    },
    getCurrentScoreHistory:function () {
        return new Convoy.ScoreHistory(this.get("history"));
    },
    getHistory: function(spottablesStore){
        var currentHistory = this.getCurrentScoreHistory();
        return currentHistory.getArray();
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

Convoy.ScoreHistory = function(raw){
    var history;
    if(!raw || raw===""){
        history = new Array();
    }
    else{
        history = JSON.parse(raw);
    }

    this.add = function(spotted, where, when){
        glob = where;
        var item = {
                    spotted:spotted.data, // todo make full object
                    where:where,
                    when: when.format("g:i a") 
                };
        history.unshift(item);
    }

    this.stringify = function(){
        return JSON.stringify(history);
    }

    this.getArray = function(){
        return history;
    }


}