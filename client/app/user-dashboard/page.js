import Dashboard from "@/component/user-dashboard/Dashboard"
import Layout from "@/component/layout/Layout"
export const metadata = {
    title: 'Weavecu User Dashboard',
    description: 'Developed ',
  }
export default function Dashboardpage() {
    
    return (
        <Layout>
          <Dashboard/>
         </Layout>
        
    )
  }