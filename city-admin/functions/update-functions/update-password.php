<?php   include('../../../route.php'); ?>
<?php
if(isset($_POST['admin_id']))
{
    $admin_id= $_POST['admin_id'];
    $old_pass= $_POST['old_pass'];
    $new_pass= $_POST['new_pass'];

    $admin_id = encrypt_decrypt('decrypt', $admin_id);
    $old_pass= encrypt_decrypt('encrypt', $old_pass);
    $new_pass= encrypt_decrypt('encrypt', $new_pass);

    $change_pass_confirmation = 2;


    $sql = "SELECT * FROM `users` WHERE `id` = '$admin_id' && `password` = '$old_pass' ";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $sql2 = "SELECT * FROM `users` WHERE `id` = '$admin_id' && `password` = '$new_pass' ";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
        while($row2 = $result2->fetch_assoc()) {
    
            $change_pass_confirmation = 3;
            echo $change_pass_confirmation;
        }
        }
        else
        {
            $sql3 = "UPDATE `users` SET `password`= '$new_pass' WHERE `id` = '$admin_id'";
            if ($conn->query($sql3) === TRUE)
            {
              
            $change_pass_confirmation = 1;
              echo $change_pass_confirmation;
            }
            else {
          
                $change_pass_confirmation = 2;
                echo $change_pass_confirmation;
            }
        }

    }
    }
    else
    {
        $change_pass_confirmation = 4;
        echo $change_pass_confirmation;
    }

}
?>