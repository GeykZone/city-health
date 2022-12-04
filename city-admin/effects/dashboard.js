var disease_type = "default";
var date_range_from = "default";
var date_range_to = "default";
var active_inactive = "(Active)"
var query_click = "clicked";
var gender = "default";
var barangay_name = "default";

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

var active_inactive_validator = "(Active)"

var sort = "names";


var x_value = "";
var y_value = "";
var xValues = "";
var yValues = "";
var largets_total = "";
var myColors=[];
var myChart ="";
var res_id_value ="";

$(document).ready(function()
{
    $("#map_from").text("between "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy + " and ")
    $("#map_to").text(getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy)
    display_map()

    chart_array()
    number_of_resident_chart();
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
              var modified_label = cont.description+" health cases in total."
              if(cont.description == 1)
              {
                var modified_label = cont.description+" health case in total."
              }
            }
            else
            {
              var modified_label = cont.description+" currently active health cases in total."
              if(cont.description == 1)
              {
                var modified_label = cont.description+" currently active health case in total."
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
          label: 'Total Number of Residents: ',
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

}
//number of residents chart end

