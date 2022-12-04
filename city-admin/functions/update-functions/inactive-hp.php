<?php   include('../../../route.php'); ?>

<?php
if (isset($_POST['hp_id']))
{
    $delete_hp = $_POST['hp_id'];

    $created_at = $_POST['created_at'];

    $sql = "UPDATE `health_profiles` SET `case_status`= '(Inactive)', `inactive_date`='$created_at' WHERE `hp_id` = '$delete_hp'";
    if ($conn->query($sql) === TRUE)
    {
      $confirmation = 4;
      echo $confirmation;
    }
    else
    {
      $confirmation = 2;
      echo $confirmation;
    }
}
?>