  var $resident_age = "";
  var i = 0;
  var table = "";
  var chart = "";

  var barangay_name = "";
  var first_name = "";
  var middle_name = "";
  var last_name = "";
  var age = "";
  var gender = "";
  var birthdate = "";
  var civil = "";
  var contact = "";
  var email = "";
  var update_resident_age = "";

  var x_value = "";
  var y_value = "";
  var xValues = "";
  var yValues = "";
  var largets_total = "";
  var myColors=[];
  
  var sort = "names";

  var myChart ="";
  var res_id_value ="";
  

  $(document).ready(function () {
  $(document).attr("title", "HPCS | Manage Residents"); 
  select_with_search_box(); 
  enable_form();  
  generate_age();
  get_resident_table_cell_value()
  
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

  // for select
  function select_with_search_box()
  {
  $('select').selectize({
  // maxItems: '1',
  sortField: 'text'
  });
  $(".selectize-control").removeClass("form-control barangay-form")
  }
  // for select  end

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
  $('#add-barangay-resident').modal('toggle');

  $("#select_barangay").val("");
  var $select = $('#select_barangay').selectize();
  var control = $select[0].selectize;
  control.clear();
  $("#firstname").val("");
  $("#middlename").val("");
  $("#lastname").val("");
  $("#gender").val("");
  $select = $('#gender').selectize();
  control = $select[0].selectize;
  control.clear();
  $( "#birthdate" ).val("0000-00-00");
  $("#contact").val("");
  $("#email").val("");
  $("#civil_status").val("");
  $select = $('#civil_status').selectize();
  control = $select[0].selectize;
  control.clear();

  
  toastMixin.fire({
  animation: true,
  title: 'A new resident has been added in the list.'
  });

  table.ajax.reload( null, false);
  update_chart();
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
  $('#update-barangay-resident').modal('toggle');

  $("#update_select_barangay").val("");
  var $select = $('#update_select_barangay').selectize();
  var control = $select[0].selectize;
  control.clear();
  $("#update_firstname").val("");
  $("#update_middlename").val("");
  $("#update_lastname").val("");
  $("#update_gender").val("");
  $select = $('#update_gender').selectize();
  control = $select[0].selectize;
  control.clear();
  $( "#update_birthdate" ).val("0000-00-00");
  $("#update_contact").val("");
  $("#update_email").val("");
  $("#update_civil_status").val("");
  $select = $('#update_civil_status').selectize();
  control = $select[0].selectize;
  control.clear();


  toastMixin.fire({
  animation: true,
  title: 'A resident record has been updated.'
  });

  table.ajax.reload( null, false);
  update_chart();
  }
  else if(confirmation.a == 4)
  {  
  toastMixin.fire({
  animation: true,
  title: 'A resident record has been deleted.'
  });
  table.ajax.reload( null, false);
  update_chart();
  }
  }
  //trigger error messages end

