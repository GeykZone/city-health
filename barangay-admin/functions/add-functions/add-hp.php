<?php   include('../../../route.php'); ?>
<?php


if(isset($_POST['new_hp']))
{
  $resident_name_id = $_POST['id_full_naame'];
  $disease_name_id = $_POST['id_disease'];
  $philhealth_id = $_POST['philhealth_number'];
  $created_at = $_POST['created_at'];
  $id;

  $sql = "INSERT INTO `health_profiles`(`resident_id`, `disease_id`, `phil_health_number`, `date`) 
  VALUES ('$resident_name_id', '$disease_name_id', '$philhealth_id', '$created_at');
  
  UPDATE `health_profiles` SET `phil_health_number` = '$philhealth_id' WHERE `resident_id` = '$resident_name_id';";
  // Execute the multi-query
  if (mysqli_multi_query($conn, $sql)) {
    $confirmation = 1;
    echo $confirmation;
  }
  else
  {
    $confirmation = 2;
    echo $confirmation;
  }
 
}


?>