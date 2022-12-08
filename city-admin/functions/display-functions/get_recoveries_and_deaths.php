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

    $all_dates = $_GET['all_dates'];

    if($query_click == "clicked")
    {
        $query = "SELECT *, `c_d`.`disease_name` AS death_cause, `d`.`disease_name` AS diagnosis, COALESCE(c_d.disease_name, other_cause_of_death) AS all_deaths FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
        ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) LEFT JOIN `diseases` AS `c_d` ON (`hp`.`cause_of_death` = `c_d`.`id`) WHERE ";

        if($hp_status == "Deaths")
        {
            $query = "SELECT *, COUNT(*),  hp.resident_id, `c_d`.`disease_name` AS death_cause, `d`.`disease_name` AS diagnosis, COALESCE(c_d.disease_name, other_cause_of_death) AS all_deaths FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) LEFT JOIN `diseases` AS `c_d` ON (`hp`.`cause_of_death` = `c_d`.`id`) WHERE ";
        }
        

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

        if($hp_status == "Recoveries" || $hp_status == "default")
        {
            $conditions[] = "`recovery` IS NOT NULL";
            
            if($recover_from_disease_type != "default")
            {
                $conditions[] = "`disease_id` = '$recover_from_disease_type'";
            }

            $conditions[] = "`case_status` = '(Inactive)' AND `date_of_recovery` = '$all_dates' ORDER BY `date_of_recovery` ASC ";
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

            $conditions[] = "`case_status` = '(Inactive)' AND `date_of_death` = '$all_dates'  GROUP BY hp.resident_id ORDER BY `date_of_death` ASC ";
        }
        

        $sql = $query;
        if (count($conditions) > 0) {
          $sql .= implode(' AND ', $conditions);
        }
        else
        {
            $sql .= "`case_status` = '(Inactive)'  AND `recovery` IS NOT NULL AND `date_of_recovery` = '$all_dates' ORDER BY `date_of_recovery` ASC ";
        }
    }
    else
    {
        $sql = "SELECT *, `c_d`.`disease_name` AS death_cause, `d`.`disease_name` AS diagnosis  FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
        ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) LEFT JOIN `diseases` AS `c_d` ON (`hp`.`cause_of_death` = `c_d`.`id`)
        WHERE `case_status` = '(Inactive)'  AND `recovery` IS NOT NULL 
        AND `date_of_recovery` = '$all_dates' ORDER BY `date_of_recovery` ASC";
    }

    $result = $conn->query($sql);
    if ($result->num_rows > 0) 
    {

    while($row = $result->fetch_assoc()) 
    {
        $_barangay_namme =  $row['barangay_name'];
        $_diseases_name =  $row['diagnosis'];

        if($hp_status == "Recoveries")
        {
            $_diseases_name =  $row['diagnosis'];
        }
        else if($hp_status == "Deaths")
        {
            if($cause_of_death != "default")
            {
                if($cause_of_death != "Other")
                {
                    $_diseases_name =  $row['death_cause'];
                }
                else
                {
                    $_diseases_name =  $row['other_cause_of_death'];
                }    
            }
            else
            {
                $_diseases_name =  $row['all_deaths'];
            }
        }
      
        if($query_click == "clicked")
        {
            $query2 = "SELECT *, `c_d`.`disease_name` AS death_cause, `d`.`disease_name` AS diagnosis FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) LEFT JOIN `diseases` AS `c_d` ON (`hp`.`cause_of_death` = `c_d`.`id`) WHERE ";

            if($hp_status == "Deaths")
            {
                $query2 = "SELECT DISTINCT `hp`.`resident_id`
                FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
                ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) 
                LEFT JOIN `diseases` AS `c_d` ON (`hp`.`cause_of_death` = `c_d`.`id`) WHERE ";
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

            if($hp_status == "Recoveries" || $hp_status == "default")
            {
                $conditions2[] = "`recovery` IS NOT NULL";
                
                if($recover_from_disease_type != "default")
                {
                    $conditions2[] = "`hp`.`disease_id` = '$recover_from_disease_type'";
                }

                $conditions2[] = "`case_status` = '(Inactive)' AND `date_of_recovery` = '$all_dates'  AND `barangay_name`= '$_barangay_namme' AND  `d`.`disease_name`= '$_diseases_name' ORDER BY `date_of_recovery` ASC ";
            }
            else if($hp_status == "Deaths")
            {
                $conditions2[] = "`recovery` IS NULL";
                if($cause_of_death != "default")
                {
                    if($cause_of_death != "Other")
                    {
                        $conditions2[] = "`cause_of_death` = '$cause_of_death'";
                        $conditions2[] = "`case_status` = '(Inactive)' AND `date_of_death` = '$all_dates' AND `barangay_name`= '$_barangay_namme' AND `c_d`.`disease_name` = '$_diseases_name' ORDER BY `date_of_death` ASC ";
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
                        $conditions2[] = "`case_status` = '(Inactive)' AND `date_of_death` = '$all_dates' AND `barangay_name`= '$_barangay_namme' AND `other_cause_of_death`= '$_diseases_name' ORDER BY `date_of_death` ASC ";
                    }    
                }
                else
                {
                    $conditions2[] = "`case_status` = '(Inactive)' AND `date_of_death` = '$all_dates' AND `barangay_name`= '$_barangay_namme' AND COALESCE(c_d.disease_name, other_cause_of_death) = '$_diseases_name' ORDER BY `date_of_death` ASC ";
                }
            }
            

            $sql2 = $query2;
            if (count($conditions2) > 0) {
            $sql2 .= implode(' AND ', $conditions2);
            }
            else
            {
                $sql2 .= "`case_status` = '(Inactive)'  AND `recovery` IS NOT NULL AND `date_of_recovery` = '$all_dates'  AND `barangay_name`= '$_barangay_namme' AND `disease_name`= '$_diseases_name' ORDER BY `date_of_recovery` ASC ";
            }
        }
        else
        {
            $sql2 = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE `case_status` = '(Inactive)'  AND `recovery` IS NOT NULL 
            AND `date_of_recovery` = '$all_dates' AND `barangay_name`= '$_barangay_namme' AND `disease_name`= '$_diseases_name' ORDER BY `date_of_recovery` ASC";
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
                if($total_hp == 1)
                {
                    $get_disease_names[] = $total_hp." documented health recovery from ".$row['diagnosis']." in barangay ".$row['barangay_name'].".";
                }
                else{
        
                    $get_disease_names[] = $total_hp." documented health recoveries from ".$row['diagnosis']." in barangay ".$row['barangay_name'].".";
                }
            }
            else if($hp_status == "Deaths")
            {
                
                if($cause_of_death != "default")
                {
                    if($cause_of_death != "Other")
                    {
                        if($total_hp == 1)
                        {
                            $get_disease_names[] =  $total_hp." documented death caused by ".$row['death_cause']." in barangay ".$row['barangay_name'].".";
                        }
                        else{
                
                            $get_disease_names[] =  $total_hp." documented deaths caused by ".$row['death_cause']." in barangay ".$row['barangay_name'].".";
                        }
                    }
                    else
                    {
                        if($total_hp == 1)
                        {
                            $get_disease_names[] =  $total_hp." documented non-health-related death caused by ".$row['other_cause_of_death']." in barangay ".$row['barangay_name'].".";
                        }
                        else{
                
                            $get_disease_names[] =  $total_hp." documented non-health-related deaths caused by ".$row['other_cause_of_death']." in barangay ".$row['barangay_name'].".";
                        }
                    }    
                }
                else
                {
                    $all_deaths_dispaly = $row['all_deaths'];
                    $sql3 = "SELECT * FROM `diseases` WHERE `disease_name` = '$all_deaths_dispaly'";
                    $result3 = $conn->query($sql3);
                    if ($result3->num_rows > 0) {

                        if($total_hp == 1)
                        {
                            $get_disease_names[] =  $total_hp." documented death caused by ".$row['all_deaths']." in barangay ".$row['barangay_name'].".";
                        }
                        else{
                
                            $get_disease_names[] =  $total_hp." documented deaths caused by ".$row['all_deaths']." in barangay ".$row['barangay_name'].".";
                        }

                    }
                    else
                    {
                        if($total_hp == 1)
                        {
                            $get_disease_names[] =  $total_hp." documented non-health-related death caused by ".$row['all_deaths']." in barangay ".$row['barangay_name'].".";
                        }
                        else{
                
                            $get_disease_names[] =  $total_hp." documented non-health-related deaths caused by ".$row['all_deaths']." in barangay ".$row['barangay_name'].".";
                        }
                    }
                }
            }
        }
        else
        {
            if($total_hp == 1)
            {
                $get_disease_names[] = $total_hp." documented health recovery from ".$row['diagnosis']." in barangay ".$row['barangay_name'].".";
            }
            else{
    
                $get_disease_names[] = $total_hp." documented health recoveries from ".$row['diagnosis']." in barangay ".$row['barangay_name'].".";
            }
        }
        
    }

    }   
    else

    $get_disease_names = array_unique($get_disease_names);
    if(isset($_GET['all_dates']))
    {
        print json_encode($get_disease_names);
    }

    
?>
