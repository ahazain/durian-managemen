
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Jadwal
 * 
 */
export type Jadwal = $Result.DefaultSelection<Prisma.$JadwalPayload>
/**
 * Model Absensi
 * 
 */
export type Absensi = $Result.DefaultSelection<Prisma.$AbsensiPayload>
/**
 * Model Prediksi
 * 
 */
export type Prediksi = $Result.DefaultSelection<Prisma.$PrediksiPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AbsensiStatus: {
  HADIR: 'HADIR',
  ALFA: 'ALFA',
  IZIN: 'IZIN',
  SAKIT: 'SAKIT'
};

export type AbsensiStatus = (typeof AbsensiStatus)[keyof typeof AbsensiStatus]


export const Shift: {
  PAGI: 'PAGI',
  SIANG: 'SIANG',
  MALAM: 'MALAM'
};

export type Shift = (typeof Shift)[keyof typeof Shift]


export const Role: {
  ADMIN: 'ADMIN',
  KARYAWAN: 'KARYAWAN'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type AbsensiStatus = $Enums.AbsensiStatus

export const AbsensiStatus: typeof $Enums.AbsensiStatus

export type Shift = $Enums.Shift

export const Shift: typeof $Enums.Shift

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jadwal`: Exposes CRUD operations for the **Jadwal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jadwals
    * const jadwals = await prisma.jadwal.findMany()
    * ```
    */
  get jadwal(): Prisma.JadwalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.absensi`: Exposes CRUD operations for the **Absensi** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Absensis
    * const absensis = await prisma.absensi.findMany()
    * ```
    */
  get absensi(): Prisma.AbsensiDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.prediksi`: Exposes CRUD operations for the **Prediksi** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prediksis
    * const prediksis = await prisma.prediksi.findMany()
    * ```
    */
  get prediksi(): Prisma.PrediksiDelegate<ExtArgs, ClientOptions>;
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
    User: 'User',
    Jadwal: 'Jadwal',
    Absensi: 'Absensi',
    Prediksi: 'Prediksi'
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
      modelProps: "user" | "jadwal" | "absensi" | "prediksi"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Jadwal: {
        payload: Prisma.$JadwalPayload<ExtArgs>
        fields: Prisma.JadwalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JadwalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JadwalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalPayload>
          }
          findFirst: {
            args: Prisma.JadwalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JadwalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalPayload>
          }
          findMany: {
            args: Prisma.JadwalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalPayload>[]
          }
          create: {
            args: Prisma.JadwalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalPayload>
          }
          createMany: {
            args: Prisma.JadwalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JadwalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalPayload>[]
          }
          delete: {
            args: Prisma.JadwalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalPayload>
          }
          update: {
            args: Prisma.JadwalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalPayload>
          }
          deleteMany: {
            args: Prisma.JadwalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JadwalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JadwalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalPayload>[]
          }
          upsert: {
            args: Prisma.JadwalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalPayload>
          }
          aggregate: {
            args: Prisma.JadwalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJadwal>
          }
          groupBy: {
            args: Prisma.JadwalGroupByArgs<ExtArgs>
            result: $Utils.Optional<JadwalGroupByOutputType>[]
          }
          count: {
            args: Prisma.JadwalCountArgs<ExtArgs>
            result: $Utils.Optional<JadwalCountAggregateOutputType> | number
          }
        }
      }
      Absensi: {
        payload: Prisma.$AbsensiPayload<ExtArgs>
        fields: Prisma.AbsensiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AbsensiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AbsensiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>
          }
          findFirst: {
            args: Prisma.AbsensiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AbsensiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>
          }
          findMany: {
            args: Prisma.AbsensiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>[]
          }
          create: {
            args: Prisma.AbsensiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>
          }
          createMany: {
            args: Prisma.AbsensiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AbsensiCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>[]
          }
          delete: {
            args: Prisma.AbsensiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>
          }
          update: {
            args: Prisma.AbsensiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>
          }
          deleteMany: {
            args: Prisma.AbsensiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AbsensiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AbsensiUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>[]
          }
          upsert: {
            args: Prisma.AbsensiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>
          }
          aggregate: {
            args: Prisma.AbsensiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAbsensi>
          }
          groupBy: {
            args: Prisma.AbsensiGroupByArgs<ExtArgs>
            result: $Utils.Optional<AbsensiGroupByOutputType>[]
          }
          count: {
            args: Prisma.AbsensiCountArgs<ExtArgs>
            result: $Utils.Optional<AbsensiCountAggregateOutputType> | number
          }
        }
      }
      Prediksi: {
        payload: Prisma.$PrediksiPayload<ExtArgs>
        fields: Prisma.PrediksiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrediksiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrediksiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrediksiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrediksiPayload>
          }
          findFirst: {
            args: Prisma.PrediksiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrediksiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrediksiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrediksiPayload>
          }
          findMany: {
            args: Prisma.PrediksiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrediksiPayload>[]
          }
          create: {
            args: Prisma.PrediksiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrediksiPayload>
          }
          createMany: {
            args: Prisma.PrediksiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrediksiCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrediksiPayload>[]
          }
          delete: {
            args: Prisma.PrediksiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrediksiPayload>
          }
          update: {
            args: Prisma.PrediksiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrediksiPayload>
          }
          deleteMany: {
            args: Prisma.PrediksiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrediksiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PrediksiUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrediksiPayload>[]
          }
          upsert: {
            args: Prisma.PrediksiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrediksiPayload>
          }
          aggregate: {
            args: Prisma.PrediksiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrediksi>
          }
          groupBy: {
            args: Prisma.PrediksiGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrediksiGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrediksiCountArgs<ExtArgs>
            result: $Utils.Optional<PrediksiCountAggregateOutputType> | number
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
    user?: UserOmit
    jadwal?: JadwalOmit
    absensi?: AbsensiOmit
    prediksi?: PrediksiOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    prediksi: number
    absensi: number
    jadwal: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prediksi?: boolean | UserCountOutputTypeCountPrediksiArgs
    absensi?: boolean | UserCountOutputTypeCountAbsensiArgs
    jadwal?: boolean | UserCountOutputTypeCountJadwalArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPrediksiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrediksiWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAbsensiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AbsensiWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJadwalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JadwalWhereInput
  }


  /**
   * Models
   */

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
    nama: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    nama: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    nama: number
    email: number
    password: number
    role: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    nama?: true
    email?: true
    password?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    nama?: true
    email?: true
    password?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    nama?: true
    email?: true
    password?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    nama: string
    email: string
    password: string
    role: $Enums.Role
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    prediksi?: boolean | User$prediksiArgs<ExtArgs>
    absensi?: boolean | User$absensiArgs<ExtArgs>
    jadwal?: boolean | User$jadwalArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    nama?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nama" | "email" | "password" | "role", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prediksi?: boolean | User$prediksiArgs<ExtArgs>
    absensi?: boolean | User$absensiArgs<ExtArgs>
    jadwal?: boolean | User$jadwalArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      prediksi: Prisma.$PrediksiPayload<ExtArgs>[]
      absensi: Prisma.$AbsensiPayload<ExtArgs>[]
      jadwal: Prisma.$JadwalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nama: string
      email: string
      password: string
      role: $Enums.Role
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    prediksi<T extends User$prediksiArgs<ExtArgs> = {}>(args?: Subset<T, User$prediksiArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrediksiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    absensi<T extends User$absensiArgs<ExtArgs> = {}>(args?: Subset<T, User$absensiArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jadwal<T extends User$jadwalArgs<ExtArgs> = {}>(args?: Subset<T, User$jadwalArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly nama: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.prediksi
   */
  export type User$prediksiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediksi
     */
    select?: PrediksiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediksi
     */
    omit?: PrediksiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrediksiInclude<ExtArgs> | null
    where?: PrediksiWhereInput
    orderBy?: PrediksiOrderByWithRelationInput | PrediksiOrderByWithRelationInput[]
    cursor?: PrediksiWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrediksiScalarFieldEnum | PrediksiScalarFieldEnum[]
  }

  /**
   * User.absensi
   */
  export type User$absensiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absensi
     */
    omit?: AbsensiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    where?: AbsensiWhereInput
    orderBy?: AbsensiOrderByWithRelationInput | AbsensiOrderByWithRelationInput[]
    cursor?: AbsensiWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AbsensiScalarFieldEnum | AbsensiScalarFieldEnum[]
  }

  /**
   * User.jadwal
   */
  export type User$jadwalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jadwal
     */
    select?: JadwalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jadwal
     */
    omit?: JadwalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalInclude<ExtArgs> | null
    where?: JadwalWhereInput
    orderBy?: JadwalOrderByWithRelationInput | JadwalOrderByWithRelationInput[]
    cursor?: JadwalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JadwalScalarFieldEnum | JadwalScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Jadwal
   */

  export type AggregateJadwal = {
    _count: JadwalCountAggregateOutputType | null
    _min: JadwalMinAggregateOutputType | null
    _max: JadwalMaxAggregateOutputType | null
  }

  export type JadwalMinAggregateOutputType = {
    id: string | null
    tanggal: Date | null
    shift: $Enums.Shift | null
    id_user: string | null
  }

  export type JadwalMaxAggregateOutputType = {
    id: string | null
    tanggal: Date | null
    shift: $Enums.Shift | null
    id_user: string | null
  }

  export type JadwalCountAggregateOutputType = {
    id: number
    tanggal: number
    shift: number
    id_user: number
    _all: number
  }


  export type JadwalMinAggregateInputType = {
    id?: true
    tanggal?: true
    shift?: true
    id_user?: true
  }

  export type JadwalMaxAggregateInputType = {
    id?: true
    tanggal?: true
    shift?: true
    id_user?: true
  }

  export type JadwalCountAggregateInputType = {
    id?: true
    tanggal?: true
    shift?: true
    id_user?: true
    _all?: true
  }

  export type JadwalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jadwal to aggregate.
     */
    where?: JadwalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jadwals to fetch.
     */
    orderBy?: JadwalOrderByWithRelationInput | JadwalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JadwalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jadwals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jadwals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jadwals
    **/
    _count?: true | JadwalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JadwalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JadwalMaxAggregateInputType
  }

  export type GetJadwalAggregateType<T extends JadwalAggregateArgs> = {
        [P in keyof T & keyof AggregateJadwal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJadwal[P]>
      : GetScalarType<T[P], AggregateJadwal[P]>
  }




  export type JadwalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JadwalWhereInput
    orderBy?: JadwalOrderByWithAggregationInput | JadwalOrderByWithAggregationInput[]
    by: JadwalScalarFieldEnum[] | JadwalScalarFieldEnum
    having?: JadwalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JadwalCountAggregateInputType | true
    _min?: JadwalMinAggregateInputType
    _max?: JadwalMaxAggregateInputType
  }

  export type JadwalGroupByOutputType = {
    id: string
    tanggal: Date
    shift: $Enums.Shift
    id_user: string
    _count: JadwalCountAggregateOutputType | null
    _min: JadwalMinAggregateOutputType | null
    _max: JadwalMaxAggregateOutputType | null
  }

  type GetJadwalGroupByPayload<T extends JadwalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JadwalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JadwalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JadwalGroupByOutputType[P]>
            : GetScalarType<T[P], JadwalGroupByOutputType[P]>
        }
      >
    >


  export type JadwalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    shift?: boolean
    id_user?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jadwal"]>

  export type JadwalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    shift?: boolean
    id_user?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jadwal"]>

  export type JadwalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    shift?: boolean
    id_user?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jadwal"]>

  export type JadwalSelectScalar = {
    id?: boolean
    tanggal?: boolean
    shift?: boolean
    id_user?: boolean
  }

  export type JadwalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tanggal" | "shift" | "id_user", ExtArgs["result"]["jadwal"]>
  export type JadwalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type JadwalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type JadwalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $JadwalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Jadwal"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tanggal: Date
      shift: $Enums.Shift
      id_user: string
    }, ExtArgs["result"]["jadwal"]>
    composites: {}
  }

  type JadwalGetPayload<S extends boolean | null | undefined | JadwalDefaultArgs> = $Result.GetResult<Prisma.$JadwalPayload, S>

  type JadwalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JadwalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JadwalCountAggregateInputType | true
    }

  export interface JadwalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Jadwal'], meta: { name: 'Jadwal' } }
    /**
     * Find zero or one Jadwal that matches the filter.
     * @param {JadwalFindUniqueArgs} args - Arguments to find a Jadwal
     * @example
     * // Get one Jadwal
     * const jadwal = await prisma.jadwal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JadwalFindUniqueArgs>(args: SelectSubset<T, JadwalFindUniqueArgs<ExtArgs>>): Prisma__JadwalClient<$Result.GetResult<Prisma.$JadwalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Jadwal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JadwalFindUniqueOrThrowArgs} args - Arguments to find a Jadwal
     * @example
     * // Get one Jadwal
     * const jadwal = await prisma.jadwal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JadwalFindUniqueOrThrowArgs>(args: SelectSubset<T, JadwalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JadwalClient<$Result.GetResult<Prisma.$JadwalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Jadwal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalFindFirstArgs} args - Arguments to find a Jadwal
     * @example
     * // Get one Jadwal
     * const jadwal = await prisma.jadwal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JadwalFindFirstArgs>(args?: SelectSubset<T, JadwalFindFirstArgs<ExtArgs>>): Prisma__JadwalClient<$Result.GetResult<Prisma.$JadwalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Jadwal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalFindFirstOrThrowArgs} args - Arguments to find a Jadwal
     * @example
     * // Get one Jadwal
     * const jadwal = await prisma.jadwal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JadwalFindFirstOrThrowArgs>(args?: SelectSubset<T, JadwalFindFirstOrThrowArgs<ExtArgs>>): Prisma__JadwalClient<$Result.GetResult<Prisma.$JadwalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jadwals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jadwals
     * const jadwals = await prisma.jadwal.findMany()
     * 
     * // Get first 10 Jadwals
     * const jadwals = await prisma.jadwal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jadwalWithIdOnly = await prisma.jadwal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JadwalFindManyArgs>(args?: SelectSubset<T, JadwalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Jadwal.
     * @param {JadwalCreateArgs} args - Arguments to create a Jadwal.
     * @example
     * // Create one Jadwal
     * const Jadwal = await prisma.jadwal.create({
     *   data: {
     *     // ... data to create a Jadwal
     *   }
     * })
     * 
     */
    create<T extends JadwalCreateArgs>(args: SelectSubset<T, JadwalCreateArgs<ExtArgs>>): Prisma__JadwalClient<$Result.GetResult<Prisma.$JadwalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jadwals.
     * @param {JadwalCreateManyArgs} args - Arguments to create many Jadwals.
     * @example
     * // Create many Jadwals
     * const jadwal = await prisma.jadwal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JadwalCreateManyArgs>(args?: SelectSubset<T, JadwalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jadwals and returns the data saved in the database.
     * @param {JadwalCreateManyAndReturnArgs} args - Arguments to create many Jadwals.
     * @example
     * // Create many Jadwals
     * const jadwal = await prisma.jadwal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jadwals and only return the `id`
     * const jadwalWithIdOnly = await prisma.jadwal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JadwalCreateManyAndReturnArgs>(args?: SelectSubset<T, JadwalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Jadwal.
     * @param {JadwalDeleteArgs} args - Arguments to delete one Jadwal.
     * @example
     * // Delete one Jadwal
     * const Jadwal = await prisma.jadwal.delete({
     *   where: {
     *     // ... filter to delete one Jadwal
     *   }
     * })
     * 
     */
    delete<T extends JadwalDeleteArgs>(args: SelectSubset<T, JadwalDeleteArgs<ExtArgs>>): Prisma__JadwalClient<$Result.GetResult<Prisma.$JadwalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Jadwal.
     * @param {JadwalUpdateArgs} args - Arguments to update one Jadwal.
     * @example
     * // Update one Jadwal
     * const jadwal = await prisma.jadwal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JadwalUpdateArgs>(args: SelectSubset<T, JadwalUpdateArgs<ExtArgs>>): Prisma__JadwalClient<$Result.GetResult<Prisma.$JadwalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jadwals.
     * @param {JadwalDeleteManyArgs} args - Arguments to filter Jadwals to delete.
     * @example
     * // Delete a few Jadwals
     * const { count } = await prisma.jadwal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JadwalDeleteManyArgs>(args?: SelectSubset<T, JadwalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jadwals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jadwals
     * const jadwal = await prisma.jadwal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JadwalUpdateManyArgs>(args: SelectSubset<T, JadwalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jadwals and returns the data updated in the database.
     * @param {JadwalUpdateManyAndReturnArgs} args - Arguments to update many Jadwals.
     * @example
     * // Update many Jadwals
     * const jadwal = await prisma.jadwal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jadwals and only return the `id`
     * const jadwalWithIdOnly = await prisma.jadwal.updateManyAndReturn({
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
    updateManyAndReturn<T extends JadwalUpdateManyAndReturnArgs>(args: SelectSubset<T, JadwalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Jadwal.
     * @param {JadwalUpsertArgs} args - Arguments to update or create a Jadwal.
     * @example
     * // Update or create a Jadwal
     * const jadwal = await prisma.jadwal.upsert({
     *   create: {
     *     // ... data to create a Jadwal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Jadwal we want to update
     *   }
     * })
     */
    upsert<T extends JadwalUpsertArgs>(args: SelectSubset<T, JadwalUpsertArgs<ExtArgs>>): Prisma__JadwalClient<$Result.GetResult<Prisma.$JadwalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jadwals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalCountArgs} args - Arguments to filter Jadwals to count.
     * @example
     * // Count the number of Jadwals
     * const count = await prisma.jadwal.count({
     *   where: {
     *     // ... the filter for the Jadwals we want to count
     *   }
     * })
    **/
    count<T extends JadwalCountArgs>(
      args?: Subset<T, JadwalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JadwalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Jadwal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JadwalAggregateArgs>(args: Subset<T, JadwalAggregateArgs>): Prisma.PrismaPromise<GetJadwalAggregateType<T>>

    /**
     * Group by Jadwal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalGroupByArgs} args - Group by arguments.
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
      T extends JadwalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JadwalGroupByArgs['orderBy'] }
        : { orderBy?: JadwalGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JadwalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJadwalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Jadwal model
   */
  readonly fields: JadwalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Jadwal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JadwalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Jadwal model
   */
  interface JadwalFieldRefs {
    readonly id: FieldRef<"Jadwal", 'String'>
    readonly tanggal: FieldRef<"Jadwal", 'DateTime'>
    readonly shift: FieldRef<"Jadwal", 'Shift'>
    readonly id_user: FieldRef<"Jadwal", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Jadwal findUnique
   */
  export type JadwalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jadwal
     */
    select?: JadwalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jadwal
     */
    omit?: JadwalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalInclude<ExtArgs> | null
    /**
     * Filter, which Jadwal to fetch.
     */
    where: JadwalWhereUniqueInput
  }

  /**
   * Jadwal findUniqueOrThrow
   */
  export type JadwalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jadwal
     */
    select?: JadwalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jadwal
     */
    omit?: JadwalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalInclude<ExtArgs> | null
    /**
     * Filter, which Jadwal to fetch.
     */
    where: JadwalWhereUniqueInput
  }

  /**
   * Jadwal findFirst
   */
  export type JadwalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jadwal
     */
    select?: JadwalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jadwal
     */
    omit?: JadwalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalInclude<ExtArgs> | null
    /**
     * Filter, which Jadwal to fetch.
     */
    where?: JadwalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jadwals to fetch.
     */
    orderBy?: JadwalOrderByWithRelationInput | JadwalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jadwals.
     */
    cursor?: JadwalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jadwals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jadwals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jadwals.
     */
    distinct?: JadwalScalarFieldEnum | JadwalScalarFieldEnum[]
  }

  /**
   * Jadwal findFirstOrThrow
   */
  export type JadwalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jadwal
     */
    select?: JadwalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jadwal
     */
    omit?: JadwalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalInclude<ExtArgs> | null
    /**
     * Filter, which Jadwal to fetch.
     */
    where?: JadwalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jadwals to fetch.
     */
    orderBy?: JadwalOrderByWithRelationInput | JadwalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jadwals.
     */
    cursor?: JadwalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jadwals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jadwals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jadwals.
     */
    distinct?: JadwalScalarFieldEnum | JadwalScalarFieldEnum[]
  }

  /**
   * Jadwal findMany
   */
  export type JadwalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jadwal
     */
    select?: JadwalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jadwal
     */
    omit?: JadwalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalInclude<ExtArgs> | null
    /**
     * Filter, which Jadwals to fetch.
     */
    where?: JadwalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jadwals to fetch.
     */
    orderBy?: JadwalOrderByWithRelationInput | JadwalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jadwals.
     */
    cursor?: JadwalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jadwals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jadwals.
     */
    skip?: number
    distinct?: JadwalScalarFieldEnum | JadwalScalarFieldEnum[]
  }

  /**
   * Jadwal create
   */
  export type JadwalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jadwal
     */
    select?: JadwalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jadwal
     */
    omit?: JadwalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalInclude<ExtArgs> | null
    /**
     * The data needed to create a Jadwal.
     */
    data: XOR<JadwalCreateInput, JadwalUncheckedCreateInput>
  }

  /**
   * Jadwal createMany
   */
  export type JadwalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jadwals.
     */
    data: JadwalCreateManyInput | JadwalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Jadwal createManyAndReturn
   */
  export type JadwalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jadwal
     */
    select?: JadwalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Jadwal
     */
    omit?: JadwalOmit<ExtArgs> | null
    /**
     * The data used to create many Jadwals.
     */
    data: JadwalCreateManyInput | JadwalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Jadwal update
   */
  export type JadwalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jadwal
     */
    select?: JadwalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jadwal
     */
    omit?: JadwalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalInclude<ExtArgs> | null
    /**
     * The data needed to update a Jadwal.
     */
    data: XOR<JadwalUpdateInput, JadwalUncheckedUpdateInput>
    /**
     * Choose, which Jadwal to update.
     */
    where: JadwalWhereUniqueInput
  }

  /**
   * Jadwal updateMany
   */
  export type JadwalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jadwals.
     */
    data: XOR<JadwalUpdateManyMutationInput, JadwalUncheckedUpdateManyInput>
    /**
     * Filter which Jadwals to update
     */
    where?: JadwalWhereInput
    /**
     * Limit how many Jadwals to update.
     */
    limit?: number
  }

  /**
   * Jadwal updateManyAndReturn
   */
  export type JadwalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jadwal
     */
    select?: JadwalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Jadwal
     */
    omit?: JadwalOmit<ExtArgs> | null
    /**
     * The data used to update Jadwals.
     */
    data: XOR<JadwalUpdateManyMutationInput, JadwalUncheckedUpdateManyInput>
    /**
     * Filter which Jadwals to update
     */
    where?: JadwalWhereInput
    /**
     * Limit how many Jadwals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Jadwal upsert
   */
  export type JadwalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jadwal
     */
    select?: JadwalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jadwal
     */
    omit?: JadwalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalInclude<ExtArgs> | null
    /**
     * The filter to search for the Jadwal to update in case it exists.
     */
    where: JadwalWhereUniqueInput
    /**
     * In case the Jadwal found by the `where` argument doesn't exist, create a new Jadwal with this data.
     */
    create: XOR<JadwalCreateInput, JadwalUncheckedCreateInput>
    /**
     * In case the Jadwal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JadwalUpdateInput, JadwalUncheckedUpdateInput>
  }

  /**
   * Jadwal delete
   */
  export type JadwalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jadwal
     */
    select?: JadwalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jadwal
     */
    omit?: JadwalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalInclude<ExtArgs> | null
    /**
     * Filter which Jadwal to delete.
     */
    where: JadwalWhereUniqueInput
  }

  /**
   * Jadwal deleteMany
   */
  export type JadwalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jadwals to delete
     */
    where?: JadwalWhereInput
    /**
     * Limit how many Jadwals to delete.
     */
    limit?: number
  }

  /**
   * Jadwal without action
   */
  export type JadwalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Jadwal
     */
    select?: JadwalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Jadwal
     */
    omit?: JadwalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalInclude<ExtArgs> | null
  }


  /**
   * Model Absensi
   */

  export type AggregateAbsensi = {
    _count: AbsensiCountAggregateOutputType | null
    _min: AbsensiMinAggregateOutputType | null
    _max: AbsensiMaxAggregateOutputType | null
  }

  export type AbsensiMinAggregateOutputType = {
    id: string | null
    tanggal: Date | null
    status: $Enums.AbsensiStatus | null
    verifikasi: boolean | null
    user_id: string | null
  }

  export type AbsensiMaxAggregateOutputType = {
    id: string | null
    tanggal: Date | null
    status: $Enums.AbsensiStatus | null
    verifikasi: boolean | null
    user_id: string | null
  }

  export type AbsensiCountAggregateOutputType = {
    id: number
    tanggal: number
    status: number
    verifikasi: number
    user_id: number
    _all: number
  }


  export type AbsensiMinAggregateInputType = {
    id?: true
    tanggal?: true
    status?: true
    verifikasi?: true
    user_id?: true
  }

  export type AbsensiMaxAggregateInputType = {
    id?: true
    tanggal?: true
    status?: true
    verifikasi?: true
    user_id?: true
  }

  export type AbsensiCountAggregateInputType = {
    id?: true
    tanggal?: true
    status?: true
    verifikasi?: true
    user_id?: true
    _all?: true
  }

  export type AbsensiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Absensi to aggregate.
     */
    where?: AbsensiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Absensis to fetch.
     */
    orderBy?: AbsensiOrderByWithRelationInput | AbsensiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AbsensiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Absensis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Absensis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Absensis
    **/
    _count?: true | AbsensiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AbsensiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AbsensiMaxAggregateInputType
  }

  export type GetAbsensiAggregateType<T extends AbsensiAggregateArgs> = {
        [P in keyof T & keyof AggregateAbsensi]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAbsensi[P]>
      : GetScalarType<T[P], AggregateAbsensi[P]>
  }




  export type AbsensiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AbsensiWhereInput
    orderBy?: AbsensiOrderByWithAggregationInput | AbsensiOrderByWithAggregationInput[]
    by: AbsensiScalarFieldEnum[] | AbsensiScalarFieldEnum
    having?: AbsensiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AbsensiCountAggregateInputType | true
    _min?: AbsensiMinAggregateInputType
    _max?: AbsensiMaxAggregateInputType
  }

  export type AbsensiGroupByOutputType = {
    id: string
    tanggal: Date
    status: $Enums.AbsensiStatus
    verifikasi: boolean
    user_id: string
    _count: AbsensiCountAggregateOutputType | null
    _min: AbsensiMinAggregateOutputType | null
    _max: AbsensiMaxAggregateOutputType | null
  }

  type GetAbsensiGroupByPayload<T extends AbsensiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AbsensiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AbsensiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AbsensiGroupByOutputType[P]>
            : GetScalarType<T[P], AbsensiGroupByOutputType[P]>
        }
      >
    >


  export type AbsensiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    status?: boolean
    verifikasi?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["absensi"]>

  export type AbsensiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    status?: boolean
    verifikasi?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["absensi"]>

  export type AbsensiSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    status?: boolean
    verifikasi?: boolean
    user_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["absensi"]>

  export type AbsensiSelectScalar = {
    id?: boolean
    tanggal?: boolean
    status?: boolean
    verifikasi?: boolean
    user_id?: boolean
  }

  export type AbsensiOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tanggal" | "status" | "verifikasi" | "user_id", ExtArgs["result"]["absensi"]>
  export type AbsensiInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AbsensiIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AbsensiIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AbsensiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Absensi"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tanggal: Date
      status: $Enums.AbsensiStatus
      verifikasi: boolean
      user_id: string
    }, ExtArgs["result"]["absensi"]>
    composites: {}
  }

  type AbsensiGetPayload<S extends boolean | null | undefined | AbsensiDefaultArgs> = $Result.GetResult<Prisma.$AbsensiPayload, S>

  type AbsensiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AbsensiFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AbsensiCountAggregateInputType | true
    }

  export interface AbsensiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Absensi'], meta: { name: 'Absensi' } }
    /**
     * Find zero or one Absensi that matches the filter.
     * @param {AbsensiFindUniqueArgs} args - Arguments to find a Absensi
     * @example
     * // Get one Absensi
     * const absensi = await prisma.absensi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AbsensiFindUniqueArgs>(args: SelectSubset<T, AbsensiFindUniqueArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Absensi that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AbsensiFindUniqueOrThrowArgs} args - Arguments to find a Absensi
     * @example
     * // Get one Absensi
     * const absensi = await prisma.absensi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AbsensiFindUniqueOrThrowArgs>(args: SelectSubset<T, AbsensiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Absensi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiFindFirstArgs} args - Arguments to find a Absensi
     * @example
     * // Get one Absensi
     * const absensi = await prisma.absensi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AbsensiFindFirstArgs>(args?: SelectSubset<T, AbsensiFindFirstArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Absensi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiFindFirstOrThrowArgs} args - Arguments to find a Absensi
     * @example
     * // Get one Absensi
     * const absensi = await prisma.absensi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AbsensiFindFirstOrThrowArgs>(args?: SelectSubset<T, AbsensiFindFirstOrThrowArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Absensis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Absensis
     * const absensis = await prisma.absensi.findMany()
     * 
     * // Get first 10 Absensis
     * const absensis = await prisma.absensi.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const absensiWithIdOnly = await prisma.absensi.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AbsensiFindManyArgs>(args?: SelectSubset<T, AbsensiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Absensi.
     * @param {AbsensiCreateArgs} args - Arguments to create a Absensi.
     * @example
     * // Create one Absensi
     * const Absensi = await prisma.absensi.create({
     *   data: {
     *     // ... data to create a Absensi
     *   }
     * })
     * 
     */
    create<T extends AbsensiCreateArgs>(args: SelectSubset<T, AbsensiCreateArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Absensis.
     * @param {AbsensiCreateManyArgs} args - Arguments to create many Absensis.
     * @example
     * // Create many Absensis
     * const absensi = await prisma.absensi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AbsensiCreateManyArgs>(args?: SelectSubset<T, AbsensiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Absensis and returns the data saved in the database.
     * @param {AbsensiCreateManyAndReturnArgs} args - Arguments to create many Absensis.
     * @example
     * // Create many Absensis
     * const absensi = await prisma.absensi.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Absensis and only return the `id`
     * const absensiWithIdOnly = await prisma.absensi.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AbsensiCreateManyAndReturnArgs>(args?: SelectSubset<T, AbsensiCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Absensi.
     * @param {AbsensiDeleteArgs} args - Arguments to delete one Absensi.
     * @example
     * // Delete one Absensi
     * const Absensi = await prisma.absensi.delete({
     *   where: {
     *     // ... filter to delete one Absensi
     *   }
     * })
     * 
     */
    delete<T extends AbsensiDeleteArgs>(args: SelectSubset<T, AbsensiDeleteArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Absensi.
     * @param {AbsensiUpdateArgs} args - Arguments to update one Absensi.
     * @example
     * // Update one Absensi
     * const absensi = await prisma.absensi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AbsensiUpdateArgs>(args: SelectSubset<T, AbsensiUpdateArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Absensis.
     * @param {AbsensiDeleteManyArgs} args - Arguments to filter Absensis to delete.
     * @example
     * // Delete a few Absensis
     * const { count } = await prisma.absensi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AbsensiDeleteManyArgs>(args?: SelectSubset<T, AbsensiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Absensis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Absensis
     * const absensi = await prisma.absensi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AbsensiUpdateManyArgs>(args: SelectSubset<T, AbsensiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Absensis and returns the data updated in the database.
     * @param {AbsensiUpdateManyAndReturnArgs} args - Arguments to update many Absensis.
     * @example
     * // Update many Absensis
     * const absensi = await prisma.absensi.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Absensis and only return the `id`
     * const absensiWithIdOnly = await prisma.absensi.updateManyAndReturn({
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
    updateManyAndReturn<T extends AbsensiUpdateManyAndReturnArgs>(args: SelectSubset<T, AbsensiUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Absensi.
     * @param {AbsensiUpsertArgs} args - Arguments to update or create a Absensi.
     * @example
     * // Update or create a Absensi
     * const absensi = await prisma.absensi.upsert({
     *   create: {
     *     // ... data to create a Absensi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Absensi we want to update
     *   }
     * })
     */
    upsert<T extends AbsensiUpsertArgs>(args: SelectSubset<T, AbsensiUpsertArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Absensis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiCountArgs} args - Arguments to filter Absensis to count.
     * @example
     * // Count the number of Absensis
     * const count = await prisma.absensi.count({
     *   where: {
     *     // ... the filter for the Absensis we want to count
     *   }
     * })
    **/
    count<T extends AbsensiCountArgs>(
      args?: Subset<T, AbsensiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AbsensiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Absensi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AbsensiAggregateArgs>(args: Subset<T, AbsensiAggregateArgs>): Prisma.PrismaPromise<GetAbsensiAggregateType<T>>

    /**
     * Group by Absensi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiGroupByArgs} args - Group by arguments.
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
      T extends AbsensiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AbsensiGroupByArgs['orderBy'] }
        : { orderBy?: AbsensiGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AbsensiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAbsensiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Absensi model
   */
  readonly fields: AbsensiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Absensi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AbsensiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Absensi model
   */
  interface AbsensiFieldRefs {
    readonly id: FieldRef<"Absensi", 'String'>
    readonly tanggal: FieldRef<"Absensi", 'DateTime'>
    readonly status: FieldRef<"Absensi", 'AbsensiStatus'>
    readonly verifikasi: FieldRef<"Absensi", 'Boolean'>
    readonly user_id: FieldRef<"Absensi", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Absensi findUnique
   */
  export type AbsensiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absensi
     */
    omit?: AbsensiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * Filter, which Absensi to fetch.
     */
    where: AbsensiWhereUniqueInput
  }

  /**
   * Absensi findUniqueOrThrow
   */
  export type AbsensiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absensi
     */
    omit?: AbsensiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * Filter, which Absensi to fetch.
     */
    where: AbsensiWhereUniqueInput
  }

  /**
   * Absensi findFirst
   */
  export type AbsensiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absensi
     */
    omit?: AbsensiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * Filter, which Absensi to fetch.
     */
    where?: AbsensiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Absensis to fetch.
     */
    orderBy?: AbsensiOrderByWithRelationInput | AbsensiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Absensis.
     */
    cursor?: AbsensiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Absensis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Absensis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Absensis.
     */
    distinct?: AbsensiScalarFieldEnum | AbsensiScalarFieldEnum[]
  }

  /**
   * Absensi findFirstOrThrow
   */
  export type AbsensiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absensi
     */
    omit?: AbsensiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * Filter, which Absensi to fetch.
     */
    where?: AbsensiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Absensis to fetch.
     */
    orderBy?: AbsensiOrderByWithRelationInput | AbsensiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Absensis.
     */
    cursor?: AbsensiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Absensis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Absensis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Absensis.
     */
    distinct?: AbsensiScalarFieldEnum | AbsensiScalarFieldEnum[]
  }

  /**
   * Absensi findMany
   */
  export type AbsensiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absensi
     */
    omit?: AbsensiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * Filter, which Absensis to fetch.
     */
    where?: AbsensiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Absensis to fetch.
     */
    orderBy?: AbsensiOrderByWithRelationInput | AbsensiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Absensis.
     */
    cursor?: AbsensiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Absensis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Absensis.
     */
    skip?: number
    distinct?: AbsensiScalarFieldEnum | AbsensiScalarFieldEnum[]
  }

  /**
   * Absensi create
   */
  export type AbsensiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absensi
     */
    omit?: AbsensiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * The data needed to create a Absensi.
     */
    data: XOR<AbsensiCreateInput, AbsensiUncheckedCreateInput>
  }

  /**
   * Absensi createMany
   */
  export type AbsensiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Absensis.
     */
    data: AbsensiCreateManyInput | AbsensiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Absensi createManyAndReturn
   */
  export type AbsensiCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Absensi
     */
    omit?: AbsensiOmit<ExtArgs> | null
    /**
     * The data used to create many Absensis.
     */
    data: AbsensiCreateManyInput | AbsensiCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Absensi update
   */
  export type AbsensiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absensi
     */
    omit?: AbsensiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * The data needed to update a Absensi.
     */
    data: XOR<AbsensiUpdateInput, AbsensiUncheckedUpdateInput>
    /**
     * Choose, which Absensi to update.
     */
    where: AbsensiWhereUniqueInput
  }

  /**
   * Absensi updateMany
   */
  export type AbsensiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Absensis.
     */
    data: XOR<AbsensiUpdateManyMutationInput, AbsensiUncheckedUpdateManyInput>
    /**
     * Filter which Absensis to update
     */
    where?: AbsensiWhereInput
    /**
     * Limit how many Absensis to update.
     */
    limit?: number
  }

  /**
   * Absensi updateManyAndReturn
   */
  export type AbsensiUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Absensi
     */
    omit?: AbsensiOmit<ExtArgs> | null
    /**
     * The data used to update Absensis.
     */
    data: XOR<AbsensiUpdateManyMutationInput, AbsensiUncheckedUpdateManyInput>
    /**
     * Filter which Absensis to update
     */
    where?: AbsensiWhereInput
    /**
     * Limit how many Absensis to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Absensi upsert
   */
  export type AbsensiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absensi
     */
    omit?: AbsensiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * The filter to search for the Absensi to update in case it exists.
     */
    where: AbsensiWhereUniqueInput
    /**
     * In case the Absensi found by the `where` argument doesn't exist, create a new Absensi with this data.
     */
    create: XOR<AbsensiCreateInput, AbsensiUncheckedCreateInput>
    /**
     * In case the Absensi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AbsensiUpdateInput, AbsensiUncheckedUpdateInput>
  }

  /**
   * Absensi delete
   */
  export type AbsensiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absensi
     */
    omit?: AbsensiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * Filter which Absensi to delete.
     */
    where: AbsensiWhereUniqueInput
  }

  /**
   * Absensi deleteMany
   */
  export type AbsensiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Absensis to delete
     */
    where?: AbsensiWhereInput
    /**
     * Limit how many Absensis to delete.
     */
    limit?: number
  }

  /**
   * Absensi without action
   */
  export type AbsensiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absensi
     */
    omit?: AbsensiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
  }


  /**
   * Model Prediksi
   */

  export type AggregatePrediksi = {
    _count: PrediksiCountAggregateOutputType | null
    _avg: PrediksiAvgAggregateOutputType | null
    _sum: PrediksiSumAggregateOutputType | null
    _min: PrediksiMinAggregateOutputType | null
    _max: PrediksiMaxAggregateOutputType | null
  }

  export type PrediksiAvgAggregateOutputType = {
    harga: number | null
  }

  export type PrediksiSumAggregateOutputType = {
    harga: number | null
  }

  export type PrediksiMinAggregateOutputType = {
    id: string | null
    imageUrl: string | null
    user_id: string | null
    kualitas: string | null
    harga: number | null
  }

  export type PrediksiMaxAggregateOutputType = {
    id: string | null
    imageUrl: string | null
    user_id: string | null
    kualitas: string | null
    harga: number | null
  }

  export type PrediksiCountAggregateOutputType = {
    id: number
    imageUrl: number
    user_id: number
    kualitas: number
    harga: number
    _all: number
  }


  export type PrediksiAvgAggregateInputType = {
    harga?: true
  }

  export type PrediksiSumAggregateInputType = {
    harga?: true
  }

  export type PrediksiMinAggregateInputType = {
    id?: true
    imageUrl?: true
    user_id?: true
    kualitas?: true
    harga?: true
  }

  export type PrediksiMaxAggregateInputType = {
    id?: true
    imageUrl?: true
    user_id?: true
    kualitas?: true
    harga?: true
  }

  export type PrediksiCountAggregateInputType = {
    id?: true
    imageUrl?: true
    user_id?: true
    kualitas?: true
    harga?: true
    _all?: true
  }

  export type PrediksiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prediksi to aggregate.
     */
    where?: PrediksiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prediksis to fetch.
     */
    orderBy?: PrediksiOrderByWithRelationInput | PrediksiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrediksiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prediksis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prediksis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prediksis
    **/
    _count?: true | PrediksiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrediksiAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrediksiSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrediksiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrediksiMaxAggregateInputType
  }

  export type GetPrediksiAggregateType<T extends PrediksiAggregateArgs> = {
        [P in keyof T & keyof AggregatePrediksi]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrediksi[P]>
      : GetScalarType<T[P], AggregatePrediksi[P]>
  }




  export type PrediksiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrediksiWhereInput
    orderBy?: PrediksiOrderByWithAggregationInput | PrediksiOrderByWithAggregationInput[]
    by: PrediksiScalarFieldEnum[] | PrediksiScalarFieldEnum
    having?: PrediksiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrediksiCountAggregateInputType | true
    _avg?: PrediksiAvgAggregateInputType
    _sum?: PrediksiSumAggregateInputType
    _min?: PrediksiMinAggregateInputType
    _max?: PrediksiMaxAggregateInputType
  }

  export type PrediksiGroupByOutputType = {
    id: string
    imageUrl: string
    user_id: string
    kualitas: string | null
    harga: number | null
    _count: PrediksiCountAggregateOutputType | null
    _avg: PrediksiAvgAggregateOutputType | null
    _sum: PrediksiSumAggregateOutputType | null
    _min: PrediksiMinAggregateOutputType | null
    _max: PrediksiMaxAggregateOutputType | null
  }

  type GetPrediksiGroupByPayload<T extends PrediksiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrediksiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrediksiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrediksiGroupByOutputType[P]>
            : GetScalarType<T[P], PrediksiGroupByOutputType[P]>
        }
      >
    >


  export type PrediksiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    user_id?: boolean
    kualitas?: boolean
    harga?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prediksi"]>

  export type PrediksiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    user_id?: boolean
    kualitas?: boolean
    harga?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prediksi"]>

  export type PrediksiSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    user_id?: boolean
    kualitas?: boolean
    harga?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prediksi"]>

  export type PrediksiSelectScalar = {
    id?: boolean
    imageUrl?: boolean
    user_id?: boolean
    kualitas?: boolean
    harga?: boolean
  }

  export type PrediksiOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "imageUrl" | "user_id" | "kualitas" | "harga", ExtArgs["result"]["prediksi"]>
  export type PrediksiInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PrediksiIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PrediksiIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PrediksiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prediksi"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      imageUrl: string
      user_id: string
      kualitas: string | null
      harga: number | null
    }, ExtArgs["result"]["prediksi"]>
    composites: {}
  }

  type PrediksiGetPayload<S extends boolean | null | undefined | PrediksiDefaultArgs> = $Result.GetResult<Prisma.$PrediksiPayload, S>

  type PrediksiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrediksiFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrediksiCountAggregateInputType | true
    }

  export interface PrediksiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prediksi'], meta: { name: 'Prediksi' } }
    /**
     * Find zero or one Prediksi that matches the filter.
     * @param {PrediksiFindUniqueArgs} args - Arguments to find a Prediksi
     * @example
     * // Get one Prediksi
     * const prediksi = await prisma.prediksi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrediksiFindUniqueArgs>(args: SelectSubset<T, PrediksiFindUniqueArgs<ExtArgs>>): Prisma__PrediksiClient<$Result.GetResult<Prisma.$PrediksiPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prediksi that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrediksiFindUniqueOrThrowArgs} args - Arguments to find a Prediksi
     * @example
     * // Get one Prediksi
     * const prediksi = await prisma.prediksi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrediksiFindUniqueOrThrowArgs>(args: SelectSubset<T, PrediksiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrediksiClient<$Result.GetResult<Prisma.$PrediksiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prediksi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrediksiFindFirstArgs} args - Arguments to find a Prediksi
     * @example
     * // Get one Prediksi
     * const prediksi = await prisma.prediksi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrediksiFindFirstArgs>(args?: SelectSubset<T, PrediksiFindFirstArgs<ExtArgs>>): Prisma__PrediksiClient<$Result.GetResult<Prisma.$PrediksiPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prediksi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrediksiFindFirstOrThrowArgs} args - Arguments to find a Prediksi
     * @example
     * // Get one Prediksi
     * const prediksi = await prisma.prediksi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrediksiFindFirstOrThrowArgs>(args?: SelectSubset<T, PrediksiFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrediksiClient<$Result.GetResult<Prisma.$PrediksiPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prediksis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrediksiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prediksis
     * const prediksis = await prisma.prediksi.findMany()
     * 
     * // Get first 10 Prediksis
     * const prediksis = await prisma.prediksi.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prediksiWithIdOnly = await prisma.prediksi.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrediksiFindManyArgs>(args?: SelectSubset<T, PrediksiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrediksiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prediksi.
     * @param {PrediksiCreateArgs} args - Arguments to create a Prediksi.
     * @example
     * // Create one Prediksi
     * const Prediksi = await prisma.prediksi.create({
     *   data: {
     *     // ... data to create a Prediksi
     *   }
     * })
     * 
     */
    create<T extends PrediksiCreateArgs>(args: SelectSubset<T, PrediksiCreateArgs<ExtArgs>>): Prisma__PrediksiClient<$Result.GetResult<Prisma.$PrediksiPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prediksis.
     * @param {PrediksiCreateManyArgs} args - Arguments to create many Prediksis.
     * @example
     * // Create many Prediksis
     * const prediksi = await prisma.prediksi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrediksiCreateManyArgs>(args?: SelectSubset<T, PrediksiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prediksis and returns the data saved in the database.
     * @param {PrediksiCreateManyAndReturnArgs} args - Arguments to create many Prediksis.
     * @example
     * // Create many Prediksis
     * const prediksi = await prisma.prediksi.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prediksis and only return the `id`
     * const prediksiWithIdOnly = await prisma.prediksi.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrediksiCreateManyAndReturnArgs>(args?: SelectSubset<T, PrediksiCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrediksiPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Prediksi.
     * @param {PrediksiDeleteArgs} args - Arguments to delete one Prediksi.
     * @example
     * // Delete one Prediksi
     * const Prediksi = await prisma.prediksi.delete({
     *   where: {
     *     // ... filter to delete one Prediksi
     *   }
     * })
     * 
     */
    delete<T extends PrediksiDeleteArgs>(args: SelectSubset<T, PrediksiDeleteArgs<ExtArgs>>): Prisma__PrediksiClient<$Result.GetResult<Prisma.$PrediksiPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prediksi.
     * @param {PrediksiUpdateArgs} args - Arguments to update one Prediksi.
     * @example
     * // Update one Prediksi
     * const prediksi = await prisma.prediksi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrediksiUpdateArgs>(args: SelectSubset<T, PrediksiUpdateArgs<ExtArgs>>): Prisma__PrediksiClient<$Result.GetResult<Prisma.$PrediksiPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prediksis.
     * @param {PrediksiDeleteManyArgs} args - Arguments to filter Prediksis to delete.
     * @example
     * // Delete a few Prediksis
     * const { count } = await prisma.prediksi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrediksiDeleteManyArgs>(args?: SelectSubset<T, PrediksiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prediksis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrediksiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prediksis
     * const prediksi = await prisma.prediksi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrediksiUpdateManyArgs>(args: SelectSubset<T, PrediksiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prediksis and returns the data updated in the database.
     * @param {PrediksiUpdateManyAndReturnArgs} args - Arguments to update many Prediksis.
     * @example
     * // Update many Prediksis
     * const prediksi = await prisma.prediksi.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Prediksis and only return the `id`
     * const prediksiWithIdOnly = await prisma.prediksi.updateManyAndReturn({
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
    updateManyAndReturn<T extends PrediksiUpdateManyAndReturnArgs>(args: SelectSubset<T, PrediksiUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrediksiPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Prediksi.
     * @param {PrediksiUpsertArgs} args - Arguments to update or create a Prediksi.
     * @example
     * // Update or create a Prediksi
     * const prediksi = await prisma.prediksi.upsert({
     *   create: {
     *     // ... data to create a Prediksi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prediksi we want to update
     *   }
     * })
     */
    upsert<T extends PrediksiUpsertArgs>(args: SelectSubset<T, PrediksiUpsertArgs<ExtArgs>>): Prisma__PrediksiClient<$Result.GetResult<Prisma.$PrediksiPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prediksis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrediksiCountArgs} args - Arguments to filter Prediksis to count.
     * @example
     * // Count the number of Prediksis
     * const count = await prisma.prediksi.count({
     *   where: {
     *     // ... the filter for the Prediksis we want to count
     *   }
     * })
    **/
    count<T extends PrediksiCountArgs>(
      args?: Subset<T, PrediksiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrediksiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prediksi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrediksiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PrediksiAggregateArgs>(args: Subset<T, PrediksiAggregateArgs>): Prisma.PrismaPromise<GetPrediksiAggregateType<T>>

    /**
     * Group by Prediksi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrediksiGroupByArgs} args - Group by arguments.
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
      T extends PrediksiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrediksiGroupByArgs['orderBy'] }
        : { orderBy?: PrediksiGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PrediksiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrediksiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prediksi model
   */
  readonly fields: PrediksiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prediksi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrediksiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Prediksi model
   */
  interface PrediksiFieldRefs {
    readonly id: FieldRef<"Prediksi", 'String'>
    readonly imageUrl: FieldRef<"Prediksi", 'String'>
    readonly user_id: FieldRef<"Prediksi", 'String'>
    readonly kualitas: FieldRef<"Prediksi", 'String'>
    readonly harga: FieldRef<"Prediksi", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Prediksi findUnique
   */
  export type PrediksiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediksi
     */
    select?: PrediksiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediksi
     */
    omit?: PrediksiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrediksiInclude<ExtArgs> | null
    /**
     * Filter, which Prediksi to fetch.
     */
    where: PrediksiWhereUniqueInput
  }

  /**
   * Prediksi findUniqueOrThrow
   */
  export type PrediksiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediksi
     */
    select?: PrediksiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediksi
     */
    omit?: PrediksiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrediksiInclude<ExtArgs> | null
    /**
     * Filter, which Prediksi to fetch.
     */
    where: PrediksiWhereUniqueInput
  }

  /**
   * Prediksi findFirst
   */
  export type PrediksiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediksi
     */
    select?: PrediksiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediksi
     */
    omit?: PrediksiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrediksiInclude<ExtArgs> | null
    /**
     * Filter, which Prediksi to fetch.
     */
    where?: PrediksiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prediksis to fetch.
     */
    orderBy?: PrediksiOrderByWithRelationInput | PrediksiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prediksis.
     */
    cursor?: PrediksiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prediksis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prediksis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prediksis.
     */
    distinct?: PrediksiScalarFieldEnum | PrediksiScalarFieldEnum[]
  }

  /**
   * Prediksi findFirstOrThrow
   */
  export type PrediksiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediksi
     */
    select?: PrediksiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediksi
     */
    omit?: PrediksiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrediksiInclude<ExtArgs> | null
    /**
     * Filter, which Prediksi to fetch.
     */
    where?: PrediksiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prediksis to fetch.
     */
    orderBy?: PrediksiOrderByWithRelationInput | PrediksiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prediksis.
     */
    cursor?: PrediksiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prediksis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prediksis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prediksis.
     */
    distinct?: PrediksiScalarFieldEnum | PrediksiScalarFieldEnum[]
  }

  /**
   * Prediksi findMany
   */
  export type PrediksiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediksi
     */
    select?: PrediksiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediksi
     */
    omit?: PrediksiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrediksiInclude<ExtArgs> | null
    /**
     * Filter, which Prediksis to fetch.
     */
    where?: PrediksiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prediksis to fetch.
     */
    orderBy?: PrediksiOrderByWithRelationInput | PrediksiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prediksis.
     */
    cursor?: PrediksiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prediksis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prediksis.
     */
    skip?: number
    distinct?: PrediksiScalarFieldEnum | PrediksiScalarFieldEnum[]
  }

  /**
   * Prediksi create
   */
  export type PrediksiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediksi
     */
    select?: PrediksiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediksi
     */
    omit?: PrediksiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrediksiInclude<ExtArgs> | null
    /**
     * The data needed to create a Prediksi.
     */
    data: XOR<PrediksiCreateInput, PrediksiUncheckedCreateInput>
  }

  /**
   * Prediksi createMany
   */
  export type PrediksiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prediksis.
     */
    data: PrediksiCreateManyInput | PrediksiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prediksi createManyAndReturn
   */
  export type PrediksiCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediksi
     */
    select?: PrediksiSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prediksi
     */
    omit?: PrediksiOmit<ExtArgs> | null
    /**
     * The data used to create many Prediksis.
     */
    data: PrediksiCreateManyInput | PrediksiCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrediksiIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prediksi update
   */
  export type PrediksiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediksi
     */
    select?: PrediksiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediksi
     */
    omit?: PrediksiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrediksiInclude<ExtArgs> | null
    /**
     * The data needed to update a Prediksi.
     */
    data: XOR<PrediksiUpdateInput, PrediksiUncheckedUpdateInput>
    /**
     * Choose, which Prediksi to update.
     */
    where: PrediksiWhereUniqueInput
  }

  /**
   * Prediksi updateMany
   */
  export type PrediksiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prediksis.
     */
    data: XOR<PrediksiUpdateManyMutationInput, PrediksiUncheckedUpdateManyInput>
    /**
     * Filter which Prediksis to update
     */
    where?: PrediksiWhereInput
    /**
     * Limit how many Prediksis to update.
     */
    limit?: number
  }

  /**
   * Prediksi updateManyAndReturn
   */
  export type PrediksiUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediksi
     */
    select?: PrediksiSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prediksi
     */
    omit?: PrediksiOmit<ExtArgs> | null
    /**
     * The data used to update Prediksis.
     */
    data: XOR<PrediksiUpdateManyMutationInput, PrediksiUncheckedUpdateManyInput>
    /**
     * Filter which Prediksis to update
     */
    where?: PrediksiWhereInput
    /**
     * Limit how many Prediksis to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrediksiIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prediksi upsert
   */
  export type PrediksiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediksi
     */
    select?: PrediksiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediksi
     */
    omit?: PrediksiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrediksiInclude<ExtArgs> | null
    /**
     * The filter to search for the Prediksi to update in case it exists.
     */
    where: PrediksiWhereUniqueInput
    /**
     * In case the Prediksi found by the `where` argument doesn't exist, create a new Prediksi with this data.
     */
    create: XOR<PrediksiCreateInput, PrediksiUncheckedCreateInput>
    /**
     * In case the Prediksi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrediksiUpdateInput, PrediksiUncheckedUpdateInput>
  }

  /**
   * Prediksi delete
   */
  export type PrediksiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediksi
     */
    select?: PrediksiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediksi
     */
    omit?: PrediksiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrediksiInclude<ExtArgs> | null
    /**
     * Filter which Prediksi to delete.
     */
    where: PrediksiWhereUniqueInput
  }

  /**
   * Prediksi deleteMany
   */
  export type PrediksiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prediksis to delete
     */
    where?: PrediksiWhereInput
    /**
     * Limit how many Prediksis to delete.
     */
    limit?: number
  }

  /**
   * Prediksi without action
   */
  export type PrediksiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prediksi
     */
    select?: PrediksiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prediksi
     */
    omit?: PrediksiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrediksiInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    nama: 'nama',
    email: 'email',
    password: 'password',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const JadwalScalarFieldEnum: {
    id: 'id',
    tanggal: 'tanggal',
    shift: 'shift',
    id_user: 'id_user'
  };

  export type JadwalScalarFieldEnum = (typeof JadwalScalarFieldEnum)[keyof typeof JadwalScalarFieldEnum]


  export const AbsensiScalarFieldEnum: {
    id: 'id',
    tanggal: 'tanggal',
    status: 'status',
    verifikasi: 'verifikasi',
    user_id: 'user_id'
  };

  export type AbsensiScalarFieldEnum = (typeof AbsensiScalarFieldEnum)[keyof typeof AbsensiScalarFieldEnum]


  export const PrediksiScalarFieldEnum: {
    id: 'id',
    imageUrl: 'imageUrl',
    user_id: 'user_id',
    kualitas: 'kualitas',
    harga: 'harga'
  };

  export type PrediksiScalarFieldEnum = (typeof PrediksiScalarFieldEnum)[keyof typeof PrediksiScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Shift'
   */
  export type EnumShiftFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Shift'>
    


  /**
   * Reference to a field of type 'Shift[]'
   */
  export type ListEnumShiftFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Shift[]'>
    


  /**
   * Reference to a field of type 'AbsensiStatus'
   */
  export type EnumAbsensiStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AbsensiStatus'>
    


  /**
   * Reference to a field of type 'AbsensiStatus[]'
   */
  export type ListEnumAbsensiStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AbsensiStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    nama?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    prediksi?: PrediksiListRelationFilter
    absensi?: AbsensiListRelationFilter
    jadwal?: JadwalListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    prediksi?: PrediksiOrderByRelationAggregateInput
    absensi?: AbsensiOrderByRelationAggregateInput
    jadwal?: JadwalOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nama?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    prediksi?: PrediksiListRelationFilter
    absensi?: AbsensiListRelationFilter
    jadwal?: JadwalListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    nama?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
  }

  export type JadwalWhereInput = {
    AND?: JadwalWhereInput | JadwalWhereInput[]
    OR?: JadwalWhereInput[]
    NOT?: JadwalWhereInput | JadwalWhereInput[]
    id?: StringFilter<"Jadwal"> | string
    tanggal?: DateTimeFilter<"Jadwal"> | Date | string
    shift?: EnumShiftFilter<"Jadwal"> | $Enums.Shift
    id_user?: StringFilter<"Jadwal"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type JadwalOrderByWithRelationInput = {
    id?: SortOrder
    tanggal?: SortOrder
    shift?: SortOrder
    id_user?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type JadwalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JadwalWhereInput | JadwalWhereInput[]
    OR?: JadwalWhereInput[]
    NOT?: JadwalWhereInput | JadwalWhereInput[]
    tanggal?: DateTimeFilter<"Jadwal"> | Date | string
    shift?: EnumShiftFilter<"Jadwal"> | $Enums.Shift
    id_user?: StringFilter<"Jadwal"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type JadwalOrderByWithAggregationInput = {
    id?: SortOrder
    tanggal?: SortOrder
    shift?: SortOrder
    id_user?: SortOrder
    _count?: JadwalCountOrderByAggregateInput
    _max?: JadwalMaxOrderByAggregateInput
    _min?: JadwalMinOrderByAggregateInput
  }

  export type JadwalScalarWhereWithAggregatesInput = {
    AND?: JadwalScalarWhereWithAggregatesInput | JadwalScalarWhereWithAggregatesInput[]
    OR?: JadwalScalarWhereWithAggregatesInput[]
    NOT?: JadwalScalarWhereWithAggregatesInput | JadwalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Jadwal"> | string
    tanggal?: DateTimeWithAggregatesFilter<"Jadwal"> | Date | string
    shift?: EnumShiftWithAggregatesFilter<"Jadwal"> | $Enums.Shift
    id_user?: StringWithAggregatesFilter<"Jadwal"> | string
  }

  export type AbsensiWhereInput = {
    AND?: AbsensiWhereInput | AbsensiWhereInput[]
    OR?: AbsensiWhereInput[]
    NOT?: AbsensiWhereInput | AbsensiWhereInput[]
    id?: StringFilter<"Absensi"> | string
    tanggal?: DateTimeFilter<"Absensi"> | Date | string
    status?: EnumAbsensiStatusFilter<"Absensi"> | $Enums.AbsensiStatus
    verifikasi?: BoolFilter<"Absensi"> | boolean
    user_id?: StringFilter<"Absensi"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AbsensiOrderByWithRelationInput = {
    id?: SortOrder
    tanggal?: SortOrder
    status?: SortOrder
    verifikasi?: SortOrder
    user_id?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AbsensiWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AbsensiWhereInput | AbsensiWhereInput[]
    OR?: AbsensiWhereInput[]
    NOT?: AbsensiWhereInput | AbsensiWhereInput[]
    tanggal?: DateTimeFilter<"Absensi"> | Date | string
    status?: EnumAbsensiStatusFilter<"Absensi"> | $Enums.AbsensiStatus
    verifikasi?: BoolFilter<"Absensi"> | boolean
    user_id?: StringFilter<"Absensi"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AbsensiOrderByWithAggregationInput = {
    id?: SortOrder
    tanggal?: SortOrder
    status?: SortOrder
    verifikasi?: SortOrder
    user_id?: SortOrder
    _count?: AbsensiCountOrderByAggregateInput
    _max?: AbsensiMaxOrderByAggregateInput
    _min?: AbsensiMinOrderByAggregateInput
  }

  export type AbsensiScalarWhereWithAggregatesInput = {
    AND?: AbsensiScalarWhereWithAggregatesInput | AbsensiScalarWhereWithAggregatesInput[]
    OR?: AbsensiScalarWhereWithAggregatesInput[]
    NOT?: AbsensiScalarWhereWithAggregatesInput | AbsensiScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Absensi"> | string
    tanggal?: DateTimeWithAggregatesFilter<"Absensi"> | Date | string
    status?: EnumAbsensiStatusWithAggregatesFilter<"Absensi"> | $Enums.AbsensiStatus
    verifikasi?: BoolWithAggregatesFilter<"Absensi"> | boolean
    user_id?: StringWithAggregatesFilter<"Absensi"> | string
  }

  export type PrediksiWhereInput = {
    AND?: PrediksiWhereInput | PrediksiWhereInput[]
    OR?: PrediksiWhereInput[]
    NOT?: PrediksiWhereInput | PrediksiWhereInput[]
    id?: StringFilter<"Prediksi"> | string
    imageUrl?: StringFilter<"Prediksi"> | string
    user_id?: StringFilter<"Prediksi"> | string
    kualitas?: StringNullableFilter<"Prediksi"> | string | null
    harga?: FloatNullableFilter<"Prediksi"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PrediksiOrderByWithRelationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    user_id?: SortOrder
    kualitas?: SortOrderInput | SortOrder
    harga?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PrediksiWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PrediksiWhereInput | PrediksiWhereInput[]
    OR?: PrediksiWhereInput[]
    NOT?: PrediksiWhereInput | PrediksiWhereInput[]
    imageUrl?: StringFilter<"Prediksi"> | string
    user_id?: StringFilter<"Prediksi"> | string
    kualitas?: StringNullableFilter<"Prediksi"> | string | null
    harga?: FloatNullableFilter<"Prediksi"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type PrediksiOrderByWithAggregationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    user_id?: SortOrder
    kualitas?: SortOrderInput | SortOrder
    harga?: SortOrderInput | SortOrder
    _count?: PrediksiCountOrderByAggregateInput
    _avg?: PrediksiAvgOrderByAggregateInput
    _max?: PrediksiMaxOrderByAggregateInput
    _min?: PrediksiMinOrderByAggregateInput
    _sum?: PrediksiSumOrderByAggregateInput
  }

  export type PrediksiScalarWhereWithAggregatesInput = {
    AND?: PrediksiScalarWhereWithAggregatesInput | PrediksiScalarWhereWithAggregatesInput[]
    OR?: PrediksiScalarWhereWithAggregatesInput[]
    NOT?: PrediksiScalarWhereWithAggregatesInput | PrediksiScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Prediksi"> | string
    imageUrl?: StringWithAggregatesFilter<"Prediksi"> | string
    user_id?: StringWithAggregatesFilter<"Prediksi"> | string
    kualitas?: StringNullableWithAggregatesFilter<"Prediksi"> | string | null
    harga?: FloatNullableWithAggregatesFilter<"Prediksi"> | number | null
  }

  export type UserCreateInput = {
    id?: string
    nama: string
    email: string
    password: string
    role: $Enums.Role
    prediksi?: PrediksiCreateNestedManyWithoutUserInput
    absensi?: AbsensiCreateNestedManyWithoutUserInput
    jadwal?: JadwalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    nama: string
    email: string
    password: string
    role: $Enums.Role
    prediksi?: PrediksiUncheckedCreateNestedManyWithoutUserInput
    absensi?: AbsensiUncheckedCreateNestedManyWithoutUserInput
    jadwal?: JadwalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    prediksi?: PrediksiUpdateManyWithoutUserNestedInput
    absensi?: AbsensiUpdateManyWithoutUserNestedInput
    jadwal?: JadwalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    prediksi?: PrediksiUncheckedUpdateManyWithoutUserNestedInput
    absensi?: AbsensiUncheckedUpdateManyWithoutUserNestedInput
    jadwal?: JadwalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    nama: string
    email: string
    password: string
    role: $Enums.Role
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
  }

  export type JadwalCreateInput = {
    id?: string
    tanggal: Date | string
    shift: $Enums.Shift
    user: UserCreateNestedOneWithoutJadwalInput
  }

  export type JadwalUncheckedCreateInput = {
    id?: string
    tanggal: Date | string
    shift: $Enums.Shift
    id_user: string
  }

  export type JadwalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: EnumShiftFieldUpdateOperationsInput | $Enums.Shift
    user?: UserUpdateOneRequiredWithoutJadwalNestedInput
  }

  export type JadwalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: EnumShiftFieldUpdateOperationsInput | $Enums.Shift
    id_user?: StringFieldUpdateOperationsInput | string
  }

  export type JadwalCreateManyInput = {
    id?: string
    tanggal: Date | string
    shift: $Enums.Shift
    id_user: string
  }

  export type JadwalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: EnumShiftFieldUpdateOperationsInput | $Enums.Shift
  }

  export type JadwalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: EnumShiftFieldUpdateOperationsInput | $Enums.Shift
    id_user?: StringFieldUpdateOperationsInput | string
  }

  export type AbsensiCreateInput = {
    id?: string
    tanggal: Date | string
    status: $Enums.AbsensiStatus
    verifikasi?: boolean
    user: UserCreateNestedOneWithoutAbsensiInput
  }

  export type AbsensiUncheckedCreateInput = {
    id?: string
    tanggal: Date | string
    status: $Enums.AbsensiStatus
    verifikasi?: boolean
    user_id: string
  }

  export type AbsensiUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsensiStatusFieldUpdateOperationsInput | $Enums.AbsensiStatus
    verifikasi?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutAbsensiNestedInput
  }

  export type AbsensiUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsensiStatusFieldUpdateOperationsInput | $Enums.AbsensiStatus
    verifikasi?: BoolFieldUpdateOperationsInput | boolean
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type AbsensiCreateManyInput = {
    id?: string
    tanggal: Date | string
    status: $Enums.AbsensiStatus
    verifikasi?: boolean
    user_id: string
  }

  export type AbsensiUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsensiStatusFieldUpdateOperationsInput | $Enums.AbsensiStatus
    verifikasi?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AbsensiUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsensiStatusFieldUpdateOperationsInput | $Enums.AbsensiStatus
    verifikasi?: BoolFieldUpdateOperationsInput | boolean
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type PrediksiCreateInput = {
    id?: string
    imageUrl: string
    kualitas?: string | null
    harga?: number | null
    user: UserCreateNestedOneWithoutPrediksiInput
  }

  export type PrediksiUncheckedCreateInput = {
    id?: string
    imageUrl: string
    user_id: string
    kualitas?: string | null
    harga?: number | null
  }

  export type PrediksiUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    kualitas?: NullableStringFieldUpdateOperationsInput | string | null
    harga?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutPrediksiNestedInput
  }

  export type PrediksiUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    kualitas?: NullableStringFieldUpdateOperationsInput | string | null
    harga?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type PrediksiCreateManyInput = {
    id?: string
    imageUrl: string
    user_id: string
    kualitas?: string | null
    harga?: number | null
  }

  export type PrediksiUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    kualitas?: NullableStringFieldUpdateOperationsInput | string | null
    harga?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type PrediksiUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    kualitas?: NullableStringFieldUpdateOperationsInput | string | null
    harga?: NullableFloatFieldUpdateOperationsInput | number | null
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type PrediksiListRelationFilter = {
    every?: PrediksiWhereInput
    some?: PrediksiWhereInput
    none?: PrediksiWhereInput
  }

  export type AbsensiListRelationFilter = {
    every?: AbsensiWhereInput
    some?: AbsensiWhereInput
    none?: AbsensiWhereInput
  }

  export type JadwalListRelationFilter = {
    every?: JadwalWhereInput
    some?: JadwalWhereInput
    none?: JadwalWhereInput
  }

  export type PrediksiOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AbsensiOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JadwalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumShiftFilter<$PrismaModel = never> = {
    equals?: $Enums.Shift | EnumShiftFieldRefInput<$PrismaModel>
    in?: $Enums.Shift[] | ListEnumShiftFieldRefInput<$PrismaModel>
    notIn?: $Enums.Shift[] | ListEnumShiftFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftFilter<$PrismaModel> | $Enums.Shift
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type JadwalCountOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    shift?: SortOrder
    id_user?: SortOrder
  }

  export type JadwalMaxOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    shift?: SortOrder
    id_user?: SortOrder
  }

  export type JadwalMinOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    shift?: SortOrder
    id_user?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumShiftWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Shift | EnumShiftFieldRefInput<$PrismaModel>
    in?: $Enums.Shift[] | ListEnumShiftFieldRefInput<$PrismaModel>
    notIn?: $Enums.Shift[] | ListEnumShiftFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftWithAggregatesFilter<$PrismaModel> | $Enums.Shift
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShiftFilter<$PrismaModel>
    _max?: NestedEnumShiftFilter<$PrismaModel>
  }

  export type EnumAbsensiStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AbsensiStatus | EnumAbsensiStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AbsensiStatus[] | ListEnumAbsensiStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AbsensiStatus[] | ListEnumAbsensiStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAbsensiStatusFilter<$PrismaModel> | $Enums.AbsensiStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AbsensiCountOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    status?: SortOrder
    verifikasi?: SortOrder
    user_id?: SortOrder
  }

  export type AbsensiMaxOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    status?: SortOrder
    verifikasi?: SortOrder
    user_id?: SortOrder
  }

  export type AbsensiMinOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    status?: SortOrder
    verifikasi?: SortOrder
    user_id?: SortOrder
  }

  export type EnumAbsensiStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AbsensiStatus | EnumAbsensiStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AbsensiStatus[] | ListEnumAbsensiStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AbsensiStatus[] | ListEnumAbsensiStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAbsensiStatusWithAggregatesFilter<$PrismaModel> | $Enums.AbsensiStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAbsensiStatusFilter<$PrismaModel>
    _max?: NestedEnumAbsensiStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PrediksiCountOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    user_id?: SortOrder
    kualitas?: SortOrder
    harga?: SortOrder
  }

  export type PrediksiAvgOrderByAggregateInput = {
    harga?: SortOrder
  }

  export type PrediksiMaxOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    user_id?: SortOrder
    kualitas?: SortOrder
    harga?: SortOrder
  }

  export type PrediksiMinOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    user_id?: SortOrder
    kualitas?: SortOrder
    harga?: SortOrder
  }

  export type PrediksiSumOrderByAggregateInput = {
    harga?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type PrediksiCreateNestedManyWithoutUserInput = {
    create?: XOR<PrediksiCreateWithoutUserInput, PrediksiUncheckedCreateWithoutUserInput> | PrediksiCreateWithoutUserInput[] | PrediksiUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PrediksiCreateOrConnectWithoutUserInput | PrediksiCreateOrConnectWithoutUserInput[]
    createMany?: PrediksiCreateManyUserInputEnvelope
    connect?: PrediksiWhereUniqueInput | PrediksiWhereUniqueInput[]
  }

  export type AbsensiCreateNestedManyWithoutUserInput = {
    create?: XOR<AbsensiCreateWithoutUserInput, AbsensiUncheckedCreateWithoutUserInput> | AbsensiCreateWithoutUserInput[] | AbsensiUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AbsensiCreateOrConnectWithoutUserInput | AbsensiCreateOrConnectWithoutUserInput[]
    createMany?: AbsensiCreateManyUserInputEnvelope
    connect?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
  }

  export type JadwalCreateNestedManyWithoutUserInput = {
    create?: XOR<JadwalCreateWithoutUserInput, JadwalUncheckedCreateWithoutUserInput> | JadwalCreateWithoutUserInput[] | JadwalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JadwalCreateOrConnectWithoutUserInput | JadwalCreateOrConnectWithoutUserInput[]
    createMany?: JadwalCreateManyUserInputEnvelope
    connect?: JadwalWhereUniqueInput | JadwalWhereUniqueInput[]
  }

  export type PrediksiUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PrediksiCreateWithoutUserInput, PrediksiUncheckedCreateWithoutUserInput> | PrediksiCreateWithoutUserInput[] | PrediksiUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PrediksiCreateOrConnectWithoutUserInput | PrediksiCreateOrConnectWithoutUserInput[]
    createMany?: PrediksiCreateManyUserInputEnvelope
    connect?: PrediksiWhereUniqueInput | PrediksiWhereUniqueInput[]
  }

  export type AbsensiUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AbsensiCreateWithoutUserInput, AbsensiUncheckedCreateWithoutUserInput> | AbsensiCreateWithoutUserInput[] | AbsensiUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AbsensiCreateOrConnectWithoutUserInput | AbsensiCreateOrConnectWithoutUserInput[]
    createMany?: AbsensiCreateManyUserInputEnvelope
    connect?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
  }

  export type JadwalUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<JadwalCreateWithoutUserInput, JadwalUncheckedCreateWithoutUserInput> | JadwalCreateWithoutUserInput[] | JadwalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JadwalCreateOrConnectWithoutUserInput | JadwalCreateOrConnectWithoutUserInput[]
    createMany?: JadwalCreateManyUserInputEnvelope
    connect?: JadwalWhereUniqueInput | JadwalWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type PrediksiUpdateManyWithoutUserNestedInput = {
    create?: XOR<PrediksiCreateWithoutUserInput, PrediksiUncheckedCreateWithoutUserInput> | PrediksiCreateWithoutUserInput[] | PrediksiUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PrediksiCreateOrConnectWithoutUserInput | PrediksiCreateOrConnectWithoutUserInput[]
    upsert?: PrediksiUpsertWithWhereUniqueWithoutUserInput | PrediksiUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PrediksiCreateManyUserInputEnvelope
    set?: PrediksiWhereUniqueInput | PrediksiWhereUniqueInput[]
    disconnect?: PrediksiWhereUniqueInput | PrediksiWhereUniqueInput[]
    delete?: PrediksiWhereUniqueInput | PrediksiWhereUniqueInput[]
    connect?: PrediksiWhereUniqueInput | PrediksiWhereUniqueInput[]
    update?: PrediksiUpdateWithWhereUniqueWithoutUserInput | PrediksiUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PrediksiUpdateManyWithWhereWithoutUserInput | PrediksiUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PrediksiScalarWhereInput | PrediksiScalarWhereInput[]
  }

  export type AbsensiUpdateManyWithoutUserNestedInput = {
    create?: XOR<AbsensiCreateWithoutUserInput, AbsensiUncheckedCreateWithoutUserInput> | AbsensiCreateWithoutUserInput[] | AbsensiUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AbsensiCreateOrConnectWithoutUserInput | AbsensiCreateOrConnectWithoutUserInput[]
    upsert?: AbsensiUpsertWithWhereUniqueWithoutUserInput | AbsensiUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AbsensiCreateManyUserInputEnvelope
    set?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    disconnect?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    delete?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    connect?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    update?: AbsensiUpdateWithWhereUniqueWithoutUserInput | AbsensiUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AbsensiUpdateManyWithWhereWithoutUserInput | AbsensiUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AbsensiScalarWhereInput | AbsensiScalarWhereInput[]
  }

  export type JadwalUpdateManyWithoutUserNestedInput = {
    create?: XOR<JadwalCreateWithoutUserInput, JadwalUncheckedCreateWithoutUserInput> | JadwalCreateWithoutUserInput[] | JadwalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JadwalCreateOrConnectWithoutUserInput | JadwalCreateOrConnectWithoutUserInput[]
    upsert?: JadwalUpsertWithWhereUniqueWithoutUserInput | JadwalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JadwalCreateManyUserInputEnvelope
    set?: JadwalWhereUniqueInput | JadwalWhereUniqueInput[]
    disconnect?: JadwalWhereUniqueInput | JadwalWhereUniqueInput[]
    delete?: JadwalWhereUniqueInput | JadwalWhereUniqueInput[]
    connect?: JadwalWhereUniqueInput | JadwalWhereUniqueInput[]
    update?: JadwalUpdateWithWhereUniqueWithoutUserInput | JadwalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JadwalUpdateManyWithWhereWithoutUserInput | JadwalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JadwalScalarWhereInput | JadwalScalarWhereInput[]
  }

  export type PrediksiUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PrediksiCreateWithoutUserInput, PrediksiUncheckedCreateWithoutUserInput> | PrediksiCreateWithoutUserInput[] | PrediksiUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PrediksiCreateOrConnectWithoutUserInput | PrediksiCreateOrConnectWithoutUserInput[]
    upsert?: PrediksiUpsertWithWhereUniqueWithoutUserInput | PrediksiUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PrediksiCreateManyUserInputEnvelope
    set?: PrediksiWhereUniqueInput | PrediksiWhereUniqueInput[]
    disconnect?: PrediksiWhereUniqueInput | PrediksiWhereUniqueInput[]
    delete?: PrediksiWhereUniqueInput | PrediksiWhereUniqueInput[]
    connect?: PrediksiWhereUniqueInput | PrediksiWhereUniqueInput[]
    update?: PrediksiUpdateWithWhereUniqueWithoutUserInput | PrediksiUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PrediksiUpdateManyWithWhereWithoutUserInput | PrediksiUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PrediksiScalarWhereInput | PrediksiScalarWhereInput[]
  }

  export type AbsensiUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AbsensiCreateWithoutUserInput, AbsensiUncheckedCreateWithoutUserInput> | AbsensiCreateWithoutUserInput[] | AbsensiUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AbsensiCreateOrConnectWithoutUserInput | AbsensiCreateOrConnectWithoutUserInput[]
    upsert?: AbsensiUpsertWithWhereUniqueWithoutUserInput | AbsensiUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AbsensiCreateManyUserInputEnvelope
    set?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    disconnect?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    delete?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    connect?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    update?: AbsensiUpdateWithWhereUniqueWithoutUserInput | AbsensiUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AbsensiUpdateManyWithWhereWithoutUserInput | AbsensiUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AbsensiScalarWhereInput | AbsensiScalarWhereInput[]
  }

  export type JadwalUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<JadwalCreateWithoutUserInput, JadwalUncheckedCreateWithoutUserInput> | JadwalCreateWithoutUserInput[] | JadwalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JadwalCreateOrConnectWithoutUserInput | JadwalCreateOrConnectWithoutUserInput[]
    upsert?: JadwalUpsertWithWhereUniqueWithoutUserInput | JadwalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JadwalCreateManyUserInputEnvelope
    set?: JadwalWhereUniqueInput | JadwalWhereUniqueInput[]
    disconnect?: JadwalWhereUniqueInput | JadwalWhereUniqueInput[]
    delete?: JadwalWhereUniqueInput | JadwalWhereUniqueInput[]
    connect?: JadwalWhereUniqueInput | JadwalWhereUniqueInput[]
    update?: JadwalUpdateWithWhereUniqueWithoutUserInput | JadwalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JadwalUpdateManyWithWhereWithoutUserInput | JadwalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JadwalScalarWhereInput | JadwalScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutJadwalInput = {
    create?: XOR<UserCreateWithoutJadwalInput, UserUncheckedCreateWithoutJadwalInput>
    connectOrCreate?: UserCreateOrConnectWithoutJadwalInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumShiftFieldUpdateOperationsInput = {
    set?: $Enums.Shift
  }

  export type UserUpdateOneRequiredWithoutJadwalNestedInput = {
    create?: XOR<UserCreateWithoutJadwalInput, UserUncheckedCreateWithoutJadwalInput>
    connectOrCreate?: UserCreateOrConnectWithoutJadwalInput
    upsert?: UserUpsertWithoutJadwalInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJadwalInput, UserUpdateWithoutJadwalInput>, UserUncheckedUpdateWithoutJadwalInput>
  }

  export type UserCreateNestedOneWithoutAbsensiInput = {
    create?: XOR<UserCreateWithoutAbsensiInput, UserUncheckedCreateWithoutAbsensiInput>
    connectOrCreate?: UserCreateOrConnectWithoutAbsensiInput
    connect?: UserWhereUniqueInput
  }

  export type EnumAbsensiStatusFieldUpdateOperationsInput = {
    set?: $Enums.AbsensiStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutAbsensiNestedInput = {
    create?: XOR<UserCreateWithoutAbsensiInput, UserUncheckedCreateWithoutAbsensiInput>
    connectOrCreate?: UserCreateOrConnectWithoutAbsensiInput
    upsert?: UserUpsertWithoutAbsensiInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAbsensiInput, UserUpdateWithoutAbsensiInput>, UserUncheckedUpdateWithoutAbsensiInput>
  }

  export type UserCreateNestedOneWithoutPrediksiInput = {
    create?: XOR<UserCreateWithoutPrediksiInput, UserUncheckedCreateWithoutPrediksiInput>
    connectOrCreate?: UserCreateOrConnectWithoutPrediksiInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutPrediksiNestedInput = {
    create?: XOR<UserCreateWithoutPrediksiInput, UserUncheckedCreateWithoutPrediksiInput>
    connectOrCreate?: UserCreateOrConnectWithoutPrediksiInput
    upsert?: UserUpsertWithoutPrediksiInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPrediksiInput, UserUpdateWithoutPrediksiInput>, UserUncheckedUpdateWithoutPrediksiInput>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumShiftFilter<$PrismaModel = never> = {
    equals?: $Enums.Shift | EnumShiftFieldRefInput<$PrismaModel>
    in?: $Enums.Shift[] | ListEnumShiftFieldRefInput<$PrismaModel>
    notIn?: $Enums.Shift[] | ListEnumShiftFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftFilter<$PrismaModel> | $Enums.Shift
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumShiftWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Shift | EnumShiftFieldRefInput<$PrismaModel>
    in?: $Enums.Shift[] | ListEnumShiftFieldRefInput<$PrismaModel>
    notIn?: $Enums.Shift[] | ListEnumShiftFieldRefInput<$PrismaModel>
    not?: NestedEnumShiftWithAggregatesFilter<$PrismaModel> | $Enums.Shift
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShiftFilter<$PrismaModel>
    _max?: NestedEnumShiftFilter<$PrismaModel>
  }

  export type NestedEnumAbsensiStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AbsensiStatus | EnumAbsensiStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AbsensiStatus[] | ListEnumAbsensiStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AbsensiStatus[] | ListEnumAbsensiStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAbsensiStatusFilter<$PrismaModel> | $Enums.AbsensiStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumAbsensiStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AbsensiStatus | EnumAbsensiStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AbsensiStatus[] | ListEnumAbsensiStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AbsensiStatus[] | ListEnumAbsensiStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAbsensiStatusWithAggregatesFilter<$PrismaModel> | $Enums.AbsensiStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAbsensiStatusFilter<$PrismaModel>
    _max?: NestedEnumAbsensiStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type PrediksiCreateWithoutUserInput = {
    id?: string
    imageUrl: string
    kualitas?: string | null
    harga?: number | null
  }

  export type PrediksiUncheckedCreateWithoutUserInput = {
    id?: string
    imageUrl: string
    kualitas?: string | null
    harga?: number | null
  }

  export type PrediksiCreateOrConnectWithoutUserInput = {
    where: PrediksiWhereUniqueInput
    create: XOR<PrediksiCreateWithoutUserInput, PrediksiUncheckedCreateWithoutUserInput>
  }

  export type PrediksiCreateManyUserInputEnvelope = {
    data: PrediksiCreateManyUserInput | PrediksiCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AbsensiCreateWithoutUserInput = {
    id?: string
    tanggal: Date | string
    status: $Enums.AbsensiStatus
    verifikasi?: boolean
  }

  export type AbsensiUncheckedCreateWithoutUserInput = {
    id?: string
    tanggal: Date | string
    status: $Enums.AbsensiStatus
    verifikasi?: boolean
  }

  export type AbsensiCreateOrConnectWithoutUserInput = {
    where: AbsensiWhereUniqueInput
    create: XOR<AbsensiCreateWithoutUserInput, AbsensiUncheckedCreateWithoutUserInput>
  }

  export type AbsensiCreateManyUserInputEnvelope = {
    data: AbsensiCreateManyUserInput | AbsensiCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type JadwalCreateWithoutUserInput = {
    id?: string
    tanggal: Date | string
    shift: $Enums.Shift
  }

  export type JadwalUncheckedCreateWithoutUserInput = {
    id?: string
    tanggal: Date | string
    shift: $Enums.Shift
  }

  export type JadwalCreateOrConnectWithoutUserInput = {
    where: JadwalWhereUniqueInput
    create: XOR<JadwalCreateWithoutUserInput, JadwalUncheckedCreateWithoutUserInput>
  }

  export type JadwalCreateManyUserInputEnvelope = {
    data: JadwalCreateManyUserInput | JadwalCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PrediksiUpsertWithWhereUniqueWithoutUserInput = {
    where: PrediksiWhereUniqueInput
    update: XOR<PrediksiUpdateWithoutUserInput, PrediksiUncheckedUpdateWithoutUserInput>
    create: XOR<PrediksiCreateWithoutUserInput, PrediksiUncheckedCreateWithoutUserInput>
  }

  export type PrediksiUpdateWithWhereUniqueWithoutUserInput = {
    where: PrediksiWhereUniqueInput
    data: XOR<PrediksiUpdateWithoutUserInput, PrediksiUncheckedUpdateWithoutUserInput>
  }

  export type PrediksiUpdateManyWithWhereWithoutUserInput = {
    where: PrediksiScalarWhereInput
    data: XOR<PrediksiUpdateManyMutationInput, PrediksiUncheckedUpdateManyWithoutUserInput>
  }

  export type PrediksiScalarWhereInput = {
    AND?: PrediksiScalarWhereInput | PrediksiScalarWhereInput[]
    OR?: PrediksiScalarWhereInput[]
    NOT?: PrediksiScalarWhereInput | PrediksiScalarWhereInput[]
    id?: StringFilter<"Prediksi"> | string
    imageUrl?: StringFilter<"Prediksi"> | string
    user_id?: StringFilter<"Prediksi"> | string
    kualitas?: StringNullableFilter<"Prediksi"> | string | null
    harga?: FloatNullableFilter<"Prediksi"> | number | null
  }

  export type AbsensiUpsertWithWhereUniqueWithoutUserInput = {
    where: AbsensiWhereUniqueInput
    update: XOR<AbsensiUpdateWithoutUserInput, AbsensiUncheckedUpdateWithoutUserInput>
    create: XOR<AbsensiCreateWithoutUserInput, AbsensiUncheckedCreateWithoutUserInput>
  }

  export type AbsensiUpdateWithWhereUniqueWithoutUserInput = {
    where: AbsensiWhereUniqueInput
    data: XOR<AbsensiUpdateWithoutUserInput, AbsensiUncheckedUpdateWithoutUserInput>
  }

  export type AbsensiUpdateManyWithWhereWithoutUserInput = {
    where: AbsensiScalarWhereInput
    data: XOR<AbsensiUpdateManyMutationInput, AbsensiUncheckedUpdateManyWithoutUserInput>
  }

  export type AbsensiScalarWhereInput = {
    AND?: AbsensiScalarWhereInput | AbsensiScalarWhereInput[]
    OR?: AbsensiScalarWhereInput[]
    NOT?: AbsensiScalarWhereInput | AbsensiScalarWhereInput[]
    id?: StringFilter<"Absensi"> | string
    tanggal?: DateTimeFilter<"Absensi"> | Date | string
    status?: EnumAbsensiStatusFilter<"Absensi"> | $Enums.AbsensiStatus
    verifikasi?: BoolFilter<"Absensi"> | boolean
    user_id?: StringFilter<"Absensi"> | string
  }

  export type JadwalUpsertWithWhereUniqueWithoutUserInput = {
    where: JadwalWhereUniqueInput
    update: XOR<JadwalUpdateWithoutUserInput, JadwalUncheckedUpdateWithoutUserInput>
    create: XOR<JadwalCreateWithoutUserInput, JadwalUncheckedCreateWithoutUserInput>
  }

  export type JadwalUpdateWithWhereUniqueWithoutUserInput = {
    where: JadwalWhereUniqueInput
    data: XOR<JadwalUpdateWithoutUserInput, JadwalUncheckedUpdateWithoutUserInput>
  }

  export type JadwalUpdateManyWithWhereWithoutUserInput = {
    where: JadwalScalarWhereInput
    data: XOR<JadwalUpdateManyMutationInput, JadwalUncheckedUpdateManyWithoutUserInput>
  }

  export type JadwalScalarWhereInput = {
    AND?: JadwalScalarWhereInput | JadwalScalarWhereInput[]
    OR?: JadwalScalarWhereInput[]
    NOT?: JadwalScalarWhereInput | JadwalScalarWhereInput[]
    id?: StringFilter<"Jadwal"> | string
    tanggal?: DateTimeFilter<"Jadwal"> | Date | string
    shift?: EnumShiftFilter<"Jadwal"> | $Enums.Shift
    id_user?: StringFilter<"Jadwal"> | string
  }

  export type UserCreateWithoutJadwalInput = {
    id?: string
    nama: string
    email: string
    password: string
    role: $Enums.Role
    prediksi?: PrediksiCreateNestedManyWithoutUserInput
    absensi?: AbsensiCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutJadwalInput = {
    id?: string
    nama: string
    email: string
    password: string
    role: $Enums.Role
    prediksi?: PrediksiUncheckedCreateNestedManyWithoutUserInput
    absensi?: AbsensiUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutJadwalInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJadwalInput, UserUncheckedCreateWithoutJadwalInput>
  }

  export type UserUpsertWithoutJadwalInput = {
    update: XOR<UserUpdateWithoutJadwalInput, UserUncheckedUpdateWithoutJadwalInput>
    create: XOR<UserCreateWithoutJadwalInput, UserUncheckedCreateWithoutJadwalInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJadwalInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJadwalInput, UserUncheckedUpdateWithoutJadwalInput>
  }

  export type UserUpdateWithoutJadwalInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    prediksi?: PrediksiUpdateManyWithoutUserNestedInput
    absensi?: AbsensiUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutJadwalInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    prediksi?: PrediksiUncheckedUpdateManyWithoutUserNestedInput
    absensi?: AbsensiUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAbsensiInput = {
    id?: string
    nama: string
    email: string
    password: string
    role: $Enums.Role
    prediksi?: PrediksiCreateNestedManyWithoutUserInput
    jadwal?: JadwalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAbsensiInput = {
    id?: string
    nama: string
    email: string
    password: string
    role: $Enums.Role
    prediksi?: PrediksiUncheckedCreateNestedManyWithoutUserInput
    jadwal?: JadwalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAbsensiInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAbsensiInput, UserUncheckedCreateWithoutAbsensiInput>
  }

  export type UserUpsertWithoutAbsensiInput = {
    update: XOR<UserUpdateWithoutAbsensiInput, UserUncheckedUpdateWithoutAbsensiInput>
    create: XOR<UserCreateWithoutAbsensiInput, UserUncheckedCreateWithoutAbsensiInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAbsensiInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAbsensiInput, UserUncheckedUpdateWithoutAbsensiInput>
  }

  export type UserUpdateWithoutAbsensiInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    prediksi?: PrediksiUpdateManyWithoutUserNestedInput
    jadwal?: JadwalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAbsensiInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    prediksi?: PrediksiUncheckedUpdateManyWithoutUserNestedInput
    jadwal?: JadwalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPrediksiInput = {
    id?: string
    nama: string
    email: string
    password: string
    role: $Enums.Role
    absensi?: AbsensiCreateNestedManyWithoutUserInput
    jadwal?: JadwalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPrediksiInput = {
    id?: string
    nama: string
    email: string
    password: string
    role: $Enums.Role
    absensi?: AbsensiUncheckedCreateNestedManyWithoutUserInput
    jadwal?: JadwalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPrediksiInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPrediksiInput, UserUncheckedCreateWithoutPrediksiInput>
  }

  export type UserUpsertWithoutPrediksiInput = {
    update: XOR<UserUpdateWithoutPrediksiInput, UserUncheckedUpdateWithoutPrediksiInput>
    create: XOR<UserCreateWithoutPrediksiInput, UserUncheckedCreateWithoutPrediksiInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPrediksiInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPrediksiInput, UserUncheckedUpdateWithoutPrediksiInput>
  }

  export type UserUpdateWithoutPrediksiInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    absensi?: AbsensiUpdateManyWithoutUserNestedInput
    jadwal?: JadwalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPrediksiInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    absensi?: AbsensiUncheckedUpdateManyWithoutUserNestedInput
    jadwal?: JadwalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PrediksiCreateManyUserInput = {
    id?: string
    imageUrl: string
    kualitas?: string | null
    harga?: number | null
  }

  export type AbsensiCreateManyUserInput = {
    id?: string
    tanggal: Date | string
    status: $Enums.AbsensiStatus
    verifikasi?: boolean
  }

  export type JadwalCreateManyUserInput = {
    id?: string
    tanggal: Date | string
    shift: $Enums.Shift
  }

  export type PrediksiUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    kualitas?: NullableStringFieldUpdateOperationsInput | string | null
    harga?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type PrediksiUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    kualitas?: NullableStringFieldUpdateOperationsInput | string | null
    harga?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type PrediksiUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    kualitas?: NullableStringFieldUpdateOperationsInput | string | null
    harga?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AbsensiUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsensiStatusFieldUpdateOperationsInput | $Enums.AbsensiStatus
    verifikasi?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AbsensiUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsensiStatusFieldUpdateOperationsInput | $Enums.AbsensiStatus
    verifikasi?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AbsensiUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsensiStatusFieldUpdateOperationsInput | $Enums.AbsensiStatus
    verifikasi?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JadwalUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: EnumShiftFieldUpdateOperationsInput | $Enums.Shift
  }

  export type JadwalUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: EnumShiftFieldUpdateOperationsInput | $Enums.Shift
  }

  export type JadwalUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    shift?: EnumShiftFieldUpdateOperationsInput | $Enums.Shift
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