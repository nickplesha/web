(function() {
    'use strict';
    
    function RandomMapillary(locations) {
        var clientId = 'd3IyLTM1bGNFRkIyR0xVY3NJOG1idzpmNTc5ZDRhNjkyYzZjNjdk',
            mapillaryUrl = 'https://www.mapillary.com/map/im/',
            mapillaryApiUrl = 'https://a.mapillary.com/v2/im/',
            mapillaryImageUrl = 'https://d1cuyjsrcm0gby.cloudfront.net/',
            mapillaryProfileUrl = 'https://www.mapillary.com/profile/';
        
        this.getRandomSequence = function() {
            return locations[Math.floor(Math.random() * locations.length)];            
        }
        
        this.setBackgroundImage = function(sequence) {
            var backgroundImage = new Image(),
                imageUrl = mapillaryImageUrl + sequence + '/thumb-2048.jpg';
                
            return new Promise(function(resolve, reject) {
                backgroundImage.onload = function() {
                    resolve(imageUrl);
                }
                backgroundImage.onerror = function() {
                    reject();
                }
                backgroundImage.src = imageUrl
            })
        }
        
        this.getLocation = function(key) {
            return fetch(mapillaryApiUrl + key + '?client_id=' + clientId)
                .then(function(response) {
                    return response.json();
                });
        }
    
        this.showLocationInfo = function(data) {
            var location = document.getElementById('location'),
                user = document.getElementById('user');
            
            location.textContent = data.location;
            user.textContent = '@' + data.user;
            user.href = mapillaryProfileUrl + data.user;
            location.href = mapillaryUrl + data.key;

        }
        
        this.showMap = function(location) {
            var map = L.map('map', {zoomControl: false}),
                osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',              
                osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                osm = new L.TileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib}),
                marker = L.marker({
                    lat: location.lat,
                    lon: location.lon
                });
                
            map.addLayer(osm);
            map.setView([location.lat, location.lon], 1);
            marker.addTo(map);
            
            document.getElementById('map').href = mapillaryUrl + location.key;
        }
        
        this.init = function() {
            var self = this,
                sequence = this.getRandomSequence(),
                background = document.getElementById('background')
                
            this.setBackgroundImage(sequence).then(function(imageUrl) {
                background.style.backgroundImage = "url('" + imageUrl + "')";
                background.style.opacity = "1";
                self.getLocation(sequence).then(function(location) {
                    self.showLocationInfo(location);
                    self.showMap(location);
                })
            })
        }
        
        this.init();
    }

    var locations = [
        "WExrrdPvZH7LuT19gR2YBQ",
        "gufn_J_qdw4S1GZwn4YBIw",
        "t09TJfYU3H86zyfkbc8wYw",
        "YYuI0FpkY8WXdV-z26wbzg",
        "74KeirfgEaYN6wz6OFDliw",
        "mzxQwrbkTVc5PNva6hkRvw",
        "cuP9ZR78BXYJBCvu2wQFOA",
        "Lf8J0xDBcxerldhRCUvmnA",
        "i1ZxK0pW595saLlw-Zdy4Q",
        "Z91hsJKnuXjX6BNkOVoYdA",
        "ztQBs95gqgLDZd8vTu5rLg",
        "p2fvL3WFxh8vV3_UvCihBA",
        "FSykYpVR0XaUW_wCUMfh8Q",
        "V9L328QFpkkcDdebBstDlA",
        "p3jTqLi-F3goRXgPbOg5eg",
        "PSyWXzHFfUbLywtH9kHmlg",
        "cLo_TNYjFEgCGuSdwCN4_A",
        "n2cvGu2Nnp8aGyq_b-jGmA",
        "pH8eJOrvw2kiOEHvWNe7bQ",
        "M9-HHbBnOd7ZaUFp5-UYEQ",
        "ftwQvrwmCbu6qJIcuVB2Rw",
        "aWm9EHxDZNsn-fGXhz2OGg",
        "uHrvIRJwHgKRpTJvTDlUXw",
        "qRzcMuhVpqaryFoUgxDkCg",
        "QJthjbNWubE2srS5En-3Ng",
        "pRo8rYxF00ouwcWBVhnkNg",
        "q3mAZ-tbOr9-RHx3maXKBg",
        "LHP93MylOBtsGMAxrP__Mw",
        "OAXxjknnpALlMBz6nELSjA",
        "kIoeAyrwfCpta1yPM3RXAg",
        "H5OXDTcOTV8f2FYsROyL_Q",
        "WfeT9yLWDzqCB56vLyFWjA",
        "htMDVSZ27_F3C7XD9PiNYg",
        "v8V9g4taTfNd_RhdJcuD_A",
        "91LL8RTjU-4WmdzORJPtYA",
        "Da4_KZ_Qa_ww7000GGC24w",
        "62lDBkG9LylmCdhJ4YohkQ",
        "18HEaS-VihanW-AaHf0MYQ",
        "VkABP26dtzguem0MZu7Vng",
        "LgEESIPwUzgj39wNisrN0g",
        "k1WeYcT92IW3LIHxz5IHqg",
        "s-MQXrSOdOaWLa9k2q-cgw",
        "GutIEXcm14M2QlnFYz76LQ",
        "TLUYitWvNwj0r2CfwWrk4A",
        "lzQRwnIpOvmlRsyxOJ5g3w",
        "bXdFAb5OXPS4FZq03XzUFQ",
        "vZUYBzF_Fw-xrTPzcJ68jg",
        "tpU1Lty1Zfqa_A2pUQYdZQ",
        "Y8UZybi4j8Op1tTk4xES7w",
        "Len4RVeowa_44Dpn5oI4tw",
        "WiAeHtWWyHdOVIPf67Fpdw",
        "eEvbtpP9vxS6NeHZWZWWfg",
        "m77CtYhbFnRUXxgZsaMpKA",
        "KIRtFMWhxdDhqAtjZolUGA",
        "ou2v9TWAvTQTwRzBKtfElg",
        "MTKX48IA25Gj-ly5iQv4vQ",
        "7ZCtY45n9th_Tl_fMmH44g",
        "yugmB2ajW-NGbtJh5UuczQ",
        "-i4MV6ZVvMKEB-nhuQYrgQ",
        "sfBVuLR4lPtFR9EAqmSZ-Q",
        "iQq-DXdLR_OAn3LOYg7jug",
        "DlBx-BpD0b619eKZ9WjGpQ"
    ]

    var randomMapillary = new RandomMapillary(locations);

})();
