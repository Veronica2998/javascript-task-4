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

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {object}
         */
        on: function (event, context, handler) {
            console.info(event, context, handler);
            const student = { name: context, function: handler };
            if (!events[event]) {
                events[event] = [student];
            } else {
                events[event].push(student);
            }

            return this;
        },


        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {object}
         */
        off: function (event, context) {
            console.info(event, context);
            let eventUnsubs = [event];
            for (let key of Object.keys(events)) {
                if (key.startsWith(event + '.')) {
                    eventUnsubs.push(key);
                }
            }
            for (let incident of eventUnsubs) {
                events[incident] = events[incident].filter(entry => entry.name !== context);
            }

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {object}
         */
        emit: function (event) {
            console.info(event);
            while (event) {
                if (events[event]) {
                    events[event].forEach(student => student.function.call(student.name));
                }
                event = event.substr(0, event.lastIndexOf('.'));
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
