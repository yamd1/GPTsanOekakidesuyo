
const ENDPOINT = "http://localhost:8000/"
const THEMES = "themes"
const SESSION = "session"

const app = Vue.createApp({

    data() {
        return {
            grid: Array.from({length: 32}, () => Array.from({length: 32}, () => 0)),
            theme: "",
            message: ""
        };
    },
    mounted() {

        axios.get(`${ENDPOINT}${THEMES}`)
            .then(res => this.theme = res.data)
            .catch(e => console.error(e))
    },

    methods: {

        toggleCell(rowIndex, colIndex) {
            this.grid[rowIndex][colIndex] = this.grid[rowIndex][colIndex] === 0 ? 1 : 0;
        },



        sendGrid() {
            this.theme = ""
            this.message = ""
            const gridString = this.gridDataToString()
            console.log(gridString);
        },

        gridDataToString() {
            return this.grid.map(row => row.join("")).join("\n");
        },
    },
});
app.mount("#app");
