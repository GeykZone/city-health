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

var c_1_data
var c_2_data
var c_3_data

$(document).ready(function()
{
    $("#hp_option").removeClass("mb-3")
    $("#hp_option").addClass("mb-1")
    $(document).attr("title", "HPCS | Map Visualization");
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

 //kmeans_v2
 function clusteing_v2(this_datapoints, centroids_num)
 {
  // Function to perform k-means clustering
  function performClustering(data, k) {
  // Step 1: Initialize centroids
  var datap = data;
  var cen_k = k;
  var centroids = initializeCentroids(datap, cen_k);

  var maxIterations = 100; // Maximum number of iterations
  var iterations = 0;

  while (iterations < maxIterations) {
  var clusters = assignDataToCentroids(datap, centroids);
  var newCentroids = updateCentroids(clusters, centroids);

  // Check for convergence
  if (areCentroidsEqual(centroids, newCentroids)) {
    break;
  }

  centroids = newCentroids;
  iterations++;
  }

  return { clusters: clusters, centroids: centroids };
  }
    
  // Function to initialize the centroids
  function initializeCentroids(dataPoints, k) {

  var centroids =[]

    // Set initial centroids
    var c1 = { percent: Number.MAX_VALUE, healthCases: Number.MAX_VALUE }; // Cluster Green
    var c2 = { percent: Number.MAX_VALUE, healthCases: Number.MAX_VALUE }; // Cluster Yellow
    var c3 = { percent: Number.MIN_VALUE, healthCases: Number.MIN_VALUE }; // Cluster Orange

    // Calculate combined values and identify initial centroids
    var sumPercent = 0;
    var sumHealthCases = 0;

    for (var i = 0; i < dataPoints.length; i++) {
    var dataPoint = dataPoints[i];
    var combinedValue = dataPoint.percent + dataPoint.healthCases;
    sumPercent += dataPoint.percent;
    sumHealthCases += dataPoint.healthCases;

    if (combinedValue < c1.percent + c1.healthCases) {
      c1 = dataPoint;
    } else if (combinedValue > c3.percent + c3.healthCases) {
      c3 = dataPoint;
    }
    }

    // Calculate centroid for Cluster 2 (Yellow)
    var c2 = {
    percent: sumPercent / dataPoints.length,
    healthCases: sumHealthCases / dataPoints.length
    };
    
  // Find the data point with the lowest sum of health cases and percentages
  var centroidC1 = c1
  centroids.push(centroidC1);

  if(c2.healthCases < c3.healthCases)
  {
    // Find the data point that is not the lowest sum of health cases and percentages
    var centroidC2 = c2
    centroids.push(centroidC2);
        
    // Find the data point with the highest sum of health cases and percentages
    var centroidC3 = c3;
    centroids.push(centroidC3);
  }
  else
  {
        // Find the data point that is not the lowest sum of health cases and percentages
    var centroidC2 = c3
    centroids.push(centroidC2);
        
    // Find the data point with the highest sum of health cases and percentages
    var centroidC3 = c2
    centroids.push(centroidC3);
  }

  return centroids;
  }

  // Function to assign data points to centroids
  function assignDataToCentroids(data, centroids) {
  var clusters = new Array(centroids.length).fill().map(() => []);

  for (var i = 0; i < data.length; i++) {
  var dataPoint = data[i];
  var minDistance = Infinity;
  var assignedCentroid = null;

  for (var j = 0; j < centroids.length; j++) {
    var centroid = centroids[j];
    var distance = calculateDistance(dataPoint, centroid);

    if (distance < minDistance) {
      minDistance = distance;
      assignedCentroid = centroid;
    }
  }

  clusters[centroids.indexOf(assignedCentroid)].push(dataPoint);
  }

  return clusters;
  }

  // Function to update centroids based on assigned data points
  function updateCentroids(clusters, centroids) {
  var newCentroids = [];

  for (var i = 0; i < clusters.length; i++) {
  var cluster = clusters[i];

  if (cluster.length === 0) {
    // If the cluster is empty, keep the same centroid
    newCentroids.push(centroids[i]);
    continue;
  }

  var sumHealthCases = 0;
  var sumPercent = 0;
  var sumIncrease = 0;

  for (var j = 0; j < cluster.length; j++) {
    var dataPoint = cluster[j];
    sumHealthCases += dataPoint.healthCases;
    sumPercent += dataPoint.percent;
    sumIncrease += dataPoint.increase;
  }

  var averageHealthCases = sumHealthCases / cluster.length;
  var averagePercent = sumPercent / cluster.length;
  var averageIncrease = sumIncrease / cluster.length;

  newCentroids.push({
    healthCases: averageHealthCases,
    percent: averagePercent,
    increase: averageIncrease,
  });
  }

  return newCentroids;
  }

  // Function to calculate the distance between two data points
  function calculateDistance(dataPoint, centroid) {
  var healthCasesDiff = dataPoint.healthCases - centroid.healthCases;
  var percentDiff = dataPoint.percent - centroid.percent;

  // Euclidean distance formula
  var distance = Math.sqrt(
  Math.pow(healthCasesDiff, 2) +
  Math.pow(percentDiff, 2) 
  );

  return distance;
  }

  // Function to check if two arrays of centroids are equal
  function areCentroidsEqual(centroidsA, centroidsB) {
  if (centroidsA.length !== centroidsB.length) {
    return false;
  }

  for (var i = 0; i < centroidsA.length; i++) {
  if (
    centroidsA[i].healthCases !== centroidsB[i].healthCases ||
    centroidsA[i].percent !== centroidsB[i].percent ||
    centroidsA[i].increase !== centroidsB[i].increase
  ) {
    return false;
  }
  }

  return true;
  }

  function generateClusterExplanations(clusters) {
    var exp = []
    var exp_v2 = [i]

  for (var i = 0; i < clusters.length; i++) {
    var cluster = clusters[i];
    var clusterHealthCases = [];

    // Extract the healthCases values from the cluster
    for (var j = 0; j < cluster.length; j++) {
      clusterHealthCases.push(cluster[j].healthCases);
    }

    // Calculate statistics for the cluster
    var minHealthCases = Math.min(...clusterHealthCases);
    minHealthCases = parseInt(minHealthCases)
    var maxHealthCases = Math.max(...clusterHealthCases);
    maxHealthCases = parseInt(maxHealthCases)
    var minPercent = Math.min(...cluster.map((dataPoint) => dataPoint.percent));
    minPercent = parseFloat(minPercent)
    var maxPercent = Math.max(...cluster.map((dataPoint) => dataPoint.percent));
    maxPercent = parseFloat(maxPercent)
    var minIncrease = Math.min(...cluster.map((dataPoint) => dataPoint.increase));
    minIncrease = parseFloat(minIncrease)
    var maxIncrease = Math.max(...cluster.map((dataPoint) => dataPoint.increase));
    maxIncrease = parseFloat(maxIncrease)
    
    var percent_label = minPercent.toFixed(1).toLocaleString('en-US') + "% to " + maxPercent.toFixed(1).toLocaleString('en-US')
    var increase_label = minIncrease.toFixed(1).toLocaleString('en-US') + "% to " + maxIncrease.toFixed(1).toLocaleString('en-US')
    var cases_label = minHealthCases.toLocaleString('en-US') + " to " + maxHealthCases.toLocaleString('en-US')

    var ranging_from = "ranging from"
    var ranges_from = "ranges from"

    if(minHealthCases === maxHealthCases)
    {
      cases_label = minHealthCases.toLocaleString('en-US')+" "
      ranging_from = "with"
    }

    if(minPercent === maxPercent)
    {
      percent_label = minPercent.toLocaleString('en-US')
    }

    if(minIncrease === maxIncrease)
    {
      increase_label = minIncrease.toLocaleString('en-US')
      ranges_from = "is"
    }

    var clust_name
    var explanation

    var only_clust = ''
    var clusterHealthCases_case = 'cases'
    var add_health_cases_exp = ", "+ranging_from+" " + cases_label + " number of recorded health cases. ";

    if(parseInt(clusterHealthCases.length) < 2)
    {
      clusterHealthCases_case = "case. "
      only_clust = "only "
      add_health_cases_exp=''
    }
    if(i===0)
    {
      clust_name = "<h6 class = 'text-success fw-bold'>Cluster Green</h6>"
    }
    else if(i===1)
    {
      clust_name = "<h6 class = 'text-warning fw-bold'>Cluster Yellow</h6>"
    }
    else if(i===2)
    {
      clust_name = "<h6 class = 'text-orange fw-bold'>Cluster Orange</h6>"
    }

    explanation = clust_name+ " characteristics: ";
    explanation += "This cluster represents "+only_clust+"" + parseInt(clusterHealthCases.length) + " health "+clusterHealthCases_case+add_health_cases_exp;
    explanation += "The health cases in this cluster account for approximately " + percent_label + "% of the total health cases in Oroquieta City. ";
    explanation += "The increase in health cases for this cluster "+ranges_from+" " + increase_label + "%. ";
    exp_v2[i] = explanation

    // Additional information based on cluster position
    if (i === 0) {
      explanation += "This indicates that this cluster represents the lowest cluster among the three clusters, reflecting relatively lower health case numbers.";
    } else if (i === 1) {
      explanation += "This indicates that this cluster represents a cluster that is neither the lowest nor the highest, indicating intermediate health case numbers.";
    } else if (i === 2) {
      explanation += "This indicates that this cluster represents the highest cluster among the three clusters, reflecting relatively higher health case numbers.";
    }
    exp[i] = explanation
  }

  var clust_1 = clusters[0].length
  var clust_2 = clusters[1].length
  var clust_3 = clusters[2].length

  if (clust_1 >= 1 && clust_2 >= 1 && clust_3 < 1) {
    exp[0] = exp_v2[0] + "Since Cluster Orange is empty this indicates that this cluster represents the lower cluster compared to Cluster Yellow, reflecting relatively lower health case numbers.";
    exp[1] = exp_v2[1]+ "Since Cluster Orange is empty this indicates that this cluster represents the higher cluster compared to Cluster Green, reflecting relatively higher health case numbers.";
    exp[2] = "The cluster Orange is empty, so its characteristics cannot be explained";
  } else if (clust_1 >= 1 && clust_2 < 1 && clust_3 < 1) {
    exp[0] = exp_v2[0]+ "Since Cluster Yellow and Cluster Orange are empty, this indicates that these clusters represent data with no significant differences to compare in terms of being greater or lower";
    exp[1] = "The cluster Yellow is empty, so its characteristics cannot be explained";
    exp[2] = "The cluster Orange is empty, so its characteristics cannot be explained";
  }else if (clust_1 >= 1 && clust_2 < 1 && clust_3 >= 1) {
    exp[0] =  exp_v2[0]+ "Since Cluster Yellow is empty this indicates that this cluster represents the lower cluster compared to Cluster Orange, reflecting relatively Lower health case numbers.";
    exp[1] = "The cluster Yellow is empty, so its characteristics cannot be explained";
    exp[2] =  exp_v2[2]+ "Since Cluster Yellow is empty, it suggests that there is no middle number available for comparison. Instead, it will be compared to the lowest cluster, which is Cluster Green. This comparison reveals a relatively higher number of health cases";
  } else if (clust_1 < 1 && clust_2 >= 1 && clust_3 < 1) {
    exp[0] = "The cluster Green is empty, so its characteristics cannot be explained";
    exp[1] = exp_v2[1]+ "Due to the absence of recorded cases in Cluster Green and Cluster Orange, it can be inferred that this particular cluster does not exhibit the lowest or highest numbers of reported cases.";
    exp[2] = "The cluster Orange is empty, so its characteristics cannot be explained";
  } else if (clust_1 < 1 && clust_2 >= 1 && clust_3 >= 1) {
    exp[0] = "The cluster Green is empty, so its characteristics cannot be explained";
    exp[1] = exp_v2[1] + "Since only Cluster Green is empty, it indicates that this cluster is not the lowest. However, when compared to Cluster Orange, it can be considered lower, implying that this cluster is positioned below Cluster Orange but may not be the lowest among all clusters.";
    exp[2] = exp_v2[2] + "Since Cluster Green is empty, it suggests that there is no lowest number available for comparison. As a result, the comparison is limited to the middle number, automatically indicating that this cluster represents the highest value. This observation also implies that this cluster has the highest number of cases";
  } else if (clust_1 < 1 && clust_2 < 1 && clust_3 >= 1) {
    exp[0] = "The cluster Green is empty, so its characteristics cannot be explained";
    exp[1] = "The cluster Yellow is empty, so its characteristics cannot be explained";
    exp[2] = exp_v2[2]+ "Due to the absence of data in Cluster Green and Cluster Yellow, there is no middle number available for comparison, and no lower cluster to compare against. This suggests that the current cluster may have a higher number of health cases. Moreover, the presence of high case numbers across all barangays in the dataset is indicated.";
  } else if (clust_1 < 1 && clust_2 < 1 && clust_3 < 1) {
    exp[0] = "The cluster Green is empty, so its characteristics cannot be explained";
    exp[1] = "The cluster Yellow is empty, so its characteristics cannot be explained";
    exp[2] = "The cluster Orange is empty, so its characteristics cannot be explained";
  }

  var c_1_data = exp[0]
  var c_2_data = exp[1]
  var c_3_data = exp[2]

  cluster_tooltips(c_1_data, c_2_data, c_3_data)

  return exp
  }

    // Set the number of clusters
    var k = centroids_num;

    // Perform clustering
    var result = performClustering(this_datapoints, k);
    var clusters = result.clusters;
    var centroids = result.centroids;
    var cluster_explain = generateClusterExplanations(clusters)

    return { clusters: clusters, centroids: centroids, explain:cluster_explain };
 }
 //kmeans_v2

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

    var current_year_tooltip = $("#current_cluster")
    current_year_tooltip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "bottom", target:current_year_tooltip, delay:0.50});
    current_year_tooltip.setContent("Refresh Clsuters"); // Updates Opentips content  

    $("body").click(function()
    {
        current_year_tooltip.hide()
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
             var dataPoints = [];
             var total_recorded_cases_in_range = 0;

            // console.log(long_lat)

            $.each(textArr, function(index, lat_long) {
              hpTotal =  removeLastWord(lat_long)
              hpTotal =  removeLastWord(hpTotal)
              hpTotal =  removeLastWord(hpTotal)
              hpTotal =  removeLastWord(hpTotal)
              total_recorded_cases_in_range += parseInt(hpTotal)
            });
            
         
             $.each(textArr,function(index,lat_long){
         
             hpTotal =  removeLastWord(lat_long)
             hpTotal =  removeLastWord(hpTotal)
             hpTotal =  removeLastWord(hpTotal)
             hpTotal =  removeLastWord(hpTotal)
             
             barangay = removeLastWord(lat_long)
             barangay = removeLastWord(barangay)
             barangay = removeLastWord(barangay)
             barangay = removeFirstWord(barangay)
             barangay = barangay.split('_').join(' ') 
         
             lat = removeLastWord(lat_long)
             lat = removeFirstWord(lat)
             lat = removeFirstWord(lat)
             lat = removeFirstWord(lat)
         
             long = removeLastWord(lat_long)
             long = removeLastWord(long)
             long = removeFirstWord(long)
             long = removeFirstWord(long)

             allTime_hpTotal = removeFirstWord(lat_long)
             allTime_hpTotal = removeFirstWord(allTime_hpTotal)
             allTime_hpTotal = removeFirstWord(allTime_hpTotal)
             allTime_hpTotal = removeFirstWord(allTime_hpTotal)

               
              var previous_val = parseInt(allTime_hpTotal) - parseInt(hpTotal)

              if(previous_val < 1)
              {
                var current_val = parseInt(previous_val) + parseInt(hpTotal)
                all_time_total_percentage = undefined
              }
              else
              {
                  var current_val = parseInt(previous_val) + parseInt(hpTotal)
                  var difference_val = parseInt(current_val) - parseInt(previous_val)

                  var all_time_total_percentage = (difference_val / previous_val) * 100;
                  all_time_total_percentage = Number(all_time_total_percentage.toFixed(1))
              }
              
              //console.log("current value: ",current_val," Previouse value: ", previous_val," difference value: ", difference_val, "Answer:", all_time_total_percentage)

              var percentage = (hpTotal / total_recorded_cases_in_range) * 100;
              percentage = parseFloat(percentage);
              percentage = Number(percentage.toFixed(1))

              if (isNaN(percentage)) {
                percentage = 0;
              }

              //console.log("total cases in that month: ",total_recorded_cases_in_range)

              var single = {
              'type': 'Feature',
              'geometry': [long, lat],
              'title': barangay,
              'description': hpTotal,
              'allTime_hpTotal':allTime_hpTotal,
              'prev_rec': previous_val,
              'current_val':current_val,
              'index': index
              }

              var datasets = { "barangay": barangay, "healthCases": parseInt(hpTotal), "percent": parseFloat(percentage), "increase": parseFloat(all_time_total_percentage) }

          
              dataPoints.push(datasets)
  
             newObjectArr.push(single);
             });
             const v2_clustering = clusteing_v2(dataPoints, 3)

            const locations = {
            'type': 'FeatureCollection',
            'features': newObjectArr
            };
            var total = 0
            // Append new data to the DataTable
            var newRow
             // initialization to display markers
             for (var i = 0; i < locations.features.length; i++ ) {

                 const feature = locations.features[i]
                 var clusterCategory = "";

                // create a HTML element for each feature
                const el = document.createElement('div');
                var progressColor 

                  v2_clustering.clusters.forEach((cluster, index) => {
                    cluster.forEach((dataPoint) => {
                      const clusterHealthCases = dataPoint.barangay;
                      var increase_label = dataPoint.increase.toLocaleString('en-US')+"%"
                      if (isNaN(dataPoint.increase)) {
                              increase_label = "Significant"
                            }

                    if (clusterHealthCases === feature.title) {

                    if(parseInt(feature.description) > 0)
                    {
                        if(index == 0)
                          {
                            el.className = 'green';
                            progressColor = 'bg-c-green'
                            clusterCategory = 'Cluster Green'
                            el.id = i


                            newRow = $("<tr></tr>").appendTo("#cluster_green_table tbody");
                            $("<td>" + feature.title + "</td>").appendTo(newRow);
                            $('<td style="min-width:100px;"  class="text-center shortCut_btn" id="cluster_perce'+i+'"><div  >'+dataPoint.percent.toLocaleString('en-US')+'%</div></td>').appendTo(newRow);
                            $('<td style="min-width:300px;"  class="text-center shortCut_btn" id="cluster_total'+i+'"><div class="'+progressColor+' rounded-3 text-light text-center" >'+feature.description.toLocaleString('en-US')+' Health Cases</div></td>').appendTo(newRow);
                            $('<td style="min-width:90px;"  class="text-end shortCut_btn pe-4" id="cluster_inc'+i+'">'+increase_label+' </td>').appendTo(newRow);                            

                          }
                          else if(index == 1)
                          {
                            el.className = 'yellow';
                            progressColor = 'bg-c-yellow'
                            clusterCategory = 'Cluster Yellow'
                            el.id = i
                            newRow = $("<tr></tr>").appendTo("#cluster_yellow_table tbody");
                            $("<td>" + feature.title + "</td>").appendTo(newRow);
                            $('<td style="min-width:100px;"  class="text-center shortCut_btn" id="cluster_perce'+i+'"><div  >'+dataPoint.percent.toLocaleString('en-US')+'%</div></td>').appendTo(newRow);
                            $('<td style="min-width:300px;"  class="text-center shortCut_btn" id="cluster_total'+i+'"><div class="'+progressColor+' rounded-3 text-light text-center" >'+feature.description.toLocaleString('en-US')+' Health Cases</div></td>').appendTo(newRow);
                            $('<td style="min-width:90px;"  class="text-end shortCut_btn pe-4" id="cluster_inc'+i+'">'+increase_label+' </td>').appendTo(newRow);   

                          }
                          else
                          {
                            el.className = 'orange';
                            progressColor = 'bg-c-orange'
                            clusterCategory = 'Cluster Orange'
                            el.id = i
                            newRow = $("<tr></tr>").appendTo("#cluster_orange_table tbody");
                            $("<td>" + feature.title + "</td>").appendTo(newRow);
                            $('<td style="min-width:100px;"  class="text-center shortCut_btn" id="cluster_perce'+i+'"><div>'+dataPoint.percent.toLocaleString('en-US')+'%</div></td>').appendTo(newRow);
                            $('<td style="min-width:300px;"  class="text-center shortCut_btn" id="cluster_total'+i+'"><div class="'+progressColor+' rounded-3 text-light text-center" >'+feature.description.toLocaleString('en-US')+' Health Cases</div></td>').appendTo(newRow);
                            $('<td style="min-width:90px;"  class="text-end shortCut_btn pe-4" id="cluster_inc'+i+'"><div>'+increase_label+'</div></td>').appendTo(newRow);   

                          }
                          
                          var  cluster_date_from = getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy
                          var cluster_date_to = getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy
                          var dat_indicator_big = "From"
                          var dat_indicator_small = "from"
                          var current_rec_case ='cases'
                          var prev_rec_case = "cases"
                          var added_rec_case = 'cases'
                          var cluster_disease_name = ''
                          var cluster_gender_type = ''
                          var age_case_for_percent = ''
                          var totals_of_the_city = total_recorded_cases_in_range
                          var were_of_totals = 'were' 
                          var who_have = 'who have a'  
                          var who_are = 'who are'                    


                          if(query_click == "clicked")
                          {
                             var new_date_range_form = date_range_from.replaceAll('-', ' ');
                             var array_date_range_form = new_date_range_form.split(" ")

                             var new_date_range_to = date_range_to.replaceAll('-', ' ');
                             var array_date_range_to = new_date_range_to.split(" ")

                             var  cluster_date_from = getMonthName(array_date_range_form[1]) + ' ' + array_date_range_form[2] + ", "+ array_date_range_form[0] 
                             var cluster_date_to = getMonthName(array_date_range_to[1]) + ' ' + array_date_range_to[2] + ", "+ array_date_range_to[0]
                          }

                          var cluser_from_to = cluster_date_from + " to " + cluster_date_to

                          if(cluster_date_from === cluster_date_to)
                          {
                              cluser_from_to = cluster_date_from;
                          }

                                                
                          if(disease_type === "default")
                          {
                              cluster_disease_name
                          }
                          else
                          {
                               cluster_disease_name = "caused by "+tittle_disease_type
                          }

                          if(gender === "default")
                          {
                            cluster_gender_type = ''
                            who_have = "pertaining to individuals who have a"
                            who_are = "pertaining to individuals who are"
                          }
                          else
                          {   
                              if(gender === "Female")
                              {
                                cluster_gender_type = "among females"
                              }
                              else if(gender === "Male")
                              {
                                cluster_gender_type = "among males"
                              }
                          }

                          if(min_age != "default")
                          {
                              

                              age_case_for_percent = ""+who_have+" minimum age of "+min_age+""
                          }
                          else
                          {
                              if(max_age != "default")
                              {
                                  
                          
                                  age_case_for_percent = ""+who_have+" maximum age of "+max_age+""
                              }
                              else
                              {
                                  age_case_for_percent = ''
                              }
                          }

                          if(max_age != "default")
                          {
                              

                              age_case_for_percent = ""+who_have+" maximum age of "+max_age+""
                          }
                          else
                          {
                              if(min_age != "default")
                              {
                              
                                 age_case_for_percent = ""+who_have+" minimum age of "+min_age+""
                              }
                              else
                              {
                                  age_case_for_percent = ''
                              }
                          }

                          if(min_age != "default" && max_age != "default") 
                          {
                            
                              if(min_age === max_age )
                              {
                                  age_case_for_percent = ""+who_are+" "+min_age+" years old"
                              }
                              else
                              {
                                   age_case_for_percent = ""+who_are+" between the ages of "+min_age+" and "+max_age+""
                                  
                              }
                          }

                          if(parseInt(feature.prev_rec) <= 1)
                          {
                             prev_rec_case = "case"
                          }
                          if(parseInt(feature.description) <= 1)
                          {
                             added_rec_case = "case"
                             were_of_totals = "was"
                          }
                          if(parseInt(total_recorded_cases_in_range) <= 1 )
                          {
                            totals_of_the_city = ''
                          }
                          if(parseInt(feature.current_val) <= 1)
                          {
                            current_rec_case = "case"
                          }

                          var increase_label_for_tooltip = "has increased by "+dataPoint.increase.toLocaleString('en-US')+"% compared to the previous record of "+feature.prev_rec.toLocaleString('en-US')+" total health "+prev_rec_case+"."
                          var difference_value_label_for_tooltip = ", with a difference value of "+feature.description.toLocaleString('en-US')+" health "+added_rec_case+""

                          if (isNaN(dataPoint.increase)) {
                              increase_label_for_tooltip = "has surged significantly compared to the previous record of "+feature.prev_rec.toLocaleString('en-US')+" health "+prev_rec_case+"."
                              difference_value_label_for_tooltip = " total health "+added_rec_case
                            }

                          //tooltip for table
                          var current_year_tooltip = $("#cluster_perce"+i+"")
                          var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
                          borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
                          myOpentip.setContent('<div class="ps-1 pe-2">'+dat_indicator_big+' '+cluser_from_to+', '+dataPoint.percent.toLocaleString('en-US')+'% of '+totals_of_the_city.toLocaleString('en-US')+' total  recorded health cases '+cluster_disease_name+' '+cluster_gender_type+' '+age_case_for_percent+' in Oroquieta City were reported in barangay '+feature.title+'</div>'); // Updates Opentips content

                          var current_year_tooltip = $("#cluster_total"+i+"")
                          var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
                          borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
                          myOpentip.setContent("<div class= 'ps-1 pe-2'>A total of "+feature.description.toLocaleString('en-US')+" health "+added_rec_case+" "+cluster_disease_name+" "+cluster_gender_type+" "+age_case_for_percent+" in Oroquieta City "+were_of_totals+" reported in barangay "+feature.title+" "+dat_indicator_small+" "+cluser_from_to+"</div>"); // Updates Opentips content

                          var current_year_tooltip = $("#cluster_inc"+i+"")
                          var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
                          borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
                          myOpentip.setContent("<div class= 'ps-1 pe-2'>"+dat_indicator_big+" "+cluser_from_to+", the number of  health cases "+cluster_disease_name+" "+cluster_gender_type+" "+age_case_for_percent+" in barangay "+feature.title+", Oroquieta City, "+increase_label_for_tooltip+" The current count stands at "+feature.current_val.toLocaleString('en-US')+difference_value_label_for_tooltip+".</div>");
                    }

                    }

                    });
                  });

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
             
             load_cluster_table_green()
             load_cluster_table_yellow()
             load_cluster_table_orange()
           

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

                v2_clustering.clusters.forEach((cluster, index) => {
                cluster.forEach((dataPoint) => {
                  const clusterHealthCases = dataPoint.barangay;

                  if (clusterHealthCases === cont.title) {

                    if(parseInt(cont.description) > 0)
                    {
                        if(index == 0)
                          {
                              mark= 'green';
                          }
                          else if(index == 1)
                          {
                            mark= 'yellow';
                          }
                          else
                          {
                            mark= 'orange';
                          }
                    }
                    
                  }

                });
                });

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

                v2_clustering.clusters.forEach((clust, index) => {
                clust.forEach((dataPoint) => {
                  const clusterHealthCases = dataPoint.barangay;

                  if (clusterHealthCases === cont.title) {

                    if(parseInt(cont.description) > 0)
                    {
                        if(index == 0)
                          {
                            mark= 'green';
                            cluster = 'Cluster Green'
                          }
                          else if(index == 1)
                          {
                            mark= 'yellow';
                            cluster = 'Cluster Yellow'

                          }
                          else
                          {
                            mark= 'orange';
                            cluster = 'Cluster Orange'

                          }
                    }
                    
                  }

                });
                });

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
                '<div style="width:20px; height:20px; margin-top:4px; margin-left:4px;" class="'+mark+'"></div></div><label style="margin-top: 3px;" class="form-label ms-2">'+cluster+'</label></div>');

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

            var urlParam = new URLSearchParams(window.location.search)
             var current_marker_position = urlParam.get('marker_id')

             if (current_marker_position) {
                
               var divId =  current_marker_position;
                divId = parseInt(divId)
                var cont = locations.features[divId]
                var mark;
                var details_title;
                var cluster;

               v2_clustering.clusters.forEach((clust, index) => {
                clust.forEach((dataPoint) => {
                  const clusterHealthCases = dataPoint.barangay;

                  if (clusterHealthCases === cont.title) {

                    if(parseInt(cont.description) > 0)
                    {
                        if(index == 0)
                          {
                            mark= 'green';
                            cluster = 'Cluster Green'
                          }
                          else if(index == 1)
                          {
                            mark= 'yellow';
                            cluster = 'Cluster Yellow'

                          }
                          else
                          {
                            mark= 'orange';
                            cluster = 'Cluster Orange'

                          }
                    }
                    
                  }

                });
                });

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
                '<div style="width:20px; height:20px; margin-top:4px; margin-left:4px;" class="'+mark+'"></div></div><label style="margin-top: 3px;" class="form-label ms-2">'+cluster+'</label></div>');

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
                     table1.destroy()
                     table2.destroy()
                     table3.destroy()
                    $('tbody tr').remove();
                    
                    $('#filter-map').modal('toggle');

                    current_status()
                    markers()
                   
                    load_cluster_table_green()
                    load_cluster_table_yellow()
                    load_cluster_table_orange()
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
                table1.destroy()
                table2.destroy()
                table3.destroy()
                $('tbody tr').remove();
                
                current_status()
                markers()
                load_cluster_table_green()
                load_cluster_table_yellow()
                load_cluster_table_orange()
    
           })
        
            //other controls
            map.scrollZoom.disable();
            map.addControl(new mapboxgl.NavigationControl());// Add zoom and rotation controls to the map. 

            $(".mapboxgl-ctrl-group").addClass("d-none d-lg-block d-sm-none")

        });
        
}
//initializing the map end

