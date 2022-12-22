var disease_type = "default";
var date_range_from = "default";
var date_range_to = "default";
var active_inactive = "default"
var query_click = "clicked";
var gender = "default";
var barangay_name = "default";
var min_age = "default";
var max_age = "default";

var current_year = new Date();
var current_year_dd = String(current_year.getDate()).padStart(2, '0');
var current_year_mm = String(current_year.getMonth() + 1).padStart(2, '0');
var current_year_yyyy = current_year.getFullYear();

var one_month = new Date(current_year);
one_month.setMonth(one_month.getMonth() - 1);
var one_month_dd = String(one_month.getDate()).padStart(2, '0');
var one_month_mm = String(one_month.getMonth() + 1).padStart(2, '0');
var one_month_yyy = one_month.getFullYear();

var current_year_from = one_month_yyy + '-' + one_month_mm + '-' + one_month_dd;
var current_year_to = current_year_yyyy + '-' + current_year_mm + '-' + current_year_dd;

var date_range_from = current_year_from
var date_range_to = current_year_to

var active_inactive_validator = "default"

var sort = "names";


var x_value = "";
var y_value = "";
var xValues = "";
var yValues = "";
var largets_total = "";
var myColors=[];
var myChart ="";
var res_id_value ="";

var total_hp_count;

var top_3_disease_name_title;
var top_3_total_disease_title;

var top_3_barangay_name_title;
var top_3_total_barangay_title;

var currentDate = new Date(current_year);
var past7Days = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
var past7Days_dd = String(past7Days.getDate()).padStart(2, '0');
var past7Days_mm = String(past7Days.getMonth() + 1).padStart(2, '0');
var past7Days_yyy = past7Days.getFullYear();

var past7Days_from = past7Days_yyy + '-' + past7Days_mm + '-' + past7Days_dd;
var past7Days_to = current_year_yyyy + '-' + current_year_mm + '-' + current_year_dd;

$(document).ready(function()
{
    $(document).attr("title", "HPCS | Dashboard");

    $(".sevenDaysFrom").text(getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy)
    $(".sevenDaysTo").text(getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy)

    display_map()

    chart_array()
    number_of_resident_chart()
    total_hp_count_function()

    top_3_diseases_function()
    top_3_barangays_functions()

    shurctuMenu()
    newCases()
    newDeaths()
    newRecoveries()
    
})

//remove first word from string
function removeFirstWord(str) {
    const indexOfSpace = str.indexOf(' ');
    
    if (indexOfSpace === -1) {
        return '';
    }
    
    return str.substring(indexOfSpace + 1);
    }
//remove first word from string end

//remove last word from a string
function removeLastWord(str) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
  
    if (lastIndexOfSpace === -1) {
      return str;
    }
    return str.substring(0, lastIndexOfSpace);
  }
//remove last word from a string end

//convert month number into words
function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'long' });
  }
//convert month number into words end

