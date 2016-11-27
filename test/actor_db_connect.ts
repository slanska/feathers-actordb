/**
 * Created by slanska on 2016-11-26.
 */

///<reference path="../typings/test.d.ts"/>

global.Promise = require('bluebird');
import assert = require('assert');
import mocha = require('mocha');
import ActorDB = require( 'actordb');

describe('connect to local actordb server', () =>
{
    var client: ActorDB.ActorDBClient;

    before(done =>
    {
        var connectionConfig = {host: '127.0.0.1', port: 33306, username: 'myuser', password: 'mypass'};
        var pool = ActorDB.connectionPool(connectionConfig, {pool_size: 5});
        pool.connect()
            .then(c =>
            {
                client = pool.db();
                done();
            });
    });

    after(done =>
    {
        client.close();
        done();
    });

    it('get type1 tables', done =>
    {
        client.actor_tables('type1')
            .then(tt =>
            {
                console.log(tt);
                done();
            });
    });

    it('fetch actor type', done =>
    {
        client.actor_types()
            .then(rr =>
            {
                console.log(rr);
                done();
            });
    });

    it('single connect', done =>
    {
        client.exec_single('music', 'type1', 'SELECT * FROM tab;', ['CREATE'])
            .then(rr =>
            {
                console.log(rr);
                done();
            });
    });

    it('get uniqid', done =>
    {
        client.uniqid()
            .then(vv =>
            {
                console.log(`get uniqid: ${vv}`);
                done();
            });
    });

    it('get salt', done =>
    {
        client.salt()
            .then(vv =>
            {
                console.log(`get salt: ${vv}`);
                done();
            });
    });
});