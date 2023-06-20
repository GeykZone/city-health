var barangay_name = "default";
var date_range_from = "default";
var date_range_to = "default";
var query_click = "unclicked";
var gender = "default";
var select_brgy = "";

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

var x_value = [];
var y_value = [];
var x_y_value = "";
var xValues = "";
var yValues = ""; 
var myColors=[];
var myPoints=[]

var tittle_barangay = "";
var details_title;
var title_diagnosis;

var sort = "names";

var min_age = "default";
var max_age = "default";


$(document).ready(function()
{
    $( "#disease_range_from" ).val(current_year_from);
    $( "#disease_range_to" ).val(current_year_to);
    $(document).attr("title", "HPCS | Manage Health Profiles");
    oneTip()
    current_status()
    select_with_search_box()
    date_range()
    number_of_resident_chart()
    load_data_tables()
})

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

      
      if($( "#disease_range_from" ).val() === $( "#disease_range_to" ).val())
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

    

    if(barangay_name === "default")
    {
        $("#map_barangay").text("")
    }
    else
    {
        $("#map_barangay").text(" in barangay "+tittle_barangay)   
    }

    $("#map_cases").text("All documented health cases, ")
    
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

//k-means 
function clustering_v1(this_datapoints, centroids_num) {

  function getManualCentroids(data) {
    const sortedData = data.sort((a, b) => a - b);
    const lowest = sortedData[0];
    const highest = sortedData[sortedData.length - 1];

    var numbers = sortedData

    var sum = numbers.reduce(function (a, b) {
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
  return { clusters: clusters, centroids: centroids };
}
//k-means

//object to string
function objToString (obj) {
    return Object.entries(obj).reduce((str, [p, val]) => {
        return `${str}${val},\n`;
    }, '');
  }
//object to string
  
//tooltip
  function oneTip()
  {
      var current_year_tooltip = $("#current_year")
      var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "bottom", target:current_year_tooltip, delay:0.50});
      myOpentip.setContent("Refresh Graph Chart"); // Updates Opentips content

      $("body").click(function()
      {
        myOpentip.hide()
      })
  
  }
//tooltp end
  
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

  $("#disease_range_from").datepicker({
    dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
    });


    $("#disease_range_to").datepicker({
        dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
        });

}
//date picker end

