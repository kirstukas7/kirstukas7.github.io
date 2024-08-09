// create notification
var notification = L.control.notifications({
    closable: false,
    className: 'modern'
}).addTo(map);

// notification function
function showNotification(type, title, desc) {
    switch(type) {
        case 'alert': notification.alert(title, desc); break;
        case 'info': notification.info(title, desc); break;
        case 'success': notification.success(title, desc); break;
        case 'warning': notification.warning(title, desc); break;
    }
};
