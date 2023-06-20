var disease_type = "default";
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
var sort = "names";
var x_value = "";
var y_value = "";
var xValues = "";
var yValues = "";
var x_value_disease = "";
var y_value_disease = "";
var xValues_disease = "";
var yValues_disease = "";
var x_value_residents = "";
var y_value_residents = "";
var xValues_residents = "";
var yValues_residents = "";
var myColors = [];
var disease_chart_color=[];
var disease_chart_points=[]
var myColors_residents=[];
var myColors_time;
var myChart ="";
var res_id_value ="";
var currentDate = new Date(current_year);
var past7Days = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
var past7Days_dd = String(past7Days.getDate()).padStart(2, '0');
var past7Days_mm = String(past7Days.getMonth() + 1).padStart(2, '0');
var past7Days_yyy = past7Days.getFullYear();
var past7Days_from = past7Days_yyy + '-' + past7Days_mm + '-' + past7Days_dd;
var past7Days_to = current_year_yyyy + '-' + current_year_mm + '-' + current_year_dd;
var map_center
var diseases_clustered;
var total_hp_count = total_hp_count_function()

$(document).ready(function()
{
    $(document).attr("title", "HPCS | Dashboard");

    var width = $(window).width();
    if (width < 1900) {
      map_center = [123.8006, 8.4595];
    } else {
      map_center = [123.725389, 8.455992];
    }
    display_map()
    disease_cluster()
    get_cases_for_past_months_days()
    shurctuMenu()
    brgy_chart()
    disease_chart()
    timespan_chart()
    
})

 //kmeans
 function clustering_v1(this_datapoints, centroids_num)
 {

  function getManualCentroids(data) {
    const sortedData = data.sort((a, b) => a - b);
    const lowest = sortedData[0];
    const highest = sortedData[sortedData.length - 1];

    var numbers = sortedData

    var sum = numbers.reduce(function(a, b) {
      return a + b;
    }, 0);

    const mean = sum / numbers.length;
    
    return [lowest, mean, highest];
  }


  function assignClusters(data, centroids) {
    const clusters = new Array(centroids.length).fill().map(() => []);
    
    for (let i = 0; i < data.length; i++) {
      let minDistance = Infinity;
      let closestCentroidIndex = 0;
      
      for (let j = 0; j < centroids.length; j++) {
        const distance = Math.abs(data[i] - centroids[j]);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestCentroidIndex = j;
        }
      }
      
      clusters[closestCentroidIndex].push(data[i]);
    }
    
    return clusters;
  }

  function calculateNewCentroids(clusters) {
    const centroids = [];
    
    for (let i = 0; i < clusters.length; i++) {
      const cluster = clusters[i];
      
      if (cluster.length === 0) {
        continue; // Skip empty clusters
      }
      
      const sum = cluster.reduce((accumulator, currentValue) => accumulator + currentValue);
      const mean = sum / cluster.length;
      
      centroids.push(mean);
    }
    
    return centroids;
  }

  function kMeansClustering(data, k) {
    let centroids = getManualCentroids(data);
    var maxIterations = 100
    
    for (let i = 0; i < maxIterations; i++) {
      const clusters = assignClusters(data, centroids);
      const newCentroids = calculateNewCentroids(clusters);
      
      if (centroids.toString() === newCentroids.toString()) {
        break; // Stop iteration if centroids do not change
      }
      
      centroids = newCentroids;
    }
    
    return {
      centroids,
      clusters: assignClusters(data, centroids)
    };
  }
  const data_points = this_datapoints
  const k = centroids_num
  const v1_clsutering = kMeansClustering(data_points, k)

  var clusters = v1_clsutering.clusters;
  var centroids = v1_clsutering.centroids;
  return { clusters: clusters, centroids: centroids};
 }

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
    for (var i = 0; i < clusters.length; i++) {
      var cluster = clusters[i];
      var clusterHealthCases = [];

      // Extract the healthCases values from the cluster
      for (var j = 0; j < cluster.length; j++) {
        clusterHealthCases.push(cluster[j].healthCases);
      }

      // Calculate statistics for the cluster
      var minHealthCases = Math.min(...clusterHealthCases);
      var maxHealthCases = Math.max(...clusterHealthCases);
      var minPercent = Math.min(...cluster.map((dataPoint) => dataPoint.percent));
      var maxPercent = Math.max(...cluster.map((dataPoint) => dataPoint.percent));
      var minIncrease = Math.min(...cluster.map((dataPoint) => dataPoint.increase));
      var maxIncrease = Math.max(...cluster.map((dataPoint) => dataPoint.increase));
      
      var percent_label = minPercent.toFixed(1) + "% to " + maxPercent.toFixed(1)
      var increase_label = minIncrease.toFixed(1) + "% to " + maxIncrease.toFixed(1)
      var cases_label = minHealthCases + " to " + maxHealthCases

      var ranging_from = "ranging from"
      var ranges_from = "ranges from"

      if(minHealthCases === maxHealthCases)
      {
        cases_label = minHealthCases+" "
        ranging_from = "with"
      }

      if(minPercent === maxPercent)
      {
        percent_label = minPercent
      }

      if(minIncrease === maxIncrease)
      {
        increase_label = minIncrease
        ranges_from = "is"
      }

      var clust_name

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

      var only_clust = ''
      var clusterHealthCases_case = 'cases'
      var add_health_cases_exp = ", "+ranging_from+" " + cases_label + " newly added health cases. ";

      if(clusterHealthCases.length < 2)
      {
        clusterHealthCases_case = "case. "
        only_clust = "only "
        add_health_cases_exp=''
      }

      // Generate explanation for the cluster
      var explanation = clust_name+ " characteristics: ";
      explanation += "This cluster represents "+only_clust+"" + clusterHealthCases.length + " health "+clusterHealthCases_case+add_health_cases_exp;
      explanation += "The health cases in this cluster account for approximately " + percent_label + "% of the total health cases in Oroquieta City. ";
      explanation += "The increase in health cases for this cluster "+ranges_from+" " + increase_label + "%. ";

      var exp_v2 = explanation

      // Additional information based on cluster position
      if (i === 0) {
        explanation += "This indicates that this cluster represents the lowest cluster among the three clusters, reflecting relatively lower health case numbers.";
      } else if (i === 1) {
        explanation += "This indicates that this cluster represents a cluster that is neither the lowest nor the highest, indicating intermediate health case numbers.";
      } else if (i === 2) {
        explanation += "This indicates that this cluster represents the highest cluster among the three clusters, reflecting relatively higher health case numbers.";
      }
      exp [i] = explanation

      var clust_1 = clusters[0].length
      var clust_2 = clusters[1].length
      var clust_3 = clusters[2].length

      if (clust_1 >= 1 && clust_2 >= 1 && clust_3 < 1) {
          exp[0] = exp_v2 + "Since Cluster Orange is empty this indicates that this cluster represents the lower cluster compared to Cluster Yellow, reflecting relatively lower health case numbers.";
          exp[1] = exp_v2+ "Since Cluster Orange is empty this indicates that this cluster represents the higher cluster compared to Cluster Green, reflecting relatively higher health case numbers.";
          exp[2] = "The cluster Orange is empty, so its characteristics cannot be explained";
        } else if (clust_1 >= 1 && clust_2 < 1 && clust_3 < 1) {
          exp[0] = exp_v2+ "Since Cluster Yellow and Cluster Orange are empty, this indicates that these clusters represent data with no significant differences to compare in terms of being greater or lower";
          exp[1] = "The cluster Yellow is empty, so its characteristics cannot be explained";
          exp[2] = "The cluster Orange is empty, so its characteristics cannot be explained";
        }else if (clust_1 >= 1 && clust_2 < 1 && clust_3 >= 1) {
          exp[0] =  exp_v2+ "Since Cluster Yellow is empty this indicates that this cluster represents the lower cluster compared to Cluster Orange, reflecting relatively Lower health case numbers.";
          exp[1] = "The cluster Yellow is empty, so its characteristics cannot be explained";
          exp[2] =  exp_v2+ "Since Cluster Yellow is empty, it suggests that there is no middle number available for comparison. Instead, it will be compared to the lowest cluster, which is Cluster Green. This comparison reveals a relatively higher number of health cases";
        } else if (clust_1 < 1 && clust_2 >= 1 && clust_3 < 1) {
          exp[0] = "The cluster Green is empty, so its characteristics cannot be explained";
          exp[1] = exp_v2+ "Due to the absence of recorded cases in Cluster Green and Cluster Orange, it can be inferred that this particular cluster does not exhibit the lowest or highest numbers of reported cases.";
          exp[2] = "The cluster Orange is empty, so its characteristics cannot be explained";
        } else if (clust_1 < 1 && clust_2 >= 1 && clust_3 >= 1) {
          exp[0] = "The cluster Green is empty, so its characteristics cannot be explained";
          exp[1] = exp_v2 + "Since only Cluster Green is empty, it indicates that this cluster is not the lowest. However, when compared to Cluster Orange, it can be considered lower, implying that this cluster is positioned below Cluster Orange but may not be the lowest among all clusters.";
          exp[2] = exp_v2 + "Since Cluster Green is empty, it suggests that there is no lowest number available for comparison. As a result, the comparison is limited to the middle number, automatically indicating that this cluster represents the highest value. This observation also implies that this cluster has the highest number of cases";
        } else if (clust_1 < 1 && clust_2 < 1 && clust_3 >= 1) {
          exp[0] = "The cluster Green is empty, so its characteristics cannot be explained";
          exp[1] = "The cluster Yellow is empty, so its characteristics cannot be explained";
          exp[2] = exp_v2+ "Due to the absence of data in Cluster Green and Cluster Yellow, there is no middle number available for comparison, and no lower cluster to compare against. This suggests that the current cluster may have a higher number of health cases. Moreover, the presence of high case numbers across all barangays in the dataset is indicated.";
        } else if (clust_1 < 1 && clust_2 < 1 && clust_3 < 1) {
          exp[0] = "The cluster Green is empty, so its characteristics cannot be explained";
          exp[1] = "The cluster Yellow is empty, so its characteristics cannot be explained";
          exp[2] = "The cluster Orange is empty, so its characteristics cannot be explained";
        }


    }

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
    center: map_center, // starting position [lng, lat]
    zoom: 11.8,  // starting zoom
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

          })
     
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

          top_3_barangays_functions(v2_clustering, newObjectArr)
     
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
             var progressColor 
             const el = document.createElement('div');


            v2_clustering.clusters.forEach((cluster, index) => {
                    cluster.forEach((dataPoint) => {
                      const clusterHealthCases = dataPoint.barangay;
                    if (clusterHealthCases === feature.title) {

                    if(parseInt(feature.description) > 0)
                    {
                        if(index == 0)
                          {
                            el.className = 'green';
                            progressColor = 'bg-c-green'
                            clusterCategory = 'Cluster Green'
                            el.id = i                         

                          }
                          else if(index == 1)
                          {
                            el.className = 'yellow';
                            progressColor = 'bg-c-yellow'
                            clusterCategory = 'Cluster Yellow'
                            el.id = i 

                          }
                          else
                          {
                            el.className = 'orange';
                            progressColor = 'bg-c-orange'
                            clusterCategory = 'Cluster Orange'
                            el.id = i  

                          }
                    }

                    }

                    });
                  });

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

            v2_clustering.clusters.forEach((cluster, index) => {
            cluster.forEach((dataPoint) => {
              const clusterHealthCases = dataPoint.barangay;

            if (clusterHealthCases === cont.title) {

            if(parseInt(cont.description) > 0)
            {
                if(index == 0)
                  {
                    mark = 'green';
                  }
                  else if(index == 1)
                  {
                    mark = 'yellow';
                  }
                  else
                  {
                    mark = 'orange';
                  }
            }

            }

            });
          });

            var modified_label = parseInt(cont.description).toLocaleString('en-US')+" health cases in total."
            if(cont.description == 1)
            {
              var modified_label = parseInt(cont.description).toLocaleString('en-US')+" health case in total."
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
          location.href = 'map-statistic.php?marker_id=' + encodeURIComponent(divId);
        });
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

        //other controls
        map.scrollZoom.disable();
        map.addControl(new mapboxgl.NavigationControl());// Add zoom and rotation controls to the map. 

        $(".mapboxgl-ctrl-group").addClass("d-none d-lg-block d-sm-none")

    });
}
//map

