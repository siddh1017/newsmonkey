import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props
    return (
      <div>
        <div className="card shadow p-3 mb-5 bg-body rounded">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <div style={{position : 'absolute', right : '0'}}>
              <span className="badge rounded-pill bg-warning">{source}</span>
            </div>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">Author : {author} </small></p>
            <p className="card-text"><small className="text-muted">Last updated: {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
