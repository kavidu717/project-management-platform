import { Router } from "express";
import {
  getProjects,
  getProjectById,
  createProjects,
  updateProjects,
  deleteProjects,
  addMembersToProjects,
  getProjectMembers,
  UpdateMemberRole,
  deleteMember,
} from "../controllers/projectController.js";

import {
  verifyJWT,
  validateProjectPermission,
} from "../middleware/authMiddware.js";

import { validate } from "../middleware/validatorMiddleware.js";
import {
  addMemberToProjectValidator,
  createProjectValidator,
} from "../validators/index.js";

import { AvailableUserRole, UserRolesEnum } from "../utils/constant.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getProjects)
  .post(createProjectValidator(), validate, createProjects);

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRole), getProjectById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createProjectValidator(),
    validate,
    updateProjects
  )
  .delete(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    deleteProjects
  );

router
  .route("/:projectId/members")
  .get(getProjectMembers)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMemberToProjectValidator(),
    validate,
    addMembersToProjects
  );

router
  .route("/:projectId/members/:userId")
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    UpdateMemberRole
  )
  .delete(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    deleteMember
  );

export default router;