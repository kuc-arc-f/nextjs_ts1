import React from 'react'
import client from "../../../apollo-client";
import Task from '../../../graphql/task'
import Layout from '../../../components/layout'

interface IObject {
  id: number,
  title: string,
}
interface IState {
  id: number,
  title: string,
}
interface IProps {
  history: string[],
  item: IObject,
  id: number,
}
//
export default class TaskEdit extends React.Component<IProps, IState> {
  static async getInitialProps(ctx) {
//console.log("id=", ctx.query.id)
    const id = ctx.query.id;
    const data = await client.query({
      query: Task.get_query_task(id),
      fetchPolicy: "network-only"
    });
console.log(data.data)
    const item = data.data.task;
    return {
      id: id,
      item: item,
    };
  }
  constructor(props){
    super(props)
    this.state = {
      id: this.props.item.id,
      title: this.props.item.title, 
    }
console.log(props )
  }
  componentDidMount(){
  }     
  async handleClickDelete(){
    console.log("#deete-id:" , this.props.id)
    try {
      const result = await client.mutate({
        mutation: Task.get_gql_delete(this.props.id)
      })
console.log(result)
      return result
    } catch (error) {
      console.error(error);
    }     
  } 
  async handleClick(){
//  console.log(this.state)
    await this.update_item()
  }     
  async update_item(){
    try {
      console.log("#update_item-id:" , this.props.id)
      const title = document.querySelector<HTMLInputElement>('#title');
console.log("#update_item");
      const result = await client.mutate({
        mutation: Task.get_gql_update(this.props.id, title.value)
      })
      return result
    } catch (error) {
      console.error(error);
    }     
  }  
  render() {
    return (
      <Layout>
          <div className="container">
            <hr className="mt-2 mb-2" />
            <h1>Tasks - Edit</h1>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Title:</label>
                  <input type="text" id="title" className="form-control"
                    defaultValue={this.state.title} />
                </div>
              </div>
            </div>
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>Save
              </button>
            </div>
            <hr />                  
            <div className="form-group">
              <button className="btn btn-danger" onClick={this.handleClickDelete.bind(this)}>Delete
              </button>
            </div>

            <hr />
            ID : {this.props.id}
          </div>
      </Layout>
    );
  }
}

