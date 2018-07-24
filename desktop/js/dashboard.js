
/* This file is part of Jeedom.
 *
 * Jeedom is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Jeedom is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Jeedom. If not, see <http://www.gnu.org/licenses/>.
 */


$('#sel_eqLogicCategory').on('change',function(){
    SEL_CATEGORY = $(this).value();
    SEL_TAG = $('#sel_eqLogicTags').value();
    gotoFilterDashboardPage();
});

$('#sel_eqLogicTags').on('change',function(){
	SEL_CATEGORY = $('#sel_eqLogicCategory').value();
    SEL_TAG = $(this).value();
    gotoFilterDashboardPage();
});

function gotoFilterDashboardPage(){
	var category = SEL_CATEGORY;
	var tag = SEL_TAG;
	var filterValue = '';
    if(category == 'all' && tag == 'all'){
	     filterValue = '*';
    }else{
	    if(category == 'all'){
		    filterValue = '.tag-'+tag;
	    }else{
			if(tag == 'all'){
				filterValue = '.'+category;
			}else{
				filterValue = '.'+category+'.tag-'+tag;
			}
	    }
    }
    var $grid = $('.div_displayEquipement').isotope({
		itemSelector: '.eqLogic-widget',
		layoutMode: 'fitRows'
	});
	$grid.isotope({ filter: filterValue });
	setTimeout(function(){
		$('.div_displayEquipement').packery();
	},500);
}

$('#div_pageContainer').on( 'click','.eqLogic-widget .history', function () {
    $('#md_modal2').dialog({title: "Historique"});
    $("#md_modal2").load('index.php?v=d&modal=cmd.history&id=' + $(this).data('cmd_id')).dialog('open');
});

$('#bt_displayScenario').on('click', function () {
    if ($(this).attr('data-display') == 1) {
        $('#div_displayScenario').hide();
        if ($('#bt_displayObject').attr('data-display') == 1) {
            $('#div_displayObject').removeClass('col-lg-8 col-lg-10 col-lg-12 col-md-8 col-md-10 col-md-12 col-sm-8 col-sm-10 col-sm-12').addClass('col-lg-10 col-md-9 col-sm-8');
        } else {
            $('#div_displayObject').removeClass('col-lg-8 col-lg-10 col-lg-12 col-lg-8 col-lg-10 col-lg-12 col-md-8 col-md-10 col-md-12 col-sm-8 col-sm-10 col-sm-12').addClass('col-lg-12 col-md-12 col-sm-12');
        }
        $('.div_displayEquipement').each(function () {
            $(this).packery();
        });
        $(this).attr('data-display', 0);
    } else {
        $('#div_displayScenario').show();
        if ($('#bt_displayObject').attr('data-display') == 1) {
            $('#div_displayObject').removeClass('col-lg-8 col-lg-10 col-lg-12 col-lg-8 col-lg-10 col-lg-12 col-md-8 col-md-10 col-md-12 col-sm-8 col-sm-10 col-sm-12').addClass('col-lg-8 col-md-7 col-sm-5');
        } else {
            $('#div_displayObject').removeClass('col-lg-8 col-lg-10 col-lg-12 col-lg-8 col-lg-10 col-lg-12 col-md-8 col-md-10 col-md-12 col-sm-8 col-sm-10 col-sm-12').addClass('col-lg-10 col-md-9 col-sm-7');
        }
        $('.div_displayEquipement').packery();
        $(this).attr('data-display', 1);
    }
});

