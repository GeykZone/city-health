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

  var myChart ="";
  

  $(document).ready(function () {
  $(document).attr("title", "HPCS | Manage Residents"); 
  select_with_search_box(); 
  enable_form();  
  generate_age();
  get_resident_table_cell_value()
  load_data_tables();;
  $("#resident_table_wrapper").addClass("d-none");
  load_progress_bar();
  });

  //progress bar 
  function load_progress_bar()
  {
  setInterval(move())
  setTimeout( function()
  {
  $("#myBar").text("Table Loaded Successfully!");
  $("#residents_chart_row").removeClass("d-none");
  setTimeout(function(){
  chart_array();
  number_of_resident_chart();
  $("#myProgress").addClass("d-none");
  $("#resident_table").removeClass("d-none");
  $("#resident_table_wrapper").removeClass("d-none");
  $("#add_resident").removeClass("d-none");
  $(".c1").removeClass("d-none"); 
  $("#myChart").removeClass("d-none");
  $("#chart_line").removeClass("d-none");
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

  $(".barangay_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#resident_table_paginate").addClass("d-none");
  $("#resident_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");

  toastMixin.fire({
  animation: true,
  title: 'A new resident has been added in the list.'
  });

  setTimeout(function(){  

  $("#myBar").text("Table Updated Successfully!");
  setTimeout(function(){
  table.ajax.reload( null, false);
  $("#resident_table_paginate").removeClass("d-none");
  $("#resident_table_info").removeClass("d-none");
  $("#myProgress").addClass("d-none");
  $(".barangay_table_is_loading").addClass("d-none");
  $(".edit_barangay_value").removeClass("d-none");
  number_of_resident_chart();
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

  $(".barangay_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#resident_table_paginate").addClass("d-none");
  $("#resident_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");

  toastMixin.fire({
  animation: true,
  title: 'A resident record has been updated.'
  });

  setTimeout(function(){  

  $("#myBar").text("Table Updated Successfully!");
  setTimeout(function(){
  table.ajax.reload( null, false);
  $("#resident_table_paginate").removeClass("d-none");
  $("#resident_table_info").removeClass("d-none");
  $("#myProgress").addClass("d-none");
  $(".barangay_table_is_loading").addClass("d-none");
  $(".edit_barangay_value").removeClass("d-none");
  number_of_resident_chart();
  },600);

  },3000);
  }
  else if(confirmation.a == 4)
  {  
  $(".barangay_table_is_loading").removeClass("d-none");
  $(".edit_barangay_value").addClass("d-none");
  $("#resident_table_paginate").addClass("d-none");
  $("#resident_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");
  toastMixin.fire({
  animation: true,
  title: 'A resident record has been deleted.'
  });

  setTimeout(function(){  
  $("#myBar").text("Table Updated Successfully!");
  setTimeout(function(){
  table.ajax.reload( null, false);
  $("#resident_table_paginate").removeClass("d-none");
  $("#resident_table_info").removeClass("d-none");
  $("#myProgress").addClass("d-none");
  $(".barangay_table_is_loading").addClass("d-none");
  $(".edit_barangay_value").removeClass("d-none");
  update_chart();
  },600);
  },3000);
  }
  }
  //trigger error messages end

  //show data tables
  function load_data_tables() {

  if ( ! $.fn.DataTable.isDataTable( '#resident_table' ) ) { // check if data table is already exist

  table = $('#resident_table').DataTable({

    // "processing": true,
    "deferRender": true,
    "serverSide": true,
    "ajax": "functions/show-resident.php",   
    "autoWidth": false,
    scrollCollapse: true,
    "dom": 'lfBrtip',      
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
        "defaultContent": "<i class='edit_barangay_value update btn_icon fas fa-edit' data-coreui-toggle='modal' href='#update-barangay-resident' id='update_resident_value' role='button'></i> "+
        "<i class='edit_barangay_value btn_icon fas fa-trash' href='#delete_resident' data-coreui-toggle='modal' id='delete_resident_value' role='button'></i>"+
        "<i class='barangay_table_is_loading spinner-border spinner-border-sm mt-2 d-none' style='color:#3b7ddd;'  id='barangay_table_is_loading' role='button' disable></i>"
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

        customize: function (win) {
            $(win.document.body)
                .css('text-align', 'center')

            $(win.document.body).find('table')
                .css('font-size', '12pt');
        }
    }],
  });
  table.buttons().container().appendTo('#resident_table_wrapper .col-md-6:eq(0)');
    
  }

  //to align the data table buttons
  $("#resident_table_wrapper").addClass("row");
  $("#resident_table_length").addClass("col-sm-6");
  $("#resident_table_length").addClass("mb-3");
  $("#resident_table_filter").addClass("col-sm-6");
  $("#resident_table_filter").addClass("mb-3");
  $(".dt-buttons").addClass("col-sm-2"); 
  $(".dt-buttons").removeClass("flex-wrap ");

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
  resident_age = age;

  var contact = $("#contact").val();
  var thisemail = $("#email").val();
  var civil_status = $("#civil_status").val();

  if (barangay_id.trim().length === 0) //check if value is empty
  {
  $("#select_barangay").addClass("is-invalid");
  $(".selectize-control").addClass("is-invalid");
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
  }
  else if (civil_status.trim().length === 0) //check if value is empty
  {
  $("#civil_status").addClass("is-invalid");
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
          $.post("functions/add-resident.php", {

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
    $.post("functions/delete-resident.php", {
    barangay_name: barangay_name,
    first_name: first_name,
    middle_name: middle_name,
    last_name: last_name,
    age: age,
    gender: gender,
    birthdate: birthdate,
    civil: civil,
    contact: contact,
    email: email

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
      update_resident_age = upadateage;
      var new_age = update_resident_age;

      var new_civil = $('#update_civil_status').val();
      var new_contact = $("#update_contact").val();
      var new_email = $("#update_email").val();

      if (new_barangay_name.trim().length === 0) //check if value is empty
      {
      $("#update_select_barangay").addClass("is-invalid");
      $(".selectize-control").addClass("is-invalid");
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
      }
      else if (new_civil.trim().length === 0) //check if value is empty
      {
      $("#update_civil_status").addClass("is-invalid");
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

              $.post("functions/update-resident.php", {
                old_barangay_name: barangay_name,
                old_first_name: first_name,
                old_middle_name: middle_name,
                old_last_name: last_name,
                old_age: age,
                old_gender: gender,
                old_birthdate: birthdate,
                old_civil: civil,
                old_contact: contact,
                old_email: email,
        
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

  //deleting
  $("#resident_table").on('click','#delete_resident_value',function(){
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

    barangay_name = col0;
    first_name = col1;
    middle_name = col2;
    last_name = col3;
    age = col4;
    gender = col5;
    birthdate = col6;
    civil = col7;
    contact = col8;
    email = col9;
  });

  //update
  $("#resident_table").on('click','#update_resident_value',function(){
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

  barangay_name = col0;
  first_name = col1;
  middle_name = col2;
  last_name = col3;
  age = col4;
  gender = col5;
  birthdate = col6;
  civil = col7;
  contact = col8;
  email = col9;

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
    $.getJSON('functions/show-number-of-resident.php', 
    {
      barangay_name:'set'
    }, 
    
    function (data, textStatus, jqXHR) 
    {
      x_value = data;
      
    });

    $.getJSON('functions/show-number-of-resident.php', 
    {
      total_residents_number:'set'
    }, 
    
    function (data, textStatus, jqXHR) 
    {
      y_value = data;
      
    });    

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

        x_value = newArrayLabel;
        y_value = newArrayData;

  }
   //initalize chart values end

  //number of residents chart
  function number_of_resident_chart()
  {
    var xValues = x_value;
    var yValues = y_value;
    var barColors = [
        'rgba(145, 215, 248, 1.0)',
        'rgba(52, 152, 219,1.0)',
    ];

    const ctx = $('#myChart');

    myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: xValues,
        dataSorting: {
          enabled: true
       },
        datasets: [{
            label: 'Total Number of Residents of Each Barangay in Oroquieta City',
            data: yValues,
            backgroundColor: barColors,
            borderColor: barColors,
            borderWidth: 1
        }]
    },
    options: {
    plugins: {
        legend: {
            display: false,
        }
    }
}

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

