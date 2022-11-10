document.addEventListener('DOMContentLoaded', function(){
    const darkModeToggle = document.getElementById('dark_mode_checkbox');

    if (sessionStorage.getItem('dark_mode') === null){
        sessionStorage.setItem('dark_mode', '0');   
    } else {
        if (sessionStorage.getItem('dark_mode') === '1'){
            document.body.classList.add('dark');
            darkModeToggle.checked = true;
        } else {
            document.body.classList.remove('dark');
            darkModeToggle.checked = false;
        }
    }

    darkModeToggle.addEventListener('change', function(){
        document.body.classList.toggle('dark');
        sessionStorage.setItem('dark_mode', (parseInt(sessionStorage.getItem('dark_mode')) + 1) % 2);
    })
})