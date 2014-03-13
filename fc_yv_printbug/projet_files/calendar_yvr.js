var CalendarRv = function () {


    return {
        //main function to initiate the module
        init: function () {
            CalendarRv.initCalendar();
        },

        initCalendar: function () {

            if (!jQuery().fullCalendarRv) {
                return;
            }

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            var h = {};
            var handleCbResize = function( view ) { };

            
           

            /* added by Haks */
            for (var i = 0; i < 12; i++) {
                if (App.isRTL())
                {
                    if ($('#calendar' + i).parents(".portlet").width() <= 720)
                        $('#calendar' + i).addClass("mobile");
                    else
                        $('#calendar' + i).removeClass("mobile");
                }
                else
                {
                    if ($('#calendar' + i).parents(".portlet").width() <= 720)
                        $('#calendar' + i).addClass("mobile");
                    else
                        $('#calendar' + i).removeClass("mobile");
                }
                if (i != 0)
                {
                    h = {left: 'title',
                    center: '',
                    right:''}
                }
                else
                {
                    h = {left: 'title',
                    center: '',
                    right: 'prev,next,resourceDay,resourceWeek,resourceNextWeeks,resourceMonth'}
                    handleCbResize = function( view ) {
                        for (var j = 0; j < 12; j++)
                            calendar[j].fullCalendarRv('option', 'height', $(window).height() - 40);
                        }
                }
                
                    calendar[i] = $("div[id='calendar" + i + "']").fullCalendarRv({
                        header: h,
                        defaultView: 'resourceMonth',

                        // added by Haks
                        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre',
                         'Octobre', 'Novembre', 'Décembre'],
                        monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep',
                         'Oct', 'Nov', 'Déc'],
                        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
                        firstDay: 1,

                        buttonText: {
                            prev: "<span id='calPrev' class='fc-text-arrow'>&lsaquo;</span>",
                            next: "<span id='calNext' class='fc-text-arrow'>&rsaquo;</span>",
                            largePrev: "<span id='calPrev' class='fc-text-arrow'>&laquo;</span>",
                            largeNext: "<span id='calNext' class='fc-text-arrow'>&raquo;</span>",
                            prevYear: "<span id='calPrev' class='fc-text-arrow'>&laquo;</span>",
                            nextYear: "<span id='calNext' class='fc-text-arrow'>&raquo;</span>",
                            today: "Aujourd'hui",
                            year: 'année',
                            month: 'mois',
                            week: 'semaine',
                            day: 'jour',
                            resourceDay: "<span id='calRessJ'>ressource sur jour</span>",
                            resourceWeek: "<span id='calRessSem'>ressource sur semaine</span>",
                            resourceNextWeeks: "<span id='calRessWeeks'>ressource sur les prochaines semaines</span>",
                            resourceMonth: "<span id='calRessMonth'>ressource sur mois</span>"
                        },
                      /*  today: "Aujourd'hui",
                        month: 'mois',
                        week: 'semaine',
                        day: 'jour',
                        resourceDay: 'ressource sur jour',
                        resourceWeek: 'ressource sur semaine',
                        resourceNextWeeks: 'ressource sur les prochaines semaines',
                        resourceMonth: 'resource sur mois',*/
                        // end Haks

                        editable: true,
                        selectable: true,
                        minTime: 8,
                        maxTime: 16,
                        month: i,  //custom property
                        selectHelper: true,


                        resources: function()
                        {
                            return ("/projetcollaborateur/find?proj=" + $("#selectCalProj option:selected").val());
                        }, /*[{ "name": "Resource 1", "id": "resource1" },
                              { "name": "Resource 2", "id": "resource2" },
                              { "name": "Resource 3", "id": "resource3" },
                              { "name": "Resource 4", "id": "resource4" }
                          ],*/
                        eventSources: function()
                        {
                            
                            return ("/projetcollaborateur/find?proj=" + $("#selectCalProj option:selected").val());
                        },/*[
                            {
                                title: 'Lunch 12.15-14.45',
                                start: new Date(y, m, d, 12, 15),
                                end: new Date(y, m, d, 14, 45),
                                allDay: false,
                                resource: 'resource1'
                            },
                            {
                                title: 'Meeting',
                                start: new Date(y, m, d, 10, 30),
                                end: new Date(y, m, d + 4, 11, 00),
                                allDay: false,
                                resource: 'resource1'
                            },
                                {
                                    title: 'All Day Event',
                                    start: new Date(y, m, 1),
                                    resource: 'resource2'
                                }
                        ],*/
                        dayClick: function (date, allDay, jsEvent, view) {
                            alert(date);
                        },
                        select: function (start, end, allDay, jsEvent, view, resource) {
                            var title = prompt('Veuillez donner un nom à cette tâche:');

                            socket.get('/calspan/create',
                                {
                                    "title": title,
                                    "projCollab": resource.id,
                                    "start": start,
                                    "end": end
                                },
                             function (err, spans) {
                                    for(var i=0; i<projs.length; i++)
                                        $('#calendar').fullCalendar( 'renderEvent', spans[i]);
                                });
                            calendar[start.getMonth()].fullCalendarRv('renderEvent',
                                    {
                                        title: title,
                                        start: start,
                                        end: end,
                                        allDay: allDay,
                                        resource: resource.id,
                                        backgroundColor: resource.backgroundColor
                                    },
                                    true // make the event "stick"
                                ); 
                            calendar[start.getMonth()].fullCalendarRv('unselect');
                        },
                        eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
                            alert('event moved to ' + event.start + ' to ' + event.resource);
                        },
                        eventResize: function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
                            alert('event was resized, new endtime: ' + event.end);
                        },
                        eventClick: function (event, jsEvent, view) {
                            alert('event ' + event.title + ' was clicked');
                        },
                        eventRender: function( event, element, view ) { 

                        },
                        windowResize: handleCbResize
                    });
               /*
                for (var j = 0; j < i; j++)
                {
                    calendar[i].fullCalendarRv('next');
                }*/
                if (i != 0)
                {
                    $("#calendar" + i + " .fc-header").addClass("multical-head");
                }

            }

        }

    };

}();



