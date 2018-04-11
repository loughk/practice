<?php

$typeid = isset($_POST['typeid']) ? $_POST['typeid'] : Null;echo $typeid;

$db = new mysqli('localhost','root','','project_yiguo'); 
$db->set_charset('utf8');

$qSQL = "SELECT gdid FROM goodlist WHERE typeid LIKE '$typeid'";
$qU = $db->query($qSQL);
$aU = $qU->fetch_all(MYSQLI_ASSOC);
var_dump($aU);
$qU->close();



?>