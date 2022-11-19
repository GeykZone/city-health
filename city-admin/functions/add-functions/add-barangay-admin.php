<?php   include('../../../route.php'); ?>
<?php
if(isset($_POST['barangay_name']))
{
    $barangay_id = $_POST["select_barangay"];
    $barangay_name = $_POST["barangay_name"];
    $barangay_admin_username = $_POST["default_username"];
    $barangay_admin_password = $_POST["default_password"];
    $role = 2;

    $barangay_admin_password = encrypt_decrypt('encrypt', $barangay_admin_password);

  
    $sql = "INSERT INTO `users`(`barangay_id`, `barangay_name`, `username`, `password`, `role`) VALUES ('$barangay_id','$barangay_name','$barangay_admin_username','$barangay_admin_password','$role')";
    if ($conn->query($sql) === TRUE)
    {
      $confirmation = 1;
      echo $confirmation;
    }
    else {
  
      $confirmation = 2;
      echo $confirmation;
  
    }
    
}
?>
