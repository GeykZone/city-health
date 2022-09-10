<?php   include('../../route.php'); ?>
<?php
 if (isset($_POST['update_barangay'])) {
    $name_id = $_POST['barangay_name_id'];
    $update_barangay = $_POST['update_barangay'];
    $update_barangay = ucwords($update_barangay);
    $update_Latitude = $_POST['update_Latitude'];
    $update_Longitude = $_POST['update_Longitude'];

    //update
    $sql = "UPDATE `barangays` SET `barangay_name`= '$update_barangay',`lat`= '$update_Latitude',`long`= '$update_Longitude' WHERE  `barangay_name`= '$name_id'";
    if ($conn->query($sql) === TRUE)
    {
      $confirmation = 3;
      echo $confirmation;
      
    }
    // code...
  
 }
  ?>