//map
function display_map()
{
    // TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
	mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2YWVzMjAyMSIsImEiOiJja3Y2ZzdsNHgwdjNjMnRva25ydWl5dXBiIn0.PGH3gPOO163DcTiQJdVRlA';
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [123.767099, 8.467180], // starting position [lng, lat]
    zoom: 11,  // starting zoom
    pitch: 0,
    bearing: -17.6,
    container: 'map',
    projection: 'globe',
    antialias: true
    });

    map.on('load', () => {

        $(".map-overlay").removeClass("d-none") 
        $(".map-text").removeClass("d-none") 
       
        map.getCanvas().style.cursor = 'default';
            
        //resizing the map 
        $(".header-toggler").click(function()
        {
            setTimeout(function(){
                map.resize();
            },300);
            
        })
        $(".sidebar-toggler").click(function()
        {
            setTimeout(function(){
                map.resize();
            },300);
            
        })
    
    
       function markers()
       {
         //Geting Jason lat and long from database for markers
         var long_lat = [];

         $.ajaxSetup({async:false});
         $.getJSON('functions/display-functions/map-statistic.php', 
         {
          long_lat:'set',
    
          query_click:query_click,
          disease_type:disease_type,
          date_range_from:date_range_from,
          date_range_to:date_range_to,
          active_inactive:active_inactive,
          gender:gender,
          max_age:max_age,
          min_age:min_age,

          current_year_from:current_year_from,
          current_year_to:current_year_to

         },     
         function (data, textStatus, jqXHR) 
         {
             long_lat = data;
         });
     
         var textArr = long_lat;
         var newObjectArr = [];
     
         $.each(textArr,function(index,lat_long){
     
         hpTotal =  removeLastWord(lat_long)
         hpTotal =  removeLastWord(hpTotal)
         hpTotal =  removeLastWord(hpTotal)
         
         barangay = removeLastWord(lat_long)
         barangay = removeLastWord(barangay)
         barangay = removeFirstWord(barangay)
         barangay = barangay.split('_').join(' ') 
     
         lat = removeFirstWord(lat_long)
         lat = removeFirstWord(lat)
         lat = removeFirstWord(lat)
     
         long = removeLastWord(lat_long)
         long = removeFirstWord(long)
         long = removeFirstWord(long)
     
         var single = {
             'type': 'Feature',
             'geometry': [long, lat],
             'title': barangay,
             'description': hpTotal,
             'index': index
             }
     
         newObjectArr.push(single);
         });
     
         const locations = {
             'type': 'FeatureCollection',
             'features': newObjectArr
             };
          
             
         // initialization to display markers
         for (var i = 0; i < locations.features.length; i++ ) {

             const feature = locations.features[i]
             var clusterCategory = "";
         
             // create a HTML element for each feature
             const el = document.createElement('div');
             if(feature.description <= 1)
             {
                 el.className = 'green';
                 clusterCategory = "Low"
                 el.id = i
             }
             else if(feature.description <= 2)
             {
                 el.className = 'yellow';
                 clusterCategory = "Moderate"
                 el.id = i
             }
             else if(feature.description <= 3)
             {
                 el.className = 'orange';
                 clusterCategory = "High"
                 el.id = i
             }
             else
             {
                 el.className = 'red';
                 clusterCategory = "Critical"
                 el.id = i

             }

             var pops = new mapboxgl.Popup({ offset: 5, closeButton: false}) 

             const hpmarker = new mapboxgl.Marker(el) // add markers
             .setLngLat(feature.geometry)
             .addTo(map)
         }

         //showing popup on moouse enter
         $( '.mapboxgl-marker' ).mouseenter(function() {
            var divId = $(this).attr('id');
            divId = parseInt(divId)
            var cont = locations.features[divId]
            var mark;

            if(cont.description <= 1)
            {
                mark= 'green';
            }
            else if(cont.description <= 2)
            {
                mark = 'yellow';

            }
            else if(cont.description <= 3)
            {
                mark = 'orange';

            }
            else
            {
                mark= 'red';
            }

            if(active_inactive_validator === "default")
            {
              var modified_label = parseInt(cont.description).toLocaleString('en-US')+" health cases in total."
              if(cont.description == 1)
              {
                var modified_label = parseInt(cont.description).toLocaleString('en-US')+" health case in total."
              }
            }
            else
            {
              var modified_label = parseInt(cont.description).toLocaleString('en-US')+" currently active health cases in total."
              if(cont.description == 1)
              {
                var modified_label = parseInt(cont.description).toLocaleString('en-US')+" currently active health case in total."
              }
            }

            pops.setLngLat(cont.geometry).setHTML(
                `<h6 class="mb-2 d-flex">`+cont.title+`<div class = "`+mark+` ms-2" style= "width:20px; height:20px; margin-top:-2px;"></div></h6>
                 <p style=" white-space: nowrap;">`+modified_label+`</p>
                 <p style="margin-top:-18px;">(click to see more details)</p>
                `
            ).addTo(map)
            
        });
        
        //closing popup on mouse leave
        $( '.mapboxgl-marker' ).mouseout(function() {
            pops.remove();
            
        });

        //show more details on click
        $( '.mapboxgl-marker' ).click(function() {

            var divId = $(this).attr('id');
            divId = parseInt(divId)
            var cont = locations.features[divId]
            var mark;

            Cookies.set('dashboard_map', divId)

            location.href = 'map-statistic.php';
        });
        if(long_lat[0] === "0 0 0 0")
        {
            $("#map_record_info").text(" (No Records Found)")

            $("#map_record_info").click(function()
            {
              location.href = 'map-statistic.php';
            })
        }
        else
        {
            $("#map_record_info").text("")
        }
       }
       markers()

        //other controls
        map.scrollZoom.disable();
        map.addControl(new mapboxgl.NavigationControl());// Add zoom and rotation controls to the map. 

        $(".mapboxgl-ctrl-group").addClass("d-none d-lg-block d-sm-none")

    });

}
//map

