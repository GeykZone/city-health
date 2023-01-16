
var table = "";
var select_brgy = "";
var disease_txt = "";
var created_at = new Date();
var dd = String(created_at.getDate()).padStart(2, '0');
var mm = String(created_at.getMonth() + 1).padStart(2, '0');
var yyyy = created_at.getFullYear();
var hp_id_value = "";
var date_range_from = "";
var date_range_to = "";
var query_btn = "unclicked";
var min_age;
var max_age;
var gender;

var from_tittle="";
var to_tittle="";
var dash = ""
var left = ""
var right = "";

$(document).ready(function()
{
    $(document).attr("title", "HPCS | Manage Health Profiles");
    $("#nav_hp").addClass("active");
    $("#filter_id").text("Filter Statistic")

    select_list() 
    oneTip()
    date_range()
    load_data_tables()
})

//tooltip
function oneTip()
{
    var current_year_tooltip = $("#current_year")
    var myOpentip = new Opentip(current_year_tooltip, { tipJoint: "bottom", target:current_year_tooltip, delay:0.50});
    myOpentip.setContent("Refresh Table"); // Updates Opentips content

    $("body").click(function()
    {
      myOpentip.hide()
    })
}
//tooltp end
  
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
  $('select').selectize({
      // maxItems: '1',
      sortField: 'text'
      });
}
// selectize ordinary end
  
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

