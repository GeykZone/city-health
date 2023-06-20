var admin_id = "";
var active_data = "";
var i = 0;
var table = ""; 

$(document).ready(function () {
  
  $(document).attr("title", "HPCS | Manage Users");
  select_with_search_box();
  generate_default_username_password();
  get_admin_table_cell_value();
  load_data_tables();
  opentip_tooltip()
});

//set do some stuff when confiramtion variable is changed
var confirmation = {
  aInternal: 10,
  aListener: function(val) {},
  set a(val) {
    this.aInternal = val;
    this.aListener(val);
  },
  get a() {
    return this.aInternal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
}

confirmation.registerListener(function(val) {
  alert_message();
});
//set do some stuff when confiramtion variable is changed end

function getCurrentDate() {
  var dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Adding 1 and padding with zero if needed
  var day = ('0' + dateObj.getDate()).slice(-2); // Padding with zero if needed
  var currentDate = year + '-' + month + '-' + day;
  return currentDate;
}
function date_into_words(data) {
  var dateObj = new Date(data);
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var month = monthNames[dateObj.getMonth()];
  var day = dateObj.getDate();
  var year = dateObj.getFullYear();
  var currentDate = month + ' ' + day + ', ' + year;
  return currentDate;
}


// for select
function select_with_search_box()
{
  $('select').selectize({
    sortField: 'text'
});

$(".selectize-control").removeClass("form-control barangay-form")
}
// for select  end

//generate default user and password
function generate_default_username_password()
{
  $("#select_barangay").change(function(){ 
    var barangay_name = $("#select_barangay").text();
    barangay_name = barangay_name.replace(/ /g,"_");
    barangay_name = barangay_name.replace(/\./g, "");   
    barangay_name = barangay_name.toLowerCase();

    if(barangay_name.trim().length != 0)
    {
      $("#default_username").val("admin"+"_"+barangay_name);
      $("#default_password").val(barangay_name+":123");
    }
    else
    {
        $("#default_username").val("Please select a barangay");
        $("#default_password").val("Please select a barangay");
    }
    
});
}
//generate default user and password end

//submit new barangay admin
$( "#add_barangay_admin_btn" ).click(function() {
    var barangay_name = $("#select_barangay").text();
    var barangay_id = $("#select_barangay").val();
    var default_username = $("#default_username").val();
    var default_password = $("#default_password").val();

  if (barangay_id.trim().length === 0) //check if value is empty
  {
    $("#select_barangay").addClass("is-invalid");
    $(".selectize-control").addClass("is-invalid");
  }
  else
  {
    $.post("functions/add-functions/add-barangay-admin.php",
    {
      select_barangay: barangay_id,
      barangay_name: barangay_name,
      default_username: default_username,
      default_password: default_password
    },
    function(data, status){
      confirmation.a = data;
      
    });

  }
});
//submit new barangay admin end

//reset barangay admin username and password
$( "#reset_admin" ).click(function() {

  admin_id = admin_id.replace(/ /g,"_"); //remove space
  admin_id = admin_id.replace(/\./g, ""); // remmove period
  admin_id = admin_id.toLowerCase(); 
  
  var reset_username = "admin"+"_"+admin_id;
  var reset_password = admin_id+":123";

  $.post("functions/update-functions/reset-barangay-admin.php",
  {
    admin_id: admin_id,
    reset_username: reset_username,
    reset_password: reset_password
  },
  function(data, status){
    confirmation.a = data;
    
  });

});
//reset barangay admin username and password end

//delete a barangay admin record
$("#delete_barangay_admin_record").click(function()
{

  $.post("functions/delete-functions/delete-barangay-admin.php",
  {
    admin_id: admin_id
  },
  function(data, status){
   confirmation.a = data;
    
  });

})
//delete a barangay admin record end

//activate a barangay admin record
$("#activate_barangay_admin_record").click(function()
{

  $.post("functions/update-functions/activate-barangay-admin.php",
  {
    admin_id: admin_id
  },
  function(data, status){
   confirmation.a = data;
    
  });

})
//activate a barangay admin record end

//deactivate a barangay admin record
$("#deactivate_barangay_admin_record").click(function()
{

  $.post("functions/update-functions/deactivate-barangay-admin.php",
  {
    admin_id: admin_id
  },
  function(data, status){
   confirmation.a = data;
    
  });

})
//deactivate a barangay admin record end

//erase input fields when x button is pressed
//add barangay
$("#close_add_barangay_admin").click(function()
{ 
  $("#default_username").val("Please select a barangay");
  $("#default_password").val("Please select a barangay");
  $("#select_barangay").val("");
  var $select = $('#select_barangay').selectize();
  var control = $select[0].selectize;
  control.clear();
})
//erase input fields when x button is pressed

//trigger error messages
function alert_message()
{
    var toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer) 
    }
    });

    if(confirmation.a == 1)
    {
    $('#add-barangay-admin').modal('toggle');

    $("#default_username").val("Please select a barangay");
    $("#default_password").val("Please select a barangay");
    $("#select_barangay").val("");
    var $select = $('#select_barangay').selectize();
    var control = $select[0].selectize;
    control.clear();

    toastMixin.fire({
    animation: true,
    title: 'A new barangay admin has been added in the list.'
    });
    table.ajax.reload( null, false);
    }
    else if(confirmation.a == 2)
    {
    toastMixin.fire({
    animation: true,
    title: 'An admin is already assigned in the barangay.',
    icon: 'error'
    });
    }
    else if(confirmation.a == 3)
    {
    toastMixin.fire({
    animation: true,
    title: 'A default username and password has been restored.'
    });
    table.ajax.reload( null, false);
    }
    else if(confirmation.a == 4)
    {
    toastMixin.fire({
    animation: true,
    title: 'A barangay admin record has been deleted.'
    });
    table.ajax.reload( null, false);
    }
    else if(confirmation.a == 5)
    {
    toastMixin.fire({
    animation: true,
    title: 'A barangay admin record has been activated.'
    });
    table.ajax.reload( null, false);
    }
    else if(confirmation.a == 6)
    {
    toastMixin.fire({
    animation: true,
    title: 'A barangay admin record has been deactivated.'
    });
    table.ajax.reload( null, false);
    }
}
//trigger error messages

