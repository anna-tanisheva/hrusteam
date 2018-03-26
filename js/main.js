'use strict';

// реализация загрузки файлов в канвас
/*console.log(document.documentElement.clientWidth)*/

		// $(window).load (function () {
		// 	if (userAgent.indexOf('Safari') == -1) {
		// 		$('.page').css('background', 'rgba(0, 0, 0, 1)');
		// 		alert('zzz')
		// 	}
		// })


var img = new Image();

var canvas = document.querySelector('#output');

if (document.documentElement.clientWidth < 598) {
	$('#output').attr('height', '333').attr('width', '333')
}


// if (userAgent.indexOf('Safari') !== -1) {
// 	$('.page').css('background', 'rgba(0, 0, 0, 0.4)');
// }


var ctx = canvas.getContext('2d');


var myImage = document.querySelector('.my-image');
var loadPhoto = document.querySelector('.load-photo')
var $uploadCrop = $('.my-image').croppie(
			{enableOrientation: true,
			viewport:
					{width: 530, height: 530}
			}
			
		);
var scaleBar = document.querySelector('.cr-slider-wrap');
scaleBar.classList.add('hide');

var resultButton = document.querySelector('.result-button');
var turnLeftBtn = document.querySelector('.turn-left-button');
var turnRightBtn = document.querySelector('.turn-right-button');
var editorContainer = document.querySelector('.editor-container');
var uploadDemo = document.querySelector('#upload-demo');
var buttonsOverlay = document.querySelector('.social-overlay');
var uploadFileWrapper = document.querySelector('.upload-file-wrapper');

// открытие и отрисовка файла

