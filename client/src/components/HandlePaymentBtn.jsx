import { useSelector, useDispatch } from 'react-redux'

 // click on the payment -> check amount>0 and card number is matched to the one provided, expiry data greater than current data, and length of CVV equal to 3
// after the payment, update order_id status is "fulfilled", cart is empty, delete localStorage.getItem("orderID"), so when open page on orders, new order_id should be generated
export default function HanldePaymentBtn({ cardInfo, orderID,setCartInfo }) {
    const cart = useSelector((state) => state.cart)
    const total = cart.reduce((sum, food)=> sum+food.price, 0)
    const dispatch = useDispatch()

function CompareDate(expiryDate) {
    let date = new Date();
    const [inputMonth, inputYear] = expiryDate.split('/').map(Number)
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth();

    if (inputYear >= currentYear || (inputYear === currentYear && inputMonth >= currentMonth)) {
        console.log(total)
        return true
    }
    return false
}

function handlePayment(e) {
    e.preventDefault()
    if (CompareDate(cardInfo.expiryDate) && total > 0 && cardInfo.cardNumber === "4242 4242 4242 4242" && cardInfo.cvv.length === 3) {
        alert("Your order is submitted!");
        fetch(`http://localhost:5000/order/${orderID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: "fulfilled" })
        }
        );
        localStorage.removeItem("orderID");
        dispatch({ type: 'paid' })
        setCartInfo({
            cardNumber: "",
            expiryDate: "",
            cvv: ""
        })

    } else (
        alert("Invalid Card Information, please try again!")
    )
}
    return (
        <button className="outline-none pay h-12 bg-orange-600 text-white mb-3 hover:bg-orange-700 rounded-lg w-1/2 cursor-pointer transition-all"
        onClick={(e) => handlePayment(e)}>Pay</button>
    )


}