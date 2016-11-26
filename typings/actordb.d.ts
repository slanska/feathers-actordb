/**
 * Created by slanska on 2016-11-25.
 */

/// <reference path="es6-promise/es6-promise.d.ts" />
///<reference path="./node/node.d.ts"/>


declare module "actordb"
{
    import events = require('events');

    namespace ActorDB
    {
        export interface ConnectionOptions
        {
            host: string,
            port: number,
            username: string,
            password: string
        }

        export interface ConnectionPoolOptions
        {
            pool_size: number
        }

        export class ActorDBClient extends events.EventEmitter
        {
            connect(callback?: Function): Promise<any>;

            reconnect(ref: ActorDBClient);

            /*

             */
            actor_types(callback?: Function): Promise<string[]>;

            /*

             */
            actor_tables(actor_type: string, callback?: Function): Promise<string[]>;

            /*

             */
            actor_columns(actorType: string, tableName: string, callback?: Function): Promise<string[]>;

            /*

             */
            exec_single_param(myUserId: string, actorType: string, sql: string, options: string[], params: [any[]]): Promise<any>;

            /*

             */
            exec_single(myUserId: string, actorType: string, sql: string, options: string[]): Promise<any>;

            /*

             */
            uniqid(callback?: Function): Promise<string>;

            /*

             */
            salt(callback?: Function): Promise<string>;

            /*

             */
            close();

            exec_sql(sql: string, result_callback?: Function): Promise<ActorDBClient>;

            exec_sql_param(sql: string, bindingvals, result_callback?: Function): Promise<any>;

            exec_config(sql_statement: string, result_callback?: Function): Promise<any>;

            exec_schema(sql_statement: string, result_callback?: Function): Promise<any>;

            exec_single(actorname: string, actortype: string, sql_statement: string, flags,
                        result_callback?: Function): Promise<any>;

            exec_single_param(actorname: string, actortype: string, sql_statement: string, flags,
                              bindingvals, result_callback?: Function): Promise<any>;

            exec_multi(actorname: string, actortype: string, sql_statement: string, flags,
                       result_callback?: Function): Promise<any>;

            exec_all(actortype: string, sql: string, flags, result_callback?: Function): Promise<any>;

            format_result(result);

            resolve_bindings(bindingvals);
        }

        export class ActorDBPool extends events.EventEmitter
        {
            db(): ActorDBClient;

            connect(callback?: Function): Promise<any>;

            close();
        }

        /*

         */
        export function connectSingle(options: ConnectionOptions): ActorDBClient;


        /*

         */
        export function connectPool(options: ConnectionOptions,
                                    poolOptions: ConnectionPoolOptions): ActorDBPool;

    }

    export = ActorDB;
}