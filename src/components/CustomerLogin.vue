<template>
    <div class="banner">
        <h1>Welcome to Online Banking</h1>
        <p>Secure and convenient banking services at your fingertips</p>
    </div>
    <div class="container">
        <div class="banner-image">
            <img src="https://media.licdn.com/dms/image/D4D12AQHyYTSM1lSQlA/article-cover_image-shrink_720_1280/0/1670275511986?e=2147483647&v=beta&t=VteBJ23fWD7ZpaKURzgYRI0on2Aurq8sn3TGqsRcm8k"
                alt="Banner Image">
        </div>
        <div class="header-container">
            <!-- <div class="header"> -->
            <div class="login-form">
                <h2>Login to Your Account</h2>
                <form @submit.prevent="login">
                    <input id="customerId" type="number" placeholder="Customer Id"
                        v-model.number="loginRequest.customerId" required>
                    <input id="password" type="password" placeholder="Password" v-model="loginRequest.password"
                        required>
                    <button type="submit">Login</button>
                </form>
            </div>
            <!-- </div> -->
            <p style="color: red; text-align: center;">{{ message }}</p>
        </div>

        <div class="pricing-boxes">
            <div class="pricing-box">
                <h2>Basic</h2>
                <p>Perfect for personal use</p>
                <p class="price">$9.99/mo</p>
            </div>
            <div class="pricing-box">
                <h2>Standard</h2>
                <p>Best for small businesses</p>
                <p class="price">$19.99/mo</p>
            </div>
            <div class="pricing-box">
                <h2>Premium</h2>
                <p>For larger enterprises</p>
                <p class="price">$29.99/mo</p>
            </div>
        </div>

        <!-- Additional sections -->
        <div class="features">
            <h2>Features of Our Online Banking</h2>
            <p>Discover the array of functionalities including convenient options like online bill payment, seamless
                fund transfers, and comprehensive account management.</p>
            <p>With our user-friendly interface, you can effortlessly schedule payments, move funds between accounts,
                and stay updated on your financial activity.</p>
            <p>Explore these features and more to experience the ease and efficiency of managing your finances online.
            </p>
        </div>

        <div class="testimonial">
            <h2>What Our Customers Say</h2>
            <p>"I've been using this online banking service for years, and I'm extremely satisfied with its convenience
                and security."</p>
        </div>

        <div class="contact">
            <h2>Contact Us</h2>
            <p>If you have any questions or need assistance, feel free to contact our customer support team at
                support@onlinebanking.com</p>
        </div>
    </div>
    <div class="footer">
        <p>&copy; 2024 Online Banking. All rights reserved.</p>
    </div>
</template>

<script>
import LoginService from '../services/LoginService';

export default {
    name: 'studentLogin',
    data() {
        return {
            loginRequest: { customerId: '', password: '' },
            message: '',
            cid: null
        };
    },
    methods: {
        login() {
            LoginService.login(this.loginRequest)
                .then(response => {
                    let customer = response.data;
                    localStorage.setItem('cid', customer.id);
                    console.log(customer)
                    this.$router.push({ name: 'home' })
                })
                .catch(ex => {
                    this.loginRequest.customerId = '';
                    this.loginRequest.password = '';
                    this.message = ex.response.data.message;
                    console.log(ex.response.data);
                });
        },
        isLoggedIn() {
            if (this.cid != null && this.cid != undefined) {
                this.$router.push({ name: 'home' })
            }
        }
    },
    mounted() {
        this.message = '';
        this.cid = localStorage.getItem('cid');
        this.isLoggedIn();
    }
};
</script>

<style scoped lang="css">
body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f0f0;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    /* Align items to the start */
}

.banner {
    background: linear-gradient(to right, #3498db, #2980b9);
    color: #fff;
    text-align: center;
    padding: 40px 20px;
    margin-bottom: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-basis: 100%;
}

.banner-image,
.header-container {
    flex-basis: 50%;
    /* Set width */
    padding-right: 10px;
    /* Add space between elements */
    box-sizing: border-box;
}

.banner-image img {
    max-height: 400px;
    width: 120%;
    /* Ensure the image takes full width */
    object-fit: cover;
    /* Maintain aspect ratio */
    border-radius: 10px;
    /* Optional: Add border-radius */
    ;
    margin-left: 20px;
}

.header-container {
    padding-left: 150px;
    /* Add space between elements */
}

.header {
    background: linear-gradient(to right, #2980b9, #34495e);
    color: #fff;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    max-width: 400px;
    margin-left: auto;
    /* margin-right: auto; */
}

.footer {
    background: linear-gradient(to right, #34495e, #2c3e50);
    color: #fff;
    text-align: center;
    padding: 20px;
    margin-top: 40px;
    flex-basis: 100%;
}

.login-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}

.login-form h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
}

.login-form input {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.login-form button {
    width: 100%;
    padding: 12px;
    background-color: #2980b9;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login-form button:hover {
    background-color: #1c6ea4;
}

.pricing-boxes {
    display: flex;
    justify-content: center;
    align-items: stretch;
    margin-top: 40px;
    flex-basis: 100%;
}

.pricing-box {
    flex: 1;
    background-color: #fff;
    border-radius: 10px;
    padding: 40px;
    margin: 0 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.pricing-box:hover {
    transform: translateY(-10px);
}

.pricing-box h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
}

.pricing-box p {
    color: #666;
    font-size: 16px;
    margin-bottom: 20px;
}

.pricing-box .price {
    color: #3498db;
    font-size: 32px;
    font-weight: bold;
}

.features,
.testimonial {
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;
    margin-top: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    flex-basis: 100%;
    /* Set width */
}

.features h2,
.testimonial h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
}

.features p,
.testimonial p {
    color: #666;
    font-size: 16px;
    margin-bottom: 20px;
}

.contact {
    background-color: #3498db;
    color: #fff;
    padding: 40px;
    border-radius: 10px;
    margin-top: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    flex-basis: 100%;
    /* Set width */
}

.contact p {
    font-size: 18px;
    margin-bottom: 20px;
}

.testimonial {
    background-color: #f9f9f9;
}

.contact form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.contact input[type="text"],
.contact input[type="email"],
.contact textarea {
    width: calc(50% - 20px);
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.contact textarea {
    height: 100px;
}

.contact button {
    width: 100%;
    padding: 12px;
    background-color: #2980b9;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.contact button:hover {
    background-color: #1c6ea4;
}

.footer p {
    margin: 0;
}

.footer a {
    color: #fff;
    text-decoration: none;
}

.navbar {
    background-color: #333;
    padding: 10px 0;
}

.navbar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.navbar li {
    display: inline;
}

.navbar li a {
    color: #fff;
    padding: 10px 20px;
    text-decoration: none;
}

.navbar li a:hover {
    background-color: #555;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0;
    /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
    /* Firefox */
}
</style>