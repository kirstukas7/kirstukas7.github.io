function changeLang(baseSite) {
    language = Cookies.get('lang');
    
    if (language == 'lt')
        language = 'en';
    else if (language == 'en')
        language = 'lt';
    console.log(language);
    Cookies.set('lang', language);
    window.location.href = "/"+baseSite;
}