//load cluster tables
function load_cluster_table_green()
{ 
  if ( ! $.fn.DataTable.isDataTable( '#cluster_green_table' ) ) { // check if data table is already exist
    


  table1 = $('#cluster_green_table').DataTable({

    // "processing": true,
    "deferRender": true,
    "serverSide": false,

    order: [[1,'DESC']],

    "language": {
      "info": "Showing _START_ to _END_ of _TOTAL_ entries",
      "infoFiltered":""
    },
    
    "autoWidth": false,
      scrollCollapse: true,

    "dom": 'ltip',      
    "lengthMenu": [[5, 10, 20, 30, 50], [5, 10, 20, 30, 50]],


  
  });
  table1.buttons().container().appendTo('#cluster_green_table_wrapper .col-md-6:eq(0)');

    $('#cluster_green_table #th_1_green td').each(function () {
      var title = this.id;

      if(title == "Barangay Name")
      {
         $(this).html('<input type="text" class="form-control text-start table_search rounded-1 w-100 shadow-sm py-0"  placeholder="'+title+'" aria-controls="hp_table">');
      }
      else if(title == "Increase Percentage")
      {
         $(this).html('<input type="text" class="form-control text-end table_search rounded-1 w-100 shadow-sm py-0"  placeholder="'+title+'" aria-controls="hp_table">');
      }
      else{
        $(this).html('<input type="text" class="form-control text-center table_search rounded-1 w-100 shadow-sm py-0"  placeholder="'+title+'" aria-controls="hp_table">');
      }

    
    
  });

  table1.columns().every(function () {
      var table1 = this;
      $('input', this.footer()).on('keyup change', function () {
          if (table1.search() !== this.value) {
              table1.search(this.value).draw();
          }
      });
  });
  
  }

  //to align the data table buttons

  $(".dataTables_paginate ").addClass("d-flex")
}

