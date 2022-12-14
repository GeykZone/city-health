var disease_type = "default";
var date_range_from = "default";
var date_range_to = "default";
var query_click = "unclicked";
var gender = "default";

var current_year = new Date();
var current_year_dd = String(current_year.getDate()).padStart(2, '0');
var current_year_mm = String(current_year.getMonth() + 1).padStart(2, '0');
var current_year_yyyy = current_year.getFullYear();


var tittle_disease_type = ""
var tittle_gender = ""

var one_month = new Date(current_year);
one_month.setMonth(one_month.getMonth() - 1);
var one_month_dd = String(one_month.getDate()).padStart(2, '0');
var one_month_mm = String(one_month.getMonth() + 1).padStart(2, '0');
var one_month_yyy = one_month.getFullYear();

var current_year_from = one_month_yyy + '-' + one_month_mm + '-' + one_month_dd;
var current_year_to = current_year_yyyy + '-' + current_year_mm + '-' + current_year_dd;


var min_age = "default";
var max_age = "default";

var map_center


$(document).ready(function()
{
    $("#hp_option").removeClass("mb-3")
    $("#hp_option").addClass("mb-1")
    $(document).attr("title", "HPCS | Manage Health Profiles");
    $("#nav_hp").addClass("active");
    current_status()
    date_range()
    select_list()
    select_for_disease()

    var width = $(window).width();
    if (width < 1003) {
      map_center = [123.8006, 8.4595];
    } else {
      map_center = [123.765389, 8.465992];
    }
    
    $( "#range_from" ).val(current_year_from);
    $( "#range_to" ).val(current_year_to);

   display_map();

    oneTip();

})

// selectize ordinary
function select_list() 
{
  $('.select_list').selectize({
    // maxItems: '1',
    sortField: 'text'
    });
}
// selectize ordinary end

// for select diseases
function select_for_disease()
{  
var selectize_diseases ;
$.ajaxSetup({async:false});
$.getJSON('functions/display-functions/select_diseases.php', 
{
}, 
function (data, textStatus, jqXHR) 
{
  selectize_diseases = data;
});

if(selectize_diseases != undefined)
{
var selectize_diseases_data = selectize_diseases;
var items = selectize_diseases_data.map(function(x) 
{ 
    //remove the first words
    var one = x.substr(x.indexOf(" ") + 1);

    //remove last word
    function removeLastWord(str) 
    {
      const lastIndexOfSpace = str.lastIndexOf(' ');
    
      if (lastIndexOfSpace === -1) {
        return str;
      }
      return str.substring(0, lastIndexOfSpace);
    }

    var text_label = removeLastWord(x)
    text_label = text_label.split('_').join(' ') 

    return {
      item: one,
      field: text_label
    };
  
});

}


$('#select_diseases').selectize
({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});

$(".selectize-control").removeClass("form-control barangay-form")
}
// for select diseases  end

function oneTip()
{
    var current_year_tooltip = $("#current_year")
    current_year_tooltip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "bottom", target:current_year_tooltip, delay:0.50});
    current_year_tooltip.setContent("Refresh Map"); // Updates Opentips content

    var show_overlay_tooltip = $("#show_overlay")
    show_overlay_tooltip = new Opentip(show_overlay_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "bottom", target:show_overlay_tooltip, delay:0.50 });
    show_overlay_tooltip.setContent("Show Info"); // Updates Opentips content
  
    var hide_overlay_tooltip = $("#hide_overlay")
    hide_overlay_tooltip = new Opentip(hide_overlay_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "bottom", target:hide_overlay_tooltip, delay:0.50});
    hide_overlay_tooltip.setContent("Hide Info"); // Updates Opentips content   

    $("body").click(function()
    {
        current_year_tooltip.hide()
        show_overlay_tooltip.hide()
        hide_overlay_tooltip.hide()
    })

}

//object to string
function objToString (obj) {
    return Object.entries(obj).reduce((str, [p, val]) => {
        return `${str}${val},\n`;
    }, '');
}
//object to string

