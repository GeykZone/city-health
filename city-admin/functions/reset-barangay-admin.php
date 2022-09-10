<?php   include('../../route.php'); ?>
<?php
 if (isset($_POST['admin_id'])) {

    $admin_id = $_POST['admin_id'];
    $reset_username = $_POST['reset_username'];
    $reset_password = $_POST['reset_password'];

    $reset_password = encrypt_decrypt('encrypt', $reset_password);

    //update
    $sql = "UPDATE `users` SET `username`= '$reset_username',`password`= '$reset_password'  WHERE  `barangay_name`= '$admin_id'";
    if ($conn->query($sql) === TRUE)
    {
      $confirmation = 3;
      echo $confirmation;
    }
    // code...
  
 }
  ?>