/*            $('#calendar').fullCalendarRv('destroy'); // destroy the calendar
            $('#calendar').fullCalendarRv({ //re-initialize the calendar
                header: h,

                // added by Haks
                defaultView: 'year',
                monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre',
                 'Octobre', 'Novembre', 'Décembre'],
                monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep',
                 'Oct', 'Nov', 'Déc'],
                dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
                firstDay: 1,
                // end Haks

                slotMinutes: 15,
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar !!!
                drop: function (date, allDay) { // this function is called when something is dropped

                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $(this).data('eventObject');
                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend({}, originalEventObject);

                    // assign it the date that was reported
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = allDay;
                    copiedEventObject.className = $(this).attr("data-class");

                    // render the event on the calendar
                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                    $('#calendar').fullCalendarRv('renderEvent', copiedEventObject, true);

                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }
                },
                events: [{
                        title: 'All Day Event',                        
                        start: new Date(y, m, 1),
                        backgroundColor: App.getLayoutColorCode('yellow')
                    }, {
                        title: 'Long Event',
                        start: new Date(y, m, d - 5),
                        end: new Date(y, m, d - 2),
                        backgroundColor: App.getLayoutColorCode('green')
                    }, {
                        title: 'Repeating Event',
                        start: new Date(y, m, d - 3, 16, 0),
                        allDay: false,
                        backgroundColor: App.getLayoutColorCode('red')
                    }, {
                        title: 'Repeating Event',
                        start: new Date(y, m, d + 4, 16, 0),
                        allDay: false,
                        backgroundColor: App.getLayoutColorCode('green')
                    }, {
                        title: 'Meeting',
                        start: new Date(y, m, d, 10, 30),
                        allDay: false,
                    }, {
                        title: 'Lunch',
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        backgroundColor: App.getLayoutColorCode('grey'),
                        allDay: false,
                    }, {
                        title: 'Birthday Party',
                        start: new Date(y, m, d + 1, 19, 0),
                        end: new Date(y, m, d + 1, 22, 30),
                        backgroundColor: App.getLayoutColorCode('purple'),
                        allDay: false,
                    }, {
                        title: 'Click for Google',
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 29),
                        backgroundColor: App.getLayoutColorCode('yellow'),
                        url: 'http://google.com/',
                    }
                ]
            });*/