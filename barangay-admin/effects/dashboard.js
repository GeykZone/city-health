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

var total_hp_count;

var top_3_disease_name_title;
var top_3_total_disease_title;

var top_3_barangay_name_title;
var top_3_total_barangay_title;

var currentDate = new Date(current_year);
var past7Days = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
var past7Days_dd = String(past7Days.getDate()).padStart(2, '0');
var past7Days_mm = String(past7Days.getMonth() + 1).padStart(2, '0');
var past7Days_yyy = past7Days.getFullYear();

var past7Days_from = past7Days_yyy + '-' + past7Days_mm + '-' + past7Days_dd;
var past7Days_to = current_year_yyyy + '-' + current_year_mm + '-' + current_year_dd;

var disease_type = "default";
var active_inactive = "default"
var query_click = "clicked";
var gender = "default";
var barangay_name = my_barangay_id;
var min_age = "default";
var max_age = "default";

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

$(document).ready(function()
{

    $(document).attr("title", "HPCS | Dashboard");

    $(".sevenDaysFrom").text(getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy)
    $(".sevenDaysTo").text(getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy)

    $(".one_month_from").text(getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy)
    $(".one_month_to").text(getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy)

    total_hp_count_function()
    top_3_diseases_function()

    shurctuMenu()
    newCases()

    monthly_period_hp_total()
    display_total_residents()

    disease_chart()
    timespan_chart()
    rank()
    
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

//top 3 diseases
function top_3_diseases_function()  
{
  var top_3_diseases;
  var top_3_diseases_date_start = getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy
  var top_3_diseases_date_end = getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy

  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    top_3_diseases:'set',
    barangay_id:my_barangay_id,
    top_from:current_year_from,
    top_to:current_year_to
  },     
  function (data, textStatus, jqXHR) 
  {
    top_3_diseases = data;
    
  });

  var textArr = top_3_diseases;
  var newObjectArr = [];

  $.each(textArr,function(index,top_3_diseases){
  
  disease_name = removeLastWord(top_3_diseases)
  disease_name = removeLastWord(disease_name)
  disease_name = disease_name.split('_').join(' ') 

  total_diseases = removeFirstWord(top_3_diseases)
  total_diseases = removeLastWord(total_diseases)

  all_time_total = removeFirstWord(top_3_diseases)
  all_time_total = removeFirstWord(all_time_total)

  var new_output = {
      'disease_name': disease_name,
      'total_diseases': total_diseases,
      'all_time_total': all_time_total,
      'index': index
      }

  newObjectArr.push(new_output);
  });

  const top_3_disease_object = {
      'features': newObjectArr
      };



  // initialization to display markers
  for (var i = 0; i < top_3_disease_object.features.length; i++ ) 
  { 
    const top_3_diseases_results = top_3_disease_object.features[i] 

    var percentage = (top_3_diseases_results.total_diseases / total_hp_count) * 100;
    var progress_color;

    top_3_disease_name_title = top_3_diseases_results.disease_name;

    var disease_array = top_3_disease_name_title.split(', ');

    var all_time_total_percentage = (top_3_diseases_results.total_diseases / top_3_diseases_results.all_time_total) * 100;
    
    // stored in a variable called "disease_array"
    var disease_string = disease_array.join(', ');

    // To add "and" between the last two elements in the array
    disease_string = disease_string.replace(/,([^,]*)$/, ', and$1');

    top_3_total_disease_title = parseInt(percentage);

    if(parseInt(top_3_diseases_results.total_diseases) <= 10)
    {
      progress_color = 'bg-c-green';
    }
    else if (parseInt(top_3_diseases_results.total_diseases) <= 40)
    {
      progress_color = 'bg-c-yellow';
    }
    else if (parseInt(top_3_diseases_results.total_diseases) <= 70)
    {
      progress_color = 'bg-c-orange';
    }
    else
    {
      progress_color = 'bg-c-pink';
    }

    $("#top_three_diseases").append('<tr class=" align-middle "  >'+
    '<td style="min-width:150px;" >'+top_3_diseases_results.disease_name+'</td>'+
    '<td style="min-width:100px;"  class="text-center shortCut_btn" id="top_3_disease_progress'+i+'"><div  >'+parseInt(top_3_total_disease_title).toLocaleString('en-US')+'%</div></td>'+
    '<td style="min-width:90px;"  class="text-center shortCut_btn" id="top_3_disease_infect'+i+'"><div class="'+progress_color+' rounded-3 text-light text-center" >'+parseInt(top_3_diseases_results.total_diseases).toLocaleString('en-US')+' Individuals</div></td>'+
    '<td style="min-width:90px;"  class="text-end shortCut_btn" id="top_3_disease_increase'+i+'">'+parseInt(all_time_total_percentage).toLocaleString('en-US')+'% </td></tr>');

    var current_year_tooltip = $("#top_3_disease_progress"+i+"")
    var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
    borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
    myOpentip.setContent("From "+top_3_diseases_date_start+" to "+top_3_diseases_date_end+", "+parseInt(top_3_total_disease_title).toLocaleString('en-US')+"% of health cases in barangay "+my_barangay_name+", Oroquieta City were caused by "+disease_string+""); // Updates Opentips content

    var current_year_tooltip = $("#top_3_disease_infect"+i+"")
    var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
    borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
    myOpentip.setContent("A total of "+parseInt(top_3_diseases_results.total_diseases).toLocaleString('en-US')+" individuals in barangay "+my_barangay_name+", Oroquieta City were infected with "+disease_string+" from "+top_3_diseases_date_start+" to "+top_3_diseases_date_end+""); // Updates Opentips content

    var current_year_tooltip = $("#top_3_disease_increase"+i+"")
    var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
    borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
    myOpentip.setContent("From "+top_3_diseases_date_start+" to "+top_3_diseases_date_end+", the number of health cases caused by "+disease_string+" in barangay "+my_barangay_name+", Oroquieta City, increased by "+parseInt(all_time_total_percentage).toLocaleString('en-US')+"%"); // Updates Opentips content
  }


}
//top 3 diseases end

