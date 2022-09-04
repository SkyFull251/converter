import { useGetCurrencyQuery } from '../../api/apiSlice';

import Spinner from '../spinner/Spinner';

import './header.scss';

const Header = () => {

    const { data, isLoading, isError } = useGetCurrencyQuery();

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
        return null
    }

    const setCurrency = (arr, code) => {
        let rates = 0;
        for(let key in arr){
            if(key === code){
                rates = arr[key];
                break;
            }
        }
        return rates;
    }
    return (
        <div className='test'>
            <h2>Base currency:</h2>
            <p>USD {setCurrency(data.rates, 'UAH').toFixed(2)}</p>
            <p>EUR {(setCurrency(data.rates, 'UAH')/setCurrency(data.rates, 'EUR')).toFixed(2)}</p>
        </div>
    );
};

export default Header;