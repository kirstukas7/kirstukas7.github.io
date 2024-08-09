// create sidebar
var sidebar = L.control.sidebar({
    autopan: true
}).addTo(map);

// add panels to sidebars
sidebar
    .addPanel({
        id: 'legenda',
        tab: '<i class="fa-solid fa-road"></i>',
        title: '{{ sidebar.legend.title }}',
        pane: `{{ sidebar.legend.pane }}`
    })
    /*.addPanel({
        id: 'naujienos',
        tab: '<i class="fa-solid fa-newspaper"></i>',
        title: '{{ sidebar.news.title }}',
        pane: '{{ sidebar.news.pane }}'
    })*/
    .addPanel({
        id: 'dalintis',
        tab: '<i class="fa-solid fa-share-from-square"></i>',
        title: '{{ sidebar.share.title }}',
        button: () => shareLocation()
    })
    .addPanel({
        id: 'kalba',
        tab: '<i class="{{ sidebar.language.icon }}"></i>',
        title: '{{ sidebar.language.title }}',
        button: () => {
            changeLang();
            window.location.href = '{{ site.data.sites.vrkr }}';
        },
        position: 'bottom'
    })
    .addPanel({
        id: 'klaida',
        tab: '<i class="fa-solid fa-triangle-exclamation"></i>',
        title: '{{ sidebar.error.title }}',
        button: 'https://github.com/kirstukas7/Zemelapis-Assets/issues',
        position: 'bottom'
    })
    .addPanel({
        id: 'pagrindinis',
        tab: '<i class="fa fa-house"></i>',
        title: '{{ sidebar.home.title }}',
        button: '/',
        position: 'bottom'
    });