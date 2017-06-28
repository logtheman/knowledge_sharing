import React from 'react';


function _fetch(url, options) {
  return fetch(url, options)
    .then(response=>{
      return response.json();
    })
    .catch(err=>{
      console.log('There was an error processing your request');
      console.log(err);
    });
}

export function get(url, options={}) {

  const defaultOptions = {
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    }
  };

  return _fetch(url, Object.assign({}, defaultOptions, options));
}

export function post(url, payload, options) {

  const defaultOptions = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'X-CSRF-Token':  document.getElementsByName("csrf-token")[0].content,
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  };

  return _fetch(url, Object.assign({}, defaultOptions, options));
}

export function put(url, options, payload){

  const defaultOptions = {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'X-CSRF-Token':  document.getElementsByName("csrf-token")[0].content,
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  };

  return _fetch(url, Object.assign({}, defaultOptions, options));
}

export function deleteRequest(url, options, payload){

  const defaultOptions = {
    method: 'DELETE',
    body: JSON.stringify(payload),
    headers: {
      'X-CSRF-Token':  document.getElementsByName("csrf-token")[0].content,
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  };

  return _fetch(url, Object.assign({}, defaultOptions, options));
}

/* ---------------  Component Helpers ------------------------------- */

//TODO break on \n and create a array of strings and make into divs 
// string split on new line character


function stringToHTML(str){
  // str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
  const parts = str.split('\n');
  const returnString = parts.map((part, index)=>{
    return (
      <p className="form-output" key={`detail-${index}`}>{part}</p>
    );
  });
  return returnString;
}

// function createMarkup(input) {
//   const output = stringToHTML(input);
//   return {__html: output};
// }

export function HtmlConverterComponent(input) {
  // return <div dangerouslySetInnerHTML={createMarkup(input)} />;
  if(input) {
    return (
      <div>
        {stringToHTML(input)}
      </div>
    );
  }else{
    return //just return is nothing to do
  }
}
//https://facebook.github.io/react/docs/dom-elements.html

export function truncate(str, length){
  if(str){
    str = str.substring(0, length);
    if(str.length >= length){
      str += "...";
    }
    return str;
  }
  return "";
}

/************************ Temporary auto complete proof of concept **************************/


function findMatches(wordToMatch, tags) {
  console.log("word to match: ", wordToMatch);
  console.log("tags in matching: ", tags);

  if(tags){
    return tags.filter(tag => {
      // here we need to figure out if the tag matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return tag.match(regex);
    });
  }else{
    return []
  }
}


export function displayMatches(value, tags="") {
  const matchArray = findMatches(value, tags);
  if(matchArray.length > 0){
  return (
          <ul className="tag-results">
           {matchArray.map((tag, i) => {
             const regex = new RegExp(value, 'gi');
             // const foundTag = tag.replace(regex, `<span className="hl">${value}</span>`);
             const foundTag = tag.replace(regex, value);
             
             return (
                <li key={i}>
                  <span className="tagFound">{foundTag}</span>
                </li>)
           })}
        </ul>
        );
  }else{
    return '';
  }
}

export function getTagList(){
  let tags = '';
  get('/tags').then(json=>{
      tags = json.tags.map(function(tag) {
        return tag.name;
      });
      console.log("tags in json retrieve: ", tags); 
  }).catch(err=>{
      console.log('There was an error processing your request');
      console.log(err);
   });
  console.log('tags: ', tags);
  // return tags;

}


// const tags = ['Happiness', 'Engineering', 'Business Development', 'Finance', 'Ops', 'Catalog', 'Marketing',
//               'Shoppers', 'Data Science', 'Orders', 'Express', 'Payroll', 'Rails', 
//               'React', 'Tableau', 'Blazer', 'Stripe', 'Marqeta', 'Culture', 'SF Office', 'All Hands', 'Happy Hour'];