//get cases of past months and days
function get_cases_for_past_months_days()
{
  var pass_30_days_cases
  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    get_cases_for_past_months:'set',
    top_from:current_year_from,
    top_to:current_year_to
  },     
  function (data, textStatus, jqXHR) 
  {
    pass_30_days_cases = data;
  });
  var newObjectArr = []
  $.each(pass_30_days_cases,function(index, elements){
   newObjectArr.push(parseInt(elements));
  });
  var casese_for_past_months = clustering_v1(newObjectArr, 3)
  totalCases(casese_for_past_months)
  console.log(casese_for_past_months.centroids)
  console.log(casese_for_past_months.clusters)
  

  var pass_days_cases
  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    get_cases_for_past_days:'set',
    top_from:past7Days_from,
    top_to:past7Days_to
  },     
  function (data, textStatus, jqXHR) 
  {
    pass_days_cases = data;
    
  });
  var newObjectArr1 = []
  $.each(pass_days_cases,function(index, elements){
   newObjectArr1.push(parseInt(elements));
  });
  var casese_for_past_days = clustering_v1(newObjectArr1, 3)
  newCases(casese_for_past_days)
   console.log(casese_for_past_days.centroids)
  console.log(casese_for_past_days.clusters)
}
//get cases of past months and days

//disease_cluster
function disease_cluster()
{
  
  var top_3_diseases;
  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    total_diseases:'set',
    top_from:current_year_from,
    top_to:current_year_to
  },     
  function (data, textStatus, jqXHR) 
  {
    top_3_diseases = data;
    
  });

  var textArr = top_3_diseases;
  var newObjectArr = [];
  var dataPoints = []

  $.each(textArr,function(index,top_3_diseases){
  
  disease_name = removeLastWord(top_3_diseases)
  disease_name = removeLastWord(disease_name)
  disease_name = disease_name.split('_').join(' ') 

  total_diseases = removeFirstWord(top_3_diseases)
  total_diseases = removeLastWord(total_diseases)

  all_time_total = removeFirstWord(top_3_diseases)
  all_time_total = removeFirstWord(all_time_total)

  var previous_val = parseInt(all_time_total) - parseInt(total_diseases)

  if(previous_val < 1)
  {
    var current_val = parseInt(previous_val) + parseInt(total_diseases)
    var all_time_increase_of_disease = undefined
  }
  else
  {
      var current_val = parseInt(previous_val) + parseInt(total_diseases)
      var difference_val = parseInt(current_val) - parseInt(previous_val)

      var all_time_increase_of_disease = (difference_val / previous_val) * 100;
      all_time_increase_of_disease = Number(all_time_increase_of_disease.toFixed(1))
  }

  var percentage = (total_diseases / total_hp_count) * 100;
  percentage = parseFloat(percentage);
  percentage = Number(percentage.toFixed(1))

  if (isNaN(percentage)) {
    percentage = 0;
  }

  var new_output = {
      'disease_name': disease_name,
      'total_diseases': total_diseases,
      'all_time_total': all_time_total,
      'current_val':current_val,
      'previous_val':previous_val,
      'index': index
      }
  
  var datasets = { "barangay": disease_name, "healthCases": parseInt(total_diseases), "percent": parseFloat(percentage), "increase": parseFloat(all_time_increase_of_disease) }
  dataPoints.push(datasets)     

  newObjectArr.push(new_output);
  });

  const produced_clusters = dataPoints;
  const v2_clustering = clusteing_v2(produced_clusters, 3);
  

  top_3_diseases_function(v2_clustering, newObjectArr)

}
//disease_cluster

