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

var i = 0;
var table = "";
var selectize_residents = "";
var selectize_barangay_id = "";
var selectize_barangay_id_enabled = "";
var selectize_barangay_id_disabled = "";
var id_full_naame = "";
var id_disease = "";
var philhealth_number = "";
var select_brgy = "";
var fullname_txt = "";
var disease_txt = "";
var created_at = new Date();
var dd = String(created_at.getDate()).padStart(2, '0');
var mm = String(created_at.getMonth() + 1).padStart(2, '0');
var yyyy = created_at.getFullYear();
var hp_id_value = "";

var barangay_name = "";
var disease_type = "";
var date_range_from = "";
var date_range_to = "";
var query_click = "unclicked";
var gender = "";
var min_age = "";
var max_age = "";
var current_year_to = getCurrentDate();
var current_year_from =  getPastYearDate(new Date (current_year_to));
var point_radius = 0.5
var hover_radius = 5

// Get the value of the 'name' parameter from the URL that is passed by time-series in dashboard
var urlParams = new URLSearchParams(window.location.search);
var passed_index = urlParams.get('index');
var starting_date = urlParams.get('starting_date');
var end_date = urlParams.get('end_date');
var is_clicked = urlParams.get('is_clicked');
var view_current_month_data = urlParams.get('current_month');

$(document).ready(function()
{
  $(document).attr("title", "HPCS | Manage Health Profiles");
  select_list()
  select_for_disease()
  enable_form()
  get_hp_table_cell_value();
  date_range();
  opentip_tooltip();

  // Call the received variable from the URL that is passed by time-series in dashboard
  if (is_clicked) {
    current_year_from = starting_date
    current_year_to = end_date
    query_click = is_clicked
  }
  else if (view_current_month_data)
  {
    current_year_from = starting_date
    current_year_to = end_date
  }
  
  $("#disease_range_from").val(format_date(current_year_from))
  $("#disease_range_to").val(current_year_to);

  chart_function(false)
  load_data_tables()
})

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

//date picker
function date_range()
{

    $("#range_from").datepicker({
    dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
    });


    $("#range_to").datepicker({
    dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
    });

    $("#update_date_of_diagnosis").datepicker({
    dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
    });

    $("#date_of_diagnosis").datepicker({
    dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
    });

    $("#disease_range_from").datepicker({
    dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
    });


    $("#disease_range_to").datepicker({
    dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
    });


}
//date picker end

// selectize ordinary
function select_list() 
{
  $('.select_list').selectize({
    // maxItems: '1',
    sortField: 'text'
    });
}
// selectize ordinary end

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

function getCurrentDate() {
  var dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Adding 1 and padding with zero if needed
  var day = ('0' + dateObj.getDate()).slice(-2); // Padding with zero if needed
  var currentDate = year + '-' + month + '-' + day;
  return currentDate;
}

