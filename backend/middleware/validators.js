import { body, validationResult } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateRegister = [
    body('name', 'Name is required').notEmpty().trim().escape(),
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    handleValidationErrors
];

export const validateLogin = [
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('password', 'Password is required').exists(),
    handleValidationErrors
];

export const validateWill = [
    body('testator.name', 'Testator name is required').notEmpty(),
    body('beneficiaries', 'At least one beneficiary is required').isArray({ min: 1 }),
    body('executors', 'At least one executor is required').isArray({ min: 1 }),
    handleValidationErrors
];