import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router'
import Header from '../../components/Header'
import ThreadStats from '../../components/Thread/ThreadStats'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const ThreadLayout = () => {
  return (
        <>

            <Header sticky={true }/>
           
         
        <div className="container my-5">
        <div className="tt-topic-list">
  <div className="tt-item tt-item-popup">
    <div className="tt-col-avatar">
     <FontAwesomeIcon icon={faUser}/>
    </div>
    <div className="tt-col-message">
      Diễn đàn đang trong quá trình phát triển.
    </div>
  </div>
</div>
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
