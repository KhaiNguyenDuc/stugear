import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router'
import Header from '../../components/Header'
import './index.css'
import TitleBox from '../../components/TitleBox/TitleBox'
const MainLayout = ({hasNavigation, title, sub_title, titleUrl}) => {
  return (
        <>

            <Header sticky={true }/>
            {hasNavigation && (
              <TitleBox title={title} sub_title={sub_title} titleUrl={titleUrl}/>
            )}
            <div className="body container my-5">
                <Outlet/>
            </div>
            <Footer/>
        </>

  )
}
export default MainLayout