var buttonOverlay = document.querySelector('.button-overlay');
buttonOverlay.addEventListener('click', function () {
	$('.load-photo').trigger('click');
	// if (document.documentElement.clientWidth <= 980) {
	// 	$('.game-frame').css('height', '740')
	// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var userAgent = window.navigator.userAgent;

// определяем userAgent
			var uAgent = navigator.userAgent || '';

			var browser = {
				version : (uAgent.match( /.+(?:me|ox|on|rv|it|era|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
				opera : /opera/i.test(uAgent),
				msie : (/msie/i.test(uAgent) && !/opera/i.test(uAgent)),
				msie6 : (/msie 6/i.test(uAgent) && !/opera/i.test(uAgent)),
				msie7 : (/msie 7/i.test(uAgent) && !/opera/i.test(uAgent)),
				msie8 : (/msie 8/i.test(uAgent) && !/opera/i.test(uAgent)),
				msie9 : (/msie 9/i.test(uAgent) && !/opera/i.test(uAgent)),
				msie10 : (/msie 10/i.test(uAgent) && !/opera/i.test(uAgent)),
				mozilla : /firefox/i.test(uAgent),
				chrome : /chrome/i.test(uAgent),
				safari : (!(/chrome/i.test(uAgent)) && /webkit|safari|khtml/i.test(uAgent)),
				iphone : /iphone/i.test(uAgent),
				ipod : /ipod/i.test(uAgent),
				iphone4 : /iphone.*OS 4/i.test(uAgent),
				ipod4 : /ipod.*OS 4/i.test(uAgent),
				ipad : /ipad/i.test(uAgent),
				ios : /ipad|ipod|iphone/i.test(uAgent),
				android : /android/i.test(uAgent),
				bada : /bada/i.test(uAgent),
				mobile : /iphone|ipod|ipad|opera mini|opera mobi|iemobile/i.test(uAgent),
				msie_mobile : /iemobile/i.test(uAgent),
				safari_mobile : /iphone|ipod|ipad/i.test(uAgent),
				opera_mobile : /opera mini|opera mobi/i.test(uAgent),
				opera_mini : /opera mini/i.test(uAgent),
				mac : /mac/i.test(uAgent),
				webkit : /webkit/i.test(uAgent),
				android_version: parseFloat(uAgent.slice(uAgent.indexOf("Android")+8)) || 0
			};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (browser.safari) {
		$('.result-button-wrapper h2').css('left', '80px');
		$('.result-button').css('left', '27px');
		// console.log(browser.safari)
		$('.page').css('background', 'url("../img/pattern_web.jpg") rgba(0, 0, 0, 0.4)');
	}
})

function drowMainImg () {
	$('.my-image').croppie('result', 'rawcanvas', 'viewport').then(function (resultCanvas) {
		var canvasSize = {
			width: resultCanvas.width,
			height: resultCanvas.height
		};

		// console.log(canvas)
		var hRatio = canvas.width / canvasSize.width;
		var vRatio = canvas.height / canvasSize.height;
		var ratio  = Math.min ( hRatio, vRatio );
		var centerShift_x = ( canvas.width - canvasSize.width*ratio ) / 2;
		var centerShift_y = ( canvas.height - canvasSize.height*ratio ) / 2;
		ctx.clearRect(0,0,canvas.width, canvas.height);
		ctx.drawImage(resultCanvas, 0, 0, canvasSize.width, canvasSize.height, centerShift_x, centerShift_y, canvasSize.width*ratio, canvasSize.height*ratio);	 
	});
}

var openFile = function (evt) {
	var input = evt.target;

	var reader = new FileReader();
	reader.onload = function() {
		var dataURL = reader.result;
		myImage.src = dataURL;

		$uploadCrop.croppie('bind', {
			enableOrientation: true,
			url: myImage.src
		})

		uploadFileWrapper.classList.add('hide');
		$('.croppie-wrapper').removeClass('hide');
		$('.result-button-wrapper').removeClass('hide');

		$('.turn-left-button').removeClass('hide');
		$('.turn-right-button').removeClass('hide');
		$('.result-button').removeClass('hide');

		scaleBar.classList.remove('hide');

		resultButton.addEventListener ('click', function () {
			drowMainImg ()

			resultButton.classList.add('hide');
			$('.turn-left-button').addClass('hide');
			$('.turn-right-button').addClass('hide');
			$('.result-button-wrapper').addClass('hide');
			// console.log(document.documentElement.clientWidth)
			if (document.documentElement.clientWidth <= 980 && document.documentElement.clientWidth > 598) {
				$('.game-frame').css('height', '815')
			} else if (document.documentElement.clientWidth < 598 && document.documentElement.clientWidth > 493) {
				$('.game-frame').css('height', '610')
			} else if (document.documentElement.clientWidth < 493) {
				$('.game-frame').css('height', '605')
			}
			scaleBar.classList.add('hide');
			uploadDemo.style.opacity = 0;

			buttonsOverlay.classList.add('hide');
			editorContainer.classList.remove('hide');
			
			editorContainer.style.zIndex = 11;
			var disabledBtns = controlBar.querySelectorAll('.disabled');
			for (var i = 0; i < disabledBtns.length; i++) {
				disabledBtns[i].classList.remove('disabled');
			}

			$('.mask-container-wrap').removeClass('hide');
			// $('#vkontakte').removeClass('disabled');

			if (document.documentElement.clientWidth <= 980) {

				$('.mask-container').addClass('scroll-pane horizontal-only jspScrollable');
				$(function()
				{
					$('.scroll-pane').jScrollPane();
				});

				$('.jspDrag')
				
			}

			$('#vkontakte').css('opacity', '1');

			$('.controll-bar').removeClass('hide').css('display', 'flex')

		});

		/*---------------------------------------------------------------------------------------------------------------------*/

		$('.turn-left-button').on('click', function (evt) {
			$uploadCrop.croppie('rotate', -90);
		})

		$('.turn-right-button').on('click', function (evt) { 
			$uploadCrop.croppie('rotate', 90);
		})

		/*---------------------------------------------------------------------------------------------------------------------*/
	};
	reader.readAsDataURL(input.files[0]);
	$('.upload-file').css('z-index', -1);
}

loadPhoto.addEventListener ('click', function (evt) {
	$('.mask-bar').empty()
	ctx.clearRect(0,0, canvas.width, canvas.height);
	loadPhoto.value = '';
})



//добавление-удаление изображения в маску по клику

function moveElementsClick (target, container1, container2, class1) {
	if(target.getAttribute('id') !== 'mask-container-inner' && !target.classList.contains('icon-stroke') && !target.classList.contains('jspDrag') && !target.classList.contains('jspHover') && !target.classList.contains('jspHorizontalBar') && !target.classList.contains('jspTrack') ) {
		var clonedImg = target.cloneNode(true);
		container2.appendChild(clonedImg);
		clonedImg.classList.toggle(class1);
		clonedImg.style.top = 0;
		clonedImg.style.left = 0;
		clonedImg.setAttribute('tabindex', 1);
		
		$(clonedImg).draggable({disabled:false, cursor: 'move', containment: 'parent'});
		$(clonedImg).focus(function() {
			clonedImg.childNodes[1].classList.remove('hide');
			$(clonedImg).draggable({disabled:false, cursor: 'move', containment: 'parent'});
			$(clonedImg).resizable({disabled:false, containment: 'parent', handles: 'all', aspectRatio: true});	
		});

		$(clonedImg).blur(function() {
			clonedImg.childNodes[1].classList.add('hide');
			$(clonedImg).removeClass('focused');
			$(clonedImg).resizable({disabled:true});
		});

		var closeMasks = maskBar.querySelectorAll('.close-mask');
		for (var i = 0; i < closeMasks.length; i ++) {
			closeMasks[i].addEventListener('click', function (evt) {
				maskBar.removeChild(evt.target.parentNode);
			})
			closeMasks[i].addEventListener('touchend', function (evt) {
				maskBar.removeChild(evt.target.parentNode);
			})
		}

	}
}

var maskContainer = document.querySelector('.mask-container');
var maskImgs = document.querySelectorAll('.mask-img');
var maskBar = document.querySelector('.mask-bar');


maskContainer.addEventListener('click', function(evt) {
	var target  = evt.target;
	moveElementsClick (target, maskContainer, maskBar, 'draggable');
})


// Кнопки clear-save-share


// Clear
var clearButton = document.querySelector('.clear-button');

clearButton.addEventListener('click', function (evt) {
	evt.preventDefault();
	$('.mask-bar').empty();
});



// Save
var saveButton = document.querySelector('.save-button');

function downloadCanvas(link, canvas, filename) {
	link.href = canvas.toDataURL();
	link.download = filename;
}

function drawMask () {
	var addedMasks = maskBar.querySelectorAll('.mask-img');
	for (var i = 0; i < addedMasks.length; i++) {
		var maskParams = {
			left: addedMasks[i].style.left === '' ? 0 : parseInt(addedMasks[i].style.left),
			top: addedMasks[i].style.top === '' ? 0 : parseInt(addedMasks[i].style.top),
			width: addedMasks[i].style.width === '' ? addedMasks[i].offsetWidth : parseInt(addedMasks[i].style.width),
			height: addedMasks[i].style.height === '' ? addedMasks[i].offsetHeight : parseInt(addedMasks[i].style.height),
			url: 'img/' + addedMasks[i].getAttribute('id') + '.svg'
		};
		var image = new Image();
		image.src = maskParams.url;
		ctx.drawImage(image, maskParams.left, maskParams.top, maskParams.width, maskParams.height);

	}
}

var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
				+ (currentdate.getMonth()+1)  + "/" 
				+ currentdate.getFullYear() + "_"  
				+ currentdate.getHours() + ":"  
				+ currentdate.getMinutes();


saveButton.addEventListener('click', function (evt) {
	drawMask();
	downloadCanvas(evt.target, canvas, datetime + 'ХрусTeam.png');
	drowMainImg ();
})



// console.log(datetime)

var vkontakte = document.querySelector('#vkontakte');
var odnoklassniki = document.querySelector('#odnoklassniki');
var facebook = document.querySelector('#facebook');

function setUnicueURL() {
	var date = new Date();
	var dateStr = date.getTime() + '';
	var unicueURL = dateStr.substring(7);
	return unicueURL;
}

// var unicueURL = setUnicueURL();
var fileName;



facebook.addEventListener('click', function() {
	var unicueURL = setUnicueURL();
	share2.updateContent({
		url: 'http://gametest.hrusteam.by/photo-editor/tmp22.jpg',
		title: 'Интерактивная маска Шерлока',
		description: 'А какой ты Шерлок? http://gametest.hrusteam.by/photo-editor/tmp22.jpg',
		image: 'http://gametest.hrusteam.by/photo-editor/tmp22.jpg?' + unicueURL
	})
	drawMask();
	var canvasB64 = canvas.toDataURL();
	drowMainImg ()
	
	$.ajax ({
		url: './data.php',
		type: 'POST',
		data: ({name: canvasB64}),
		success: function(data){
			fileName = data;
			// console.log(fileName);
		}
	});
	// var unicueURL = setUnicueURL();
	// share2.updateContent({
	// 	url: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg',
	// 	title: 'title',
	// 	description: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg',
	// 	image: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg?' + unicueURL
	// })
})

// facebook.addEventListener('mousedown', function() {
// 	var unicueURL = setUnicueURL();
// 	share2.updateContent({
// 		url: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg',
// 		title: 'title',
// 		description: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg',
// 		image: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg?' + unicueURL
// 	})
// })

// facebook.addEventListener('mouseup', function() {
// 	drawMask();
// 	var canvasB64 = canvas.toDataURL();
// 	drowMainImg ()
	
// 	$.ajax ({
// 		url: './data.php',
// 		type: 'POST',
// 		data: ({name: canvasB64}),
// 		success: function(data){
//     		fileName = data;
//     		console.log(fileName);
//     	}
// 	});
// })




vkontakte.addEventListener('click', function(evt) {

	drawMask();
	var canvasB64 = canvas.toDataURL();
	drowMainImg ()
	
	$.ajax ({
		url: './data.php',
		type: 'POST',
		data: ({name: canvasB64})
	});
	var unicueURL = setUnicueURL();

	share.updateContent({
		url: 'http://gametest.hrusteam.by/photo-editor/tmp22.jpg',
		title: 'Интерактивная маска Шерлока',
		description: 'А какой ты Шерлок? http://gametest.hrusteam.by/photo-editor/tmp22.jpg',
		image: 'http://gametest.hrusteam.by/photo-editor/tmp22.jpg?' + unicueURL
	})
	// evt.preventDefault();

	// var unicueURL = setUnicueURL();

	// share.updateContent({
	// 	url: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg',
	// 	title: 'title',
	// 	description: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg',
	// 	image: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg?' + unicueURL
	// })


	// share.updateContent({
	// 	// url: 'http://ashwood.by/demo/9.05_photo-editor-master-23/tmp2.jpg',
	// 	// title: 'http://ashwood.by/demo/9.05_photo-editor-master-23/tmp2.jpg',
	// 	// description: 'http://ashwood.by/demo/9.05_photo-editor-master-23/tmp2.jpg',
	// 	image: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg?' + unicueURL

	// })



	// VK.init(function() { 
	// 	// API initialization succeeded 
	// 	// Your code here
	// 	VK.callMethod("showSettingsBox", 8192);
	// }, function() { 
	// 	// API initialization failed 
	// 	// Can reload page here
	// 	console.log('initialization failed')
	// }, '5.64');

})

odnoklassniki.addEventListener('click', function() {
	var unicueURL = setUnicueURL();
	share1.updateContent({
		url: 'http://gametest.hrusteam.by/photo-editor/tmp22.jpg',
		title: 'Интерактивная маска Шерлока',
		description: 'А какой ты Шерлок? http://gametest.hrusteam.by/photo-editor/tmp22.jpg',
		image: 'http://gametest.hrusteam.by/photo-editor/tmp22.jpg?' + unicueURL
	})
	drawMask();
	var canvasB64 = canvas.toDataURL();
	drowMainImg ()
	
	$.ajax ({
		url: './data.php',
		type: 'POST',
		data: ({name: canvasB64})
	});
	// var unicueURL = setUnicueURL();
	// share1.updateContent({
	// 	url: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg',
	// 	title: 'title',
	// 	description: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg',
	// 	image: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg?' + unicueURL
	// })
})





// работающий код для шаринга ссылки вк

var share2 = Ya.share2(facebook, {
	content: {
		url: 'http://gametest.hrusteam.by/photo-editor/tmp22.jpg',
				title: 'Интерактивная маска Шерлока',
				description: 'А какой ты Шерлок? http://gametest.hrusteam.by/photo-editor/tmp22.jpg',
				image: 'http://gametest.hrusteam.by/photo-editor/tmp22.jpg'
	}
});

// share2.updateContent({
// 	// url: 'http://ashwood.by/demo/9.05_photo-editor-master-23/tmp2.jpg',
// 	// title: 'http://ashwood.by/demo/9.05_photo-editor-master-23/tmp2.jpg',
// 	// description: 'http://ashwood.by/demo/9.05_photo-editor-master-23/tmp2.jpg',
// 	image: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg?' + unicueURL
// })


////////////////////////////работает//////////////////////////////////////////////////////////////
var share = Ya.share2(vkontakte, {
	content: {
		url: 'http://gametest.hrusteam.by/photo-editor/tmp22.jpg',
				title: 'Интерактивная маска Шерлока',
				description: 'А какой ты Шерлок? http://gametest.hrusteam.by/photo-editor/tmp22.jpg',
				image: 'http://gametest.hrusteam.by/photo-editor/tmp22.jpg'
	}
});

// share.updateContent({
// 	// url: 'http://ashwood.by/demo/9.05_photo-editor-master-23/tmp2.jpg',
// 	// title: 'http://ashwood.by/demo/9.05_photo-editor-master-23/tmp2.jpg',
// 	// description: 'http://ashwood.by/demo/9.05_photo-editor-master-23/tmp2.jpg',
// 	image: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg?' + unicueURL
// })

////////////////////////////////////////////////////////////////////////////////////////////////

var share1 = Ya.share2(odnoklassniki, {
	content: {
		url: 'http://gametest.hrusteam.by/photo-editor/tmp22.jpg',
				title: 'Интерактивная маска Шерлока',
				description: 'А какой ты Шерлок? http://gametest.hrusteam.by/photo-editor/tmp22.jpg',
				image: 'http://gametest.hrusteam.by/photo-editor/tmp22.jpg'
	}
});

// share1.updateContent({
// 	// url: 'http://ashwood.by/demo/9.05_photo-editor-master-23/tmp2.jpg',
// 	// title: 'http://ashwood.by/demo/9.05_photo-editor-master-23/tmp2.jpg',
// 	// description: 'http://ashwood.by/demo/9.05_photo-editor-master-23/tmp2.jpg',
// 	image: 'http://ashwood.by/demo/9.05_photo-editor-master/tmp22.jpg?' + unicueURL
// })



// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var controlBar = document.querySelector('.controll-bar');

var buttonsAll = controlBar.querySelectorAll('.btn');

var yaShareLink = document.querySelectorAll('.ya-share2__link');

for (var i = 0; i < yaShareLink.length; i ++) {
	yaShareLink[i].classList.add('disabled');
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// $( ".controller-wrapper" ).draggable({ axis: 'x', containment: 'parent' });
// $('.controller-wrapper').on('mousemove', function (evt) {
// 	var leftCoordinate = $( ".controller-wrapper" ).css('left');
	
// 	var leftCoordinatePercentsScroll = leftCoordinate.split('p')[0] * 100 / $('.scroll').css('width').split('p')[0];

// 	// console.log($('.mask-container-inner').css('width').split('p')[0])

// 	var leftCoordinatePercentsContainer = $('.mask-container-inner').css('width').split('p')[0] * leftCoordinatePercentsScroll / 100;

// 	console.log(leftCoordinatePercentsContainer)
// 	// console.log(leftCoordinatePercents)

// 	// if (leftCoordinatePercents >= 77) {
// 	// 	$('.mask-container-inner').css('left', '-' + 100 + '%')
// 	// } else {
// 	// 	$('.mask-container-inner').css('left', '-' + leftCoordinatePercents + '%')
		
// 	// }

// 	$('.mask-container-inner').css('left', '-' + leftCoordinatePercentsContainer + 'px');

// })

// $('.controller-wrapper').on('swipe', function (evt) {
// 	var leftCoordinate = $( ".controller-wrapper" ).css('left');
	
// 	var leftCoordinatePercentsScroll = leftCoordinate.split('p')[0] * 100 / $('.scroll').css('width').split('p')[0];

// 	// console.log($('.mask-container-inner').css('width').split('p')[0])

// 	var leftCoordinatePercentsContainer = $('.mask-container-inner').css('width').split('p')[0] * leftCoordinatePercentsScroll / 100;

// 	console.log(leftCoordinatePercentsContainer)
// 	// console.log(leftCoordinatePercents)

// 	// if (leftCoordinatePercents >= 77) {
// 	// 	$('.mask-container-inner').css('left', '-' + 100 + '%')
// 	// } else {
// 	// 	$('.mask-container-inner').css('left', '-' + leftCoordinatePercents + '%')
		
// 	// }

// 	$('.mask-container-inner').css('left', '-' + leftCoordinatePercentsContainer + 'px');

// })


// $('.mask-container-inner').on('touchmove', function (evt) {
// 	var leftCoordinate = $( ".mask-container-inner" ).css('left');
// 	console.log(leftCoordinate)

// 	var leftCoordinatePercentsContainer = leftCoordinate.split('p')[0] * 100 / $('.mask-container-inner').css('width').split('p')[0]$('.scroll').css('width').split('p')[0];
// 	console.log(leftCoordinatePercentsContainer)

// 	// var leftCoordinatePercentsScroll = $('.controller-wrapper').css('width').split('p')[0] * leftCoordinatePercentsContainer / 100;
// 	// console.log(leftCoordinatePercentsScroll)
// 	// $('.controller-wrapper').css('left', '-' + leftCoordinatePercentsContainer + 'px');
// })





















// удаление по клику маски
// maskBar.addEventListener('click', function (evt) {
// 	if (maskBar.childNodes.length !== 0) { 
// 		var target  = evt.target;
// 		$(target).resizable('destroy');
// 		$(target).draggable('destroy');
// 		target.style.width = size + 'px';
// 		target.style.height = size + 'px';
// 		target.style.top = 0;
// 		target.style.left = 0;
// 		moveElementsClick (target, maskBar, maskContainer, 'draggable');

// 	}
// })


// maskBar.addEventListener('touchend', function (evt) {
// 	if (maskBar.childNodes.length !== 0) { 
// 		var target  = evt.target;
// 		$(target).resizable('destroy');
// 		$(target).draggable('destroy');
// 		target.style.width = size + 'px';
// 		target.style.height = size + 'px';
// 		target.style.top = 0;
// 		target.style.left = 0;
// 		moveElementsClick (target, maskBar, maskContainer, 'draggable');
// 	}
// })


