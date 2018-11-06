'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    var events = {};

    function handle(contexts) {
        contexts.forEach(element => {
            if (element.times > 0 && element.count % element.frequency === 0) {
                element.handler.call(element.context);
                element.times--;
            }
            element.count++;
        });
    }

    return {

    /**
     * Подписаться на событие
     * @param {String} event
     * @param {Object} context
     * @param {Function} handler
     */
    on: function (event, context, handler) {
        console.info(event, context, handler);
        const newStudent = { name: context, func: handler };
        if (!events[event]) {
            events[event] = [newStudent];
        } else {
            events[event].push(newStudent);
        }

        return this;
    },


    /**
     * Отписаться от события
     * @param {String} event
     * @param {Object} context
     */
    off: function (event, context) {
        console.info(event, context);
        for (let key in events) {
            if (key === event || key.startsWith(event + '.')) {
                events[key] = events[key].filter(element => element.context !== context);
            }
        }

        return this;
    },

    /**
     * Уведомить о событии
     * @param {String} event
     */
    emit: function (event) {
        console.info(event);
        while (event !== '') {
            const contexts = events[event];
            if (contexts) {
            handle(contexts);
            }
            event = event.substring(0, event.lastIndexOf('.'));
        }

        return this;
    },

    /**
     * Подписаться на событие с ограничением по количеству полученных уведомлений
     * @star
     * @param {String} event
     * @param {Object} context
     * @param {Function} handler
     * @param {Number} times – сколько раз получить уведомление
     */
    several: function (event, context, handler, times) {
        console.info(event, context, handler, times);
    },

    /**
     * Подписаться на событие с ограничением по частоте получения уведомлений
     * @star
     * @param {String} event
     * @param {Object} context
     * @param {Function} handler
     * @param {Number} frequency – как часто уведомлять
     */
    through: function (event, context, handler, frequency) {
        console.info(event, context, handler, frequency);
    }
};
}

module.exports = {
    getEmitter,

    isStar
};
