<?php   include('../../../route.php'); ?>

<?php
if (isset($_POST['resident_id']))
{
    $resident_id = $_POST['resident_id'];

    $sql = "DELETE FROM `residents` WHERE `resident_id` = '$resident_id'";
    $result = $conn->query($sql);

    if ($result === TRUE)
    {
      $confirmation = 4;
      echo $confirmation;
    }
}
?>