//get the id of resident
function click_value(this_value)
{
  res_id_value = this_value.substr(this_value.indexOf(" ") + 1);
}
//get the id of resident end

  //show data tables
  function load_data_tables() {

  if ( ! $.fn.DataTable.isDataTable( '#resident_table' ) ) { // check if data table is already exist

  table = $('#resident_table').DataTable({

    // "processing": true,
    "deferRender": true,
    "serverSide": true,
    "ajax": "functions/display-functions/show-resident.php",   
    "autoWidth": false,
    scrollCollapse: true,
    "dom": 'Brltip',     
    "lengthMenu": [[10, 50, 100, 500, 1000], [10, 50, 100, 500, 1000]],

    //disable the sorting of colomn
    "columnDefs": [ {
      "targets": 10,
      "orderable": false
      } ],

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
        targets: 10,
        render: function(data)
        {
          return "<div class='text-end px-3'> <i onclick = 'click_value(this.id)' class='update_resident_value shadow-sm align-middle edit_barangay_value update edit_btn fas fa-edit' data-coreui-toggle='modal' href='#update-barangay-resident' id='update_resident_value "+data+"' role='button'></i> "+
          "<i onclick = 'click_value(this.id)' class='delete_resident_value shadow-sm align-middle edit_barangay_value del_btn fa-solid fa-trash-can' href='#delete_resident' data-coreui-toggle='modal' id='delete_resident_value "+data+"' role='button'></i>"+
          "</div>"
        }

      }
    ],

  "buttons": [
    {
        extend: 'copy',
        text: ' COPY',

        title: 'Health Profile Clustering System',

        messageTop: 'List of Residents in Oroquieta City',
        //className: 'fa fa-solid fa-clipboard',
        

        exportOptions: {
        modifier: {
            page: 'current'
        },
          //columns: [0, 1] //r.broj kolone koja se stampa u PDF
          columns: [0,1,2,3,4,5,6,7,9],
          // optional space between columns
          columnGap: 1
        }

    },
    { 
        extend: 'excel',
        text: ' EXCEL',

        title: 'Health Profile Clustering System',

        messageTop: 'List of Residents in Oroquieta City',
        //className: 'fa fa-solid fa-table',  //<i class="fa-solid fa-clipboard"></i>
        

        exportOptions: {
        modifier: {
            page: 'current'
        },
          //columns: [0, 1] //r.broj kolone koja se stampa u PDF
          columns: [0,1,2,3,4,5,6,7,9],
          // optional space between columns
          columnGap: 1
        }

    },
    {
        extend: 'print',
        text: ' PDF',

        title: 'Health Profile Clustering System',

        messageTop: 'List of Residents in Oroquieta City',
        //className: 'fa fa-print',
        

        exportOptions: {
        modifier: {
            page: 'current'
        },
          //columns: [0, 1] //r.broj kolone koja se stampa u PDF
          columns: [0,1,2,3,4,5,6,7,9],
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
  table.buttons().container().appendTo('#resident_table_wrapper .col-md-6:eq(0)');

  $('#resident_table #th_1 td').each(function () {
    var title = this.id;

    if(title === "settings" )
    {
    
      $(this).html('<div class="text-center" ><span style = "color:#9eaaad; font-size:13px;" class="me-2"><span class="fa-solid fa-magnifying-glass me-2"></span>Search Area</span></div>');
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
  $("#resident_table_wrapper").addClass("row");

  $(".dt-buttons").detach().appendTo('#buttons') 
  $(".dt-buttons").addClass("col-lg-2 text-center col-md-12 mb-3"); 
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

  //enable the form when a barangay is picked
  function enable_form()
  {
  // adding (first time)
  $("#select_barangay").change(function(){ 
  var barangay_name = $("#select_barangay").text();

  if(barangay_name.trim().length != 0)
  {
  $('#fieldset1').removeAttr("disabled");
  $('#gender')[0].selectize.enable(); 
  $('#civil_status')[0].selectize.enable(); 
  $('.birthdate').css(
    {
        'cssText': 'color: #333 !important'
    }
  );
  }
  else
  {
  $('.birthdate').css(
  {
      'cssText': 'color:#818a99 !important'
  }
  );

  $('#fieldset1').attr("disabled", true);
  $('#gender')[0].selectize.disable(); 
  $('#civil_status')[0].selectize.disable(); 

  }
  });

  //updating
  $("#update_select_barangay").change(function(){ 
  var barangay_name = $("#update_select_barangay").text();

  if(barangay_name.trim().length != 0)
  {
  $('#fieldset2').removeAttr("disabled");
  $('#update_gender')[0].selectize.enable(); 
  $('#update_civil_status')[0].selectize.enable(); 
  $('.birthdate2').css(
  {
      'cssText': 'color: #333 !important'
  }
  );
  }
  else
  {
  $('.birthdate2').css(
  {
    'cssText': 'color:#818a99 !important'
  }
  );

  $('#fieldset2').attr("disabled", true);
  $('#update_gender')[0].selectize.disable(); 
  $('#update_civil_status')[0].selectize.disable(); 

  }

  });
  }
  //enable the form when a barangay is picked end 

  //create date picker
  function generate_age()
  {
  //adding (first add)
  $("#birthdate").datepicker({
  dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
  });

  //updating
  $("#update_birthdate").datepicker({
  dateFormat: 'yy-mm-dd',changeMonth: true,changeYear: true,yearRange:"c-100:c+0"
  });
  }
  //create date picker end

  //submit new barangay
  $("#add_resident_btn").click(function () {

  var barangay_id = $("#select_barangay").val();
  var firstname = $("#firstname").val();
  var middlename = $("#middlename").val();
  var lastname = $("#lastname").val();
  var gender = $("#gender").val();

  var birthdate = $('#birthdate').val();
  dob = birthdate;
  dob = new Date(dob);
  today = new Date();
  age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
  resident_age = "-"+age+"-";

  var contact = $("#contact").val();
  var thisemail = $("#email").val();
  var civil_status = $("#civil_status").val();

  if (barangay_id.trim().length === 0) //check if value is empty
  {
  $("#select_barangay").addClass("is-invalid");
  $("#select_brg_list .selectize-control").addClass("is-invalid");
  }
  else if (firstname.trim().length === 0) //check if value is empty
  {
  $("#firstname").addClass("is-invalid");
  }
  else if (middlename.trim().length === 0) //check if value is empty
  {
  $("#middlename").addClass("is-invalid");
  }
  else if (lastname.trim().length === 0) //check if value is empty
  {
  $("#lastname").addClass("is-invalid");
  }
  else if (birthdate.trim().length === 0) //check if value is empty
  {
  $("#birthdate").addClass("is-invalid");
  }
  else if (gender.trim().length === 0) //check if value is empty
  {
  $("#gender").addClass("is-invalid");
  $("#select_gender_list .selectize-control").addClass("is-invalid");
  }
  else if (civil_status.trim().length === 0) //check if value is empty
  {
  $("#civil_status").addClass("is-invalid");
  $("#select_status_list .selectize-control").addClass("is-invalid");
  }
  else if (contact.trim().length === 0) //check if value is empty
  {
  $("#contact").addClass("is-invalid");
  $("#phno_validator_label").text("Please don't leave this area empty.")
  }
  else
  {

    function submit_new_resident()
    { 

      function allCharactersSame(s)
          {
              let n = s.length;
              for (let i = 1; i < n; i++)
                  if (s[i] != s[0])
                      return false;
       
              return true;
          }

          function line1(s)
          {
              let n = s.length;
              for (let i = 2; i < n; i++)
                  if (s[i] != s[1])
                      return false;
       
              return true;
          }

          function line2(s)
          {
              let n = s.length;
              for (let i = 3; i < n; i++)
                  if (s[i] != s[2])
                      return false;
       
              return true;
          }

          function line3(s)
          {
              let n = s.length;
              for (let i = 4; i < n; i++)
                  if (s[i] != s[3])
                      return false;
       
              return true;
          }

          function line4(s)
          {
              let n = s.length;
              for (let i = 5; i < n; i++)
                  if (s[i] != s[4])
                      return false;
       
              return true;
          }

          function line5(s)
          {
              let n = s.length;
              for (let i = 6; i < n; i++)
                  if (s[i] != s[5])
                      return false;
       
              return true;
          }

          function line6(s)
          {
              let n = s.length;
              for (let i = 7; i < n; i++)
                  if (s[i] != s[6])
                      return false;
       
              return true;
          }

          if(contact.charAt(0) === "9" && contact.length === 10 && allCharactersSame(contact) != true && line1(contact) != true && line2(contact) != true
          && line3(contact) != true && line4(contact) != true && line5(contact) != true  && line6(contact) != true) 
        {
          contact = "63"+contact;
          $.post("functions/add-functions/add-resident.php", {

            barangay_id: barangay_id,
            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            age: resident_age,
            gender: gender,
            birthdate: birthdate,
            contact: contact,
            thisemail: thisemail,
            civil_status: civil_status

          },
          function (data, status) {
            confirmation.a = data;
    
          });
        }
        else
        {
          $("#contact").addClass("is-invalid");
          $("#phno_validator_label").text("Invalid phone number; please type a valid 10-digit Philippine phone number (e.g. 9123456789).");
        }

    }

    if (thisemail.trim().length != 0) //check if value is empty
    {
        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        if( !isEmail(thisemail)) { 
            $("#email").addClass("is-invalid");
        }
        else
        {
          submit_new_resident();
        }
    }
    else
    {
      submit_new_resident();
    }

  }

  });
  //submit new barangay end

  //delete resident
  $("#delete_resident_record").click(function()
  {
    $.post("functions/delete-functions/delete-resident.php", {
      resident_id: res_id_value

    },
    function (data, status) {
    confirmation.a = data;

    });
  })
  //delete resident end

  //update-resident
    $("#update_resident_btn").click(function()
    { 
      var new_barangay_name = $("#update_select_barangay").val();
      var new_firstname = $("#update_firstname").val();
      var new_middlename = $("#update_middlename").val();
      var new_lastname = $("#update_lastname").val();
      var new_gender = $('#update_gender').val();

      var new_birthdate = $("#update_birthdate").val();
      dob = new_birthdate;
      dob = new Date(dob);
      today = new Date();
      upadateage = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
      update_resident_age = "-"+upadateage+"-";
      var new_age = update_resident_age;

      var new_civil = $('#update_civil_status').val();
      var new_contact = $("#update_contact").val();
      var new_email = $("#update_email").val();

      if (new_barangay_name.trim().length === 0) //check if value is empty
      {
      $("#update_select_barangay").addClass("is-invalid");
      $("#update_select_bgy_list .selectize-control").addClass("is-invalid");
      }
      else if (new_firstname.trim().length === 0) //check if value is empty
      {
      $("#update_firstname").addClass("is-invalid");
      }
      else if (new_middlename.trim().length === 0) //check if value is empty
      {
      $("#update_middlename").addClass("is-invalid");
      }
      else if (new_lastname.trim().length === 0) //check if value is empty
      {
      $("#update_lastname").addClass("is-invalid");
      }
      else if (new_birthdate.trim().length === 0) //check if value is empty
      {
      $("#update_birthdate").addClass("is-invalid");
      }
      else if (new_gender.trim().length === 0) //check if value is empty
      {
      $("#update_gender").addClass("is-invalid");
      $("#update_select_gender .selectize-control").addClass("is-invalid");
      }
      else if (new_civil.trim().length === 0) //check if value is empty
      {
      $("#update_civil_status").addClass("is-invalid");
      $("#update_select_status .selectize-control").addClass("is-invalid");
      }
      else if (new_contact.trim().length === 0) //check if value is empty
      {
      $("#update_contact").addClass("is-invalid");
      $("#update_phno_validator_label").text("Please don't leave this area empty.")
      }
      else
      {

        function update_resident()
        {
          function allCharactersSame(s)
          {
              let n = s.length;
              for (let i = 1; i < n; i++)
                  if (s[i] != s[0])
                      return false;
       
              return true;
          }

          function line1(s)
          {
              let n = s.length;
              for (let i = 2; i < n; i++)
                  if (s[i] != s[1])
                      return false;
       
              return true;
          }

          function line2(s)
          {
              let n = s.length;
              for (let i = 3; i < n; i++)
                  if (s[i] != s[2])
                      return false;
       
              return true;
          }

          function line3(s)
          {
              let n = s.length;
              for (let i = 4; i < n; i++)
                  if (s[i] != s[3])
                      return false;
       
              return true;
          }

          function line4(s)
          {
              let n = s.length;
              for (let i = 5; i < n; i++)
                  if (s[i] != s[4])
                      return false;
       
              return true;
          }

          function line5(s)
          {
              let n = s.length;
              for (let i = 6; i < n; i++)
                  if (s[i] != s[5])
                      return false;
       
              return true;
          }

          function line6(s)
          {
              let n = s.length;
              for (let i = 7; i < n; i++)
                  if (s[i] != s[6])
                      return false;
       
              return true;
          }

            if(new_contact.charAt(0) === "9" && new_contact.length === 10 && allCharactersSame(new_contact) != true && line1(new_contact) != true && line2(new_contact) != true
            && line3(new_contact) != true && line4(new_contact) != true && line5(new_contact) != true  && line6(new_contact) != true) 
            {
              new_contact = "63"+new_contact; //639276003238

              $.post("functions/update-functions/update-resident.php", {
                resident_id: res_id_value,
        
                new_barangay_name: new_barangay_name,
                new_firstname: new_firstname,
                new_middlename: new_middlename,
                new_lastname: new_lastname,
                new_age: new_age,
                new_gender: new_gender,
                new_birthdate: new_birthdate,
                new_civil: new_civil,
                new_contact: new_contact,
                new_email: new_email
                
                },
                function (data, status) {
                confirmation.a = data;
            
                });

            }
            else
            {
              $("#update_contact").addClass("is-invalid");
              $("#update_phno_validator_label").text("Invalid phone number; please type a valid 10-digit Philippine phone number (e.g. 9123456789).");
            }
          
    
        }


        if (new_email.trim().length != 0) //check if value is empty
        {
            function isEmail(email) {
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                return regex.test(email);
            }
    
            if( !isEmail(new_email)) { 
                $("#update_email").addClass("is-invalid");
            }
            else
            {
              update_resident()
            }
        }
        else
        {
          update_resident()
        }

      }
    

    })
  //update-resident end

  //erese input fields when x button is pressed
  //add resident
  $("#close_add_resident").click(function()
  {
  $("#select_barangay").val("");
  var $select = $('#select_barangay').selectize();
  var control = $select[0].selectize;
  control.clear();
  $("#firstname").val("");
  $("#middlename").val("");
  $("#lastname").val("");
  $("#gender").val("");
  $select = $('#gender').selectize();
  control = $select[0].selectize;
  control.clear();
  $( "#birthdate" ).val("0000-00-00");
  $('.birthdate').css(
  {
      'cssText': 'color:#818a99 !important'
  }
  );
  $("#contact").val("");
  $("#email").val("");
  $("#civil_status").val("");
  $select = $('#civil_status').selectize();
  control = $select[0].selectize;
  control.clear();
  })
  //erese input fields when x button is pressed end

  //get the table cell value when selected
  function get_resident_table_cell_value()
  {

  //update
  $("#resident_table").on('click','.update_resident_value',function(){
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

  $("#update_select_barangay").data('selectize').setValue(col0);
  $("#update_firstname").val(col1);
  $("#update_middlename").val(col2);
  $("#update_lastname").val(col3);
  update_resident_age = col4;
  $('#update_gender').data('selectize').setValue(col5);
  $("#update_birthdate").val(col6);
  $('#update_civil_status').data('selectize').setValue(col7);

  $("#update_contact").val(col8);
  var trim_the_63_phone_number = $("#update_contact").val();
  var trimm_version_phone_number = trim_the_63_phone_number.substring(2);
  $("#update_contact").val(trimm_version_phone_number)

  $("#update_email").val(col9);

  });

  }
  //get the table cell value when selected end

  //initalize chart values
  function chart_array()
  {
    $.ajaxSetup({async:false});
    $.getJSON('functions/display-functions/show-number-of-resident.php', 
    {
      barangay_name:'set'
    }, 
    
    function (data, textStatus, jqXHR) 
    {
      x_value = data;
    });

    $.getJSON('functions/display-functions/show-number-of-resident.php', 
    {
      total_residents_number:'set'
    }, 
    
    function (data, textStatus, jqXHR) 
    {
      y_value = data;
      
    });    

    if(sort === "asc")
    {
        //sorting algorithm
        arrayOfObj = x_value.map(function(d, i) {
          return {
            label: d,
            data: y_value[i] || 0
          };
        });
        
        sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
          return a.data - b.data;
        });
        
        newArrayLabel = [];
        newArrayData = [];
        sortedArrayOfObj.forEach(function(d){
          newArrayLabel.push(d.label);
          newArrayData.push(d.data);
        });
        ////sorting algorithm
    }
    else if(sort === "desc")
    {
        //sorting algorithm
        arrayOfObj = x_value.map(function(d, i) {
          return {
            label: d,
            data: y_value[i] || 0
          };
        });
        
        sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
          return b.data - a.data ;
        });
        
        newArrayLabel = [];
        newArrayData = [];
        sortedArrayOfObj.forEach(function(d){
          newArrayLabel.push(d.label);
          newArrayData.push(d.data);
        });
        ////sorting algorithm
    }
    else
    {
            //sorting algorithm
            arrayOfObj = x_value.map(function(d, i) {
              return {
                label: d,
                data: y_value[i] || 0
              };
            });
            
            sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
              return a.data + b.data;
            });
            
            newArrayLabel = [];
            newArrayData = [];
            sortedArrayOfObj.forEach(function(d){
              newArrayLabel.push(d.label);
              newArrayData.push(d.data);
            });
            ////sorting algorithm
    }

        x_value = newArrayLabel;
        y_value = newArrayData;

        xValues = x_value;
        yValues = y_value; 

        //generate a color base on percentage
        largets_total = Math.max(...y_value) //get the largest element of the brg resident array
        $.each(yValues, function( index,value ) {
            var b =100
            var percentage = b * value;
            percentage = percentage / largets_total;

          if(percentage<=10){
              myColors[index]="#b3e6ffff";
          }
          else if(percentage<=30)
          {
            myColors[index]="#80d5ffff";
          }
          else if(percentage<=50)
          {
            myColors[index]="#4dc4ffff";
          }
          else{
            myColors[index]="#1ab3ffff";
          }
        });

  }
   //initalize chart values end

  //number of residents chart
  function number_of_resident_chart()
  {
    
    //initialize chart
    const ctx = $('#myChart');
    myChart = new Chart(ctx, {
    type: 'bar',
    options: {
      indexAxis: 'x',
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: true
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            display: true,
            drawBorder: true
          },
          ticks: {
            display: true
          },
          type: 'linear',
          grace: '5%'
        }
  
      },
      plugins: {
          responsive: true,
          legend: {
              display: false,
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            events:['click'],
            padding: 15,
            caretSize: 10,
            cornerRadius: 20,
            caretPadding: 0,
            usePointStyle: true,
            backgroundColor: '#ffffff',
            bodyColor: "#626464",
            titleColor:  "#626464",
            borderColor: "#dee0e0",
            borderWidth: 1,
            callbacks: {
            labelPointStyle: function(context) {
              return {
                  pointStyle: 'rectRounded',
                  rotation: 0,
              };
            }

          },
          }
      }
    },
    
    data: {
        labels: xValues,
        dataSorting: {
          enabled: true
       },
        datasets: [{
            label: 'Total Number of Residents: ',
            data: yValues,
            backgroundColor: myColors,
            borderColor: "#80d5ffff",
            borderWidth: 1,
            borderRadius: 8,
           // pointRadius: myPoints,
            borderSkipped: false,
            barPercentage: 0.8,
            categoryPercentage:0.8,
            //poinStyle: 'circle'
        }]
    },
});



}
  //number of residents chart end

