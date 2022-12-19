var i = 0;
var table = "";
var disease_name = "";

$(document).ready(function()
{
  $(document).attr("title", "HPCS | Manage Diseases Type");
  load_data_tables();
  get_disease_table_cell_value()
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

//submit new type of disease
$("#add_disease_btn").click(function () {

    var disease = $("#disease").val();
  
    if (disease.trim().length === 0) //check if value is empty
    {
      $("#disease").addClass("is-invalid");
      $("#disease").val("");
    } 
    else 
    {
      $.post("functions/add-functions/add-disease.php", {
          disease: disease
        },
        function (data, status) {
         confirmation.a = data;
  
        });
    }
  });
  //submit new type of disease end

  //delete type of disease
$("#delete_disease_btn").click(function () {

  $.post("functions/delete-functions/delete-disease.php", {
    delete_disease: disease_name  
  },
  function (data, status) {
   confirmation.a = data;
  });

});
//delete type of disease end

//edit type of disease
$("#edit_disease_btn").click(function()
{
  var old_disease_name = disease_name;
  var edited_disease = $("#edited_disease").val();

  if (edited_disease.trim().length === 0) //check if value is empty
  {
    $("#edited_disease").addClass("is-invalid");
    $("#edited_disease").val("");
  } 
  else 
  {
    $.post("functions/update-functions/edit-disease.php", {
      old_delete_disease: old_disease_name, 
      edited_disease: edited_disease
    },
    function (data, status) {
     confirmation.a = data;
  
  
    });
  }
})
//edit type of disease end

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
  $('#add-disease').modal('toggle');

  $("#disease").val("");

  toastMixin.fire({
    animation: true,
    title: 'A new type of disease has been added in the list.'
  });
  table.ajax.reload( null, false);
}
else if(confirmation.a == 2)
{
  toastMixin.fire({
    animation: true,
    title: 'The type of disease is already in the list.',
    icon: 'error'
  });
}
else if(confirmation.a == 3)
{
  $('#edit-disease').modal('toggle');

  $("#disease").val("");

  toastMixin.fire({
    animation: true,
    title: "A disease's name has been successfully edited."
  });
  table.ajax.reload( null, false);
}
else if(confirmation.a == 4)
{
  toastMixin.fire({
    animation: true,
    title: 'A type of disease has been deleted.'
  });
  table.ajax.reload( null, false);
}
}
//trigger error messages

  //show data tables
function load_data_tables() {

  if ( ! $.fn.DataTable.isDataTable( '#diseases_table' ) ) { // check if data table is already exist

    table = $('#diseases_table').DataTable({

      "deferRender": true,
      "dom": 'Brltip',     
      //"processing": true,
      "serverSide": true,
      "ajax": "functions/display-functions/show-disease.php",  
      scrollCollapse: true,
  
      "columns": [
  
        null,
        {
          "defaultContent": 
          '<div class="text-end px-2">'+
          '<i class="shadow-sm align-middle edit_barangay_value update edit_btn fas fa-edit" data-coreui-toggle="modal" href="#edit-disease" id="edit_disease_value" role="button"></i> '+
          '<i class="shadow-sm align-middle edit_barangay_value del_btn fa-solid fa-trash-can" href="#delete_disease" data-coreui-toggle="modal" id="delete_disease_value" role="button" ></i> '+'</div>'
          }
      ],
  
  
      "lengthMenu": [[10, 15, 20, 25, 50], [10, 15, 20, 25, 50]],
  
  
       //disable the sorting of colomn
       "columnDefs": [{
          "targets": 1,
          "orderable": false
       }],
  
       "buttons": [{
             extend: 'copy',
             text: 'COPY',
  
             title: 'Health Profile Clustering System',
  
             messageTop: 'Health Diseases',
             //className: 'fa fa-solid fa-clipboard',
  
  
             exportOptions: {
                modifier: {
                   page: 'current'
                },
                //columns: [0, 1] //r.broj kolone koja se stampa u PDF
                columns: [0],
                // optional space between columns
                columnGap: 1
             }
  
          },
          {
             extend: 'excel',
             text: 'EXCEL',
  
             title: 'Health Profile Clustering System',
  
             messageTop: 'Health Diseases',
             //className: 'fa fa-solid fa-table',  //<i class="fa-solid fa-clipboard"></i>
  
  
             exportOptions: {
                modifier: {
                   page: 'current'
                },
                //columns: [0, 1] //r.broj kolone koja se stampa u PDF
                columns: [0],
                // optional space between columns
                columnGap: 1
             }
  
          },
          {
             extend: 'print',
             text: 'PDF',
  
             title: 'Health Profile Clustering System',
  
             messageTop: 'Health Diseases',
             //className: 'fa fa-print',
  
  
             exportOptions: {
                modifier: {
                   page: 'current'
                },
                //columns: [0, 1] //r.broj kolone koja se stampa u PDF
                columns: [0],
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
    table.buttons().container().appendTo('#diseases_table_wrapper .col-md-6:eq(0)');

    $('#diseases_table #th_1 td').each(function () {
      var title = this.id;

      if(title === "settings" )
      {
      
        $(this).html('<div class="text-end" ><span style = "color:#9eaaad; font-size:13px;" class="me-2"><span class="fa-solid me-2"></span>Settings</span></div>');
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
      $("#diseases_table_wrapper").addClass("row");

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
$("#close_add_disease").click(function()
{
  $("#disease").val("");
})
//erese input fields when x button is pressed

//get the table cell value when selected
function get_disease_table_cell_value()
{
//deleting
 $("#diseases_table").on('click','#delete_disease_value',function(){
    // get the current row
    var currentRow=$(this).closest("tr");
    var col1=currentRow.find("td:eq(0)").text().trim($(this).text()); // get current row 1st TD value
    disease_name = col1;
  });

//editing
$("#diseases_table").on('click','#edit_disease_value',function(){
  // get the current row
  var currentRow=$(this).closest("tr");
  var col1=currentRow.find("td:eq(0)").text().trim($(this).text()); // get current row 1st TD value

  disease_name = col1;
  $("#edited_disease").val(disease_name);
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
}
//generate a tooltip end
