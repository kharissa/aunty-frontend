import { withLeaflet, MapControl } from "react-leaflet";
import { GoogleProvider, GeoSearchControl } from "leaflet-geosearch";

class GeoSearch extends MapControl {
    createLeafletElement(opts) {
        const provider = new GoogleProvider({
            params: {
                key: process.env.REACT_APP_GOOGLE_API_KEY
            },
        });

        const searchControl = new GeoSearchControl({
            provider: provider,
            position: "topleft",
            style: 'bar'
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