function load_cluster_table_yellow()
{
  var ajax_url = "functions/display-functions/tabular-statistic.php";
  
  if ( ! $.fn.DataTable.isDataTable( '#cluster_yellow_table' ) ) { // check if data table is already exist

  table2 = $('#cluster_yellow_table').DataTable({

    // "processing": true,
    "deferRender": true,
    "serverSide": false,

    order: [[1,'DESC']],

    "language": {
      "info": "Showing _START_ to _END_ of _TOTAL_ entries",
      "infoFiltered":""
    },
    
    "autoWidth": false,
      scrollCollapse: true,

    "dom": 'ltip',      
    "lengthMenu": [[5, 10, 20, 30, 50], [5, 10, 20, 30, 50]],
  
  });
  table2.buttons().container().appendTo('#cluster_yellow_table_wrapper .col-md-6:eq(0)');

    $('#cluster_yellow_table #th_1_yellow td').each(function () {
      var title = this.id;

    if(title == "Barangay Name")
      {
         $(this).html('<input type="text" class="form-control text-start table_search rounded-1 w-100 shadow-sm py-0"  placeholder="'+title+'" aria-controls="hp_table">');
      }
      else if(title == "Increase Percentage")
      {
         $(this).html('<input type="text" class="form-control text-end table_search rounded-1 w-100 shadow-sm py-0"  placeholder="'+title+'" aria-controls="hp_table">');
      }
      else{
        $(this).html('<input type="text" class="form-control text-center table_search rounded-1 w-100 shadow-sm py-0"  placeholder="'+title+'" aria-controls="hp_table">');
      }
    
  });

  table2.columns().every(function () {
      var table2 = this;
      $('input', this.footer()).on('keyup change', function () {
          if (table2.search() !== this.value) {
              table2.search(this.value).draw();
          }
      });
  });
  
  }
    $(".dataTables_paginate ").addClass("d-flex")
}

