import React from "react";
import {Button} from 'reactstrap';
class Submit extends React.Component {
    render() {
        return(
            <Button
                type={'submit'}
                className={'btn btn-primary mb-2'}
                disabled={this.props.disabled}
                onClick={()=> this.props.onClick()}
            >{this.props.text}</Button>
        )
    }
}
export default Submit;