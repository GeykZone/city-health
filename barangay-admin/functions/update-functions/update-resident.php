<?php   include('../../../route.php'); ?>
<?php
 if (isset($_POST['resident_id'])) {

    $new_barangay_id = $_POST['new_barangay_name'];
    $resident_id = $_POST['resident_id'];

    $new_firstname = $_POST['new_firstname'];
    $new_middlename = $_POST['new_middlename'];
    $new_lastname = $_POST['new_lastname'];
    $new_age = $_POST['new_age'];
    $new_gender = $_POST['new_gender'];
    $new_birthdate = $_POST['new_birthdate'];
    $new_civil = $_POST['new_civil'];
    $new_contact = $_POST['new_contact'];
    $new_email = $_POST['new_email'];

    $sql = "UPDATE `residents` SET `barangay_id`='$new_barangay_id',`first_name`='$new_firstname',`middle_name`='$new_middlename',
    `last_name`='$new_lastname',`age`='$new_age',`gender`='$new_gender',`birthdate`='$new_birthdate',`contact`='$new_contact',
    `email`='$new_email',`civil`='$new_civil' WHERE `resident_id`='$resident_id' ";
    if ($conn->query($sql) === TRUE)
    {
      $confirmation = 3;
      echo $confirmation;
      
    }


 }
  ?>