//total hp count
function total_hp_count_function()
{
  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    total_hp:'set',
    barangay_id:my_barangay_id,
    top_from:current_year_from,
    top_to:current_year_to
  },     
  function (data, textStatus, jqXHR) 
  {
    total_hp_count = data;
    
  });

}
//total hp count end

//shorctuts
function shurctuMenu()
{
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
    location.href = 'time-span.php';
  })

  
  $("body").click(function()
  {
    disease_statistic_shorcut.hide()
    timespan_statistic_shorcut.hide()
  })
  
}
//shortcuts end

//new cases
function newCases()
{
  
  $(".today").text(getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy)
  var newCases_variable

  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    newCases:'set',
    barangay_id:my_barangay_id,
    top_from:past7Days_from,
    top_to:past7Days_to
  },     
  function (data, textStatus, jqXHR) 
  {
    newCases_variable = data;
  });

  var color_changer

  if (parseInt(newCases_variable) <= 10)
  {
    color_changer = 'bg-c-green'
  }
  else if(parseInt(newCases_variable) <= 40)
  {
    color_changer = 'bg-c-yellow'
  }
  else if(parseInt(newCases_variable) <= 70)
  {
    color_changer = 'bg-c-orange'
  }
  else
  {
    color_changer = 'bg-c-pink'

  }

  $("#new_health_cases").removeClass('bg-c-green')
  $("#new_health_cases").addClass(color_changer)

   

  $("#total_new_cases").text(parseInt(newCases_variable).toLocaleString('en-US'));

  if(parseInt(newCases_variable)>0)
  {
    $("#newCasesPercent").text("As of "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(newCases_variable).toLocaleString('en-US')+
    " new health cases reported in barangay "+my_barangay_name+", Oroquieta City");

    if(parseInt(newCases_variable) === 1)
    {
      $("#newCasesPercent").text("As of "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", only "+parseInt(newCases_variable).toLocaleString('en-US')+
      " new health case has been reported in barangay "+my_barangay_name+", Oroquieta City");
    }
  }
  else
  {
    $("#newCasesPercent").text("As of "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health cases reported in barangay "+my_barangay_name+", Oroquieta City");
  }
 

  $('.click_to_see_more').text("(Click to see more details)");

  $("#new_health_cases_btn").click(function(){

    var details_for_newCases;

    if(parseInt(newCases_variable)>0)
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 text-white px-2"><label class="form-label">'+"As of "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(newCases_variable).toLocaleString('en-US')+
      " new health cases reported in barangay "+my_barangay_name+", Oroquieta City"+'</label></div>');

      if(parseInt(newCases_variable) === 1)
      {
        $('.generated_report_content').remove();
        $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 text-white px-2"><label class="form-label">'+"As of "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there has been only "+parseInt(newCases_variable).toLocaleString('en-US')+
        " new health case reported in barangay "+my_barangay_name+", Oroquieta City"+'</label></div>');  
      }
    }
    else
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 text-white px-2"><label class="form-label">'+"As of "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health cases reported in barangay "+my_barangay_name+", Oroquieta City"+'</label></div>');
    }

   

    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_top_3.php', 
    {
      details_for_newCases:'set',
      barangay_id:my_barangay_id,
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

//total hp in monthly period
function monthly_period_hp_total()
{ 
  var mark
  var cluster
  var tag
  var indicator
  var indicator_tag
  var case_text

  if(parseInt(total_hp_count) <= 10)
  {
      mark= 'green';
      cluster = 'Low'
      tag = 'bg-c-green'
      indicator = 'bg-c-dark_green'
      indicator_tag = 'Low'
  }
  else if(parseInt(total_hp_count) <= 40)
  {
      mark = 'yellow';
      cluster = 'Moderate'
      tag = 'bg-c-yellow'
      indicator = 'bg-c-dark_yellow'
      indicator_tag = 'Moderate'

  }
  else if(parseInt(total_hp_count) <= 70)
  {
      mark = 'orange';
      cluster = 'High'
      tag = 'bg-c-orange'
      indicator = 'bg-c-dark_orange'
      indicator_tag = 'High'
  }
  else
  {
      mark= 'red';
      cluster = 'Critical'
      tag = 'bg-c-pink'
      indicator = 'bg-c-dark_pink'
      indicator_tag = 'Critical'
  }

 

  if(parseInt(total_hp_count) <= 1)
  {
    case_text = ' Total Health Case'
  }
  else if (parseInt(total_hp_count) > 1)
  {
    case_text = ' Total Health Cases'
  }
  $("#hp_total_for_one_month").text( parseInt(total_hp_count).toLocaleString('en-US')+case_text)


  $("#marker_type").addClass(mark);
  $("#cluster_tag").addClass(tag);
  $("#Indicataor").addClass(indicator);
  $("#indicator_tag").text(indicator_tag)

  var totalCases_variable

  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    totalCases:'set',
    barangay_id:my_barangay_id,
    top_from:current_year_from,
    top_to:current_year_to
  },     
  function (data, textStatus, jqXHR) 
  {
    totalCases_variable = data;
  });

  
  var color_changer

  if (parseInt(totalCases_variable) <= 10)
  {
    color_changer = 'bg-c-green'
  }
  else if(parseInt(totalCases_variable) <= 40)
  {
    color_changer = 'bg-c-yellow'
  }
  else if(parseInt(totalCases_variable) <= 70)
  {
    color_changer = 'bg-c-orange'
  }
  else
  {
    color_changer = 'bg-c-pink'

  }

  $("#total_health_cases").addClass(color_changer)

  $("#total_cases").text(parseInt(totalCases_variable).toLocaleString('en-US'));

  if(parseInt(totalCases_variable)>0)
  {
    $("#casesPercent").text("From "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(totalCases_variable).toLocaleString('en-US')+
    " total health cases reported in barangay "+my_barangay_name+", Oroquieta City");

    if(parseInt(totalCases_variable) === 1)
    {
      $("#casesPercent").text("From "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", only "+parseInt(newCases_variable).toLocaleString('en-US')+
      " total health case has been reported in barangay "+my_barangay_name+", Oroquieta City");
    }
  }
  else
  {
    $("#casesPercent").text("From "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no health cases reported in barangay "+my_barangay_name+", Oroquieta City");
  }

  $("#total_health_cases_btn").click(function(){

    var details_for_totalCases;

    if(parseInt(totalCases_variable)>0)
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(totalCases_variable).toLocaleString('en-US')+
      " health cases reported in barangay "+my_barangay_name+', Oroquieta City</label></div>');

      if(parseInt(totalCases_variable) === 1)
      {
        $('.generated_report_content').remove();
        $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there has been only "+parseInt(totalCases_variable).toLocaleString('en-US')+
        " health case reported in barangay "+my_barangay_name+', Oroquieta City</label></div>');  
      }
    }
    else
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 '+color_changer+' mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no health cases reported in barangay "+my_barangay_name+', Oroquieta City</label></div>');
    }

   

    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_top_3.php', 
    {
      details_for_totalCases:'set',
      barangay_id:my_barangay_id,
      top_from:current_year_from,
      top_to:current_year_to
    },     
    function (data, textStatus, jqXHR) 
    {
      details_for_totalCases = data;
    });

    console.log(details_for_totalCases)

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
//total hp in monthly period end

