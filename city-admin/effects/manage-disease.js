var i = 0;

$(document).ready(function()
{
  $(document).attr("title", "HPCS | Manage Diseases Type");
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
      $("#add_disease").removeClass("d-none");
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


  //$(".barangay_table_is_loading").removeClass("d-none");
  //$(".edit_barangay_value").addClass("d-none");
  //$("#barangay_table_paginate").addClass("d-none");
 // $("#barangay_table_info").addClass("d-none");
  setInterval(move())
  $("#myProgress").removeClass("d-none");

  toastMixin.fire({
    animation: true,
    title: 'A new type of disease has been added in the list.'
  });
  setTimeout(function(){

    $("#myBar").text("Table Updated Successfully!");
    setTimeout(function(){
      //table.ajax.reload( null, false);
      //$("#barangay_table_paginate").removeClass("d-none");
      //$("#barangay_table_info").removeClass("d-none");
      $("#myProgress").addClass("d-none");
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
}
//trigger error messages