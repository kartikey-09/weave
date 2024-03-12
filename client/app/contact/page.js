import BreadcrumbSection from "@/component/breadcrumb/BreadcrumbSection";
import ContactPageSection from "@/component/contact/ContactPageSection";
import Layout from "@/component/layout/Layout";
export const metadata = {
  title: 'Weavecu Contact Page',
  description: 'Developed',
}
export default function Contact() {
    return (
        <Layout>
            <BreadcrumbSection header='Contact Us' title="Contact us"/>
            <ContactPageSection/>
        </Layout>
    )
}