//top 3 diseases
function top_3_diseases_function(cluster, diseaseElements)  
{
  var top_3_diseases_date_start = getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy
  var top_3_diseases_date_end = getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy

  const v2_clustering = cluster
  const disease_elements = diseaseElements
  var disease_percent_allocated
  var total_cases_of_the_disease
  var disease_increase_percent
  var this_disease_name
  var previous_disease_total
  var current_total_diseases

  // initialization to display markers
  for (var i = 0; i < 3; i++ ) 
  { 
    const top_3_diseases_results = disease_elements[i]
    var top_3_disease_name_title = top_3_diseases_results.disease_name;

    v2_clustering.clusters.forEach((cluster, index) => {
    cluster.forEach((dataPoint) => {
    const clusterHealthCases = dataPoint.barangay;
    if (clusterHealthCases === top_3_disease_name_title) {
    if(parseInt(top_3_diseases_results.total_diseases) > 0)
    {
        if(index == 0)
          {
            progress_color = "bg-c-green"                        

          }
          else if(index == 1)
          {
            progress_color = "bg-c-yellow"  

          }
          else
          {
           progress_color = "bg-c-orange"  
          }

          disease_percent_allocated = dataPoint.percent
          total_cases_of_the_disease = dataPoint.healthCases
          disease_increase_percent = dataPoint.increase
          this_disease_name = top_3_disease_name_title
          previous_disease_total = top_3_diseases_results.previous_val
          current_total_diseases = top_3_diseases_results.current_val
    }
    }
    });
    });

    var cluser_from_to = top_3_diseases_date_start + " to " + top_3_diseases_date_end
    var totals_of_the_city = total_hp_count;
    var total_of_cases_case = "cases"
    var toatal_of_cases_were = "were"
    var added_rec_case = "cases"
    var were_of_totals = "were"
    var prev_rec_case = "cases"
    var total_of_cases_case = "cases"
    var total_cases_individuals = "individuals" 

    if(parseInt(total_cases_of_the_disease) <= 1)
    {
      added_rec_case = "case"
      were_of_totals = "was"
      total_cases_individuals = "individual"
    }
    if(parseInt(previous_disease_total) <= 1)
    {
      prev_rec_case = "case"
    }
    if(parseInt(totals_of_the_city) <= 1)
    {
      total_of_cases_case = "case"
      toatal_of_cases_were = "was"
    }
    
    var increase_label = disease_increase_percent.toLocaleString('en-US')+"%"
    var increase_label_for_tooltip = "has increased by "+increase_label.toLocaleString('en-US')+"% compared to the previous record of "+previous_disease_total.toLocaleString('en-US')+" total health "+prev_rec_case+"."
    var difference_value_label_for_tooltip = ", with a difference value of "+total_cases_of_the_disease.toLocaleString('en-US')+" health "+added_rec_case+""
    if (isNaN(disease_increase_percent)) {
      increase_label = "Significant"
      increase_label_for_tooltip = "has surged significantly compared to the previous record of "+previous_disease_total.toLocaleString('en-US')+" health "+prev_rec_case+"."
      difference_value_label_for_tooltip = " total health "+added_rec_case
    }

    $("#top_three_diseases").append('<tr class=" align-middle "  >'+
    '<td style="min-width:150px;" >'+this_disease_name+'</td>'+
    '<td style="min-width:100px;"  class="text-center shortCut_btn" id="top_3_disease_progress'+i+'"><div  >'+disease_percent_allocated.toLocaleString('en-US')+'%</div></td>'+
    '<td style="min-width:90px;"  class="text-center shortCut_btn" id="top_3_disease_infect'+i+'"><div class="'+progress_color.toLocaleString('en-US')+' rounded-3 text-light text-center" >'+total_cases_of_the_disease+' Individuals</div></td>'+
    '<td style="min-width:90px;"  class="text-end shortCut_btn" id="top_3_disease_increase'+i+'">'+increase_label+' </td></tr>');

    var current_year_tooltip = $("#top_3_disease_progress"+i+"")
    var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
    borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
    myOpentip.setContent("From "+cluser_from_to+", "+disease_percent_allocated.toLocaleString('en-US')+"% of "+totals_of_the_city+" total  recorded health "+total_of_cases_case+" in Oroquieta City "+toatal_of_cases_were+" caused by "+this_disease_name+""); // Updates Opentips content

    var current_year_tooltip = $("#top_3_disease_infect"+i+"")
    var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
    borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
    myOpentip.setContent("A total of "+total_cases_of_the_disease.toLocaleString('en-US')+" "+total_cases_individuals+" in Oroquieta City "+were_of_totals+" infected with "+this_disease_name+" from "+cluser_from_to+""); // Updates Opentips content

    var current_year_tooltip = $("#top_3_disease_increase"+i+"")
    var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
    borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
    myOpentip.setContent("<div class= 'ps-1 pe-2'>From "+cluser_from_to+", the number of  health cases caused by "+this_disease_name+", in Oroquieta City, "+increase_label_for_tooltip+" The current count stands at "+current_total_diseases.toLocaleString('en-US')+difference_value_label_for_tooltip+".</div>"); // Updates Opentips content

    
  }


}
//top 3 diseases end

