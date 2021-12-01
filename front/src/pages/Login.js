import LandingPageLayout from "../components/layout/LandingPageLayout";
import LoginForm from "../components/forms/LoginForm";

function Login() {

    return(
        <LandingPageLayout>
            <section>
                <h1>Login</h1>
                    <LoginForm />
                </section>
        </LandingPageLayout>
    );


}

export default Login;