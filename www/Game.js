Ext.regModel('Player', {
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'id',  type: 'string'},
        {name: 'currentScore',  type: 'integer'}
    ],

    changeName: function() {
        var oldName = this.get('name'),
            newName = oldName + " The Barbarian";

        this.set('name', newName);
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