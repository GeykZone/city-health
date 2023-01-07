<?php   include('../../../route.php'); ?>
<?php

if(isset($_POST['change_details']))
{
  
  $update_hp_id = $_POST['hp_update_id'];
  $new_hp_philhealth = $_POST['new_hp_philhealth'];
  $new_diagnosis = $_POST['new_diagnosis'];
  $new_diagnosis_date = $_POST['new_diagnosis_date'];

  $sql = "UPDATE `health_profiles` SET `disease_id` = '$new_diagnosis', `date` = '$new_diagnosis_date' WHERE `hp_id` = '$update_hp_id';
         SELECT @resident_id := `resident_id` FROM `health_profiles` WHERE `hp_id` = '$update_hp_id';
         UPDATE `health_profiles` SET `phil_health_number` = '$new_hp_philhealth' WHERE `resident_id` = @resident_id;";

// Execute the multi-query
if (mysqli_multi_query($conn, $sql)) {
  $confirmation = 3;
  echo $confirmation;
}
else
{
  $confirmation = 2;
  echo $confirmation;
}

}


if(isset($_POST['delete']))
{
  $hp_id = $_POST['hp_id'];

  $sql_delete = "DELETE FROM `health_profiles` WHERE  `hp_id` = '$hp_id'";
  $result_delete = $conn->query($sql_delete);
  if ($result_delete === TRUE)
  {
    $confirmation = 4;
    echo $confirmation;
  }
}


?>