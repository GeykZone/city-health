var barangay_name = "default";
var recover_from_disease_type = "default";
var date_range_from = "default";
var date_range_to = "default";
var hp_status = "default"
var gender = "default";
var min_age = "default";
var max_age = "default";
var cause_of_death = "default";
var other_cause = "default";
var query_click = "unclicked";

var recoveries_diseases_title = "";
var other_cause_title = "";
var cause_of_death_title = "";

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
var xx_value =[];
var x_y_value = "";
var xValues = "";
var yValues = ""; 
var largets_total = Math.max(...y_value) //get the largest element of the brg resident array
var myColors=[];
var myPoints=[]
var data_set_handler = [];
var deaths_and_recoveries_title;

var sort = "names";


$(document).ready(function()
{
    $( "#disease_range_from" ).val(current_year_from);
    $( "#disease_range_to" ).val(current_year_to);
    $(document).attr("title", "HPCS | Manage Health Profiles");
    $("#nav_hp").addClass("active");
    oneTip()
    select_with_search_box()
    date_range()
    current_status()
    number_of_resident_chart()
})

//tittle page current status
function current_status()
{

    if(query_click != "clicked")
    {
      $("#map_from").text("between "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy + " and ")
        $("#map_to").text(getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy)

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
        }
        else
        {
          $("#map_from").text("between "+getMonthName(array_date_range_form[1]) + ' ' + array_date_range_form[2] + ", "+ array_date_range_form[0] + " and ")
          $("#map_to").text(getMonthName(array_date_range_to[1]) + ' ' + array_date_range_to[2] + ", "+ array_date_range_to[0])
        }

       
    }

    

    if(barangay_name === "default")
    {
        $("#map_barangay").text("")
    }
    else
    {
        $("#map_barangay").text(" in barangay "+barangay_title)   
    }

    if(recover_from_disease_type === "default")
    {
        $("#map_disease").text("All ")
    }
    else
    {
        $("#map_disease").text("All documented health recoveries from "+recoveries_diseases_title+"") 
      
    }

    if(hp_status === "default" || hp_status === "Recoveries")
    {
        $("#map_cases").text("documented health recoveries from all types of diseases, ")

        if(recover_from_disease_type != "default")
        {
          $("#map_cases").text(", ")
        } 
    }
    else
    {
        $("#map_cases").text("documented deaths, ")

        if(cause_of_death === "Other")
        {  
          if(other_cause === "default")
          { $("#map_disease").text("All ")  
            $("#map_cases").text("documented non-health-related deaths, ")
          }
          else
          {
            $("#map_disease").text("All Non-health-related deaths caused by "+other_cause_title+"") 
            $("#map_cases").text(", ") 
          }
        }
        else if(cause_of_death != "default")
        {
          $("#map_disease").text("All documented deaths caused by "+cause_of_death_title+"") 
          $("#map_cases").text(", ")
        }

    }
    
    if(gender === "default")
    {
        $("#map_gender").text("")
        $(".details_head_gender").text("Male and female records")
    }
    else
    {   
        if(gender === "F (Female)")
        {
            $("#map_gender").text(", female records")
            $(".details_head_gender").text("Female records")
        }
        else if(gender === "M (Male)")
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
  
    $("#disease_range_from").datepicker({
      dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
      });
  
  
      $("#disease_range_to").datepicker({
          dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
          });
  
  }
  //date picker end

  //back to current status if hp_status is = default
  $("#filter_graph").click(function()
  {

    if(hp_status === "default")
    {
        var $select = $("#select_deaths_recoveries").selectize();
        var selectize = $select[0].selectize;
        selectize.setValue(selectize.search("Recoveries").items[0].id);
    }

 })
 //back to current status if hp_status is = default end

 //change recoveries to cause of death if the status is death
 $("#select_deaths_recoveries").change(function()
 {
    if($(this).val() === "Deaths")
    {
        $("#d_t").addClass("d-none")
        $("#co_d").removeClass("d-none")
        
        var $select = $('#disease_select_diseases').selectize();
        var control = $select[0].selectize;
        control.clear();

    }
    else
    {
        $("#d_t").removeClass("d-none")
        $("#co_d").addClass("d-none")
        
        var $select = $('#select_cause_of_death').selectize();
        var control = $select[0].selectize;
        control.clear();

    }
 })
 //change recoveries to cause of death if the status is death end