function load_cluster_table_orange()
{
  var ajax_url = "functions/display-functions/tabular-statistic.php";
  
  if ( ! $.fn.DataTable.isDataTable( '#cluster_orange_table' ) ) { // check if data table is already exist

  table3 = $('#cluster_orange_table').DataTable({

    // "processing": true,
    "deferRender": true,
    "serverSide": false,

    order: [[1,'DESC']],

    "language": {
      "info": "Showing _START_ to _END_ of _TOTAL_ entries",
      "infoFiltered":""
    },
    
    "autoWidth": false,
      scrollCollapse: true,

    "dom": 'ltip',      
    "lengthMenu": [[5, 10, 20, 30, 50], [5, 10, 20, 30, 50]],
  
  });
  table3.buttons().container().appendTo('#cluster_orange_table_wrapper .col-md-6:eq(0)');

    $('#cluster_orange_table #th_1_orange td').each(function () {
      var title = this.id;

    if(title == "Barangay Name")
      {
         $(this).html('<input type="text" class="form-control text-start table_search rounded-1 w-100 shadow-sm py-0"  placeholder="'+title+'" aria-controls="hp_table">');
      }
      else if(title == "Increase Percentage")
      {
         $(this).html('<input type="text" class="form-control text-end table_search rounded-1 w-100 shadow-sm py-0"  placeholder="'+title+'" aria-controls="hp_table">');
      }
      else{
        $(this).html('<input type="text" class="form-control text-center table_search rounded-1 w-100 shadow-sm py-0"  placeholder="'+title+'" aria-controls="hp_table">');
      }
    
  });

  table3.columns().every(function () {
      var table3 = this;
      $('input', this.footer()).on('keyup change', function () {
          if (table3.search() !== this.value) {
              table3.search(this.value).draw();
          }
      });
  });
  
  }
    $(".dataTables_paginate ").addClass("d-flex")
}
//load cluster tables end

