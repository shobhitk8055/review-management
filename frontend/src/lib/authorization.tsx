import * as React from 'react';

import { useAuth } from './auth';

export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

type RoleTypes = keyof typeof ROLES;

export const useAuthorization = () => {
  const { user } = useAuth();

  if (!user) {
    throw Error('User does not exist!');
  }

  return { role: user.role };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {

  let canAccess = false;

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
