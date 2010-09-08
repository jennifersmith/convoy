/**
 * Presume you can stick this in the html but never mind...
 *
 * 
 */
Convoy.templates.itemBox=new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="item-box" id="{id}"  >',
	                '<span class="name">{name}</span>' ,
	                '<span class="score">{score}</span>' ,
					'<img src="{imagePath}" />' ,
                '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        );

Convoy.templates.itemBoxOnPlayerSelect=new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="item-box-small" >',
                        '<div style=" background-image:url({imagePath})">' ,
                '<p class="name">Who spotted {name} (score: {score})?</p>' ,
                         '</div>',
                '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
            );

Convoy.templates.playerSelectListItem=new Ext.XTemplate(
            '<tpl for="."><div class="player" ><strong>{name}</strong></div></tpl>'
            );

Convoy.templates.playerMainDisplay = new Ext.XTemplate(
            '<tpl for="."><div class="player" id="{id}"><strong>{name}</strong><span>{currentScore}</span></div></tpl>');
Convoy.templates.historyItem = new Ext.XTemplate(
            '<tpl for="."><div class="history-item"><strong>{spotted.name}</strong> <br/><span>{when}</span><br/><span>{where.display}</span></div></tpl>');