function getPastYearDate(date) {
  var pastYear = date.getFullYear() - 1;
  var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if needed
  var day = date.getDate().toString().padStart(2, '0'); // Adding leading zero if needed
  var pastYearDate = pastYear + '-' + month + '-' + day;
  return pastYearDate;
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

function format_date(data)
{
  var dateString = data;
  var dateParts = dateString.split("-"); // Split the date string into an array of parts

  // Create a new date object with the formatted parts
  var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

  // Format the date as "YYYY-MM-DD"
  var formattedDate = date.toISOString().slice(0, 10);

  return formattedDate
}
// for select diseases
function select_for_disease()
{  
var selectize_diseases ;
$.ajaxSetup({async:false});
$.getJSON('functions/display-functions/select_diseases.php', 
{
}, 
function (data, textStatus, jqXHR) 
{
  selectize_diseases = data;
});

if(selectize_diseases != undefined)
{
  var selectize_diseases_data = selectize_diseases;
  var items = selectize_diseases_data.map(function(x) 
  { 
      //remove the first words
      var one = x.substr(x.indexOf(" ") + 1);
  
      //remove last word
      function removeLastWord(str) 
      {
        const lastIndexOfSpace = str.lastIndexOf(' ');
      
        if (lastIndexOfSpace === -1) {
          return str;
        }
        return str.substring(0, lastIndexOfSpace);
      }
  
      var text_label = removeLastWord(x)
      text_label = text_label.split('_').join(' ') 
  
      return {
        item: one,
        field: text_label
      };
    
  });
}



$('#add_hp_select_diseases').selectize
({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});

$('#update_hp_Diagnosis').selectize
({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});

$('#disease_select_diseases').selectize
({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});

$(".selectize-control").removeClass("form-control barangay-form")
}
// for select diseases  end

// selectized residents
function selectized_residents_list()
{
if(selectize_barangay_id_enabled != selectize_barangay_id_disabled)
{
    $('#add_hp_select_resident').selectize()[0].selectize.destroy();
}

$.ajaxSetup({async:false});
$.getJSON('functions/display-functions/select-residents.php', 
{
    resident_names: selectize_barangay_id
}, 

function (data, textStatus, jqXHR) 
{
    selectize_residents = data;
});

if(selectize_residents != undefined)
{

  var selectize_residents_data = selectize_residents;
  var items = selectize_residents_data.map(function(x) 
  { 
      //remove the first words
      var one = x.substr(x.indexOf(" ") + 1);
      var two = one.substr(one.indexOf(" ") + 1);
      var three = two.substr(two.indexOf(" ") + 1);
      //remove last word

      function removeLastWord(str) 
      {
        const lastIndexOfSpace = str.lastIndexOf(' ');
      
        if (lastIndexOfSpace === -1) {
          return str;
        }
        return str.substring(0, lastIndexOfSpace);
      }

      var text_label = removeLastWord(x)
      text_label = text_label.split('_').join(' ') 

      return {
      item: three,
      field: text_label
      };
    
  });

}

$('#add_hp_select_resident').selectize
({
    options: items,
    labelField: "field",
    valueField: "item",
    searchField: "field"
});

$(".selectize-control").removeClass("form-control barangay-form")

}
// selectized residents end

//show data tables
function load_data_tables(){
  var ajax_url = "functions/display-functions/show-hp.php";
  var table_data = $("#map_disease").text() + $("#map_cases").text() + $("#map_from").text() + $("#map_to").text();
  var table_data_2 = $("#map_gender").text() + $("#map_min_age").text() + $("#map_max_age").text() + $("#map_record_info").text();
  var modifiedWord = table_data_2.replace(/^,\s/, '');//remove unecesary in first char
  var modifiedSentence = modifiedWord.charAt(0).toUpperCase() + modifiedWord.slice(1);//make  first letter capital

  if ( ! $.fn.DataTable.isDataTable( '#hp_table' ) ) { // check if data table is already exist

  table = $('#hp_table').DataTable({

    // "processing": true,
    "deferRender": true,
    "serverSide": true,
    "aoColumns": [ 
      { "sName": "death_cause", "bVisible": true }
    ],
    "ajax": {
        url: ajax_url,
        data: {

          barangay_name:barangay_name,
          disease_type:disease_type,
          gender:gender,
          date_range_from:date_range_from,
          date_range_to:date_range_to,
          query_btn:query_click,
          current_year_from:current_year_from,
          current_year_to:current_year_to,
          min_age:min_age,
          max_age:max_age

        },
        "dataSrc": function ( json ) {
          //Make your callback here.
         // console.log(json)
          return json.data;
      }      
      
    },
    order: [[1,'asc']],
    
    "autoWidth": false,
      scrollCollapse: true,

    "dom": 'Brltip',      
    "lengthMenu": [[10, 50, 100, 500, 1000], [10, 50, 100, 500, 1000]],

    //disable the sorting of colomn
    "columnDefs": [ {
      "targets": 10,
      "orderable": false
      } ],

      "language": {
        "info": "Showing _START_ to _END_ of _TOTAL_ entries",
        "infoFiltered":""
      },

    "columns": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      {
        "targets": 10,
        "render": function ( data, type, row, meta ) {
          return  "<div class='text-end px-3'>"+
            "<i onclick = 'click_value(this.id)' class='update_hp_value shadow-sm align-middle edit_barangay_value update edit_btn fas fa-edit' data-coreui-toggle='modal' href='#update-hp' id='update_hp_value "+data+"' role='button'></i> "+
            "<i onclick = 'click_value(this.id)' class='delete_resident_value shadow-sm align-middle edit_barangay_value del_btn fa-solid fa-trash-can' href='#delete_hp_permanently' data-coreui-toggle='modal' id='delete_hp_value "+data+"' role='button'></i>"+
            "</div>"
        },
        
      }
    ],

  "buttons": [
    {

      extend: 'copy',
      text: ' COPY',

      action: function () {
        // Create a new container element to hold the merged table data
        var mergedData = '';

        mergedData += 'Health Profile Clustering System\n';
        mergedData += table_data + "\n" + modifiedSentence + "\n";
        mergedData += 'Copied: ' + date_into_words(current_year_to) + '\n\n';

        // Loop through each table and append its data to the merged data
        $('#hp_table_container').find('table').each(function () {
          var tableName = $(this).attr('id');
          var tableRows = $(this).find('tbody tr');


          // Append table title to the merged data
          mergedData += 'Health Profiles\n';

          // Loop through each row and append its data to the merged data
          tableRows.each(function () {
            var rowData = '';

            // Loop through each cell and append its data to the row data
            $(this).find('td').each(function () {
              rowData += $(this).text() + '\t'; // Separate cell data with a tab character
            });

            // Trim any trailing tab characters and append the row data to the merged data
            rowData = rowData.trim();
            mergedData += rowData + '\n'; // Separate rows with a new line character
          });

          // Separate the data of different tables with an empty line
          mergedData += '\n';
        });
        // Add the additional information before the tables


        // Create a temporary textarea element to hold the merged table data
        var tempTextarea = $('<textarea>').val(mergedData).css('position', 'absolute').css('left', '-9999px');

        // Append the temporary textarea to the body
        $('body').append(tempTextarea);

        // Select and copy the contents of the temporary textarea
        tempTextarea.select();
        document.execCommand('copy');

        // Remove the temporary textarea
        tempTextarea.remove();

        // Provide some feedback to the user
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Content copied!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    },
    { 
      extend: 'excel',
      text: ' EXCEL',
      action: function (e, dt, node, config) {

        var workbook = XLSX.utils.book_new();

        var table_data = $("#map_disease").text() + $("#map_cases").text() + $("#map_from").text() + $("#map_to").text();
        var table_data_2 = $("#map_gender").text() + $("#map_min_age").text() + $("#map_max_age").text() + $("#map_record_info").text();
        var modifiedWord = table_data_2.replace(/^,\s/, '');//remove unecesary in first char
        var modifiedSentence = modifiedWord.charAt(0).toUpperCase() + modifiedWord.slice(1);//make  first letter capital

        if (modifiedSentence != "") {
          modifiedSentence = "(" + modifiedSentence + ")"
        }

        // Create a sheet for Barangay Health Stats
        var excel_data = XLSX.utils.aoa_to_sheet([
          [{ v: 'Health Profile', s: { font: { bold: true }, alignment: { horizontal: 'center' } } }],
          [{ v: 'Clustering System', s: { font: { bold: true }, alignment: { horizontal: 'center' } } }],
          [],
          [{ v: 'Exported Data', s: { alignment: { horizontal: 'center' } } }],
          [{ v: '(' + table_data + ')', s: { alignment: { horizontal: 'center' } } }],
          [{ v: modifiedSentence, s: { alignment: { horizontal: 'center' } } }],
          [{ v: 'Accessed: ' + date_into_words(current_year_to), s: { alignment: { horizontal: 'center' } } }],
          [],
          [{ v: 'Health Profiles', s: { font: { bold: true }, alignment: { horizontal: 'center' } } }],
          [],
          [{ v: 'Diagnosis', s: { font: { bold: true } } },
           { v: 'First Name', s: { font: { bold: true } } },
            { v: 'Middle Name', s: { font: { bold: true } } },
            { v: 'Last Name', s: { font: { bold: true } } },
            { v: 'Barangay', s: { font: { bold: true } } },
            { v: 'Gender', s: { font: { bold: true } } },
            { v: 'Age', s: { font: { bold: true } } },
            { v: 'Contact', s: { font: { bold: true } } },
            { v: 'Date of Diagnosis', s: { font: { bold: true } } },
            { v: 'PhilHealth No.', s: { font: { bold: true } } },]
        ]);

        // Merge and center the headers in Barangay Health Stats sheet
        excel_data['!merges'] = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: 9 } }, // Merge A1 to D1
          { s: { r: 1, c: 0 }, e: { r: 1, c: 9 } },
          { s: { r: 3, c: 0 }, e: { r: 3, c: 9 } },
          { s: { r: 4, c: 0 }, e: { r: 4, c: 9 } },
          { s: { r: 5, c: 0 }, e: { r: 5, c: 9 } },
          { s: { r: 6, c: 0 }, e: { r: 6, c: 9 } },
          { s: { r: 8, c: 0 }, e: { r: 8, c: 9 } },
        ];

        // Get the data from the Barangay Health Stats table
        var data_tables = document.getElementById('hp_table_container');
        var data_table_tr = data_tables.getElementsByTagName('tr');

        var lastRowIndex = data_table_tr.length - 1; // Index of the last row (only if you want exclude last row)

        for (var i = 1; i < data_table_tr.length; i++) {
          if (i !== lastRowIndex) {
            var row = [];
            var cells = data_table_tr[i].getElementsByTagName('td');
            for (var j = 0; j < cells.length; j++) {
              row.push(cells[j].innerText.trim());
            }
            XLSX.utils.sheet_add_aoa(excel_data, [row], { origin: -1 });
          }
        }



        // Set the column widths
        var columnWidths = [
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },

        ];
        excel_data['!cols'] = columnWidths;

        // Add the Barangay Health Stats sheet to the workbook
        XLSX.utils.book_append_sheet(workbook, excel_data, 'Barangay Health Stats');

        // Generate the Excel file
        var excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
        var fileBuffer = new ArrayBuffer(excelFile.length);
        var fileArray = new Uint8Array(fileBuffer);
        for (var o = 0; o < excelFile.length; o++) {
          fileArray[o] = excelFile.charCodeAt(o) & 0xff;
        }

        // Save the Excel file
        var currentDate = date_into_words(current_year_to);
        var fileName = 'Health Profiles ' + currentDate + '.xlsx';
        saveAs(new Blob([fileBuffer], { type: 'application/octet-stream' }), fileName);

      }
    },
    {
      extend: 'print',
      text: ' PDF',

      title: 'Health Profile Clustering System',

      messageTop: '<br><span>' + table_data + '</span><br><span>' + modifiedSentence +'</span><br><span>Accessed: ' + date_into_words(current_year_to) + '</span><br><br>',
          //className: 'fa fa-print'
        //className: 'fa fa-print',
        

        exportOptions: {
        modifier: {
            page: 'current'
        },
          //columns: [0, 1] //r.broj kolone koja se stampa u PDF
          columns: [0,1,2,3,4,5,6,7,8,9],
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
  table.buttons().container().appendTo('#hp_table_wrapper .col-md-6:eq(0)');

    $('#hp_table #th_1 td').each(function () {
      var title = this.id;

      if(title === "settings" )
      {
      
        $(this).html('<div class="text-center" ><span style = "color:#9eaaad; font-size:13px;" class="me-2"><span class="fa-solid me-2"></span>Settings</span></div>');
      }
      else
      {
        $(this).html('<input type="text" id = "'+title+'" class="form-control table_search rounded-1 w-100 shadow-sm py-0"  placeholder="'+title+'" aria-controls="hp_table">');
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

//get the id of health profile
function click_value(this_value)
{
  hp_id_value = this_value.substr(this_value.indexOf(" ") + 1);
}
//get the id of health profile end

//trigger error messages
function alert_message()
{
if(confirmation.a == 1)
{

  $('#add-hp').modal('toggle');

var $select = $('#add_hp_select_barangay').selectize();
var control = $select[0].selectize;
control.clear();

 $select = $('#add_hp_select_resident').selectize();
 control = $select[0].selectize;
control.clear();

 $select = $('#add_hp_select_diseases').selectize();
 control = $select[0].selectize;
control.clear();

$('#date_of_diagnosis').val('')

$("#philhealth").val("");

toastMixin.fire({
animation: true,
title: 'A new health profile has been added in the list.'
});

table.ajax.reload( null, false);
chart_function(true)

}
else if(confirmation.a == 2)
{
toastMixin.fire({
animation: true,
title: 'Something went wrong please try again.',
icon: 'error'
});
}
else if(confirmation.a == 3)
{ 
if($('#update-hp').is(":visible") ){
  $('#update-hp').modal('toggle');
}

toastMixin.fire({
animation: true,
title: 'A health profile has been updated.'
});

table.ajax.reload( null, false);
chart_function(true)
}
else if(confirmation.a == 4)
{ 
toastMixin.fire({
animation: true,
title: 'A record has been successfully deleted.'
});
table.ajax.reload( null, false);
chart_function(true)
}

}
//trigger error messages end

//enable the form when a barangay is picked
function enable_form()
{
// adding (first time)
$("#add_hp_select_barangay").change(function(){ 
var barangay_name = $("#add_hp_select_barangay").text();

if(barangay_name.trim().length != 0)
{
var brgy_list_value = $("#add_hp_select_barangay").val();
selectize_barangay_id = brgy_list_value;
selectize_barangay_id_enabled = selectize_barangay_id;
selectized_residents_list();
$('#fieldset1').removeAttr("disabled");
$('#add_hp_select_resident')[0].selectize.enable();
$('#add_hp_select_diseases')[0].selectize.enable();  

$('#date_of_diagnosis').val(yyyy + '-' + mm + '-' + dd)
}
else
{
selectize_barangay_id_disabled = selectize_barangay_id_enabled;
$('#fieldset1').attr("disabled", true);
$('#add_hp_select_resident')[0].selectize.disable();
$('#add_hp_select_diseases')[0].selectize.disable();
}
});
}
//enable the form when a barangay is picked end 

//erese input fields when x button is pressed
  $("#close_add_hp").click(function()
  {

  var $select = $('#add_hp_select_barangay').selectize();
  var control = $select[0].selectize;
  control.clear();

   $select = $('#add_hp_select_resident').selectize();
   control = $select[0].selectize;
  control.clear();

   $select = $('#add_hp_select_diseases').selectize();
   control = $select[0].selectize;
  control.clear();

  $('#date_of_diagnosis').val('')

  $("#philhealth").val("");
  })
//erese input fields when x button is pressed end

//submit new hp
$("#add_hp_btn").click(function () {

    created_at = $("#date_of_diagnosis").val()
    id_full_naame = $("#add_hp_select_resident").val();
    id_disease = $("#add_hp_select_diseases").val();
    philhealth_number = $("#philhealth").val();
    select_brgy = $("#add_hp_select_barangay").text();
    fullname_txt = $("#add_hp_select_resident").text();
    disease_txt = $("#add_hp_select_diseases").text();

    function submit_new_hp_lists()
    {
        $.post("functions/add-functions/add-hp.php", {
            created_at: created_at,
            id_full_naame: id_full_naame,
            id_disease: id_disease,
            philhealth_number: philhealth_number,
            new_hp:'set'

          },
          function (data, status) {
           
            confirmation.a = data;
    
          });
    }
    

    if (select_brgy.trim().length === 0) //check if value is empty
    {
      $("#add_hp_select_barangay").addClass("is-invalid");
      $("#add_hp_select_brg_list .selectize-control").addClass("is-invalid");
    }
    else if (fullname_txt.trim().length === 0) //check if value is empty
    {
      $("#add_hp_select_resident").addClass("is-invalid");
      $("#add_hp_select_resident_list .selectize-control").addClass("is-invalid");
    }
    else if (disease_txt.trim().length === 0) //check if value is empty
    {
      $("#add_hp_select_diseases").addClass("is-invalid");
      $("#add_hp_select_diseases_list .selectize-control").addClass("is-invalid");
    }
    else if(created_at.trim().length === 0)
    {
      $("#date_of_diagnosis").addClass("is-invalid");
    }
    else 
    {
        if (philhealth_number.trim().length != 0 && philhealth_number.length === 12)
        {
            submit_new_hp_lists()
        }
        else if (philhealth_number.trim().length === 0)
        {
            philhealth_number = "N/A"
            submit_new_hp_lists()
        }
        else
        {
            $("#philhealth").addClass("is-invalid");
        }
    }


  
});
//submit new hp end

//update hp details
$("#update_hp_btn_edit").click(function () {

  var new_hp_philhealth = $("#update_philhealth").val();
  var new_diagnosis = $("#update_hp_Diagnosis").val();
  var new_diagnosis_date = $("#update_date_of_diagnosis").val();
  var hp_update_id = hp_id_value;
  var update_validator = true;

  function submit_update_hp_lists_details()
  {
      $.post("functions/update-functions/update-hp.php", {

        change_details:'set',
        hp_update_id: hp_update_id,
        new_diagnosis:new_diagnosis,
        new_diagnosis_date:new_diagnosis_date,
        new_hp_philhealth: new_hp_philhealth,
        },
        function (data, status) {
         confirmation.a = data;
        });
  }

  if(new_diagnosis.trim().length === 0)
  {
    $("#update_hp_Diagnosis").addClass("is-invalid");
    $("#u_p_d .selectize-control").addClass("is-invalid");
    update_validator = false;
  }
  else if(new_diagnosis_date.trim().length === 0)
  {
    $("#update_date_of_diagnosis").addClass("is-invalid");
    update_validator = false;
  }
  else if (new_hp_philhealth.trim().length != 0 && new_hp_philhealth.length === 12)
  {
    update_validator = true;
  }
  else if (new_hp_philhealth.trim().length === 0)
  {
    new_hp_philhealth = "N/A";
    update_validator = true;
  }
  else
  {
      $("#update_philhealth").addClass("is-invalid");
      update_validator = false;
  }


  if(update_validator === true)
  {
    submit_update_hp_lists_details()
  }

});
//update hp details end

// delete final
$("#delete_hp_btn_final").click(function()
{
  $.post("functions/update-functions/update-hp.php", {
    hp_id: hp_id_value,
    delete:'set'
    },
    function (data, status) {
      confirmation.a = data;
    });
})
// delete final end

//get cell value when selected
function get_hp_table_cell_value()
{
  //update
  $("#hp_table").on('click','.update_hp_value',function(){
    // get the current row
    var currentRow=$(this).closest("tr");
  
    var col0=currentRow.find("td:eq(0)").text().trim($(this).text()); // get current row 1st TD value
    var col1=currentRow.find("td:eq(1)").text().trim($(this).text()); // get current row 1st TD value
    var col2=currentRow.find("td:eq(2)").text().trim($(this).text()); // get current row 1st TD value
    var col3=currentRow.find("td:eq(3)").text().trim($(this).text()); // get current row 1st TD value
    var col4=currentRow.find("td:eq(4)").text().trim($(this).text()); // get current row 1st TD value
    var col5=currentRow.find("td:eq(5)").text().trim($(this).text()); // get current row 1st TD value
    var col6=currentRow.find("td:eq(6)").text().trim($(this).text()); // get current row 1st TD value
    var col7=currentRow.find("td:eq(7)").text().trim($(this).text()); // get current row 1st TD value
    var col8=currentRow.find("td:eq(8)").text().trim($(this).text()); // get current row 1st TD value
    var col9=currentRow.find("td:eq(9)").text().trim($(this).text()); // get current row 1st TD value


    var update_diagnosis_date = new Date(col8)
    update_diagnosis_date = update_diagnosis_date.getFullYear()+"-"+String(update_diagnosis_date.getMonth() + 1).padStart(2, '0')+"-"+String(update_diagnosis_date.getDate()).padStart(2, '0');
    $("#update_date_of_diagnosis").val(update_diagnosis_date);

    var $select = $("#update_hp_Diagnosis").selectize();
    var selectize = $select[0].selectize;
    selectize.setValue(selectize.search(col0).items[0].id);

    $("#update_philhealth").val(col9);
  
    });
}
//get cell value when selected end

$("#refresh_table").click(function()
{
  $("#current_year").trigger("click")
})

//generate a tooltip
function opentip_tooltip()
{
  var refresh_table_tooltip = $("#refresh_table")
  var myOpentip = new Opentip(refresh_table_tooltip, { showOn:"mouseover", tipJoint: "bottom", target:refresh_table_tooltip });
  myOpentip.setContent("Refresh Table"); // Updates Opentips content  

  var current_year_tooltip = $("#current_year")
  var myOpentip = new Opentip(current_year_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "bottom", target:current_year_tooltip, delay:0.50});
  myOpentip.setContent("Refresh Graph Chart"); // Updates Opentips content

  $("body").click(function()
  {
    myOpentip.hide()
  })
  
}
//generate a tooltip end

// cange color of date field when value is not 0
$("#date_of_diagnosis").change(function()
{

  if($("#date_of_diagnosis").val().trim().length === 0)
  {
    $('#date_of_diagnosis').css(
      {
        'cssText': 'color:#818a99 !important'
      }
      );
  }
  else
  {
    $('#date_of_diagnosis').css(
      {
          'cssText': 'color: #333 !important'
      }
      );
  }

})

$("#update_date_of_diagnosis").change(function()
{

  if($("#update_date_of_diagnosis").val().trim().length === 0)
  {
    $('#update_date_of_diagnosis').css(
      {
        'cssText': 'color:#818a99 !important'
      }
      );
  }
  else
  {
    $('#update_date_of_diagnosis').css(
      {
          'cssText': 'color: #333 !important'
      }
      );
  }

})

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

//chart
 function chart_function(update)
 {
    var x_value = [];
    var y_value = [];
    var xx_value =[];
    var x_y_value = "";
    var xValues = "";
    var yValues = ""; 
    var myColors;
    var barangay_title
    var disease_title
    var details_title;
    var date_range_title;
    var sort = "names";
    var total
   var update_chart_var = update

    //tittle page current status
    function current_status()
    {

    min_age = parseInt(min_age)
    max_age = parseInt(max_age)

    if(query_click != "clicked")
    {
      $("#map_from").text("from "+date_into_words(current_year_from)+ " to ")
        $("#map_to").text(date_into_words(current_year_to))
    }
    else
    {
        if($( "#disease_range_from" ).val() === $( "#disease_range_to" ).val())
        {
          $("#map_from").text("from "+date_into_words(date_range_from)+ "")
          $("#map_to").text("")
        }
        else
        {
          if(date_range_from === "" && date_range_to != "")
          {
            $("#map_from").text("up to the maximum date of "+date_into_words(date_range_to)+ "")
            $("#map_to").text("")
          }
          else if(date_range_to === "" && date_range_from != "")
          {
            $("#map_from").text("starting from "+date_into_words(date_range_from)+ "")
            $("#map_to").text("")
          }
          else
          {
             $("#map_from").text("from "+date_into_words(current_year_from)+ " to ")
             $("#map_to").text(date_into_words(current_year_to))
          }
        }

        if(date_range_from === "" && date_range_to === "")
        {
          $("#map_from").text("from "+date_into_words(current_year_from)+ " to ")
             $("#map_to").text(date_into_words(current_year_to))
        }
    }

    if(barangay_name === "")
    {
        $("#map_barangay").text("")
    }
    else
    {
        $("#map_barangay").text(" in barangay "+barangay_title)   
    }

    if(disease_type === "")
    {
        $("#map_disease").text("All ")
    }
    else
    {
        $("#map_disease").text("All "+disease_title+" ")   
    }

    $("#map_cases").text("health cases, documented ")

    if(gender === "")
    {
        $("#map_gender").text("")
        $(".details_head_gender").text("Male and female records")
    }
    else
    {   
        if(gender === "Female")
        {
            $("#map_gender").text(", female records")
            $(".details_head_gender").text("Female records")
        }
        else if(gender === "Male")
        {
            $("#map_gender").text(", male records")
            $(".details_head_gender").text("Male records")
        }
          
    }

    if(!isNaN(min_age))
    {
        
        $("#map_min_age").text(", minimum age of "+min_age)
        $(".details_head_age").text("Minimum age of "+min_age)
    }
    else
    {
        if(!isNaN(max_age))
        {

            $("#map_max_age").text(", maximum age of "+max_age) 
            $(".details_head_age").text("Maximum age of "+max_age)
        }
        else
        {
            $("#map_min_age").text("")
            $(".details_head_age").text("All ages")
        }
    }

    if(!isNaN(max_age))
    {

        $("#map_max_age").text(", maximum age of "+max_age) 
        $(".details_head_age").text("Maximum age of "+max_age)
    }
    else
    {
        if(!isNaN(min_age))
        {
        
            $("#map_min_age").text(", minimum age of "+min_age)
            $(".details_head_age").text("Minimum age of "+min_age)
        }
        else
        {
            $("#map_max_age").text("")
            $(".details_head_age").text("All ages")
        }
    }

    if(!isNaN(min_age) && !isNaN(max_age)) 
    {
      
        if(min_age === max_age )
        {
            $("#map_min_age").text(", all "+min_age+" years old")
            $("#map_max_age").text("")
            $(".details_head_age").text("All "+min_age+" years old")
        }
        else
        {
            $("#map_min_age").text(", minimum age of "+min_age)
            $("#map_max_age").text(", maximum age of "+max_age)
            $(".details_head_age").text("Minimum age of "+min_age+", maximum age of "+max_age+"")
        }
    }
    }
    //tittle page cureent status end

    //initalize chart values
    function chart_array()
    {
      $.ajaxSetup({async:false});
      $.getJSON('functions/display-functions/time-span.php', 
      {
        total_hp:'set',

        query_click:query_click,
        
        disease_type:disease_type,
        barangay_name:barangay_name,
        date_range_from:date_range_from,
        date_range_to:date_range_to,
        gender:gender,
        max_age:max_age,
        min_age:min_age,
        current_year_from:current_year_from,
        current_year_to:current_year_to
      }, 
      
      function (data, textStatus, jqXHR) 
      {
        x_y_value = data;
        
      });
      
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

      if(sort === "asc")
      {
          //sorting algorithm
          arrayOfObj = x_value.map(function(d, i) {
            return {
              label: d,
              data: y_value[i] || 0,
              title: xx_value[i]
            };
          });
          
          sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
            return a.data - b.data;
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
      }
      else if(sort === "desc")
      {
        //sorting algorithm
        arrayOfObj = x_value.map(function(d, i) {
          return {
            label: d,
            data: y_value[i] || 0,
            title: xx_value[i]
          };
        });
        
        sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
          return b.data - a.data;
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
      }
      else if(sort === "names")
      {
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
            newArrayData.push(parseInt(d.data));
            newArrayTitle.push(d.title);
          });
          ////sorting algorithm
      }

      x_value = newArrayLabel;
      y_value = newArrayData;
      xx_value = newArrayTitle;

      xValues = x_value;
      yValues = y_value; 

      myColors = "#40b9f5ff";

      if (yValues.length < 2)
      {
        point_radius = 15
        hover_radius = 20
      }
      else
      {
        point_radius = 0.5
        hover_radius = 5
      }

      total = 0; $.each(yValues, function(index, value) { total += parseInt(value); }); 

      $("#map_totals").text(", ("+total.toLocaleString('en-US')+") in total")

    }
    //initalize chart values end

    //number of residents chart
    function number_of_resident_chart()
    {
      chart_array()
    // console.log(x_value)

      const data_sets = [

      {
        type: 'line', 
        label: "",
        data: yValues,
        backgroundColor: myColors,
        pointBackgroundColor: myColors,
        pointHoverBackgroundColor: myColors,
        borderColor: "#6cc4f000",
        borderWidth: 1,
        borderRadius: 1,
        pointRadius: point_radius,
        hoverRadius:hover_radius,
        borderSkipped: true,
        barPercentage: 0.8,
        categoryPercentage:0.8,
        fill: true,
        tension: 0.3,
      //stepped: true,
      }]

      const annotationline = {
        id: 'annotationline',
        beforeDraw: chart => {
          if (myChart.tooltip._active && myChart.tooltip._active.length)
          {
            const ctx =  myChart.ctx;
            ctx.save()
            const activePoint = myChart.tooltip._active[0];
            ctx.beginPath();
            ctx.moveTo(myChart.tooltip._active[0].element.x, myChart.chartArea.top);
            ctx.lineTo(myChart.tooltip._active[0].element.x, myChart.chartArea.bottom);
            ctx.LineWidth = 10;
            ctx.strokeStyle = myColors
            ctx.stroke()
            ctx.restore()
          }
        }
      };


      //initialize chart
      const ctx = $('#hpChart');
      myChart = new Chart(ctx, {
      options: {  
          interaction: {
            intersect: false,
            mode: 'index',
          },
      onClick: (e, elements) => {

        if(elements.length > 0) 
        {
          var current_index = elements[0].index;

          date_range_title =  x_value[current_index];
          $("#details_title").text(x_value[current_index]+"")
          var all_dates = xx_value[current_index];
          var display_diseases_that_occured = "";
          var details_title;
      
          $(".details_head_status").text("All documented health cases on "+date_range_title)

          if(disease_type != "")
          {
            $(".details_head_status").text("All documented health cases caused by "+disease_title+" on "+date_range_title)

          }
          else if(barangay_name != "")
          {
            $(".details_head_status").text("All documented health cases on "+date_range_title+" in barangay "+barangay_title)

          }

          if(barangay_name != "" && disease_type != "")
          {
            $(".details_head_status").text("All documented health cases caused by "+disease_title+" on "+date_range_title+" in barangay "+barangay_title)

          }

          if(yValues[current_index] != 1)
          {
            details_title = "There are "+parseInt(yValues[current_index]).toLocaleString('en-US')+" health cases in total";
          }
          else
          {
            details_title = "There is only "+parseInt(yValues[current_index]).toLocaleString('en-US')+" health case in total";
          }
          

          $('.details_content_label').remove();
          $("#details_content_titte").append('<div class="details_content_label border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 text-white px-2"><label class="form-label">'+details_title+'</label></div>');
          
          $.ajaxSetup({async:false});
          $.getJSON('functions/display-functions/get-time-span.php',
          {
            query_click:query_click,

            barangay_name:barangay_name,
            disease_type:disease_type,
            date_range_from:date_range_from,
            date_range_to:date_range_to,
            gender:gender,
            max_age:max_age,
            min_age:min_age,
            current_year_from:current_year_from,
            current_year_to:current_year_to,
            all_dates: all_dates
              
          },     
          function (data, textStatus, jqXHR) 
          {
            display_diseases_that_occured = data
          });
          $('.details_list').remove();
          $.each(display_diseases_that_occured, function( index,value ) {

            $("#details_form").append('<div class="details_list border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 d-flex align-items-center text-white px-2"><label class="form-label">'+value+'</label></div>');
        
          });

          $('#show_details').modal('toggle');
        }
      },
      onHover: (e, elements) => {
        e.native.target.style.cursor = elements[0] ? 'pointer'
        : 'default';
      },
        pointStyle: "circle",
        indexAxis: 'x',
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: true,
              drawBorder: false
            },
            ticks: {
              padding: 20,
              display: true,
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              drawBorder: false
            },
            ticks: {
            padding: 25,
              display: true,
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
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20
              },
              caretSize: 15,
              cornerRadius: 20,
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
                  return "(click to see more details)"
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
              bodySpacing: 4,
              titleMarginBottom: 15
            },
        }
      },
      data: {
          labels: xValues,
          dataSorting: {
            enabled: true
        },
          datasets: data_sets
      },
      plugins: [annotationline]
    });


    $("#hpChart").addClass("rounded-4 pt-4 px-2 border-0 shadow-sm bg-light bg-opacity-50")

    if(is_clicked)
    {
    
    var current_index = passed_index;
    date_range_title =  x_value[current_index];
    $("#details_title").text(x_value[current_index]+"")
    var all_dates = xx_value[current_index];
    var display_diseases_that_occured = "";
    var details_title;

    $(".details_head_status").text("All documented health cases on "+date_range_title)

    if(disease_type != "")
    {
      $(".details_head_status").text("All documented health cases caused by "+disease_title+" on "+date_range_title)

    }
    else if(barangay_name != "")
    {
      $(".details_head_status").text("All documented health cases on "+date_range_title+" in barangay "+barangay_title)

    }

    if(barangay_name != "" && disease_type != "")
    {
      $(".details_head_status").text("All documented health cases caused by "+disease_title+" on "+date_range_title+" in barangay "+barangay_title)

    }

    if(yValues[current_index] != 1)
    {
      details_title = "There are "+parseInt(yValues[current_index]).toLocaleString('en-US')+" health cases in total";
    }
    else
    {
      details_title = "There is only "+parseInt(yValues[current_index]).toLocaleString('en-US')+" health case in total";
    }


    $('.details_content_label').remove();
    $("#details_content_titte").append('<div class="details_content_label border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 text-white px-2"><label class="form-label">'+details_title+'</label></div>');

    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/get-time-span.php',
    {
      query_click:query_click,

      barangay_name:barangay_name,
      disease_type:disease_type,
      date_range_from:date_range_from,
      date_range_to:date_range_to,
      gender:gender,
      max_age:max_age,
      min_age:min_age,
      current_year_from:current_year_from,
      current_year_to:current_year_to,
      all_dates: all_dates
        
    },     
    function (data, textStatus, jqXHR) 
    {
      display_diseases_that_occured = data
    });
    $('.details_list').remove();
    $.each(display_diseases_that_occured, function( index,value ) {

      $("#details_form").append('<div class="details_list border-0 shadow-sm align-middle pt-2 bg-c-blue mb-3 rounded-2 d-flex align-items-center text-white px-2"><label class="form-label">'+value+'</label></div>');

    });

    $('#show_details').modal('toggle');
    }

    }
    //number of residents chart end

    //update chart
    function update_chart()
    {
    chart_array();
    myChart.data.labels = x_value;
    myChart.data.datasets[0].data = y_value;
    myChart.update(function()
    {
      if (myChart.data.datasets[0].data.length < 2)
      {
        myChart.data.datasets[0].pointRadius = 15;
        myChart.data.datasets[0].hoverRadius = 20
      }
      else
      {
        myChart.data.datasets[0].pointRadius = 0.5;
        myChart.data.datasets[0].hoverRadius = 5
      }
    });

    }
    //update chart end

    //sort chart
    $("#sort_cases").click(function(e){
    
        if(sort === "names")
        {
          sort = "asc"
        }
        else if(sort === "asc")
        {
          sort = "desc"
        }
        else
        {
          sort = "names"
        }
        update_chart()
      
      
      })
    //sort chart end

    //filter chart
    $("#disease_date_range_btn").click(function()
    {

      var from_input = $("#disease_range_from").val()
      var to_input = $("#disease_range_to").val()
      var barangay_id = $("#disease_selecte_barangay").val();
      barangay_title = $("#disease_selecte_barangay").text();
      var hp_selected = $("#disease_select_diseases").val();
      disease_title = $("#disease_select_diseases").text();
      var gender_selected = $("#disease_select_gender").val();
      var click_min_age = $("#age_min").val();
      var click_max_age = $("#age_max").val();

      click_min_age = parseInt(click_min_age);
      click_max_age = parseInt(click_max_age);

      var d_from = new Date(from_input)
      var d_to = new  Date(to_input)
      var validator = true

      
      if(!isNaN(click_max_age) && click_min_age > click_max_age)
      {
        $("#age_max").addClass("is-invalid");
        $("#age_max").val("");
        validator =false
      }
      if(isNaN(click_min_age))
      {
          min_age =  "";
      }
      else
      {
          min_age = click_min_age;
      }
      if(isNaN(click_max_age))
      {
          max_age =  "";
      }
      else
      {
          max_age = click_max_age;
      } 

      if(gender_selected.trim().length != 0)
      {
          gender = gender_selected;
      }
      else
      {
          gender = ""
      }

      if(hp_selected.trim().length != 0)
      {
          disease_type = hp_selected;
      }
      else
      {
          disease_type = ""
      }
        
      if(barangay_id.trim().length != 0)
      {
          barangay_name = barangay_id;
      }
      else
      {
          barangay_name = ""
      }


      if(d_from > d_to)
      {
      $("#disease_range_to").addClass("is-invalid");
      $("#disease_range_to").val("");
        validator =false
      }

      if(validator === true)
      {
          query_click = "clicked"
          sort = "names"
          date_range_from = from_input;
          date_range_to = to_input;
          $('#filter-time').modal('toggle');
          current_status()
          update_chart()
          table.destroy()
          $(".dataTables_length").remove();
          $(".dataTables_info").remove();
          $(".dataTables_paginate ").remove();
          load_data_tables()
          $("#filter_table").modal("toggle");
      }
    })
    //filter chart end

    //back to default record
    $("#current_year").click(function()
    {

      barangay_name = ""
      date_range_from = "";
      date_range_to = "";
      gender = "";
      min_age = "";
      max_age = "";
      disease_type = "";
      query_click = "unclicked"

      $("#age_min").val("");
      $("#age_max").val("");
      $( "#disease_range_from" ).val(current_year_from);
      $( "#disease_range_from" ).removeClass("is-invalid");
      $( "#disease_range_to" ).val(current_year_to);
      $( "#disease_range_to" ).removeClass("is-invalid");
      var $select = $('#disease_selecte_barangay').selectize();
      var control = $select[0].selectize;
      control.clear();

      var $select = $('#disease_select_gender').selectize();
      var control = $select[0].selectize;
      control.clear();

      var $select = $('#disease_select_diseases').selectize();
      var control = $select[0].selectize;
      control.clear();

      sort = "names"

      current_status()
      update_chart()
      swal.close();
      table.destroy()
      $(".dataTables_length").remove();
      $(".dataTables_info").remove();
      $(".dataTables_paginate ").remove();
      load_data_tables()

    })
    //back to default record end' 

   if (update_chart_var === true)
   {
     update_chart()
   }
   else
  {
     number_of_resident_chart()
     current_status()
  }

   
 }
//chart













