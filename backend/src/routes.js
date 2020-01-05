import { Router } from 'express';
// import multer from 'multer';
// import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckingController';
import HelpOrderController from './app/controllers/HelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
// const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/students/:studentId/checkins', CheckinController.store);
routes.get('/students/:studentId/checkins', CheckinController.index);
routes.get('/students/:studentId/login/:device', StudentController.index);
routes.get('/students/:studentId/help-orders', HelpOrderController.index);
routes.post('/students/:studentId/help-orders', HelpOrderController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.post('/students', StudentController.store);
routes.put('/students/:studentId', StudentController.update);
routes.get('/students', StudentController.index);
routes.get('/students/:studentId', StudentController.index);
routes.delete('/students/:studentId', StudentController.delete);

routes.post('/plans', PlanController.store);
routes.put('/plans/:planId', PlanController.update);
routes.get('/plans/', PlanController.index);
routes.get('/plans/:planId', PlanController.index);
routes.delete('/plans/:planId', PlanController.delete);

routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:enrollmentId', EnrollmentController.update);
routes.get('/enrollments', EnrollmentController.index);
routes.get('/enrollments/:enrollmentId', EnrollmentController.index);
routes.delete('/enrollments/:enrollmentId', EnrollmentController.delete);

routes.get('/help-orders', HelpOrderController.index);
routes.put('/help-orders/:answerId/answer', HelpOrderController.update);

export default routes;
