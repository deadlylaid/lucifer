// JavaScript Document
$(function(){
	//엔터키 쳤을 때 무조건 submit 안되도록
	//문서전체에 이벤트처리
	$(document).on('keydown',function(e){
		if(e.keyCode==13) return false; //엔터키 = 13;
	});
	$(document).on('keydown',function(e){
		if(e.keyCode==13) return false; //엔터키 = 13;
	});
	//포커스 있을때
	$('input').on('focus',function(){
		$(this).css('background-color','rgb(232,232,232)');
	});
	
	//포커스 잃을때
	$('input').on('blur',function(){
		$(this).css('background-color','white');
	});
	
	//엔터키 눌렀을 때 포커스 이동
	
	$('#Name').on('keydown', function(e){ //이름 -> ID
		if(e.keyCode==13) $('#ID').focus();
	});
	$('#ID').on('keydown', function(e){ //ID -> 비밀번호
		if(e.keyCode==13) $('#PW').focus();
	}); 
	$('#PW').on('keydown', function(e){ //비밀번호 -> 비밀번호확인
		if(e.keyCode==13) $('#PWCH').focus();
	});
	$('#PWCH').on('keydown', function(e){ //비밀번호확인 -> 생년월일
		if(e.keyCode==13) $('#Email').focus();
	});
	
	var PWCHText = document.getElementById('PWCHText');
	
	$('#PWCH').on('keydown',function(e){
		if(e.keyCode==13){
			if($('#PW').val()!=$('#PWCH').val()){
				PWCHText.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;비밀번호가 일치하지 않습니다.";
				PWCHText.style.color="red";
				$('#PW').val("").focus();
			}
			else
			$('#Email').focus();
		}
	});
	
$('.form-inline').on('submit',function(){

	if($('#Name').val()==""){
		alert("성명을 입력하세요.")
		$('#Name').focus();
	return false; //서버로 전송되지 않도록
	}

	if($('#ID').val()==""){
		alert("아이디를 입력하세요.")
		$('#ID').focus();
	return false;
	}
	
	if($('#PW').val()==""){
		alert("비밀번호를 입력하세요.")
		$('#PW').focus();
	return false;
	}

	if($('#PWCH').val()==""){
		alert("비밀번호 확인를 입력하세요.")
		$('#PWCH').focus();
	return false;
	}
	
	if($('#Email').val()==""){
	alert("이메일을 입력하세요.")
	$('#Email').focus();
	return false;
	}
	
	});
	
	
});//종료