//total hp count
function total_hp_count_function()
{
  var total_hp_count;
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

  return total_hp_count
}
//total hp count end

//top 3 barangays
function top_3_barangays_functions(cluster, barangayElements)
{
  var top_3_barangays_date_start = getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy
  var top_3_barangays_date_end = getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy
  const v2_clustering = cluster;
  const brgy_elements = barangayElements

  //"'type': 'Feature',
  //'geometry': [long, lat],
  //'title': barangay,
  //'description': hpTotal,
  //'allTime_hpTotal':allTime_hpTotal,
  // 'prev_rec': previous_val,
  // 'current_val':current_val,
  // 'index': index"

  // initialization to display markers
  for (var i = 0; i < 3; i++ ) 
  { 
    var progress_color;
    const top_3_barangays_results = brgy_elements[i]
    var top_3_barangay_name_title = top_3_barangays_results.title;

    var total_percentagae_allocated
    var percent_increases 
    var current_total_in_brgy
    var previous_total_in_brgy
    
    v2_clustering.clusters.forEach((cluster, index) => {
    cluster.forEach((dataPoint) => {
    const clusterHealthCases = dataPoint.barangay;
    if (clusterHealthCases === top_3_barangay_name_title) {

    if(parseInt(top_3_barangays_results.description) > 0)
    {
        if(index == 0)
          {
            progress_color = 'bg-c-green';
          }
          else if(index == 1)
          {
            progress_color = 'bg-c-yellow';
          }
          else
          {
            progress_color = 'bg-c-orange';
          }

          total_percentagae_allocated = dataPoint.percent
          percent_increases = dataPoint.increase
          current_total_in_brgy = top_3_barangays_results.current_val
          previous_total_in_brgy = top_3_barangays_results.prev_rec
    }

    }

    });
    });

    var cluser_from_to = top_3_barangays_date_start + " to " + top_3_barangays_date_end
    var totals_of_the_city = total_hp_count;
    var totals_in_barangays = top_3_barangays_results.description;
    var added_rec_case = "cases"
    var were_of_totals = "were"
    var prev_rec_case = "cases"
    var total_of_cases_case = "cases"

    if(parseInt(totals_in_barangays) <= 1)
    {
      added_rec_case = "case"
      were_of_totals = "was"
    }
    if(parseInt(previous_total_in_brgy) <= 1)
    {
      prev_rec_case = "case"
    }
    if(parseInt(totals_of_the_city) <= 1)
    {
      total_of_cases_case = "case"
    }

    var increase_label_for_tooltip = "has increased by "+percent_increases.toLocaleString('en-US')+"% compared to the previous record of "+previous_total_in_brgy.toLocaleString('en-US')+" total health "+prev_rec_case+"."
    var difference_value_label_for_tooltip = ", with a difference value of "+totals_in_barangays.toLocaleString('en-US')+" health "+added_rec_case+""
    var increase_label = percent_increases.toLocaleString('en-US')+"%"
    if (isNaN(percent_increases)) {
      increase_label = "Significant"
      increase_label_for_tooltip = "has surged significantly compared to the previous record of "+previous_total_in_brgy.toLocaleString('en-US')+" health "+prev_rec_case+"."
      difference_value_label_for_tooltip = " total health "+added_rec_case
    }

    $("#top_three_barangays").append('<tr class=" align-middle "  >'+
    '<td style="min-width:150px;" >'+top_3_barangay_name_title+'</td>'+
    '<td style="min-width:100px;"  class="text-center shortCut_btn" id="top_3_barangay_progress'+i+'"><div  >'+total_percentagae_allocated+'%</div></td>'+
    '<td style="min-width:90px;"  class="text-center shortCut_btn" id="top_3_barangay_infect'+i+'"><div class="'+progress_color+' rounded-3 text-light text-center" >'+totals_in_barangays+' Health Cases</div></td>'+
    '<td style="min-width:90px;"  class="text-end shortCut_btn" id="top_3_barangay_increase'+i+'">'+increase_label+' </td></tr>');
    
    var current_year_tooltip = $("#top_3_barangay_progress"+i+"")
    var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
    borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
    myOpentip.setContent('<div class="ps-1 pe-2">From '+cluser_from_to+', '+total_percentagae_allocated.toLocaleString('en-US')+'% of '+totals_of_the_city.toLocaleString('en-US')+' total recorded health '+total_of_cases_case+' in Oroquieta City were reported in barangay '+top_3_barangay_name_title+'</div>');

    var current_year_tooltip = $("#top_3_barangay_infect"+i+"")
    var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
    borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
    myOpentip.setContent("<div class= 'ps-1 pe-2'>A total of "+totals_in_barangays.toLocaleString('en-US')+" health "+added_rec_case+" in Oroquieta City "+were_of_totals+" reported in barangay "+top_3_barangay_name_title+" from "+cluser_from_to+"</div>"); // Updates Opentips content

    var current_year_tooltip = $("#top_3_barangay_increase"+i+"")
    var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
    borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
    myOpentip.setContent("<div class= 'ps-1 pe-2'>From "+cluser_from_to+", the number of  health cases in barangay "+top_3_barangay_name_title+", Oroquieta City, "+increase_label_for_tooltip+" The current count stands at "+current_total_in_brgy.toLocaleString('en-US')+difference_value_label_for_tooltip+".</div>"); // Updates Opentips content
  }
}
//top 3 barangays end

