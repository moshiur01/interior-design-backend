import express from 'express';
import { UserRoutes } from '../app/modules/user/user.route';
import { AdminRoutes } from '../app/modules/admin/admin.route';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { ServiceRoute } from '../app/modules/service/service.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/services',
    route: ServiceRoute,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
