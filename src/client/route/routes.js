const routes = (app) => {
    app.get('/', (_, res) => {
        res.render('index.html')
    })
}

export default routes