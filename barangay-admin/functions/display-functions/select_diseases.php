<?php   include('../../../route.php'); ?>
<?php
    $sql = "SELECT * FROM `diseases`";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $disease_name = str_replace(' ', '_', $row['disease_name']);


    $diseases[] = $disease_name." ".$row['id'];
    }
    
    if(isset($_GET['deaths']))
    {
        $diseases[] = "Other"." "."Other";
    }
    
    print json_encode($diseases);
    }
?>