// Function to get the current date in the desired format (e.g., "June 12, 2023")
function getCurrentDate() {
  var currentDate = new Date();
  var options = { month: 'long', day: 'numeric', year: 'numeric' };
  return currentDate.toLocaleDateString('en-US', options);
}

//load tooltips for cluster
function cluster_tooltips(c_1, c_2, c_3) {
    var green_tooltip = $("#c_green_meaning");
    var yellow_tooltip = $("#c_yellow_meaning");
    var red_tooltip = $("#c_orange_meaning");

    c_1 = "<div class = 'px-2'>"+c_1+"</div>"
    c_2 = "<div class = 'px-2'>"+c_2+"</div>"
    c_3 = "<div class = 'px-2'>"+c_3+"</div>"

    var green_tip = green_tooltip.data('opentips');
    if (green_tip) {
        green_tip.setContent(c_1);
    } else {
        green_tip = new Opentip(green_tooltip, {
            showOn: "mouseover",
            hideOn: null,
            tipJoint: "top-left",
            target: green_tooltip,
            delay: 0.01,
            borderRadius: 20,
            borderColor: '#fff',
            stemLength: 10,
            stemBase: 20,
            extends: "infor_details",
            hideDelay: 0.01
        });
        green_tooltip.data('opentips', green_tip);
        green_tip.setContent(c_1);
    }

    var yellow_tip = yellow_tooltip.data('opentips');
    if (yellow_tip) {
        yellow_tip.setContent(c_2);
    } else {
        yellow_tip = new Opentip(yellow_tooltip, {
            showOn: "mouseover",
            hideOn: null,
            tipJoint: "top-left",
            target: yellow_tooltip,
            delay: 0.01,
            borderRadius: 20,
            borderColor: '#fff',
            stemLength: 10,
            stemBase: 20,
            extends: "infor_details",
            hideDelay: 0.01
        });
        yellow_tooltip.data('opentips', yellow_tip);
        yellow_tip.setContent(c_2);
    }

    var red_tip = red_tooltip.data('opentips');
    if (red_tip) {
        red_tip.setContent(c_3);
    } else {
        red_tip = new Opentip(red_tooltip, {
            showOn: "mouseover",
            hideOn: null,
            tipJoint: "top-left",
            target: red_tooltip,
            delay: 0.01,
            borderRadius: 20,
            borderColor: '#fff',
            stemLength: 10,
            stemBase: 20,
            extends: "infor_details",
            hideDelay: 0.01
        });
        red_tooltip.data('opentips', red_tip);
        red_tip.setContent(c_3);
    }
}
//load tooltips for cluster end

