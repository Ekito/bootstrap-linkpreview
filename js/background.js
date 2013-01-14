chrome.browserAction.onClicked.addListener( function(tab){
    
    chrome.tabs.query({}, function(tabs) {

        var tab, found = false;
        
        for (var i = 0; i < tabs.length; i++) {

            tab = tabs[i];

            if (tab.url == chrome.extension.getURL('index.html')) {
                // Get the tab's object and focus the tab
                chrome.tabs.update(tab.id, {selected: true});
                found = true;
                break;
            }                  
        }
        if (!found) {
            chrome.tabs.create({url:chrome.extension.getURL("index.html")});
        } 
    });

} );