//shorctuts
function shurctuMenu()
{
  var current_year_tooltip = $("#barangay_health_statistic_shorcut")
  barangay_health_statistic_shorcut = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "Bottom", target:current_year_tooltip, delay:0.50});
  barangay_health_statistic_shorcut.setContent("View Graph Chart"); // Updates Opentips content

  $("#barangay_health_statistic_shorcut").click(function()
  {
    location.href = 'graphical-statistic.php';
  })

  var current_year_tooltip = $("#disease_statistic_shorcut")
  var disease_statistic_shorcut = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "Bottom", target:current_year_tooltip, delay:0.50});
  disease_statistic_shorcut.setContent("View Graph Chart"); // Updates Opentips content
  $("#disease_statistic_shorcut").click(function()
  {
    location.href = 'graphical-statistic-disease.php';
  })

  var current_year_tooltip = $("#timespan_statistic_shorcut")
  var timespan_statistic_shorcut = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "Bottom", target:current_year_tooltip, delay:0.50});
  timespan_statistic_shorcut.setContent("View Graph Chart"); // Updates Opentips content
  $("#timespan_statistic_shorcut").click(function()
  {
    var starting_date = current_year_from
    var end_date = current_year_to
    //pass this variables to next page when clicked
    location.href = 'manage-hp.php?current_month=' + encodeURIComponent("current month") + "&starting_date=" + encodeURIComponent(starting_date) + "&end_date=" + encodeURIComponent(end_date);
  })

  var current_year_tooltip = $("#view_map_btn")
  var view_map_btn = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "Bottom", target:current_year_tooltip, delay:0.50});
  view_map_btn.setContent("View Full Map"); // Updates Opentips content
  $("#view_map_btn").click(function()
  {
    location.href = 'map-statistic.php';
  })

  
  $("body").click(function()
  {
    barangay_health_statistic_shorcut.hide()
    disease_statistic_shorcut.hide()
    timespan_statistic_shorcut.hide()
    view_map_btn.hide()
  })

  
}
//shortcuts end

//new cases
function newCases(data_points)
{
  
  $(".today").text(getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy)
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
  var color_changer

  var data_points_for_total_cases = data_points.clusters
  $.each(data_points_for_total_cases, function(index, subArray) {
  $.each(subArray, function(subIndex, value) {
    if(value === parseInt(newCases_variable))
    {
        if(index === 0)
        {
        color_changer = 'bg-c-green'; 
        }
        else if(index === 1)
        {
        color_changer = 'bg-c-yellow';  
        }
        else if(index === 2) 
        {
        color_changer = 'bg-c-orange'; 
        }
    }
  });
  });

  $("#new_health_cases").removeClass('bg-c-green')
  $("#new_health_cases").addClass(color_changer)

   

  $("#total_new_cases").text(parseInt(newCases_variable).toLocaleString('en-US'));

  if(parseInt(newCases_variable)>0)
  {
    $("#newCasesPercent").text("As of "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(newCases_variable).toLocaleString('en-US')+
    " new health cases reported in Oroquieta City");

    if(parseInt(newCases_variable) === 1)
    {
      $("#newCasesPercent").text("As of "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", only "+parseInt(newCases_variable).toLocaleString('en-US')+
      " new health case has been reported in Oroquieta City");
    }
  }
  else
  {
    $("#newCasesPercent").text("As of "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health cases reported in Oroquieta City");
  }
 

  $('.click_to_see_more').text("(Click to see more details)");

  $("#new_health_cases_btn").click(function(){

    var details_for_newCases;

    if(parseInt(newCases_variable)>0)
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 text-white px-2"><label class="form-label">'+"As of "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(newCases_variable).toLocaleString('en-US')+
      " new health cases reported in Oroquieta City"+'</label></div>');

      if(parseInt(newCases_variable) === 1)
      {
        $('.generated_report_content').remove();
        $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 text-white px-2"><label class="form-label">'+"As of "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there has been only "+parseInt(newCases_variable).toLocaleString('en-US')+
        " new health case reported in Oroquieta City"+'</label></div>');  
      }
    }
    else
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 text-white px-2"><label class="form-label">'+"As of "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health cases reported in Oroquieta City"+'</label></div>');
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
    $(".dashboard_reports_modal").removeClass("bg-c-orange")
    $(".dashboard_reports_modal").addClass(color_changer)
    $("#details_title").text("New Health Cases")
    $('.new_health_icon').remove();
    $("#header_icon").append('<span style="width: 15px; height:15px; color:#ffff;" class="new_health_icon fa-solid"></span>')

    $('.new_health_cases_list').remove();
    $.each(details_for_newCases, function( index,value ) {

      $("#details_form").append('<div  class="new_health_cases_list border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 d-flex align-items-center text-white px-2"><label class="form-label">'+value+'</label></div>');
  
    });

    $('#show_details').modal('toggle')
  })

}
//new cases end

