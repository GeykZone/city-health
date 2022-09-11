<?php

$sql= "SELECT * FROM `users` WHERE `id` = '$id'";
$result = $conn->query($sql);
if ($result->num_rows > 0) 
{ 
    while($row = $result->fetch_assoc()) 
    {
        $admin_location = $row['barangay_name'];
    }

    $admin_location = strtoupper($admin_location);

}

?>