//tittle page current status
function current_status()
{

    if(query_click != "clicked")
    {
        $("#map_from").text("from "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy + " to ")
        $("#map_to").text(getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy)

        $(".details_head_from").text(getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy + " - "+getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy)
    }
    else
    {
        var new_date_range_form = date_range_from.replaceAll('-', ' ');
        var array_date_range_form = new_date_range_form.split(" ")

        var new_date_range_to = date_range_to.replaceAll('-', ' ');
        var array_date_range_to = new_date_range_to.split(" ")

        
        if($( "#range_from" ).val() === $( "#range_to" ).val())
        {
          $("#map_from").text("from "+getMonthName(array_date_range_form[1]) + ' ' + array_date_range_form[2] + ", "+ array_date_range_form[0] + "")
          $("#map_to").text("")

          $(".details_head_from").text(getMonthName(array_date_range_form[1]) + ' ' + array_date_range_form[2] + ", "+ array_date_range_form[0] + "")
        }
        else
        {
          $("#map_from").text("from "+getMonthName(array_date_range_form[1]) + ' ' + array_date_range_form[2] + ", "+ array_date_range_form[0] + " to ")
          $("#map_to").text(getMonthName(array_date_range_to[1]) + ' ' + array_date_range_to[2] + ", "+ array_date_range_to[0])

          $(".details_head_from").text(getMonthName(array_date_range_form[1]) + ' ' + array_date_range_form[2] + ", "+ array_date_range_form[0] + " - "+getMonthName(array_date_range_to[1]) + ' ' + array_date_range_to[2] + ", "+ array_date_range_to[0])
        }

    }

    

    if(disease_type === "default")
    {
        $("#map_disease").text("All ")
    }
    else
    {
        $("#map_disease").text("All "+tittle_disease_type+" ")   
    }

    $("#map_cases").text("health cases, documented ")

    if(gender === "default")
    {
        $("#map_gender").text("")
        $(".details_head_gender").text("Male and female records")
    }
    else
    {   
        if(gender === "Female")
        {
            $("#map_gender").text(", female records")
            $(".details_head_gender").text("Female records")
        }
        else if(gender === "Male")
        {
            $("#map_gender").text(", male records")
            $(".details_head_gender").text("Male records")
        }
          
    }

    if(min_age != "default")
    {
       
        $("#map_min_age").text(", minimum age of "+min_age)
        $(".details_head_age").text("Minimum age of "+min_age)
    }
    else
    {
        if(max_age != "default")
        {
    
            $("#map_max_age").text(", maximum age of "+max_age) 
            $(".details_head_age").text("Maximum age of "+max_age)
        }
        else
        {
            $("#map_min_age").text("")
            $(".details_head_age").text("All ages")
        }
    }

    if(max_age != "default")
    {

        $("#map_max_age").text(", maximum age of "+max_age) 
        $(".details_head_age").text("Maximum age of "+max_age)
    }
    else
    {
        if(min_age != "default")
        {
        
            $("#map_min_age").text(", minimum age of "+min_age)
            $(".details_head_age").text("Minimum age of "+min_age)
        }
        else
        {
            $("#map_max_age").text("")
            $(".details_head_age").text("All ages")
        }
    }

    if(min_age != "default" && max_age != "default") 
    {
      
        if(min_age === max_age )
        {
            $("#map_min_age").text(", all "+min_age+" years old")
            $("#map_max_age").text("")
            $(".details_head_age").text("All "+min_age+" years old")
        }
        else
        {
            $("#map_min_age").text(", minimum age of "+min_age)
            $("#map_max_age").text(", maximum age of "+max_age)
            $(".details_head_age").text("Minimum age of "+min_age+", maximum age of "+max_age+"")
        }
    }


}
//tittle page cureent status end

//date picker
function date_range()
{

  $("#range_from").datepicker({
    dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
    });


    $("#range_to").datepicker({
        dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
        });

}
//date picker end

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

