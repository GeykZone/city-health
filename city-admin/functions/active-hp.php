<?php   include('../../route.php'); ?>

<?php
if (isset($_POST['hp_id']))
{
    $active_hp = $_POST['hp_id'];

    $sql = "UPDATE `health_profiles` SET `case_status`= 'Active' WHERE `hp_id` = '$active_hp'";
    if ($conn->query($sql) === TRUE)
    {
      $confirmation = 5;
      echo $confirmation;
    }
}
?>