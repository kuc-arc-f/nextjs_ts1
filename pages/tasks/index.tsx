import React  from 'react';
import Link from 'next/link';
import { gql } from "@apollo/client";
import Layout from '../../components/layout'
import client from '../../apollo-client'
import LibCookie from '../../lib/LibCookie'
import IndexRow from './IndexRow';

interface IProps {
  items: Array<object>,
  history:string[],
}
interface IObject {
  id: number,
  title: string
}
//
class TasksIndex extends React.Component<IProps> {
  static async getInitialProps(ctx) {
    const data = await client.query({
      query: gql`
      query {
        tasks {
          id
          title
        }
      }
      `,
      fetchPolicy: "network-only"
    });
//console.log(data.data.tasks);   
    return {
      items: data.data.tasks,
    }
  }
  constructor(props){
    super(props)
  }       
  async componentDidMount(){
    const key = process.env.COOKIE_KEY_USER_ID;
    if(LibCookie.get_cookie(key) === null){
      location.href = '/login';
    }    
  }
  render() {
    const data = this.props.items;
//console.log(data);
    return (
    <Layout>
    <div className="container py-4">
      <h3>Tasks - index</h3>
      <Link href="/tasks/create">
        <a className="btn btn-primary mt-2">New</a>
      </Link>
      <hr />
      {data.map((item: IObject ,index: number) => {
        return (
          <IndexRow key={index} id={item.id} title={item.title} />
        )
      })}
    </div>
    </Layout>
    );
  }
}
export default TasksIndex;