//change recoveries to cause of death if the status is death
$("#select_cause_of_death").change(function()
{
    if($(this).val() === "Other")
    {
        $("#o_co_d").removeClass("d-none")
    }
    else
    {
        $("#o_co_d").addClass("d-none")

        var $select = $('#select_other_causes').selectize();
        var control = $select[0].selectize;
        control.clear();
    }
})
//change recoveries to cause of death if the status is death end

//initalize chart values
function chart_array()
{
  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/recoveries_and_deaths.php', 
  {
    total_hp:'set',
    query_click:query_click,
    
    recover_from_disease_type:recover_from_disease_type,
    cause_of_death:cause_of_death,
    other_cause:other_cause,

    hp_status:hp_status,
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
}
 //initalize chart values end

//number of residents chart
function number_of_resident_chart()
{
  chart_array()
 // console.log(x_value)

  const data_sets = [{
    label: "",
    data: yValues,
    backgroundColor: "#00ff9d1a",
    pointBackgroundColor: "#2de9aaff",
    pointHoverBackgroundColor: "#2de9aaff",
    borderColor: "#2de9aaff",
    borderWidth: 2,
    //borderRadius: 8,
    pointStyle: "circle",
    pointHitRadius: 2,
    pointRadius: 2,
    hoverRadius:5,
    borderSkipped: true,
    barPercentage: 0.8,
    categoryPercentage:0.8,
    fill: true,
    tension: 0.3
   // stepped: true,
  },]


  //initialize chart
  const ctx = $('#hpChart');
  myChart = new Chart(ctx, {
  type: 'line',
  options: {
   onClick: (e, elements) => {
     if(elements.length > 0) 
     {
       var current_index = elements[0].index;
       deaths_and_recoveries_title = x_value[current_index];
       var all_dates = xx_value[current_index];
       var display_diseases_that_occured = "";
       var details_title;

       if(hp_status === "default" || hp_status === "Recoveries")
       {
          $("#details_title").text(x_value[current_index]+" Health Recoveries Statistic")

          $(".details_head_status").text("All documented health recoveries on "+deaths_and_recoveries_title)

          if(recover_from_disease_type != "default")
          {
            $(".details_head_status").text("All documented health recoveries from "+recoveries_diseases_title+" on "+deaths_and_recoveries_title)  
          }
          else if(barangay_name != "default")
          {
            $(".details_head_status").text("All documented health recoveries from "+deaths_and_recoveries_title+" in barangay "+barangay_title)
          }
          
          if(barangay_name != "default" && recover_from_disease_type != "default")
          {
            $(".details_head_status").text("All documented health recoveries from "+recoveries_diseases_title+" on "+deaths_and_recoveries_title+" in barangay "+barangay_title) 
          }

           if(yValues[current_index] != 1)
           {
             details_title = "There are "+yValues[current_index]+" health recoveries in total.";
           }
           else
           {
            details_title = "There is only "+yValues[current_index]+" health recovery in total.";
           }

           $(".report_labels").text("Recoveries")

           $(".rec_dead").removeClass("bg-danger")
           $(".rec_dead").addClass("bg-success")

           $('.details_content_label').remove();
           $("#details_content_titte").append('<div class="details_content_label border-0 shadow-sm align-middle pt-2 bg-success mb-3 rounded-2 text-white px-2"><label class="form-label">'+details_title+'</label></div>');
       }
       else
       {
        $("#details_title").text(x_value[current_index]+" Deaths Statistic")
         if(yValues[current_index] != 1)
         {
           
           details_title = "There are "+yValues[current_index]+" deaths in total.";
         }
         else
         {
          details_title = "There is only "+yValues[current_index]+" death in total.";
         }
         $(".report_labels").text("Deaths")


        $(".details_head_status").text("All documented deaths on "+deaths_and_recoveries_title)
        if(cause_of_death === "Other")
        { 
          if(yValues[current_index] != 1)
          {
            
            details_title = "There are "+yValues[current_index]+" non-health-related deaths in total.";
          }
          else
          {
           details_title = "There is only "+yValues[current_index]+" non-health-related death in total.";
          }

          $(".report_labels").text("Non-health-related Deaths") 
          if(other_cause === "default")
          {
            $(".details_head_status").text("All documented non-health-related deaths on "+deaths_and_recoveries_title)

            if(barangay_name != "default")
            {
              $(".details_head_status").text("All documented non-health-related deaths on "+deaths_and_recoveries_title+" in barangay "+barangay_title)
            }
          }
          else
          {
            $(".details_head_status").text("All documented non-health-related deaths caused by "+other_cause_title+" on "+deaths_and_recoveries_title)

            if(barangay_name != "default")
            {
              $(".details_head_status").text("All documented non-health-related deaths caused by "+other_cause_title+" on "+deaths_and_recoveries_title+" in barangay "+barangay_title)
            }
          }
        }
        else if(cause_of_death != "default")
        {
          $(".details_head_status").text("All documented deaths caused by "+cause_of_death_title+" on "+deaths_and_recoveries_title) 
          
          if(barangay_name != "default")
          {
            $(".details_head_status").text("All documented deaths caused by "+cause_of_death_title+" on "+deaths_and_recoveries_title+" in barangay "+barangay_title) 
          }
        }
        else if(barangay_name != "default")
        {
          $(".details_head_status").text("All documented deaths on "+deaths_and_recoveries_title+" in barangay "+barangay_title)
        }


         $(".rec_dead").removeClass("bg-success")
         $(".rec_dead").addClass("bg-danger")
         
         $('.details_content_label').remove();
         $("#details_content_titte").append('<div class="details_content_label border-0 shadow-sm align-middle pt-2 bg-danger mb-3 rounded-2 text-white px-2"><label class="form-label">'+details_title+'</label></div>');
       }
       
       
       $.ajaxSetup({async:false});
       $.getJSON('functions/display-functions/get_recoveries_and_deaths.php',
       {
          query_click:query_click,
          
          recover_from_disease_type:recover_from_disease_type,
          cause_of_death:cause_of_death,
          other_cause:other_cause,
      
          hp_status:hp_status,
          barangay_name:barangay_name,
      
          date_range_from:date_range_from,
          date_range_to:date_range_to,
          gender:gender,
      
          max_age:max_age,
          min_age:min_age,
      
          current_year_from:current_year_from,
          current_year_to:current_year_to,

         all_dates: all_dates   
       },     
       function (data, textStatus, jqXHR) 
       {
         display_diseases_that_occured = data

         console.log(display_diseases_that_occured)
       });

       $('.details_list').remove();
       $.each(display_diseases_that_occured, function( index,value ) {

        if(hp_status === "default" || hp_status === "Recoveries")
        {
          $("#details_form").append('<div class="details_list border-0 shadow-sm align-middle pt-2 bg-success mb-3 rounded-2 text-white px-2 d-flex align-items-center"><label class="form-label">'+value+'</label></div>');
        }
        else
        {
          $("#details_form").append('<div class="details_list border-0 shadow-sm align-middle pt-2 bg-danger mb-3 rounded-2 text-white px-2 d-flex align-items-center"><label class="form-label">'+value+'</label></div>');
        }

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

                 if(hp_status === "default" || hp_status === "Recoveries")
                 {
                   var modified_label = context.parsed.y+" health recoveries in total."
                   if(context.parsed.y == 1)
                   {
                     var modified_label = context.parsed.y+" health recovery in total."
                   }
                 }
                 else
                 {
                   var modified_label = context.parsed.y+" deaths in total."
                   if(context.parsed.y == 1)
                   {
                     var modified_label = context.parsed.y+" death in total."
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

$("#hpChart").addClass("rounded-4 pt-4 px-2 border-0 shadow-sm bg-light bg-opacity-50")
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

//filter chart
$("#disease_date_range_btn").click(function()
{
     var from_input = $("#disease_range_from").val()
     var to_input = $("#disease_range_to").val()
     var barangay_id = $("#disease_selecte_barangay").val();
     barangay_title = $("#disease_selecte_barangay").text();
     var recoveries_diseases = $("#disease_select_diseases").val();
     recoveries_diseases_title = $("#disease_select_diseases").text();
     var filter_cause_of_death = $("#select_cause_of_death").val();
     cause_of_death_title = $("#select_cause_of_death").text();
     var filter_other_cause = $("#select_other_causes").val();
     other_cause_title = $("#select_other_causes").val();
     var filter_hp_status = $("#select_deaths_recoveries").val();

     var gender_selected = $("#disease_select_gender").val();
     var click_min_age = $("#age_min").val();
     var click_max_age = $("#age_max").val();

     click_min_age = parseInt(click_min_age);
     click_max_age = parseInt(click_max_age);
   
     var d_from = new Date(from_input)
     var d_to = new  Date(to_input)
     var validator = true

     if(filter_hp_status.trim().length != 0)
     {
        hp_status = filter_hp_status;
     }
     else
     {
        hp_status = "default"
     }

     if(filter_cause_of_death.trim().length != 0)
     {
        cause_of_death = filter_cause_of_death;
     }
     else
     {
        cause_of_death = "default"
     }

     if(filter_cause_of_death === "Other" && filter_other_cause.trim().length === 0)
     {
        other_cause = "default"
     }
     else
     {
        other_cause = filter_other_cause;
     }
     
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

     if(gender_selected.trim().length != 0)
     {
         gender = gender_selected;
     }
     else
     {
         gender = "default"
     }

     if(recoveries_diseases.trim().length != 0)
     {
        recover_from_disease_type = recoveries_diseases;
     }
     else
     {
        recover_from_disease_type = "default"
     }
        
     if(barangay_id.trim().length != 0)
     {
         barangay_name = barangay_id;
     }
     else
     {
         barangay_name = "default"
     }

     if(from_input.trim().length === 0)
     {
         $("#disease_range_from").addClass("is-invalid");
         validator =false
     }
     else if(to_input.trim().length === 0)
     {
         $("#disease_range_to").addClass("is-invalid");
         validator =false
     }
     else if(d_from > d_to)
     {
      $("#disease_range_to").addClass("is-invalid");
      $("#disease_range_to").val("");
       validator =false
     }


     if(validator === true)
     {
         query_click = "clicked"
         sort = "names"
         date_range_from = from_input;
         date_range_to = to_input;

         if( hp_status === "Deaths")
          {            
            myChart.data.datasets[0].backgroundColor = '#ec024869';
            myChart.data.datasets[0].pointBackgroundColor = '#e72777ff';
            myChart.data.datasets[0].pointHoverBackgroundColor = '#e72777ff';
            myChart.data.datasets[0].borderColor = '#e72777ff';

          }
        else
          {
              myChart.data.datasets[0].backgroundColor = '#00ff9d1a';
              myChart.data.datasets[0].pointBackgroundColor = '#2de9aaff';
              myChart.data.datasets[0].pointHoverBackgroundColor = '#2de9aaff';
              myChart.data.datasets[0].borderColor = '#2de9aaff';

          } 
        current_status()
        update_chart()
         $('#filter_recoveries_and_deaths').modal('toggle');
     }
})
//filter chart end

//back to default record
$("#current_year").click(function()
{
 $("#disease_active_only_btn").addClass("d-none")
 $("#disease_all_cases").removeClass("d-none")

     barangay_name = "default"
     date_range_from = "default";
     date_range_to = "default";
     gender = "default";
     min_age = "default";
     max_age = "default";
     query_click = "unclicked"
     recover_from_disease_type = "default";
     cause_of_death = "default";
     other_cause = "default";
     hp_status = "default";


     $("#disease_select_diseases").text();
     $("#age_min").val("");
     $("#age_max").val("");
     $( "#disease_range_from" ).val(current_year_from);
     $( "#disease_range_from" ).removeClass("is-invalid");
     $( "#disease_range_to" ).val(current_year_to);
     $( "#disease_range_to" ).removeClass("is-invalid");

          
     var $select = $('#select_cause_of_death').selectize();
     var control = $select[0].selectize;
     control.clear();

     var $select = $('#select_other_causes').selectize();
     var control = $select[0].selectize;
     control.clear();

     var $select = $('#select_deaths_recoveries').selectize();
     var control = $select[0].selectize;
     control.clear();

     var $select = $('#disease_selecte_barangay').selectize();
     var control = $select[0].selectize;
     control.clear();

     var $select = $('#disease_select_gender').selectize();
     var control = $select[0].selectize;
     control.clear();

     var $select = $('#disease_select_diseases').selectize();
     var control = $select[0].selectize;
     control.clear();

     sort = "names"


     myChart.data.datasets[0].backgroundColor = '#00ff9d1a';
     myChart.data.datasets[0].pointBackgroundColor = '#2de9aaff';
     myChart.data.datasets[0].pointHoverBackgroundColor = '#2de9aaff';
     myChart.data.datasets[0].borderColor = '#2de9aaff';
     current_status()
     update_chart()

})
//back to default record end' 