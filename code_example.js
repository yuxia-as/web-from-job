function call_data(ts_data){
	var ts_id_array = new Array();
	//create a two dimensional array;
	for (var i=0,len=ts_data.length;i<len; i++){
		ts_id_array.push(ts_data[i][1]);
	}
    
	var $from = $('#from').val();
	var $to = $('#to').val();
	var $format = $('#format').val();
	
	//limit the query period to 2 years(730days),change the number to fit your needs.
	var diff = Math.abs(new Date(from) - new Date(to))/(1000*60*60*24);
	if (diff > 1460){
		alert("You can not query over 4 years data");
		$("#bodyTag").css("cursor", "default");
		return false;
	}else{
	//call timeseries data;
		$.ajax({
		    url: "GetData/ts_data3.php",
		    type: "POST",
		    data: {ts_id: $ts_id_array, from: $from, to: $to, format: $format},
		    success: function (data) {
					var arr = JSON.parse(data);
				//send these data to each function and get html table, csv downloading and highchart;					
					switch(format){
					case "html":
						load_html(arr);
					break;
					case "csv":
						load_csv(arr);
					break;
				}	
			$("#bodyTag").css("cursor", "default");		
			
		    }
		});
	}
}
