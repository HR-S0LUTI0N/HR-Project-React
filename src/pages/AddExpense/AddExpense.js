import PropTypes from 'prop-types';

import axios from 'axios';

import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import Stack from '@mui/material/Stack';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box, Card, CardHeader, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Add from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import { ToastContainer, toast } from 'react-toastify';
import euroFlag from './Flag/euro-flag.svg';
import usdFlag from './Flag/usd-flag.svg';
import trFlag from './Flag/tr-flag.svg';
import ImageModal from './ImageModal';
import FaturaIcon from './Flag/ic_expense.svg';

const comboOptions = ['HEALTH', 'FOOD', 'ACCOMMODATION', 'OTHER'];
const comboPayment = ['CARD', 'CASH', 'OTHER'];
const comboCurrency = [
  { label: 'TRY', flag: <img src={trFlag} alt="TR Flag" />, currency: 'TRY', symbol: '₺' },
  { label: 'USD', flag: <img src={usdFlag} alt="USD Flag" />, currency: 'USD', symbol: '$' },
  { label: 'EUR', flag: <img src={euroFlag} alt="EUR Flag" />, currency: 'EUR', symbol: '€' },
];
export default function AddExpense({ title }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseType, setExpenseType] = useState(comboOptions[-1]);
  const [inputValue, setInputValue] = React.useState('');
  const [paymentMethod, setPaymentMethod] = useState(comboPayment[-1]);
  const [inputValuePayment, setInputValuePayment] = React.useState('');
  const [currency, setCurrency] = useState(comboCurrency[0].currency);
  const [inputValueCurrency, setInputValueCurrency] = React.useState('');
  const [netAmountValid, setNetAmountValid] = React.useState(true);
  const [netAmount, setNetAmount] = React.useState('');
  const [netAmountError, setNetAmountError] = React.useState('');
  const [taxValid, setTaxValid] = React.useState(true);
  const [tax, setTax] = React.useState('');
  const [taxError, setTaxError] = React.useState(true);
  const [taxZoneValid, setTaxZoneValid] = React.useState(true);
  const [taxZone, setTaxZone] = React.useState('');
  const [taxZoneError, setTaxZoneError] = React.useState('');
  const [amountValid, setAmountValid] = React.useState(true);
  const [amount, setAmount] = React.useState('');
  const [amountError, setAmountError] = React.useState(true);
  const [selectedBillDateChange, setSelectedBillDateChange] = useState(dayjs());
  const [selectedDemandDateChange, setSelectedDemandDateChange] = useState(dayjs());
  const [descriptionValid, setDescriptionValid] = React.useState(true);
  const [description, setDescription] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');

  const navigate = useNavigate();

  const successRegistrationToastMessage = () => {
    toast.success('Expense Registration successfull !!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const errorRegistrationToastMessage = () => {
    toast.error('ERROR!! Expense could not be registration, Please try again !!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const [holidayDates, setHolidayDates] = React.useState('');

  const token = sessionStorage.getItem('token');
  const roles = sessionStorage.getItem('roles');

  const locale = 'en-gb';
  const [selectedImage, setSelectedImage] = useState(null);
  React.useEffect(() => {
    if (token === null) {
      navigate('/404');
    } else if (!roles.includes('PERSONEL')) {
      navigate('/404');
    }
  }, []);

  // New state for markedDates

  // Function to handle marked dates change
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    const data = new FileReader();
    data.addEventListener('load', () => {
      setSelectedImage(data.result);
    });
    data.readAsDataURL(file);
  };

  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    setDescription(description);

    const validateDescription = () => {
      if (description.trim().length === 0) {
        return 'Description can not be empty';
      }

      if (description.length > 50) {
        return 'Description should not exceed 50 characters';
      }
      return '';
    };

    const errorMessageDescription = validateDescription();
    setDescriptionError(errorMessageDescription);
    setDescriptionValid(errorMessageDescription === '');
  };

  const handleTaxZoneChange = (event) => {
    const taxZone = event.target.value;
    setTaxZone(taxZone);

    const validateTaxZone = () => {
      if (taxZone.trim().length === 0) {
        return 'Tax zone can not be empty';
      }

      const re = /^[A-Za-zığüşöçİĞÜŞÖÇ]+$/;
      if (!re.test(taxZone)) {
        return 'Tax zone should only contain letters';
      }

      if (taxZone.length > 30) {
        return 'Tax zone should not exceed 30 characters';
      }
      return '';
    };

    const errorMessageTaxZone = validateTaxZone();
    setTaxZoneError(errorMessageTaxZone);
    setTaxZoneValid(errorMessageTaxZone === '');
  };

  const handleNetAmountChange = (event) => {
    const netAmount = event.target.value.replace(/[^\d.]/g, '').trim();
    setNetAmount(netAmount);

    const validateNetAmount = () => {
      if (netAmount.trim().length === 0) {
        return `Net amount can not be empty`;
      }

      if (netAmount.length > 30) {
        return 'Net amount should not exceed 30 characters';
      }

      return '';
    };

    const errorMessageNetAmount = validateNetAmount();
    setNetAmountError(errorMessageNetAmount);
    setNetAmountValid(errorMessageNetAmount === '');

    const reg = /^\d+(.\d+)?$/;
    if (!reg.test(event.target.value) && !(event.target.value === '')) {
      const errorMessageNetAmount = 'Net amount should only contain numbers or decimal';
      setNetAmountError(errorMessageNetAmount);
      setNetAmountValid(errorMessageNetAmount === '');
      setTimeout(() => {
        const errorMessageNetAmount = '';
        setNetAmountError(errorMessageNetAmount);
        setNetAmountValid(errorMessageNetAmount === '');
      }, 2000);
    }
  };

  const handleTaxChange = (event) => {
    const tax = event.target.value.replace(/[^\d.]/g, '').trim();
    setTax(tax);

    const validateTax = () => {
      if (tax.trim().length === 0) {
        return `Tax can not be empty`;
      }

      if (tax.length > 30) {
        return 'Tax should not exceed 30 characters';
      }

      return '';
    };

    const errorMessageTax = validateTax();
    setTaxError(errorMessageTax);
    setTaxValid(errorMessageTax === '');

    const reg = /^\d+(.\d+)?$/;
    if (!reg.test(event.target.value) && !(event.target.value === '')) {
      const errorMessageTax = 'Tax should only contain numbers or decimal';
      setTaxError(errorMessageTax);
      setTaxValid(errorMessageTax === '');
      setTimeout(() => {
        const errorMessageTax = '';
        setTaxError(errorMessageTax);
        setTaxValid(errorMessageTax === '');
      }, 2000);
    }
  };

  const calculateTotal = () => {
    const total = Number(netAmount) + Number(tax);
    return Number.isNaN(total) || total === 0 ? '' : total;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token');
    if (
      netAmountValid &&
      netAmount.length > 0 &&
      taxValid &&
      tax.length > 0 &&
      taxZoneValid &&
      taxZone.length > 0 &&
      descriptionValid &&
      description.length > 0 &&
      expenseType !== undefined &&
      paymentMethod !== undefined &&
      inputValueCurrency.length > 0
    ) {
      const data = new FormData(event.currentTarget);
      const dataload = {
        expenseType: expenseType.toUpperCase(),
        currency: inputValueCurrency.toLocaleUpperCase(),
        paymentMethod: paymentMethod.toUpperCase(),
        netAmount: data.get('netAmount'),
        tax: data.get('tax'),
        taxZone: data.get('taxZone'),
        amount: data.get('amount'),
        billDate: selectedBillDateChange.format('DD-MM-YYYY'),
        demandDate: selectedDemandDateChange.format('DD-MM-YYYY'),
        description: data.get('description'),
        base64Bill: selectedImage,
      };
      console.log('Form Data:', dataload);
      await axios
        .post(`http://localhost:9070/api/v1/expense/personnel-make-expense/${token}`, dataload)
        .then((response) => {
          console.log('Success:', response.data);
          setSelectedImage('');
          setInputValue('');
          setInputValueCurrency('');
          setInputValuePayment('');
          setExpenseType(undefined);
          setPaymentMethod(undefined);
          setNetAmount('');
          setTax('');
          setTaxZone('');
          setAmount('');
          setSelectedBillDateChange(dayjs());
          setSelectedDemandDateChange(dayjs());
          setDescription('');

          successRegistrationToastMessage();
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          console.error('Error:', error);
        });
    } else {
      errorRegistrationToastMessage();
      console.log('Form data is invalid');

      const validateDescription = () => {
        if (description.trim().length === 0) {
          return 'Description can not be empty';
        }

        return '';
      };

      const errorMessageDescription = validateDescription();
      setDescriptionError(errorMessageDescription);
      setDescriptionValid(errorMessageDescription === '');

      const validateTaxZone = () => {
        if (taxZone.trim().length === 0) {
          return 'Tax zone can not be empty';
        }

        return '';
      };

      const errorMessageTaxZone = validateTaxZone();
      setTaxZoneError(errorMessageTaxZone);
      setTaxZoneValid(errorMessageTaxZone === '');

      const validateNetAmount = () => {
        if (netAmount.trim().length === 0) {
          return 'Net amount can not be empty';
        }

        return '';
      };

      const errorMessageNetAmount = validateNetAmount();
      setNetAmountError(errorMessageNetAmount);
      setNetAmountValid(errorMessageNetAmount === '');

      const validateTax = () => {
        if (tax.trim().length === 0) {
          return 'Tax can not be empty';
        }

        return '';
      };

      const errorMessageTax = validateTax();
      setTaxError(errorMessageTax);
      setTaxValid(errorMessageTax === '');

      const validatePostalCode = () => {
        if (calculateTotal() === '') {
          return 'Amount can not be empty';
        }

        return '';
      };

      const errorMessagePostalCode = validatePostalCode();
      setAmountError(errorMessagePostalCode);
      setAmountValid(errorMessagePostalCode === '');
    }
  };

  return (
    <>
      <Grid sx={{ display: 'flex', ml: '10rem' }}>
        <Paper sx={{ maxWidth: 1800 }}>
          <Card sx={{}}>
            <CardHeader subheader="Bill Photo" sx={{ marginLeft: '4.7rem' }} />
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              sx={{ mx: 'auto', gap: '9rem' }}
            >
              <div
                style={{
                  width: '300px',
                  height: '300px',
                  marginBottom: '12px',
                  border: '1px dashed #ccc',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onDoubleClick={openModal}
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Bill"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <span style={{ color: '#aaa' }}>Select an image</span>
                )}
              </div>

              <Button
                type="submit"
                variant="contained"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  maxWidth: 140,
                  minWidth: 140,
                }}
                sx={{
                  borderRadius: 2,
                  padding: 1,
                  mt: 1,
                  bgcolor: '#ffa726',
                  '&:hover': {
                    bgcolor: 'grey',
                  },
                }}
              >
                <input
                  type="file"
                  id="image-upload"
                  onChange={handleChangeImg}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                />
                <Add /> Save Bill Photo
              </Button>
            </Grid>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', p: '2rem' }}
            >
              <CardHeader subheader="Expense Information" sx={{ marginLeft: '3rem' }} />
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <Autocomplete
                  sx={{ width: 280 }}
                  name="ExpenseType"
                  value={inputValue}
                  options={comboOptions}
                  autoFocus
                  onChange={(event, newInputValue) => {
                    console.log(newInputValue);
                    setExpenseType(newInputValue);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  inputValue={inputValue}
                  renderInput={(params) => <TextField {...params} label="Expense Type" />}
                  defaultValue={null}
                />
                <Autocomplete
                  sx={{ width: 280 }}
                  name="Currency"
                  value={inputValueCurrency}
                  options={comboCurrency}
                  autoFocus
                  onChange={(event, newInputValueCurrency) => {
                    console.log(newInputValueCurrency);
                    setCurrency(newInputValueCurrency);
                  }}
                  onInputChange={(event, newInputValueCurrency) => {
                    setInputValueCurrency(newInputValueCurrency);
                  }}
                  inputValue={inputValueCurrency}
                  renderInput={(params) => <TextField {...params} label="Currency" />}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '8px' }}>{option.flag}</div>
                        <div style={{ marginRight: '8px' }}>{option.label}</div>
                        <div>{option.symbol}</div>
                      </div>
                    </li>
                  )}
                  defaultValue={null}
                />
                <Autocomplete
                  sx={{ width: 280 }}
                  name="Payment Method"
                  value={inputValuePayment}
                  options={comboPayment}
                  autoFocus
                  onChange={(event, newInputValuePayment) => {
                    console.log(newInputValuePayment);
                    setPaymentMethod(newInputValuePayment);
                  }}
                  onInputChange={(event, newInputValuePayment) => {
                    setInputValuePayment(newInputValuePayment);
                  }}
                  inputValue={inputValuePayment}
                  renderInput={(params) => <TextField {...params} label="Payment Method" />}
                  defaultValue={null}
                />
                <TextField
                  id="netAmount"
                  value={netAmount}
                  onChange={handleNetAmountChange}
                  name="netAmount"
                  label="Net Amount"
                  variant="filled"
                  sx={{ width: 280 }}
                  error={!netAmountValid}
                  helperText={!netAmountValid ? netAmountError : ''}
                />
                <TextField
                  id="tax"
                  value={tax}
                  onChange={handleTaxChange}
                  name="tax"
                  label="Tax"
                  variant="filled"
                  sx={{ width: 280 }}
                  error={!taxValid}
                  helperText={!taxValid ? taxError : ''}
                />
                <TextField
                  id="taxZone"
                  value={taxZone}
                  onChange={handleTaxZoneChange}
                  name="taxZone"
                  label="Tax Zone"
                  variant="filled"
                  sx={{ width: 280 }}
                  error={!taxZoneValid}
                  helperText={!taxZoneValid ? taxZoneError : ''}
                />
                <TextField
                  id="amount"
                  value={calculateTotal()}
                  InputProps={{ readOnly: true }}
                  placeholder="Can't write in this section"
                  name="amount"
                  label="Amount"
                  fullWidth
                  sx={{ width: 280 }}
                  error={!amountValid}
                  helperText={!amountValid ? amountError : ''}
                />
                <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        id="billDate"
                        label="Bill Date"
                        name="billDate"
                        value={selectedBillDateChange}
                        onChange={(e) => {
                          setSelectedBillDateChange(e);
                        }}
                        sx={{ width: 280 }}
                      />
                    </DemoContainer>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        id="demandDate"
                        label="Demand Date"
                        name="demandDate"
                        value={selectedDemandDateChange}
                        onChange={(e) => {
                          setSelectedDemandDateChange(e);
                        }}
                        sx={{ width: 280 }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <TextField
                  id="description"
                  value={description}
                  name="description"
                  label="Description"
                  variant="filled"
                  rows={10}
                  placeholder="Max 50 characters"
                  sx={{ width: 905 }}
                  multiline
                  error={!descriptionValid}
                  helperText={!descriptionValid ? descriptionError : ''}
                  onChange={handleDescriptionChange}
                />
              </Grid>

              <Grid container justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  style={{ maxWidth: 140, minWidth: 140 }}
                  sx={{
                    borderRadius: 2,
                    padding: 1,
                    bgcolor: '#ffa726',
                    '&:hover': {
                      bgcolor: 'grey',
                    },
                  }}
                >
                  Save
                </Button>
                <ToastContainer />
              </Grid>
            </Box>
          </Card>
          {isModalOpen && <ImageModal selectedImage={selectedImage} closeModal={closeModal} />}
        </Paper>
      </Grid>
    </>
  );
}

AddExpense.propTypes = {
  title: PropTypes.string.isRequired,
  markedDates: PropTypes.array.isRequired,
};
