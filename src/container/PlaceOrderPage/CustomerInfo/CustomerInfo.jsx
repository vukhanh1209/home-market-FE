import {useState, useRef, useEffect} from 'react'


const CustomerInfo = (props) => {
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const {setCustomerData} = props
    const profile = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        setLastName(profile.lastName)
        setFirstName(profile.firstName)
        setPhone(profile.phoneNumber)
        setAddress(profile.address)
    }, [])

    useEffect(() => {
        const customerData = {
            firstName,
            lastName,
            phone,
            address
        }
        setCustomerData(customerData);
    }, [lastName, firstName, phone, address])


    const [isEditing, setIsEditing] = useState(false);

    const handleSaveCustomerInfo = () => {
        setIsEditing(false);
    }

    const handleCancelEdting = () => {
        setLastName(profile.lastName);
        setFirstName(profile.firstName);
        setPhone(profile.phoneNumber);
        setAddress(profile.address);
        console.log('cancel')
        setIsEditing(false);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }
    
    return (
        <div className="border-b-2 border-primary pb-6">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Thông tin khách hàng:</h3>
                <div className="flex gap-x-3">
                    {
                        isEditing ? (
                            <>
                                <button 
                                    onClick={handleSaveCustomerInfo} 
                                    className="text-primary bg-transparent border-2 border-primary hover:bg-primary--dark rounded-xl font-semibold text-xs px-4 py-2.5 text-center"
                                >
                                    Xác nhận
                                </button>
                                <button 
                                    onClick={handleCancelEdting} 
                                    className="text-primary bg-transparent border-2 border-primary hover:bg-primary--dark rounded-xl font-semibold text-xs px-4 py-2.5 text-center"
                                >
                                    Hủy
                                </button>
                            </>
                        ) : (
                            <button 
                                onClick={() => setIsEditing(true)} 
                                className="text-primary bg-transparent border-2 border-primary hover:bg-primary--dark rounded-xl font-semibold text-xs px-4 py-2.5 text-center"
                            >
                                Thay đổi
                            </button>
                        )
                    }
                </div>
            </div>
            {
                isEditing ? (
                    <div className="flex justify-between"> 
                        <div className="">
                            <div className="flex flex-col gap-y-1 text-sm  font-semibold w-96 mb-4">
                                <label forhtml="CustomerLastNameInput" className="opacity-80">Họ</label>
                                <input  onChange={handleLastNameChange} type="text" className="px-3 py-1 text-base font-medium rounded-lg outline-none" value={lastName} id="CustomerLastNameInput"/>
                            </div>
                            
                            <div className="flex flex-col gap-y-1 text-sm  font-semibold w-96">
                                <label forhtml="CustomerAddressInput" className="opacity-80">Địa chỉ</label>
                                <input  onChange={handleAddressChange} type="text" className="px-3 py-1 text-base font-medium rounded-lg outline-none" value={address} id="CustomerAddressInput"/>
                            </div>
                        </div>

                        <div className="">
                            <div className="flex flex-col gap-y-1 text-sm  font-semibold w-96 mb-4">
                                <label forhtml="CustomerFirstNameInput" className="opacity-80">Tên</label>
                                <input onChange={handleFirstNameChange} type="text" className="px-3 py-1 text-base font-medium rounded-lg outline-none" value={firstName} id="CustomerFirstNameInput"/>
                                
                            </div>
                            <div className="flex flex-col gap-y-1 text-sm  font-semibold w-96">
                                <label forhtml="CustomerPhoneInput" className="opacity-80">Số điện thoại</label>
                                <input  onChange={handlePhoneChange} type="text" className="px-3 py-1 text-base font-medium rounded-lg outline-none" value={phone} id="CustomerPhoneInput"/>
                                
                            </div>


                           
                        </div>
                    </div>
                    
                ) : (
                    <div className="flex justify-between items-center font-semibold px-2 pt-4">
                        <div className="flex flex-col gap-2">
                            <p>{`${firstName} ${lastName}`}</p>
                            <p>{`${phone}`}</p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <p>{`${address}`}</p>
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}
export default CustomerInfo;