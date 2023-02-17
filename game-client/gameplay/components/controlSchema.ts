export type KeySchema = {
    isPressed: boolean
}

export type ControlSchema = {
    key: {
        up, down, left, right, w, a, s, d, esc, enter, space: KeySchema
    },
    mouse: {
        x, y, scrollAxis: number
        button: { right, left, middle: KeySchema}
    }
    matchID, playerID, timestamp: number
}
