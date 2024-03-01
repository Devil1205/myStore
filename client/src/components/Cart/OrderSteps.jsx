import React from 'react';
import './OrderSteps.css';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import { Typography } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function OrderSteps({ activePage }) {

    const steps = [
        {
            icon: LocalShippingRoundedIcon,
            label: <Typography>Shipping</Typography>
        },
        {
            icon: ShoppingBasketRoundedIcon,
            label: <Typography>Checkout</Typography>
        },
        {
            icon: AccountBalanceRoundedIcon,
            label: <Typography>Payment</Typography>
        }
    ]

    return (
        <>
            <div className='orderSteps'>
                <Stepper activeStep={activePage} alternativeLabel>
                    {
                        steps.map((elem, ind) => {
                            return (<Step key={ind} active={ind===activePage} completed={ind<activePage}>
                                <StepLabel StepIconComponent={elem.icon}>{elem.label}</StepLabel>
                            </Step>)
                        })
                    }
                </Stepper>
            </div>
        </>
    )
}

export default OrderSteps