//initializing the map
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
    center: map_center, // starting position [lng, lat]
    zoom: 12,
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
        
            // changing the map style
            const layerList = document.getElementById('menu');
            const inputs = layerList.getElementsByTagName('input');
            for (const input of inputs) {
            input.onclick = (layer) => {
            const layerId = layer.target.id;
            map.setStyle('mapbox://styles/mapbox/' + layerId);
            };
            } 

                
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

            // console.log(long_lat)

         
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

             //console.log(newObjectArr)
         
             const locations = {
                 'type': 'FeatureCollection',
                 'features': newObjectArr
                 };

            var total = 0
             // initialization to display markers
             for (var i = 0; i < locations.features.length; i++ ) {

                 const feature = locations.features[i]
                 var clusterCategory = "";
             
                 // create a HTML element for each feature
                 const el = document.createElement('div');
                 if(parseInt(feature.description) <= 10)
                 {
                     el.className = 'green';
                     clusterCategory = "Low"
                     el.id = i
                 }
                 else if(parseInt(feature.description) <= 40)
                 {
                     el.className = 'yellow';
                     clusterCategory = "Moderate"
                     el.id = i
                 }
                 else if(parseInt(feature.description) <= 70)
                 {
                     el.className = 'orange';
                     clusterCategory = "Severe"
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

                 $("#date_range_btn").click(function()
                 {
                    var from_input = $("#range_from").val()
                    var to_input = $("#range_to").val()
                    var click_min_age = $("#age_min").val();
                    var click_max_age = $("#age_max").val();
                    tittle_disease_type = $("#select_diseases").text();
                    tittle_gender = $("#select_gender").text();
                    var validator = true
                    var d_from = new Date(from_input)
                    var d_to = new  Date(to_input)
                    if(click_min_age.length === 1 ){ click_min_age = "0"+click_min_age}
                    if(click_max_age.length === 1 ){ click_max_age = "0"+click_max_age}
                    click_min_age = parseInt(click_min_age);
                    click_max_age = parseInt(click_max_age);

                    if(!isNaN(click_max_age) && click_min_age > click_max_age){validator =false}
                    if(from_input.trim().length === 0){validator =false}
                    else if(to_input.trim().length === 0){validator =false}
                    else if(d_from > d_to){validator =false}
                    if(validator === true){hpmarker.remove()} 
                 })

                 $("#current_year").click(function()
                {
                    hpmarker.remove()
    
                })

                total += parseInt(feature.description)
             }

             if(isNaN(total))
             {
              total=0;
             }
          
             $("#map_totals").text(", ("+total.toLocaleString('en-US')+") in total")

             //showing popup on moouse enter
             $( '.mapboxgl-marker' ).mouseenter(function() {
                var divId = $(this).attr('id');
                divId = parseInt(divId)
                var cont = locations.features[divId]
                var mark;

                if(parseInt(cont.description) <= 10)
                {
                    mark= 'green';
                }
                else if(parseInt(cont.description) <= 40)
                {
                    mark = 'yellow';

                }
                else if(parseInt(cont.description) <= 70)
                {
                    mark = 'orange';

                }
                else
                {
                    mark= 'red';
                }

                var modified_label = parseInt(cont.description).toLocaleString('en-US')+" health cases in total"
                  if(cont.description == 1)
                  {
                    var modified_label = parseInt(cont.description).toLocaleString('en-US')+" health case in total."
                  }

                pops.setLngLat(cont.geometry).setHTML(
                    `<h6 class="mb-3 d-flex">`+cont.title+`<div class = "`+mark+` ms-2" style= "width:20px; height:20px; margin-top:-2px;"></div></h6>
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
                var details_title;
                var cluster;

                if(parseInt(cont.description) <= 10)
                {
                    mark= 'green';
                    cluster = 'Low'
                }
                else if(parseInt(cont.description) <= 40)
                {
                    mark = 'yellow';
                    cluster = 'Moderate'

                }
                else if(parseInt(cont.description) <= 70)
                {
                    mark = 'orange';
                    cluster = 'Severe'
                }
                else
                {
                    mark= 'red';
                    cluster = 'Critical'
                }

                $("#details_title").text("Barangay "+cont.title+"")

                $(".details_head_status").text("All documented health cases in barangay "+cont.title)
            
                if(disease_type != "default")
                {
                  $(".details_head_status").text("All documented health cases caused by "+tittle_disease_type+" in barangay "+cont.title)
                }

                if(cont.description != 1)
                {
                  details_title = "There are "+parseInt(cont.description).toLocaleString('en-US')+" health cases in total";
                }
                else
                {
                  details_title = "There is only "+parseInt(cont.description).toLocaleString('en-US')+" health case in total";
                }

                $('.details_content_label').remove();
                $("#details_content_titte").append('<div class="details_content_label border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 text-white px-2"><label class="form-label">'+details_title+'</label></div>');
                
                $('.details_category_content').remove();
                $("#details_category").append('<div class="details_category_content border-0 shadow-sm align-middle d-flex pt-2 bg-c-blue mb-3 rounded-2 text-white px-2"><div style="width:30px; height:30px; margin-bottom:8px;" class="rounded-circle bg-white">'+
                '<div style="width:20px; height:20px; margin-top:4px; margin-left:4px;" class="'+mark+'"></div></div><label style="margin-top: 3px;" class="form-label ms-2">'+cluster+' number of health cases</label></div>');

                //to get the occuring diseases in that area
                var all_diseases_that_occured = cont.title;
                var display_diseases_that_occured = "";
    
                $.ajaxSetup({async:false});
                $.getJSON('functions/display-functions/get-occuring-diseases.php', 
                {
                    query_click:query_click,
    
                    disease_type:disease_type,
                    date_range_from:date_range_from,
                    date_range_to:date_range_to,
                    gender:gender,
                    min_age:min_age,
                    max_age:max_age,
    
                    current_year_from:current_year_from,
                    current_year_to:current_year_to,
    
                    all_diseases_that_occured: all_diseases_that_occured
                    
                },     
                function (data, textStatus, jqXHR) 
                {
                    //display_diseases_that_occured = objToString (data);
                    //display_diseases_that_occured = display_diseases_that_occured.slice(0, -2);
                    display_diseases_that_occured = data;
                });
                //to get the occuring diseases in that area end

                $('.details_list').remove();
                $.each(display_diseases_that_occured, function( index,value ) {
        
                  $("#details_form").append('<div class="details_list border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 text-white px-2"><label class="form-label">'+value+'</label></div>');
              
                });
                
                
                $('#show_details').modal('toggle');
            });

            if (Cookies.get('dashboard_map') != undefined) {
                
                var divId = Cookies.get('dashboard_map');
                divId = parseInt(divId)
                var cont = locations.features[divId]
                var mark;
                var details_title;
                var cluster;

                if(parseInt(cont.description) <= 10)
                {
                    mark= 'green';
                    cluster = 'Low'
                }
                else if(parseInt(cont.description) <= 40)
                {
                    mark = 'yellow';
                    cluster = 'Moderate'

                }
                else if(parseInt(cont.description) <= 70)
                {
                    mark = 'orange';
                    cluster = 'Severe'
                }
                else
                {
                    mark= 'red';
                    cluster = 'Critical'
                }

                $("#details_title").text("Barangay "+cont.title+"")

                $(".details_head_status").text("All documented health cases in barangay "+cont.title)
            
                if(disease_type != "default")
                {
                  $(".details_head_status").text("All documented health cases caused by "+tittle_disease_type+" in barangay "+cont.title)
                }

                if(cont.description != 1)
                {
                  details_title = "There are "+parseInt(cont.description).toLocaleString('en-US')+" health cases in total";
                }
                else
                {
                  details_title = "There is only "+parseInt(cont.description).toLocaleString('en-US')+" health case in total";
                }

                $('.details_content_label').remove();
                $("#details_content_titte").append('<div class="details_content_label border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 text-white px-2"><label class="form-label">'+details_title+'</label></div>');
                
                $('.details_category_content').remove();
                $("#details_category").append('<div class="details_category_content border-0 shadow-sm align-middle d-flex pt-2 bg-c-blue mb-3 rounded-2 text-white px-2"><div style="width:30px; height:30px; margin-bottom:8px;" class="rounded-circle bg-white">'+
                '<div style="width:20px; height:20px; margin-top:4px; margin-left:4px;" class="'+mark+'"></div></div><label style="margin-top: 3px;" class="form-label ms-2">'+cluster+' number of health cases</label></div>');

                //to get the occuring diseases in that area
                var all_diseases_that_occured = cont.title;
                var display_diseases_that_occured = "";
    
                $.ajaxSetup({async:false});
                $.getJSON('functions/display-functions/get-occuring-diseases.php', 
                {
                    query_click:query_click,
    
                    disease_type:disease_type,
                    date_range_from:date_range_from,
                    date_range_to:date_range_to,
                    gender:gender,
                    min_age:min_age,
                    max_age:max_age,
    
                    current_year_from:current_year_from,
                    current_year_to:current_year_to,
    
                    all_diseases_that_occured: all_diseases_that_occured
                    
                },     
                function (data, textStatus, jqXHR) 
                {
                    //display_diseases_that_occured = objToString (data);
                    //display_diseases_that_occured = display_diseases_that_occured.slice(0, -2);
                    display_diseases_that_occured = data;
                });
                //to get the occuring diseases in that area end

                $('.details_list').remove();
                $.each(display_diseases_that_occured, function( index,value ) {
        
                  $("#details_form").append('<div class="details_list border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 text-white px-2"><label class="form-label">'+value+'</label></div>');
              
                });
                
                
                $('#show_details').modal('toggle');

                Cookies.remove('dashboard_map')
            }


            if(long_lat[0] === "0 0 0 0")
            {
                $("#map_record_info").text(" (No Records Found)")
            }
            else
            {
                $("#map_record_info").text("")
            }

           }
           markers()
           
           $("#date_range_btn").click(function()
           {
               
                var from_input = $("#range_from").val()
                var to_input = $("#range_to").val()
                var click_min_age = $("#age_min").val();
                var click_max_age = $("#age_max").val();
                var hp_selected = $("#select_diseases").val();
                tittle_disease_type = $("#select_diseases").text();
                var gender_selected = $("#select_gender").val();
                tittle_gender = $("#select_gender").text();
                var validator = true
                
                var d_from = new Date(from_input)
                var d_to = new  Date(to_input)

                //console.log(click_max_age)
                click_min_age = parseInt(click_min_age);
                click_max_age = parseInt(click_max_age);
                
                if(!isNaN(click_max_age) && click_min_age > click_max_age)
                {
                  $("#age_max").addClass("is-invalid");
                  $("#age_max").val("");
                  validator =false
                }

                if(isNaN(click_min_age))
                {
                    min_age =  "default";
                }
                else
                {
                    min_age = click_min_age;
                }

                if(isNaN(click_max_age))
                {
                    max_age =  "default";
                }
                else
                {
                    max_age = click_max_age;
                }

                if(hp_selected.trim().length === 0)
                {
                    disease_type = "default";
                    tittle_disease_type = ""
                }
                else
                {
                    disease_type = hp_selected;
                }
                    
                if(gender_selected.trim().length === 0)
                {
                    gender = "default";
                    tittle_gender = "";
                }
                else
                {
                    gender = gender_selected;
                }

    
                if(from_input.trim().length === 0)
                {
                    $("#range_from").addClass("is-invalid");
                    validator =false
                   
                }
                else if(to_input.trim().length === 0)
                {
                    $("#range_to").addClass("is-invalid");
                    validator =false
                   
                }
                else if(d_from > d_to)
                {
                  $("#range_to").addClass("is-invalid");
                  $("#range_to").val("");
                    validator =false
                    
                }

                if(validator === true)
                {
                    query_click = "clicked"
                    date_range_from = from_input;
                    date_range_to = to_input;

                    $('#filter-map').modal('toggle');

                    current_status()
                    markers()
                }
           })
    
           $("#current_year").click(function()
           {
            $("#active_only_btn").addClass("d-none")
            $("#all_cases").removeClass("d-none")

                disease_type = "default"
                date_range_from = "default";
                date_range_to = "default";
                tittle_disease_type = "All Diseases"
                gender = "default";
                query_click = "unclicked"
                min_age = "default";
                max_age = "default";

                $("#age_min").val("");
                $("#age_max").val("");
                $( "#range_from" ).val(current_year_from);
                $( "#range_from" ).removeClass("is-invalid");
                $( "#range_to" ).val(current_year_to);
                $( "#range_to" ).removeClass("is-invalid");
                var $select = $('#select_diseases').selectize();
                var control = $select[0].selectize;
                control.clear();

                var $select = $('#select_gender').selectize();
                var control = $select[0].selectize;
                control.clear();
    
                current_status()
                markers()
    
           })
        
            // define layer for legend
            const layers = [
            'Low Number of Health Cases (1-10)',
            'Moderate Number of Health Cases (11-40)',
            'Severe Number of Health Cases (41-70)',
            'Critical Number of Health Cases (71+)',
            ];
            const colors = [
            'yellowgreen',
            'yellow',
            'orange',
            'red',
            ];              
            
            // create legend
            const legend = document.getElementById('legend');
            
            layers.forEach((layer, i) => {
            const color = colors[i];
            const item = document.createElement('div');
            const key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;
    
            const value = document.createElement('span');
            value.innerHTML = `${layer}`;
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
        
            });
            
            //hide legend
            $("#hide_overlay").click(function()
            {
                $(".map-overlay").toggle();
                $(".btn-overlay").toggle();
            })
            
            //show legend
            $("#show_overlay").click(function()
            {
                $(".btn-overlay").toggle();
                $(".map-overlay").toggle();
                
            })

            //autohide legend
            $(".btn-overlay").toggle();
            $(".map-overlay").toggle();

        
            //other controls
            map.scrollZoom.disable();
            map.addControl(new mapboxgl.NavigationControl());// Add zoom and rotation controls to the map. 

            $(".mapboxgl-ctrl-group").addClass("d-none d-lg-block d-sm-none")



        });
    

    
        
}
//initializing the map end

// cange color of date field when value is not 0
$("#range_from").change(function()
{

  if($("#range_from").val().trim().length === 0)
  {
    $('#range_from').css(
      {
          'cssText': 'color:#818a99 !important'
      }
      );
  }
  else
  {
    $('#range_from').css(
      {
          'cssText': 'color: #333 !important'
      }
    );

  }

})


$("#range_to").change(function()
{

  if($("#range_to").val().trim().length === 0)
  {
    $('#range_to').css(
      {
        'cssText': 'color:#818a99 !important'
      }
      );
  }
  else
  {
    $('#range_to').css(
      {
          'cssText': 'color: #333 !important'
      }
      );
  }

})
// cange color of date field when value is not 0 end





