<?php   include('../../../route.php'); ?>
<?php
//add new barangay
if(isset($_POST['barangay']))
{
  $barangay = $_POST['barangay'];
  $barangay = ucwords($barangay);//to make evry first leeter capitalize//
  $latitude = $_POST['Latitude'];
  $longitude = $_POST['Longitude'];



  $sql = "INSERT INTO `barangays`(`barangay_name`, `lat`, `long`) VALUES ('$barangay','$latitude','$longitude')";
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
//add new barangay end

?>