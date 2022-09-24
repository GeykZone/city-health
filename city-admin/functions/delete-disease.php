<?php   include('../../route.php'); ?>

<?php
if (isset($_POST['delete_disease']))
{
    $delete_disease = $_POST['delete_disease'];

    $sql = "DELETE FROM `diseases` WHERE `disease_name` = '$delete_disease'";
    $result = $conn->query($sql);

    if ($result === TRUE)
    {
      $confirmation = 4;
      echo $confirmation;
    }
}
?>