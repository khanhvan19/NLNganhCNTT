exports.errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    //duplicate field between from and db(2)
    if (err.code === 11000) {
        err.statusCode = 400;
        for (let p in err.keyValue) {
            err.message = `${p} have to be unique`;
        }
    }

    //objectID is not correct (4)
    if(err.kind == "ObjectId") {
        err.statusCode = 404;
        let errorId = req.originalUrl.split("/")[(req.originalUrl.split("/").length) - 1];
        err.message = `The ID ${errorId} is not found`
    }

    //not enter field in input || pw not enough 8 character (3)
    if(err.errors) {
        err.statusCode = 400;
        err.message = []
        for (let p in err.errors) {
            err.message.push(err.errors[p].message)
        }
    }

    //log err
    res.status(err.statusCode).json({
        status: `fail ${err.statusCode}`,
        message: err.message
    })
}