function totalCases(data_points)
{
  $(".oneMonthFrom").text(getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy)
  $(".oneMonthTo").text(getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy)
  var totalCases_variable = total_hp_count
  var color_changer

  var data_points_for_total_cases = data_points.clusters
  $.each(data_points_for_total_cases, function(index, subArray) {
  $.each(subArray, function(subIndex, value) {
      if(value === parseInt(totalCases_variable))
      {
          if(index === 0)
          {
          color_changer = 'bg-c-green'
          }
          else if(index === 1)
          {
          color_changer = 'bg-c-yellow'
          }
          else if(index === 2)
          {
          color_changer = 'bg-c-orange'
          }
      }
  });
  });

  $("#total_health_cases").removeClass('bg-c-green')
  $("#total_health_cases").addClass(color_changer)

  $("#total_cases").text(parseInt(totalCases_variable).toLocaleString('en-US'));

  if(parseInt(totalCases_variable)>0)
  {
    $("#casesPercent").text("From "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(totalCases_variable).toLocaleString('en-US')+
    " total health cases reported in Oroquieta City");

    if(parseInt(totalCases_variable) === 1)
    {
      $("#casesPercent").text("From "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", only "+parseInt(newCases_variable).toLocaleString('en-US')+
      " total health case has been reported in Oroquieta City");
    }
  }
  else
  {
    $("#casesPercent").text("From "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no health cases reported in Oroquieta City");
  }

  $("#total_health_cases_btn").click(function(){

    var details_for_totalCases;

    if(parseInt(totalCases_variable)>0)
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(totalCases_variable).toLocaleString('en-US')+
      " health cases reported in Oroquieta City"+'</label></div>');

      if(parseInt(totalCases_variable) === 1)
      {
        $('.generated_report_content').remove();
        $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there has been only "+parseInt(totalCases_variable).toLocaleString('en-US')+
        " health case reported in Oroquieta City"+'</label></div>');  
      }
    }
    else
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no health cases reported in Oroquieta City"+'</label></div>');
    }

   

    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_top_3.php', 
    {
      details_for_totalCases:'set',
      top_from:current_year_from,
      top_to:current_year_to
    },     
    function (data, textStatus, jqXHR) 
    {
      details_for_totalCases = data;
    });

    //console.log(details_for_totalCases)

    $("#report_lbl").text("List of Reported Health Cases")
    $(".dashboard_reports_modal").removeClass("bg-c-pink")
    $(".dashboard_reports_modal").removeClass("bg-c-yellow")
    $(".dashboard_reports_modal").removeClass("bg-c-green")
    $(".dashboard_reports_modal").removeClass("bg-c-orange")
    $(".dashboard_reports_modal").addClass(color_changer)
    $("#details_title").text("Total Health Cases")
    $('.new_health_icon').remove();
    $("#header_icon").append('<span style="width: 15px; height:15px; color:#ffff;" class="new_health_icon fa-solid"></span>')

    $('.new_health_cases_list').remove();
    $.each(details_for_totalCases, function( index,value ) {

      $("#details_form").append('<div  class="new_health_cases_list border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 d-flex align-items-center text-white px-2"><label class="form-label">'+value+'</label></div>');
  
    });

    $('#show_details').modal('toggle')
  })
}

//initalize brgy_chart_cata()
function  brgy_chart_cata()
{
  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/graphical-statistic.php', 
  {
    total_hp:'set',

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
    x_y_value = data;
    
  });

 // console.log(x_y_value)
  
  var textArr = x_y_value;
  var hpTotal_arr = [];
  var brgy_arr = [];
  $.each(textArr,function(index,x_y){

  hpTotal =  removeFirstWord(x_y) 

  barangay = removeLastWord(x_y)
  barangay = barangay.split('_').join(' ') 

  var single_hp_total = hpTotal
  var single_brgy = barangay

  hpTotal_arr.push(single_hp_total);
  brgy_arr.push(single_brgy);
  
  });

  x_value = brgy_arr
  y_value = hpTotal_arr

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
  else if(sort === "names")
  {
          //sorting algorithm
          arrayOfObj = x_value.map(function(d, i) {
            return {
              label: d,
              data: y_value[i] || 0
            };
          });
          
          sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
            return a.label - b.label;
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
  $.each(yValues, function( index,value ) {

    if(parseInt(value) <= 10){
       myColors[index]="#b3e6ffff";
    }
    else if(parseInt(value) <= 40)
    {
      myColors[index]="#80d5ffff";
    }
    else if(parseInt(value) <= 70)
    {
      myColors[index]="#4dc4ffff";
    }
    else{
      myColors[index]="#07a3f1ff";
    }
    

  });

}
 //initalize brgy_chart_cata() end

//number of brgy_chart()
function brgy_chart()
{
  brgy_chart_cata()
  //console.log(x_value)
  const data_sets = [{
    label: "",
    data: yValues,
    backgroundColor: myColors,
    borderColor: "#80d5ffff",
    borderWidth: 1,
    borderRadius: 8,
    borderSkipped: false,
    barPercentage: 0.8,
    categoryPercentage:0.8,
    //poinStyle: 'circle'
  },]

  //initialize chart
  const ctx = $('#hpChart_brgy');
  brgyChart = new Chart(ctx, {
  type: 'bar',
  options: 
  {
    onClick: (e, elements) => {

      if(elements.length > 0) 
      {
        var current_index = elements[0].index;
        location.href = 'graphical-statistic.php?index='+ encodeURIComponent(current_index);
      }
    },
    onHover: (e, elements) => {
      e.native.target.style.cursor = elements[0] ? 'pointer'
      : 'default';
    },
    indexAxis: 'x',
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          padding: 0,
          display: false,
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          padding: 0,
          display: false,
        },
        type: 'linear',
        grace: '5%'
      },

    },
    plugins: {
        responsive: true,
        legend: {
            display: false,
        },
        tooltip: {
          enabled: true,
          displayColors: false,
          usePointStyle: true,
          padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
          },
          titleFont:{
            size:12
          },
          bodyFont:{
            size:12
          },
          caretSize: 10,
          cornerRadius: 10,
          caretPadding: 0,
          callbacks: {
              label: function(context) { 

                var modified_label = parseInt(context.parsed.y).toLocaleString('en-US')+" health cases in total"
                if(context.parsed.y == 1)
                {
                  var modified_label = parseInt(context.parsed.y).toLocaleString('en-US')+" health case in total."
                }
                  

                return modified_label           
             
            },
              afterLabel: function(context) {            
               return "(click to see more details)"
             },
            labelPointStyle: function(context) {
              return {
                  pointStyle: 'rectRounded',
                  rotation: 0,
              };
            }

          },
          backgroundColor: '#ffffff',
          bodyColor: "#626464",
          titleColor:  "#626464",
          borderColor: "#dee0e0",
          borderWidth: 1,
          bodySpacing: 1,
          titleMarginBottom: 5
        }
    }
  },
  
  data: {
      labels: xValues,
      dataSorting: {
        enabled: true
     },
      datasets: data_sets
  },
});



}
//number of brgy_chart() end

