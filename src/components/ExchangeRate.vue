<template>
    <PageHeader />
    <div class="container">
        <PageNavigationMenuVue />
        <div class="content">
            <div class="dashboard-section">
                <h2>Exchange Rates</h2>
            </div>
            <div v-if="exchangeRates" class="converter">
                <h3>USD to Other Currency Converter (Retrieved on {{ new Date(exchangeRates.time).toLocaleString() }})
                </h3>
                <input type="number" id="usdInput" placeholder="Enter USD amount" v-model="usd">
                <div id="convertedAmount"></div>
            </div>
            <div v-if="exchangeRates" class="exchange-rates">
                <div class="currency" v-for="currency in filteredCurrencies" :key="currency">
                    <h3>{{ `${data[currency]} (${currency})` }}</h3>
                    <p>{{ usd }} USD = {{ converter(exchangeRates.rates[currency]) }} {{ currency }}</p>
                </div>
                <!-- Add more currencies as needed -->
            </div>
        </div>
    </div>
    <PageFooter />
</template>

<script>
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import PageNavigationMenuVue from './PageNavigationMenu';

import ExchangeRateService from '@/services/ExchangeRateService';
import LoginService from '@/services/LoginService';

export default ({
    components: {
        PageHeader, PageFooter, PageNavigationMenuVue
    },
    data() {
        return {
            cid: 0,
            exchangeRates: null,
            usd: '1',
            data: {
                "AED": "United Arab Emirates Dirham",
                "AFN": "Afghan Afghani",
                "ALL": "Albanian Lek",
                "AMD": "Armenian Dram",
                "ANG": "Netherlands Antillean Guilder",
                "AOA": "Angolan Kwanza",
                "ARS": "Argentine Peso",
                "AUD": "Australian Dollar",
                "AWG": "Aruban Florin",
                "AZN": "Azerbaijani Manat",
                "BAM": "Bosnia-Herzegovina Mark",
                "BBD": "Barbadian Dollar",
                "BDT": "Bangladeshi Taka",
                "BGN": "Bulgarian Lev",
                "BHD": "Bahraini Dinar",
                "BIF": "Burundian Franc",
                "BMD": "Bermudian Dollar",
                "BND": "Brunei Dollar",
                "BOB": "Bolivian Boliviano",
                "BRL": "Brazilian Real",
                "BSD": "Bahamian Dollar",
                "BTN": "Bhutanese Ngultrum",
                "BWP": "Botswana Pula",
                "BYN": "Belarusian Ruble",
                "BZD": "Belize Dollar",
                "CAD": "Canadian Dollar",
                "CDF": "Congolese Franc",
                "CHF": "Swiss Franc",
                "CLP": "Chilean Peso",
                "CNY": "Chinese Yuan",
                "COP": "Colombian Peso",
                "CRC": "Costa Rican Colón",
                "CUP": "Cuban Peso",
                "CVE": "Cape Verdean Escudo",
                "CZK": "Czech Koruna",
                "DJF": "Djiboutian Franc",
                "DKK": "Danish Krone",
                "DOP": "Dominican Peso",
                "DZD": "Algerian Dinar",
                "EGP": "Egyptian Pound",
                "ERN": "Eritrean Nakfa",
                "ETB": "Ethiopian Birr",
                "EUR": "Euro",
                "FJD": "Fijian Dollar",
                "FKP": "Falkland Islands Pound",
                "FOK": "Faroese Króna",
                "GBP": "British Pound Sterling",
                "GEL": "Georgian Lari",
                "GGP": "Guernsey Pound",
                "GHS": "Ghanaian Cedi",
                "GIP": "Gibraltar Pound",
                "GMD": "Gambian Dalasi",
                "GNF": "Guinean Franc",
                "GTQ": "Guatemalan Quetzal",
                "GYD": "Guyanaese Dollar",
                "HKD": "Hong Kong Dollar",
                "HNL": "Honduran Lempira",
                "HRK": "Croatian Kuna",
                "HTG": "Haitian Gourde",
                "HUF": "Hungarian Forint",
                "IDR": "Indonesian Rupiah",
                "ILS": "Israeli New Shekel",
                "IMP": "Isle of Man Pound",
                "INR": "Indian Rupee",
                "IQD": "Iraqi Dinar",
                "IRR": "Iranian Rial",
                "ISK": "Icelandic Króna",
                "JEP": "Jersey Pound",
                "JMD": "Jamaican Dollar",
                "JOD": "Jordanian Dinar",
                "JPY": "Japanese Yen",
                "KES": "Kenyan Shilling",
                "KGS": "Kyrgystani Som",
                "KHR": "Cambodian Riel",
                "KID": "Kiribati Dollar",
                "KMF": "Comorian Franc",
                "KRW": "South Korean Won",
                "KWD": "Kuwaiti Dinar",
                "KYD": "Cayman Islands Dollar",
                "KZT": "Kazakhstani Tenge",
                "LAK": "Laotian Kip",
                "LBP": "Lebanese Pound",
                "LKR": "Sri Lankan Rupee",
                "LRD": "Liberian Dollar",
                "LSL": "Lesotho Loti",
                "LYD": "Libyan Dinar",
                "MAD": "Moroccan Dirham",
                "MDL": "Moldovan Leu",
                "MGA": "Malagasy Ariary",
                "MKD": "Macedonian Denar",
                "MMK": "Myanmar Kyat",
                "MNT": "Mongolian Tugrik",
                "MOP": "Macanese Pataca",
                "MRU": "Mauritanian Ouguiya",
                "MUR": "Mauritian Rupee",
                "MVR": "Maldivian Rufiyaa",
                "MWK": "Malawian Kwacha",
                "MXN": "Mexican Peso",
                "MYR": "Malaysian Ringgit",
                "MZN": "Mozambican Metical",
                "NAD": "Namibian Dollar",
                "NGN": "Nigerian Naira",
                "NIO": "Nicaraguan Córdoba",
                "NOK": "Norwegian Krone",
                "NPR": "Nepalese Rupee",
                "NZD": "New Zealand Dollar",
                "OMR": "Omani Rial",
                "PAB": "Panamanian Balboa",
                "PEN": "Peruvian Nuevo Sol",
                "PGK": "Papua New Guinean Kina",
                "PHP": "Philippine Peso",
                "PKR": "Pakistani Rupee",
                "PLN": "Polish Zloty",
                "PYG": "Paraguayan Guarani",
                "QAR": "Qatari Rial",
                "RON": "Romanian Leu",
                "RSD": "Serbian Dinar",
                "RUB": "Russian Ruble",
                "RWF": "Rwandan Franc",
                "SAR": "Saudi Riyal",
                "SBD": "Solomon Islands Dollar",
                "SCR": "Seychellois Rupee",
                "SDG": "Sudanese Pound",
                "SEK": "Swedish Krona",
                "SGD": "Singapore Dollar",
                "SHP": "Saint Helena Pound",
                "SLL": "Sierra Leonean Leone",
                "SOS": "Somali Shilling",
                "SRD": "Surinamese Dollar",
                "SSP": "South Sudanese Pound",
                "STN": "São Tomé and Príncipe Dobra",
                "SYP": "Syrian Pound",
                "SZL": "Swazi Lilangeni",
                "THB": "Thai Baht",
                "TJS": "Tajikistani Somoni",
                "TMT": "Turkmenistani Manat",
                "TND": "Tunisian Dinar",
                "TOP": "Tongan Pa'anga",
                "TRY": "Turkish Lira",
                "TTD": "Trinidad and Tobago Dollar",
                "TVD": "Tuvaluan Dollar",
                "TWD": "New Taiwan Dollar",
                "TZS": "Tanzanian Shilling",
                "UAH": "Ukrainian Hryvnia",
                "UGX": "Ugandan Shilling",
                "USD": "United States Dollar",
                "UYU": "Uruguayan Peso",
                "UZS": "Uzbekistan Som",
                "VES": "Venezuelan Bolívar",
                "VND": "Vietnamese Dong",
                "VUV": "Vanuatu Vatu",
                "WST": "Samoan Tala",
                "XAF": "CFA Franc BEAC",
                "XCD": "East Caribbean Dollar",
                "XDR": "Special Drawing Rights",
                "XOF": "CFA Franc BCEAO",
                "XPF": "CFP Franc",
                "YER": "Yemeni Rial",
                "ZAR": "South African Rand",
                "ZMW": "Zambian Kwacha",
                "ZWL": "Zimbabwean Dollar"
            }
        }
    },
    methods: {
        getExchangeRates() {
            ExchangeRateService.getExchangeRates()
                .then(response => {
                    this.exchangeRates = response.data;

                    let allCurrencies = Object.keys(this.exchangeRates.rates);
                    return allCurrencies.filter(currency => this.data[currency] !== undefined);
                })
                .catch(e => {
                    console.log(e);
                })
        },
        converter(exchangeRate) {
            return (Number(exchangeRate) * Number(this.usd)).toFixed(2);
        }
    },
    computed: {
        filteredCurrencies() {
            let allCurrencies = Object.keys(this.exchangeRates.rates);
            return allCurrencies.filter(currency => this.data[currency] !== undefined);
        }
    },
    mounted() {
        this.cid = localStorage.getItem('cid');
        if (!LoginService.isLoggedIn(this.cid)) {
            this.$router.push({ name: 'login' });
        }
        this.getExchangeRates();
    }
})
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
}

.content {
    flex-grow: 1;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.dashboard-section {
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.dashboard-section:hover {
    transform: translateY(-5px);
}

.dashboard-section h2 {
    margin-bottom: 10px;
    color: #333;
    text-align: center;
}

.dashboard-section p {
    color: #666;
}

.header {
    background: linear-gradient(to right, #2980b9, #34495e);
    color: #fff;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    max-width: 100%;
}

.exchange-rates {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

.currency {
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.currency:hover {
    transform: translateY(-5px);
}

.currency h3 {
    margin: 0;
    color: #3498db;
    font-size: 14px;
    margin-bottom: 10px;
}

.currency p {
    margin: 0;
    color: #666;
    font-size: 14px;
}

.currency-divider {
    width: 100%;
    border-top: 2px solid #ccc;
    margin-top: 15px;
}

.converter {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.converter h2 {
    margin-top: 0;
    color: #333;
    font-size: 22px;
    text-align: center;
    margin-bottom: 10px;
}

.converter input[type="number"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
}

#convertedAmount {
    font-size: 18px;
    text-align: center;
    color: #333;
}
</style>