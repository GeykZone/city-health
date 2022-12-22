<?php
include ("connection/connect.php");

if(isset($_COOKIE["tokken"]))
{
    if(isset($_COOKIE["role"]) && isset($_COOKIE["id"]))
    {
        //set cookie acive
        $cookie_user_tittle = "active";
        $encrypt_active = encrypt_decrypt('encrypt', "active");
        $cookie_user_value = $encrypt_active;
        setcookie($cookie_user_tittle, $cookie_user_value, time() + (86400 * 30), "/"); // 30 days
        //set cookie acive end
        $id = encrypt_decrypt('decrypt', $_COOKIE["id"]);

        $sql= "SELECT * FROM `users` WHERE `id` = '$id'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) 
        { 
            while($row = $result->fetch_assoc()) 
            {
                $activated = $row['activated'];
            }

            if($activated == 0)
            {

                if(session_destroy()){
                    header("Location: ../index.php");
                
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
                
            }
        }
    }
    else
    {
        if(session_destroy()){
            header("Location: ../index.php");
        
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

    }
    

}
else if (isset($_SESSION['adminlogged_in']))
{
    if(isset($_COOKIE["role"]) && isset($_COOKIE["id"]))
    {
        $id = encrypt_decrypt('decrypt', $_COOKIE["id"]);
        $_SESSION['admin_log'] = "set";

        $sql= "SELECT * FROM `users` WHERE `id` = '$id'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) 
        { 
            while($row = $result->fetch_assoc()) 
            {
                $activated = $row['activated'];
            }

            if($activated == 0)
            {

                if(session_destroy()){
                    header("Location: ../index.php");
                
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
                
            }
        }
    }
    else
    {
        if(session_destroy()){
            header("Location: ../index.php");
        
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

    }

}
else
{
    if(session_destroy()){
        header("Location: ../index.php");
    
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
}

?>