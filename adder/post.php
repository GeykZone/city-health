<?php

if(isset($_POST['submit_form']))
{
            $year = $_POST['select_year'];
            $brgy = $_POST['select_brg'];
            $disease = $_POST['select_disease'];
            $insertion = $_POST['insertion'];

            // Connect to the database
            $conn = mysqli_connect('localhost', 'root', '', 'hpcs_data');

            // Check connection
            if (!$conn) {
                die("Connection failed: " . mysqli_connect_error());
            }

            // Set the number of rows to insert
            $numRows = $insertion;

            // Initialize a counter for the number of rows inserted
            $insertedRows = 0;

            // Loop until the desired number of rows is inserted
            while ($insertedRows < $numRows) {
                // Prepare and bind the SQL statement to select a unique resident_id
                
                if($year == '2022-01-01')
                {
                    $stmt = mysqli_prepare($conn, "SELECT resident_id FROM ( SELECT resident_id FROM residents WHERE barangay_id = FLOOR(RAND() * 47 + 1) ORDER BY RAND() LIMIT 1 ) 
                    AS x WHERE NOT EXISTS ( SELECT 1 FROM health_profiles WHERE resident_id = x.resident_id ) LIMIT 1");
                }
                else if($year == 'other')
                {
                    $stmt = mysqli_prepare($conn, "SELECT resident_id FROM ( SELECT resident_id FROM residents WHERE barangay_id = FLOOR(RAND() * 47 + 1) ORDER BY RAND() LIMIT 1 ) 
                    AS x WHERE NOT EXISTS ( SELECT 1 FROM health_profiles WHERE resident_id = x.resident_id ) LIMIT 1");
                }
                else
                {
                    $stmt = mysqli_prepare($conn, "SELECT resident_id FROM ( SELECT resident_id FROM residents WHERE barangay_id = '$brgy' ORDER BY RAND() LIMIT 1 ) 
                    AS x WHERE NOT EXISTS ( SELECT 1 FROM health_profiles WHERE resident_id = x.resident_id ) LIMIT 1");
                }

                // Execute the statement
                mysqli_stmt_execute($stmt);

                // Bind the result
                mysqli_stmt_bind_result($stmt, $resident_id);

                // Fetch the result
                mysqli_stmt_fetch($stmt);

                // Close the statement
                mysqli_stmt_close($stmt);

                // If a unique resident_id was found, insert a new row into the health_profiles table
                if ($resident_id) {
                    // Check if the resident_id already exists in the health_profiles table
                    $check_stmt = mysqli_prepare($conn, "SELECT COUNT(*) FROM health_profiles WHERE resident_id = ?");
                    mysqli_stmt_bind_param($check_stmt, 's', $resident_id);
                    mysqli_stmt_execute($check_stmt);
                    mysqli_stmt_bind_result($check_stmt, $count);
                    mysqli_stmt_fetch($check_stmt);
                    mysqli_stmt_close($check_stmt);

                    // If the resident_id does not exist in the health_profiles table, insert a new row
                    if ($count == 0) {
                        // Prepare and bind the SQL statement to insert the unique resident_id

                    if($year == 'other')
                    {
                        $stmt = mysqli_prepare($conn, "INSERT INTO health_profiles (resident_id, disease_id, phil_health_number, date) 
                        SELECT ?, '$disease', 'N/A', DATE_ADD(DATE('2020-01-01'), INTERVAL FLOOR(RAND()*729) DAY)");
                    }
                    else
                    {
                        $stmt = mysqli_prepare($conn, "INSERT INTO health_profiles (resident_id, disease_id, phil_health_number, date) 
                        SELECT ?, '$disease', 'N/A', DATE_ADD(DATE('$year'), INTERVAL FLOOR(RAND()*364) DAY)");
                    }

                    mysqli_stmt_bind_param($stmt, 's', $resident_id);

                    // Execute the statement
                    mysqli_stmt_execute($stmt);

                    // Close the statement
                    mysqli_stmt_close($stmt);

                    // Increment the counter for the number of rows inserted
                    $insertedRows++;
                }
            }
        }

        // Check if the desired number of rows was inserted
        if ($insertedRows == $numRows) {
            // Output a success message
            echo "Successfully inserted $numRows rows into the health_profiles table.";
            ?><a href="index.php">add again</a><?php
        } else {
            // Output an error message
            echo "Error inserting rows into the health_profiles table.";
        }

        // Close the connection
        mysqli_close($conn);

}

if(isset($_POST['rec_submit_form']))
{
    $year = $_POST['select_rec_year'];
    $brgy = $_POST['rec_brg'];
    $disease = $_POST['select_rec_disease'];
    $insertion = $_POST['rec_insertion'];
    
     // Connect to the database
     $conn = mysqli_connect('localhost', 'root', '', 'hpcs_data');

     // Check connection
     if (!$conn) {
         die("Connection failed: " . mysqli_connect_error());
     }

    // Create a temporary table
    if($year === "BETWEEN '2022-01-01' AND '2022-12-31'")
    {
        $sql = "CREATE TEMPORARY TABLE temp_resident_ids AS (
            SELECT resident_id FROM residents ORDER BY RAND()
            )";
    }
    else
    {
        $sql = "CREATE TEMPORARY TABLE temp_resident_ids AS (
            SELECT resident_id FROM residents WHERE barangay_id = '$brgy' ORDER BY RAND()
            )";
    }

    $result = mysqli_query($conn, $sql);

    // Check if the table was created successfully
    if ($result) {
    // Update the health profiles
    $sql = "UPDATE health_profiles h
    INNER JOIN temp_resident_ids r ON h.resident_id = r.resident_id
    SET h.case_status = '(Inactive)', h.recovery = 'Fully recovered', h.date_of_recovery = DATE_ADD(h.date, INTERVAL 14 DAY) 
    WHERE h.date_of_recovery IS null and h.date_of_death IS null and h.disease_id = '$disease' and h.date $year LIMIT $insertion";
    $result = mysqli_query($conn, $sql);
    
    // Check if the update was successful
    if ($result) {
        echo "Records updated successfully.";
        ?><a href="index.php">add again</a><?php
    } else {
        echo "Error updating records: " . mysqli_error($conn);
    }
    } else {
    echo "Error creating temporary table: " . mysqli_error($conn);
    }

    mysqli_close($conn);

}

?>
