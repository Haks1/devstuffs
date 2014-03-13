var FormComponents = function () {
	
	var handleColorPicker = function () {
        if (!jQuery().colorpicker) {
            return;
        }
        $('.colorpicker-default').colorpicker({
            format: 'hex'
        });
        /*$('.colorpicker-rgba').colorpicker();*/
    }

    var handleDatetimePicker = function () {

        $(".form_datetime").datetimepicker({
            autoclose: true,
            isRTL: App.isRTL(),
            format: "dd/mm/yyyy",
            language: 'fr',
            pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left"),
            pickTime: false
        });

        $('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
    }

    return {
        //main function to initiate the module
        init: function () {
            handleDatetimePicker();
            handleColorPicker();
        }
    };

}();

$('#addProj').on('click', function() {
	socket.get('/projet/create',
		{
			"title": $('#projtitle').val(),
			"client": $('#projclient').val(),
			"start": $('#pickerStart').data("datetimepicker").getDate(),
			"end": $('#pickerEnd').data("datetimepicker").getDate(),
			"backgroundColor": $('#projbgcolor').val()
		},
	 function (err, projs) {
			for(var i=0; i<projs.length; i++)
  				$('#calendar').fullCalendar( 'renderEvent', projs[i]);
		});
});

$('#addCollabProj').on('click', function() {
	socket.get('/projetcollaborateur/create',
		{
			"collab": $("#selectCollab option:selected").val(),
			"proj": $("#selectProj option:selected").val(),
			"backgroundColor": $('#collabbgcolor').val()
		},
	 function (err, cols) {
	 	/*for(var i=0; i<projs.length; i++)
  			$('#calendar').fullCalendar( 'renderEvent', projs[i]);*/
		});
});

$('#selectCalProj').on('change', function(event) {
	socket.get('/projetcollaborateur/find',
		{
    		proj: $("#selectCalProj option:selected").val()
    	},
    	 function (err, ress) {
			for (var j = 0; j < 12; j++)
		    {
		        calendar[j].fullCalendarRv('resources', ress);
		    }
		});
});

jQuery(document).ready(function() {       
   // initiate layout and plugins
   	Calendar.init();
	FormComponents.init();


});