//display total number of residents
function display_total_residents()
{
  var display_total_residents_variable

  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    display_total_residents:'set',
    barangay_id:my_barangay_id,
    top_from:current_year_from,
    top_to:current_year_to
  },     
  function (data, textStatus, jqXHR) 
  {
    display_total_residents_variable = data;
    
  });

  $("#total_resident_number").text(parseInt(display_total_residents_variable).toLocaleString())
  $("#year").text(current_year_yyyy)
  $("#resident_info").text("As of the present, the total number of residents living in barangay "+my_barangay_name+", Oroquieta City is recorded to be "+parseInt(display_total_residents_variable).toLocaleString()+" individuals.")
  $("#total_residents").click(function()
  {
    location.href = 'manage-resident.php';
  })

}
//display total number of residents end

//initalize disease_chart_data()
function  disease_chart_data()
{

$.getJSON('functions/display-functions/graphical-statistic-diseases.php', 
{
  total_hp:'set',

  query_click:query_click,
  
  barangay_name:barangay_name,
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
    backgroundColor: "#67c2ff00",
    pointBackgroundColor: disease_chart_color,
    pointHoverBackgroundColor: disease_chart_color,
    borderColor: disease_chart_color,
    borderWidth: 2,
    borderRadius: 8,
    pointRadius: disease_chart_points,
    hoverRadius:disease_chart_points,
    borderSkipped: false,
    barPercentage: 0.8,
    categoryPercentage:0.8,
    tension: 0.3,
    fill: true,
   // stepped: true,
  },]


  //initialize chart
  const ctx = $('#hpChart_disease');
  myChart = new Chart(ctx, {
  type: 'line',
  options: {
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
               return ""
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
          titleMarginBottom: 3
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
     
     disease_type:'default',
     barangay_name:barangay_name,
     date_range_from:date_range_from,
     date_range_to:date_range_to,
     gender:'default',
     max_age:'default',
     min_age:'default',
 
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
                return ""
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
           titleMarginBottom: 3
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

 function rank()
 {

  var top_3_barangays;
  var top_3_diseases_date_start = getMonthName(one_month_mm) + ' ' + one_month_dd+', ' + one_month_yyy
  var top_3_diseases_date_end = getMonthName(current_year_mm) + ' ' + current_year_dd + ", "+ current_year_yyyy

  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    top_3_barangays:'set',
    barangay_id:"set",
    top_from:current_year_from,
    top_to:current_year_to
  },     
  function (data, textStatus, jqXHR) 
  {
    top_3_barangays = data;
    
  });

  top_3_barangays = top_3_barangays.map(elem => elem.toLowerCase())
  var barangay_name = my_barangay_name.toLowerCase();

  console.log(barangay_name)

  var index = $.inArray(barangay_name, top_3_barangays);
  if (index !== -1) {
  var rank = index + 1;

  $("#rank").text("Rank No. "+ rank)
  $("#rank").removeClass("d-none")
  var current_year_tooltip = $("#rank")
  var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
  borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
  myOpentip.setContent("From "+top_3_diseases_date_start+" to "+top_3_diseases_date_end+", barangay "+my_barangay_name+", Oroquieta City is Rank no. "+rank+" in the top 3 barangays in oroquieta with the highest number of health cases "); // Updates Opentips content

  } else {
  
  $("#rank").text("")
  $("#rank").addClass("d-none")
  }

 

  

 }