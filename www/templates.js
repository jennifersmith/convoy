/**
 * Presume you can stick this in the html but never mind...
 *
 * 
 */
Convoy.templates.itemBox=new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="item-box" id="{id}"  >',
					'<p class="image"><img src="{imagePath}" /></p>' ,
	                '<p><span class="name">{name}</span>' ,
	                '<span class="score">{score}</span></p>' ,
                '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        );

Convoy.templates.itemBoxOnPlayerSelect=new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="item-box-small player-select" >',
					'<p class="image"><img src="{imagePath}" /></p>' ,
	                '<p class="name">Who spotted <strong>{name}</strong> for {score} points?</p>' ,
	            '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
            );

Convoy.templates.playerSelectListItem=new Ext.XTemplate(
            '<tpl for="."><div class="player" ><strong>{name}</strong></div></tpl>'
            );

Convoy.templates.playerMainDisplay = new Ext.XTemplate(
            '<tpl for="."><div class="player" id="{id}"><p class="player-name" ><strong>{name}</strong><span class="score">Score: {currentScore} points</span></p></div></tpl>');
Convoy.templates.historyItem = new Ext.XTemplate(
            '<tpl for="."><div class="history-item"><strong>{spotted.name}</strong> <br/><span>{when}</span><br/><span>{where.display}</span></div></tpl>');
