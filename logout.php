<?php 

session_start();

// remove cookie


if(session_destroy()){
    header("Location: index.php");

    if (isset($_COOKIE['tokken']) || isset($_COOKIE['active']) || isset($_COOKIE['id']) || isset($_COOKIE['role']))
    {
      unset($_COOKIE['tokken']);
      setcookie('tokken', null, -1, '/');

      unset($_COOKIE['active']);
      setcookie('active', null, -1, '/');

      unset($_COOKIE['id']);
      setcookie('id', null, -1, '/');

      unset($_COOKIE['role']);
      setcookie('role', null, -1, '/');

      return true;
    }
  else
  {
  return false;
  }
}

?>