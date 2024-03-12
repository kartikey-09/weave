import RegisterSection from "@/component/authentication/RegisterSection";

import Layout from "@/component/layout/Layout";
export const metadata = {
  title: 'Weavecu Sign-Up Page',
  description: 'Developed ',
}
export default function SignUp() {
    return (
        <Layout>
       
            <RegisterSection/>
        </Layout>
    )
}