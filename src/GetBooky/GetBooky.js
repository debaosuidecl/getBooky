import axios from 'axios'
import React, {Component} from 'react'
import "./GetBooky.css"
import BookDetail from '../bookDetails/bookDetail'
class GetBooky extends Component{

    state={
            input: {
                type: 'text',
                value: '',
                },
            disabled: true,
            response: []
    }

    componentDidMount(){

    }
    onChangeHandler(e){

        let input = {
            ...this.state.input,
            value: e.target.value
        }

        this.setState({
            input
        })
        if(input.value !== ""){
            this.setState({disabled: false})
        } else{
            this.setState({disabled: true})
        }

    }
    onSubmitHandler =(e) => {
            e.preventDefault();
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.input.value}`)
                .then(res=> {
                    console.log(res.data.items)
                    this.setState({
                        response: res.data.items
                    })

                })
                .catch(err=> {
                    console.log(err)
                })

    }
    render(){

        return(
            <div className="Booky">
                <h1>Search for your favourite books with Get Booky</h1>
                <form className="BookyForm" onSubmit={this.onSubmitHandler}>
                    <input className="Search" type="text" value={this.state.input.value} onChange={(e)=> {this.onChangeHandler(e)}}/>
                    <button disabled ={this.state.disabled} className="btn">Search</button>

                </form>

                <div className="bookDetails">
                    {this.state.response.map(res=> {
                       let url =  !res.volumeInfo.imageLinks? null: res.volumeInfo.imageLinks.smallThumbnail;
                       let authors = !res.volumeInfo.authors? "noauthor": res.volumeInfo.authors;
                        let description = !res.volumeInfo.description? "nodescription": res.volumeInfo.description;
                        let date = !res.volumeInfo.publishedDate? "nodate": res.volumeInfo.publishedDate;
                        let categories = !res.volumeInfo.categories? null: res.volumeInfo.categories;
                        return <BookDetail key={res.id}
                                           description={description}
                                           title={res.volumeInfo.title}
                                           url={url}
                                           authors={authors}
                                           datePublished={date}
                                           categories={categories}
                        />
                    })}
                </div>

            </div>
        )
    }
}

export default GetBooky