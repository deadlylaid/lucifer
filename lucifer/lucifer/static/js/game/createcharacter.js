(function(){
    $("documents").ready(function(){

        $readonly_tag = $("[name=characterjob]");

        $("[class^=job]").on("click", function(){
            $readonly_tag.val($(this).attr("id"));
        });

    });
})();
