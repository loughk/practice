<?php

$aim = isset($_POST['aim']) ? $_POST['aim'] : Null;
$nums = isset($_POST['nums']) ? $_POST['nums'] : Null;
$page = isset($_POST['page']) ? $_POST['page'] : Null;
$order = isset($_POST['order']) ? $_POST['order'] : Null;
$typesid = isset($_POST['typesid']) ? $_POST['typesid'] : Null;

$db = new mysqli('localhost','root','','project_yiguo'); 
$db->set_charset('utf8');

/*查询语句中string要注意加引号。*/ 
if($aim == 'make'){
    $qSQL = "SELECT * FROM goodlist WHERE typesid LIKE '$typesid'";
}
else if($aim == 'salevol'){
    $qSQL = "SELECT * FROM goodlist WHERE typesid LIKE '$typesid' ORDER BY gdsalevol $order"; 
}
else if($aim == 'comment'){
    $qSQL = "SELECT * FROM goodlist WHERE typesid LIKE '$typesid' ORDER BY gdcommentnum $order";  
}
else if($aim == 'price'){
    $qSQL = "SELECT * FROM goodlist WHERE typesid LIKE '$typesid' ORDER BY gdprice $order";  
}

$q = $db->query($qSQL);
$a = $q->fetch_all(MYSQLI_ASSOC);
$q->close();

$db->close();

$len = count($a);
$pages = ceil($len/$nums);
$a = array_slice($a,($page-1)*$nums,$nums);
$res = array(
    'pages' => $pages,
    'data' => $a
);

echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>