import Completed from "../../components/login/SignUpCompleted";

function CompletedPage({user}) {

    return (
            <>
            <div id="content">
                {<Completed user={user}/>}
            </div>
            </>
    );
}

export default CompletedPage;