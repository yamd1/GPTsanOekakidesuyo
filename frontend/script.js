
// TODO: 環境変数用ファイルからインポートするように修正
const ENDPOINT = "http://localhost:8000/";
const THEMES = "themes";
const SESSION = "session";
const SESSIONS = "sessions";

const app = Vue.createApp({
    data() {
        return {
            grid: Array.from({length: 32}, () => Array.from({length: 32}, () => 0)),
            theme: "お題：",
            message: "",
            loading: false,
            sessionId: "",
            sessionName: "",
            sessions: [],
        };
    },

    mounted() {

        // お題を取得する
        axios
            .get(`${ENDPOINT}${THEMES}`)
            .then((res) => {
                const random = Math.floor(Math.random() * res.data.themes.length);
                this.theme += res.data.themes[random].theme;
            })
            .catch((e) => console.error(e));

        // セッション一覧を取得する
        axios
            .get(`${ENDPOINT}${SESSIONS}`)
            .then((res) => {
                this.sessions = res.data.sessions;
            })
            .catch((e) => console.error(e));

    },

    methods: {
        toggleCell(rowIndex, colIndex) {
            this.grid[rowIndex][colIndex] = this.grid[rowIndex][colIndex] === 0 ? 1 : 0;
        },

        sendGrid() {
            this.loading = true;
            this.message = "";
            const gridString = this.gridDataToString();
            axios
                .post(`${ENDPOINT}${SESSION}`, {name: this.sessionName, message: gridString})
                .then((res) => {
                    this.message = res.data.session.response;
                    this.loading = false;
                })
                .catch((e) => {
                    console.error(e);
                    this.loading = false;
                });
        },

        gridDataToString() {
            return this.grid.map((row) => row.join("")).join("\n");
        },
    },
});

app.mount("#app");

