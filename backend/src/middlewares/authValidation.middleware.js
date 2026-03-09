

const validate = (schema) => {
    return (req, res, next) => {

        const { error, value } = schema.validate(req.body, {
            abortEarly: false, // show all errors
            stripUnknown: true,
        });

        if (error) {

            // console.log("Validation error:", error.details);

            const errors = error.details.map((err) => ({
                field: err.path[0],
                message: err.message,
            }));

            return res.status(400).json({
                success: false,
                errors,
            });
            // next(new Error("This is test error"));
        }

        req.body = value; // sanitized value
        next();
    };
};

module.exports = validate;