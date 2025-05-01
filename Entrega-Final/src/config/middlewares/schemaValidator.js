export const schemaValidator = (schema) => {
    return (req, res, next) => {
      const type = ["body", "params", "query"];
  
      for (const key of type) {
        if (schema[key]) {
          const result = schema[key].safeParse(req[key]);
          if (!result.success) {
            return res.status(400).json({
              error: `Validation error in ${key}`,
              details: result.error.errors,
            });
          }
        }
      }
      next();
    };
  };
  