//initalize chart values
function chart_array()
{
$.ajaxSetup({async:false});
$.getJSON('functions/display-functions/graphical-statistic-diseases.php', 
{
  total_hp:'set',

  query_click:query_click,
  
  barangay_name:barangay_name,
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

//console.log(x_y_value)

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

var yValues_cluster = []
$.each(yValues, function (ind, elem) {

  yValues_cluster.push(parseInt(elem))
})
const v1_clustering = clustering_v1(yValues_cluster, 3).clusters


//generate a color base on percentage
$.each(yValues, function (i, yV) {

  $.each(v1_clustering, function (index, subArray) {
    $.each(subArray, function (subIndex, value) {
      if (value === parseInt(yValues[i])) {
        if (index === 0) {
          myColors[i] = "#75bdf8ff";
          
        }
        else if (index === 1) {
          myColors[i] = "#36a3fcff";
        }
        else if (index === 2) {
          myColors[i] = "#0289f7ff";
        }
      }
    });
  });

  var newRow = $("<tr></tr>").appendTo("#show_barangay_health_statistic_table");
  $("<td>" + x_value[i] + "</td>").appendTo(newRow);
  $('<td style="min-width:90px;"  class="text-end shortCut_btn pe-4" id="cluster_inc' + i + '">' + yValues[i] + ' </td>').appendTo(newRow)

});

var total = 0; $.each(yValues, function(index, value) { total += parseInt(value); }); 

if(isNaN(total))
{
 total=0;
}

$("#map_totals").text(", ("+total.toLocaleString('en-US')+") in total")

}
//initalize chart values end

//number of residents chart
function number_of_resident_chart()
{
  chart_array()
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
    categoryPercentage: 0.8,
    //poinStyle: 'circle'
  },]


  //initialize chart
  const ctx = $('#hpChart');
  myChart = new Chart(ctx, {
  type: 'bar',
  options: {
    onClick: (e, elements) => {

      if(elements.length > 0) 
      {
        var current_index = elements[0].index;

        title_diagnosis = x_value[current_index];
        $("#details_title").text(x_value[current_index]+"")
        var all_diseases_that_occured = xValues[current_index];
        var display_diseases_that_occured = "";
        var details_title;

        $(".details_head_status").text("All documented health cases caused by "+title_diagnosis+"")

        if(barangay_name != "default")
        {
          $(".details_head_status").text("All documented health cases caused by "+title_diagnosis+" in barangay "+tittle_barangay)
        }

        if(yValues[current_index] != 1)
        {
          details_title = "There are "+parseInt(yValues[current_index]).toLocaleString('en-US')+" health cases in total";
        }
        else
        {
          details_title = "There is only "+parseInt(yValues[current_index]).toLocaleString('en-US')+" health case in total";
        }
        

        $('.details_content_label').remove();
        $("#details_content_titte").append('<div class="details_content_label border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 text-white px-2"><label class="form-label">'+details_title+'</label></div>');
        

        //to get the occuring diseases in that area

        $.ajaxSetup({async:false});
        $.getJSON('functions/display-functions/get-occuring-barangays.php',
        {
          query_click:query_click,

          barangay_name:barangay_name,
          date_range_from:date_range_from,
          date_range_to:date_range_to,
          gender:gender,
          max_age:max_age,
          min_age:min_age,

          current_year_from:current_year_from,
          current_year_to:current_year_to,

          all_diseases_that_occured: all_diseases_that_occured
            
        },     
        function (data, textStatus, jqXHR) 
        {
          display_diseases_that_occured = data
        });
        //to get the occuring diseases in that area end

        $('.details_list').remove();
        $.each(display_diseases_that_occured, function( index,value ) {

          $("#details_form").append('<div class="details_list border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 d-flex align-items-center text-white px-2"><label class="form-label">'+value+'</label></div>');
      
        });

        $('#show_details').modal('toggle');
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
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false
        },
        ticks: {
          padding: 20,
          display: true,
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false
        },
        ticks: {
          padding: 25,
          display: true,
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
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
          },
          caretSize: 15,
          cornerRadius: 20,
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
          bodySpacing: 4,
          titleMarginBottom: 15
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

$("#hpChart").addClass("rounded-4 p-3 border-0 shadow-sm bg-light bg-opacity-50")

  var urlParams = new URLSearchParams(window.location.search)
  var disease_index = urlParams.get("index")
  console.log(disease_index)
if (disease_index)
{
  var current_index = disease_index;
  title_diagnosis = x_value[current_index];
  $("#details_title").text(x_value[current_index]+"")
  var all_diseases_that_occured = xValues[current_index];
  var display_diseases_that_occured = "";
  var details_title;

  $(".details_head_status").text("All documented health cases caused by "+title_diagnosis+"")

  if(barangay_name != "default")
  {
    $(".details_head_status").text("All documented health cases caused by "+title_diagnosis+" in barangay "+tittle_barangay)
  }

  if(yValues[current_index] != 1)
  {
    details_title = "There are "+parseInt(yValues[current_index]).toLocaleString('en-US')+" health cases in total";
  }
  else
  {
    details_title = "There is only "+parseInt(yValues[current_index]).toLocaleString('en-US')+" health case in total";
  }
  

  $('.details_content_label').remove();
  $("#details_content_titte").append('<div class="details_content_label border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 text-white px-2"><label class="form-label">'+details_title+'</label></div>');
  

  //to get the occuring diseases in that area

  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get-occuring-barangays.php',
  {
    query_click:query_click,

    barangay_name:barangay_name,
    date_range_from:date_range_from,
    date_range_to:date_range_to,
    gender:gender,
    max_age:max_age,
    min_age:min_age,

    current_year_from:current_year_from,
    current_year_to:current_year_to,

    all_diseases_that_occured: all_diseases_that_occured
      
  },     
  function (data, textStatus, jqXHR) 
  {
    display_diseases_that_occured = data
  });
  //to get the occuring diseases in that area end

  $('.details_list').remove();
  $.each(display_diseases_that_occured, function( index,value ) {

    $("#details_form").append('<div class="details_list border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 d-flex align-items-center text-white px-2"><label class="form-label">'+value+'</label></div>');

  });

  $('#show_details').modal('toggle');

}

}
//number of residents chart end

//update chart
function update_chart()
{
chart_array();
myChart.data.labels = x_value;
myChart.data.datasets[0].data = y_value;
myChart.update();
}
//update chart end

//show data tables
function load_data_tables() {
  var table_data = $("#map_disease").text() + $("#map_cases").text() + $("#map_from").text() + $("#map_to").text();
  var table_data_2 = $("#map_gender").text() + $("#map_min_age").text() + $("#map_max_age").text() + $("#map_record_info").text();
  var modifiedWord = table_data_2.replace(/^,\s/, '');//remove unecesary in first char
  var modifiedSentence = modifiedWord.charAt(0).toUpperCase() + modifiedWord.slice(1);//make  first letter capital

  if (!$.fn.DataTable.isDataTable('#barangay_health_statistic')) { // check if data table is already exist

    table = $('#barangay_health_statistic').DataTable({

      // "processing": true,
      "deferRender": true,
      "serverSide": false,

      order: [[1, 'DESC']],
      "language": {
        "info": "Showing _START_ to _END_ of _TOTAL_ entries",
        "infoFiltered": ""
      },

      "autoWidth": false,
      scrollCollapse: true,

      "dom": 'Brltip',
      "lengthMenu": [[10, 50, 100, 500, 1000], [10, 50, 100, 500, 1000]],

      "columns": [
        null,
        {
          render: function (data) {
            return '<div class = "text-end pe-3">' + data + '</div>'
          }

        }

      ],

      "buttons": [
        {
          extend: 'copy',
          text: ' COPY',

          action: function () {
            // Create a new container element to hold the merged table data
            var mergedData = '';

            mergedData += 'Health Profile Clustering System\n';
            mergedData += table_data + "\n" + modifiedSentence + "\n";
            mergedData += 'Copied: ' + getMonthName(current_year_mm) + ' ' + current_year_dd + ", " + current_year_yyyy + '\n\n';

            // Loop through each table and append its data to the merged data
            $('#barangay_health_statistic_wrapper').find('table').each(function () {
              var tableName = $(this).attr('id');
              var tableRows = $(this).find('tbody tr');


              // Append table title to the merged data
              mergedData += 'Total Disease Stats\n';

              // Loop through each row and append its data to the merged data
              tableRows.each(function () {
                var rowData = '';

                // Loop through each cell and append its data to the row data
                $(this).find('td').each(function () {
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
          }
        },
        {
          extend: 'excel',
          text: ' EXCEL',
          action: function (e, dt, node, config) {

            var workbook = XLSX.utils.book_new();

            if (modifiedSentence != "") {
              modifiedSentence = "(" + modifiedSentence + ")"
            }

            // Create a sheet for Barangay Health Stats
            var excel_data = XLSX.utils.aoa_to_sheet([
              [{ v: 'Health Profile', s: { font: { bold: true }, alignment: { horizontal: 'center' } } }],
              [{ v: 'Clustering System', s: { font: { bold: true }, alignment: { horizontal: 'center' } } }],
              [],
              [{ v: 'Exported Data', s: { alignment: { horizontal: 'center' } } }],
              [{ v: '(' + table_data + ')', s: { alignment: { horizontal: 'center' } } }],
              [{ v: modifiedSentence, s: { alignment: { horizontal: 'center' } } }],
              [{ v: 'Accessed: ' + getMonthName(current_year_mm) + ' ' + current_year_dd + ", " + current_year_yyyy, s: { alignment: { horizontal: 'center' } } }],
              [],
              [{ v: 'Total Disease Stats', s: { font: { bold: true }, alignment: { horizontal: 'center' } } }],
              [],
              [{ v: 'Diagnosis', s: { font: { bold: true } } }, { v: 'Total Health Cases', s: { font: { bold: true }, alignment: { horizontal: 'right' } } }]
            ]);

            // Merge and center the headers in Barangay Health Stats sheet
            excel_data['!merges'] = [
              { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }, // Merge A1 to D1
              { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } },
              { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } },
              { s: { r: 4, c: 0 }, e: { r: 4, c: 3 } },
              { s: { r: 5, c: 0 }, e: { r: 5, c: 3 } },
              { s: { r: 6, c: 0 }, e: { r: 6, c: 3 } },
              { s: { r: 8, c: 0 }, e: { r: 8, c: 3 } },
              { s: { r: 10, c: 1 }, e: { r: 10, c: 3 } },
            ];

            // Get the data from the Barangay Health Stats table
            var data_tables = document.getElementById('barangay_health_statistic_wrapper');
            var data_table_tr = data_tables.getElementsByTagName('tr');
            for (var i = 1; i < data_table_tr.length; i++) {
              var row = [];
              var cells = data_table_tr[i].getElementsByTagName('td');
              for (var j = 0; j < cells.length; j++) {
                row.push(cells[j].innerText.trim());
              }
              XLSX.utils.sheet_add_aoa(excel_data, [row], { origin: -1 });
            }

            // Calculate the last row index in the merged area
            var lastRowIndex = 10;
            var end_index = data_table_tr.length + lastRowIndex

            // Merge and center the cells below the specified merge range
            for (var rowIndex = lastRowIndex + 1; rowIndex <= end_index; rowIndex++) {
              excel_data['!merges'].push({ s: { r: rowIndex, c: 1 }, e: { r: rowIndex, c: 3 } });
            }

            // Apply center alignment to the merged cells
            var centerStyle = {
              alignment: {
                horizontal: 'right'
              }
            };

            // Apply the center alignment style to the merged cells
            for (var rowIndex = lastRowIndex + 1; rowIndex <= end_index; rowIndex++) {
              for (var columnIndex = 1; columnIndex <= 3; columnIndex++) {
                var cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex });
                if (!excel_data[cellAddress]) {
                  excel_data[cellAddress] = {}; // Create empty object if it doesn't exist
                }
                excel_data[cellAddress].s = centerStyle; // Apply the center alignment style
              }
            }


            // Set the column widths
            var columnWidths = [
              { wpx: 150 },
              { wpx: 150 },

            ];
            excel_data['!cols'] = columnWidths;

            // Add the Barangay Health Stats sheet to the workbook
            XLSX.utils.book_append_sheet(workbook, excel_data, 'Total Disease Stats');

            // Generate the Excel file
            var excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
            var fileBuffer = new ArrayBuffer(excelFile.length);
            var fileArray = new Uint8Array(fileBuffer);
            for (var o = 0; o < excelFile.length; o++) {
              fileArray[o] = excelFile.charCodeAt(o) & 0xff;
            }

            // Save the Excel file
            var currentDate = getMonthName(current_year_mm) + ' ' + current_year_dd + ", " + current_year_yyyy;
            var fileName = 'Total Disease Stats ' + currentDate + '.xlsx';
            saveAs(new Blob([fileBuffer], { type: 'application/octet-stream' }), fileName);

          }

        },
        {
          extend: 'print',
          text: ' PDF',

          title: 'Health Profile Clustering System',

          messageTop: '<br><span>' + table_data + '</span><br><span>' + modifiedSentence + '</span><br><span>Accessed: ' + getMonthName(current_year_mm) + ' ' + current_year_dd + ", " + current_year_yyyy + '</span><br><br>',


          exportOptions: {
            modifier: {
              page: 'current'
            },
            //columns: [0, 1] //r.broj kolone koja se stampa u PDF
            columns: [0, 1],
            // optional space between columns
            columnGap: 1
          },

          customize: function (doc) {
            $(doc.document.body).find('h1').css('font-size', '15pt');
            $(doc.document.body).find('h1').css('text-align', 'center');
            $(doc.document.body).find('table').addClass("table-bordered")
            $(doc.document.body).find('table').css('font-size', '15pt');
            $(doc.document.body).find('table').css('width', '100%');
            $(doc.document.body).css('text-align', 'center')
          }
        }],
    });
    table.buttons().container().appendTo('#barangay_health_statistic_wrapper .col-md-6:eq(0)');

    $('#barangay_health_statistic #th_1 td').each(function () {
      var title = this.id;

      if (title === "Total Health Cases") {
        $(this).html('<input style="width: 180px;" type="text" class="form-control text-end table_search rounded-1 shadow-sm py-0"  placeholder="' + title + '" aria-controls="hp_table">');
      }
      else {
        $(this).html('<input type="text" style="width: 180px;" type="text" class="form-control text-start table_search rounded-1 shadow-sm py-0"  placeholder="' + title + '" aria-controls="hp_table">');
      }

    });

    table.columns().every(function () {
      var table = this;
      $('input', this.footer()).on('keyup change', function () {
        if (table.search() !== this.value) {
          table.search(this.value).draw();
        }
      });
    });

  }

  //to align the data table buttons
  $("#hp_table_wrapper").addClass("row");

  $(".dt-buttons").detach().appendTo('#buttons')
  $(".dt-buttons").addClass("col-lg-2 col-md-12 mb-3");
  $(".dt-buttons").removeClass("flex-wrap");

  $(".dataTables_length").detach().appendTo('#buttons')
  $(".dataTables_length").addClass("col-lg-10 text-lg-end text-center text-md-center text-sm-center col-md-12 mb-3");

  $(".dataTables_info").detach().appendTo('#table_page')
  $(".dataTables_info").addClass("col-lg-6 col-md-12 text-lg-start text-center text-md-center text-sm-center")

  $(".dataTables_paginate ").detach().appendTo('#table_page')
  $(".dataTables_paginate ").addClass("col-lg-6 d-flex justify-content-center justify-content-lg-end justify-content-md-center justify-content-sm-center ")

  $(".buttons-print").addClass("shadow-sm border-2 ");
  $(".buttons-excel").addClass("shadow-sm border-2 ");
  $(".buttons-copy").addClass("shadow-sm border-2 ");

  $(".form-control").addClass("shadow-sm");
  $(".form-select").addClass("shadow-sm");
};
//show data tables end

//filter chart
$("#disease_date_range_btn").click(function()
{
    
     var from_input = $("#disease_range_from").val()
     var to_input = $("#disease_range_to").val()
     var barangay_id = $("#disease_selecte_barangay").val();
     tittle_barangay = $("#disease_selecte_barangay").text();
     var gender_selected = $("#disease_select_gender").val();
     var click_min_age = $("#age_min").val();
     var click_max_age = $("#age_max").val();
   
     var d_from = new Date(from_input)
     var d_to = new  Date(to_input)
     var validator = true

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

     if(barangay_id.trim().length != 0)
     {
         barangay_name = barangay_id;
     }
     else
     {
         barangay_name = "default"
         tittle_barangay = ""
     }
     if(gender_selected.trim().length != 0)
     {
         gender = gender_selected;
     }
     else
     {
         gender = "default"
     }
     

     if(from_input.trim().length === 0)
     {
         $("#disease_range_from").addClass("is-invalid");
     }
     else if(to_input.trim().length === 0)
     {
         $("#disease_range_to").addClass("is-invalid");
     }
     else if(d_from > d_to)
     {
      $("#disease_range_to").addClass("is-invalid");
       validator =false
     }


     if(validator === true)
     {
         query_click = "clicked"
         sort = "names"
         date_range_from = from_input;
         date_range_to = to_input;
         $('#filter-diseases').modal('toggle');

         current_status()
       table.destroy()
       $('tbody tr').remove();
       update_chart()
       $(".dataTables_length").remove();
       $(".dataTables_info").remove();
       $(".dataTables_paginate ").remove();
       load_data_tables()
     }
})
//filter chart end

//sort chart
$("#sort_cases").click(function(e){
 
  if(sort === "names")
  {
    sort = "asc"
  }
  else if(sort === "asc")
  {
    sort = "desc"
  }
  else
  {
    sort = "names"
  }
  table.destroy()
  $('tbody tr').remove();
  update_chart()
  $(".dataTables_length").remove();
  $(".dataTables_info").remove();
  $(".dataTables_paginate ").remove();
  load_data_tables()
 

})
//sort chart end

//back to default record
$("#current_year").click(function()
{
     barangay_name = "default"
     date_range_from = "default";
     date_range_to = "default";
     gender = "default";
     min_age = "default";
     max_age = "default";
     query_click = "unclicked"

     $("#age_min").val("");
     $("#age_max").val("");
     $( "#disease_range_from" ).val(current_year_from);
     $( "#disease_range_from" ).removeClass("is-invalid");
     $( "#disease_range_to" ).val(current_year_to);
     $( "#disease_range_to" ).removeClass("is-invalid");
     var $select = $('#disease_selecte_barangay').selectize();
     var control = $select[0].selectize;
     control.clear();

     var $select = $('#disease_select_gender').selectize();
     var control = $select[0].selectize;
     control.clear();

     sort = "names"

     current_status()
  table.destroy()
  $('tbody tr').remove();
  update_chart()
  $(".dataTables_length").remove();
  $(".dataTables_info").remove();
  $(".dataTables_paginate ").remove();
  load_data_tables()

})
//back to default record end'

// cange color of date field when value is not 0
$("#disease_range_from").change(function()
{

  if($("#disease_range_from").val().trim().length === 0)
  {
    $('#disease_range_from').css(
      {
          'cssText': 'color:#818a99 !important'
      }
      );
  }
  else
  {
    $('#disease_range_from').css(
      {
          'cssText': 'color: #333 !important'
      }
    );

  }

})

$("#disease_range_to").change(function()
{

  if($("#disease_range_to").val().trim().length === 0)
  {
    $('#disease_range_to').css(
      {
        'cssText': 'color:#818a99 !important'
      }
      );
  }
  else
  {
    $('#disease_range_to').css(
      {
          'cssText': 'color: #333 !important'
      }
      );
  }

})
// cange color of date field when value is not 0 end