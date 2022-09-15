<?php   include('../../route.php'); ?>

<?php
if (isset($_POST['barangay_name']))
{
    $first_name = $_POST['first_name'];
    $middle_name = $_POST['middle_name'];
    $last_name = $_POST['last_name'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $birthdate =  $_POST['birthdate'];
    $civil = $_POST['civil'];
    $contact = $_POST['contact'];
    $email = $_POST['email'];

    $sql = "DELETE FROM `residents` WHERE `first_name` = '$first_name' && `middle_name` = '$middle_name' &&  `last_name` = '$last_name' && `age` = '$age' && `gender` = '$gender'
    && `birthdate` = '$birthdate' && `civil` = '$civil' && `contact` = '$contact' && `email` = '$email'";
    $result = $conn->query($sql);

    if ($result === TRUE)
    {
      $confirmation = 4;
      echo $confirmation;
    }
}
?>