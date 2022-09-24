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
  $("#admin_table_wrapper").addClass("d-none");
  load_progress_bar();
});

//progress bar
function load_progress_bar()
{
  setInterval(move())
  setTimeout( function()
  {
    $("#myBar").text("Table Loaded Successfully!");
    setTimeout(function(){
      $("#myProgress").addClass("d-none");
      $("#admin_table").removeClass("d-none");
      $("#admin_table_wrapper").removeClass("d-none");
      $("#add_admin").removeClass("d-none");
    },800);
  },3000)
}

function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 10;
    var id = setInterval(frame, 30);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML ="Loading " + width  + "%";
      }
    }
  }
}
//progress bar end

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

// for select
function select_with_search_box()
{
  $('select').selectize({
    sortField: 'text'
});
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
        $("#default_username").val("Please select a barangay.");
        $("#default_password").val("Please select a barangay.");
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
  }
  else
  {
    $.post("functions/add-barangay-admin.php",
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

  $.post("functions/reset-barangay-admin.php",
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

  $.post("functions/delete-barangay-admin.php",
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

  $.post("functions/activate-barangay-admin.php",
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

  $.post("functions/deactivate-barangay-admin.php",
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
  $("#default_username").val("Please select a barangay.");
  $("#default_password").val("Please select a barangay.");
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

  $("#default_username").val("Please select a barangay.");
  $("#default_password").val("Please select a barangay.");
  $("#select_barangay").val("");
  var $select = $('#select_barangay').selectize();
  var control = $select[0].selectize;
  control.clear();
  
  $(".admin_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#admin_table_paginate").addClass("d-none");
  $("#admin_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");
  toastMixin.fire({
    animation: true,
    title: 'A new barangay admin has been added in the list.'
  });
  setTimeout(function(){
   
    $("#myBar").text("Table Updated Successfully!");
    setTimeout(function(){
      table.ajax.reload( null, false);
      $("#admin_table_paginate").removeClass("d-none");
      $("#admin_table_info").removeClass("d-none");
      $("#myProgress").addClass("d-none");
      $(".barangay_table_is_loading").addClass("d-none");
      $(".edit_barangay_value").removeClass("d-none");
    },600);
  
  },3000);
}
else if(confirmation.a == 2)
{
  toastMixin.fire({
    animation: true,
    title: 'An admin is already assigned in the barangay.',
    icon: 'error'
  });
  setTimeout(function(){
  },3000);
}
else if(confirmation.a == 3)
{
  $(".admin_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#admin_table_paginate").addClass("d-none");
  $("#admin_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");
  toastMixin.fire({
    animation: true,
    title: 'A default username and password has been restored.'
  });
  setTimeout(function(){
   
    $("#myBar").text("Table Updated Successfully!");
    setTimeout(function(){
      table.ajax.reload( null, false);
      $("#admin_table_paginate").removeClass("d-none");
      $("#admin_table_info").removeClass("d-none");
      $("#myProgress").addClass("d-none");
      $(".barangay_table_is_loading").addClass("d-none");
      $(".edit_barangay_value").removeClass("d-none");
    },600);
  
  },3000);
}
else if(confirmation.a == 4)
{
  $(".admin_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#admin_table_paginate").addClass("d-none");
  $("#admin_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");
  toastMixin.fire({
    animation: true,
    title: 'A barangay admin record has been deleted.'
  });
  setTimeout(function(){
   
    $("#myBar").text("Table Updated Successfully!");
    setTimeout(function(){
      table.ajax.reload( null, false);
      $("#admin_table_paginate").removeClass("d-none");
      $("#admin_table_info").removeClass("d-none");
      $("#myProgress").addClass("d-none");
      $(".barangay_table_is_loading").addClass("d-none");
      $(".edit_barangay_value").removeClass("d-none");
    },600);
  
  },3000);
}
else if(confirmation.a == 5)
{
  $(".admin_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#admin_table_paginate").addClass("d-none");
  $("#admin_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");
  toastMixin.fire({
    animation: true,
    title: 'A barangay admin record has been activated.'
  });
  setTimeout(function(){
   
    $("#myBar").text("Table Updated Successfully!");
    setTimeout(function(){
      table.ajax.reload( null, false);
      $("#admin_table_paginate").removeClass("d-none");
      $("#admin_table_info").removeClass("d-none");
      $("#myProgress").addClass("d-none");
      $(".barangay_table_is_loading").addClass("d-none");
      $(".edit_barangay_value").removeClass("d-none");
    },600);
  
  },3000);
}
else if(confirmation.a == 6)
{
  $(".admin_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#admin_table_paginate").addClass("d-none");
  $("#admin_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");
  toastMixin.fire({
    animation: true,
    title: 'A barangay admin record has been deactivated.'
  });
  setTimeout(function(){
   
    $("#myBar").text("Table Updated Successfully!");
    setTimeout(function(){
      table.ajax.reload( null, false);
      $("#admin_table_paginate").removeClass("d-none");
      $("#admin_table_info").removeClass("d-none");
      $("#myProgress").addClass("d-none");
      $(".barangay_table_is_loading").addClass("d-none");
      $(".edit_barangay_value").removeClass("d-none");
    },600);
  
  },3000);
}
}
//trigger error messages

//destroy data table
function destroy_admin_table()
{
 table.destroy();
}
//destroy data table

//show data tables
function load_data_tables() {

  if ( ! $.fn.DataTable.isDataTable( '#admin_table' ) ) { // check if data table is already exist

    table = $('#admin_table').DataTable({
      
      "deferRender": true,
      "dom": 'lfBrtip',     
      //"processing": true,
      "serverSide": true,
      "ajax": "functions/show-barangay-admin.php",  
      scrollCollapse: true,

      "columns": [

        null,
        null,
        {
          "targets": 2,
          "render": function ( data, type, row, meta ) {


            if(data === "0")
            {active_data = data;
              return  "<div class='bg-dark text-white rounded-2 d-flex justify-content-center' type='button'  style='width:9rem'>Deactivated</div> ";
              
            }
            else
            {active_data = data;
              return "<div class='bg-success text-white rounded-2 d-flex justify-content-center' type='button' style='width:9rem'>Activated</div>";
            }
            
          },
         },
        {
          "defaultContent": "data",
          "targets": 3,
          "render": function ( data, type, row, meta ) {

            if(active_data === "0")
            {
              return  "<i class='edit_barangay_value btn_icon fas fa-undo-alt' data-coreui-toggle='modal' href='#reset_barangay' id='update_barangay_value' role='button' ></i> "+
              "<i class='edit_barangay_value btn_icon fas fa-trash' href='#delete_barangay_admin' data-coreui-toggle='modal' id='delete_barangay_admin_value' role='button' ></i> "+
              " <i class='edit_barangay_value btn_icon fas fa-unlock' href='#activate_barangay_admin' data-coreui-toggle='modal' id='activate_barangay_admin_value' role='button' ></i>"+
              "<i class='admin_table_is_loading spinner-border spinner-border-sm mt-2 d-none' style='color:#3b7ddd;'  id='admin_table_is_loading' role='button' disable></i>"
            }
            else
            {
              return  "<i class='edit_barangay_value btn_icon fas fa-undo-alt' data-coreui-toggle='modal' href='#reset_barangay' id='update_barangay_value' role='button' ></i> "+
              "<i class='edit_barangay_value btn_icon fas fa-trash' href='#delete_barangay_admin' data-coreui-toggle='modal' id='delete_barangay_admin_value' role='button' ></i> "+
              " <i class='edit_barangay_value btn_icon fas fa-lock' href='#deactivate_barangay_admin' data-coreui-toggle='modal' id='activate_barangay_admin_value' role='button' ></i>"+
              "<i class='admin_table_is_loading spinner-border spinner-border-sm mt-2 d-none' style='color:#3b7ddd;'  id='admin_table_is_loading' role='button' disable></i>"
            }
              
          },
           
        }
      ],

      "lengthMenu": [[10, 15, 20, 25, 50], [10, 15, 20, 25, 50]],

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
  
            messageTop: 'List of Barangay Admins',
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
  
            messageTop: 'List of Barangay Admins',
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
  
            messageTop: 'List of Barangay Admins',
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
  
            customize: function (win) {
               $(win.document.body)
                   .css('text-align', 'center')
  
               $(win.document.body).find('table')
                   .css('font-size', '12pt');
           }
        }],
    });
    table.buttons().container().appendTo('#admin_table_wrapper .col-md-6:eq(0)');

  }

    //to align the data table buttons
    $("#admin_table_wrapper").addClass("row");
    $("#admin_table_length").addClass("col-sm-6");
    $("#admin_table_length").addClass("mb-3");
    $("#admin_table_filter").addClass("col-sm-6");
    $("#admin_table_filter").addClass("mb-3");
    $(".dt-buttons").addClass("col-sm-2");
    $(".dt-buttons").removeClass("flex-wrap ");

  
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