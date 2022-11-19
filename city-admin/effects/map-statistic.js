var disease_type = "default";
var date_range_from = "default";
var date_range_to = "default";
var active_inactive = "default"
var query_click = "unclicked"

var current_year = new Date();
var current_year_dd = String(current_year.getDate()).padStart(2, '0');
var current_year_mm = String(current_year.getMonth() + 1).padStart(2, '0');
var current_year_yyyy = current_year.getFullYear();

var current_year_from = current_year_yyyy + '-' + '01' + '-' + '01';
var current_year_to = current_year_yyyy + '-' + current_year_mm + '-' + current_year_dd;

var tittle_disease_type = "All Diseases"



$(document).ready(function()
{
    current_status()
    $(document).attr("title", "HPCS | Manage Health Profiles");
    $("#nav_hp").addClass("active");
    date_range()
    select_with_search_box()
    display_map();

    $( "#range_from" ).val(current_year_from);
    $( "#range_to" ).val(current_year_to);

    oneTip();

})

function oneTip()
{
    var current_year_tooltip = $("#current_year")
    var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "bottom", target:current_year_tooltip });
    myOpentip.setContent("Back to current statistic."); // Updates Opentips content

    var show_overlay_tooltip = $("#show_overlay")
    var myOpentip = new Opentip(show_overlay_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "bottom", target:show_overlay_tooltip });
    myOpentip.setContent("Show map info."); // Updates Opentips content
  
    var hide_overlay_tooltip = $("#hide_overlay")
    var myOpentip = new Opentip(hide_overlay_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "bottom", target:hide_overlay_tooltip });
    myOpentip.setContent("Hide map info."); // Updates Opentips content  
    

}

//tittle page current status
function current_status()
{

    if(query_click != "clicked")
    {
        $("#map_from").text(getMonthName(01) + ' ' + '01, ' + current_year_yyyy + " - ")
        $("#map_to").text(getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy)
    }
    else
    {
        var new_date_range_form = date_range_from.replaceAll('-', ' ');
        var array_date_range_form = new_date_range_form.split(" ")

        var new_date_range_to = date_range_to.replaceAll('-', ' ');
        var array_date_range_to = new_date_range_to.split(" ")

        $("#map_from").text(getMonthName(array_date_range_form[1]) + ' ' + array_date_range_form[2] + ", "+ array_date_range_form[0] + " - ")
        $("#map_to").text(getMonthName(array_date_range_to[1]) + ' ' + array_date_range_to[2] + ", "+ array_date_range_to[0])
    }

    

    if(disease_type === "default")
    {
        $("#map_disease").text(" : All Diseases")
    }
    else
    {
        $("#map_disease").text(" : "+tittle_disease_type)   
    }

    if(active_inactive === "default")
    {
        $("#map_cases").text(" : Active and Inactive Cases")
    }
    else
    {
        $("#map_cases").text(" : "+active_inactive+ " Cases Only")   
    }
}
//tittle page cureent status end

