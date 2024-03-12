import BreadcrumbSection from "@/component/breadcrumb/BreadcrumbSection";
import CategorySection from "@/component/category/CategorySection";
import Layout from "@/component/layout/Layout";
export const metadata = {
  title: 'Weavecu Courses Page',
  description: 'Developed ',
}
export default function Courses() {
    return (
        <Layout>
            <BreadcrumbSection header='All Services' title='All Services'/>
            <CategorySection />
        </Layout>
    )
}