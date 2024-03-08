import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addToCart } from "../features/actions/cartAction";



export const formateDate = (date) => {
    
    const dateObject = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    return formattedDate

}

export const mapPaymentCodeToLabel = (code) => {
    switch (code) {
      case 'COD':
        return 'Cash On Delivery';
      case 'ONL':
        return 'Online';
      default:
        return 'Unknown';
    }
  };
  
export const mapGenderCodeToLabel = (code) => {
    switch (code) {
      case 'M':
        return 'Male';
      case 'F':
        return 'Female';
      default:
        return 'Other';
    }
  };


export const mapOrderStatusToLabel = (code) => {
    switch (code) {
        case 'A':
            return 'Placed';
        case 'B':
            return 'Confirmed';
        
        case 'P':
            return 'Packed';

        case 'F':
            return 'Failed';

        case 'C':
            return 'Cancelled';

        case 'R':
            return 'Returned';

        case 'D':
            return 'Delivered';
        case 'O':
            return 'On the Way';

        default:
            return 'Unknown';
    }
  };
export const mapPaymentStatusToLabel = (code) => {
    switch (code) {

      case 'P':
        return 'Pending';

      case 'F':
        return 'Failed';

      case 'R':
        return 'Refunded';

      case 'S':
        return 'Success';
      default:
        return 'Unknown';
    }
  };


export const mapAddressCodeToLabel = (code) => {
    switch (code) {
      case 'C':
        return 'Current';
      case 'H':
        return 'Home';
      case 'O':
        return 'Other';
      default:
        return 'Unknown';
    }
  };

export const mapOderType = (code) => {
    switch(code){
        case 'I':
            return 'Individuals';

        case 'G':
            return 'In Groups';

        case 'O':
            return 'Others';
        default:
            return 'Unknown';
    }
}


export const mapDeliveryTime = (code) => {
    switch(code){
        case '15MN':
            return 'Within 15 Minutes';

        case '30MN' : 
            return 'Within 30 Minutes';
        
        case '45MN' : 
            return 'Within 45 Minutes';

        case '1H' : 
            return 'Within 60 Minutes';

        case '3H' : 
            return 'Within 3 Hours';

        case '6H' : 
            return 'Within 6 Hours';
        
        case '9H' : 
            return 'Within 9 Hours';

        case '12H' : 
            return 'Within 12 Hours';

        case '1D' : 
            return 'Within 1 Days';
        
        case '7D' : 
            return 'Within 7 Days';

        case '1M' : 
            return 'Within 1 Months';

        default :
            return 'Unknown';
    }
}


export const timeAgo = (created_at) => {
    const currentDate = new Date();
    const createdAtDate = new Date(created_at);

    const timeDifference = currentDate - createdAtDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        if (hoursDifference === 0) {
            const minutesDifference = Math.floor(timeDifference / (1000 * 60));
            if (minutesDifference === 0) {
                const secondsDifference = Math.floor(timeDifference / 1000);
                return `${secondsDifference} seconds ago`;
            } else {
                return `${minutesDifference} minutes ago`;
            }
        } else {
            return `${hoursDifference} hours ago`;
        }
    } else {
        return `${daysDifference} days ago`;
    }
}


export const AddToCart = (uid) => {
    const {isAuthenticated} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    if (!isAuthenticated) {
        Swal.fire({
            icon: 'error',
            title: 'UnAuthorized!',
            text: "Login first.",
        });
    } else {
        dispatch(addToCart({uid}))
            .then((res1 => {
                const res = unwrapResult(res1);
                if (!res.error) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success.',
                        text: res.msg,
                    });
                } else {
                    const errorFields = Object.keys(res.errors);
                    const errorMessage = errorFields.map(field => `${field}: ${res.errors[field][0]}`).join('\n');
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong.',
                        text: errorMessage,
                    });
                }
            }))
    }
}