document.addEventListener('DOMContentLoaded', function() {
    $("a[href='#top']").click(function () {
        $('html, body').animate({scrollTop: 0}, "slow");
    })

    window.addEventListener('scroll', function() {

        if (window.scrollY < 300){
            document.getElementById('scroll_top_id').style.visibility = "hidden";
        } else {
            document.getElementById('scroll_top_id').style.visibility = "visible";
        }
    })
})