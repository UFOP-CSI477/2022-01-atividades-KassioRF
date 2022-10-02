import { Router } from 'express';

const mainRouter = Router();

mainRouter.get('/', (req, res) => {
  res.json({
    message: "Server is runnning =D"
  });
});

export default mainRouter;