//initalize chart values
function chart_array()
{
  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/show-number-of-resident.php', 
  {
    barangay_name:'set'
  }, 
  
  function (data, textStatus, jqXHR) 
  {
    x_value = data;
  });

  $.getJSON('functions/display-functions/show-number-of-resident.php', 
  {
    total_residents_number:'set'
  }, 
  
  function (data, textStatus, jqXHR) 
  {
    y_value = data;
    
  });    

  if(sort === "asc")
  {
      //sorting algorithm
      arrayOfObj = x_value.map(function(d, i) {
        return {
          label: d,
          data: y_value[i] || 0
        };
      });
      
      sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
        return a.data - b.data;
      });
      
      newArrayLabel = [];
      newArrayData = [];
      sortedArrayOfObj.forEach(function(d){
        newArrayLabel.push(d.label);
        newArrayData.push(d.data);
      });
      ////sorting algorithm
  }
  else if(sort === "desc")
  {
      //sorting algorithm
      arrayOfObj = x_value.map(function(d, i) {
        return {
          label: d,
          data: y_value[i] || 0
        };
      });
      
      sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
        return b.data - a.data ;
      });
      
      newArrayLabel = [];
      newArrayData = [];
      sortedArrayOfObj.forEach(function(d){
        newArrayLabel.push(d.label);
        newArrayData.push(d.data);
      });
      ////sorting algorithm
  }
  else
  {
          //sorting algorithm
          arrayOfObj = x_value.map(function(d, i) {
            return {
              label: d,
              data: y_value[i] || 0
            };
          });
          
          sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
            return a.data + b.data;
          });
          
          newArrayLabel = [];
          newArrayData = [];
          sortedArrayOfObj.forEach(function(d){
            newArrayLabel.push(d.label);
            newArrayData.push(d.data);
          });
          ////sorting algorithm
  }

      x_value = newArrayLabel;
      y_value = newArrayData;

      xValues = x_value;
      yValues = y_value; 

      //generate a color base on percentage
      largets_total = Math.max(...y_value) //get the largest element of the brg resident array
      $.each(yValues, function( index,value ) {
          var b =100
          var percentage = b * value;
          percentage = percentage / largets_total;

        if(percentage<=10){
            myColors[index]="#c7e7f7ff";
        }
        else if(percentage<=30)
        {
          myColors[index]="#c7e7f7ff";
        }
        else if(percentage<=50)
        {
          myColors[index]="#c7e7f7ff";
        }
        else{
          myColors[index]="#c7e7f7ff";
        }
      });

}
 //initalize chart values end

//number of residents chart
function number_of_resident_chart()
{
  
  //initialize chart
  const ctx = $('#myChart');
  myChart = new Chart(ctx, {
  type: 'bar',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'x',
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        },
        type: 'linear',
        grace: '5%'
      }

    },
    plugins: {
        responsive: true,
        legend: {
            display: false,
        },
        tooltip: {
          enabled: true,
          displayColors: false,
          padding: 15,
          caretSize: 10,
          cornerRadius: 20,
          caretPadding: 0,
          usePointStyle: true,
          backgroundColor: '#ffffff',
          bodyColor: "#626464",
          titleColor:  "#626464",
          borderColor: "#dee0e0",
          borderWidth: 1,
          callbacks: {
          labelPointStyle: function(context) {
            return {
                pointStyle: 'rectRounded',
                rotation: 0,
            };
          }

        },
        }
    }
  },
  
  data: {
      labels: xValues,
      dataSorting: {
        enabled: true
     },
      datasets: [{
          label: 'Total Number of Residents ',
          data: yValues,
          backgroundColor: myColors,
          borderColor: "#c7e7f7ff",
          borderWidth: 1,
          borderRadius: 8,
         // pointRadius: myPoints,
          borderSkipped: false,
          barPercentage: 1,
          categoryPercentage:0.8,
          //poinStyle: 'circle'
      }]
  },
});

