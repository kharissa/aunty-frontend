import { withLeaflet, MapControl } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";

class GeoSearch extends MapControl {
    createLeafletElement(opts) {
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider: provider,
            position: "topleft"
        });
        return searchControl;
    }

    componentDidMount() {
        const { map } = this.props.leaflet;
        this.leafletElement.searchElement.elements.container.onclick = (e) => {
            e.stopPropagation()
        }
        map.addControl(this.leafletElement);
    }
}

export default withLeaflet(GeoSearch);
