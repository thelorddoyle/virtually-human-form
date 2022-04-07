export const toggleButtonClass = (divId) => {
    if (document.getElementById(divId)) {
        let myDiv = document.getElementById(divId).className;
        if (myDiv === 'dropdown-btn') {
            document.getElementById(divId).classList.add('dropdown-btn-active');
            // document.getElementById(divId).classList.remove('dropdown-btn')
        } else if (myDiv === 'dropdown-btn dropdown-btn-active') {
            document.getElementById(divId).classList.remove('dropdown-btn-active');
            document.getElementById(divId).style = '';
        };
    };
};