$('#bt_displayObject').on('click', function () {
    if ($(this).attr('data-display') == 1) {
        $('#div_displayObjectList').hide();
        if ($('#bt_displayScenario').attr('data-display') == 1) {
            $('#div_displayObject').removeClass('col-lg-8 col-lg-10 col-lg-12 col-lg-8 col-lg-10 col-lg-12 col-md-8 col-md-10 col-md-12 col-sm-8 col-sm-10 col-sm-12').addClass('col-lg-10 col-md-9 col-sm-7');
        } else {
            $('#div_displayObject').removeClass('col-lg-8 col-lg-10 col-lg-12 col-lg-8 col-lg-10 col-lg-12 col-md-8 col-md-10 col-md-12 col-sm-8 col-sm-10 col-sm-12').addClass('col-lg-12 col-md-12 col-sm-12');
        }
        $('.div_displayEquipement').each(function () {
            $(this).packery();
        });
        $(this).attr('data-display', 0);
    } else {
        $('#div_displayObjectList').show();
        if ($('#bt_displayScenario').attr('data-display') == 1) {
            $('#div_displayObject').removeClass('col-lg-8 col-lg-10 col-lg-12 col-lg-8 col-lg-10 col-lg-12 col-md-8 col-md-10 col-md-12 col-sm-8 col-sm-10 col-sm-12').addClass('col-lg-8 col-md-7 col-sm-5');
        } else {
            $('#div_displayObject').removeClass('col-lg-8 col-lg-10 col-lg-12 col-lg-8 col-lg-10 col-lg-12 col-md-8 col-md-10 col-md-12 col-sm-8 col-sm-10 col-sm-12').addClass('col-lg-10 col-md-9 col-sm-8');
        }
        $('.div_displayEquipement').packery();
        $(this).attr('data-display', 1);
    }
});

function editWidgetMode(_mode,_save){
    if(!isset(_mode)){
        if($('#bt_editDashboardWidgetOrder').attr('data-mode') != undefined && $('#bt_editDashboardWidgetOrder').attr('data-mode') == 1){
            editWidgetMode(0,false);
            editWidgetMode(1,false);
        }
        return;
    }
    if(_mode == 0){
        if(!isset(_save) || _save){
         saveWidgetDisplay({dashboard : 1});
     }
     if( $('.div_displayEquipement .eqLogic-widget.ui-resizable').length > 0){
        $('.div_displayEquipement .eqLogic-widget.allowResize').resizable('destroy');
    }
    if( $('.div_displayEquipement .eqLogic-widget.ui-draggable').length > 0){
     $('.div_displayEquipement .eqLogic-widget').draggable('disable');
 }
 $('.div_displayEquipement .eqLogic-widget').css('box-shadow',''); 
}else{
   $('.div_displayEquipement .eqLogic-widget').css('box-shadow','0 0 4px rgba(147,204,1,.14), 0 10px 16px rgba(147,204,1,.30)');
   $('.div_displayEquipement .eqLogic-widget').draggable('enable');
   $( ".div_displayEquipement .eqLogic-widget.allowResize").resizable({
      grid: [ 2, 2 ],
      resize: function( event, ui ) {
       var el = ui.element;
       el.closest('.div_displayEquipement').packery();
   },
   stop: function( event, ui ) {
    var el = ui.element;
    positionEqLogic(el.attr('data-eqlogic_id'));
    el.closest('.div_displayEquipement').packery();
}
});
}
editWidgetCmdMode(_mode);
}

