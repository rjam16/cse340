exports.triggerError = (req, res, next) => {
    try {
        throw new Error('This is an intentional 500 error! Oops!');    
    } catch (err) {
        next(err);
    }
};