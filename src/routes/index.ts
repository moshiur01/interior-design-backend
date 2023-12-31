import express from 'express';
import { UserRoutes } from '../app/modules/user/user.route';
import { AdminRoutes } from '../app/modules/admin/admin.route';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { ServiceRoute } from '../app/modules/service/service.route';
import { BookingRoutes } from '../app/modules/booking/booking.route';
import { ProjectRoutes } from '../app/modules/proejcts/project.route';
import { BlogRoutes } from '../app/modules/blog/blog,route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
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
  {
    path: '/booking',
    route: BookingRoutes,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
