import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router'
import Header from '../../components/Header'
import ThreadStats from '../../components/Thread/ThreadStats'
const ThreadLayout = () => {
  return (
        <>

            <Header sticky={true }/>
           
         
        <div className="container my-5">
          <div className="row">
            <div className="col-md-9">
                <Outlet/>
            </div>
            <div className="col-md-3">
              <ThreadStats/>
            </div>
          </div>
        </div>

            <Footer/>
        </>

  )
}
export default ThreadLayout
