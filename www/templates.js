/**
 * Presume you can stick this in the html but never mind...
 *
 * 
 */
Convoy.templates.itemBox=new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="item-box" id="{id}"  >',
                        '<div style=" background-image:url({imagePath})">' ,
                '<p class="name">{name}</p>' ,
                '<p class="score">{score}</p>' ,
                         '</div>',
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
            '<tpl for="."><div class="player"><strong>{name}</strong></div></tpl>'
            );