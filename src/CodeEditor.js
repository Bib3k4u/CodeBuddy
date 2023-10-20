import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import './CodeEditor.css'; // CSS for styling

const CodeEditor = () => {
  // Load the code from localStorage if available
  const savedCode = localStorage.getItem('code') || '// Write your code here';
  const [code, setCode] = useState(savedCode);
  const [isLocked, setLocked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleSave = () => {
    // Save the code to localStorage
    localStorage.setItem('code', code);
    alert('Code saved successfully!');
  };

  const handleLockUnlock = () => {
    setLocked(!isLocked);
  };

  useEffect(() => {
    // Update the code in localStorage whenever it changes
    localStorage.setItem('code', code);
  }, [code]);

  return (
    <>
      <div className="code-editor-header">
        <div className="header-title">
          <h2 style={{ letterSpacing: '4px' }}>
            Code Buddy <span style={{ fontSize: '16px' }}>: Your Online Code Editor</span>
          </h2>
        </div>
        <div className="header-buttons">
          <button className="header-button" onClick={handleCopy}>
            Copy
          </button>
          <button className="header-button" onClick={handleSave}>
            Save
          </button>
          <button className={`header-button ${isLocked ? 'locked' : 'unlocked'}`} onClick={handleLockUnlock}>
            <span>{isLocked ? 'Unlock' : 'Lock'}</span>
          </button>
        </div>
      </div>
      <div className="code-editor-page">
        <div className="editor-container">
          <AceEditor
            mode="javascript"
            theme="monokai"
            fontSize={18}
            width="100%"
            height="92vh"
            value={code}
            onChange={(newCode) => setCode(newCode)}
            name="code-editor"
            editorProps={{ $blockScrolling: true }}
            readOnly={isLocked}
            showPrintMargin={false}
          />
        </div>
        <div className="side-panel" style={{ height: '86.6vh' }}>
          <div className="input-section">
            <h4>Input</h4>
            <textarea rows="6" placeholder="Enter your input here"></textarea>
            <button>Submit</button>
          </div>
          <div className="output-section">
            <h4>Output</h4>
            <div className="output-content">Output will appear here</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
