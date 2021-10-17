const topics = {};
const hOP = topics.hasOwnProperty;

export default {
  events: {
    AD_ERROR: 'AD_ERROR',
    AD_SUCCESS: 'AD_SUCCESS',
    LOAD_SHOW: 'LOAD_SHOW',
    LOAD_HIDE: 'LOAD_HIDE'
  },
  subscribe: function (topic, listener) {
    // Create the topic's object if not yet created
    if (!hOP.call(topics, topic)) topics[topic] = [];

    // Add the listener to queue
    var index = topics[topic].push(listener) - 1;

    // Provide handle back for removal of topic
    return {
      remove: function () {
        delete topics[topic][index];
      },
    };
  },
  publish: function (topic, info) {
    // If the topic doesn't exist, or there's no listeners in queue, just leave
    if (!hOP.call(topics, topic)) return;

    // Cycle through topics queue, fire!
    topics[topic].forEach(function (item) {
      item(info != undefined ? info : {});
    });
  },
};