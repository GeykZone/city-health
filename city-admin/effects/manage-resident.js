$(document).ready(function () {
    $(document).attr("title", "HPCS | Manage Residents"); 
    select_with_search_box(); 
    enable_form();  
  });

// for select
function select_with_search_box()
{
  $('select').selectize({
   // maxItems: '1',
    sortField: 'text'
});
}
// for select  end

//enable the form when a barangay is picked
function enable_form()
{
  $("#select_barangay").change(function(){ 
    var barangay_name = $("#select_barangay").text();
    barangay_name = barangay_name.replace(/ /g,"_");
    barangay_name = barangay_name.toLowerCase();

    if(barangay_name.trim().length != 0)
    {
        $('fieldset').removeAttr("disabled");
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
        $('fieldset').attr("disabled", true);
        $('#gender')[0].selectize.disable(); 
        $('#civil_status')[0].selectize.disable(); 
    }
    
});
}
//enable the form when a barangay is picked end