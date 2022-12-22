<?php   include('../../../route.php'); ?>
<?php
    
    $query_click = $_GET['query_click'];

    $recover_from_disease_type = $_GET['recover_from_disease_type'];
    $cause_of_death = $_GET['cause_of_death'];
    $other_cause = $_GET['other_cause'];
    $hp_status = $_GET['hp_status'];

    $barangay_name = $_GET['barangay_name'];
    $date_range_from = $_GET['date_range_from'];
    $date_range_to = $_GET['date_range_to'];
    $gender = $_GET['gender'];
    $min_age = $_GET['min_age'];
    $max_age = $_GET['max_age'];

    $current_year_from = $_GET['current_year_from'];
    $current_year_to = $_GET['current_year_to'];

    if($query_click == "clicked")
    {
        $query = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
        ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE ";

        $conditions = array();

        if($barangay_name != "default")
        {
            $conditions[] = "`b`.`id`='$barangay_name'";
        }

        if($min_age != "default")
        {
            $conditions[] = "`age` >= '$min_age'";
        }
    
        if($max_age != "default")
        {
            $conditions[] = "`age` <= '$max_age'";
        }

        if($gender != "default")
        {
            $conditions[] = "`gender`='$gender'";
        }

        if($hp_status == "Recoveries")
        {
            $conditions[] = "`recovery` IS NOT NULL";
            
            if($recover_from_disease_type != "default")
            {
                $conditions[] = "`hp`.`disease_id` = '$recover_from_disease_type'";
            }

            $conditions[] = "`case_status` = '(Inactive)' AND `date_of_recovery` BETWEEN '$date_range_from' AND '$date_range_to' ORDER BY `date_of_recovery` ASC ";
        }
        else if($hp_status == "Deaths")
        {
            $conditions[] = "`recovery` IS NULL";

            if($cause_of_death != "default")
            {
                if($cause_of_death != "Other")
                {
                    $conditions[] = "`cause_of_death` = '$cause_of_death'";
                }
                else
                {
                   
                    if($other_cause != "default")
                    {
                        $conditions[] = "`other_cause_of_death` = '$other_cause'";
                    }
                    else
                    {
                        $conditions[] = "`other_cause_of_death` IS NOT NULL";
                    }
                }    
            }

            $conditions[] = "`case_status` = '(Inactive)' AND `date_of_death` BETWEEN '$date_range_from' AND '$date_range_to' ORDER BY `date_of_death` ASC ";
        }
        

        $sql = $query;
        if (count($conditions) > 0) {
          $sql .= implode(' AND ', $conditions);
        }
        else
        {
            $sql .= " `b`.`id`='$barangay_name' AND `case_status` = '(Inactive)'  AND `recovery` IS NOT NULL AND `date_of_recovery` BETWEEN '$date_range_from' AND '$date_range_to' ORDER BY `date_of_recovery` ASC ";
        }
    }
    else
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
        ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE `b`.`id`='$barangay_name' AND `case_status` = '(Inactive)'  AND `recovery` IS NOT NULL 
        AND `date_of_recovery` BETWEEN '$current_year_from' AND '$current_year_to' ORDER BY `date_of_recovery` ASC";
    }

    $result = $conn->query($sql);
    if ($result->num_rows > 0) 
    {

    while($row = $result->fetch_assoc()) 
    {
        $date ;
        if($hp_status != "default")
        {
            if($hp_status == "Recoveries")
            {
                $date = $row['date_of_recovery'];
            }
            else if($hp_status == "Deaths")
            {
                $date = $row['date_of_death'];
            }
        }
        else
        {
            $date = $row['date_of_recovery'];
        }

        if($query_click == "clicked")
        {
            $query2 = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE ";

            if($hp_status == "Deaths")
            {
                $query2 = "SELECT DISTINCT `hp`.`resident_id` FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
                ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE ";
            }

            $conditions2 = array();

            if($barangay_name != "default")
            {
                $conditions2[] = "`b`.`id`='$barangay_name'";
            }

            if($min_age != "default")
            {
                $conditions2[] = "`age` >= '$min_age'";
            }
        
            if($max_age != "default")
            {
                $conditions2[] = "`age` <= '$max_age'";
            }

            if($gender != "default")
            {
                $conditions2[] = "`gender`='$gender'";
            }

            if($hp_status == "Recoveries")
            {
                $conditions2[] = "`recovery` IS NOT NULL";
                
                if($recover_from_disease_type != "default")
                {
                    $conditions2[] = "`disease_id` = '$recover_from_disease_type'";
                }

                $conditions2[] = "`case_status` = '(Inactive)' AND `date_of_recovery` = '$date' ORDER BY `date_of_recovery` ASC ";
            }
            else if($hp_status == "Deaths")
            {
                $conditions2[] = "`recovery` IS NULL";

                if($cause_of_death != "default")
                {
                    if($cause_of_death != "Other")
                    {
                        $conditions2[] = "`cause_of_death` = '$cause_of_death'";
                    }
                    else
                    {
                         
                        if($other_cause != "default")
                        {
                            $conditions2[] = "`other_cause_of_death` = '$other_cause'";
                        }
                        else
                        {
                            $conditions2[] = "`other_cause_of_death` IS NOT NULL";
                        }
                    }    
                }

                $conditions2[] = "`case_status` = '(Inactive)' AND `date_of_death` = '$date' ORDER BY `date_of_death` ASC ";
            }
            

            $sql2 = $query2;
            if (count($conditions2) > 0) {
            $sql2 .= implode(' AND ', $conditions2);
            }
            else
            {
                $sql2 .= " `b`.`id`='$barangay_name' AND `case_status` = '(Inactive)'  AND `recovery` IS NOT NULL AND `date_of_recovery` = '$date' ORDER BY `date_of_recovery` ASC ";
            }
        }
        else
        {
            $sql2 = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE `b`.`id`='$barangay_name' AND `case_status` = '(Inactive)'  AND `recovery` IS NOT NULL 
            AND `date_of_recovery` = '$date' ORDER BY `date_of_recovery` ASC";
        }
        
        $result2 = $conn->query($sql2);
        if($result2->num_rows > 0)
        {
            $result2 = mysqli_query($conn,$sql2);
            $rowcount=mysqli_num_rows($result2);
            $total_hp =  $rowcount;
        }
        else
        {
            $total_hp =  0;
        }
        
       
        if($hp_status != "default")
        {
            if($hp_status == "Recoveries")
            {
                $date_name = str_replace(' ', '_', $row['date_of_recovery']);
            }
            else if($hp_status == "Deaths")
            {
                $date_name = str_replace(' ', '_', $row['date_of_death']);
            }
        }
        else
        {
            $date_name = str_replace(' ', '_', $row['date_of_recovery']);
        }
        
        $total_hp_number[] = $date_name." ".$total_hp;
    }

    }   
    else
    {
        $date_name = "Invalid_date Invalid";
        $total_hp_number[] = $date_name;
    }
    
    if(isset($_GET['total_hp']))
    {   
        $total_hp_number = array_unique($total_hp_number);
        print json_encode($total_hp_number);
    }

    
?>
