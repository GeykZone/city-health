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

      var cc_date = new Date();
      var cc_date_year = cc_date.getFullYear();
      $("#cc").text(cc_date_year)


      $(document).ready(function()
      {
      var dashboard_icon_tooltip = $("#dashboard_icon")
      var myOpentip1 = new Opentip(dashboard_icon_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "left", target:dashboard_icon_tooltip, delay:0.50 });
      myOpentip1.setContent("Dashboard"); // Updates Opentips content

      var manage_barangay_icon_tooltip = $("#manage_barangay_icon")
      var myOpentip2 = new Opentip(manage_barangay_icon_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "left", target:manage_barangay_icon_tooltip, delay:0.50 });
      myOpentip2.setContent("Manage Barangays"); // Updates Opentips content

      var manage_residents_icon_tooltip = $("#manage_residents_icon")
      var myOpentip3 = new Opentip(manage_residents_icon_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "left", target:manage_residents_icon_tooltip, delay:0.50 });
      myOpentip3.setContent("Manage Residents"); // Updates Opentips content

      var manage_users_icon_tooltip = $("#manage_users_icon")
      var myOpentip4 = new Opentip(manage_users_icon_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "left", target:manage_users_icon_tooltip, delay:0.50 });
      myOpentip4.setContent("Manage Users"); // Updates Opentips content

      var manage_diseases_Type_icon_tooltip = $("#manage_diseases_Type_icon")
      var myOpentip5 = new Opentip(manage_diseases_Type_icon_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "left", target:manage_diseases_Type_icon_tooltip, delay:0.50 });
      myOpentip5.setContent("Manage Disease Types"); // Updates Opentips content

      var manage_hp_icon_tooltip = $("#manage_hp_icon")
      var myOpentip6 = new Opentip(manage_hp_icon_tooltip, { showOn:"mouseover", hideOn: null, tipJoint: "left", target:manage_hp_icon_tooltip, delay:0.50 });
      myOpentip6.setContent("Manage Health Profiles"); // Updates Opentips content

      var account_menu_tooltip = $("#account_menu")
      var myOpentip7 = new Opentip(account_menu_tooltip, { showOn:"mouseover", tipJoint: "right", target:account_menu_tooltip, delay:0.50 });
      myOpentip7.setContent("Account Options"); // Updates Opentips content

      var account_menu_tooltip = $(".sidebar-toggler")
      var myOpentip8 = new Opentip(account_menu_tooltip, { showOn:"mouseover", tipJoint: "left", target:account_menu_tooltip, delay:0.50 }); 
      myOpentip8.setContent("Sidebar-toggler Minimize/Maximize"); // Updates Opentips content 

      var account_menu_tooltip = $(".header-toggler")
      var myOpentip9 = new Opentip(account_menu_tooltip, { showOn:"mouseover", tipJoint: "left", target:account_menu_tooltip, delay:0.50 }); 
      myOpentip9.setContent("Sidebar-toggler Hide/Show"); // Updates Opentips content 

      $("body").click(function()
      {
        myOpentip1.hide()
        myOpentip2.hide()
        myOpentip3.hide()
        myOpentip4.hide()
        myOpentip5.hide()
        myOpentip6.hide()
        myOpentip7.hide()
        myOpentip8.hide()
        myOpentip9.hide()
      })

      })
    
    </script>

    <script type="module" src="../resourcess/js/sidebar.js"></script>

    <!-- CoreUI and necessary plugins-->
    <script src="../resourcess/vendors/@coreui/coreui/js/coreui.bundle.min.js"></script>
    <script src="../resourcess/vendors/simplebar/js/simplebar.min.js"></script>
    <!-- Plugins and scripts required by this view-->
    <script src="../resourcess/vendors/@coreui/utils/js/coreui-utils.js"></script>

    <!--scripts-->
    <script id="manage_user" src="effects/update-password_username.js" ></script>
    <!--scripts end-->
</body>
</html>