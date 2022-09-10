<?php
include ("connection/connect.php");

    //AES encryption funtion
    function encrypt_decrypt($action, $string) {
        $output = false;

        $encrypt_method = "AES-256-CBC";
        $secret_key = 'sadgjakgdkjafkj';
        $secret_iv = 'This is my secret iv';

        $key = hash('sha256', $secret_key);

        $iv = substr(hash('sha256', $secret_iv), 0, 16);

        if ( $action == 'encrypt' ) {
            $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
            $output = base64_encode($output);
        } else if( $action == 'decrypt' ) {
            $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
        }

        return $output;
    }
    //AES encryption funtion end

if(isset($_COOKIE["tokken"]))
{
    //set cookie acive
    $cookie_user_tittle = "active";
    $encrypt_active = encrypt_decrypt('encrypt', "active");
    $cookie_user_value = $encrypt_active;
    setcookie($cookie_user_tittle, $cookie_user_value, time() + (86400 * 30), "/"); // 30 days
    //set cookie acive end
    $id = encrypt_decrypt('decrypt', $_COOKIE["id"]);

}
else if (isset($_SESSION['adminlogged_in']))
{
    $id = encrypt_decrypt('decrypt', $_COOKIE["id"]);
    $_SESSION['admin_log'] = "set";
}
else
{
    header("Location: ../index.php");
    exit();
}

?>