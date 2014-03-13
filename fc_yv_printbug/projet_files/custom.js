var CollabData = function () {

    caldiffDay = function (firstDate, secondDate) {

	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	// var firstDate = new Date(2008,01,12);
	// var secondDate = new Date(2008,01,22);

	var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

	}


}();
