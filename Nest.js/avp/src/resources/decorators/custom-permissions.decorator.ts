import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { UserCustomPermissionsGuard } from '../guards/user-custom-permissions.guard';

/**
 * Custom decorator to set custom permissions and, automatically, use the UserCustomPermissionsGuard, which checks if the user has permission to access the resource.
 * By default, only the resource owner and ADMIN can access the resource.
 * 
 * @param roles Lists roles that can access the resource. If empty, only the resource owner and admin can access the resource.
 */

export const CustomPermissions = (roles: Omit<"ADMIN", $Enums.Role>[] = []) => {
  return applyDecorators(
    SetMetadata('custom-permissions', roles),
    UseGuards(UserCustomPermissionsGuard),
  )
}
