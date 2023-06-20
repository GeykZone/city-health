function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}

$(".sidebar-toggler").click(function()
{
    var myCookie = getCookie("sidebar");

    if (myCookie == null) {
        Cookies.set('sidebar', 'minimized');
    }
    else {
        Cookies.remove('sidebar')
    }
})

$("#sideBar_nav").mouseenter(function()
{
    var myCookie = getCookie("sidebar");
    if (myCookie != null) {
        // Simulate clicking a button with the ID "myButton"
        $('.sidebar-toggler').trigger('click');
    }
})

// if nav-group area expand is false and each nav-link has an active the nav group will be active color
$("#nav_hp").click(function()
{
    // Perform an action after a delay of 2000 milliseconds (2 seconds)
    setTimeout(function() {

      if (!$('#sideBar_nav').hasClass('show')) {
        if ($('#nav_a').hasClass('active') || $('#nav_b').hasClass('active') || $('#nav_c').hasClass('active') || $('#nav_d').hasClass('active') || $('#nav_e').hasClass('active')) {
          $("#nav_hp").addClass("active")
        }
      }
      else
      {
        $("#nav_hp").removeClass("active")
      }
    }, 100);

})
