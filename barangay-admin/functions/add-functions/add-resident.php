<?php   include('../../../route.php'); ?>
<?php
if(isset($_POST['barangay_id']))
{
    $barangay_id = $_POST["barangay_id"];
    $firstname = $_POST["firstname"];
    $middlename = $_POST["middlename"];
    $lastname = $_POST["lastname"];
    $age = $_POST["age"];
    $gender = $_POST["gender"];
    $birthdate = $_POST["birthdate"];
    $contact = $_POST["contact"];
    $thisemail = $_POST["thisemail"];
    $civil_status = $_POST["civil_status"];

    $firstname = ucwords($firstname);
    $middlename = ucwords($middlename);
    $lastname = ucwords($lastname);
  
    $sql = "INSERT INTO `residents`(`barangay_id`, `first_name`, `middle_name`, `last_name`, `age`, `gender`, `birthdate`, `contact`, `email`, `civil`) 
    VALUES ('$barangay_id','$firstname','$middlename','$lastname','$age','$gender','$birthdate','$contact','$thisemail','$civil_status')";
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