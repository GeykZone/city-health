<?php   include('../../route.php'); ?>

<?php
if (isset($_POST['hp_id']))
{
    $delete_hp = $_POST['hp_id'];

    $sql = "UPDATE `health_profiles` SET `case_status`= 'Inactive' WHERE `hp_id` = '$delete_hp'";
    if ($conn->query($sql) === TRUE)
    {
      $confirmation = 4;
      echo $confirmation;
    }
}
?>