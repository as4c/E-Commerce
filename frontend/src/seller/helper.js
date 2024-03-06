
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
          return 'On the way';

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

      case 'C':
        return 'Cancelled';

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