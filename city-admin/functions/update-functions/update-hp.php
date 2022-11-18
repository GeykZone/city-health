<?php   include('../../../route.php'); ?>
<?php

if(isset($_POST['hp_update_id']))
{
  $update_hp_id = $_POST['hp_update_id'];
  $new_hp_name = $_POST['new_hp_name'];
  $new_hp_diseases = $_POST['new_hp_diseases'];
  $new_hp_philhealth = $_POST['new_hp_philhealth'];
 

  $sql = "UPDATE `health_profiles` SET `resident_id`='$new_hp_name',`disease_id`='$new_hp_diseases',`phil_health_number`='$new_hp_philhealth' WHERE `hp_id` = '$update_hp_id'";
  if ($conn->query($sql) === TRUE)
  {
    $confirmation = 3;
    echo $confirmation;
  }
  else {

    $confirmation = 2;
    echo $confirmation;

  }
}


?>