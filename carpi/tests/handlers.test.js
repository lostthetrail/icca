'use strict';

const Test = require('tape');
const Proxyquire = require('proxyquire').noPreserveCache();
const Sinon = require('sinon');

const StubbedStore = {
    create: Sinon.stub(),
    read: Sinon.stub(),
    update: Sinon.stub(),
    delete: Sinon.stub()
};

const Handlers = Proxyquire('../lib/handlers', {
    './store': StubbedStore
});

Test('Handlers.list should call store.list', (assert) => {

    assert.plan(1);

    Handlers.list({}, () => {

        assert.ok(StubbedStore.read.calledOnce, 'Store should have been called');
        StubbedStore.read.reset();
    });
});

Test('Handlers.create should call store.create', (assert) => {

    assert.plan(2);

    Handlers.create({}, () => {

        assert.ok(StubbedStore.create.calledOnce, 'Store should have been called');
        return {
            code(statusCode) {

                assert.equals(statusCode, 201, 'Status code should be 201');
                StubbedStore.create.reset();
            }
        };
    });
});

Test('Handlers.read should call store.read', (assert) => {

    assert.plan(2);

    StubbedStore.read.returns({});

    Handlers.read({
        params: {
            id: 1
        }
    }, (payload) => {

        assert.ok(StubbedStore.read.calledOnce, 'Store should have been called');
        assert.ok(payload, 'Payload is ok');
        StubbedStore.read.reset();
    });
});

Test('Handlers.read should call store.read with invalid id', (assert) => {

    assert.plan(2);

    StubbedStore.read.returns(null);

    Handlers.read({
        params: {
            id: 1
        }
    }, (payload) => {

        assert.ok(StubbedStore.read.calledOnce, 'Store should have been called');
        assert.ok(payload.isBoom, 'Payload is a Boom error');
        StubbedStore.read.reset();
    });
});

Test('Handlers.update should call store.update', (assert) => {

    assert.plan(2);

    StubbedStore.update.returns(null);

    Handlers.update({
        params: {
            id: 1
        },
        payload: {}
    }, (payload) => {

        assert.ok(StubbedStore.update.calledOnce, 'Store should have been called');
        assert.ok(payload, 'Payload is ok');
        StubbedStore.update.reset();
    });
});

Test('Handlers.update should call store.update with invalid id', (assert) => {

    assert.plan(2);

    StubbedStore.update.returns(null);

    Handlers.update({
        params: {
            id: 1
        },
        payload: {}
    }, (payload) => {

        assert.ok(StubbedStore.update.calledOnce, 'Store should have been called');
        assert.ok(payload.isBoom, 'Payload is a Boom error');
        StubbedStore.update.reset();
    });
});

Test('Handlers.delete should call store.delete', (assert) => {

    assert.plan(2);

    StubbedStore.delete.returns(null);

    Handlers.delete({
        params: {
            id: 1
        },
        payload: {}
    }, (payload) => {

        assert.ok(StubbedStore.delete.calledOnce, 'Store should have been called');
        assert.ok(payload, 'Payload is ok');
        StubbedStore.delete.reset();
    });
});

Test('Handlers.delete should call store.delete with invalid id', (assert) => {

    assert.plan(2);

    StubbedStore.delete.returns(null);

    Handlers.delete({
        params: {
            id: 1
        },
        payload: {}
    }, (payload) => {

        assert.ok(StubbedStore.delete.calledOnce, 'Store should have been called');
        assert.ok(payload.isBoom, 'Payload is a Boom error');
        StubbedStore.delete.reset();
    });
});
