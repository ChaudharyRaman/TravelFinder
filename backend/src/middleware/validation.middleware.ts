import { Request, Response,NextFunction,RequestHandler } from "express";
import Joi from "joi";

/**
 * This is the middleware that validates the request body
 * @param schema - Joi.Schema
 * @returns - RequestHandler
 */
function validationMiddleware(schema: Joi.Schema): RequestHandler{
    return async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> =>{
        const validatonOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };

        try {
            const value = await schema.validateAsync(
                req.body,
                validatonOptions
            );
            req.body = value;
            next();
        } catch (e:any) {
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            })
            res.status(400).send({
                errors:errors
            })
        }
    }
}

export default validationMiddleware;