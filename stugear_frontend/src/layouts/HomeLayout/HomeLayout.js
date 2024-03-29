import { Outlet } from 'react-router'
import './HomeLayout.css'
import { Container } from 'react-bootstrap'
import SideBar from '../../components/SideBar/SideBar'
import CategoryService from '../../service/CategoryService'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import TitleBox from '../../components/TitleBox/TitleBox'
const HomeLayout = ({title, sub_title, titleUrl}) => {
  
  const [categories, setCategories] = useState([])
  const [isLoading, setLoading] = useState(true)
  const getCategories = async () => {
    const response = await CategoryService.getAllCategories()
    if (response?.status === 500) {
      console.log('Something went wrong')
    } else {
      setCategories(response.filter(category => category.name === "Sách" || category.name === "Tài liệu"
      || category.name === "Linh kiện"
      || category.name === "Khác"
      )
      )
      
    }
  }
  useEffect(() => {
    setLoading(true)
    getCategories()
    setLoading(false)
  }, [])

  return (
    <>
      
      <Header sticky={false}/>  
      <TitleBox title={title} sub_title={sub_title} titleUrl={titleUrl}/>
      <Container>


        <div className="row">
          <div className="col-xl-2 col-12 ">

            {isLoading
              ? (
              <Loading/>
                )
              : (
              <SideBar categories={categories} />
  
                )}

          </div>
          <div className="col content mb-5">
            <Outlet />
          </div>
        </div>
      </Container>
      <Footer/>
    </>
  )
}
export default HomeLayout
