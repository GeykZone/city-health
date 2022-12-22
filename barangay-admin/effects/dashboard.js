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
    newDeaths()
    newRecoveries()
    monthly_period_hp_total()
    display_total_residents()
    
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

  console.log(top_3_diseases)

  var textArr = top_3_diseases;
  var newObjectArr = [];

  $.each(textArr,function(index,top_3_diseases){
  
  disease_name = removeLastWord(top_3_diseases)
  disease_name = disease_name.split('_').join(' ') 

  total_diseases = removeFirstWord(top_3_diseases)

  var new_output = {
      'disease_name': disease_name,
      'total_diseases': total_diseases,
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
    top_3_total_disease_title = parseInt(percentage);

    if(i === 0)
    {
      progress_color = 'bg-c-pink';
    }
    else if (i === 1)
    {
      progress_color = 'bg-c-orange';
    }
    else
    {
      progress_color = 'bg-c-yellow';
    }

    $("#top_three_diseases").append('<tr class=" align-middle"><td style="min-width:150px;">'+top_3_diseases_results.disease_name+'</td><td style="min-width:300px;"><div id="top_3_disease_progress'+i+'" class="progress shortCut_btn"><div class="progress-bar '+progress_color+' rounded-5" role="progressbar" style="width: '+parseInt(top_3_total_disease_title).toLocaleString('en-US')+'%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+top_3_total_disease_title+'%</div></div></td><td class="text-end" style="min-width:100px;">'+parseInt(top_3_diseases_results.total_diseases).toLocaleString('en-US')+' Individuals</td></tr>');

    var current_year_tooltip = $("#top_3_disease_progress"+i+"")
    var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.01, 
    borderRadius:20,borderColor:'#fff',stemLength:10,stemBase:20,extends:"infor_details",hideDelay:0.01});
    myOpentip.setContent("Approximately, from "+top_3_diseases_date_start+" to "+top_3_diseases_date_end+", "+parseInt(top_3_total_disease_title).toLocaleString('en-US')+"% of health cases in barangay "+my_barangay_name+" were caused by "+top_3_disease_name_title+""); // Updates Opentips content
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
  var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.50});
  myOpentip.setContent("Disease Statistic chart shortcut"); // Updates Opentips content
  $("#disease_statistic_shorcut").click(function()
  {
    location.href = 'graphical-statistic-disease.php';
  })

  var current_year_tooltip = $("#timespan_statistic_shorcut")
  var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.50});
  myOpentip.setContent("Time-span chart shortcut"); // Updates Opentips content
  $("#timespan_statistic_shorcut").click(function()
  {
    location.href = 'time-span.php';
  })
  
  var current_year_tooltip = $("#rec_death_statistic_shorcut")
  var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "top", target:current_year_tooltip, delay:0.50});
  myOpentip.setContent("Recoveries & Deaths chart shortcut"); // Updates Opentips content
  $("#rec_death_statistic_shorcut").click(function()
  {
    location.href = 'recoveries_and_deaths.php';
  })
  
}
//shortcuts end

//new cases
function newCases()
{
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

  $("#total_new_cases").text(parseInt(newCases_variable).toLocaleString('en-US'));

  if(parseInt(newCases_variable)>0)
  {
    $("#newCasesPercent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(newCases_variable).toLocaleString('en-US')+
    " new health cases reported in barangay "+my_barangay_name);

    if(parseInt(newCases_variable) === 1)
    {
      $("#newCasesPercent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", only "+parseInt(newCases_variable).toLocaleString('en-US')+
      " new health case has been reported in barangay "+my_barangay_name);
    }
  }
  else
  {
    $("#newCasesPercent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health cases reported in barangay "+my_barangay_name);
  }
 

  $('.click_to_see_more').text("(Click to see more details)");

  $("#new_health_cases_btn").click(function(){

    var details_for_newCases;

    if(parseInt(newCases_variable)>0)
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-yellow mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(newCases_variable).toLocaleString('en-US')+
      " new health cases reported in barangay "+my_barangay_name+'</label></div>');

      if(parseInt(newCases_variable) === 1)
      {
        $('.generated_report_content').remove();
        $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-yellow mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there has been only "+parseInt(newCases_variable).toLocaleString('en-US')+
        " new health case reported in barangay "+my_barangay_name+'</label></div>');  
      }
    }
    else
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-yellow mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health cases reported in barangay "+my_barangay_name+'</label></div>');
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
    $(".dashboard_reports_modal").addClass("bg-c-yellow")
    $("#details_title").text("New Health Cases")
    $('.new_health_icon').remove();
    $("#header_icon").append('<span style="width: 15px; height:15px; color:#ffff;" class="new_health_icon fa-solid"></span>')

    $('.new_health_cases_list').remove();
    $.each(details_for_newCases, function( index,value ) {

      $("#details_form").append('<div  class="new_health_cases_list border-0 shadow-sm align-middle pt-2 bg-c-yellow mb-3 rounded-2 d-flex align-items-center text-white px-2"><label class="form-label">'+value+'</label></div>');
  
    });

    $('#show_details').modal('toggle')
  })

}
//new cases end

