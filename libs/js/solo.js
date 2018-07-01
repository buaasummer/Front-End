

$(window).scroll(function(){
	let bar = document.documentElement.scrollTop;
	let contents = document.getElementsByClassName('content');	let now=0;
	let arr=[];
	for(let x=0;x<contents.length;x++)
	{
		arr[x]=contents[x].offsetTop;
		if(arr[x]-150<bar)
		{
			now = x;
		}
		else{
			break;
		}
	}
	for(let x=0;x<contents.length;x++)
	{
		$('#'+($(contents[x]).attr('name'))+'_link').attr('class','aa list-group-item scroll');
	}
	$('#'+($(contents[now]).attr('name'))+'_link').attr('class','aa list-group-item scroll now');
})

function reference(){
	$('#papertemplate').toggle();
	$('#otherref').toggle();
}

function toRegistration(){
	alert('to Registration!');
}

function toReserve(){
	alert('to Reserve!');
}

function now_general(){
	$('.aa').each(function(){
		$(this).attr('class','aa list-group-item scroll');
	});
	$('#general_link').attr('class','now aa list-group-item scroll');
}

function now_essay(){
	$('.aa').each(function(){
		$(this).attr('class','aa list-group-item scroll');
	});
	$('#essay_link').attr('class','now aa list-group-item scroll');
}

function now_important(){
	$('.aa').each(function(){
		$(this).attr('class','aa list-group-item scroll');
	});
	$('#important_link').attr('class','now aa list-group-item scroll');
}

function now_schedule(){
	$('.aa').each(function(){
		$(this).attr('class','aa list-group-item scroll');
	});
	$('#schedule_link').attr('class','now aa list-group-item scroll');
}

function now_organization(){
	$('.aa').each(function(){
		$(this).attr('class','aa list-group-item scroll');
	});
	$('#organization_link').attr('class','now aa list-group-item scroll');
}

function now_reference(){
	$('.aa').each(function(){
		$(this).attr('class','aa list-group-item scroll');
	});
	$('#reference_link').attr('class','now aa list-group-item scroll');
}

function now_register(){
	$('.aa').each(function(){
		$(this).attr('class','aa list-group-item scroll');
	});
	$('#register_link').attr('class','now aa list-group-item scroll');
}

function now_hotel(){
	$('.aa').each(function(){
		$(this).attr('class','aa list-group-item scroll');
	});
	$('#hotel_link').attr('class','now aa list-group-item scroll');
}

function now_contact(){
	$('.aa').each(function(){
		$(this).attr('class','aa list-group-item scroll');
	});
	$('#contact_link').attr('class','now aa list-group-item scroll');
}

