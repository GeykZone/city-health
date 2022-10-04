var i = 0;
var table = "";
var disease_name = "";

$(document).ready(function()
{
  $(document).attr("title", "HPCS | Manage Diseases Type");
  load_data_tables();
  get_disease_table_cell_value()
  $("#diseases_table_wrapper").addClass("d-none");
  load_progress_bar();
});

//progress bar
function load_progress_bar()
{
  setInterval(move());
  setTimeout( function()
  {
    $("#myBar").text("Table Loaded Successfully!");
    setTimeout(function(){
      $("#myProgress").addClass("d-none");
      $("#diseases_table").removeClass("d-none");
      $("#diseases_table_wrapper").removeClass("d-none");
      $("#add_disease").removeClass("d-none"); 
      $(".hide_first_load").removeClass("d-none"); 
      $(".remove_rounded").removeClass("rounded-5");
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
      $.post("functions/add-disease.php", {
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

  $.post("functions/delete-disease.php", {
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
    $.post("functions/edit-disease.php", {
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


  $(".barangay_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#diseases_table_paginate").addClass("d-none");
  $("#diseases_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");
  $("#myProgress").addClass("mt-3");

  toastMixin.fire({
    animation: true,
    title: 'A new type of disease has been added in the list.'
  });
  setTimeout(function(){

    $("#myBar").text("Table Updated Successfully!");
     setTimeout(function(){
      table.ajax.reload( null, false);
      $("#diseases_table_paginate").removeClass("d-none");
      $("#diseases_table_info").removeClass("d-none");
      $("#myProgress").addClass("d-none");
      $("#myProgress").removeClass("mt-3");
      $(".barangay_table_is_loading").addClass("d-none");
      $(".edit_barangay_value").removeClass("d-none");
    },600);

  },3000);
}
else if(confirmation.a == 2)
{
  toastMixin.fire({
    animation: true,
    title: 'The type of disease is already in the list.',
    icon: 'error'
  });
  setTimeout(function(){
  },3000);
}
else if(confirmation.a == 3)
{
  $('#edit-disease').modal('toggle');

  $("#disease").val("");


  $(".barangay_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#diseases_table_paginate").addClass("d-none");
  $("#diseases_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");
  $("#myProgress").addClass("mt-3");

  toastMixin.fire({
    animation: true,
    title: "A disease's name has been successfully edited."
  });
  setTimeout(function(){

    $("#myBar").text("Table Updated Successfully!");
     setTimeout(function(){
      table.ajax.reload( null, false);
      $("#diseases_table_paginate").removeClass("d-none");
      $("#diseases_table_info").removeClass("d-none");
      $("#myProgress").addClass("d-none");
      $("#myProgress").removeClass("mt-3");
      $(".barangay_table_is_loading").addClass("d-none");
      $(".edit_barangay_value").removeClass("d-none");
    },600);

  },3000);
}
else if(confirmation.a == 4)
{
  $(".barangay_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#diseases_table_paginate").addClass("d-none");
  $("#diseases_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");
  $("#myProgress").addClass("mt-3");

  toastMixin.fire({
    animation: true,
    title: 'A type of disease has been deleted.'
  });
  setTimeout(function(){

    $("#myBar").text("Table Updated Successfully!"); 
     setTimeout(function(){
      table.ajax.reload( null, false);
      $("#diseases_table_paginate").removeClass("d-none");
      $("#diseases_table_info").removeClass("d-none");
      $("#myProgress").addClass("d-none");
      $("#myProgress").removeClass("mt-3");
      $(".barangay_table_is_loading").addClass("d-none");
      $(".edit_barangay_value").removeClass("d-none");
    },600);

  },3000);
}
}
//trigger error messages

  //show data tables
function load_data_tables() {

  if ( ! $.fn.DataTable.isDataTable( '#diseases_table' ) ) { // check if data table is already exist

    table = $('#diseases_table').DataTable({

      "deferRender": true,
      "dom": 'lfBrtips',     
      //"processing": true,
      "serverSide": true,
      "ajax": "functions/show-disease.php",  
      scrollCollapse: true,
  
      "columns": [
  
        null,
        {
          "defaultContent": 
          '<i class="shadow-sm align-middle edit_barangay_value update edit_btn fas fa-edit" data-coreui-toggle="modal" href="#edit-disease" id="edit_disease_value" role="button"></i> '+
          '<i class="shadow-sm align-middle edit_barangay_value del_btn fa-solid fa-trash-can" href="#delete_disease" data-coreui-toggle="modal" id="delete_disease_value" role="button" ></i> '+
          '<i class="align-middle barangay_table_is_loading loader_icn fas fa-sync fa-spin d-none" style="color:#3b7ddd;"  id="barangay_table_is_loading" role="button" disable></i>',
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
  
             messageTop: 'Types of Diseases',
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
  
             messageTop: 'Types of Diseases',
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
  
             messageTop: 'Types of Diseases',
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
  
             customize: function (win) {
                $(win.document.body)
                   .css('text-align', 'center')
  
                $(win.document.body).find('table')
                   .css('font-size', '12pt');
             }
          }
       ],
    });
    table.buttons().container().appendTo('#diseases_table_wrapper .col-md-6:eq(0)');

  }

      //to align the data table buttons
      $("#diseases_table_wrapper").addClass("row");
      $("#diseases_table_length").addClass("col-sm-6");
      $("#diseases_table_length").addClass("mb-3");
      $("#diseases_table_filter").addClass("col-sm-6");
      $("#diseases_table_filter").addClass("mb-3");
      $(".dt-buttons").addClass("col-sm-2 mb-3");
      $(".buttons-print").addClass("shadow-sm border-2"); 
      $(".buttons-excel").addClass("shadow-sm border-2"); 
      $(".buttons-copy").addClass("shadow-sm border-2"); 
      $(".dt-buttons").removeClass("flex-wrap");
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
