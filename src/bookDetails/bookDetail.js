import React from 'react'
import "./bookDetail.css"
const bookDetails = props=> {
        let description
        let authors
    if(props.authors === "noauthor"){
        authors = <h5>No Author</h5>
    }
    else{
        authors = <div className="author">{props.authors.map(auth => {
            return <h3 style={{color: 'black'}} key={auth}>{auth}</h3>
        })}</div>
    }

    if(props.description === "nodescription"){
        description = <h3 style={{color: 'black'}}>"No Description"</h3>
    } else if(props.description.length> 300){
        description = <div><p>{props.description.substring(0,300)}...<span style={{color: "blue"}}>See all</span></p> </div>
    }
        else{
            description = <p>{props.description}</p>
    }
      return(  <div className="bookDetail">
                <h2>Title</h2>
                <h1> {props.title}</h1>
                <h3>Authors</h3>
                {authors}
          {!props.url?<h3>"No Thumbnail"</h3>:<img src={props.url} alt={props.url}/>}
                <h3>Description</h3>
                {description}
                <h3>Category</h3>
          {!props.categories? <h3>"No Categories"</h3>:props.categories.map(cat=> (
              <h3 style={{color: "black"}} key={cat}>{cat}</h3>
              ))}
                <h5>Date Published: {props.datePublished}</h5>
        </div>)
}

export default bookDetails