//new deaths
function newDeaths()
{
  var new_deaths_variable;

  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    newDeaths:'set',
    barangay_id:my_barangay_id,
    top_from:past7Days_from,
    top_to:past7Days_to
  },     
  function (data, textStatus, jqXHR) 
  {
    new_deaths_variable = data;
  });

  $("#total_new_deaths").text(parseInt(new_deaths_variable).toLocaleString('en-US'));

  if(parseInt(new_deaths_variable)>0)
  {
    $("#newDeathsPercent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(new_deaths_variable).toLocaleString('en-US')+
    " new health-related deaths reported in barangay "+my_barangay_name);

    if(parseInt(new_deaths_variable) === 1)
    {
      $("#newDeathsPercent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", only "+parseInt(new_deaths_variable).toLocaleString('en-US')+
    " new health-related death has been reported in barangay "+my_barangay_name);
    }
  }
  else
  {
    $("#newDeathsPercent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health-related deaths reported in barangay "+my_barangay_name);
  }

  $('.click_to_see_more').text("(Click to see more details)");

  $("#new_deaths_btn").click(function(){

    var details_for_newDeaths;

    if(parseInt(new_deaths_variable)>0)
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-pink mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(new_deaths_variable).toLocaleString('en-US')+
      " new health-related deaths reported in barangay "+my_barangay_name+'</label></div>');

      if(parseInt(new_deaths_variable) === 1)
      {
        $('.generated_report_content').remove();
        $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-pink mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", only "+parseInt(new_deaths_variable).toLocaleString('en-US')+
        " new health-related death has been reported in barangay "+my_barangay_name+'</label></div>');  
      }
    }
    else
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-pink mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health-related deaths reported in barangay "+my_barangay_name+'</label></div>');
    }

   
    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_top_3.php', 
    {
      details_for_newDeaths:'set',
      barangay_id:my_barangay_id,
      top_from:past7Days_from,
      top_to:past7Days_to
    },     
    function (data, textStatus, jqXHR) 
    {
      details_for_newDeaths = data;
    });

    $("#report_lbl").text("List of New Health-related Deaths")
    $(".dashboard_reports_modal").removeClass("bg-c-pink")
    $(".dashboard_reports_modal").removeClass("bg-c-yellow")
    $(".dashboard_reports_modal").removeClass("bg-c-green")
    $(".dashboard_reports_modal").addClass("bg-c-pink")
    $("#details_title").text("New Health-related Deaths")
    $('.new_health_icon').remove();
    $("#header_icon").append('<span style="width: 15px; height:15px; color:#ffff;" class="new_health_icon fa-solid"></span>')

    $('.new_health_cases_list').remove();
    $.each(details_for_newDeaths, function( index,value ) {

      $("#details_form").append('<div  class="new_health_cases_list border-0 shadow-sm align-middle pt-2 bg-c-pink mb-3 rounded-2 d-flex align-items-center text-white px-2"><label class="form-label">'+value+'</label></div>');
  
    });

    $('#show_details').modal('toggle')
  })
}
//new deaths end