//show data tables
function load_data_tables() {
  
  var today = getCurrentDate()
  var today_date_into_words = date_into_words(today)

  if ( ! $.fn.DataTable.isDataTable( '#admin_table' ) ) { // check if data table is already exist

    table = $('#admin_table').DataTable({
      
      "deferRender": true,
      "dom": 'Brltip',         
      //"processing": true,
      "serverSide": true,
      "ajax": "functions/display-functions/show-barangay-admin.php",  
      scrollCollapse: true,

      "language": {
        "info": "Showing _START_ to _END_ of _TOTAL_ entries",
        "infoFiltered":""
      },

      "columns": [

        null,
        null,
        {
          "targets": 2,
          "render": function ( data, type, row, meta ) {


            if(data === "Admin Deactivated")
            {active_data = data;
              return  "<div class='shadow-sm align-middle bg-dark text-white rounded-2 d-flex justify-content-start justify-content-center'  style='width:11rem'>Admin Deactivated</div> ";
              
            }
            else
            {active_data = data;
              return "<div class='shadow-sm align-middle bg-success text-white rounded-2 d-flex justify-content-start justify-content-center' type='button' style='width:11rem'>Admin Activated</div>";
            }
            
          },
         },
        {
          "defaultContent": "data",
          "targets": 3,
          "render": function ( data, type, row, meta ) {

            if(active_data === "Admin Deactivated")
            {
              return  "<div class='text-end px-1'> <i class='shadow-sm align-middle edit_barangay_value reset_btn fas fa-undo-alt' data-coreui-toggle='modal' href='#reset_barangay' id='update_barangay_value' role='button' ></i> "+
              "<i class='shadow-sm align-middle edit_barangay_value del_btn fa-solid fa-trash-can' href='#delete_barangay_admin' data-coreui-toggle='modal' id='delete_barangay_admin_value' role='button' ></i> "+
              " <i class='shadow-sm align-middle edit_barangay_value act_btn fas fa-unlock' href='#activate_barangay_admin' data-coreui-toggle='modal' id='activate_barangay_admin_value' role='button' ></i>"+
              "</div>"
            }
            else
            {
              return  "<div class='text-end px-1'> <i class='shadow-sm align-middle edit_barangay_value reset_btn fas fa-undo-alt' data-coreui-toggle='modal' href='#reset_barangay' id='update_barangay_value' role='button' ></i> "+
              "<i class='shadow-sm align-middle edit_barangay_value del_btn fa-solid fa-trash-can' href='#delete_barangay_admin' data-coreui-toggle='modal' id='delete_barangay_admin_value' role='button' ></i> "+
              " <i class='shadow-sm align-middle edit_barangay_value deact_btn fas fa-lock' href='#deactivate_barangay_admin' data-coreui-toggle='modal' id='activate_barangay_admin_value' role='button' ></i>"+
              "</div>"
            }
              
          },
           
        }
      ],

      "lengthMenu": [[10, 50, 100, 500, 1000], [10, 50, 100, 500, 1000]],

      //disable the sorting of colomn
      "columnDefs": [ {
        "targets": 3,
        "orderable": false
        } ],
  
      "buttons": [
        {
            extend: 'copy',
            text: ' COPY',
  
            title: 'Health Profile Clustering System',
  
          messageTop: 'List of Barangay Admins\nAccessed: ' + today_date_into_words,
            //className: 'fa fa-solid fa-clipboard',
            
  
            exportOptions: {
            modifier: {
               page: 'current'
            },
             //columns: [0, 1] //r.broj kolone koja se stampa u PDF
              columns: [0,1,2],
              // optional space between columns
              columnGap: 1
            }
  
        },
        { 
            extend: 'excel',
            text: ' EXCEL',
  
            title: 'Health Profile Clustering System',
  
          messageTop: 'List of Barangay Admins City Accessed: ' + today_date_into_words,
            //className: 'fa fa-solid fa-table',  //<i class="fa-solid fa-clipboard"></i>
            
  
            exportOptions: {
            modifier: {
               page: 'current'
            },
             //columns: [0, 1] //r.broj kolone koja se stampa u PDF
              columns: [0,1,2],
              // optional space between columns
              columnGap: 1
            }
  
        },
        {
            extend: 'print',
            text: ' PDF',
  
            title: 'Health Profile Clustering System',
  
          messageTop: 'List of Barangay Admins<br>Accessed: ' + today_date_into_words + "<br><br>",
            //className: 'fa fa-print',
            
  
            exportOptions: {
            modifier: {
               page: 'current'
            },
             //columns: [0, 1] //r.broj kolone koja se stampa u PDF
              columns: [0,1,2],
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
    table.buttons().container().appendTo('#admin_table_wrapper .col-md-6:eq(0)');
    
    $('#admin_table_wrapper #th_1 td').each(function () {
      var title = this.id;

      if(title === "settings" )
      {
      
        $(this).html('<div class="text-end" ><span style = "color:#9eaaad; font-size:13px;" class="me-3"><span class="fa-solid me-2"></span>Settings</span></div>');
      }
      else
      {
        $(this).html('<input style="width: 155px;" type="text" class="form-control table_search rounded-1 shadow-sm py-0"  placeholder="'+title+'" aria-controls="hp_table">');
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
    $("#admin_table_wrapper").addClass("row");

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

//get the table cell value when selected
function get_admin_table_cell_value()
{
  //updating
    $("#admin_table").on('click','#update_barangay_value',function(){

      // get the current row
      var currentRow=$(this).closest("tr");

      var col1=currentRow.find("td:eq(0)").text().trim($(this).text()); // get current row 1st TD value

      admin_id = col1;

  });

//deleting
 $("#admin_table").on('click','#delete_barangay_admin_value',function(){
      // get the current row
      var currentRow=$(this).closest("tr");

      var col1=currentRow.find("td:eq(0)").text().trim($(this).text()); // get current row 1st TD value

      admin_id = col1;

  });

//activating
$("#admin_table").on('click','#activate_barangay_admin_value',function(){
  // get the current row
  var currentRow=$(this).closest("tr");

  var col1=currentRow.find("td:eq(0)").text().trim($(this).text()); // get current row 1st TD value

  admin_id = col1;

});

//deactivating
$("#admin_table").on('click','#deactivate_barangay_value',function(){
  // get the current row
  var currentRow=$(this).closest("tr");

  var col1=currentRow.find("td:eq(0)").text().trim($(this).text()); // get current row 1st TD value

  admin_id = col1;

});
}
//get the table cell value when selected end

//refresh table back to current data
$("#refresh_table").click(function()
{
  swal.close();

  table.destroy()
  $(".dataTables_length").remove();
  $(".dataTables_info").remove();
  $(".dataTables_paginate ").remove();

  load_data_tables()
})
//refresh table back to current data end

//generate a tooltip
function opentip_tooltip()
{
  var refresh_table_tooltip = $("#refresh_table")
  var myOpentip = new Opentip(refresh_table_tooltip, { showOn:"mouseover", tipJoint: "bottom", target:refresh_table_tooltip });
  myOpentip.setContent("Refresh Table"); // Updates Opentips content

  $("body").click(function()
  {
    myOpentip.hide()
  })
}
//generate a tooltip end