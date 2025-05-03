const Queue = require('bull');
const { ExpressAdapter } = require('@bull-board/express');
const { createBullBoard } = require('@bull-board/api/dist/src');
const { BullAdapter } = require('@bull-board/api/dist/src/queueAdapters/bull');
const { redis } = require('../config/config');
/**
 * Setup routes
 */
const { host, port } = redis;

/**
 * Redis options
 */
const redisOptions = {
    redis: {
        host,
        port,
    },
};

const queueList = ['notification-queue'];
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/redis/queues');

const queues = queueList.map((qs) => new Queue(qs, redisOptions)).map((q) => new BullAdapter(q));

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues,
    serverAdapter: serverAdapter,
});

module.exports = serverAdapter;
