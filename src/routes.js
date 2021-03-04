import RightComponent from "./client/container/RightContainer";

// TODO: Common routes file.
export default [
    {
        path: "/app/(year)?/:year?/(isLanding)?/:isLanding?/(isLaunch)?/:isLaunch?",
        component: RightComponent,
        exact: true
    }
];