//initalize disease_chart_data()
function  disease_chart_data()
{

$.getJSON('functions/display-functions/graphical-statistic-diseases.php', 
{
  total_hp:'set',

  query_click:query_click,
  
  barangay_name:'default',
  date_range_from:date_range_from,
  date_range_to:date_range_to,
  gender:'default',
  max_age:'default',
  min_age:'default',

  current_year_from:'default',
  current_year_to:'default'
}, 

function (data, textStatus, jqXHR) 
{
  x_y_value_disease = data;
  
});

//console.log(x_y_value)

var textArr = x_y_value_disease;
var hpTotal_arr = [];
var brgy_arr = [];
$.each(textArr,function(index,x_y){

hpTotal =  removeFirstWord(x_y) 

barangay = removeLastWord(x_y)
barangay = barangay.split('_').join(' ') 

var single_hp_total = hpTotal
var single_brgy = barangay

hpTotal_arr.push(single_hp_total);
brgy_arr.push(single_brgy);

});

x_value_disease = brgy_arr
y_value_disease = hpTotal_arr

//sorting algorithm
arrayOfObj = x_value_disease.map(function(d, i) {
  return {
    label: d,
    data: y_value_disease[i] || 0
  };
});

sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
  return a.label - b.label;
});

newArrayLabel = [];
newArrayData = [];
sortedArrayOfObj.forEach(function(d){
  newArrayLabel.push(d.label);
  newArrayData.push(d.data);
});
////sorting algorithm

x_value_disease = newArrayLabel;
y_value_disease = newArrayData;

xValues_disease = x_value_disease;
yValues_disease = y_value_disease; 

//generate a color base on percentage
$.each(yValues_disease, function( index,value ) {

  if(parseInt(value) <= 10){
    disease_chart_color[index]="#b3e6ffff";
      disease_chart_points[index]=  5;
  }
  else if(parseInt(value) <= 40)
  {
    disease_chart_color[index]="#80d5ffff";
    disease_chart_points[index]=  10 ;
  }
  else if(parseInt(value) <= 70)
  {
    disease_chart_color[index]="#4dc4ffff";
    disease_chart_points[index]= 15;
  }
  else{
    disease_chart_color[index]="#07a3f1ff";
    disease_chart_points[index]=  20;
  }

});

}
//initalize disease_chart_data() end

//number of disease_chart_data
function  disease_chart()
{
   disease_chart_data()
  //console.log(x_value)
  const data_sets_disease = [{
    label: "",
    data: yValues_disease,
    backgroundColor: myColors,
    borderColor: "#80d5ffff",
    borderWidth: 1,
    borderRadius: 8,
    borderSkipped: false,
    barPercentage: 0.8,
    categoryPercentage: 0.8,
    //poinStyle: 'circle'
  },]

  
  //initialize chart
  const ctx = $('#hpChart_disease');
  diseaseChart = new Chart(ctx, {
  type: 'bar',
  options: {
    onClick: (e, elements) => {

      if(elements.length > 0) 
      {
        var current_index = elements[0].index;        
        location.href = 'graphical-statistic-disease.php?index=' + encodeURIComponent(current_index);

      }
    },
    onHover: (e, elements) => {
      e.native.target.style.cursor = elements[0] ? 'pointer'
      : 'default';
    },
    pointStyle: "circle",
    indexAxis: 'x',
    scales: {
      x: {
        beginAtZero: false,
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          padding: 20,
          display: false,
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          padding: 25,
          display: false,
        },
        type: 'linear',
        grace: '5%'
      },

    },
    plugins: {
        responsive: true,
        legend: {
            display: false,
        },
        tooltip: {
          enabled: true,
          displayColors: false,
          usePointStyle: true,
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
      },
      titleFont:{
        size:12
      },
      bodyFont:{
        size:12
      },
      caretSize: 10,
      cornerRadius: 10,
      caretPadding: 0,
          callbacks: {
              label: function(context) { 

                var modified_label = parseInt(context.parsed.y).toLocaleString('en-US')+" health cases in total"
                if(context.parsed.y == 1)
                {
                  var modified_label = parseInt(context.parsed.y).toLocaleString('en-US')+" health case in total"
                }

                return modified_label           
             
            },
              afterLabel: function(context) {            
               return "(click to see more details)"
             },
            labelPointStyle: function(context) {
              return {
                  pointStyle: 'rectRounded',
                  rotation: 0,
              };
            }

          },
          backgroundColor: '#ffffff',
          bodyColor: "#626464",
          titleColor:  "#626464",
          borderColor: "#dee0e0",
          borderWidth: 1,
          bodySpacing: 1,
          titleMarginBottom: 5
        }
    }
  },
  
  data: {
      labels: xValues_disease,
      dataSorting: {
        enabled: true
     },
      datasets: data_sets_disease
  },
});

