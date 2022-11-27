<?php   include('../../../route.php'); ?>
<?php
if(isset($_POST['admin_id']))
{
    $admin_id= $_POST['admin_id'];
    $old_pass= $_POST['old_pass'];
    $new_user= $_POST['new_user'];

    $admin_id = encrypt_decrypt('decrypt', $admin_id);
    $old_pass= encrypt_decrypt('encrypt', $old_pass);

    $change_pass_confirmation = 2;

    $sql = "SELECT * FROM `users` WHERE `id` = '$admin_id' && `password` = '$old_pass' ";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $sql2 = "SELECT * FROM `users` WHERE `id` = '$admin_id' && `username` = '$new_user' ";
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0) {
        while($row2 = $result2->fetch_assoc()) {
    
            $change_pass_confirmation = 6;
            echo $change_pass_confirmation;
        }
        }
        else
        {
            $sql3 = "UPDATE `users` SET `username`= '$new_user' WHERE `id` = '$admin_id'";
            if ($conn->query($sql3) === TRUE)
            {
              
              $change_pass_confirmation = 5;
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