$("#current_cluster").click(function(){
  $('#current_year').trigger('click');
})

// Print Tables button click event
$('#printButton').on('click', function() {

    var table_data_meaning = $("#map_disease").text()+$("#map_cases").text()+$("#map_from").text()+$("#map_to").text()+$("#map_gender").text()+$("#map_min_age").text()+$("#map_max_age").text()+$("#map_record_info").text()

  // Create a new tbody element to hold the merged table rows
  var mergedTbody = $('<tbody>');

  // Loop through each table and append its rows to the merged tbody
  $('#cluster_table_container').find('table').each(function() {
    var tableName = $(this).attr('id');
    var tableRows = $(this).find('tbody tr');

    // Create a new row for the table name
    if (tableName === "cluster_green_table") {
      cluster_table_printed_head = "Cluster Green";
    } else if (tableName === "cluster_yellow_table") {
      cluster_table_printed_head = "Cluster Yellow";
    } else if (tableName === "cluster_orange_table") {
      cluster_table_printed_head = "Cluster Orange";
    }

    // Create a new table header with two rows
    var tableHeader = $('<thead>').addClass('bg-c-dark_green text-white');
    var headerRow1 = $('<tr>');
    var headerRow2 = $('<tr>');
    var headerCell1 = $('<th>').attr('colspan', '4').text('Table ' + cluster_table_printed_head);
    var headerCell2_1 = $('<th>').text('Barangay Name');
    var headerCell2_2 = $('<th>').text('Cases Percentage');
    var headerCell2_3 = $('<th>').text('Total Recorded Cases');
    var headerCell2_4 = $('<th>').text('Increase Percentage');

    headerRow1.append(headerCell1);
    headerRow2.append(headerCell2_1);
    headerRow2.append(headerCell2_2);
    headerRow2.append(headerCell2_3);
    headerRow2.append(headerCell2_4);
    tableHeader.append(headerRow1);
    tableHeader.append(headerRow2);

    // Append the table header and rows to the merged tbody
    mergedTbody.append(tableHeader);
    mergedTbody.append(tableRows.clone());
  });

  // Create a new table with the merged tbody
  var mergedTable = $('<table>').addClass('printed-table').append(mergedTbody);

  // Generate the HTML content for printing
  var htmlContent = '<html><head><title>Print Tables</title>';
  htmlContent += '<style>';
  htmlContent += 'body { font-family: Arial, sans-serif; text-align: center; }';
  htmlContent += '.printed-table { width: 100%; border-collapse: collapse; }';
  htmlContent += '.printed-table th, .printed-table td { padding: 8px; border: 1px solid #ddd; }';
  htmlContent += '.printed-table th { background-color: #f5f5f5; font-weight: bold; }';
  htmlContent += '</style>';
  htmlContent += '</head><body>';
  htmlContent += '<h3>Health Profile Clustering System</h3>';
  htmlContent += '<p>Clustering Results ('+table_data_meaning+')</p>';
  htmlContent += '<p>Accessed: ' + getCurrentDate() + '</p>';
  htmlContent += '<div class="col-lg-4 card-group mb-4 col-md-12">';
  htmlContent += '<div class="card bg-c-dark_green border-0 rounded-4 shadow-sm order-card">';
  htmlContent += '<div class="card-body adjust_font_size row">';
  htmlContent += '<div class="col-12" id="hp_chart_row_brgy">';
  htmlContent += '<div class="bg-white rounded-4 p-3 h-100" id="cluster_green">';
  htmlContent += '<div class="row">';
  htmlContent += '<div class="table-responsive text-black">';
  htmlContent += mergedTable.prop('outerHTML');
  htmlContent += '</div>';
  htmlContent += '<div class="table-responsive">';
  htmlContent += '<div class="dataTables_wrapper dt-bootstrap5 row" id="table_page_green">';
  htmlContent += '</div>';
  htmlContent += '</div>';
  htmlContent += '</div>';
  htmlContent += '</div>';
  htmlContent += '</div>';
  htmlContent += '</div>';
  htmlContent += '</div>';
  htmlContent += '</div>';
  htmlContent += '</div>';
  htmlContent += '</body></html>';

  // Open a new window for printing
  var printWindow = window.open('', 'width=800,height=600');

  // Write the HTML content to the new window
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Delay the print command to ensure the window has loaded the content
  setTimeout(function() {
    printWindow.print();
  }, 1000);
});

