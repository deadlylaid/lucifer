(function(){
    $("documents").ready(function(){

        $("[class^=job]").on("click", function(){
            alert($(this).attr("id"));
        });

    });
})();