//update chart
function update_chart()
{
  chart_array();
  myChart.data.labels = x_value;
  myChart.data.datasets[0].data = y_value;
  myChart.update();
}
//update chart end


//show graph button
var chart_show_variable = "close"
var chart_shower = "firstime"
$("#show_graph").click(function()
{
  $("#show_graph_txt").text("ClOSE CHART")
  if(chart_show_variable === "close")
  {
    if(chart_shower === "firstime")
    {
      chart_array()
      number_of_resident_chart();
      myChart.destroy();
      $(".chart_container").slideDown("slow", function()
      {

      });
      number_of_resident_chart();
     
    }
    
    $(".chart_container").slideDown("slow", function()
    {
    });
    chart_show_variable = "open"
    chart_shower = "!firstime"
  }
  else
  {
    $("#show_graph_txt").text("OPEN CHART")
    $(".chart_container").slideUp("slow", function()
    {
      chart_show_variable = "close"
    })

  }

})
//show graph button end

//refresh table back to current data
$("#refresh_resident_table").click(function(e)
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
  var refresh_table_tooltip = $("#refresh_resident_table")
  var myOpentip = new Opentip(refresh_table_tooltip, { showOn:"mouseover", tipJoint: "bottom", target:refresh_table_tooltip });
  myOpentip.setContent("Refresh Table"); // Updates Opentips content
}
//generate a tooltip end

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


//reactivate tooltip chart
$("#myChart").click(function(e){
 
  if(myChart.options.plugins.tooltip.enabled != true)
  {
    myChart.options.plugins.tooltip.enabled = true
  }
  myChart.update();

})

$("#myChart").mouseout(function(e){
  myChart.options.plugins.tooltip.enabled = false
  myChart.update();
});
//reactivate tooltip chart end
