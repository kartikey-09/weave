import BreadcrumbSection from "@/component/breadcrumb/BreadcrumbSection";
import AllFaqSection from "@/component/faq/AllFaqSection";
import Layout from "@/component/layout/Layout";
export const metadata = {
  title: 'Weavecu FAQ Page',
  description: 'Developed',
}
export default function Faq() {
    return (
        <Layout>
            <BreadcrumbSection title='FAQ' header="FAQ"/>
            <AllFaqSection/>
        </Layout>
    )
}