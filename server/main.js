Meteor.startup(function () {
    if (Places.find().count() === 0) {
        var places = [
            {
                'place': 'Place 1',
                'author': 'Author 1'
            },
            {
                'place': 'Place 2',
                'author': 'Author 2'
            },
            {
                'place': 'Place 3',
                'author': 'Author 3'
            },
            {
                'place': 'Place 4',
                'author': 'Author 4'
            }
        ];

        places.forEach(function(item, index) {
            Places.insert(item);
        });
    }
});


JsonRoutes.ErrorMiddleware.use(RestMiddleware.handleErrorAsJson);

/**
 * @middleware
 */
JsonRoutes.Middleware.checkAuthorized = function(req, res, next) {
    if (!req.userId || !req.authToken) {
        var error = new Meteor.Error('unauthorized', 'You\'re not Authorized.');
        error.statusCode = 401;
        throw error;
    }
    next();
};

JsonRoutes.Middleware.use('/api', JsonRoutes.Middleware.checkAuthorized);

JsonRoutes.add('GET', '/api/places/',    getPlaces);
JsonRoutes.add('GET', '/api/places/:id', getPlaces);

function getPlaces(req, res, next) {
    var id = req.params.id;

    JsonRoutes.sendResult(res, {
        data:  {
            success: true,
            data: id ? Places.findOne(id) : Places.find().fetch()
        }
    });
}