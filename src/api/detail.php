<?php

$typesid = isset($_POST['typesid']) ? $_POST['typesid'] : Null;
$gdid = isset($_POST['gdid']) ? $_POST['gdid'] : Null;

$db = new mysqli('localhost','root','','project_yiguo'); 
$db->set_charset('utf8');

$qSQL = "SELECT * FROM goodlist WHERE typesid LIKE '$typesid' AND gdid LIKE '$gdid'";

$q = $db->query($qSQL);
$a = $q->fetch_all(MYSQLI_ASSOC);
$q->close();

$db->close();

echo json_encode($a,JSON_UNESCAPED_UNICODE);

?>