//new recoveries
function newRecoveries()
{

  var newRecoveries_variable;

  $.ajaxSetup({async:false});
  $.getJSON('functions/display-functions/get_top_3.php', 
  {
    newRecoveries:'set',
    barangay_id:my_barangay_id,
    top_from:past7Days_from,
    top_to:past7Days_to
  },     
  function (data, textStatus, jqXHR) 
  {
    newRecoveries_variable = data;
  });

 
  $("#total_newRecoveries").text(parseInt(newRecoveries_variable).toLocaleString('en-US'));

  
  if(parseInt(newRecoveries_variable)>0)
  {
    $("#newRecoveries_percent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(newRecoveries_variable).toLocaleString('en-US')+
    " new health recoveries reported in barangay "+my_barangay_name);

    if(parseInt(newRecoveries_variable) === 1)
    {
      $("#newRecoveries_percent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there has been only "+parseInt(newRecoveries_variable).toLocaleString('en-US')+
      " new health recovery reported in barangay "+my_barangay_name);
    }
  }
  else
  {
    $("#newRecoveries_percent").text("From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health recoveries reported in barangay "+my_barangay_name);
  }
 
  $('.click_to_see_more').text("(Click to see more details)");

  $("#new_recoveries_btn").click(function(){

    var details_for_recoveries;

    if(parseInt(newRecoveries_variable)>0)
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-green mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there have been "+parseInt(newRecoveries_variable).toLocaleString('en-US')+
      " new health recoveries reported in barangay "+my_barangay_name+'</label></div>');

      if(parseInt(newRecoveries_variable) === 1)
      {
        $('.generated_report_content').remove();
        $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-green mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", only "+parseInt(newRecoveries_variable).toLocaleString('en-US')+
        " new health recovery has been reported in barangay "+my_barangay_name+'</label></div>');
      }
    }
    else
    {
      $('.generated_report_content').remove();
      $(".generated_report").append('<div class="generated_report_content border-0 shadow-sm align-middle pt-2 bg-c-green mb-3 rounded-2 text-white px-2"><label class="form-label">'+"From "+getMonthName(past7Days_mm) + ' ' + past7Days_dd+', ' + past7Days_yyy+" to "+getMonthName(current_year_mm) + ' ' + current_year_dd+', ' + current_year_yyyy+", there were no new health recoveries reported in barangay "+my_barangay_name+'</label></div>');
    }

   
    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get_top_3.php', 
    {
      details_for_recoveries:'set',
      barangay_id:my_barangay_id,
      top_from:past7Days_from,
      top_to:past7Days_to
    },     
    function (data, textStatus, jqXHR) 
    {
      details_for_recoveries = data;
    });

    $("#report_lbl").text("List of New Health Recoveries")
    $(".dashboard_reports_modal").removeClass("bg-c-pink")
    $(".dashboard_reports_modal").removeClass("bg-c-yellow")
    $(".dashboard_reports_modal").removeClass("bg-c-green")
    $(".dashboard_reports_modal").addClass("bg-c-green")
    $("#details_title").text("New Health Recoveries")
    $('.new_health_icon').remove();
    $("#header_icon").append('<span style="width: 15px; height:15px; color:#ffff;" class="new_health_icon fa-solid"></span>')

    $('.new_health_cases_list').remove();
    $.each(details_for_recoveries, function( index,value ) {

      $("#details_form").append('<div  class="new_health_cases_list border-0 shadow-sm align-middle pt-2 bg-c-green mb-3 rounded-2 d-flex align-items-center text-white px-2"><label class="form-label">'+value+'</label></div>');
  
    });

    $('#show_details').modal('toggle')
  })

}
//new recoveries end

//total hp in monthly period
function monthly_period_hp_total()
{ 
  var mark
  var cluster
  var tag
  var indicator
  var indicator_tag
  var case_text

  if(total_hp_count <= 1)
  {
      mark= 'green';
      cluster = 'Low'
      tag = 'bg-c-green'
      indicator = 'bg-c-dark_green'
      indicator_tag = 'Low'
  }
  else if(total_hp_count <= 2)
  {
      mark = 'yellow';
      cluster = 'Moderate'
      tag = 'bg-c-yellow'
      indicator = 'bg-c-dark_yellow'
      indicator_tag = 'Moderate'

  }
  else if(total_hp_count <= 3)
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

 

  if(total_hp_count <= 1)
  {
    case_text = ' Total Health Case'
  }
  else if (total_hp_count > 1)
  {
    case_text = ' Total Health Cases'
  }
  $("#hp_total_for_one_month").text( parseInt(total_hp_count).toLocaleString('en-US')+case_text)


  $("#marker_type").addClass(mark);
  $("#cluster_tag").addClass(tag);
  $("#Indicataor").addClass(indicator);
  $("#indicator_tag").text(indicator_tag)

  $("#Indicataor").click(function(){

    Cookies.set('dashboard_month_from', date_range_from)
    Cookies.set('dashboard_month_to', date_range_to)
    location.href = 'manage-hp.php';

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

  $("#total_residents").click(function()
  {
    location.href = 'manage-resident.php';
  })

}
//display total number of residents end