//show data tables
function load_data_tables()
{
    var ajax_url = "functions/display-functions/tabular-statistic.php";
  
    if ( ! $.fn.DataTable.isDataTable( '#barangay_health_statistic' ) ) { // check if data table is already exist
  
    table = $('#barangay_health_statistic').DataTable({
  
      // "processing": true,
      "deferRender": true,
      "serverSide": true,
      "aoColumns": [ 
        { "sName": "death_cause", "bVisible": true }
      ],
      "ajax": {
          url: ajax_url,
          data: {
            tabular_diseases:"set",
            gender:gender,
            select_brgy:select_brgy,
            date_range_from:date_range_from,
            date_range_to:date_range_to,
            query_btn:query_btn,
            min_age:min_age,
            max_age:max_age
          },
          "dataSrc": function ( json ) {
            console.log(json)
            return json.data;
        }      
        
      },
      order: [[4,'DESC']],

      "language": {
        "info": "Showing _START_ to _END_ of _TOTAL_ entries",
        "infoFiltered":""
      },
      
      "autoWidth": false,
        scrollCollapse: true,
  
      "dom": 'Brltip',      
      "lengthMenu": [[10, 50, 100, 500, 1000], [10, 50, 100, 500, 1000]],
  
      "columns": [
        null,
        {
            render: function(data)
            {
              return '<div class = "text-center pe-3" style="padding-top:2px; padding-bottom:2px;">'+data+'</div>'
            }
      
          },
          {
              render: function(data)
              {
                return '<div class = "text-center pe-3">'+data+'</div>'
              }
        
            },
        {
            render: function(data)
            {
              return '<div class = "text-center pe-3">'+data+'</div>'
            }
      
          },
        {
            render: function(data)
            {
              return '<div class = "text-end pe-3">'+data+'</div>'
            }
      
          }
 
      ],
  
    "buttons": [
      {
          extend: 'copy',
          text: ' COPY',
  
          title: 'Health Profile Clustering System',
  
          messageTop: 'Health Statistics Categorized by Diseases '+left+' '+from_tittle+dash+to_tittle+" "+right+"",
          //className: 'fa fa-solid fa-clipboard',
          
  
          exportOptions: {
          modifier: {
              page: 'current'
          },
            //columns: [0, 1] //r.broj kolone koja se stampa u PDF
            columns: [0,1,2,3,4],
            // optional space between columns
            columnGap: 1
          }
  
      },
      { 
          extend: 'excel',
          text: ' EXCEL',
  
          title: 'Health Profile Clustering System',
  
          messageTop: 'Health Statistics Categorized by Diseases '+left+' '+from_tittle+dash+to_tittle+" "+right+"",
          //className: 'fa fa-solid fa-table',  //<i class="fa-solid fa-clipboard"></i>
          
  
          exportOptions: {
          modifier: {
              page: 'current'
          },
            //columns: [0, 1] //r.broj kolone koja se stampa u PDF
            columns: [0,1,2,3,4],
            // optional space between columns
            columnGap: 1
          }
  
      },
      {
          extend: 'print',
          text: ' PDF',
  
          title: 'Health Profile Clustering System',
  
          messageTop: 'Health Statistics Categorized by Diseases '+left+' '+from_tittle+dash+to_tittle+" "+right+"",
          //className: 'fa fa-print',
          
  
          exportOptions: {
          modifier: {
              page: 'current'
          },
            //columns: [0, 1] //r.broj kolone koja se stampa u PDF
            columns: [0,1,2,3,4],
            // optional space between columns
            columnGap: 1
          },
  
          customize: function ( doc ) {
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
  
        if(title === "Age Range")
        {
        
          $(this).html('<div class="text-center" ><span style = "color:#9eaaad; font-size:13px;" class="me-2"><span class="fa-solid me-2"></span>Age Range</span></div>');
        }
        else if(title === "Gender")
        {
        
          $(this).html('<div class="text-center" ><span style = "color:#9eaaad; font-size:13px;" class="me-2"><span class="fa-solid me-2"></span>Gender</span></div>');
        }
        else if(title === "Barangay")
        {
        
          $(this).html('<div class="text-center pe-2" ><span style = "color:#9eaaad; font-size:13px;" class="me-2"><span class="fa-solid me-2"></span>Barangay</span></div>');
        }
        else
        {
          $(this).html('<input type="text" class="form-control table_search rounded-1 w-100 shadow-sm py-0"  placeholder="'+title+'" aria-controls="hp_table">');
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

//filter date range
$("#disease_date_range_btn").click(function()
{
  var from_input = $("#disease_range_from").val()
  var to_input = $("#disease_range_to").val()
  var click_min_age = $("#age_min").val();
  var click_max_age = $("#age_max").val();
  var filter_gender = $("#disease_select_gender").val();
  var filter_barangay = $("#disease_selecte_barangay").text();

  var d_from = new Date(from_input)
  var d_to = new  Date(to_input)
  var validator = true


  click_min_age = parseInt(click_min_age);
  click_max_age = parseInt(click_max_age);

  if(d_from > d_to)
  {
    $("#range_to").addClass("is-invalid");
    $("#range_to").val("");
    validator =false
  }

  if(!isNaN(click_max_age) && click_min_age > click_max_age)
  {
    $("#age_max").addClass("is-invalid");
    $("#age_max").val("");
    validator =false
  }


  if(validator === true)
  {
        date_range_from = from_input;
        date_range_to = to_input;
        min_age = click_min_age;
        max_age = click_max_age;
        gender = filter_gender;
        select_brgy = filter_barangay;
        query_btn = "clicked";
      

        var result_tittle = "Filtered results for: "
        var results =  [];
        let a = 0

        if(gender != "")
        {
          results[a] = "  Gender: "+gender+""
          a+=1
        }

        if(select_brgy != "")
        {
          results[a] = "  Barangay: "+select_brgy+""
          a+=1
        }

        if(!isNaN(click_min_age))
        {
          results[a] = "  Min Age: "+min_age+""
          a+=1
        }
        if(!isNaN(click_max_age))
        {
          results[a] = "  Max Age: "+max_age+""
          a+=1
        }

        if(date_range_from != "")
        {
          let dateStr = date_range_from;
          let dateObj = new Date(dateStr);
          let readableDate = dateObj.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
          from_tittle = ""+readableDate+""
          results[a]  = "  Min Date: "+readableDate+""
          a+=1
          left = "("
          right = ")";
        }
        if(date_range_to != "")
        {
          let dateStr = date_range_to;
          let dateObj = new Date(dateStr);
          let readableDate = dateObj.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
          to_tittle = ""+readableDate+""
          results[a] = "  Max Date: "+readableDate+""
          a+=1
          left = "("
          right = ")";
        }

        if (results.length > 0) 
        {
          $("#search_result").html("<a><span class='me-2 fw-semibold' >"+result_tittle+"</span><span>"+results+"</span></a>")
          $("#search_result").removeClass("d-none")
        }
        else
        {
          $("#search_result").html("")
          $("#search_result").addClass("d-none")
        }

        if(from_tittle != "" && to_tittle != "")
        {
          dash = " - "

          if(from_tittle === to_tittle)
          {
            to_tittle = ""
            dash = ""
          }
        }


        table.destroy()
        $(".dataTables_length").remove();
        $(".dataTables_info").remove();
        $(".dataTables_paginate ").remove();

        load_data_tables()
        $("#filter-diseases").modal("toggle");
  }

})
//filter date range end

//refresh table back to current data
$("#current_year").click(function()
{
  $("#disease_range_from").val("")
  $("#disease_range_to").val("")
  $("#age_min").val("");
  $("#age_max").val("");
  var $select = $('#disease_select_gender').selectize();
  var control = $select[0].selectize;
  control.clear();
  var $select = $('#disease_selecte_barangay').selectize();
  var control = $select[0].selectize;
  control.clear();
  from_tittle="";
  to_tittle="";
  dash=""
  left = ""
  right = "";

  $("#search_result").html("")
  $("#search_result").addClass("d-none")
 

  query_btn = "unclicked";
  swal.close();

  table.destroy()
  $(".dataTables_length").remove();
  $(".dataTables_info").remove();
  $(".dataTables_paginate ").remove();
  load_data_tables()
})
//refresh table back to current data end


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