function getObjectHtml(_object_id){
  jeedom.object.toHtml({
    id: _object_id,
    version: 'dashboard',
    category : SEL_CATEGORY,
    summary : SEL_SUMMARY,
    tag : SEL_TAG,
    error: function (error) {
        $('#div_alert').showAlert({message: error.message, level: 'danger'});
    },
    success: function (html) {
        if($.trim(html) == ''){
            $('#div_ob'+_object_id).parent().remove();
            return;
        }
        try {
            $('#div_ob'+_object_id).empty().html(html).parent().show();
        }catch(err) {
            console.log(err);
        }
        $('#div_ob'+_object_id).animateCss('slideInLeft');
        setTimeout(function(){
            positionEqLogic();
            $('#div_ob'+_object_id+'.div_displayEquipement').disableSelection();
            $("input").click(function() { $(this).focus(); });
            $("textarea").click(function() { $(this).focus(); });
            $("select").click(function() { $(this).focus(); });
            
            $('.eqLogic-widget').each( function( i, eqLogic ) {
            	var backgroundColor = $( eqLogic ).css('background-color');
            	if(backgroundColor.substr(0, 3) == 'rgb'){
	            	backgroundColor = backgroundColor.replace(')',', 0.4)');
            	}else{
	            	backgroundColor = backgroundColor+'80';
            	}
                $( eqLogic ).css('border', '1px solid '+backgroundColor+'' );
            });
            
            $('#div_ob'+_object_id+'.div_displayEquipement').each(function(){
                var container = $(this).packery({
                    itemSelector: ".eqLogic-widget",
                    gutter : 0,
                    columnWidth: 25
                });
                var itemElems =  container.find('.eqLogic-widget').draggable();
                container.packery( 'bindUIDraggableEvents', itemElems );
                container.packery( 'on', 'dragItemPositioned',function(){
                    //$('.div_displayEquipement').packery();
                });
                function orderItems() {
                  var itemElems = container.packery('getItemElements');
                  $( itemElems ).each( function( i, itemElem ) {
                    $( itemElem ).attr('data-order', i + 1 );
                });
              }
              container.on( 'layoutComplete', orderItems );
              container.on( 'dragItemPositioned', orderItems );
          });
            $('#div_ob'+_object_id+'.div_displayEquipement .eqLogic-widget').draggable('disable');
        },10);
    }
});
}


$('#bt_editDashboardWidgetOrder').on('click',function(){
    if($(this).attr('data-mode') == 1){
        $.hideAlert();
        $(this).attr('data-mode',0);
        editWidgetMode(0);
        $(this).css('color','black');
        $('.bt_editDashboardWidgetAutoResize').hide();
		$('.div_displayEquipement').packery();
    }else{
       $('#div_alert').showAlert({message: "{{Vous êtes en mode édition vous pouvez déplacer les widgets, les redimensionner et changer l'ordre des commandes dans les widgets. N'oubliez pas de quitter le mode édition pour sauvegarder}}", level: 'info'});
       $(this).attr('data-mode',1);
       $('.bt_editDashboardWidgetAutoResize').show();
       $('.bt_editDashboardWidgetAutoResize').off('click').on('click', function(){
		   var id_object = $(this).attr('id');
		   id_object = id_object.replace('edit_object_','');
		   var heightObjectex = 0;
		   $('#div_ob'+id_object+'.div_displayEquipement .eqLogic-widget').each(function(index, element){
				var heightObject = this.style.height;
				heightObject = eval(heightObject.replace('px',''));
				
				var valueAdd = eval(heightObject * 0.20);
				var valueRemove = eval(heightObject * 0.05);
				var heightObjectadd = eval(heightObject + valueAdd);
				var heightObjectremove = eval(heightObject - valueRemove);
				
				if(heightObjectadd >= heightObjectex && (heightObjectex > heightObject || heightObjectremove < heightObjectex)){
					if($(element).hasClass('allowResize')){
						$( element ).height(heightObjectex);
						heightObject = heightObjectex;
					}
			    }
				heightObjectex = heightObject;
			}); 
	   });
       editWidgetMode(1);
       $(this).css('color','rgb(46, 176, 75)');
   }
});


$('.li_object').on('click',function(){
    var object_id = $(this).find('a').attr('data-object_id');
    if($('.div_object[data-object_id='+object_id+']').html() != undefined){
        $('.li_object').removeClass('active');
        $(this).addClass('active');
        var top = $('#div_displayObject').scrollTop()+ $('.div_object[data-object_id='+object_id+']').offset().top - 60;
        $('#div_displayObject').animate({ scrollTop: top}, 500);
    }else{
        loadPage($(this).find('a').attr('data-href'));
    }
});
