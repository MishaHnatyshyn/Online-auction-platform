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
      if (filesArray.filter(file => file.type.indexOf('image') === -1).length > 0) return;
      this.props.handleImagesUpload({ images: e.dataTransfer.files, imagesPreview: filesArray.map(image => URL.createObjectURL(image)) })
      e.dataTransfer.clearData()
      this.dragCounter = 0
    }
  }

  onFilesGet = (e) => {
    const filesArray = [...e.target.files]
    this.props.handleImagesUpload({ images: e.target.files, imagesPreview: filesArray.map(image => URL.createObjectURL(image)) })
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
      >
        <input type="file" onChange={this.onFilesGet} accept="image/*" multiple ref={this.dropRef}/>
        {this.state.dragging &&
        <div className="main-drag-and-drop-wrapper">
          <div className="drag-and-drop-center-content">
          </div>
        </div>
        }
        {this.props.children}
      </div>
    )
  }
}