$("#myChart").addClass(" rounded-4 p-3 bg-c-blue bg-opacity-50 border-0 shadow-sm")

$("#myChart_container").click(function()
{
  Cookies.set('dashboard_residentChart', 'set')

  location.href = 'manage-resident.php';
})

}
//number of residents chart end

//top 3 diseases
function top_3_diseases_function()  
{
  var top_3_diseases;
  var top_3_diseases_date_start = getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy
  var top_3_diseases_date_end = getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy

  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    top_3_diseases:'set',
    top_from:current_year_from,
    top_to:current_year_to
  },     
  function (data, textStatus, jqXHR) 
  {
    top_3_diseases = data;
    
  });

  var textArr = top_3_diseases;
  var newObjectArr = [];

  $.each(textArr,function(index,top_3_diseases){
  
  disease_name = removeLastWord(top_3_diseases)
  disease_name = disease_name.split('_').join(' ') 

  total_diseases = removeFirstWord(top_3_diseases)

  var new_output = {
      'disease_name': disease_name,
      'total_diseases': total_diseases,
      'index': index
      }

  newObjectArr.push(new_output);
  });

  const top_3_disease_object = {
      'features': newObjectArr
      };

  // initialization to display markers
  for (var i = 0; i < top_3_disease_object.features.length; i++ ) 
  { 
    const top_3_diseases_results = top_3_disease_object.features[i] 

    var percentage = (top_3_diseases_results.total_diseases / total_hp_count) * 100;
    var progress_color;

    top_3_disease_name_title = top_3_diseases_results.disease_name;
    top_3_total_disease_title = parseInt(percentage);

    if(i === 0)
    {
      progress_color = 'bg-c-pink';
    }
    else if (i === 1)
    {
      progress_color = 'bg-c-orange';
    }
    else
    {
      progress_color = 'bg-c-yellow';
    }

    $("#top_three_diseases").append('<tr class=" align-middle"><td style="min-width:150px;">'+top_3_diseases_results.disease_name+'</td><td style="min-width:300px;"><div id="top_3_disease_progress'+i+'" class="progress shortCut_btn"><div class="progress-bar '+progress_color+' rounded-5" role="progressbar" style="width: '+top_3_total_disease_title+'%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+parseInt(top_3_total_disease_title).toLocaleString('en-US')+'%</div></div></td><td style="min-width:90px;">'+parseInt(top_3_diseases_results.total_diseases).toLocaleString('en-US')+' Individuals</td></tr>');

    var current_year_tooltip = $("#top_3_disease_progress"+i+"")
    var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
    borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
    myOpentip.setContent("Approximately, from "+top_3_diseases_date_start+" to "+top_3_diseases_date_end+", "+parseInt(top_3_total_disease_title).toLocaleString('en-US')+"% of health cases in Oroquieta City were caused by "+top_3_disease_name_title+""); // Updates Opentips content
  }


}
//top 3 diseases end

//total hp count
function total_hp_count_function()
{
  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    total_hp:'set',
    top_from:current_year_from,
    top_to:current_year_to
  },     
  function (data, textStatus, jqXHR) 
  {
    total_hp_count = data;
    
  });

}
//total hp count end

