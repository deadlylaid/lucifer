$button1 = $(".higherfunction");
console.log($button1);

$button1.click(function(){
    console.log(nickname);
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        //these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    $.ajax({
        method:'PUT',
        url:'/api/user/character/status/',
        data:{
            nickname:nickname,
            level:level,
            job:job,
            attack_point:attack_point,
            defence_point:defence_point,
            health:health,
            mana:mana,
            dexterity:dexterity,
            intelligence:intelligence,
        },
    }).done(function(receivedStatusData){
       alert(receivedStatusData.health);
    });
});
