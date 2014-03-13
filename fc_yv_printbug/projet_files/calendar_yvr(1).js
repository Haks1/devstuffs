jQuery(document).ready(function() {       
   // initiate layout and plugins
   CalendarRv.init();
   
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		for (var j = 0; j < 12; j++)
    	{
        	calendar[j].fullCalendarRv('render');
        }
    });

    $('#calNext').click(function() {
      for (var j = 1; j < 12; j++)
      {
          calendar[j].fullCalendarRv('next');
      }
    });

    $('#calPrev').click(function() {
      for (var j = 1; j < 12; j++)
      {
          calendar[j].fullCalendarRv('prev');
      }
    });

    $('#calRessJ').click(function() {
      for (var j = 1; j < 12; j++)
      {
          calendar[j].fullCalendarRv('changeView', 'resourceDay');
      }
    });

    $('#calRessSem').click(function() {
      for (var j = 1; j < 12; j++)
      {
          calendar[j].fullCalendarRv('changeView', 'resourceWeek');
      }
    });

    $('#calRessWeeks').click(function() {
      for (var j = 1; j < 12; j++)
      {
          calendar[j].fullCalendarRv('changeView', 'resourceNextWeeks');
      }
    });

    $('#calRessMonth').click(function() {
      for (var j = 1; j < 12; j++)
      {
          calendar[j].fullCalendarRv('changeView', 'resourceMonth');
      }
    });
//    $('#myTab a:first').tab('show');

   // for project page
/*$("#caluptab").click(
				function() {
                    for (var j = 0; j < 12; j++)
                    	{
                        	calendar[j].fullCalendarRv('option', 'height', $(window).height() - 40); // 'render' ne marche pas...
                        	calendar[j].fullCalendarRv('render');
                        	calendar[j].fullCalendarRv('rerenderEvents');
                        }
                    }
			);
*/

});