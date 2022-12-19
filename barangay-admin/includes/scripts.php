</div>
<script>
  if ( window.history.replaceState ){window.history.replaceState( null, null, window.location.href );} // stop resubmission

  //remove invalid class
  $('div').bind('focus blur', function() {
    $("select").removeClass("is-invalid");
    $("input").removeClass("is-invalid");
    $(".selectize-control").removeClass("is-invalid");
  });
  $('input').bind('focus blur', function() {
    $("input").removeClass("is-invalid");
    $(".selectize-control").removeClass("is-invalid");
  });
    //remove invalid class


    $(document).ready(function()
    {
    var dashboard_icon_tooltip = $("#dashboard_icon")
    var myOpentip = new Opentip(dashboard_icon_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "left", target:dashboard_icon_tooltip, delay:0.50 });
    myOpentip.setContent("Dashboard"); // Updates Opentips content


    var manage_residents_icon_tooltip = $("#manage_residents_icon")
    var myOpentip = new Opentip(manage_residents_icon_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "left", target:manage_residents_icon_tooltip, delay:0.50 });
    myOpentip.setContent("Manage Residents"); // Updates Opentips content


    var manage_hp_icon_tooltip = $("#manage_hp_icon")
    var myOpentip = new Opentip(manage_hp_icon_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "left", target:manage_hp_icon_tooltip, delay:0.50 });
    myOpentip.setContent("Manage Health Profiles"); // Updates Opentips content

    var account_menu_tooltip = $("#account_menu")
    var myOpentip = new Opentip(account_menu_tooltip, { showOn:"mouseover", tipJoint: "right", target:account_menu_tooltip, delay:0.50 });
    myOpentip.setContent("Account Options"); // Updates Opentips content

    var account_menu_tooltip = $(".sidebar-toggler")
    var myOpentip = new Opentip(account_menu_tooltip, { showOn:"mouseover", tipJoint: "left", target:account_menu_tooltip, delay:0.50 }); 
    myOpentip.setContent("Sidebar-toggler Minimize/Maximize"); // Updates Opentips content 

    var account_menu_tooltip = $(".header-toggler")
    var myOpentip = new Opentip(account_menu_tooltip, { showOn:"mouseover", tipJoint: "left", target:account_menu_tooltip, delay:0.50 }); 
    myOpentip.setContent("Sidebar-toggler Hide/Show"); // Updates Opentips content 

    })
  </script>
    
  <script type="module" src="../resourcess/js/sidebar.js"></script>

  <!-- CoreUI and necessary plugins-->
  <script src="../resourcess/vendors/@coreui/coreui/js/coreui.bundle.min.js"></script>
  <script src="../resourcess/vendors/simplebar/js/simplebar.min.js"></script>
  <!-- Plugins and scripts required by this view-->
  <script src="../resourcess/vendors/@coreui/utils/js/coreui-utils.js"></script>

  <!--scripts-->
  <script src="effects/update-password_username.js" ></script>
  <!--scripts end-->

</body>
</html>