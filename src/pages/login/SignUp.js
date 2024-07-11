import SignUp from "../../components/login/SignUp"


function SignUpPage({user}) {

    return (
            <>
            <div id="content">
                {<SignUp user={user}/>}
            </div>
            </>
    );
}

export default SignUpPage;