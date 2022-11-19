<?php   include('../../../route.php'); ?>

<?php
if (isset($_POST['barangay_name_id']))
{
    $barangayname_id = $_POST['barangay_name_id'];

    $sql = "DELETE FROM `barangays` WHERE `barangay_name` = '$barangayname_id'";
    $result = $conn->query($sql);

    if ($result === TRUE)
    {
      $confirmation = 4;
      echo $confirmation;
    }
}
?>