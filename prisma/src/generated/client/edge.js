
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  detectRuntime,
} = require('./runtime/edge')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.8.1
 * Query Engine version: 78caf6feeaed953168c64e15a249c3e9a033ebe2
 */
Prisma.prismaVersion = {
  client: "5.8.1",
  engine: "78caf6feeaed953168c64e15a249c3e9a033ebe2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  accessToken: 'accessToken',
  expires: 'expires',
  userId: 'userId'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  stripeCustomerId: 'stripeCustomerId',
  lastAccessWorkspaceId: 'lastAccessWorkspaceId'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  id: 'id',
  identifier: 'identifier',
  token: 'token',
  expires: 'expires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TrackingUserAccessOnWorkspaceScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  lastAccessPageId: 'lastAccessPageId',
  userId: 'userId',
  workspaceId: 'workspaceId'
};

exports.Prisma.WorkspaceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  domain: 'domain',
  stripeCustomerId: 'stripeCustomerId',
  stripeWorkspaceId: 'stripeWorkspaceId',
  stripeSubscriptionId: 'stripeSubscriptionId',
  stripePriceId: 'stripePriceId',
  stripeCurrentPeriodEnd: 'stripeCurrentPeriodEnd',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdBy: 'createdBy'
};

exports.Prisma.TeamspaceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isOrigin: 'isOrigin',
  archivedAt: 'archivedAt',
  workspaceId: 'workspaceId',
  createdBy: 'createdBy'
};

exports.Prisma.PageScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  published: 'published',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  workspaceId: 'workspaceId',
  teamspaceId: 'teamspaceId',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  deletedBy: 'deletedBy'
};

exports.Prisma.FavoriteScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId',
  workspaceId: 'workspaceId',
  pageId: 'pageId'
};

exports.Prisma.UserOnWorkspaceScalarFieldEnum = {
  id: 'id',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId',
  workspaceId: 'workspaceId'
};

