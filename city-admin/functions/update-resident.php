<?php   include('../../route.php'); ?>
<?php
 if (isset($_POST['old_barangay_name'])) {

    $old_barangay_name = $_POST['old_barangay_name'];
    $new_barangay_name = $_POST['new_barangay_name'];
    $old_barangay_id = "";
    $new_barangay_id = "";
    $resident_id = "";

    //converting the barangay names to barangay id
    $sql = "SELECT * FROM `barangays` WHERE `barangay_name` = '$old_barangay_name' ";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $old_barangay_id =  $row['id'];
       
    }
    }

    $sql = "SELECT * FROM `barangays` WHERE `barangay_name` = '$new_barangay_name' ";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $new_barangay_id =  $row['id'];
        
    }
    }
    //converting the barangay names to barangay id end

    

    $old_first_name = $_POST['old_first_name'];
    $old_middle_name = $_POST['old_middle_name'];
    $old_last_name = $_POST['old_last_name'];
    $old_age = $_POST['old_age'];
    $old_gender = $_POST['old_gender'];
    $old_birthdate = $_POST['old_birthdate'];
    $old_civil = $_POST['old_civil'];
    $old_contact = $_POST['old_contact'];
    $old_email = $_POST['old_email'];

    //get the resident id
    $sql = "SELECT * FROM `residents` WHERE `barangay_id` = '$old_barangay_id' && `first_name` = '$old_first_name' && `middle_name` = '$old_middle_name' &&  `last_name` = '$old_last_name' && `age` = '$old_age' && `gender` = '$old_gender'
    && `birthdate` = '$old_birthdate' && `civil` = '$old_civil' && `contact` = '$old_contact' && `email` = '$old_email' ";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $resident_id =  $row['id'];
    }
    }
    //get the resident id end

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
    `email`='$new_email',`civil`='$new_civil' WHERE `id`='$resident_id' ";
    if ($conn->query($sql) === TRUE)
    {
      $confirmation = 3;
      echo $confirmation;
      
    }



 }
  ?>