$('#excelButton').click(function()
{
    var workbook = XLSX.utils.book_new();

    var cluster_date_exported = $("#map_disease").text()+$("#map_cases").text()+$("#map_from").text()+$("#map_to").text();

    var var_other_labels = $("#map_gender").text() + $("#map_min_age").text() + $("#map_max_age").text() + $("#map_record_info").text();

    var modifiedWord = var_other_labels.replace(/^,\s/, '');//remove unecesary in first char
    var modifiedSentence = modifiedWord.charAt(0).toUpperCase() + modifiedWord.slice(1);//make  first letter capital

// Create a sheet for Cluster Green
var clusterGreenSheet = XLSX.utils.aoa_to_sheet([
  [{v: 'Health Profile', s: {font: {bold: true}, alignment: {horizontal: 'center'}}}],
  [{v: 'Clustering System', s: {font: {bold: true}, alignment: {horizontal: 'center'}}}],
  [],
  [{v: 'Clustering Results', s: {alignment: {horizontal: 'center'}}}],
  [{v: '('+cluster_date_exported+')', s: {alignment: {horizontal: 'center'}}}],
  [{v: '('+modifiedSentence+')', s: {alignment: {horizontal: 'center'}}}],
  [{v: 'Accessed: '+getCurrentDate(), s: {alignment: {horizontal: 'center'}}}],
  [],
  [{v: 'Table Cluster Green', s: {font: {bold: true}, alignment: {horizontal: 'center'}}}],
  [],
  [{v: 'Barangay Name', s: {font: {bold: true}}}, {v: 'Cases Percentage', s: {font: {bold: true}}}, {v: 'Total Recorded Cases', s: {font: {bold: true}}}, {v: 'Increase Percentage', s: {font: {bold: true}}}]
]);

// Merge and center the headers in Cluster Green sheet
clusterGreenSheet['!merges'] = [
  { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }, // Merge A1 to D1
  { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } },
  { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } },
  { s: { r: 4, c: 0 }, e: { r: 4, c: 3 } },
  { s: { r: 5, c: 0 }, e: { r: 5, c: 3 } },
  { s: { r: 6, c: 0 }, e: { r: 6, c: 3 } },
  { s: { r: 8, c: 0 }, e: { r: 8, c: 3 } },
];


// Get the data from the Cluster Green table
var clusterGreenTable = document.getElementById('cluster_green_table');
var clusterGreenRows = clusterGreenTable.getElementsByTagName('tr');
for (var i = 1; i < clusterGreenRows.length; i++) {
  var row = [];
  var cells = clusterGreenRows[i].getElementsByTagName('td');
  for (var j = 0; j < cells.length; j++) {
    row.push(cells[j].innerText.trim());
  }
  XLSX.utils.sheet_add_aoa(clusterGreenSheet, [row], { origin: -1 });
}

// Set the column widths
var columnWidths = [
  { wpx: 150 },
  { wpx: 150 },
  { wpx: 150 },
  { wpx: 150 } 
];
clusterGreenSheet['!cols'] = columnWidths;

// Add the Cluster Green sheet to the workbook
XLSX.utils.book_append_sheet(workbook, clusterGreenSheet, 'Cluster Green');

// Create a sheet for Cluster Green
var clusterYellowSheet = XLSX.utils.aoa_to_sheet([
  [{v: 'Oroquieta City Community', s: {font: {bold: true}, alignment: {horizontal: 'center'}}}],
  [{v: 'Health Profile Clustering System', s: {font: {bold: true}, alignment: {horizontal: 'center'}}}],
  [],
  [{v: 'Clustering Results', s: {alignment: {horizontal: 'center'}}}],
  [{v: '('+cluster_date_exported+')', s: {alignment: {horizontal: 'center'}}}],
  [{v: '('+modifiedSentence+')', s: {alignment: {horizontal: 'center'}}}],
  [{v: 'Accessed: '+getCurrentDate(), s: {alignment: {horizontal: 'center'}}}],
  [],
  [{v: 'Table Cluster Yellow', s: {font: {bold: true}, alignment: {horizontal: 'center'}}}],
  [],
  [{v: 'Barangay Name', s: {font: {bold: true}}}, {v: 'Cases Percentage', s: {font: {bold: true}}}, {v: 'Total Recorded Cases', s: {font: {bold: true}}}, {v: 'Increase Percentage', s: {font: {bold: true}}}]
]);

