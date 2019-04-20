import React, { Component } from 'react';

const Dots = ({ handleClick, display}) => {
  if (!display) return null;
  return (
    <div className={`pagination-item`} onClick={handleClick}>
      ...
    </div>
  )
}

export default class Pagination extends Component  {

  handleNextPage = () => {
    this.props.changeActivePage(this.props.active + 1);
  }

  handlePrevPage = ()  => {
    this.props.changeActivePage(this.props.active - 1);
  }

  generatePages = () => {
    const { pageCount, active } = this.props;
    const displayLeftDots = this.displayLeftDots()
    const displayRightsDots = this.displayRightsDots()
    if (displayLeftDots && displayRightsDots) {
      return this.generateArray(active - 2, active + 2)
    } else if (displayLeftDots) {
      return this.generateArray(pageCount - 5, pageCount - 1)
    } else if (displayRightsDots) {
      return this.generateArray(2, 6)
    } else if (pageCount > 2){
      return this.generateArray(2, pageCount - 1)
    } else {
      return []
    }
  };

  generateArray = (start, end) => [...new Array(end - start + 1)].map((_, i) => i + start)

  displayLeftDots = () => {
    const { pageCount, active } = this.props;
    return (active > 5 && pageCount > 7);
  }

  displayRightsDots = () => {
    const { pageCount, active } = this.props;
    return ((pageCount - active > 4) && pageCount > 7);
  }

  render() {
    const { pageCount, changeActivePage, active } = this.props;
    if (this.props.pageCount === 0) {
      return null;
    }

    const displayLeftDots = this.displayLeftDots();
    const displayRightsDots = this.displayRightsDots();
    const middlePagesArray = this.generatePages();
    return (
      <div className="pagination">

        {active !== 1
          ? (
            <div className="pagination-item" onClick={this.handlePrevPage}>
              <i className="fas fa-chevron-left"></i>
            </div>
          )
          : null
        }

        <div key={1} className={`pagination-item ${active === 1 ? 'active' : ''}`} onClick={changeActivePage.bind(this, 1)}>
          1
        </div>

        <Dots handleClick={changeActivePage.bind(this, active - 5)} display={displayLeftDots} />

        {middlePagesArray.map(page => (
          <div key={page} className={`pagination-item ${active === page ? 'active' : ''}`} onClick={changeActivePage.bind(this, page)}>
            {page}
          </div>
        ))}

        <Dots handleClick={changeActivePage.bind(this, active + 5)} display={displayRightsDots} />

        {
          pageCount > 1
          ? <div key={pageCount} className={`pagination-item ${active === pageCount ? 'active' : ''}`} onClick={changeActivePage.bind(this, pageCount)}>
              {pageCount}
            </div>
          : null
        }


        {active !== pageCount
          ? (
            <div className="pagination-item" onClick={this.handleNextPage}>
              <i className="fas fa-chevron-right"></i>
            </div>
          )
          : null
        }
      </div>
    );
  }
}
