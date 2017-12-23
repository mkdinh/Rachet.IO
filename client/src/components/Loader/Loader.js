// Import react
//--------------------------------------------------------
import React from "react";
import { Segment } from "semantic-ui-react";

const style = {
    margin: 0,
    padding: 0,
    border: "0px solid black"
}

export default (Component) =>

    class LoaderHOC extends Component {

        state = { loading: false }

        toggleLoading = () => this.setState({loading: !this.state.loading})

        render() {

            const loading = this.state.loading;

            return (
                <Segment loading={loading} style={style}>
                    <Component load={this.toggleLoading} {...this.props}/>
                </Segment>
            )
        }   
    }