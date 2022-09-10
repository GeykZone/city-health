var admin_id = ""; 

$(document).ready(function () {
  
  $(document).attr("title", "HPCS | Manage Users");
  select_with_search_box();
  generate_default_username_password();
  load_table_admin();
  get_admin_table_cell_value();

  loading_table();     
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

// show loading animation when page is load
function loading_table()
{
  $("#first_load_barangay_admin_table").removeClass("d-none");
  setTimeout(function(){
  $("#admin_table").removeClass("d-none");
  },3000);
}
// show loading animation when page is load is load

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

//erese input fields when x button is pressed
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
//erese input fields when x button is pressed

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
  toastMixin.fire({
    animation: true,
    title: 'A new barangay admin has been added in the list.'
  });
  setTimeout(function(){
    $("#admin_table").addClass("d-none");
    $("#first_load_barangay_admin_table").removeClass("d-none");
    destroy_admin_table();
    load_table_admin();
  

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
  toastMixin.fire({
    animation: true,
    title: 'A default username and password has been restored.'
  });
  setTimeout(function(){
    $("#admin_table").addClass("d-none");
    $("#first_load_barangay_admin_table").removeClass("d-none");
    destroy_admin_table();
    load_table_admin();
  

  },3000);
}
else if(confirmation.a == 4)
{
  $(".admin_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  toastMixin.fire({
    animation: true,
    title: 'A barangay admin record has been deleted.'
  });
  setTimeout(function(){
    $("#admin_table").addClass("d-none");
    $("#first_load_barangay_admin_table").removeClass("d-none");
    destroy_admin_table();
    load_table_admin();
  

  },3000);
}
else if(confirmation.a == 5)
{
  $(".admin_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  toastMixin.fire({
    animation: true,
    title: 'A barangay admin record has been activated.'
  });
  setTimeout(function(){
    $("#admin_table").addClass("d-none");
    $("#first_load_barangay_admin_table").removeClass("d-none");
    destroy_admin_table();
    load_table_admin();
  

  },3000);
}
}
//trigger error messages

//destroy data table
function destroy_admin_table()
{
  $('#admin_table').dataTable().fnDestroy();
}
//destroy data table

//show data tables
function load_data_tables() {

  if ( ! $.fn.DataTable.isDataTable( '#admin_table' ) ) { // check if data table is already exist

    var table = $('#admin_table').DataTable({
      
      //"dom": 'Blfrtip',      

      "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "All"]],

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

  
};
//show data tables end


//show the barangay admin table ajax
function load_table_admin()
{
  $("#barangay_admin_table").load("functions/show-barangay-admin.php", {
  });
}
//show the barangay admin table ajax

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
}
//get the table cell value when selected end