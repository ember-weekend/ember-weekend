/* global window */
window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-views.event-dispatcher.mouseenter-leave-move" },
    { handler: "silence", matchId: "ember-views.curly-components.jquery-element" },
    { handler: "silence", matchId: "ember-font-awesome.no-fa-prefix" },
    { handler: "silence", matchId: "computed-property.override" },
    { handler: "silence", matchId: "ember-animated-container-class-arg" },
  ]
};
