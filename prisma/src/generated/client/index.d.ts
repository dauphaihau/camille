
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type AccountPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Account"
  objects: {
    user: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
  }, ExtArgs["result"]["account"]>
  composites: {}
}

/**
 * Model Account
 * 
 */
export type Account = runtime.Types.DefaultSelection<AccountPayload>
export type SessionPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Session"
  objects: {
    user: UserPayload<ExtArgs> | null
  }
  scalars: $Extensions.GetResult<{
    id: string
    sessionToken: string
    accessToken: string | null
    expires: Date
    userId: string | null
  }, ExtArgs["result"]["session"]>
  composites: {}
}

/**
 * Model Session
 * 
 */
export type Session = runtime.Types.DefaultSelection<SessionPayload>
export type UserPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "User"
  objects: {
    accounts: AccountPayload<ExtArgs>[]
    sessions: SessionPayload<ExtArgs>[]
    userOnWorkspace: UserOnWorkspacePayload<ExtArgs>[]
    userOnTeamspace: UserOnTeamspacePayload<ExtArgs>[]
    trackingUserAccess: TrackingUserAccessOnWorkspacePayload<ExtArgs>[]
    favorites: FavoritePayload<ExtArgs>[]
    PagesCreated: PagePayload<ExtArgs>[]
    PagesUpdated: PagePayload<ExtArgs>[]
    PagesDeleted: PagePayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    stripeCustomerId: string | null
    lastAccessWorkspaceId: string | null
  }, ExtArgs["result"]["user"]>
  composites: {}
}

/**
 * Model User
 * 
 */
export type User = runtime.Types.DefaultSelection<UserPayload>
export type VerificationTokenPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "VerificationToken"
  objects: {}
  scalars: $Extensions.GetResult<{
    id: string
    identifier: string
    token: string
    expires: Date
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["verificationToken"]>
  composites: {}
}

/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = runtime.Types.DefaultSelection<VerificationTokenPayload>
export type TrackingUserAccessOnWorkspacePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "TrackingUserAccessOnWorkspace"
  objects: {
    user: UserPayload<ExtArgs>
    workspace: WorkspacePayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    createdAt: Date
    lastAccessPageId: string | null
    userId: string
    workspaceId: string
  }, ExtArgs["result"]["trackingUserAccessOnWorkspace"]>
  composites: {}
}

/**
 * Model TrackingUserAccessOnWorkspace
 * 
 */
export type TrackingUserAccessOnWorkspace = runtime.Types.DefaultSelection<TrackingUserAccessOnWorkspacePayload>
export type WorkspacePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Workspace"
  objects: {
    trackingUserAccessOnWorkspace: TrackingUserAccessOnWorkspacePayload<ExtArgs> | null
    userOnWorkspace: UserOnWorkspacePayload<ExtArgs>[]
    teamspaces: TeamspacePayload<ExtArgs>[]
    pages: PagePayload<ExtArgs>[]
    favorites: FavoritePayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    /**
     * @zod.min(3, 'Name must be 3 to 32 characters')
     * @zod.max(32, 'Name must be 3 to 32 characters')
     */
    name: string
    /**
     * @zod.min(3, { message: "Domain must be 3 to 32 characters" }).regex(new RegExp(/^(?!-+$)[a-z0-9-]+$/i), 'Domain invalid')
     * @zod.max(32, 'Domain must be 3 to 32 characters')
     */
    domain: string
    stripeCustomerId: string | null
    stripeWorkspaceId: string | null
    stripeSubscriptionId: string | null
    stripePriceId: string | null
    stripeCurrentPeriodEnd: Date | null
    createdAt: Date
    updatedAt: Date
    createdBy: string
  }, ExtArgs["result"]["workspace"]>
  composites: {}
}

/**
 * Model Workspace
 * 
 */
export type Workspace = runtime.Types.DefaultSelection<WorkspacePayload>
export type TeamspacePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Teamspace"
  objects: {
    workspace: WorkspacePayload<ExtArgs> | null
    userOnTeamspace: UserOnTeamspacePayload<ExtArgs>[]
    pages: PagePayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    isOrigin: boolean | null
    archivedAt: Date | null
    workspaceId: string | null
    createdBy: string
  }, ExtArgs["result"]["teamspace"]>
  composites: {}
}

/**
 * Model Teamspace
 * 
 */
export type Teamspace = runtime.Types.DefaultSelection<TeamspacePayload>
export type PagePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Page"
  objects: {
    workspace: WorkspacePayload<ExtArgs>
    teamspace: TeamspacePayload<ExtArgs> | null
    createdByUser: UserPayload<ExtArgs>
    updatedByUser: UserPayload<ExtArgs>
    deletedByUser: UserPayload<ExtArgs> | null
    favorites: FavoritePayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    title: string
    content: Prisma.JsonValue | null
    published: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    workspaceId: string
    teamspaceId: string | null
    createdBy: string
    updatedBy: string
    deletedBy: string | null
  }, ExtArgs["result"]["page"]>
  composites: {}
}

/**
 * Model Page
 * 
 */
export type Page = runtime.Types.DefaultSelection<PagePayload>
export type FavoritePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Favorite"
  objects: {
    user: UserPayload<ExtArgs>
    workspace: WorkspacePayload<ExtArgs> | null
    page: PagePayload<ExtArgs> | null
  }
  scalars: $Extensions.GetResult<{
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    workspaceId: string
    pageId: string
  }, ExtArgs["result"]["favorite"]>
  composites: {}
}

/**
 * Model Favorite
 * 
 */
export type Favorite = runtime.Types.DefaultSelection<FavoritePayload>
export type UserOnWorkspacePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "UserOnWorkspace"
  objects: {
    user: UserPayload<ExtArgs>
    workspace: WorkspacePayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    role: number
    createdAt: Date
    updatedAt: Date
    userId: string
    workspaceId: string
  }, ExtArgs["result"]["userOnWorkspace"]>
  composites: {}
}

/**
 * Model UserOnWorkspace
 * 
 */
export type UserOnWorkspace = runtime.Types.DefaultSelection<UserOnWorkspacePayload>
export type UserOnTeamspacePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "UserOnTeamspace"
  objects: {
    user: UserPayload<ExtArgs>
    teamspace: TeamspacePayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    createdAt: Date
    updatedAt: Date
    operation: number
    userId: string
    teamspaceId: string
  }, ExtArgs["result"]["userOnTeamspace"]>
  composites: {}
}

/**
 * Model UserOnTeamspace
 * 
 */