$("#hpChart").addClass("rounded-4 p-3 border-0 shadow-sm bg-light bg-opacity-50")
}
//number of disease_chart_data end

 //initalize timespan_chart_data()
 function timespan_chart_data()
 {
   $.ajaxSetup({async:false});
   $.getJSON('functions/display-functions/time-span.php', 
   {
     total_hp:'set',
 
     query_click:query_click,
     
     disease_type:'',
     barangay_name:'',
     date_range_from:date_range_from,
     date_range_to:date_range_to,
     gender:'',
     max_age:'NaN',
     min_age:'NaN',
 
     current_year_from:current_year_from,
     current_year_to:current_year_to
   }, 
   
   function (data, textStatus, jqXHR) 
   {
     x_y_value = data;
     
   });
 
   //console.log(x_y_value)
   
   var textArr = x_y_value;
   var hpTotal_arr = [];
   var brgy_arr = [];
   var xx_arr = [];
   $.each(textArr,function(index,x_y){
 
   hpTotal =  removeFirstWord(x_y) 
 
   barangay = removeLastWord(x_y)
   barangay = barangay.split('_').join(' ') 

   var single_xx = barangay;
   var aDate = new Date(barangay)
   var aDate_year_dd = String(aDate.getDate()).padStart(2, '0');
   var aDate_year_mm = String(aDate.getMonth() + 1).padStart(2, '0');
   var aDate_year_yyyy = aDate.getFullYear();
   var single_brgy = getMonthName(aDate_year_mm)+" "+aDate_year_dd+", "+aDate_year_yyyy

   if(barangay === "Invalid date")
   {
    barangay = "No Records Found"
    single_brgy = barangay
   }
  

   var single_hp_total = hpTotal
  
   
 
   hpTotal_arr.push(single_hp_total);
   brgy_arr.push(single_brgy);
   xx_arr.push(single_xx);
   
   });
 
   x_value = brgy_arr
   y_value = hpTotal_arr
   xx_value = xx_arr;
 
   if(sort === "asc")
   {
       //sorting algorithm
       arrayOfObj = x_value.map(function(d, i) {
         return {
           label: d,
           data: y_value[i] || 0,
           title: xx_value[i]
         };
       });
       
       sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
         return a.data - b.data;
       });
       
       newArrayLabel = [];
       newArrayData = [];
       newArrayTitle = [];
       sortedArrayOfObj.forEach(function(d){
         newArrayLabel.push(d.label);
         newArrayData.push(d.data);
         newArrayTitle.push(d.title);
       });
       ////sorting algorithm
   }
   else if(sort === "desc")
   {
      //sorting algorithm
      arrayOfObj = x_value.map(function(d, i) {
        return {
          label: d,
          data: y_value[i] || 0,
          title: xx_value[i]
        };
      });
      
      sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
        return b.data - a.data;
      });
      
      newArrayLabel = [];
      newArrayData = [];
      newArrayTitle = [];
      sortedArrayOfObj.forEach(function(d){
        newArrayLabel.push(d.label);
        newArrayData.push(d.data);
        newArrayTitle.push(d.title);
      });
      ////sorting algorithm
   }
   else if(sort === "names")
   {
        //sorting algorithm
        arrayOfObj = x_value.map(function(d, i) {
          return {
            label: d,
            data: y_value[i] || 0,
            title: xx_value[i]
          };
        });

        sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
          return a.data + b.data;
        });

        newArrayLabel = [];
        newArrayData = [];
        newArrayTitle = [];
        sortedArrayOfObj.forEach(function(d){
          newArrayLabel.push(d.label);
          newArrayData.push(d.data);
          newArrayTitle.push(d.title);
        });
        ////sorting algorithm
   }
 
   x_value = newArrayLabel;
   y_value = newArrayData;
   xx_value = newArrayTitle;
 
   xValues = x_value;
   yValues = y_value; 

   
    //generate a color base on percentage

   var total = 0; $.each(yValues, function(index, value) { total += parseInt(value); }); 

   if(isNaN(total))
   {
    total=0;
   }

   if(parseInt(total) <= 100){
    myColors_time="#b3e6ffff";
   
    }
    else if(parseInt(total) <= 500)
    {
      myColors_time="#80d5ffff";
     
    }
    else if(parseInt(total) <= 1000)
    {
      myColors_time="#4dc4ffff";
      
    }
    else{
      myColors_time="#07a3f1ff";
      
    }

 }
  //initalize timespan_chart_data() end
 
 //number of timespan_chart()
 function timespan_chart()
 {
  timespan_chart_data()
  // console.log(x_value)

   const data_sets = [

    {
     type: 'line', 
     label: "",
     data: yValues,
     backgroundColor: myColors_time,
     pointBackgroundColor: myColors_time,
     pointHoverBackgroundColor: myColors_time,
     borderColor: "#6cc4f000",
     borderWidth: 1,
     borderRadius: 1,
     pointRadius: 1.3,
     hoverRadius:5,
     borderSkipped: true,
     barPercentage: 0.8,
     categoryPercentage:0.8,
     fill: true,
     tension: 0.3,
    //stepped: true,
   }]
 
 
   //initialize chart
   const ctx = $('#hpChart_time');
   myChart = new Chart(ctx, {
   options: {
       interaction: {
         intersect: false,
         mode: 'index',
       },
    onClick: (e, elements) => {

      if(elements.length > 0) 
      {
        var current_index = elements[0].index;
        var starting_date =  current_year_from
        var end_date = current_year_to
        var is_clicked = 'unclicked'

        //pass this variables to next page when clicked
        location.href = 'manage-hp.php?index=' + encodeURIComponent(current_index) + "&starting_date=" + encodeURIComponent(starting_date) + "&end_date=" + encodeURIComponent(end_date) + "&is_clicked=" + encodeURIComponent(is_clicked);
      }
    },
    onHover: (e, elements) => {
      e.native.target.style.cursor = elements[0] ? 'pointer'
      : 'default';
    },
     pointStyle: "circle",
     indexAxis: 'x',
     scales: {
       x: {
         beginAtZero: false,
         grid: {
           display: false,
           drawBorder: false
         },
         ticks: {
           padding: 20,
           display: false,
         }
       },
       y: {
         beginAtZero: false,
         grid: {
           display: false,
           drawBorder: false
         },
         ticks: {
          padding: 25,
           display: false,
         },
          type: 'linear',
          grace: '5%'
       },
 
     },
     plugins: {
         responsive: true,
         legend: {
             display: false,
         },
         tooltip: {
           enabled: true,
           displayColors: false,
           usePointStyle: true,
           padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
      },
      titleFont:{
        size:12
      },
      bodyFont:{
        size:12
      },
      caretSize: 10,
      cornerRadius: 10,
      caretPadding: 0,
           callbacks: {
               label: function(context) { 

                var modified_label = parseInt(context.parsed.y).toLocaleString('en-US')+" health cases in total"
                if(context.parsed.y == 1)
                {
                  var modified_label = parseInt(context.parsed.y).toLocaleString('en-US')+" health case in total"
                }
                   
 
                 return modified_label           
              
             },
              afterLabel: function(context) {            
               return "(click to see more details)"
             },
             labelPointStyle: function(context) {
               return {
                   pointStyle: 'rectRounded',
                   rotation: 0,
               };
             }
 
           },
           backgroundColor: '#ffffff',
           bodyColor: "#626464",
           titleColor:  "#626464",
           borderColor: "#dee0e0",
           borderWidth: 1,
           bodySpacing: 1,
          titleMarginBottom: 5
         }
     }
   },
   
   data: {
       labels: xValues,
       dataSorting: {
         enabled: true
      },
       datasets: data_sets
   },

 });
 
 }
 //number of timespan_chart() end


