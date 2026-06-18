

import { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, Palette, AlignLeft, AlignCenter, AlignRight, List, ListOrdered } from 'lucide-react';

const RichTextEditor = ({ value, onChange, placeholder = "Write your experience..." }) => {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  const handleInput = () => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const getColor = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const element = range.commonAncestorContainer.parentElement;
      if (element) {
        const color = window.getComputedStyle(element).color;
        return color;
      }
    }
    return '#000000';
  };

  const handleColorChange = (e) => {
    execCommand('foreColor', e.target.value);
  };

  return (
    <div className="border-2 border-white/20 rounded-lg overflow-hidden bg-white/5">
      {}
      <div className="flex items-center gap-2 p-2 bg-white/10 border-b border-white/20 flex-wrap">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-2 hover:bg-white/20 rounded transition-colors text-white"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-2 hover:bg-white/20 rounded transition-colors text-white"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className="p-2 hover:bg-white/20 rounded transition-colors text-white"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-white/20 mx-1" />
        <div className="flex items-center gap-1">
          <Palette className="w-4 h-4 text-white" />
          <input
            type="color"
            onChange={handleColorChange}
            className="w-8 h-8 rounded border border-white/20 cursor-pointer"
            title="Text Color"
          />
        </div>
        <div className="w-px h-6 bg-white/20 mx-1" />
        <button
          type="button"
          onClick={() => execCommand('justifyLeft')}
          className="p-2 hover:bg-white/20 rounded transition-colors text-white"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyCenter')}
          className="p-2 hover:bg-white/20 rounded transition-colors text-white"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyRight')}
          className="p-2 hover:bg-white/20 rounded transition-colors text-white"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-white/20 mx-1" />
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 hover:bg-white/20 rounded transition-colors text-white"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 hover:bg-white/20 rounded transition-colors text-white"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
      </div>

      {}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`min-h-[200px] p-4 text-white/90 focus:outline-none ${
          isFocused ? 'bg-white/10' : 'bg-white/5'
        } transition-colors`}
        style={{
          wordBreak: 'break-word',
          overflowWrap: 'break-word'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
      
      <style>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }
        [contenteditable] a {
          color: #FF8C42;
          text-decoration: underline;
        }
        [contenteditable] ul, [contenteditable] ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        [contenteditable] li {
          margin: 0.25rem 0;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;