export type UserOnTeamspace = runtime.Types.DefaultSelection<UserOnTeamspacePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.trackingUserAccessOnWorkspace`: Exposes CRUD operations for the **TrackingUserAccessOnWorkspace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrackingUserAccessOnWorkspaces
    * const trackingUserAccessOnWorkspaces = await prisma.trackingUserAccessOnWorkspace.findMany()
    * ```
    */
  get trackingUserAccessOnWorkspace(): Prisma.TrackingUserAccessOnWorkspaceDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.workspace`: Exposes CRUD operations for the **Workspace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workspaces
    * const workspaces = await prisma.workspace.findMany()
    * ```
    */
  get workspace(): Prisma.WorkspaceDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.teamspace`: Exposes CRUD operations for the **Teamspace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teamspaces
    * const teamspaces = await prisma.teamspace.findMany()
    * ```
    */
  get teamspace(): Prisma.TeamspaceDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.page`: Exposes CRUD operations for the **Page** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pages
    * const pages = await prisma.page.findMany()
    * ```
    */
  get page(): Prisma.PageDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.favorite`: Exposes CRUD operations for the **Favorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Favorites
    * const favorites = await prisma.favorite.findMany()
    * ```
    */
  get favorite(): Prisma.FavoriteDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.userOnWorkspace`: Exposes CRUD operations for the **UserOnWorkspace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserOnWorkspaces
    * const userOnWorkspaces = await prisma.userOnWorkspace.findMany()
    * ```
    */
  get userOnWorkspace(): Prisma.UserOnWorkspaceDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.userOnTeamspace`: Exposes CRUD operations for the **UserOnTeamspace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserOnTeamspaces
    * const userOnTeamspaces = await prisma.userOnTeamspace.findMany()
    * ```
    */
  get userOnTeamspace(): Prisma.UserOnTeamspaceDelegate<GlobalReject, ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 4.16.2
   * Query Engine version: 4bc8b6e1b66cb932731fb1bdbbc550d1e010de81
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'account' | 'session' | 'user' | 'verificationToken' | 'trackingUserAccessOnWorkspace' | 'workspace' | 'teamspace' | 'page' | 'favorite' | 'userOnWorkspace' | 'userOnTeamspace'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Account: {
        payload: AccountPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>,
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>,
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: SessionPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>,
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: UserPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: VerificationTokenPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>,
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>,
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      TrackingUserAccessOnWorkspace: {
        payload: TrackingUserAccessOnWorkspacePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.TrackingUserAccessOnWorkspaceFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TrackingUserAccessOnWorkspacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrackingUserAccessOnWorkspaceFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TrackingUserAccessOnWorkspacePayload>
          }
          findFirst: {
            args: Prisma.TrackingUserAccessOnWorkspaceFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TrackingUserAccessOnWorkspacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrackingUserAccessOnWorkspaceFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TrackingUserAccessOnWorkspacePayload>
          }
          findMany: {
            args: Prisma.TrackingUserAccessOnWorkspaceFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TrackingUserAccessOnWorkspacePayload>[]
          }
          create: {
            args: Prisma.TrackingUserAccessOnWorkspaceCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TrackingUserAccessOnWorkspacePayload>
          }
          createMany: {
            args: Prisma.TrackingUserAccessOnWorkspaceCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.TrackingUserAccessOnWorkspaceDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TrackingUserAccessOnWorkspacePayload>
          }
          update: {
            args: Prisma.TrackingUserAccessOnWorkspaceUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TrackingUserAccessOnWorkspacePayload>
          }
          deleteMany: {
            args: Prisma.TrackingUserAccessOnWorkspaceDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TrackingUserAccessOnWorkspaceUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TrackingUserAccessOnWorkspaceUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TrackingUserAccessOnWorkspacePayload>
          }
          aggregate: {
            args: Prisma.TrackingUserAccessOnWorkspaceAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTrackingUserAccessOnWorkspace>
          }
          groupBy: {
            args: Prisma.TrackingUserAccessOnWorkspaceGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TrackingUserAccessOnWorkspaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrackingUserAccessOnWorkspaceCountArgs<ExtArgs>,
            result: $Utils.Optional<TrackingUserAccessOnWorkspaceCountAggregateOutputType> | number
          }
        }
      }
      Workspace: {
        payload: WorkspacePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.WorkspaceFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<WorkspacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkspaceFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<WorkspacePayload>
          }
          findFirst: {
            args: Prisma.WorkspaceFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<WorkspacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkspaceFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<WorkspacePayload>
          }
          findMany: {
            args: Prisma.WorkspaceFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<WorkspacePayload>[]
          }
          create: {
            args: Prisma.WorkspaceCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<WorkspacePayload>
          }
          createMany: {
            args: Prisma.WorkspaceCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.WorkspaceDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<WorkspacePayload>
          }
          update: {
            args: Prisma.WorkspaceUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<WorkspacePayload>
          }
          deleteMany: {
            args: Prisma.WorkspaceDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.WorkspaceUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.WorkspaceUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<WorkspacePayload>
          }
          aggregate: {
            args: Prisma.WorkspaceAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateWorkspace>
          }
          groupBy: {
            args: Prisma.WorkspaceGroupByArgs<ExtArgs>,
            result: $Utils.Optional<WorkspaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkspaceCountArgs<ExtArgs>,
            result: $Utils.Optional<WorkspaceCountAggregateOutputType> | number
          }
        }
      }
      Teamspace: {
        payload: TeamspacePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.TeamspaceFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TeamspacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamspaceFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TeamspacePayload>
          }
          findFirst: {
            args: Prisma.TeamspaceFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TeamspacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamspaceFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TeamspacePayload>
          }
          findMany: {
            args: Prisma.TeamspaceFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TeamspacePayload>[]
          }
          create: {
            args: Prisma.TeamspaceCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TeamspacePayload>
          }
          createMany: {
            args: Prisma.TeamspaceCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.TeamspaceDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TeamspacePayload>
          }
          update: {
            args: Prisma.TeamspaceUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TeamspacePayload>
          }
          deleteMany: {
            args: Prisma.TeamspaceDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TeamspaceUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TeamspaceUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TeamspacePayload>
          }
          aggregate: {
            args: Prisma.TeamspaceAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTeamspace>
          }
          groupBy: {
            args: Prisma.TeamspaceGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TeamspaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamspaceCountArgs<ExtArgs>,
            result: $Utils.Optional<TeamspaceCountAggregateOutputType> | number
          }
        }
      }
      Page: {
        payload: PagePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.PageFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PageFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PagePayload>
          }
          findFirst: {
            args: Prisma.PageFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PageFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PagePayload>
          }
          findMany: {
            args: Prisma.PageFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PagePayload>[]
          }
          create: {
            args: Prisma.PageCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PagePayload>
          }
          createMany: {
            args: Prisma.PageCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.PageDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PagePayload>
          }
          update: {
            args: Prisma.PageUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PagePayload>
          }
          deleteMany: {
            args: Prisma.PageDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.PageUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.PageUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PagePayload>
          }
          aggregate: {
            args: Prisma.PageAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregatePage>
          }
          groupBy: {
            args: Prisma.PageGroupByArgs<ExtArgs>,
            result: $Utils.Optional<PageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PageCountArgs<ExtArgs>,
            result: $Utils.Optional<PageCountAggregateOutputType> | number
          }
        }
      }
      Favorite: {
        payload: FavoritePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.FavoriteFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<FavoritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavoriteFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<FavoritePayload>
          }
          findFirst: {
            args: Prisma.FavoriteFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<FavoritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavoriteFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<FavoritePayload>
          }
          findMany: {
            args: Prisma.FavoriteFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<FavoritePayload>[]
          }
          create: {
            args: Prisma.FavoriteCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<FavoritePayload>
          }
          createMany: {
            args: Prisma.FavoriteCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.FavoriteDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<FavoritePayload>
          }
          update: {
            args: Prisma.FavoriteUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<FavoritePayload>
          }
          deleteMany: {
            args: Prisma.FavoriteDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.FavoriteUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.FavoriteUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<FavoritePayload>
          }
          aggregate: {
            args: Prisma.FavoriteAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateFavorite>
          }
          groupBy: {
            args: Prisma.FavoriteGroupByArgs<ExtArgs>,
            result: $Utils.Optional<FavoriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavoriteCountArgs<ExtArgs>,
            result: $Utils.Optional<FavoriteCountAggregateOutputType> | number
          }
        }
      }
      UserOnWorkspace: {
        payload: UserOnWorkspacePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.UserOnWorkspaceFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnWorkspacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserOnWorkspaceFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnWorkspacePayload>
          }
          findFirst: {
            args: Prisma.UserOnWorkspaceFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnWorkspacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserOnWorkspaceFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnWorkspacePayload>
          }
          findMany: {
            args: Prisma.UserOnWorkspaceFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnWorkspacePayload>[]
          }
          create: {
            args: Prisma.UserOnWorkspaceCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnWorkspacePayload>
          }
          createMany: {
            args: Prisma.UserOnWorkspaceCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserOnWorkspaceDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnWorkspacePayload>
          }
          update: {
            args: Prisma.UserOnWorkspaceUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnWorkspacePayload>
          }
          deleteMany: {
            args: Prisma.UserOnWorkspaceDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserOnWorkspaceUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserOnWorkspaceUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnWorkspacePayload>
          }
          aggregate: {
            args: Prisma.UserOnWorkspaceAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserOnWorkspace>
          }
          groupBy: {
            args: Prisma.UserOnWorkspaceGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserOnWorkspaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserOnWorkspaceCountArgs<ExtArgs>,
            result: $Utils.Optional<UserOnWorkspaceCountAggregateOutputType> | number
          }
        }
      }
      UserOnTeamspace: {
        payload: UserOnTeamspacePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.UserOnTeamspaceFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnTeamspacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserOnTeamspaceFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnTeamspacePayload>
          }
          findFirst: {
            args: Prisma.UserOnTeamspaceFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnTeamspacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserOnTeamspaceFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnTeamspacePayload>
          }
          findMany: {
            args: Prisma.UserOnTeamspaceFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnTeamspacePayload>[]
          }
          create: {
            args: Prisma.UserOnTeamspaceCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnTeamspacePayload>
          }
          createMany: {
            args: Prisma.UserOnTeamspaceCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserOnTeamspaceDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnTeamspacePayload>
          }
          update: {
            args: Prisma.UserOnTeamspaceUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnTeamspacePayload>
          }
          deleteMany: {
            args: Prisma.UserOnTeamspaceDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserOnTeamspaceUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserOnTeamspaceUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnTeamspacePayload>
          }
          aggregate: {
            args: Prisma.UserOnTeamspaceAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserOnTeamspace>
          }
          groupBy: {
            args: Prisma.UserOnTeamspaceGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserOnTeamspaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserOnTeamspaceCountArgs<ExtArgs>,
            result: $Utils.Optional<UserOnTeamspaceCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    accounts: number
    sessions: number
    userOnWorkspace: number
    userOnTeamspace: number
    trackingUserAccess: number
    favorites: number
    PagesCreated: number
    PagesUpdated: number
    PagesDeleted: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    userOnWorkspace?: boolean | UserCountOutputTypeCountUserOnWorkspaceArgs
    userOnTeamspace?: boolean | UserCountOutputTypeCountUserOnTeamspaceArgs
    trackingUserAccess?: boolean | UserCountOutputTypeCountTrackingUserAccessArgs
    favorites?: boolean | UserCountOutputTypeCountFavoritesArgs
    PagesCreated?: boolean | UserCountOutputTypeCountPagesCreatedArgs
    PagesUpdated?: boolean | UserCountOutputTypeCountPagesUpdatedArgs
    PagesDeleted?: boolean | UserCountOutputTypeCountPagesDeletedArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserOnWorkspaceArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserOnWorkspaceWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserOnTeamspaceArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserOnTeamspaceWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTrackingUserAccessArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: TrackingUserAccessOnWorkspaceWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPagesCreatedArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPagesUpdatedArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPagesDeletedArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }



  /**
   * Count Type WorkspaceCountOutputType
   */


  export type WorkspaceCountOutputType = {
    userOnWorkspace: number
    teamspaces: number
    pages: number
    favorites: number
  }

  export type WorkspaceCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    userOnWorkspace?: boolean | WorkspaceCountOutputTypeCountUserOnWorkspaceArgs
    teamspaces?: boolean | WorkspaceCountOutputTypeCountTeamspacesArgs
    pages?: boolean | WorkspaceCountOutputTypeCountPagesArgs
    favorites?: boolean | WorkspaceCountOutputTypeCountFavoritesArgs
  }

  // Custom InputTypes

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceCountOutputType
     */
    select?: WorkspaceCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountUserOnWorkspaceArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserOnWorkspaceWhereInput
  }


  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountTeamspacesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: TeamspaceWhereInput
  }


  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountPagesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }


  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }



  /**
   * Count Type TeamspaceCountOutputType
   */


  export type TeamspaceCountOutputType = {
    userOnTeamspace: number
    pages: number
  }

  export type TeamspaceCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    userOnTeamspace?: boolean | TeamspaceCountOutputTypeCountUserOnTeamspaceArgs
    pages?: boolean | TeamspaceCountOutputTypeCountPagesArgs
  }

  // Custom InputTypes

  /**
   * TeamspaceCountOutputType without action
   */
  export type TeamspaceCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamspaceCountOutputType
     */
    select?: TeamspaceCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * TeamspaceCountOutputType without action
   */
  export type TeamspaceCountOutputTypeCountUserOnTeamspaceArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserOnTeamspaceWhereInput
  }


  /**
   * TeamspaceCountOutputType without action
   */
  export type TeamspaceCountOutputTypeCountPagesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }



  /**
   * Count Type PageCountOutputType
   */


  export type PageCountOutputType = {
    favorites: number
  }

  export type PageCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    favorites?: boolean | PageCountOutputTypeCountFavoritesArgs
  }

  // Custom InputTypes

  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PageCountOutputType
     */
    select?: PageCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Account
   */


  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: Enumerable<AccountOrderByWithAggregationInput>
    by: AccountScalarFieldEnum[]
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }


  export type AccountGroupByOutputType = {
    id: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type AccountInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
  }


  type AccountGetPayload<S extends boolean | null | undefined | AccountArgs> = $Types.GetResult<AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<AccountFindManyArgs, 'select' | 'include'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AccountFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Account'> extends True ? Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Account that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AccountFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Account'> extends True ? Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Account that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AccountFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
    **/
    create<T extends AccountCreateArgs<ExtArgs>>(
      args: SelectSubset<T, AccountCreateArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Accounts.
     *     @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     *     @example
     *     // Create many Accounts
     *     const account = await prisma.account.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AccountCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
    **/
    delete<T extends AccountDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AccountUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AccountDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AccountUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
    **/
    upsert<T extends AccountUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Account base type for findUnique actions
   */
  export type AccountFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUnique
   */
  export interface AccountFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends AccountFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }


  /**
   * Account base type for findFirst actions
   */
  export type AccountFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: Enumerable<AccountScalarFieldEnum>
  }

  /**
   * Account findFirst
   */
  export interface AccountFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends AccountFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }


  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: Enumerable<AccountCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }


  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
  }


  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }


  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }


  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
  }


  /**
   * Account without action
   */
  export type AccountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
  }



  /**
   * Model Session
   */


  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    accessToken: string | null
    expires: Date | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    accessToken: string | null
    expires: Date | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    accessToken: number
    expires: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    accessToken?: true
    expires?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    accessToken?: true
    expires?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    accessToken?: true
    expires?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: Enumerable<SessionOrderByWithAggregationInput>
    by: SessionScalarFieldEnum[]
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }


  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    accessToken: string | null
    expires: Date
    userId: string | null
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    accessToken?: boolean
    expires?: boolean
    userId?: boolean
    user?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    accessToken?: boolean
    expires?: boolean
    userId?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
  }


  type SessionGetPayload<S extends boolean | null | undefined | SessionArgs> = $Types.GetResult<SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SessionFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Session'> extends True ? Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SessionFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Session'> extends True ? Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SessionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
    **/
    create<T extends SessionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SessionCreateArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Sessions.
     *     @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     *     @example
     *     // Create many Sessions
     *     const session = await prisma.session.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SessionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
    **/
    delete<T extends SessionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SessionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SessionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SessionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
    **/
    upsert<T extends SessionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Session base type for findUnique actions
   */
  export type SessionFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUnique
   */
  export interface SessionFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends SessionFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }


  /**
   * Session base type for findFirst actions
   */
  export type SessionFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: Enumerable<SessionScalarFieldEnum>
  }

  /**
   * Session findFirst
   */
  export interface SessionFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends SessionFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }


  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: Enumerable<SessionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }


  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }


  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }


  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }


  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }


  /**
   * Session without action
   */
  export type SessionArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    stripeCustomerId: string | null
    lastAccessWorkspaceId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    stripeCustomerId: string | null
    lastAccessWorkspaceId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    stripeCustomerId: number
    lastAccessWorkspaceId: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    stripeCustomerId?: true
    lastAccessWorkspaceId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    stripeCustomerId?: true
    lastAccessWorkspaceId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    stripeCustomerId?: true
    lastAccessWorkspaceId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    stripeCustomerId: string | null
    lastAccessWorkspaceId: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stripeCustomerId?: boolean
    lastAccessWorkspaceId?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    userOnWorkspace?: boolean | User$userOnWorkspaceArgs<ExtArgs>
    userOnTeamspace?: boolean | User$userOnTeamspaceArgs<ExtArgs>
    trackingUserAccess?: boolean | User$trackingUserAccessArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    PagesCreated?: boolean | User$PagesCreatedArgs<ExtArgs>
    PagesUpdated?: boolean | User$PagesUpdatedArgs<ExtArgs>
    PagesDeleted?: boolean | User$PagesDeletedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stripeCustomerId?: boolean
    lastAccessWorkspaceId?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    userOnWorkspace?: boolean | User$userOnWorkspaceArgs<ExtArgs>
    userOnTeamspace?: boolean | User$userOnTeamspaceArgs<ExtArgs>
    trackingUserAccess?: boolean | User$trackingUserAccessArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    PagesCreated?: boolean | User$PagesCreatedArgs<ExtArgs>
    PagesUpdated?: boolean | User$PagesUpdatedArgs<ExtArgs>
    PagesDeleted?: boolean | User$PagesDeletedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }


  type UserGetPayload<S extends boolean | null | undefined | UserArgs> = $Types.GetResult<UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UserPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findMany', never>| Null>;

    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findMany', never>| Null>;

    userOnWorkspace<T extends User$userOnWorkspaceArgs<ExtArgs> = {}>(args?: Subset<T, User$userOnWorkspaceArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<UserOnWorkspacePayload<ExtArgs>, T, 'findMany', never>| Null>;

    userOnTeamspace<T extends User$userOnTeamspaceArgs<ExtArgs> = {}>(args?: Subset<T, User$userOnTeamspaceArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<UserOnTeamspacePayload<ExtArgs>, T, 'findMany', never>| Null>;

    trackingUserAccess<T extends User$trackingUserAccessArgs<ExtArgs> = {}>(args?: Subset<T, User$trackingUserAccessArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<TrackingUserAccessOnWorkspacePayload<ExtArgs>, T, 'findMany', never>| Null>;

    favorites<T extends User$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, User$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'findMany', never>| Null>;

    PagesCreated<T extends User$PagesCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$PagesCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<PagePayload<ExtArgs>, T, 'findMany', never>| Null>;

    PagesUpdated<T extends User$PagesUpdatedArgs<ExtArgs> = {}>(args?: Subset<T, User$PagesUpdatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<PagePayload<ExtArgs>, T, 'findMany', never>| Null>;

    PagesDeleted<T extends User$PagesDeletedArgs<ExtArgs> = {}>(args?: Subset<T, User$PagesDeletedArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<PagePayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * User.userOnWorkspace
   */
  export type User$userOnWorkspaceArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnWorkspace
     */
    select?: UserOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnWorkspaceInclude<ExtArgs> | null
    where?: UserOnWorkspaceWhereInput
    orderBy?: Enumerable<UserOnWorkspaceOrderByWithRelationInput>
    cursor?: UserOnWorkspaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<UserOnWorkspaceScalarFieldEnum>
  }


  /**
   * User.userOnTeamspace
   */
  export type User$userOnTeamspaceArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnTeamspace
     */
    select?: UserOnTeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnTeamspaceInclude<ExtArgs> | null
    where?: UserOnTeamspaceWhereInput
    orderBy?: Enumerable<UserOnTeamspaceOrderByWithRelationInput>
    cursor?: UserOnTeamspaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<UserOnTeamspaceScalarFieldEnum>
  }


  /**
   * User.trackingUserAccess
   */
  export type User$trackingUserAccessArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingUserAccessOnWorkspace
     */
    select?: TrackingUserAccessOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TrackingUserAccessOnWorkspaceInclude<ExtArgs> | null
    where?: TrackingUserAccessOnWorkspaceWhereInput
    orderBy?: Enumerable<TrackingUserAccessOnWorkspaceOrderByWithRelationInput>
    cursor?: TrackingUserAccessOnWorkspaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TrackingUserAccessOnWorkspaceScalarFieldEnum>
  }


  /**
   * User.favorites
   */
  export type User$favoritesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: Enumerable<FavoriteOrderByWithRelationInput>
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<FavoriteScalarFieldEnum>
  }


  /**
   * User.PagesCreated
   */
  export type User$PagesCreatedArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PageScalarFieldEnum>
  }


  /**
   * User.PagesUpdated
   */
  export type User$PagesUpdatedArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PageScalarFieldEnum>
  }


  /**
   * User.PagesDeleted
   */
  export type User$PagesDeletedArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PageScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model VerificationToken
   */


  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    token: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    token: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    id: number
    identifier: number
    token: number
    expires: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    id?: true
    identifier?: true
    token?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    id?: true
    identifier?: true
    token?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    id?: true
    identifier?: true
    token?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: Enumerable<VerificationTokenOrderByWithAggregationInput>
    by: VerificationTokenScalarFieldEnum[]
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }


  export type VerificationTokenGroupByOutputType = {
    id: string
    identifier: string
    token: string
    expires: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    id?: boolean
    identifier?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenArgs> = $Types.GetResult<VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<VerificationTokenFindManyArgs, 'select' | 'include'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends VerificationTokenFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'VerificationToken'> extends True ? Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one VerificationToken that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends VerificationTokenFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'VerificationToken'> extends True ? Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationTokenWithIdOnly = await prisma.verificationToken.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends VerificationTokenFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
    **/
    create<T extends VerificationTokenCreateArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many VerificationTokens.
     *     @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     *     @example
     *     // Create many VerificationTokens
     *     const verificationToken = await prisma.verificationToken.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends VerificationTokenCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
    **/
    delete<T extends VerificationTokenDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends VerificationTokenUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends VerificationTokenDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends VerificationTokenUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
    **/
    upsert<T extends VerificationTokenUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * VerificationToken base type for findUnique actions
   */
  export type VerificationTokenFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUnique
   */
  export interface VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends VerificationTokenFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken base type for findFirst actions
   */
  export type VerificationTokenFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }

  /**
   * VerificationToken findFirst
   */
  export interface VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends VerificationTokenFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }


  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }


  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }


  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: Enumerable<VerificationTokenCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }


  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken without action
   */
  export type VerificationTokenArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
  }



  /**
   * Model TrackingUserAccessOnWorkspace
   */


  export type AggregateTrackingUserAccessOnWorkspace = {
    _count: TrackingUserAccessOnWorkspaceCountAggregateOutputType | null
    _min: TrackingUserAccessOnWorkspaceMinAggregateOutputType | null
    _max: TrackingUserAccessOnWorkspaceMaxAggregateOutputType | null
  }

  export type TrackingUserAccessOnWorkspaceMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    lastAccessPageId: string | null
    userId: string | null
    workspaceId: string | null
  }

  export type TrackingUserAccessOnWorkspaceMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    lastAccessPageId: string | null
    userId: string | null
    workspaceId: string | null
  }

  export type TrackingUserAccessOnWorkspaceCountAggregateOutputType = {
    id: number
    createdAt: number
    lastAccessPageId: number
    userId: number
    workspaceId: number
    _all: number
  }


  export type TrackingUserAccessOnWorkspaceMinAggregateInputType = {
    id?: true
    createdAt?: true
    lastAccessPageId?: true
    userId?: true
    workspaceId?: true
  }

  export type TrackingUserAccessOnWorkspaceMaxAggregateInputType = {
    id?: true
    createdAt?: true
    lastAccessPageId?: true
    userId?: true
    workspaceId?: true
  }

  export type TrackingUserAccessOnWorkspaceCountAggregateInputType = {
    id?: true
    createdAt?: true
    lastAccessPageId?: true
    userId?: true
    workspaceId?: true
    _all?: true
  }

  export type TrackingUserAccessOnWorkspaceAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackingUserAccessOnWorkspace to aggregate.
     */
    where?: TrackingUserAccessOnWorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingUserAccessOnWorkspaces to fetch.
     */
    orderBy?: Enumerable<TrackingUserAccessOnWorkspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrackingUserAccessOnWorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingUserAccessOnWorkspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingUserAccessOnWorkspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrackingUserAccessOnWorkspaces
    **/
    _count?: true | TrackingUserAccessOnWorkspaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackingUserAccessOnWorkspaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackingUserAccessOnWorkspaceMaxAggregateInputType
  }

  export type GetTrackingUserAccessOnWorkspaceAggregateType<T extends TrackingUserAccessOnWorkspaceAggregateArgs> = {
        [P in keyof T & keyof AggregateTrackingUserAccessOnWorkspace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrackingUserAccessOnWorkspace[P]>
      : GetScalarType<T[P], AggregateTrackingUserAccessOnWorkspace[P]>
  }




  export type TrackingUserAccessOnWorkspaceGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: TrackingUserAccessOnWorkspaceWhereInput
    orderBy?: Enumerable<TrackingUserAccessOnWorkspaceOrderByWithAggregationInput>
    by: TrackingUserAccessOnWorkspaceScalarFieldEnum[]
    having?: TrackingUserAccessOnWorkspaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackingUserAccessOnWorkspaceCountAggregateInputType | true
    _min?: TrackingUserAccessOnWorkspaceMinAggregateInputType
    _max?: TrackingUserAccessOnWorkspaceMaxAggregateInputType
  }


  export type TrackingUserAccessOnWorkspaceGroupByOutputType = {
    id: string
    createdAt: Date
    lastAccessPageId: string | null
    userId: string
    workspaceId: string
    _count: TrackingUserAccessOnWorkspaceCountAggregateOutputType | null
    _min: TrackingUserAccessOnWorkspaceMinAggregateOutputType | null
    _max: TrackingUserAccessOnWorkspaceMaxAggregateOutputType | null
  }

  type GetTrackingUserAccessOnWorkspaceGroupByPayload<T extends TrackingUserAccessOnWorkspaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TrackingUserAccessOnWorkspaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackingUserAccessOnWorkspaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackingUserAccessOnWorkspaceGroupByOutputType[P]>
            : GetScalarType<T[P], TrackingUserAccessOnWorkspaceGroupByOutputType[P]>
        }
      >
    >


  export type TrackingUserAccessOnWorkspaceSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    lastAccessPageId?: boolean
    userId?: boolean
    workspaceId?: boolean
    user?: boolean | UserArgs<ExtArgs>
    workspace?: boolean | WorkspaceArgs<ExtArgs>
  }, ExtArgs["result"]["trackingUserAccessOnWorkspace"]>

  export type TrackingUserAccessOnWorkspaceSelectScalar = {
    id?: boolean
    createdAt?: boolean
    lastAccessPageId?: boolean
    userId?: boolean
    workspaceId?: boolean
  }

  export type TrackingUserAccessOnWorkspaceInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
    workspace?: boolean | WorkspaceArgs<ExtArgs>
  }


  type TrackingUserAccessOnWorkspaceGetPayload<S extends boolean | null | undefined | TrackingUserAccessOnWorkspaceArgs> = $Types.GetResult<TrackingUserAccessOnWorkspacePayload, S>

  type TrackingUserAccessOnWorkspaceCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<TrackingUserAccessOnWorkspaceFindManyArgs, 'select' | 'include'> & {
      select?: TrackingUserAccessOnWorkspaceCountAggregateInputType | true
    }

  export interface TrackingUserAccessOnWorkspaceDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrackingUserAccessOnWorkspace'], meta: { name: 'TrackingUserAccessOnWorkspace' } }
    /**
     * Find zero or one TrackingUserAccessOnWorkspace that matches the filter.
     * @param {TrackingUserAccessOnWorkspaceFindUniqueArgs} args - Arguments to find a TrackingUserAccessOnWorkspace
     * @example
     * // Get one TrackingUserAccessOnWorkspace
     * const trackingUserAccessOnWorkspace = await prisma.trackingUserAccessOnWorkspace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TrackingUserAccessOnWorkspaceFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TrackingUserAccessOnWorkspaceFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TrackingUserAccessOnWorkspace'> extends True ? Prisma__TrackingUserAccessOnWorkspaceClient<$Types.GetResult<TrackingUserAccessOnWorkspacePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__TrackingUserAccessOnWorkspaceClient<$Types.GetResult<TrackingUserAccessOnWorkspacePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one TrackingUserAccessOnWorkspace that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TrackingUserAccessOnWorkspaceFindUniqueOrThrowArgs} args - Arguments to find a TrackingUserAccessOnWorkspace
     * @example
     * // Get one TrackingUserAccessOnWorkspace
     * const trackingUserAccessOnWorkspace = await prisma.trackingUserAccessOnWorkspace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TrackingUserAccessOnWorkspaceFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TrackingUserAccessOnWorkspaceFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TrackingUserAccessOnWorkspaceClient<$Types.GetResult<TrackingUserAccessOnWorkspacePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first TrackingUserAccessOnWorkspace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingUserAccessOnWorkspaceFindFirstArgs} args - Arguments to find a TrackingUserAccessOnWorkspace
     * @example
     * // Get one TrackingUserAccessOnWorkspace
     * const trackingUserAccessOnWorkspace = await prisma.trackingUserAccessOnWorkspace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TrackingUserAccessOnWorkspaceFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TrackingUserAccessOnWorkspaceFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TrackingUserAccessOnWorkspace'> extends True ? Prisma__TrackingUserAccessOnWorkspaceClient<$Types.GetResult<TrackingUserAccessOnWorkspacePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__TrackingUserAccessOnWorkspaceClient<$Types.GetResult<TrackingUserAccessOnWorkspacePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first TrackingUserAccessOnWorkspace that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingUserAccessOnWorkspaceFindFirstOrThrowArgs} args - Arguments to find a TrackingUserAccessOnWorkspace
     * @example
     * // Get one TrackingUserAccessOnWorkspace
     * const trackingUserAccessOnWorkspace = await prisma.trackingUserAccessOnWorkspace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TrackingUserAccessOnWorkspaceFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TrackingUserAccessOnWorkspaceFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TrackingUserAccessOnWorkspaceClient<$Types.GetResult<TrackingUserAccessOnWorkspacePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more TrackingUserAccessOnWorkspaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingUserAccessOnWorkspaceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrackingUserAccessOnWorkspaces
     * const trackingUserAccessOnWorkspaces = await prisma.trackingUserAccessOnWorkspace.findMany()
     * 
     * // Get first 10 TrackingUserAccessOnWorkspaces
     * const trackingUserAccessOnWorkspaces = await prisma.trackingUserAccessOnWorkspace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trackingUserAccessOnWorkspaceWithIdOnly = await prisma.trackingUserAccessOnWorkspace.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TrackingUserAccessOnWorkspaceFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TrackingUserAccessOnWorkspaceFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<TrackingUserAccessOnWorkspacePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a TrackingUserAccessOnWorkspace.
     * @param {TrackingUserAccessOnWorkspaceCreateArgs} args - Arguments to create a TrackingUserAccessOnWorkspace.
     * @example
     * // Create one TrackingUserAccessOnWorkspace
     * const TrackingUserAccessOnWorkspace = await prisma.trackingUserAccessOnWorkspace.create({
     *   data: {
     *     // ... data to create a TrackingUserAccessOnWorkspace
     *   }
     * })
     * 
    **/
    create<T extends TrackingUserAccessOnWorkspaceCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TrackingUserAccessOnWorkspaceCreateArgs<ExtArgs>>
    ): Prisma__TrackingUserAccessOnWorkspaceClient<$Types.GetResult<TrackingUserAccessOnWorkspacePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many TrackingUserAccessOnWorkspaces.
     *     @param {TrackingUserAccessOnWorkspaceCreateManyArgs} args - Arguments to create many TrackingUserAccessOnWorkspaces.
     *     @example
     *     // Create many TrackingUserAccessOnWorkspaces
     *     const trackingUserAccessOnWorkspace = await prisma.trackingUserAccessOnWorkspace.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TrackingUserAccessOnWorkspaceCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TrackingUserAccessOnWorkspaceCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TrackingUserAccessOnWorkspace.
     * @param {TrackingUserAccessOnWorkspaceDeleteArgs} args - Arguments to delete one TrackingUserAccessOnWorkspace.
     * @example
     * // Delete one TrackingUserAccessOnWorkspace
     * const TrackingUserAccessOnWorkspace = await prisma.trackingUserAccessOnWorkspace.delete({
     *   where: {
     *     // ... filter to delete one TrackingUserAccessOnWorkspace
     *   }
     * })
     * 
    **/
    delete<T extends TrackingUserAccessOnWorkspaceDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TrackingUserAccessOnWorkspaceDeleteArgs<ExtArgs>>
    ): Prisma__TrackingUserAccessOnWorkspaceClient<$Types.GetResult<TrackingUserAccessOnWorkspacePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one TrackingUserAccessOnWorkspace.
     * @param {TrackingUserAccessOnWorkspaceUpdateArgs} args - Arguments to update one TrackingUserAccessOnWorkspace.
     * @example
     * // Update one TrackingUserAccessOnWorkspace
     * const trackingUserAccessOnWorkspace = await prisma.trackingUserAccessOnWorkspace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TrackingUserAccessOnWorkspaceUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TrackingUserAccessOnWorkspaceUpdateArgs<ExtArgs>>
    ): Prisma__TrackingUserAccessOnWorkspaceClient<$Types.GetResult<TrackingUserAccessOnWorkspacePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more TrackingUserAccessOnWorkspaces.
     * @param {TrackingUserAccessOnWorkspaceDeleteManyArgs} args - Arguments to filter TrackingUserAccessOnWorkspaces to delete.
     * @example
     * // Delete a few TrackingUserAccessOnWorkspaces
     * const { count } = await prisma.trackingUserAccessOnWorkspace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TrackingUserAccessOnWorkspaceDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TrackingUserAccessOnWorkspaceDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrackingUserAccessOnWorkspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingUserAccessOnWorkspaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrackingUserAccessOnWorkspaces
     * const trackingUserAccessOnWorkspace = await prisma.trackingUserAccessOnWorkspace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TrackingUserAccessOnWorkspaceUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TrackingUserAccessOnWorkspaceUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TrackingUserAccessOnWorkspace.
     * @param {TrackingUserAccessOnWorkspaceUpsertArgs} args - Arguments to update or create a TrackingUserAccessOnWorkspace.
     * @example
     * // Update or create a TrackingUserAccessOnWorkspace
     * const trackingUserAccessOnWorkspace = await prisma.trackingUserAccessOnWorkspace.upsert({
     *   create: {
     *     // ... data to create a TrackingUserAccessOnWorkspace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrackingUserAccessOnWorkspace we want to update
     *   }
     * })
    **/
    upsert<T extends TrackingUserAccessOnWorkspaceUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TrackingUserAccessOnWorkspaceUpsertArgs<ExtArgs>>
    ): Prisma__TrackingUserAccessOnWorkspaceClient<$Types.GetResult<TrackingUserAccessOnWorkspacePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of TrackingUserAccessOnWorkspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingUserAccessOnWorkspaceCountArgs} args - Arguments to filter TrackingUserAccessOnWorkspaces to count.
     * @example
     * // Count the number of TrackingUserAccessOnWorkspaces
     * const count = await prisma.trackingUserAccessOnWorkspace.count({
     *   where: {
     *     // ... the filter for the TrackingUserAccessOnWorkspaces we want to count
     *   }
     * })
    **/
    count<T extends TrackingUserAccessOnWorkspaceCountArgs>(
      args?: Subset<T, TrackingUserAccessOnWorkspaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackingUserAccessOnWorkspaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrackingUserAccessOnWorkspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingUserAccessOnWorkspaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrackingUserAccessOnWorkspaceAggregateArgs>(args: Subset<T, TrackingUserAccessOnWorkspaceAggregateArgs>): Prisma.PrismaPromise<GetTrackingUserAccessOnWorkspaceAggregateType<T>>

    /**
     * Group by TrackingUserAccessOnWorkspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingUserAccessOnWorkspaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrackingUserAccessOnWorkspaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrackingUserAccessOnWorkspaceGroupByArgs['orderBy'] }
        : { orderBy?: TrackingUserAccessOnWorkspaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrackingUserAccessOnWorkspaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackingUserAccessOnWorkspaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for TrackingUserAccessOnWorkspace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TrackingUserAccessOnWorkspaceClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    workspace<T extends WorkspaceArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceArgs<ExtArgs>>): Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * TrackingUserAccessOnWorkspace base type for findUnique actions
   */
  export type TrackingUserAccessOnWorkspaceFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingUserAccessOnWorkspace
     */
    select?: TrackingUserAccessOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TrackingUserAccessOnWorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which TrackingUserAccessOnWorkspace to fetch.
     */
    where: TrackingUserAccessOnWorkspaceWhereUniqueInput
  }

  /**
   * TrackingUserAccessOnWorkspace findUnique
   */
  export interface TrackingUserAccessOnWorkspaceFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends TrackingUserAccessOnWorkspaceFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TrackingUserAccessOnWorkspace findUniqueOrThrow
   */
  export type TrackingUserAccessOnWorkspaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingUserAccessOnWorkspace
     */
    select?: TrackingUserAccessOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TrackingUserAccessOnWorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which TrackingUserAccessOnWorkspace to fetch.
     */
    where: TrackingUserAccessOnWorkspaceWhereUniqueInput
  }


  /**
   * TrackingUserAccessOnWorkspace base type for findFirst actions
   */
  export type TrackingUserAccessOnWorkspaceFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingUserAccessOnWorkspace
     */
    select?: TrackingUserAccessOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TrackingUserAccessOnWorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which TrackingUserAccessOnWorkspace to fetch.
     */
    where?: TrackingUserAccessOnWorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingUserAccessOnWorkspaces to fetch.
     */
    orderBy?: Enumerable<TrackingUserAccessOnWorkspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackingUserAccessOnWorkspaces.
     */
    cursor?: TrackingUserAccessOnWorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingUserAccessOnWorkspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingUserAccessOnWorkspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackingUserAccessOnWorkspaces.
     */
    distinct?: Enumerable<TrackingUserAccessOnWorkspaceScalarFieldEnum>
  }

  /**
   * TrackingUserAccessOnWorkspace findFirst
   */
  export interface TrackingUserAccessOnWorkspaceFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends TrackingUserAccessOnWorkspaceFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TrackingUserAccessOnWorkspace findFirstOrThrow
   */
  export type TrackingUserAccessOnWorkspaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingUserAccessOnWorkspace
     */
    select?: TrackingUserAccessOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TrackingUserAccessOnWorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which TrackingUserAccessOnWorkspace to fetch.
     */
    where?: TrackingUserAccessOnWorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingUserAccessOnWorkspaces to fetch.
     */
    orderBy?: Enumerable<TrackingUserAccessOnWorkspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackingUserAccessOnWorkspaces.
     */
    cursor?: TrackingUserAccessOnWorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingUserAccessOnWorkspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingUserAccessOnWorkspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackingUserAccessOnWorkspaces.
     */
    distinct?: Enumerable<TrackingUserAccessOnWorkspaceScalarFieldEnum>
  }


  /**
   * TrackingUserAccessOnWorkspace findMany
   */
  export type TrackingUserAccessOnWorkspaceFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingUserAccessOnWorkspace
     */
    select?: TrackingUserAccessOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TrackingUserAccessOnWorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which TrackingUserAccessOnWorkspaces to fetch.
     */
    where?: TrackingUserAccessOnWorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingUserAccessOnWorkspaces to fetch.
     */
    orderBy?: Enumerable<TrackingUserAccessOnWorkspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrackingUserAccessOnWorkspaces.
     */
    cursor?: TrackingUserAccessOnWorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingUserAccessOnWorkspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingUserAccessOnWorkspaces.
     */
    skip?: number
    distinct?: Enumerable<TrackingUserAccessOnWorkspaceScalarFieldEnum>
  }


  /**
   * TrackingUserAccessOnWorkspace create
   */
  export type TrackingUserAccessOnWorkspaceCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingUserAccessOnWorkspace
     */
    select?: TrackingUserAccessOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TrackingUserAccessOnWorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to create a TrackingUserAccessOnWorkspace.
     */
    data: XOR<TrackingUserAccessOnWorkspaceCreateInput, TrackingUserAccessOnWorkspaceUncheckedCreateInput>
  }


  /**
   * TrackingUserAccessOnWorkspace createMany
   */
  export type TrackingUserAccessOnWorkspaceCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrackingUserAccessOnWorkspaces.
     */
    data: Enumerable<TrackingUserAccessOnWorkspaceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TrackingUserAccessOnWorkspace update
   */
  export type TrackingUserAccessOnWorkspaceUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingUserAccessOnWorkspace
     */
    select?: TrackingUserAccessOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TrackingUserAccessOnWorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to update a TrackingUserAccessOnWorkspace.
     */
    data: XOR<TrackingUserAccessOnWorkspaceUpdateInput, TrackingUserAccessOnWorkspaceUncheckedUpdateInput>
    /**
     * Choose, which TrackingUserAccessOnWorkspace to update.
     */
    where: TrackingUserAccessOnWorkspaceWhereUniqueInput
  }


  /**
   * TrackingUserAccessOnWorkspace updateMany
   */
  export type TrackingUserAccessOnWorkspaceUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrackingUserAccessOnWorkspaces.
     */
    data: XOR<TrackingUserAccessOnWorkspaceUpdateManyMutationInput, TrackingUserAccessOnWorkspaceUncheckedUpdateManyInput>
    /**
     * Filter which TrackingUserAccessOnWorkspaces to update
     */
    where?: TrackingUserAccessOnWorkspaceWhereInput
  }


  /**
   * TrackingUserAccessOnWorkspace upsert
   */
  export type TrackingUserAccessOnWorkspaceUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingUserAccessOnWorkspace
     */
    select?: TrackingUserAccessOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TrackingUserAccessOnWorkspaceInclude<ExtArgs> | null
    /**
     * The filter to search for the TrackingUserAccessOnWorkspace to update in case it exists.
     */
    where: TrackingUserAccessOnWorkspaceWhereUniqueInput
    /**
     * In case the TrackingUserAccessOnWorkspace found by the `where` argument doesn't exist, create a new TrackingUserAccessOnWorkspace with this data.
     */
    create: XOR<TrackingUserAccessOnWorkspaceCreateInput, TrackingUserAccessOnWorkspaceUncheckedCreateInput>
    /**
     * In case the TrackingUserAccessOnWorkspace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrackingUserAccessOnWorkspaceUpdateInput, TrackingUserAccessOnWorkspaceUncheckedUpdateInput>
  }


  /**
   * TrackingUserAccessOnWorkspace delete
   */
  export type TrackingUserAccessOnWorkspaceDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingUserAccessOnWorkspace
     */
    select?: TrackingUserAccessOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TrackingUserAccessOnWorkspaceInclude<ExtArgs> | null
    /**
     * Filter which TrackingUserAccessOnWorkspace to delete.
     */
    where: TrackingUserAccessOnWorkspaceWhereUniqueInput
  }


  /**
   * TrackingUserAccessOnWorkspace deleteMany
   */
  export type TrackingUserAccessOnWorkspaceDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackingUserAccessOnWorkspaces to delete
     */
    where?: TrackingUserAccessOnWorkspaceWhereInput
  }


  /**
   * TrackingUserAccessOnWorkspace without action
   */
  export type TrackingUserAccessOnWorkspaceArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingUserAccessOnWorkspace
     */
    select?: TrackingUserAccessOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TrackingUserAccessOnWorkspaceInclude<ExtArgs> | null
  }



  /**
   * Model Workspace
   */


  export type AggregateWorkspace = {
    _count: WorkspaceCountAggregateOutputType | null
    _min: WorkspaceMinAggregateOutputType | null
    _max: WorkspaceMaxAggregateOutputType | null
  }

  export type WorkspaceMinAggregateOutputType = {
    id: string | null
    name: string | null
    domain: string | null
    stripeCustomerId: string | null
    stripeWorkspaceId: string | null
    stripeSubscriptionId: string | null
    stripePriceId: string | null
    stripeCurrentPeriodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
  }

  export type WorkspaceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    domain: string | null
    stripeCustomerId: string | null
    stripeWorkspaceId: string | null
    stripeSubscriptionId: string | null
    stripePriceId: string | null
    stripeCurrentPeriodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    createdBy: string | null
  }

  export type WorkspaceCountAggregateOutputType = {
    id: number
    name: number
    domain: number
    stripeCustomerId: number
    stripeWorkspaceId: number
    stripeSubscriptionId: number
    stripePriceId: number
    stripeCurrentPeriodEnd: number
    createdAt: number
    updatedAt: number
    createdBy: number
    _all: number
  }


  export type WorkspaceMinAggregateInputType = {
    id?: true
    name?: true
    domain?: true
    stripeCustomerId?: true
    stripeWorkspaceId?: true
    stripeSubscriptionId?: true
    stripePriceId?: true
    stripeCurrentPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
  }

  export type WorkspaceMaxAggregateInputType = {
    id?: true
    name?: true
    domain?: true
    stripeCustomerId?: true
    stripeWorkspaceId?: true
    stripeSubscriptionId?: true
    stripePriceId?: true
    stripeCurrentPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
  }

  export type WorkspaceCountAggregateInputType = {
    id?: true
    name?: true
    domain?: true
    stripeCustomerId?: true
    stripeWorkspaceId?: true
    stripeSubscriptionId?: true
    stripePriceId?: true
    stripeCurrentPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
    createdBy?: true
    _all?: true
  }

  export type WorkspaceAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workspace to aggregate.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: Enumerable<WorkspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workspaces
    **/
    _count?: true | WorkspaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkspaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkspaceMaxAggregateInputType
  }

  export type GetWorkspaceAggregateType<T extends WorkspaceAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkspace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkspace[P]>
      : GetScalarType<T[P], AggregateWorkspace[P]>
  }




  export type WorkspaceGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: WorkspaceWhereInput
    orderBy?: Enumerable<WorkspaceOrderByWithAggregationInput>
    by: WorkspaceScalarFieldEnum[]
    having?: WorkspaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkspaceCountAggregateInputType | true
    _min?: WorkspaceMinAggregateInputType
    _max?: WorkspaceMaxAggregateInputType
  }


  export type WorkspaceGroupByOutputType = {
    id: string
    name: string
    domain: string
    stripeCustomerId: string | null
    stripeWorkspaceId: string | null
    stripeSubscriptionId: string | null
    stripePriceId: string | null
    stripeCurrentPeriodEnd: Date | null
    createdAt: Date
    updatedAt: Date
    createdBy: string
    _count: WorkspaceCountAggregateOutputType | null
    _min: WorkspaceMinAggregateOutputType | null
    _max: WorkspaceMaxAggregateOutputType | null
  }

  type GetWorkspaceGroupByPayload<T extends WorkspaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<WorkspaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkspaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkspaceGroupByOutputType[P]>
            : GetScalarType<T[P], WorkspaceGroupByOutputType[P]>
        }
      >
    >


  export type WorkspaceSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    domain?: boolean
    stripeCustomerId?: boolean
    stripeWorkspaceId?: boolean
    stripeSubscriptionId?: boolean
    stripePriceId?: boolean
    stripeCurrentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
    trackingUserAccessOnWorkspace?: boolean | TrackingUserAccessOnWorkspaceArgs<ExtArgs>
    userOnWorkspace?: boolean | Workspace$userOnWorkspaceArgs<ExtArgs>
    teamspaces?: boolean | Workspace$teamspacesArgs<ExtArgs>
    pages?: boolean | Workspace$pagesArgs<ExtArgs>
    favorites?: boolean | Workspace$favoritesArgs<ExtArgs>
    _count?: boolean | WorkspaceCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectScalar = {
    id?: boolean
    name?: boolean
    domain?: boolean
    stripeCustomerId?: boolean
    stripeWorkspaceId?: boolean
    stripeSubscriptionId?: boolean
    stripePriceId?: boolean
    stripeCurrentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean
  }

  export type WorkspaceInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    trackingUserAccessOnWorkspace?: boolean | TrackingUserAccessOnWorkspaceArgs<ExtArgs>
    userOnWorkspace?: boolean | Workspace$userOnWorkspaceArgs<ExtArgs>
    teamspaces?: boolean | Workspace$teamspacesArgs<ExtArgs>
    pages?: boolean | Workspace$pagesArgs<ExtArgs>
    favorites?: boolean | Workspace$favoritesArgs<ExtArgs>
    _count?: boolean | WorkspaceCountOutputTypeArgs<ExtArgs>
  }


  type WorkspaceGetPayload<S extends boolean | null | undefined | WorkspaceArgs> = $Types.GetResult<WorkspacePayload, S>

  type WorkspaceCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<WorkspaceFindManyArgs, 'select' | 'include'> & {
      select?: WorkspaceCountAggregateInputType | true
    }

  export interface WorkspaceDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workspace'], meta: { name: 'Workspace' } }
    /**
     * Find zero or one Workspace that matches the filter.
     * @param {WorkspaceFindUniqueArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WorkspaceFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WorkspaceFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Workspace'> extends True ? Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Workspace that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WorkspaceFindUniqueOrThrowArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WorkspaceFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkspaceFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Workspace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindFirstArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WorkspaceFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WorkspaceFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Workspace'> extends True ? Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Workspace that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindFirstOrThrowArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WorkspaceFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkspaceFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Workspaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workspaces
     * const workspaces = await prisma.workspace.findMany()
     * 
     * // Get first 10 Workspaces
     * const workspaces = await prisma.workspace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workspaceWithIdOnly = await prisma.workspace.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WorkspaceFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkspaceFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Workspace.
     * @param {WorkspaceCreateArgs} args - Arguments to create a Workspace.
     * @example
     * // Create one Workspace
     * const Workspace = await prisma.workspace.create({
     *   data: {
     *     // ... data to create a Workspace
     *   }
     * })
     * 
    **/
    create<T extends WorkspaceCreateArgs<ExtArgs>>(
      args: SelectSubset<T, WorkspaceCreateArgs<ExtArgs>>
    ): Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Workspaces.
     *     @param {WorkspaceCreateManyArgs} args - Arguments to create many Workspaces.
     *     @example
     *     // Create many Workspaces
     *     const workspace = await prisma.workspace.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WorkspaceCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkspaceCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Workspace.
     * @param {WorkspaceDeleteArgs} args - Arguments to delete one Workspace.
     * @example
     * // Delete one Workspace
     * const Workspace = await prisma.workspace.delete({
     *   where: {
     *     // ... filter to delete one Workspace
     *   }
     * })
     * 
    **/
    delete<T extends WorkspaceDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, WorkspaceDeleteArgs<ExtArgs>>
    ): Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Workspace.
     * @param {WorkspaceUpdateArgs} args - Arguments to update one Workspace.
     * @example
     * // Update one Workspace
     * const workspace = await prisma.workspace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WorkspaceUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, WorkspaceUpdateArgs<ExtArgs>>
    ): Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Workspaces.
     * @param {WorkspaceDeleteManyArgs} args - Arguments to filter Workspaces to delete.
     * @example
     * // Delete a few Workspaces
     * const { count } = await prisma.workspace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WorkspaceDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkspaceDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workspaces
     * const workspace = await prisma.workspace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WorkspaceUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, WorkspaceUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Workspace.
     * @param {WorkspaceUpsertArgs} args - Arguments to update or create a Workspace.
     * @example
     * // Update or create a Workspace
     * const workspace = await prisma.workspace.upsert({
     *   create: {
     *     // ... data to create a Workspace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workspace we want to update
     *   }
     * })
    **/
    upsert<T extends WorkspaceUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, WorkspaceUpsertArgs<ExtArgs>>
    ): Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Workspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceCountArgs} args - Arguments to filter Workspaces to count.
     * @example
     * // Count the number of Workspaces
     * const count = await prisma.workspace.count({
     *   where: {
     *     // ... the filter for the Workspaces we want to count
     *   }
     * })
    **/
    count<T extends WorkspaceCountArgs>(
      args?: Subset<T, WorkspaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkspaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkspaceAggregateArgs>(args: Subset<T, WorkspaceAggregateArgs>): Prisma.PrismaPromise<GetWorkspaceAggregateType<T>>

    /**
     * Group by Workspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkspaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkspaceGroupByArgs['orderBy'] }
        : { orderBy?: WorkspaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkspaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkspaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Workspace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WorkspaceClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    trackingUserAccessOnWorkspace<T extends TrackingUserAccessOnWorkspaceArgs<ExtArgs> = {}>(args?: Subset<T, TrackingUserAccessOnWorkspaceArgs<ExtArgs>>): Prisma__TrackingUserAccessOnWorkspaceClient<$Types.GetResult<TrackingUserAccessOnWorkspacePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    userOnWorkspace<T extends Workspace$userOnWorkspaceArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$userOnWorkspaceArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<UserOnWorkspacePayload<ExtArgs>, T, 'findMany', never>| Null>;

    teamspaces<T extends Workspace$teamspacesArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$teamspacesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'findMany', never>| Null>;

    pages<T extends Workspace$pagesArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$pagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<PagePayload<ExtArgs>, T, 'findMany', never>| Null>;

    favorites<T extends Workspace$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Workspace base type for findUnique actions
   */
  export type WorkspaceFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace findUnique
   */
  export interface WorkspaceFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends WorkspaceFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Workspace findUniqueOrThrow
   */
  export type WorkspaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where: WorkspaceWhereUniqueInput
  }


  /**
   * Workspace base type for findFirst actions
   */
  export type WorkspaceFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: Enumerable<WorkspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: Enumerable<WorkspaceScalarFieldEnum>
  }

  /**
   * Workspace findFirst
   */
  export interface WorkspaceFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends WorkspaceFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Workspace findFirstOrThrow
   */
  export type WorkspaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: Enumerable<WorkspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: Enumerable<WorkspaceScalarFieldEnum>
  }


  /**
   * Workspace findMany
   */
  export type WorkspaceFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspaces to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: Enumerable<WorkspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    distinct?: Enumerable<WorkspaceScalarFieldEnum>
  }


  /**
   * Workspace create
   */
  export type WorkspaceCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to create a Workspace.
     */
    data: XOR<WorkspaceCreateInput, WorkspaceUncheckedCreateInput>
  }


  /**
   * Workspace createMany
   */
  export type WorkspaceCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Workspaces.
     */
    data: Enumerable<WorkspaceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Workspace update
   */
  export type WorkspaceUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to update a Workspace.
     */
    data: XOR<WorkspaceUpdateInput, WorkspaceUncheckedUpdateInput>
    /**
     * Choose, which Workspace to update.
     */
    where: WorkspaceWhereUniqueInput
  }


  /**
   * Workspace updateMany
   */
  export type WorkspaceUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Workspaces.
     */
    data: XOR<WorkspaceUpdateManyMutationInput, WorkspaceUncheckedUpdateManyInput>
    /**
     * Filter which Workspaces to update
     */
    where?: WorkspaceWhereInput
  }


  /**
   * Workspace upsert
   */
  export type WorkspaceUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The filter to search for the Workspace to update in case it exists.
     */
    where: WorkspaceWhereUniqueInput
    /**
     * In case the Workspace found by the `where` argument doesn't exist, create a new Workspace with this data.
     */
    create: XOR<WorkspaceCreateInput, WorkspaceUncheckedCreateInput>
    /**
     * In case the Workspace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkspaceUpdateInput, WorkspaceUncheckedUpdateInput>
  }


  /**
   * Workspace delete
   */
  export type WorkspaceDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter which Workspace to delete.
     */
    where: WorkspaceWhereUniqueInput
  }


  /**
   * Workspace deleteMany
   */
  export type WorkspaceDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workspaces to delete
     */
    where?: WorkspaceWhereInput
  }


  /**
   * Workspace.userOnWorkspace
   */
  export type Workspace$userOnWorkspaceArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnWorkspace
     */
    select?: UserOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnWorkspaceInclude<ExtArgs> | null
    where?: UserOnWorkspaceWhereInput
    orderBy?: Enumerable<UserOnWorkspaceOrderByWithRelationInput>
    cursor?: UserOnWorkspaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<UserOnWorkspaceScalarFieldEnum>
  }


  /**
   * Workspace.teamspaces
   */
  export type Workspace$teamspacesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teamspace
     */
    select?: TeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamspaceInclude<ExtArgs> | null
    where?: TeamspaceWhereInput
    orderBy?: Enumerable<TeamspaceOrderByWithRelationInput>
    cursor?: TeamspaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TeamspaceScalarFieldEnum>
  }


  /**
   * Workspace.pages
   */
  export type Workspace$pagesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PageScalarFieldEnum>
  }


  /**
   * Workspace.favorites
   */
  export type Workspace$favoritesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: Enumerable<FavoriteOrderByWithRelationInput>
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<FavoriteScalarFieldEnum>
  }


  /**
   * Workspace without action
   */
  export type WorkspaceArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkspaceInclude<ExtArgs> | null
  }



  /**
   * Model Teamspace
   */


  export type AggregateTeamspace = {
    _count: TeamspaceCountAggregateOutputType | null
    _min: TeamspaceMinAggregateOutputType | null
    _max: TeamspaceMaxAggregateOutputType | null
  }

  export type TeamspaceMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isOrigin: boolean | null
    archivedAt: Date | null
    workspaceId: string | null
    createdBy: string | null
  }

  export type TeamspaceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isOrigin: boolean | null
    archivedAt: Date | null
    workspaceId: string | null
    createdBy: string | null
  }

  export type TeamspaceCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    isOrigin: number
    archivedAt: number
    workspaceId: number
    createdBy: number
    _all: number
  }


  export type TeamspaceMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    isOrigin?: true
    archivedAt?: true
    workspaceId?: true
    createdBy?: true
  }

  export type TeamspaceMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    isOrigin?: true
    archivedAt?: true
    workspaceId?: true
    createdBy?: true
  }

  export type TeamspaceCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    isOrigin?: true
    archivedAt?: true
    workspaceId?: true
    createdBy?: true
    _all?: true
  }

  export type TeamspaceAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teamspace to aggregate.
     */
    where?: TeamspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teamspaces to fetch.
     */
    orderBy?: Enumerable<TeamspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teamspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teamspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teamspaces
    **/
    _count?: true | TeamspaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamspaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamspaceMaxAggregateInputType
  }

  export type GetTeamspaceAggregateType<T extends TeamspaceAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamspace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamspace[P]>
      : GetScalarType<T[P], AggregateTeamspace[P]>
  }




  export type TeamspaceGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: TeamspaceWhereInput
    orderBy?: Enumerable<TeamspaceOrderByWithAggregationInput>
    by: TeamspaceScalarFieldEnum[]
    having?: TeamspaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamspaceCountAggregateInputType | true
    _min?: TeamspaceMinAggregateInputType
    _max?: TeamspaceMaxAggregateInputType
  }


  export type TeamspaceGroupByOutputType = {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    isOrigin: boolean | null
    archivedAt: Date | null
    workspaceId: string | null
    createdBy: string
    _count: TeamspaceCountAggregateOutputType | null
    _min: TeamspaceMinAggregateOutputType | null
    _max: TeamspaceMaxAggregateOutputType | null
  }

  type GetTeamspaceGroupByPayload<T extends TeamspaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TeamspaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamspaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamspaceGroupByOutputType[P]>
            : GetScalarType<T[P], TeamspaceGroupByOutputType[P]>
        }
      >
    >


  export type TeamspaceSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isOrigin?: boolean
    archivedAt?: boolean
    workspaceId?: boolean
    createdBy?: boolean
    workspace?: boolean | WorkspaceArgs<ExtArgs>
    userOnTeamspace?: boolean | Teamspace$userOnTeamspaceArgs<ExtArgs>
    pages?: boolean | Teamspace$pagesArgs<ExtArgs>
    _count?: boolean | TeamspaceCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["teamspace"]>

  export type TeamspaceSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isOrigin?: boolean
    archivedAt?: boolean
    workspaceId?: boolean
    createdBy?: boolean
  }

  export type TeamspaceInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceArgs<ExtArgs>
    userOnTeamspace?: boolean | Teamspace$userOnTeamspaceArgs<ExtArgs>
    pages?: boolean | Teamspace$pagesArgs<ExtArgs>
    _count?: boolean | TeamspaceCountOutputTypeArgs<ExtArgs>
  }


  type TeamspaceGetPayload<S extends boolean | null | undefined | TeamspaceArgs> = $Types.GetResult<TeamspacePayload, S>

  type TeamspaceCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<TeamspaceFindManyArgs, 'select' | 'include'> & {
      select?: TeamspaceCountAggregateInputType | true
    }

  export interface TeamspaceDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Teamspace'], meta: { name: 'Teamspace' } }
    /**
     * Find zero or one Teamspace that matches the filter.
     * @param {TeamspaceFindUniqueArgs} args - Arguments to find a Teamspace
     * @example
     * // Get one Teamspace
     * const teamspace = await prisma.teamspace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TeamspaceFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TeamspaceFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Teamspace'> extends True ? Prisma__TeamspaceClient<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__TeamspaceClient<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Teamspace that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TeamspaceFindUniqueOrThrowArgs} args - Arguments to find a Teamspace
     * @example
     * // Get one Teamspace
     * const teamspace = await prisma.teamspace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TeamspaceFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamspaceFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TeamspaceClient<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Teamspace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamspaceFindFirstArgs} args - Arguments to find a Teamspace
     * @example
     * // Get one Teamspace
     * const teamspace = await prisma.teamspace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TeamspaceFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TeamspaceFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Teamspace'> extends True ? Prisma__TeamspaceClient<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__TeamspaceClient<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Teamspace that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamspaceFindFirstOrThrowArgs} args - Arguments to find a Teamspace
     * @example
     * // Get one Teamspace
     * const teamspace = await prisma.teamspace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TeamspaceFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamspaceFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TeamspaceClient<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Teamspaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamspaceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teamspaces
     * const teamspaces = await prisma.teamspace.findMany()
     * 
     * // Get first 10 Teamspaces
     * const teamspaces = await prisma.teamspace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamspaceWithIdOnly = await prisma.teamspace.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TeamspaceFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamspaceFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Teamspace.
     * @param {TeamspaceCreateArgs} args - Arguments to create a Teamspace.
     * @example
     * // Create one Teamspace
     * const Teamspace = await prisma.teamspace.create({
     *   data: {
     *     // ... data to create a Teamspace
     *   }
     * })
     * 
    **/
    create<T extends TeamspaceCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TeamspaceCreateArgs<ExtArgs>>
    ): Prisma__TeamspaceClient<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Teamspaces.
     *     @param {TeamspaceCreateManyArgs} args - Arguments to create many Teamspaces.
     *     @example
     *     // Create many Teamspaces
     *     const teamspace = await prisma.teamspace.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TeamspaceCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamspaceCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Teamspace.
     * @param {TeamspaceDeleteArgs} args - Arguments to delete one Teamspace.
     * @example
     * // Delete one Teamspace
     * const Teamspace = await prisma.teamspace.delete({
     *   where: {
     *     // ... filter to delete one Teamspace
     *   }
     * })
     * 
    **/
    delete<T extends TeamspaceDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TeamspaceDeleteArgs<ExtArgs>>
    ): Prisma__TeamspaceClient<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Teamspace.
     * @param {TeamspaceUpdateArgs} args - Arguments to update one Teamspace.
     * @example
     * // Update one Teamspace
     * const teamspace = await prisma.teamspace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TeamspaceUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TeamspaceUpdateArgs<ExtArgs>>
    ): Prisma__TeamspaceClient<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Teamspaces.
     * @param {TeamspaceDeleteManyArgs} args - Arguments to filter Teamspaces to delete.
     * @example
     * // Delete a few Teamspaces
     * const { count } = await prisma.teamspace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TeamspaceDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TeamspaceDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teamspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamspaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teamspaces
     * const teamspace = await prisma.teamspace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TeamspaceUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TeamspaceUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Teamspace.
     * @param {TeamspaceUpsertArgs} args - Arguments to update or create a Teamspace.
     * @example
     * // Update or create a Teamspace
     * const teamspace = await prisma.teamspace.upsert({
     *   create: {
     *     // ... data to create a Teamspace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teamspace we want to update
     *   }
     * })
    **/
    upsert<T extends TeamspaceUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TeamspaceUpsertArgs<ExtArgs>>
    ): Prisma__TeamspaceClient<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Teamspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamspaceCountArgs} args - Arguments to filter Teamspaces to count.
     * @example
     * // Count the number of Teamspaces
     * const count = await prisma.teamspace.count({
     *   where: {
     *     // ... the filter for the Teamspaces we want to count
     *   }
     * })
    **/
    count<T extends TeamspaceCountArgs>(
      args?: Subset<T, TeamspaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamspaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teamspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamspaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamspaceAggregateArgs>(args: Subset<T, TeamspaceAggregateArgs>): Prisma.PrismaPromise<GetTeamspaceAggregateType<T>>

    /**
     * Group by Teamspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamspaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamspaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamspaceGroupByArgs['orderBy'] }
        : { orderBy?: TeamspaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamspaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamspaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Teamspace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TeamspaceClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    workspace<T extends WorkspaceArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceArgs<ExtArgs>>): Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    userOnTeamspace<T extends Teamspace$userOnTeamspaceArgs<ExtArgs> = {}>(args?: Subset<T, Teamspace$userOnTeamspaceArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<UserOnTeamspacePayload<ExtArgs>, T, 'findMany', never>| Null>;

    pages<T extends Teamspace$pagesArgs<ExtArgs> = {}>(args?: Subset<T, Teamspace$pagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<PagePayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Teamspace base type for findUnique actions
   */
  export type TeamspaceFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teamspace
     */
    select?: TeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamspaceInclude<ExtArgs> | null
    /**
     * Filter, which Teamspace to fetch.
     */
    where: TeamspaceWhereUniqueInput
  }

  /**
   * Teamspace findUnique
   */
  export interface TeamspaceFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends TeamspaceFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Teamspace findUniqueOrThrow
   */
  export type TeamspaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teamspace
     */
    select?: TeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamspaceInclude<ExtArgs> | null
    /**
     * Filter, which Teamspace to fetch.
     */
    where: TeamspaceWhereUniqueInput
  }


  /**
   * Teamspace base type for findFirst actions
   */
  export type TeamspaceFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teamspace
     */
    select?: TeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamspaceInclude<ExtArgs> | null
    /**
     * Filter, which Teamspace to fetch.
     */
    where?: TeamspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teamspaces to fetch.
     */
    orderBy?: Enumerable<TeamspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teamspaces.
     */
    cursor?: TeamspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teamspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teamspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teamspaces.
     */
    distinct?: Enumerable<TeamspaceScalarFieldEnum>
  }

  /**
   * Teamspace findFirst
   */
  export interface TeamspaceFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends TeamspaceFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Teamspace findFirstOrThrow
   */
  export type TeamspaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teamspace
     */
    select?: TeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamspaceInclude<ExtArgs> | null
    /**
     * Filter, which Teamspace to fetch.
     */
    where?: TeamspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teamspaces to fetch.
     */
    orderBy?: Enumerable<TeamspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teamspaces.
     */
    cursor?: TeamspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teamspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teamspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teamspaces.
     */
    distinct?: Enumerable<TeamspaceScalarFieldEnum>
  }


  /**
   * Teamspace findMany
   */
  export type TeamspaceFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teamspace
     */
    select?: TeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamspaceInclude<ExtArgs> | null
    /**
     * Filter, which Teamspaces to fetch.
     */
    where?: TeamspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teamspaces to fetch.
     */
    orderBy?: Enumerable<TeamspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teamspaces.
     */
    cursor?: TeamspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teamspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teamspaces.
     */
    skip?: number
    distinct?: Enumerable<TeamspaceScalarFieldEnum>
  }


  /**
   * Teamspace create
   */
  export type TeamspaceCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teamspace
     */
    select?: TeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamspaceInclude<ExtArgs> | null
    /**
     * The data needed to create a Teamspace.
     */
    data: XOR<TeamspaceCreateInput, TeamspaceUncheckedCreateInput>
  }


  /**
   * Teamspace createMany
   */
  export type TeamspaceCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teamspaces.
     */
    data: Enumerable<TeamspaceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Teamspace update
   */
  export type TeamspaceUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teamspace
     */
    select?: TeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamspaceInclude<ExtArgs> | null
    /**
     * The data needed to update a Teamspace.
     */
    data: XOR<TeamspaceUpdateInput, TeamspaceUncheckedUpdateInput>
    /**
     * Choose, which Teamspace to update.
     */
    where: TeamspaceWhereUniqueInput
  }


  /**
   * Teamspace updateMany
   */
  export type TeamspaceUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teamspaces.
     */
    data: XOR<TeamspaceUpdateManyMutationInput, TeamspaceUncheckedUpdateManyInput>
    /**
     * Filter which Teamspaces to update
     */
    where?: TeamspaceWhereInput
  }


  /**
   * Teamspace upsert
   */
  export type TeamspaceUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teamspace
     */
    select?: TeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamspaceInclude<ExtArgs> | null
    /**
     * The filter to search for the Teamspace to update in case it exists.
     */
    where: TeamspaceWhereUniqueInput
    /**
     * In case the Teamspace found by the `where` argument doesn't exist, create a new Teamspace with this data.
     */
    create: XOR<TeamspaceCreateInput, TeamspaceUncheckedCreateInput>
    /**
     * In case the Teamspace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamspaceUpdateInput, TeamspaceUncheckedUpdateInput>
  }


  /**
   * Teamspace delete
   */
  export type TeamspaceDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teamspace
     */
    select?: TeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamspaceInclude<ExtArgs> | null
    /**
     * Filter which Teamspace to delete.
     */
    where: TeamspaceWhereUniqueInput
  }


  /**
   * Teamspace deleteMany
   */
  export type TeamspaceDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teamspaces to delete
     */
    where?: TeamspaceWhereInput
  }


  /**
   * Teamspace.userOnTeamspace
   */
  export type Teamspace$userOnTeamspaceArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnTeamspace
     */
    select?: UserOnTeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnTeamspaceInclude<ExtArgs> | null
    where?: UserOnTeamspaceWhereInput
    orderBy?: Enumerable<UserOnTeamspaceOrderByWithRelationInput>
    cursor?: UserOnTeamspaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<UserOnTeamspaceScalarFieldEnum>
  }


  /**
   * Teamspace.pages
   */
  export type Teamspace$pagesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PageScalarFieldEnum>
  }


  /**
   * Teamspace without action
   */
  export type TeamspaceArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teamspace
     */
    select?: TeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TeamspaceInclude<ExtArgs> | null
  }



  /**
   * Model Page
   */


  export type AggregatePage = {
    _count: PageCountAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  export type PageMinAggregateOutputType = {
    id: string | null
    title: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    workspaceId: string | null
    teamspaceId: string | null
    createdBy: string | null
    updatedBy: string | null
    deletedBy: string | null
  }

  export type PageMaxAggregateOutputType = {
    id: string | null
    title: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    workspaceId: string | null
    teamspaceId: string | null
    createdBy: string | null
    updatedBy: string | null
    deletedBy: string | null
  }

  export type PageCountAggregateOutputType = {
    id: number
    title: number
    content: number
    published: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    workspaceId: number
    teamspaceId: number
    createdBy: number
    updatedBy: number
    deletedBy: number
    _all: number
  }


  export type PageMinAggregateInputType = {
    id?: true
    title?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    workspaceId?: true
    teamspaceId?: true
    createdBy?: true
    updatedBy?: true
    deletedBy?: true
  }

  export type PageMaxAggregateInputType = {
    id?: true
    title?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    workspaceId?: true
    teamspaceId?: true
    createdBy?: true
    updatedBy?: true
    deletedBy?: true
  }

  export type PageCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    workspaceId?: true
    teamspaceId?: true
    createdBy?: true
    updatedBy?: true
    deletedBy?: true
    _all?: true
  }

  export type PageAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Page to aggregate.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pages
    **/
    _count?: true | PageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageMaxAggregateInputType
  }

  export type GetPageAggregateType<T extends PageAggregateArgs> = {
        [P in keyof T & keyof AggregatePage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePage[P]>
      : GetScalarType<T[P], AggregatePage[P]>
  }




  export type PageGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
    orderBy?: Enumerable<PageOrderByWithAggregationInput>
    by: PageScalarFieldEnum[]
    having?: PageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageCountAggregateInputType | true
    _min?: PageMinAggregateInputType
    _max?: PageMaxAggregateInputType
  }


  export type PageGroupByOutputType = {
    id: string
    title: string
    content: JsonValue | null
    published: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    workspaceId: string
    teamspaceId: string | null
    createdBy: string
    updatedBy: string
    deletedBy: string | null
    _count: PageCountAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  type GetPageGroupByPayload<T extends PageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<PageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageGroupByOutputType[P]>
            : GetScalarType<T[P], PageGroupByOutputType[P]>
        }
      >
    >


  export type PageSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    workspaceId?: boolean
    teamspaceId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedBy?: boolean
    workspace?: boolean | WorkspaceArgs<ExtArgs>
    teamspace?: boolean | TeamspaceArgs<ExtArgs>
    createdByUser?: boolean | UserArgs<ExtArgs>
    updatedByUser?: boolean | UserArgs<ExtArgs>
    deletedByUser?: boolean | UserArgs<ExtArgs>
    favorites?: boolean | Page$favoritesArgs<ExtArgs>
    _count?: boolean | PageCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    workspaceId?: boolean
    teamspaceId?: boolean
    createdBy?: boolean
    updatedBy?: boolean
    deletedBy?: boolean
  }

  export type PageInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceArgs<ExtArgs>
    teamspace?: boolean | TeamspaceArgs<ExtArgs>
    createdByUser?: boolean | UserArgs<ExtArgs>
    updatedByUser?: boolean | UserArgs<ExtArgs>
    deletedByUser?: boolean | UserArgs<ExtArgs>
    favorites?: boolean | Page$favoritesArgs<ExtArgs>
    _count?: boolean | PageCountOutputTypeArgs<ExtArgs>
  }


  type PageGetPayload<S extends boolean | null | undefined | PageArgs> = $Types.GetResult<PagePayload, S>

  type PageCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<PageFindManyArgs, 'select' | 'include'> & {
      select?: PageCountAggregateInputType | true
    }

  export interface PageDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Page'], meta: { name: 'Page' } }
    /**
     * Find zero or one Page that matches the filter.
     * @param {PageFindUniqueArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PageFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PageFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Page'> extends True ? Prisma__PageClient<$Types.GetResult<PagePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__PageClient<$Types.GetResult<PagePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Page that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PageFindUniqueOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PageFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PageFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PageClient<$Types.GetResult<PagePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Page that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PageFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PageFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Page'> extends True ? Prisma__PageClient<$Types.GetResult<PagePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__PageClient<$Types.GetResult<PagePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Page that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PageFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PageFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PageClient<$Types.GetResult<PagePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pages
     * const pages = await prisma.page.findMany()
     * 
     * // Get first 10 Pages
     * const pages = await prisma.page.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pageWithIdOnly = await prisma.page.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PageFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PageFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<PagePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Page.
     * @param {PageCreateArgs} args - Arguments to create a Page.
     * @example
     * // Create one Page
     * const Page = await prisma.page.create({
     *   data: {
     *     // ... data to create a Page
     *   }
     * })
     * 
    **/
    create<T extends PageCreateArgs<ExtArgs>>(
      args: SelectSubset<T, PageCreateArgs<ExtArgs>>
    ): Prisma__PageClient<$Types.GetResult<PagePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Pages.
     *     @param {PageCreateManyArgs} args - Arguments to create many Pages.
     *     @example
     *     // Create many Pages
     *     const page = await prisma.page.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PageCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PageCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Page.
     * @param {PageDeleteArgs} args - Arguments to delete one Page.
     * @example
     * // Delete one Page
     * const Page = await prisma.page.delete({
     *   where: {
     *     // ... filter to delete one Page
     *   }
     * })
     * 
    **/
    delete<T extends PageDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, PageDeleteArgs<ExtArgs>>
    ): Prisma__PageClient<$Types.GetResult<PagePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Page.
     * @param {PageUpdateArgs} args - Arguments to update one Page.
     * @example
     * // Update one Page
     * const page = await prisma.page.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PageUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, PageUpdateArgs<ExtArgs>>
    ): Prisma__PageClient<$Types.GetResult<PagePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Pages.
     * @param {PageDeleteManyArgs} args - Arguments to filter Pages to delete.
     * @example
     * // Delete a few Pages
     * const { count } = await prisma.page.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PageDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PageDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PageUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, PageUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Page.
     * @param {PageUpsertArgs} args - Arguments to update or create a Page.
     * @example
     * // Update or create a Page
     * const page = await prisma.page.upsert({
     *   create: {
     *     // ... data to create a Page
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Page we want to update
     *   }
     * })
    **/
    upsert<T extends PageUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, PageUpsertArgs<ExtArgs>>
    ): Prisma__PageClient<$Types.GetResult<PagePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageCountArgs} args - Arguments to filter Pages to count.
     * @example
     * // Count the number of Pages
     * const count = await prisma.page.count({
     *   where: {
     *     // ... the filter for the Pages we want to count
     *   }
     * })
    **/
    count<T extends PageCountArgs>(
      args?: Subset<T, PageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageAggregateArgs>(args: Subset<T, PageAggregateArgs>): Prisma.PrismaPromise<GetPageAggregateType<T>>

    /**
     * Group by Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageGroupByArgs['orderBy'] }
        : { orderBy?: PageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Page.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PageClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    workspace<T extends WorkspaceArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceArgs<ExtArgs>>): Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    teamspace<T extends TeamspaceArgs<ExtArgs> = {}>(args?: Subset<T, TeamspaceArgs<ExtArgs>>): Prisma__TeamspaceClient<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    createdByUser<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    updatedByUser<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    deletedByUser<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    favorites<T extends Page$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, Page$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Page base type for findUnique actions
   */
  export type PageFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findUnique
   */
  export interface PageFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends PageFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Page findUniqueOrThrow
   */
  export type PageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }


  /**
   * Page base type for findFirst actions
   */
  export type PageFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: Enumerable<PageScalarFieldEnum>
  }

  /**
   * Page findFirst
   */
  export interface PageFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends PageFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Page findFirstOrThrow
   */
  export type PageFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: Enumerable<PageScalarFieldEnum>
  }


  /**
   * Page findMany
   */
  export type PageFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Pages to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    distinct?: Enumerable<PageScalarFieldEnum>
  }


  /**
   * Page create
   */
  export type PageCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to create a Page.
     */
    data: XOR<PageCreateInput, PageUncheckedCreateInput>
  }


  /**
   * Page createMany
   */
  export type PageCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pages.
     */
    data: Enumerable<PageCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Page update
   */
  export type PageUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to update a Page.
     */
    data: XOR<PageUpdateInput, PageUncheckedUpdateInput>
    /**
     * Choose, which Page to update.
     */
    where: PageWhereUniqueInput
  }


  /**
   * Page updateMany
   */
  export type PageUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
  }


  /**
   * Page upsert
   */
  export type PageUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The filter to search for the Page to update in case it exists.
     */
    where: PageWhereUniqueInput
    /**
     * In case the Page found by the `where` argument doesn't exist, create a new Page with this data.
     */
    create: XOR<PageCreateInput, PageUncheckedCreateInput>
    /**
     * In case the Page was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PageUpdateInput, PageUncheckedUpdateInput>
  }


  /**
   * Page delete
   */
  export type PageDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter which Page to delete.
     */
    where: PageWhereUniqueInput
  }


  /**
   * Page deleteMany
   */
  export type PageDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pages to delete
     */
    where?: PageWhereInput
  }


  /**
   * Page.favorites
   */
  export type Page$favoritesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: Enumerable<FavoriteOrderByWithRelationInput>
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<FavoriteScalarFieldEnum>
  }


  /**
   * Page without action
   */
  export type PageArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PageInclude<ExtArgs> | null
  }



  /**
   * Model Favorite
   */


  export type AggregateFavorite = {
    _count: FavoriteCountAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  export type FavoriteMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    workspaceId: string | null
    pageId: string | null
  }

  export type FavoriteMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    workspaceId: string | null
    pageId: string | null
  }

  export type FavoriteCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    userId: number
    workspaceId: number
    pageId: number
    _all: number
  }


  export type FavoriteMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    workspaceId?: true
    pageId?: true
  }

  export type FavoriteMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    workspaceId?: true
    pageId?: true
  }

  export type FavoriteCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    workspaceId?: true
    pageId?: true
    _all?: true
  }

  export type FavoriteAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorite to aggregate.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: Enumerable<FavoriteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Favorites
    **/
    _count?: true | FavoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoriteMaxAggregateInputType
  }

  export type GetFavoriteAggregateType<T extends FavoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateFavorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavorite[P]>
      : GetScalarType<T[P], AggregateFavorite[P]>
  }




  export type FavoriteGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
    orderBy?: Enumerable<FavoriteOrderByWithAggregationInput>
    by: FavoriteScalarFieldEnum[]
    having?: FavoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoriteCountAggregateInputType | true
    _min?: FavoriteMinAggregateInputType
    _max?: FavoriteMaxAggregateInputType
  }


  export type FavoriteGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    workspaceId: string
    pageId: string
    _count: FavoriteCountAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  type GetFavoriteGroupByPayload<T extends FavoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<FavoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
            : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
        }
      >
    >


  export type FavoriteSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    workspaceId?: boolean
    pageId?: boolean
    user?: boolean | UserArgs<ExtArgs>
    workspace?: boolean | WorkspaceArgs<ExtArgs>
    page?: boolean | PageArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    workspaceId?: boolean
    pageId?: boolean
  }

  export type FavoriteInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
    workspace?: boolean | WorkspaceArgs<ExtArgs>
    page?: boolean | PageArgs<ExtArgs>
  }


  type FavoriteGetPayload<S extends boolean | null | undefined | FavoriteArgs> = $Types.GetResult<FavoritePayload, S>

  type FavoriteCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<FavoriteFindManyArgs, 'select' | 'include'> & {
      select?: FavoriteCountAggregateInputType | true
    }

  export interface FavoriteDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Favorite'], meta: { name: 'Favorite' } }
    /**
     * Find zero or one Favorite that matches the filter.
     * @param {FavoriteFindUniqueArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FavoriteFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, FavoriteFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Favorite'> extends True ? Prisma__FavoriteClient<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__FavoriteClient<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Favorite that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {FavoriteFindUniqueOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FavoriteFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, FavoriteFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__FavoriteClient<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Favorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FavoriteFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, FavoriteFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Favorite'> extends True ? Prisma__FavoriteClient<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__FavoriteClient<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Favorite that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FavoriteFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, FavoriteFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__FavoriteClient<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Favorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Favorites
     * const favorites = await prisma.favorite.findMany()
     * 
     * // Get first 10 Favorites
     * const favorites = await prisma.favorite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favoriteWithIdOnly = await prisma.favorite.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FavoriteFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FavoriteFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Favorite.
     * @param {FavoriteCreateArgs} args - Arguments to create a Favorite.
     * @example
     * // Create one Favorite
     * const Favorite = await prisma.favorite.create({
     *   data: {
     *     // ... data to create a Favorite
     *   }
     * })
     * 
    **/
    create<T extends FavoriteCreateArgs<ExtArgs>>(
      args: SelectSubset<T, FavoriteCreateArgs<ExtArgs>>
    ): Prisma__FavoriteClient<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Favorites.
     *     @param {FavoriteCreateManyArgs} args - Arguments to create many Favorites.
     *     @example
     *     // Create many Favorites
     *     const favorite = await prisma.favorite.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends FavoriteCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FavoriteCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Favorite.
     * @param {FavoriteDeleteArgs} args - Arguments to delete one Favorite.
     * @example
     * // Delete one Favorite
     * const Favorite = await prisma.favorite.delete({
     *   where: {
     *     // ... filter to delete one Favorite
     *   }
     * })
     * 
    **/
    delete<T extends FavoriteDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, FavoriteDeleteArgs<ExtArgs>>
    ): Prisma__FavoriteClient<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Favorite.
     * @param {FavoriteUpdateArgs} args - Arguments to update one Favorite.
     * @example
     * // Update one Favorite
     * const favorite = await prisma.favorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FavoriteUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, FavoriteUpdateArgs<ExtArgs>>
    ): Prisma__FavoriteClient<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Favorites.
     * @param {FavoriteDeleteManyArgs} args - Arguments to filter Favorites to delete.
     * @example
     * // Delete a few Favorites
     * const { count } = await prisma.favorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FavoriteDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FavoriteDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Favorites
     * const favorite = await prisma.favorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FavoriteUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, FavoriteUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Favorite.
     * @param {FavoriteUpsertArgs} args - Arguments to update or create a Favorite.
     * @example
     * // Update or create a Favorite
     * const favorite = await prisma.favorite.upsert({
     *   create: {
     *     // ... data to create a Favorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Favorite we want to update
     *   }
     * })
    **/
    upsert<T extends FavoriteUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, FavoriteUpsertArgs<ExtArgs>>
    ): Prisma__FavoriteClient<$Types.GetResult<FavoritePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteCountArgs} args - Arguments to filter Favorites to count.
     * @example
     * // Count the number of Favorites
     * const count = await prisma.favorite.count({
     *   where: {
     *     // ... the filter for the Favorites we want to count
     *   }
     * })
    **/
    count<T extends FavoriteCountArgs>(
      args?: Subset<T, FavoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FavoriteAggregateArgs>(args: Subset<T, FavoriteAggregateArgs>): Prisma.PrismaPromise<GetFavoriteAggregateType<T>>

    /**
     * Group by Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FavoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavoriteGroupByArgs['orderBy'] }
        : { orderBy?: FavoriteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FavoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Favorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__FavoriteClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    workspace<T extends WorkspaceArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceArgs<ExtArgs>>): Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    page<T extends PageArgs<ExtArgs> = {}>(args?: Subset<T, PageArgs<ExtArgs>>): Prisma__PageClient<$Types.GetResult<PagePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Favorite base type for findUnique actions
   */
  export type FavoriteFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findUnique
   */
  export interface FavoriteFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends FavoriteFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Favorite findUniqueOrThrow
   */
  export type FavoriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }


  /**
   * Favorite base type for findFirst actions
   */
  export type FavoriteFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: Enumerable<FavoriteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: Enumerable<FavoriteScalarFieldEnum>
  }

  /**
   * Favorite findFirst
   */
  export interface FavoriteFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends FavoriteFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Favorite findFirstOrThrow
   */
  export type FavoriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: Enumerable<FavoriteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: Enumerable<FavoriteScalarFieldEnum>
  }


  /**
   * Favorite findMany
   */
  export type FavoriteFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorites to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: Enumerable<FavoriteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    distinct?: Enumerable<FavoriteScalarFieldEnum>
  }


  /**
   * Favorite create
   */
  export type FavoriteCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to create a Favorite.
     */
    data: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
  }


  /**
   * Favorite createMany
   */
  export type FavoriteCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Favorites.
     */
    data: Enumerable<FavoriteCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Favorite update
   */
  export type FavoriteUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to update a Favorite.
     */
    data: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
    /**
     * Choose, which Favorite to update.
     */
    where: FavoriteWhereUniqueInput
  }


  /**
   * Favorite updateMany
   */
  export type FavoriteUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Favorites.
     */
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyInput>
    /**
     * Filter which Favorites to update
     */
    where?: FavoriteWhereInput
  }


  /**
   * Favorite upsert
   */
  export type FavoriteUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The filter to search for the Favorite to update in case it exists.
     */
    where: FavoriteWhereUniqueInput
    /**
     * In case the Favorite found by the `where` argument doesn't exist, create a new Favorite with this data.
     */
    create: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
    /**
     * In case the Favorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
  }


  /**
   * Favorite delete
   */
  export type FavoriteDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter which Favorite to delete.
     */
    where: FavoriteWhereUniqueInput
  }


  /**
   * Favorite deleteMany
   */
  export type FavoriteDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorites to delete
     */
    where?: FavoriteWhereInput
  }


  /**
   * Favorite without action
   */
  export type FavoriteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FavoriteInclude<ExtArgs> | null
  }



  /**
   * Model UserOnWorkspace
   */


  export type AggregateUserOnWorkspace = {
    _count: UserOnWorkspaceCountAggregateOutputType | null
    _avg: UserOnWorkspaceAvgAggregateOutputType | null
    _sum: UserOnWorkspaceSumAggregateOutputType | null
    _min: UserOnWorkspaceMinAggregateOutputType | null
    _max: UserOnWorkspaceMaxAggregateOutputType | null
  }

  export type UserOnWorkspaceAvgAggregateOutputType = {
    role: number | null
  }

  export type UserOnWorkspaceSumAggregateOutputType = {
    role: number | null
  }

  export type UserOnWorkspaceMinAggregateOutputType = {
    id: string | null
    role: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    workspaceId: string | null
  }

  export type UserOnWorkspaceMaxAggregateOutputType = {
    id: string | null
    role: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    workspaceId: string | null
  }

  export type UserOnWorkspaceCountAggregateOutputType = {
    id: number
    role: number
    createdAt: number
    updatedAt: number
    userId: number
    workspaceId: number
    _all: number
  }


  export type UserOnWorkspaceAvgAggregateInputType = {
    role?: true
  }

  export type UserOnWorkspaceSumAggregateInputType = {
    role?: true
  }

  export type UserOnWorkspaceMinAggregateInputType = {
    id?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    workspaceId?: true
  }

  export type UserOnWorkspaceMaxAggregateInputType = {
    id?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    workspaceId?: true
  }

  export type UserOnWorkspaceCountAggregateInputType = {
    id?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    workspaceId?: true
    _all?: true
  }

  export type UserOnWorkspaceAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOnWorkspace to aggregate.
     */
    where?: UserOnWorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnWorkspaces to fetch.
     */
    orderBy?: Enumerable<UserOnWorkspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserOnWorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnWorkspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnWorkspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserOnWorkspaces
    **/
    _count?: true | UserOnWorkspaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserOnWorkspaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserOnWorkspaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserOnWorkspaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserOnWorkspaceMaxAggregateInputType
  }

  export type GetUserOnWorkspaceAggregateType<T extends UserOnWorkspaceAggregateArgs> = {
        [P in keyof T & keyof AggregateUserOnWorkspace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserOnWorkspace[P]>
      : GetScalarType<T[P], AggregateUserOnWorkspace[P]>
  }




  export type UserOnWorkspaceGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserOnWorkspaceWhereInput
    orderBy?: Enumerable<UserOnWorkspaceOrderByWithAggregationInput>
    by: UserOnWorkspaceScalarFieldEnum[]
    having?: UserOnWorkspaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserOnWorkspaceCountAggregateInputType | true
    _avg?: UserOnWorkspaceAvgAggregateInputType
    _sum?: UserOnWorkspaceSumAggregateInputType
    _min?: UserOnWorkspaceMinAggregateInputType
    _max?: UserOnWorkspaceMaxAggregateInputType
  }


  export type UserOnWorkspaceGroupByOutputType = {
    id: string
    role: number
    createdAt: Date
    updatedAt: Date
    userId: string
    workspaceId: string
    _count: UserOnWorkspaceCountAggregateOutputType | null
    _avg: UserOnWorkspaceAvgAggregateOutputType | null
    _sum: UserOnWorkspaceSumAggregateOutputType | null
    _min: UserOnWorkspaceMinAggregateOutputType | null
    _max: UserOnWorkspaceMaxAggregateOutputType | null
  }

  type GetUserOnWorkspaceGroupByPayload<T extends UserOnWorkspaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserOnWorkspaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserOnWorkspaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserOnWorkspaceGroupByOutputType[P]>
            : GetScalarType<T[P], UserOnWorkspaceGroupByOutputType[P]>
        }
      >
    >


  export type UserOnWorkspaceSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    workspaceId?: boolean
    user?: boolean | UserArgs<ExtArgs>
    workspace?: boolean | WorkspaceArgs<ExtArgs>
  }, ExtArgs["result"]["userOnWorkspace"]>

  export type UserOnWorkspaceSelectScalar = {
    id?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    workspaceId?: boolean
  }

  export type UserOnWorkspaceInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
    workspace?: boolean | WorkspaceArgs<ExtArgs>
  }


  type UserOnWorkspaceGetPayload<S extends boolean | null | undefined | UserOnWorkspaceArgs> = $Types.GetResult<UserOnWorkspacePayload, S>

  type UserOnWorkspaceCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UserOnWorkspaceFindManyArgs, 'select' | 'include'> & {
      select?: UserOnWorkspaceCountAggregateInputType | true
    }

  export interface UserOnWorkspaceDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserOnWorkspace'], meta: { name: 'UserOnWorkspace' } }
    /**
     * Find zero or one UserOnWorkspace that matches the filter.
     * @param {UserOnWorkspaceFindUniqueArgs} args - Arguments to find a UserOnWorkspace
     * @example
     * // Get one UserOnWorkspace
     * const userOnWorkspace = await prisma.userOnWorkspace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserOnWorkspaceFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserOnWorkspaceFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserOnWorkspace'> extends True ? Prisma__UserOnWorkspaceClient<$Types.GetResult<UserOnWorkspacePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__UserOnWorkspaceClient<$Types.GetResult<UserOnWorkspacePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one UserOnWorkspace that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserOnWorkspaceFindUniqueOrThrowArgs} args - Arguments to find a UserOnWorkspace
     * @example
     * // Get one UserOnWorkspace
     * const userOnWorkspace = await prisma.userOnWorkspace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserOnWorkspaceFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnWorkspaceFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserOnWorkspaceClient<$Types.GetResult<UserOnWorkspacePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first UserOnWorkspace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnWorkspaceFindFirstArgs} args - Arguments to find a UserOnWorkspace
     * @example
     * // Get one UserOnWorkspace
     * const userOnWorkspace = await prisma.userOnWorkspace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserOnWorkspaceFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserOnWorkspaceFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserOnWorkspace'> extends True ? Prisma__UserOnWorkspaceClient<$Types.GetResult<UserOnWorkspacePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__UserOnWorkspaceClient<$Types.GetResult<UserOnWorkspacePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first UserOnWorkspace that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnWorkspaceFindFirstOrThrowArgs} args - Arguments to find a UserOnWorkspace
     * @example
     * // Get one UserOnWorkspace
     * const userOnWorkspace = await prisma.userOnWorkspace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserOnWorkspaceFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnWorkspaceFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserOnWorkspaceClient<$Types.GetResult<UserOnWorkspacePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more UserOnWorkspaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnWorkspaceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserOnWorkspaces
     * const userOnWorkspaces = await prisma.userOnWorkspace.findMany()
     * 
     * // Get first 10 UserOnWorkspaces
     * const userOnWorkspaces = await prisma.userOnWorkspace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userOnWorkspaceWithIdOnly = await prisma.userOnWorkspace.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserOnWorkspaceFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnWorkspaceFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UserOnWorkspacePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a UserOnWorkspace.
     * @param {UserOnWorkspaceCreateArgs} args - Arguments to create a UserOnWorkspace.
     * @example
     * // Create one UserOnWorkspace
     * const UserOnWorkspace = await prisma.userOnWorkspace.create({
     *   data: {
     *     // ... data to create a UserOnWorkspace
     *   }
     * })
     * 
    **/
    create<T extends UserOnWorkspaceCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnWorkspaceCreateArgs<ExtArgs>>
    ): Prisma__UserOnWorkspaceClient<$Types.GetResult<UserOnWorkspacePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many UserOnWorkspaces.
     *     @param {UserOnWorkspaceCreateManyArgs} args - Arguments to create many UserOnWorkspaces.
     *     @example
     *     // Create many UserOnWorkspaces
     *     const userOnWorkspace = await prisma.userOnWorkspace.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserOnWorkspaceCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnWorkspaceCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserOnWorkspace.
     * @param {UserOnWorkspaceDeleteArgs} args - Arguments to delete one UserOnWorkspace.
     * @example
     * // Delete one UserOnWorkspace
     * const UserOnWorkspace = await prisma.userOnWorkspace.delete({
     *   where: {
     *     // ... filter to delete one UserOnWorkspace
     *   }
     * })
     * 
    **/
    delete<T extends UserOnWorkspaceDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnWorkspaceDeleteArgs<ExtArgs>>
    ): Prisma__UserOnWorkspaceClient<$Types.GetResult<UserOnWorkspacePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one UserOnWorkspace.
     * @param {UserOnWorkspaceUpdateArgs} args - Arguments to update one UserOnWorkspace.
     * @example
     * // Update one UserOnWorkspace
     * const userOnWorkspace = await prisma.userOnWorkspace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserOnWorkspaceUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnWorkspaceUpdateArgs<ExtArgs>>
    ): Prisma__UserOnWorkspaceClient<$Types.GetResult<UserOnWorkspacePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more UserOnWorkspaces.
     * @param {UserOnWorkspaceDeleteManyArgs} args - Arguments to filter UserOnWorkspaces to delete.
     * @example
     * // Delete a few UserOnWorkspaces
     * const { count } = await prisma.userOnWorkspace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserOnWorkspaceDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnWorkspaceDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserOnWorkspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnWorkspaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserOnWorkspaces
     * const userOnWorkspace = await prisma.userOnWorkspace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserOnWorkspaceUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnWorkspaceUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserOnWorkspace.
     * @param {UserOnWorkspaceUpsertArgs} args - Arguments to update or create a UserOnWorkspace.
     * @example
     * // Update or create a UserOnWorkspace
     * const userOnWorkspace = await prisma.userOnWorkspace.upsert({
     *   create: {
     *     // ... data to create a UserOnWorkspace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserOnWorkspace we want to update
     *   }
     * })
    **/
    upsert<T extends UserOnWorkspaceUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnWorkspaceUpsertArgs<ExtArgs>>
    ): Prisma__UserOnWorkspaceClient<$Types.GetResult<UserOnWorkspacePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of UserOnWorkspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnWorkspaceCountArgs} args - Arguments to filter UserOnWorkspaces to count.
     * @example
     * // Count the number of UserOnWorkspaces
     * const count = await prisma.userOnWorkspace.count({
     *   where: {
     *     // ... the filter for the UserOnWorkspaces we want to count
     *   }
     * })
    **/
    count<T extends UserOnWorkspaceCountArgs>(
      args?: Subset<T, UserOnWorkspaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserOnWorkspaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserOnWorkspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnWorkspaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserOnWorkspaceAggregateArgs>(args: Subset<T, UserOnWorkspaceAggregateArgs>): Prisma.PrismaPromise<GetUserOnWorkspaceAggregateType<T>>

    /**
     * Group by UserOnWorkspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnWorkspaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserOnWorkspaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserOnWorkspaceGroupByArgs['orderBy'] }
        : { orderBy?: UserOnWorkspaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserOnWorkspaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserOnWorkspaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for UserOnWorkspace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserOnWorkspaceClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    workspace<T extends WorkspaceArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceArgs<ExtArgs>>): Prisma__WorkspaceClient<$Types.GetResult<WorkspacePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * UserOnWorkspace base type for findUnique actions
   */
  export type UserOnWorkspaceFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnWorkspace
     */
    select?: UserOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnWorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which UserOnWorkspace to fetch.
     */
    where: UserOnWorkspaceWhereUniqueInput
  }

  /**
   * UserOnWorkspace findUnique
   */
  export interface UserOnWorkspaceFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserOnWorkspaceFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserOnWorkspace findUniqueOrThrow
   */
  export type UserOnWorkspaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnWorkspace
     */
    select?: UserOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnWorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which UserOnWorkspace to fetch.
     */
    where: UserOnWorkspaceWhereUniqueInput
  }


  /**
   * UserOnWorkspace base type for findFirst actions
   */
  export type UserOnWorkspaceFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnWorkspace
     */
    select?: UserOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnWorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which UserOnWorkspace to fetch.
     */
    where?: UserOnWorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnWorkspaces to fetch.
     */
    orderBy?: Enumerable<UserOnWorkspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOnWorkspaces.
     */
    cursor?: UserOnWorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnWorkspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnWorkspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOnWorkspaces.
     */
    distinct?: Enumerable<UserOnWorkspaceScalarFieldEnum>
  }

  /**
   * UserOnWorkspace findFirst
   */
  export interface UserOnWorkspaceFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserOnWorkspaceFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserOnWorkspace findFirstOrThrow
   */
  export type UserOnWorkspaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnWorkspace
     */
    select?: UserOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnWorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which UserOnWorkspace to fetch.
     */
    where?: UserOnWorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnWorkspaces to fetch.
     */
    orderBy?: Enumerable<UserOnWorkspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOnWorkspaces.
     */
    cursor?: UserOnWorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnWorkspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnWorkspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOnWorkspaces.
     */
    distinct?: Enumerable<UserOnWorkspaceScalarFieldEnum>
  }


  /**
   * UserOnWorkspace findMany
   */
  export type UserOnWorkspaceFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnWorkspace
     */
    select?: UserOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnWorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which UserOnWorkspaces to fetch.
     */
    where?: UserOnWorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnWorkspaces to fetch.
     */
    orderBy?: Enumerable<UserOnWorkspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserOnWorkspaces.
     */
    cursor?: UserOnWorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnWorkspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnWorkspaces.
     */
    skip?: number
    distinct?: Enumerable<UserOnWorkspaceScalarFieldEnum>
  }


  /**
   * UserOnWorkspace create
   */
  export type UserOnWorkspaceCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnWorkspace
     */
    select?: UserOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnWorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to create a UserOnWorkspace.
     */
    data: XOR<UserOnWorkspaceCreateInput, UserOnWorkspaceUncheckedCreateInput>
  }


  /**
   * UserOnWorkspace createMany
   */
  export type UserOnWorkspaceCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserOnWorkspaces.
     */
    data: Enumerable<UserOnWorkspaceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * UserOnWorkspace update
   */
  export type UserOnWorkspaceUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnWorkspace
     */
    select?: UserOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnWorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to update a UserOnWorkspace.
     */
    data: XOR<UserOnWorkspaceUpdateInput, UserOnWorkspaceUncheckedUpdateInput>
    /**
     * Choose, which UserOnWorkspace to update.
     */
    where: UserOnWorkspaceWhereUniqueInput
  }


  /**
   * UserOnWorkspace updateMany
   */
  export type UserOnWorkspaceUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserOnWorkspaces.
     */
    data: XOR<UserOnWorkspaceUpdateManyMutationInput, UserOnWorkspaceUncheckedUpdateManyInput>
    /**
     * Filter which UserOnWorkspaces to update
     */
    where?: UserOnWorkspaceWhereInput
  }


  /**
   * UserOnWorkspace upsert
   */
  export type UserOnWorkspaceUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnWorkspace
     */
    select?: UserOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnWorkspaceInclude<ExtArgs> | null
    /**
     * The filter to search for the UserOnWorkspace to update in case it exists.
     */
    where: UserOnWorkspaceWhereUniqueInput
    /**
     * In case the UserOnWorkspace found by the `where` argument doesn't exist, create a new UserOnWorkspace with this data.
     */
    create: XOR<UserOnWorkspaceCreateInput, UserOnWorkspaceUncheckedCreateInput>
    /**
     * In case the UserOnWorkspace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserOnWorkspaceUpdateInput, UserOnWorkspaceUncheckedUpdateInput>
  }


  /**
   * UserOnWorkspace delete
   */
  export type UserOnWorkspaceDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnWorkspace
     */
    select?: UserOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnWorkspaceInclude<ExtArgs> | null
    /**
     * Filter which UserOnWorkspace to delete.
     */
    where: UserOnWorkspaceWhereUniqueInput
  }


  /**
   * UserOnWorkspace deleteMany
   */
  export type UserOnWorkspaceDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOnWorkspaces to delete
     */
    where?: UserOnWorkspaceWhereInput
  }


  /**
   * UserOnWorkspace without action
   */
  export type UserOnWorkspaceArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnWorkspace
     */
    select?: UserOnWorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnWorkspaceInclude<ExtArgs> | null
  }



  /**
   * Model UserOnTeamspace
   */


  export type AggregateUserOnTeamspace = {
    _count: UserOnTeamspaceCountAggregateOutputType | null
    _avg: UserOnTeamspaceAvgAggregateOutputType | null
    _sum: UserOnTeamspaceSumAggregateOutputType | null
    _min: UserOnTeamspaceMinAggregateOutputType | null
    _max: UserOnTeamspaceMaxAggregateOutputType | null
  }

  export type UserOnTeamspaceAvgAggregateOutputType = {
    operation: number | null
  }

  export type UserOnTeamspaceSumAggregateOutputType = {
    operation: number | null
  }

  export type UserOnTeamspaceMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    operation: number | null
    userId: string | null
    teamspaceId: string | null
  }

  export type UserOnTeamspaceMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    operation: number | null
    userId: string | null
    teamspaceId: string | null
  }

  export type UserOnTeamspaceCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    operation: number
    userId: number
    teamspaceId: number
    _all: number
  }


  export type UserOnTeamspaceAvgAggregateInputType = {
    operation?: true
  }

  export type UserOnTeamspaceSumAggregateInputType = {
    operation?: true
  }

  export type UserOnTeamspaceMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    operation?: true
    userId?: true
    teamspaceId?: true
  }

  export type UserOnTeamspaceMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    operation?: true
    userId?: true
    teamspaceId?: true
  }

  export type UserOnTeamspaceCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    operation?: true
    userId?: true
    teamspaceId?: true
    _all?: true
  }

  export type UserOnTeamspaceAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOnTeamspace to aggregate.
     */
    where?: UserOnTeamspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnTeamspaces to fetch.
     */
    orderBy?: Enumerable<UserOnTeamspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserOnTeamspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnTeamspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnTeamspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserOnTeamspaces
    **/
    _count?: true | UserOnTeamspaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserOnTeamspaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserOnTeamspaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserOnTeamspaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserOnTeamspaceMaxAggregateInputType
  }

  export type GetUserOnTeamspaceAggregateType<T extends UserOnTeamspaceAggregateArgs> = {
        [P in keyof T & keyof AggregateUserOnTeamspace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserOnTeamspace[P]>
      : GetScalarType<T[P], AggregateUserOnTeamspace[P]>
  }




  export type UserOnTeamspaceGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserOnTeamspaceWhereInput
    orderBy?: Enumerable<UserOnTeamspaceOrderByWithAggregationInput>
    by: UserOnTeamspaceScalarFieldEnum[]
    having?: UserOnTeamspaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserOnTeamspaceCountAggregateInputType | true
    _avg?: UserOnTeamspaceAvgAggregateInputType
    _sum?: UserOnTeamspaceSumAggregateInputType
    _min?: UserOnTeamspaceMinAggregateInputType
    _max?: UserOnTeamspaceMaxAggregateInputType
  }


  export type UserOnTeamspaceGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    operation: number
    userId: string
    teamspaceId: string
    _count: UserOnTeamspaceCountAggregateOutputType | null
    _avg: UserOnTeamspaceAvgAggregateOutputType | null
    _sum: UserOnTeamspaceSumAggregateOutputType | null
    _min: UserOnTeamspaceMinAggregateOutputType | null
    _max: UserOnTeamspaceMaxAggregateOutputType | null
  }

  type GetUserOnTeamspaceGroupByPayload<T extends UserOnTeamspaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserOnTeamspaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserOnTeamspaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserOnTeamspaceGroupByOutputType[P]>
            : GetScalarType<T[P], UserOnTeamspaceGroupByOutputType[P]>
        }
      >
    >


  export type UserOnTeamspaceSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    operation?: boolean
    userId?: boolean
    teamspaceId?: boolean
    user?: boolean | UserArgs<ExtArgs>
    teamspace?: boolean | TeamspaceArgs<ExtArgs>
  }, ExtArgs["result"]["userOnTeamspace"]>

  export type UserOnTeamspaceSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    operation?: boolean
    userId?: boolean
    teamspaceId?: boolean
  }

  export type UserOnTeamspaceInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
    teamspace?: boolean | TeamspaceArgs<ExtArgs>
  }


  type UserOnTeamspaceGetPayload<S extends boolean | null | undefined | UserOnTeamspaceArgs> = $Types.GetResult<UserOnTeamspacePayload, S>

  type UserOnTeamspaceCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UserOnTeamspaceFindManyArgs, 'select' | 'include'> & {
      select?: UserOnTeamspaceCountAggregateInputType | true
    }

  export interface UserOnTeamspaceDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserOnTeamspace'], meta: { name: 'UserOnTeamspace' } }
    /**
     * Find zero or one UserOnTeamspace that matches the filter.
     * @param {UserOnTeamspaceFindUniqueArgs} args - Arguments to find a UserOnTeamspace
     * @example
     * // Get one UserOnTeamspace
     * const userOnTeamspace = await prisma.userOnTeamspace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserOnTeamspaceFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserOnTeamspaceFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserOnTeamspace'> extends True ? Prisma__UserOnTeamspaceClient<$Types.GetResult<UserOnTeamspacePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__UserOnTeamspaceClient<$Types.GetResult<UserOnTeamspacePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one UserOnTeamspace that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserOnTeamspaceFindUniqueOrThrowArgs} args - Arguments to find a UserOnTeamspace
     * @example
     * // Get one UserOnTeamspace
     * const userOnTeamspace = await prisma.userOnTeamspace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserOnTeamspaceFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnTeamspaceFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserOnTeamspaceClient<$Types.GetResult<UserOnTeamspacePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first UserOnTeamspace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnTeamspaceFindFirstArgs} args - Arguments to find a UserOnTeamspace
     * @example
     * // Get one UserOnTeamspace
     * const userOnTeamspace = await prisma.userOnTeamspace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserOnTeamspaceFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserOnTeamspaceFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserOnTeamspace'> extends True ? Prisma__UserOnTeamspaceClient<$Types.GetResult<UserOnTeamspacePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__UserOnTeamspaceClient<$Types.GetResult<UserOnTeamspacePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first UserOnTeamspace that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnTeamspaceFindFirstOrThrowArgs} args - Arguments to find a UserOnTeamspace
     * @example
     * // Get one UserOnTeamspace
     * const userOnTeamspace = await prisma.userOnTeamspace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserOnTeamspaceFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnTeamspaceFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserOnTeamspaceClient<$Types.GetResult<UserOnTeamspacePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more UserOnTeamspaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnTeamspaceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserOnTeamspaces
     * const userOnTeamspaces = await prisma.userOnTeamspace.findMany()
     * 
     * // Get first 10 UserOnTeamspaces
     * const userOnTeamspaces = await prisma.userOnTeamspace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userOnTeamspaceWithIdOnly = await prisma.userOnTeamspace.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserOnTeamspaceFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnTeamspaceFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UserOnTeamspacePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a UserOnTeamspace.
     * @param {UserOnTeamspaceCreateArgs} args - Arguments to create a UserOnTeamspace.
     * @example
     * // Create one UserOnTeamspace
     * const UserOnTeamspace = await prisma.userOnTeamspace.create({
     *   data: {
     *     // ... data to create a UserOnTeamspace
     *   }
     * })
     * 
    **/
    create<T extends UserOnTeamspaceCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnTeamspaceCreateArgs<ExtArgs>>
    ): Prisma__UserOnTeamspaceClient<$Types.GetResult<UserOnTeamspacePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many UserOnTeamspaces.
     *     @param {UserOnTeamspaceCreateManyArgs} args - Arguments to create many UserOnTeamspaces.
     *     @example
     *     // Create many UserOnTeamspaces
     *     const userOnTeamspace = await prisma.userOnTeamspace.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserOnTeamspaceCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnTeamspaceCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserOnTeamspace.
     * @param {UserOnTeamspaceDeleteArgs} args - Arguments to delete one UserOnTeamspace.
     * @example
     * // Delete one UserOnTeamspace
     * const UserOnTeamspace = await prisma.userOnTeamspace.delete({
     *   where: {
     *     // ... filter to delete one UserOnTeamspace
     *   }
     * })
     * 
    **/
    delete<T extends UserOnTeamspaceDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnTeamspaceDeleteArgs<ExtArgs>>
    ): Prisma__UserOnTeamspaceClient<$Types.GetResult<UserOnTeamspacePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one UserOnTeamspace.
     * @param {UserOnTeamspaceUpdateArgs} args - Arguments to update one UserOnTeamspace.
     * @example
     * // Update one UserOnTeamspace
     * const userOnTeamspace = await prisma.userOnTeamspace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserOnTeamspaceUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnTeamspaceUpdateArgs<ExtArgs>>
    ): Prisma__UserOnTeamspaceClient<$Types.GetResult<UserOnTeamspacePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more UserOnTeamspaces.
     * @param {UserOnTeamspaceDeleteManyArgs} args - Arguments to filter UserOnTeamspaces to delete.
     * @example
     * // Delete a few UserOnTeamspaces
     * const { count } = await prisma.userOnTeamspace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserOnTeamspaceDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnTeamspaceDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserOnTeamspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnTeamspaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserOnTeamspaces
     * const userOnTeamspace = await prisma.userOnTeamspace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserOnTeamspaceUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnTeamspaceUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserOnTeamspace.
     * @param {UserOnTeamspaceUpsertArgs} args - Arguments to update or create a UserOnTeamspace.
     * @example
     * // Update or create a UserOnTeamspace
     * const userOnTeamspace = await prisma.userOnTeamspace.upsert({
     *   create: {
     *     // ... data to create a UserOnTeamspace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserOnTeamspace we want to update
     *   }
     * })
    **/
    upsert<T extends UserOnTeamspaceUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnTeamspaceUpsertArgs<ExtArgs>>
    ): Prisma__UserOnTeamspaceClient<$Types.GetResult<UserOnTeamspacePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of UserOnTeamspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnTeamspaceCountArgs} args - Arguments to filter UserOnTeamspaces to count.
     * @example
     * // Count the number of UserOnTeamspaces
     * const count = await prisma.userOnTeamspace.count({
     *   where: {
     *     // ... the filter for the UserOnTeamspaces we want to count
     *   }
     * })
    **/
    count<T extends UserOnTeamspaceCountArgs>(
      args?: Subset<T, UserOnTeamspaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserOnTeamspaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserOnTeamspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnTeamspaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserOnTeamspaceAggregateArgs>(args: Subset<T, UserOnTeamspaceAggregateArgs>): Prisma.PrismaPromise<GetUserOnTeamspaceAggregateType<T>>

    /**
     * Group by UserOnTeamspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnTeamspaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserOnTeamspaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserOnTeamspaceGroupByArgs['orderBy'] }
        : { orderBy?: UserOnTeamspaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserOnTeamspaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserOnTeamspaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for UserOnTeamspace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserOnTeamspaceClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    teamspace<T extends TeamspaceArgs<ExtArgs> = {}>(args?: Subset<T, TeamspaceArgs<ExtArgs>>): Prisma__TeamspaceClient<$Types.GetResult<TeamspacePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * UserOnTeamspace base type for findUnique actions
   */
  export type UserOnTeamspaceFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnTeamspace
     */
    select?: UserOnTeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnTeamspaceInclude<ExtArgs> | null
    /**
     * Filter, which UserOnTeamspace to fetch.
     */
    where: UserOnTeamspaceWhereUniqueInput
  }

  /**
   * UserOnTeamspace findUnique
   */
  export interface UserOnTeamspaceFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserOnTeamspaceFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserOnTeamspace findUniqueOrThrow
   */
  export type UserOnTeamspaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnTeamspace
     */
    select?: UserOnTeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnTeamspaceInclude<ExtArgs> | null
    /**
     * Filter, which UserOnTeamspace to fetch.
     */
    where: UserOnTeamspaceWhereUniqueInput
  }


  /**
   * UserOnTeamspace base type for findFirst actions
   */
  export type UserOnTeamspaceFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnTeamspace
     */
    select?: UserOnTeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnTeamspaceInclude<ExtArgs> | null
    /**
     * Filter, which UserOnTeamspace to fetch.
     */
    where?: UserOnTeamspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnTeamspaces to fetch.
     */
    orderBy?: Enumerable<UserOnTeamspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOnTeamspaces.
     */
    cursor?: UserOnTeamspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnTeamspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnTeamspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOnTeamspaces.
     */
    distinct?: Enumerable<UserOnTeamspaceScalarFieldEnum>
  }

  /**
   * UserOnTeamspace findFirst
   */
  export interface UserOnTeamspaceFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserOnTeamspaceFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserOnTeamspace findFirstOrThrow
   */
  export type UserOnTeamspaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnTeamspace
     */
    select?: UserOnTeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnTeamspaceInclude<ExtArgs> | null
    /**
     * Filter, which UserOnTeamspace to fetch.
     */
    where?: UserOnTeamspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnTeamspaces to fetch.
     */
    orderBy?: Enumerable<UserOnTeamspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOnTeamspaces.
     */
    cursor?: UserOnTeamspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnTeamspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnTeamspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOnTeamspaces.
     */
    distinct?: Enumerable<UserOnTeamspaceScalarFieldEnum>
  }


  /**
   * UserOnTeamspace findMany
   */
  export type UserOnTeamspaceFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnTeamspace
     */
    select?: UserOnTeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnTeamspaceInclude<ExtArgs> | null
    /**
     * Filter, which UserOnTeamspaces to fetch.
     */
    where?: UserOnTeamspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnTeamspaces to fetch.
     */
    orderBy?: Enumerable<UserOnTeamspaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserOnTeamspaces.
     */
    cursor?: UserOnTeamspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnTeamspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnTeamspaces.
     */
    skip?: number
    distinct?: Enumerable<UserOnTeamspaceScalarFieldEnum>
  }


  /**
   * UserOnTeamspace create
   */
  export type UserOnTeamspaceCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnTeamspace
     */
    select?: UserOnTeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnTeamspaceInclude<ExtArgs> | null
    /**
     * The data needed to create a UserOnTeamspace.
     */
    data: XOR<UserOnTeamspaceCreateInput, UserOnTeamspaceUncheckedCreateInput>
  }


  /**
   * UserOnTeamspace createMany
   */
  export type UserOnTeamspaceCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserOnTeamspaces.
     */
    data: Enumerable<UserOnTeamspaceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * UserOnTeamspace update
   */
  export type UserOnTeamspaceUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnTeamspace
     */
    select?: UserOnTeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnTeamspaceInclude<ExtArgs> | null
    /**
     * The data needed to update a UserOnTeamspace.
     */
    data: XOR<UserOnTeamspaceUpdateInput, UserOnTeamspaceUncheckedUpdateInput>
    /**
     * Choose, which UserOnTeamspace to update.
     */
    where: UserOnTeamspaceWhereUniqueInput
  }


  /**
   * UserOnTeamspace updateMany
   */
  export type UserOnTeamspaceUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserOnTeamspaces.
     */
    data: XOR<UserOnTeamspaceUpdateManyMutationInput, UserOnTeamspaceUncheckedUpdateManyInput>
    /**
     * Filter which UserOnTeamspaces to update
     */
    where?: UserOnTeamspaceWhereInput
  }


  /**
   * UserOnTeamspace upsert
   */
  export type UserOnTeamspaceUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnTeamspace
     */
    select?: UserOnTeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnTeamspaceInclude<ExtArgs> | null
    /**
     * The filter to search for the UserOnTeamspace to update in case it exists.
     */
    where: UserOnTeamspaceWhereUniqueInput
    /**
     * In case the UserOnTeamspace found by the `where` argument doesn't exist, create a new UserOnTeamspace with this data.
     */
    create: XOR<UserOnTeamspaceCreateInput, UserOnTeamspaceUncheckedCreateInput>
    /**
     * In case the UserOnTeamspace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserOnTeamspaceUpdateInput, UserOnTeamspaceUncheckedUpdateInput>
  }


  /**
   * UserOnTeamspace delete
   */
  export type UserOnTeamspaceDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnTeamspace
     */
    select?: UserOnTeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnTeamspaceInclude<ExtArgs> | null
    /**
     * Filter which UserOnTeamspace to delete.
     */
    where: UserOnTeamspaceWhereUniqueInput
  }


  /**
   * UserOnTeamspace deleteMany
   */
  export type UserOnTeamspaceDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOnTeamspaces to delete
     */
    where?: UserOnTeamspaceWhereInput
  }


  /**
   * UserOnTeamspace without action
   */
  export type UserOnTeamspaceArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnTeamspace
     */
    select?: UserOnTeamspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnTeamspaceInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AccountScalarFieldEnum: {
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

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    accessToken: 'accessToken',
    expires: 'expires',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    token: 'token',
    expires: 'expires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const TrackingUserAccessOnWorkspaceScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    lastAccessPageId: 'lastAccessPageId',
    userId: 'userId',
    workspaceId: 'workspaceId'
  };

  export type TrackingUserAccessOnWorkspaceScalarFieldEnum = (typeof TrackingUserAccessOnWorkspaceScalarFieldEnum)[keyof typeof TrackingUserAccessOnWorkspaceScalarFieldEnum]


  export const WorkspaceScalarFieldEnum: {
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

  export type WorkspaceScalarFieldEnum = (typeof WorkspaceScalarFieldEnum)[keyof typeof WorkspaceScalarFieldEnum]


  export const TeamspaceScalarFieldEnum: {
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

  export type TeamspaceScalarFieldEnum = (typeof TeamspaceScalarFieldEnum)[keyof typeof TeamspaceScalarFieldEnum]


  export const PageScalarFieldEnum: {
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

  export type PageScalarFieldEnum = (typeof PageScalarFieldEnum)[keyof typeof PageScalarFieldEnum]


  export const FavoriteScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    workspaceId: 'workspaceId',
    pageId: 'pageId'
  };

  export type FavoriteScalarFieldEnum = (typeof FavoriteScalarFieldEnum)[keyof typeof FavoriteScalarFieldEnum]


  export const UserOnWorkspaceScalarFieldEnum: {
    id: 'id',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    workspaceId: 'workspaceId'
  };

  export type UserOnWorkspaceScalarFieldEnum = (typeof UserOnWorkspaceScalarFieldEnum)[keyof typeof UserOnWorkspaceScalarFieldEnum]


  export const UserOnTeamspaceScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    operation: 'operation',
    userId: 'userId',
    teamspaceId: 'teamspaceId'
  };

  export type UserOnTeamspaceScalarFieldEnum = (typeof UserOnTeamspaceScalarFieldEnum)[keyof typeof UserOnTeamspaceScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Deep Input Types
   */


  export type AccountWhereInput = {
    AND?: Enumerable<AccountWhereInput>
    OR?: Enumerable<AccountWhereInput>
    NOT?: Enumerable<AccountWhereInput>
    id?: StringFilter | string
    type?: StringFilter | string
    provider?: StringFilter | string
    providerAccountId?: StringFilter | string
    refresh_token?: StringNullableFilter | string | null
    access_token?: StringNullableFilter | string | null
    expires_at?: IntNullableFilter | number | null
    token_type?: StringNullableFilter | string | null
    scope?: StringNullableFilter | string | null
    id_token?: StringNullableFilter | string | null
    session_state?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = {
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
  }

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AccountScalarWhereWithAggregatesInput>
    OR?: Enumerable<AccountScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AccountScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    type?: StringWithAggregatesFilter | string
    provider?: StringWithAggregatesFilter | string
    providerAccountId?: StringWithAggregatesFilter | string
    refresh_token?: StringNullableWithAggregatesFilter | string | null
    access_token?: StringNullableWithAggregatesFilter | string | null
    expires_at?: IntNullableWithAggregatesFilter | number | null
    token_type?: StringNullableWithAggregatesFilter | string | null
    scope?: StringNullableWithAggregatesFilter | string | null
    id_token?: StringNullableWithAggregatesFilter | string | null
    session_state?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: StringWithAggregatesFilter | string
  }

  export type SessionWhereInput = {
    AND?: Enumerable<SessionWhereInput>
    OR?: Enumerable<SessionWhereInput>
    NOT?: Enumerable<SessionWhereInput>
    id?: StringFilter | string
    sessionToken?: StringFilter | string
    accessToken?: StringNullableFilter | string | null
    expires?: DateTimeFilter | Date | string
    userId?: StringNullableFilter | string | null
    user?: XOR<UserRelationFilter, UserWhereInput> | null
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    expires?: SortOrder
    userId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = {
    id?: string
    sessionToken?: string
  }

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    expires?: SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SessionScalarWhereWithAggregatesInput>
    OR?: Enumerable<SessionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SessionScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    sessionToken?: StringWithAggregatesFilter | string
    accessToken?: StringNullableWithAggregatesFilter | string | null
    expires?: DateTimeWithAggregatesFilter | Date | string
    userId?: StringNullableWithAggregatesFilter | string | null
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    name?: StringNullableFilter | string | null
    email?: StringNullableFilter | string | null
    emailVerified?: DateTimeNullableFilter | Date | string | null
    image?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    stripeCustomerId?: StringNullableFilter | string | null
    lastAccessWorkspaceId?: StringNullableFilter | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    userOnWorkspace?: UserOnWorkspaceListRelationFilter
    userOnTeamspace?: UserOnTeamspaceListRelationFilter
    trackingUserAccess?: TrackingUserAccessOnWorkspaceListRelationFilter
    favorites?: FavoriteListRelationFilter
    PagesCreated?: PageListRelationFilter
    PagesUpdated?: PageListRelationFilter
    PagesDeleted?: PageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    lastAccessWorkspaceId?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    userOnWorkspace?: UserOnWorkspaceOrderByRelationAggregateInput
    userOnTeamspace?: UserOnTeamspaceOrderByRelationAggregateInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceOrderByRelationAggregateInput
    favorites?: FavoriteOrderByRelationAggregateInput
    PagesCreated?: PageOrderByRelationAggregateInput
    PagesUpdated?: PageOrderByRelationAggregateInput
    PagesDeleted?: PageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    email?: string
    stripeCustomerId?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    lastAccessWorkspaceId?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringNullableWithAggregatesFilter | string | null
    email?: StringNullableWithAggregatesFilter | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter | Date | string | null
    image?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    stripeCustomerId?: StringNullableWithAggregatesFilter | string | null
    lastAccessWorkspaceId?: StringNullableWithAggregatesFilter | string | null
  }

  export type VerificationTokenWhereInput = {
    AND?: Enumerable<VerificationTokenWhereInput>
    OR?: Enumerable<VerificationTokenWhereInput>
    NOT?: Enumerable<VerificationTokenWhereInput>
    id?: StringFilter | string
    identifier?: StringFilter | string
    token?: StringFilter | string
    expires?: DateTimeFilter | Date | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = {
    id?: string
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
  }

  export type VerificationTokenOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    OR?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    NOT?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    identifier?: StringWithAggregatesFilter | string
    token?: StringWithAggregatesFilter | string
    expires?: DateTimeWithAggregatesFilter | Date | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type TrackingUserAccessOnWorkspaceWhereInput = {
    AND?: Enumerable<TrackingUserAccessOnWorkspaceWhereInput>
    OR?: Enumerable<TrackingUserAccessOnWorkspaceWhereInput>
    NOT?: Enumerable<TrackingUserAccessOnWorkspaceWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    lastAccessPageId?: StringNullableFilter | string | null
    userId?: StringFilter | string
    workspaceId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    workspace?: XOR<WorkspaceRelationFilter, WorkspaceWhereInput>
  }

  export type TrackingUserAccessOnWorkspaceOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastAccessPageId?: SortOrderInput | SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    user?: UserOrderByWithRelationInput
    workspace?: WorkspaceOrderByWithRelationInput
  }

  export type TrackingUserAccessOnWorkspaceWhereUniqueInput = {
    id?: string
    workspaceId?: string
  }

  export type TrackingUserAccessOnWorkspaceOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastAccessPageId?: SortOrderInput | SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    _count?: TrackingUserAccessOnWorkspaceCountOrderByAggregateInput
    _max?: TrackingUserAccessOnWorkspaceMaxOrderByAggregateInput
    _min?: TrackingUserAccessOnWorkspaceMinOrderByAggregateInput
  }

  export type TrackingUserAccessOnWorkspaceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TrackingUserAccessOnWorkspaceScalarWhereWithAggregatesInput>
    OR?: Enumerable<TrackingUserAccessOnWorkspaceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TrackingUserAccessOnWorkspaceScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    lastAccessPageId?: StringNullableWithAggregatesFilter | string | null
    userId?: StringWithAggregatesFilter | string
    workspaceId?: StringWithAggregatesFilter | string
  }

  export type WorkspaceWhereInput = {
    AND?: Enumerable<WorkspaceWhereInput>
    OR?: Enumerable<WorkspaceWhereInput>
    NOT?: Enumerable<WorkspaceWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    domain?: StringFilter | string
    stripeCustomerId?: StringNullableFilter | string | null
    stripeWorkspaceId?: StringNullableFilter | string | null
    stripeSubscriptionId?: StringNullableFilter | string | null
    stripePriceId?: StringNullableFilter | string | null
    stripeCurrentPeriodEnd?: DateTimeNullableFilter | Date | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    createdBy?: StringFilter | string
    trackingUserAccessOnWorkspace?: XOR<TrackingUserAccessOnWorkspaceRelationFilter, TrackingUserAccessOnWorkspaceWhereInput> | null
    userOnWorkspace?: UserOnWorkspaceListRelationFilter
    teamspaces?: TeamspaceListRelationFilter
    pages?: PageListRelationFilter
    favorites?: FavoriteListRelationFilter
  }

  export type WorkspaceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    domain?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeWorkspaceId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripePriceId?: SortOrderInput | SortOrder
    stripeCurrentPeriodEnd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceOrderByWithRelationInput
    userOnWorkspace?: UserOnWorkspaceOrderByRelationAggregateInput
    teamspaces?: TeamspaceOrderByRelationAggregateInput
    pages?: PageOrderByRelationAggregateInput
    favorites?: FavoriteOrderByRelationAggregateInput
  }

  export type WorkspaceWhereUniqueInput = {
    id?: string
    domain?: string
    stripeCustomerId?: string
    stripeWorkspaceId?: string
    stripeSubscriptionId?: string
  }

  export type WorkspaceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    domain?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeWorkspaceId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripePriceId?: SortOrderInput | SortOrder
    stripeCurrentPeriodEnd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
    _count?: WorkspaceCountOrderByAggregateInput
    _max?: WorkspaceMaxOrderByAggregateInput
    _min?: WorkspaceMinOrderByAggregateInput
  }

  export type WorkspaceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WorkspaceScalarWhereWithAggregatesInput>
    OR?: Enumerable<WorkspaceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WorkspaceScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    domain?: StringWithAggregatesFilter | string
    stripeCustomerId?: StringNullableWithAggregatesFilter | string | null
    stripeWorkspaceId?: StringNullableWithAggregatesFilter | string | null
    stripeSubscriptionId?: StringNullableWithAggregatesFilter | string | null
    stripePriceId?: StringNullableWithAggregatesFilter | string | null
    stripeCurrentPeriodEnd?: DateTimeNullableWithAggregatesFilter | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    createdBy?: StringWithAggregatesFilter | string
  }

  export type TeamspaceWhereInput = {
    AND?: Enumerable<TeamspaceWhereInput>
    OR?: Enumerable<TeamspaceWhereInput>
    NOT?: Enumerable<TeamspaceWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    description?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    isOrigin?: BoolNullableFilter | boolean | null
    archivedAt?: DateTimeNullableFilter | Date | string | null
    workspaceId?: StringNullableFilter | string | null
    createdBy?: StringFilter | string
    workspace?: XOR<WorkspaceRelationFilter, WorkspaceWhereInput> | null
    userOnTeamspace?: UserOnTeamspaceListRelationFilter
    pages?: PageListRelationFilter
  }

  export type TeamspaceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isOrigin?: SortOrderInput | SortOrder
    archivedAt?: SortOrderInput | SortOrder
    workspaceId?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    userOnTeamspace?: UserOnTeamspaceOrderByRelationAggregateInput
    pages?: PageOrderByRelationAggregateInput
  }

  export type TeamspaceWhereUniqueInput = {
    id?: string
  }

  export type TeamspaceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isOrigin?: SortOrderInput | SortOrder
    archivedAt?: SortOrderInput | SortOrder
    workspaceId?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    _count?: TeamspaceCountOrderByAggregateInput
    _max?: TeamspaceMaxOrderByAggregateInput
    _min?: TeamspaceMinOrderByAggregateInput
  }

  export type TeamspaceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TeamspaceScalarWhereWithAggregatesInput>
    OR?: Enumerable<TeamspaceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TeamspaceScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    isOrigin?: BoolNullableWithAggregatesFilter | boolean | null
    archivedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    workspaceId?: StringNullableWithAggregatesFilter | string | null
    createdBy?: StringWithAggregatesFilter | string
  }

  export type PageWhereInput = {
    AND?: Enumerable<PageWhereInput>
    OR?: Enumerable<PageWhereInput>
    NOT?: Enumerable<PageWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    content?: JsonNullableFilter
    published?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    workspaceId?: StringFilter | string
    teamspaceId?: StringNullableFilter | string | null
    createdBy?: StringFilter | string
    updatedBy?: StringFilter | string
    deletedBy?: StringNullableFilter | string | null
    workspace?: XOR<WorkspaceRelationFilter, WorkspaceWhereInput>
    teamspace?: XOR<TeamspaceRelationFilter, TeamspaceWhereInput> | null
    createdByUser?: XOR<UserRelationFilter, UserWhereInput>
    updatedByUser?: XOR<UserRelationFilter, UserWhereInput>
    deletedByUser?: XOR<UserRelationFilter, UserWhereInput> | null
    favorites?: FavoriteListRelationFilter
  }

  export type PageOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    workspaceId?: SortOrder
    teamspaceId?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedBy?: SortOrderInput | SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    teamspace?: TeamspaceOrderByWithRelationInput
    createdByUser?: UserOrderByWithRelationInput
    updatedByUser?: UserOrderByWithRelationInput
    deletedByUser?: UserOrderByWithRelationInput
    favorites?: FavoriteOrderByRelationAggregateInput
  }

  export type PageWhereUniqueInput = {
    id?: string
  }

  export type PageOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    workspaceId?: SortOrder
    teamspaceId?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedBy?: SortOrderInput | SortOrder
    _count?: PageCountOrderByAggregateInput
    _max?: PageMaxOrderByAggregateInput
    _min?: PageMinOrderByAggregateInput
  }

  export type PageScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PageScalarWhereWithAggregatesInput>
    OR?: Enumerable<PageScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PageScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    content?: JsonNullableWithAggregatesFilter
    published?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    workspaceId?: StringWithAggregatesFilter | string
    teamspaceId?: StringNullableWithAggregatesFilter | string | null
    createdBy?: StringWithAggregatesFilter | string
    updatedBy?: StringWithAggregatesFilter | string
    deletedBy?: StringNullableWithAggregatesFilter | string | null
  }

  export type FavoriteWhereInput = {
    AND?: Enumerable<FavoriteWhereInput>
    OR?: Enumerable<FavoriteWhereInput>
    NOT?: Enumerable<FavoriteWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
    workspaceId?: StringFilter | string
    pageId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    workspace?: XOR<WorkspaceRelationFilter, WorkspaceWhereInput> | null
    page?: XOR<PageRelationFilter, PageWhereInput> | null
  }

  export type FavoriteOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    pageId?: SortOrder
    user?: UserOrderByWithRelationInput
    workspace?: WorkspaceOrderByWithRelationInput
    page?: PageOrderByWithRelationInput
  }

  export type FavoriteWhereUniqueInput = {
    id?: string
  }

  export type FavoriteOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    pageId?: SortOrder
    _count?: FavoriteCountOrderByAggregateInput
    _max?: FavoriteMaxOrderByAggregateInput
    _min?: FavoriteMinOrderByAggregateInput
  }

  export type FavoriteScalarWhereWithAggregatesInput = {
    AND?: Enumerable<FavoriteScalarWhereWithAggregatesInput>
    OR?: Enumerable<FavoriteScalarWhereWithAggregatesInput>
    NOT?: Enumerable<FavoriteScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: StringWithAggregatesFilter | string
    workspaceId?: StringWithAggregatesFilter | string
    pageId?: StringWithAggregatesFilter | string
  }

  export type UserOnWorkspaceWhereInput = {
    AND?: Enumerable<UserOnWorkspaceWhereInput>
    OR?: Enumerable<UserOnWorkspaceWhereInput>
    NOT?: Enumerable<UserOnWorkspaceWhereInput>
    id?: StringFilter | string
    role?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
    workspaceId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    workspace?: XOR<WorkspaceRelationFilter, WorkspaceWhereInput>
  }

  export type UserOnWorkspaceOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    user?: UserOrderByWithRelationInput
    workspace?: WorkspaceOrderByWithRelationInput
  }

  export type UserOnWorkspaceWhereUniqueInput = {
    id?: string
  }

  export type UserOnWorkspaceOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    _count?: UserOnWorkspaceCountOrderByAggregateInput
    _avg?: UserOnWorkspaceAvgOrderByAggregateInput
    _max?: UserOnWorkspaceMaxOrderByAggregateInput
    _min?: UserOnWorkspaceMinOrderByAggregateInput
    _sum?: UserOnWorkspaceSumOrderByAggregateInput
  }

  export type UserOnWorkspaceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserOnWorkspaceScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserOnWorkspaceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserOnWorkspaceScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    role?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: StringWithAggregatesFilter | string
    workspaceId?: StringWithAggregatesFilter | string
  }

  export type UserOnTeamspaceWhereInput = {
    AND?: Enumerable<UserOnTeamspaceWhereInput>
    OR?: Enumerable<UserOnTeamspaceWhereInput>
    NOT?: Enumerable<UserOnTeamspaceWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    operation?: IntFilter | number
    userId?: StringFilter | string
    teamspaceId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    teamspace?: XOR<TeamspaceRelationFilter, TeamspaceWhereInput>
  }

  export type UserOnTeamspaceOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    operation?: SortOrder
    userId?: SortOrder
    teamspaceId?: SortOrder
    user?: UserOrderByWithRelationInput
    teamspace?: TeamspaceOrderByWithRelationInput
  }

  export type UserOnTeamspaceWhereUniqueInput = {
    id?: string
  }

  export type UserOnTeamspaceOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    operation?: SortOrder
    userId?: SortOrder
    teamspaceId?: SortOrder
    _count?: UserOnTeamspaceCountOrderByAggregateInput
    _avg?: UserOnTeamspaceAvgOrderByAggregateInput
    _max?: UserOnTeamspaceMaxOrderByAggregateInput
    _min?: UserOnTeamspaceMinOrderByAggregateInput
    _sum?: UserOnTeamspaceSumOrderByAggregateInput
  }

  export type UserOnTeamspaceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserOnTeamspaceScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserOnTeamspaceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserOnTeamspaceScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    operation?: IntWithAggregatesFilter | number
    userId?: StringWithAggregatesFilter | string
    teamspaceId?: StringWithAggregatesFilter | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateManyInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    accessToken?: string | null
    expires: Date | string
    user?: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    accessToken?: string | null
    expires: Date | string
    userId?: string | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    accessToken?: string | null
    expires: Date | string
    userId?: string | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    PagesCreated?: PageCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceUncheckedCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    PagesCreated?: PageUncheckedCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageUncheckedCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageUncheckedCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUpdateManyWithoutDeletedByUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUncheckedUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUncheckedUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUncheckedUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUncheckedUpdateManyWithoutDeletedByUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VerificationTokenCreateInput = {
    id?: string
    identifier: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    id?: string
    identifier: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    id?: string
    identifier: string
    token: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingUserAccessOnWorkspaceCreateInput = {
    id?: string
    createdAt?: Date | string
    lastAccessPageId?: string | null
    user: UserCreateNestedOneWithoutTrackingUserAccessInput
    workspace: WorkspaceCreateNestedOneWithoutTrackingUserAccessOnWorkspaceInput
  }

  export type TrackingUserAccessOnWorkspaceUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    lastAccessPageId?: string | null
    userId: string
    workspaceId: string
  }

  export type TrackingUserAccessOnWorkspaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessPageId?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutTrackingUserAccessNestedInput
    workspace?: WorkspaceUpdateOneRequiredWithoutTrackingUserAccessOnWorkspaceNestedInput
  }

  export type TrackingUserAccessOnWorkspaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessPageId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
  }

  export type TrackingUserAccessOnWorkspaceCreateManyInput = {
    id?: string
    createdAt?: Date | string
    lastAccessPageId?: string | null
    userId: string
    workspaceId: string
  }

  export type TrackingUserAccessOnWorkspaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessPageId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TrackingUserAccessOnWorkspaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessPageId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
  }

  export type WorkspaceCreateInput = {
    id?: string
    name: string
    domain: string
    stripeCustomerId?: string | null
    stripeWorkspaceId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceCreateNestedOneWithoutWorkspaceInput
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutWorkspaceInput
    teamspaces?: TeamspaceCreateNestedManyWithoutWorkspaceInput
    pages?: PageCreateNestedManyWithoutWorkspaceInput
    favorites?: FavoriteCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateInput = {
    id?: string
    name: string
    domain: string
    stripeCustomerId?: string | null
    stripeWorkspaceId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedOneWithoutWorkspaceInput
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutWorkspaceInput
    teamspaces?: TeamspaceUncheckedCreateNestedManyWithoutWorkspaceInput
    pages?: PageUncheckedCreateNestedManyWithoutWorkspaceInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUpdateOneWithoutWorkspaceNestedInput
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutWorkspaceNestedInput
    teamspaces?: TeamspaceUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUpdateManyWithoutWorkspaceNestedInput
    favorites?: FavoriteUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUncheckedUpdateOneWithoutWorkspaceNestedInput
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutWorkspaceNestedInput
    teamspaces?: TeamspaceUncheckedUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUncheckedUpdateManyWithoutWorkspaceNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceCreateManyInput = {
    id?: string
    name: string
    domain: string
    stripeCustomerId?: string | null
    stripeWorkspaceId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
  }

  export type WorkspaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type WorkspaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type TeamspaceCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isOrigin?: boolean | null
    archivedAt?: Date | string | null
    createdBy: string
    workspace?: WorkspaceCreateNestedOneWithoutTeamspacesInput
    userOnTeamspace?: UserOnTeamspaceCreateNestedManyWithoutTeamspaceInput
    pages?: PageCreateNestedManyWithoutTeamspaceInput
  }

  export type TeamspaceUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isOrigin?: boolean | null
    archivedAt?: Date | string | null
    workspaceId?: string | null
    createdBy: string
    userOnTeamspace?: UserOnTeamspaceUncheckedCreateNestedManyWithoutTeamspaceInput
    pages?: PageUncheckedCreateNestedManyWithoutTeamspaceInput
  }

  export type TeamspaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isOrigin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    workspace?: WorkspaceUpdateOneWithoutTeamspacesNestedInput
    userOnTeamspace?: UserOnTeamspaceUpdateManyWithoutTeamspaceNestedInput
    pages?: PageUpdateManyWithoutTeamspaceNestedInput
  }

  export type TeamspaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isOrigin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    userOnTeamspace?: UserOnTeamspaceUncheckedUpdateManyWithoutTeamspaceNestedInput
    pages?: PageUncheckedUpdateManyWithoutTeamspaceNestedInput
  }

  export type TeamspaceCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isOrigin?: boolean | null
    archivedAt?: Date | string | null
    workspaceId?: string | null
    createdBy: string
  }

  export type TeamspaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isOrigin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type TeamspaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isOrigin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type PageCreateInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspace: WorkspaceCreateNestedOneWithoutPagesInput
    teamspace?: TeamspaceCreateNestedOneWithoutPagesInput
    createdByUser: UserCreateNestedOneWithoutPagesCreatedInput
    updatedByUser: UserCreateNestedOneWithoutPagesUpdatedInput
    deletedByUser?: UserCreateNestedOneWithoutPagesDeletedInput
    favorites?: FavoriteCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspaceId: string
    teamspaceId?: string | null
    createdBy: string
    updatedBy: string
    deletedBy?: string | null
    favorites?: FavoriteUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutPagesNestedInput
    teamspace?: TeamspaceUpdateOneWithoutPagesNestedInput
    createdByUser?: UserUpdateOneRequiredWithoutPagesCreatedNestedInput
    updatedByUser?: UserUpdateOneRequiredWithoutPagesUpdatedNestedInput
    deletedByUser?: UserUpdateOneWithoutPagesDeletedNestedInput
    favorites?: FavoriteUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    teamspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    favorites?: FavoriteUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageCreateManyInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspaceId: string
    teamspaceId?: string | null
    createdBy: string
    updatedBy: string
    deletedBy?: string | null
  }

  export type PageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    teamspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FavoriteCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
    workspace?: WorkspaceCreateNestedOneWithoutFavoritesInput
    page?: PageCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    workspaceId: string
    pageId: string
  }

  export type FavoriteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
    workspace?: WorkspaceUpdateOneWithoutFavoritesNestedInput
    page?: PageUpdateOneWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type FavoriteCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    workspaceId: string
    pageId: string
  }

  export type FavoriteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type UserOnWorkspaceCreateInput = {
    id?: string
    role?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserOnWorkspaceInput
    workspace: WorkspaceCreateNestedOneWithoutUserOnWorkspaceInput
  }

  export type UserOnWorkspaceUncheckedCreateInput = {
    id?: string
    role?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    workspaceId: string
  }

  export type UserOnWorkspaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserOnWorkspaceNestedInput
    workspace?: WorkspaceUpdateOneRequiredWithoutUserOnWorkspaceNestedInput
  }

  export type UserOnWorkspaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
  }

  export type UserOnWorkspaceCreateManyInput = {
    id?: string
    role?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    workspaceId: string
  }

  export type UserOnWorkspaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOnWorkspaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
  }

  export type UserOnTeamspaceCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    operation?: number
    user: UserCreateNestedOneWithoutUserOnTeamspaceInput
    teamspace: TeamspaceCreateNestedOneWithoutUserOnTeamspaceInput
  }

  export type UserOnTeamspaceUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    operation?: number
    userId: string
    teamspaceId: string
  }

  export type UserOnTeamspaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operation?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutUserOnTeamspaceNestedInput
    teamspace?: TeamspaceUpdateOneRequiredWithoutUserOnTeamspaceNestedInput
  }

  export type UserOnTeamspaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operation?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    teamspaceId?: StringFieldUpdateOperationsInput | string
  }

  export type UserOnTeamspaceCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    operation?: number
    userId: string
    teamspaceId: string
  }

  export type UserOnTeamspaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operation?: IntFieldUpdateOperationsInput | number
  }

  export type UserOnTeamspaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operation?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    teamspaceId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type UserRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    accessToken?: SortOrder
    expires?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    accessToken?: SortOrder
    expires?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    accessToken?: SortOrder
    expires?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type UserOnWorkspaceListRelationFilter = {
    every?: UserOnWorkspaceWhereInput
    some?: UserOnWorkspaceWhereInput
    none?: UserOnWorkspaceWhereInput
  }

  export type UserOnTeamspaceListRelationFilter = {
    every?: UserOnTeamspaceWhereInput
    some?: UserOnTeamspaceWhereInput
    none?: UserOnTeamspaceWhereInput
  }

  export type TrackingUserAccessOnWorkspaceListRelationFilter = {
    every?: TrackingUserAccessOnWorkspaceWhereInput
    some?: TrackingUserAccessOnWorkspaceWhereInput
    none?: TrackingUserAccessOnWorkspaceWhereInput
  }

  export type FavoriteListRelationFilter = {
    every?: FavoriteWhereInput
    some?: FavoriteWhereInput
    none?: FavoriteWhereInput
  }

  export type PageListRelationFilter = {
    every?: PageWhereInput
    some?: PageWhereInput
    none?: PageWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOnWorkspaceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOnTeamspaceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrackingUserAccessOnWorkspaceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FavoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stripeCustomerId?: SortOrder
    lastAccessWorkspaceId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stripeCustomerId?: SortOrder
    lastAccessWorkspaceId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stripeCustomerId?: SortOrder
    lastAccessWorkspaceId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkspaceRelationFilter = {
    is?: WorkspaceWhereInput | null
    isNot?: WorkspaceWhereInput | null
  }

  export type TrackingUserAccessOnWorkspaceCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastAccessPageId?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
  }

  export type TrackingUserAccessOnWorkspaceMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastAccessPageId?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
  }

  export type TrackingUserAccessOnWorkspaceMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    lastAccessPageId?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
  }

  export type TrackingUserAccessOnWorkspaceRelationFilter = {
    is?: TrackingUserAccessOnWorkspaceWhereInput | null
    isNot?: TrackingUserAccessOnWorkspaceWhereInput | null
  }

  export type TeamspaceListRelationFilter = {
    every?: TeamspaceWhereInput
    some?: TeamspaceWhereInput
    none?: TeamspaceWhereInput
  }

  export type TeamspaceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkspaceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    domain?: SortOrder
    stripeCustomerId?: SortOrder
    stripeWorkspaceId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    stripeCurrentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
  }

  export type WorkspaceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    domain?: SortOrder
    stripeCustomerId?: SortOrder
    stripeWorkspaceId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    stripeCurrentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
  }

  export type WorkspaceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    domain?: SortOrder
    stripeCustomerId?: SortOrder
    stripeWorkspaceId?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    stripeCurrentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: SortOrder
  }

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type TeamspaceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isOrigin?: SortOrder
    archivedAt?: SortOrder
    workspaceId?: SortOrder
    createdBy?: SortOrder
  }

  export type TeamspaceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isOrigin?: SortOrder
    archivedAt?: SortOrder
    workspaceId?: SortOrder
    createdBy?: SortOrder
  }

  export type TeamspaceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isOrigin?: SortOrder
    archivedAt?: SortOrder
    workspaceId?: SortOrder
    createdBy?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }
  export type JsonNullableFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase>, Exclude<keyof Required<JsonNullableFilterBase>, 'path'>>,
        Required<JsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase>, 'path'>>

  export type JsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type TeamspaceRelationFilter = {
    is?: TeamspaceWhereInput | null
    isNot?: TeamspaceWhereInput | null
  }

  export type PageCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    workspaceId?: SortOrder
    teamspaceId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedBy?: SortOrder
  }

  export type PageMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    workspaceId?: SortOrder
    teamspaceId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedBy?: SortOrder
  }

  export type PageMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    workspaceId?: SortOrder
    teamspaceId?: SortOrder
    createdBy?: SortOrder
    updatedBy?: SortOrder
    deletedBy?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntNullableFilter
    _min?: NestedJsonNullableFilter
    _max?: NestedJsonNullableFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type PageRelationFilter = {
    is?: PageWhereInput | null
    isNot?: PageWhereInput | null
  }

  export type FavoriteCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    pageId?: SortOrder
  }

  export type FavoriteMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    pageId?: SortOrder
  }

  export type FavoriteMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
    pageId?: SortOrder
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type UserOnWorkspaceCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
  }

  export type UserOnWorkspaceAvgOrderByAggregateInput = {
    role?: SortOrder
  }

  export type UserOnWorkspaceMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
  }

  export type UserOnWorkspaceMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    workspaceId?: SortOrder
  }

  export type UserOnWorkspaceSumOrderByAggregateInput = {
    role?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type UserOnTeamspaceCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    operation?: SortOrder
    userId?: SortOrder
    teamspaceId?: SortOrder
  }

  export type UserOnTeamspaceAvgOrderByAggregateInput = {
    operation?: SortOrder
  }

  export type UserOnTeamspaceMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    operation?: SortOrder
    userId?: SortOrder
    teamspaceId?: SortOrder
  }

  export type UserOnTeamspaceMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    operation?: SortOrder
    userId?: SortOrder
    teamspaceId?: SortOrder
  }

  export type UserOnTeamspaceSumOrderByAggregateInput = {
    operation?: SortOrder
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type UserOnWorkspaceCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<UserOnWorkspaceCreateWithoutUserInput>, Enumerable<UserOnWorkspaceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserOnWorkspaceCreateOrConnectWithoutUserInput>
    createMany?: UserOnWorkspaceCreateManyUserInputEnvelope
    connect?: Enumerable<UserOnWorkspaceWhereUniqueInput>
  }

  export type UserOnTeamspaceCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<UserOnTeamspaceCreateWithoutUserInput>, Enumerable<UserOnTeamspaceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserOnTeamspaceCreateOrConnectWithoutUserInput>
    createMany?: UserOnTeamspaceCreateManyUserInputEnvelope
    connect?: Enumerable<UserOnTeamspaceWhereUniqueInput>
  }

  export type TrackingUserAccessOnWorkspaceCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TrackingUserAccessOnWorkspaceCreateWithoutUserInput>, Enumerable<TrackingUserAccessOnWorkspaceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TrackingUserAccessOnWorkspaceCreateOrConnectWithoutUserInput>
    createMany?: TrackingUserAccessOnWorkspaceCreateManyUserInputEnvelope
    connect?: Enumerable<TrackingUserAccessOnWorkspaceWhereUniqueInput>
  }

  export type FavoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<FavoriteCreateWithoutUserInput>, Enumerable<FavoriteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<FavoriteCreateOrConnectWithoutUserInput>
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: Enumerable<FavoriteWhereUniqueInput>
  }

  export type PageCreateNestedManyWithoutCreatedByUserInput = {
    create?: XOR<Enumerable<PageCreateWithoutCreatedByUserInput>, Enumerable<PageUncheckedCreateWithoutCreatedByUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutCreatedByUserInput>
    createMany?: PageCreateManyCreatedByUserInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type PageCreateNestedManyWithoutUpdatedByUserInput = {
    create?: XOR<Enumerable<PageCreateWithoutUpdatedByUserInput>, Enumerable<PageUncheckedCreateWithoutUpdatedByUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutUpdatedByUserInput>
    createMany?: PageCreateManyUpdatedByUserInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type PageCreateNestedManyWithoutDeletedByUserInput = {
    create?: XOR<Enumerable<PageCreateWithoutDeletedByUserInput>, Enumerable<PageUncheckedCreateWithoutDeletedByUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutDeletedByUserInput>
    createMany?: PageCreateManyDeletedByUserInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type UserOnWorkspaceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<UserOnWorkspaceCreateWithoutUserInput>, Enumerable<UserOnWorkspaceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserOnWorkspaceCreateOrConnectWithoutUserInput>
    createMany?: UserOnWorkspaceCreateManyUserInputEnvelope
    connect?: Enumerable<UserOnWorkspaceWhereUniqueInput>
  }

  export type UserOnTeamspaceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<UserOnTeamspaceCreateWithoutUserInput>, Enumerable<UserOnTeamspaceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserOnTeamspaceCreateOrConnectWithoutUserInput>
    createMany?: UserOnTeamspaceCreateManyUserInputEnvelope
    connect?: Enumerable<UserOnTeamspaceWhereUniqueInput>
  }

  export type TrackingUserAccessOnWorkspaceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TrackingUserAccessOnWorkspaceCreateWithoutUserInput>, Enumerable<TrackingUserAccessOnWorkspaceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TrackingUserAccessOnWorkspaceCreateOrConnectWithoutUserInput>
    createMany?: TrackingUserAccessOnWorkspaceCreateManyUserInputEnvelope
    connect?: Enumerable<TrackingUserAccessOnWorkspaceWhereUniqueInput>
  }

  export type FavoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<FavoriteCreateWithoutUserInput>, Enumerable<FavoriteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<FavoriteCreateOrConnectWithoutUserInput>
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: Enumerable<FavoriteWhereUniqueInput>
  }

  export type PageUncheckedCreateNestedManyWithoutCreatedByUserInput = {
    create?: XOR<Enumerable<PageCreateWithoutCreatedByUserInput>, Enumerable<PageUncheckedCreateWithoutCreatedByUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutCreatedByUserInput>
    createMany?: PageCreateManyCreatedByUserInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type PageUncheckedCreateNestedManyWithoutUpdatedByUserInput = {
    create?: XOR<Enumerable<PageCreateWithoutUpdatedByUserInput>, Enumerable<PageUncheckedCreateWithoutUpdatedByUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutUpdatedByUserInput>
    createMany?: PageCreateManyUpdatedByUserInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type PageUncheckedCreateNestedManyWithoutDeletedByUserInput = {
    create?: XOR<Enumerable<PageCreateWithoutDeletedByUserInput>, Enumerable<PageUncheckedCreateWithoutDeletedByUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutDeletedByUserInput>
    createMany?: PageCreateManyDeletedByUserInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccountUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    set?: Enumerable<AccountWhereUniqueInput>
    disconnect?: Enumerable<AccountWhereUniqueInput>
    delete?: Enumerable<AccountWhereUniqueInput>
    connect?: Enumerable<AccountWhereUniqueInput>
    update?: Enumerable<AccountUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccountUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccountScalarWhereInput>
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    connect?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type UserOnWorkspaceUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<UserOnWorkspaceCreateWithoutUserInput>, Enumerable<UserOnWorkspaceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserOnWorkspaceCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<UserOnWorkspaceUpsertWithWhereUniqueWithoutUserInput>
    createMany?: UserOnWorkspaceCreateManyUserInputEnvelope
    set?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    disconnect?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    delete?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    connect?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    update?: Enumerable<UserOnWorkspaceUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<UserOnWorkspaceUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<UserOnWorkspaceScalarWhereInput>
  }

  export type UserOnTeamspaceUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<UserOnTeamspaceCreateWithoutUserInput>, Enumerable<UserOnTeamspaceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserOnTeamspaceCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<UserOnTeamspaceUpsertWithWhereUniqueWithoutUserInput>
    createMany?: UserOnTeamspaceCreateManyUserInputEnvelope
    set?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    disconnect?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    delete?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    connect?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    update?: Enumerable<UserOnTeamspaceUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<UserOnTeamspaceUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<UserOnTeamspaceScalarWhereInput>
  }

  export type TrackingUserAccessOnWorkspaceUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<TrackingUserAccessOnWorkspaceCreateWithoutUserInput>, Enumerable<TrackingUserAccessOnWorkspaceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TrackingUserAccessOnWorkspaceCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<TrackingUserAccessOnWorkspaceUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TrackingUserAccessOnWorkspaceCreateManyUserInputEnvelope
    set?: Enumerable<TrackingUserAccessOnWorkspaceWhereUniqueInput>
    disconnect?: Enumerable<TrackingUserAccessOnWorkspaceWhereUniqueInput>
    delete?: Enumerable<TrackingUserAccessOnWorkspaceWhereUniqueInput>
    connect?: Enumerable<TrackingUserAccessOnWorkspaceWhereUniqueInput>
    update?: Enumerable<TrackingUserAccessOnWorkspaceUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TrackingUserAccessOnWorkspaceUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TrackingUserAccessOnWorkspaceScalarWhereInput>
  }

  export type FavoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<FavoriteCreateWithoutUserInput>, Enumerable<FavoriteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<FavoriteCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<FavoriteUpsertWithWhereUniqueWithoutUserInput>
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: Enumerable<FavoriteWhereUniqueInput>
    disconnect?: Enumerable<FavoriteWhereUniqueInput>
    delete?: Enumerable<FavoriteWhereUniqueInput>
    connect?: Enumerable<FavoriteWhereUniqueInput>
    update?: Enumerable<FavoriteUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<FavoriteUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<FavoriteScalarWhereInput>
  }

  export type PageUpdateManyWithoutCreatedByUserNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutCreatedByUserInput>, Enumerable<PageUncheckedCreateWithoutCreatedByUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutCreatedByUserInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutCreatedByUserInput>
    createMany?: PageCreateManyCreatedByUserInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutCreatedByUserInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutCreatedByUserInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type PageUpdateManyWithoutUpdatedByUserNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutUpdatedByUserInput>, Enumerable<PageUncheckedCreateWithoutUpdatedByUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutUpdatedByUserInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutUpdatedByUserInput>
    createMany?: PageCreateManyUpdatedByUserInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutUpdatedByUserInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutUpdatedByUserInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type PageUpdateManyWithoutDeletedByUserNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutDeletedByUserInput>, Enumerable<PageUncheckedCreateWithoutDeletedByUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutDeletedByUserInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutDeletedByUserInput>
    createMany?: PageCreateManyDeletedByUserInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutDeletedByUserInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutDeletedByUserInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccountUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    set?: Enumerable<AccountWhereUniqueInput>
    disconnect?: Enumerable<AccountWhereUniqueInput>
    delete?: Enumerable<AccountWhereUniqueInput>
    connect?: Enumerable<AccountWhereUniqueInput>
    update?: Enumerable<AccountUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccountUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccountScalarWhereInput>
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    connect?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type UserOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<UserOnWorkspaceCreateWithoutUserInput>, Enumerable<UserOnWorkspaceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserOnWorkspaceCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<UserOnWorkspaceUpsertWithWhereUniqueWithoutUserInput>
    createMany?: UserOnWorkspaceCreateManyUserInputEnvelope
    set?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    disconnect?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    delete?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    connect?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    update?: Enumerable<UserOnWorkspaceUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<UserOnWorkspaceUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<UserOnWorkspaceScalarWhereInput>
  }

  export type UserOnTeamspaceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<UserOnTeamspaceCreateWithoutUserInput>, Enumerable<UserOnTeamspaceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserOnTeamspaceCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<UserOnTeamspaceUpsertWithWhereUniqueWithoutUserInput>
    createMany?: UserOnTeamspaceCreateManyUserInputEnvelope
    set?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    disconnect?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    delete?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    connect?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    update?: Enumerable<UserOnTeamspaceUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<UserOnTeamspaceUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<UserOnTeamspaceScalarWhereInput>
  }

  export type TrackingUserAccessOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<TrackingUserAccessOnWorkspaceCreateWithoutUserInput>, Enumerable<TrackingUserAccessOnWorkspaceUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TrackingUserAccessOnWorkspaceCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<TrackingUserAccessOnWorkspaceUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TrackingUserAccessOnWorkspaceCreateManyUserInputEnvelope
    set?: Enumerable<TrackingUserAccessOnWorkspaceWhereUniqueInput>
    disconnect?: Enumerable<TrackingUserAccessOnWorkspaceWhereUniqueInput>
    delete?: Enumerable<TrackingUserAccessOnWorkspaceWhereUniqueInput>
    connect?: Enumerable<TrackingUserAccessOnWorkspaceWhereUniqueInput>
    update?: Enumerable<TrackingUserAccessOnWorkspaceUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TrackingUserAccessOnWorkspaceUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TrackingUserAccessOnWorkspaceScalarWhereInput>
  }

  export type FavoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<FavoriteCreateWithoutUserInput>, Enumerable<FavoriteUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<FavoriteCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<FavoriteUpsertWithWhereUniqueWithoutUserInput>
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: Enumerable<FavoriteWhereUniqueInput>
    disconnect?: Enumerable<FavoriteWhereUniqueInput>
    delete?: Enumerable<FavoriteWhereUniqueInput>
    connect?: Enumerable<FavoriteWhereUniqueInput>
    update?: Enumerable<FavoriteUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<FavoriteUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<FavoriteScalarWhereInput>
  }

  export type PageUncheckedUpdateManyWithoutCreatedByUserNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutCreatedByUserInput>, Enumerable<PageUncheckedCreateWithoutCreatedByUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutCreatedByUserInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutCreatedByUserInput>
    createMany?: PageCreateManyCreatedByUserInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutCreatedByUserInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutCreatedByUserInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type PageUncheckedUpdateManyWithoutUpdatedByUserNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutUpdatedByUserInput>, Enumerable<PageUncheckedCreateWithoutUpdatedByUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutUpdatedByUserInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutUpdatedByUserInput>
    createMany?: PageCreateManyUpdatedByUserInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutUpdatedByUserInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutUpdatedByUserInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type PageUncheckedUpdateManyWithoutDeletedByUserNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutDeletedByUserInput>, Enumerable<PageUncheckedCreateWithoutDeletedByUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutDeletedByUserInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutDeletedByUserInput>
    createMany?: PageCreateManyDeletedByUserInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutDeletedByUserInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutDeletedByUserInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutTrackingUserAccessInput = {
    create?: XOR<UserCreateWithoutTrackingUserAccessInput, UserUncheckedCreateWithoutTrackingUserAccessInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrackingUserAccessInput
    connect?: UserWhereUniqueInput
  }

  export type WorkspaceCreateNestedOneWithoutTrackingUserAccessOnWorkspaceInput = {
    create?: XOR<WorkspaceCreateWithoutTrackingUserAccessOnWorkspaceInput, WorkspaceUncheckedCreateWithoutTrackingUserAccessOnWorkspaceInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutTrackingUserAccessOnWorkspaceInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTrackingUserAccessNestedInput = {
    create?: XOR<UserCreateWithoutTrackingUserAccessInput, UserUncheckedCreateWithoutTrackingUserAccessInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrackingUserAccessInput
    upsert?: UserUpsertWithoutTrackingUserAccessInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutTrackingUserAccessInput, UserUncheckedUpdateWithoutTrackingUserAccessInput>
  }

  export type WorkspaceUpdateOneRequiredWithoutTrackingUserAccessOnWorkspaceNestedInput = {
    create?: XOR<WorkspaceCreateWithoutTrackingUserAccessOnWorkspaceInput, WorkspaceUncheckedCreateWithoutTrackingUserAccessOnWorkspaceInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutTrackingUserAccessOnWorkspaceInput
    upsert?: WorkspaceUpsertWithoutTrackingUserAccessOnWorkspaceInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<WorkspaceUpdateWithoutTrackingUserAccessOnWorkspaceInput, WorkspaceUncheckedUpdateWithoutTrackingUserAccessOnWorkspaceInput>
  }

  export type TrackingUserAccessOnWorkspaceCreateNestedOneWithoutWorkspaceInput = {
    create?: XOR<TrackingUserAccessOnWorkspaceCreateWithoutWorkspaceInput, TrackingUserAccessOnWorkspaceUncheckedCreateWithoutWorkspaceInput>
    connectOrCreate?: TrackingUserAccessOnWorkspaceCreateOrConnectWithoutWorkspaceInput
    connect?: TrackingUserAccessOnWorkspaceWhereUniqueInput
  }

  export type UserOnWorkspaceCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<Enumerable<UserOnWorkspaceCreateWithoutWorkspaceInput>, Enumerable<UserOnWorkspaceUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<UserOnWorkspaceCreateOrConnectWithoutWorkspaceInput>
    createMany?: UserOnWorkspaceCreateManyWorkspaceInputEnvelope
    connect?: Enumerable<UserOnWorkspaceWhereUniqueInput>
  }

  export type TeamspaceCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<Enumerable<TeamspaceCreateWithoutWorkspaceInput>, Enumerable<TeamspaceUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<TeamspaceCreateOrConnectWithoutWorkspaceInput>
    createMany?: TeamspaceCreateManyWorkspaceInputEnvelope
    connect?: Enumerable<TeamspaceWhereUniqueInput>
  }

  export type PageCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<Enumerable<PageCreateWithoutWorkspaceInput>, Enumerable<PageUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutWorkspaceInput>
    createMany?: PageCreateManyWorkspaceInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type FavoriteCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<Enumerable<FavoriteCreateWithoutWorkspaceInput>, Enumerable<FavoriteUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<FavoriteCreateOrConnectWithoutWorkspaceInput>
    createMany?: FavoriteCreateManyWorkspaceInputEnvelope
    connect?: Enumerable<FavoriteWhereUniqueInput>
  }

  export type TrackingUserAccessOnWorkspaceUncheckedCreateNestedOneWithoutWorkspaceInput = {
    create?: XOR<TrackingUserAccessOnWorkspaceCreateWithoutWorkspaceInput, TrackingUserAccessOnWorkspaceUncheckedCreateWithoutWorkspaceInput>
    connectOrCreate?: TrackingUserAccessOnWorkspaceCreateOrConnectWithoutWorkspaceInput
    connect?: TrackingUserAccessOnWorkspaceWhereUniqueInput
  }

  export type UserOnWorkspaceUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<Enumerable<UserOnWorkspaceCreateWithoutWorkspaceInput>, Enumerable<UserOnWorkspaceUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<UserOnWorkspaceCreateOrConnectWithoutWorkspaceInput>
    createMany?: UserOnWorkspaceCreateManyWorkspaceInputEnvelope
    connect?: Enumerable<UserOnWorkspaceWhereUniqueInput>
  }

  export type TeamspaceUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<Enumerable<TeamspaceCreateWithoutWorkspaceInput>, Enumerable<TeamspaceUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<TeamspaceCreateOrConnectWithoutWorkspaceInput>
    createMany?: TeamspaceCreateManyWorkspaceInputEnvelope
    connect?: Enumerable<TeamspaceWhereUniqueInput>
  }

  export type PageUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<Enumerable<PageCreateWithoutWorkspaceInput>, Enumerable<PageUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutWorkspaceInput>
    createMany?: PageCreateManyWorkspaceInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type FavoriteUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<Enumerable<FavoriteCreateWithoutWorkspaceInput>, Enumerable<FavoriteUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<FavoriteCreateOrConnectWithoutWorkspaceInput>
    createMany?: FavoriteCreateManyWorkspaceInputEnvelope
    connect?: Enumerable<FavoriteWhereUniqueInput>
  }

  export type TrackingUserAccessOnWorkspaceUpdateOneWithoutWorkspaceNestedInput = {
    create?: XOR<TrackingUserAccessOnWorkspaceCreateWithoutWorkspaceInput, TrackingUserAccessOnWorkspaceUncheckedCreateWithoutWorkspaceInput>
    connectOrCreate?: TrackingUserAccessOnWorkspaceCreateOrConnectWithoutWorkspaceInput
    upsert?: TrackingUserAccessOnWorkspaceUpsertWithoutWorkspaceInput
    disconnect?: boolean
    delete?: boolean
    connect?: TrackingUserAccessOnWorkspaceWhereUniqueInput
    update?: XOR<TrackingUserAccessOnWorkspaceUpdateWithoutWorkspaceInput, TrackingUserAccessOnWorkspaceUncheckedUpdateWithoutWorkspaceInput>
  }

  export type UserOnWorkspaceUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<Enumerable<UserOnWorkspaceCreateWithoutWorkspaceInput>, Enumerable<UserOnWorkspaceUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<UserOnWorkspaceCreateOrConnectWithoutWorkspaceInput>
    upsert?: Enumerable<UserOnWorkspaceUpsertWithWhereUniqueWithoutWorkspaceInput>
    createMany?: UserOnWorkspaceCreateManyWorkspaceInputEnvelope
    set?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    disconnect?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    delete?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    connect?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    update?: Enumerable<UserOnWorkspaceUpdateWithWhereUniqueWithoutWorkspaceInput>
    updateMany?: Enumerable<UserOnWorkspaceUpdateManyWithWhereWithoutWorkspaceInput>
    deleteMany?: Enumerable<UserOnWorkspaceScalarWhereInput>
  }

  export type TeamspaceUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<Enumerable<TeamspaceCreateWithoutWorkspaceInput>, Enumerable<TeamspaceUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<TeamspaceCreateOrConnectWithoutWorkspaceInput>
    upsert?: Enumerable<TeamspaceUpsertWithWhereUniqueWithoutWorkspaceInput>
    createMany?: TeamspaceCreateManyWorkspaceInputEnvelope
    set?: Enumerable<TeamspaceWhereUniqueInput>
    disconnect?: Enumerable<TeamspaceWhereUniqueInput>
    delete?: Enumerable<TeamspaceWhereUniqueInput>
    connect?: Enumerable<TeamspaceWhereUniqueInput>
    update?: Enumerable<TeamspaceUpdateWithWhereUniqueWithoutWorkspaceInput>
    updateMany?: Enumerable<TeamspaceUpdateManyWithWhereWithoutWorkspaceInput>
    deleteMany?: Enumerable<TeamspaceScalarWhereInput>
  }

  export type PageUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutWorkspaceInput>, Enumerable<PageUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutWorkspaceInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutWorkspaceInput>
    createMany?: PageCreateManyWorkspaceInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutWorkspaceInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutWorkspaceInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type FavoriteUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<Enumerable<FavoriteCreateWithoutWorkspaceInput>, Enumerable<FavoriteUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<FavoriteCreateOrConnectWithoutWorkspaceInput>
    upsert?: Enumerable<FavoriteUpsertWithWhereUniqueWithoutWorkspaceInput>
    createMany?: FavoriteCreateManyWorkspaceInputEnvelope
    set?: Enumerable<FavoriteWhereUniqueInput>
    disconnect?: Enumerable<FavoriteWhereUniqueInput>
    delete?: Enumerable<FavoriteWhereUniqueInput>
    connect?: Enumerable<FavoriteWhereUniqueInput>
    update?: Enumerable<FavoriteUpdateWithWhereUniqueWithoutWorkspaceInput>
    updateMany?: Enumerable<FavoriteUpdateManyWithWhereWithoutWorkspaceInput>
    deleteMany?: Enumerable<FavoriteScalarWhereInput>
  }

  export type TrackingUserAccessOnWorkspaceUncheckedUpdateOneWithoutWorkspaceNestedInput = {
    create?: XOR<TrackingUserAccessOnWorkspaceCreateWithoutWorkspaceInput, TrackingUserAccessOnWorkspaceUncheckedCreateWithoutWorkspaceInput>
    connectOrCreate?: TrackingUserAccessOnWorkspaceCreateOrConnectWithoutWorkspaceInput
    upsert?: TrackingUserAccessOnWorkspaceUpsertWithoutWorkspaceInput
    disconnect?: boolean
    delete?: boolean
    connect?: TrackingUserAccessOnWorkspaceWhereUniqueInput
    update?: XOR<TrackingUserAccessOnWorkspaceUpdateWithoutWorkspaceInput, TrackingUserAccessOnWorkspaceUncheckedUpdateWithoutWorkspaceInput>
  }

  export type UserOnWorkspaceUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<Enumerable<UserOnWorkspaceCreateWithoutWorkspaceInput>, Enumerable<UserOnWorkspaceUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<UserOnWorkspaceCreateOrConnectWithoutWorkspaceInput>
    upsert?: Enumerable<UserOnWorkspaceUpsertWithWhereUniqueWithoutWorkspaceInput>
    createMany?: UserOnWorkspaceCreateManyWorkspaceInputEnvelope
    set?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    disconnect?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    delete?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    connect?: Enumerable<UserOnWorkspaceWhereUniqueInput>
    update?: Enumerable<UserOnWorkspaceUpdateWithWhereUniqueWithoutWorkspaceInput>
    updateMany?: Enumerable<UserOnWorkspaceUpdateManyWithWhereWithoutWorkspaceInput>
    deleteMany?: Enumerable<UserOnWorkspaceScalarWhereInput>
  }

  export type TeamspaceUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<Enumerable<TeamspaceCreateWithoutWorkspaceInput>, Enumerable<TeamspaceUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<TeamspaceCreateOrConnectWithoutWorkspaceInput>
    upsert?: Enumerable<TeamspaceUpsertWithWhereUniqueWithoutWorkspaceInput>
    createMany?: TeamspaceCreateManyWorkspaceInputEnvelope
    set?: Enumerable<TeamspaceWhereUniqueInput>
    disconnect?: Enumerable<TeamspaceWhereUniqueInput>
    delete?: Enumerable<TeamspaceWhereUniqueInput>
    connect?: Enumerable<TeamspaceWhereUniqueInput>
    update?: Enumerable<TeamspaceUpdateWithWhereUniqueWithoutWorkspaceInput>
    updateMany?: Enumerable<TeamspaceUpdateManyWithWhereWithoutWorkspaceInput>
    deleteMany?: Enumerable<TeamspaceScalarWhereInput>
  }

  export type PageUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutWorkspaceInput>, Enumerable<PageUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutWorkspaceInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutWorkspaceInput>
    createMany?: PageCreateManyWorkspaceInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutWorkspaceInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutWorkspaceInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type FavoriteUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<Enumerable<FavoriteCreateWithoutWorkspaceInput>, Enumerable<FavoriteUncheckedCreateWithoutWorkspaceInput>>
    connectOrCreate?: Enumerable<FavoriteCreateOrConnectWithoutWorkspaceInput>
    upsert?: Enumerable<FavoriteUpsertWithWhereUniqueWithoutWorkspaceInput>
    createMany?: FavoriteCreateManyWorkspaceInputEnvelope
    set?: Enumerable<FavoriteWhereUniqueInput>
    disconnect?: Enumerable<FavoriteWhereUniqueInput>
    delete?: Enumerable<FavoriteWhereUniqueInput>
    connect?: Enumerable<FavoriteWhereUniqueInput>
    update?: Enumerable<FavoriteUpdateWithWhereUniqueWithoutWorkspaceInput>
    updateMany?: Enumerable<FavoriteUpdateManyWithWhereWithoutWorkspaceInput>
    deleteMany?: Enumerable<FavoriteScalarWhereInput>
  }

  export type WorkspaceCreateNestedOneWithoutTeamspacesInput = {
    create?: XOR<WorkspaceCreateWithoutTeamspacesInput, WorkspaceUncheckedCreateWithoutTeamspacesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutTeamspacesInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type UserOnTeamspaceCreateNestedManyWithoutTeamspaceInput = {
    create?: XOR<Enumerable<UserOnTeamspaceCreateWithoutTeamspaceInput>, Enumerable<UserOnTeamspaceUncheckedCreateWithoutTeamspaceInput>>
    connectOrCreate?: Enumerable<UserOnTeamspaceCreateOrConnectWithoutTeamspaceInput>
    createMany?: UserOnTeamspaceCreateManyTeamspaceInputEnvelope
    connect?: Enumerable<UserOnTeamspaceWhereUniqueInput>
  }

  export type PageCreateNestedManyWithoutTeamspaceInput = {
    create?: XOR<Enumerable<PageCreateWithoutTeamspaceInput>, Enumerable<PageUncheckedCreateWithoutTeamspaceInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutTeamspaceInput>
    createMany?: PageCreateManyTeamspaceInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type UserOnTeamspaceUncheckedCreateNestedManyWithoutTeamspaceInput = {
    create?: XOR<Enumerable<UserOnTeamspaceCreateWithoutTeamspaceInput>, Enumerable<UserOnTeamspaceUncheckedCreateWithoutTeamspaceInput>>
    connectOrCreate?: Enumerable<UserOnTeamspaceCreateOrConnectWithoutTeamspaceInput>
    createMany?: UserOnTeamspaceCreateManyTeamspaceInputEnvelope
    connect?: Enumerable<UserOnTeamspaceWhereUniqueInput>
  }

  export type PageUncheckedCreateNestedManyWithoutTeamspaceInput = {
    create?: XOR<Enumerable<PageCreateWithoutTeamspaceInput>, Enumerable<PageUncheckedCreateWithoutTeamspaceInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutTeamspaceInput>
    createMany?: PageCreateManyTeamspaceInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type WorkspaceUpdateOneWithoutTeamspacesNestedInput = {
    create?: XOR<WorkspaceCreateWithoutTeamspacesInput, WorkspaceUncheckedCreateWithoutTeamspacesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutTeamspacesInput
    upsert?: WorkspaceUpsertWithoutTeamspacesInput
    disconnect?: boolean
    delete?: boolean
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<WorkspaceUpdateWithoutTeamspacesInput, WorkspaceUncheckedUpdateWithoutTeamspacesInput>
  }

  export type UserOnTeamspaceUpdateManyWithoutTeamspaceNestedInput = {
    create?: XOR<Enumerable<UserOnTeamspaceCreateWithoutTeamspaceInput>, Enumerable<UserOnTeamspaceUncheckedCreateWithoutTeamspaceInput>>
    connectOrCreate?: Enumerable<UserOnTeamspaceCreateOrConnectWithoutTeamspaceInput>
    upsert?: Enumerable<UserOnTeamspaceUpsertWithWhereUniqueWithoutTeamspaceInput>
    createMany?: UserOnTeamspaceCreateManyTeamspaceInputEnvelope
    set?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    disconnect?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    delete?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    connect?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    update?: Enumerable<UserOnTeamspaceUpdateWithWhereUniqueWithoutTeamspaceInput>
    updateMany?: Enumerable<UserOnTeamspaceUpdateManyWithWhereWithoutTeamspaceInput>
    deleteMany?: Enumerable<UserOnTeamspaceScalarWhereInput>
  }

  export type PageUpdateManyWithoutTeamspaceNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutTeamspaceInput>, Enumerable<PageUncheckedCreateWithoutTeamspaceInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutTeamspaceInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutTeamspaceInput>
    createMany?: PageCreateManyTeamspaceInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutTeamspaceInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutTeamspaceInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type UserOnTeamspaceUncheckedUpdateManyWithoutTeamspaceNestedInput = {
    create?: XOR<Enumerable<UserOnTeamspaceCreateWithoutTeamspaceInput>, Enumerable<UserOnTeamspaceUncheckedCreateWithoutTeamspaceInput>>
    connectOrCreate?: Enumerable<UserOnTeamspaceCreateOrConnectWithoutTeamspaceInput>
    upsert?: Enumerable<UserOnTeamspaceUpsertWithWhereUniqueWithoutTeamspaceInput>
    createMany?: UserOnTeamspaceCreateManyTeamspaceInputEnvelope
    set?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    disconnect?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    delete?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    connect?: Enumerable<UserOnTeamspaceWhereUniqueInput>
    update?: Enumerable<UserOnTeamspaceUpdateWithWhereUniqueWithoutTeamspaceInput>
    updateMany?: Enumerable<UserOnTeamspaceUpdateManyWithWhereWithoutTeamspaceInput>
    deleteMany?: Enumerable<UserOnTeamspaceScalarWhereInput>
  }

  export type PageUncheckedUpdateManyWithoutTeamspaceNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutTeamspaceInput>, Enumerable<PageUncheckedCreateWithoutTeamspaceInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutTeamspaceInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutTeamspaceInput>
    createMany?: PageCreateManyTeamspaceInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutTeamspaceInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutTeamspaceInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type WorkspaceCreateNestedOneWithoutPagesInput = {
    create?: XOR<WorkspaceCreateWithoutPagesInput, WorkspaceUncheckedCreateWithoutPagesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutPagesInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type TeamspaceCreateNestedOneWithoutPagesInput = {
    create?: XOR<TeamspaceCreateWithoutPagesInput, TeamspaceUncheckedCreateWithoutPagesInput>
    connectOrCreate?: TeamspaceCreateOrConnectWithoutPagesInput
    connect?: TeamspaceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPagesCreatedInput = {
    create?: XOR<UserCreateWithoutPagesCreatedInput, UserUncheckedCreateWithoutPagesCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPagesCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPagesUpdatedInput = {
    create?: XOR<UserCreateWithoutPagesUpdatedInput, UserUncheckedCreateWithoutPagesUpdatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPagesUpdatedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPagesDeletedInput = {
    create?: XOR<UserCreateWithoutPagesDeletedInput, UserUncheckedCreateWithoutPagesDeletedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPagesDeletedInput
    connect?: UserWhereUniqueInput
  }

  export type FavoriteCreateNestedManyWithoutPageInput = {
    create?: XOR<Enumerable<FavoriteCreateWithoutPageInput>, Enumerable<FavoriteUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<FavoriteCreateOrConnectWithoutPageInput>
    createMany?: FavoriteCreateManyPageInputEnvelope
    connect?: Enumerable<FavoriteWhereUniqueInput>
  }

  export type FavoriteUncheckedCreateNestedManyWithoutPageInput = {
    create?: XOR<Enumerable<FavoriteCreateWithoutPageInput>, Enumerable<FavoriteUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<FavoriteCreateOrConnectWithoutPageInput>
    createMany?: FavoriteCreateManyPageInputEnvelope
    connect?: Enumerable<FavoriteWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type WorkspaceUpdateOneRequiredWithoutPagesNestedInput = {
    create?: XOR<WorkspaceCreateWithoutPagesInput, WorkspaceUncheckedCreateWithoutPagesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutPagesInput
    upsert?: WorkspaceUpsertWithoutPagesInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<WorkspaceUpdateWithoutPagesInput, WorkspaceUncheckedUpdateWithoutPagesInput>
  }

  export type TeamspaceUpdateOneWithoutPagesNestedInput = {
    create?: XOR<TeamspaceCreateWithoutPagesInput, TeamspaceUncheckedCreateWithoutPagesInput>
    connectOrCreate?: TeamspaceCreateOrConnectWithoutPagesInput
    upsert?: TeamspaceUpsertWithoutPagesInput
    disconnect?: boolean
    delete?: boolean
    connect?: TeamspaceWhereUniqueInput
    update?: XOR<TeamspaceUpdateWithoutPagesInput, TeamspaceUncheckedUpdateWithoutPagesInput>
  }

  export type UserUpdateOneRequiredWithoutPagesCreatedNestedInput = {
    create?: XOR<UserCreateWithoutPagesCreatedInput, UserUncheckedCreateWithoutPagesCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPagesCreatedInput
    upsert?: UserUpsertWithoutPagesCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPagesCreatedInput, UserUncheckedUpdateWithoutPagesCreatedInput>
  }

  export type UserUpdateOneRequiredWithoutPagesUpdatedNestedInput = {
    create?: XOR<UserCreateWithoutPagesUpdatedInput, UserUncheckedCreateWithoutPagesUpdatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPagesUpdatedInput
    upsert?: UserUpsertWithoutPagesUpdatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPagesUpdatedInput, UserUncheckedUpdateWithoutPagesUpdatedInput>
  }

  export type UserUpdateOneWithoutPagesDeletedNestedInput = {
    create?: XOR<UserCreateWithoutPagesDeletedInput, UserUncheckedCreateWithoutPagesDeletedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPagesDeletedInput
    upsert?: UserUpsertWithoutPagesDeletedInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPagesDeletedInput, UserUncheckedUpdateWithoutPagesDeletedInput>
  }

  export type FavoriteUpdateManyWithoutPageNestedInput = {
    create?: XOR<Enumerable<FavoriteCreateWithoutPageInput>, Enumerable<FavoriteUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<FavoriteCreateOrConnectWithoutPageInput>
    upsert?: Enumerable<FavoriteUpsertWithWhereUniqueWithoutPageInput>
    createMany?: FavoriteCreateManyPageInputEnvelope
    set?: Enumerable<FavoriteWhereUniqueInput>
    disconnect?: Enumerable<FavoriteWhereUniqueInput>
    delete?: Enumerable<FavoriteWhereUniqueInput>
    connect?: Enumerable<FavoriteWhereUniqueInput>
    update?: Enumerable<FavoriteUpdateWithWhereUniqueWithoutPageInput>
    updateMany?: Enumerable<FavoriteUpdateManyWithWhereWithoutPageInput>
    deleteMany?: Enumerable<FavoriteScalarWhereInput>
  }

  export type FavoriteUncheckedUpdateManyWithoutPageNestedInput = {
    create?: XOR<Enumerable<FavoriteCreateWithoutPageInput>, Enumerable<FavoriteUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<FavoriteCreateOrConnectWithoutPageInput>
    upsert?: Enumerable<FavoriteUpsertWithWhereUniqueWithoutPageInput>
    createMany?: FavoriteCreateManyPageInputEnvelope
    set?: Enumerable<FavoriteWhereUniqueInput>
    disconnect?: Enumerable<FavoriteWhereUniqueInput>
    delete?: Enumerable<FavoriteWhereUniqueInput>
    connect?: Enumerable<FavoriteWhereUniqueInput>
    update?: Enumerable<FavoriteUpdateWithWhereUniqueWithoutPageInput>
    updateMany?: Enumerable<FavoriteUpdateManyWithWhereWithoutPageInput>
    deleteMany?: Enumerable<FavoriteScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    connect?: UserWhereUniqueInput
  }

  export type WorkspaceCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<WorkspaceCreateWithoutFavoritesInput, WorkspaceUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutFavoritesInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type PageCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<PageCreateWithoutFavoritesInput, PageUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: PageCreateOrConnectWithoutFavoritesInput
    connect?: PageWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    upsert?: UserUpsertWithoutFavoritesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type WorkspaceUpdateOneWithoutFavoritesNestedInput = {
    create?: XOR<WorkspaceCreateWithoutFavoritesInput, WorkspaceUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutFavoritesInput
    upsert?: WorkspaceUpsertWithoutFavoritesInput
    disconnect?: boolean
    delete?: boolean
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<WorkspaceUpdateWithoutFavoritesInput, WorkspaceUncheckedUpdateWithoutFavoritesInput>
  }

  export type PageUpdateOneWithoutFavoritesNestedInput = {
    create?: XOR<PageCreateWithoutFavoritesInput, PageUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: PageCreateOrConnectWithoutFavoritesInput
    upsert?: PageUpsertWithoutFavoritesInput
    disconnect?: boolean
    delete?: boolean
    connect?: PageWhereUniqueInput
    update?: XOR<PageUpdateWithoutFavoritesInput, PageUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserCreateNestedOneWithoutUserOnWorkspaceInput = {
    create?: XOR<UserCreateWithoutUserOnWorkspaceInput, UserUncheckedCreateWithoutUserOnWorkspaceInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserOnWorkspaceInput
    connect?: UserWhereUniqueInput
  }

  export type WorkspaceCreateNestedOneWithoutUserOnWorkspaceInput = {
    create?: XOR<WorkspaceCreateWithoutUserOnWorkspaceInput, WorkspaceUncheckedCreateWithoutUserOnWorkspaceInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutUserOnWorkspaceInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutUserOnWorkspaceNestedInput = {
    create?: XOR<UserCreateWithoutUserOnWorkspaceInput, UserUncheckedCreateWithoutUserOnWorkspaceInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserOnWorkspaceInput
    upsert?: UserUpsertWithoutUserOnWorkspaceInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutUserOnWorkspaceInput, UserUncheckedUpdateWithoutUserOnWorkspaceInput>
  }

  export type WorkspaceUpdateOneRequiredWithoutUserOnWorkspaceNestedInput = {
    create?: XOR<WorkspaceCreateWithoutUserOnWorkspaceInput, WorkspaceUncheckedCreateWithoutUserOnWorkspaceInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutUserOnWorkspaceInput
    upsert?: WorkspaceUpsertWithoutUserOnWorkspaceInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<WorkspaceUpdateWithoutUserOnWorkspaceInput, WorkspaceUncheckedUpdateWithoutUserOnWorkspaceInput>
  }

  export type UserCreateNestedOneWithoutUserOnTeamspaceInput = {
    create?: XOR<UserCreateWithoutUserOnTeamspaceInput, UserUncheckedCreateWithoutUserOnTeamspaceInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserOnTeamspaceInput
    connect?: UserWhereUniqueInput
  }

  export type TeamspaceCreateNestedOneWithoutUserOnTeamspaceInput = {
    create?: XOR<TeamspaceCreateWithoutUserOnTeamspaceInput, TeamspaceUncheckedCreateWithoutUserOnTeamspaceInput>
    connectOrCreate?: TeamspaceCreateOrConnectWithoutUserOnTeamspaceInput
    connect?: TeamspaceWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserOnTeamspaceNestedInput = {
    create?: XOR<UserCreateWithoutUserOnTeamspaceInput, UserUncheckedCreateWithoutUserOnTeamspaceInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserOnTeamspaceInput
    upsert?: UserUpsertWithoutUserOnTeamspaceInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutUserOnTeamspaceInput, UserUncheckedUpdateWithoutUserOnTeamspaceInput>
  }

  export type TeamspaceUpdateOneRequiredWithoutUserOnTeamspaceNestedInput = {
    create?: XOR<TeamspaceCreateWithoutUserOnTeamspaceInput, TeamspaceUncheckedCreateWithoutUserOnTeamspaceInput>
    connectOrCreate?: TeamspaceCreateOrConnectWithoutUserOnTeamspaceInput
    upsert?: TeamspaceUpsertWithoutUserOnTeamspaceInput
    connect?: TeamspaceWhereUniqueInput
    update?: XOR<TeamspaceUpdateWithoutUserOnTeamspaceInput, TeamspaceUncheckedUpdateWithoutUserOnTeamspaceInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }
  export type NestedJsonNullableFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase>, Exclude<keyof Required<NestedJsonNullableFilterBase>, 'path'>>,
        Required<NestedJsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase>, 'path'>>

  export type NestedJsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    PagesCreated?: PageCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceUncheckedCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    PagesCreated?: PageUncheckedCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageUncheckedCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageUncheckedCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUpdateManyWithoutDeletedByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUncheckedUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUncheckedUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUncheckedUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUncheckedUpdateManyWithoutDeletedByUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    PagesCreated?: PageCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceUncheckedCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    PagesCreated?: PageUncheckedCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageUncheckedCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageUncheckedCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUpdateManyWithoutDeletedByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUncheckedUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUncheckedUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUncheckedUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUncheckedUpdateManyWithoutDeletedByUserNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: Enumerable<AccountCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    accessToken?: string | null
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    accessToken?: string | null
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: Enumerable<SessionCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type UserOnWorkspaceCreateWithoutUserInput = {
    id?: string
    role?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutUserOnWorkspaceInput
  }

  export type UserOnWorkspaceUncheckedCreateWithoutUserInput = {
    id?: string
    role?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaceId: string
  }

  export type UserOnWorkspaceCreateOrConnectWithoutUserInput = {
    where: UserOnWorkspaceWhereUniqueInput
    create: XOR<UserOnWorkspaceCreateWithoutUserInput, UserOnWorkspaceUncheckedCreateWithoutUserInput>
  }

  export type UserOnWorkspaceCreateManyUserInputEnvelope = {
    data: Enumerable<UserOnWorkspaceCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type UserOnTeamspaceCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    operation?: number
    teamspace: TeamspaceCreateNestedOneWithoutUserOnTeamspaceInput
  }

  export type UserOnTeamspaceUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    operation?: number
    teamspaceId: string
  }

  export type UserOnTeamspaceCreateOrConnectWithoutUserInput = {
    where: UserOnTeamspaceWhereUniqueInput
    create: XOR<UserOnTeamspaceCreateWithoutUserInput, UserOnTeamspaceUncheckedCreateWithoutUserInput>
  }

  export type UserOnTeamspaceCreateManyUserInputEnvelope = {
    data: Enumerable<UserOnTeamspaceCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type TrackingUserAccessOnWorkspaceCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    lastAccessPageId?: string | null
    workspace: WorkspaceCreateNestedOneWithoutTrackingUserAccessOnWorkspaceInput
  }

  export type TrackingUserAccessOnWorkspaceUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    lastAccessPageId?: string | null
    workspaceId: string
  }

  export type TrackingUserAccessOnWorkspaceCreateOrConnectWithoutUserInput = {
    where: TrackingUserAccessOnWorkspaceWhereUniqueInput
    create: XOR<TrackingUserAccessOnWorkspaceCreateWithoutUserInput, TrackingUserAccessOnWorkspaceUncheckedCreateWithoutUserInput>
  }

  export type TrackingUserAccessOnWorkspaceCreateManyUserInputEnvelope = {
    data: Enumerable<TrackingUserAccessOnWorkspaceCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type FavoriteCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace?: WorkspaceCreateNestedOneWithoutFavoritesInput
    page?: PageCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaceId: string
    pageId: string
  }

  export type FavoriteCreateOrConnectWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteCreateManyUserInputEnvelope = {
    data: Enumerable<FavoriteCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type PageCreateWithoutCreatedByUserInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspace: WorkspaceCreateNestedOneWithoutPagesInput
    teamspace?: TeamspaceCreateNestedOneWithoutPagesInput
    updatedByUser: UserCreateNestedOneWithoutPagesUpdatedInput
    deletedByUser?: UserCreateNestedOneWithoutPagesDeletedInput
    favorites?: FavoriteCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutCreatedByUserInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspaceId: string
    teamspaceId?: string | null
    updatedBy: string
    deletedBy?: string | null
    favorites?: FavoriteUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutCreatedByUserInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutCreatedByUserInput, PageUncheckedCreateWithoutCreatedByUserInput>
  }

  export type PageCreateManyCreatedByUserInputEnvelope = {
    data: Enumerable<PageCreateManyCreatedByUserInput>
    skipDuplicates?: boolean
  }

  export type PageCreateWithoutUpdatedByUserInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspace: WorkspaceCreateNestedOneWithoutPagesInput
    teamspace?: TeamspaceCreateNestedOneWithoutPagesInput
    createdByUser: UserCreateNestedOneWithoutPagesCreatedInput
    deletedByUser?: UserCreateNestedOneWithoutPagesDeletedInput
    favorites?: FavoriteCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutUpdatedByUserInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspaceId: string
    teamspaceId?: string | null
    createdBy: string
    deletedBy?: string | null
    favorites?: FavoriteUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutUpdatedByUserInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutUpdatedByUserInput, PageUncheckedCreateWithoutUpdatedByUserInput>
  }

  export type PageCreateManyUpdatedByUserInputEnvelope = {
    data: Enumerable<PageCreateManyUpdatedByUserInput>
    skipDuplicates?: boolean
  }

  export type PageCreateWithoutDeletedByUserInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspace: WorkspaceCreateNestedOneWithoutPagesInput
    teamspace?: TeamspaceCreateNestedOneWithoutPagesInput
    createdByUser: UserCreateNestedOneWithoutPagesCreatedInput
    updatedByUser: UserCreateNestedOneWithoutPagesUpdatedInput
    favorites?: FavoriteCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutDeletedByUserInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspaceId: string
    teamspaceId?: string | null
    createdBy: string
    updatedBy: string
    favorites?: FavoriteUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutDeletedByUserInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutDeletedByUserInput, PageUncheckedCreateWithoutDeletedByUserInput>
  }

  export type PageCreateManyDeletedByUserInputEnvelope = {
    data: Enumerable<PageCreateManyDeletedByUserInput>
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutAccountsInput>
  }

  export type AccountScalarWhereInput = {
    AND?: Enumerable<AccountScalarWhereInput>
    OR?: Enumerable<AccountScalarWhereInput>
    NOT?: Enumerable<AccountScalarWhereInput>
    id?: StringFilter | string
    type?: StringFilter | string
    provider?: StringFilter | string
    providerAccountId?: StringFilter | string
    refresh_token?: StringNullableFilter | string | null
    access_token?: StringNullableFilter | string | null
    expires_at?: IntNullableFilter | number | null
    token_type?: StringNullableFilter | string | null
    scope?: StringNullableFilter | string | null
    id_token?: StringNullableFilter | string | null
    session_state?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutSessionsInput>
  }

  export type SessionScalarWhereInput = {
    AND?: Enumerable<SessionScalarWhereInput>
    OR?: Enumerable<SessionScalarWhereInput>
    NOT?: Enumerable<SessionScalarWhereInput>
    id?: StringFilter | string
    sessionToken?: StringFilter | string
    accessToken?: StringNullableFilter | string | null
    expires?: DateTimeFilter | Date | string
    userId?: StringNullableFilter | string | null
  }

  export type UserOnWorkspaceUpsertWithWhereUniqueWithoutUserInput = {
    where: UserOnWorkspaceWhereUniqueInput
    update: XOR<UserOnWorkspaceUpdateWithoutUserInput, UserOnWorkspaceUncheckedUpdateWithoutUserInput>
    create: XOR<UserOnWorkspaceCreateWithoutUserInput, UserOnWorkspaceUncheckedCreateWithoutUserInput>
  }

  export type UserOnWorkspaceUpdateWithWhereUniqueWithoutUserInput = {
    where: UserOnWorkspaceWhereUniqueInput
    data: XOR<UserOnWorkspaceUpdateWithoutUserInput, UserOnWorkspaceUncheckedUpdateWithoutUserInput>
  }

  export type UserOnWorkspaceUpdateManyWithWhereWithoutUserInput = {
    where: UserOnWorkspaceScalarWhereInput
    data: XOR<UserOnWorkspaceUpdateManyMutationInput, UserOnWorkspaceUncheckedUpdateManyWithoutUserOnWorkspaceInput>
  }

  export type UserOnWorkspaceScalarWhereInput = {
    AND?: Enumerable<UserOnWorkspaceScalarWhereInput>
    OR?: Enumerable<UserOnWorkspaceScalarWhereInput>
    NOT?: Enumerable<UserOnWorkspaceScalarWhereInput>
    id?: StringFilter | string
    role?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
    workspaceId?: StringFilter | string
  }

  export type UserOnTeamspaceUpsertWithWhereUniqueWithoutUserInput = {
    where: UserOnTeamspaceWhereUniqueInput
    update: XOR<UserOnTeamspaceUpdateWithoutUserInput, UserOnTeamspaceUncheckedUpdateWithoutUserInput>
    create: XOR<UserOnTeamspaceCreateWithoutUserInput, UserOnTeamspaceUncheckedCreateWithoutUserInput>
  }

  export type UserOnTeamspaceUpdateWithWhereUniqueWithoutUserInput = {
    where: UserOnTeamspaceWhereUniqueInput
    data: XOR<UserOnTeamspaceUpdateWithoutUserInput, UserOnTeamspaceUncheckedUpdateWithoutUserInput>
  }

  export type UserOnTeamspaceUpdateManyWithWhereWithoutUserInput = {
    where: UserOnTeamspaceScalarWhereInput
    data: XOR<UserOnTeamspaceUpdateManyMutationInput, UserOnTeamspaceUncheckedUpdateManyWithoutUserOnTeamspaceInput>
  }

  export type UserOnTeamspaceScalarWhereInput = {
    AND?: Enumerable<UserOnTeamspaceScalarWhereInput>
    OR?: Enumerable<UserOnTeamspaceScalarWhereInput>
    NOT?: Enumerable<UserOnTeamspaceScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    operation?: IntFilter | number
    userId?: StringFilter | string
    teamspaceId?: StringFilter | string
  }

  export type TrackingUserAccessOnWorkspaceUpsertWithWhereUniqueWithoutUserInput = {
    where: TrackingUserAccessOnWorkspaceWhereUniqueInput
    update: XOR<TrackingUserAccessOnWorkspaceUpdateWithoutUserInput, TrackingUserAccessOnWorkspaceUncheckedUpdateWithoutUserInput>
    create: XOR<TrackingUserAccessOnWorkspaceCreateWithoutUserInput, TrackingUserAccessOnWorkspaceUncheckedCreateWithoutUserInput>
  }

  export type TrackingUserAccessOnWorkspaceUpdateWithWhereUniqueWithoutUserInput = {
    where: TrackingUserAccessOnWorkspaceWhereUniqueInput
    data: XOR<TrackingUserAccessOnWorkspaceUpdateWithoutUserInput, TrackingUserAccessOnWorkspaceUncheckedUpdateWithoutUserInput>
  }

  export type TrackingUserAccessOnWorkspaceUpdateManyWithWhereWithoutUserInput = {
    where: TrackingUserAccessOnWorkspaceScalarWhereInput
    data: XOR<TrackingUserAccessOnWorkspaceUpdateManyMutationInput, TrackingUserAccessOnWorkspaceUncheckedUpdateManyWithoutTrackingUserAccessInput>
  }

  export type TrackingUserAccessOnWorkspaceScalarWhereInput = {
    AND?: Enumerable<TrackingUserAccessOnWorkspaceScalarWhereInput>
    OR?: Enumerable<TrackingUserAccessOnWorkspaceScalarWhereInput>
    NOT?: Enumerable<TrackingUserAccessOnWorkspaceScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    lastAccessPageId?: StringNullableFilter | string | null
    userId?: StringFilter | string
    workspaceId?: StringFilter | string
  }

  export type FavoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutUserInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutFavoritesInput>
  }

  export type FavoriteScalarWhereInput = {
    AND?: Enumerable<FavoriteScalarWhereInput>
    OR?: Enumerable<FavoriteScalarWhereInput>
    NOT?: Enumerable<FavoriteScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
    workspaceId?: StringFilter | string
    pageId?: StringFilter | string
  }

  export type PageUpsertWithWhereUniqueWithoutCreatedByUserInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutCreatedByUserInput, PageUncheckedUpdateWithoutCreatedByUserInput>
    create: XOR<PageCreateWithoutCreatedByUserInput, PageUncheckedCreateWithoutCreatedByUserInput>
  }

  export type PageUpdateWithWhereUniqueWithoutCreatedByUserInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutCreatedByUserInput, PageUncheckedUpdateWithoutCreatedByUserInput>
  }

  export type PageUpdateManyWithWhereWithoutCreatedByUserInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutPagesCreatedInput>
  }

  export type PageScalarWhereInput = {
    AND?: Enumerable<PageScalarWhereInput>
    OR?: Enumerable<PageScalarWhereInput>
    NOT?: Enumerable<PageScalarWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    content?: JsonNullableFilter
    published?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    workspaceId?: StringFilter | string
    teamspaceId?: StringNullableFilter | string | null
    createdBy?: StringFilter | string
    updatedBy?: StringFilter | string
    deletedBy?: StringNullableFilter | string | null
  }

  export type PageUpsertWithWhereUniqueWithoutUpdatedByUserInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutUpdatedByUserInput, PageUncheckedUpdateWithoutUpdatedByUserInput>
    create: XOR<PageCreateWithoutUpdatedByUserInput, PageUncheckedCreateWithoutUpdatedByUserInput>
  }

  export type PageUpdateWithWhereUniqueWithoutUpdatedByUserInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutUpdatedByUserInput, PageUncheckedUpdateWithoutUpdatedByUserInput>
  }

  export type PageUpdateManyWithWhereWithoutUpdatedByUserInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutPagesUpdatedInput>
  }

  export type PageUpsertWithWhereUniqueWithoutDeletedByUserInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutDeletedByUserInput, PageUncheckedUpdateWithoutDeletedByUserInput>
    create: XOR<PageCreateWithoutDeletedByUserInput, PageUncheckedCreateWithoutDeletedByUserInput>
  }

  export type PageUpdateWithWhereUniqueWithoutDeletedByUserInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutDeletedByUserInput, PageUncheckedUpdateWithoutDeletedByUserInput>
  }

  export type PageUpdateManyWithWhereWithoutDeletedByUserInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutPagesDeletedInput>
  }

  export type UserCreateWithoutTrackingUserAccessInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    PagesCreated?: PageCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserUncheckedCreateWithoutTrackingUserAccessInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    PagesCreated?: PageUncheckedCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageUncheckedCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageUncheckedCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserCreateOrConnectWithoutTrackingUserAccessInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTrackingUserAccessInput, UserUncheckedCreateWithoutTrackingUserAccessInput>
  }

  export type WorkspaceCreateWithoutTrackingUserAccessOnWorkspaceInput = {
    id?: string
    name: string
    domain: string
    stripeCustomerId?: string | null
    stripeWorkspaceId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutWorkspaceInput
    teamspaces?: TeamspaceCreateNestedManyWithoutWorkspaceInput
    pages?: PageCreateNestedManyWithoutWorkspaceInput
    favorites?: FavoriteCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutTrackingUserAccessOnWorkspaceInput = {
    id?: string
    name: string
    domain: string
    stripeCustomerId?: string | null
    stripeWorkspaceId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutWorkspaceInput
    teamspaces?: TeamspaceUncheckedCreateNestedManyWithoutWorkspaceInput
    pages?: PageUncheckedCreateNestedManyWithoutWorkspaceInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutTrackingUserAccessOnWorkspaceInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutTrackingUserAccessOnWorkspaceInput, WorkspaceUncheckedCreateWithoutTrackingUserAccessOnWorkspaceInput>
  }

  export type UserUpsertWithoutTrackingUserAccessInput = {
    update: XOR<UserUpdateWithoutTrackingUserAccessInput, UserUncheckedUpdateWithoutTrackingUserAccessInput>
    create: XOR<UserCreateWithoutTrackingUserAccessInput, UserUncheckedCreateWithoutTrackingUserAccessInput>
  }

  export type UserUpdateWithoutTrackingUserAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUpdateManyWithoutDeletedByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTrackingUserAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUncheckedUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUncheckedUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUncheckedUpdateManyWithoutDeletedByUserNestedInput
  }

  export type WorkspaceUpsertWithoutTrackingUserAccessOnWorkspaceInput = {
    update: XOR<WorkspaceUpdateWithoutTrackingUserAccessOnWorkspaceInput, WorkspaceUncheckedUpdateWithoutTrackingUserAccessOnWorkspaceInput>
    create: XOR<WorkspaceCreateWithoutTrackingUserAccessOnWorkspaceInput, WorkspaceUncheckedCreateWithoutTrackingUserAccessOnWorkspaceInput>
  }

  export type WorkspaceUpdateWithoutTrackingUserAccessOnWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutWorkspaceNestedInput
    teamspaces?: TeamspaceUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUpdateManyWithoutWorkspaceNestedInput
    favorites?: FavoriteUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutTrackingUserAccessOnWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutWorkspaceNestedInput
    teamspaces?: TeamspaceUncheckedUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUncheckedUpdateManyWithoutWorkspaceNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type TrackingUserAccessOnWorkspaceCreateWithoutWorkspaceInput = {
    id?: string
    createdAt?: Date | string
    lastAccessPageId?: string | null
    user: UserCreateNestedOneWithoutTrackingUserAccessInput
  }

  export type TrackingUserAccessOnWorkspaceUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    createdAt?: Date | string
    lastAccessPageId?: string | null
    userId: string
  }

  export type TrackingUserAccessOnWorkspaceCreateOrConnectWithoutWorkspaceInput = {
    where: TrackingUserAccessOnWorkspaceWhereUniqueInput
    create: XOR<TrackingUserAccessOnWorkspaceCreateWithoutWorkspaceInput, TrackingUserAccessOnWorkspaceUncheckedCreateWithoutWorkspaceInput>
  }

  export type UserOnWorkspaceCreateWithoutWorkspaceInput = {
    id?: string
    role?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserOnWorkspaceInput
  }

  export type UserOnWorkspaceUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    role?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type UserOnWorkspaceCreateOrConnectWithoutWorkspaceInput = {
    where: UserOnWorkspaceWhereUniqueInput
    create: XOR<UserOnWorkspaceCreateWithoutWorkspaceInput, UserOnWorkspaceUncheckedCreateWithoutWorkspaceInput>
  }

  export type UserOnWorkspaceCreateManyWorkspaceInputEnvelope = {
    data: Enumerable<UserOnWorkspaceCreateManyWorkspaceInput>
    skipDuplicates?: boolean
  }

  export type TeamspaceCreateWithoutWorkspaceInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isOrigin?: boolean | null
    archivedAt?: Date | string | null
    createdBy: string
    userOnTeamspace?: UserOnTeamspaceCreateNestedManyWithoutTeamspaceInput
    pages?: PageCreateNestedManyWithoutTeamspaceInput
  }

  export type TeamspaceUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isOrigin?: boolean | null
    archivedAt?: Date | string | null
    createdBy: string
    userOnTeamspace?: UserOnTeamspaceUncheckedCreateNestedManyWithoutTeamspaceInput
    pages?: PageUncheckedCreateNestedManyWithoutTeamspaceInput
  }

  export type TeamspaceCreateOrConnectWithoutWorkspaceInput = {
    where: TeamspaceWhereUniqueInput
    create: XOR<TeamspaceCreateWithoutWorkspaceInput, TeamspaceUncheckedCreateWithoutWorkspaceInput>
  }

  export type TeamspaceCreateManyWorkspaceInputEnvelope = {
    data: Enumerable<TeamspaceCreateManyWorkspaceInput>
    skipDuplicates?: boolean
  }

  export type PageCreateWithoutWorkspaceInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    teamspace?: TeamspaceCreateNestedOneWithoutPagesInput
    createdByUser: UserCreateNestedOneWithoutPagesCreatedInput
    updatedByUser: UserCreateNestedOneWithoutPagesUpdatedInput
    deletedByUser?: UserCreateNestedOneWithoutPagesDeletedInput
    favorites?: FavoriteCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    teamspaceId?: string | null
    createdBy: string
    updatedBy: string
    deletedBy?: string | null
    favorites?: FavoriteUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutWorkspaceInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutWorkspaceInput, PageUncheckedCreateWithoutWorkspaceInput>
  }

  export type PageCreateManyWorkspaceInputEnvelope = {
    data: Enumerable<PageCreateManyWorkspaceInput>
    skipDuplicates?: boolean
  }

  export type FavoriteCreateWithoutWorkspaceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
    page?: PageCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    pageId: string
  }

  export type FavoriteCreateOrConnectWithoutWorkspaceInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutWorkspaceInput, FavoriteUncheckedCreateWithoutWorkspaceInput>
  }

  export type FavoriteCreateManyWorkspaceInputEnvelope = {
    data: Enumerable<FavoriteCreateManyWorkspaceInput>
    skipDuplicates?: boolean
  }

  export type TrackingUserAccessOnWorkspaceUpsertWithoutWorkspaceInput = {
    update: XOR<TrackingUserAccessOnWorkspaceUpdateWithoutWorkspaceInput, TrackingUserAccessOnWorkspaceUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<TrackingUserAccessOnWorkspaceCreateWithoutWorkspaceInput, TrackingUserAccessOnWorkspaceUncheckedCreateWithoutWorkspaceInput>
  }

  export type TrackingUserAccessOnWorkspaceUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessPageId?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutTrackingUserAccessNestedInput
  }

  export type TrackingUserAccessOnWorkspaceUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessPageId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserOnWorkspaceUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: UserOnWorkspaceWhereUniqueInput
    update: XOR<UserOnWorkspaceUpdateWithoutWorkspaceInput, UserOnWorkspaceUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<UserOnWorkspaceCreateWithoutWorkspaceInput, UserOnWorkspaceUncheckedCreateWithoutWorkspaceInput>
  }

  export type UserOnWorkspaceUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: UserOnWorkspaceWhereUniqueInput
    data: XOR<UserOnWorkspaceUpdateWithoutWorkspaceInput, UserOnWorkspaceUncheckedUpdateWithoutWorkspaceInput>
  }

  export type UserOnWorkspaceUpdateManyWithWhereWithoutWorkspaceInput = {
    where: UserOnWorkspaceScalarWhereInput
    data: XOR<UserOnWorkspaceUpdateManyMutationInput, UserOnWorkspaceUncheckedUpdateManyWithoutUserOnWorkspaceInput>
  }

  export type TeamspaceUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: TeamspaceWhereUniqueInput
    update: XOR<TeamspaceUpdateWithoutWorkspaceInput, TeamspaceUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<TeamspaceCreateWithoutWorkspaceInput, TeamspaceUncheckedCreateWithoutWorkspaceInput>
  }

  export type TeamspaceUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: TeamspaceWhereUniqueInput
    data: XOR<TeamspaceUpdateWithoutWorkspaceInput, TeamspaceUncheckedUpdateWithoutWorkspaceInput>
  }

  export type TeamspaceUpdateManyWithWhereWithoutWorkspaceInput = {
    where: TeamspaceScalarWhereInput
    data: XOR<TeamspaceUpdateManyMutationInput, TeamspaceUncheckedUpdateManyWithoutTeamspacesInput>
  }

  export type TeamspaceScalarWhereInput = {
    AND?: Enumerable<TeamspaceScalarWhereInput>
    OR?: Enumerable<TeamspaceScalarWhereInput>
    NOT?: Enumerable<TeamspaceScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    description?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    isOrigin?: BoolNullableFilter | boolean | null
    archivedAt?: DateTimeNullableFilter | Date | string | null
    workspaceId?: StringNullableFilter | string | null
    createdBy?: StringFilter | string
  }

  export type PageUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutWorkspaceInput, PageUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<PageCreateWithoutWorkspaceInput, PageUncheckedCreateWithoutWorkspaceInput>
  }

  export type PageUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutWorkspaceInput, PageUncheckedUpdateWithoutWorkspaceInput>
  }

  export type PageUpdateManyWithWhereWithoutWorkspaceInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutPagesInput>
  }

  export type FavoriteUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutWorkspaceInput, FavoriteUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<FavoriteCreateWithoutWorkspaceInput, FavoriteUncheckedCreateWithoutWorkspaceInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutWorkspaceInput, FavoriteUncheckedUpdateWithoutWorkspaceInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutWorkspaceInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutFavoritesInput>
  }

  export type WorkspaceCreateWithoutTeamspacesInput = {
    id?: string
    name: string
    domain: string
    stripeCustomerId?: string | null
    stripeWorkspaceId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceCreateNestedOneWithoutWorkspaceInput
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutWorkspaceInput
    pages?: PageCreateNestedManyWithoutWorkspaceInput
    favorites?: FavoriteCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutTeamspacesInput = {
    id?: string
    name: string
    domain: string
    stripeCustomerId?: string | null
    stripeWorkspaceId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedOneWithoutWorkspaceInput
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutWorkspaceInput
    pages?: PageUncheckedCreateNestedManyWithoutWorkspaceInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutTeamspacesInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutTeamspacesInput, WorkspaceUncheckedCreateWithoutTeamspacesInput>
  }

  export type UserOnTeamspaceCreateWithoutTeamspaceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    operation?: number
    user: UserCreateNestedOneWithoutUserOnTeamspaceInput
  }

  export type UserOnTeamspaceUncheckedCreateWithoutTeamspaceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    operation?: number
    userId: string
  }

  export type UserOnTeamspaceCreateOrConnectWithoutTeamspaceInput = {
    where: UserOnTeamspaceWhereUniqueInput
    create: XOR<UserOnTeamspaceCreateWithoutTeamspaceInput, UserOnTeamspaceUncheckedCreateWithoutTeamspaceInput>
  }

  export type UserOnTeamspaceCreateManyTeamspaceInputEnvelope = {
    data: Enumerable<UserOnTeamspaceCreateManyTeamspaceInput>
    skipDuplicates?: boolean
  }

  export type PageCreateWithoutTeamspaceInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspace: WorkspaceCreateNestedOneWithoutPagesInput
    createdByUser: UserCreateNestedOneWithoutPagesCreatedInput
    updatedByUser: UserCreateNestedOneWithoutPagesUpdatedInput
    deletedByUser?: UserCreateNestedOneWithoutPagesDeletedInput
    favorites?: FavoriteCreateNestedManyWithoutPageInput
  }

  export type PageUncheckedCreateWithoutTeamspaceInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspaceId: string
    createdBy: string
    updatedBy: string
    deletedBy?: string | null
    favorites?: FavoriteUncheckedCreateNestedManyWithoutPageInput
  }

  export type PageCreateOrConnectWithoutTeamspaceInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutTeamspaceInput, PageUncheckedCreateWithoutTeamspaceInput>
  }

  export type PageCreateManyTeamspaceInputEnvelope = {
    data: Enumerable<PageCreateManyTeamspaceInput>
    skipDuplicates?: boolean
  }

  export type WorkspaceUpsertWithoutTeamspacesInput = {
    update: XOR<WorkspaceUpdateWithoutTeamspacesInput, WorkspaceUncheckedUpdateWithoutTeamspacesInput>
    create: XOR<WorkspaceCreateWithoutTeamspacesInput, WorkspaceUncheckedCreateWithoutTeamspacesInput>
  }

  export type WorkspaceUpdateWithoutTeamspacesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUpdateOneWithoutWorkspaceNestedInput
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUpdateManyWithoutWorkspaceNestedInput
    favorites?: FavoriteUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutTeamspacesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUncheckedUpdateOneWithoutWorkspaceNestedInput
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUncheckedUpdateManyWithoutWorkspaceNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type UserOnTeamspaceUpsertWithWhereUniqueWithoutTeamspaceInput = {
    where: UserOnTeamspaceWhereUniqueInput
    update: XOR<UserOnTeamspaceUpdateWithoutTeamspaceInput, UserOnTeamspaceUncheckedUpdateWithoutTeamspaceInput>
    create: XOR<UserOnTeamspaceCreateWithoutTeamspaceInput, UserOnTeamspaceUncheckedCreateWithoutTeamspaceInput>
  }

  export type UserOnTeamspaceUpdateWithWhereUniqueWithoutTeamspaceInput = {
    where: UserOnTeamspaceWhereUniqueInput
    data: XOR<UserOnTeamspaceUpdateWithoutTeamspaceInput, UserOnTeamspaceUncheckedUpdateWithoutTeamspaceInput>
  }

  export type UserOnTeamspaceUpdateManyWithWhereWithoutTeamspaceInput = {
    where: UserOnTeamspaceScalarWhereInput
    data: XOR<UserOnTeamspaceUpdateManyMutationInput, UserOnTeamspaceUncheckedUpdateManyWithoutUserOnTeamspaceInput>
  }

  export type PageUpsertWithWhereUniqueWithoutTeamspaceInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutTeamspaceInput, PageUncheckedUpdateWithoutTeamspaceInput>
    create: XOR<PageCreateWithoutTeamspaceInput, PageUncheckedCreateWithoutTeamspaceInput>
  }

  export type PageUpdateWithWhereUniqueWithoutTeamspaceInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutTeamspaceInput, PageUncheckedUpdateWithoutTeamspaceInput>
  }

  export type PageUpdateManyWithWhereWithoutTeamspaceInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutPagesInput>
  }

  export type WorkspaceCreateWithoutPagesInput = {
    id?: string
    name: string
    domain: string
    stripeCustomerId?: string | null
    stripeWorkspaceId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceCreateNestedOneWithoutWorkspaceInput
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutWorkspaceInput
    teamspaces?: TeamspaceCreateNestedManyWithoutWorkspaceInput
    favorites?: FavoriteCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutPagesInput = {
    id?: string
    name: string
    domain: string
    stripeCustomerId?: string | null
    stripeWorkspaceId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedOneWithoutWorkspaceInput
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutWorkspaceInput
    teamspaces?: TeamspaceUncheckedCreateNestedManyWithoutWorkspaceInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutPagesInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutPagesInput, WorkspaceUncheckedCreateWithoutPagesInput>
  }

  export type TeamspaceCreateWithoutPagesInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isOrigin?: boolean | null
    archivedAt?: Date | string | null
    createdBy: string
    workspace?: WorkspaceCreateNestedOneWithoutTeamspacesInput
    userOnTeamspace?: UserOnTeamspaceCreateNestedManyWithoutTeamspaceInput
  }

  export type TeamspaceUncheckedCreateWithoutPagesInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isOrigin?: boolean | null
    archivedAt?: Date | string | null
    workspaceId?: string | null
    createdBy: string
    userOnTeamspace?: UserOnTeamspaceUncheckedCreateNestedManyWithoutTeamspaceInput
  }

  export type TeamspaceCreateOrConnectWithoutPagesInput = {
    where: TeamspaceWhereUniqueInput
    create: XOR<TeamspaceCreateWithoutPagesInput, TeamspaceUncheckedCreateWithoutPagesInput>
  }

  export type UserCreateWithoutPagesCreatedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    PagesUpdated?: PageCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserUncheckedCreateWithoutPagesCreatedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceUncheckedCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    PagesUpdated?: PageUncheckedCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageUncheckedCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserCreateOrConnectWithoutPagesCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPagesCreatedInput, UserUncheckedCreateWithoutPagesCreatedInput>
  }

  export type UserCreateWithoutPagesUpdatedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    PagesCreated?: PageCreateNestedManyWithoutCreatedByUserInput
    PagesDeleted?: PageCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserUncheckedCreateWithoutPagesUpdatedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceUncheckedCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    PagesCreated?: PageUncheckedCreateNestedManyWithoutCreatedByUserInput
    PagesDeleted?: PageUncheckedCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserCreateOrConnectWithoutPagesUpdatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPagesUpdatedInput, UserUncheckedCreateWithoutPagesUpdatedInput>
  }

  export type UserCreateWithoutPagesDeletedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    PagesCreated?: PageCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageCreateNestedManyWithoutUpdatedByUserInput
  }

  export type UserUncheckedCreateWithoutPagesDeletedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceUncheckedCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    PagesCreated?: PageUncheckedCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageUncheckedCreateNestedManyWithoutUpdatedByUserInput
  }

  export type UserCreateOrConnectWithoutPagesDeletedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPagesDeletedInput, UserUncheckedCreateWithoutPagesDeletedInput>
  }

  export type FavoriteCreateWithoutPageInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
    workspace?: WorkspaceCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutPageInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    workspaceId: string
  }

  export type FavoriteCreateOrConnectWithoutPageInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutPageInput, FavoriteUncheckedCreateWithoutPageInput>
  }

  export type FavoriteCreateManyPageInputEnvelope = {
    data: Enumerable<FavoriteCreateManyPageInput>
    skipDuplicates?: boolean
  }

  export type WorkspaceUpsertWithoutPagesInput = {
    update: XOR<WorkspaceUpdateWithoutPagesInput, WorkspaceUncheckedUpdateWithoutPagesInput>
    create: XOR<WorkspaceCreateWithoutPagesInput, WorkspaceUncheckedCreateWithoutPagesInput>
  }

  export type WorkspaceUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUpdateOneWithoutWorkspaceNestedInput
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutWorkspaceNestedInput
    teamspaces?: TeamspaceUpdateManyWithoutWorkspaceNestedInput
    favorites?: FavoriteUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUncheckedUpdateOneWithoutWorkspaceNestedInput
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutWorkspaceNestedInput
    teamspaces?: TeamspaceUncheckedUpdateManyWithoutWorkspaceNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type TeamspaceUpsertWithoutPagesInput = {
    update: XOR<TeamspaceUpdateWithoutPagesInput, TeamspaceUncheckedUpdateWithoutPagesInput>
    create: XOR<TeamspaceCreateWithoutPagesInput, TeamspaceUncheckedCreateWithoutPagesInput>
  }

  export type TeamspaceUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isOrigin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    workspace?: WorkspaceUpdateOneWithoutTeamspacesNestedInput
    userOnTeamspace?: UserOnTeamspaceUpdateManyWithoutTeamspaceNestedInput
  }

  export type TeamspaceUncheckedUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isOrigin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    userOnTeamspace?: UserOnTeamspaceUncheckedUpdateManyWithoutTeamspaceNestedInput
  }

  export type UserUpsertWithoutPagesCreatedInput = {
    update: XOR<UserUpdateWithoutPagesCreatedInput, UserUncheckedUpdateWithoutPagesCreatedInput>
    create: XOR<UserCreateWithoutPagesCreatedInput, UserUncheckedCreateWithoutPagesCreatedInput>
  }

  export type UserUpdateWithoutPagesCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    PagesUpdated?: PageUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUpdateManyWithoutDeletedByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPagesCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUncheckedUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    PagesUpdated?: PageUncheckedUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUncheckedUpdateManyWithoutDeletedByUserNestedInput
  }

  export type UserUpsertWithoutPagesUpdatedInput = {
    update: XOR<UserUpdateWithoutPagesUpdatedInput, UserUncheckedUpdateWithoutPagesUpdatedInput>
    create: XOR<UserCreateWithoutPagesUpdatedInput, UserUncheckedCreateWithoutPagesUpdatedInput>
  }

  export type UserUpdateWithoutPagesUpdatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUpdateManyWithoutCreatedByUserNestedInput
    PagesDeleted?: PageUpdateManyWithoutDeletedByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPagesUpdatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUncheckedUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUncheckedUpdateManyWithoutCreatedByUserNestedInput
    PagesDeleted?: PageUncheckedUpdateManyWithoutDeletedByUserNestedInput
  }

  export type UserUpsertWithoutPagesDeletedInput = {
    update: XOR<UserUpdateWithoutPagesDeletedInput, UserUncheckedUpdateWithoutPagesDeletedInput>
    create: XOR<UserCreateWithoutPagesDeletedInput, UserUncheckedCreateWithoutPagesDeletedInput>
  }

  export type UserUpdateWithoutPagesDeletedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUpdateManyWithoutUpdatedByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPagesDeletedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUncheckedUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUncheckedUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUncheckedUpdateManyWithoutUpdatedByUserNestedInput
  }

  export type FavoriteUpsertWithWhereUniqueWithoutPageInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutPageInput, FavoriteUncheckedUpdateWithoutPageInput>
    create: XOR<FavoriteCreateWithoutPageInput, FavoriteUncheckedCreateWithoutPageInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutPageInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutPageInput, FavoriteUncheckedUpdateWithoutPageInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutPageInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutFavoritesInput>
  }

  export type UserCreateWithoutFavoritesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceCreateNestedManyWithoutUserInput
    PagesCreated?: PageCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserUncheckedCreateWithoutFavoritesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceUncheckedCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    PagesCreated?: PageUncheckedCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageUncheckedCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageUncheckedCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserCreateOrConnectWithoutFavoritesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
  }

  export type WorkspaceCreateWithoutFavoritesInput = {
    id?: string
    name: string
    domain: string
    stripeCustomerId?: string | null
    stripeWorkspaceId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceCreateNestedOneWithoutWorkspaceInput
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutWorkspaceInput
    teamspaces?: TeamspaceCreateNestedManyWithoutWorkspaceInput
    pages?: PageCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutFavoritesInput = {
    id?: string
    name: string
    domain: string
    stripeCustomerId?: string | null
    stripeWorkspaceId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedOneWithoutWorkspaceInput
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutWorkspaceInput
    teamspaces?: TeamspaceUncheckedCreateNestedManyWithoutWorkspaceInput
    pages?: PageUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutFavoritesInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutFavoritesInput, WorkspaceUncheckedCreateWithoutFavoritesInput>
  }

  export type PageCreateWithoutFavoritesInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspace: WorkspaceCreateNestedOneWithoutPagesInput
    teamspace?: TeamspaceCreateNestedOneWithoutPagesInput
    createdByUser: UserCreateNestedOneWithoutPagesCreatedInput
    updatedByUser: UserCreateNestedOneWithoutPagesUpdatedInput
    deletedByUser?: UserCreateNestedOneWithoutPagesDeletedInput
  }

  export type PageUncheckedCreateWithoutFavoritesInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspaceId: string
    teamspaceId?: string | null
    createdBy: string
    updatedBy: string
    deletedBy?: string | null
  }

  export type PageCreateOrConnectWithoutFavoritesInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutFavoritesInput, PageUncheckedCreateWithoutFavoritesInput>
  }

  export type UserUpsertWithoutFavoritesInput = {
    update: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
  }

  export type UserUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUpdateManyWithoutDeletedByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUncheckedUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUncheckedUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUncheckedUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUncheckedUpdateManyWithoutDeletedByUserNestedInput
  }

  export type WorkspaceUpsertWithoutFavoritesInput = {
    update: XOR<WorkspaceUpdateWithoutFavoritesInput, WorkspaceUncheckedUpdateWithoutFavoritesInput>
    create: XOR<WorkspaceCreateWithoutFavoritesInput, WorkspaceUncheckedCreateWithoutFavoritesInput>
  }

  export type WorkspaceUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUpdateOneWithoutWorkspaceNestedInput
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutWorkspaceNestedInput
    teamspaces?: TeamspaceUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUncheckedUpdateOneWithoutWorkspaceNestedInput
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutWorkspaceNestedInput
    teamspaces?: TeamspaceUncheckedUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type PageUpsertWithoutFavoritesInput = {
    update: XOR<PageUpdateWithoutFavoritesInput, PageUncheckedUpdateWithoutFavoritesInput>
    create: XOR<PageCreateWithoutFavoritesInput, PageUncheckedCreateWithoutFavoritesInput>
  }

  export type PageUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutPagesNestedInput
    teamspace?: TeamspaceUpdateOneWithoutPagesNestedInput
    createdByUser?: UserUpdateOneRequiredWithoutPagesCreatedNestedInput
    updatedByUser?: UserUpdateOneRequiredWithoutPagesUpdatedNestedInput
    deletedByUser?: UserUpdateOneWithoutPagesDeletedNestedInput
  }

  export type PageUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    teamspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateWithoutUserOnWorkspaceInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    PagesCreated?: PageCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserUncheckedCreateWithoutUserOnWorkspaceInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userOnTeamspace?: UserOnTeamspaceUncheckedCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    PagesCreated?: PageUncheckedCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageUncheckedCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageUncheckedCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserCreateOrConnectWithoutUserOnWorkspaceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserOnWorkspaceInput, UserUncheckedCreateWithoutUserOnWorkspaceInput>
  }

  export type WorkspaceCreateWithoutUserOnWorkspaceInput = {
    id?: string
    name: string
    domain: string
    stripeCustomerId?: string | null
    stripeWorkspaceId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceCreateNestedOneWithoutWorkspaceInput
    teamspaces?: TeamspaceCreateNestedManyWithoutWorkspaceInput
    pages?: PageCreateNestedManyWithoutWorkspaceInput
    favorites?: FavoriteCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutUserOnWorkspaceInput = {
    id?: string
    name: string
    domain: string
    stripeCustomerId?: string | null
    stripeWorkspaceId?: string | null
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeCurrentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedOneWithoutWorkspaceInput
    teamspaces?: TeamspaceUncheckedCreateNestedManyWithoutWorkspaceInput
    pages?: PageUncheckedCreateNestedManyWithoutWorkspaceInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutUserOnWorkspaceInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutUserOnWorkspaceInput, WorkspaceUncheckedCreateWithoutUserOnWorkspaceInput>
  }

  export type UserUpsertWithoutUserOnWorkspaceInput = {
    update: XOR<UserUpdateWithoutUserOnWorkspaceInput, UserUncheckedUpdateWithoutUserOnWorkspaceInput>
    create: XOR<UserCreateWithoutUserOnWorkspaceInput, UserUncheckedCreateWithoutUserOnWorkspaceInput>
  }

  export type UserUpdateWithoutUserOnWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUpdateManyWithoutDeletedByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserOnWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userOnTeamspace?: UserOnTeamspaceUncheckedUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUncheckedUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUncheckedUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUncheckedUpdateManyWithoutDeletedByUserNestedInput
  }

  export type WorkspaceUpsertWithoutUserOnWorkspaceInput = {
    update: XOR<WorkspaceUpdateWithoutUserOnWorkspaceInput, WorkspaceUncheckedUpdateWithoutUserOnWorkspaceInput>
    create: XOR<WorkspaceCreateWithoutUserOnWorkspaceInput, WorkspaceUncheckedCreateWithoutUserOnWorkspaceInput>
  }

  export type WorkspaceUpdateWithoutUserOnWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUpdateOneWithoutWorkspaceNestedInput
    teamspaces?: TeamspaceUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUpdateManyWithoutWorkspaceNestedInput
    favorites?: FavoriteUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutUserOnWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCurrentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    trackingUserAccessOnWorkspace?: TrackingUserAccessOnWorkspaceUncheckedUpdateOneWithoutWorkspaceNestedInput
    teamspaces?: TeamspaceUncheckedUpdateManyWithoutWorkspaceNestedInput
    pages?: PageUncheckedUpdateManyWithoutWorkspaceNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type UserCreateWithoutUserOnTeamspaceInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceCreateNestedManyWithoutUserInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    PagesCreated?: PageCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserUncheckedCreateWithoutUserOnTeamspaceInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stripeCustomerId?: string | null
    lastAccessWorkspaceId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    userOnWorkspace?: UserOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedCreateNestedManyWithoutUserInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    PagesCreated?: PageUncheckedCreateNestedManyWithoutCreatedByUserInput
    PagesUpdated?: PageUncheckedCreateNestedManyWithoutUpdatedByUserInput
    PagesDeleted?: PageUncheckedCreateNestedManyWithoutDeletedByUserInput
  }

  export type UserCreateOrConnectWithoutUserOnTeamspaceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserOnTeamspaceInput, UserUncheckedCreateWithoutUserOnTeamspaceInput>
  }

  export type TeamspaceCreateWithoutUserOnTeamspaceInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isOrigin?: boolean | null
    archivedAt?: Date | string | null
    createdBy: string
    workspace?: WorkspaceCreateNestedOneWithoutTeamspacesInput
    pages?: PageCreateNestedManyWithoutTeamspaceInput
  }

  export type TeamspaceUncheckedCreateWithoutUserOnTeamspaceInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isOrigin?: boolean | null
    archivedAt?: Date | string | null
    workspaceId?: string | null
    createdBy: string
    pages?: PageUncheckedCreateNestedManyWithoutTeamspaceInput
  }

  export type TeamspaceCreateOrConnectWithoutUserOnTeamspaceInput = {
    where: TeamspaceWhereUniqueInput
    create: XOR<TeamspaceCreateWithoutUserOnTeamspaceInput, TeamspaceUncheckedCreateWithoutUserOnTeamspaceInput>
  }

  export type UserUpsertWithoutUserOnTeamspaceInput = {
    update: XOR<UserUpdateWithoutUserOnTeamspaceInput, UserUncheckedUpdateWithoutUserOnTeamspaceInput>
    create: XOR<UserCreateWithoutUserOnTeamspaceInput, UserUncheckedCreateWithoutUserOnTeamspaceInput>
  }

  export type UserUpdateWithoutUserOnTeamspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUpdateManyWithoutDeletedByUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserOnTeamspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lastAccessWorkspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    userOnWorkspace?: UserOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    trackingUserAccess?: TrackingUserAccessOnWorkspaceUncheckedUpdateManyWithoutUserNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    PagesCreated?: PageUncheckedUpdateManyWithoutCreatedByUserNestedInput
    PagesUpdated?: PageUncheckedUpdateManyWithoutUpdatedByUserNestedInput
    PagesDeleted?: PageUncheckedUpdateManyWithoutDeletedByUserNestedInput
  }

  export type TeamspaceUpsertWithoutUserOnTeamspaceInput = {
    update: XOR<TeamspaceUpdateWithoutUserOnTeamspaceInput, TeamspaceUncheckedUpdateWithoutUserOnTeamspaceInput>
    create: XOR<TeamspaceCreateWithoutUserOnTeamspaceInput, TeamspaceUncheckedCreateWithoutUserOnTeamspaceInput>
  }

  export type TeamspaceUpdateWithoutUserOnTeamspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isOrigin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    workspace?: WorkspaceUpdateOneWithoutTeamspacesNestedInput
    pages?: PageUpdateManyWithoutTeamspaceNestedInput
  }

  export type TeamspaceUncheckedUpdateWithoutUserOnTeamspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isOrigin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    pages?: PageUncheckedUpdateManyWithoutTeamspaceNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    accessToken?: string | null
    expires: Date | string
  }

  export type UserOnWorkspaceCreateManyUserInput = {
    id?: string
    role?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaceId: string
  }

  export type UserOnTeamspaceCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    operation?: number
    teamspaceId: string
  }

  export type TrackingUserAccessOnWorkspaceCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    lastAccessPageId?: string | null
    workspaceId: string
  }

  export type FavoriteCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaceId: string
    pageId: string
  }

  export type PageCreateManyCreatedByUserInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspaceId: string
    teamspaceId?: string | null
    updatedBy: string
    deletedBy?: string | null
  }

  export type PageCreateManyUpdatedByUserInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspaceId: string
    teamspaceId?: string | null
    createdBy: string
    deletedBy?: string | null
  }

  export type PageCreateManyDeletedByUserInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspaceId: string
    teamspaceId?: string | null
    createdBy: string
    updatedBy: string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOnWorkspaceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutUserOnWorkspaceNestedInput
  }

  export type UserOnWorkspaceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaceId?: StringFieldUpdateOperationsInput | string
  }

  export type UserOnWorkspaceUncheckedUpdateManyWithoutUserOnWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaceId?: StringFieldUpdateOperationsInput | string
  }

  export type UserOnTeamspaceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operation?: IntFieldUpdateOperationsInput | number
    teamspace?: TeamspaceUpdateOneRequiredWithoutUserOnTeamspaceNestedInput
  }

  export type UserOnTeamspaceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operation?: IntFieldUpdateOperationsInput | number
    teamspaceId?: StringFieldUpdateOperationsInput | string
  }

  export type UserOnTeamspaceUncheckedUpdateManyWithoutUserOnTeamspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operation?: IntFieldUpdateOperationsInput | number
    teamspaceId?: StringFieldUpdateOperationsInput | string
  }

  export type TrackingUserAccessOnWorkspaceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessPageId?: NullableStringFieldUpdateOperationsInput | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutTrackingUserAccessOnWorkspaceNestedInput
  }

  export type TrackingUserAccessOnWorkspaceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessPageId?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
  }

  export type TrackingUserAccessOnWorkspaceUncheckedUpdateManyWithoutTrackingUserAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAccessPageId?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
  }

  export type FavoriteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneWithoutFavoritesNestedInput
    page?: PageUpdateOneWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type FavoriteUncheckedUpdateManyWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type PageUpdateWithoutCreatedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutPagesNestedInput
    teamspace?: TeamspaceUpdateOneWithoutPagesNestedInput
    updatedByUser?: UserUpdateOneRequiredWithoutPagesUpdatedNestedInput
    deletedByUser?: UserUpdateOneWithoutPagesDeletedNestedInput
    favorites?: FavoriteUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutCreatedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    teamspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: StringFieldUpdateOperationsInput | string
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    favorites?: FavoriteUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateManyWithoutPagesCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    teamspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: StringFieldUpdateOperationsInput | string
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PageUpdateWithoutUpdatedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutPagesNestedInput
    teamspace?: TeamspaceUpdateOneWithoutPagesNestedInput
    createdByUser?: UserUpdateOneRequiredWithoutPagesCreatedNestedInput
    deletedByUser?: UserUpdateOneWithoutPagesDeletedNestedInput
    favorites?: FavoriteUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutUpdatedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    teamspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    favorites?: FavoriteUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateManyWithoutPagesUpdatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    teamspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PageUpdateWithoutDeletedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutPagesNestedInput
    teamspace?: TeamspaceUpdateOneWithoutPagesNestedInput
    createdByUser?: UserUpdateOneRequiredWithoutPagesCreatedNestedInput
    updatedByUser?: UserUpdateOneRequiredWithoutPagesUpdatedNestedInput
    favorites?: FavoriteUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutDeletedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    teamspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    favorites?: FavoriteUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateManyWithoutPagesDeletedInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    teamspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
  }

  export type UserOnWorkspaceCreateManyWorkspaceInput = {
    id?: string
    role?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type TeamspaceCreateManyWorkspaceInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isOrigin?: boolean | null
    archivedAt?: Date | string | null
    createdBy: string
  }

  export type PageCreateManyWorkspaceInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    teamspaceId?: string | null
    createdBy: string
    updatedBy: string
    deletedBy?: string | null
  }

  export type FavoriteCreateManyWorkspaceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    pageId: string
  }

  export type UserOnWorkspaceUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserOnWorkspaceNestedInput
  }

  export type UserOnWorkspaceUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TeamspaceUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isOrigin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    userOnTeamspace?: UserOnTeamspaceUpdateManyWithoutTeamspaceNestedInput
    pages?: PageUpdateManyWithoutTeamspaceNestedInput
  }

  export type TeamspaceUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isOrigin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    userOnTeamspace?: UserOnTeamspaceUncheckedUpdateManyWithoutTeamspaceNestedInput
    pages?: PageUncheckedUpdateManyWithoutTeamspaceNestedInput
  }

  export type TeamspaceUncheckedUpdateManyWithoutTeamspacesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isOrigin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    archivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type PageUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teamspace?: TeamspaceUpdateOneWithoutPagesNestedInput
    createdByUser?: UserUpdateOneRequiredWithoutPagesCreatedNestedInput
    updatedByUser?: UserUpdateOneRequiredWithoutPagesUpdatedNestedInput
    deletedByUser?: UserUpdateOneWithoutPagesDeletedNestedInput
    favorites?: FavoriteUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teamspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    favorites?: FavoriteUncheckedUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateManyWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    teamspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FavoriteUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
    page?: PageUpdateOneWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type UserOnTeamspaceCreateManyTeamspaceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    operation?: number
    userId: string
  }

  export type PageCreateManyTeamspaceInput = {
    id?: string
    title: string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    workspaceId: string
    createdBy: string
    updatedBy: string
    deletedBy?: string | null
  }

  export type UserOnTeamspaceUpdateWithoutTeamspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operation?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutUserOnTeamspaceNestedInput
  }

  export type UserOnTeamspaceUncheckedUpdateWithoutTeamspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operation?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PageUpdateWithoutTeamspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspace?: WorkspaceUpdateOneRequiredWithoutPagesNestedInput
    createdByUser?: UserUpdateOneRequiredWithoutPagesCreatedNestedInput
    updatedByUser?: UserUpdateOneRequiredWithoutPagesUpdatedNestedInput
    deletedByUser?: UserUpdateOneWithoutPagesDeletedNestedInput
    favorites?: FavoriteUpdateManyWithoutPageNestedInput
  }

  export type PageUncheckedUpdateWithoutTeamspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workspaceId?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    deletedBy?: NullableStringFieldUpdateOperationsInput | string | null
    favorites?: FavoriteUncheckedUpdateManyWithoutPageNestedInput
  }

  export type FavoriteCreateManyPageInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    workspaceId: string
  }

  export type FavoriteUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
    workspace?: WorkspaceUpdateOneWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}