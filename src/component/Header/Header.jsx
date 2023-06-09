import { Fragment,useState, useRef, useContext} from "react";
import {FiUser, FiShoppingBag} from 'react-icons/fi'
import {CgMenuGridO} from 'react-icons/cg'
import {BiChevronDown} from 'react-icons/bi'
import { Link, useNavigate } from "react-router-dom";
import {IoMailOutline} from 'react-icons/io5'
import {HiOutlineUserCircle} from 'react-icons/hi2'
import {TfiReceipt} from 'react-icons/tfi'
import { removeVietnameseTones } from "../../utils/utils";
import {clearLocalStorage} from '../../utils/auth'
import { AppContext } from "../../context/app.context";
const category = [
    {
        id: 1,
        cate: 'Rau củ quả an toàn'
    },
    {
        id: 2,
        cate: 'Rau củ quả hữu cơ'
    },
    {
        id: 3,
        cate: 'Nấm & Đậu hũ'
    },
    {
        id: 4,
        cate: 'Thịt bò'
    },
    {
        id: 5,
        cate: 'Thịt heo'
    },
    {
        id: 6,
        cate: 'Cá'
    },
    {
        id: 7,
        cate: 'Trứng'
    },
    {
        id: 8,
        cate: 'Trái cây nhập'
    },
    {
        id: 9,
        cate: 'Trái cây Việt Nam'
    },
]
const Header = () => {
    const {isVerified, setIsVerified, profile, setProfile} = useContext(AppContext)
    const navigate = useNavigate()
    const SearchRef = useRef();

    const handlePressEnter = (event) => {
        const keyValue = SearchRef.current.value;
        if(event.key == "Enter" && keyValue) {
            navigate(`/search?key=${removeVietnameseTones(keyValue).toLowerCase()}`);
        }
    }

    const handleLogOut = () => {
        clearLocalStorage();
        setIsVerified("0");
    }

    const handleClickMenuItem = (id) => {
        navigate(`search?cate=${id}`)
        window.location.reload();
    }

    return (
        <Fragment>
            <div className={"fixed w-full z-50 bg-[#F6F4F2] top-0"} id="Header">
                <div className='flex items-center justify-between w-full h-[5rem] px-24 border-b border-[#e6e6e6] '>
                    <div className="flex items-center gap-x-5">
                        <div>
                            <Link to='/'>
                                <div className={`text-2xl font-bold text-center text-[#383634]`}>
                                    <p>HomeMarket</p>
                                </div>
                            </Link>
                        </div>


                        <div className="flex items-center font-semibold">   
                            {/* <label htmlFor="simple-search" className="sr-only">Search</label> */}
                            <div className="relative flex items-center w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 17L21 21" stroke="#3d3d3d" strokeWidth="1.44" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#3d3d3d" strokeWidth="1.44"></path> </g></svg>
                                </div>
                                <input ref={SearchRef} onKeyUp={event => handlePressEnter(event)} type="text" id="simple-search" maxLength="16" className="bg-white text-primary text-sm focus:outline-[#4C7C7D] placeholder:text-gray-500 placeholder:font-medium rounded-lg block w-[16rem] pl-10 p-2.5  min" placeholder="Tìm kiếm theo tên" required/>            
                            </div>
                            
                        </div>

                        <div className="flex justify-center text-[#383634]">
                            <div className={`flex items-center h-14  text-base z-10`}>
                                <div href="" className="relative group flex items-center h-full mx-4 rounded-xl hover:text-[#4C7C7D] ">
                                    <div className="flex justify-center items-center font-bold">
                                        <CgMenuGridO className="text-3xl mr-2 "/>
                                        <div>
                                            Danh mục
                                        </div>
                                    </div>
                                    <div className="absolute w-full h-4 bg-transparent top-[100%]"></div>
                                    
                    
                                    <div className="group-hover:inline-block hidden text-left mt-16" id="ProductDropdown">
                                        <div className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg font-medium py-2">
                                            {
                                                category.map((item, index) => (
                                                    <li onClick={() => handleClickMenuItem(item.id)} key={index} className="flex items-center gap-x-3 text-primary px-6 py-2 text-sm whitespace-nowrap hover:bg-primary--dark cursor-pointer">
                                                            <span>{item.cate}</span>
                                                    </li>
                                                ))
                                            }
                                            
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    

                    <div className="flex items-center justify-center z-10">
                        {
                            isVerified == "1" ? (
                                <>
                                    <div className="group relative hover:cursor-pointer mr-10">
                                        <div className="relative group flex items-center h-full mx-4 rounded-xl ">
                                            <div className="flex justify-center items-center gap-x-2">
                                                <FiUser className="text-2xl text-[#383634]"/>
                                                <span className="text-sm text-slate-600 font-bold whitespace-nowrap">{`${profile.firstName || ""} ${profile.lastName || ""}`}</span>
                                                <BiChevronDown className="text-lg text-[#383634]"/>
                                            </div>

                                            <div className="absolute w-full h-8 bg-transparent top-[100%]"></div>

                                            
                            
                                            <div className="group-hover:inline-block hidden text-left mt-16 " id="ProductDropdown">
                                                
                                                <div className="absolute right-0 z-10 mt-2 w-fit origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-[#383634] ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                                    <div className="py-2 font-medium " role="none">
                                                        <Link to="user" className="flex items-center gap-x-3 text-primary px-6 py-2 text-sm whitespace-nowrap hover:bg-primary--dark" role="menuitem" tabIndex="-1" id="menu-item-0">
                                                            <HiOutlineUserCircle className="h-6 w-6"/>
                                                            <span> Quản lý tài khoản</span>
                                                        </Link>
                                                        <Link to="user/order" className="flex items-center gap-x-3 text-primary px-6 py-2 text-sm whitespace-nowrap hover:bg-primary--dark" role="menuitem" tabIndex="-1" id="menu-item-1">
                                                            <IoMailOutline className="h-6 w-6"/>
                                                            <span>Đơn hàng của tôi</span>
                                                        </Link>
                                                        <Link to="user/payment" className="flex items-center gap-x-3 text-primary px-6 py-2 text-sm whitespace-nowrap hover:bg-primary--dark" role="menuitem" tabIndex="-1" id="menu-item-1">
                                                            <TfiReceipt className="h-6 w-6"/>
                                                            <span>Đơn mua của tôi</span>
                                                        </Link>

                                                    </div>
                                                    <div className="py-1 hover:bg-primary--dark rounded-b-xl" role="none">
                                                        <li onClick={() => {
                                                            handleLogOut();
                                                            navigate('/'); 
                                                            }} 
                                                            className="font-medium text-primary block px-4 py-2 text-sm whitespace-nowrap  text-center" role="menuitem" tabIndex="-1" id="menu-item-6">
                                                            Đăng xuất
                                                        </li>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Link to='/cart'>
                                        <button className="relative h-10 flex gap-x-2 items-center justify-center rounded-lg text-[#383634] font-bold px-4  text-sm hover:bg-[#EDEAE7] bg-white" >
                                            <FiShoppingBag className="text-2xl"/>
                                            <span className="whitespace-nowrap">Giỏ hàng</span>
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                   
                                    <Link to="register" className="px-4 py-3 rounded-full text-[#383634] font-semibold text-sm hover:bg-primary--dark mr-3" >Đăng ký</Link>
                                    <Link to="login" className="px-4 py-3 rounded-full textt-[#fff] font-semibold text-sm bg-[#4C7C7D] hover:opacity-80 mr-3">Đăng nhập</Link>
                                </>
                            )
                        }
                        

                    </div>
                </div>


            </div>
        </Fragment>
    )
}

export default Header;