import { ref } from "vue"

export default function useGrid() {

    const isDrawing = ref(false)
    const grid = ref(Array.from({ length: 32 }, () => Array.from({ length: 32 }, () => 0)))

    /**
     * グリッド配列を文字列に変換する
     */
    const gridDataToString = () => {
        return grid.value.map((row) => row.join("")).join("\n");
    }

    /**
     * グリッド配列の特定の位置の0/1を反転する
     */
    const _toggleCell = (rowIndex: number, colIndex: number) => {
        grid.value[rowIndex][colIndex] = grid.value[rowIndex][colIndex] === 0 ? 1 : 0;
    }

    /**
     * 描画を開始する
     */
    const startDrawing = (rowIndex: number, colIndex: number) => {
        isDrawing.value = true;
        _toggleCell(rowIndex, colIndex);
    }

    /**
     * 描画中の場合、該当セルの白黒を反転する
     */
    const draw = (rowIndex: number, colIndex: number) => {
        if (isDrawing.value) {
            _toggleCell(rowIndex, colIndex);
        }
    }

    /**
     * 描画を終了する
     */
    const stopDrawing = () => {
        isDrawing.value = false;
    }

    return { isDrawing, grid, gridDataToString, startDrawing, draw, stopDrawing }

}