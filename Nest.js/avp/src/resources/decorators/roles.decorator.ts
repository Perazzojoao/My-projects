import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { $Enums } from '@prisma/client';
import { RolesGuard } from '../guards/roles.guard';

export const Roles = (roles: $Enums.Role[]) => {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
};
