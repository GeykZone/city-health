<?php   include('../../route.php'); ?>
<?php

if(isset($_POST['disease']))
{
  $disease = $_POST['disease'];
  $disease = ucwords($disease);//to make evry first leeter capitalize//



  $sql = "INSERT INTO `diseases`(`disease_name`) VALUES ('$disease')";
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