import React, {useState, useCallback, useEffect} from 'react'
import {TextStyle, Layout, RadioButton, Select, Button, Icon, Form} from '@shopify/polaris';
import {
    QuestionMarkMajor
  } from '@shopify/polaris-icons';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addRealtimeSetting, getRealtimeSetting} from '../../actions/realtime';
import position_1 from '../../images/position_1.png'
import position_2 from '../../images/position_2.jpg'
import position_3 from '../../images/position_3.jpg'
import position_4 from '../../images/position_4.jpg'

const LayoutPopup = ({addRealtimeSetting, realtime: {realtime}, getRealtimeSetting}) => {
    useEffect(() => {
        getRealtimeSetting()
    }, [])
    const [checked, setChecked] = useState(false);
    const handleChange = useCallback(
        (_checked, newValue) => setChecked(newValue),
        [],
    );

    const options = [
        {label: 'Correct views', value: 'Correct views'},
        {label: 'Random views', value: 'Random views'},
    ];

    const [positionValue, setPosition] = useState('');

    const handleChangePosition = useCallback(
      (_checked, newValue) => setPosition(newValue),
      [],
    );

    const [orderChecked, setOrderChecked] = useState(false);

    const [selected, setSelected] = useState('Correct views');

    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const initialState = {
        showProduct: '',
        backgroundLeft: '#4E67CA',
        backgroundRight: '#000000',
        backgroundColor: '#08244A',
        to: '', 
        from: '',
        customText: 'Testing',
        colorText: '#ffffff',
        position: '',
    }

    const [formData, setFormData] = useState(initialState);
    formData.showProduct = JSON.stringify(orderChecked);
    formData.position = positionValue;
    const {backgroundLeft, backgroundRight, backgroundColor, to, from, customText, colorText} = formData;
    const onChange = (e) => {setFormData({...formData, [e.target.name]: e.target.value})};
    const onSubmit = (e) => {
        e.preventDefault();
        addRealtimeSetting(formData);
    }
    console.log(realtime);
    return (
    <form onSubmit={onSubmit}>
        <div className='mb-3 mt-3'>
            <Layout>
                <Layout.Section secondary>
                    <TextStyle variation='strong'>Show Order Notifications</TextStyle>
                </Layout.Section>
                <Layout.Section>
                    <input type='checkbox' name='orderChecked' value={orderChecked} defaultChecked={orderChecked} onChange={() => setOrderChecked(!orderChecked)} />
                </Layout.Section> 
            </Layout>
        </div>
        <div className='mb-3 mt-3'>
            <Layout>
                <Layout.Section secondary>
                    <TextStyle variation='strong'>Show Order Notifications</TextStyle>
                </Layout.Section>
                <Layout.Section oneThird>
                    <TextStyle>Background Gradient:</TextStyle>
                        <Layout.Section>
                            <RadioButton
                                checked={checked === 'gradient'}
                                onChange={handleChange}
                                id='gradient'
                                name='checked'
                            />
                            <div className='gradient' style={{background: `linear-gradient(90deg,${backgroundLeft}, ${backgroundRight})`, color: `${colorText}`}}> {customText} </div>
                        </Layout.Section>
                        <div className="mt-3 mb-3">
                            <span style={{fontWeight:600, padding: 15}}>Background left</span>
                            <input type='color' name='backgroundLeft' value={backgroundLeft} className='color' onChange={onChange} />
                            <span style={{fontWeight:600, padding: 15}}>Background right</span>
                            <input type='color' name='backgroundRight' value={backgroundRight} className='color' onChange={onChange} />
                        </div>
                </Layout.Section> 
                <Layout.Section oneThird>
                    <TextStyle>Background Color:</TextStyle>
                    <Layout.Section>
                        <RadioButton
                            checked={checked === 'backgroundColor'}
                            onChange={handleChange}
                            id='backgroundColor'
                            name='checked'
                        />
                        <div className='gradient' style={{backgroundColor: backgroundColor}}><span style={{color:`${colorText}`, fontWeight:600, marginLeft: 50, marginTop: 50, alignItems: 'center', fontSize: 16}}> {customText} </span></div>
                    </Layout.Section>
                    <div className="mt-3">
                        <input type='color' name='backgroundColor' value={backgroundColor} className='color' onChange={onChange} />
                    </div>
                </Layout.Section> 
            </Layout>
        </div>
        <div className='mb-3 mt-3'>
            <Layout >
                <Layout.Section secondary>
                    <TextStyle variation='strong'>Select Date Format</TextStyle>
                </Layout.Section>
                <Layout.Section>
                    <div className='input-md mb-3'>
                        <Select
                            options={options}
                            onChange={handleSelectChange}
                            value={selected}
                        />
                    </div>
                        {selected === 'Random views' ? (
                        <div className='mb-3'>
                            <div className='mb-3 ml-5'>
                                <span style={{marginRight: 100, fontWeight:600}}>Min</span>
                                <input type='number' name='from' value={from} onChange={onChange} className='input-ssm' />
                            </div>
                            <div className='mb-3 ml-5'>
                                <span style={{marginRight: 100, fontWeight:600}}>Max</span>
                                <input type='number' name='to' value={to} onChange={onChange} className='input-ssm' />
                            </div>
                        </div>
                    ) : ''} 
                </Layout.Section>
            </Layout>
        </div>
        <div className='mb-3 mt-3'>
            <Layout>
                <Layout.Section secondary>
                    <TextStyle variation='strong'>Custom Text</TextStyle>      
                </Layout.Section>
                <Layout.Section>
                    <input required className="input-form" name='customText' value={customText} onChange={onChange} />
                </Layout.Section>
            </Layout>
        </div>
        <div className='mb-3 mt-3'>
            <Layout>
                <Layout.Section secondary>
                    <TextStyle variation='strong'>Color Text</TextStyle>
                </Layout.Section>
                <Layout.Section>
                    <input value={colorText} name='colorText' onChange={onChange} type='color' className='color' />
                </Layout.Section>
            </Layout>
        </div>
            {/* Position */}
        <div className='mb-3 mt-3'>
            <Layout>
                <Layout.Section secondary>
                    <TextStyle variation='strong'>Position</TextStyle>
                </Layout.Section>
                <Layout.Section>
                        <ul className='img-list'>
                            <li className='img-sm'>
                                <img alt='Nothing' className='img' src={position_1}/>
                                <br/>
                                <div style={{textAlign:'center'}}>
                                    
                                <RadioButton
                                    checked={positionValue === 'bottomLeft'}
                                    id="bottomLeft"
                                    name="position"
                                    onChange={handleChangePosition}
                                />
                                </div>
                            </li>
                            <li className='img-sm'>
                                <img alt='Nothing' className='img' src={position_2}/>
                                <br/>
                                <div style={{textAlign:'center'}}>
                                    
                                <RadioButton
                                    checked={positionValue === 'bottomRight'}
                                    id="bottomRight"
                                    name="position"
                                    onChange={handleChangePosition}
                                />
                                </div>
                            </li>
                            <li className='img-sm'>
                                <img alt='Nothing' className='img' src={position_3}/>
                                <br/>
                                <div style={{textAlign:'center'}}>
                                    
                                <RadioButton
                                    checked={positionValue === 'topRight'}
                                    id="topRight"
                                    name="position"
                                    onChange={handleChangePosition}
                                />
                                </div>
                            </li>
                            <li className='img-sm'>
                                <img alt='Nothing' className='img' src={position_4}/>
                                <br/>
                                <div style={{textAlign:'center'}}>
                                    
                                <RadioButton
                                    checked={positionValue === 'topLeft'}
                                    id="topLeft"
                                    name="position"
                                    onChange={handleChangePosition}
                                />
                                </div>
                            </li>
                        </ul>
                </Layout.Section> 
            </Layout>
        </div>
        <div className='mb-3'>
            <Layout>
                <Layout.Section secondary>
                    <Button size='medium' primary>
                        <div style={{display:'flex'}}>
                            <Icon source={QuestionMarkMajor} />
                            <span style={{padding:'5px 0px 5px 3px'}}>Support</span>
                        </div>
                    </Button>
                </Layout.Section>
                <Layout.Section>
                    <Button size='large' primary submit={true}>Save</Button>
                    {/* <input type='submit' /> */}
                </Layout.Section> 
            </Layout>
        </div>
    </form>
    )
}

LayoutPopup.propTypes = {
    addRealtimeSetting: PropTypes.func.isRequired,
    getRealtimeSetting: PropTypes.func.isRequired,
    realtime: PropTypes.object.isRequired,
  }

const mapStateToProps = (state) => ({
    realtime: state.realtime,
})

export default connect(mapStateToProps, {addRealtimeSetting, getRealtimeSetting})(LayoutPopup)
