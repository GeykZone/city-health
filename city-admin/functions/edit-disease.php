<?php   include('../../route.php'); ?>
<?php

if(isset($_POST['edited_disease']))
{
  $new_disease_name = $_POST['edited_disease'];
  $new_disease_name = ucwords($new_disease_name);//to make evry first leeter capitalize//

  $old_delete_disease = $_POST['old_delete_disease'];
  $old_delete_disease = ucwords($old_delete_disease);//to make evry first leeter capitalize//



  $sql = "UPDATE `diseases` SET `disease_name`='$new_disease_name' WHERE `disease_name` = '$old_delete_disease' ";
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