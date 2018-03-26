<?php
	function base64_to_jpeg($base64_string, $filename) {
		// open the output file for writing
		$ifp = fopen($filename, 'wb' );
		$data = explode( ',', $base64_string );
		fwrite( $ifp, base64_decode( $data[ 1 ] ) );
		fclose( $ifp );
		return $filename;
	}

	$userAnswer = $_POST['name'];
	$timeStamp = $_POST['timeStamp'];
	$file = 'tmp22_' . $timeStamp . '.jpg';

	base64_to_jpeg($userAnswer, $file);
?>
