var barangay_name_id = "";

$(document).ready(function()
{
  $(document).attr("title", "HPCS | Manage Barangays");
  load_table_barangay();
  get_barangay_table_cell_value();
});

//add a delay in loading the material icon
function modal_open()
{
setTimeout(function(){
  $('.material-icons').css('opacity','1');

  },350);
}
//add a delay in loading the material icon


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


//submit new barangay
$("#add_barangay_btn").click(function () {

  var barangay = $("#barangay").val();
  var Latitude = $("#Latitude").val();
  var Longitude = $("#Longitude").val();

  if (barangay.trim().length === 0) //check if value is empty
  {
    $("#barangay").addClass("is-invalid");
    $("#barangay").val("");
  } 
  else if (Latitude.trim().length === 0) //check if value is empty
  {
    $("#Latitude").addClass("is-invalid");
    $("#Latitude").val("");
  } 
  else if (Longitude.trim().length === 0) //check if value is empty
  {
    $("#Longitude").addClass("is-invalid");
    $("#Longitude").val("");
  } 
  else 
  {
    $.post("functions/add-barangay.php", {
        barangay: barangay,
        Latitude: Latitude,
        Longitude: Longitude,
      },
      function (data, status) {
       confirmation.a = data;

      });
  }
});
//submit new barangay end

//update barangay
$("#update_barangay_btn").click(function () {
  var update_barangay = $("#update_barangay").val();
  var update_Latitude = $("#update_Latitude").val();
  var update_Longitude = $("#update_Longitude").val();

  if (update_barangay.trim().length === 0) //check if value is empty
  {
     $("#update_barangay").addClass("is-invalid");
     $("#update_barangay").val("");
  } 
  else if (update_Latitude.trim().length === 0) //check if value is empty
  {
     $("#update_Latitude").addClass("is-invalid");
     $("#update_Latitude").val("");
  } 
  else if (update_Longitude.trim().length === 0) //check if value is empty
  {
     $("#update_Longitude").addClass("is-invalid");
     $("#update_Longitude").val("");
  } 
  else 
  {
     $.post("functions/update-barangay.php", {
      update_barangay: update_barangay,
      update_Latitude: update_Latitude,
      update_Longitude: update_Longitude,
      barangay_name_id: barangay_name_id
    },
    function (data, status) {
      confirmation.a = data;

    });
  }
});
//update barangay end

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
  $('#add-barangay').modal('toggle');

  $("#barangay").val("");
  $("#Latitude").val("");
  $("#Longitude").val("");

  $(".barangay_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  toastMixin.fire({
    animation: true,
    title: 'A new barangay admin has been added in the list.'
  });
  setTimeout(function(){
    $("#barangay_table").addClass("d-none");
    $("#first_load_barangay_admin_table").removeClass("d-none");
    destroy_barangay_table();
    load_table_barangay();

  },3000);
}
else if(confirmation.a == 2)
{
  toastMixin.fire({
    animation: true,
    title: 'The barangay is already in the list.',
    icon: 'error'
  });
  setTimeout(function(){
  },3000);
}
else if(confirmation.a == 3)
{
  $('#update-barangay').modal('toggle');
  $(".barangay_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  toastMixin.fire({
    animation: true,
    title: 'A barangay record has been updated.'
  });
  setTimeout(function(){
    $("#barangay_table").addClass("d-none");
    $("#first_load_barangay_admin_table").removeClass("d-none");
    destroy_barangay_table();
    load_table_barangay();

  },3000);
}
else if(confirmation.a == 4)
{
  $(".barangay_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  toastMixin.fire({
    animation: true,
    title: 'A barangay has been deleted.'
  });
  setTimeout(function(){
    $("#barangay_table").addClass("d-none");
    $("#first_load_barangay_admin_table").removeClass("d-none");
    destroy_barangay_table();
    load_table_barangay();

  },3000);
}
}
//trigger error messages

