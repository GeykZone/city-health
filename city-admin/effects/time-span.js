var barangay_name = "default";
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
var xx_value =[];
var x_y_value = "";
var xValues = "";
var yValues = ""; 
var largets_total = Math.max(...y_value) //get the largest element of the brg resident array
var myColors=[];
var myPoints=[]
var data_set_handler = [];

var barangay_title
var disease_title
var active_inactive_validator = "default"
var details_title;
var date_range_title;

var sort = "names";

var min_age = "default";
var max_age = "default";


$(document).ready(function()
{
    $( "#disease_range_from" ).val(current_year_from);
    $( "#disease_range_to" ).val(current_year_to);
    $(document).attr("title", "HPCS | Manage Health Profiles");
    $("#nav_hp").addClass("active");
    select_list() 
    select_for_disease()
    oneTip()
    date_range()
    current_status()
    number_of_resident_chart();
})

//tittle page current status
function current_status()
{

    if(query_click != "clicked")
    {
      $("#map_from").text("from "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy + " to ")
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
          $("#map_from").text("from "+getMonthName(array_date_range_form[1]) + ' ' + array_date_range_form[2] + ", "+ array_date_range_form[0] + " to ")
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

    if(disease_type === "default")
    {
        $("#map_disease").text("All ")
    }
    else
    {
        $("#map_disease").text("All "+disease_title+" ")   
    }

    if(active_inactive === "default")
    {
        $("#map_cases").text("health cases, documented ")
    }
    else
    {
        $("#map_cases").text("health cases that are currently active, and were documented ") 
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
            $(".details_head_age").text("All "+min_age+" years old.")
        }
        else
        {
            $("#map_min_age").text(", minimum age of "+min_age)
            $("#map_max_age").text(", maximum age of "+max_age)
            $(".details_head_age").text("Minimum age of "+min_age+", maximum age of "+max_age+".")
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

$('#disease_select_diseases').selectize
({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});

$(".selectize-control").removeClass("form-control barangay-form")
}
// for select diseases  end
  
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
   $.getJSON('functions/display-functions/time-span.php', 
   {
     total_hp:'set',
 
     query_click:query_click,
     
     disease_type:disease_type,
     barangay_name:barangay_name,
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
     backgroundColor: "#67c2ff1a",
     pointBackgroundColor: "#6cc4f0ff",
     pointHoverBackgroundColor: "#6cc4f0ff",
     borderColor: "#6cc4f0ff",
     borderWidth: 2,
     //borderRadius: 8,
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

        date_range_title =  x_value[current_index];
        $("#details_title").text(x_value[current_index]+" Health Statistic")
        var all_dates = xx_value[current_index];
        var display_diseases_that_occured = "";
        var details_title;
    
        if(active_inactive === "default")
        {
            $(".details_head_status").text("All documented health cases on "+date_range_title)

            if(disease_type != "default")
            {
              $(".details_head_status").text("All documented health cases caused by "+disease_title+" on "+date_range_title)

            }
            else if(barangay_name != "default")
            {
              $(".details_head_status").text("All documented health cases on "+date_range_title+" in barangay "+barangay_title)

            }

            if(barangay_name != "default" && disease_type != "default")
            {
              $(".details_head_status").text("All documented health cases caused by "+disease_title+" on "+date_range_title+" in barangay "+barangay_title)

            }

        }
        else
        {

            $(".details_head_status").text("All documented health cases that are currently active on "+date_range_title)

            if(disease_type != "default")
            {
              $(".details_head_status").text("All documented health cases that are currently active caused by "+disease_title+" on "+date_range_title)

            }
            else if(barangay_name != "default")
            {
              $(".details_head_status").text("All documented health cases that are currently active on "+date_range_title+" in barangay "+barangay_title)

            }

            if(barangay_name != "default" && disease_type != "default")
            {
              $(".details_head_status").text("All documented health cases that are currently active caused by "+disease_title+" on "+date_range_title+" in barangay "+barangay_title)

            }
        }

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
        $("#details_content_titte").append('<div class="details_content_label border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 text-white px-2"><label class="form-label">'+details_title+'</label></div>');
        
        $.ajaxSetup({async:false});
        $.getJSON('functions/display-functions/get-time-span.php',
        {
          query_click:query_click,

          barangay_name:barangay_name,
          disease_type:disease_type,
          date_range_from:date_range_from,
          date_range_to:date_range_to,
          active_inactive:active_inactive,
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
        });
        $('.details_list').remove();
        $.each(display_diseases_that_occured, function( index,value ) {

          $("#details_form").append('<div class="details_list border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 d-flex align-items-center text-white px-2"><label class="form-label">'+value+'</label></div>');
      
        });

        $('#show_details').modal('toggle');
      }
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

//active and all-time cases
$("#disease_active_only_btn").click(function()
{
     $("#disease_active_only_btn").addClass("d-none")
     $("#disease_all_cases").removeClass("d-none")

     active_inactive = "default"

})

$("#disease_all_cases").click(function()
{
  $("#disease_active_only_btn").removeClass("d-none")
  $("#disease_all_cases").addClass("d-none")


     active_inactive = "(Active)"

})
//active and all-time cases end


//filter chart
$("#disease_date_range_btn").click(function()
{
    
     var from_input = $("#disease_range_from").val()
     var to_input = $("#disease_range_to").val()
     var barangay_id = $("#disease_selecte_barangay").val();
     barangay_title = $("#disease_selecte_barangay").text();
     var hp_selected = $("#disease_select_diseases").val();
     disease_title = $("#disease_select_diseases").text();
     var gender_selected = $("#disease_select_gender").val();
     var click_min_age = $("#age_min").val();
     var click_max_age = $("#age_max").val();

     click_min_age = parseInt(click_min_age);
     click_max_age = parseInt(click_max_age);
   
     var d_from = new Date(from_input)
     var d_to = new  Date(to_input)
     var validator = true

     
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

     if(hp_selected.trim().length != 0)
     {
         disease_type = hp_selected;
     }
     else
     {
         disease_type = "default"
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
         $('#filter-time').modal('toggle');

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
 $("#disease_active_only_btn").addClass("d-none")
 $("#disease_all_cases").removeClass("d-none")

     active_inactive = "default"
     active_inactive_validator = "default"
     barangay_name = "default"
     date_range_from = "default";
     date_range_to = "default";
     gender = "default";
     min_age = "default";
     max_age = "default";
     disease_type = "default";
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

     var $select = $('#disease_select_diseases').selectize();
     var control = $select[0].selectize;
     control.clear();

     sort = "names"

     current_status()
     update_chart()

})
//back to default record end' 