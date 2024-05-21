
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.16.2
 * Query Engine version: e9771e62de70f79a5e1c604a2d7c8e2a0a874b48
 */
Prisma.prismaVersion = {
  client: "4.16.2",
  engine: "e9771e62de70f79a5e1c604a2d7c8e2a0a874b48"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}

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
  lastAccessNotebookId: 'lastAccessNotebookId',
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

exports.Prisma.NotebookScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  published: 'published',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  workspaceId: 'workspaceId',
  teamspaceId: 'teamspaceId',
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
  notebookId: 'notebookId',
  createdBy: 'createdBy',
  deletedBy: 'deletedBy',
  updatedBy: 'updatedBy'
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
  Notebook: 'Notebook',
  Page: 'Page',
  Favorite: 'Favorite',
  UserOnWorkspace: 'UserOnWorkspace',
  UserOnTeamspace: 'UserOnTeamspace'
};

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
