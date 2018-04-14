<?php

$jsongdid = isset($_POST['jsongdid']) ? $_POST['jsongdid'] : Null;

$db = new mysqli('localhost','root','','project_yiguo'); 
$db->set_charset('utf8');

$arrgdid = json_decode($jsongdid,true);

$str = implode(',',$arrgdid);

$qSQL = "SELECT * FROM goodlist WHERE gdid IN ($str)";

$q = $db->query($qSQL);
$a = $q->fetch_all(MYSQLI_ASSOC);
$q->close();

$db->close();

echo json_encode($a,JSON_UNESCAPED_UNICODE);

?>