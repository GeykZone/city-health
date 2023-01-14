<?php

if(isset($_POST['submit_form']))
{
            $range_from = $_POST['range_from'];
            $range_from = date("Y-m-d", strtotime($range_from));

            $range_to = $_POST['range_to'];
            $range_to = date("Y-m-d", strtotime($range_to));

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
                $disease_id;
                $brg_id;

                $min = strtotime($range_from);
                $max = strtotime($range_to);
                $randomTimestamp = rand($min, $max);
                $randomDate = date('Y-m-d', $randomTimestamp);

                $min = 28;
                $max = 43;
                $randomNumber = rand($min, $max);

                $min = 1;
                $max = 47;
                $randombrgy = rand($min, $max);

                if($disease == 'Random')
                {
                    $disease_id = $randomNumber;
                }
                else
                {
                    $disease_id = $disease;
                }

                if($brgy == 'Random')
                {
                    $brg_id = $randombrgy;
                }
                else
                {
                    $brg_id = $brgy;
                }
                
                $stmt = mysqli_prepare($conn, "SELECT resident_id FROM ( SELECT resident_id FROM residents WHERE barangay_id = '$brg_id' ORDER BY RAND() LIMIT 1 ) 
                AS x WHERE NOT EXISTS ( SELECT 1 FROM health_profiles WHERE resident_id = x.resident_id ) LIMIT 1");

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

                    $stmt = mysqli_prepare($conn, "INSERT INTO health_profiles (resident_id, disease_id, phil_health_number, date) 
                    SELECT ?, '$disease_id', 'N/A', ' $randomDate'");

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

?>
