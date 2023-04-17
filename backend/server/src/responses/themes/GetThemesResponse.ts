import {Theme} from "./Theme"

export class GetThemesResponse {
    private _themes: Array<Theme>

    get themes(): Array<Theme> {
        return this._themes
    }

    set themes(_themes: Array<Theme>) {
        this._themes = _themes
    }
}