//top 3 barangays
function top_3_barangays_functions()
{
  var top_3_barangays;
  var top_3_barangays_date_start = getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy
  var top_3_barangays_date_end = getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy

  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    top_3_barangays:'set',
    top_from:current_year_from,
    top_to:current_year_to
  },     
  function (data, textStatus, jqXHR) 
  {
    top_3_barangays = data;
    
  });

  var textArr = top_3_barangays;
  var newObjectArr = [];

  $.each(textArr,function(index,top_3_barangays){
  
  barangay_name = removeLastWord(top_3_barangays)
  barangay_name = barangay_name.split('_').join(' ') 

  total_barangays = removeFirstWord(top_3_barangays)

  var new_output = {
      'barangay_name': barangay_name,
      'total_barangays': total_barangays,
      'index': index
      }

  newObjectArr.push(new_output);
  });

  const top_3_barangays_object = {
      'features': newObjectArr
      };

  // initialization to display markers
  for (var i = 0; i < top_3_barangays_object.features.length; i++ ) 
  { 
    const top_3_barangays_results = top_3_barangays_object.features[i] 

    var percentage = (top_3_barangays_results.total_barangays / total_hp_count) * 100;
    var progress_color;
    top_3_barangay_name_title = top_3_barangays_results.barangay_name;
    top_3_total_barangay_title = parseInt(percentage);


    if(i === 0)
    {
      progress_color = 'bg-c-pink';
    }
    else if (i === 1)
    {
      progress_color = 'bg-c-orange';
    }
    else
    {
      progress_color = 'bg-c-yellow';
    }

    $("#top_three_barangays").append('<tr class=" align-middle"><td style="min-width:150px;">'+top_3_barangays_results.barangay_name+'</td><td style="min-width:300px;"><div id="top_3_barangay_progress'+i+'" class="progress shortCut_btn"><div class="progress-bar '+progress_color+' rounded-5" role="progressbar" style="width: '+top_3_total_barangay_title+'%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+parseInt(top_3_total_barangay_title).toLocaleString('en-US')+'%</div></div></td><td style="min-width:90px;">'+parseInt(top_3_barangays_results.total_barangays).toLocaleString('en-US')+' Health Cases</td></tr>');
    
    var current_year_tooltip = $("#top_3_barangay_progress"+i+"")
    var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
    borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
    myOpentip.setContent("Approximately, from "+top_3_barangays_date_start+" to "+top_3_barangays_date_end+", "+parseInt(top_3_total_barangay_title).toLocaleString('en-US')+"% of reported health cases in Oroquieta City were located in Barangay "+top_3_barangay_name_title+""); // Updates Opentips content
  }
}
//top 3 barangays end

//shorctuts
function shurctuMenu()
{
  var current_year_tooltip = $("#barangay_health_statistic_shorcut")
  var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.50});
  myOpentip.setContent("Barangay Health Statistic chart shortcut"); // Updates Opentips content
  $("#barangay_health_statistic_shorcut").click(function()
  {
    location.href = 'graphical-statistic.php';
  })

  var current_year_tooltip = $("#disease_statistic_shorcut")
  var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.50});
  myOpentip.setContent("Disease Statistic chart shortcut"); // Updates Opentips content
  $("#disease_statistic_shorcut").click(function()
  {
    location.href = 'graphical-statistic-disease.php';
  })

  var current_year_tooltip = $("#timespan_statistic_shorcut")
  var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.50});
  myOpentip.setContent("Time-span chart shortcut"); // Updates Opentips content
  $("#timespan_statistic_shorcut").click(function()
  {
    location.href = 'time-span.php';
  })
  
  var current_year_tooltip = $("#rec_death_statistic_shorcut")
  var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.50});
  myOpentip.setContent("Recoveries & Deaths chart shortcut"); // Updates Opentips content
  $("#rec_death_statistic_shorcut").click(function()
  {
    location.href = 'recoveries_and_deaths.php';
  })
  
}
//shortcuts end

