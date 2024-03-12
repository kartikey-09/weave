import BreadcrumbSection from "@/component/breadcrumb/BreadcrumbSection";
import Layout from "@/component/layout/Layout";
import Privacy from "@/component/terms/Privacy";
export const metadata = {
  title: 'Privacy & Policy Page',
  description: 'Developed ',
}
export default function PrivacyPolicy() {
    return (
        <Layout>
            <BreadcrumbSection title='Privacy Policy' header='Privacy Policy'/>
            <Privacy/>
        </Layout>
    )
}