<?php   include('../../../route.php'); ?>

<?php
    if(isset($_GET['resident_names']))
    {
    
    $resident_names_data = $_GET['resident_names'];  

    $sql = "SELECT * FROM `residents` WHERE `barangay_id` = '$resident_names_data' ORDER BY `first_name`";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $fname = str_replace(' ', '_', $row['first_name']);
    $mname = str_replace(' ', '_', $row['middle_name']);
    $lname = str_replace(' ', '_', $row['last_name']);

    $resident_names[] = $fname." ".$mname." ".$lname." ".$row['resident_id'];
    }
        print json_encode($resident_names);
    }
    
    }
?>
