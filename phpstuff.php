<?php
	
	var consumerKey = ;
	var consumerSecret = ;

	$client = new Tumblr\API\Client($consumerKey, $consumerSecret);
	$client->setToken($token, $tokenSecret);


	$client->getBlogPosts('roweezy.tumblr.com', array('filter' => 'text', 'type' => 'photo'));

	for($i =0; i < count($client); i++){
		echo $client[i];
	}
?>