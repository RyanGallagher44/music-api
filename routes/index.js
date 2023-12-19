import musicRoutes from './music.js';

const constructorMethod = (app) => {
    app.use('/music', musicRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error: "This route does not exist"});
    });
};

export default constructorMethod;