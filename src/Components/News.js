import React, { Component } from 'react'
import Item from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static deafualtProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    articles = []
    constructor(props) {
        super(props)
        this.state = {
            articles: this.articles,
            loading: true,
            page: 0,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }

    async componentDidMount() {
        this.updatePage()
    }

    updatePage = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3770331d7a4d4c51975d38a761e1cf29&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        // this.setState({
        //     loading: true
        // })
        this.props.setProgress(0)
        let data = await fetch(url)
        this.props.setProgress(30)
        let parseData = await data.json()
        this.props.setProgress(70)
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            // loading: false
        })
        this.props.setProgress(100)
    }
    // handlePrev = async () => {
    //     this.setState({
    //         page: this.state.page - 1,
    //     })
    //     this.updatePage()
    // }

    // handleNext = async () => {
    //     this.setState({
    //         page: this.state.page + 1,
    //     })
    //     this.updatePage()
    // }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })
        this.updatePage()
    };
    render() {
        return (
            <>
                <h2 className='text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h2>
                {this.state.loading && <Spinner /> }
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container my-4">
                        {/* <div className='position-absolute top-50 start-50 translate-middle'>{this.state.loading && <Spinner />}</div> */}
                        <div className='row'>
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url}>
                                    <Item source={element.source.name} title={element.title} description={element.description} imageUrl={element.urlToImage ? element.urlToImage : 'https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg'} author={element.author ? element.author : "Unknwon"} date={element.publishedAt} newsUrl={element.url} />
                                </div>
                            })}
                        </div>
                        {/* <div className="container d-flex justify-content-between">
                        <button type="button" disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.handlePrev}>&larr; Previous</button>
                        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-primary" onClick={this.handleNext}>Next &rarr;</button>
                    </div> */}
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}


export default News
