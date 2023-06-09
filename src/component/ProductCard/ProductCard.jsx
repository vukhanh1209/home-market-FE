import {useState} from 'react'
import {RiAddFill} from 'react-icons/ri'
import NumberInput from '../UI/NumberInput'
import { formatCash } from '../../utils/utils'
import API from '../../api'
import { AppContext } from '../../context/app.context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = (props) => {
    // const [loved, setLoved] = useState(false);
    const navigate = useNavigate();
    const {data, setDisplaying, setState, setNotification} = props;
    const [quantity, setQuantity] = useState(0);
    const {isVerified} = useContext(AppContext);

    let cartItem = {}

    if(isVerified == "1") {
        cartItem = {
            product_id: data.id,
            user_id: JSON.parse(localStorage.getItem('profile')).userID,
            quantity
        };
    }


    const handleRegisteredAddToCart = () => {
        if(quantity <= 0) {
            setState(false)
            setNotification("Số lượng sản phẩm phải lớn hơn 0")
            setDisplaying(true)
        }
        else {     
            API.post('cart/add', cartItem)
                .then(res => {
                    setState(res.data.success)
                    setNotification(res.data.message)
                    setDisplaying(true)
                })
                .catch(err => {
                    setState(false)
                    setNotification("Số lượng sản phẩm trong kho không đủ")
                    setDisplaying(true);
                    console.error(err)
                })
        }
    }
    
    const handleAddToCart = () => {
        navigate('/login')
    }
  
    return (
        <div className="relative h-full w-full bg-white rounded-2xl border border-primary hover:-translate-y-1 hover:drop-shadow-lg transition-all">
            <div className="w-full  rounded-t-2xl overflow-hidden">
                <img className="w-full " src={data.imagePath} alt="Ảnh sản phẩm" />
            </div>

            <div className=" flex flex-col items-start gap-2 w-full rounded-b-2xl p-4">
                <div className="text-xs font-bold text-gray-400 ">
                    <span>{data.category.toUpperCase()}</span>
                </div>
                <div className="flex w-full items-center justify-between h-14 ">
                    <h1 className="font-bold text-lg text-[#383634] line-clamp-2 ">{data.productName}</h1>
                </div>
                
                <div className="flex w-full items-center justify-between">
                    

                    <div className="flex flex-col items-start">
                        {/* <div className="font-bold text-sm text-gray-500 line-through">
                            <span >$40.00</span>
                        </div> */}
                        <div className="font-bold text-lg text-[#e45959]">
                            <span >{formatCash(data.price * 1000)}</span>
                        </div>
                        <span className="text-sm text-gray-400 font-medium text-center my-auto">{data.weight}</span>

                    </div>

                    <div className="flex flex-col items-end">
                        <NumberInput width="32px" height="24px" color="#fff" borderRadius="4px" border="#E8E5E2" setQuantity={setQuantity}/>
                        {
                            isVerified == "1" ? (
                                <button onClick={handleRegisteredAddToCart} className="flex items-center justify-center bg-white border border-primary text-[#383634] text-sm font-bold px-3 py-2 my-2 rounded-lg w-full  hover:bg-[#4C7C7D] hover:text-white transition-all">
                                    <span className="my-auto font-bold">Giỏ</span>         
                                    <RiAddFill className="ml-2 mr-[-4px] w-5 h-5 "/>
                                </button>
                            ) : (
                                <button onClick={handleAddToCart} className="flex items-center justify-center bg-white border border-primary text-[#383634] text-sm font-bold px-3 py-2 my-2 rounded-lg w-full  hover:bg-[#4C7C7D] hover:text-white transition-all">
                                <span className="my-auto font-bold">Giỏ</span>         
                                <RiAddFill className="ml-2 mr-[-4px] w-5 h-5 "/>
                            </button>
                            )
                        }
                       
                    </div>
                    
                </div>

                

            </div>

        </div>
    )
}

export default ProductCard;