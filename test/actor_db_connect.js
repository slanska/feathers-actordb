/**
 * Created by slanska on 2016-11-26.
 */
"use strict";
///<reference path="../typings/test.d.ts"/>
global.Promise = require('bluebird');
var ActorDB = require('actordb');
describe('connect to local actordb server', function () {
    var client;
    before(function (done) {
        var connectionConfig = { host: '127.0.0.1', port: 33306, username: 'myuser', password: 'mypass' };
        var pool = ActorDB.connectionPool(connectionConfig, { pool_size: 5 });
        pool.connect()
            .then(function (c) {
            client = pool.db();
            done();
        });
    });
    after(function (done) {
        client.close();
        done();
    });
    it('get type1 tables', function (done) {
        client.actor_tables('type1')
            .then(function (tt) {
            console.log(tt);
            done();
        });
    });
    it('fetch actor type', function (done) {
        client.actor_types()
            .then(function (rr) {
            console.log(rr);
            done();
        });
    });
    it('single connect', function (done) {
        client.exec_single('music', 'type1', 'SELECT * FROM tab;', ['CREATE'])
            .then(function (rr) {
            console.log(rr);
            done();
        });
    });
    it('get uniqid', function (done) {
        client.uniqid()
            .then(function (vv) {
            console.log("get uniqid: " + vv);
            done();
        });
    });
    it('get salt', function (done) {
        client.salt()
            .then(function (vv) {
            console.log("get salt: " + vv);
            done();
        });
    });
});
//# sourceMappingURL=actor_db_connect.js.map