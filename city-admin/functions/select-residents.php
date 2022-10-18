<?php   include('../../route.php'); ?>

<?php
    if(isset($_GET['resident_names']))
    {
    
    $resident_names_data = $_GET['resident_names'];  

    $sql = "SELECT * FROM `residents` WHERE `barangay_id` = '$resident_names_data' ORDER BY `first_name`";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
    $resident_names[] = $row['first_name']." ".$row['middle_name']." ".$row['last_name']." ".$row['id'];
    }
        print json_encode($resident_names);
    }
    
    }
?>
