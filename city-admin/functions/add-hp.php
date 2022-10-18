<?php   include('../../route.php'); ?>
<?php

if(isset($_POST['id_full_naame']))
{
  $resident_name_id = $_POST['id_full_naame'];
  $disease_name_id = $_POST['id_disease'];
  $philhealth_id = $_POST['philhealth_number'];
  $created_at = $_POST['created_at'];
 

  $sql = "INSERT INTO `health_profiles`(`resident_id`, `disease_id`, `phil_health_number`, `date`) 
  VALUES ('$resident_name_id', '$disease_name_id', '$philhealth_id', '$created_at')";
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