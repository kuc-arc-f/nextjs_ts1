import React, { Component } from 'react';
import Link from 'next/link';

/*
interface IObject {
  id: number,
  title: string
}
interface IProps {
  id: number,
}
*/
//
const IndexRow = props => (
  <li>
    ID: {props.id} , 
    <Link href={`/tasks/${props.id}`}>
      <a>{props.title}</a>
    </Link>
    <Link href={`/tasks/edit/${props.id}`}>
      <a>[ edit ]</a>
    </Link>    
  </li>
);
export default IndexRow;