// for select
function select_with_search_box()
{
$('select').selectize({
// maxItems: '1',
});
$(".selectize-control").removeClass("form-control barangay-form")
}
// for select  end

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
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [123.7206, 8.4548], // starting position [lng, lat]
    zoom: 12,
    bearing: -17.6,
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
                 active_inactive:active_inactive,
    
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
                 'description': hpTotal
                 }
         
             newObjectArr.push(single);
             });
         
             const locations = {
                 'type': 'FeatureCollection',
                 'features': newObjectArr
                 };
              
             
             // initialization to display markers
             for (const feature of locations.features) {
             
                 var clusterCategory = "";
             
                 // create a HTML element for each feature
                 const el = document.createElement('div');
                 if(feature.description <= 1)
                 {
                     el.className = 'green';
                     clusterCategory = "Low"
                     el.id = feature.title
                 }
                 else if(feature.description <= 2)
                 {
                     el.className = 'yellow';
                     clusterCategory = "Moderate"
                     el.id = feature.title
                 }
                 else if(feature.description <= 3)
                 {
                     el.className = 'orange';
                     clusterCategory = "High"
                     el.id = feature.title
                 }
                 else
                 {
                     el.className = 'red';
                     clusterCategory = "Critical"
                     el.id = feature.title

                 }
                 
                 //to get the occuring diseases in that area
                 var all_diseases_that_occured = feature.title;
                 var display_diseases_that_occured = "";
    
                 $.ajaxSetup({async:false});
                 $.getJSON('functions/display-functions/get-occuring-diseases.php', 
                 {
                    query_click:query_click,
    
                    disease_type:disease_type,
                    date_range_from:date_range_from,
                    date_range_to:date_range_to,
                    active_inactive:active_inactive,
       
                    current_year_from:current_year_from,
                    current_year_to:current_year_to,
       
                    all_diseases_that_occured: all_diseases_that_occured
                     
                 },     
                 function (data, textStatus, jqXHR) 
                 {
                    display_diseases_that_occured = data;
                 });
                 //to get the occuring diseases in that area end
                 
             
                 var pops = new mapboxgl.Popup({ offset: 25 }) // add popups
                 .setHTML(
                 `<h6><span style="color:#294168bf; margin-bottom:2px; margin-right: 5px;" class=" fa-solid "></span>${"Barangay: "+feature.title}</h6>
                 <h6><span style="color:#294168bf; margin-bottom:0px; margin-right: 5px;" class=" fa-solid "></span>${"Disease Type:" +display_diseases_that_occured}</h6>
                 <h6><span style="color:#294168bf; margin-bottom:0px; margin-right: 5px;" class=" fa-solid "></span>${"Total Issues: "+feature.description}</h6>
                 <h6><span style="color:#294168bf; margin-bottom:0px; margin-right: 5px;" class=" fa-solid "></span>${"Cluster Category: "+clusterCategory}</h6>`
                 )
         
                 const hpmarker = new mapboxgl.Marker(el) // add markers
                 .setLngLat(feature.geometry)
                 .setPopup(pops).addTo(map)

                 $("#date_range_btn").click(function()
                 {
                    var from_input = $("#range_from").val()
                    var to_input = $("#range_to").val()
        
                    if(from_input.trim().length != 0 && to_input.trim().length != 0)
                    {
                        hpmarker.remove()
                    }
    
                 })
                 $("#current_year").click(function()
                {
                    hpmarker.remove()
    
                })
    
    
    
              
             }         
           }
           markers()
    
           
           $("#date_range_btn").click(function()
           {
               
                var from_input = $("#range_from").val()
                var to_input = $("#range_to").val()
    
                if(from_input.trim().length === 0)
                {
                    $("#range_from").addClass("is-invalid");
                }
                else if(to_input.trim().length === 0)
                {
                    $("#range_to").addClass("is-invalid");
                }
                else
                {
                    query_click = "clicked"
                    date_range_from = from_input;
                    date_range_to = to_input;
    
                    current_status()
                    markers()
                }
           })
    
           $("#current_year").click(function()
           {
            $("#active_only_btn").addClass("d-none")
            $("#all_cases").removeClass("d-none")
    
                active_inactive = "default"
                disease_type = "default"
                date_range_from = "default";
                date_range_to = "default";
                tittle_disease_type = "All Diseases"
                query_click = "unclicked"
    
                $( "#range_from" ).val(current_year_from);
                $( "#range_from" ).removeClass("is-invalid");
                $( "#range_to" ).val(current_year_to);
                $( "#range_to" ).removeClass("is-invalid");
                var $select = $('#select_diseases').selectize();
                var control = $select[0].selectize;
                control.clear();
    
                current_status()
                markers()
    
           })
    
           $("#active_only_btn").click(function()
           {
                $("#active_only_btn").addClass("d-none")
                $("#all_cases").removeClass("d-none")
    
                active_inactive = "default"
    
           })
    
           $("#all_cases").click(function()
           {
             $("#active_only_btn").removeClass("d-none")
             $("#all_cases").addClass("d-none")
    
    
                active_inactive = "(Active)"
    
           })
    
                
            $("#select_diseases").change(function(){ 
    
                inactive_click = "unlcicked"
                active_click = "unlcicked"
                query_click = "unlcicked"
                diseases_click = "clicked"
    
                var hp_selected = $("#select_diseases").val();
                tittle_disease_type = $("#select_diseases").text();
    
                if(hp_selected.trim().length != 0)
                {
                    disease_type = hp_selected;
                }
                else
                {
                    disease_type = "default"
                    tittle_disease_type = "All Diseases"
                }
                
            });
    
        
            // define layer for legend
            const layers = [
            'Low Number of Health Issues',
            'Moderate Number of Health Issues',
            'High Number of Health Issues',
            'Critical Number of Health Issues',
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