// Merge and center the headers in Cluster Green sheet
clusterYellowSheet['!merges'] = [
  { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }, // Merge A1 to D1
  { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } },
  { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } },
  { s: { r: 4, c: 0 }, e: { r: 4, c: 3 } },
  { s: { r: 5, c: 0 }, e: { r: 5, c: 3 } },
  { s: { r: 6, c: 0 }, e: { r: 6, c: 3 } },
  { s: { r: 8, c: 0 }, e: { r: 8, c: 3 } },
];


// Get the data from the Cluster Yellow table
var clusterYellowTable = document.getElementById('cluster_yellow_table');
var clusterYellowRows = clusterYellowTable.getElementsByTagName('tr');
for (var k = 1; k < clusterYellowRows.length; k++) {
  var row = [];
  var cells = clusterYellowRows[k].getElementsByTagName('td');
  for (var l = 0; l < cells.length; l++) {
    row.push(cells[l].innerText.trim());
  }
  XLSX.utils.sheet_add_aoa(clusterYellowSheet, [row], { origin: -1 });
}

// Set the column widths
clusterYellowSheet['!cols'] = columnWidths;

// Add the Cluster Yellow sheet to the workbook
XLSX.utils.book_append_sheet(workbook, clusterYellowSheet, 'Cluster Yellow');

// Create a sheet for Cluster Orange
var clusterOrangeSheet = XLSX.utils.aoa_to_sheet([
  [{v: 'Oroquieta City Community', s: {font: {bold: true}, alignment: {horizontal: 'center'}}}],
  [{v: 'Health Profile Clustering System', s: {font: {bold: true}, alignment: {horizontal: 'center'}}}],
  [],
  [{v: 'Clustering Results', s: {alignment: {horizontal: 'center'}}}],
  [{v: '('+cluster_date_exported+')', s: {alignment: {horizontal: 'center'}}}],
  [{v: '('+modifiedSentence+')', s: {alignment: {horizontal: 'center'}}}],
  [{v: 'Accessed: '+getCurrentDate(), s: {alignment: {horizontal: 'center'}}}],
  [],
  [{v: 'Table Cluster Orange', s: {font: {bold: true}, alignment: {horizontal: 'center'}}}],
  [],
  [{v: 'Barangay Name', s: {font: {bold: true}}}, {v: 'Cases Percentage', s: {font: {bold: true}}}, {v: 'Total Recorded Cases', s: {font: {bold: true}}}, {v: 'Increase Percentage', s: {font: {bold: true}}}]
]);

// Merge and center the headers in Cluster Green sheet
clusterOrangeSheet['!merges'] = [
  { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }, // Merge A1 to D1
  { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } },
  { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } },
  { s: { r: 4, c: 0 }, e: { r: 4, c: 3 } },
  { s: { r: 5, c: 0 }, e: { r: 5, c: 3 } },
  { s: { r: 6, c: 0 }, e: { r: 6, c: 3 } },
  { s: { r: 8, c: 0 }, e: { r: 8, c: 3 } },
];

// Get the data from the Cluster Orange table
var clusterOrangeTable = document.getElementById('cluster_orange_table');
var clusterOrangeRows = clusterOrangeTable.getElementsByTagName('tr');
for (var m = 1; m < clusterOrangeRows.length; m++) {
  var row = [];
  var cells = clusterOrangeRows[m].getElementsByTagName('td');
  for (var n = 0; n < cells.length; n++) {
    row.push(cells[n].innerText.trim());
  }
  XLSX.utils.sheet_add_aoa(clusterOrangeSheet, [row], { origin: -1 });
}

// Set the column widths
clusterOrangeSheet['!cols'] = columnWidths;

// Add the Cluster Orange sheet to the workbook
XLSX.utils.book_append_sheet(workbook, clusterOrangeSheet, 'Cluster Orange');

// Generate the Excel file
var excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
var fileBuffer = new ArrayBuffer(excelFile.length);
var fileArray = new Uint8Array(fileBuffer);
for (var o = 0; o < excelFile.length; o++) {
  fileArray[o] = excelFile.charCodeAt(o) & 0xff;
}

// Save the Excel file
var currentDate = getCurrentDate();
var fileName = 'Clustering_Results_' + currentDate + '.xlsx';
saveAs(new Blob([fileBuffer], { type: 'application/octet-stream' }), fileName);

})

$('#copytButton').click(function()
{
 // Create a new container element to hold the merged table data
  var mergedData = '';

   var cluster_date_exported = $("#map_disease").text()+$("#map_cases").text()+$("#map_from").text()+$("#map_to").text()+$("#map_gender").text()+$("#map_min_age").text()+$("#map_max_age").text()+$("#map_record_info").text()
   
   mergedData += 'Health Profile Clustering System\n';
  mergedData += 'Clustering Results (' + cluster_date_exported + ')\n';
  mergedData += 'Copied: ' + getCurrentDate() + '\n\n';

  // Loop through each table and append its data to the merged data
  $('#cluster_table_container').find('table').each(function() {
    var tableName = $(this).attr('id');
    var tableRows = $(this).find('tbody tr');
    
    // Create a new row for the table name
    if (tableName === "cluster_green_table") {
      cluster_table_printed_head = "Cluster Green";
    } else if (tableName === "cluster_yellow_table") {
      cluster_table_printed_head = "Cluster Yellow";
    } else if (tableName === "cluster_orange_table") {
      cluster_table_printed_head = "Cluster Orange";
    }


    // Append table title to the merged data
    mergedData += 'Table: ' + cluster_table_printed_head + '\n';

    // Loop through each row and append its data to the merged data
    tableRows.each(function() {
      var rowData = '';

      // Loop through each cell and append its data to the row data
      $(this).find('td').each(function() {
        rowData += $(this).text() + '\t'; // Separate cell data with a tab character
      });

      // Trim any trailing tab characters and append the row data to the merged data
      rowData = rowData.trim();
      mergedData += rowData + '\n'; // Separate rows with a new line character
    });

    // Separate the data of different tables with an empty line
    mergedData += '\n';
  });
  // Add the additional information before the tables


  // Create a temporary textarea element to hold the merged table data
  var tempTextarea = $('<textarea>').val(mergedData).css('position', 'absolute').css('left', '-9999px');

  // Append the temporary textarea to the body
  $('body').append(tempTextarea);

  // Select and copy the contents of the temporary textarea
  tempTextarea.select();
  document.execCommand('copy');

  // Remove the temporary textarea
  tempTextarea.remove();

  // Provide some feedback to the user
Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Content copied!',
  showConfirmButton: false,
  timer: 1500
})
 
})

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





