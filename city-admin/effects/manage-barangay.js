var barangay_name_id = "";
var i = 0;
var table = "";

$(document).ready(function()
{
  $(document).attr("title", "HPCS | Manage Barangays");
  get_barangay_table_cell_value();
  load_data_tables();
  opentip_tooltip();
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
    $.post("functions/add-functions/add-barangay.php", {
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
     $.post("functions/update-functions/update-barangay.php", {
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
    title: 'The barangay is already in the list.',
    icon: 'error'
  });
}
else if(confirmation.a == 3)
{
  $('#update-barangay').modal('toggle');

  toastMixin.fire({
    animation: true,
    title: 'A barangay record has been updated.'
  });
  table.ajax.reload( null, false);
}
else if(confirmation.a == 4)
{
  toastMixin.fire({
    animation: true,
    title: 'A barangay has been deleted.'
  });
  table.ajax.reload( null, false);
}
}
//trigger error messages

//show data tables
function load_data_tables() {

  if ( ! $.fn.DataTable.isDataTable( '#barangay_table' ) ) { // check if data table is already exist

    table = $('#barangay_table').DataTable({

      "deferRender": true,
      "dom": 'Brltip',   
      //"processing": true,
      "serverSide": true,
      "ajax": "functions/display-functions/show-barangay.php",  
      scrollCollapse: true,

      "language": {
        "info": "Showing _START_ to _END_ of _TOTAL_ entries",
        "infoFiltered":""
      },
  
      "columns": [
  
        null,
        null,
        null,
        {
          "defaultContent": 
          '<div class="text-end px-3"><i class="shadow-sm align-middle edit_barangay_value update edit_btn fas fa-edit" data-coreui-toggle="modal" href="#update-barangay" id="edit_barangay_value" role="button" ></i> '+
          '<i class="shadow-sm mt-sm-2 mt-2 mt-lg-0 mt-md-0 align-middle edit_barangay_value del_btn fa-solid fa-trash-can" href="#delete_barangay" data-coreui-toggle="modal" id="edit_barangay_value" role="button" ></i> '+
          '</div>',
        }
      ],
  
  
      "lengthMenu": [[10, 15, 20, 25, 50], [10, 15, 20, 25, 50]],
  
  
       //disable the sorting of colomn
       "columnDefs": [{
          "targets": 3,
          "orderable": false
       }],
  
       "buttons": [{
             extend: 'copy',
             text: 'COPY',
  
             title: 'Health Profile Clustering System',

             messageTop: 'Barangays in Oroquieta City',
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
  
             messageTop: 'Barangays in Oroquieta City',
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
  
             messageTop: 'Barangays in Oroquieta City',
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
  
             customize: function ( doc ) {
              $(doc.document.body).find('h1').css('font-size', '15pt');
              $(doc.document.body).find('h1').css('text-align', 'center'); 
              $(doc.document.body).find('table').addClass("table-bordered")
              $(doc.document.body).find('table').css('font-size', '15pt');
              $(doc.document.body).find('table').css('width', '100%');
              $(doc.document.body).css('text-align', 'center')
            }
          }
       ],
    });
    table.buttons().container().appendTo('#barangay_table_wrapper .col-md-6:eq(0)');

    $('#barangay_table #th_1 td').each(function () {
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
      $("#barangay_table_wrapper").addClass("row");

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

}
//show data tables end

//erese input fields when x button is pressed
//add barangay
$("#close_add_barangay").click(function()
{
  $("#barangay").val("");
  $("#Latitude").val("");
  $("#Longitude").val("");
})
//erese input fields when x button is pressed

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
     $.post("functions/delete-functions/delete-barangay.php", {
      barangay_name_id: barangay_name_id
    },
    function (data, status) {
      confirmation.a = data;

    });

});
//delete barangay end

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



