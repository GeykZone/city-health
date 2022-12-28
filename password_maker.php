<?php

$password = "mara2366";

//AES encryption funtion
function encrypt_decrypt($action, $string) {
    $output = false;
  
    $encrypt_method = "AES-256-CBC";
    $secret_key = 'GeykZone2366';
    $secret_iv = 'mara114136';
  
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

  $id = encrypt_decrypt('encrypt', $password);

  echo $id;

?>