var disease_type = "default";
var date_range_from = "default";
var date_range_to = "default";
var active_inactive = "default"

$(document).ready(function()
{
    $(document).attr("title", "HPCS | Manage Health Profiles");
    $("#nav_hp").addClass("active");
    date_range()
    select_with_search_box()
    display_map();
})

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
    center: [123.80065, 8.459527], // starting position [lng, lat]
    zoom: 12.5,
    pitch: 45,
    bearing: -17.6,
    antialias: true
    });

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
         $.getJSON('functions/map-statistic.php', 
         {
             long_lat:'set',
             active_inactive: active_inactive
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
          
          console.log(newObjectArr)
         // initialization to display markers
         for (const feature of locations.features) {
         
             var clusterCategory = "";
         
             // create a HTML element for each feature
             const el = document.createElement('div');
             if(feature.description <= 1)
             {
                 el.className = 'green';
                 clusterCategory = "Low"
             }
             else if(feature.description <= 2)
             {
                 el.className = 'yellow';
                 clusterCategory = "Moderate"
             }
             else if(feature.description <= 3)
             {
                 el.className = 'orange';
                 clusterCategory = "High"
             }
             else
             {
                 el.className = 'red';
                 clusterCategory = "Critical"
             }
         
         
     
         
             var pops = new mapboxgl.Popup({ offset: 25 }) // add popups
             .setHTML(
             `<h6><span style="color:#294168bf; margin-bottom:2px; margin-right: 5px;" class=" fa-solid "></span>${"Barangay: "+feature.title}</h6>
             <h6><span style="color:#294168bf; margin-bottom:0px; margin-right: 5px;" class=" fa-solid "></span>${"Disease Type: All"}</h6>
             <h6><span style="color:#294168bf; margin-bottom:0px; margin-right: 5px;" class=" fa-solid "></span>${"Total Issues: "+feature.description}</h6>
             <h6><span style="color:#294168bf; margin-bottom:0px; margin-right: 5px;" class=" fa-solid "></span>${"Cluster Category: "+clusterCategory}</h6>`
             )
     
             const hpmarker = new mapboxgl.Marker(el) // add markers
             .setLngLat(feature.geometry)
             .setPopup(pops).addTo(map)
            
             $("#date_range_btn").click(function()
             {
                 hpmarker.remove()
      
             })
         }         
       }
       markers()

       
       $("#date_range_btn").click(function()
       {
           markers()
       })

       $("#active_only_btn").click(function()
       {
            $("#active_only_btn").toggle();
            $("#all_cases").toggle();

            
       })

       $("#all_cases").click(function()
       {
            $("#active_only_btn").toggle();
            $("#all_cases").toggle();

            
       })

    
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
    
        //other controls
        map.scrollZoom.disable();
        map.addControl(new mapboxgl.NavigationControl());// Add zoom and rotation controls to the map. 
    

    
        
}
//initializing the map end


