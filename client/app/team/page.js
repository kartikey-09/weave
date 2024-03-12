import BreadcrumbSection from "@/component/breadcrumb/BreadcrumbSection";
import Layout from "@/component/layout/Layout";
import AllTeamMemberSection from "@/component/team/AllTeamMemberSection";
export const metadata = {

  title: 'Team Page',

  description: 'Developed',
}
export default function Team() {
    return (
        <Layout>
            <BreadcrumbSection header='Gallery' title='Gallery'/>
            <AllTeamMemberSection/>
        </Layout>
    )
}