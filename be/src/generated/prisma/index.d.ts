
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model DurianData
 * 
 */
export type DurianData = $Result.DefaultSelection<Prisma.$DurianDataPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DurianData
 * const durianData = await prisma.durianData.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more DurianData
   * const durianData = await prisma.durianData.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.durianData`: Exposes CRUD operations for the **DurianData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DurianData
    * const durianData = await prisma.durianData.findMany()
    * ```
    */
  get durianData(): Prisma.DurianDataDelegate<ExtArgs, ClientOptions>;
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
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    DurianData: 'DurianData'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "durianData"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DurianData: {
        payload: Prisma.$DurianDataPayload<ExtArgs>
        fields: Prisma.DurianDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DurianDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DurianDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DurianDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DurianDataPayload>
          }
          findFirst: {
            args: Prisma.DurianDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DurianDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DurianDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DurianDataPayload>
          }
          findMany: {
            args: Prisma.DurianDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DurianDataPayload>[]
          }
          create: {
            args: Prisma.DurianDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DurianDataPayload>
          }
          createMany: {
            args: Prisma.DurianDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DurianDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DurianDataPayload>[]
          }
          delete: {
            args: Prisma.DurianDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DurianDataPayload>
          }
          update: {
            args: Prisma.DurianDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DurianDataPayload>
          }
          deleteMany: {
            args: Prisma.DurianDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DurianDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DurianDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DurianDataPayload>[]
          }
          upsert: {
            args: Prisma.DurianDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DurianDataPayload>
          }
          aggregate: {
            args: Prisma.DurianDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDurianData>
          }
          groupBy: {
            args: Prisma.DurianDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<DurianDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.DurianDataCountArgs<ExtArgs>
            result: $Utils.Optional<DurianDataCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    durianData?: DurianDataOmit
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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

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
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Models
   */

  /**
   * Model DurianData
   */

  export type AggregateDurianData = {
    _count: DurianDataCountAggregateOutputType | null
    _avg: DurianDataAvgAggregateOutputType | null
    _sum: DurianDataSumAggregateOutputType | null
    _min: DurianDataMinAggregateOutputType | null
    _max: DurianDataMaxAggregateOutputType | null
  }

  export type DurianDataAvgAggregateOutputType = {
    id: number | null
    harga: number | null
  }

  export type DurianDataSumAggregateOutputType = {
    id: number | null
    harga: number | null
  }

  export type DurianDataMinAggregateOutputType = {
    id: number | null
    filename: string | null
    jenis: string | null
    grade: string | null
    harga: number | null
  }

  export type DurianDataMaxAggregateOutputType = {
    id: number | null
    filename: string | null
    jenis: string | null
    grade: string | null
    harga: number | null
  }

  export type DurianDataCountAggregateOutputType = {
    id: number
    filename: number
    jenis: number
    grade: number
    harga: number
    _all: number
  }


  export type DurianDataAvgAggregateInputType = {
    id?: true
    harga?: true
  }

  export type DurianDataSumAggregateInputType = {
    id?: true
    harga?: true
  }

  export type DurianDataMinAggregateInputType = {
    id?: true
    filename?: true
    jenis?: true
    grade?: true
    harga?: true
  }

  export type DurianDataMaxAggregateInputType = {
    id?: true
    filename?: true
    jenis?: true
    grade?: true
    harga?: true
  }

  export type DurianDataCountAggregateInputType = {
    id?: true
    filename?: true
    jenis?: true
    grade?: true
    harga?: true
    _all?: true
  }

  export type DurianDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DurianData to aggregate.
     */
    where?: DurianDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DurianData to fetch.
     */
    orderBy?: DurianDataOrderByWithRelationInput | DurianDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DurianDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DurianData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DurianData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DurianData
    **/
    _count?: true | DurianDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DurianDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DurianDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DurianDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DurianDataMaxAggregateInputType
  }

  export type GetDurianDataAggregateType<T extends DurianDataAggregateArgs> = {
        [P in keyof T & keyof AggregateDurianData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDurianData[P]>
      : GetScalarType<T[P], AggregateDurianData[P]>
  }




  export type DurianDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DurianDataWhereInput
    orderBy?: DurianDataOrderByWithAggregationInput | DurianDataOrderByWithAggregationInput[]
    by: DurianDataScalarFieldEnum[] | DurianDataScalarFieldEnum
    having?: DurianDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DurianDataCountAggregateInputType | true
    _avg?: DurianDataAvgAggregateInputType
    _sum?: DurianDataSumAggregateInputType
    _min?: DurianDataMinAggregateInputType
    _max?: DurianDataMaxAggregateInputType
  }

  export type DurianDataGroupByOutputType = {
    id: number
    filename: string
    jenis: string
    grade: string
    harga: number
    _count: DurianDataCountAggregateOutputType | null
    _avg: DurianDataAvgAggregateOutputType | null
    _sum: DurianDataSumAggregateOutputType | null
    _min: DurianDataMinAggregateOutputType | null
    _max: DurianDataMaxAggregateOutputType | null
  }

  type GetDurianDataGroupByPayload<T extends DurianDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DurianDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DurianDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DurianDataGroupByOutputType[P]>
            : GetScalarType<T[P], DurianDataGroupByOutputType[P]>
        }
      >
    >


  export type DurianDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    jenis?: boolean
    grade?: boolean
    harga?: boolean
  }, ExtArgs["result"]["durianData"]>

  export type DurianDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    jenis?: boolean
    grade?: boolean
    harga?: boolean
  }, ExtArgs["result"]["durianData"]>

  export type DurianDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    filename?: boolean
    jenis?: boolean
    grade?: boolean
    harga?: boolean
  }, ExtArgs["result"]["durianData"]>

  export type DurianDataSelectScalar = {
    id?: boolean
    filename?: boolean
    jenis?: boolean
    grade?: boolean
    harga?: boolean
  }

  export type DurianDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "filename" | "jenis" | "grade" | "harga", ExtArgs["result"]["durianData"]>

  export type $DurianDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DurianData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      filename: string
      jenis: string
      grade: string
      harga: number
    }, ExtArgs["result"]["durianData"]>
    composites: {}
  }

  type DurianDataGetPayload<S extends boolean | null | undefined | DurianDataDefaultArgs> = $Result.GetResult<Prisma.$DurianDataPayload, S>

  type DurianDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DurianDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DurianDataCountAggregateInputType | true
    }

  export interface DurianDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DurianData'], meta: { name: 'DurianData' } }
    /**
     * Find zero or one DurianData that matches the filter.
     * @param {DurianDataFindUniqueArgs} args - Arguments to find a DurianData
     * @example
     * // Get one DurianData
     * const durianData = await prisma.durianData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DurianDataFindUniqueArgs>(args: SelectSubset<T, DurianDataFindUniqueArgs<ExtArgs>>): Prisma__DurianDataClient<$Result.GetResult<Prisma.$DurianDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DurianData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DurianDataFindUniqueOrThrowArgs} args - Arguments to find a DurianData
     * @example
     * // Get one DurianData
     * const durianData = await prisma.durianData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DurianDataFindUniqueOrThrowArgs>(args: SelectSubset<T, DurianDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DurianDataClient<$Result.GetResult<Prisma.$DurianDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DurianData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DurianDataFindFirstArgs} args - Arguments to find a DurianData
     * @example
     * // Get one DurianData
     * const durianData = await prisma.durianData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DurianDataFindFirstArgs>(args?: SelectSubset<T, DurianDataFindFirstArgs<ExtArgs>>): Prisma__DurianDataClient<$Result.GetResult<Prisma.$DurianDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DurianData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DurianDataFindFirstOrThrowArgs} args - Arguments to find a DurianData
     * @example
     * // Get one DurianData
     * const durianData = await prisma.durianData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DurianDataFindFirstOrThrowArgs>(args?: SelectSubset<T, DurianDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__DurianDataClient<$Result.GetResult<Prisma.$DurianDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DurianData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DurianDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DurianData
     * const durianData = await prisma.durianData.findMany()
     * 
     * // Get first 10 DurianData
     * const durianData = await prisma.durianData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const durianDataWithIdOnly = await prisma.durianData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DurianDataFindManyArgs>(args?: SelectSubset<T, DurianDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DurianDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DurianData.
     * @param {DurianDataCreateArgs} args - Arguments to create a DurianData.
     * @example
     * // Create one DurianData
     * const DurianData = await prisma.durianData.create({
     *   data: {
     *     // ... data to create a DurianData
     *   }
     * })
     * 
     */
    create<T extends DurianDataCreateArgs>(args: SelectSubset<T, DurianDataCreateArgs<ExtArgs>>): Prisma__DurianDataClient<$Result.GetResult<Prisma.$DurianDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DurianData.
     * @param {DurianDataCreateManyArgs} args - Arguments to create many DurianData.
     * @example
     * // Create many DurianData
     * const durianData = await prisma.durianData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DurianDataCreateManyArgs>(args?: SelectSubset<T, DurianDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DurianData and returns the data saved in the database.
     * @param {DurianDataCreateManyAndReturnArgs} args - Arguments to create many DurianData.
     * @example
     * // Create many DurianData
     * const durianData = await prisma.durianData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DurianData and only return the `id`
     * const durianDataWithIdOnly = await prisma.durianData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DurianDataCreateManyAndReturnArgs>(args?: SelectSubset<T, DurianDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DurianDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DurianData.
     * @param {DurianDataDeleteArgs} args - Arguments to delete one DurianData.
     * @example
     * // Delete one DurianData
     * const DurianData = await prisma.durianData.delete({
     *   where: {
     *     // ... filter to delete one DurianData
     *   }
     * })
     * 
     */
    delete<T extends DurianDataDeleteArgs>(args: SelectSubset<T, DurianDataDeleteArgs<ExtArgs>>): Prisma__DurianDataClient<$Result.GetResult<Prisma.$DurianDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DurianData.
     * @param {DurianDataUpdateArgs} args - Arguments to update one DurianData.
     * @example
     * // Update one DurianData
     * const durianData = await prisma.durianData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DurianDataUpdateArgs>(args: SelectSubset<T, DurianDataUpdateArgs<ExtArgs>>): Prisma__DurianDataClient<$Result.GetResult<Prisma.$DurianDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DurianData.
     * @param {DurianDataDeleteManyArgs} args - Arguments to filter DurianData to delete.
     * @example
     * // Delete a few DurianData
     * const { count } = await prisma.durianData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DurianDataDeleteManyArgs>(args?: SelectSubset<T, DurianDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DurianData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DurianDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DurianData
     * const durianData = await prisma.durianData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DurianDataUpdateManyArgs>(args: SelectSubset<T, DurianDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DurianData and returns the data updated in the database.
     * @param {DurianDataUpdateManyAndReturnArgs} args - Arguments to update many DurianData.
     * @example
     * // Update many DurianData
     * const durianData = await prisma.durianData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DurianData and only return the `id`
     * const durianDataWithIdOnly = await prisma.durianData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DurianDataUpdateManyAndReturnArgs>(args: SelectSubset<T, DurianDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DurianDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DurianData.
     * @param {DurianDataUpsertArgs} args - Arguments to update or create a DurianData.
     * @example
     * // Update or create a DurianData
     * const durianData = await prisma.durianData.upsert({
     *   create: {
     *     // ... data to create a DurianData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DurianData we want to update
     *   }
     * })
     */
    upsert<T extends DurianDataUpsertArgs>(args: SelectSubset<T, DurianDataUpsertArgs<ExtArgs>>): Prisma__DurianDataClient<$Result.GetResult<Prisma.$DurianDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DurianData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DurianDataCountArgs} args - Arguments to filter DurianData to count.
     * @example
     * // Count the number of DurianData
     * const count = await prisma.durianData.count({
     *   where: {
     *     // ... the filter for the DurianData we want to count
     *   }
     * })
    **/
    count<T extends DurianDataCountArgs>(
      args?: Subset<T, DurianDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DurianDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DurianData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DurianDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DurianDataAggregateArgs>(args: Subset<T, DurianDataAggregateArgs>): Prisma.PrismaPromise<GetDurianDataAggregateType<T>>

    /**
     * Group by DurianData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DurianDataGroupByArgs} args - Group by arguments.
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
      T extends DurianDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DurianDataGroupByArgs['orderBy'] }
        : { orderBy?: DurianDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, DurianDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDurianDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DurianData model
   */
  readonly fields: DurianDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DurianData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DurianDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DurianData model
   */
  interface DurianDataFieldRefs {
    readonly id: FieldRef<"DurianData", 'Int'>
    readonly filename: FieldRef<"DurianData", 'String'>
    readonly jenis: FieldRef<"DurianData", 'String'>
    readonly grade: FieldRef<"DurianData", 'String'>
    readonly harga: FieldRef<"DurianData", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * DurianData findUnique
   */
  export type DurianDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DurianData
     */
    select?: DurianDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DurianData
     */
    omit?: DurianDataOmit<ExtArgs> | null
    /**
     * Filter, which DurianData to fetch.
     */
    where: DurianDataWhereUniqueInput
  }

  /**
   * DurianData findUniqueOrThrow
   */
  export type DurianDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DurianData
     */
    select?: DurianDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DurianData
     */
    omit?: DurianDataOmit<ExtArgs> | null
    /**
     * Filter, which DurianData to fetch.
     */
    where: DurianDataWhereUniqueInput
  }

  /**
   * DurianData findFirst
   */
  export type DurianDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DurianData
     */
    select?: DurianDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DurianData
     */
    omit?: DurianDataOmit<ExtArgs> | null
    /**
     * Filter, which DurianData to fetch.
     */
    where?: DurianDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DurianData to fetch.
     */
    orderBy?: DurianDataOrderByWithRelationInput | DurianDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DurianData.
     */
    cursor?: DurianDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DurianData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DurianData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DurianData.
     */
    distinct?: DurianDataScalarFieldEnum | DurianDataScalarFieldEnum[]
  }

  /**
   * DurianData findFirstOrThrow
   */
  export type DurianDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DurianData
     */
    select?: DurianDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DurianData
     */
    omit?: DurianDataOmit<ExtArgs> | null
    /**
     * Filter, which DurianData to fetch.
     */
    where?: DurianDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DurianData to fetch.
     */
    orderBy?: DurianDataOrderByWithRelationInput | DurianDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DurianData.
     */
    cursor?: DurianDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DurianData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DurianData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DurianData.
     */
    distinct?: DurianDataScalarFieldEnum | DurianDataScalarFieldEnum[]
  }

  /**
   * DurianData findMany
   */
  export type DurianDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DurianData
     */
    select?: DurianDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DurianData
     */
    omit?: DurianDataOmit<ExtArgs> | null
    /**
     * Filter, which DurianData to fetch.
     */
    where?: DurianDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DurianData to fetch.
     */
    orderBy?: DurianDataOrderByWithRelationInput | DurianDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DurianData.
     */
    cursor?: DurianDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DurianData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DurianData.
     */
    skip?: number
    distinct?: DurianDataScalarFieldEnum | DurianDataScalarFieldEnum[]
  }

  /**
   * DurianData create
   */
  export type DurianDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DurianData
     */
    select?: DurianDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DurianData
     */
    omit?: DurianDataOmit<ExtArgs> | null
    /**
     * The data needed to create a DurianData.
     */
    data: XOR<DurianDataCreateInput, DurianDataUncheckedCreateInput>
  }

  /**
   * DurianData createMany
   */
  export type DurianDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DurianData.
     */
    data: DurianDataCreateManyInput | DurianDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DurianData createManyAndReturn
   */
  export type DurianDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DurianData
     */
    select?: DurianDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DurianData
     */
    omit?: DurianDataOmit<ExtArgs> | null
    /**
     * The data used to create many DurianData.
     */
    data: DurianDataCreateManyInput | DurianDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DurianData update
   */
  export type DurianDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DurianData
     */
    select?: DurianDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DurianData
     */
    omit?: DurianDataOmit<ExtArgs> | null
    /**
     * The data needed to update a DurianData.
     */
    data: XOR<DurianDataUpdateInput, DurianDataUncheckedUpdateInput>
    /**
     * Choose, which DurianData to update.
     */
    where: DurianDataWhereUniqueInput
  }

  /**
   * DurianData updateMany
   */
  export type DurianDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DurianData.
     */
    data: XOR<DurianDataUpdateManyMutationInput, DurianDataUncheckedUpdateManyInput>
    /**
     * Filter which DurianData to update
     */
    where?: DurianDataWhereInput
    /**
     * Limit how many DurianData to update.
     */
    limit?: number
  }

  /**
   * DurianData updateManyAndReturn
   */
  export type DurianDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DurianData
     */
    select?: DurianDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DurianData
     */
    omit?: DurianDataOmit<ExtArgs> | null
    /**
     * The data used to update DurianData.
     */
    data: XOR<DurianDataUpdateManyMutationInput, DurianDataUncheckedUpdateManyInput>
    /**
     * Filter which DurianData to update
     */
    where?: DurianDataWhereInput
    /**
     * Limit how many DurianData to update.
     */
    limit?: number
  }

  /**
   * DurianData upsert
   */
  export type DurianDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DurianData
     */
    select?: DurianDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DurianData
     */
    omit?: DurianDataOmit<ExtArgs> | null
    /**
     * The filter to search for the DurianData to update in case it exists.
     */
    where: DurianDataWhereUniqueInput
    /**
     * In case the DurianData found by the `where` argument doesn't exist, create a new DurianData with this data.
     */
    create: XOR<DurianDataCreateInput, DurianDataUncheckedCreateInput>
    /**
     * In case the DurianData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DurianDataUpdateInput, DurianDataUncheckedUpdateInput>
  }

  /**
   * DurianData delete
   */
  export type DurianDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DurianData
     */
    select?: DurianDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DurianData
     */
    omit?: DurianDataOmit<ExtArgs> | null
    /**
     * Filter which DurianData to delete.
     */
    where: DurianDataWhereUniqueInput
  }

  /**
   * DurianData deleteMany
   */
  export type DurianDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DurianData to delete
     */
    where?: DurianDataWhereInput
    /**
     * Limit how many DurianData to delete.
     */
    limit?: number
  }

  /**
   * DurianData without action
   */
  export type DurianDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DurianData
     */
    select?: DurianDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DurianData
     */
    omit?: DurianDataOmit<ExtArgs> | null
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


  export const DurianDataScalarFieldEnum: {
    id: 'id',
    filename: 'filename',
    jenis: 'jenis',
    grade: 'grade',
    harga: 'harga'
  };

  export type DurianDataScalarFieldEnum = (typeof DurianDataScalarFieldEnum)[keyof typeof DurianDataScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type DurianDataWhereInput = {
    AND?: DurianDataWhereInput | DurianDataWhereInput[]
    OR?: DurianDataWhereInput[]
    NOT?: DurianDataWhereInput | DurianDataWhereInput[]
    id?: IntFilter<"DurianData"> | number
    filename?: StringFilter<"DurianData"> | string
    jenis?: StringFilter<"DurianData"> | string
    grade?: StringFilter<"DurianData"> | string
    harga?: FloatFilter<"DurianData"> | number
  }

  export type DurianDataOrderByWithRelationInput = {
    id?: SortOrder
    filename?: SortOrder
    jenis?: SortOrder
    grade?: SortOrder
    harga?: SortOrder
  }

  export type DurianDataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DurianDataWhereInput | DurianDataWhereInput[]
    OR?: DurianDataWhereInput[]
    NOT?: DurianDataWhereInput | DurianDataWhereInput[]
    filename?: StringFilter<"DurianData"> | string
    jenis?: StringFilter<"DurianData"> | string
    grade?: StringFilter<"DurianData"> | string
    harga?: FloatFilter<"DurianData"> | number
  }, "id">

  export type DurianDataOrderByWithAggregationInput = {
    id?: SortOrder
    filename?: SortOrder
    jenis?: SortOrder
    grade?: SortOrder
    harga?: SortOrder
    _count?: DurianDataCountOrderByAggregateInput
    _avg?: DurianDataAvgOrderByAggregateInput
    _max?: DurianDataMaxOrderByAggregateInput
    _min?: DurianDataMinOrderByAggregateInput
    _sum?: DurianDataSumOrderByAggregateInput
  }

  export type DurianDataScalarWhereWithAggregatesInput = {
    AND?: DurianDataScalarWhereWithAggregatesInput | DurianDataScalarWhereWithAggregatesInput[]
    OR?: DurianDataScalarWhereWithAggregatesInput[]
    NOT?: DurianDataScalarWhereWithAggregatesInput | DurianDataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DurianData"> | number
    filename?: StringWithAggregatesFilter<"DurianData"> | string
    jenis?: StringWithAggregatesFilter<"DurianData"> | string
    grade?: StringWithAggregatesFilter<"DurianData"> | string
    harga?: FloatWithAggregatesFilter<"DurianData"> | number
  }

  export type DurianDataCreateInput = {
    filename: string
    jenis: string
    grade: string
    harga: number
  }

  export type DurianDataUncheckedCreateInput = {
    id?: number
    filename: string
    jenis: string
    grade: string
    harga: number
  }

  export type DurianDataUpdateInput = {
    filename?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    harga?: FloatFieldUpdateOperationsInput | number
  }

  export type DurianDataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    harga?: FloatFieldUpdateOperationsInput | number
  }

  export type DurianDataCreateManyInput = {
    id?: number
    filename: string
    jenis: string
    grade: string
    harga: number
  }

  export type DurianDataUpdateManyMutationInput = {
    filename?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    harga?: FloatFieldUpdateOperationsInput | number
  }

  export type DurianDataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    harga?: FloatFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DurianDataCountOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    jenis?: SortOrder
    grade?: SortOrder
    harga?: SortOrder
  }

  export type DurianDataAvgOrderByAggregateInput = {
    id?: SortOrder
    harga?: SortOrder
  }

  export type DurianDataMaxOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    jenis?: SortOrder
    grade?: SortOrder
    harga?: SortOrder
  }

  export type DurianDataMinOrderByAggregateInput = {
    id?: SortOrder
    filename?: SortOrder
    jenis?: SortOrder
    grade?: SortOrder
    harga?: SortOrder
  }

  export type DurianDataSumOrderByAggregateInput = {
    id?: SortOrder
    harga?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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