//new cases
function newCases()
{
  var newCases_variable

  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    newCases:'set',
    top_from:past7Days_from,
    top_to:past7Days_to
  },     
  function (data, textStatus, jqXHR) 
  {
    newCases_variable = data;
  });

  $("#total_new_cases").text(parseInt(newCases_variable).toLocaleString('en-US'));

  if(parseInt(newCases_variable)>0)
  {
    $("#newCasesPercent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(newCases_variable).toLocaleString('en-US')+
    " new health cases reported in Oroquieta City");

    if(parseInt(newCases_variable) === 1)
    {
      $("#newCasesPercent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", only "+parseInt(newCases_variable).toLocaleString('en-US')+
      " new health case has been reported in Oroquieta City");
    }
  }
  else
  {
    $("#newCasesPercent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health cases reported in Oroquieta City");
  }
 

  $('.click_to_see_more').text("(Click to see more details)");

  $("#new_health_cases_btn").click(function(){

    var details_for_newCases;

    if(parseInt(newCases_variable)>0)
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-yellow mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(newCases_variable).toLocaleString('en-US')+
      " new health cases reported in Oroquieta City"+'</label></div>');

      if(parseInt(newCases_variable) === 1)
      {
        $('.generated_report_content').remove();
        $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-yellow mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there has been only "+parseInt(newCases_variable).toLocaleString('en-US')+
        " new health case reported in Oroquieta City"+'</label></div>');  
      }
    }
    else
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-yellow mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health cases reported in Oroquieta City"+'</label></div>');
    }

   

    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_top_3.php', 
    {
      details_for_newCases:'set',
      top_from:past7Days_from,
      top_to:past7Days_to
    },     
    function (data, textStatus, jqXHR) 
    {
      details_for_newCases = data;
    });

    $("#report_lbl").text("List of New Health Cases")
    $(".dashboard_reports_modal").removeClass("bg-c-pink")
    $(".dashboard_reports_modal").removeClass("bg-c-yellow")
    $(".dashboard_reports_modal").removeClass("bg-c-green")
    $(".dashboard_reports_modal").addClass("bg-c-yellow")
    $("#details_title").text("New Health Cases")
    $('.new_health_icon').remove();
    $("#header_icon").append('<span style="width: 15px; height:15px; color:#ffff;" class="new_health_icon fa-solid"></span>')

    $('.new_health_cases_list').remove();
    $.each(details_for_newCases, function( index,value ) {

      $("#details_form").append('<div  class="new_health_cases_list border-0 shadow-sm align-middle pt-2 bg-c-yellow mb-3 rounded-2 d-flex align-items-center text-white px-2"><label class="form-label">'+value+'</label></div>');
  
    });

    $('#show_details').modal('toggle')
  })

}
//new cases end

//new deaths
function newDeaths()
{
  var new_deaths_variable;

  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    newDeaths:'set',
    top_from:past7Days_from,
    top_to:past7Days_to
  },     
  function (data, textStatus, jqXHR) 
  {
    new_deaths_variable = data;
  });

  $("#total_new_deaths").text(parseInt(new_deaths_variable).toLocaleString('en-US'));

  if(parseInt(new_deaths_variable)>0)
  {
    $("#newDeathsPercent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(new_deaths_variable).toLocaleString('en-US')+
    " new health-related deaths reported in Oroquieta City");

    if(parseInt(new_deaths_variable) === 1)
    {
      $("#newDeathsPercent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", only "+parseInt(new_deaths_variable).toLocaleString('en-US')+
    " new health-related death has been reported in Oroquieta City");
    }
  }
  else
  {
    $("#newDeathsPercent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health-related deaths reported in Oroquieta City");
  }

  $('.click_to_see_more').text("(Click to see more details)");

  $("#new_deaths_btn").click(function(){

    var details_for_newDeaths;

    if(parseInt(new_deaths_variable)>0)
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-pink mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(new_deaths_variable).toLocaleString('en-US')+
      " new health-related deaths reported in Oroquieta City"+'</label></div>');

      if(parseInt(new_deaths_variable) === 1)
      {
        $('.generated_report_content').remove();
        $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-pink mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", only "+parseInt(new_deaths_variable).toLocaleString('en-US')+
        " new health-related death has been reported in Oroquieta City"+'</label></div>');  
      }
    }
    else
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-pink mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health-related deaths reported in Oroquieta City"+'</label></div>');
    }

   
    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_top_3.php', 
    {
      details_for_newDeaths:'set',
      top_from:past7Days_from,
      top_to:past7Days_to
    },     
    function (data, textStatus, jqXHR) 
    {
      details_for_newDeaths = data;
    });

    $("#report_lbl").text("List of New Health-related Deaths")
    $(".dashboard_reports_modal").removeClass("bg-c-pink")
    $(".dashboard_reports_modal").removeClass("bg-c-yellow")
    $(".dashboard_reports_modal").removeClass("bg-c-green")
    $(".dashboard_reports_modal").addClass("bg-c-pink")
    $("#details_title").text("New Health-related Deaths")
    $('.new_health_icon').remove();
    $("#header_icon").append('<span style="width: 15px; height:15px; color:#ffff;" class="new_health_icon fa-solid"></span>')

    $('.new_health_cases_list').remove();
    $.each(details_for_newDeaths, function( index,value ) {

      $("#details_form").append('<div  class="new_health_cases_list border-0 shadow-sm align-middle pt-2 bg-c-pink mb-3 rounded-2 d-flex align-items-center text-white px-2"><label class="form-label">'+value+'</label></div>');
  
    });

    $('#show_details').modal('toggle')
  })
}
//new deaths end

