function Backdrop(props){
    return <div className="backdrop" onClick={props.onCancel}/>;  //passes value of onCancel to built in onclick of the dev
}

export default Backdrop;