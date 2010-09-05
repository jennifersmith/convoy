Ext.regModel('Player', {
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'id',  type: 'string'},
        {name: 'currentScore',  type: 'integer'}
    ],

    addToScore: function(score) {
        var currentScore = this.get('currentScore');
        this.set('currentScore', currentScore + score);
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