<?php   include('../../route.php'); ?>
<?php
 if (isset($_POST['admin_id'])) {
    $admin_id = $_POST['admin_id'];
    $activated = 1;

    //update
    $sql = "UPDATE `users` SET `activated`= '$activated' WHERE  `barangay_name`= '$admin_id'";
    if ($conn->query($sql) === TRUE)
    {
      $confirmation = 5;
      echo $confirmation;
      
    }
    // code...
  
 }
  ?>