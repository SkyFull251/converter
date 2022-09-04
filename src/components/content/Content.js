import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetCurrencyQuery } from '../../api/apiSlice';
import { currencyChanged, secondInputChanged, firstInputChanged } from './currencySlice';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'

import './content.scss';

const Content = () => {

    const [curr, setCurr] = useState({
        firstSelect: 'USD',
        secondSelect: 'USD'
    });
    //const [currency2, setCurrency2] = useState(0);
    const { currencySecond, secondInput, firstInput } = useSelector(state => state.currency);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(secondInputChanged(firstInput* currencySecond));
        // eslint-disable-next-line
    },[currencySecond]);

    const { data, isLoading, isError } = useGetCurrencyQuery();

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
        return <ErrorMessage />
    }

    const onChangeSelect = async (e) => {
        setCurr(() => ({ ...curr, [e.target.name]: e.target.value }));
        if (e.target.name === 'secondSelect') {
            for (let key in data.rates) {
                if (key === e.target.value) {
                    dispatch(currencyChanged(data.rates[key]));
                    //setCurrency2(data.rates[key]);
                    //dispatch(secondInputChanged(firstInput * currencySecond));
                }
            }
        }
        if (e.target.name === 'firstSelect') {
            for (let key in data.rates) {
                if (key === e.target.value) {
                    //e.target.value = usd k eur
                    dispatch(currencyChanged(currencySecond/data.rates[key]));
                    dispatch(secondInputChanged(secondInput * currencySecond));
                }
            }
        }
    }
    console.log('render');
    const onChangeInput = (e) => {
        if (e.target.name === "firstInput") {
            dispatch(firstInputChanged(e.target.value))
            dispatch(secondInputChanged(e.target.value * currencySecond));
        }
        if (e.target.name === 'secondInput') {
            dispatch(secondInputChanged(e.target.value))
            dispatch(firstInputChanged(e.target.value / currencySecond));
        }
    }
    return (
        <div className='content'>
            <p>Convert your currency</p>
            <div className='content__wrapper'>
                <select
                    name="firstSelect"
                    id="currency"
                    value={curr.firstSelect}
                    onChange={onChangeSelect}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="UAH">UAH</option>
                    <option value="AED">JAP</option>
                </select>
                <div className="form__group field">
                    <input
                        type="number"
                        className="form__field"
                        placeholder="Set Num"
                        name="firstInput"
                        id='name'
                        value={firstInput}
                        onChange={onChangeInput} />
                    <label htmlFor="firstInput" className="form__label">Set Num</label>
                </div>
                <select
                    name="secondSelect"
                    id="currency2"
                    value={curr.secondSelect}
                    onChange={onChangeSelect} >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="UAH">UAH</option>
                    <option value="AED">JAP</option>
                </select>
                <div className="form__group field">
                    <input
                        type="number"
                        className="form__field"
                        placeholder="Set Num"
                        name="secondInput"
                        id='name'
                        value={secondInput}
                        onChange={onChangeInput} />
                    <label htmlFor="secondInput" className="form__label">Set Num</label>
                </div>
            </div>
        </div>
    );
};

export default Content;