<?php 
$city_admin_role = encrypt_decrypt('decrypt', $_COOKIE["role"]);

if($city_admin_role != 2)
{
    header("Location: ../index.php");
}
?>