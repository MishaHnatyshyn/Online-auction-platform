import React, { Component } from 'react'

export default class DragAndDrop extends Component {
  state = {
    drag: false
  }
  dropRef = React.createRef()

  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  };

  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({drag: true})
    }
  };

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({drag: false})
    }
  }
  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({drag: false})
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = [...e.dataTransfer.files]
      this.props.handleImagesUpload({ image: e.dataTransfer.files, imagePreview: filesArray.map(image => URL.createObjectURL(image)) })
      e.dataTransfer.clearData()
      this.dragCounter = 0
    }
  }

  onFilesGet = (e) => {
    const filesArray = [...e.target.files]
    this.props.handleImagesUpload({ image: e.target.files, imagePreview: filesArray.map(image => URL.createObjectURL(image)) })
  }

  componentDidMount() {
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }
  componentWillUnmount() {
    let div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
  }
  render() {
    return (
      <div
        className="placeholder photos"
        // style={{display: 'inline-block', position: 'relative'}}
      >
        <input type="file" onChange={this.onFilesGet} accept="image/*" multiple ref={this.dropRef}/>
        {this.state.dragging &&
        <div
          style={{
            border: 'dashed grey 4px',
            backgroundColor: 'rgba(255,255,255,.8)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              left: 0,
              textAlign: 'center',
              color: 'grey',
              fontSize: 36
            }}
          >
            {/*<div>drop here :)</div>*/}
          </div>
        </div>
        }
        {this.props.children}
      </div>
    )
  }
}
