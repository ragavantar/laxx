import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6


/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Editor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

class App extends Component {
    constructor(props) {
        super(props);
        // this.state = {editorState: EditorState.createEmpty()};
        // this.onChange = editorState => this.setState({editorState});    
        this.state = { text: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    render() {
        return (
            <div>
                {/* Draft js
                <Editor editorState={this.state.editorState} onChange={this.onChange} /> */}
                Quill
                <ReactQuill value={this.state.text}
                          modules={Editor.modules}
                          formats={Editor.formats}
                    onChange={this.handleChange} />
            </div>
        );
    }
}

export default App;