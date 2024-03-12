import AllBlogSection from "@/component/blog/AllBlogSection";
import BreadcrumbSection from "@/component/breadcrumb/BreadcrumbSection";
import Layout from "@/component/layout/Layout";
export const metadata = {
  title: 'Weavecu Blog Page',
  description: 'Developed ',
}
export default function Blog() {
    return (
        <Layout>
            <BreadcrumbSection header="Blog" title="Blog"/>
            <AllBlogSection/>
        </Layout>
    )
}