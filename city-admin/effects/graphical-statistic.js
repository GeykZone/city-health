var disease_type = "default";
var date_range_from = "default";
var date_range_to = "default";
var active_inactive = "default"
var query_click = "unclicked";
var gender = "default";

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
var largets_total = Math.max(...y_value) //get the largest element of the brg resident array
var myColors=[];
var myPoints=[]
var data_set_handler = [];
var tittle_disease_type;

var active_inactive_validator = "default"
var details_title;

var sort = "names";


$(document).ready(function()
{
    $(document).attr("title", "HPCS | Manage Health Profiles");
    $("#nav_hp").addClass("active");
    $("#filter_id").text("Filter Statistic")
    $( "#range_from" ).val(current_year_from);
    $( "#range_to" ).val(current_year_to);
    oneTip()
    current_status()
    select_with_search_box()
    date_range()
    number_of_resident_chart()
})

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
    myOpentip.setContent("Back to current statistic."); // Updates Opentips content

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

  $("#range_from").datepicker({
    dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
    });


    $("#range_to").datepicker({
        dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
        });

}
//date picker end

//tittle page current status
function current_status()
{

    if(query_click != "clicked")
    {
        $("#map_from").text("between "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy + " and ")
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
          $("#map_from").text("between "+getMonthName(array_date_range_form[1]) + ' ' + array_date_range_form[2] + ", "+ array_date_range_form[0] + " and ")
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

    if(active_inactive === "default")
    {
        $("#map_cases").text("health cases documented ")
        $(".details_head_status").text("All documented health cases.")
    }
    else
    {
        $("#map_cases").text("health cases that are currently active and were documented ") 
        $(".details_head_status").text("Health cases that are currently active.") 
    }

    if(gender === "default")
    {
        $("#map_gender").text("")
        $(".details_head_gender").text("Male and female records.")
    }
    else
    {   
        if(gender === "F (Female)")
        {
            $("#map_gender").text(", female records")
            $(".details_head_gender").text("Female records.")
        }
        else if(gender === "M (Male)")
        {
            $("#map_gender").text(", male records")
            $(".details_head_gender").text("Male records.")
        }
          
    }
}
//tittle page cureent status end

//initalize chart values
function chart_array()
{
  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/graphical-statistic.php', 
  {
    total_hp:'set',

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
    x_y_value = data;
    
  });

  console.log(x_y_value)
  
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

    var b =100
    var percentage = b * value;
    percentage = percentage / largets_total;
    percentage = parseFloat(percentage).toFixed(2)

    var data_set_handler_single

    if(value <= 1){
       myColors[index]="#b3e6ffff";
       myPoints[index]=  15;

      data_set_handler.push(data_set_handler_single)
    }
    else if(value <= 2)
    {
      myColors[index]="#80d5ffff";
      myPoints[index]=  20 ;

      data_set_handler.push(data_set_handler_single)
    }
    else if(value <= 4)
    {
      myColors[index]="#4dc4ffff";
      myPoints[index]= 25;

      data_set_handler.push(data_set_handler_single)
    }
    else{
      myColors[index]="#07a3f1ff";
      myPoints[index]=  30;
    }

  });

}
 //initalize chart values end

//number of residents chart
function number_of_resident_chart()
{
  chart_array()
  console.log(x_value)
  const data_sets = [{
    label: "",
    data: yValues,
    backgroundColor: myColors,
    borderColor: "#80d5ffff",
    borderWidth: 1,
    borderRadius: 8,
    pointRadius: myPoints,
    borderSkipped: false,
    barPercentage: 0.8,
    categoryPercentage:0.8,
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

        $("#details_title").text(x_value[current_index])
        var all_diseases_that_occured = xValues[current_index];
        var display_diseases_that_occured = "";
        var details_title;

        if(active_inactive_validator === "default")
        {
            if(yValues[current_index] != 1)
            {
              details_title = "There are "+yValues[current_index]+" health cases in total.";
            }
            else
            {
              details_title = "There is only "+yValues[current_index]+" health case in total";
            }
        }
        else
        {
          if(yValues[current_index] != 1)
          {
            details_title = "There are "+yValues[current_index]+" currently active health cases in total.";
          }
          else
          {
            details_title = "There is only "+yValues[current_index]+" currently active health case in total.";
          }
          
        }
        

        $('.details_content_label').remove();
        $("#details_content_titte").append('<div class="details_content_label border-0 shadow-sm align-middle pt-2 bg-info mb-3 rounded-2 text-white px-2"><label class="form-label">'+details_title+'</label></div>');
        

        //to get the occuring diseases in that area
        $.ajaxSetup({async:false});
        $.getJSON('functions/display-functions/get-occuring-diseases.php', 
        {
          query_click:query_click,

          disease_type:disease_type,
          date_range_from:date_range_from,
          date_range_to:date_range_to,
          active_inactive:active_inactive,
          gender:gender,

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

          $("#details_form").append('<div class="details_list border-0 shadow-sm align-middle pt-2 bg-info mb-3 rounded-2 text-white px-2"><label class="form-label"><span class="fa-solid me-2"></span>'+value+'</label></div>');
      
        });

        $('#show_details').modal('toggle');
      }
    },
    indexAxis: 'x',
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false
        },
        ticks: {
          padding: 10,
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
          padding: 10,
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

                 if(active_inactive_validator === "default")
                 {
                   var modified_label = context.parsed.y+" health cases in total."
                   if(context.parsed.y == 1)
                   {
                     var modified_label = context.parsed.y+" health case in total."
                   }
                 }
                 else
                 {
                   var modified_label = context.parsed.y+" currently active health cases in total."
                   if(context.parsed.y == 1)
                   {
                     var modified_label = context.parsed.y+" currently active health case in total."
                   }
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
  update_chart()
 

})
//sort chart end

//active and all-time cases
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
//active and all-time cases end

//select deseases and gender
$("#select_diseases").change(function(){ 
    
  var hp_selected = $("#select_diseases").val();
  tittle_disease_type = $("#select_diseases").text();

  if(hp_selected.trim().length != 0)
  {
      disease_type = hp_selected;
  }
  else
  {
      disease_type = "default"
      tittle_disease_type = ""
  }
  
});

$("#select_gender").change(function(){ 

  var gender_selected = $("#select_gender").val();
  tittle_gender = $("#select_gender").text();

  if(gender_selected.trim().length != 0)
  {
      gender = gender_selected;
  }
  else
  {
      gender = "default"
      tittle_gender = "";
  }
  
});
//select deseases and gender end

//filter chart
$("#date_range_btn").click(function()
{
    
     var from_input = $("#range_from").val()
     var to_input = $("#range_to").val()

     var d_from = new Date(from_input)
     var d_to = new  Date(to_input)
     var validator = true

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
       validator =false
     }


     if(validator === true)
     {
         query_click = "clicked"
         sort = "names"
         date_range_from = from_input;
         date_range_to = to_input;
         $('#filter-map').modal('toggle');

         if(active_inactive === "default")
         {
          active_inactive_validator = "default"
         }
         else
         {
           active_inactive_validator = "(Active)"
         }

         current_status()
         update_chart()
      
     }
})
//filter chart end

//back to default record
$("#current_year").click(function()
{
 $("#active_only_btn").addClass("d-none")
 $("#all_cases").removeClass("d-none")

     active_inactive = "default"
     active_inactive_validator = "default"
     disease_type = "default"
     date_range_from = "default";
     date_range_to = "default";
     tittle_disease_type = "All Diseases"
     gender = "default";
     query_click = "unclicked"

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

     sort = "names"

     current_status()
     update_chart()

})
//back to default record end'



