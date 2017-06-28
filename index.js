$(function() {
    console.log($("#year option:selected").text())
    var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    var dayNames = ["SUN","MON","TUE","WED","TH","FRI","SAT"];
    window.create = function() {
	$("#calendar").empty();
	$("#list").empty();
    var year = $("#year option:selected").val();
    var month = $("#monthOfYear option:selected").val();
    var dayOfWeek = Number($("#dayOfWeek option:selected").val());
    var day = new Date(year, month, 1, 0, 0, 0, 0);
    var nextYear = new Date(Number(year)+1, month, 1, 0, 0, 0, 0);
	var dayNum = new Date(Number(year), month, 1, 0, 0, 0, 0).getDay()+7;
	var headings = $("<div>").addClass("row");
        var monthElement = $("<div>").addClass("container");
        var rowElement = $("<div>").addClass("row");
	while(dayNum%7 != dayOfWeek)
	{
	  rowElement.append(window.addDay(null));
	  dayNum--;
	}
	headings.append($("<div class=\"col-xs-1\">"));
	for(var i=0;i<7;i++) {
	  headings.append($("<div class=\"col-xs-1\">" + dayNames[(dayOfWeek + i) %7] + "</div>"));
	}
	$("#calendar").append(headings);
    $("#lines").empty()
	$("#lines").append($("<div class=\"row\">&nbsp;</div>"));
	
	var monthName = monthNames[day.getMonth()];
	var monthContainer = $("<div class=\"row\">");
        while(day < nextYear)
        {
            rowElement.append(window.addDay(day));
            if(Number(dayOfWeek) == day.getDay()){
                monthElement.append(rowElement);
                rowElement = $("<div>").addClass("row")
                                        .height($("#lineHeight").val());
		        $('#lines').append($("<div class=\"empty col-xs-12\" style=\"height: " + $("#lineHeight").val() + "px\"></div>"));
            }
            if(monthName != monthNames[day.getMonth()]) {
                $("<div class=\"month col-xs-1\">" + monthName + "</div>").appendTo(monthContainer);
                monthContainer
                            .append($("<div class=\"col-xs-11\">")
                            .append(monthElement));
                monthName = monthNames[day.getMonth()];
                $("#calendar").append(monthContainer);
                monthContainer = $("<div class=\"row " + monthName + "\">");
                monthElement = $("<div class=\"container\">");
            }
        }
    }
    
    window.addDay = function(day) {
      var cell = $("<div>").height($("#lineHeight").val());  
      if(day == null){
	    cell.addClass("empty col-xs-1");
      } else {
        cell.addClass("day col-xs-1").text(day.getDate());
        day.setDate(day.getDate()+1);
      }
        return cell;
    };
});


