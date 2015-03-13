/**
 * @fileoverview
 * @author FE개발팀 김성호 sungho-kim@nhnent.com
 */

'use strict';

/**
 * MarkdownEditor
 * @exports MarkdownEditor
 * @extends {}
 * @constructor
 * @class
 */
function MarkdownEditor(eventManager, el, initialValue) {
    this.eventManager = eventManager;
    this.$editorContainerEl = el;

    this.init(initialValue);
}

MarkdownEditor.prototype.init = function(initialValue) {
    var cmTextarea = $('<textarea />');

    if (initialValue) {
        cmTextarea.text(initialValue);
    }

    this.$editorContainerEl.append(cmTextarea);

    this.cm = CodeMirror.fromTextArea(cmTextarea[0], {
        lineWrapping: true,
        mode: 'gfm',
        theme: 'default'
    });

    this._initEvent();
};

MarkdownEditor.prototype._initEvent = function() {
    var self = this;

    this.cm.on('update', function(cm) {
        console.log('event: update', cm);
        self.eventManager.emit('markdownUpdated', self.getValue());
    });

    this.cm.on('change', function() {
        console.log('event: change', arguments);
    });

    this.cm.on('scroll', function() {
        console.log('event: scroll', arguments);
    });

    this.cm.on('focus', function() {
        console.log('event: focus', arguments);
    });
};

MarkdownEditor.prototype.focus = function() {
    this.cm.focus();
};

MarkdownEditor.prototype.setValue = function(markdown) {
    this.cm.doc.setValue(markdown);
};

MarkdownEditor.prototype.getValue = function() {
    return this.cm.doc.getValue('\n');
};

module.exports = MarkdownEditor;
