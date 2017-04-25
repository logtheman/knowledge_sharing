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