//new recoveries
function newRecoveries()
{

  var newRecoveries_variable;

  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    newRecoveries:'set',
    top_from:past7Days_from,
    top_to:past7Days_to
  },     
  function (data, textStatus, jqXHR) 
  {
    newRecoveries_variable = data;
  });

  $("#total_newRecoveries").text(parseInt(newRecoveries_variable).toLocaleString('en-US'));

  
  if(parseInt(newRecoveries_variable)>0)
  {
    $("#newRecoveries_percent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(newRecoveries_variable).toLocaleString('en-US')+
    " new health recoveries reported in Oroquieta City");

    if(parseInt(newRecoveries_variable) === 1)
    {
      $("#newRecoveries_percent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there has been only "+parseInt(newRecoveries_variable).toLocaleString('en-US')+
      " new health recovery reported in Oroquieta City");
    }
  }
  else
  {
    $("#newRecoveries_percent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health recoveries reported in Oroquieta City");
  }
 
  $('.click_to_see_more').text("(Click to see more details)");

  $("#new_recoveries_btn").click(function(){

    var details_for_recoveries;

    if(parseInt(newRecoveries_variable)>0)
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-green mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(newRecoveries_variable).toLocaleString('en-US')+
      " new health recoveries reported in Oroquieta City"+'</label></div>');

      if(parseInt(newRecoveries_variable) === 1)
      {
        $('.generated_report_content').remove();
        $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-green mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", only "+parseInt(newRecoveries_variable).toLocaleString('en-US')+
        " new health recovery has been reported in Oroquieta City"+'</label></div>');
      }
    }
    else
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-green mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health recoveries reported in Oroquieta City"+'</label></div>');
    }

   
    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_top_3.php', 
    {
      details_for_recoveries:'set',
      top_from:past7Days_from,
      top_to:past7Days_to
    },     
    function (data, textStatus, jqXHR) 
    {
      details_for_recoveries = data;
    });

    $("#report_lbl").text("List of New Health Recoveries")
    $(".dashboard_reports_modal").removeClass("bg-c-pink")
    $(".dashboard_reports_modal").removeClass("bg-c-yellow")
    $(".dashboard_reports_modal").removeClass("bg-c-green")
    $(".dashboard_reports_modal").addClass("bg-c-green")
    $("#details_title").text("New Health Recoveries")
    $('.new_health_icon').remove();
    $("#header_icon").append('<span style="width: 15px; height:15px; color:#ffff;" class="new_health_icon fa-solid"></span>')

    $('.new_health_cases_list').remove();
    $.each(details_for_recoveries, function( index,value ) {

      $("#details_form").append('<div  class="new_health_cases_list border-0 shadow-sm align-middle pt-2 bg-c-green mb-3 rounded-2 d-flex align-items-center text-white px-2"><label class="form-label">'+value+'</label></div>');
  
    });

    $('#show_details').modal('toggle')
  })

}
//new recoveries end
