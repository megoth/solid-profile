import Login from "../../login";
import {useSolidAuth} from "@ldo/solid-react";
import Content from "../../content";

export default function LoginButtonModal() {
    const {login} = useSolidAuth();
    return <div className="box">
        <Content>
            <h2 className="title">Please log in using a Solid provider</h2>
        </Content>
        <Login login={login}/>
    </div>;
}