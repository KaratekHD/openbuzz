import {useDisplay} from "vuetify";

export default {
    get_header_size() {
        const {mobile} = useDisplay()
        if (mobile._object.xs) {
            return "text-h4"

        } else {
            return "text-h2"
        }
    }
}