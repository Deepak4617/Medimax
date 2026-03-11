const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        return next();

    } catch (err) {
        const status = 422;
       
        console.log(err)
        const message = 'Fill the input properly';
        // const extraDetails = err.errors[0].message;
        const extraDetails = err.issues.map((curElem) => curElem.message);
        const error = {
            status,
            message,
            extraDetails
        }
        // res.status(400).json({ msg: message})
        next(error);
    }

}

module.exports = validate;