exports.Prisma.UserOnTeamspaceScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  operation: 'operation',
  userId: 'userId',
  teamspaceId: 'teamspaceId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  Account: 'Account',
  Session: 'Session',
  User: 'User',
  VerificationToken: 'VerificationToken',
  TrackingUserAccessOnWorkspace: 'TrackingUserAccessOnWorkspace',
  Workspace: 'Workspace',
  Teamspace: 'Teamspace',
  Page: 'Page',
  Favorite: 'Favorite',
  UserOnWorkspace: 'UserOnWorkspace',
  UserOnTeamspace: 'UserOnTeamspace'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Volumes/Local/Dev/pj-personal/camille-app/prisma/src/generated/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../../.env"
  },
  "relativePath": "../../..",
  "clientVersion": "5.8.1",
  "engineVersion": "78caf6feeaed953168c64e15a249c3e9a033ebe2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "postinstall": true,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWNsaWVudC1qcyIKICBvdXRwdXQgICA9ICIuL3NyYy9nZW5lcmF0ZWQvY2xpZW50Igp9CgpkYXRhc291cmNlIGRiIHsKICBwcm92aWRlciAgICAgPSAibXlzcWwiCiAgdXJsICAgICAgICAgID0gZW52KCJEQVRBQkFTRV9VUkwiKQogIHJlbGF0aW9uTW9kZSA9ICJwcmlzbWEiCn0KCmdlbmVyYXRvciB6b2QgewogIHByb3ZpZGVyICAgICAgICAgICAgICA9ICJ6b2QtcHJpc21hIgogIG91dHB1dCAgICAgICAgICAgICAgICA9ICIuL3pvZCIgLy8gKGRlZmF1bHQpIHRoZSBkaXJlY3Rvcnkgd2hlcmUgZ2VuZXJhdGVkIHpvZCBzY2hlbWFzIHdpbGwgYmUgc2F2ZWQKICByZWxhdGlvbk1vZGVsICAgICAgICAgPSB0cnVlIC8vIChkZWZhdWx0KSBDcmVhdGUgYW5kIGV4cG9ydCBib3RoIHBsYWluIGFuZCByZWxhdGVkIG1vZGVscy4KICBtb2RlbENhc2UgICAgICAgICAgICAgPSAiY2FtZWxDYXNlIiAvLyAoZGVmYXVsdCkgT3V0cHV0IG1vZGVscyB1c2luZyBwYXNjYWwgY2FzZSAoZXguIFVzZXJNb2RlbCwgUG9zdE1vZGVsKQogIG1vZGVsU3VmZml4ICAgICAgICAgICA9ICJTY2hlbWEiIC8vIChkZWZhdWx0KSBTdWZmaXggdG8gYXBwbHkgdG8geW91ciBwcmlzbWEgbW9kZWxzIHdoZW4gbmFtaW5nIFpvZCBzY2hlbWFzCiAgdXNlRGVjaW1hbEpzICAgICAgICAgID0gdHJ1ZSAvLyByZXByZXNlbnQgdGhlIHByaXNtYSBEZWNpbWFsIHR5cGUgdXNpbmcgRGVjaW1hbC5qcyAoYXMgUHJpc21hIGRvZXMpCiAgaW1wb3J0cyAgICAgICAgICAgICAgID0gbnVsbCAvLyAoZGVmYXVsdCkgd2lsbCBpbXBvcnQgdGhlIHJlZmVyZW5jZWQgZmlsZSBpbiBnZW5lcmF0ZWQgc2NoZW1hcyB0byBiZSB1c2VkIHZpYSBpbXBvcnRzLnNvbWVFeHBvcnRlZFZhcmlhYmxlCiAgcHJpc21hSnNvbk51bGxhYmlsaXR5ID0gdHJ1ZSAvLyAoZGVmYXVsdCkgdXNlcyBwcmlzbWEncyBzY2hlbWUgZm9yIEpTT04gZmllbGQgbnVsbGFiaWxpdHkKfQoKbW9kZWwgQWNjb3VudCB7CiAgaWQgICAgICAgICAgICAgICAgU3RyaW5nICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICB0eXBlICAgICAgICAgICAgICBTdHJpbmcKICBwcm92aWRlciAgICAgICAgICBTdHJpbmcKICBwcm92aWRlckFjY291bnRJZCBTdHJpbmcKICByZWZyZXNoX3Rva2VuICAgICBTdHJpbmc/ICBAZGIuVGV4dAogIGFjY2Vzc190b2tlbiAgICAgIFN0cmluZz8gIEBkYi5UZXh0CiAgZXhwaXJlc19hdCAgICAgICAgSW50PwogIHRva2VuX3R5cGUgICAgICAgIFN0cmluZz8KICBzY29wZSAgICAgICAgICAgICBTdHJpbmc/CiAgaWRfdG9rZW4gICAgICAgICAgU3RyaW5nPyAgQGRiLlRleHQKICBzZXNzaW9uX3N0YXRlICAgICBTdHJpbmc/CiAgY3JlYXRlZEF0ICAgICAgICAgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpIEBtYXAoImNyZWF0ZWRfYXQiKQogIHVwZGF0ZWRBdCAgICAgICAgIERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBtYXAoInVwZGF0ZWRfYXQiKQoKICB1c2VySWQgU3RyaW5nCiAgdXNlciAgIFVzZXIgICBAcmVsYXRpb24oZmllbGRzOiBbdXNlcklkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpCgogIEBAdW5pcXVlKFtwcm92aWRlciwgcHJvdmlkZXJBY2NvdW50SWRdKQogIEBAaW5kZXgoW3VzZXJJZF0pCiAgQEBtYXAoImFjY291bnRzIikKfQoKbW9kZWwgU2Vzc2lvbiB7CiAgaWQgICAgICAgICAgIFN0cmluZyAgIEBpZCBAZGVmYXVsdChjdWlkKCkpCiAgc2Vzc2lvblRva2VuIFN0cmluZyAgIEB1bmlxdWUKICBhY2Nlc3NUb2tlbiAgU3RyaW5nPyAgQGRiLlRleHQKICBleHBpcmVzICAgICAgRGF0ZVRpbWUKCiAgdXNlcklkIFN0cmluZz8KICB1c2VyICAgVXNlcj8gICBAcmVsYXRpb24oZmllbGRzOiBbdXNlcklkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpCgogIEBAaW5kZXgoW3VzZXJJZF0pCiAgQEBtYXAoInNlc3Npb25zIikKfQoKbW9kZWwgVXNlciB7CiAgaWQgICAgICAgICAgICAgICBTdHJpbmcgICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICBuYW1lICAgICAgICAgICAgIFN0cmluZz8KICBlbWFpbCAgICAgICAgICAgIFN0cmluZz8gICBAdW5pcXVlCiAgZW1haWxWZXJpZmllZCAgICBEYXRlVGltZT8KICBpbWFnZSAgICAgICAgICAgIFN0cmluZz8KICBjcmVhdGVkQXQgICAgICAgIERhdGVUaW1lICBAZGVmYXVsdChub3coKSkgQG1hcCgiY3JlYXRlZF9hdCIpCiAgdXBkYXRlZEF0ICAgICAgICBEYXRlVGltZSAgQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQG1hcCgidXBkYXRlZF9hdCIpCiAgc3RyaXBlQ3VzdG9tZXJJZCBTdHJpbmc/ICAgQHVuaXF1ZSBAbWFwKCJzdHJpcGVfY3VzdG9tZXJfaWQiKQoKICBhY2NvdW50cyAgICAgICAgICAgQWNjb3VudFtdCiAgc2Vzc2lvbnMgICAgICAgICAgIFNlc3Npb25bXQogIHVzZXJPbldvcmtzcGFjZSAgICBVc2VyT25Xb3Jrc3BhY2VbXSAgICAgICAgICAgICAgIEByZWxhdGlvbigiVXNlck9uV29ya3NwYWNlIikKICB1c2VyT25UZWFtc3BhY2UgICAgVXNlck9uVGVhbXNwYWNlW10gICAgICAgICAgICAgICBAcmVsYXRpb24oIlVzZXJPblRlYW1zcGFjZSIpCiAgdHJhY2tpbmdVc2VyQWNjZXNzIFRyYWNraW5nVXNlckFjY2Vzc09uV29ya3NwYWNlW10gQHJlbGF0aW9uKCJUcmFja2luZ1VzZXIiKQogIGZhdm9yaXRlcyAgICAgICAgICBGYXZvcml0ZVtdCiAgUGFnZXNDcmVhdGVkICAgICAgIFBhZ2VbXSAgICAgICAgICAgICAgICAgICAgICAgICAgQHJlbGF0aW9uKCJQYWdlQ3JlYXRlZEJ5IikKICBQYWdlc1VwZGF0ZWQgICAgICAgUGFnZVtdICAgICAgICAgICAgICAgICAgICAgICAgICBAcmVsYXRpb24oIlBhZ2VVcGRhdGVkQnkiKQogIFBhZ2VzRGVsZXRlZCAgICAgICBQYWdlW10gICAgICAgICAgICAgICAgICAgICAgICAgIEByZWxhdGlvbigiUGFnZURlbGV0ZWRCeSIpCgogIGxhc3RBY2Nlc3NXb3Jrc3BhY2VJZCBTdHJpbmc/IEBtYXAoImxhc3RfYWNjZXNzX3dvcmtzcGFjZV9pZCIpCgogIEBAaW5kZXgoW2xhc3RBY2Nlc3NXb3Jrc3BhY2VJZF0pCiAgQEBtYXAoInVzZXJzIikKfQoKbW9kZWwgVmVyaWZpY2F0aW9uVG9rZW4gewogIGlkICAgICAgICAgU3RyaW5nICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICBpZGVudGlmaWVyIFN0cmluZwogIHRva2VuICAgICAgU3RyaW5nICAgQHVuaXF1ZQogIGV4cGlyZXMgICAgRGF0ZVRpbWUKICBjcmVhdGVkQXQgIERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQogIHVwZGF0ZWRBdCAgRGF0ZVRpbWUgQHVwZGF0ZWRBdAoKICBAQHVuaXF1ZShbaWRlbnRpZmllciwgdG9rZW5dKQogIEBAbWFwKCJ2ZXJpZmljYXRpb25fdG9rZW5zIikKfQoKbW9kZWwgVHJhY2tpbmdVc2VyQWNjZXNzT25Xb3Jrc3BhY2UgewogIGlkICAgICAgICAgICAgICAgU3RyaW5nICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICBjcmVhdGVkQXQgICAgICAgIERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKSBAbWFwKCJjcmVhdGVkX2F0IikKICBsYXN0QWNjZXNzUGFnZUlkIFN0cmluZz8KCiAgdXNlcklkICAgICAgU3RyaW5nCiAgdXNlciAgICAgICAgVXNlciAgICAgIEByZWxhdGlvbigiVHJhY2tpbmdVc2VyIiwgZmllbGRzOiBbdXNlcklkXSwgcmVmZXJlbmNlczogW2lkXSkKICB3b3Jrc3BhY2VJZCBTdHJpbmcgICAgQHVuaXF1ZQogIHdvcmtzcGFjZSAgIFdvcmtzcGFjZSBAcmVsYXRpb24oZmllbGRzOiBbd29ya3NwYWNlSWRdLCByZWZlcmVuY2VzOiBbaWRdKQoKICBAQGluZGV4KFt1c2VySWRdKQogIEBAaW5kZXgoW3dvcmtzcGFjZUlkXSkKICBAQG1hcCgidHJhY2tpbmdfdXNlcl9hY2Nlc3Nfb25fd29ya3NwYWNlIikKfQoKbW9kZWwgV29ya3NwYWNlIHsKICBpZCBTdHJpbmcgQGlkIEBkZWZhdWx0KGN1aWQoKSkKCiAgLy8vIEB6b2QubWluKDMsICdOYW1lIG11c3QgYmUgMyB0byAzMiBjaGFyYWN0ZXJzJykKICBuYW1lICAgICAgICAgICAgICAgICAgIFN0cmluZyAgICBAZGIuVmFyQ2hhcigzMikgLy8vIEB6b2QubWF4KDMyLCAnTmFtZSBtdXN0IGJlIDMgdG8gMzIgY2hhcmFjdGVycycpCiAgLy8vIEB6b2QubWluKDMsIHsgbWVzc2FnZTogIkRvbWFpbiBtdXN0IGJlIDMgdG8gMzIgY2hhcmFjdGVycyIgfSkucmVnZXgobmV3IFJlZ0V4cCgvXig/IS0rJClbYS16MC05LV0rJC9pKSwgJ0RvbWFpbiBpbnZhbGlkJykKICBkb21haW4gICAgICAgICAgICAgICAgIFN0cmluZyAgICBAdW5pcXVlIEBkYi5WYXJDaGFyKDMyKSAvLy8gQHpvZC5tYXgoMzIsICdEb21haW4gbXVzdCBiZSAzIHRvIDMyIGNoYXJhY3RlcnMnKQogIHN0cmlwZUN1c3RvbWVySWQgICAgICAgU3RyaW5nPyAgIEB1bmlxdWUgQG1hcCgic3RyaXBlX2N1c3RvbWVyX2lkIikKICBzdHJpcGVXb3Jrc3BhY2VJZCAgICAgIFN0cmluZz8gICBAdW5pcXVlIEBtYXAoInN0cmlwZV93b3Jrc3BhY2VfaWQiKQogIHN0cmlwZVN1YnNjcmlwdGlvbklkICAgU3RyaW5nPyAgIEB1bmlxdWUgQG1hcCgic3RyaXBlX3N1YnNjcmlwdGlvbl9pZCIpCiAgc3RyaXBlUHJpY2VJZCAgICAgICAgICBTdHJpbmc/ICAgQG1hcCgic3RyaXBlX3ByaWNlX2lkIikKICBzdHJpcGVDdXJyZW50UGVyaW9kRW5kIERhdGVUaW1lPyBAbWFwKCJzdHJpcGVfY3VycmVudF9wZXJpb2RfZW5kIikKICBjcmVhdGVkQXQgICAgICAgICAgICAgIERhdGVUaW1lICBAZGVmYXVsdChub3coKSkgQG1hcCgiY3JlYXRlZF9hdCIpCiAgdXBkYXRlZEF0ICAgICAgICAgICAgICBEYXRlVGltZSAgQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQG1hcCgidXBkYXRlZF9hdCIpCgogIGNyZWF0ZWRCeSAgICAgICAgICAgICAgICAgICAgIFN0cmluZwogIHRyYWNraW5nVXNlckFjY2Vzc09uV29ya3NwYWNlIFRyYWNraW5nVXNlckFjY2Vzc09uV29ya3NwYWNlPwogIHVzZXJPbldvcmtzcGFjZSAgICAgICAgICAgICAgIFVzZXJPbldvcmtzcGFjZVtdICAgICAgICAgICAgICBAcmVsYXRpb24oIldvcmtzcGFjZU9uVXNlciIpCiAgdGVhbXNwYWNlcyAgICAgICAgICAgICAgICAgICAgVGVhbXNwYWNlW10KICBwYWdlcyAgICAgICAgICAgICAgICAgICAgICAgICBQYWdlW10KICBmYXZvcml0ZXMgICAgICAgICAgICAgICAgICAgICBGYXZvcml0ZVtdCgogIEBAbWFwKCJ3b3Jrc3BhY2VzIikKfQoKbW9kZWwgVGVhbXNwYWNlIHsKICBpZCAgICAgICAgICBTdHJpbmcgICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICBuYW1lICAgICAgICBTdHJpbmcKICBkZXNjcmlwdGlvbiBTdHJpbmc/ICAgQGRlZmF1bHQoIiIpCiAgY3JlYXRlZEF0ICAgRGF0ZVRpbWUgIEBkZWZhdWx0KG5vdygpKSBAbWFwKCJjcmVhdGVkX2F0IikKICB1cGRhdGVkQXQgICBEYXRlVGltZSAgQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQG1hcCgidXBkYXRlZF9hdCIpCiAgaXNPcmlnaW4gICAgQm9vbGVhbj8gIEBkZWZhdWx0KGZhbHNlKQogIGFyY2hpdmVkQXQgIERhdGVUaW1lPyBAbWFwKCJhcmNoaXZlZF9hdCIpCgogIHdvcmtzcGFjZUlkIFN0cmluZz8KICB3b3Jrc3BhY2UgICBXb3Jrc3BhY2U/IEByZWxhdGlvbihmaWVsZHM6IFt3b3Jrc3BhY2VJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCgogIGNyZWF0ZWRCeSAgICAgICBTdHJpbmcKICB1c2VyT25UZWFtc3BhY2UgVXNlck9uVGVhbXNwYWNlW10gQHJlbGF0aW9uKCJUZWFtc3BhY2VPblVzZXIiKQogIHBhZ2VzICAgICAgICAgICBQYWdlW10KCiAgQEBpbmRleChbd29ya3NwYWNlSWRdKQogIEBAbWFwKCJ0ZWFtc3BhY2VzIikKfQoKbW9kZWwgUGFnZSB7CiAgaWQgICAgICAgIFN0cmluZyAgICBAaWQgQGRlZmF1bHQoY3VpZCgpKQogIHRpdGxlICAgICBTdHJpbmcgICAgQGRiLlZhckNoYXIoMTI4KQogIGNvbnRlbnQgICBKc29uPwogIHB1Ymxpc2hlZCBCb29sZWFuICAgQGRlZmF1bHQoZmFsc2UpCiAgY3JlYXRlZEF0IERhdGVUaW1lICBAZGVmYXVsdChub3coKSkgQG1hcCgiY3JlYXRlZF9hdCIpCiAgdXBkYXRlZEF0IERhdGVUaW1lICBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAbWFwKCJ1cGRhdGVkX2F0IikKICBkZWxldGVkQXQgRGF0ZVRpbWU/IEBtYXAoImRlbGV0ZWRfYXQiKQoKICB3b3Jrc3BhY2VJZCBTdHJpbmcKICB3b3Jrc3BhY2UgICBXb3Jrc3BhY2UgIEByZWxhdGlvbihmaWVsZHM6IFt3b3Jrc3BhY2VJZF0sIHJlZmVyZW5jZXM6IFtpZF0sIG9uRGVsZXRlOiBDYXNjYWRlLCBvblVwZGF0ZTogQ2FzY2FkZSkKICB0ZWFtc3BhY2VJZCBTdHJpbmc/CiAgdGVhbXNwYWNlICAgVGVhbXNwYWNlPyBAcmVsYXRpb24oZmllbGRzOiBbdGVhbXNwYWNlSWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSwgb25VcGRhdGU6IENhc2NhZGUpCgogIGNyZWF0ZWRCeSAgICAgU3RyaW5nCiAgY3JlYXRlZEJ5VXNlciBVc2VyICAgICAgIEByZWxhdGlvbigiUGFnZUNyZWF0ZWRCeSIsIGZpZWxkczogW2NyZWF0ZWRCeV0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgdXBkYXRlZEJ5ICAgICBTdHJpbmcKICB1cGRhdGVkQnlVc2VyIFVzZXIgICAgICAgQHJlbGF0aW9uKCJQYWdlVXBkYXRlZEJ5IiwgZmllbGRzOiBbdXBkYXRlZEJ5XSwgcmVmZXJlbmNlczogW2lkXSkKICBkZWxldGVkQnkgICAgIFN0cmluZz8KICBkZWxldGVkQnlVc2VyIFVzZXI/ICAgICAgQHJlbGF0aW9uKCJQYWdlRGVsZXRlZEJ5IiwgZmllbGRzOiBbZGVsZXRlZEJ5XSwgcmVmZXJlbmNlczogW2lkXSkKICBmYXZvcml0ZXMgICAgIEZhdm9yaXRlW10KCiAgQEBpbmRleChbd29ya3NwYWNlSWRdKQogIEBAaW5kZXgoW3RlYW1zcGFjZUlkXSkKICBAQGluZGV4KFtkZWxldGVkQnldKQogIEBAaW5kZXgoW3VwZGF0ZWRCeV0pCiAgQEBpbmRleChbY3JlYXRlZEJ5XSkKICBAQG1hcCgicGFnZXMiKQp9Cgptb2RlbCBGYXZvcml0ZSB7CiAgaWQgICAgICAgIFN0cmluZyAgIEBpZCBAZGVmYXVsdChjdWlkKCkpCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKSBAbWFwKCJjcmVhdGVkX2F0IikKICB1cGRhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpIEB1cGRhdGVkQXQgQG1hcCgidXBkYXRlZF9hdCIpCgogIHVzZXJJZCAgICAgIFN0cmluZwogIHVzZXIgICAgICAgIFVzZXIgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW3VzZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0sIG9uRGVsZXRlOiBDYXNjYWRlKQogIHdvcmtzcGFjZUlkIFN0cmluZwogIHdvcmtzcGFjZSAgIFdvcmtzcGFjZT8gQHJlbGF0aW9uKGZpZWxkczogW3dvcmtzcGFjZUlkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUsIG9uVXBkYXRlOiBDYXNjYWRlKQogIHBhZ2VJZCAgICAgIFN0cmluZwogIHBhZ2UgICAgICAgIFBhZ2U/ICAgICAgQHJlbGF0aW9uKGZpZWxkczogW3BhZ2VJZF0sIHJlZmVyZW5jZXM6IFtpZF0sIG9uRGVsZXRlOiBDYXNjYWRlLCBvblVwZGF0ZTogQ2FzY2FkZSkKCiAgQEBpbmRleChbdXNlcklkXSkKICBAQGluZGV4KFtwYWdlSWRdKQogIEBAaW5kZXgoW3dvcmtzcGFjZUlkXSkKICBAQG1hcCgiZmF2b3JpdGVzIikKfQoKbW9kZWwgVXNlck9uV29ya3NwYWNlIHsKICBpZCAgICAgICAgU3RyaW5nICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICByb2xlICAgICAgSW50ICAgICAgQGRlZmF1bHQoMCkKICBjcmVhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpIEBtYXAoImNyZWF0ZWRfYXQiKQogIHVwZGF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkgQHVwZGF0ZWRBdCBAbWFwKCJ1cGRhdGVkX2F0IikKCiAgdXNlcklkICAgICAgU3RyaW5nCiAgdXNlciAgICAgICAgVXNlciAgICAgIEByZWxhdGlvbigiVXNlck9uV29ya3NwYWNlIiwgZmllbGRzOiBbdXNlcklkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUsIG9uVXBkYXRlOiBDYXNjYWRlKQogIHdvcmtzcGFjZUlkIFN0cmluZwogIHdvcmtzcGFjZSAgIFdvcmtzcGFjZSBAcmVsYXRpb24oIldvcmtzcGFjZU9uVXNlciIsIGZpZWxkczogW3dvcmtzcGFjZUlkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUsIG9uVXBkYXRlOiBDYXNjYWRlKQoKICBAQGluZGV4KFt3b3Jrc3BhY2VJZF0pCiAgQEBpbmRleChbdXNlcklkXSkKICBAQG1hcCgidXNlcl9vbl93b3Jrc3BhY2UiKQp9Cgptb2RlbCBVc2VyT25UZWFtc3BhY2UgewogIGlkICAgICAgICBTdHJpbmcgICBAaWQgQGRlZmF1bHQoY3VpZCgpKQogIGNyZWF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkgQG1hcCgiY3JlYXRlZF9hdCIpCiAgdXBkYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKSBAdXBkYXRlZEF0IEBtYXAoInVwZGF0ZWRfYXQiKQogIG9wZXJhdGlvbiBJbnQgICAgICBAZGVmYXVsdCgwKQoKICB1c2VySWQgICAgICBTdHJpbmcKICB1c2VyICAgICAgICBVc2VyICAgICAgQHJlbGF0aW9uKCJVc2VyT25UZWFtc3BhY2UiLCBmaWVsZHM6IFt1c2VySWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSwgb25VcGRhdGU6IENhc2NhZGUpCiAgdGVhbXNwYWNlSWQgU3RyaW5nCiAgdGVhbXNwYWNlICAgVGVhbXNwYWNlIEByZWxhdGlvbigiVGVhbXNwYWNlT25Vc2VyIiwgZmllbGRzOiBbdGVhbXNwYWNlSWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSwgb25VcGRhdGU6IENhc2NhZGUpCgogIEBAaW5kZXgoW3RlYW1zcGFjZUlkXSkKICBAQGluZGV4KFt1c2VySWRdKQogIEBAbWFwKCJ1c2VyX29uX3RlYW1zcGFjZSIpCn0K",
  "inlineSchemaHash": "dd4ede39ebc7a7d6dfcd87f0cb37800ffe7722c87585ea43200733c5bcddb851",
  "noEngine": false
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Account\":{\"dbName\":\"accounts\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerAccountId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refresh_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"access_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scope\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"id_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"session_state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"AccountToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"provider\",\"providerAccountId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"provider\",\"providerAccountId\"]}],\"isGenerated\":false},\"Session\":{\"dbName\":\"sessions\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sessionToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accessToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"SessionToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"User\":{\"dbName\":\"users\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emailVerified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"stripeCustomerId\",\"dbName\":\"stripe_customer_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accounts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Account\",\"relationName\":\"AccountToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sessions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Session\",\"relationName\":\"SessionToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userOnWorkspace\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserOnWorkspace\",\"relationName\":\"UserOnWorkspace\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userOnTeamspace\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserOnTeamspace\",\"relationName\":\"UserOnTeamspace\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trackingUserAccess\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TrackingUserAccessOnWorkspace\",\"relationName\":\"TrackingUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"favorites\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Favorite\",\"relationName\":\"FavoriteToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"PagesCreated\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Page\",\"relationName\":\"PageCreatedBy\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"PagesUpdated\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Page\",\"relationName\":\"PageUpdatedBy\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"PagesDeleted\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Page\",\"relationName\":\"PageDeletedBy\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastAccessWorkspaceId\",\"dbName\":\"last_access_workspace_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"VerificationToken\":{\"dbName\":\"verification_tokens\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"identifier\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"identifier\",\"token\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"identifier\",\"token\"]}],\"isGenerated\":false},\"TrackingUserAccessOnWorkspace\":{\"dbName\":\"tracking_user_access_on_workspace\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastAccessPageId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"TrackingUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workspaceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workspace\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Workspace\",\"relationName\":\"TrackingUserAccessOnWorkspaceToWorkspace\",\"relationFromFields\":[\"workspaceId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Workspace\":{\"dbName\":\"workspaces\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.min(3, 'Name must be 3 to 32 characters')\\\\n@zod.max(32, 'Name must be 3 to 32 characters')\"},{\"name\":\"domain\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.min(3, { message: \\\"Domain must be 3 to 32 characters\\\" }).regex(new RegExp(/^(?!-+$)[a-z0-9-]+$/i), 'Domain invalid')\\\\n@zod.max(32, 'Domain must be 3 to 32 characters')\"},{\"name\":\"stripeCustomerId\",\"dbName\":\"stripe_customer_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stripeWorkspaceId\",\"dbName\":\"stripe_workspace_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stripeSubscriptionId\",\"dbName\":\"stripe_subscription_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stripePriceId\",\"dbName\":\"stripe_price_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stripeCurrentPeriodEnd\",\"dbName\":\"stripe_current_period_end\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"createdBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trackingUserAccessOnWorkspace\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TrackingUserAccessOnWorkspace\",\"relationName\":\"TrackingUserAccessOnWorkspaceToWorkspace\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userOnWorkspace\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserOnWorkspace\",\"relationName\":\"WorkspaceOnUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teamspaces\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Teamspace\",\"relationName\":\"TeamspaceToWorkspace\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Page\",\"relationName\":\"PageToWorkspace\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"favorites\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Favorite\",\"relationName\":\"FavoriteToWorkspace\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Teamspace\":{\"dbName\":\"teamspaces\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"isOrigin\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"archivedAt\",\"dbName\":\"archived_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workspaceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workspace\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Workspace\",\"relationName\":\"TeamspaceToWorkspace\",\"relationFromFields\":[\"workspaceId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userOnTeamspace\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserOnTeamspace\",\"relationName\":\"TeamspaceOnUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Page\",\"relationName\":\"PageToTeamspace\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Page\":{\"dbName\":\"pages\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"published\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"deletedAt\",\"dbName\":\"deleted_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workspaceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workspace\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Workspace\",\"relationName\":\"PageToWorkspace\",\"relationFromFields\":[\"workspaceId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teamspaceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teamspace\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Teamspace\",\"relationName\":\"PageToTeamspace\",\"relationFromFields\":[\"teamspaceId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdByUser\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"PageCreatedBy\",\"relationFromFields\":[\"createdBy\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedByUser\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"PageUpdatedBy\",\"relationFromFields\":[\"updatedBy\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deletedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deletedByUser\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"PageDeletedBy\",\"relationFromFields\":[\"deletedBy\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"favorites\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Favorite\",\"relationName\":\"FavoriteToPage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Favorite\":{\"dbName\":\"favorites\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"FavoriteToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workspaceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workspace\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Workspace\",\"relationName\":\"FavoriteToWorkspace\",\"relationFromFields\":[\"workspaceId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pageId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"page\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Page\",\"relationName\":\"FavoriteToPage\",\"relationFromFields\":[\"pageId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UserOnWorkspace\":{\"dbName\":\"user_on_workspace\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserOnWorkspace\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workspaceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workspace\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Workspace\",\"relationName\":\"WorkspaceOnUser\",\"relationFromFields\":[\"workspaceId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UserOnTeamspace\":{\"dbName\":\"user_on_teamspace\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"operation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserOnTeamspace\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teamspaceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"teamspace\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Teamspace\",\"relationName\":\"TeamspaceOnUser\",\"relationFromFields\":[\"teamspaceId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.getQueryEngineWasmModule = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