//erese input fields when x button is pressed
//add barangay
$("#close_add_barangay").click(function()
{
  $("#barangay").val("");
  $("#Latitude").val("");
  $("#Longitude").val("");
})
//erese input fields when x button is pressed

//show data tables
function show_barangay_datatables() {

  var table = $('#barangay_table').DataTable({
     //"dom": 'Blfrtip',
     "lengthMenu": [
        [10, 20, 50, -1],
        [10, 20, 50, "All"]
     ],

     //disable the sorting of colomn
     "columnDefs": [{
        "targets": 3,
        "orderable": false
     }],

     "buttons": [{
           extend: 'copy',
           text: 'COPY',

           title: 'Health Profile Clustering System',

           messageTop: 'List of barangays in Oroquieta City',
           //className: 'fa fa-solid fa-clipboard',


           exportOptions: {
              modifier: {
                 page: 'current'
              },
              //columns: [0, 1] //r.broj kolone koja se stampa u PDF
              columns: [0, 1, 2],
              // optional space between columns
              columnGap: 1
           }

        },
        {
           extend: 'excel',
           text: 'EXCEL',

           title: 'Health Profile Clustering System',

           messageTop: 'List of barangays in Oroquieta City',
           //className: 'fa fa-solid fa-table',  //<i class="fa-solid fa-clipboard"></i>


           exportOptions: {
              modifier: {
                 page: 'current'
              },
              //columns: [0, 1] //r.broj kolone koja se stampa u PDF
              columns: [0, 1, 2],
              // optional space between columns
              columnGap: 1
           }

        },
        {
           extend: 'print',
           text: 'PDF',

           title: 'Health Profile Clustering System',

           messageTop: 'List of barangays in Oroquieta City',
           //className: 'fa fa-print',


           exportOptions: {
              modifier: {
                 page: 'current'
              },
              //columns: [0, 1] //r.broj kolone koja se stampa u PDF
              columns: [0, 1, 2],
              // optional space between columns
              columnGap: 1
           },

           customize: function (win) {
              $(win.document.body)
                 .css('text-align', 'center')

              $(win.document.body).find('table')
                 .css('font-size', '12pt');
           }
        }
     ],
  });
  table.buttons().container().appendTo('#barangay_table_wrapper .col-md-6:eq(0)');

}
//show data tables end

//destroy data table
function destroy_barangay_table()
{
  $('#barangay_table').dataTable().fnDestroy();
}
//destroy data table


//get the table cell value when selected
function get_barangay_table_cell_value()
{
  //updating
    $("#barangay_table").on('click','#edit_barangay_value',function(){

      // get the current row
      var currentRow=$(this).closest("tr");

      var col1=currentRow.find("td:eq(0)").text().trim($(this).text()); // get current row 1st TD value
      var col2=currentRow.find("td:eq(1)").text().trim($(this).text()); // get current row 2nd TD
      var col3=currentRow.find("td:eq(2)").text().trim($(this).text()); // get current row 3rd TD

      $("#update_barangay").val(col1);
      $("#update_Latitude").val(parseFloat(col2));
      $("#update_Longitude").val(parseFloat(col3));
      $("#barangay_variable").text(col1);

      barangay_name_id = col1;

  });

//deleting
 $("#barangay_table").on('click','#delete_barangay_value',function(){
    // get the current row
    var currentRow=$(this).closest("tr");
    var col1=currentRow.find("td:eq(0)").text().trim($(this).text()); // get current row 1st TD value
    barangay_name_id = col1;

  });
}
//get the table cell value when selected end


//delete barangay
$("#delete-barangay").click(function () {
     $.post("functions/delete-barangay.php", {
      barangay_name_id: barangay_name_id
    },
    function (data, status) {
      confirmation.a = data;

    });

});
//delete barangay end


//show barangay on admin table ajax
  function load_table_barangay()
  {
    $("#show_barangay_list_table").load("functions/show-barangay.php", {
    });
  }
//show the barangay admin table ajax



