let map;

function initMap() {
    map = L.map('map').setView([40.1792, 44.4991], 10);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
    }).addTo(map);
}

function loadMap() {
    const geojsonUrl = 'armenia_map.geojson';

    fetch(geojsonUrl)
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 0
                    });
                },
                style: function(feature) {
                    return {
                        color: 'blue',
                        weight: 2,
                        fillOpacity: 0.5,
                    };
                },
                onEachFeature: function(feature, layer) {
                    layer.bindPopup(null);
                }
            }).addTo(map);
        })
        .catch(error => {
            console.error('Error loading GeoJSON data:', error);
        });
}

document.addEventListener('DOMContentLoaded', initMap);