import {Theme} from "./Theme"

export class GetThemesResponse {
    private themes: Array<Theme>

    get _themes(): Array<Theme> {
        return this.themes
    }

    set _themes(themes: Array<Theme>) {
        this.themes = themes
    }
}
