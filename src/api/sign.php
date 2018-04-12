<?php

$sign = isset($_POST['sign']) ? $_POST['sign'] : Null;

$siuser = isset($_POST['siuser']) ? $_POST['siuser'] : Null;
$sipsw = isset($_POST['sipsw']) ? $_POST['sipsw'] : Null;

$suuser = isset($_POST['suuser']) ? $_POST['suuser'] : Null;
$supsw = isset($_POST['supsw']) ? $_POST['supsw'] : Null;

$db = new mysqli('localhost','root','','project_yiguo'); 
$db->set_charset('utf8');

// if和else if中间不能有其他代码隔开。
if($sign == 'in'){
    $qSQL = "SELECT username FROM userdata WHERE username LIKE '$siuser'";
    $q = $db->query($qSQL);
    if($q->num_rows > 0){
        $qSQL = "SELECT psw FROM userdata WHERE username LIKE '$siuser'";
        $q = $db->query($qSQL);
        $a = $q->fetch_all(MYSQLI_ASSOC)[0]['psw'];
        $a = base64_decode($a);
        echo ($a == $sipsw) ? '登录成功' : '密码错误';
    }
    else{
        echo '帐号不存在';
    }
    $q->close();
}
else if($sign == 'check'){
    $qSQL = "SELECT username FROM userdata WHERE username LIKE '$suuser'";
    $q = $db->query($qSQL);
    if($q->num_rows > 0){
        echo 'repeat';
    }
    else{
        echo '';
    }
    $q->close();
}
else if($sign == 'up'){
    // 不是所有查询都返回同样的数据类型。
    $supsw = base64_encode($supsw);
    $qSQL = 
    "INSERT INTO userdata (username,psw) 
     VALUES ('$suuser','$supsw')";
    $q = $db->query($qSQL);
    echo 'ok';
}

$db->close();

?>